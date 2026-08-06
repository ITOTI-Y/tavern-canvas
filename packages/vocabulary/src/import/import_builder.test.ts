import "fake-indexeddb/auto";

import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { deleteDB } from "idb";
import { afterEach, describe, expect, it } from "vitest";

import { VocabularyManifestSchema, type VocabularyRecord } from "@tavern-canvas/contracts";
import {
  DATABASE_NAME,
  dispose_database,
  open_database,
  type StorageDatabase,
} from "@tavern-canvas/storage";
import { run_build } from "@tavern-canvas/vocabulary-builder";

import { VocabularyPackageStore } from "../package_store.js";
import { decode_shard_bytes } from "../search/shard_codec.js";
import type { VocabularyShardPayload } from "../search/vocabulary_shard_payloads.js";
import {
  ImportBuilder,
  ImportCancelledError,
  ImportSizeLimitError,
  type ImportProgress,
} from "./import_builder.js";

const NAMESPACE = "primary";

async function close_test_database(): Promise<void> {
  await dispose_database();
  await deleteDB(DATABASE_NAME);
}

afterEach(async () => {
  await close_test_database();
});

function create_builder(
  database: StorageDatabase,
  overrides: Partial<{
    on_progress: (progress: ImportProgress) => void;
    max_batch_payload_length: number;
    max_total_records: number;
  }> = {},
): ImportBuilder {
  const store = new VocabularyPackageStore(database, NAMESPACE);
  return new ImportBuilder({
    store,
    package_id: "user-import",
    data_version: "1.0.0",
    minimum_extension_version: "3.0.0",
    changelog: "user import",
    ...overrides,
  });
}

function jsonl(records: readonly Record<string, unknown>[]): string {
  return records.map((record) => JSON.stringify(record)).join("\n");
}

async function decode_shard(
  store: VocabularyPackageStore,
  shard_id: string,
): Promise<VocabularyShardPayload> {
  const manifest = await store.manifest();
  const entry = manifest.shards.find((candidate) => candidate.shard_id === shard_id);
  if (entry === undefined) {
    throw new Error(`missing shard: ${shard_id}`);
  }
  const bytes = await store.shard_bytes(entry.path);
  return (await decode_shard_bytes(bytes)).payload;
}

async function decode_all_records(store: VocabularyPackageStore): Promise<VocabularyRecord[]> {
  const manifest = await store.manifest();
  const records: VocabularyRecord[] = [];
  for (const entry of manifest.shards.filter((shard) => shard.kind === "detail")) {
    const payload = await decode_shard(store, entry.shard_id);
    if (payload.kind === "detail") {
      records.push(...payload.records);
    }
  }
  return records.sort((left, right) => left.record_id - right.record_id);
}

