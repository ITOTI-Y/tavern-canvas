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

    const { full, public_records } = merge_sources(facts, seed);

    expect(full[0]).toEqual({
      record_id: 1,
      tag: "synthetic_tag",
      category: "general",
      popularity: 1_000,
      aliases: [],
      translation: "合成翻译占位",
    });
    expect(public_records[0]?.translation).toBeUndefined();
    expect(public_records[0]).not.toHaveProperty("translation");
  });

  it("keeps record_id/category/popularity/aliases from the fact stream, never the seed", () => {
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

    const { full } = merge_sources(facts, seed);

    expect(full[0]?.record_id).toBe(1);
    expect(full[0]?.category).toBe("general");
    expect(full[0]?.popularity).toBe(1_000);
  });

  it("leaves a fact record without a seed match untranslated (no error)", () => {
    const facts = [fact({ record_id: 1, tag: "brand_new_tag" })];

    const { full } = merge_sources(facts, []);

    expect(full[0]?.translation).toBeUndefined();
  });

  it("silently ignores a seed translation with no matching fact record", () => {
    const facts = [fact({ record_id: 1, tag: "synthetic_tag" })];
    const seed = [fact({ record_id: 2, tag: "unmatched_tag", translation: "未匹配占位" })];

    const { full } = merge_sources(facts, seed);

    expect(full).toHaveLength(1);
    expect(full[0]?.tag).toBe("synthetic_tag");
  });

  it("orders both outputs by popularity desc, then tag asc", () => {
    const facts = [
      fact({ record_id: 1, tag: "b_tag", popularity: 10 }),
      fact({ record_id: 2, tag: "a_tag", popularity: 20 }),
      fact({ record_id: 3, tag: "c_tag", popularity: 10 }),
    ];

    const { full, public_records } = merge_sources(facts, []);

    expect(full.map((record) => record.tag)).toEqual(["a_tag", "b_tag", "c_tag"]);
    expect(public_records.map((record) => record.tag)).toEqual(["a_tag", "b_tag", "c_tag"]);
  });

  it("public output has exactly as many records as full output", () => {
    const facts = [
      fact({ record_id: 1, tag: "synthetic_tag" }),
      fact({ record_id: 2, tag: "other_tag" }),
    ];
    const seed = [fact({ record_id: 900, tag: "synthetic_tag", translation: "合成翻译占位" })];

    const { full, public_records } = merge_sources(facts, seed);

    expect(public_records).toHaveLength(full.length);
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

  it("uses the seed's own facts when no danbooru fact file is supplied, and warns via on_stale_fact_source", async () => {
    // "1girl" and the two popularity figures below mirror the brief's
    // documented staleness example (factual public Danbooru data, safe to
    // reproduce); the translation text is an invented placeholder.
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
      out_full_path: join(temp_dir, "full.jsonl"),
      out_public_path: join(temp_dir, "public.jsonl"),
      on_stale_fact_source: () => {
        warned = true;
      },
    });

    expect(warned).toBe(true);
    expect(result.full[0]?.translation).toBe("合成翻译占位");
    expect(result.full[0]?.popularity).toBe(5_975_112);
    expect(result.public_records[0]?.translation).toBeUndefined();
  });

  it("prefers a supplied danbooru fact file over the seed's own facts, without warning", async () => {
    const seed_path = join(temp_dir, "seed.jsonl");
    const danbooru_path = join(temp_dir, "danbooru.jsonl");
    await write_jsonl(seed_path, [
      fact({ record_id: 900, tag: "1girl", popularity: 5_975_112, translation: "合成翻译占位" }),
    ]);
    await write_jsonl(danbooru_path, [fact({ record_id: 1, tag: "1girl", popularity: 8_243_826 })]);
    let warned = false;

    const result = await run_merge_cli({
      seed_path,
      danbooru_facts_path: danbooru_path,
      out_full_path: join(temp_dir, "full.jsonl"),
      out_public_path: join(temp_dir, "public.jsonl"),
      on_stale_fact_source: () => {
        warned = true;
      },
    });

    expect(warned).toBe(false);
    expect(result.full[0]?.record_id).toBe(1);
    expect(result.full[0]?.popularity).toBe(8_243_826);
    expect(result.full[0]?.translation).toBe("合成翻译占位");
  });

  it("writes both output files to disk", async () => {
    const seed_path = join(temp_dir, "seed.jsonl");
    await write_jsonl(seed_path, [
      fact({ record_id: 1, tag: "synthetic_tag", translation: "合成翻译占位" }),
    ]);
    const out_full_path = join(temp_dir, "full.jsonl");
    const out_public_path = join(temp_dir, "public.jsonl");

    await run_merge_cli({ seed_path, out_full_path, out_public_path });

    const full_from_disk = await read_jsonl(out_full_path, VocabularyRecordSchema);
    const public_from_disk = await read_jsonl(out_public_path, VocabularyRecordSchema);

    expect(full_from_disk).toHaveLength(1);
    expect(public_from_disk).toHaveLength(1);
    expect(public_from_disk[0]).not.toHaveProperty("translation");
  });
});
