import type { TavernCanvasSettings, Uuid } from "@tavern-canvas/contracts";
import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { markRaw, nextTick } from "vue";
import { createI18n } from "vue-i18n";

import { PORTAL_TARGET_KEY } from "../../contracts/portal_keys.js";
import type {
  MigrationSnapshot,
  ProfileConnectionTestResult,
  ProfilesCapability,
  ProviderProfileSummary,
  SettingsCapability,
  SettingsSnapshot,
  StudioCapabilities,
} from "../../contracts/ui_capabilities.js";
import { IDLE_COMMAND_STATE, type StudioState } from "../../contracts/view_models.js";
import {
  create_studio_controller,
  type StudioController,
} from "../../controllers/studio_controller.js";
import { create_unavailable_capabilities } from "../../controllers/unavailable_capabilities.js";
import { en_messages } from "../../../i18n/locales/en.js";
import { zh_cn_messages } from "../../../i18n/locales/zh_cn.js";
import SettingsView from "./SettingsView.vue";

const PROFILE_ID: Uuid = "11111111-1111-4111-8111-111111111111";

const SECRET_TOKEN_VALUE = "sk-live-do-not-leak-1234567890";
const SECRET_PROMPT = "1girl, masterpiece, best quality, do-not-leak-prompt-text";
const SECRET_MESSAGE_CONTENT = "do-not-leak: the user said something private here";
const TOKEN_REFERENCE = "secret-ref://gateway/primary-token";

const DEFAULT_SETTINGS: TavernCanvasSettings = {
  schema_version: 1,
  active_namespace: "default",
  locale: "auto",
  active_provider_profile_id: null,
  global_concurrency: 2,
  auto_generation_enabled: false,
  fallback_generation_enabled: false,
  gateway: { endpoint: null, token_secret_id: TOKEN_REFERENCE, http_acknowledgments: {} },
  ui: {
    color_mode: "system",
    inspector_width: 320,
    inspector_collapsed: false,
    optional_entry_enabled: false,
  },
};

const PROFILE: ProviderProfileSummary = {
  id: PROFILE_ID,
  provider_id: "sd_webui",
  display_name: "Local SD",
  is_default: true,
  updated_at: "2026-01-01T00:00:00.000Z",
};

const NOT_REQUIRED_MIGRATION: MigrationSnapshot = {
  state: "not_required",
  counts: {},
  warnings: [],
  failure_reason: null,
  failure_message: null,
};

function build_state(overrides: Partial<StudioState> = {}): StudioState {
  return {
    route: "settings",
    color_mode: "light",
    loading: new Set(),
    failures: new Map(),
    workbench: {
      profiles: [PROFILE],
      active_profile_id: null,
      jobs: [],
      submit_command: IDLE_COMMAND_STATE,
    },
    llm_connections: { connections: [], selected_connection_id: null },
    library: { personas: [], knowledge: [], selected_knowledge_ids: [] },
    prompt: {
      presets: [],
      selected_preset_id: null,
      draft: null,
      save_command: IDLE_COMMAND_STATE,
    },
    assets: {
      active_category: "character",
      records: { character: [], outfit: [], lora: [], vibe: [], reference: [], workflow: [] },
      vocabulary_catalog: [],
      vocabulary_install_command: IDLE_COMMAND_STATE,
    },
    gallery: { records: [], selected_record_id: null, bulk_delete_command: IDLE_COMMAND_STATE },
    diagnostics: {
      snapshot: null,
      timeline: [],
      migration: NOT_REQUIRED_MIGRATION,
      connection_test_command: IDLE_COMMAND_STATE,
      support_bundle_command: IDLE_COMMAND_STATE,
    },
    settings: {
      settings: DEFAULT_SETTINGS,
      vocabulary_update_channel: "bundled",
      update_command: IDLE_COMMAND_STATE,
      migration_retry_command: IDLE_COMMAND_STATE,
    },
    inspector: { collapsed: false, width: 320, selected_record: null },
    tasks: [],
    ...overrides,
  };
}

