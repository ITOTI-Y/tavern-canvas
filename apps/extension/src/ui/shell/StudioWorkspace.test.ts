import type { Uuid } from "@tavern-canvas/contracts";
import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { markRaw, nextTick } from "vue";
import { createI18n } from "vue-i18n";

import { zh_cn_messages } from "../../i18n/locales/zh_cn.js";
import { en_messages } from "../../i18n/locales/en.js";
import { PORTAL_TARGET_KEY } from "../contracts/portal_keys.js";
import type {
  GenerationJobSummary,
  ProviderProfileSummary,
  PromptPresetDraft,
  PromptPresetSummary,
  StudioCapabilities,
} from "../contracts/ui_capabilities.js";
import type { StudioRoute } from "../contracts/view_models.js";
import { create_studio_controller } from "../controllers/studio_controller.js";
import { create_unavailable_capabilities } from "../controllers/unavailable_capabilities.js";
import StudioWorkspace from "./StudioWorkspace.vue";

const PROFILE: ProviderProfileSummary = {
  id: "11111111-1111-4111-8111-111111111111" as Uuid,
  provider_id: "sd_webui",
  display_name: "Local SD",
  is_default: true,
  updated_at: "2026-01-01T00:00:00Z",
};

const PRESET: PromptPresetSummary = {
  id: "22222222-2222-4222-8222-222222222222" as Uuid,
  display_name: "My preset",
  group: null,
  updated_at: "2026-01-01T00:00:00Z",
};

const PRESET_DRAFT: PromptPresetDraft = {
  id: PRESET.id,
  display_name: PRESET.display_name,
  group: null,
  fixed_positive_prompt: "",
  fixed_negative_prompt: "",
  replacement_rules: [],
  regex_rules: [],
};

function build_job(overrides: Partial<GenerationJobSummary> = {}): GenerationJobSummary {
  return {
    job_id: "33333333-3333-4333-8333-333333333333" as Uuid,
    request_id: "44444444-4444-4444-8444-444444444444" as Uuid,
    provider_id: "sd_webui",
    state: "running",
    image_count: 1,
    completed_image_ids: [],
    error: null,
    submitted_at: "2026-01-01T00:00:00Z",
    ...overrides,
  };
}

/**
 * Every spy defaults to the honest "unavailable" behavior (create_unavailable_capabilities.ts) and
 * a test overrides only the handful of methods its own scenario exercises -- mirrors the
 * `build_controller`-with-overrides pattern the T5-T7 view test files already use.
 */
function build_capabilities(overrides: Partial<StudioCapabilities> = {}): StudioCapabilities {
  return { ...create_unavailable_capabilities(), ...overrides };
}

/**
 * Mounts the real `StudioWorkspace` over a real, running `StudioController` (never a hand-rolled
 * mock) so both halves of the routing gap are exercised together: which view a route renders, and
 * whether that view's emitted intents actually reach the capabilities behind the controller.
 * `controller.on_change` keeps the mounted `state` prop in sync exactly the way `AppRoot.vue`'s own
 * `use_studio_controller.ts` composable does in production.
 */
async function mount_at_route(route: StudioRoute, capabilities: StudioCapabilities) {
  const controller = markRaw(create_studio_controller({ capabilities, initial_route: route }));
  await controller.start();

  const i18n = createI18n({
    legacy: false,
    locale: "en",
    fallbackLocale: "en",
    messages: { en: en_messages, "zh-CN": zh_cn_messages },
  });
  const portal_target = document.createElement("div");
  document.body.append(portal_target);
  const host = document.createElement("div");
  document.body.append(host);

  const wrapper = mount(StudioWorkspace, {
    props: { state: controller.state, controller },
    global: { plugins: [i18n], provide: { [PORTAL_TARGET_KEY]: portal_target } },
    attachTo: host,
  });
  controller.on_change(() => {
    void wrapper.setProps({ state: controller.state });
  });
  return { wrapper, host, controller };
}

afterEach(() => {
  document.body.innerHTML = "";
});

