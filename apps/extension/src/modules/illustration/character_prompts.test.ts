import type { ImageGenerationRequest } from "@tavern-canvas/contracts";
import { describe, expect, it } from "vitest";

import { attach_character_prompts } from "./character_prompts.js";

const PROMPTS = [
  { name: "Alice", prompt: "girl, silver hair", negative_prompt: "" },
  { name: "Bob", prompt: "boy, armor", negative_prompt: "hat" },
];

function novelai(model_id: string): ImageGenerationRequest {
  return {
    provider_id: "novelai",
    action: "generate",
    model_id,
    prompt: "1girl, 1boy, tavern",
  } as unknown as ImageGenerationRequest;
}

describe("attach_character_prompts", () => {
  it("sends NovelAI character prompts on a V4.5 model", () => {
    const request = attach_character_prompts(novelai("nai-diffusion-4-5-full"), PROMPTS);

    expect(request).toMatchObject({
      prompt: "1girl, 1boy, tavern",
      characters: [
        { prompt: "girl, silver hair" },
        { prompt: "boy, armor", negative_prompt: "hat" },
      ],
    });
  });

  it("folds the descriptions into the prompt where character prompts are unavailable", () => {
    const sd = {
      provider_id: "sd_webui",
      action: "generate",
      prompt: "tavern",
    } as unknown as ImageGenerationRequest;

    expect(attach_character_prompts(sd, PROMPTS)).toMatchObject({
      prompt: "tavern, girl, silver hair, boy, armor",
    });
    expect(attach_character_prompts(novelai("nai-diffusion-3"), PROMPTS)).not.toHaveProperty(
      "characters",
    );
  });
});
