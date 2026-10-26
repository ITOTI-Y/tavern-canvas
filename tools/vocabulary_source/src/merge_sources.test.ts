import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { merge_sources, normalize_tag_key, run_merge_cli } from "./merge_sources.js";
import { read_jsonl, write_jsonl } from "./jsonl_io.js";
import { VocabularyRecordSchema, type VocabularyRecord } from "./vocabulary_record_schema.js";

const fact = (
  overrides: Partial<VocabularyRecord> & Pick<VocabularyRecord, "record_id" | "tag">,
): VocabularyRecord => ({
  aliases: [],
  popularity: 0,
  ...overrides,
});

describe("normalize_tag_key", () => {
  it("lowercases and trims", () => {
    expect(normalize_tag_key("  Synthetic_Tag  ")).toBe("synthetic_tag");
  });

  it("applies NFKC so visually-equivalent forms match", () => {
    // U+FF21 (fullwidth "A") NFKC-normalizes to U+0041 ("A").
    expect(normalize_tag_key("Ａ")).toBe(normalize_tag_key("a"));
  });
});

describe("merge_sources", () => {
  it("overlays a matching seed translation onto a fact record by normalized tag key", () => {
    const facts = [
      fact({ record_id: 1, tag: "synthetic_tag", category: "general", popularity: 1_000 }),
    ];
    const seed = [fact({ record_id: 900, tag: "SYNTHETIC_TAG", translation: "合成翻译占位" })];

    const { records } = merge_sources(facts, seed);

    expect(records[0]).toEqual({
      record_id: 1,
      tag: "synthetic_tag",
      category: "general",
      popularity: 1_000,
      aliases: [],
      translation: "合成翻译占位",
    });
  });

  it("keeps record_id/category/aliases from the fact stream, never the seed", () => {
    const facts = [
      fact({ record_id: 1, tag: "synthetic_tag", category: "general", popularity: 1_000 }),
    ];
    const seed = [
      fact({
        record_id: 999_999,
        tag: "synthetic_tag",
        category: "should-be-ignored",
        popularity: 1,
        translation: "t",
      }),
    ];

    const { records } = merge_sources(facts, seed);

    expect(records[0]?.record_id).toBe(1);
    expect(records[0]?.category).toBe("general");
    expect(records[0]?.popularity).toBe(1_000);
  });

  it("leaves a fact record without a seed match untranslated (no error)", () => {
    const facts = [fact({ record_id: 1, tag: "brand_new_tag" })];

    const { records } = merge_sources(facts, []);

    expect(records[0]?.translation).toBeUndefined();
  });

  it("silently ignores a seed translation with no matching fact record", () => {
    const facts = [fact({ record_id: 1, tag: "synthetic_tag" })];
    const seed = [fact({ record_id: 2, tag: "unmatched_tag", translation: "未匹配占位" })];

    const { records } = merge_sources(facts, seed);

    expect(records).toHaveLength(1);
    expect(records[0]?.tag).toBe("synthetic_tag");
  });

  it("orders records by popularity desc, then tag asc", () => {
    const facts = [
      fact({ record_id: 1, tag: "b_tag", popularity: 10 }),
      fact({ record_id: 2, tag: "a_tag", popularity: 20 }),
      fact({ record_id: 3, tag: "c_tag", popularity: 10 }),
    ];

    const { records } = merge_sources(facts, []);

    expect(records.map((record) => record.tag)).toEqual(["a_tag", "b_tag", "c_tag"]);
  });

  it("overlays fresh popularity onto a fact record by exact tag name match", () => {
    const facts = [fact({ record_id: 1, tag: "1girl", popularity: 6_858_776 })];
    const popularity_overlay = new Map([["1girl", 8_243_826]]);

    const { records } = merge_sources(facts, [], popularity_overlay);

    expect(records[0]?.popularity).toBe(8_243_826);
  });

  it("keeps a fact record's original popularity when the overlay has no entry for it", () => {
    const facts = [fact({ record_id: 1, tag: "no_overlay_tag", popularity: 42 })];
    const popularity_overlay = new Map([["some_other_tag", 999]]);

    const { records } = merge_sources(facts, [], popularity_overlay);

    expect(records[0]?.popularity).toBe(42);
  });

  it("matches the popularity overlay by exact tag name, not normalized key", () => {
    const facts = [fact({ record_id: 1, tag: "1girl", popularity: 1 })];
    // Overlay key differs only by case -- an exact-match miss, unlike translation overlay.
    const popularity_overlay = new Map([["1GIRL", 999]]);

    const { records } = merge_sources(facts, [], popularity_overlay);

    expect(records[0]?.popularity).toBe(1);
  });

  it("reports popularity_overlay_hit_count and translation_hit_count", () => {
    const facts = [
      fact({ record_id: 1, tag: "1girl", popularity: 1 }),
      fact({ record_id: 2, tag: "solo", popularity: 1 }),
    ];
    const seed = [fact({ record_id: 900, tag: "1girl", translation: "一个女孩" })];
    const popularity_overlay = new Map([["1girl", 8_000_000]]);

    const { popularity_overlay_hit_count, translation_hit_count } = merge_sources(
      facts,
      seed,
      popularity_overlay,
    );

    expect(popularity_overlay_hit_count).toBe(1);
    expect(translation_hit_count).toBe(1);
  });

  it("applies both overlays to the same record independently", () => {
    const facts = [fact({ record_id: 1, tag: "1girl", popularity: 1 })];
    const seed = [fact({ record_id: 900, tag: "1girl", translation: "一个女孩" })];
    const popularity_overlay = new Map([["1girl", 8_243_826]]);

    const { records } = merge_sources(facts, seed, popularity_overlay);

    expect(records[0]?.popularity).toBe(8_243_826);
    expect(records[0]?.translation).toBe("一个女孩");
  });
});

