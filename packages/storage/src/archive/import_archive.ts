import {
  BlobReader,
  type Entry,
  type FileEntry,
  Uint8ArrayReader,
  Uint8ArrayWriter,
  ZipReader,
} from "@zip.js/zip.js";
import type { IDBPDatabase } from "idb";
import type { ZodType } from "zod";

import {
  ARCHIVE_RECORD_STORES,
  ARCHIVE_SCHEMA_VERSION,
  ArchiveChecksumsSchema,
  ArchiveManifestSchema,
  type ArchiveChecksums,
  type ArchiveManifest,
  type ArchiveRecordStore,
} from "@tavern-canvas/contracts";

import {
  RECORD_SCHEMAS,
  type DBSchema,
  type GenerationJob,
  type MigrationJournal,
  type NamespacedRecord,
  type VocabularyGroup,
} from "../database_schema.js";
import {
  detect_image_media_type,
  ImageRecordUnionSchema,
  type ImageRecordUnion,
} from "../images/image_schema.js";
import {
  create_business_repositories,
  type BusinessRepositories,
  type ImageBlobRepository,
} from "../repositories/business_repositories.js";
import { with_transaction } from "../transaction.js";
import {
  CHECKSUMS_PATH,
  MANIFEST_PATH,
  MAX_ENTRY_UNCOMPRESSED_BYTES,
  compute_sha256_hex,
  create_empty_record_counts,
  is_known_archive_path,
  parse_asset_path,
  record_path,
} from "./archive_manifest.js";

export type ArchiveImportFailureReason =
  | "invalid_input"
  | "unsupported_schema"
  | "invalid_manifest"
  | "invalid_checksums"
  | "unexpected_path"
  | "duplicate_path"
  | "missing_file"
  | "undeclared_file"
  | "checksum_mismatch"
  | "size_limit_exceeded"
  | "malformed_record"
  | "invalid_record"
  | "count_mismatch"
  | "reference_mismatch"
  | "cancelled";

export class ArchiveImportError extends Error {
  readonly reason: ArchiveImportFailureReason;
  /** The staging namespace that was rolled back, when the failure happened after it was allocated. */
  readonly namespace: string | undefined;

  constructor(reason: ArchiveImportFailureReason, message: string, namespace?: string) {
    super(message);
    this.name = "ArchiveImportError";
    this.reason = reason;
    this.namespace = namespace;
  }
}

export interface ImportArchiveOptions {
  readonly database: IDBPDatabase<DBSchema>;
  readonly archive: Blob | ArrayBuffer;
  readonly signal?: AbortSignal;
}

export interface ImportArchiveResult {
  readonly namespace: string;
  readonly manifest: ArchiveManifest;
  readonly asset_count: number;
}

function is_abort_error(error: unknown): boolean {
  return error instanceof DOMException && error.name === "AbortError";
}

function assert_not_aborted(signal: AbortSignal | undefined): void {
  if (signal?.aborted === true) {
    throw new ArchiveImportError("cancelled", "Import was cancelled");
  }
}

function to_zip_reader(archive: Blob | ArrayBuffer): BlobReader | Uint8ArrayReader {
  if (typeof Blob !== "undefined" && archive instanceof Blob) {
    return new BlobReader(archive);
  }
  return new Uint8ArrayReader(new Uint8Array(archive as ArrayBuffer));
}

async function close_quietly(zip_reader: ZipReader<unknown>): Promise<void> {
  try {
    await zip_reader.close();
  } catch {
    // The archive is already being rejected; the close failure is not the reportable cause.
  }
}

async function read_entry_bytes(
  entry: FileEntry,
  signal: AbortSignal | undefined,
): Promise<Uint8Array> {
  if (entry.uncompressedSize > MAX_ENTRY_UNCOMPRESSED_BYTES) {
    throw new ArchiveImportError(
      "size_limit_exceeded",
      `Entry exceeds the maximum allowed uncompressed size: ${entry.filename}`,
    );
  }
  return entry.getData(new Uint8ArrayWriter(), signal === undefined ? {} : { signal });
}

function extract_schema_version(value: unknown): number | undefined {
  if (typeof value !== "object" || value === null) {
    return undefined;
  }
  const candidate = (value as Record<string, unknown>).schema_version;
  return typeof candidate === "number" ? candidate : undefined;
}

interface ManifestRead {
  readonly bytes: Uint8Array;
  readonly manifest: ArchiveManifest;
}

