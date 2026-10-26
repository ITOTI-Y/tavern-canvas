import type { VocabularyMatchKind } from "@tavern-canvas/contracts";

import type { NormalizedVocabularyQuery } from "./query_normalizer.js";
import type { VocabularyTrigramShardPayload } from "./vocabulary_shard_payloads.js";

export interface VocabularyIndexEntry {
  readonly key: string;
  readonly record_id: number;
  readonly popularity: number;
}

// "alias" is provisional: refined to "translation" once hydration reveals which field matched.
export interface VocabularyPlannerCandidate {
  readonly record_id: number;
  readonly match_kind: VocabularyMatchKind;
  readonly matched_key: string | null;
  readonly source_popularity: number | null;
  readonly trigram_overlap: number;
}

export interface VocabularyPlannerInput {
  readonly query: NormalizedVocabularyQuery;
  readonly category?: string;
  readonly hot_global: readonly number[];
  readonly hot_by_category: readonly number[];
  readonly prefix_entries: readonly VocabularyIndexEntry[];
  readonly alias_entries: readonly VocabularyIndexEntry[];
  readonly trigram_matches: ReadonlyMap<number, number>;
}

function plan_hot_candidates(input: VocabularyPlannerInput): readonly VocabularyPlannerCandidate[] {
  const ids =
    input.category !== undefined && input.category !== ""
      ? input.hot_by_category
      : input.hot_global;
  // The hot shard holds record ids already sorted by popularity, without values. The synthetic
  // descending value keeps select_hydration_targets' 200-record cap from falling back to record_id
  // order and dropping the most popular entries; final ranking uses the hydrated popularity.
  return ids.map((record_id, index) => ({
    record_id,
    match_kind: "hot",
    matched_key: null,
    source_popularity: ids.length - index,
    trigram_overlap: 0,
  }));
}

function plan_range_candidates(
  entries: readonly VocabularyIndexEntry[],
  query_key: string,
  exact_kind: VocabularyMatchKind,
  prefix_kind: VocabularyMatchKind,
): VocabularyPlannerCandidate[] {
  const candidates: VocabularyPlannerCandidate[] = [];
  for (const entry of entries) {
    if (!entry.key.startsWith(query_key)) {
      continue;
    }
    candidates.push({
      record_id: entry.record_id,
      match_kind: entry.key === query_key ? exact_kind : prefix_kind,
      matched_key: entry.key,
      source_popularity: entry.popularity,
      trigram_overlap: 0,
    });
  }
  return candidates;
}

function plan_trigram_candidates(
  trigram_matches: ReadonlyMap<number, number>,
): readonly VocabularyPlannerCandidate[] {
  return Array.from(trigram_matches, ([record_id, overlap]) => ({
    record_id,
    match_kind: "trigram" as const,
    matched_key: null,
    source_popularity: null,
    trigram_overlap: overlap,
  }));
}

export function plan_vocabulary_query(
  input: VocabularyPlannerInput,
): readonly VocabularyPlannerCandidate[] {
  if (input.query.is_empty) {
    return plan_hot_candidates(input);
  }

  const query_key = input.query.normalized;
  return [
    ...plan_range_candidates(input.prefix_entries, query_key, "exact", "prefix"),
    ...plan_range_candidates(input.alias_entries, query_key, "alias", "alias"),
    ...plan_trigram_candidates(input.trigram_matches),
  ];
}

export function resolve_trigram_candidates(
  shards: readonly VocabularyTrigramShardPayload[],
  trigrams: readonly string[],
): ReadonlyMap<number, number> {
  const wanted = new Set(trigrams);
  const overlap = new Map<number, number>();
  for (const shard of shards) {
    for (const [trigram, deltas] of shard.entries) {
      if (!wanted.has(trigram)) {
        continue;
      }
      let record_id = 0;
      for (const delta of deltas) {
        record_id += delta;
        overlap.set(record_id, (overlap.get(record_id) ?? 0) + 1);
      }
    }
  }
  return overlap;
}
