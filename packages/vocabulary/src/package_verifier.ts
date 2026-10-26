import { decode } from "@msgpack/msgpack";
import { sha256 } from "@noble/hashes/sha2.js";
import { bytesToHex } from "@noble/hashes/utils.js";
import { z } from "zod";

import {
  VOCABULARY_SCHEMA_VERSION,
  VocabularyIndexKindSchema,
  VocabularyManifestSchema,
  type VocabularyManifest,
  type VocabularyShardEntry,
} from "@tavern-canvas/contracts";

export type PackageVerificationFailureReason =
  | "unsupported_schema"
  | "invalid_manifest"
  | "extension_version_too_low"
  | "duplicate_shard_path"
  | "byte_length_mismatch"
  | "hash_mismatch"
  | "corrupt_gzip"
  | "decompressed_size_exceeded"
  | "corrupt_messagepack"
  | "wrong_shard_kind";

export class PackageVerificationError extends Error {
  readonly reason: PackageVerificationFailureReason;
  readonly path: string | undefined;

  constructor(reason: PackageVerificationFailureReason, message: string, path?: string) {
    super(message);
    this.name = "PackageVerificationError";
    this.reason = reason;
    this.path = path;
  }
}

export interface VerifyManifestOptions {
  readonly current_extension_version: string;
}

// Decompressed size is bounded relative to the declared byte_length so small shards cannot hide a
// large expansion; MAX_SHARD_DECOMPRESSED_BYTES is an absolute ceiling.
const MAX_DECOMPRESSION_RATIO = 128;
const MIN_DECOMPRESSED_BOUND_BYTES = 65_536;
const MAX_SHARD_DECOMPRESSED_BYTES = 32 * 1024 * 1024;

function decompressed_byte_bound(declared_byte_length: number): number {
  return Math.min(
    MAX_SHARD_DECOMPRESSED_BYTES,
    Math.max(declared_byte_length * MAX_DECOMPRESSION_RATIO, MIN_DECOMPRESSED_BOUND_BYTES),
  );
}

function extract_schema_version(value: unknown): number | undefined {
  if (typeof value !== "object" || value === null) {
    return undefined;
  }
  const candidate = (value as Record<string, unknown>).schema_version;
  return typeof candidate === "number" ? candidate : undefined;
}

export function compare_semver(left: string, right: string): number {
  const [left_release, left_prerelease] = split_semver(left);
  const [right_release, right_prerelease] = split_semver(right);

  for (let index = 0; index < 3; index += 1) {
    const left_part = left_release[index] ?? 0;
    const right_part = right_release[index] ?? 0;
    if (left_part !== right_part) {
      return left_part < right_part ? -1 : 1;
    }
  }

  if (left_prerelease === undefined && right_prerelease === undefined) {
    return 0;
  }
  if (left_prerelease === undefined) {
    return 1;
  }
  if (right_prerelease === undefined) {
    return -1;
  }
  return compare_prerelease_identifiers(left_prerelease, right_prerelease);
}

function split_semver(version: string): [readonly [number, number, number], string | undefined] {
  const release_and_prerelease = version.split("+")[0] ?? version;
  const [core, prerelease] = release_and_prerelease.split("-", 2) as [string, string | undefined];
  const parts = core.split(".").map((part) => Number.parseInt(part, 10));
  return [[parts[0] ?? 0, parts[1] ?? 0, parts[2] ?? 0], prerelease];
}

function compare_prerelease_identifiers(left: string, right: string): number {
  const left_identifiers = left.split(".");
  const right_identifiers = right.split(".");
  const length = Math.max(left_identifiers.length, right_identifiers.length);

  for (let index = 0; index < length; index += 1) {
    const left_identifier = left_identifiers[index];
    const right_identifier = right_identifiers[index];
    if (left_identifier === undefined) {
      return -1;
    }
    if (right_identifier === undefined) {
      return 1;
    }
    const left_numeric = /^\d+$/u.test(left_identifier);
    const right_numeric = /^\d+$/u.test(right_identifier);
    if (left_numeric && right_numeric) {
      const diff = Number.parseInt(left_identifier, 10) - Number.parseInt(right_identifier, 10);
      if (diff !== 0) {
        return diff < 0 ? -1 : 1;
      }
      continue;
    }
    if (left_numeric !== right_numeric) {
      return left_numeric ? -1 : 1;
    }
    if (left_identifier !== right_identifier) {
      return left_identifier < right_identifier ? -1 : 1;
    }
  }
  return 0;
}