async function read_manifest(
  entries_by_path: ReadonlyMap<string, FileEntry>,
  signal: AbortSignal | undefined,
): Promise<ManifestRead> {
  const entry = entries_by_path.get(MANIFEST_PATH);
  if (entry === undefined) {
    throw new ArchiveImportError("missing_file", `Archive is missing ${MANIFEST_PATH}`);
  }
  const bytes = await read_entry_bytes(entry, signal);
  let parsed_json: unknown;
  try {
    parsed_json = JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    throw new ArchiveImportError("invalid_manifest", `${MANIFEST_PATH} is not valid JSON`);
  }
  if (extract_schema_version(parsed_json) !== ARCHIVE_SCHEMA_VERSION) {
    throw new ArchiveImportError(
      "unsupported_schema",
      `Archive declares an unsupported schema version`,
    );
  }
  const result = ArchiveManifestSchema.safeParse(parsed_json);
  if (!result.success) {
    throw new ArchiveImportError("invalid_manifest", `${MANIFEST_PATH} failed schema validation`);
  }
  return { bytes, manifest: result.data };
}

async function read_checksums(
  entries_by_path: ReadonlyMap<string, FileEntry>,
  signal: AbortSignal | undefined,
): Promise<ArchiveChecksums> {
  const entry = entries_by_path.get(CHECKSUMS_PATH);
  if (entry === undefined) {
    throw new ArchiveImportError("missing_file", `Archive is missing ${CHECKSUMS_PATH}`);
  }
  const bytes = await read_entry_bytes(entry, signal);
  let parsed_json: unknown;
  try {
    parsed_json = JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    throw new ArchiveImportError("invalid_checksums", `${CHECKSUMS_PATH} is not valid JSON`);
  }
  const result = ArchiveChecksumsSchema.safeParse(parsed_json);
  if (!result.success) {
    throw new ArchiveImportError("invalid_checksums", `${CHECKSUMS_PATH} failed schema validation`);
  }
  return result.data;
}

function validate_path_sets(
  entries_by_path: ReadonlyMap<string, FileEntry>,
  checksums: ArchiveChecksums,
): void {
  for (const path of Object.keys(checksums)) {
    if (!entries_by_path.has(path)) {
      throw new ArchiveImportError(
        "missing_file",
        `Archive is missing a file declared in ${CHECKSUMS_PATH}: ${path}`,
      );
    }
  }
  for (const path of entries_by_path.keys()) {
    if (path === CHECKSUMS_PATH) {
      continue;
    }
    if (!(path in checksums)) {
      throw new ArchiveImportError(
        "undeclared_file",
        `Archive contains a file not declared in ${CHECKSUMS_PATH}: ${path}`,
      );
    }
  }
}

function verify_checksum(path: string, bytes: Uint8Array, checksums: ArchiveChecksums): void {
  const expected = checksums[path];
  if (expected === undefined) {
    throw new ArchiveImportError("missing_file", `${CHECKSUMS_PATH} has no entry for ${path}`);
  }
  if (bytes.byteLength !== expected.byte_length || compute_sha256_hex(bytes) !== expected.sha256) {
    throw new ArchiveImportError("checksum_mismatch", `Checksum mismatch for ${path}`);
  }
}

/**
 * `image_records` alone validates through `ImageRecordUnionSchema`: the
 * store holds both migrated (base-shape) and runtime gallery (flat-shape)
 * rows, and `RECORD_SCHEMAS.image_records` only recognizes the base shape —
 * an archive containing an exported gallery row would otherwise fail import
 * with `invalid_record` (Stage 04 review finding I1).
 */
function record_schema_for(store: ArchiveRecordStore): ZodType<NamespacedRecord> {
  return store === "image_records" ? ImageRecordUnionSchema : RECORD_SCHEMAS[store];
}

function parse_jsonl_records(
  store: ArchiveRecordStore,
  path: string,
  bytes: Uint8Array,
): NamespacedRecord[] {
  const text = new TextDecoder().decode(bytes);
  if (text.length === 0) {
    return [];
  }
  const schema = record_schema_for(store);
  return text
    .split("\n")
    .filter((line) => line.length > 0)
    .map((line, index) => {
      let parsed_json: unknown;
      try {
        parsed_json = JSON.parse(line);
      } catch {
        throw new ArchiveImportError(
          "malformed_record",
          `${path}:${String(index + 1)} is not valid JSON`,
        );
      }
      const result = schema.safeParse(parsed_json);
      if (!result.success) {
        throw new ArchiveImportError(
          "invalid_record",
          `${path}:${String(index + 1)} failed schema validation`,
        );
      }
      return result.data;
    });
}

function restage_record<T extends NamespacedRecord>(record: T, namespace: string): T {
  return { ...record, namespace, record_key: `${namespace}:${record.id}` };
}

interface BlobDelta {
  readonly created: boolean;
  readonly delta: number;
}

