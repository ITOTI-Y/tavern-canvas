import {
  ImageIdSchema,
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
import {
  create_generation_job_repository,
  type GenerationJob,
  type StorageDatabase,
} from "@tavern-canvas/storage";

import { submit_video_generation, type VideoGenerationRequest } from "./video_generation.js";

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

export type MediaExecutionPlan =
  | { readonly kind: "adapter"; readonly request: ImageGenerationRequest }
  | { readonly kind: "video"; readonly request: VideoGenerationRequest };

export class MediaExecutionPlanRegistry {
  readonly #plans = new Map<string, MediaExecutionPlan>();

  register(request_id: string, plan: MediaExecutionPlan): void {
    this.#plans.set(request_id, plan);
  }

  take(request_id: string): MediaExecutionPlan | undefined {
    const plan = this.#plans.get(request_id);
    this.#plans.delete(request_id);
    return plan;
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
  readonly resolve_source_message: (job: GenerationJobSnapshot) => SourceMessageIdentity;
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
    const plan = this.#deps.plans.take(job.request_id);
    if (plan === undefined) {
      throw new JobExecutorFailure({ code: "invalid_request", retryable: false });
    }

    const outputs =
      plan.kind === "video"
        ? await this.#execute_video(plan.request, control)
        : await this.#finish(plan.request, await this.#execute_adapter(plan.request, control));

    const image_ids = await this.#persist_outputs(job, outputs);
    return { image_ids };
  }

  async #execute_video(
    request: VideoGenerationRequest,
    control: JobExecutionControl,
  ): Promise<readonly ProviderOutputAsset[]> {
    await control.mark_running();
    const output = await submit_video_generation(this.#deps.transport, request, control.signal);
    return [output];
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
  deps.plans.register(request.request_id, { kind: "adapter", request });
  return enqueue_media_job(deps.queue, base, request.request_id, request.provider_id);
}

export async function submit_manual_video(
  deps: MediaCommandDeps,
  base: MediaJobBase,
  request: VideoGenerationRequest,
  request_id: RequestId,
  provider_id: ProviderId,
): Promise<GenerationJobSnapshot> {
  deps.plans.register(request_id, { kind: "video", request });
  return enqueue_media_job(deps.queue, base, request_id, provider_id);
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

export const SEND_BUTTON_LONG_PRESS_THRESHOLD_MS = 500;

export type SendButtonPressOutcome = "send_immediately" | "open_size_popup";

export function classify_send_button_press(press_duration_ms: number): SendButtonPressOutcome {
  return press_duration_ms >= SEND_BUTTON_LONG_PRESS_THRESHOLD_MS
    ? "open_size_popup"
    : "send_immediately";
}

export async function resolve_cached_source_asset(
  store: ImageStorePort,
  image_id: string,
): Promise<CachedSourceAsset | null> {
  return store.read_image(image_id);
}

export interface SourceMessageNavigationTarget {
  readonly chat_id: string;
  readonly message_id: string;
  readonly swipe_id: number;
}

export interface SourceMessageNavigationPort {
  navigate(target: SourceMessageNavigationTarget): void | Promise<void>;
}

export class SourceMessageNotFoundError extends Error {
  constructor() {
    super("Record carries no source_message identity");
    this.name = "SourceMessageNotFoundError";
  }
}

export async function navigate_to_source_message(
  navigation: SourceMessageNavigationPort,
  source_message: SourceMessageIdentity | null,
): Promise<void> {
  if (source_message === null) {
    throw new SourceMessageNotFoundError();
  }
  await navigation.navigate(source_message);
}
