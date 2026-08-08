import "fake-indexeddb/auto";

import { createHash } from "node:crypto";
import { mkdtemp, rm } from "node:fs/promises";
import { createServer, type IncomingMessage, type Server, type ServerResponse } from "node:http";
import type { AddressInfo } from "node:net";
import { tmpdir } from "node:os";
import path from "node:path";

import {
  DATABASE_NAME,
  dispose_database,
  GalleryImageRecordRepository,
  open_database,
  type StorageDatabase,
} from "@tavern-canvas/storage";
import { deleteDB } from "idb";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";

import { SdWebuiAdapter } from "../../packages/providers/src/index.js";
import { create_gateway_runtime, type GatewayRuntime } from "../../apps/gateway/src/index.js";
import { load_gateway_config } from "../../apps/gateway/src/config/load_config.js";
import type { GatewayAdapter } from "../../apps/gateway/src/jobs/job_worker.js";
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
 * The Gateway counterpart to `direct_cloud_flow.test.ts`: the same composition root, the same real
 * queue and storage, but generation runs through the REAL Express Gateway on a real loopback port
 * against a real provider upstream. Nothing about the client is stubbed -- `GatewayJobExecutor`
 * submits, follows SSE, downloads the finished asset and persists it -- so this is what proves the
 * defect Task 8 flagged is gone: with a Gateway endpoint configured the generation capability is
 * available and a submitted job reaches `completed`.
 */

const NAMESPACE = "primary";
const GATEWAY_TOKEN = "integration-gateway-bearer-token";
const TOKEN_REFERENCE = `tavern_canvas:${NAMESPACE}:gateway_access_token`;
const PROVIDER_CREDENTIAL = "gateway-side-provider-credential-never-sent-down";
const REQUEST_ID = "55555555-5555-4555-8555-555555555551";
const ANCHOR = "a".repeat(64);
const GENERATED_PNG_BASE64 =
  "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAA1BMVEUKFB5+TFI6AAAACXBIWXMAAAPo" +
  "AAAD6AG1e1JrAAAAG0lEQVRYw+3BgQAAAADDoPlT3+AEVQEAAAB8AxBAAAEZszF2AAAAAElFTkSuQmCC";

let upstream: Server;
let upstream_origin: string;
let upstream_request_paths: string[] = [];
let data_directory: string;
let gateway: GatewayRuntime;
let gateway_origin: string;

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
    gateway_protocol: { available: true },
  },
};

function server_origin(server: Server): string {
  const address = server.address();
  if (address === null || typeof address === "string") {
    throw new Error("server did not expose a loopback address");
  }
  return `http://127.0.0.1:${String((address as AddressInfo).port)}`;
}

/** Stands in for the operator's own SD WebUI. Only the Gateway ever talks to it. */
function create_upstream(): Server {
  return createServer((request: IncomingMessage, response: ServerResponse) => {
    upstream_request_paths.push(request.url ?? "");
    request.on("data", () => {});
    request.on("end", () => {
      response.writeHead(200, { "content-type": "application/json" });
      response.end(
        JSON.stringify({ images: [GENERATED_PNG_BASE64], info: JSON.stringify({ seed: 7 }) }),
      );
    });
  });
}

async function start_gateway(): Promise<void> {
  const config = load_gateway_config({
    cwd: data_directory,
    env: {
      TAVERN_CANVAS_BIND_HOST: "127.0.0.1",
      TAVERN_CANVAS_BIND_PORT: "8787",
      TAVERN_CANVAS_CORS_ORIGINS: JSON.stringify(["https://app.example"]),
      TAVERN_CANVAS_BEARER_TOKEN_HASHES: JSON.stringify([
        createHash("sha256").update(GATEWAY_TOKEN).digest("hex"),
      ]),
      TAVERN_CANVAS_DATA_DIR: data_directory,
      TAVERN_CANVAS_CONCURRENCY: "1",
      TAVERN_CANVAS_MAX_REQUEST_BYTES: "2000000",
      TAVERN_CANVAS_MAX_IMAGE_BYTES: "20000000",
      TAVERN_CANVAS_MAX_IMAGE_PIXELS: "40000000",
      TAVERN_CANVAS_MAX_IMAGE_DIMENSION: "8192",
      TAVERN_CANVAS_PROVIDER_PROFILES: JSON.stringify([
        {
          provider_id: "sd_webui",
          base_url: upstream_origin,
          credential: PROVIDER_CREDENTIAL,
          profile: {
            profile_id: "sd-webui-integration",
            provider_id: "sd_webui",
            model_allowlist: ["integration-model"],
            vae_allowlist: [],
            adetailer_model_allowlist: [],
            controlnet_model_allowlist: [],
            output_mime_type_allowlist: ["image/png"],
            max_response_bytes: 2_000_000,
            max_input_asset_bytes: 2_000_000,
          },
        },
      ]),
    },
  });
  gateway = create_gateway_runtime({
    config: { ...config, bind_port: 0 },
    adapters: new Map<GatewayAdapter["provider_id"], GatewayAdapter>([
      ["sd_webui", new SdWebuiAdapter()],
    ]),
  });
  await gateway.start();
  const server = gateway.server;
  if (server === undefined) {
    throw new Error("gateway did not start a server");
  }
  gateway_origin = server_origin(server);
}