async function write_image_blob(
  repository: ImageBlobRepository,
  sha256_hex: string,
  bytes: Uint8Array,
  ref_count: number,
  blob_deltas: Map<string, BlobDelta>,
): Promise<void> {
  const existing = await repository.get(sha256_hex);
  if (existing === null) {
    const media_type = detect_image_media_type(bytes);
    const blob_bytes = new Uint8Array(bytes);
    await repository.create({
      sha256: sha256_hex,
      ref_count,
      byte_length: bytes.byteLength,
      blob:
        media_type === undefined
          ? new Blob([blob_bytes])
          : new Blob([blob_bytes], { type: media_type }),
    });
    blob_deltas.set(sha256_hex, { created: true, delta: ref_count });
  } else {
    await repository.update({ ...existing, ref_count: existing.ref_count + ref_count });
    blob_deltas.set(sha256_hex, { created: false, delta: ref_count });
  }
}

async function rollback_staged_records(
  database: IDBPDatabase<DBSchema>,
  repositories: BusinessRepositories,
  namespace: string,
): Promise<void> {
  for (const store of ARCHIVE_RECORD_STORES) {
    const records = await repositories[store].list(namespace);
    if (records.length === 0) {
      continue;
    }
    await with_transaction(database, [store], async (transaction) => {
      for (const record of records) {
        await repositories[store].delete(namespace, record.id, transaction);
      }
    });
  }
}

async function rollback_image_blobs(
  repository: ImageBlobRepository,
  blob_deltas: ReadonlyMap<string, BlobDelta>,
): Promise<void> {
  for (const [sha256_hex, delta] of blob_deltas) {
    if (delta.created) {
      await repository.delete(sha256_hex);
      continue;
    }
    const existing = await repository.get(sha256_hex);
    if (existing !== null) {
      await repository.update({
        ...existing,
        ref_count: Math.max(0, existing.ref_count - delta.delta),
      });
    }
  }
}

/**
 * Stages a verified archive into a fresh `import:<uuid>` namespace and, only on full success,
 * writes an `import_ready` marker to `migration_journal` keyed by that same namespace name.
 * `switch_active_namespace()` is the only code allowed to promote the namespace to active; this
 * function never touches the active namespace, and any failure or cancellation sweeps the
 * staging namespace clean before rejecting.
 */
