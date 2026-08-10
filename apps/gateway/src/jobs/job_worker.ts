import {
  GenerationStateSchema,
  ImageGenerationResultSchema,
  type GenerationState,
  type ImageGenerationRequest,
  type ImageGenerationResult,
  type ProviderCapability,
  type ProviderId,
  type ProviderError,
} from "@tavern-canvas/contracts";
import {
  normalize_provider_failure,
  type ProviderExecutionContext,
  type ProviderOutputAsset,
  type ProviderPollResult,
  type ProviderProfile,
  type ProviderSubmission,
  type ProviderTransport,
} from "@tavern-canvas/providers";

import type { GatewayConfig, GatewayProviderConfig } from "../config/config_schema.js";
import type { AssetStore } from "../assets/asset_store.js";
import { JobService } from "./job_service.js";
import type { StoredJob } from "../persistence/job_repository.js";
import type { GatewayLogger } from "../logging/logger.js";
import { ProviderHttpTransport } from "../transport/provider_http_transport.js";
export interface GatewayAdapter {
  readonly provider_id: ProviderId;
  readonly capabilities: ReadonlySet<ProviderCapability>;
  validate_profile(profile: unknown): ProviderProfile;
  submit(
    context: ProviderExecutionContext,
    request: ImageGenerationRequest,
  ): Promise<ProviderSubmission>;
  poll(
    context: ProviderExecutionContext,
    submission: ProviderSubmission,
  ): Promise<ProviderPollResult>;
  cancel(
    context: ProviderExecutionContext,
    submission: ProviderSubmission | undefined,
  ): Promise<void>;
}
type QueryableProviderSubmission = Extract<ProviderSubmission, { readonly state: "pending" }>;

export interface ProviderTransportFactory {
  create(provider: GatewayProviderConfig): ProviderTransport;
}

export interface JobWorkerOptions {
  readonly service: JobService;
  readonly asset_store: AssetStore;
  readonly config: GatewayConfig;
  readonly adapters: ReadonlyMap<ProviderId, GatewayAdapter>;
  readonly transport_factory?: ProviderTransportFactory;
  readonly logger: GatewayLogger;
  readonly clock?: () => string;
  readonly sleep?: (milliseconds: number, signal: AbortSignal) => Promise<void>;
}

interface ActiveJob {
  readonly controller: AbortController;
  readonly adapter: GatewayAdapter;
  readonly provider: GatewayProviderConfig;
  readonly transport: ProviderTransport;
  readonly owner_token_hash: StoredJob["owner_token_hash"];
  submit_in_flight: boolean;
  shutdown_requested: boolean;
  cancel_requested: boolean;
}

const DEFAULT_POLL_DELAY_MS = 250;
const MAX_POLL_DELAY_MS = 60_000;
const CANCEL_TIMEOUT_MS = 5_000;
const CLEANUP_INTERVAL_MS = 60 * 60 * 1_000;
const EMPTY_SUBMISSION = null;

export class JobWorker {
  readonly #service: JobService;
  readonly #asset_store: AssetStore;
  readonly #config: GatewayConfig;
  readonly #adapters: ReadonlyMap<ProviderId, GatewayAdapter>;
  readonly #transport_factory: ProviderTransportFactory;
  readonly #logger: GatewayLogger;
  readonly #clock: () => string;
  readonly #sleep: (milliseconds: number, signal: AbortSignal) => Promise<void>;
  readonly #queued = new Set<string>();
  readonly #active = new Map<string, ActiveJob>();
  readonly #cancellations = new Set<Promise<void>>();
  #started = false;
  #pump_scheduled = false;
  #cleanup_timer: NodeJS.Timeout | undefined;
  #cleanup_in_flight: Promise<void> | undefined;

