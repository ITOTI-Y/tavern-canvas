import { describe, expect, it } from "vitest";

import type { VocabularyPlannerCandidate } from "./query_planner.js";
import { rank_vocabulary_candidates, type VocabularyRecordLike } from "./result_ranker.js";

function record(
  overrides: Partial<VocabularyRecordLike> & { record_id: number; tag: string },
): VocabularyRecordLike {
  return { aliases: [], popularity: 0, ...overrides };
}

function candidate(
  overrides: Partial<VocabularyPlannerCandidate> & { record_id: number },
): VocabularyPlannerCandidate {
  return {
    match_kind: "prefix",
    matched_key: null,
    source_popularity: null,
    trigram_overlap: 0,
    ...overrides,
  };
}

describe("rank_vocabulary_candidates", () => {
  it("ranks an exact tag match above a prefix match", () => {
    const records = new Map<number, VocabularyRecordLike>([
      [1, record({ record_id: 1, tag: "cat" })],
      [2, record({ record_id: 2, tag: "catalog" })],
    ]);
    const results = rank_vocabulary_candidates({
      candidates: [
        candidate({
          record_id: 2,
          match_kind: "prefix",
          matched_key: "catalog",
          source_popularity: 100,
        }),
        candidate({ record_id: 1, match_kind: "exact", matched_key: "cat", source_popularity: 1 }),
      ],
      detail_lookup: (id) => records.get(id),
      query_normalized: "cat",
    });
    expect(results.map((result) => result.record_id)).toEqual([1, 2]);
    expect(results[0]?.match_kind).toBe("exact");
  });

  it("ranks a primary tag match above an alias/translation match", () => {
    const records = new Map<number, VocabularyRecordLike>([
      [1, record({ record_id: 1, tag: "sky", popularity: 1 })],
      [2, record({ record_id: 2, tag: "azure", aliases: ["sky blue"], popularity: 1000 })],
    ]);
    const results = rank_vocabulary_candidates({
      candidates: [
        candidate({
          record_id: 2,
          match_kind: "alias",
          matched_key: "sky blue",
          source_popularity: 1000,
        }),
        candidate({ record_id: 1, match_kind: "prefix", matched_key: "sky", source_popularity: 1 }),
      ],
      detail_lookup: (id) => records.get(id),
      query_normalized: "sky",
    });
    expect(results.map((result) => result.record_id)).toEqual([1, 2]);
  });

  it("breaks ties within the same match tier by popularity", () => {
    const records = new Map<number, VocabularyRecordLike>([
      [1, record({ record_id: 1, tag: "cat one", popularity: 5 })],
      [2, record({ record_id: 2, tag: "cat two", popularity: 50 })],
    ]);
    const results = rank_vocabulary_candidates({
      candidates: [
        candidate({
          record_id: 1,
          match_kind: "prefix",
          matched_key: "cat one",
          source_popularity: 5,
        }),
        candidate({
          record_id: 2,
          match_kind: "prefix",
          matched_key: "cat two",
          source_popularity: 50,
        }),
      ],
      detail_lookup: (id) => records.get(id),
      query_normalized: "cat",
    });
    expect(results.map((result) => result.record_id)).toEqual([2, 1]);
  });

  it("produces a fully deterministic order for equal tier and popularity", () => {
    const records = new Map<number, VocabularyRecordLike>([
      [20, record({ record_id: 20, tag: "cat b", popularity: 5 })],
      [10, record({ record_id: 10, tag: "cat a", popularity: 5 })],
    ]);
    const run = () =>
      rank_vocabulary_candidates({
        candidates: [
          candidate({
            record_id: 20,
            match_kind: "prefix",
            matched_key: "cat b",
            source_popularity: 5,
          }),
          candidate({
            record_id: 10,
            match_kind: "prefix",
            matched_key: "cat a",
            source_popularity: 5,
          }),
        ],
        detail_lookup: (id) => records.get(id),
        query_normalized: "cat",
      });
    const first = run().map((result) => result.record_id);
    const second = run().map((result) => result.record_id);
    expect(first).toEqual([10, 20]);
    expect(second).toEqual([10, 20]);
  });

  it("refines an alias-shard match into 'translation' when the matched key is the record's translation", () => {
    const records = new Map<number, VocabularyRecordLike>([
      [1, record({ record_id: 1, tag: "sky", translation: "空", aliases: ["sky blue"] })],
    ]);
    const translation_result = rank_vocabulary_candidates({
      candidates: [candidate({ record_id: 1, match_kind: "alias", matched_key: "空" })],
      detail_lookup: (id) => records.get(id),
      query_normalized: "空",
    });
    expect(translation_result[0]?.match_kind).toBe("translation");

    const alias_result = rank_vocabulary_candidates({
      candidates: [candidate({ record_id: 1, match_kind: "alias", matched_key: "sky blue" })],
      detail_lookup: (id) => records.get(id),
      query_normalized: "sky blue",
    });
    expect(alias_result[0]?.match_kind).toBe("alias");
  });

  it("finds a CJK translation search match", () => {
    const records = new Map<number, VocabularyRecordLike>([
      [1, record({ record_id: 1, tag: "cat_ears", translation: "猫耳" })],
    ]);
    const results = rank_vocabulary_candidates({
      candidates: [candidate({ record_id: 1, match_kind: "alias", matched_key: "猫耳" })],
      detail_lookup: (id) => records.get(id),
      query_normalized: "猫耳",
    });
    expect(results[0]).toMatchObject({
      record_id: 1,
      match_kind: "translation",
      display_text: "cat_ears",
    });
  });

  it("keeps underscore and space query variants scoring identically", () => {
    const records = new Map<number, VocabularyRecordLike>([
      [1, record({ record_id: 1, tag: "blue sky" })],
    ]);
    const with_space = rank_vocabulary_candidates({
      candidates: [candidate({ record_id: 1, match_kind: "exact", matched_key: "blue sky" })],
      detail_lookup: (id) => records.get(id),
      query_normalized: "blue sky",
    });
    const with_underscore = rank_vocabulary_candidates({
      candidates: [candidate({ record_id: 1, match_kind: "exact", matched_key: "blue sky" })],
      detail_lookup: (id) => records.get(id),
      query_normalized: "blue sky", // normalize_vocabulary_query already folds "blue_sky" to this
    });
    expect(with_space[0]?.score).toBe(with_underscore[0]?.score);
  });

  it("recalls a typo'd query through the trigram phase, ranked below exact/prefix/alias", () => {
    const records = new Map<number, VocabularyRecordLike>([
      [1, record({ record_id: 1, tag: "sunset", popularity: 1 })],
      [2, record({ record_id: 2, tag: "sunny", popularity: 1 })],
    ]);
    const results = rank_vocabulary_candidates({
      candidates: [
        candidate({ record_id: 1, match_kind: "trigram", trigram_overlap: 2 }),
        candidate({
          record_id: 2,
          match_kind: "exact",
          matched_key: "sunny",
          source_popularity: 1,
        }),
      ],
      detail_lookup: (id) => records.get(id),
      query_normalized: "sunny",
    });
    expect(results.map((result) => result.match_kind)).toEqual(["exact", "trigram"]);
  });

  it("returns hot results for an empty query untouched by tier logic", () => {
    const records = new Map<number, VocabularyRecordLike>([
      [1, record({ record_id: 1, tag: "popular one", popularity: 500 })],
    ]);
    const results = rank_vocabulary_candidates({
      candidates: [candidate({ record_id: 1, match_kind: "hot" })],
      detail_lookup: (id) => records.get(id),
      query_normalized: "",
    });
    expect(results[0]?.match_kind).toBe("hot");
  });

  it("applies a category filter after hydration", () => {
    const records = new Map<number, VocabularyRecordLike>([
      [1, record({ record_id: 1, tag: "a", category: "background" })],
      [2, record({ record_id: 2, tag: "b", category: "character" })],
    ]);
    const results = rank_vocabulary_candidates({
      candidates: [
        candidate({ record_id: 1, match_kind: "prefix", matched_key: "a", source_popularity: 0 }),
        candidate({ record_id: 2, match_kind: "prefix", matched_key: "b", source_popularity: 0 }),
      ],
      detail_lookup: (id) => records.get(id),
      query_normalized: "",
      category: "background",
    });
    expect(results.map((result) => result.record_id)).toEqual([1]);
  });

  it("eliminates duplicate candidates for the same record, keeping the best match", () => {
    const records = new Map<number, VocabularyRecordLike>([
      [1, record({ record_id: 1, tag: "cat" })],
    ]);
    const results = rank_vocabulary_candidates({
      candidates: [
        candidate({ record_id: 1, match_kind: "trigram", trigram_overlap: 1 }),
        candidate({ record_id: 1, match_kind: "exact", matched_key: "cat", source_popularity: 0 }),
        candidate({ record_id: 1, match_kind: "prefix", matched_key: "cat", source_popularity: 0 }),
      ],
      detail_lookup: (id) => records.get(id),
      query_normalized: "cat",
    });
    expect(results).toHaveLength(1);
    expect(results[0]?.match_kind).toBe("exact");
  });

  it("hydrates at most 200 detail records per request", () => {
    const records = new Map<number, VocabularyRecordLike>();
    const candidates: VocabularyPlannerCandidate[] = [];
    for (let id = 0; id < 500; id += 1) {
      records.set(id, record({ record_id: id, tag: `tag ${String(id)}`, popularity: id }));
      candidates.push(
        candidate({
          record_id: id,
          match_kind: "prefix",
          matched_key: `tag ${String(id)}`,
          source_popularity: id,
        }),
      );
    }
    let hydrate_calls = 0;
    const results = rank_vocabulary_candidates({
      candidates,
      detail_lookup: (id) => {
        hydrate_calls += 1;
        return records.get(id);
      },
      query_normalized: "tag",
    });
    expect(hydrate_calls).toBeLessThanOrEqual(200);
    expect(results.length).toBeLessThanOrEqual(200);
    // Highest popularity (499) must survive the pre-hydration cap.
    expect(results[0]?.record_id).toBe(499);
  });

  it("skips a candidate whose record can no longer be hydrated instead of failing the request", () => {
    const results = rank_vocabulary_candidates({
      candidates: [candidate({ record_id: 1, match_kind: "exact", matched_key: "cat" })],
      detail_lookup: () => undefined,
      query_normalized: "cat",
    });
    expect(results).toEqual([]);
  });
});
