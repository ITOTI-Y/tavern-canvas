import {
  resolve_novelai_model,
  type CharacterCenter,
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

const SUBJECT_NOUNS: Readonly<Record<string, string>> = {
  girl: "girl",
  boy: "boy",
  other: "creature",
};

const INTERACTION_PREFIX = /^(?:source|target|mutual)#/u;

function position_phrase(center: CharacterCenter | undefined): string {
  if (center === undefined) {
    return "";
  }
  const column =
    center.x < 0.2
      ? "On the far left"
      : center.x < 0.4
        ? "At center-left"
        : center.x < 0.6
          ? "In the center"
          : center.x < 0.8
            ? "At center-right"
            : "On the far right";
  const depth = center.y < 0.4 ? " in the background" : center.y > 0.6 ? " in the foreground" : "";
  return `${column}${depth}`;
}

/**
 * One sentence per character for a model that reads natural language: where the character is,
 * then who it is with its tags. Tags listed without a sentence around them end up on whichever
 * character the model picks.
 */
function character_sentence(character: SlotCharacterPrompt): string {
  const tags = character.prompt
    .split(",")
    .map((tag) => tag.trim().replace(INTERACTION_PREFIX, ""))
    .filter((tag) => tag !== "");
  const noun = SUBJECT_NOUNS[tags[0]?.toLowerCase() ?? ""];
  const traits = (noun === undefined ? tags : tags.slice(1)).join(", ");
  const subject = `a ${noun ?? "figure"}${traits === "" ? "" : ` with ${traits}`}`;
  const position = position_phrase(character.center);
  return position === ""
    ? `${subject.charAt(0).toUpperCase()}${subject.slice(1)}.`
    : `${position} is ${subject}.`;
}

/**
 * Sends the slot's character prompts as NovelAI character prompts where the model takes them;
 * the rest (another provider, a V3 model, or more characters than the model allows) is appended
 * to the positive prompt so no description is lost. A ComfyUI prompt gets each of them as a
 * sentence on a line of its own.
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
      : request.provider_id === "comfyui"
        ? [request.prompt.trim(), ...folded.map(character_sentence)]
            .filter((part) => part !== "")
            .join("\n")
        : join_prompt_parts([request.prompt, ...folded.map((character) => character.prompt)]);
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
