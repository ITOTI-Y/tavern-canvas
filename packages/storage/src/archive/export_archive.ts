import type { IDBPDatabase } from "idb";

import { ARCHIVE_RECORD_STORES, type ArchiveChecksums } from "@tavern-canvas/contracts";

import type { DBSchema } from "../database_schema.js";
import { create_business_repositories } from "../repositories/business_repositories.js";
import { load_zip_module } from "./_zip_module.js";
import {
  CHECKSUMS_PATH,
  MANIFEST_PATH,
  asset_path,
  build_manifest,
  compute_sha256_hex,
  create_empty_record_counts,
  detect_asset_extension,
  record_path,
} from "./archive_manifest.js";

export type ArchiveExportFailureReason = "missing_asset_blob" | "cancelled";

export class ArchiveExportError extends Error {
  readonly reason: ArchiveExportFailureReason;

  constructor(reason: ArchiveExportFailureReason, message: string) {
    super(message);
    this.name = "ArchiveExportError";
    this.reason = reason;
  }
}

export interface ExportArchiveOptions {
  readonly database: IDBPDatabase<DBSchema>;
  readonly namespace: string;
  readonly extension_version: string;
  readonly created_at?: string;
  readonly signal?: AbortSignal;
}

function is_abort_error(error: unknown): boolean {
  return error instanceof DOMException && error.name === "AbortError";
}

function assert_not_aborted(signal: AbortSignal | undefined): void {
  if (signal?.aborted === true) {
    throw new ArchiveExportError("cancelled", "Export was cancelled");
  }
}

async function read_blob_bytes(blob: Blob | ArrayBuffer): Promise<Uint8Array> {
  if (typeof Blob !== "undefined" && blob instanceof Blob) {
    return new Uint8Array(await blob.arrayBuffer());
  }
  return new Uint8Array(blob as ArrayBuffer);
}

/**
 * Streams a namespace's business records and content-addressed assets into a verified
 * TavernCanvas archive. manifest.json and checksums.json are written last because
 * checksums.json's own content depends on every other file's hash, including manifest.json's.
 */
export async function export_archive(options: ExportArchiveOptions): Promise<Blob> {
  const { database, namespace, extension_version, signal } = options;
  const created_at = options.created_at ?? new Date().toISOString();
  const repositories = create_business_repositories(database);
  const encoder = new TextEncoder();
  const zip = await load_zip_module();

  const zip_writer = new zip.ZipWriter(new zip.BlobWriter("application/zip"), {
    level: 9,
    ...(signal === undefined ? {} : { signal }),
  });

  try {
    const record_counts = create_empty_record_counts();
    const checksums: Record<string, ArchiveChecksums[string]> = {};

    for (const store of ARCHIVE_RECORD_STORES) {
      assert_not_aborted(signal);
      const records = await repositories[store].list(namespace);
      const jsonl = records.map((record) => JSON.stringify(record)).join("\n");
      const bytes = encoder.encode(records.length === 0 ? "" : `${jsonl}\n`);
      const path = record_path(store);
      await zip_writer.add(path, new zip.Uint8ArrayReader(bytes));
      checksums[path] = { sha256: compute_sha256_hex(bytes), byte_length: bytes.byteLength };
      record_counts[store] = records.length;
    }

    const image_records = await repositories.image_records.list(namespace);
    const unique_hashes = [...new Set(image_records.map((record) => record.sha256))].sort();
    for (const sha256_hex of unique_hashes) {
      assert_not_aborted(signal);
      const blob_record = await repositories.image_blobs.get(sha256_hex);
      if (blob_record === null) {
        throw new ArchiveExportError(
          "missing_asset_blob",
          `image_blobs is missing content referenced by image_records: ${sha256_hex}`,
        );
      }
      const bytes = await read_blob_bytes(blob_record.blob);
      const path = asset_path(sha256_hex, detect_asset_extension(bytes));
      await zip_writer.add(path, new zip.Uint8ArrayReader(bytes));
      checksums[path] = { sha256: compute_sha256_hex(bytes), byte_length: bytes.byteLength };
    }

    const manifest = build_manifest({
      extension_version,
      created_at,
      record_counts,
      asset_count: unique_hashes.length,
    });
    const manifest_bytes = encoder.encode(JSON.stringify(manifest));
    await zip_writer.add(MANIFEST_PATH, new zip.Uint8ArrayReader(manifest_bytes));
    checksums[MANIFEST_PATH] = {
      sha256: compute_sha256_hex(manifest_bytes),
      byte_length: manifest_bytes.byteLength,
    };

    const checksums_bytes = encoder.encode(JSON.stringify(checksums));
    await zip_writer.add(CHECKSUMS_PATH, new zip.Uint8ArrayReader(checksums_bytes));

    return await zip_writer.close();
  } catch (error) {
    if (is_abort_error(error) || signal?.aborted === true) {
      throw new ArchiveExportError("cancelled", "Export was cancelled");
    }
    throw error;
  }
}
