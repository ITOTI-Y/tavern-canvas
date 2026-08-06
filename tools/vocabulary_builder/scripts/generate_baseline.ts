import { cp, mkdtemp, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gunzipSync } from "node:zlib";

import { decode } from "@msgpack/msgpack";

import { EXIT_SUCCESS, run_build, run_verify } from "../src/index.js";

// This is the repository's generation script for the committed vocabulary
// baseline (task-5-brief.md Step 3): it drives the committed builder, then
// either publishes the verified output into
// apps/extension/public/vocabulary/baseline (default) or, under --check,
// rebuilds into a scratch directory and byte-compares every manifest/shard
// against the committed output without touching it -- the CI gate in
// .github/workflows/ci.yml runs the latter. Never hand-edit generated shards;
// re-run this script instead.

const REPO_ROOT = resolve(fileURLToPath(import.meta.url), "../../../..");
const DEFAULT_SOURCE_PATH = resolve(REPO_ROOT, "data/vocabulary/raw_vocabulary_tags_public.jsonl");
const DEFAULT_BASELINE_DIRECTORY = resolve(REPO_ROOT, "apps/extension/public/vocabulary/baseline");
const PACKAGE_ID = "tavern-canvas-baseline";
const DATA_VERSION = "1.0.0";
const CHANGELOG = "initial";

// The package's minimum_extension_version gates whether the (future) Worker
// bootstrap accepts it (package_verifier.ts's verify_manifest). It must
// never exceed the repo's own current version -- during 3.0.0-alpha.x
// development that is lower than the plain "3.0.0" the brief's example
// command uses literally, and hardcoding "3.0.0" here would make the
// committed baseline permanently unusable until a real 3.0.0 release.
// Reading the live version keeps this self-correcting across alpha bumps.
async function read_current_extension_version(): Promise<string> {
  const text = await readFile(resolve(REPO_ROOT, "package.json"), "utf8");
  const parsed = JSON.parse(text) as { readonly version: string };
  return parsed.version;
}

class GenerateBaselineError extends Error {}

interface ManifestShardEntrySummary {
  readonly shard_id: string;
  readonly kind: string;
  readonly path: string;
}

interface ManifestSummary {
  readonly record_count: number;
  readonly compressed_size: number;
  readonly shards: readonly ManifestShardEntrySummary[];
}

async function read_manifest(directory: string): Promise<ManifestSummary> {
  const text = await readFile(join(directory, "manifest.json"), "utf8");
  return JSON.parse(text) as ManifestSummary;
}

// The builder's source schema never accepts record_id (it reassigns ids
// deterministically after merging duplicates -- read_source.ts), but
// data/vocabulary/raw_vocabulary_tags_public.jsonl carries one (mapped from
// legacy v2 id_index during extraction, see task-src-report.md). Stripping
// it here keeps the committed source file's schema self-descriptive without
// weakening the builder's own "source never supplies an id" invariant.
async function strip_record_ids(source_path: string, staged_path: string): Promise<void> {
  const raw_text = await readFile(source_path, "utf8");
  const lines = raw_text.split(/\r?\n/u).filter((line) => line.trim().length > 0);
  const stripped_lines = lines.map((line) => {
    const { record_id: _record_id, ...rest } = JSON.parse(line) as Record<string, unknown>;
    return JSON.stringify(rest);
  });
  await writeFile(staged_path, `${stripped_lines.join("\n")}\n`);
}

async function build_into(
  output_directory: string,
  source_path: string,
  minimum_extension_version: string,
): Promise<void> {
  const build_exit_code = await run_build([
    "--input",
    source_path,
    "--output",
    output_directory,
    "--package-id",
    PACKAGE_ID,
    "--data-version",
    DATA_VERSION,
    "--minimum-extension-version",
    minimum_extension_version,
    "--changelog",
    CHANGELOG,
  ]);
  if (build_exit_code !== EXIT_SUCCESS) {
    throw new GenerateBaselineError(
      `vocabulary_builder build failed with exit code ${String(build_exit_code)}`,
    );
  }
  const verify_exit_code = await run_verify(["--package", output_directory]);
  if (verify_exit_code !== EXIT_SUCCESS) {
    throw new GenerateBaselineError(
      `vocabulary_builder verify failed with exit code ${String(verify_exit_code)}`,
    );
  }
}

// Provenance guard (controller pre-ruling #2): the committed baseline must
// be built exclusively from fact-only, redistributable source data. This
// re-checks the built output directly -- independent of which source file
// the caller pointed at -- so a future accidental swap to the full
// (non-redistributable) seed fails loudly here instead of shipping.
async function assert_zero_translation_leakage(output_directory: string): Promise<void> {
  const manifest = await read_manifest(output_directory);
  for (const shard of manifest.shards) {
    if (shard.kind !== "detail") {
      continue;
    }
    const bytes = await readFile(join(output_directory, shard.path));
    const payload = decode(gunzipSync(bytes)) as {
      readonly records: readonly { readonly tag: string; readonly translation?: string }[];
    };
    for (const record of payload.records) {
      if (record.translation !== undefined) {
        throw new GenerateBaselineError(
          `provenance guard failed: record "${record.tag}" in shard "${shard.shard_id}" carries ` +
            "a translation field -- the committed baseline must be built only from " +
            "data/vocabulary/raw_vocabulary_tags_public.jsonl (fact-only, redistributable)",
        );
      }
    }
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
  const stripped_source_path = join(scratch_directory, "source.jsonl");

  try {
    await strip_record_ids(source_path, stripped_source_path);
    const minimum_extension_version = await read_current_extension_version();
    await build_into(rebuild_directory, stripped_source_path, minimum_extension_version);
    await assert_zero_translation_leakage(rebuild_directory);

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