export async function import_archive(options: ImportArchiveOptions): Promise<ImportArchiveResult> {
  const { database, signal } = options;
  const reader = to_zip_reader(options.archive);
  const zip_reader = new ZipReader(reader, signal === undefined ? {} : { signal });

  let entries: Entry[];
  try {
    entries = await zip_reader.getEntries();
  } catch (error) {
    await close_quietly(zip_reader);
    if (is_abort_error(error) || signal?.aborted === true) {
      throw new ArchiveImportError("cancelled", "Import was cancelled");
    }
    throw new ArchiveImportError(
      "invalid_input",
      `Archive could not be read: ${error instanceof Error ? error.message : String(error)}`,
    );
  }

  const entries_by_path = new Map<string, FileEntry>();
  for (const entry of entries) {
    if (entry.directory) {
      await close_quietly(zip_reader);
      throw new ArchiveImportError(
        "unexpected_path",
        `Unexpected directory entry: ${entry.filename}`,
      );
    }
    if (entries_by_path.has(entry.filename)) {
      await close_quietly(zip_reader);
      throw new ArchiveImportError(
        "duplicate_path",
        `Duplicate path in archive: ${entry.filename}`,
      );
    }
    if (!is_known_archive_path(entry.filename)) {
      await close_quietly(zip_reader);
      throw new ArchiveImportError(
        "unexpected_path",
        `Unexpected path in archive: ${entry.filename}`,
      );
    }
    entries_by_path.set(entry.filename, entry);
  }

  const namespace = `import:${crypto.randomUUID()}`;
  const repositories = create_business_repositories(database);
  const blob_deltas = new Map<string, BlobDelta>();

  try {
    const manifest_read = await read_manifest(entries_by_path, signal);
    const checksums = await read_checksums(entries_by_path, signal);
    validate_path_sets(entries_by_path, checksums);
    verify_checksum(MANIFEST_PATH, manifest_read.bytes, checksums);
    const manifest = manifest_read.manifest;

    const record_counts = create_empty_record_counts();
    const vocabulary_ids = new Set<string>();
    const image_record_ids = new Set<string>();
    const referenced_asset_hashes = new Map<string, number>();

    for (const store of ARCHIVE_RECORD_STORES) {
      assert_not_aborted(signal);
      const path = record_path(store);
      const entry = entries_by_path.get(path);
      if (entry === undefined) {
        throw new ArchiveImportError("missing_file", `Archive is missing ${path}`);
      }
      const bytes = await read_entry_bytes(entry, signal);
      verify_checksum(path, bytes, checksums);
      const records = parse_jsonl_records(store, path, bytes);
      record_counts[store] = records.length;
      const staged = records.map((record) => restage_record(record, namespace));

      await with_transaction(database, [store], async (transaction) => {
        for (const record of staged) {
          await repositories[store].create(namespace, record as never, transaction);
        }
      });

      if (store === "vocabularies") {
        for (const record of staged) {
          vocabulary_ids.add(record.id);
        }
      } else if (store === "vocabulary_groups") {
        for (const record of staged as VocabularyGroup[]) {
          if (!vocabulary_ids.has(record.vocabulary_id)) {
            throw new ArchiveImportError(
              "reference_mismatch",
              `vocabulary_groups ${record.id} references a missing vocabulary ${record.vocabulary_id}`,
            );
          }
        }
      } else if (store === "image_records") {
        for (const record of staged as ImageRecordUnion[]) {
          image_record_ids.add(record.id);
          referenced_asset_hashes.set(
            record.sha256,
            (referenced_asset_hashes.get(record.sha256) ?? 0) + 1,
          );
        }
      } else if (store === "generation_jobs") {
        for (const record of staged as GenerationJob[]) {
          for (const image_id of record.image_ids) {
            if (!image_record_ids.has(image_id)) {
              throw new ArchiveImportError(
                "reference_mismatch",
                `generation_jobs ${record.id} references a missing image_record ${image_id}`,
              );
            }
          }
        }
      }
    }

    let asset_count = 0;
    const encountered_asset_hashes = new Set<string>();
    for (const [path, entry] of entries_by_path) {
      const parsed = parse_asset_path(path);
      if (parsed === null) {
        continue;
      }
      assert_not_aborted(signal);
      const bytes = await read_entry_bytes(entry, signal);
      verify_checksum(path, bytes, checksums);
      const actual_sha256 = compute_sha256_hex(bytes);
      if (actual_sha256 !== parsed.sha256) {
        throw new ArchiveImportError(
          "checksum_mismatch",
          `Asset content hash does not match its filename: ${path}`,
        );
      }
      const ref_count = referenced_asset_hashes.get(parsed.sha256);
      if (ref_count === undefined) {
        throw new ArchiveImportError(
          "reference_mismatch",
          `Asset is not referenced by any image_record: ${path}`,
        );
      }
      await write_image_blob(
        repositories.image_blobs,
        parsed.sha256,
        bytes,
        ref_count,
        blob_deltas,
      );
      encountered_asset_hashes.add(parsed.sha256);
      asset_count += 1;
    }

    for (const sha256_hex of referenced_asset_hashes.keys()) {
      if (!encountered_asset_hashes.has(sha256_hex)) {
        throw new ArchiveImportError(
          "missing_file",
          `image_records reference asset ${sha256_hex} with no matching archive asset file`,
        );
      }
    }

    for (const store of ARCHIVE_RECORD_STORES) {
      if (manifest.record_counts[store] !== record_counts[store]) {
        throw new ArchiveImportError(
          "count_mismatch",
          `Declared record count for ${store} does not match the archive contents`,
        );
      }
    }
    if (manifest.asset_count !== asset_count) {
      throw new ArchiveImportError(
        "count_mismatch",
        "Declared asset count does not match the archive contents",
      );
    }

    const marker: MigrationJournal = {
      migration_id: namespace,
      source_version: ARCHIVE_SCHEMA_VERSION,
      state: "import_ready",
      updated_at: new Date().toISOString(),
      payload: {
        record_counts,
        asset_count,
        extension_version: manifest.extension_version,
      },
    };
    await repositories.migration_journal.create(marker);

    await close_quietly(zip_reader);
    return { namespace, manifest, asset_count };
  } catch (error) {
    await rollback_staged_records(database, repositories, namespace);
    await rollback_image_blobs(repositories.image_blobs, blob_deltas);
    await close_quietly(zip_reader);
    if (error instanceof ArchiveImportError) {
      throw new ArchiveImportError(error.reason, error.message, namespace);
    }
    if (is_abort_error(error) || signal?.aborted === true) {
      throw new ArchiveImportError("cancelled", "Import was cancelled", namespace);
    }
    // Any other failure (a corrupt compressed stream, a bad CRC caught by zip.js itself, etc.)
    // still means the archive is not trustworthy; report it through the same typed contract.
    throw new ArchiveImportError(
      "invalid_input",
      `Archive could not be imported: ${error instanceof Error ? error.message : String(error)}`,
      namespace,
    );
  }
}
