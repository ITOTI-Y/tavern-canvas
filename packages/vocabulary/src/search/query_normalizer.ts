import { normalize_vocabulary_search_key } from "@tavern-canvas/contracts";

export interface NormalizedVocabularyQuery {
  readonly raw: string;
  readonly normalized: string;
  readonly is_empty: boolean;
  // null when the normalized query has fewer than 2 code points.
  readonly group_key: string | null;
  readonly trigrams: readonly string[];
}

function to_code_points(text: string): readonly string[] {
  return Array.from(text);
}

export function code_point_group_key(text: string, code_point_count: number): string {
  return Array.from(text).slice(0, code_point_count).join("");
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

export function normalize_vocabulary_query(raw: string): NormalizedVocabularyQuery {
  const normalized = normalize_vocabulary_search_key(raw);
  const code_points = to_code_points(normalized);
  return {
    raw,
    normalized,
    is_empty: normalized.length === 0,
    group_key: code_points.length >= 2 ? code_point_group_key(normalized, 2) : null,
    trigrams: build_trigrams(code_points),
  };
}
