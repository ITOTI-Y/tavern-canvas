import {
  resolve_novelai_model,
  type ImageGenerationRequest,
  type SlotCharacterPrompt,
} from "@tavern-canvas/contracts";

import { join_prompt_parts } from "../prompt/tag_normalizer.js";

function character_capacity(request: ImageGenerationRequest): number {
  if (
    request.provider_id !== "novelai" ||
    (request.action !== "generate" && request.action !== "img2img" && request.action !== "infill")
  ) {
    return 0;
  }
  const profile = resolve_novelai_model(request.model_id)?.profile;
  return profile === undefined || profile.family === "v3" ? 0 : profile.max_characters;
}

/**
 * Sends the slot's character prompts as NovelAI character prompts where the model takes them;
 * the rest (another provider, a V3 model, or more characters than the model allows) is appended
 * to the positive prompt so no description is lost.
 */
export function attach_character_prompts(
  request: ImageGenerationRequest,
  prompts: readonly SlotCharacterPrompt[],
): ImageGenerationRequest {
  if (prompts.length === 0) {
    return request;
  }
  const capacity = character_capacity(request);
  const sent = prompts.slice(0, capacity);
  const folded = prompts.slice(capacity);
  const prompt =
    folded.length === 0
      ? request.prompt
      : join_prompt_parts([request.prompt, ...folded.map((character) => character.prompt)]);
  if (sent.length === 0) {
    return { ...request, prompt };
  }
  return {
    ...request,
    prompt,
    characters: sent.map((character) =>
      character.negative_prompt.trim() === ""
        ? { prompt: character.prompt }
        : { prompt: character.prompt, negative_prompt: character.negative_prompt },
    ),
  } as ImageGenerationRequest;
}
