import { bench, describe } from "vitest";

import {
  normalize_vocabulary_query,
  plan_vocabulary_query,
  rank_vocabulary_candidates,
  type VocabularyIndexEntry,
  type VocabularyRecordLike,
} from "@tavern-canvas/vocabulary";

// Node-side benchmark of query planning and ranking, isolated from IndexedDB/Worker overhead.
// Not part of `pnpm test`; run manually:
//   pnpm exec vitest bench tests/performance/vocabulary_search.bench.ts

// Typical 2-char prefix group size of the 500,000-record benchmark fixture: the worst single-shard candidate volume the ranker sorts.
const BUSY_GROUP_SIZE = 5_000;
const TRIGRAM_OVERLAP_MAP_SIZE = 2_000;

function build_busy_prefix_entries(size: number): VocabularyIndexEntry[] {
  const entries: VocabularyIndexEntry[] = [];
  for (let index = 0; index < size; index += 1) {
    entries.push({
      key: `busy${index.toString(36).padStart(6, "0")}`,
      record_id: index,
      popularity: index % 1_000,
    });
  }
  return entries;
}

const busy_prefix_entries = build_busy_prefix_entries(BUSY_GROUP_SIZE);
const records_by_id = new Map<number, VocabularyRecordLike>(
  busy_prefix_entries.map((entry) => [
    entry.record_id,
    { record_id: entry.record_id, tag: entry.key, aliases: [], popularity: entry.popularity },
  ]),
);

describe("vocabulary query planner + ranker (in-memory, no I/O)", () => {
  bench(`prefix phase over a ${String(BUSY_GROUP_SIZE)}-entry shard group`, () => {
    const normalized = normalize_vocabulary_query("busy");
    const candidates = plan_vocabulary_query({
      query: normalized,
      hot_global: [],
      hot_by_category: [],
      prefix_entries: busy_prefix_entries,
      alias_entries: [],
      trigram_matches: new Map(),
    });
    rank_vocabulary_candidates({
      candidates,
      detail_lookup: (record_id) => records_by_id.get(record_id),
      query_normalized: normalized.normalized,
    });
  });

  bench(`trigram phase over a ${String(TRIGRAM_OVERLAP_MAP_SIZE)}-record overlap map`, () => {
    const trigram_matches = new Map<number, number>();
    for (let index = 0; index < TRIGRAM_OVERLAP_MAP_SIZE; index += 1) {
      trigram_matches.set(index, (index % 5) + 1);
    }
    const normalized = normalize_vocabulary_query("qzx");
    const candidates = plan_vocabulary_query({
      query: normalized,
      hot_global: [],
      hot_by_category: [],
      prefix_entries: [],
      alias_entries: [],
      trigram_matches,
    });
    rank_vocabulary_candidates({
      candidates,
      detail_lookup: (record_id) => records_by_id.get(record_id),
      query_normalized: normalized.normalized,
    });
  });
});
