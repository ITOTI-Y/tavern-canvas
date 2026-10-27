import type { Wearing } from "@tavern-canvas/contracts";

import type { WardrobeCharacter, WardrobeOutfit } from "../wardrobe/wardrobe_library.js";
import { wearing_of, wearing_tags } from "../wardrobe/wearing.js";

export interface LibraryLora {
  readonly file_name: string;
  readonly weight: number;
  readonly trigger_words: string;
  readonly character_id: string;
}

/** The global library and the active chat's entries, in library order. */
export interface SlotLibrary {
  readonly characters: readonly WardrobeCharacter[];
  readonly outfits: readonly WardrobeOutfit[];
  readonly loras: readonly LibraryLora[];
}

export interface MatchedCharacter {
  readonly character: WardrobeCharacter;
  /** What the reply's wardrobe snapshot says the character wears. */
  readonly outfit_tags: readonly string[];
}

export interface LibraryMatch {
  readonly characters: readonly MatchedCharacter[];
  /** Every library outfit name, so a model that echoes them as tags can be filtered. */
  readonly outfit_names: readonly string[];
}

const CJK = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u;

function escape_regex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
}

/**
 * Case-insensitive. Names without CJK characters must stand as whole words, so "Ann" does not
 * match "Anna"; CJK text has no word separators, so CJK names match as substrings.
 */
export function mentions(text: string, name: string): boolean {
  const trimmed = name.trim();
  if (trimmed === "") {
    return false;
  }
  if (CJK.test(trimmed)) {
    return text.toLowerCase().includes(trimmed.toLowerCase());
  }
  return new RegExp(`(?<![\\p{L}\\p{N}])${escape_regex(trimmed)}(?![\\p{L}\\p{N}])`, "iu").test(
    text,
  );
}

function same_name(left: string, right: string): boolean {
  return left.trim().toLowerCase() === right.trim().toLowerCase();
}

/** Whether this name is the character's name or one of its aliases. */
export function is_named(character: WardrobeCharacter, name: string): boolean {
  return [character.name, ...character.aliases].some((candidate) => same_name(candidate, name));
}

/** Library characters with these names or aliases, in the order the names are given. */
export function find_characters(
  names: readonly string[],
  library: SlotLibrary,
): readonly WardrobeCharacter[] {
  return names.flatMap((name) => {
    const character = library.characters.find((candidate) => is_named(candidate, name));
    return character === undefined ? [] : [character];
  });
}

/**
 * Characters named in the text, by name or alias, or reported by the analysis model, each with
 * the outfit the reply's wardrobe snapshot records.
 */
export function match_library(
  text: string,
  reported_characters: readonly string[],
  library: SlotLibrary,
  snapshot: readonly Wearing[],
): LibraryMatch {
  return {
    characters: library.characters
      .filter(
        (character) =>
          [character.name, ...character.aliases].some((name) => mentions(text, name)) ||
          reported_characters.some((reported) => is_named(character, reported)),
      )
      .map((character) => ({
        character,
        outfit_tags: wearing_tags(
          wearing_of(character, snapshot, library.outfits),
          library.outfits,
        ),
      })),
    outfit_names: library.outfits.map((outfit) => outfit.name),
  };
}