describe("ImportBuilder.import_batch -- progress batches", () => {
  it("reports one progress event per batch and a final complete event", async () => {
    const database = await open_database();
    const events: ImportProgress[] = [];
    const builder = create_builder(database, { on_progress: (progress) => events.push(progress) });

    const outcome_a = await builder.import_batch({
      format: "tavern_canvas_jsonl",
      batch_index: 0,
      batch_count: 2,
      payload: jsonl([{ tag: "cat" }]),
    });
    expect(outcome_a).toEqual({ accepted_records: 1, malformed: [], complete: false });

    const outcome_b = await builder.import_batch({
      format: "tavern_canvas_jsonl",
      batch_index: 1,
      batch_count: 2,
      payload: jsonl([{ tag: "dog" }]),
    });
    expect(outcome_b.complete).toBe(true);

    const phases = events.map((event) => event.phase);
    expect(phases.slice(0, 3)).toEqual(["batch", "batch", "indexing"]);
    expect(phases.slice(-2)).toEqual(["activating", "complete"]);
    const staging_phases = phases.slice(3, -2);
    expect(staging_phases.length).toBeGreaterThan(0);
    expect(staging_phases.every((phase) => phase === "staging_shard")).toBe(true);
    const complete = events.at(-1);
    if (complete?.phase !== "complete") {
      throw new Error("expected the final event to be complete");
    }
    expect(complete.record_count).toBe(2);
    expect(complete.malformed_records).toBe(0);
  });

  it("tolerates batches arriving out of order and finalizes once every index has arrived", async () => {
    const database = await open_database();
    const builder = create_builder(database);

    await builder.import_batch({
      format: "tavern_canvas_jsonl",
      batch_index: 1,
      batch_count: 2,
      payload: jsonl([{ tag: "dog" }]),
    });
    const outcome = await builder.import_batch({
      format: "tavern_canvas_jsonl",
      batch_index: 0,
      batch_count: 2,
      payload: jsonl([{ tag: "cat" }]),
    });
    expect(outcome.complete).toBe(true);

    const store = new VocabularyPackageStore(database, NAMESPACE);
    const active = await store.find_active_or_confirmed();
    expect(active?.manifest.record_count).toBe(2);
  });

  it("rejects a batch_index outside [0, batch_count)", async () => {
    const database = await open_database();
    const builder = create_builder(database);
    await expect(
      builder.import_batch({
        format: "tavern_canvas_jsonl",
        batch_index: 2,
        batch_count: 2,
        payload: jsonl([{ tag: "cat" }]),
      }),
    ).rejects.toThrow(/invalid batch_index/u);
  });

  it("rejects a duplicate batch_index", async () => {
    const database = await open_database();
    const builder = create_builder(database);
    await builder.import_batch({
      format: "tavern_canvas_jsonl",
      batch_index: 0,
      batch_count: 2,
      payload: jsonl([{ tag: "cat" }]),
    });
    await expect(
      builder.import_batch({
        format: "tavern_canvas_jsonl",
        batch_index: 0,
        batch_count: 2,
        payload: jsonl([{ tag: "cat" }]),
      }),
    ).rejects.toThrow(/already processed/u);
  });
});

describe("ImportBuilder.import_batch -- cancellation", () => {
  it("rejects further batches once cancelled, before anything is staged", async () => {
    const database = await open_database();
    const builder = create_builder(database);

    await builder.import_batch({
      format: "tavern_canvas_jsonl",
      batch_index: 0,
      batch_count: 2,
      payload: jsonl([{ tag: "cat" }]),
    });
    builder.cancel();

    await expect(
      builder.import_batch({
        format: "tavern_canvas_jsonl",
        batch_index: 1,
        batch_count: 2,
        payload: jsonl([{ tag: "dog" }]),
      }),
    ).rejects.toThrow(ImportCancelledError);

    const store = new VocabularyPackageStore(database, NAMESPACE);
    expect(await store.list_packages()).toHaveLength(0);
  });

  it("rolls back a partially staged package when cancelled mid-finalize", async () => {
    const database = await open_database();
    const events: ImportProgress[] = [];
    let cancel: (() => void) | null = null;
    const builder = create_builder(database, {
      on_progress: (progress) => {
        events.push(progress);
        if (progress.phase === "staging_shard" && progress.shard_index === 0) {
          cancel?.();
        }
      },
    });
    cancel = () => {
      builder.cancel();
    };

    // Enough distinct groups (prefix, alias-via-translation, trigram, hot,
    // detail) to guarantee more than one shard gets staged before cancel().
    const records = [
      { tag: "cat", popularity: 5 },
      { tag: "dog", aliases: ["puppy"], popularity: 3 },
      { tag: "sakura", translation: "桜花", popularity: 1 },
    ];

    await expect(
      builder.import_batch({
        format: "tavern_canvas_jsonl",
        batch_index: 0,
        batch_count: 1,
        payload: jsonl(records),
      }),
    ).rejects.toThrow(ImportCancelledError);

    expect(events.some((event) => event.phase === "cancelled")).toBe(true);
    const store = new VocabularyPackageStore(database, NAMESPACE);
    expect(await store.list_packages()).toHaveLength(0);
  });
});

