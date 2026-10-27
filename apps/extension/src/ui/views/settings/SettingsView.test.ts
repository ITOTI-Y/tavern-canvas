import type { TavernCanvasSettings, Uuid } from "@tavern-canvas/contracts";
import { flushPromises, mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { markRaw, nextTick } from "vue";
import { createI18n } from "vue-i18n";

import { PORTAL_TARGET_KEY } from "../../contracts/portal_keys.js";
import type {
  ProfileConnectionTestResult,
  ProfilesCapability,
  ProviderProfileSummary,
  ProviderProfileDraft,
  SettingsCapability,
  SettingsSnapshot,
  StudioCapabilities,
} from "../../contracts/ui_capabilities.js";
import {
  IDLE_COMMAND_STATE,
  type SettingsSection,
  type StudioState,
} from "../../contracts/view_models.js";
import {
  create_studio_controller,
  type StudioController,
} from "../../controllers/studio_controller.js";
import { create_unavailable_capabilities } from "../../controllers/unavailable_capabilities.js";
import type { BrowserSecretVaultStatus } from "../../../storage/browser_secret_vault.js";
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
  credential_storage_mode: "host",
  active_provider_profile_id: null,
  global_concurrency: 2,
  auto_generation_enabled: false,
  vocabulary_update_channel: "bundled",
  illustration: {
    preset_name: "in_use",
    connection: { kind: "current" },
    max_chat_history: 4,
    max_images_per_message: 2,
    prompt_preset_id: null,
    world_info: { mode: "chat" },
  },
  translation: { deepl_endpoint: "free", glossary: [] },
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
  model_id: "sdxl-base",
  workflow_id: null,
  is_default: true,
  credential_reference: null,
  novelai_defaults: null,
  prompt_tags: {
    quality: { enabled: false, preset_id: "novelai:v4_5_full:standard" },
    undesired_content: { enabled: false, preset_id: "novelai:v4_5_full:heavy" },
  },
  updated_at: "2026-01-01T00:00:00.000Z",
};

function build_state(overrides: Partial<StudioState> = {}): StudioState {
  return {
    route: "settings",
    settings_section: "illustration",
    color_mode: "light",
    loading: new Set(),
    failures: new Map(),
    generation: {
      profiles: [PROFILE],
      active_profile_id: null,
      jobs: [],
    },
    prompt: {
      presets: [],
      selected_preset_id: null,
      draft: null,
      save_command: IDLE_COMMAND_STATE,
    },
    assets: {
      active_category: "character",
      records: { character: [], outfit: [], lora: [], vibe: [], workflow: [], prompt_tag: [] },
      vocabulary_catalog: [],
      vocabulary_install_command: IDLE_COMMAND_STATE,
    },
    gallery: { records: [], selected_record_id: null, bulk_delete_command: IDLE_COMMAND_STATE },
    diagnostics: {
      snapshot: null,
      timeline: [],
      connection_test_command: IDLE_COMMAND_STATE,
      support_bundle_command: IDLE_COMMAND_STATE,
    },
    settings: {
      settings: DEFAULT_SETTINGS,
      vocabulary_update_channel: "bundled",
      browser_secret_vault: { state: "unavailable", secret_count: 0 },
      update_command: IDLE_COMMAND_STATE,
    },
    inspector: { collapsed: false, width: 320, selected_record: null },
    tasks: [],
    ...overrides,
  };
}

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

/** The section each describe block exercises; mount helpers open it. */
let current_section: SettingsSection = "illustration";

function mount_view(state: StudioState, controller: StudioController) {
  const portal_target = document.createElement("div");
  document.body.append(portal_target);
  const host = document.createElement("div");
  document.body.append(host);
  const wrapper = mount(SettingsView, {
    props: { state: { ...state, settings_section: current_section }, controller },
    global: {
      plugins: [create_i18n_instance()],
      provide: { [PORTAL_TARGET_KEY as unknown as string]: portal_target },
    },
    attachTo: host,
  });
  return { wrapper, host, portal_target };
}

