import type {
  GoogleImageRequest,
  ImageGenerationRequest,
  SdWebuiRequest,
} from "@tavern-canvas/contracts";
import {
  ImageJobQueue,
  type GenerationJobSnapshot,
  type JobIdSource,
  type JobPersistencePort,
  type JobTimeSource,
} from "@tavern-canvas/core";
import type {
  ProviderAdapter,
  ProviderAssetReader,
  ProviderExecutionContext,
  ProviderLogSink,
  ProviderOutputAsset,
  ProviderPollResult,
  ProviderProfile,
  ProviderSubmission,
  ProviderTransport,
  ProviderTransportResponse,
} from "@tavern-canvas/providers";
import { describe, expect, it, vi } from "vitest";

import { build_image_edit_request } from "./image_edit.js";
import { build_comfyui_inpaint_request, build_novelai_inpaint_request } from "./inpaint_session.js";
import {
  cancel_media_job,
  classify_send_button_press,
  MediaExecutionPlanRegistry,
  MediaJobExecutor,
  navigate_to_source_message,
  resolve_cached_source_asset,
  SEND_BUTTON_LONG_PRESS_THRESHOLD_MS,
  submit_manual_generation,
  submit_manual_video,
  SourceMessageNotFoundError,
  type CachedSourceAsset,
  type ImageStorePort,
  type MediaCommandDeps,
  type MediaJobExecutorDeps,
  type MediaJobBase,
  type ProviderProfileResolver,
  type SourceMessageIdentity,
} from "./media_command_service.js";

const GENERATION_ANCHOR = "a".repeat(64);
const SOURCE_ANCHOR = "b".repeat(64);
const REQUEST_ID_1 = "11111111-1111-4111-8111-111111111111";
const REQUEST_ID_2 = "11111111-1111-4111-8111-111111111112";
const ASSET_ID = "33333333-3333-4333-8333-333333333333";

function base(overrides: Partial<MediaJobBase> = {}): MediaJobBase {
  return {
    chat_id: "chat-1",
    requested_swipe_id: 0,
    generation_anchor: GENERATION_ANCHOR,
    source_anchor: SOURCE_ANCHOR,
    scene_description: "A rainy alley",
    ...overrides,
  };
}

function sd_request(overrides: Partial<SdWebuiRequest> = {}): SdWebuiRequest {
  return {
    provider_id: "sd_webui",
    request_id: REQUEST_ID_1,
    generation_anchor: GENERATION_ANCHOR,
    prompt: "A rainy alley",
    output_count: 1,
    mode: "txt2img",
    model_id: "sdxl-base",
    sampler: "DPM++ 2M",
    scheduler: "Karras",
    width: 1024,
    height: 1024,
    steps: 30,
    cfg_scale: 7,
    ...overrides,
  } as SdWebuiRequest;
}

class SequenceJobIdSource implements JobIdSource {
  #sequence = 0;

  next(): string {
    this.#sequence += 1;
    return `22222222-2222-4222-8222-${String(this.#sequence).padStart(12, "0")}`;
  }
}

class SequenceIdSource {
  #sequence = 0;

  next(): string {
    this.#sequence += 1;
    return `44444444-4444-4444-8444-${String(this.#sequence).padStart(12, "0")}`;
  }
}

class FixedClock {
  now(): string {
    return "2026-08-07T00:00:00.000Z";
  }
}

class SequenceTimeSource implements JobTimeSource {
  #milliseconds = Date.parse("2026-08-07T00:00:00.000Z");

  now(): Date {
    const value = new Date(this.#milliseconds);
    this.#milliseconds += 1;
    return value;
  }
}

class MemoryPersistence implements JobPersistencePort {
  readonly saves: GenerationJobSnapshot[] = [];

  save(job: GenerationJobSnapshot): Promise<void> {
    this.saves.push(job);
    return Promise.resolve();
  }
}

interface StoredRecord {
  readonly id: string;
  readonly bytes: Uint8Array;
  readonly claimed_media_type: string;
  readonly metadata: Record<string, unknown>;
}

class MemoryImageStore implements ImageStorePort {
  readonly records: StoredRecord[] = [];

  put_image(input: {
    id: string;
    bytes: Uint8Array;
    claimed_media_type: string;
    created_at: string;
    metadata: Record<string, unknown>;
  }): Promise<{ id: string }> {
    this.records.push({
      id: input.id,
      bytes: input.bytes,
      claimed_media_type: input.claimed_media_type,
      metadata: input.metadata,
    });
    return Promise.resolve({ id: input.id });
  }

