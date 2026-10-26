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
import { deleteDB } from "idb";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  compose_studio_capabilities,
  type StudioComposition,
} from "../../apps/extension/src/bootstrap/compose_capabilities.js";
import type { BootstrapProbeResult } from "../../apps/extension/src/host/index.js";
import { create_standard_host, READY_PROBE } from "../harness/src/standard_host.js";
import type {
  GenerationJobSummary,
  StudioCapabilities,
} from "../../apps/extension/src/ui/contracts/ui_capabilities.js";

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

const HOST_SETTINGS = {
  schema_version: 1,
  active_namespace: NAMESPACE,
  locale: "auto",
  credential_storage_mode: "host",
  active_provider_profile_id: PROFILE_ID,
  global_concurrency: 2,
  auto_generation_enabled: false,
  vocabulary_update_channel: "bundled",
  gateway: { endpoint: null, token_secret_id: null, http_acknowledgments: {} },
  ui: {
    color_mode: "system",
    inspector_width: 320,
    inspector_collapsed: false,
    optional_entry_enabled: false,
  },
};

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
  globals: object = create_standard_host({ settings: HOST_SETTINGS }).globals,
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

    expect(harness.requests).toHaveLength(1);
    expect(harness.requests[0]?.url).toBe(`${PROVIDER_ORIGIN}/sdapi/v1/txt2img`);
    expect(harness.requests[0]?.body).toContain("a rainy alley at night");

    const records = await new GalleryImageRecordRepository(harness.database).list(NAMESPACE);
    expect(records).toHaveLength(1);
    expect(records[0]?.media_type).toBe("image/png");
    expect(records[0]?.provider_id).toBe("sd_webui");

    await expect(harness.capabilities.gallery.load()).resolves.toMatchObject([
      { id: completed.completed_image_ids[0], provider_id: "sd_webui", media_type: "image/png" },
    ]);
    await expect(
      harness.capabilities.gallery.read_bytes(completed.completed_image_ids[0] ?? ""),
    ).resolves.toBeInstanceOf(Uint8Array);

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
