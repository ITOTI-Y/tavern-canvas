import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { read_checkpoint, write_checkpoint } from "./danbooru_client.js";
import { fetch_danbooru_fact_records, run_fetch_danbooru_cli } from "./fetch_danbooru.js";
import { read_jsonl } from "./jsonl_io.js";
import { VocabularyRecordSchema } from "./vocabulary_record_schema.js";
import type { FetchLike } from "./danbooru_client.js";

const TAGS_PAGE = [
  { id: 1, name: "1girl", category: 0, post_count: 8_243_826 },
  { id: 4, name: "hatsune_miku", category: 4, post_count: 300_000 },
];
const ALIASES_PAGE = [
  { id: 1, antecedent_name: "1girls", consequent_name: "1girl", status: "active" },
  { id: 2, antecedent_name: "deleted_alias", consequent_name: "1girl", status: "deleted" },
  { id: 3, antecedent_name: "miku", consequent_name: "hatsune_miku", status: "active" },
];

function make_router_fetch(routes: { tags: unknown[][]; aliases: unknown[][] }): {
  fetch_impl: FetchLike;
  calls: string[];
} {
  const calls: string[] = [];
  let tag_call_index = 0;
  let alias_call_index = 0;
  const fetch_impl: FetchLike = (url) => {
    calls.push(url);
    const parsed = new URL(url);
    if (parsed.pathname === "/tags.json") {
      const page = routes.tags[tag_call_index] ?? [];
      tag_call_index += 1;
      return Promise.resolve({
        ok: true,
        status: 200,
        statusText: "OK",
        json: () => Promise.resolve(page),
      });
    }
    const page = routes.aliases[alias_call_index] ?? [];
    alias_call_index += 1;
    return Promise.resolve({
      ok: true,
      status: 200,
      statusText: "OK",
      json: () => Promise.resolve(page),
    });
  };
  return { fetch_impl, calls };
}

describe("fetch_danbooru_fact_records", () => {
  it("maps tags to fact-only VocabularyRecordSchema records with no translation", async () => {
    const { fetch_impl } = make_router_fetch({
      tags: [TAGS_PAGE, []],
      aliases: [ALIASES_PAGE, []],
    });

    const records = await fetch_danbooru_fact_records({
      client: { user_agent: "test-bot/1.0", fetch_impl, delay_fn: () => Promise.resolve() },
    });

    for (const record of records) {
      expect(VocabularyRecordSchema.safeParse(record).success).toBe(true);
      expect(record.translation).toBeUndefined();
    }
  });

  it("maps Danbooru's category enum to its name string", async () => {
    const { fetch_impl } = make_router_fetch({ tags: [TAGS_PAGE, []], aliases: [[]] });

    const records = await fetch_danbooru_fact_records({
      client: { user_agent: "test-bot/1.0", fetch_impl, delay_fn: () => Promise.resolve() },
    });

    expect(records.find((record) => record.tag === "1girl")?.category).toBe("general");
    expect(records.find((record) => record.tag === "hatsune_miku")?.category).toBe("character");
  });

  it("attaches only active aliases, keyed by consequent_name", async () => {
    const { fetch_impl } = make_router_fetch({
      tags: [TAGS_PAGE, []],
      aliases: [ALIASES_PAGE, []],
    });

    const records = await fetch_danbooru_fact_records({
      client: { user_agent: "test-bot/1.0", fetch_impl, delay_fn: () => Promise.resolve() },
    });

    expect(records.find((record) => record.tag === "1girl")?.aliases).toEqual(["1girls"]);
    expect(records.find((record) => record.tag === "hatsune_miku")?.aliases).toEqual(["miku"]);
  });

  it("orders records by popularity descending, then tag ascending", async () => {
    const { fetch_impl } = make_router_fetch({ tags: [TAGS_PAGE, []], aliases: [[]] });

    const records = await fetch_danbooru_fact_records({
      client: { user_agent: "test-bot/1.0", fetch_impl, delay_fn: () => Promise.resolve() },
    });

    expect(records.map((record) => record.tag)).toEqual(["1girl", "hatsune_miku"]);
  });

  it("uses post_count as popularity verbatim (no scaling)", async () => {
    const { fetch_impl } = make_router_fetch({ tags: [TAGS_PAGE, []], aliases: [[]] });

    const records = await fetch_danbooru_fact_records({
      client: { user_agent: "test-bot/1.0", fetch_impl, delay_fn: () => Promise.resolve() },
    });

    expect(records.find((record) => record.tag === "1girl")?.popularity).toBe(8_243_826);
  });
});

describe("fetch_danbooru_fact_records: resumability", () => {
  let temp_dir: string;

  beforeEach(async () => {
    temp_dir = await mkdtemp(join(tmpdir(), "vocab-fetch-danbooru-test-"));
  });

  afterEach(async () => {
    await rm(temp_dir, { recursive: true, force: true });
  });

  it("resumes from a checkpoint's last_id instead of restarting at id 0", async () => {
    const checkpoint_path = join(temp_dir, "checkpoint.json");
    const { fetch_impl, calls } = make_router_fetch({ tags: [TAGS_PAGE, []], aliases: [[]] });
    await write_checkpoint(checkpoint_path, 3);

    await fetch_danbooru_fact_records({
      client: { user_agent: "test-bot/1.0", fetch_impl, delay_fn: () => Promise.resolve() },
      checkpoint_path,
    });

    const first_tags_call = calls.find((url) => new URL(url).pathname === "/tags.json");
    expect(new URL(first_tags_call ?? "").searchParams.get("search[id]")).toBe(">3");
  });

  it("writes an updated checkpoint after each page so an interruption resumes past completed work", async () => {
    const checkpoint_path = join(temp_dir, "checkpoint.json");
    const { fetch_impl } = make_router_fetch({ tags: [TAGS_PAGE, []], aliases: [[]] });

    await fetch_danbooru_fact_records({
      client: { user_agent: "test-bot/1.0", fetch_impl, delay_fn: () => Promise.resolve() },
      checkpoint_path,
    });

    const checkpoint = await read_checkpoint(checkpoint_path);
    expect(checkpoint?.last_id).toBe(4);
  });
});

describe("run_fetch_danbooru_cli", () => {
  let temp_dir: string;

  beforeEach(async () => {
    temp_dir = await mkdtemp(join(tmpdir(), "vocab-fetch-danbooru-cli-test-"));
  });

  afterEach(async () => {
    await rm(temp_dir, { recursive: true, force: true });
  });

  it("writes fact-only records to a JSONL file", async () => {
    const out_path = join(temp_dir, "raw_danbooru_tags.jsonl");
    const { fetch_impl } = make_router_fetch({ tags: [TAGS_PAGE, []], aliases: [[]] });

    await run_fetch_danbooru_cli({
      client: { user_agent: "test-bot/1.0", fetch_impl, delay_fn: () => Promise.resolve() },
      out_path,
    });

    const records = await read_jsonl(out_path, VocabularyRecordSchema);
    expect(records).toHaveLength(2);
    expect(records.every((record) => record.translation === undefined)).toBe(true);
  });
});