  read_image(id: string): Promise<CachedSourceAsset | null> {
    const record = this.records.find((entry) => entry.id === id);
    return Promise.resolve(
      record === undefined ? null : { bytes: record.bytes, media_type: record.claimed_media_type },
    );
  }
}

function output_asset(byte_seed: number): ProviderOutputAsset {
  const bytes = Uint8Array.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, byte_seed]);
  return {
    asset: {
      asset_id: ASSET_ID,
      media_type: "image/png",
      byte_length: bytes.byteLength,
      sha256: "c".repeat(64),
    },
    bytes,
  };
}

class ControlledAdapter implements ProviderAdapter<ImageGenerationRequest> {
  readonly provider_id = "sd_webui" as const;
  readonly capabilities = new Set<never>();
  readonly submissions: { request: ImageGenerationRequest; context: ProviderExecutionContext }[] =
    [];
  #outcome: ProviderSubmission = {
    state: "completed",
    result: { request_id: REQUEST_ID_1, provider_id: "sd_webui", assets: [output_asset(1).asset] },
    output_assets: [output_asset(1)],
  };
  #poll_outcomes: ProviderPollResult[] = [];

  validate_profile(profile: unknown): ProviderProfile {
    return profile as ProviderProfile;
  }

  set_completed(...assets: ProviderOutputAsset[]): void {
    this.#outcome = {
      state: "completed",
      result: {
        request_id: REQUEST_ID_1,
        provider_id: "sd_webui",
        assets: assets.map((asset) => asset.asset),
      },
      output_assets: assets,
    };
  }

  set_pending_then(...poll_outcomes: ProviderPollResult[]): void {
    this.#outcome = { state: "pending", submission_id: "sub-1" };
    this.#poll_outcomes = poll_outcomes;
  }

  submit(
    context: ProviderExecutionContext,
    request: ImageGenerationRequest,
  ): Promise<ProviderSubmission> {
    this.submissions.push({ request, context });
    return Promise.resolve(this.#outcome);
  }

  poll(): Promise<ProviderPollResult> {
    const next = this.#poll_outcomes.shift();
    if (next === undefined) {
      throw new Error("No more poll outcomes configured");
    }
    return Promise.resolve(next);
  }

  cancel(): Promise<void> {
    return Promise.resolve();
  }
}

interface Harness {
  readonly queue: ImageJobQueue;
  readonly plans: MediaExecutionPlanRegistry;
  readonly deps: MediaCommandDeps;
  readonly adapter: ControlledAdapter;
  readonly store: MemoryImageStore;
}

function create_harness(postprocess?: MediaJobExecutorDeps["postprocess"]): Harness {
  const adapter = new ControlledAdapter();
  const store = new MemoryImageStore();
  const plans = new MediaExecutionPlanRegistry();
  const profiles: ProviderProfileResolver = {
    resolve: () =>
      Promise.resolve({
        profile_id: "profile-1",
        provider_id: "sd_webui",
        model_allowlist: ["sdxl-base"],
        output_mime_type_allowlist: ["image/png"],
      }),
  };
  const transport: ProviderTransport = {
    execute: vi.fn(
      async () =>
        ({ status: 200, headers: {}, body: new Uint8Array() }) satisfies ProviderTransportResponse,
    ),
  };
  const assets: ProviderAssetReader = { read: vi.fn() };
  const log: ProviderLogSink = { write: vi.fn() };

  const executor = new MediaJobExecutor({
    load_adapters: () =>
      Promise.resolve({
        sd_webui: adapter,
        comfyui: adapter,
        novelai: adapter,
        openai_image: adapter,
        google_image: adapter,
      }),
    profiles,
    transport,
    assets,
    log,
    plans,
    store,
    ids: new SequenceIdSource(),
    clock: new FixedClock(),
    resolve_source_message: (job) => ({
      chat_id: job.chat_id,
      message_id: "unattached",
      swipe_id: job.requested_swipe_id,
    }),
    wait: async () => {},
    ...(postprocess === undefined ? {} : { postprocess }),
  });

  const persistence = new MemoryPersistence();
  const queue = new ImageJobQueue({
    executor,
    persistence,
    job_id_source: new SequenceJobIdSource(),
    time_source: new SequenceTimeSource(),
  });

  return { queue, plans, deps: { queue, plans }, adapter, store };
}

