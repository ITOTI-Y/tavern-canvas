import { sha256 } from "@noble/hashes/sha2.js";
import { bytesToHex, utf8ToBytes } from "@noble/hashes/utils.js";
import {
  ImageIdSchema,
  JobIdSchema,
  ProviderIdSchema,
  RequestIdSchema,
  RequestImageArgumentsSchema,
  Sha256Schema,
  type GenerationState,
  type ProviderError,
  type ProviderId,
} from "@tavern-canvas/contracts";

import { canonical_json } from "../generation/canonical_json.js";
import {
  snapshot_generation_job,
  SystemJobTimeSource,
  type EnqueueGenerationJobRequest,
  type GenerationJob,
  type GenerationJobSnapshot,
  type JobIdSource,
  type JobTimeSource,
} from "./generation_job.js";
import { JobExecutorFailure, type JobExecutionControl, type JobExecutor } from "./job_executor.js";
import { transition_generation_job } from "./job_state_machine.js";

export const DEFAULT_GLOBAL_JOB_CONCURRENCY = 4;

export interface JobPersistencePort {
  save(job: GenerationJobSnapshot): Promise<void>;
}

export type GenerationJobListener = (job: GenerationJobSnapshot) => void;

export interface ImageJobQueueOptions {
  readonly executor: JobExecutor;
  readonly persistence: JobPersistencePort;
  readonly job_id_source: JobIdSource;
  readonly time_source?: JobTimeSource;
  readonly global_concurrency?: number;
  readonly provider_concurrency?: Partial<Record<ProviderId, number>>;
}

interface JobRecord {
  job: GenerationJob;
  readonly controller: AbortController;
  operation: Promise<void>;
  cancel_requested: boolean;
  queued: boolean;
}

interface ValidatedEnqueueRequest {
  readonly request_id: string;
  readonly generation_anchor: string;
  readonly source_anchor: string;
  readonly chat_id: string;
  readonly requested_swipe_id: number;
  readonly provider_id: ProviderId;
  readonly arguments: ReturnType<typeof RequestImageArgumentsSchema.parse>;
  readonly automatic: boolean;
}

function validate_concurrency(value: number, name: string): number {
  if (!Number.isInteger(value) || value < 1) {
    throw new RangeError(`${name} must be a positive integer`);
  }
  return value;
}

function validate_request(request: EnqueueGenerationJobRequest): ValidatedEnqueueRequest {
  const generation_anchor = Sha256Schema.parse(request.generation_anchor);
  const arguments_ = Object.freeze(RequestImageArgumentsSchema.parse(request.arguments));
  if (arguments_.generation_anchor !== generation_anchor) {
    throw new TypeError("Image job arguments must use the job generation anchor");
  }
  if (request.chat_id.trim().length === 0) {
    throw new TypeError("Image job chat ID must not be empty");
  }
  if (!Number.isInteger(request.requested_swipe_id) || request.requested_swipe_id < 0) {
    throw new RangeError("Image job requested swipe ID must be a non-negative integer");
  }
  return {
    request_id: RequestIdSchema.parse(request.request_id),
    generation_anchor,
    source_anchor: Sha256Schema.parse(request.source_anchor),
    chat_id: request.chat_id,
    requested_swipe_id: request.requested_swipe_id,
    provider_id: ProviderIdSchema.parse(request.provider_id),
    arguments: arguments_,
    automatic: request.automatic,
  };
}

function request_digest(request: ValidatedEnqueueRequest): string {
  const digest_input = `${request.generation_anchor}${canonical_json(request.arguments)}`;
  return bytesToHex(sha256(utf8ToBytes(digest_input)));
}

function clone_job(job: GenerationJob): GenerationJob {
  return {
    ...job,
    arguments: { ...job.arguments },
    error: job.error === null ? null : { ...job.error },
    image_ids: [...job.image_ids],
  };
}

function provider_error_from(error: unknown): ProviderError {
  if (error instanceof JobExecutorFailure) {
    return { ...error.provider_error };
  }
  return { code: "provider_unavailable", retryable: false };
}

export class ImageJobQueue {
  readonly #executor: JobExecutor;
  readonly #persistence: JobPersistencePort;
  readonly #job_id_source: JobIdSource;
  readonly #time_source: JobTimeSource;
  readonly #global_concurrency: number;
  readonly #provider_concurrency = new Map<ProviderId, number>();
  readonly #provider_queues = new Map<ProviderId, JobRecord[]>();
  readonly #running_by_provider = new Map<ProviderId, number>();
  readonly #records = new Map<string, JobRecord>();
  readonly #automatic_jobs_by_digest = new Map<string, string>();
  readonly #pending_automatic_jobs = new Map<string, Promise<GenerationJobSnapshot>>();
  readonly #listeners = new Set<GenerationJobListener>();
  readonly #provider_order = ProviderIdSchema.options;
  #running_jobs = 0;
  #round_robin_cursor = 0;
  #drain_scheduled = false;

