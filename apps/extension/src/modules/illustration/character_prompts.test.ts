import type { ImageGenerationRequest } from "@tavern-canvas/contracts";
import { describe, expect, it } from "vitest";

import { attach_character_prompts } from "./character_prompts.js";

const PROMPTS = [
  { name: "Alice", prompt: "girl, silver hair", negative_prompt: "" },
  { name: "Bob", prompt: "boy, armor", negative_prompt: "hat", center: { x: 0.9, y: 0.5 } },
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
        { prompt: "boy, armor", negative_prompt: "hat", center: { x: 0.9, y: 0.5 } },
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

  it("writes each character as a sentence with its position in a ComfyUI prompt", () => {
    const comfyui = {
      provider_id: "comfyui",
      prompt: "1girl, 1boy, tavern",
    } as unknown as ImageGenerationRequest;

    expect(attach_character_prompts(comfyui, PROMPTS)).toMatchObject({
      prompt:
        "1girl, 1boy, tavern\nA girl with silver hair.\nOn the far right is a boy with armor.",
    });
  });

  it("names the depth of a character away from the middle row and drops interaction prefixes", () => {
    const comfyui = { provider_id: "comfyui", prompt: "" } as unknown as ImageGenerationRequest;

    expect(
      attach_character_prompts(comfyui, [
        {
          name: "wolf 1",
          prompt: "other, wolf, source#threatening",
          negative_prompt: "",
          center: { x: 0.3, y: 0.7 },
        },
        { name: "Cara", prompt: "girl", negative_prompt: "", center: { x: 0.5, y: 0.3 } },
      ]),
    ).toMatchObject({
      prompt:
        "At center-left in the foreground is a creature with wolf, threatening.\nIn the center in the background is a girl.",
    });
  });
});