async function mount_view_with_live_controller(controller: StudioController) {
  await controller.start();
  controller.set_settings_section(current_section);
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

describe("SettingsView provider profiles", () => {
  beforeEach(() => {
    current_section = "providers";
  });

  it("shows a composed empty state with no profiles yet", () => {
    const { wrapper } = mount_view(
      build_state({
        generation: {
          profiles: [],
          active_profile_id: null,
          jobs: [],
        },
      }),
      build_controller(create_unavailable_capabilities()),
    );
    const section = wrapper.get('[data-testid="provider-profiles"]');
    expect(section.text()).toContain(
      "Add a provider profile to connect an image generation backend.",
    );
    expect(wrapper.get('[data-testid="settings-onboarding"]').text()).toContain(
      "Set up the service that will generate your images",
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
    const saved: ProviderProfileDraft[] = [];
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
          model_id: draft.model_id,
          workflow_id: draft.workflow_id,
          is_default: draft.is_default,
          credential_reference: null,
          novelai_defaults: null,
          prompt_tags: {
            quality: { enabled: false, preset_id: "novelai:v4_5_full:standard" },
            undesired_content: { enabled: false, preset_id: "novelai:v4_5_full:heavy" },
          },
          updated_at: "2026-08-07T00:00:00.000Z",
        });
      },
      remove: capabilities.profiles.remove,
      set_credential: capabilities.profiles.set_credential,
      clear_credential: capabilities.profiles.clear_credential,
      save_novelai_defaults: vi.fn(),
      save_prompt_tags: vi.fn(),
      test_connection: capabilities.profiles.test_connection,
    };
    const controller = build_controller({ ...capabilities, profiles });
    const { wrapper } = await mount_view_with_live_controller(controller);

    await wrapper.get('[data-testid="provider-profiles"] button').trigger("click");
    await nextTick();

    const name_input = document.querySelector(
      '[role="dialog"] input[type="text"]',
    ) as HTMLInputElement;
    expect(name_input).not.toBeNull();
    name_input.value = "New NovelAI profile";
    name_input.dispatchEvent(new Event("input"));
    await nextTick();
    const model_input = document.querySelector(
      '[role="dialog"] [data-testid="provider-model-input"]',
    ) as HTMLInputElement;
    model_input.value = "sdxl-base";
    model_input.dispatchEvent(new Event("input"));
    await nextTick();

    const dialog_buttons = document.querySelectorAll('[role="dialog"] button');
    const save_button = Array.from(dialog_buttons).find((b) => b.textContent === "Save");
    expect(save_button).toBeDefined();
    (save_button as HTMLButtonElement).click();
    await nextTick();
    await nextTick();
    await nextTick();

    expect(saved).toHaveLength(1);
    expect(saved[0]?.display_name).toBe("New NovelAI profile");
    expect(saved[0]?.model_id).toBe("sdxl-base");
    expect(wrapper.findAll('[data-testid="provider-profile-row"]').length).toBe(2);
  });
  it("stores a provider API key through the credential command without adding it to the profile draft", async () => {
    const plaintext = "provider-key-canary-value";
    const writes: { profile_id: Uuid; plaintext_value: string }[] = [];
    const capabilities = create_unavailable_capabilities();
    const credential_reference = `tavern_canvas:default:${PROFILE_ID}:provider_api_key`;
    const credential_profile: ProviderProfileSummary = {
      ...PROFILE,
      provider_id: "novelai",
    };
    const profiles: ProfilesCapability = {
      ...capabilities.profiles,
      load: () => Promise.resolve([credential_profile]),
      subscribe: () => () => {},
      set_credential: (profile_id, plaintext_value) => {
        writes.push({ profile_id, plaintext_value });
        return Promise.resolve({ ...credential_profile, credential_reference });
      },
    };
    const controller = build_controller({ ...capabilities, profiles });
    const { wrapper } = await mount_view_with_live_controller(controller);

    const row = wrapper.get('[data-testid="provider-profile-row"]');
    const set_key_button = row.findAll("button").find((button) => button.text() === "Set API key");
    await set_key_button?.trigger("click");
    await nextTick();

    const input = document.querySelector(
      '[data-testid="provider-credential-input"]',
    ) as HTMLInputElement;
    expect(input.type).toBe("password");
    input.value = plaintext;
    input.dispatchEvent(new Event("input"));
    await nextTick();
    const save_button = Array.from(document.querySelectorAll('[role="dialog"] button')).find(
      (button) => button.textContent === "Save",
    ) as HTMLButtonElement;
    save_button.click();
    await nextTick();
    await nextTick();
    await nextTick();

    expect(writes).toEqual([{ profile_id: PROFILE_ID, plaintext_value: plaintext }]);
    expect(
      (document.querySelector('[data-testid="provider-credential-input"]') as HTMLInputElement)
        .value,
    ).toBe("");
    expect(document.body.innerHTML).not.toContain(plaintext);
    expect(row.text()).toContain("API key configured");
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
      set_credential: capabilities.profiles.set_credential,
      clear_credential: capabilities.profiles.clear_credential,
      save_novelai_defaults: vi.fn(),
      save_prompt_tags: vi.fn(),
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
      set_credential: capabilities.profiles.set_credential,
      clear_credential: capabilities.profiles.clear_credential,
      save_novelai_defaults: vi.fn(),
      save_prompt_tags: vi.fn(),
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
describe("SettingsView credential storage", () => {
  beforeEach(() => {
    current_section = "general";
  });

  it("initializes the encrypted browser vault and switches the active backend", async () => {
    const passphrase = "correct horse battery staple";
    const initialize_calls: string[] = [];
    const updates: Partial<TavernCanvasSettings>[] = [];
    const capabilities = create_unavailable_capabilities();
    let current_settings = DEFAULT_SETTINGS;
    let vault_status: BrowserSecretVaultStatus = { state: "uninitialized", secret_count: 0 };
    const settings: SettingsCapability = {
      ...capabilities.settings,
      load: () =>
        Promise.resolve({
          settings: current_settings,
          vocabulary_update_channel: current_settings.vocabulary_update_channel,
          browser_secret_vault: vault_status,
        }),
      update: (partial) => {
        updates.push(partial);
        current_settings = { ...current_settings, ...partial };
        return Promise.resolve(current_settings);
      },
      initialize_browser_secret_vault: (value) => {
        initialize_calls.push(value);
        vault_status = { state: "unlocked", secret_count: 0 };
        return Promise.resolve(vault_status);
      },
    };
    const controller = build_controller({ ...capabilities, settings });
    const { wrapper } = await mount_view_with_live_controller(controller);
    const section = wrapper.get('[data-testid="credential-storage-settings"]');

    const browser_option = section
      .findAll('[role="radio"]')
      .find((option) => option.text().includes("Encrypted browser"));
    await browser_option?.trigger("click");
    await nextTick();
    await nextTick();
    expect(updates).toContainEqual({ credential_storage_mode: "browser_encrypted" });

    const password_input = section.get('[data-testid="browser-vault-passphrase"]');
    const confirmation_input = section.get('[data-testid="browser-vault-passphrase-confirmation"]');
    await password_input.setValue(passphrase);
    await confirmation_input.setValue("mismatched passphrase");
    const initialize_button = section
      .findAll("button")
      .find((button) => button.text() === "Create encrypted vault");
    await initialize_button?.trigger("click");
    expect(initialize_calls).toEqual([]);
    expect(section.text()).toContain("The passphrases do not match");

    await confirmation_input.setValue(passphrase);
    await initialize_button?.trigger("click");
    await nextTick();
    await nextTick();
    await nextTick();

    expect(initialize_calls).toEqual([passphrase]);
    expect(section.text()).toContain("Unlocked");
    expect(document.body.innerHTML).not.toContain(passphrase);
  });
});

describe("SettingsView gateway settings", () => {
  beforeEach(() => {
    current_section = "connections";
  });

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
          browser_secret_vault: { state: "unavailable", secret_count: 0 },
          update_command: IDLE_COMMAND_STATE,
        },
      }),
      build_controller(create_unavailable_capabilities()),
    );
    const banner = wrapper.get('[data-testid="http-risk-banner"]');
    expect(banner.attributes("data-severity")).toBe("warning");
    expect(banner.text()).toContain("token, prompts, and images travel in plaintext");
    expect(banner.find("button").exists()).toBe(true);
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
          browser_secret_vault: { state: "unavailable", secret_count: 0 },
          update_command: IDLE_COMMAND_STATE,
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
          browser_secret_vault: { state: "unavailable", secret_count: 0 },
          update_command: IDLE_COMMAND_STATE,
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
          browser_secret_vault: { state: "unavailable", secret_count: 0 },
          update_command: IDLE_COMMAND_STATE,
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
          illustration: {
            preset_name: "in_use",
            connection: { kind: "current" },
            max_chat_history: 4,
            max_images_per_message: 2,
            prompt_preset_id: null,
            world_info: { mode: "chat" },
          },
          translation: { deepl_endpoint: "free", glossary: [] },
          browser_secret_vault: { state: "unavailable", secret_count: 0 },
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
      ...capabilities.settings,
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
          illustration: {
            preset_name: "in_use",
            connection: { kind: "current" },
            max_chat_history: 4,
            max_images_per_message: 2,
            prompt_preset_id: null,
            world_info: { mode: "chat" },
          },
          translation: { deepl_endpoint: "free", glossary: [] },
          browser_secret_vault: { state: "unavailable", secret_count: 0 },
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
      import_vocabulary_package: capabilities.settings.import_vocabulary_package,
      cancel_vocabulary_import: capabilities.settings.cancel_vocabulary_import,
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