  constructor(options: JobWorkerOptions) {
    this.#service = options.service;
    this.#asset_store = options.asset_store;
    this.#config = options.config;
    this.#adapters = options.adapters;
    this.#transport_factory = options.transport_factory ?? {
      create: (provider) => new ProviderHttpTransport({ provider }),
    };
    this.#logger = options.logger;
    this.#clock = options.clock ?? (() => new Date().toISOString());
    this.#sleep = options.sleep ?? sleep_with_signal;
  }

  get active_count(): number {
    return this.#active.size;
  }

  async start(): Promise<void> {
    if (this.#started) {
      return;
    }
    this.#started = true;
    try {
      await this.#asset_store.initialize();
      await this.#run_cleanup();
      for (const job of this.#service_recoverable_jobs()) {
        const recovered = this.#recover_job(job);
        if (recovered) {
          this.#queued.add(job.job_id);
        }
      }
      this.#cleanup_timer = setInterval(() => {
        void this.#run_cleanup();
      }, CLEANUP_INTERVAL_MS);
      this.#schedule_pump();
    } catch (error) {
      this.#started = false;
      throw error;
    }
  }

  async stop(): Promise<void> {
    this.#started = false;
    if (this.#cleanup_timer !== undefined) {
      clearInterval(this.#cleanup_timer);
      this.#cleanup_timer = undefined;
    }
    this.#queued.clear();
    for (const active of this.#active.values()) {
      active.shutdown_requested = true;
      active.controller.abort();
    }
    while (this.#active.size > 0 || this.#cancellations.size > 0) {
      await Promise.allSettled([
        ...[...this.#active.keys()].map((job_id) => this.#wait_for_job(job_id)),
        ...this.#cancellations,
      ]);
    }
    if (this.#cleanup_in_flight !== undefined) {
      await this.#cleanup_in_flight;
    }
  }

  enqueue(job_id: string): void {
    if (!this.#started || this.#active.has(job_id)) {
      return;
    }
    const job = this.#service.get_stored_job_for_worker(job_id);
    if (job === undefined || is_terminal_state(job.state)) {
      return;
    }
    this.#queued.add(job_id);
    this.#schedule_pump();
  }

  cancel_active(job_id: string): void {
    const active = this.#active.get(job_id);
    if (active === undefined || active.cancel_requested) {
      return;
    }
    active.cancel_requested = true;
    active.controller.abort();
    if (!active.adapter.capabilities.has("cancel")) {
      return;
    }
    const job = this.#service.get_stored_job_for_worker(job_id);
    const submission =
      job !== undefined && is_queryable_submission(job.submission) ? job.submission : undefined;
    if (submission === undefined && !active.submit_in_flight) {
      return;
    }
    const cancellation_controller = new AbortController();
    const cancellation_deadline = new Promise<never>((_, reject) => {
      cancellation_controller.signal.addEventListener(
        "abort",
        () => {
          reject(new Error("Provider cancellation timed out"));
        },
        { once: true },
      );
    });
    const cancellation_timer = setTimeout(() => {
      cancellation_controller.abort();
    }, CANCEL_TIMEOUT_MS);
    const context = this.#execution_context(active, cancellation_controller.signal);
    const cancellation = Promise.race([
      Promise.resolve().then(() => active.adapter.cancel(context, submission)),
      cancellation_deadline,
    ]).catch((error: unknown) => {
      this.#logger.warn(
        {
          provider_id: job?.provider_id ?? active.adapter.provider_id,
          job_id,
          error,
        },
        "Provider cancellation failed",
      );
    });
    this.#cancellations.add(cancellation);
    void cancellation
      .finally(() => {
        clearTimeout(cancellation_timer);
        this.#cancellations.delete(cancellation);
      })
      .catch(() => undefined);
  }

  #service_recoverable_jobs(): StoredJob[] {
    const connection = this.#service.get_recovery_repository_for_worker();
    return connection.list_recoverable_for_worker();
  }

  #recover_job(job: StoredJob): boolean {
    if (job.state === "preparing") {
      const event = this.#service.transition_if_current_for_worker({
        job_id: job.job_id,
        expected_state: "preparing",
        state: "queued",
        event_type: "recovered",
        event: { state: "queued" },
        submission: EMPTY_SUBMISSION,
        error: null,
        created_at: this.#clock(),
      });
      return event !== undefined;
    }

    if (
      (job.state === "submitting" || job.state === "running") &&
      !is_queryable_submission(job.submission)
    ) {
      this.#fail_without_submission(job);
      return false;
    }
    return !is_terminal_state(job.state);
  }
  async #run_cleanup(): Promise<void> {
    const cleanup = this.#cleanup_expired();
    this.#cleanup_in_flight = cleanup;
    try {
      await cleanup;
    } finally {
      if (this.#cleanup_in_flight === cleanup) {
        this.#cleanup_in_flight = undefined;
      }
    }
  }

  async #cleanup_expired(): Promise<void> {
    try {
      const now_ms = Date.parse(this.#clock());
      if (!Number.isFinite(now_ms)) {
        throw new Error("Gateway cleanup clock returned an invalid timestamp");
      }
      const cutoff_at = new Date(
        now_ms - this.#config.retention_hours * 60 * 60 * 1_000,
      ).toISOString();
      const deleted_jobs = this.#service
        .get_recovery_repository_for_worker()
        .delete_expired(cutoff_at);
      const deleted_assets = await this.#asset_store.cleanup_orphaned_assets(cutoff_at);
      if (deleted_jobs > 0 || deleted_assets > 0) {
        this.#logger.info({ deleted_jobs, deleted_assets }, "Gateway retention cleanup completed");
      }
    } catch {
      this.#logger.error(
        { error_code: "retention_cleanup_failed" },
        "Gateway retention cleanup failed",
      );
    }
  }

  #fail_without_submission(job: StoredJob): void {
    const error: ProviderError = {
      code: "provider_unavailable",
      retryable: true,
    };
    const event = this.#service.transition_if_current_for_worker({
      job_id: job.job_id,
      expected_state: job.state,
      state: "failed",
      event_type: "recovered_without_submission",
      event: { state: "failed", error },
      error,
      created_at: this.#clock(),
    });
    if (event !== undefined) {
      this.#logger.warn(
        { job_id: job.job_id, provider_id: job.provider_id, error_code: error.code },
        "Gateway job failed during recovery",
      );
    }
  }

  #schedule_pump(): void {
    if (this.#pump_scheduled) {
      return;
    }
    this.#pump_scheduled = true;
    queueMicrotask(() => {
      this.#pump_scheduled = false;
      this.#pump();
    });
  }

  #pump(): void {
    if (!this.#started) {
      return;
    }
    while (this.#active.size < this.#config.concurrency && this.#queued.size > 0) {
      const next = this.#queued.values().next().value;
      if (next === undefined) {
        break;
      }
      this.#queued.delete(next);
      const promise = this.#run_job(next);
      void promise.finally(() => {
        this.#active.delete(next);
        this.#schedule_pump();
      });
    }
  }

  async #run_job(job_id: string): Promise<void> {
    const job = this.#service.get_stored_job_for_worker(job_id);
    if (job === undefined || is_terminal_state(job.state)) {
      return;
    }
    const provider = this.#config.provider_profiles.find(
      (candidate) => candidate.provider_id === job.provider_id,
    );
    const adapter = this.#adapters.get(job.provider_id);
    if (provider === undefined || adapter === undefined) {
      this.#fail_job(job, { code: "provider_unavailable", retryable: true });
      return;
    }
    const controller = new AbortController();
    const transport = this.#transport_factory.create(provider);
    const active: ActiveJob = {
      controller,
      adapter,
      provider,
      transport,
      owner_token_hash: job.owner_token_hash,
      submit_in_flight: false,
      shutdown_requested: false,
      cancel_requested: false,
    };
    this.#active.set(job_id, active);
    try {
      await this.#execute_job(job, active);
    } catch (error) {
      if (active.shutdown_requested) {
        return;
      }
      const normalized = normalize_provider_failure(error, controller.signal);
      if (normalized.provider_error.code === "cancelled") {
        this.#service.cancel_job_for_worker(job_id);
      } else {
        this.#fail_job_by_id(job_id, normalized.provider_error);
      }
    }
  }

  async #execute_job(job: StoredJob, active: ActiveJob): Promise<void> {
    let current = this.#service.get_stored_job_for_worker(job.job_id);
    if (current === undefined || is_terminal_state(current.state)) {
      return;
    }
    if (current.state === "queued") {
      if (!this.#transition_state(current, "preparing", "preparing")) {
        return;
      }
      current = this.#service.get_stored_job_for_worker(job.job_id);
      if (current === undefined) {
        return;
      }
    }
    if (current.state === "preparing") {
      if (!this.#transition_state(current, "submitting", "submitting")) {
        return;
      }
      current = this.#service.get_stored_job_for_worker(job.job_id);
      if (current === undefined) {
        return;
      }
    }
    if (current.state === "submitting" && !is_queryable_submission(current.submission)) {
      let submission: ProviderSubmission;
      active.submit_in_flight = true;
      try {
        submission = await active.adapter.submit(
          this.#execution_context(active, active.controller.signal),
          current.request,
        );
      } finally {
        active.submit_in_flight = false;
      }
      if (submission.state === "completed") {
        await this.#complete_job(current, submission.result, submission.output_assets);
        return;
      }
      const persisted = this.#service.transition_if_current_for_worker({
        job_id: current.job_id,
        expected_state: "submitting",
        state: "running",
        event_type: "submitted",
        event: { state: "running" },
        submission,
        created_at: this.#clock(),
      });
      if (persisted === undefined) {
        return;
      }
      current = this.#service.get_stored_job_for_worker(job.job_id);
      if (current === undefined) {
        return;
      }
    }
    if (
      (current.state === "submitting" || current.state === "running") &&
      is_queryable_submission(current.submission)
    ) {
      await this.#poll_until_terminal(current, active, current.submission);
    }
  }

  async #poll_until_terminal(
    job: StoredJob,
    active: ActiveJob,
    submission: QueryableProviderSubmission,
  ): Promise<void> {
    let current = job;
    let next_delay = submission.poll_after_ms ?? DEFAULT_POLL_DELAY_MS;
    while (!active.controller.signal.aborted) {
      if (current.state === "submitting") {
        const running = this.#service.transition_if_current_for_worker({
          job_id: current.job_id,
          expected_state: "submitting",
          state: "running",
          event_type: "running",
          event: { state: "running" },
          submission,
          created_at: this.#clock(),
        });
        if (running === undefined) {
          return;
        }
        current = this.#service.get_stored_job_for_worker(current.job_id) ?? current;
      }
      await this.#sleep(
        Math.min(Math.max(0, next_delay), MAX_POLL_DELAY_MS),
        active.controller.signal,
      );
      if (active.shutdown_requested) {
        return;
      }
      const result = await active.adapter.poll(
        this.#execution_context(active, active.controller.signal),
        submission,
      );
      if (!this.#started) {
        return;
      }
      if (result.state === "pending") {
        next_delay = result.poll_after_ms ?? DEFAULT_POLL_DELAY_MS;
        continue;
      }
      if (result.state === "failed") {
        this.#fail_job_by_id(current.job_id, result.error);
        return;
      }
      await this.#complete_job(current, result.result, result.output_assets);
      return;
    }
  }

  async #complete_job(
    job: StoredJob,
    result: ImageGenerationResult,
    output_assets: readonly ProviderOutputAsset[],
  ): Promise<void> {
    const parsed_result = ImageGenerationResultSchema.parse(result);
    if (parsed_result.assets.length !== output_assets.length) {
      throw new Error("Provider output asset count is inconsistent");
    }
    const image_ids: string[] = [];
    for (const [position, output_asset] of output_assets.entries()) {
      const generated = parsed_result.assets[position];
      if (generated === undefined) {
        throw new Error("Provider output asset is missing metadata");
      }
      const stored = await this.#asset_store.register_generated_asset(
        { asset: generated, bytes: output_asset.bytes },
        this.#clock(),
        job.owner_token_hash,
      );
      image_ids.push(stored.asset_id);
    }
    this.#service.complete_with_assets_for_worker({
      job_id: job.job_id,
      expected_state: job.state,
      asset_ids: image_ids,
      created_at: this.#clock(),
    });
  }

  #transition_state(job: StoredJob, state: GenerationState, event_type: string): boolean {
    const parsed_state = GenerationStateSchema.parse(state);
    return (
      this.#service.transition_if_current_for_worker({
        job_id: job.job_id,
        expected_state: job.state,
        state: parsed_state,
        event_type,
        event: { state: parsed_state },
        created_at: this.#clock(),
      }) !== undefined
    );
  }

  #fail_job(job: StoredJob, error: ProviderError): void {
    this.#fail_job_by_id(job.job_id, error);
  }

  #fail_job_by_id(job_id: string, error: ProviderError): void {
    const current = this.#service.get_stored_job_for_worker(job_id);
    if (current === undefined || is_terminal_state(current.state)) {
      return;
    }
    this.#service.transition_if_current_for_worker({
      job_id: current.job_id,
      expected_state: current.state,
      state: "failed",
      event_type: "failed",
      event: { state: "failed", error },
      error,
      created_at: this.#clock(),
    });
  }

  #execution_context(active: ActiveJob, signal: AbortSignal): ProviderExecutionContext {
    return {
      profile: active.provider.profile,
      transport: active.transport,
      assets: {
        read: (asset_id, asset_signal) =>
          this.#asset_store.read_provider_asset(asset_id, asset_signal, active.owner_token_hash),
      },
      signal,
      log: {
        write: (record) => {
          this.#logger.info(record);
        },
      },
    };
  }

  async #wait_for_job(job_id: string): Promise<void> {
    while (this.#active.has(job_id)) {
      await new Promise<void>((resolve) => setTimeout(resolve, 0));
    }
  }
}

