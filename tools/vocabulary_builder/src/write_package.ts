import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { gunzipSync, gzipSync } from "node:zlib";

import { decode, encode } from "@msgpack/msgpack";
import { sha256 } from "@noble/hashes/sha2.js";
import { bytesToHex } from "@noble/hashes/utils.js";
import {
  VOCABULARY_SCHEMA_VERSION,
  VocabularyManifestSchema,
  VocabularyShardPayloadSchema,
  type VocabularyIndexKind,
  type VocabularyManifest,
  type VocabularyRecord,
  type VocabularyShardEntry,
  type VocabularyShardPayload,
} from "@tavern-canvas/contracts";

export const MANIFEST_FILE_NAME = "manifest.json";

/** A logical shard the index builders produced, ready to be encoded and written to disk. */
export interface VocabularyShardFile {
  readonly shard_id: string;
  readonly kind: VocabularyIndexKind;
  readonly path: string;
  readonly payload: VocabularyShardPayload;
}

export class VocabularyPackageError extends Error {
  readonly cause_kind: "io" | "verification";

  constructor(message: string, cause_kind: "io" | "verification") {
    super(message);
    this.name = "VocabularyPackageError";
    this.cause_kind = cause_kind;
  }
}

export interface WritePackageInput {
  readonly output_directory: string;
  readonly package_id: string;
  readonly data_version: string;
  readonly minimum_extension_version: string;
  readonly changelog: string;
  readonly records: readonly VocabularyRecord[];
  readonly shards: readonly VocabularyShardFile[];
}

interface EncodedShard {
  readonly entry: VocabularyShardEntry;
  readonly path: string;
  readonly bytes: Uint8Array;
}

function is_enoent(error: unknown): boolean {
  return (
    error instanceof Error && "code" in error && (error as NodeJS.ErrnoException).code === "ENOENT"
  );
}

function compute_sha256_hex(bytes: Uint8Array): string {
  return bytesToHex(sha256(bytes));
}

/**
 * Serializes a decoded shard payload to its on-disk bytes: MessagePack, then
 * gzip at level 9. Node's zlib already emits mtime=0 and a fixed OS byte for
 * every call, so no extra options are needed for byte-reproducibility.
 */
function encode_shard_payload(payload: VocabularyShardPayload): Uint8Array {
  return gzipSync(encode(payload), { level: 9 });
}

function encode_shards(package_id: string, shards: readonly VocabularyShardFile[]): EncodedShard[] {
  return shards
    .map((shard) => {
      const bytes = encode_shard_payload(shard.payload);
      return {
        entry: {
          shard_id: shard.shard_id,
          package_id,
          kind: shard.kind,
          path: shard.path,
          sha256: compute_sha256_hex(bytes),
          byte_length: bytes.length,
        } satisfies VocabularyShardEntry,
        path: shard.path,
        bytes,
      };
    })
    .sort((left, right) => (left.entry.shard_id < right.entry.shard_id ? -1 : 1));
}

function serialize_manifest(manifest: VocabularyManifest): string {
  return `${JSON.stringify(manifest, null, 2)}\n`;
}

function build_manifest(
  input: Pick<
    WritePackageInput,
    "package_id" | "data_version" | "minimum_extension_version" | "changelog" | "records"
  >,
  shard_entries: VocabularyShardEntry[],
): VocabularyManifest {
  return {
    package_id: input.package_id,
    schema_version: VOCABULARY_SCHEMA_VERSION,
    data_version: input.data_version,
    changelog: input.changelog,
    record_count: input.records.length,
    compressed_size: shard_entries.reduce((total, entry) => total + entry.byte_length, 0),
    minimum_extension_version: input.minimum_extension_version,
    shards: shard_entries,
  };
}

/**
 * Re-reads every shard named in `manifest` from `directory` and checks that
 * its size, hash, gzip framing, MessagePack framing, and declared `kind`
 * all match. Shared by the build path's pre-publish self-check and the
 * standalone `verify` command so both apply exactly one verification rule.
 */
async function verify_directory_against_manifest(
  directory: string,
  manifest: VocabularyManifest,
): Promise<void> {
  for (const shard of manifest.shards) {
    const shard_path = join(directory, shard.path);
    let compressed_bytes: Buffer;
    try {
      compressed_bytes = await readFile(shard_path);
    } catch (error) {
      throw new VocabularyPackageError(
        `shard "${shard.shard_id}" is missing at "${shard.path}": ${String(error)}`,
        "verification",
      );
    }

    if (compressed_bytes.length !== shard.byte_length) {
      throw new VocabularyPackageError(
        `shard "${shard.shard_id}" byte length mismatch: manifest says ${String(shard.byte_length)}, disk has ${String(compressed_bytes.length)}`,
        "verification",
      );
    }

    const digest = compute_sha256_hex(compressed_bytes);
    if (digest !== shard.sha256) {
      throw new VocabularyPackageError(
        `shard "${shard.shard_id}" hash mismatch: manifest says ${shard.sha256}, disk has ${digest}`,
        "verification",
      );
    }

    let decompressed: Buffer;
    try {
      decompressed = gunzipSync(compressed_bytes);
    } catch (error) {
      throw new VocabularyPackageError(
        `shard "${shard.shard_id}" is not valid gzip: ${String(error)}`,
        "verification",
      );
    }

    let decoded: unknown;
    try {
      decoded = decode(decompressed);
    } catch (error) {
      throw new VocabularyPackageError(
        `shard "${shard.shard_id}" is not valid MessagePack: ${String(error)}`,
        "verification",
      );
    }

    const payload_result = VocabularyShardPayloadSchema.safeParse(decoded);
    if (!payload_result.success) {
      throw new VocabularyPackageError(
        `shard "${shard.shard_id}" payload failed schema validation: ${payload_result.error.message}`,
        "verification",
      );
    }
    if (payload_result.data.kind !== shard.kind) {
      throw new VocabularyPackageError(
        `shard "${shard.shard_id}" declares kind "${shard.kind}" but payload kind is "${payload_result.data.kind}"`,
        "verification",
      );
    }
  }
}

