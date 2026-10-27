import {
  default_prompt_tag_selection,
  type ImageGenerationRequest,
  type PromptTagSelection,
} from "@tavern-canvas/contracts";
import { describe, expect, it } from "vitest";

import type { AssetRecordSummary } from "../../ui/contracts/ui_capabilities.js";
import { inject_prompt_tags, prompt_tag_presets } from "./prompt_tags.js";

const CUSTOM: AssetRecordSummary = {
  id: "11111111-1111-4111-8111-111111111111",
  category: "prompt_tag",
  record_key: "primary:11111111-1111-4111-8111-111111111111",
  display_name: "Painterly",
  updated_at: "2026-10-27T00:00:00.000Z",
  payload: { kind: "quality", text: "painterly, soft light" },
};

function request(extra: Record<string, unknown>): ImageGenerationRequest {
  return { prompt: "1girl, forest", negative_prompt: "hat", ...extra } as ImageGenerationRequest;
}

describe("inject_prompt_tags", () => {
  it("appends quality tags and puts undesired content before the negative prompt", () => {
    const selection = default_prompt_tag_selection("novelai", "nai-diffusion-4-5-full");

    const injected = inject_prompt_tags(
      request({ provider_id: "novelai", action: "generate", model_id: "nai-diffusion-4-5-full" }),
      selection,
      prompt_tag_presets([]),
    );

    expect(injected.prompt).toBe("1girl, forest, very aesthetic, masterpiece, no text");
    expect(injected.negative_prompt).toMatch(/^lowres, artistic error, .*, hat$/u);
  });

  it("uses a saved preset for any provider and skips a switched-off kind", () => {
    const selection: PromptTagSelection = {
      quality: { enabled: true, preset_id: `custom:${CUSTOM.id}` },
      undesired_content: { enabled: false, preset_id: "novelai:v4_5_full:heavy" },
    };

    const injected = inject_prompt_tags(
      request({ provider_id: "sd_webui" }),
      selection,
      prompt_tag_presets([CUSTOM]),
    );

    expect(injected).toMatchObject({
      prompt: "1girl, forest, painterly, soft light",
      negative_prompt: "hat",
    });
  });

  it("starts a non-NovelAI profile with both kinds switched off", () => {
    const injected = inject_prompt_tags(
      request({ provider_id: "openai_image" }),
      default_prompt_tag_selection("openai_image", null),
      prompt_tag_presets([]),
    );

    expect(injected).toMatchObject({ prompt: "1girl, forest", negative_prompt: "hat" });
  });
});
