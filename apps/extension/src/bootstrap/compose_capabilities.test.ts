import "fake-indexeddb/auto";

import { deleteDB } from "idb";
import { DATABASE_NAME, dispose_database } from "@tavern-canvas/storage";
import { afterEach, describe, expect, it, vi } from "vitest";

import type { BootstrapProbeResult } from "../host/index.js";
import type { CapabilityId } from "../ui/contracts/ui_capabilities.js";
import {
  compose_studio_capabilities,
  create_provider_transport,
  type ComposeCapabilitiesOptions,
} from "./compose_capabilities.js";
import { CAPABILITY_UNAVAILABLE_CODE } from "./capability_resolution.js";

const READY_PROBE: BootstrapProbeResult = {
  ready: true,
  helper_version: "4.11.1",
  matrix: {
    main_generation_events: { available: true },
    preset_generation: { available: true },
    message_swipe_metadata: { available: true },
    tavern_regex: { available: true },
    tavern_helper: { available: true },
    gateway_protocol: { available: false, reason: "Gateway protocol is not connected" },
  },
};

const BLOCKED_PROBE: BootstrapProbeResult = {
  ready: false,
  error_code: "tavern_helper_missing",
  missing_capabilities: ["tavern_helper"],
};

function create_globals(overrides: { readonly with_settings?: boolean } = {}): object {
  const context: Record<string, unknown> = {
    getCurrentLocale: () => "en",
    getCurrentChatId: () => "chat-42",
    getRequestHeaders: () => ({ "Content-Type": "application/json" }),
    chat: [],
    saveChat: vi.fn(() => Promise.resolve()),
    eventSource: { on: vi.fn(), removeListener: vi.fn() },
    eventTypes: {
      GENERATION_STARTED: "generation_started",
      GENERATION_STOPPED: "generation_stopped",
      GENERATION_ENDED: "generation_ended",
      CHAT_CHANGED: "chat_id_changed",
      MESSAGE_SWIPED: "message_swiped",
      MESSAGE_UPDATED: "message_updated",
      MESSAGE_EDITED: "message_edited",
      CHARACTER_MESSAGE_RENDERED: "character_message_rendered",
      MORE_MESSAGES_LOADED: "more_messages_loaded",
    },
  };
  if (overrides.with_settings !== false) {
    context.extensionSettings = {};
    context.saveSettingsDebounced = vi.fn();
  }
  return {
    TavernHelper: {
      getTavernHelperVersion: () => "4.11.1",
      getChatMessages: vi.fn(() => []),
      setChatMessages: vi.fn(),
      generate: vi.fn(),
      stopGenerationById: vi.fn(),
      getWorldbookNames: vi.fn(() => []),
      getWorldbook: vi.fn(() => Promise.resolve([])),
      getTavernRegexes: vi.fn(() => []),
      replaceTavernRegexes: vi.fn(),
      retrieveDisplayedMessage: vi.fn(() => ({ get: () => undefined })),
    },
    SillyTavern: { getContext: () => context },
    fetch: create_secrets_fetch(),
    location: { href: "https://example.test/", origin: "https://example.test" },
  };
}

function create_secrets_fetch() {
  const vault = new Map<string, string>();
  return vi.fn((route: string, init: { readonly body: string }) => {
    const request = JSON.parse(init.body) as { key?: string; value?: string };
    if (route === "/api/secrets/write" && request.key !== undefined) {
      vault.set(request.key, request.value ?? "");
      return Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve({ id: "1" }) });
    }
    if (route === "/api/secrets/delete" && request.key !== undefined) {
      vault.delete(request.key);
      return Promise.resolve({ ok: true, status: 204, json: () => Promise.resolve({}) });
    }
    if (route === "/api/secrets/view") {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () =>
          Promise.resolve(
            Object.fromEntries([...vault.entries()].map(([key, value]) => [key, value])),
          ),
      });
    }
    return Promise.resolve({ ok: false, status: 500, json: () => Promise.resolve({}) });
  });
}

function compose(options: Partial<ComposeCapabilitiesOptions> = {}) {
  return compose_studio_capabilities({
    probe: READY_PROBE,
    globals: create_globals(),
    extension_version: "3.0.0-test",
    create_vocabulary_worker: null,
    estimate_storage: () => Promise.resolve({ usage: 1024, quota: 4096 }),
    ...options,
  });
}

