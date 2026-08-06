import { describe, expect, it } from "vitest";

import { normalize_vocabulary_query } from "./query_normalizer.js";
import {
  plan_vocabulary_query,
  resolve_trigram_candidates,
  type VocabularyIndexEntry,
  type VocabularyPlannerInput,
} from "./query_planner.js";
import type { VocabularyTrigramShardPayload } from "./vocabulary_shard_payloads.js";

function entry(key: string, record_id: number, popularity: number): VocabularyIndexEntry {
  return { key, record_id, popularity };
}

function base_input(overrides: Partial<VocabularyPlannerInput> = {}): VocabularyPlannerInput {
  return {
    query: normalize_vocabulary_query(""),
    hot_global: [],
    hot_by_category: [],
    prefix_entries: [],
    alias_entries: [],
    trigram_matches: new Map(),
    ...overrides,
  };
}

describe("plan_vocabulary_query", () => {
  it("returns only hot candidates for an empty query", () => {
    const candidates = plan_vocabulary_query(
      base_input({ query: normalize_vocabulary_query(""), hot_global: [3, 1, 2] }),
    );
    expect(candidates.map((candidate) => candidate.match_kind)).toEqual(["hot", "hot", "hot"]);
    expect(candidates.map((candidate) => candidate.record_id)).toEqual([3, 1, 2]);
  });

  it("uses the category-scoped hot list when a category filter is set on an empty query", () => {
    const candidates = plan_vocabulary_query(
      base_input({
        query: normalize_vocabulary_query(""),
        category: "background",
        hot_global: [9],
        hot_by_category: [5, 6],
      }),
    );
    expect(candidates.map((candidate) => candidate.record_id)).toEqual([5, 6]);
  });

  it("marks a prefix entry whose key equals the query exactly", () => {
    const candidates = plan_vocabulary_query(
      base_input({
        query: normalize_vocabulary_query("cat"),
        prefix_entries: [entry("cat", 1, 10), entry("catalog", 2, 5)],
      }),
    );
    const by_id = new Map(candidates.map((candidate) => [candidate.record_id, candidate]));
    expect(by_id.get(1)?.match_kind).toBe("exact");
    expect(by_id.get(2)?.match_kind).toBe("prefix");
  });

  it("excludes prefix/alias entries that do not start with the normalized query", () => {
    const candidates = plan_vocabulary_query(
      base_input({
        query: normalize_vocabulary_query("cat"),
        prefix_entries: [entry("dog", 9, 1)],
        alias_entries: [entry("dog food", 10, 1)],
      }),
    );
    expect(candidates).toEqual([]);
  });

  it("carries alias-shard entries as provisional alias candidates", () => {
    const candidates = plan_vocabulary_query(
      base_input({
        query: normalize_vocabulary_query("blue sky"),
        alias_entries: [entry("blue sky", 4, 2)],
      }),
    );
    expect(candidates).toEqual([
      {
        record_id: 4,
        match_kind: "alias",
        matched_key: "blue sky",
        source_popularity: 2,
        trigram_overlap: 0,
      },
    ]);
  });

  it("folds underscore/space variants to the same normalized query key", () => {
    const with_underscore = plan_vocabulary_query(
      base_input({
        query: normalize_vocabulary_query("blue_sky"),
        prefix_entries: [entry("blue sky", 1, 1)],
      }),
    );
    expect(with_underscore[0]?.match_kind).toBe("exact");
  });
});

describe("resolve_trigram_candidates", () => {
  function trigram_shard(
    entries: VocabularyTrigramShardPayload["entries"],
  ): VocabularyTrigramShardPayload {
    return { kind: "trigram", entries };
  }

  it("decodes delta-encoded record ids and counts trigram overlap per candidate", () => {
    const shard = trigram_shard([
      ["sun", [10, 5, 1]], // record ids 10, 15, 16
      ["uns", [15, 1]], // record ids 15, 16
    ]);
    const matches = resolve_trigram_candidates([shard], ["sun", "uns"]);
    expect(matches.get(10)).toBe(1);
    expect(matches.get(15)).toBe(2);
    expect(matches.get(16)).toBe(2);
  });

  it("ignores trigrams present in the shard but not requested by the query", () => {
    const shard = trigram_shard([["xyz", [1]]]);
    const matches = resolve_trigram_candidates([shard], ["sun"]);
    expect(matches.size).toBe(0);
  });

  it("recovers a typo'd query via shared trigrams even without a prefix match", () => {
    // tag "sunset" normalized trigrams: sun, uns, nse, set
    const shard = trigram_shard([
      ["sun", [42]],
      ["uns", [42]],
    ]);
    // query "sunswt" (typo for sunset) trigrams: sun, uns, nsw, swt
    const query = normalize_vocabulary_query("sunswt");
    const matches = resolve_trigram_candidates([shard], query.trigrams);
    expect(matches.get(42)).toBe(2);
  });
});
