import "fake-indexeddb/auto";

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import {
  DATABASE_NAME,
  dispose_database,
  GalleryImageRecordRepository,
  open_database,
  ProviderProfileRepository,
  type StorageDatabase,
} from "@tavern-canvas/storage";
import { ModuleRuntime } from "@tavern-canvas/core";
import { deleteDB } from "idb";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  compose_studio_capabilities,
  type StudioComposition,
} from "../../apps/extension/src/bootstrap/compose_capabilities.js";
import type { BootstrapProbeResult } from "../../apps/extension/src/host/index.js";
import type {
  GenerationJobSummary,
  StudioCapabilities,
} from "../../apps/extension/src/ui/contracts/ui_capabilities.js";

/**
 * End-to-end proof that the composition root actually wires a generation job all the way through:
 *
 *   StudioCapabilities.generation.submit
 *     -> MediaExecutionPlanRegistry + ImageJobQueue (real, from @tavern-canvas/core)
 *     -> MediaJobExecutor (real)
 *     -> SdWebuiAdapter (real, from @tavern-canvas/providers)
 *     -> LocalDirectTransport (real) -> fetch      <-- the ONLY fake in this test
 *     -> put_image into IndexedDB (real @tavern-canvas/storage, fake-indexeddb driver)
 *     -> gallery capability lists the persisted record
 *     -> IndexedDbJobPersistence writes the job, generation.load() reads it back
 *
 * Nothing between submit and storage is stubbed.
 */

const PROVIDER_ORIGIN = "http://127.0.0.1:7860";
const PROFILE_ID = "11111111-1111-4111-8111-111111111111";
const REQUEST_ID = "22222222-2222-4222-8222-222222222222";
const ANCHOR = "a".repeat(64);
const NAMESPACE = "primary";

const SD_RESPONSE = JSON.parse(
  readFileSync(
    resolve(import.meta.dirname, "../fixtures/providers/sd_webui/txt2img_response.json"),
    "utf8",
  ),
) as { readonly images: readonly string[] };

const READY_PROBE: BootstrapProbeResult = {
  ready: true,
  helper_version: "4.9.1",
  matrix: {
    native_tool_manager: { available: true },
    main_generation_events: { available: true },
    private_prompt_generation: { available: true },
    message_swipe_metadata: { available: true },
    host_image_upload: { available: true },
    tavern_helper: { available: true },
    tauri_chat_surface: { available: false, reason: "TauriTavern is absent" },
    tauri_world_info_activation: { available: false, reason: "TauriTavern is absent" },
    gateway_protocol: { available: false, reason: "Gateway protocol is not connected" },
  },
};

interface RegisteredTool {
  readonly name: string;
  readonly action: (arguments_: unknown) => string | Promise<string>;
}

interface HostControl {
  readonly globals: object;
  readonly registered_tools: RegisteredTool[];
  readonly injections: string[];
  emit(event_name: string, ...arguments_: readonly unknown[]): void;
}

/**
 * A SillyTavern + TavernHelper global graph with a real event source and a real
 * `setExtensionPrompt`, so the composed `GenerationTriggerModule` can be driven exactly the way a
 * live host drives it: emit `GENERATION_STARTED`, then either invoke the registered function tool
 * or stream a hidden-comment chunk.
 */
function create_host_control(auto_generation_enabled = true): HostControl {
  const listeners = new Map<string, ((...arguments_: readonly unknown[]) => void)[]>();
  const registered_tools: RegisteredTool[] = [];
  const injections: string[] = [];
  const context = {
    getCurrentLocale: () => "en",
    getCurrentChatId: () => "chat-42",
    getRequestHeaders: () => ({ "Content-Type": "application/json" }),
    isToolCallingSupported: () => true,
    eventSource: {
      on(event_name: string, listener: (...arguments_: readonly unknown[]) => void) {
        listeners.set(event_name, [...(listeners.get(event_name) ?? []), listener]);
      },
      removeListener(event_name: string, listener: (...arguments_: readonly unknown[]) => void) {
        listeners.set(
          event_name,
          (listeners.get(event_name) ?? []).filter((candidate) => candidate !== listener),
        );
      },
    },
    eventTypes: {
      GENERATION_STARTED: "generation_started",
      GENERATION_STOPPED: "generation_stopped",
      GENERATION_ENDED: "generation_ended",
      STREAM_TOKEN_RECEIVED: "stream_token_received",
      CHAT_CHANGED: "chat_changed",
      MESSAGE_SWIPED: "message_swiped",
    },
    registerFunctionTool(tool: RegisteredTool) {
      registered_tools.push(tool);
    },
    unregisterFunctionTool: vi.fn(),
    setExtensionPrompt(_key: string, value: string) {
      injections.push(value);
    },
    extensionSettings: {
      tavern_canvas: {
        schema_version: 1,
        active_namespace: NAMESPACE,
        locale: "auto",
        credential_storage_mode: "host",
        active_provider_profile_id: PROFILE_ID,
        global_concurrency: 2,
        auto_generation_enabled,
        fallback_generation_enabled: auto_generation_enabled,
        vocabulary_update_channel: "bundled",
        gateway: { endpoint: null, token_secret_id: null, http_acknowledgments: {} },
        ui: {
          color_mode: "system",
          inspector_width: 320,
          inspector_collapsed: false,
          optional_entry_enabled: false,
        },
      },
    },
    saveSettingsDebounced: vi.fn(),
  };
  return {
    globals: {
      TavernHelper: {
        getTavernHelperVersion: () => "4.9.1",
        generateRaw: vi.fn(),
        getChatMessages: vi.fn(() => []),
        setChatMessages: vi.fn(),
      },
      SillyTavern: { getContext: () => context },
      fetch: vi.fn(),
    },
    registered_tools,
    injections,
    emit(event_name, ...arguments_) {
      for (const listener of [...(listeners.get(event_name) ?? [])]) {
        listener(...arguments_);
      }
    },
  };
}