interface GlobalsOptions {
  readonly token_secret_id: string | null;
  readonly acknowledged: boolean;
  readonly reveals_secrets?: boolean;
}

function create_globals(options: GlobalsOptions): {
  readonly globals: object;
  readonly host_calls: string[];
} {
  const host_calls: string[] = [];
  const host_fetch = vi.fn((route: string, init: { readonly body: string }) => {
    host_calls.push(`${route} ${init.body}`);
    if (route === "/api/secrets/find" && options.reveals_secrets !== false) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ value: GATEWAY_TOKEN }),
      });
    }
    return Promise.resolve({ ok: false, status: 403, json: () => Promise.resolve({}) });
  });
  const context = {
    getCurrentLocale: () => "en",
    getCurrentChatId: () => "chat-42",
    getRequestHeaders: () => ({ "X-CSRF-TOKEN": "csrf-token" }),
    eventSource: { on: vi.fn(), removeListener: vi.fn() },
    eventTypes: {
      GENERATION_STARTED: "generation_started",
      GENERATION_STOPPED: "generation_stopped",
      GENERATION_ENDED: "generation_ended",
      STREAM_TOKEN_RECEIVED: "stream_token_received",
      CHAT_CHANGED: "chat_changed",
      MESSAGE_SWIPED: "message_swiped",
    },
    registerFunctionTool: vi.fn(),
    unregisterFunctionTool: vi.fn(),
    extensionSettings: {
      tavern_canvas: {
        schema_version: 1,
        active_namespace: NAMESPACE,
        locale: "auto",
        active_provider_profile_id: null,
        global_concurrency: 1,
        auto_generation_enabled: false,
        fallback_generation_enabled: false,
        gateway: {
          endpoint: gateway_origin,
          token_secret_id: options.token_secret_id,
          http_acknowledgments: options.acknowledged
            ? { [gateway_origin]: "2026-08-08T00:00:00.000Z" }
            : {},
        },
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
      fetch: host_fetch,
    },
    host_calls,
  };
}

interface Harness {
  readonly composition: StudioComposition;
  readonly capabilities: StudioCapabilities;
  readonly database: StorageDatabase;
  readonly requests: string[];
  readonly host_calls: string[];
}

async function create_harness(
  options: GlobalsOptions = { token_secret_id: TOKEN_REFERENCE, acknowledged: true },
): Promise<Harness> {
  const database = await open_database();
  const { globals, host_calls } = create_globals(options);
  const requests: string[] = [];
  const composition = await compose_studio_capabilities({
    probe: READY_PROBE,
    globals,
    extension_version: "3.0.0-test",
    create_vocabulary_worker: null,
    estimate_storage: () => Promise.resolve(undefined),
    open_storage: () => Promise.resolve(database),
    provider_fetch: (input, init) => {
      const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
      requests.push(url);
      return globalThis.fetch(input, init);
    },
  });
  return { composition, capabilities: composition.capabilities, database, requests, host_calls };
}

function sd_request(): Record<string, unknown> {
  return {
    provider_id: "sd_webui",
    request_id: REQUEST_ID,
    generation_anchor: ANCHOR,
    prompt: "a lantern-lit canal at dusk",
    output_count: 1,
    mode: "txt2img",
    model_id: "integration-model",
    sampler: "Euler",
    scheduler: "Normal",
    width: 64,
    height: 64,
    steps: 1,
    cfg_scale: 1,
    seed: 42,
  };
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
    await vi.waitFor(() => expect(last?.state).toBe(state), { timeout: 15_000, interval: 10 });
    if (last === undefined) {
      throw new Error("no job update observed");
    }
    return last;
  } finally {
    unsubscribe();
  }
}

function generation_resolution(composition: StudioComposition) {
  return composition.resolutions.find((entry) => entry.capability_id === "generation");
}