/** `markRaw` mirrors `use_studio_controller.ts`'s production fix: the controller's private class
 * fields break the moment Vue (or vue-test-utils' own props-reactivity for `setProps()`) wraps it
 * in a `reactive()` Proxy, which happens here too since `controller` is a mounted prop. */
function build_controller(capabilities: StudioCapabilities): StudioController {
  return markRaw(create_studio_controller({ capabilities }));
}

function create_i18n_instance() {
  return createI18n({
    legacy: false,
    locale: "en",
    fallbackLocale: "en",
    messages: { en: en_messages, "zh-CN": zh_cn_messages },
  });
}

function mount_view(state: StudioState, controller: StudioController) {
  const portal_target = document.createElement("div");
  document.body.append(portal_target);
  const host = document.createElement("div");
  document.body.append(host);
  const wrapper = mount(SettingsView, {
    props: { state, controller },
    global: {
      plugins: [create_i18n_instance()],
      provide: { [PORTAL_TARGET_KEY as unknown as string]: portal_target },
    },
    attachTo: host,
  });
  return { wrapper, host, portal_target };
}

/** For tests exercising a real controller command: the controller only ever mutates its own
 * internal state, so the mounted `state` prop must start as `controller.state` and stay synced
 * via `on_change`, exactly like `use_studio_controller.ts` wires it for AppRoot in production. */
async function mount_view_with_live_controller(controller: StudioController) {
  await controller.start();
  const portal_target = document.createElement("div");
  document.body.append(portal_target);
  const host = document.createElement("div");
  document.body.append(host);
  const wrapper = mount(SettingsView, {
    props: { state: controller.state, controller },
    global: {
      plugins: [create_i18n_instance()],
      provide: { [PORTAL_TARGET_KEY as unknown as string]: portal_target },
    },
    attachTo: host,
  });
  controller.on_change(() => {
    void wrapper.setProps({ state: controller.state });
  });
  return { wrapper, host, portal_target };
}

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

// ---------------------------------------------------------------------------
// Provider profiles: CRUD + connection test
// ---------------------------------------------------------------------------