function recording_settings_capability(
  updates: Partial<TavernCanvasSettings>[],
): SettingsCapability {
  const capabilities = create_unavailable_capabilities();
  let current = DEFAULT_SETTINGS;
  return {
    ...capabilities.settings,
    load: () =>
      Promise.resolve({
        settings: current,
        vocabulary_update_channel: "bundled",
        browser_secret_vault: { state: "unavailable", secret_count: 0 },
      }),
    subscribe: () => () => {},
    update: (partial) => {
      updates.push(partial);
      current = { ...current, ...partial };
      return Promise.resolve(current);
    },
    set_analysis_key: vi.fn(() => Promise.resolve()),
    list_worldbooks: vi.fn(() => Promise.resolve([])),
    clear_analysis_key: vi.fn(() => Promise.resolve()),
    set_deepl_key: vi.fn(() => Promise.resolve()),
    clear_deepl_key: vi.fn(() => Promise.resolve()),
  };
}

describe("SettingsView illustration settings", () => {
  beforeEach(() => {
    current_section = "illustration";
  });

  it("toggles automatic illustration through the controller", async () => {
    const updates: Partial<TavernCanvasSettings>[] = [];
    const capabilities = create_unavailable_capabilities();
    const controller = build_controller({
      ...capabilities,
      settings: recording_settings_capability(updates),
    });
    const { wrapper } = await mount_view_with_live_controller(controller);

    await wrapper.get('[data-testid="illustration-settings"] [role="switch"]').trigger("click");
    await nextTick();

    expect(updates.some((update) => update.auto_generation_enabled === true)).toBe(true);
  });

  it("stores an empty analysis preset as the current preset and a typed name as is", async () => {
    const updates: Partial<TavernCanvasSettings>[] = [];
    const capabilities = create_unavailable_capabilities();
    const controller = build_controller({
      ...capabilities,
      settings: recording_settings_capability(updates),
    });
    const { wrapper } = await mount_view_with_live_controller(controller);
    const input = wrapper.get('[data-testid="analysis-preset-input"]');

    await input.setValue("  ");
    await input.trigger("blur");
    await input.setValue("Analysis preset");
    await input.trigger("blur");

    expect(updates.map((update) => update.illustration?.preset_name)).toEqual([
      "in_use",
      "Analysis preset",
    ]);
  });

  it("lists the world info books when analysis should read one book, and can turn world info off", async () => {
    const updates: Partial<TavernCanvasSettings>[] = [];
    const capabilities = create_unavailable_capabilities();
    const settings = recording_settings_capability(updates);
    const list_worldbooks = vi.fn(() => Promise.resolve(["Town", "Wilds"]));
    const controller = build_controller({
      ...capabilities,
      settings: { ...settings, list_worldbooks },
    });
    const { wrapper } = await mount_view_with_live_controller(controller);
    const radio = (label: string) =>
      wrapper
        .get('[data-testid="illustration-settings"]')
        .findAll('[role="radio"]')
        .find((candidate) => candidate.text() === label);

    await radio("One book")?.trigger("click");
    await flushPromises();
    expect(list_worldbooks).toHaveBeenCalledOnce();
    expect(wrapper.find('[role="combobox"][aria-label="Book"]').exists()).toBe(true);

    await radio("None")?.trigger("click");
    await nextTick();
    expect(updates.at(-1)?.illustration?.world_info).toEqual({ mode: "off" });
  });
});

