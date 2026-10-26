import { cp, mkdtemp, readdir, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  assert_tag_popularity_at_least,
  build_pack_into,
  for_each_detail_record,
  read_current_extension_version,
  read_manifest,
  REPO_ROOT,
  stage_pack_source,
} from "./pack_common.js";

// Publishes the verified build into apps/extension/public/vocabulary/baseline, or under --check
// rebuilds into a scratch directory and byte-compares every manifest/shard against the committed
// output (the CI gate). Never hand-edit generated shards; re-run this script.
//
// The baseline is the top 50,000 records by popularity of
// data/vocabulary/raw_vocabulary_tags_public.jsonl and carries zh translations (see
// assert_translations_present); the full pack comes from generate_full_pack.ts.

class GenerateBaselineError extends Error {}

const DEFAULT_SOURCE_PATH = resolve(REPO_ROOT, "data/vocabulary/raw_vocabulary_tags_public.jsonl");
const DEFAULT_BASELINE_DIRECTORY = resolve(REPO_ROOT, "apps/extension/public/vocabulary/baseline");
const PACKAGE_ID = "tavern-canvas-baseline";
const DATA_VERSION = "1.1.0";
const CHANGELOG =
  "Rebuilt from fresh data: HF tag-table universe (JayxMay95/qdlabs, apache-2.0) with " +
  "popularity refreshed via a u-haru/danbooru-tags-20260518 post-level aggregation " +
  "(supplemented by a live danbooru.donmai.us top-tag fetch), plus zh translations " +
  "overlaid from the legacy v2 seed. Bundled baseline is a top-50,000-by-popularity " +
  "cut of the full ~153k-record bilingual dataset -- see generate_full_pack.ts for the " +
  "unabridged pack.";
export const BASELINE_RECORD_LIMIT = 50_000;
const POPULARITY_FLOOR_PROBE_TAG = "1girl";
const POPULARITY_FLOOR = 8_000_000;

const TRANSLATION_ROUND_TRIP_PROBE = { tag: "1girl", translation: "一个女孩" } as const;

// A known, always-translated head tag must survive the build round trip, so a source without zh
// translations (or a broken overlay) fails here instead of shipping untranslated.
async function assert_translations_present(output_directory: string): Promise<void> {
  let probe_translation: string | undefined;
  let probe_shard_id: string | undefined;

  await for_each_detail_record(output_directory, (record, shard_id) => {
    if (record.tag === TRANSLATION_ROUND_TRIP_PROBE.tag) {
      probe_translation = record.translation;
      probe_shard_id = shard_id;
    }
  });

  if (probe_shard_id === undefined) {
    throw new GenerateBaselineError(
      `provenance guard failed: record "${TRANSLATION_ROUND_TRIP_PROBE.tag}" was not found in any ` +
        "detail shard -- cannot confirm the translation round trip.",
    );
  }
  if (probe_translation !== TRANSLATION_ROUND_TRIP_PROBE.translation) {
    throw new GenerateBaselineError(
      `provenance guard failed: record "${TRANSLATION_ROUND_TRIP_PROBE.tag}" in shard ` +
        `"${probe_shard_id}" has translation ${JSON.stringify(probe_translation)}, expected ` +
        `${JSON.stringify(TRANSLATION_ROUND_TRIP_PROBE.translation)} -- the bundled baseline must ` +
        "carry zh translations end to end (2026-08-06 controller ruling).",
    );
  }
}

async function list_files_recursively(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const full_path = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await list_files_recursively(full_path)));
    } else {
      files.push(full_path);
    }
  }
  return files;
}