describe("ImportBuilder.import_batch -- malformed records", () => {
  it("skips malformed TavernCanvas JSONL lines and still imports the valid ones", async () => {
    const database = await open_database();
    const builder = create_builder(database);

    const payload = [
      JSON.stringify({ tag: "cat" }),
      "not json at all",
      JSON.stringify({ tag: "" }), // fails VocabularyRecordSchema's tag.min(1)
      JSON.stringify({ tag: "dog" }),
    ].join("\n");

    const outcome = await builder.import_batch({
      format: "tavern_canvas_jsonl",
      batch_index: 0,
      batch_count: 1,
      payload,
    });

    expect(outcome.accepted_records).toBe(2);
    expect(outcome.malformed).toHaveLength(2);
    expect(outcome.complete).toBe(true);

    const store = new VocabularyPackageStore(database, NAMESPACE);
    const active = await store.find_active_or_confirmed();
    expect(active?.manifest.record_count).toBe(2);
  });

  it("skips legacy_v2 tag_tags entries with missing or empty text", async () => {
    const database = await open_database();
    const builder = create_builder(database);

    const payload = JSON.stringify({
      tag_groups: [{ id_index: 1, name: "人物", subgroups: [{ id_index: 10, name: "对象" }] }],
      tag_tags: [
        { subgroup_id: 10, text: "1girl", desc: "1女孩" },
        { subgroup_id: 10, text: "", desc: "empty text" },
        { subgroup_id: 10, desc: "missing text field entirely" },
      ],
    });

    const outcome = await builder.import_batch({
      format: "legacy_v2",
      batch_index: 0,
      batch_count: 1,
      payload,
    });

    expect(outcome.accepted_records).toBe(1);
    expect(outcome.malformed).toHaveLength(2);
  });
});

describe("ImportBuilder.import_batch -- duplicate merge behavior", () => {
  it("merges duplicate normalized tags across batches: aliases union, popularity max, first-wins spelling", async () => {
    const database = await open_database();
    const builder = create_builder(database);

    await builder.import_batch({
      format: "tavern_canvas_jsonl",
      batch_index: 0,
      batch_count: 2,
      payload: jsonl([{ tag: "Cat", aliases: ["kitty"], popularity: 10 }]),
    });
    await builder.import_batch({
      format: "tavern_canvas_jsonl",
      batch_index: 1,
      batch_count: 2,
      payload: jsonl([{ tag: "cat", aliases: ["feline"], popularity: 50, translation: "猫" }]),
    });

    const store = new VocabularyPackageStore(database, NAMESPACE);
    const records = await decode_all_records(store);
    expect(records).toHaveLength(1);
    expect(records[0]).toMatchObject({
      tag: "Cat",
      translation: "猫",
      popularity: 50,
      aliases: ["feline", "kitty"],
    });
  });

  it("resolves a conflicting primary field by first-occurrence-wins, without throwing", async () => {
    const database = await open_database();
    const events: ImportProgress[] = [];
    const builder = create_builder(database, { on_progress: (event) => events.push(event) });

    await builder.import_batch({
      format: "tavern_canvas_jsonl",
      batch_index: 0,
      batch_count: 2,
      payload: jsonl([{ tag: "shota", category: "general" }]),
    });
    await builder.import_batch({
      format: "tavern_canvas_jsonl",
      batch_index: 1,
      batch_count: 2,
      payload: jsonl([{ tag: "shota", category: "character" }]),
    });

    const store = new VocabularyPackageStore(database, NAMESPACE);
    const records = await decode_all_records(store);
    expect(records).toHaveLength(1);
    expect(records[0]?.category).toBe("general");

    const complete = events.find((event) => event.phase === "complete");
    if (complete?.phase !== "complete") {
      throw new Error("expected a complete event");
    }
    expect(complete.merge_conflicts).toBe(1);
  });

  it("merges the same tag text surfaced under two different legacy top-level groups (task-src-report.md SS10)", async () => {
    const database = await open_database();
    const builder = create_builder(database);

    const payload = JSON.stringify({
      tag_groups: [
        { id_index: 1, name: "人物", subgroups: [{ id_index: 10, name: "身份" }] },
        { id_index: 2, name: "服饰", subgroups: [{ id_index: 20, name: "配饰" }] },
      ],
      tag_tags: [
        { subgroup_id: 10, text: "shota", desc: "正太" },
        { subgroup_id: 20, text: "shota", desc: "正太" },
      ],
    });

    const outcome = await builder.import_batch({
      format: "legacy_v2",
      batch_index: 0,
      batch_count: 1,
      payload,
    });
    expect(outcome.accepted_records).toBe(2);

    const store = new VocabularyPackageStore(database, NAMESPACE);
    const records = await decode_all_records(store);
    expect(records).toHaveLength(1);
    // Two different top-level groups resolve to two different category
    // strings for the same duplicate tag -- the first-occurrence-wins policy
    // keeps the first, exactly like the general conflict test above.
    expect(records[0]?.category).toBe("人物");
  });

  it('maps a flat NSFW legacy document\'s records to category "nsfw"', async () => {
    const database = await open_database();
    const builder = create_builder(database);

    const payload = JSON.stringify({
      tag_groups: [{ id_index: 11, name: "NSFW", subgroups: [] }],
      tag_tags: [
        { text: "censored", desc: "审核过的" },
        { text: "uncensored", desc: "未审核" },
      ],
    });

    await builder.import_batch({
      format: "legacy_v2",
      batch_index: 0,
      batch_count: 1,
      payload,
    });

    const store = new VocabularyPackageStore(database, NAMESPACE);
    const records = await decode_all_records(store);
    expect(records.every((record) => record.category === "nsfw")).toBe(true);
  });
});