function create_globals(): object {
  return create_host_control(false).globals;
}

/** The anchor the composition published to the model, read back out of the trigger injection --
 * the only place a caller can legitimately learn it, and the same place a real model reads it. */
function published_anchor(control: HostControl): string {
  const anchor = /"([a-f0-9]{64})"/u.exec(control.injections.at(-1) ?? "")?.[1];
  if (anchor === undefined) {
    throw new Error("No generation anchor was published to the main LLM");
  }
  return anchor;
}

async function seed_provider_profile(database: StorageDatabase): Promise<void> {
  const repository = new ProviderProfileRepository(database);
  await repository.put(NAMESPACE, {
    schema_version: 1,
    id: PROFILE_ID,
    namespace: NAMESPACE,
    record_key: `${NAMESPACE}:${PROFILE_ID}`,
    created_at: "2026-08-05T00:00:00.000Z",
    updated_at: "2026-08-05T00:00:00.000Z",
    provider_id: "sd_webui",
    payload: {
      display_name: "Local SD WebUI",
      is_default: true,
      base_url: PROVIDER_ORIGIN,
      provider_profile: {
        model_allowlist: ["sd_xl_base"],
        output_mime_type_allowlist: ["image/png"],
        max_response_bytes: 5_000_000,
      },
    },
  });
}

function txt2img_request() {
  return {
    provider_id: "sd_webui",
    request_id: REQUEST_ID,
    generation_anchor: ANCHOR,
    prompt: "a rainy alley at night",
    output_count: 1,
    mode: "txt2img",
    model_id: "sd_xl_base",
    sampler: "dpmpp_2m",
    scheduler: "karras",
    width: 512,
    height: 512,
    steps: 20,
    cfg_scale: 7,
  } as const;
}

interface Harness {
  readonly composition: StudioComposition;
  readonly capabilities: StudioCapabilities;
  readonly database: StorageDatabase;
  readonly requests: { url: string; body: string }[];
}

async function create_harness(
  respond: (signal: AbortSignal | undefined) => Promise<Response>,
  globals: object = create_globals(),
  probe: BootstrapProbeResult = READY_PROBE,
): Promise<Harness> {
  const database = await open_database();
  await seed_provider_profile(database);
  const requests: { url: string; body: string }[] = [];

  const composition = await compose_studio_capabilities({
    probe,
    globals,
    extension_version: "3.0.0-test",
    create_vocabulary_worker: null,
    estimate_storage: () => Promise.resolve(undefined),
    open_storage: () => Promise.resolve(database),
    provider_fetch: (input, init) => {
      requests.push({ url: request_url(input), body: request_body(init) });
      return respond(init?.signal ?? undefined);
    },
  });

  return { composition, capabilities: composition.capabilities, database, requests };
}

/** Composition alone wires nothing: `bootstrap_tavern_canvas` hands `composition.modules` to a
 * `ModuleRuntime`, and only `start_all()` attaches the trigger to the host. */
async function start_modules(composition: StudioComposition): Promise<ModuleRuntime> {
  const runtime = new ModuleRuntime(composition.modules);
  await runtime.start_all();
  return runtime;
}

function probe_without_native_tools(): BootstrapProbeResult {
  return {
    ready: true,
    helper_version: "4.9.1",
    matrix: {
      ...(READY_PROBE.ready ? READY_PROBE.matrix : {}),
      native_tool_manager: { available: false },
    },
  };
}

function request_url(input: RequestInfo | URL): string {
  if (typeof input === "string") {
    return input;
  }
  return input instanceof URL ? input.href : input.url;
}

