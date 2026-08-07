import { mkdir, mkdtemp, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { gunzipSync } from "node:zlib";

import { decode } from "@msgpack/msgpack";
import { sha256 } from "@noble/hashes/sha2.js";
import { bytesToHex } from "@noble/hashes/utils.js";
import {
  VOCABULARY_ALIAS_SHARD_BUCKET_COUNT,
  vocabulary_alias_shard_partition,
  type VocabularyAliasShardPayload,
  type VocabularyIndexKind,
  type VocabularyManifest,
  type VocabularyPrefixShardPayload,
  type VocabularyTrigramShardPayload,
} from "@tavern-canvas/contracts";
import { afterEach, describe, expect, it } from "vitest";

import { build_alias_shards } from "./build_alias_index.js";
import { build_detail_shards } from "./build_detail_shards.js";
import { build_hot_shard } from "./build_hot_index.js";
import { build_prefix_shards } from "./build_prefix_index.js";
import { build_trigram_shards } from "./build_trigram_index.js";
import {
  EXIT_INVALID_INPUT,
  EXIT_IO_FAILURE,
  EXIT_SUCCESS,
  EXIT_VERIFICATION_FAILURE,
  run_build,
  run_cli,
  run_verify,
} from "./index.js";
import {
  assign_record_ids,
  merge_duplicate_records,
  VocabularyMergeConflictError,
} from "./normalize_record.js";
import { read_vocabulary_source, type VocabularySourceRecord } from "./read_source.js";

const FIXTURE_PATH = fileURLToPath(
  new URL("../../../tests/fixtures/vocabulary/raw_small_vocabulary.jsonl", import.meta.url),
);
const EXPECTED_MANIFEST_PATH = fileURLToPath(
  new URL("../../../tests/fixtures/vocabulary/expected_manifest.json", import.meta.url),
);

const BUILD_OPTIONS = {
  package_id: "baseline",
  data_version: "1.0.0",
  minimum_extension_version: "3.0.0",
  changelog: "initial",
};

function build_args(input: string, output: string): string[] {
  return [
    "--input",
    input,
    "--output",
    output,
    "--package-id",
    BUILD_OPTIONS.package_id,
    "--data-version",
    BUILD_OPTIONS.data_version,
    "--minimum-extension-version",
    BUILD_OPTIONS.minimum_extension_version,
    "--changelog",
    BUILD_OPTIONS.changelog,
  ];
}

const temp_roots: string[] = [];

async function make_temp_root(): Promise<string> {
  const root = await mkdtemp(join(tmpdir(), "vocabulary-builder-test-"));
  temp_roots.push(root);
  return root;
}

afterEach(async () => {
  await Promise.all(temp_roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

async function list_files_recursively(root: string): Promise<string[]> {
  const results: string[] = [];
  async function visit(directory: string): Promise<void> {
    const entries = await readdir(directory, { withFileTypes: true });
    for (const entry of entries) {
      const full_path = join(directory, entry.name);
      if (entry.isDirectory()) {
        await visit(full_path);
      } else {
        results.push(full_path);
      }
    }
  }
  await visit(root);
  return results.map((path) => relative(root, path)).sort();
}

async function snapshot_package(package_directory: string): Promise<Map<string, Buffer>> {
  const relative_paths = await list_files_recursively(package_directory);
  const snapshot = new Map<string, Buffer>();
  for (const relative_path of relative_paths) {
    snapshot.set(relative_path, await readFile(join(package_directory, relative_path)));
  }
  return snapshot;
}

function expect_snapshots_equal(left: Map<string, Buffer>, right: Map<string, Buffer>): void {
  expect([...left.keys()].sort()).toEqual([...right.keys()].sort());
  for (const [path, left_bytes] of left) {
    const right_bytes = require_defined(right.get(path), `missing file in snapshot: ${path}`);
    expect(Buffer.compare(left_bytes, right_bytes)).toBe(0);
  }
}

async function read_manifest(package_directory: string): Promise<VocabularyManifest> {
  const text = await readFile(join(package_directory, "manifest.json"), "utf8");
  return JSON.parse(text) as VocabularyManifest;
}

async function decode_shard(package_directory: string, path: string): Promise<unknown> {
  const compressed = await readFile(join(package_directory, path));
  return decode(gunzipSync(compressed));
}

async function decode_shards_of_kind(
  package_directory: string,
  manifest: VocabularyManifest,
  kind: VocabularyIndexKind,
): Promise<unknown[]> {
  const entries = manifest.shards.filter((shard) => shard.kind === kind);
  return Promise.all(entries.map((entry) => decode_shard(package_directory, entry.path)));
}

function require_defined<T>(value: T | undefined, message: string): T {
  if (value === undefined) {
    throw new Error(message);
  }
  return value;
}

function delta_decode(deltas: readonly number[]): number[] {
  const ids: number[] = [];
  let running = 0;
  deltas.forEach((delta, index) => {
    running = index === 0 ? delta : running + delta;
    ids.push(running);
  });
  return ids;
}

async function has_no_stray_staging_entries(parent_directory: string): Promise<boolean> {
  const entries = await readdir(parent_directory);
  return entries.every(
    (name) => !name.startsWith(".vocabulary-staging-") && !name.includes(".previous-"),
  );
}

// Expected deterministic record_id assignment for the fixture: sorted by
// normalized tag (code-point order), which happens to fully order this
// fixture without needing the original-tag tie-break.
const EXPECTED_TAG_ORDER = [
  "1boy",
  "1girl",
  "background",
  "cat_ears",
  "dog_ears",
  "long_hair",
  "sad",
  "short_hair",
  "smile",
  "猫",
];

describe("read_vocabulary_source + merge_duplicate_records + assign_record_ids", () => {
  it("assigns record ids deterministically by normalized tag, then original tag", async () => {
    const source_records = await read_vocabulary_source(FIXTURE_PATH);
    const records = assign_record_ids(merge_duplicate_records(source_records));
    expect(records.map((record) => record.tag)).toEqual(EXPECTED_TAG_ORDER);
    expect(records.map((record) => record.record_id)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it("merges duplicate normalized tags without losing aliases or translation", async () => {
    const source_records = await read_vocabulary_source(FIXTURE_PATH);
    const records = assign_record_ids(merge_duplicate_records(source_records));
    const cat_ears = records.find((record) => record.tag === "cat_ears");
    expect(cat_ears).toMatchObject({
      tag: "cat_ears",
      translation: "猫耳",
      aliases: ["catears", "neko_mimi"],
      category: "body",
      popularity: 120,
      description: "Ears resembling those of a cat.",
    });
  });

  it("throws a documented conflict error when duplicate tags disagree on primary content", () => {
    const source_records: VocabularySourceRecord[] = [
      { tag: "cat_ears", aliases: [], popularity: 1, translation: "猫耳" },
      { tag: "cat_ears", aliases: [], popularity: 1, translation: "different" },
    ];
    expect(() => merge_duplicate_records(source_records)).toThrow(VocabularyMergeConflictError);
  });

  it("does not throw when only one duplicate supplies a primary field", () => {
    const source_records: VocabularySourceRecord[] = [
      { tag: "cat_ears", aliases: [], popularity: 1 },
      { tag: "cat_ears", aliases: [], popularity: 1, translation: "猫耳" },
    ];
    expect(() => merge_duplicate_records(source_records)).not.toThrow();
  });
});

describe("index builders", () => {
  it("prefix index returns the expected record id for a known normalized tag", async () => {
    const records = assign_record_ids(
      merge_duplicate_records(await read_vocabulary_source(FIXTURE_PATH)),
    );
    const shards = build_prefix_shards(records);
    const entries = shards.flatMap(
      (shard) => (shard.payload as VocabularyPrefixShardPayload).entries,
    );
    const cat_ears_id = require_defined(
      records.find((record) => record.tag === "cat_ears"),
      "expected a merged cat_ears record",
    ).record_id;
    expect(entries).toContainEqual(["cat ears", cat_ears_id, 120]);
  });

  it("skips a tag that normalizes to an empty key instead of emitting an unindexable entry", () => {
    // "_" normalizes (underscore-to-space, then trim) to "" --
    // VocabularyShardKeyEntrySchema requires a non-empty key, so indexing it
    // verbatim would fail the builder's own self-verification.
    const records = [{ record_id: 0, tag: "_", aliases: [], popularity: 1 }];
    const shards = build_prefix_shards(records);
    const entries = shards.flatMap(
      (shard) => (shard.payload as VocabularyPrefixShardPayload).entries,
    );
    expect(entries.some(([, record_id]) => record_id === 0)).toBe(false);
  });

  it("alias index returns the expected record id for a normalized alias and translation", async () => {
    const records = assign_record_ids(
      merge_duplicate_records(await read_vocabulary_source(FIXTURE_PATH)),
    );
    const shards = build_alias_shards(records);
    const entries = shards.flatMap(
      (shard) => (shard.payload as VocabularyAliasShardPayload).entries,
    );
    const one_boy_id = require_defined(
      records.find((record) => record.tag === "1boy"),
      "expected a 1boy record",
    ).record_id;
    const one_girl_id = require_defined(
      records.find((record) => record.tag === "1girl"),
      "expected a 1girl record",
    ).record_id;
    expect(entries).toContainEqual(["one boy", one_boy_id, 300]);
    expect(entries).toContainEqual(["一个女孩", one_girl_id, 500]);
  });

  it("skips an alias that normalizes to an empty key instead of emitting an unindexable entry", () => {
    const records = [{ record_id: 0, tag: "cat", aliases: ["_"], popularity: 1 }];
    const shards = build_alias_shards(records);
    const entries = shards.flatMap(
      (shard) => (shard.payload as VocabularyAliasShardPayload).entries,
    );
    expect(entries.some(([, record_id]) => record_id === 0)).toBe(false);
  });

  it("buckets alias shards by the hashed group key the Worker computes for a query", async () => {
    const records = assign_record_ids(
      merge_duplicate_records(await read_vocabulary_source(FIXTURE_PATH)),
    );
    const shards = build_alias_shards(records);

    for (const shard of shards) {
      expect(shard.shard_id).toMatch(/^alias:h\d{3}$/u);
      expect(shard.path).toBe(`alias/${shard.shard_id.slice("alias:".length)}.msgpack.gz`);
      for (const [key] of (shard.payload as VocabularyAliasShardPayload).entries) {
        const group_key = Array.from(key).slice(0, 2).join("");
        expect(`alias:${vocabulary_alias_shard_partition(group_key)}`).toBe(shard.shard_id);
      }
    }
  });

  it("bounds alias shard count at 512 however many distinct groups the corpus has", () => {
    // 3,000 distinct CJK two-character groups -- the code-point-pair layout
    // this replaced would have emitted one shard per group.
    const records = Array.from({ length: 3_000 }, (_, index) => ({
      record_id: index,
      tag: `tag_${String(index)}`,
      translation: String.fromCodePoint(0x4e00 + index, 0x4e00 + ((index * 7) % 3_000), 0x611b),
      aliases: [],
      popularity: index,
    }));
    const shards = build_alias_shards(records);
    expect(shards.length).toBeLessThanOrEqual(VOCABULARY_ALIAS_SHARD_BUCKET_COUNT);
    expect(shards.length).toBeGreaterThan(400);
    expect(
      shards.flatMap((shard) => (shard.payload as VocabularyAliasShardPayload).entries),
    ).toHaveLength(3_000);
  });

  it("trigram index returns the expected record id via delta-decoding", async () => {
    const records = assign_record_ids(
      merge_duplicate_records(await read_vocabulary_source(FIXTURE_PATH)),
    );
    const shards = build_trigram_shards(records);
    const smile_id = require_defined(
      records.find((record) => record.tag === "smile"),
      "expected a smile record",
    ).record_id;
    const entry = require_defined(
      shards
        .flatMap((shard) => (shard.payload as VocabularyTrigramShardPayload).entries)
        .find(([trigram]) => trigram === "smi"),
      "expected a trigram entry for 'smi'",
    );
    expect(delta_decode(entry[1])).toContain(smile_id);
  });

  it("detail shard contains every record ordered by record_id starting at 0", async () => {
    const records = assign_record_ids(
      merge_duplicate_records(await read_vocabulary_source(FIXTURE_PATH)),
    );
    const shards = build_detail_shards(records);
    expect(shards).toHaveLength(1);
    const only_shard = require_defined(shards[0], "expected exactly one detail shard");
    const payload = only_shard.payload as { start_id: number; records: { tag: string }[] };
    expect(payload.start_id).toBe(0);
    expect(payload.records.map((record) => record.tag)).toEqual(EXPECTED_TAG_ORDER);
  });

  it("hot shard ranks globally and per category by popularity desc, record_id asc", async () => {
    const records = assign_record_ids(
      merge_duplicate_records(await read_vocabulary_source(FIXTURE_PATH)),
    );
    const shard = build_hot_shard(records);
    const payload = shard.payload as { global: number[]; by_category: Record<string, number[]> };
    const by_tag = (tag: string): number =>
      require_defined(
        records.find((record) => record.tag === tag),
        `expected a record tagged "${tag}"`,
      ).record_id;

    expect(payload.global).toEqual(
      [
        "smile",
        "long_hair",
        "short_hair",
        "1girl",
        "sad",
        "1boy",
        "cat_ears",
        "dog_ears",
        "猫",
        "background",
      ].map(by_tag),
    );
    expect(payload.by_category["expression"]).toEqual(["smile", "sad"].map(by_tag));
    expect(payload.by_category["hair"]).toEqual(["long_hair", "short_hair"].map(by_tag));
    expect(payload.by_category["general"]).toEqual(["1girl", "1boy"].map(by_tag));
    expect(payload.by_category["body"]).toEqual(["cat_ears", "dog_ears"].map(by_tag));
    expect(payload.by_category["animal"]).toEqual(["猫"].map(by_tag));
    expect(Object.keys(payload.by_category)).not.toContain("background");
  });
});

describe("vocabulary_builder build", () => {
  it("produces byte-identical files and manifest across two builds", async () => {
    const root = await make_temp_root();
    const output_a = join(root, "package_a");
    const output_b = join(root, "package_b");

    expect(await run_build(build_args(FIXTURE_PATH, output_a))).toBe(EXIT_SUCCESS);
    expect(await run_build(build_args(FIXTURE_PATH, output_b))).toBe(EXIT_SUCCESS);

    const snapshot_a = await snapshot_package(output_a);
    const snapshot_b = await snapshot_package(output_b);
    expect_snapshots_equal(snapshot_a, snapshot_b);
  });

  it("produces identical output regardless of source line order", async () => {
    const root = await make_temp_root();
    const output_ordered = join(root, "ordered");
    const output_shuffled = join(root, "shuffled");

    const fixture_text = await readFile(FIXTURE_PATH, "utf8");
    const lines = fixture_text.split(/\r?\n/u).filter((line) => line.trim().length > 0);
    const shuffled_lines = [...lines].reverse();
    const shuffled_path = join(root, "shuffled_source.jsonl");
    await writeFile(shuffled_path, `${shuffled_lines.join("\n")}\n`);

    expect(await run_build(build_args(FIXTURE_PATH, output_ordered))).toBe(EXIT_SUCCESS);
    expect(await run_build(build_args(shuffled_path, output_shuffled))).toBe(EXIT_SUCCESS);

    const snapshot_ordered = await snapshot_package(output_ordered);
    const snapshot_shuffled = await snapshot_package(output_shuffled);
    expect_snapshots_equal(snapshot_ordered, snapshot_shuffled);
  });

  it("writes every manifest hash and byte length matching the bytes on disk", async () => {
    const root = await make_temp_root();
    const output = join(root, "package");
    expect(await run_build(build_args(FIXTURE_PATH, output))).toBe(EXIT_SUCCESS);

    const manifest = await read_manifest(output);
    expect(manifest.record_count).toBe(10);

    for (const shard of manifest.shards) {
      const bytes = await readFile(join(output, shard.path));
      expect(bytes.length).toBe(shard.byte_length);
      expect(bytesToHex(sha256(bytes))).toBe(shard.sha256);
    }
  });

  it("leaves no staging or backup directories behind after a successful build", async () => {
    const root = await make_temp_root();
    const output = join(root, "package");
    expect(await run_build(build_args(FIXTURE_PATH, output))).toBe(EXIT_SUCCESS);
    expect(await has_no_stray_staging_entries(root)).toBe(true);
  });

  it("rejects a malformed source without touching a previously valid package", async () => {
    const root = await make_temp_root();
    const output = join(root, "package");
    expect(await run_build(build_args(FIXTURE_PATH, output))).toBe(EXIT_SUCCESS);
    const baseline_snapshot = await snapshot_package(output);

    const malformed_path = join(root, "malformed_source.jsonl");
    await writeFile(malformed_path, "not valid json\n");
    expect(await run_build(build_args(malformed_path, output))).toBe(EXIT_INVALID_INPUT);

    const after_snapshot = await snapshot_package(output);
    expect_snapshots_equal(baseline_snapshot, after_snapshot);
    expect(await has_no_stray_staging_entries(root)).toBe(true);
  });

  it("rejects an over-limit source record without touching a previously valid package", async () => {
    const root = await make_temp_root();
    const output = join(root, "package");
    expect(await run_build(build_args(FIXTURE_PATH, output))).toBe(EXIT_SUCCESS);
    const baseline_snapshot = await snapshot_package(output);

    const over_limit_aliases = Array.from({ length: 33 }, (_, index) => `alias_${String(index)}`);
    const over_limit_path = join(root, "over_limit_source.jsonl");
    await writeFile(
      over_limit_path,
      `${JSON.stringify({ tag: "over_limit", aliases: over_limit_aliases })}\n`,
    );
    expect(await run_build(build_args(over_limit_path, output))).toBe(EXIT_INVALID_INPUT);

    const after_snapshot = await snapshot_package(output);
    expect_snapshots_equal(baseline_snapshot, after_snapshot);
  });

  it("builds successfully for a translation at the 512-character bound the record schema allows", async () => {
    // Previously the alias entry-key bound (256) was narrower than
    // VocabularyRecordSchema's translation max (512), so a legitimate
    // maximal-length translation passed record validation but then failed
    // the builder's own self-verification (EXIT_VERIFICATION_FAILURE).
    const root = await make_temp_root();
    const output = join(root, "package");
    const long_translation = "猫".repeat(512);
    const source_path = join(root, "long_translation_source.jsonl");
    await writeFile(
      source_path,
      `${JSON.stringify({ tag: "cat", translation: long_translation, aliases: [], popularity: 1 })}\n`,
    );
    expect(await run_build(build_args(source_path, output))).toBe(EXIT_SUCCESS);
    expect(await run_verify(["--package", output])).toBe(EXIT_SUCCESS);
  });

  it("rejects conflicting duplicate primary content before writing output", async () => {
    const root = await make_temp_root();
    const output = join(root, "package");
    const conflicting_path = join(root, "conflicting_source.jsonl");
    await writeFile(
      conflicting_path,
      [
        JSON.stringify({ tag: "cat_ears", aliases: [], popularity: 1, translation: "猫耳" }),
        JSON.stringify({ tag: "cat_ears", aliases: [], popularity: 1, translation: "different" }),
      ].join("\n") + "\n",
    );
    expect(await run_build(build_args(conflicting_path, output))).toBe(EXIT_INVALID_INPUT);

    await expect(readdir(root)).resolves.not.toContain("package");
  });

  it("fails with an I/O exit code when the input file does not exist", async () => {
    const root = await make_temp_root();
    const output = join(root, "package");
    const missing_path = join(root, "does_not_exist.jsonl");
    expect(await run_build(build_args(missing_path, output))).toBe(EXIT_IO_FAILURE);
  });

  it("fails with an invalid-input exit code for a missing required flag", async () => {
    const root = await make_temp_root();
    const output = join(root, "package");
    const args = build_args(FIXTURE_PATH, output).filter(
      (token) => token !== "--package-id" && token !== BUILD_OPTIONS.package_id,
    );
    expect(await run_build(args)).toBe(EXIT_INVALID_INPUT);
  });

  it("fails with an invalid-input exit code for a malformed semver flag", async () => {
    const root = await make_temp_root();
    const output = join(root, "package");
    const args = build_args(FIXTURE_PATH, output).map((token) =>
      token === BUILD_OPTIONS.data_version ? "not-a-semver" : token,
    );
    expect(await run_build(args)).toBe(EXIT_INVALID_INPUT);
  });

  it("round-trips prefix, alias, trigram, detail, and hot lookups through the on-disk package", async () => {
    const root = await make_temp_root();
    const output = join(root, "package");
    expect(await run_build(build_args(FIXTURE_PATH, output))).toBe(EXIT_SUCCESS);
    const manifest = await read_manifest(output);

    const prefix_payloads = (await decode_shards_of_kind(output, manifest, "prefix")) as {
      entries: [string, number, number][];
    }[];
    const prefix_entries = prefix_payloads.flatMap((payload) => payload.entries);
    expect(prefix_entries).toContainEqual(["smile", 8, 900]);

    const alias_payloads = (await decode_shards_of_kind(output, manifest, "alias")) as {
      entries: [string, number, number][];
    }[];
    const alias_entries = alias_payloads.flatMap((payload) => payload.entries);
    expect(alias_entries).toContainEqual(["one boy", 0, 300]);

    const trigram_payloads = (await decode_shards_of_kind(output, manifest, "trigram")) as {
      entries: [string, number[]][];
    }[];
    const trigram_entry = require_defined(
      trigram_payloads.flatMap((payload) => payload.entries).find(([trigram]) => trigram === "smi"),
      "expected an on-disk trigram entry for 'smi'",
    );
    expect(delta_decode(trigram_entry[1])).toContain(8);

    const [detail_payload] = (await decode_shards_of_kind(output, manifest, "detail")) as {
      start_id: number;
      records: { record_id: number; tag: string }[];
    }[];
    expect(require_defined(detail_payload, "expected one detail shard").records[3]?.tag).toBe(
      "cat_ears",
    );

    const [hot_payload] = (await decode_shards_of_kind(output, manifest, "hot")) as {
      global: number[];
    }[];
    expect(require_defined(hot_payload, "expected one hot shard").global[0]).toBe(8);
  });

  it("matches the committed golden manifest for the fixture", async () => {
    const root = await make_temp_root();
    const output = join(root, "package");
    expect(await run_build(build_args(FIXTURE_PATH, output))).toBe(EXIT_SUCCESS);

    const manifest = await read_manifest(output);
    const expected_manifest = JSON.parse(
      await readFile(EXPECTED_MANIFEST_PATH, "utf8"),
    ) as VocabularyManifest;
    expect(manifest).toEqual(expected_manifest);
  });
});

describe("vocabulary_builder verify", () => {
  it("succeeds for a freshly built package", async () => {
    const root = await make_temp_root();
    const output = join(root, "package");
    expect(await run_build(build_args(FIXTURE_PATH, output))).toBe(EXIT_SUCCESS);
    expect(await run_verify(["--package", output])).toBe(EXIT_SUCCESS);
  });

  it("fails verification when a shard's bytes no longer match its manifest hash", async () => {
    const root = await make_temp_root();
    const output = join(root, "package");
    expect(await run_build(build_args(FIXTURE_PATH, output))).toBe(EXIT_SUCCESS);

    const manifest = await read_manifest(output);
    const first_shard = require_defined(manifest.shards[0], "expected at least one shard");
    await writeFile(join(output, first_shard.path), Buffer.from([0, 1, 2, 3]));

    expect(await run_verify(["--package", output])).toBe(EXIT_VERIFICATION_FAILURE);
  });

  it("fails verification when the manifest is missing", async () => {
    const root = await make_temp_root();
    const output = join(root, "empty_package");
    await mkdir(output, { recursive: true });
    expect(await run_verify(["--package", output])).toBe(EXIT_VERIFICATION_FAILURE);
  });
});

describe("run_cli", () => {
  it("returns an invalid-input exit code for an unknown command", async () => {
    expect(await run_cli(["bogus"])).toBe(EXIT_INVALID_INPUT);
  });

  it("dispatches build and verify through the same entry point", async () => {
    const root = await make_temp_root();
    const output = join(root, "package");
    expect(await run_cli(["build", ...build_args(FIXTURE_PATH, output)])).toBe(EXIT_SUCCESS);
    expect(await run_cli(["verify", "--package", output])).toBe(EXIT_SUCCESS);
  });
});
