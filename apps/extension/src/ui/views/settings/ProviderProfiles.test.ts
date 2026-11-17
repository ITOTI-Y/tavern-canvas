import type { Uuid } from "@tavern-canvas/contracts";
import { flushPromises, mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { createI18n } from "vue-i18n";

import { en_messages } from "../../../i18n/locales/en.js";
import { PORTAL_TARGET_KEY } from "../../contracts/portal_keys.js";
import type { StudioController } from "../../controllers/studio_controller.js";
import type {
  AssetRecordSummary,
  ProviderProfileSummary,
  ProviderProfileDraft,
} from "../../contracts/ui_capabilities.js";
import ProviderProfiles from "./ProviderProfiles.vue";

const PROFILE_ID = "8d0f0b5e-6f4b-4c43-9a59-1f3c5c2a9b10" as Uuid;
const WORKFLOW_ID = "2b6a1f0e-3c4d-4e5f-8a9b-0c1d2e3f4a5b" as Uuid;

const WORKFLOW = {
  "1": { class_type: "UNETLoader", inputs: { unet_name: "anima.safetensors" } },
  "2": { class_type: "CLIPLoader", inputs: { clip_name: "qwen.safetensors" } },
  "3": { class_type: "VAELoader", inputs: { vae_name: "qwen_vae.safetensors" } },
  "6": { class_type: "CLIPTextEncode", inputs: { text: "1girl", clip: ["2", 0] } },
  "7": { class_type: "CLIPTextEncode", inputs: { text: "worst quality", clip: ["2", 0] } },
  "8": { class_type: "EmptyLatentImage", inputs: { width: 832, height: 1216, batch_size: 1 } },
  "9": {
    class_type: "KSampler",
    inputs: {
      seed: 5,
      steps: 8,
      cfg: 1.5,
      sampler_name: "euler",
      scheduler: "simple",
      model: ["1", 0],
      positive: ["6", 0],
      negative: ["7", 0],
      latent_image: ["8", 0],
    },
  },
  "10": { class_type: "VAEDecode", inputs: { samples: ["9", 0], vae: ["3", 0] } },
  "11": { class_type: "PreviewImage", inputs: { images: ["10", 0] } },
};

const PROFILE: ProviderProfileSummary = {
  id: PROFILE_ID,
  provider_id: "comfyui",
  display_name: "ComfyUI",
  model_id: "workflow",
  workflow_id: WORKFLOW_ID,
  base_url: "http://127.0.0.1:8188",
  credential_reference: null,
  novelai_defaults: null,
  comfyui_defaults: { loras: [{ lora_name: "turbo.safetensors", strength: 1 }] },
  prompt_tags: {
    quality: { enabled: false, preset_id: "novelai:v4_5_full:standard" },
    undesired_content: { enabled: false, preset_id: "novelai:v4_5_full:heavy" },
  },
  updated_at: "2026-01-01T00:00:00.000Z",
};

const WORKFLOW_RECORD: AssetRecordSummary = {
  id: WORKFLOW_ID,
  category: "workflow",
  record_key: "anima",
  display_name: "Anima",
  updated_at: "2026-01-01T00:00:00.000Z",
  payload: { workflow_json: JSON.stringify(WORKFLOW) },
};

afterEach(() => {
  document.body.innerHTML = "";
});

describe("ProviderProfiles", () => {
  it("saves numbers typed into a ComfyUI profile's number fields", async () => {
    const saved: ProviderProfileDraft[] = [];
    const controller = {
      save_provider_profile: vi.fn((draft: ProviderProfileDraft) => {
        saved.push(draft);
        return Promise.resolve();
      }),
    } as unknown as StudioController;
    const portal_target = document.createElement("div");
    document.body.append(portal_target);
    const wrapper = mount(ProviderProfiles, {
      props: {
        profiles: [PROFILE],
        promptTagPresets: [],
        workflows: [WORKFLOW_RECORD],
        activeProfileId: PROFILE_ID,
        controller,
      },
      global: {
        plugins: [createI18n({ legacy: false, locale: "en", messages: { en: en_messages } })],
        provide: { [PORTAL_TARGET_KEY as unknown as string]: portal_target },
      },
      attachTo: document.body,
    });

    const edit = wrapper.findAll("button").find((button) => button.text() === "Edit");
    expect(edit).toBeDefined();
    await edit?.trigger("click");
    await flushPromises();

    const cfg = document.querySelector<HTMLInputElement>('[data-testid="comfyui-default-cfg"]');
    const steps = document.querySelector<HTMLInputElement>('[data-testid="comfyui-default-steps"]');
    expect(cfg).not.toBeNull();
    expect(steps).not.toBeNull();
    for (const [input, value] of [
      [cfg, "2"],
      [steps, "12"],
    ] as const) {
      if (input !== null) {
        input.value = value;
        input.dispatchEvent(new Event("input"));
      }
    }
    const strength = document.querySelector<HTMLInputElement>(
      '[data-testid="comfyui-loras"] input[type="number"]',
    );
    expect(strength).not.toBeNull();
    if (strength !== null) {
      strength.value = "0.8";
      strength.dispatchEvent(new Event("input"));
    }
    await flushPromises();

    const save = Array.from(
      document.querySelectorAll<HTMLButtonElement>('[role="dialog"] button'),
    ).find((button) => button.textContent?.trim() === "Save");
    expect(save).toBeDefined();
    save?.click();
    await flushPromises();

    expect(saved).toHaveLength(1);
    expect(saved[0]?.comfyui_defaults).toEqual({
      cfg: 2,
      steps: 12,
      loras: [{ lora_name: "turbo.safetensors", strength: 0.8 }],
    });
    wrapper.unmount();
  });
});