describe("StudioWorkspace: route -> view mounting", () => {
  it("mounts WorkbenchView on the workbench route", async () => {
    const { wrapper } = await mount_at_route("workbench", build_capabilities());
    expect(wrapper.find('[data-testid="workbench-view"]').exists()).toBe(true);
  });

  it("mounts PromptView on the prompt route", async () => {
    const { wrapper } = await mount_at_route("prompt", build_capabilities());
    expect(wrapper.find('[data-testid="prompt-view"]').exists()).toBe(true);
  });

  it("mounts AssetsView on the assets route", async () => {
    const { wrapper } = await mount_at_route("assets", build_capabilities());
    expect(wrapper.text()).toContain("No characters saved yet");
  });

  it("mounts GalleryView on the gallery route", async () => {
    const { wrapper } = await mount_at_route("gallery", build_capabilities());
    expect(wrapper.text()).toContain("No generated images yet");
  });

  it("mounts DiagnosticsView on the diagnostics route", async () => {
    const { wrapper } = await mount_at_route("diagnostics", build_capabilities());
    expect(wrapper.find('[data-testid="diagnostics-view"]').exists()).toBe(true);
  });

  it("mounts SettingsView on the settings route", async () => {
    const { wrapper } = await mount_at_route("settings", build_capabilities());
    expect(wrapper.find('[data-testid="settings-view"]').exists()).toBe(true);
  });
});

describe("StudioWorkspace: Workbench intents forward to the controller", () => {
  it("forwards a valid submit to generation.submit", async () => {
    const submit = vi.fn().mockResolvedValue(build_job({ state: "completed" }));
    const capabilities = build_capabilities({
      profiles: {
        ...create_unavailable_capabilities().profiles,
        load: () => Promise.resolve([PROFILE]),
      },
      generation: { ...create_unavailable_capabilities().generation, submit },
    });
    const { wrapper } = await mount_at_route("workbench", capabilities);

    await wrapper.find('[data-testid="positive-prompt-input"]').setValue("a fox in a forest");
    await wrapper.find('[data-testid="submit-generation"]').trigger("click");
    await vi.waitFor(() => {
      expect(submit).toHaveBeenCalledTimes(1);
    });
    expect(submit.mock.calls[0]?.[0]).toMatchObject({ profile_id: PROFILE.id });
  });

  it("forwards cancel-job to generation.cancel after the confirm dialog", async () => {
    const job = build_job();
    const cancel = vi.fn().mockResolvedValue(build_job({ state: "cancelled" }));
    const capabilities = build_capabilities({
      profiles: {
        ...create_unavailable_capabilities().profiles,
        load: () => Promise.resolve([PROFILE]),
      },
      generation: {
        ...create_unavailable_capabilities().generation,
        load: () => Promise.resolve([job]),
        cancel,
      },
    });
    const { wrapper } = await mount_at_route("workbench", capabilities);

    await wrapper.find('[aria-label="Cancel job"]').trigger("click");
    await nextTick();
    const confirm_button = document.querySelector('button[aria-label="Confirm"]');
    expect(confirm_button).not.toBeNull();
    (confirm_button as HTMLButtonElement).click();
    await vi.waitFor(() => {
      expect(cancel).toHaveBeenCalledWith(job.job_id);
    });
  });

  it("forwards open-settings to a route change", async () => {
    const { wrapper, controller } = await mount_at_route("workbench", build_capabilities());
    await wrapper.find('[data-testid="open-provider-settings"]').trigger("click");
    expect(controller.state.route).toBe("settings");
  });
});

describe("StudioWorkspace: Prompt intents forward to the controller", () => {
  it("forwards select-preset to prompt_presets.load_draft", async () => {
    const load_draft = vi.fn().mockResolvedValue(PRESET_DRAFT);
    const capabilities = build_capabilities({
      prompt_presets: {
        ...create_unavailable_capabilities().prompt_presets,
        load: () => Promise.resolve([PRESET]),
        load_draft,
      },
    });
    const { wrapper } = await mount_at_route("prompt", capabilities);

    await wrapper.find('[data-testid="preset-select"]').trigger("click");
    await vi.waitFor(() => {
      expect(load_draft).toHaveBeenCalledWith(PRESET.id);
    });
  });
});