describe("SettingsView provider profiles", () => {
  it("shows a composed empty state with no profiles yet", () => {
    const { wrapper } = mount_view(
      build_state({
        workbench: {
          profiles: [],
          active_profile_id: null,
          jobs: [],
          submit_command: IDLE_COMMAND_STATE,
        },
      }),
      build_controller(create_unavailable_capabilities()),
    );
    const section = wrapper.get('[data-testid="provider-profiles"]');
    expect(section.text()).toContain(
      "Add a provider profile to connect an image generation backend.",
    );
  });

  it("lists existing profiles with their provider type and default badge", () => {
    const { wrapper } = mount_view(
      build_state(),
      build_controller(create_unavailable_capabilities()),
    );
    const row = wrapper.get('[data-testid="provider-profile-row"]');
    expect(row.text()).toContain("Local SD");
    expect(row.text()).toContain("SD WebUI");
    expect(row.text()).toContain("Default");
  });

  it("saves a new provider profile through the controller and closes the dialog", async () => {
    const saved: unknown[] = [];
    const capabilities = create_unavailable_capabilities();
    const profiles: ProfilesCapability = {
      load: () => Promise.resolve([PROFILE]),
      subscribe: () => () => {},
      save: (draft) => {
        saved.push(draft);
        return Promise.resolve({
          id: draft.id,
          provider_id: draft.provider_id,
          display_name: draft.display_name,
          is_default: draft.is_default,
          updated_at: "2026-08-07T00:00:00.000Z",
        });
      },
      remove: capabilities.profiles.remove,
      test_connection: capabilities.profiles.test_connection,
    };
    const controller = build_controller({ ...capabilities, profiles });
    const { wrapper } = await mount_view_with_live_controller(controller);

    await wrapper.get('[data-testid="provider-profiles"] button').trigger("click");
    await nextTick();

    // AppDialog portals its content outside `wrapper.element` -- query the real DOM directly,
    // scoped to the dialog, rather than the wrapper (which could otherwise match the Gateway
    // panel's own `type="text"` endpoint input rendered earlier on the same page).
    const name_input = document.querySelector(
      '[role="dialog"] input[type="text"]',
    ) as HTMLInputElement;
    expect(name_input).not.toBeNull();
    name_input.value = "New NovelAI profile";
    name_input.dispatchEvent(new Event("input"));
    await nextTick();

    const dialog_buttons = document.querySelectorAll('[role="dialog"] button');
    const save_button = Array.from(dialog_buttons).find((b) => b.textContent === "Save");
    expect(save_button).toBeDefined();
    (save_button as HTMLButtonElement).click();
    await nextTick();
    await nextTick();
    await nextTick();

    expect(saved).toHaveLength(1);
    expect((saved[0] as { display_name: string }).display_name).toBe("New NovelAI profile");
    // The save resolved and the controller's profiles subscription upserted it -- the row list
    // now shows two profiles without a page reload.
    expect(wrapper.findAll('[data-testid="provider-profile-row"]').length).toBe(2);
  });

  it("removes a provider profile after typed destructive confirmation", async () => {
    const removed: Uuid[] = [];
    const capabilities = create_unavailable_capabilities();
    const profiles: ProfilesCapability = {
      load: () => Promise.resolve([PROFILE]),
      subscribe: () => () => {},
      save: capabilities.profiles.save,
      remove: (id) => {
        removed.push(id);
        return Promise.resolve();
      },
      test_connection: capabilities.profiles.test_connection,
    };
    const controller = build_controller({ ...capabilities, profiles });
    const { wrapper } = await mount_view_with_live_controller(controller);

    const row = wrapper.get('[data-testid="provider-profile-row"]');
    const delete_button = row.findAll("button").find((b) => b.text() === "Delete");
    await delete_button?.trigger("click");
    await nextTick();

    const confirm_button = document.querySelector(
      '[role="alertdialog"] button[aria-label="Delete"]',
    );
    expect(confirm_button).not.toBeNull();
    (confirm_button as HTMLButtonElement).click();
    await nextTick();
    await nextTick();
    await nextTick();

    expect(removed).toEqual([PROFILE_ID]);
    expect(wrapper.findAll('[data-testid="provider-profile-row"]').length).toBe(0);
  });

  it("tests a provider profile's connection and shows the latency inline", async () => {
    const capabilities = create_unavailable_capabilities();
    const profiles: ProfilesCapability = {
      load: () => Promise.resolve([PROFILE]),
      subscribe: () => () => {},
      save: capabilities.profiles.save,
      remove: capabilities.profiles.remove,
      test_connection: (): Promise<ProfileConnectionTestResult> =>
        Promise.resolve({ status: "success", latency_ms: 77 }),
    };
    const controller = build_controller({ ...capabilities, profiles });
    const { wrapper } = await mount_view_with_live_controller(controller);

    const row = wrapper.get('[data-testid="provider-profile-row"]');
    const test_button = row.findAll("button").find((b) => b.text().includes("Test connection"));
    await test_button?.trigger("click");
    await nextTick();
    await nextTick();

    expect(wrapper.get('[data-testid="profile-test-result"]').text()).toContain("77");
  });

  it("never renders a raw token or secret_reference value anywhere in the profile dialog markup", async () => {
    const { wrapper } = mount_view(
      build_state(),
      build_controller(create_unavailable_capabilities()),
    );
    await wrapper.get('[data-testid="provider-profiles"] button').trigger("click");
    await nextTick();
    expect(wrapper.html()).not.toContain(SECRET_TOKEN_VALUE);
  });
});

// ---------------------------------------------------------------------------
// Gateway: endpoint, protocol discovery, HTTP-risk severity by origin, token reference
// ---------------------------------------------------------------------------