describe("SettingsView translation settings", () => {
  beforeEach(() => {
    current_section = "translation";
  });

  it("writes the DeepL key to SillyTavern and never keeps it in settings", async () => {
    const updates: Partial<TavernCanvasSettings>[] = [];
    const settings = recording_settings_capability(updates);
    const capabilities = create_unavailable_capabilities();
    const controller = build_controller({ ...capabilities, settings });
    const { wrapper } = await mount_view_with_live_controller(controller);

    await wrapper.get('[data-testid="deepl-key-input"]').setValue(" key:fx ");
    const save = wrapper.findAll("button").find((button) => button.text() === "Save key");
    await save?.trigger("click");
    await nextTick();

    expect(settings.set_deepl_key).toHaveBeenCalledWith("key:fx");
    expect(JSON.stringify(updates)).not.toContain("key:fx");
  });

  it("saves glossary rows that have both a term and a tag", async () => {
    const updates: Partial<TavernCanvasSettings>[] = [];
    const capabilities = create_unavailable_capabilities();
    const controller = build_controller({
      ...capabilities,
      settings: recording_settings_capability(updates),
    });
    const { wrapper } = await mount_view_with_live_controller(controller);
    const button = (label: string) =>
      wrapper.findAll("button").find((candidate) => candidate.text() === label);

    await button("Add term")?.trigger("click");
    await button("Add term")?.trigger("click");
    const rows = wrapper.findAll('[data-testid="glossary-row"]');
    const [first, second] = rows.map((row) => row.findAll("input"));
    await first?.[0]?.setValue("爱丽丝");
    await first?.[1]?.setValue("alice (wonderland)");
    await second?.[0]?.setValue("半行");
    await button("Save glossary")?.trigger("click");

    expect(updates.at(-1)?.translation?.glossary).toEqual([
      { source: "爱丽丝", target: "alice (wonderland)" },
    ]);
  });
});

