import { normalize_vocabulary_search_key } from "@tavern-canvas/contracts";

export interface NormalizedVocabularyQuery {
  readonly raw: string;
  readonly normalized: string;
  readonly is_empty: boolean;
  // First two normalized Unicode code points, matching the prefix/alias
  // shard grouping key (payload-contract.md). null when the normalized
  // query has fewer than 2 code points -- too short to address a group.
  readonly group_key: string | null;
  // Unique normalized 3-code-point sequences, in first-occurrence order.
  readonly trigrams: readonly string[];
}

function to_code_points(text: string): readonly string[] {
  return Array.from(text);
}

function build_trigrams(code_points: readonly string[]): readonly string[] {
  if (code_points.length < 3) {
    return [];
  }
  const seen = new Set<string>();
  const trigrams: string[] = [];
  for (let index = 0; index <= code_points.length - 3; index += 1) {
    const trigram = code_points.slice(index, index + 3).join("");
    if (!seen.has(trigram)) {
      seen.add(trigram);
      trigrams.push(trigram);
    }
  }
  return trigrams;
}

/**
 * Normalizes a raw search box query into every derived artifact the query
 * planner's phases need: the shared search key (reusing the contracts
 * normalizer so query-side and index-side normalization can never drift),
 * the prefix/alias shard group key, and the trigram set for fuzzy recall.
 */
export function normalize_vocabulary_query(raw: string): NormalizedVocabularyQuery {
  const normalized = normalize_vocabulary_search_key(raw);
  const code_points = to_code_points(normalized);
  return {
    raw,
    normalized,
    is_empty: normalized.length === 0,
    group_key: code_points.length >= 2 ? code_points.slice(0, 2).join("") : null,
    trigrams: build_trigrams(code_points),
  };
}