describe("ImportBuilder.import_batch -- source size limits", () => {
  it("rejects a batch payload longer than the configured character limit", async () => {
    const database = await open_database();
    const builder = create_builder(database, { max_batch_payload_length: 10 });

    await expect(
      builder.import_batch({
        format: "tavern_canvas_jsonl",
        batch_index: 0,
        batch_count: 1,
        payload: jsonl([{ tag: "a-tag-longer-than-ten-chars" }]),
      }),
    ).rejects.toThrow(ImportSizeLimitError);

    const store = new VocabularyPackageStore(database, NAMESPACE);
    expect(await store.list_packages()).toHaveLength(0);
  });

  it("rejects an import that accumulates more records than the configured total limit", async () => {
    const database = await open_database();
    const builder = create_builder(database, { max_total_records: 1 });

    await expect(
      builder.import_batch({
        format: "tavern_canvas_jsonl",
        batch_index: 0,
        batch_count: 1,
        payload: jsonl([{ tag: "cat" }, { tag: "dog" }]),
      }),
    ).rejects.toThrow(ImportSizeLimitError);

    const store = new VocabularyPackageStore(database, NAMESPACE);
    expect(await store.list_packages()).toHaveLength(0);
  });
});

describe("ImportBuilder -- index correctness", () => {
  it("builds prefix, alias, trigram, detail, and hot shards with the expected entries", async () => {
    const database = await open_database();
    const builder = create_builder(database);

    await builder.import_batch({
      format: "tavern_canvas_jsonl",
      batch_index: 0,
      batch_count: 1,
      payload: jsonl([
        { tag: "cat", popularity: 5 },
        { tag: "catalog", popularity: 1 },
        { tag: "dog", aliases: ["puppy"], popularity: 3 },
        { tag: "sakura", translation: "桜花", popularity: 8 },
      ]),
    });

    const store = new VocabularyPackageStore(database, NAMESPACE);
    const records = await decode_all_records(store);
    const id = (tag: string): number => {
      const found = records.find((record) => record.tag === tag);
      if (found === undefined) {
        throw new Error(`missing record for tag ${tag}`);
      }
      return found.record_id;
    };

    const prefix_ca = await decode_shard(store, "prefix:ca");
    expect(prefix_ca.kind).toBe("prefix");
    if (prefix_ca.kind !== "prefix") {
      throw new Error("expected a prefix payload");
    }
    expect(prefix_ca.entries).toEqual(
      expect.arrayContaining([
        ["cat", id("cat"), 5],
        ["catalog", id("catalog"), 1],
      ]),
    );

    const alias_pu = await decode_shard(store, "alias:pu");
    expect(alias_pu.kind).toBe("alias");
    if (alias_pu.kind !== "alias") {
      throw new Error("expected an alias payload");
    }
    expect(alias_pu.entries).toEqual([["puppy", id("dog"), 3]]);

    const trigram_ca = await decode_shard(store, "trigram:ca");
    expect(trigram_ca.kind).toBe("trigram");
    if (trigram_ca.kind !== "trigram") {
      throw new Error("expected a trigram payload");
    }
    const cat_trigram = trigram_ca.entries.find(([trigram]) => trigram === "cat");
    expect(cat_trigram?.[1]).toEqual([
      Math.min(id("cat"), id("catalog")),
      Math.abs(id("cat") - id("catalog")),
    ]);

    const hot = await decode_shard(store, "hot:global");
    expect(hot.kind).toBe("hot");
    if (hot.kind !== "hot") {
      throw new Error("expected a hot payload");
    }
    expect(hot.global).toEqual([id("sakura"), id("cat"), id("dog"), id("catalog")]);
  });

  it("matches the CLI builder's shard shapes for the same source records", async () => {
    const source_records = [
      { tag: "cat", category: "animal", popularity: 100 },
      { tag: "catalog", category: "object", popularity: 50 },
      { tag: "dog", aliases: ["puppy"], category: "animal", popularity: 80 },
      { tag: "sakura", translation: "桜花", category: "plant", popularity: 60 },
    ];

    const scratch_directory = await mkdtemp(join(tmpdir(), "vocabulary-import-cross-check-"));
    try {
      const input_path = join(scratch_directory, "source.jsonl");
      const output_directory = join(scratch_directory, "package");
      await writeFile(input_path, jsonl(source_records));
      const build_exit_code = await run_build([
        "--input",
        input_path,
        "--output",
        output_directory,
        "--package-id",
        "cross-check",
        "--data-version",
        "1.0.0",
        "--minimum-extension-version",
        "3.0.0",
        "--changelog",
        "cross-check fixture",
      ]);
      expect(build_exit_code).toBe(0);

      const cli_manifest = VocabularyManifestSchema.parse(
        JSON.parse(await readFile(join(output_directory, "manifest.json"), "utf8")),
      );
      const cli_shard_ids = cli_manifest.shards.map((shard) => shard.shard_id).sort();

      const database = await open_database();
      const builder = create_builder(database, { on_progress: () => undefined });
      await builder.import_batch({
        format: "tavern_canvas_jsonl",
        batch_index: 0,
        batch_count: 1,
        payload: jsonl(source_records),
      });
      const store = new VocabularyPackageStore(database, NAMESPACE);
      const active = await store.find_active_or_confirmed();
      if (active === null) {
        throw new Error("expected an active package");
      }
      const import_shard_ids = active.manifest.shards.map((shard) => shard.shard_id).sort();

      expect(import_shard_ids).toEqual(cli_shard_ids);

      for (const shard_id of cli_shard_ids) {
        const cli_entry = cli_manifest.shards.find((shard) => shard.shard_id === shard_id);
        if (cli_entry === undefined) {
          throw new Error(`missing CLI shard entry: ${shard_id}`);
        }
        const cli_bytes = await readFile(join(output_directory, cli_entry.path));
        const cli_payload = (await decode_shard_bytes(new Uint8Array(cli_bytes))).payload;
        const import_payload = await decode_shard(store, shard_id);
        expect(import_payload).toEqual(cli_payload);
      }
    } finally {
      await rm(scratch_directory, { recursive: true, force: true });
    }
  });
});

