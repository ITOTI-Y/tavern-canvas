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

const BLOCKED_PROBE: BootstrapProbeResult = {
  ready: false,
  error_code: "tavern_helper_missing",
  missing_capabilities: ["tavern_helper"],
};

/** A host complete enough for the composite adapter plus the settings/secret surfaces. */
function create_globals(overrides: { readonly with_settings?: boolean } = {}): object {
  const context: Record<string, unknown> = {
    getCurrentLocale: () => "en",
    getCurrentChatId: () => "chat-42",
    getRequestHeaders: () => ({ "Content-Type": "application/json" }),
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
  };
  if (overrides.with_settings !== false) {
    context.extensionSettings = {};
    context.saveSettingsDebounced = vi.fn();
  }
  return {
    TavernHelper: {
      getTavernHelperVersion: () => "4.9.1",
      generateRaw: vi.fn(),
      getChatMessages: vi.fn(() => []),
      setChatMessages: vi.fn(),
    },
    SillyTavern: { getContext: () => context },
    fetch: create_secrets_fetch(),
  };
}

/** Answers the two SillyTavern secret-vault routes the composed capabilities actually call. */
function create_secrets_fetch() {
  const vault = new Map<string, string>();
  return vi.fn((route: string, init: { readonly body: string }) => {
    const request = JSON.parse(init.body) as { key?: string; value?: string };
    if (route === "/api/secrets/write" && request.key !== undefined) {
      vault.set(request.key, request.value ?? "");
      return Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve({ id: "1" }) });
    }
    if (route === "/api/secrets/read") {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () =>
          Promise.resolve(
            Object.fromEntries([...vault.keys()].map((key) => [key, [{ active: true }]])),
          ),
      });
    }
    if (route === "/api/secrets/find") {
      const value = vault.get(request.key ?? "");
      return value === undefined
        ? Promise.resolve({ ok: false, status: 404, json: () => Promise.resolve({}) })
        : Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve({ value }) });
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
        "knowledge",
        "llm_connections",
        "migration",
        "personas",
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
      "migration",
      "settings",
      "diagnostics",
      "llm_connections",
      "personas",
      "knowledge",
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
      "migration",
      "llm_connections",
      "personas",
      "knowledge",
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
    expect(status_of(composition.resolutions, "migration")).toBe("unavailable");
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
    expect(composition.resolutions).toHaveLength(12);
    expect(status_of(composition.resolutions, "generation")).toBe("unavailable");
    // Diagnostics stays real so the shell can still explain why everything else is blocked.
    expect(status_of(composition.resolutions, "diagnostics")).toBe("available");
    await composition.dispose();
  });

  it("reports the real capability matrix and storage estimate through diagnostics", async () => {
    const composition = await compose();

    await expect(composition.capabilities.diagnostics.load()).resolves.toMatchObject({
      capability_matrix: READY_PROBE.ready ? READY_PROBE.matrix : {},
      helper_version: "4.9.1",
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
    expect(bundle.redacted_settings.capability_resolutions).toHaveLength(12);
    expect(JSON.stringify(bundle.redacted_settings)).not.toContain("token_secret_id");
    await composition.dispose();
  });

  it("selects the permanently-unavailable chat gesture port on a standard SillyTavern host", async () => {
    const composition = await compose();

    expect(composition.chat_media.capability.available).toBe(false);
    expect(composition.chat_media.capability.reason).toContain("no message-media gesture hook");
    expect(composition.modules).toHaveLength(0);
    await composition.dispose();
  });

  it("registers the Tauri chat surface module and a live gesture port when TauriTavern is present", async () => {
    const composition = await compose({
      probe: {
        ...READY_PROBE,
        matrix: {
          ...(READY_PROBE.ready ? READY_PROBE.matrix : {}),
          tauri_chat_surface: { available: true },
        },
      } as BootstrapProbeResult,
    });

    expect(composition.chat_media.capability.available).toBe(true);
    expect(composition.modules.map((module) => module.module_id)).toEqual(["tauri_chat_surface"]);
    await composition.dispose();
  });

  it("persists a provider profile through the real repository and reads it back", async () => {
    const composition = await compose();
    const profile_id = "11111111-1111-4111-8111-111111111111";

    const saved = await composition.capabilities.profiles.save({
      id: profile_id,
      provider_id: "sd_webui",
      display_name: "Local SD",
      is_default: true,
      updated_at: "",
      secret_reference: null,
    });

    expect(saved.display_name).toBe("Local SD");
    await expect(composition.capabilities.profiles.load()).resolves.toMatchObject([
      { id: profile_id, provider_id: "sd_webui", display_name: "Local SD", is_default: true },
    ]);
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

  it("round-trips a persona through the version 1 character_profiles store", async () => {
    const composition = await compose();
    const persona_id = "33333333-3333-4333-8333-333333333333";

    await composition.capabilities.personas.save({
      id: persona_id,
      display_name: "Ling",
      role: "user",
      description: "A cartographer",
      greeting: "Charts, then tea.",
      avatar_image_id: null,
      is_active: true,
    });

    await expect(composition.capabilities.personas.load()).resolves.toMatchObject([
      { id: persona_id, display_name: "Ling", role: "user", is_active: true },
    ]);
    await composition.dispose();
  });

  it("round-trips a knowledge entry through the version 1 knowledge_entries store", async () => {
    const composition = await compose();
    const entry_id = "44444444-4444-4444-8444-444444444444";

    await composition.capabilities.knowledge.save({
      id: entry_id,
      title: "Harbour district",
      source_type: "manual",
      content: "Fog rolls in after dusk.",
      keywords: ["harbour"],
      priority: 10,
      enabled: true,
    });
    await composition.capabilities.knowledge.set_enabled(entry_id, false);

    await expect(composition.capabilities.knowledge.load()).resolves.toMatchObject([
      { id: entry_id, title: "Harbour district", enabled: false },
    ]);
    await composition.dispose();
  });

  it("round-trips an LLM connection through the version 3 llm_connections store", async () => {
    const composition = await compose();
    const connection_id = "55555555-5555-4555-8555-555555555555";

    const saved = await composition.capabilities.llm_connections.save({
      id: connection_id,
      display_name: "GPT",
      provider_kind: "openai_compatible",
      route: "/v1/chat/completions",
      model_id: "gpt-5",
      temperature: 0.7,
      max_output_tokens: 2_048,
      is_default: true,
    });

    expect(saved.credential_reference).toBeNull();
    await expect(composition.capabilities.llm_connections.load()).resolves.toMatchObject([
      { id: connection_id, display_name: "GPT", provider_kind: "openai_compatible" },
    ]);
    await composition.dispose();
  });

  it("stores an LLM credential by reference and never returns the plaintext", async () => {
    const composition = await compose();
    const connection_id = "66666666-6666-4666-8666-666666666666";
    await composition.capabilities.llm_connections.save({
      id: connection_id,
      display_name: "GPT",
      provider_kind: "openai_compatible",
      route: "/v1/chat/completions",
      model_id: "gpt-5",
      temperature: 0.7,
      max_output_tokens: 2_048,
      is_default: false,
    });

    const updated = await composition.capabilities.llm_connections.set_credential(
      connection_id,
      "sk-compose-canary",
    );

    expect(updated.credential_reference).toBe(
      `tavern_canvas:primary:${connection_id}:llm_profile_api_key`,
    );
    const stored = await composition.capabilities.llm_connections.load();
    expect(JSON.stringify(stored)).not.toContain("sk-compose-canary");
    await composition.dispose();
  });

  it("rejects asset categories that have no v3 store instead of silently dropping them", async () => {
    const composition = await compose();

    await expect(
      composition.capabilities.assets.save("lora", {
        id: "22222222-2222-4222-8222-222222222222",
        category: "lora",
        record_key: "",
        display_name: "Anime LoRA",
        payload: {},
      }),
    ).rejects.toMatchObject({ code: CAPABILITY_UNAVAILABLE_CODE });

    const records = await composition.capabilities.assets.load();
    expect(records.lora).toEqual([]);
    await composition.dispose();
  });
});

describe("create_provider_transport", () => {
  it("builds a direct transport for a loopback provider endpoint", () => {
    const transport = create_provider_transport({
      gateway_endpoint: null,
      http_acknowledgments: {},
      tauri_provider_available: false,
      sillytavern_available: false,
      direct_provider_base_url: "http://127.0.0.1:7860",
      direct_cloud: null,
    });

    expect(transport.execute).toBeTypeOf("function");
  });

  it("refuses a non-loopback direct endpoint", () => {
    expect(() =>
      create_provider_transport({
        gateway_endpoint: null,
        http_acknowledgments: {},
        tauri_provider_available: false,
        sillytavern_available: false,
        direct_provider_base_url: "http://provider.example.com",
        direct_cloud: null,
      }),
    ).toThrowError(/loopback/u);
  });

  it("refuses to drive the job executor from a transport it cannot honor", () => {
    expect(() =>
      create_provider_transport({
        gateway_endpoint: "https://gateway.example.com",
        http_acknowledgments: {},
        tauri_provider_available: false,
        sillytavern_available: false,
        direct_provider_base_url: null,
        direct_cloud: null,
      }),
    ).toThrowError(/cannot drive the job executor/u);
  });
});
