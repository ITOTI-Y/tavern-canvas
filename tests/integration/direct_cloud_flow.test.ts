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
import { create_standard_host, READY_PROBE } from "../harness/src/standard_host.js";
import type {
  GenerationJobSummary,
  StudioCapabilities,
} from "../../apps/extension/src/ui/contracts/ui_capabilities.js";

const PROFILE_ID = "11111111-1111-4111-8111-111111111111";
const REQUEST_ID = "22222222-2222-4222-8222-222222222222";
const ANCHOR = "a".repeat(64);
const NAMESPACE = "primary";
const VAULT_REFERENCE = `tavern_canvas:${NAMESPACE}:${PROFILE_ID}:novelai_token`;
const PLAINTEXT_CREDENTIAL = "pst-integration-canary-credential";

const NOVELAI_RESPONSE = JSON.parse(
  readFileSync(
    resolve(import.meta.dirname, "../fixtures/providers/novelai/generate_response.json"),
    "utf8",
  ),
) as { readonly images: readonly unknown[] };

interface HostFetchCall {
  readonly route: string;
  readonly body: string;
}

function create_globals(options: { readonly reveals_secrets: boolean }): {
  readonly globals: object;
  readonly host_calls: HostFetchCall[];
} {
  const host_calls: HostFetchCall[] = [];
  const host_fetch = vi.fn((route: string, init: { readonly body: string }) => {
    host_calls.push({ route, body: init.body });
    if (route === "/api/secrets/view" && options.reveals_secrets) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ [VAULT_REFERENCE]: PLAINTEXT_CREDENTIAL }),
      });
    }
    return Promise.resolve({ ok: false, status: 403, json: () => Promise.resolve({}) });
  });
  const { globals } = create_standard_host({
    settings: {
      schema_version: 1,
      active_namespace: NAMESPACE,
      locale: "auto",
      credential_storage_mode: "host",
      active_provider_profile_id: PROFILE_ID,
      global_concurrency: 2,
      auto_generation_enabled: false,
      vocabulary_update_channel: "bundled",
      ui: {
        color_mode: "system",
        inspector_width: 320,
        inspector_collapsed: false,
        optional_entry_enabled: false,
      },
    },
    fetch: host_fetch,
  });
  return {
    globals,
    host_calls,
  };
}

async function seed_cloud_profile(
  database: StorageDatabase,
  options: { readonly with_credential: boolean },
): Promise<void> {
  await new ProviderProfileRepository(database).put(NAMESPACE, {
    schema_version: 1,
    id: PROFILE_ID,
    namespace: NAMESPACE,
    record_key: `${NAMESPACE}:${PROFILE_ID}`,
    created_at: "2026-08-07T00:00:00.000Z",
    updated_at: "2026-08-07T00:00:00.000Z",
    provider_id: "novelai",
    payload: {
      display_name: "NovelAI",
      is_default: true,
      ...(options.with_credential ? { vault_key: VAULT_REFERENCE } : {}),
      provider_profile: {
        model_allowlist: ["nai-diffusion-4-5-full"],
        output_mime_type_allowlist: ["image/png"],
        max_response_bytes: 2_000_000,
        max_archive_entries: 8,
        max_input_asset_bytes: 2_000_000,
      },
    },
  });
}

function novelai_request() {
  return {
    provider_id: "novelai",
    action: "generate",
    request_id: REQUEST_ID,
    generation_anchor: ANCHOR,
    prompt: "a lantern-lit canal at dusk",
    negative_prompt: "lowres",
    output_count: 1,
    model_id: "nai-diffusion-4-5-full",
    sampler: "k_euler_ancestral",
    width: 1024,
    height: 1024,
    steps: 28,
    scale: 5,
    cfg_rescale: 0,
    noise_schedule: "karras",
    seed: 42,
    quality_preset: "standard",
    undesired_content_preset: "heavy",
    smea: false,
    dyn: false,
    variety_plus: false,
  } as const;
}

interface Harness {
  readonly composition: StudioComposition;
  readonly capabilities: StudioCapabilities;
  readonly database: StorageDatabase;
  readonly requests: { url: string; headers: Record<string, string>; body: string }[];
  readonly host_calls: HostFetchCall[];
}

