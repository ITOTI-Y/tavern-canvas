import {
  ImageIdSchema,
  ProviderErrorSchema,
  type ImageGenerationRequest,
  type ProviderId,
  type RequestId,
  type Sha256,
} from "@tavern-canvas/contracts";
import {
  ImageJobQueue,
  JobExecutorFailure,
  type EnqueueGenerationJobRequest,
  type GenerationJobSnapshot,
  type JobExecutionControl,
  type JobExecutionResult,
  type JobExecutor,
  type JobPersistencePort,
} from "@tavern-canvas/core";
import type {
  ProviderAdapter,
  ProviderAssetReader,
  ProviderExecutionContext,
  ProviderLogSink,
  ProviderOutputAsset,
  ProviderProfile,
  ProviderTransport,
} from "@tavern-canvas/providers";
import { ProviderTransportBoundaryError } from "@tavern-canvas/providers";
import {
  create_generation_job_repository,
  type GenerationJob,
  type StorageDatabase,
} from "@tavern-canvas/storage";

export class IndexedDbJobPersistence implements JobPersistencePort {
  readonly #database: StorageDatabase;
  readonly #namespace: string;

  constructor(database: StorageDatabase, namespace: string) {
    this.#database = database;
    this.#namespace = namespace;
  }

  async save(job: GenerationJobSnapshot): Promise<void> {
    const repository = create_generation_job_repository(this.#database);
    const record: GenerationJob = {
      schema_version: 1,
      id: job.job_id,
      namespace: this.#namespace,
      record_key: `${this.#namespace}:${job.job_id}`,
      created_at: job.created_at,
      updated_at: job.updated_at,
      request_id: job.request_id,
      request_digest: job.request_digest,
      generation_anchor: job.generation_anchor,
      source_anchor: job.source_anchor,
      chat_id: job.chat_id,
      requested_swipe_id: job.requested_swipe_id,
      provider_id: job.provider_id,
      arguments: job.arguments,
      state: job.state,
      error: job.error,
      image_ids: [...job.image_ids],
    };
    await repository.put(this.#namespace, record);
  }
}

// Plans are keyed by request_id (known before enqueue) so registration cannot race the queue's microtask-scheduled drain.

export class MediaExecutionPlanRegistry {
  readonly #requests = new Map<string, ImageGenerationRequest>();

  register(request: ImageGenerationRequest): void {
    this.#requests.set(request.request_id, request);
  }

  take(request_id: string): ImageGenerationRequest | undefined {
    const request = this.#requests.get(request_id);
    this.#requests.delete(request_id);
    return request;
  }
}

export interface PutMediaImageInput {
  readonly id: string;
  readonly bytes: Uint8Array;
  readonly claimed_media_type: string;
  readonly created_at: string;
  readonly metadata: Record<string, unknown>;
}

export interface CachedSourceAsset {
  readonly bytes: Uint8Array;
  readonly media_type: string;
}

export interface ImageStorePort {
  put_image(input: PutMediaImageInput): Promise<{ readonly id: string }>;
  read_image(id: string): Promise<CachedSourceAsset | null>;
}

export interface IdSource {
  next(): string;
}

export interface ClockPort {
  now(): string;
}

export interface SourceMessageIdentity {
  readonly chat_id: string;
  readonly message_id: string;
  readonly swipe_id: number;
}

export interface GeneratedImageBytes {
  readonly bytes: Uint8Array;
  readonly media_type: string;
}

export interface GeneratedImageStoreDeps {
  readonly store: ImageStorePort;
  readonly ids: IdSource;
  readonly clock: ClockPort;
  readonly resolve_source_message: (job: GenerationJobSnapshot) => SourceMessageIdentity | null;
}

export async function persist_generated_images(
  deps: GeneratedImageStoreDeps,
  job: GenerationJobSnapshot,
  outputs: readonly GeneratedImageBytes[],
): Promise<readonly ReturnType<typeof ImageIdSchema.parse>[]> {
  const source_message = deps.resolve_source_message(job);
  const image_ids: string[] = [];
  for (const output of outputs) {
    const id = deps.ids.next();
    await deps.store.put_image({
      id,
      bytes: output.bytes,
      claimed_media_type: output.media_type,
      created_at: deps.clock.now(),
      metadata: {
        provider_id: job.provider_id,
        source_message,
        generation_parameters: job.arguments,
      },
    });
    image_ids.push(id);
  }
  return image_ids.map((id) => ImageIdSchema.parse(id));
}

const DEFAULT_POLL_INTERVAL_MS = 1_000;

/** The queue records only a JobExecutorFailure's code; any other error is stored as `provider_unavailable`. */
function provider_failure(error: unknown): unknown {
  if (error instanceof ProviderTransportBoundaryError) {
    return new JobExecutorFailure({
      code: error.code === "configuration" ? "not_configured" : "malformed_response",
      retryable: false,
    });
  }
  if (error instanceof Error && "provider_error" in error) {
    const parsed = ProviderErrorSchema.safeParse(error.provider_error);
    if (parsed.success) {
      return new JobExecutorFailure(parsed.data);
    }
  }
  return error;
}

export interface ProviderProfileResolver {
  resolve(provider_id: ProviderId): Promise<ProviderProfile>;
}

export interface MediaJobExecutorDeps extends GeneratedImageStoreDeps {
  readonly load_adapters: () => Promise<
    Partial<Record<ProviderId, ProviderAdapter<ImageGenerationRequest>>>
  >;
  readonly profiles: ProviderProfileResolver;
  readonly transport: ProviderTransport;
  readonly assets: ProviderAssetReader;
  readonly log: ProviderLogSink;
  readonly plans: MediaExecutionPlanRegistry;
  /** Provider-specific finishing applied to adapter outputs before they are stored. */
  readonly postprocess?: (
    request: ImageGenerationRequest,
    outputs: readonly ProviderOutputAsset[],
  ) => Promise<readonly ProviderOutputAsset[]>;
  /** Injectable so tests never wait on a real poll interval. */
  readonly wait?: (milliseconds: number) => Promise<void>;
}

export class MediaJobExecutor implements JobExecutor {
  readonly #deps: MediaJobExecutorDeps;
  readonly #wait: (milliseconds: number) => Promise<void>;

  constructor(deps: MediaJobExecutorDeps) {
    this.#deps = deps;
    this.#wait = deps.wait ?? ((ms) => new Promise((resolve) => setTimeout(resolve, ms)));
  }

  async execute(
    job: GenerationJobSnapshot,
    control: JobExecutionControl,
  ): Promise<JobExecutionResult> {
    const request = this.#deps.plans.take(job.request_id);
    if (request === undefined) {
      throw new JobExecutorFailure({ code: "invalid_request", retryable: false });
    }

    let adapter_outputs: readonly ProviderOutputAsset[];
    try {
      adapter_outputs = await this.#execute_adapter(request, control);
    } catch (error) {
      throw provider_failure(error);
    }
    const outputs = await this.#finish(request, adapter_outputs);

    let image_ids: readonly string[];
    try {
      image_ids = await this.#persist_outputs(job, outputs);
    } catch {
      throw new JobExecutorFailure({ code: "storage_failed", retryable: false });
    }
    return { image_ids };
  }

  async #execute_adapter(
    request: ImageGenerationRequest,
    control: JobExecutionControl,
  ): Promise<readonly ProviderOutputAsset[]> {
    const adapter = (await this.#deps.load_adapters())[request.provider_id];
    if (adapter === undefined) {
      throw new JobExecutorFailure({ code: "provider_unavailable", retryable: false });
    }
    const context: ProviderExecutionContext = {
      profile: await this.#deps.profiles.resolve(request.provider_id),
      transport: this.#deps.transport,
      assets: this.#deps.assets,
      signal: control.signal,
      log: this.#deps.log,
    };

    await control.mark_running();
    const submission = await adapter.submit(context, request);
    if (submission.state === "completed") {
      return submission.output_assets;
    }

    let poll_after_ms = submission.poll_after_ms ?? DEFAULT_POLL_INTERVAL_MS;
    for (;;) {
      await this.#wait(poll_after_ms);
      const result = await adapter.poll(context, submission);
      if (result.state === "completed") {
        return result.output_assets;
      }
      if (result.state === "failed") {
        throw new JobExecutorFailure(result.error);
      }
      poll_after_ms = result.poll_after_ms ?? poll_after_ms;
    }
  }

  #finish(
    request: ImageGenerationRequest,
    outputs: readonly ProviderOutputAsset[],
  ): Promise<readonly ProviderOutputAsset[]> {
    return this.#deps.postprocess === undefined
      ? Promise.resolve(outputs)
      : this.#deps.postprocess(request, outputs);
  }

  #persist_outputs(
    job: GenerationJobSnapshot,
    outputs: readonly ProviderOutputAsset[],
  ): Promise<readonly ReturnType<typeof ImageIdSchema.parse>[]> {
    return persist_generated_images(
      this.#deps,
      job,
      outputs.map((output) => ({ bytes: output.bytes, media_type: output.asset.media_type })),
    );
  }
}