async function replace_directory_atomically(
  staging_directory: string,
  output_directory: string,
): Promise<void> {
  const backup_directory = `${output_directory}.previous-${randomUUID()}`;
  let had_previous = false;

  try {
    await rename(output_directory, backup_directory);
    had_previous = true;
  } catch (error) {
    if (!is_enoent(error)) {
      await rm(staging_directory, { recursive: true, force: true });
      throw new VocabularyPackageError(
        `cannot move aside existing package at "${output_directory}": ${String(error)}`,
        "io",
      );
    }
  }

  try {
    await rename(staging_directory, output_directory);
  } catch (error) {
    if (had_previous) {
      await rename(backup_directory, output_directory).catch(() => undefined);
    }
    await rm(staging_directory, { recursive: true, force: true });
    throw new VocabularyPackageError(
      `cannot activate staged package at "${output_directory}": ${String(error)}`,
      "io",
    );
  }

  if (had_previous) {
    await rm(backup_directory, { recursive: true, force: true }).catch(() => undefined);
  }
}

/**
 * Encodes every shard, writes them plus `manifest.json` into a staging
 * directory beside `output_directory`, self-verifies the staged bytes
 * against the manifest, and only then atomically renames staging into
 * place. On any failure the staging directory is removed and the previous
 * `output_directory` (if any) is left untouched — a package is never
 * partially overwritten.
 */
export async function write_vocabulary_package(
  input: WritePackageInput,
): Promise<VocabularyManifest> {
  const encoded_shards = encode_shards(input.package_id, input.shards);
  const manifest_result = VocabularyManifestSchema.safeParse(
    build_manifest(
      input,
      encoded_shards.map((shard) => shard.entry),
    ),
  );
  if (!manifest_result.success) {
    throw new VocabularyPackageError(
      `assembled manifest failed schema validation: ${manifest_result.error.message}`,
      "verification",
    );
  }
  const manifest = manifest_result.data;

  const output_directory = resolve(input.output_directory);
  const parent_directory = dirname(output_directory);
  const staging_directory = join(parent_directory, `.vocabulary-staging-${randomUUID()}`);

  try {
    await mkdir(staging_directory, { recursive: true });
    for (const shard of encoded_shards) {
      const shard_path = join(staging_directory, shard.path);
      await mkdir(dirname(shard_path), { recursive: true });
      await writeFile(shard_path, shard.bytes);
    }
    await writeFile(join(staging_directory, MANIFEST_FILE_NAME), serialize_manifest(manifest));
    await verify_directory_against_manifest(staging_directory, manifest);
  } catch (error) {
    await rm(staging_directory, { recursive: true, force: true });
    if (error instanceof VocabularyPackageError) {
      throw error;
    }
    throw new VocabularyPackageError(`failed to stage vocabulary package: ${String(error)}`, "io");
  }

  await replace_directory_atomically(staging_directory, output_directory);
  return manifest;
}

/**
 * Re-validates a previously written package on disk: manifest schema,
 * then every shard's size, hash, gzip/MessagePack framing, and kind.
 */
export async function verify_vocabulary_package(
  package_directory: string,
): Promise<VocabularyManifest> {
  const manifest_path = join(package_directory, MANIFEST_FILE_NAME);
  let manifest_text: string;
  try {
    manifest_text = await readFile(manifest_path, "utf8");
  } catch (error) {
    throw new VocabularyPackageError(
      `cannot read manifest at "${manifest_path}": ${String(error)}`,
      "verification",
    );
  }

  let manifest_json: unknown;
  try {
    manifest_json = JSON.parse(manifest_text);
  } catch (error) {
    throw new VocabularyPackageError(
      `manifest at "${manifest_path}" is not valid JSON: ${String(error)}`,
      "verification",
    );
  }

  const manifest_result = VocabularyManifestSchema.safeParse(manifest_json);
  if (!manifest_result.success) {
    throw new VocabularyPackageError(
      `manifest at "${manifest_path}" failed schema validation: ${manifest_result.error.message}`,
      "verification",
    );
  }

  await verify_directory_against_manifest(package_directory, manifest_result.data);
  return manifest_result.data;
}