function request_body(init: RequestInit | undefined): string {
  const body = init?.body;
  if (typeof body === "string") {
    return body;
  }
  if (ArrayBuffer.isView(body)) {
    return new TextDecoder().decode(body);
  }
  return body instanceof ArrayBuffer ? new TextDecoder().decode(body) : "";
}

function json_response(body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

async function wait_for_state(
  capabilities: StudioCapabilities,
  job_id: string,
  state: GenerationJobSummary["state"],
): Promise<GenerationJobSummary> {
  let last: GenerationJobSummary | undefined;
  const unsubscribe = capabilities.generation.subscribe((event) => {
    if (event.type === "job_updated" && event.job.job_id === job_id) {
      last = event.job;
    }
  });
  try {
    await vi.waitFor(() => expect(last?.state).toBe(state), { timeout: 5_000, interval: 5 });
    if (last === undefined) {
      throw new Error("no job update observed");
    }
    return last;
  } finally {
    unsubscribe();
  }
}

afterEach(async () => {
  await dispose_database();
  await deleteDB(DATABASE_NAME);
  vi.restoreAllMocks();
});

describe("composed generation flow", () => {
  it("resolves generation to a real implementation once a loopback provider profile is active", async () => {
    const harness = await create_harness(() => Promise.resolve(json_response(SD_RESPONSE)));

    const row = harness.composition.resolutions.find(
      (entry) => entry.capability_id === "generation",
    );
    expect(row?.status).toBe("available");
    await harness.composition.dispose();
  });

  it("carries a submitted job through provider, transport and storage to the gallery", async () => {
    const harness = await create_harness(() => Promise.resolve(json_response(SD_RESPONSE)));

    const submitted = await harness.capabilities.generation.submit({
      profile_id: PROFILE_ID,
      request: txt2img_request(),
    });
    expect(submitted.provider_id).toBe("sd_webui");

    const completed = await wait_for_state(harness.capabilities, submitted.job_id, "completed");
    expect(completed.completed_image_ids).toHaveLength(1);

    // The real provider adapter drove the real transport, and only fetch was faked.
    expect(harness.requests).toHaveLength(1);
    expect(harness.requests[0]?.url).toBe(`${PROVIDER_ORIGIN}/sdapi/v1/txt2img`);
    expect(harness.requests[0]?.body).toContain("a rainy alley at night");

    // The provider's bytes were persisted as a real Stage 04 image record...
    const records = await new GalleryImageRecordRepository(harness.database).list(NAMESPACE);
    expect(records).toHaveLength(1);
    expect(records[0]?.media_type).toBe("image/png");
    expect(records[0]?.provider_id).toBe("sd_webui");

    // ...and the gallery capability reads that same record back.
    await expect(harness.capabilities.gallery.load()).resolves.toMatchObject([
      { id: completed.completed_image_ids[0], provider_id: "sd_webui", media_type: "image/png" },
    ]);
    await expect(
      harness.capabilities.gallery.read_bytes(completed.completed_image_ids[0] ?? ""),
    ).resolves.toBeInstanceOf(Uint8Array);

    // The job itself was persisted, so a fresh load() sees it without any in-memory state.
    await expect(harness.capabilities.generation.load()).resolves.toMatchObject([
      { job_id: submitted.job_id, state: "completed" },
    ]);
    await harness.composition.dispose();
  });

  it("appends the real job transitions to the diagnostics timeline", async () => {
    const harness = await create_harness(() => Promise.resolve(json_response(SD_RESPONSE)));

    const submitted = await harness.capabilities.generation.submit({
      profile_id: PROFILE_ID,
      request: txt2img_request(),
    });
    await wait_for_state(harness.capabilities, submitted.job_id, "completed");

    const timeline = await harness.capabilities.diagnostics.load_timeline();
    const codes = timeline
      .filter((entry) => entry.job_id === submitted.job_id)
      .map((entry) => entry.event_code);
    expect(codes).toContain("generation.completed");
    expect(timeline.every((entry) => !JSON.stringify(entry).includes("rainy alley"))).toBe(true);
    await harness.composition.dispose();
  });

  it("cancels an in-flight job by aborting the provider's own signal", async () => {
    let observed_signal: AbortSignal | undefined;
    const harness = await create_harness(
      (signal) =>
        new Promise<Response>((_resolve, reject) => {
          observed_signal = signal;
          signal?.addEventListener("abort", () => {
            reject(new DOMException("aborted", "AbortError"));
          });
        }),
    );

    const submitted = await harness.capabilities.generation.submit({
      profile_id: PROFILE_ID,
      request: txt2img_request(),
    });
    await vi.waitFor(() => expect(observed_signal).toBeDefined(), { timeout: 5_000, interval: 5 });

    const cancelled = await harness.capabilities.generation.cancel(submitted.job_id);
    expect(cancelled.state).toBe("cancelled");
    expect(observed_signal?.aborted).toBe(true);

    const records = await new GalleryImageRecordRepository(harness.database).list(NAMESPACE);
    expect(records).toEqual([]);
    await harness.composition.dispose();
  });

  it("registers request_image with the host and drives a native tool call to a stored image", async () => {
    const control = create_host_control();
    const harness = await create_harness(
      () => Promise.resolve(json_response(SD_RESPONSE)),
      control.globals,
    );
    const runtime = await start_modules(harness.composition);
    await vi.waitFor(() => expect(control.injections.length).toBeGreaterThan(0));

    control.emit("generation_started", "normal", {}, false);
    const tool = control.registered_tools.find((candidate) => candidate.name === "request_image");
    if (tool === undefined) {
      throw new Error(
        "the composition root must start GenerationTriggerModule so SillyTavern's ToolManager can " +
          "reach request_image",
      );
    }

    const response: unknown = JSON.parse(
      await tool.action({
        generation_anchor: published_anchor(control),
        scene_description: "a rainy alley at night",
      }),
    );
    expect(response).toMatchObject({ status: "queued" });

    await vi.waitFor(async () =>
      expect(await harness.capabilities.generation.load()).toMatchObject([{ state: "completed" }]),
    );
    expect(harness.requests[0]?.url).toBe(`${PROVIDER_ORIGIN}/sdapi/v1/txt2img`);
    expect(harness.requests[0]?.body).toContain("a rainy alley at night");
    await expect(
      new GalleryImageRecordRepository(harness.database).list(NAMESPACE),
    ).resolves.toHaveLength(1);

    await runtime.stop_all();
    await harness.composition.dispose();
  });

  it("turns a hidden-comment stream from a non-tool model into a completed generation job", async () => {
    const control = create_host_control();
    const harness = await create_harness(
      () => Promise.resolve(json_response(SD_RESPONSE)),
      control.globals,
      probe_without_native_tools(),
    );
    const runtime = await start_modules(harness.composition);
    await vi.waitFor(() => expect(control.injections.length).toBeGreaterThan(0));

    control.emit("generation_started", "normal", {}, false);
    expect(control.registered_tools).toEqual([]);

    const marker = `<!-- tavern-canvas:image ${JSON.stringify({
      generation_anchor: published_anchor(control),
      scene_description: "a neon rooftop",
    })} -->`;
    control.emit("stream_token_received", `Before ${marker} after`);
    control.emit("generation_stopped");

    await vi.waitFor(async () =>
      expect(await harness.capabilities.generation.load()).toMatchObject([{ state: "completed" }]),
    );
    expect(harness.requests[0]?.body).toContain("a neon rooftop");

    await runtime.stop_all();
    await harness.composition.dispose();
  });

  it("registers no tool and parses no marker while automatic generation is disabled", async () => {
    const control = create_host_control(false);
    const harness = await create_harness(
      () => Promise.resolve(json_response(SD_RESPONSE)),
      control.globals,
      probe_without_native_tools(),
    );
    const runtime = await start_modules(harness.composition);

    control.emit("generation_started", "normal", {}, false);
    control.emit(
      "stream_token_received",
      `<!-- tavern-canvas:image ${JSON.stringify({
        generation_anchor: "a".repeat(64),
        scene_description: "should never run",
      })} -->`,
    );
    control.emit("generation_stopped");
    await new Promise((resolve) => setTimeout(resolve, 20));

    expect(control.injections.at(-1) ?? "").toBe("");
    expect(harness.requests).toEqual([]);
    await expect(harness.capabilities.generation.load()).resolves.toEqual([]);

    await runtime.stop_all();
    await harness.composition.dispose();
  });

  it("detaches the trigger from the host when the runtime stops", async () => {
    const control = create_host_control();
    const harness = await create_harness(
      () => Promise.resolve(json_response(SD_RESPONSE)),
      control.globals,
    );
    const runtime = await start_modules(harness.composition);
    await vi.waitFor(() => expect(control.injections.length).toBeGreaterThan(0));
    await runtime.stop_all();

    control.emit("generation_started", "normal", {}, false);
    expect(control.registered_tools).toEqual([]);
    expect(control.injections.at(-1)).toBe("");

    await harness.composition.dispose();
  });

  it("records a provider failure on the job instead of throwing out of the queue", async () => {
    const harness = await create_harness(() =>
      Promise.resolve(new Response("nope", { status: 500 })),
    );

    const submitted = await harness.capabilities.generation.submit({
      profile_id: PROFILE_ID,
      request: txt2img_request(),
    });
    const failed = await wait_for_state(harness.capabilities, submitted.job_id, "failed");

    expect(failed.error?.code).toBeTruthy();
    expect(failed.completed_image_ids).toEqual([]);
    await harness.composition.dispose();
  });
});
