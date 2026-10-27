import { flushPromises, mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { createI18n } from "vue-i18n";

import { en_messages } from "../../i18n/locales/en.js";
import type { PromptTagsPort } from "../contracts/prompt_tags_port.js";
import type { ProviderProfileSummary } from "../contracts/ui_capabilities.js";
import PromptTagChips from "./PromptTagChips.vue";

const PROFILE: ProviderProfileSummary = {
  id: "11111111-1111-4111-8111-111111111111",
  provider_id: "novelai",
  display_name: "NovelAI",
  model_id: "nai-diffusion-4-5-full",
  workflow_id: null,
  is_default: true,
  credential_reference: null,
  updated_at: "2026-10-27T00:00:00.000Z",
  novelai_defaults: null,
  prompt_tags: null,
};

function mount_chips(kind: "quality" | "undesired_content") {
  const save = vi.fn(() => Promise.resolve());
  const port: PromptTagsPort = { profile: PROFILE, custom_presets: [], save };
  const i18n = createI18n({ legacy: false, locale: "en", messages: { en: en_messages } });
  const wrapper = mount(PromptTagChips, {
    props: { port, kind },
    global: { plugins: [i18n] },
    attachTo: document.body,
  });
  return { wrapper, save };
}

afterEach(() => {
  document.body.innerHTML = "";
});

describe("PromptTagChips", () => {
  it("shows the model's default preset and saves it switched off", async () => {
    const { wrapper, save } = mount_chips("quality");

    expect(wrapper.text()).toContain("Quality tags: Standard · NAI Diffusion V4.5 Full");
    await wrapper.get('button[aria-label="Turn off"]').trigger("click");

    expect(save).toHaveBeenCalledWith(PROFILE.id, {
      quality: { enabled: false, preset_id: "novelai:v4_5_full:standard" },
      undesired_content: { enabled: true, preset_id: "novelai:v4_5_full:heavy" },
    });
  });

  it("lists every preset with its text and saves the one picked", async () => {
    const { wrapper, save } = mount_chips("undesired_content");

    await wrapper.get("button[aria-haspopup]").trigger("click");
    await flushPromises();
    const list = document.querySelector('[data-testid="prompt-tag-list"]');
    expect(list?.textContent).toContain("NAI Diffusion V5");
    const option = [...(list?.querySelectorAll("button") ?? [])].find(
      (button) =>
        (button.closest("section")?.textContent ?? "").includes("NAI Diffusion V5") &&
        button.textContent.includes("Human Focus"),
    );
    option?.click();

    expect(save).toHaveBeenCalledWith(PROFILE.id, {
      quality: { enabled: true, preset_id: "novelai:v4_5_full:standard" },
      undesired_content: { enabled: true, preset_id: "novelai:v5:human_focus" },
    });
  });
});
