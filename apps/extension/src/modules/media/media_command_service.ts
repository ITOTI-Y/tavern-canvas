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
  MessageBinder,
  type EnqueueGenerationJobRequest,
  type GenerationJobSnapshot,
  type JobExecutionControl,
  type JobExecutionResult,
  type JobExecutor,
  type JobPersistencePort,
  type MessagePort,
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

// ---------------------------------------------------------------------------
// Durable Stage 02 job persistence -- neither this nor any concrete JobExecutor is wired up
// anywhere in the app today (bootstrap.ts/studio_controller.ts construct no ImageJobQueue at
// all); this is the first real, working consumer.
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Execution plans: how to actually turn a queued job into provider output. Keyed by request_id
// (known before `queue.enqueue()` is even called) rather than job_id, so registration can never
// race the queue's own microtask-scheduled drain.
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Stage 04 asset I/O ports consumed by the executor and by "cache-only source" resolution.
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// JobExecutor: routes a queued job to either a real ProviderAdapter (t2i/i2i/edit/ComfyUI-inpaint/
// NovelAI-inpaint -- all representable in the existing ImageGenerationRequest union) or the
// direct-transport video path (video_generation.ts's submit_video_generation, since no provider
// contract has a video-output mode), then persists every output asset as a Stage 04 image.
// ---------------------------------------------------------------------------

const DEFAULT_POLL_INTERVAL_MS = 1_000;

export interface ProviderProfileResolver {
  resolve(provider_id: ProviderId): Promise<ProviderProfile>;
}

export interface MediaJobExecutorDeps {
  readonly load_adapters: () => Promise<
    Partial<Record<ProviderId, ProviderAdapter<ImageGenerationRequest>>>
  >;
  readonly profiles: ProviderProfileResolver;
  readonly transport: ProviderTransport;
  readonly assets: ProviderAssetReader;
  readonly log: ProviderLogSink;
  readonly plans: MediaExecutionPlanRegistry;
  readonly store: ImageStorePort;
  readonly ids: IdSource;
  readonly clock: ClockPort;
  readonly resolve_source_message: (job: GenerationJobSnapshot) => SourceMessageIdentity;
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
        : await this.#execute_adapter(plan.request, control);

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

  async #persist_outputs(
    job: GenerationJobSnapshot,
    outputs: readonly ProviderOutputAsset[],
  ): Promise<readonly ReturnType<typeof ImageIdSchema.parse>[]> {
    const source_message = this.#deps.resolve_source_message(job);
    const image_ids: string[] = [];
    for (const output of outputs) {
      const id = this.#deps.ids.next();
      await this.#deps.store.put_image({
        id,
        bytes: output.bytes,
        claimed_media_type: output.asset.media_type,
        created_at: this.#deps.clock.now(),
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
}

// ---------------------------------------------------------------------------
// Command surface: manual text-to-image, image-to-image, edit, ComfyUI/NovelAI inpaint, and video
// all funnel through `submit_manual_generation`/`submit_manual_video`, which enqueue a typed
// Stage 02 job and register the matching execution plan. "Regenerate" and "modify prompt" are the
// same submission mechanics applied to a request rebuilt from a cached source (see
// `resolve_cached_source_asset` for the "cache-only source" case: no live job, only a Stage 04
// gallery record, still enough to resubmit).
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Send-button press classification (manual.send_button_longpress): a plain click sends
// immediately; a 500ms-or-longer press opens GenerationParametersDialog first. The actual
// press-and-hold timer lives wherever the send button's own DOM is rendered (a compose/send
// control that does not exist yet anywhere in this codebase, in-scope or otherwise); this
// classifier is the reusable, host-agnostic decision that consumer applies to a measured
// press duration, kept here so the behavior is real and tested rather than only described.
// ---------------------------------------------------------------------------

export const SEND_BUTTON_LONG_PRESS_THRESHOLD_MS = 500;

export type SendButtonPressOutcome = "send_immediately" | "open_size_popup";

export function classify_send_button_press(press_duration_ms: number): SendButtonPressOutcome {
  return press_duration_ms >= SEND_BUTTON_LONG_PRESS_THRESHOLD_MS
    ? "open_size_popup"
    : "send_immediately";
}

/**
 * "cache-only source": resolves an already-generated image's bytes purely from the Stage 04
 * gallery store (no live Stage 02 job required -- the original job may be long gone), for i2i/
 * edit/inpaint flows and for regenerate/modify-prompt's "reuse an existing image as the starting
 * point" case.
 */
export async function resolve_cached_source_asset(
  store: ImageStorePort,
  image_id: string,
): Promise<CachedSourceAsset | null> {
  return store.read_image(image_id);
}

// ---------------------------------------------------------------------------
// Source-message navigation (manual generation's per-record "go to source message" action)
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Attach/detach <-> in-memory ImageJobQueue wiring (Stage 03/04 carry-over). `ImageJobQueue`
// already structurally satisfies `MessageBindingJobPort` (get/subscribe/mark_attached/
// mark_orphaned), so no adapter class is needed -- this factory just proves the two existing,
// already-tested pieces (ImageJobQueue, MessageBinder) compose correctly for media-originated
// jobs, and gives the app's real bootstrap a single call to wire in production.
// ---------------------------------------------------------------------------

export function bind_media_jobs_to_messages(
  queue: ImageJobQueue,
  messages: MessagePort,
): MessageBinder {
  const binder = new MessageBinder(queue, messages);
  binder.start();
  return binder;
}