describe("run_merge_cli", () => {
  let temp_dir: string;

  beforeEach(async () => {
    temp_dir = await mkdtemp(join(tmpdir(), "vocab-merge-cli-test-"));
  });

  afterEach(async () => {
    await rm(temp_dir, { recursive: true, force: true });
  });

  it("uses the seed's own facts when no fact file is supplied, and warns via on_stale_fact_source", async () => {
    // Real Danbooru counts; the translation is an invented placeholder.
    const seed_path = join(temp_dir, "seed.jsonl");
    await write_jsonl(seed_path, [
      fact({
        record_id: 1,
        tag: "1girl",
        category: "general",
        popularity: 5_975_112,
        translation: "合成翻译占位",
      }),
    ]);
    let warned = false;

    const result = await run_merge_cli({
      seed_path,
      out_path: join(temp_dir, "out.jsonl"),
      on_stale_fact_source: () => {
        warned = true;
      },
    });

    expect(warned).toBe(true);
    expect(result.records[0]?.translation).toBe("合成翻译占位");
    expect(result.records[0]?.popularity).toBe(5_975_112);
  });

  it("prefers a supplied fact file over the seed's own facts, without warning", async () => {
    const seed_path = join(temp_dir, "seed.jsonl");
    const fact_path = join(temp_dir, "facts.jsonl");
    await write_jsonl(seed_path, [
      fact({ record_id: 900, tag: "1girl", popularity: 5_975_112, translation: "合成翻译占位" }),
    ]);
    await write_jsonl(fact_path, [fact({ record_id: 1, tag: "1girl", popularity: 8_243_826 })]);
    let warned = false;

    const result = await run_merge_cli({
      seed_path,
      fact_path,
      out_path: join(temp_dir, "out.jsonl"),
      on_stale_fact_source: () => {
        warned = true;
      },
    });

    expect(warned).toBe(false);
    expect(result.records[0]?.record_id).toBe(1);
    expect(result.records[0]?.popularity).toBe(8_243_826);
    expect(result.records[0]?.translation).toBe("合成翻译占位");
  });

  it("applies a popularity overlay file when supplied", async () => {
    const seed_path = join(temp_dir, "seed.jsonl");
    const fact_path = join(temp_dir, "facts.jsonl");
    const overlay_path = join(temp_dir, "overlay.jsonl");
    await write_jsonl(seed_path, []);
    await write_jsonl(fact_path, [fact({ record_id: 1, tag: "1girl", popularity: 6_858_776 })]);
    await write_jsonl(overlay_path, [{ tag: "1girl", post_count: 8_243_826 }]);

    const result = await run_merge_cli({
      seed_path,
      fact_path,
      popularity_overlay_path: overlay_path,
      out_path: join(temp_dir, "out.jsonl"),
    });

    expect(result.records[0]?.popularity).toBe(8_243_826);
  });

  it("writes the merged output file to disk", async () => {
    const seed_path = join(temp_dir, "seed.jsonl");
    await write_jsonl(seed_path, [
      fact({ record_id: 1, tag: "synthetic_tag", translation: "合成翻译占位" }),
    ]);
    const out_path = join(temp_dir, "out.jsonl");

    await run_merge_cli({ seed_path, out_path });

    const records_from_disk = await read_jsonl(out_path, VocabularyRecordSchema);

    expect(records_from_disk).toHaveLength(1);
    expect(records_from_disk[0]?.translation).toBe("合成翻译占位");
  });
});