  constructor(options: ImageJobQueueOptions) {
    this.#executor = options.executor;
    this.#persistence = options.persistence;
    this.#job_id_source = options.job_id_source;
    this.#time_source = options.time_source ?? new SystemJobTimeSource();
    this.#global_concurrency = validate_concurrency(
      options.global_concurrency ?? DEFAULT_GLOBAL_JOB_CONCURRENCY,
      "Global job concurrency",
    );

    for (const provider_id of this.#provider_order) {
      const configured_limit = options.provider_concurrency?.[provider_id];
      const limit =
        configured_limit === undefined
          ? this.#global_concurrency
          : validate_concurrency(configured_limit, `Concurrency for ${provider_id}`);
      this.#provider_concurrency.set(provider_id, limit);
      this.#provider_queues.set(provider_id, []);
      this.#running_by_provider.set(provider_id, 0);
    }
  }

  enqueue(request: EnqueueGenerationJobRequest): Promise<GenerationJobSnapshot> {
    const validated = validate_request(request);
    const digest = request_digest(validated);

    if (validated.automatic) {
      const existing_job_id = this.#automatic_jobs_by_digest.get(digest);
      if (existing_job_id !== undefined) {
        const existing_job = this.get(existing_job_id);
        if (existing_job !== null) {
          return Promise.resolve(existing_job);
        }
      }
      const pending_job = this.#pending_automatic_jobs.get(digest);
      if (pending_job !== undefined) {
        return pending_job;
      }
      const creation = this.#create_job(validated, digest);
      this.#pending_automatic_jobs.set(digest, creation);
      const clear_pending = () => {
        if (this.#pending_automatic_jobs.get(digest) === creation) {
          this.#pending_automatic_jobs.delete(digest);
        }
      };
      void creation.then(clear_pending, clear_pending);
      return creation;
    }

    return this.#create_job(validated, digest);
  }

  get(job_id: string): GenerationJobSnapshot | null {
    const record = this.#records.get(job_id);
    return record === undefined ? null : snapshot_generation_job(record.job);
  }

  subscribe(listener: GenerationJobListener): () => void {
    this.#listeners.add(listener);
    let disposed = false;
    return () => {
      if (disposed) {
        return;
      }
      disposed = true;
      this.#listeners.delete(listener);
    };
  }

  async cancel(job_id: string): Promise<GenerationJobSnapshot> {
    const record = this.#records.get(job_id);
    if (record === undefined) {
      throw new Error(`Generation job ${job_id} does not exist`);
    }
    if (record.job.state === "cancelled") {
      return snapshot_generation_job(record.job);
    }

    record.cancel_requested = true;
    record.controller.abort();
    if (record.queued) {
      this.#remove_from_provider_queue(record);
    }
    const snapshot = await this.#serialize(record, async () => {
      if (record.job.state !== "cancelled") {
        await this.#transition(record, "cancelled");
      }
      return snapshot_generation_job(record.job);
    });
    this.#schedule_drain();
    return snapshot;
  }

  mark_attached(job_id: string): Promise<GenerationJobSnapshot> {
    return this.#mark_completed(job_id, "attached");
  }

  mark_orphaned(job_id: string): Promise<GenerationJobSnapshot> {
    return this.#mark_completed(job_id, "orphaned");
  }

  #mark_completed(job_id: string, state: "attached" | "orphaned"): Promise<GenerationJobSnapshot> {
    const record = this.#records.get(job_id);
    if (record === undefined) {
      return Promise.reject(new Error(`Generation job ${job_id} does not exist`));
    }
    return this.#serialize(record, async () => {
      if (record.job.state !== state) {
        await this.#transition(record, state);
      }
      return snapshot_generation_job(record.job);
    });
  }

  async #create_job(
    request: ValidatedEnqueueRequest,
    digest: string,
  ): Promise<GenerationJobSnapshot> {
    const timestamp = this.#time_source.now().toISOString();
    const job: GenerationJob = {
      job_id: JobIdSchema.parse(this.#job_id_source.next()),
      request_id: request.request_id,
      request_digest: digest,
      generation_anchor: request.generation_anchor,
      source_anchor: request.source_anchor,
      chat_id: request.chat_id,
      requested_swipe_id: request.requested_swipe_id,
      provider_id: request.provider_id,
      arguments: request.arguments,
      state: "queued",
      created_at: timestamp,
      updated_at: timestamp,
      error: null,
      image_ids: [],
    };
    const snapshot = snapshot_generation_job(job);
    await this.#persistence.save(snapshot);

    const record: JobRecord = {
      job,
      controller: new AbortController(),
      operation: Promise.resolve(),
      cancel_requested: false,
      queued: true,
    };
    this.#records.set(job.job_id, record);
    if (request.automatic) {
      this.#automatic_jobs_by_digest.set(digest, job.job_id);
    }
    this.#provider_queues.get(job.provider_id)?.push(record);
    this.#publish(snapshot);
    this.#schedule_drain();
    return snapshot;
  }

  #schedule_drain(): void {
    if (this.#drain_scheduled) {
      return;
    }
    this.#drain_scheduled = true;
    queueMicrotask(() => {
      this.#drain_scheduled = false;
      this.#drain();
    });
  }

  #drain(): void {
    while (this.#running_jobs < this.#global_concurrency) {
      const provider_id = this.#next_provider();
      if (provider_id === null) {
        return;
      }
      const provider_queue = this.#provider_queues.get(provider_id);
      const record = provider_queue?.shift();
      if (record === undefined) {
        continue;
      }
      record.queued = false;
      this.#running_jobs += 1;
      this.#running_by_provider.set(
        provider_id,
        (this.#running_by_provider.get(provider_id) ?? 0) + 1,
      );
      void this.#execute(record).finally(() => {
        this.#running_jobs -= 1;
        this.#running_by_provider.set(
          provider_id,
          Math.max(0, (this.#running_by_provider.get(provider_id) ?? 1) - 1),
        );
        this.#schedule_drain();
      });
    }
  }

  #next_provider(): ProviderId | null {
    for (let offset = 0; offset < this.#provider_order.length; offset += 1) {
      const index = (this.#round_robin_cursor + offset) % this.#provider_order.length;
      const provider_id = this.#provider_order[index];
      if (provider_id === undefined) {
        continue;
      }
      const queued_count = this.#provider_queues.get(provider_id)?.length ?? 0;
      const running_count = this.#running_by_provider.get(provider_id) ?? 0;
      const provider_limit = this.#provider_concurrency.get(provider_id) ?? 0;
      if (queued_count > 0 && running_count < provider_limit) {
        this.#round_robin_cursor = (index + 1) % this.#provider_order.length;
        return provider_id;
      }
    }
    return null;
  }

  async #execute(record: JobRecord): Promise<void> {
    const should_execute = await this.#serialize(record, async () => {
      if (record.cancel_requested) {
        await this.#transition(record, "cancelled");
        return false;
      }
      await this.#transition(record, "preparing");
      if (record.controller.signal.aborted) {
        await this.#transition(record, "cancelled");
        return false;
      }
      await this.#transition(record, "submitting");
      return true;
    });
    if (!should_execute || record.cancel_requested) {
      return;
    }

    const control: JobExecutionControl = {
      signal: record.controller.signal,
      mark_running: async () => {
        await this.#serialize(record, async () => {
          if (!record.cancel_requested && record.job.state === "submitting") {
            await this.#transition(record, "running");
          }
        });
      },
    };

    try {
      const result = await this.#executor.execute(snapshot_generation_job(record.job), control);
      const image_ids = result.image_ids.map((image_id) => ImageIdSchema.parse(image_id));
      if (image_ids.length === 0) {
        throw new JobExecutorFailure({ code: "malformed_response", retryable: false });
      }
      await this.#serialize(record, async () => {
        if (record.cancel_requested || record.job.state === "cancelled") {
          return;
        }
        const draft = clone_job(record.job);
        draft.image_ids = image_ids;
        await this.#transition(record, "completed", draft);
      });
    } catch (error) {
      await this.#serialize(record, async () => {
        if (record.cancel_requested || record.job.state === "cancelled") {
          return;
        }
        const draft = clone_job(record.job);
        draft.error = provider_error_from(error);
        await this.#transition(record, "failed", draft);
      });
    }
  }

  async #transition(
    record: JobRecord,
    state: GenerationState,
    draft = clone_job(record.job),
  ): Promise<GenerationJobSnapshot> {
    transition_generation_job(draft, state, this.#time_source.now().toISOString());
    const snapshot = snapshot_generation_job(draft);
    await this.#persistence.save(snapshot);
    record.job = draft;
    this.#publish(snapshot);
    return snapshot;
  }

  #serialize<T>(record: JobRecord, operation: () => Promise<T>): Promise<T> {
    const result = record.operation.then(operation);
    record.operation = result.then(
      () => undefined,
      () => undefined,
    );
    return result;
  }

  #remove_from_provider_queue(record: JobRecord): void {
    const provider_queue = this.#provider_queues.get(record.job.provider_id);
    if (provider_queue === undefined) {
      return;
    }
    const index = provider_queue.indexOf(record);
    if (index >= 0) {
      provider_queue.splice(index, 1);
    }
    record.queued = false;
  }

  #publish(snapshot: GenerationJobSnapshot): void {
    for (const listener of this.#listeners) {
      listener(snapshot);
    }
  }
}
