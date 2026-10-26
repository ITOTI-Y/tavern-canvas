import { sha256 } from "@noble/hashes/sha2.js";
import { bytesToHex } from "@noble/hashes/utils.js";
import {
  ARCHIVE_EXCLUDED_SECRET_CATEGORIES,
  ARCHIVE_FORMAT,
  ARCHIVE_RECORD_STORES,
  ARCHIVE_SCHEMA_VERSION,
  type ArchiveManifest,
  type ArchiveRecordStore,
} from "@tavern-canvas/contracts";

export const MANIFEST_PATH = "manifest.json";
export const CHECKSUMS_PATH = "checksums.json";
export const ASSET_DIRECTORY = "assets";

/**
 * Checked against the central directory's declared size before decompression, so a forged size is
 * rejected without inflating the payload (zip-bomb defense).
 */
export const MAX_ENTRY_UNCOMPRESSED_BYTES = 512 * 1024 * 1024;

const ASSET_PATH_PATTERN = /^assets\/([a-f0-9]{64})\.([a-z0-9]{1,8})$/u;

export function record_path(store: ArchiveRecordStore): string {
  return `records/${store}.jsonl`;
}

// Asset paths are matched by pattern. Together with these, they form the allowlist import uses to
// reject unexpected or path-traversal entries.
export const FIXED_ENTRY_PATHS: ReadonlySet<string> = new Set([
  MANIFEST_PATH,
  CHECKSUMS_PATH,
  ...ARCHIVE_RECORD_STORES.map(record_path),
]);

export function is_known_archive_path(path: string): boolean {
  return FIXED_ENTRY_PATHS.has(path) || parse_asset_path(path) !== null;
}

export function asset_path(sha256_hex: string, extension: string): string {
  return `${ASSET_DIRECTORY}/${sha256_hex}.${extension}`;
}

export function parse_asset_path(path: string): { sha256: string; extension: string } | null {
  const match = ASSET_PATH_PATTERN.exec(path);
  if (match === null) {
    return null;
  }
  const [, sha256_hex, extension] = match;
  if (sha256_hex === undefined || extension === undefined) {
    return null;
  }
  return { sha256: sha256_hex, extension };
}

const MAGIC_BYTE_SIGNATURES: readonly {
  extension: string;
  bytes: readonly number[];
  offset?: number;
}[] = [
  { extension: "png", bytes: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a] },
  { extension: "jpg", bytes: [0xff, 0xd8, 0xff] },
  { extension: "gif", bytes: [0x47, 0x49, 0x46, 0x38] },
];

function matches_signature(
  bytes: Uint8Array,
  signature: readonly number[],
  offset: number,
): boolean {
  if (bytes.length < offset + signature.length) {
    return false;
  }
  return signature.every((byte, index) => bytes[offset + index] === byte);
}

export function detect_asset_extension(bytes: Uint8Array): string {
  for (const signature of MAGIC_BYTE_SIGNATURES) {
    if (matches_signature(bytes, signature.bytes, signature.offset ?? 0)) {
      return signature.extension;
    }
  }
  if (
    matches_signature(bytes, [0x52, 0x49, 0x46, 0x46], 0) &&
    matches_signature(bytes, [0x57, 0x45, 0x42, 0x50], 8)
  ) {
    return "webp";
  }
  return "bin";
}

export function compute_sha256_hex(bytes: Uint8Array): string {
  return bytesToHex(sha256(bytes));
}

export function create_empty_record_counts(): Record<ArchiveRecordStore, number> {
  const counts = {} as Record<ArchiveRecordStore, number>;
  for (const store of ARCHIVE_RECORD_STORES) {
    counts[store] = 0;
  }
  return counts;
}

export interface BuildManifestInput {
  readonly extension_version: string;
  readonly created_at: string;
  readonly record_counts: Record<ArchiveRecordStore, number>;
  readonly asset_count: number;
}

export function build_manifest(input: BuildManifestInput): ArchiveManifest {
  return {
    format: ARCHIVE_FORMAT,
    schema_version: ARCHIVE_SCHEMA_VERSION,
    extension_version: input.extension_version,
    created_at: input.created_at,
    record_counts: input.record_counts,
    asset_count: input.asset_count,
    excluded_secret_categories: [...ARCHIVE_EXCLUDED_SECRET_CATEGORIES],
  };
}
