import type { VocabularyMatchKind } from "@tavern-canvas/contracts";

import type { NormalizedVocabularyQuery } from "./query_normalizer.js";
import type { VocabularyTrigramShardPayload } from "./vocabulary_shard_payloads.js";

export interface VocabularyIndexEntry {
  readonly key: string;
  readonly record_id: number;
  readonly popularity: number;
}

// Phase-generated candidate, before dedup/hydration/scoring (result_ranker's
// job). "alias" is provisional: a candidate sourced from the alias shard may
// be refined to "translation" once hydration reveals which field matched.
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
  // Already-loaded entries for the query's group_key shard(s), unfiltered by
  // the query itself -- plan_vocabulary_query does the startsWith filtering.
  readonly prefix_entries: readonly VocabularyIndexEntry[];
  readonly alias_entries: readonly VocabularyIndexEntry[];
  // record_id -> number of query trigrams it matched, from
  // resolve_trigram_candidates.
  readonly trigram_matches: ReadonlyMap<number, number>;
}

function plan_hot_candidates(input: VocabularyPlannerInput): readonly VocabularyPlannerCandidate[] {
  const ids =
    input.category !== undefined && input.category !== ""
      ? input.hot_by_category
      : input.hot_global;
  return ids.map((record_id) => ({
    record_id,
    match_kind: "hot",
    matched_key: null,
    source_popularity: null,
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

/**
 * Runs the exact/hot -> prefix -> alias/translation -> trigram phases and
 * returns raw candidates: no dedup, no hydration, no score. An empty query
 * short-circuits to hot-only, since prefix/alias/trigram all require query
 * text to match against. result_ranker owns dedup, hydration-based
 * alias/translation refinement, category filtering, scoring, and the
 * 200-detail-record cap.
 */
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

/**
 * Delta-decodes trigram shard entries and counts, per candidate record,
 * how many of the query's trigrams it matched -- the fuzzy/typo recall
 * signal used to rank and cap trigram-phase candidates before hydration.
 */
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
