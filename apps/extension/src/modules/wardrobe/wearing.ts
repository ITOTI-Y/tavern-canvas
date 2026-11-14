import { OUTFIT_SLOTS, type OutfitSlot, type Wearing } from "@tavern-canvas/contracts";

import { default_outfit, type WardrobeCharacter, type WardrobeOutfit } from "./wardrobe_library.js";

/** What a character wears before any reply has said otherwise. */
export function initial_wearing(
  character: WardrobeCharacter,
  outfits: readonly WardrobeOutfit[],
): Wearing {
  return {
    character_id: character.id,
    outfit_id: default_outfit(character, outfits)?.id ?? null,
    overrides: {},
    conditions: [],
  };
}

/**
 * Outfit tags in slot order with slot changes applied. A dress and separates cannot be worn
 * together, so a changed top or bottom hides the outfit's own full-body piece and a changed full-body
 * piece hides its own top and bottom.
 */
export function outfit_tags(
  wearing: Wearing,
  outfits: readonly WardrobeOutfit[],
): readonly string[] {
  const outfit = outfits.find((candidate) => candidate.id === wearing.outfit_id);
  const replaced = (slot: OutfitSlot) => {
    const override = wearing.overrides[slot];
    return override !== undefined && override !== "removed";
  };
  const hidden = new Set<OutfitSlot>();
  if (replaced("full_body")) {
    hidden.add("top");
    hidden.add("bottom");
  }
  if (replaced("top") || replaced("bottom")) {
    hidden.add("full_body");
  }
  const tags = OUTFIT_SLOTS.flatMap((slot) => {
    const override = wearing.overrides[slot];
    if (override === "removed") {
      return [];
    }
    if (override !== undefined) {
      return override;
    }
    return hidden.has(slot) ? [] : (outfit?.slots[slot] ?? []);
  });
  return [...new Set(tags)];
}

/** Outfit tags followed by the passing conditions. */
export function wearing_tags(
  wearing: Wearing,
  outfits: readonly WardrobeOutfit[],
): readonly string[] {
  return [...new Set([...outfit_tags(wearing, outfits), ...wearing.conditions])];
}

/** The wearing recorded for a character, or what it starts in. */
export function wearing_of(
  character: WardrobeCharacter,
  snapshot: readonly Wearing[],
  outfits: readonly WardrobeOutfit[],
): Wearing {
  return (
    snapshot.find((wearing) => wearing.character_id === character.id) ??
    initial_wearing(character, outfits)
  );
}

/** Swaps one set of outfit tags in a prompt for another, keeping the position of the first. */
export function replace_outfit_tags(
  prompt: string,
  previous: readonly string[],
  next: readonly string[],
): string {
  const removed = new Set(previous.map((tag) => tag.trim().toLowerCase()));
  const tags = prompt
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag !== "");
  const position = tags.findIndex((tag) => removed.has(tag.toLowerCase()));
  const kept = tags.filter((tag) => !removed.has(tag.toLowerCase()));
  const insert_at = position === -1 ? kept.length : position;
  return [...kept.slice(0, insert_at), ...next, ...kept.slice(insert_at)].join(", ");
}