export interface MediaJobBase {
  readonly chat_id: string;
  readonly requested_swipe_id: number;
  readonly generation_anchor: Sha256;
  readonly source_anchor: Sha256;
  readonly scene_description: string;
}

export interface MediaCommandDeps {
  readonly queue: ImageJobQueue;
  readonly plans: MediaExecutionPlanRegistry;
}

export async function submit_manual_generation(
  deps: MediaCommandDeps,
  base: MediaJobBase,
  request: ImageGenerationRequest,
): Promise<GenerationJobSnapshot> {
  deps.plans.register(request);
  return enqueue_media_job(deps.queue, base, request.request_id, request.provider_id);
}

async function enqueue_media_job(
  queue: ImageJobQueue,
  base: MediaJobBase,
  request_id: RequestId,
  provider_id: ProviderId,
): Promise<GenerationJobSnapshot> {
  const enqueue_request: EnqueueGenerationJobRequest = {
    request_id,
    generation_anchor: base.generation_anchor,
    source_anchor: base.source_anchor,
    chat_id: base.chat_id,
    requested_swipe_id: base.requested_swipe_id,
    provider_id,
    arguments: {
      generation_anchor: base.generation_anchor,
      scene_description: base.scene_description,
    },
    automatic: false,
  };
  return queue.enqueue(enqueue_request);
}

export function cancel_media_job(
  deps: MediaCommandDeps,
  job_id: string,
): Promise<GenerationJobSnapshot> {
  return deps.queue.cancel(job_id);
}