describe("ImportBuilder -- activation only after one successful query", () => {
  it('stays "active" (not confirmed) until report_query_success is called', async () => {
    const database = await open_database();
    const builder = create_builder(database);

    await builder.import_batch({
      format: "tavern_canvas_jsonl",
      batch_index: 0,
      batch_count: 1,
      payload: jsonl([{ tag: "cat" }]),
    });

    const store = new VocabularyPackageStore(database, NAMESPACE);
    const before = await store.find_active_or_confirmed();
    expect(before?.state).toBe("active");

    await builder.report_query_success();
    const after = await store.find_active_or_confirmed();
    expect(after?.state).toBe("confirmed");
  });

  it("reselects the prior confirmed package on report_query_failure", async () => {
    const database = await open_database();
    const store = new VocabularyPackageStore(database, NAMESPACE);

    const first = create_builder(database);
    await first.import_batch({
      format: "tavern_canvas_jsonl",
      batch_index: 0,
      batch_count: 1,
      payload: jsonl([{ tag: "cat" }]),
    });
    await first.report_query_success();
    const confirmed_first = await store.find_active_or_confirmed();

    const second = create_builder(database);
    await second.import_batch({
      format: "tavern_canvas_jsonl",
      batch_index: 0,
      batch_count: 1,
      payload: jsonl([{ tag: "dog" }]),
    });
    const reselected = await second.report_query_failure();

    expect(reselected?.record_id).toBe(confirmed_first?.record_id);
    expect(reselected?.state).toBe("confirmed");
    const active_now = await store.find_active_or_confirmed();
    expect(active_now?.record_id).toBe(confirmed_first?.record_id);
  });
});