function status_of(
  resolutions: readonly { capability_id: CapabilityId; status: string }[],
  capability_id: CapabilityId,
): string {
  const row = resolutions.find((entry) => entry.capability_id === capability_id);
  if (row === undefined) {
    throw new Error(`No resolution recorded for ${capability_id}`);
  }
  return row.status;
}

afterEach(async () => {
  await dispose_database();
  await deleteDB(DATABASE_NAME);
  vi.restoreAllMocks();
});

describe("compose_studio_capabilities", () => {
  it("records exactly one resolution per Studio capability", async () => {
    const composition = await compose();

    expect(composition.resolutions.map((entry) => entry.capability_id).sort()).toEqual(
      [
        "assets",
        "diagnostics",
        "gallery",
        "generation",
        "novelai",
        "profiles",
        "prompt_presets",
        "settings",
        "vocabulary",
      ].sort(),
    );
    await composition.dispose();
  });

  it("resolves every storage-backed capability to a real implementation when IndexedDB opens", async () => {
    const composition = await compose();

    for (const capability_id of [
      "profiles",
      "prompt_presets",
      "assets",
      "gallery",
      "settings",
      "diagnostics",
      "novelai",
    ] as const) {
      expect(status_of(composition.resolutions, capability_id)).toBe("available");
    }
    await expect(composition.capabilities.profiles.load()).resolves.toEqual([]);
    await expect(composition.capabilities.gallery.load()).resolves.toEqual([]);
    await composition.dispose();
  });

  it("falls back to unavailable with a reason when IndexedDB cannot be opened", async () => {
    const composition = await compose({
      open_storage: () => Promise.reject(new Error("no indexeddb here")),
    });

    for (const capability_id of [
      "profiles",
      "prompt_presets",
      "assets",
      "gallery",
      "generation",
      "vocabulary",
      "novelai",
    ] as const) {
      const row = composition.resolutions.find((entry) => entry.capability_id === capability_id);
      expect(row?.status).toBe("unavailable");
      expect(row?.reason).toBeTruthy();
    }
    await composition.dispose();
  });

  it("resolves settings to unavailable when the host exposes no extension settings surface", async () => {
    const composition = await compose({
      globals: create_globals({ with_settings: false }),
    });

    expect(status_of(composition.resolutions, "settings")).toBe("unavailable");
    await composition.dispose();
  });

  it("blocks an unavailable capability's load with the stable capability_unavailable code", async () => {
    const composition = await compose({ create_vocabulary_worker: null });

    await expect(composition.capabilities.vocabulary.load()).rejects.toMatchObject({
      code: CAPABILITY_UNAVAILABLE_CODE,
    });
    await composition.dispose();
  });

  it("never throws while composing, even with a blocked probe and no host at all", async () => {
    const composition = await compose_studio_capabilities({
      probe: BLOCKED_PROBE,
      globals: {},
      create_vocabulary_worker: null,
      estimate_storage: () => Promise.resolve(undefined),
    });

    expect(composition.host).toBeNull();
    expect(composition.resolutions).toHaveLength(9);
    expect(status_of(composition.resolutions, "generation")).toBe("unavailable");
    // Diagnostics stays real so the shell can still explain why everything else is blocked.
    expect(status_of(composition.resolutions, "diagnostics")).toBe("available");
    await composition.dispose();
  });

  it("reports the real capability matrix and storage estimate through diagnostics", async () => {
    const composition = await compose();

    await expect(composition.capabilities.diagnostics.load()).resolves.toMatchObject({
      capability_matrix: READY_PROBE.ready ? READY_PROBE.matrix : {},
      helper_version: "4.11.1",
      storage_usage_bytes: 1024,
      storage_quota_bytes: 4096,
    });
    await composition.dispose();
  });

  it("reports a failed connection test rather than a fake success when no gateway is configured", async () => {
    const composition = await compose();

    await expect(composition.capabilities.diagnostics.test_connection()).resolves.toEqual({
      status: "failed",
      code: "gateway_not_configured",
    });
    await composition.dispose();
  });

  it("carries every capability resolution into the support bundle", async () => {
    const composition = await compose();

    const bundle = await composition.capabilities.diagnostics.export_support_bundle();
    expect(bundle.version).toBe("3.0.0-test");
    expect(bundle.redacted_settings.capability_resolutions).toHaveLength(9);
    expect(JSON.stringify(bundle.redacted_settings)).not.toContain("token_secret_id");
    await composition.dispose();
  });

  it("persists a provider profile through the real repository and reads it back", async () => {
    const composition = await compose();
    await composition.capabilities.settings.update({ credential_storage_mode: "host" });
    const profile_id = "11111111-1111-4111-8111-111111111111";

    const saved = await composition.capabilities.profiles.save({
      id: profile_id,
      provider_id: "sd_webui",
      display_name: "Local SD",
      model_id: "sdxl-base",
      workflow_id: null,
      is_default: true,
      updated_at: "",
    });

    expect(saved).toMatchObject({ display_name: "Local SD", model_id: "sdxl-base" });
    await expect(composition.capabilities.profiles.load()).resolves.toMatchObject([
      {
        id: profile_id,
        provider_id: "sd_webui",
        display_name: "Local SD",
        model_id: "sdxl-base",
        is_default: true,
      },
    ]);
    await expect(
      composition.capabilities.profiles.set_credential(profile_id, "   "),
    ).rejects.toBeInstanceOf(TypeError);
    const configured = await composition.capabilities.profiles.set_credential(
      profile_id,
      "provider-credential-canary",
    );
    expect(configured.credential_reference).toBe(
      `tavern_canvas:primary:${profile_id}:provider_api_key`,
    );
    expect(JSON.stringify(await composition.capabilities.profiles.load())).not.toContain(
      "provider-credential-canary",
    );
    const cleared = await composition.capabilities.profiles.clear_credential(profile_id);
    expect(cleared.credential_reference).toBeNull();
    await composition.dispose();
  });

  it("persists a prompt preset draft round trip through the real repository", async () => {
    const composition = await compose();

    const summary = await composition.capabilities.prompt_presets.save_draft({
      id: null,
      display_name: "Cinematic",
      group: "styles",
      fixed_positive_prompt: "masterpiece",
      fixed_negative_prompt: "lowres",
      replacement_rules: [{ id: "r1", triggers: ["rain"], replacement: "storm" }],
      regex_rules: [{ id: "x1", pattern: "a", flags: "g", replacement: "b" }],
    });

    await expect(
      composition.capabilities.prompt_presets.load_draft(summary.id),
    ).resolves.toMatchObject({
      display_name: "Cinematic",
      group: "styles",
      fixed_positive_prompt: "masterpiece",
      replacement_rules: [{ id: "r1", triggers: ["rain"], replacement: "storm" }],
      regex_rules: [{ id: "x1", pattern: "a", flags: "g", replacement: "b" }],
    });
    await composition.dispose();
  });

  it("stores LoRA entries in their own store", async () => {
    const composition = await compose();

    await composition.capabilities.assets.save("lora", {
      id: "22222222-2222-4222-8222-222222222222",
      category: "lora",
      record_key: "",
      display_name: "Anime LoRA",
      payload: { file_name: "anime_v2", weight: 0.8 },
    });

    const records = await composition.capabilities.assets.load();
    expect(records.lora).toMatchObject([
      { display_name: "Anime LoRA", payload: { file_name: "anime_v2", weight: 0.8 } },
    ]);
    expect(records.character).toEqual([]);
    await composition.dispose();
  });

  it("brings back records from an exported archive into the active data", async () => {
    const composition = await compose();
    const { assets, settings } = composition.capabilities;
    await assets.save("character", {
      id: "33333333-3333-4333-8333-333333333333",
      category: "character",
      record_key: "",
      display_name: "Seraphina",
      payload: { appearance: "pink hair" },
    });
    const archive = await settings.export_archive();
    await assets.remove("character", "33333333-3333-4333-8333-333333333333");

    await settings.import_archive(archive);

    expect((await assets.load()).character).toMatchObject([
      { display_name: "Seraphina", payload: { appearance: "pink hair" } },
    ]);
    await composition.dispose();
  });
});

describe("create_provider_transport", () => {
  it("builds a direct transport for a loopback provider endpoint", () => {
    const transport = create_provider_transport({
      kind: "local_direct",
      endpoint: "http://127.0.0.1:7860",
    });

    expect(transport.execute).toBeTypeOf("function");
  });

  it("refuses a non-loopback direct endpoint", () => {
    expect(() =>
      create_provider_transport({ kind: "local_direct", endpoint: "http://provider.example.com" }),
    ).toThrowError(/loopback/u);
  });

  it("refuses to drive the job executor from a transport it cannot honor", () => {
    expect(() =>
      create_provider_transport({ kind: "gateway", endpoint: "https://gateway.example" }),
    ).toThrowError(/cannot drive the job executor/u);
  });
});
