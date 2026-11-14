import type { IllustrationSlot, Wearing } from "@tavern-canvas/contracts";

import type { IllustrationProposal } from "./analysis.js";
import type { SlotPromptContext } from "./illustration_service.js";
import { match_library } from "./library_match.js";
import type { Paragraph } from "./slot_markers.js";
import { join_prompt_parts } from "../prompt/tag_normalizer.js";
import { assemble_slot_prompt } from "./slot_prompt.js";

/** The caption sentence as one prompt part: commas would split it into separate tags. */
export function caption_tag(caption: string): string {
  return caption.replace(/[,，\s]+/gu, " ").trim();
}

export function proposal_slots(
  paragraphs: readonly Paragraph[],
  proposals: readonly IllustrationProposal[],
  context: SlotPromptContext,
  snapshot: readonly Wearing[],
  new_slot_id: () => string,
): IllustrationSlot[] {
  return proposals.map((proposal): IllustrationSlot => {
    const library = match_library(
      `${paragraphs[proposal.paragraph]?.text ?? ""}\n${proposal.scene}`,
      proposal.characters.map((character) => character.name),
      context.library,
      snapshot,
    );
    const prompt = assemble_slot_prompt({
      preset: context.preset,
      library,
      characters: proposal.characters,
      scene_tags: proposal.tags,
    });
    return {
      slot_id: new_slot_id(),
      paragraph: proposal.paragraph,
      anchor: (paragraphs[proposal.paragraph]?.text ?? "").slice(0, 400),
      scene: proposal.scene,
      characters: [
        ...new Set([
          ...proposal.characters.map((character) => character.name),
          ...library.characters.map((entry) => entry.character.name),
        ]),
      ],
      positive_prompt: join_prompt_parts([prompt.positive_prompt, caption_tag(proposal.caption)]),
      negative_prompt: prompt.negative_prompt,
      character_prompts: [...prompt.character_prompts],
      ...(proposal.size === undefined ? {} : { size: { ...proposal.size } }),
      image_ids: [],
      active_image_id: null,
      pending_request_ids: [],
      last_error: null,
    };
  });
}
