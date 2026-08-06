import { describe, expect, it } from "vitest";

import { select_top_records } from "./select_baseline_subset.js";
import type { VocabularyRecord } from "./vocabulary_record_schema.js";

const fact = (
  overrides: Partial<VocabularyRecord> & Pick<VocabularyRecord, "record_id" | "tag">,
): VocabularyRecord => ({
  aliases: [],
  popularity: 0,
  ...overrides,
});

describe("select_top_records", () => {
  it("keeps only the top `limit` records by popularity descending", () => {
    const records = [
      fact({ record_id: 1, tag: "low", popularity: 1 }),
      fact({ record_id: 2, tag: "high", popularity: 100 }),
      fact({ record_id: 3, tag: "mid", popularity: 50 }),
    ];

    const top_two = select_top_records(records, 2);

    expect(top_two.map((record) => record.tag)).toEqual(["high", "mid"]);
  });

  it("breaks popularity ties by tag ascending", () => {
    const records = [
      fact({ record_id: 1, tag: "b_tag", popularity: 10 }),
      fact({ record_id: 2, tag: "a_tag", popularity: 10 }),
      fact({ record_id: 3, tag: "c_tag", popularity: 10 }),
    ];

    const top_two = select_top_records(records, 2);

    expect(top_two.map((record) => record.tag)).toEqual(["a_tag", "b_tag"]);
  });

  it("returns every record when limit exceeds the input length", () => {
    const records = [fact({ record_id: 1, tag: "only" })];

    expect(select_top_records(records, 50)).toHaveLength(1);
  });

  it("does not mutate the input array's order", () => {
    const records = [
      fact({ record_id: 1, tag: "b_tag", popularity: 1 }),
      fact({ record_id: 2, tag: "a_tag", popularity: 100 }),
    ];
    const original_order = records.map((record) => record.tag);

    select_top_records(records, 1);

    expect(records.map((record) => record.tag)).toEqual(original_order);
  });

  it("returns an empty array when limit is 0", () => {
    const records = [fact({ record_id: 1, tag: "only" })];

    expect(select_top_records(records, 0)).toEqual([]);
  });
});
