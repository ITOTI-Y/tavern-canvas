export interface LibraryCharacter {
  readonly id: string;
  readonly name: string;
  readonly appearance: string;
}

export interface LibraryOutfit {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly character_id: string | null;
}

/** Entries in library order: a character's first linked outfit is its default. */
export interface SlotLibrary {
  readonly characters: readonly LibraryCharacter[];
  readonly outfits: readonly LibraryOutfit[];
}

export interface MatchedCharacter {
  readonly character: LibraryCharacter;
  readonly outfit: LibraryOutfit | null;
}

export interface LibraryMatch {
  readonly characters: readonly MatchedCharacter[];
  /** Outfits named in the text that belong to no matched character. */
  readonly loose_outfits: readonly LibraryOutfit[];
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

/**
 * Characters named in the text or reported by the analysis model, each with the outfit named in
 * the text or else its first linked outfit.
 */
export function match_library(
  text: string,
  reported_characters: readonly string[],
  library: SlotLibrary,
): LibraryMatch {
  const named_outfits = library.outfits.filter((outfit) => mentions(text, outfit.name));
  const characters = library.characters
    .filter(
      (character) =>
        mentions(text, character.name) ||
        reported_characters.some((reported) => same_name(reported, character.name)),
    )
    .map((character) => ({
      character,
      outfit:
        named_outfits.find((outfit) => outfit.character_id === character.id) ??
        library.outfits.find((outfit) => outfit.character_id === character.id) ??
        null,
    }));
  const worn = new Set(characters.map((entry) => entry.outfit?.id));
  return {
    characters,
    loose_outfits: named_outfits.filter((outfit) => !worn.has(outfit.id)),
  };
}