async function wait_for_state(
  queue: ImageJobQueue,
  job_id: string,
  state: GenerationJobSnapshot["state"],
): Promise<void> {
  await vi.waitFor(() => expect(queue.get(job_id)?.state).toBe(state));
}

describe("submit_manual_generation: text-to-image and image-to-image", () => {
  it("creates a queued job and stores the resulting gallery asset (t2i)", async () => {
    const harness = create_harness();
    const job = await submit_manual_generation(
      harness.deps,
      base(),
      sd_request({ mode: "txt2img" }),
    );
    expect(job.state).toBe("queued");

    await wait_for_state(harness.queue, job.job_id, "completed");
    const completed = harness.queue.get(job.job_id);
    expect(completed?.image_ids).toHaveLength(1);
    expect(harness.store.records).toHaveLength(1);
    expect(harness.adapter.submissions[0]?.request.provider_id).toBe("sd_webui");
  });

  it("submits an image-to-image request carrying an input_asset_id", async () => {
    const harness = create_harness();
    const request = sd_request({
      mode: "img2img",
      input_asset_id: ASSET_ID,
      denoise_strength: 0.6,
      request_id: REQUEST_ID_2,
    });
    const job = await submit_manual_generation(harness.deps, base(), request);
    await wait_for_state(harness.queue, job.job_id, "completed");

    const submitted = harness.adapter.submissions[0]?.request as SdWebuiRequest;
    expect(submitted.mode).toBe("img2img");
    expect(submitted.input_asset_id).toBe(ASSET_ID);
  });
});

describe("prompt modification and regenerate (including cache-only source)", () => {
  it("modify-prompt resubmits with edited prompt text as a new job", async () => {
    const harness = create_harness();
    const original = await submit_manual_generation(harness.deps, base(), sd_request());
    await wait_for_state(harness.queue, original.job_id, "completed");

    const modified = await submit_manual_generation(
      harness.deps,
      base({ scene_description: "A sunny alley" }),
      sd_request({ request_id: REQUEST_ID_2, prompt: "A sunny alley" }),
    );
    expect(modified.job_id).not.toBe(original.job_id);
    await wait_for_state(harness.queue, modified.job_id, "completed");
    expect(harness.queue.get(modified.job_id)?.arguments.scene_description).toBe("A sunny alley");
  });

  it("regenerates purely from a cached gallery record with no live job (cache-only source)", async () => {
    const harness = create_harness();
    // Simulate a gallery record that already exists in the store from a long-gone job.
    await harness.store.put_image({
      id: "cached-image-1",
      bytes: output_asset(9).bytes,
      claimed_media_type: "image/png",
      created_at: "2026-08-01T00:00:00.000Z",
      metadata: {
        generation_parameters: {
          generation_anchor: GENERATION_ANCHOR,
          scene_description: "Cached scene",
        },
      },
    });

    const cached = await resolve_cached_source_asset(harness.store, "cached-image-1");
    expect(cached).not.toBeNull();

    const job = await submit_manual_generation(
      harness.deps,
      base({ scene_description: "Cached scene" }),
      sd_request({ request_id: REQUEST_ID_2, prompt: "Cached scene" }),
    );
    await wait_for_state(harness.queue, job.job_id, "completed");
    expect(harness.queue.get(job.job_id)?.image_ids).toHaveLength(1);
  });

  it("resolve_cached_source_asset returns null for an unknown image ID", async () => {
    const harness = create_harness();
    expect(await resolve_cached_source_asset(harness.store, "missing")).toBeNull();
  });
});

