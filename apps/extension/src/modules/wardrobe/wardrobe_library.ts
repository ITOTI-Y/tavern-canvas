import {
  APPEARANCE_SLOTS,
  OUTFIT_SLOTS,
  type AppearanceSlot,
  type OutfitSlot,
} from "@tavern-canvas/contracts";

import type { AssetRecordSummary } from "../../ui/contracts/ui_capabilities.js";

export type CharacterSubject = "girl" | "boy" | "other";
export type LibraryOrigin = "user" | "analysis";
export type CharacterReferenceMode = "vibe" | "img2img" | "precise";

export interface CharacterReference {
  /** JPEG data URL. */
  readonly image: string;
  readonly mode: CharacterReferenceMode;
}

export interface WardrobeCharacter {
  readonly id: string;
  readonly name: string;
  /** Other names the story uses for the character, matched like the name. */
  readonly aliases: readonly string[];
  readonly subject: CharacterSubject;
  readonly appearance: Readonly<Record<AppearanceSlot, readonly string[]>>;
  /** Tags kept off this character, sent as its own negative prompt. */
  readonly excluded_traits: readonly string[];
  readonly default_outfit_id: string | null;
  /** Set only when the user chose to send the reference image with NovelAI requests. */
  readonly reference: CharacterReference | null;
  readonly origin: LibraryOrigin;
  /** Appearance slots the user edited; the wardrobe update never fills them. */
  readonly locked_fields: readonly AppearanceSlot[];
  /** `null` for the global library; otherwise the only chat the character appears in. */
  readonly chat_id: string | null;
}

export interface WardrobeOutfit {
  readonly id: string;
  readonly name: string;
  readonly character_id: string | null;
  readonly slots: Readonly<Record<OutfitSlot, readonly string[]>>;
  readonly origin: LibraryOrigin;
  readonly chat_id: string | null;
}

/** Splits a comma-separated tag list, dropping blanks and repeats. */
export function split_tags(value: unknown): readonly string[] {
  if (typeof value !== "string") {
    return [];
  }
  return [
    ...new Set(
      value
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),
    ),
  ];
}

export function join_tags(tags: readonly string[]): string {
  return tags.join(", ");
}

function text(value: unknown): string | null {
  return typeof value === "string" && value.trim() !== "" ? value.trim() : null;
}

function read_reference(payload: Readonly<Record<string, unknown>>): CharacterReference | null {
  const { reference_image: image, reference_send: send, reference_mode: mode } = payload;
  if (typeof image !== "string" || image === "" || send !== 1) {
    return null;
  }
  return mode === "img2img" || mode === "precise" ? { image, mode } : { image, mode: "vibe" };
}

function read_origin(value: unknown): LibraryOrigin {
  return value === "analysis" ? "analysis" : "user";
}

export function read_character(record: AssetRecordSummary): WardrobeCharacter {
  const { payload } = record;
  const subject =
    payload.subject === "boy" || payload.subject === "other" ? payload.subject : "girl";
  const locked = split_tags(payload.locked_fields);
  return {
    id: record.id,
    name: record.display_name,
    aliases: split_tags(payload.aliases),
    subject,
    appearance: Object.fromEntries(
      APPEARANCE_SLOTS.map((slot) => [slot, split_tags(payload[slot])]),
    ) as Record<AppearanceSlot, readonly string[]>,
    excluded_traits: split_tags(payload.excluded_traits),
    default_outfit_id: text(payload.default_outfit_id),
    reference: read_reference(payload),
    origin: read_origin(payload.origin),
    locked_fields: APPEARANCE_SLOTS.filter((slot) => locked.includes(slot)),
    chat_id: text(payload.chat_id),
  };
}

export function read_outfit(record: AssetRecordSummary): WardrobeOutfit {
  const { payload } = record;
  return {
    id: record.id,
    name: record.display_name,
    character_id: text(payload.character_id),
    slots: Object.fromEntries(
      OUTFIT_SLOTS.map((slot) => [slot, split_tags(payload[slot])]),
    ) as Record<OutfitSlot, readonly string[]>,
    origin: read_origin(payload.origin),
    chat_id: text(payload.chat_id),
  };
}

/** Entries of the global library and of this chat, in library order. */
export function visible_in_chat<T extends { readonly chat_id: string | null }>(
  entries: readonly T[],
  chat_id: string | null,
): readonly T[] {
  return entries.filter((entry) => entry.chat_id === null || entry.chat_id === chat_id);
}

/**
 * The characters and outfits a chat sees. A visible character's default outfit is visible too, so a
 * character made global keeps the outfit it was created with in every chat.
 */
export function library_in_chat(
  catalog: {
    readonly character: readonly AssetRecordSummary[];
    readonly outfit: readonly AssetRecordSummary[];
  },
  chat_id: string | null,
): {
  readonly characters: readonly WardrobeCharacter[];
  readonly outfits: readonly WardrobeOutfit[];
} {
  const characters = visible_in_chat(catalog.character.map(read_character), chat_id);
  const defaults = new Set(characters.map((character) => character.default_outfit_id));
  const outfits = catalog.outfit
    .map(read_outfit)
    .filter(
      (outfit) => outfit.chat_id === null || outfit.chat_id === chat_id || defaults.has(outfit.id),
    );
  return { characters, outfits };
}

/** A character's outfit when nothing in the chat says otherwise: its chosen default, else its first. */
export function default_outfit(
  character: WardrobeCharacter,
  outfits: readonly WardrobeOutfit[],
): WardrobeOutfit | null {
  return (
    outfits.find((outfit) => outfit.id === character.default_outfit_id) ??
    outfits.find((outfit) => outfit.character_id === character.id) ??
    null
  );
}