function is_terminal_state(state: GenerationState): boolean {
  return (
    state === "completed" ||
    state === "failed" ||
    state === "cancelled" ||
    state === "attached" ||
    state === "orphaned"
  );
}

function is_queryable_submission(value: unknown): value is QueryableProviderSubmission {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const candidate = value as { readonly state?: unknown; readonly submission_id?: unknown };
  return (
    candidate.state === "pending" &&
    typeof candidate.submission_id === "string" &&
    candidate.submission_id.length > 0
  );
}

async function sleep_with_signal(milliseconds: number, signal: AbortSignal): Promise<void> {
  if (signal.aborted || milliseconds <= 0) {
    return;
  }
  await new Promise<void>((resolve, reject) => {
    let settled = false;
    const cleanup = (): void => {
      clearTimeout(timer);
      signal.removeEventListener("abort", abort);
    };
    const resolve_timer = (): void => {
      if (settled) {
        return;
      }
      settled = true;
      cleanup();
      resolve();
    };
    const abort = (): void => {
      if (settled) {
        return;
      }
      settled = true;
      cleanup();
      reject(new DOMException("The operation was aborted", "AbortError"));
    };
    const timer = setTimeout(resolve_timer, milliseconds);
    signal.addEventListener("abort", abort, { once: true });
    if (signal.aborted) {
      abort();
    }
  });
}