describe("SD/NovelAI/ComfyUI inpaint submission integration", () => {
  it("submits a ComfyUI inpaint request through the generic adapter path", async () => {
    const harness = create_harness();
    const request = build_comfyui_inpaint_request({
      request_id: REQUEST_ID_1,
      generation_anchor: GENERATION_ANCHOR,
      workflow_id: ASSET_ID,
      source_asset_id: ASSET_ID,
      mask_asset_id: ASSET_ID,
      positive_prompt: "fix the sky",
      denoise_strength: 0.7,
    });
    const job = await submit_manual_generation(harness.deps, base(), request);
    await wait_for_state(harness.queue, job.job_id, "completed");
    expect(harness.adapter.submissions[0]?.request.provider_id).toBe("comfyui");
  });

  it("submits a NovelAI infill request through the generic adapter path", async () => {
    const harness = create_harness();
    const request = build_novelai_inpaint_request({
      request_id: REQUEST_ID_1,
      generation_anchor: GENERATION_ANCHOR,
      image_asset_id: ASSET_ID,
      mask_asset_id: ASSET_ID,
      positive_prompt: "fix the sky",
      strength: 0.5,
      width: 1024,
      height: 1024,
    });
    const job = await submit_manual_generation(harness.deps, base(), request);
    await wait_for_state(harness.queue, job.job_id, "completed");
    const submitted = harness.adapter.submissions[0]?.request;
    expect(submitted?.provider_id).toBe("novelai");
    expect((submitted as { action?: string }).action).toBe("infill");
  });

  it("stores adapter outputs only after the post-processing step", async () => {
    const finished = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 1]);
    const postprocess = vi.fn(
      (_request: ImageGenerationRequest, outputs: readonly ProviderOutputAsset[]) =>
        Promise.resolve(outputs.map((output) => ({ ...output, bytes: finished }))),
    );
    const harness = create_harness(postprocess);
    const request = build_novelai_inpaint_request({
      request_id: REQUEST_ID_1,
      generation_anchor: GENERATION_ANCHOR,
      image_asset_id: ASSET_ID,
      mask_asset_id: ASSET_ID,
      positive_prompt: "fix the sky",
      strength: 1,
      width: 1024,
      height: 1024,
    });
    const job = await submit_manual_generation(harness.deps, base(), request);
    await wait_for_state(harness.queue, job.job_id, "completed");
    expect(postprocess).toHaveBeenCalledWith(request, expect.any(Array));
    expect(harness.store.records[0]?.bytes).toEqual(finished);
  });
});

describe("Google/OpenAI edit submission integration", () => {
  it("submits an OpenAI edit-mode request", async () => {
    const harness = create_harness();
    const request = build_image_edit_request({
      request_id: REQUEST_ID_1,
      generation_anchor: GENERATION_ANCHOR,
      source_asset_id: ASSET_ID,
      instruction: "brighten the scene",
      provider_id: "openai_image",
    });
    const job = await submit_manual_generation(harness.deps, base(), request);
    await wait_for_state(harness.queue, job.job_id, "completed");
    expect(harness.adapter.submissions[0]?.request.provider_id).toBe("openai_image");
  });

  it("submits a Google edit request", async () => {
    const harness = create_harness();
    const request = build_image_edit_request({
      request_id: REQUEST_ID_1,
      generation_anchor: GENERATION_ANCHOR,
      source_asset_id: ASSET_ID,
      instruction: "brighten the scene",
      provider_id: "google_image",
    }) as GoogleImageRequest;
    const job = await submit_manual_generation(harness.deps, base(), request);
    await wait_for_state(harness.queue, job.job_id, "completed");
    expect(harness.adapter.submissions[0]?.request.provider_id).toBe("google_image");
  });
});

describe("supported video generation", () => {
  it("submits a video request and stores the resulting video/mp4 asset", async () => {
    const mp4_bytes = Uint8Array.from([0, 0, 0, 24, 0x66, 0x74, 0x79, 0x70, 1, 2, 3]);
    const transport_body_text = `<video src="https://cdn.example.com/out.mp4"></video>`;
    const store = new MemoryImageStore();
    const plans = new MediaExecutionPlanRegistry();
    const transport: ProviderTransport = {
      execute: vi.fn(async () => ({
        status: 200,
        headers: {},
        body: new TextEncoder().encode(transport_body_text),
      })),
      fetch_remote_asset: vi.fn(async () => ({ status: 200, headers: {}, body: mp4_bytes })),
    };
    const executor = new MediaJobExecutor({
      load_adapters: () => Promise.resolve({}),
      profiles: {
        resolve: () =>
          Promise.resolve({
            profile_id: "p",
            provider_id: "google_image",
            model_allowlist: [],
            output_mime_type_allowlist: [],
          }),
      },
      transport,
      assets: { read: vi.fn() },
      log: { write: vi.fn() },
      plans,
      store,
      ids: new SequenceIdSource(),
      clock: new FixedClock(),
      resolve_source_message: (job) => ({
        chat_id: job.chat_id,
        message_id: "unattached",
        swipe_id: job.requested_swipe_id,
      }),
      wait: async () => {},
    });
    const queue = new ImageJobQueue({
      executor,
      persistence: new MemoryPersistence(),
      job_id_source: new SequenceJobIdSource(),
      time_source: new SequenceTimeSource(),
    });
    const deps: MediaCommandDeps = { queue, plans };

    const job = await submit_manual_video(
      deps,
      base(),
      {
        route: "/v1/chat/completions",
        body: new TextEncoder().encode("{}"),
        content_type: "application/json",
      },
      REQUEST_ID_1,
      "google_image",
    );
    await wait_for_state(queue, job.job_id, "completed");
    expect(store.records.some((record) => record.claimed_media_type === "video/mp4")).toBe(true);
  });
});

