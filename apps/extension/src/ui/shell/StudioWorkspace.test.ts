import type { Uuid } from "@tavern-canvas/contracts";
import { flushPromises, mount } from "@vue/test-utils";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { markRaw } from "vue";
import { createI18n } from "vue-i18n";

import { en_messages } from "../../i18n/locales/en.js";
import { zh_cn_messages } from "../../i18n/locales/zh_cn.js";
import { PORTAL_TARGET_KEY } from "../contracts/portal_keys.js";
import type {
  PromptPresetDraft,
  PromptPresetSummary,
  StudioCapabilities,
} from "../contracts/ui_capabilities.js";
import type { SettingsSection, StudioRoute } from "../contracts/view_models.js";
import { create_studio_controller } from "../controllers/studio_controller.js";
import { create_unavailable_capabilities } from "../controllers/unavailable_capabilities.js";
import StudioWorkspace from "./StudioWorkspace.vue";

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

beforeAll(async () => {
  await Promise.all([
    import("../views/prompt/PromptView.vue"),
    import("../views/assets/AssetsView.vue"),
    import("../views/gallery/GalleryView.vue"),
    import("../views/diagnostics/DiagnosticsView.vue"),
    import("../views/settings/SettingsView.vue"),
  ]);
}, 60_000);

async function mount_workspace(
  route: StudioRoute,
  section: SettingsSection | null = null,
  capabilities: StudioCapabilities = create_unavailable_capabilities(),
) {
  const controller = markRaw(create_studio_controller({ capabilities, initial_route: route }));
  await controller.start();
  if (section !== null) {
    controller.set_settings_section(section);
  }

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
  await flushPromises();
  return { wrapper, controller };
}

afterEach(() => {
  document.body.innerHTML = "";
});

describe("StudioWorkspace", () => {
  it("mounts the gallery on the gallery route", async () => {
    const { wrapper } = await mount_workspace("gallery");
    expect(wrapper.text()).toContain("No generated images yet");
  });

  it("opens settings on the illustration section", async () => {
    const { wrapper } = await mount_workspace("settings");
    expect(wrapper.find('[data-testid="settings-view"]').exists()).toBe(true);
    expect(wrapper.find('[aria-current="page"]').text()).toBe("Illustration");
  });

  it.each([
    ["Prompt presets", '[data-testid="prompt-view"]'],
    ["Diagnostics", '[data-testid="diagnostics-view"]'],
  ])("switches to the %s section from the section list", async (label, selector) => {
    const { wrapper } = await mount_workspace("settings");

    const button = wrapper.findAll("nav button").find((candidate) => candidate.text() === label);
    await button?.trigger("click");
    await flushPromises();

    expect(wrapper.find(selector).exists()).toBe(true);
  });

  it("shows the library section", async () => {
    const { wrapper } = await mount_workspace("settings", "library");
    expect(wrapper.text()).toContain("No characters saved yet");
  });

  it("forwards select-preset to prompt_presets.load_draft", async () => {
    const load_draft = vi.fn().mockResolvedValue(PRESET_DRAFT);
    const capabilities = {
      ...create_unavailable_capabilities(),
      prompt_presets: {
        ...create_unavailable_capabilities().prompt_presets,
        load: () => Promise.resolve([PRESET]),
        load_draft,
      },
    };
    const { wrapper } = await mount_workspace("settings", "prompts", capabilities);

    await wrapper.find('[data-testid="preset-select"]').trigger("click");
    await vi.waitFor(() => {
      expect(load_draft).toHaveBeenCalledWith(PRESET.id);
    });
  });
});