async function create_harness(
  options: {
    readonly with_credential?: boolean;
    readonly reveals_secrets?: boolean;
    readonly respond?: () => Promise<Response>;
  } = {},
): Promise<Harness> {
  const database = await open_database();
  await seed_cloud_profile(database, { with_credential: options.with_credential !== false });
  const { globals, host_calls } = create_globals({
    reveals_secrets: options.reveals_secrets !== false,
  });
  const requests: { url: string; headers: Record<string, string>; body: string }[] = [];

  const composition = await compose_studio_capabilities({
    probe: READY_PROBE,
    globals,
    extension_version: "3.0.0-test",
    create_vocabulary_worker: null,
    estimate_storage: () => Promise.resolve(undefined),
    open_storage: () => Promise.resolve(database),
    provider_fetch: (input, init) => {
      requests.push({
        url: request_url(input),
        headers: Object.fromEntries(new Headers(init?.headers).entries()),
        body: request_body(init),
      });
      return (options.respond ?? (() => Promise.resolve(json_response(NOVELAI_RESPONSE))))();
    },
  });

  return { composition, capabilities: composition.capabilities, database, requests, host_calls };
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

describe("direct cloud generation flow", () => {
  it("resolves generation for a cloud profile that names a stored credential", async () => {
    const harness = await create_harness();

    expect(
      harness.composition.resolutions.find((entry) => entry.capability_id === "generation")?.status,
    ).toBe("available");
    await harness.composition.dispose();
  });

  it("carries a cloud job to the catalog URL with the vendor auth header and back into storage", async () => {
    const harness = await create_harness();

    const submitted = await harness.capabilities.generation.submit({
      profile_id: PROFILE_ID,
      request: novelai_request(),
    });
    const completed = await wait_for_state(harness.capabilities, submitted.job_id, "completed");
    expect(completed.completed_image_ids).toHaveLength(1);

    expect(harness.requests).toHaveLength(1);
    expect(harness.requests[0]?.url).toBe("https://image.novelai.net/ai/generate-image");
    expect(harness.requests[0]?.headers.authorization).toBe(`Bearer ${PLAINTEXT_CREDENTIAL}`);
    expect(harness.requests[0]?.body).toContain("lantern-lit canal");

    expect(harness.host_calls).toEqual([{ route: "/api/secrets/view", body: JSON.stringify({}) }]);

    const records = await new GalleryImageRecordRepository(harness.database).list(NAMESPACE);
    expect(records).toHaveLength(1);
    expect(records[0]?.provider_id).toBe("novelai");
    await harness.composition.dispose();
  });

  it("keeps the credential out of the timeline and the support bundle", async () => {
    const harness = await create_harness();

    const submitted = await harness.capabilities.generation.submit({
      profile_id: PROFILE_ID,
      request: novelai_request(),
    });
    await wait_for_state(harness.capabilities, submitted.job_id, "completed");

    const timeline = await harness.capabilities.diagnostics.load_timeline();
    expect(JSON.stringify(timeline)).not.toContain(PLAINTEXT_CREDENTIAL);
    const bundle = await harness.capabilities.diagnostics.export_support_bundle();
    expect(JSON.stringify(bundle)).not.toContain(PLAINTEXT_CREDENTIAL);
    await harness.composition.dispose();
  });

  it("fails the job without a network call when the host refuses to reveal the credential", async () => {
    const harness = await create_harness({ reveals_secrets: false });

    const submitted = await harness.capabilities.generation.submit({
      profile_id: PROFILE_ID,
      request: novelai_request(),
    });
    const failed = await wait_for_state(harness.capabilities, submitted.job_id, "failed");

    expect(failed.error?.code).toBeTruthy();
    expect(harness.requests).toEqual([]);
    await harness.composition.dispose();
  });

  it("fails the job without a network call when the profile has no credential", async () => {
    const harness = await create_harness({ with_credential: false });

    const submitted = await harness.capabilities.generation.submit({
      profile_id: PROFILE_ID,
      request: novelai_request(),
    });
    const failed = await wait_for_state(harness.capabilities, submitted.job_id, "failed");

    expect(failed.error).toEqual({ code: "provider_unavailable", retryable: false });
    expect(harness.requests).toEqual([]);
    await harness.composition.dispose();
  });
});