async function assert_byte_identical(
  rebuilt_directory: string,
  committed_directory: string,
): Promise<void> {
  const [rebuilt_files, committed_files] = await Promise.all([
    list_files_recursively(rebuilt_directory),
    list_files_recursively(committed_directory),
  ]);
  const rebuilt_relative = rebuilt_files.map((path) => relative(rebuilt_directory, path)).sort();
  const committed_relative = committed_files
    .map((path) => relative(committed_directory, path))
    .sort();

  if (JSON.stringify(rebuilt_relative) !== JSON.stringify(committed_relative)) {
    throw new GenerateBaselineError(
      "committed baseline is stale: file lists differ.\n" +
        `  rebuilt:   ${rebuilt_relative.join(", ")}\n` +
        `  committed: ${committed_relative.join(", ")}`,
    );
  }

  for (const relative_path of rebuilt_relative) {
    const [rebuilt_bytes, committed_bytes] = await Promise.all([
      readFile(join(rebuilt_directory, relative_path)),
      readFile(join(committed_directory, relative_path)),
    ]);
    if (!rebuilt_bytes.equals(committed_bytes)) {
      throw new GenerateBaselineError(
        `committed baseline is stale: "${relative_path}" differs from a fresh rebuild`,
      );
    }
  }
}

function parse_args(argv: readonly string[]): {
  readonly check: boolean;
  readonly source_path: string;
  readonly baseline_directory: string;
} {
  let check = false;
  let source_path = DEFAULT_SOURCE_PATH;
  let baseline_directory = DEFAULT_BASELINE_DIRECTORY;

  for (let index = 0; index < argv.length; index += 1) {
    const flag = argv[index];
    if (flag === "--check") {
      check = true;
      continue;
    }
    if (flag === "--source") {
      const value = argv[index + 1];
      if (value === undefined) {
        throw new GenerateBaselineError("--source requires a value");
      }
      source_path = resolve(value);
      index += 1;
      continue;
    }
    if (flag === "--baseline-dir") {
      const value = argv[index + 1];
      if (value === undefined) {
        throw new GenerateBaselineError("--baseline-dir requires a value");
      }
      baseline_directory = resolve(value);
      index += 1;
      continue;
    }
    throw new GenerateBaselineError(`unrecognized argument: ${flag ?? "<none>"}`);
  }

  return { check, source_path, baseline_directory };
}

export async function run_generate_baseline(argv: readonly string[]): Promise<void> {
  const { check, source_path, baseline_directory } = parse_args(argv);
  const scratch_directory = await mkdtemp(join(tmpdir(), "vocabulary-baseline-"));
  const rebuild_directory = join(scratch_directory, "package");
  const staged_source_path = join(scratch_directory, "source.jsonl");

  try {
    await stage_pack_source(source_path, staged_source_path, BASELINE_RECORD_LIMIT);
    const minimum_extension_version = await read_current_extension_version();
    await build_pack_into(rebuild_directory, staged_source_path, {
      package_id: PACKAGE_ID,
      data_version: DATA_VERSION,
      minimum_extension_version,
      changelog: CHANGELOG,
    });
    await assert_translations_present(rebuild_directory);
    await assert_tag_popularity_at_least(
      rebuild_directory,
      POPULARITY_FLOOR_PROBE_TAG,
      POPULARITY_FLOOR,
    );

    const manifest = await read_manifest(rebuild_directory);
    const shard_counts_by_kind = new Map<string, number>();
    for (const shard of manifest.shards) {
      shard_counts_by_kind.set(shard.kind, (shard_counts_by_kind.get(shard.kind) ?? 0) + 1);
    }
    console.log(
      `generate_baseline: record_count=${String(manifest.record_count)} ` +
        `shard_count=${String(manifest.shards.length)} ` +
        `compressed_size=${String(manifest.compressed_size)} ` +
        `by_kind=${JSON.stringify(Object.fromEntries(shard_counts_by_kind))}`,
    );

    if (check) {
      await assert_byte_identical(rebuild_directory, baseline_directory);
      console.log("generate_baseline: committed baseline matches a fresh rebuild byte-for-byte");
      return;
    }

    await rm(baseline_directory, { recursive: true, force: true });
    await cp(rebuild_directory, baseline_directory, { recursive: true });
    console.log(`generate_baseline: wrote verified baseline package to ${baseline_directory}`);
  } finally {
    await rm(scratch_directory, { recursive: true, force: true });
  }
}

const entry_path = process.argv[1];
if (entry_path !== undefined && resolve(entry_path) === fileURLToPath(import.meta.url)) {
  try {
    await run_generate_baseline(process.argv.slice(2));
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
