import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  assert_tag_popularity_at_least,
  build_pack_into,
  read_current_extension_version,
  read_manifest,
  REPO_ROOT,
  stage_pack_source,
} from "./pack_common.js";

// Generates the full bilingual pack (~153k records, zh included). Not committed: written under
// gitignored output/ for upload to the HF dataset repo as a catalog package. No --check mode, since
// no committed copy exists.

class GenerateFullPackError extends Error {}

const DEFAULT_SOURCE_PATH = resolve(REPO_ROOT, "data/vocabulary/raw_vocabulary_tags_public.jsonl");
const DEFAULT_OUTPUT_DIRECTORY = resolve(REPO_ROOT, "output/packages/tavern-canvas-full-zh");
export const PACKAGE_ID = "tavern-canvas-full-zh";
export const DATA_VERSION = "1.1.0";
const CHANGELOG =
  "Full bilingual vocabulary pack: HF tag-table universe (JayxMay95/qdlabs, apache-2.0) with " +
  "popularity refreshed via a u-haru/danbooru-tags-20260518 post-level aggregation " +
  "(supplemented by a live danbooru.donmai.us top-tag fetch), plus zh translations " +
  "overlaid from the legacy v2 seed. Unabridged counterpart to the bundled baseline's " +
  "top-50,000-record cut.";
const POPULARITY_FLOOR_PROBE_TAG = "1girl";
const POPULARITY_FLOOR = 8_000_000;

function parse_args(argv: readonly string[]): {
  readonly source_path: string;
  readonly output_directory: string;
} {
  let source_path = DEFAULT_SOURCE_PATH;
  let output_directory = DEFAULT_OUTPUT_DIRECTORY;

  for (let index = 0; index < argv.length; index += 1) {
    const flag = argv[index];
    if (flag === "--source") {
      const value = argv[index + 1];
      if (value === undefined) {
        throw new GenerateFullPackError("--source requires a value");
      }
      source_path = resolve(value);
      index += 1;
      continue;
    }
    if (flag === "--output") {
      const value = argv[index + 1];
      if (value === undefined) {
        throw new GenerateFullPackError("--output requires a value");
      }
      output_directory = resolve(value);
      index += 1;
      continue;
    }
    throw new GenerateFullPackError(`unrecognized argument: ${flag ?? "<none>"}`);
  }

  return { source_path, output_directory };
}

export async function run_generate_full_pack(argv: readonly string[]): Promise<void> {
  const { source_path, output_directory } = parse_args(argv);
  const scratch_directory = await mkdtemp(join(tmpdir(), "vocabulary-full-pack-"));
  const staged_source_path = join(scratch_directory, "source.jsonl");

  try {
    await stage_pack_source(source_path, staged_source_path);
    const minimum_extension_version = await read_current_extension_version();
    await build_pack_into(output_directory, staged_source_path, {
      package_id: PACKAGE_ID,
      data_version: DATA_VERSION,
      minimum_extension_version,
      changelog: CHANGELOG,
    });
    await assert_tag_popularity_at_least(
      output_directory,
      POPULARITY_FLOOR_PROBE_TAG,
      POPULARITY_FLOOR,
    );

    const manifest = await read_manifest(output_directory);
    const shard_counts_by_kind = new Map<string, number>();
    for (const shard of manifest.shards) {
      shard_counts_by_kind.set(shard.kind, (shard_counts_by_kind.get(shard.kind) ?? 0) + 1);
    }
    console.log(
      `generate_full_pack: record_count=${String(manifest.record_count)} ` +
        `shard_count=${String(manifest.shards.length)} ` +
        `compressed_size=${String(manifest.compressed_size)} ` +
        `by_kind=${JSON.stringify(Object.fromEntries(shard_counts_by_kind))}`,
    );
    console.log(`generate_full_pack: wrote verified pack to ${output_directory}`);
  } finally {
    await rm(scratch_directory, { recursive: true, force: true });
  }
}

const entry_path = process.argv[1];
if (entry_path !== undefined && resolve(entry_path) === fileURLToPath(import.meta.url)) {
  try {
    await run_generate_full_pack(process.argv.slice(2));
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
