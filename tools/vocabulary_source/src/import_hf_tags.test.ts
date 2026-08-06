import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import {
  HfTagConflictError,
  import_hf_tags,
  run_import_hf_tags_cli,
  UnknownHfTagCategoryError,
  type HfTagRow,
} from "./import_hf_tags.js";
import { read_jsonl, write_jsonl } from "./jsonl_io.js";
import { VocabularyRecordSchema } from "./vocabulary_record_schema.js";

const row = (
  overrides: Partial<HfTagRow> & Pick<HfTagRow, "id" | "name" | "category">,
): HfTagRow => ({
  post_count: 0,
  created_at: "2013-02-27T22:39:31.882-05:00",
  updated_at: "2019-12-26T19:19:43.276-05:00",
  is_deprecated: false,
  words: [],
  ...overrides,
});

describe("import_hf_tags", () => {
  it("maps id/name/category/post_count to record_id/tag/category/popularity", () => {
    const records = import_hf_tags([
      row({ id: 470_575, name: "1girl", category: 0, post_count: 6_858_776 }),
    ]);

    expect(records).toEqual([
      {
        record_id: 470_575,
        tag: "1girl",
        category: "general",
        popularity: 6_858_776,
        aliases: [],
      },
    ]);
  });

  it("maps every known Danbooru category int to its name", () => {
    const records = import_hf_tags([
      row({ id: 1, name: "a", category: 0 }),
      row({ id: 2, name: "b", category: 1 }),
      row({ id: 3, name: "c", category: 3 }),
      row({ id: 4, name: "d", category: 4 }),
      row({ id: 5, name: "e", category: 5 }),
    ]);

    expect(records.map((record) => record.category)).toEqual([
      "general",
      "artist",
      "copyright",
      "character",
      "meta",
    ]);
  });

  it("throws UnknownHfTagCategoryError on an unmapped category int instead of guessing", () => {
    expect(() => import_hf_tags([row({ id: 1, name: "mystery_tag", category: 2 })])).toThrow(
      UnknownHfTagCategoryError,
    );
  });

  it("drops is_deprecated rows", () => {
    const records = import_hf_tags([
      row({ id: 1, name: "live_tag", category: 0 }),
      row({ id: 2, name: "dead_tag", category: 0, is_deprecated: true }),
    ]);

    expect(records.map((record) => record.tag)).toEqual(["live_tag"]);
  });

  it("ignores words/created_at/updated_at and leaves aliases empty", () => {
    const records = import_hf_tags([
      row({ id: 1, name: "1girl", category: 0, words: ["1girl", "girl"] }),
    ]);

    expect(records[0]).not.toHaveProperty("words");
    expect(records[0]?.aliases).toEqual([]);
  });

  it("dedupes byte-identical duplicate rows for the same name, keeping one record", () => {
    const duplicate = row({ id: 11_074, name: "quess_paraya", category: 4, post_count: 174 });
    const records = import_hf_tags([duplicate, duplicate, duplicate]);

    expect(records).toHaveLength(1);
    expect(records[0]?.tag).toBe("quess_paraya");
  });

  it("throws HfTagConflictError when duplicate rows for the same name disagree", () => {
    const first = row({ id: 1, name: "conflict_tag", category: 0, post_count: 10 });
    const second = row({ id: 1, name: "conflict_tag", category: 0, post_count: 20 });

    expect(() => import_hf_tags([first, second])).toThrow(HfTagConflictError);
  });

  it("keeps category=1 (artist) rows despite the dataset's 'no artist' claim", () => {
    const records = import_hf_tags([row({ id: 1, name: "some_artist", category: 1 })]);

    expect(records[0]?.category).toBe("artist");
  });
});

describe("run_import_hf_tags_cli", () => {
  let temp_dir: string;

  beforeEach(async () => {
    temp_dir = await mkdtemp(join(tmpdir(), "vocab-import-hf-tags-cli-test-"));
  });

  afterEach(async () => {
    await rm(temp_dir, { recursive: true, force: true });
  });

  it("reads an HF tag JSONL file and writes fact-only records with no translation", async () => {
    const input_path = join(temp_dir, "tags.jsonl");
    const out_path = join(temp_dir, "universe.jsonl");
    await write_jsonl(input_path, [row({ id: 1, name: "1girl", category: 0, post_count: 100 })]);

    await run_import_hf_tags_cli({ input_path, out_path });

    const records = await read_jsonl(out_path, VocabularyRecordSchema);
    expect(records).toHaveLength(1);
    expect(records[0]?.translation).toBeUndefined();
    expect(records[0]?.popularity).toBe(100);
  });
});
