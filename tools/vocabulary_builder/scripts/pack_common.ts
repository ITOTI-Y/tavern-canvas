import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gunzipSync } from "node:zlib";

import { decode } from "@msgpack/msgpack";
import {
  read_jsonl,
  select_top_records,
  VocabularyRecordSchema,
  write_jsonl,
} from "@tavern-canvas/vocabulary-source";

import { EXIT_SUCCESS, run_build, run_verify } from "../src/index.js";

export const REPO_ROOT = resolve(fileURLToPath(import.meta.url), "../../../..");

export class PackBuildError extends Error {}

// Must not exceed the repo's current version, or `verify_manifest` rejects every generated package;
// read the live version rather than hardcoding "3.0.0".
export async function read_current_extension_version(): Promise<string> {
  const text = await readFile(resolve(REPO_ROOT, "package.json"), "utf8");
  const parsed = JSON.parse(text) as { readonly version: string };
  return parsed.version;
}

/** Strips `record_id` from the staged file: the builder's source schema rejects it and reassigns ids after merging duplicates. */
export async function stage_pack_source(
  source_path: string,
  staged_path: string,
  limit?: number,
): Promise<void> {
  const records = await read_jsonl(source_path, VocabularyRecordSchema);
  const selected = limit === undefined ? records : select_top_records(records, limit);
  await write_jsonl(
    staged_path,
    selected.map(({ record_id: _record_id, ...rest }) => rest),
  );
}

export interface PackIdentity {
  readonly package_id: string;
  readonly data_version: string;
  readonly minimum_extension_version: string;
  readonly changelog: string;
}

export async function build_pack_into(
  output_directory: string,
  source_path: string,
  identity: PackIdentity,
): Promise<void> {
  const build_exit_code = await run_build([
    "--input",
    source_path,
    "--output",
    output_directory,
    "--package-id",
    identity.package_id,
    "--data-version",
    identity.data_version,
    "--minimum-extension-version",
    identity.minimum_extension_version,
    "--changelog",
    identity.changelog,
  ]);
  if (build_exit_code !== EXIT_SUCCESS) {
    throw new PackBuildError(
      `vocabulary_builder build failed with exit code ${String(build_exit_code)}`,
    );
  }
  const verify_exit_code = await run_verify(["--package", output_directory]);
  if (verify_exit_code !== EXIT_SUCCESS) {
    throw new PackBuildError(
      `vocabulary_builder verify failed with exit code ${String(verify_exit_code)}`,
    );
  }
}

export interface ManifestShardEntrySummary {
  readonly shard_id: string;
  readonly kind: string;
  readonly path: string;
}

export interface ManifestSummary {
  readonly package_id: string;
  readonly data_version: string;
  readonly record_count: number;
  readonly compressed_size: number;
  readonly minimum_extension_version: string;
  readonly shards: readonly ManifestShardEntrySummary[];
}

export async function read_manifest(directory: string): Promise<ManifestSummary> {
  const text = await readFile(join(directory, "manifest.json"), "utf8");
  return JSON.parse(text) as ManifestSummary;
}

interface DetailRecordLike {
  readonly tag: string;
  readonly translation?: string;
  readonly popularity: number;
}

export async function for_each_detail_record(
  output_directory: string,
  visit: (record: DetailRecordLike, shard_id: string) => void,
): Promise<void> {
  const manifest = await read_manifest(output_directory);
  for (const shard of manifest.shards) {
    if (shard.kind !== "detail") {
      continue;
    }
    const bytes = await readFile(join(output_directory, shard.path));
    const payload = decode(gunzipSync(bytes)) as { readonly records: readonly DetailRecordLike[] };
    for (const record of payload.records) {
      visit(record, shard.shard_id);
    }
  }
}

/** Fails unless a known head tag's popularity is at least `floor`, so stale source counts do not ship. */
export async function assert_tag_popularity_at_least(
  output_directory: string,
  tag: string,
  floor: number,
): Promise<void> {
  let found_popularity: number | undefined;
  await for_each_detail_record(output_directory, (record) => {
    if (record.tag === tag) {
      found_popularity = record.popularity;
    }
  });

  if (found_popularity === undefined) {
    throw new PackBuildError(`sanity gate failed: tag "${tag}" was not found in any detail shard.`);
  }
  if (found_popularity < floor) {
    throw new PackBuildError(
      `sanity gate failed: tag "${tag}" has popularity ${String(found_popularity)}, ` +
        `expected at least ${String(floor)}.`,
    );
  }
}