describe("SettingsView appearance settings", () => {
  beforeEach(() => {
    current_section = "general";
  });

  it("shows theme, language, inspector width, and optional-entry controls", () => {
    const { wrapper } = mount_view(
      build_state(),
      build_controller(create_unavailable_capabilities()),
    );
    const section = wrapper.get('[data-testid="appearance-settings"]');
    expect(section.text()).toContain("Theme");
    expect(section.text()).toContain("Language");
    expect(section.text()).toContain("Inspector width");
    expect(section.text()).toContain("Show the floating entry button");
  });

  it("changes the theme through the controller and updates the live color mode immediately", async () => {
    const updates: Partial<TavernCanvasSettings>[] = [];
    const capabilities = create_unavailable_capabilities();
    const settings: SettingsCapability = {
      ...capabilities.settings,
      load: () =>
        Promise.resolve({
          settings: DEFAULT_SETTINGS,
          vocabulary_update_channel: "bundled",
          browser_secret_vault: { state: "unavailable", secret_count: 0 },
        }),
      subscribe: () => () => {},
      update: (partial) => {
        updates.push(partial);
        return Promise.resolve({ ...DEFAULT_SETTINGS, ...partial });
      },
      acknowledge_http_origin: capabilities.settings.acknowledge_http_origin,
      set_gateway_token: capabilities.settings.set_gateway_token,
      clear_gateway_token: capabilities.settings.clear_gateway_token,
      set_vocabulary_update_channel: capabilities.settings.set_vocabulary_update_channel,
      import_vocabulary_package: capabilities.settings.import_vocabulary_package,
      cancel_vocabulary_import: capabilities.settings.cancel_vocabulary_import,
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

describe("SettingsView data settings: vocabulary channel and archive", () => {
  beforeEach(() => {
    current_section = "general";
  });

  it("switches the vocabulary update channel through the controller", async () => {
    const channels: string[] = [];
    const capabilities = create_unavailable_capabilities();
    const settings: SettingsCapability = {
      ...capabilities.settings,
      load: () =>
        Promise.resolve({
          settings: DEFAULT_SETTINGS,
          vocabulary_update_channel: "bundled",
          browser_secret_vault: { state: "unavailable", secret_count: 0 },
        }),
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

  it("imports a local vocabulary file with progress and a success status", async () => {
    const capabilities = create_unavailable_capabilities();
    const imported: Blob[] = [];
    const settings: SettingsCapability = {
      ...capabilities.settings,
      load: () =>
        Promise.resolve({
          settings: DEFAULT_SETTINGS,
          vocabulary_update_channel: "bundled",
          browser_secret_vault: { state: "unavailable", secret_count: 0 },
        }),
      import_vocabulary_package: (file, on_progress) => {
        imported.push(file);
        on_progress?.({ phase: "indexing" });
        on_progress?.({
          phase: "complete",
          data_version: "1.0.0",
          record_count: 1,
          package_record_id: "package-1",
          malformed_records: 0,
          merge_conflicts: 0,
        });
        return Promise.resolve();
      },
    };
    const controller = build_controller({ ...capabilities, settings });
    const { wrapper } = await mount_view_with_live_controller(controller);

    const file = new File(['{"tag":"smile","aliases":[],"popularity":1}'], "tags.jsonl", {
      type: "application/x-ndjson",
    });
    const input = wrapper.get('[data-testid="vocabulary-import-input"]');
    Object.defineProperty(input.element, "files", { value: [file] });
    await input.trigger("change");
    await nextTick();

    expect(imported).toEqual([file]);
    expect(wrapper.find('[data-testid="vocabulary-import-success"]').exists()).toBe(true);
    expect(wrapper.text()).toContain("Imported 1 records successfully");
  });

  it("cancels a pending local vocabulary import through the controller", async () => {
    const capabilities = create_unavailable_capabilities();
    let resolve_import: (() => void) | undefined;
    const import_promise = new Promise<void>((resolve) => {
      resolve_import = resolve;
    });
    const cancel = vi.fn();
    const settings: SettingsCapability = {
      ...capabilities.settings,
      load: () =>
        Promise.resolve({
          settings: DEFAULT_SETTINGS,
          vocabulary_update_channel: "bundled",
          browser_secret_vault: { state: "unavailable", secret_count: 0 },
        }),
      import_vocabulary_package: () => import_promise,
      cancel_vocabulary_import: cancel,
    };
    const controller = build_controller({ ...capabilities, settings });
    const { wrapper } = await mount_view_with_live_controller(controller);

    const file = new File(['{"tag":"smile","aliases":[],"popularity":1}'], "tags.jsonl");
    const input = wrapper.get('[data-testid="vocabulary-import-input"]');
    Object.defineProperty(input.element, "files", { value: [file] });
    await input.trigger("change");
    await nextTick();
    await wrapper.get('button[aria-label="Cancel import"]').trigger("click");

    expect(cancel).toHaveBeenCalledTimes(1);
    resolve_import?.();
    await nextTick();
  });

  it("exports an archive and never renders its content or secrets in the DOM", async () => {
    const archive_blob = new Blob([JSON.stringify({ manifest: "ok" })], {
      type: "application/json",
    });
    const capabilities = create_unavailable_capabilities();
    const settings: SettingsCapability = {
      ...capabilities.settings,
      load: () =>
        Promise.resolve({
          settings: DEFAULT_SETTINGS,
          vocabulary_update_channel: "bundled",
          browser_secret_vault: { state: "unavailable", secret_count: 0 },
        }),
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
        Promise.resolve({
          settings: DEFAULT_SETTINGS,
          vocabulary_update_channel: "bundled",
          browser_secret_vault: { state: "unavailable", secret_count: 0 },
        }),
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