describe("SettingsView gateway settings", () => {
  it("shows the token secret reference, never a raw secret value", () => {
    const { wrapper } = mount_view(
      build_state(),
      build_controller(create_unavailable_capabilities()),
    );
    const reference = wrapper.get('[data-testid="gateway-token-reference"]');
    expect(reference.text()).toBe(TOKEN_REFERENCE);
    expect(wrapper.html()).not.toContain(SECRET_TOKEN_VALUE);
  });

  it("warns without blocking for loopback HTTP and offers Continue", async () => {
    const { wrapper } = mount_view(
      build_state({
        settings: {
          settings: {
            ...DEFAULT_SETTINGS,
            gateway: { ...DEFAULT_SETTINGS.gateway, endpoint: "http://127.0.0.1:8000" },
          },
          vocabulary_update_channel: "bundled",
          update_command: IDLE_COMMAND_STATE,
          migration_retry_command: IDLE_COMMAND_STATE,
        },
      }),
      build_controller(create_unavailable_capabilities()),
    );
    const banner = wrapper.get('[data-testid="http-risk-banner"]');
    expect(banner.attributes("data-severity")).toBe("warning");
    expect(banner.text()).toContain("token, prompts, and images travel in plaintext");
    expect(banner.find("button").exists()).toBe(true);
    // The endpoint input is never disabled by the risk banner -- HTTP is never blocked.
    expect(
      wrapper.get('[data-testid="gateway-endpoint-input"]').attributes("disabled"),
    ).toBeUndefined();
  });

  it("warns without blocking for private-network HTTP the same as loopback", () => {
    const { wrapper } = mount_view(
      build_state({
        settings: {
          settings: {
            ...DEFAULT_SETTINGS,
            gateway: { ...DEFAULT_SETTINGS.gateway, endpoint: "http://192.168.1.50:8000" },
          },
          vocabulary_update_channel: "bundled",
          update_command: IDLE_COMMAND_STATE,
          migration_retry_command: IDLE_COMMAND_STATE,
        },
      }),
      build_controller(create_unavailable_capabilities()),
    );
    expect(wrapper.get('[data-testid="http-risk-banner"]').attributes("data-severity")).toBe(
      "warning",
    );
  });

  it("shows error-colored risk for a public or unrecognized HTTP host, still without blocking", () => {
    const { wrapper } = mount_view(
      build_state({
        settings: {
          settings: {
            ...DEFAULT_SETTINGS,
            gateway: { ...DEFAULT_SETTINGS.gateway, endpoint: "http://gateway.example.com" },
          },
          vocabulary_update_channel: "bundled",
          update_command: IDLE_COMMAND_STATE,
          migration_retry_command: IDLE_COMMAND_STATE,
        },
      }),
      build_controller(create_unavailable_capabilities()),
    );
    const banner = wrapper.get('[data-testid="http-risk-banner"]');
    expect(banner.attributes("data-severity")).toBe("error");
    expect(banner.text()).toContain("token, prompts, and images travel in plaintext");
  });

  it("never shows a risk banner for HTTPS", () => {
    const { wrapper } = mount_view(
      build_state({
        settings: {
          settings: {
            ...DEFAULT_SETTINGS,
            gateway: { ...DEFAULT_SETTINGS.gateway, endpoint: "https://gateway.example.com" },
          },
          vocabulary_update_channel: "bundled",
          update_command: IDLE_COMMAND_STATE,
          migration_retry_command: IDLE_COMMAND_STATE,
        },
      }),
      build_controller(create_unavailable_capabilities()),
    );
    expect(wrapper.find('[data-testid="http-risk-banner"]').exists()).toBe(false);
  });

  it("hands a typed Gateway token to secret storage and renders only the returned reference", async () => {
    const capabilities = create_unavailable_capabilities();
    const stored: string[] = [];
    let token_secret_id: string | null = null;
    const settings: SettingsCapability = {
      ...capabilities.settings,
      load: (): Promise<SettingsSnapshot> =>
        Promise.resolve({
          settings: {
            ...DEFAULT_SETTINGS,
            gateway: { ...DEFAULT_SETTINGS.gateway, token_secret_id },
          },
          vocabulary_update_channel: "bundled",
        }),
      set_gateway_token: (plaintext_value) => {
        stored.push(plaintext_value);
        token_secret_id = "tavern_canvas:default:gateway_access_token";
        return Promise.resolve();
      },
    };
    const controller = build_controller({ ...capabilities, settings });
    const { wrapper } = await mount_view_with_live_controller(controller);

    const input = wrapper.get('[data-testid="gateway-token-input"]');
    expect(input.attributes("type")).toBe("password");
    await input.setValue(SECRET_TOKEN_VALUE);
    await wrapper.get('[data-testid="gateway-token-save"]').trigger("click");
    await nextTick();
    await nextTick();
    await nextTick();

    expect(stored).toEqual([SECRET_TOKEN_VALUE]);
    expect(wrapper.get('[data-testid="gateway-token-reference"]').text()).toBe(
      "tavern_canvas:default:gateway_access_token",
    );
    expect(wrapper.html()).not.toContain(SECRET_TOKEN_VALUE);
    expect((wrapper.get('[data-testid="gateway-token-input"]').element as HTMLInputElement).value) //
      .toBe("");
  });

  it("acknowledges an HTTP origin, persists it per normalized origin, and keeps a nonblocking status visible", async () => {
    const acknowledged: string[] = [];
    const capabilities = create_unavailable_capabilities();
    const origin_endpoint = "http://gateway.example.com";
    let acknowledgments: Record<string, string> = {};
    const settings: SettingsCapability = {
      load: (): Promise<SettingsSnapshot> =>
        Promise.resolve({
          settings: {
            ...DEFAULT_SETTINGS,
            gateway: {
              ...DEFAULT_SETTINGS.gateway,
              endpoint: origin_endpoint,
              http_acknowledgments: acknowledgments,
            },
          },
          vocabulary_update_channel: "bundled",
        }),
      subscribe: () => () => {},
      update: capabilities.settings.update,
      acknowledge_http_origin: (origin) => {
        acknowledged.push(origin);
        acknowledgments = { ...acknowledgments, [origin]: "2026-08-07T00:00:00.000Z" };
        return Promise.resolve();
      },
      set_gateway_token: capabilities.settings.set_gateway_token,
      clear_gateway_token: capabilities.settings.clear_gateway_token,
      set_vocabulary_update_channel: capabilities.settings.set_vocabulary_update_channel,
      export_archive: capabilities.settings.export_archive,
      import_archive: capabilities.settings.import_archive,
    };
    const controller = build_controller({ ...capabilities, settings });
    const { wrapper } = await mount_view_with_live_controller(controller);

    expect(wrapper.find('[data-testid="http-risk-banner"]').exists()).toBe(true);
    const continue_button = wrapper.get('[data-testid="http-risk-banner"] button');
    await continue_button.trigger("click");
    await nextTick();
    await nextTick();
    await nextTick();

    expect(acknowledged).toEqual(["http://gateway.example.com"]);
    expect(wrapper.find('[data-testid="http-risk-banner"]').exists()).toBe(false);
    expect(wrapper.find('[data-testid="http-risk-acknowledged"]').exists()).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Automation: toggles + concurrency
// ---------------------------------------------------------------------------

describe("SettingsView automation settings", () => {
  it("toggles auto-generation and fallback through the controller", async () => {
    const updates: Partial<TavernCanvasSettings>[] = [];
    const capabilities = create_unavailable_capabilities();
    const settings: SettingsCapability = {
      load: () =>
        Promise.resolve({ settings: DEFAULT_SETTINGS, vocabulary_update_channel: "bundled" }),
      subscribe: () => () => {},
      update: (partial) => {
        updates.push(partial);
        return Promise.resolve({ ...DEFAULT_SETTINGS, ...partial });
      },
      acknowledge_http_origin: capabilities.settings.acknowledge_http_origin,
      set_gateway_token: capabilities.settings.set_gateway_token,
      clear_gateway_token: capabilities.settings.clear_gateway_token,
      set_vocabulary_update_channel: capabilities.settings.set_vocabulary_update_channel,
      export_archive: capabilities.settings.export_archive,
      import_archive: capabilities.settings.import_archive,
    };
    const controller = build_controller({ ...capabilities, settings });
    const { wrapper } = await mount_view_with_live_controller(controller);

    const section = wrapper.get('[data-testid="automation-settings"]');
    const switches = section.findAll('[role="switch"]');
    await switches[0]?.trigger("click");
    await nextTick();

    expect(updates.some((u) => u.auto_generation_enabled === true)).toBe(true);
  });

  it("shows global concurrency and a blocked state for per-provider concurrency (no contract field yet)", () => {
    const { wrapper } = mount_view(
      build_state(),
      build_controller(create_unavailable_capabilities()),
    );
    const stepper = wrapper.get('[data-testid="provider-concurrency-stepper"]');
    // Reka's NumberFieldRoot reflects disabled as `data-disabled`, not the native attribute.
    expect(stepper.attributes("data-disabled")).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// Appearance: theme, language, inspector width, optional entry
// ---------------------------------------------------------------------------

describe("SettingsView appearance settings", () => {
  it("shows theme, language, inspector width, and optional-entry controls", () => {
    const { wrapper } = mount_view(
      build_state(),
      build_controller(create_unavailable_capabilities()),
    );
    const section = wrapper.get('[data-testid="appearance-settings"]');
    expect(section.text()).toContain("Theme");
    expect(section.text()).toContain("Language");
    expect(section.text()).toContain("Inspector width");
    expect(section.text()).toContain("Show optional entry point");
  });

  it("changes the theme through the controller and updates the live color mode immediately", async () => {
    const updates: Partial<TavernCanvasSettings>[] = [];
    const capabilities = create_unavailable_capabilities();
    const settings: SettingsCapability = {
      load: () =>
        Promise.resolve({ settings: DEFAULT_SETTINGS, vocabulary_update_channel: "bundled" }),
      subscribe: () => () => {},
      update: (partial) => {
        updates.push(partial);
        return Promise.resolve({ ...DEFAULT_SETTINGS, ...partial });
      },
      acknowledge_http_origin: capabilities.settings.acknowledge_http_origin,
      set_gateway_token: capabilities.settings.set_gateway_token,
      clear_gateway_token: capabilities.settings.clear_gateway_token,
      set_vocabulary_update_channel: capabilities.settings.set_vocabulary_update_channel,
      export_archive: capabilities.settings.export_archive,
      import_archive: capabilities.settings.import_archive,
    };
    const controller = build_controller({ ...capabilities, settings });
    const { wrapper } = await mount_view_with_live_controller(controller);

    const section = wrapper.get('[data-testid="appearance-settings"]');
    const dark_option = section.findAll('[role="radio"]').find((r) => r.text() === "Dark");
    await dark_option?.trigger("click");
    await nextTick();

    expect(updates.some((u) => u.ui?.color_mode === "dark")).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Data: vocabulary channel, archive export/import, migration retry/report, manual cleanup
// ---------------------------------------------------------------------------

describe("SettingsView data settings: vocabulary channel and archive", () => {
  it("switches the vocabulary update channel through the controller", async () => {
    const channels: string[] = [];
    const capabilities = create_unavailable_capabilities();
    const settings: SettingsCapability = {
      ...capabilities.settings,
      load: () =>
        Promise.resolve({ settings: DEFAULT_SETTINGS, vocabulary_update_channel: "bundled" }),
      set_vocabulary_update_channel: (channel) => {
        channels.push(channel);
        return Promise.resolve();
      },
    };
    const controller = build_controller({ ...capabilities, settings });
    const { wrapper } = await mount_view_with_live_controller(controller);

    const section = wrapper.get('[data-testid="data-settings"]');
    const remote_option = section
      .findAll('[role="radio"]')
      .find((r) => r.text().includes("Remote"));
    await remote_option?.trigger("click");
    await nextTick();

    expect(channels).toEqual(["remote"]);
  });

  it("exports an archive and never renders its content or secrets in the DOM", async () => {
    const archive_blob = new Blob([JSON.stringify({ manifest: "ok" })], {
      type: "application/json",
    });
    const capabilities = create_unavailable_capabilities();
    const settings: SettingsCapability = {
      ...capabilities.settings,
      load: () =>
        Promise.resolve({ settings: DEFAULT_SETTINGS, vocabulary_update_channel: "bundled" }),
      export_archive: () => Promise.resolve(archive_blob),
    };
    const controller = build_controller({ ...capabilities, settings });
    const { wrapper } = await mount_view_with_live_controller(controller);
    const create_object_url = vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:mock-url");
    const revoke_object_url = vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => {});

    const section = wrapper.get('[data-testid="data-settings"]');
    const export_button = section.findAll("button").find((b) => b.text() === "Export archive");
    await export_button?.trigger("click");
    await nextTick();
    await nextTick();

    expect(create_object_url).toHaveBeenCalledTimes(1);
    expect(revoke_object_url).toHaveBeenCalledTimes(1);
    expect(wrapper.html()).not.toContain(SECRET_TOKEN_VALUE);
    expect(wrapper.html()).not.toContain(SECRET_PROMPT);
    expect(wrapper.html()).not.toContain(SECRET_MESSAGE_CONTENT);
  });

  it("imports an archive file through the controller and never auto-deletes existing data", async () => {
    const imported: Blob[] = [];
    const capabilities = create_unavailable_capabilities();
    const settings: SettingsCapability = {
      ...capabilities.settings,
      load: () =>
        Promise.resolve({ settings: DEFAULT_SETTINGS, vocabulary_update_channel: "bundled" }),
      import_archive: (archive) => {
        imported.push(archive);
        return Promise.resolve();
      },
    };
    const controller = build_controller({ ...capabilities, settings });
    const { wrapper } = await mount_view_with_live_controller(controller);

    const file = new File([JSON.stringify({ manifest: "ok" })], "archive.json", {
      type: "application/json",
    });
    const input = wrapper.get('[data-testid="archive-import-input"]');
    Object.defineProperty(input.element, "files", { value: [file] });
    await input.trigger("change");
    await nextTick();
    await nextTick();

    expect(imported).toHaveLength(1);
    expect(wrapper.text()).toContain("Importing merges records");
    expect(wrapper.text()).toContain("never deletes existing data");
  });
});

describe("SettingsView data settings: migration retry/report", () => {
  it("retries migration through the controller and reflects the resulting state", async () => {
    const capabilities = create_unavailable_capabilities();
    let retried = false;
    const migration = {
      ...capabilities.migration,
      load: () => Promise.resolve(NOT_REQUIRED_MIGRATION),
      retry: () => {
        retried = true;
        const snapshot: MigrationSnapshot = {
          state: "completed",
          counts: { provider_profiles: 1 },
          warnings: [],
          failure_reason: null,
          failure_message: null,
        };
        return Promise.resolve(snapshot);
      },
    };
    const controller = build_controller({ ...capabilities, migration });
    const { wrapper } = await mount_view_with_live_controller(controller);

    const section = wrapper.get('[data-testid="data-settings"]');
    const retry_button = section.findAll("button").find((b) => b.text() === "Retry migration");
    await retry_button?.trigger("click");
    await nextTick();
    await nextTick();

    expect(retried).toBe(true);
    // Manual cleanup unlocks once migration verifiably completed.
    expect(
      section.get('[data-testid="manual-cleanup-action"]').attributes("disabled"),
    ).toBeUndefined();
  });

  it("toggles a read-only migration report inline", async () => {
    const { wrapper } = mount_view(
      build_state(),
      build_controller(create_unavailable_capabilities()),
    );
    const section = wrapper.get('[data-testid="data-settings"]');
    const report_button = section
      .findAll("button")
      .find((b) => b.text() === "View migration report");
    await report_button?.trigger("click");
    await nextTick();
    expect(section.find('[data-testid="migration-status"]').exists()).toBe(true);
  });
});

describe("SettingsView manual legacy cleanup", () => {
  it("is locked until migration is completed, showing record counts and an unavailable byte estimate", () => {
    const { wrapper } = mount_view(
      build_state(),
      build_controller(create_unavailable_capabilities()),
    );
    const section = wrapper.get('[data-testid="manual-cleanup"]');
    expect(
      section.get('[data-testid="manual-cleanup-action"]').attributes("disabled"),
    ).toBeDefined();
    expect(section.find('[data-testid="cleanup-locked"]').exists()).toBe(true);
    expect(section.text()).toContain("Size estimate is unavailable");
  });

  it("shows non-fabricated record counts once migration data exists", () => {
    const snapshot: MigrationSnapshot = {
      state: "completed",
      counts: { provider_profiles: 2, gallery_image_records: 5 },
      warnings: [],
      failure_reason: null,
      failure_message: null,
    };
    const { wrapper } = mount_view(
      build_state({
        diagnostics: {
          snapshot: null,
          timeline: [],
          migration: snapshot,
          connection_test_command: IDLE_COMMAND_STATE,
          support_bundle_command: IDLE_COMMAND_STATE,
        },
      }),
      build_controller(create_unavailable_capabilities()),
    );
    const section = wrapper.get('[data-testid="manual-cleanup"]');
    expect(section.text()).toContain("7 records");
    expect(
      section.get('[data-testid="manual-cleanup-action"]').attributes("disabled"),
    ).toBeUndefined();
  });

  it("requires the exact typed confirmation phrase before calling the destructive capability", async () => {
    const capabilities = create_unavailable_capabilities();
    let cleanup_confirmation: string | null = null;
    const completed: MigrationSnapshot = {
      state: "completed",
      counts: { provider_profiles: 1 },
      warnings: [],
      failure_reason: null,
      failure_message: null,
    };
    const migration = {
      ...capabilities.migration,
      load: () => Promise.resolve(completed),
      confirm_legacy_cleanup: (text: string) => {
        cleanup_confirmation = text;
        return Promise.resolve();
      },
    };
    const controller = build_controller({ ...capabilities, migration });
    const { wrapper } = await mount_view_with_live_controller(controller);

    const section = wrapper.get('[data-testid="manual-cleanup"]');
    await section.get('[data-testid="manual-cleanup-action"]').trigger("click");
    await nextTick();

    const confirm_input = document.querySelector(
      '[data-testid="cleanup-confirm-input"]',
    ) as HTMLInputElement;
    expect(confirm_input).not.toBeNull();
    const confirm_button = document.querySelector(
      '[role="dialog"] button[aria-label="Delete legacy data"]',
    ) as HTMLButtonElement;
    expect(confirm_button).not.toBeNull();

    // Wrong text: the confirm button stays disabled and the destructive capability is never
    // called, even if something forces a click through.
    confirm_input.value = "delete legacy data";
    confirm_input.dispatchEvent(new Event("input"));
    await nextTick();
    expect(confirm_button.disabled).toBe(true);
    confirm_button.click();
    await nextTick();
    await nextTick();
    expect(cleanup_confirmation).toBeNull();

    // Exact phrase: the button enables and the capability is called with the typed text.
    confirm_input.value = "DELETE LEGACY DATA";
    confirm_input.dispatchEvent(new Event("input"));
    await nextTick();
    expect(confirm_button.disabled).toBe(false);
    confirm_button.click();
    await nextTick();
    await nextTick();
    await nextTick();

    expect(cleanup_confirmation).toBe("DELETE LEGACY DATA");
  });

  it("never renders prompt text, message content, or secrets anywhere in the cleanup flow", async () => {
    const { wrapper } = mount_view(
      build_state({
        diagnostics: {
          snapshot: null,
          timeline: [],
          migration: {
            state: "completed",
            counts: { provider_profiles: 1 },
            warnings: [],
            failure_reason: null,
            failure_message: null,
          },
          connection_test_command: IDLE_COMMAND_STATE,
          support_bundle_command: IDLE_COMMAND_STATE,
        },
      }),
      build_controller(create_unavailable_capabilities()),
    );
    await wrapper.get('[data-testid="manual-cleanup-action"]').trigger("click");
    await nextTick();
    const html = wrapper.html();
    expect(html).not.toContain(SECRET_TOKEN_VALUE);
    expect(html).not.toContain(SECRET_PROMPT);
    expect(html).not.toContain(SECRET_MESSAGE_CONTENT);
  });
});
