import { randomUUID } from "node:crypto";

import {
  GatewayCreateJobRequestSchema,
  GatewayJobEventSchema,
  GatewayJobResponseSchema,
  GenerationStateSchema,
  ImageGenerationRequestSchema,
  ProviderErrorSchema,
  type GatewayJobEvent,
  type GatewayJobResponse,
  type GenerationState,
  type ImageGenerationRequest,
  type ProviderError,
} from "@tavern-canvas/contracts";
import { novelai_request_asset_ids } from "@tavern-canvas/providers/adapters";

import type { GatewayConfig } from "../config/config_schema.js";
import { GatewayHttpError } from "../http/error_handler.js";
import {
  JobQueueFullError,
  OwnerTokenHashSchema,
  type CompleteJobInput,
  type ConditionalJobTransitionInput,
  type JobRepository,
  type JobTransitionInput,
  type OwnerTokenHash,
  type StoredJob,
  type StoredJobEvent,
} from "../persistence/job_repository.js";
import type { AssetRepository } from "../persistence/asset_repository.js";
export interface JobServiceOptions {
  readonly job_repository: JobRepository;
  readonly asset_repository: AssetRepository;
  readonly config: GatewayConfig;
  readonly clock?: () => string;
  readonly uuid_factory?: () => string;
}

export interface CreateJobInput {
  readonly protocol_version: unknown;
  readonly request: unknown;
  readonly owner_token_hash: OwnerTokenHash;
}

export interface CreateJobResult {
  readonly job: GatewayJobResponse;
  readonly created: boolean;
}

export type JobEventListener = (event: StoredJobEvent) => void;

export class JobService {
  readonly #job_repository: JobRepository;
  readonly #asset_repository: AssetRepository;
  readonly #config: GatewayConfig;
  readonly #clock: () => string;
  readonly #uuid_factory: () => string;
  readonly #listeners = new Map<string, Set<JobEventListener>>();

  constructor(options: JobServiceOptions) {
    this.#job_repository = options.job_repository;
    this.#asset_repository = options.asset_repository;
    this.#config = options.config;
    this.#clock = options.clock ?? (() => new Date().toISOString());
    this.#uuid_factory = options.uuid_factory ?? randomUUID;
  }

  create_job(input: CreateJobInput): CreateJobResult {
    const owner_token_hash = OwnerTokenHashSchema.parse(input.owner_token_hash);
    const parsed = GatewayCreateJobRequestSchema.parse({
      protocol_version: input.protocol_version,
      request: input.request,
    });
    const request = ImageGenerationRequestSchema.parse(parsed.request);
    const provider = this.#config.provider_profiles.find(
      (candidate) => candidate.provider_id === request.provider_id,
    );
    if (provider === undefined) {
      throw new GatewayHttpError(400, "provider_not_configured");
    }
    validate_provider_request(provider.profile, request);
    this.#assert_referenced_assets_exist(request, owner_token_hash);
    let created: { readonly job: StoredJob; readonly created: boolean };
    try {
      created = this.#job_repository.create_or_get(
        {
          job_id: this.#uuid_factory(),
          owner_token_hash,
          request,
          created_at: this.#clock(),
        },
        this.#config.max_pending_jobs,
      );
    } catch (error) {
      if (error instanceof JobQueueFullError) {
        throw new GatewayHttpError(429, "queue_full", { retryable: true });
      }
      throw error;
    }
    return {
      job: this.to_public_job(created.job),
      created: created.created,
    };
  }

  get_job_for_owner(
    job_id: string,
    owner_token_hash: OwnerTokenHash,
  ): GatewayJobResponse | undefined {
    const job = this.#job_repository.get_by_id_for_owner(job_id, owner_token_hash);
    return job === undefined ? undefined : this.to_public_job(job);
  }

  get_stored_job_for_owner(
    job_id: string,
    owner_token_hash: OwnerTokenHash,
  ): StoredJob | undefined {
    return this.#job_repository.get_by_id_for_owner(job_id, owner_token_hash);
  }

  get_stored_job_for_worker(job_id: string): StoredJob | undefined {
    return this.#job_repository.get_by_id_for_worker(job_id);
  }

  get_recovery_repository_for_worker(): JobRepository {
    return this.#job_repository;
  }

  list_events_for_owner(
    job_id: string,
    owner_token_hash: OwnerTokenHash,
    after_sequence = 0,
  ): GatewayJobEvent[] {
    const stored_job = this.#job_repository.get_by_id_for_owner(job_id, owner_token_hash);
    if (stored_job === undefined) {
      return [];
    }
    return this.#job_repository
      .list_events_for_owner(stored_job.job_id, owner_token_hash, after_sequence)
      .map((event) => this.to_public_event(event));
  }

  subscribe_for_owner(
    job_id: string,
    owner_token_hash: OwnerTokenHash,
    listener: JobEventListener,
  ): () => void {
    if (this.#job_repository.get_by_id_for_owner(job_id, owner_token_hash) === undefined) {
      throw new GatewayHttpError(404, "job_not_found");
    }
    const listeners = this.#listeners.get(job_id) ?? new Set<JobEventListener>();
    listeners.add(listener);
    this.#listeners.set(job_id, listeners);
    return () => {
      const current = this.#listeners.get(job_id);
      if (current === undefined) {
        return;
      }
      current.delete(listener);
      if (current.size === 0) {
        this.#listeners.delete(job_id);
      }
    };
  }

  transition_for_worker(input: JobTransitionInput): StoredJobEvent {
    const event = this.#job_repository.transition_with_event_for_worker(input);
    this.#publish(event);
    return event;
  }

  transition_if_current_for_worker(
    input: ConditionalJobTransitionInput,
  ): StoredJobEvent | undefined {
    const event = this.#job_repository.transition_if_current_for_worker(input);
    if (event !== undefined) {
      this.#publish(event);
    }
    return event;
  }

  complete_with_assets_for_worker(input: CompleteJobInput): StoredJobEvent | undefined {
    const event = this.#job_repository.complete_with_assets_for_worker(input);
    if (event !== undefined) {
      this.#publish(event);
    }
    return event;
  }

  cancel_job_for_owner(job_id: string, owner_token_hash: OwnerTokenHash): boolean {
    return this.#cancel_stored_job(
      this.#job_repository.get_by_id_for_owner(job_id, owner_token_hash),
    );
  }

  cancel_job_for_worker(job_id: string): boolean {
    return this.#cancel_stored_job(this.#job_repository.get_by_id_for_worker(job_id));
  }

  #cancel_stored_job(stored_job: StoredJob | undefined): boolean {
    if (stored_job === undefined) {
      return false;
    }
    if (is_terminal_state(stored_job.state)) {
      return true;
    }
    const error: ProviderError = { code: "cancelled", retryable: false };
    const event = this.#job_repository.transition_if_current_for_worker({
      job_id: stored_job.job_id,
      expected_state: stored_job.state,
      state: "cancelled",
      event_type: "cancelled",
      event: { state: "cancelled", error },
      error,
      created_at: this.#clock(),
    });
    if (event !== undefined) {
      this.#publish(event);
    }
    return true;
  }

  to_public_job(job: StoredJob): GatewayJobResponse {
    const image_ids =
      job.state === "completed"
        ? this.#asset_repository.list_for_job_for_worker(job.job_id).map((asset) => asset.asset_id)
        : [];
    const error = job.error === null ? undefined : job.error;
    return GatewayJobResponseSchema.parse({
      protocol_version: "1.0",
      job_id: job.job_id,
      request_id: job.request_id,
      provider_id: job.provider_id,
      state: job.state,
      ...(image_ids.length === 0 ? {} : { image_ids }),
      ...(error === undefined ? {} : { error }),
    });
  }
  to_public_event(event: StoredJobEvent): GatewayJobEvent {
    const event_data = is_record(event.event) ? event.event : {};
    const state = GenerationStateSchema.parse(event_data.state ?? "queued");
    const image_ids = parse_image_ids(event_data.image_ids);
    const error = parse_public_error(event_data.error);
    return GatewayJobEventSchema.parse({
      protocol_version: "1.0",
      job_id: event.job_id,
      sequence: event.sequence,
      state,
      occurred_at: event.created_at,
      ...(image_ids === undefined ? {} : { image_ids }),
      ...(error === undefined ? {} : { error }),
    });
  }

  #publish(event: StoredJobEvent): void {
    const listeners = this.#listeners.get(event.job_id);
    if (listeners === undefined) {
      return;
    }
    for (const listener of listeners) {
      listener(event);
    }
  }

  #assert_referenced_assets_exist(
    request: ImageGenerationRequest,
    owner_token_hash: OwnerTokenHash,
  ): void {
    for (const asset_id of referenced_asset_ids(request)) {
      if (this.#asset_repository.get_by_id_for_owner(asset_id, owner_token_hash) === undefined) {
        throw new GatewayHttpError(400, "invalid_request");
      }
    }
  }
}

