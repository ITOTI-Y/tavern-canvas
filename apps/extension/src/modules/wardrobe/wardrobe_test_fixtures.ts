import {
  APPEARANCE_SLOTS,
  OUTFIT_SLOTS,
  type AppearanceSlot,
  type OutfitSlot,
} from "@tavern-canvas/contracts";

import type { WardrobeCharacter, WardrobeOutfit } from "./wardrobe_library.js";

export function test_character(
  fields: Partial<Omit<WardrobeCharacter, "appearance">> & {
    readonly id: string;
    readonly name: string;
    readonly appearance?: Partial<Record<AppearanceSlot, readonly string[]>>;
  },
): WardrobeCharacter {
  return {
    aliases: [],
    subject: "girl",
    excluded_traits: [],
    default_outfit_id: null,
    reference: null,
    origin: "user",
    locked_fields: [],
    chat_id: null,
    ...fields,
    appearance: Object.fromEntries(
      APPEARANCE_SLOTS.map((slot) => [slot, fields.appearance?.[slot] ?? []]),
    ) as Record<AppearanceSlot, readonly string[]>,
  };
}

export function test_outfit(
  fields: Partial<Omit<WardrobeOutfit, "slots">> & {
    readonly id: string;
    readonly name: string;
    readonly slots?: Partial<Record<OutfitSlot, readonly string[]>>;
  },
): WardrobeOutfit {
  return {
    character_id: null,
    origin: "user",
    chat_id: null,
    ...fields,
    slots: Object.fromEntries(
      OUTFIT_SLOTS.map((slot) => [slot, fields.slots?.[slot] ?? []]),
    ) as Record<OutfitSlot, readonly string[]>,
  };
}