beforeAll(async () => {
  upstream = create_upstream();
  await new Promise<void>((resolve, reject) => {
    upstream.once("error", reject);
    upstream.listen(0, "127.0.0.1", () => resolve());
  });
  upstream_origin = server_origin(upstream);
  data_directory = await mkdtemp(path.join(tmpdir(), "tavern-canvas-gateway-generation-"));
  await start_gateway();
}, 30_000);

afterAll(async () => {
  await gateway.stop().catch(() => undefined);
  await new Promise<void>((resolve) => upstream.close(() => resolve()));
  await rm(data_directory, { recursive: true, force: true });
});

afterEach(async () => {
  upstream_request_paths = [];
  await dispose_database();
  await deleteDB(DATABASE_NAME);
  vi.restoreAllMocks();
});

describe("gateway generation flow", () => {
  it("resolves generation as available when a Gateway endpoint and token are configured", async () => {
    const harness = await create_harness();

    expect(generation_resolution(harness.composition)?.status).toBe("available");
    await harness.composition.dispose();
  });

  it("carries a submitted job through the real Gateway and back into the image store", async () => {
    const harness = await create_harness();

    const submitted = await harness.capabilities.generation.submit({
      profile_id: "sd-webui-integration",
      request: sd_request() as never,
    });
    const completed = await wait_for_state(harness.capabilities, submitted.job_id, "completed");

    expect(completed.completed_image_ids).toHaveLength(1);

    const records = await new GalleryImageRecordRepository(harness.database).list(NAMESPACE);
    expect(records).toHaveLength(1);
    expect(records[0]?.provider_id).toBe("sd_webui");
    expect(records[0]?.media_type).toBe("image/png");

    // The provider was reached by the Gateway, from its own configured upstream.
    expect(upstream_request_paths).toEqual(["/sdapi/v1/txt2img"]);

    // Every client request went to the Gateway origin and nowhere else; the client never named
    // the upstream, and it carried the bearer token resolved from the host vault by reference.
    expect(harness.requests.length).toBeGreaterThan(0);
    for (const url of harness.requests) {
      expect(new URL(url).origin).toBe(gateway_origin);
    }
    expect(harness.requests.some((url) => url.endsWith("/content"))).toBe(true);
    expect(harness.host_calls).toContain(
      `/api/secrets/find ${JSON.stringify({ key: TOKEN_REFERENCE })}`,
    );
    await harness.composition.dispose();
  }, 30_000);

  it("keeps the Gateway token out of the timeline and the support bundle", async () => {
    const harness = await create_harness();

    const submitted = await harness.capabilities.generation.submit({
      profile_id: "sd-webui-integration",
      request: sd_request() as never,
    });
    await wait_for_state(harness.capabilities, submitted.job_id, "completed");

    const timeline = await harness.capabilities.diagnostics.load_timeline();
    expect(JSON.stringify(timeline)).not.toContain(GATEWAY_TOKEN);
    const bundle = await harness.capabilities.diagnostics.export_support_bundle();
    expect(JSON.stringify(bundle)).not.toContain(GATEWAY_TOKEN);
    expect(JSON.stringify(bundle)).not.toContain(PROVIDER_CREDENTIAL);
    await harness.composition.dispose();
  }, 30_000);

  it("names the missing Gateway token as the generation capability's reason", async () => {
    const harness = await create_harness({ token_secret_id: null, acknowledged: true });

    const row = generation_resolution(harness.composition);
    expect(row?.status).toBe("unavailable");
    expect(row?.reason).toMatch(/no Gateway access token is stored/u);
    await harness.composition.dispose();
  });

  it("names the unacknowledged cleartext origin as the generation capability's reason", async () => {
    const harness = await create_harness({
      token_secret_id: TOKEN_REFERENCE,
      acknowledged: false,
    });

    const row = generation_resolution(harness.composition);
    expect(row?.status).toBe("unavailable");
    expect(row?.reason).toMatch(/Cleartext Gateway origin has not been acknowledged/u);
    await harness.composition.dispose();
  });

  it("fails the job without reaching the Gateway when the host refuses to reveal the token", async () => {
    const harness = await create_harness({
      token_secret_id: TOKEN_REFERENCE,
      acknowledged: true,
      reveals_secrets: false,
    });

    const submitted = await harness.capabilities.generation.submit({
      profile_id: "sd-webui-integration",
      request: sd_request() as never,
    });
    const failed = await wait_for_state(harness.capabilities, submitted.job_id, "failed");

    expect(failed.error?.code).toBe("auth_failed");
    expect(harness.requests).toEqual([]);
    await harness.composition.dispose();
  }, 30_000);
});