function validate_provider_request(
  profile: GatewayConfig["provider_profiles"][number]["profile"] & {
    readonly workflow_allowlist?: readonly string[];
  },
  request: ImageGenerationRequest,
): void {
  if (
    "model_id" in request &&
    typeof request.model_id === "string" &&
    !profile.model_allowlist.includes(request.model_id)
  ) {
    throw new GatewayHttpError(400, "invalid_request");
  }
  if (request.provider_id === "comfyui") {
    if (
      profile.workflow_allowlist === undefined ||
      !profile.workflow_allowlist.includes(request.workflow_id)
    ) {
      throw new GatewayHttpError(400, "invalid_request");
    }
  }
  if (
    request.provider_id === "openai_image" &&
    !profile.output_mime_type_allowlist.includes(output_mime_type_for_openai(request.output_format))
  ) {
    throw new GatewayHttpError(400, "invalid_request");
  }
}

function output_mime_type_for_openai(
  format: "png" | "jpeg" | "webp",
): "image/png" | "image/jpeg" | "image/webp" {
  switch (format) {
    case "png":
      return "image/png";
    case "jpeg":
      return "image/jpeg";
    case "webp":
      return "image/webp";
  }
}

function referenced_asset_ids(request: ImageGenerationRequest): string[] {
  const result: string[] = [];
  const add = (value: string | undefined): void => {
    if (value !== undefined && !result.includes(value)) {
      result.push(value);
    }
  };
  switch (request.provider_id) {
    case "sd_webui":
      add(request.input_asset_id);
      for (const reference of request.controlnet ?? []) {
        add(reference.asset_id);
      }
      break;
    case "novelai":
      for (const asset_id of novelai_request_asset_ids(request)) {
        add(asset_id);
      }
      break;
    case "comfyui":
      for (const asset_id of Object.values(request.input_asset_bindings)) {
        add(asset_id);
      }
      break;
    case "openai_image":
      for (const asset_id of request.input_asset_ids) {
        add(asset_id);
      }
      add(request.mask_asset_id);
      break;
    case "google_image":
      for (const asset_id of request.reference_asset_ids) {
        add(asset_id);
      }
      break;
  }
  return result;
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

function parse_public_error(value: unknown): ProviderError | undefined {
  const parsed = ProviderErrorSchema.safeParse(value);
  return parsed.success ? parsed.data : undefined;
}

function parse_image_ids(value: unknown): string[] | undefined {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    return undefined;
  }
  return value as string[];
}

function is_record(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