describe("multiple results", () => {
  it("stores every output asset and lists all their image_ids on the completed job", async () => {
    const harness = create_harness();
    harness.adapter.set_completed(
      output_asset(1),
      output_asset(2),
      output_asset(3),
      output_asset(4),
    );
    const job = await submit_manual_generation(
      harness.deps,
      base(),
      sd_request({ output_count: 4 }),
    );
    await wait_for_state(harness.queue, job.job_id, "completed");
    expect(harness.queue.get(job.job_id)?.image_ids).toHaveLength(4);
    expect(harness.store.records).toHaveLength(4);
  });
});

describe("cancellation", () => {
  it("cancels a job before it starts submitting", async () => {
    const harness = create_harness();
    harness.adapter.set_pending_then({
      state: "completed",
      result: {
        request_id: REQUEST_ID_1,
        provider_id: "sd_webui",
        assets: [output_asset(1).asset],
      },
      output_assets: [output_asset(1)],
    });
    const job = await submit_manual_generation(harness.deps, base(), sd_request());
    const cancelled = await cancel_media_job(harness.deps, job.job_id);
    expect(cancelled.state).toBe("cancelled");
  });
});

describe("classify_send_button_press", () => {
  it("sends immediately on a plain click (a short press)", () => {
    expect(classify_send_button_press(0)).toBe("send_immediately");
    expect(classify_send_button_press(SEND_BUTTON_LONG_PRESS_THRESHOLD_MS - 1)).toBe(
      "send_immediately",
    );
  });

  it("opens the size popup once the press reaches the 500ms threshold", () => {
    expect(classify_send_button_press(SEND_BUTTON_LONG_PRESS_THRESHOLD_MS)).toBe("open_size_popup");
    expect(classify_send_button_press(1_200)).toBe("open_size_popup");
  });
});

describe("failed upload / failed submission", () => {
  it("a failing adapter submission leaves the job in the failed state with a provider error", async () => {
    const harness = create_harness();
    const failing_adapter: ProviderAdapter<ImageGenerationRequest> = {
      provider_id: "sd_webui",
      capabilities: new Set(),
      validate_profile: (profile) => profile as ProviderProfile,
      submit: () => Promise.reject(new Error("upload rejected")),
      poll: () => Promise.reject(new Error("unreachable")),
      cancel: () => Promise.resolve(),
    };
    const executor = new MediaJobExecutor({
      load_adapters: () => Promise.resolve({ sd_webui: failing_adapter }),
      profiles: {
        resolve: () =>
          Promise.resolve({
            profile_id: "p",
            provider_id: "sd_webui",
            model_allowlist: [],
            output_mime_type_allowlist: [],
          }),
      },
      transport: { execute: vi.fn() },
      assets: { read: vi.fn() },
      log: { write: vi.fn() },
      plans: harness.plans,
      store: harness.store,
      ids: new SequenceIdSource(),
      clock: new FixedClock(),
      resolve_source_message: (job) => ({
        chat_id: job.chat_id,
        message_id: "unattached",
        swipe_id: job.requested_swipe_id,
      }),
      wait: async () => {},
    });
    const queue = new ImageJobQueue({
      executor,
      persistence: new MemoryPersistence(),
      job_id_source: new SequenceJobIdSource(),
      time_source: new SequenceTimeSource(),
    });
    const deps: MediaCommandDeps = { queue, plans: harness.plans };

    const job = await submit_manual_generation(deps, base(), sd_request());
    await wait_for_state(queue, job.job_id, "failed");
    expect(queue.get(job.job_id)?.error).not.toBeNull();
  });
});

describe("source-message navigation", () => {
  it("navigates to the resolved source message identity", async () => {
    const target: SourceMessageIdentity = { chat_id: "chat-1", message_id: "9", swipe_id: 0 };
    const navigate = vi.fn();
    await navigate_to_source_message({ navigate }, target);
    expect(navigate).toHaveBeenCalledWith(target);
  });

  it("throws when a record carries no source_message identity", async () => {
    const navigate = vi.fn();
    await expect(navigate_to_source_message({ navigate }, null)).rejects.toThrow(
      SourceMessageNotFoundError,
    );
    expect(navigate).not.toHaveBeenCalled();
  });
});