const ShardEnvelopeSchema = z.looseObject({ kind: VocabularyIndexKindSchema });

// Checks the schema version before the full parse, the minimum-version gate and duplicate shard
// paths (the contracts schema only rejects duplicate shard_id).
export function verify_manifest(raw: unknown, options: VerifyManifestOptions): VocabularyManifest {
  if (extract_schema_version(raw) !== VOCABULARY_SCHEMA_VERSION) {
    throw new PackageVerificationError(
      "unsupported_schema",
      "Manifest declares an unsupported schema_version",
    );
  }

  const parsed = VocabularyManifestSchema.safeParse(raw);
  if (!parsed.success) {
    throw new PackageVerificationError("invalid_manifest", "Manifest failed schema validation");
  }
  const manifest = parsed.data;

  if (compare_semver(options.current_extension_version, manifest.minimum_extension_version) < 0) {
    throw new PackageVerificationError(
      "extension_version_too_low",
      `Extension version ${options.current_extension_version} is below the package's minimum ${manifest.minimum_extension_version}`,
    );
  }

  const seen_paths = new Set<string>();
  for (const shard of manifest.shards) {
    if (seen_paths.has(shard.path)) {
      throw new PackageVerificationError(
        "duplicate_shard_path",
        `Duplicate shard path in manifest: ${shard.path}`,
        shard.path,
      );
    }
    seen_paths.add(shard.path);
  }

  return manifest;
}

export interface VerifiedShard {
  readonly entry: VocabularyShardEntry;
  readonly compressed_bytes: Uint8Array;
}

async function bounded_gunzip(
  compressed: Uint8Array,
  entry: VocabularyShardEntry,
): Promise<Uint8Array> {
  const max_bytes = decompressed_byte_bound(entry.byte_length);
  const body = new Response(new Uint8Array(compressed)).body;
  if (body === null) {
    throw new PackageVerificationError(
      "corrupt_gzip",
      `No readable body for ${entry.path}`,
      entry.path,
    );
  }
  const reader = body.pipeThrough(new DecompressionStream("gzip")).getReader();

  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      total += value.byteLength;
      if (total > max_bytes) {
        await reader.cancel("decompressed_size_exceeded").catch(() => undefined);
        throw new PackageVerificationError(
          "decompressed_size_exceeded",
          `Decompressed size of ${entry.path} exceeds the allowed bound`,
          entry.path,
        );
      }
      chunks.push(value);
    }
  } catch (error) {
    if (error instanceof PackageVerificationError) {
      throw error;
    }
    throw new PackageVerificationError(
      "corrupt_gzip",
      `Corrupt gzip stream for ${entry.path}: ${error instanceof Error ? error.message : String(error)}`,
      entry.path,
    );
  }

  const combined = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    combined.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return combined;
}

export async function verify_shard_bytes(
  entry: VocabularyShardEntry,
  compressed_bytes: Uint8Array,
): Promise<VerifiedShard> {
  if (compressed_bytes.byteLength !== entry.byte_length) {
    throw new PackageVerificationError(
      "byte_length_mismatch",
      `Declared byte_length ${String(entry.byte_length)} does not match downloaded size ${String(compressed_bytes.byteLength)} for ${entry.path}`,
      entry.path,
    );
  }

  const actual_hash = bytesToHex(sha256(compressed_bytes));
  if (actual_hash !== entry.sha256) {
    throw new PackageVerificationError(
      "hash_mismatch",
      `SHA-256 mismatch for ${entry.path}`,
      entry.path,
    );
  }

  const decompressed = await bounded_gunzip(compressed_bytes, entry);

  let decoded: unknown;
  try {
    decoded = decode(decompressed);
  } catch (error) {
    throw new PackageVerificationError(
      "corrupt_messagepack",
      `MessagePack decode failed for ${entry.path}: ${error instanceof Error ? error.message : String(error)}`,
      entry.path,
    );
  }

  const envelope = ShardEnvelopeSchema.safeParse(decoded);
  if (!envelope.success) {
    throw new PackageVerificationError(
      "corrupt_messagepack",
      `Decoded shard content for ${entry.path} is not a valid envelope`,
      entry.path,
    );
  }
  if (envelope.data.kind !== entry.kind) {
    throw new PackageVerificationError(
      "wrong_shard_kind",
      `Shard ${entry.path} declares kind "${entry.kind}" but content is "${envelope.data.kind}"`,
      entry.path,
    );
  }

  return { entry, compressed_bytes };
}
