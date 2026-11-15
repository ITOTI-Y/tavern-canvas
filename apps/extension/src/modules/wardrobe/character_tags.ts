import type { VocabularySearchResult } from "@tavern-canvas/contracts";

/** Character tags with fewer Danbooru posts than this are ones image models barely know. */
export const MIN_CHARACTER_POSTS = 50;

/** Vocabulary results for a query; `null` when the vocabulary cannot answer now. */
export type VocabularyLookup = (query: string) => Promise<readonly VocabularySearchResult[] | null>;

function as_query(tag: string): string {
  return tag.trim().toLowerCase().replace(/\s+/gu, "_");
}

function as_tag(record: string): string {
  return record.replaceAll("_", " ");
}

function known_character(result: VocabularySearchResult): boolean {
  return result.category === "character" && result.popularity >= MIN_CHARACTER_POSTS;
}

async function exact(
  lookup: VocabularyLookup,
  tag: string,
): Promise<VocabularySearchResult | undefined> {
  const query = as_query(tag);
  return (await lookup(query))?.find(
    (result) => result.match_kind === "exact" && result.display_text.toLowerCase() === query,
  );
}

/** The character listed under the story's name for them, such as 初音未来 for hatsune_miku. */
async function by_name(
  lookup: VocabularyLookup,
  name: string,
): Promise<VocabularySearchResult | undefined> {
  const trimmed = name.trim();
  if (trimmed === "") {
    return undefined;
  }
  return (await lookup(trimmed))?.find(
    (result) =>
      result.match_kind === "translation" &&
      known_character(result) &&
      result.translation?.split("-")[0]?.trim() === trimmed,
  );
}

/** Another character tag shares this one's name with a series qualifier, as saber and saber_(fate) do. */
async function shares_name(lookup: VocabularyLookup, record: string): Promise<boolean> {
  const prefix = `${record}_(`;
  return (
    (await lookup(record))?.some(
      (result) => result.category === "character" && result.display_text.startsWith(prefix),
    ) ?? false
  );
}

/**
 * The character tag slot as stored: the model's proposed Danbooru character tag when the
 * vocabulary lists it as a character image models know, else the known character the vocabulary
 * files under `name`; empty for an original character or when the vocabulary cannot answer. A
 * proposed copyright tag is kept only when the character tag has no series qualifier and another
 * character shares its name.
 */
export async function resolve_character_tags(
  proposed: readonly string[],
  name: string,
  lookup: VocabularyLookup,
): Promise<readonly string[]> {
  if (proposed.length === 0) {
    return [];
  }
  const found = await Promise.all(proposed.map((tag) => exact(lookup, tag)));
  const character =
    found.find((result) => result !== undefined && known_character(result)) ??
    (await by_name(lookup, name));
  if (character === undefined) {
    return [];
  }
  const record = character.display_text.toLowerCase();
  const copyright = found.find((result) => result?.category === "copyright");
  if (copyright === undefined || record.includes("_(") || !(await shares_name(lookup, record))) {
    return [as_tag(record)];
  }
  return [as_tag(record), as_tag(copyright.display_text.toLowerCase())];
}
