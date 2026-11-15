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
 * to the positive prompt so no description is lost. A ComfyUI prompt gets each of them on a line
 * of its own, which keeps one character's traits apart from the next for a model that reads
 * natural language.
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
  const descriptions = folded.map((character) => character.prompt);
  const prompt =
    folded.length === 0
      ? request.prompt
      : request.provider_id === "comfyui"
        ? [request.prompt, ...descriptions]
            .map((part) => part.trim())
            .filter((part) => part !== "")
            .join("\n")
        : join_prompt_parts([request.prompt, ...descriptions]);
  if (sent.length === 0) {
    return { ...request, prompt };
  }
  return {
    ...request,
    prompt,
    characters: sent.map((character) => ({
      prompt: character.prompt,
      ...(character.negative_prompt.trim() === ""
        ? {}
        : { negative_prompt: character.negative_prompt }),
      ...(character.center === undefined ? {} : { center: character.center }),
    })),
  } as ImageGenerationRequest;
}
