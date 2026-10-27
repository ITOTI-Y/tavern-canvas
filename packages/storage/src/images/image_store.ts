import { sha256 } from "@noble/hashes/sha2.js";
import { bytesToHex } from "@noble/hashes/utils.js";
import type { IDBPDatabase } from "idb";

import { Sha256Schema, type DBSchema, type ImageBlob, type Sha256 } from "../database_schema.js";
import { IndexedDbRepository, RepositoryNotFoundError } from "../repository.js";
import { ImageBlobRepository } from "../repositories/business_repositories.js";
import {
  with_transaction,
  type StorageTransaction,
  type StorageWriteTransaction,
} from "../transaction.js";
import {
  detect_image_media_type,
  GalleryImageRecordSchema,
  ImageRecordUnionSchema,
  is_gallery_image_record,
  type GalleryImageRecord,
  type ImageMediaType,
  type ImageRecordFields,
} from "./image_schema.js";

export type {
  GalleryImageRecord,
  ImageMediaType,
  ImageRecordFields,
  SourceMessageIdentity,
} from "./image_schema.js";

const IMAGE_STORES = ["image_records", "image_blobs"] as const;

export class ImageCorruptionError extends Error {
  readonly code = "image_hash_mismatch" as const;
  readonly sha256: Sha256;

  constructor(sha256_value: Sha256) {
    super(`Image blob content no longer matches its sha256 key: ${sha256_value}`);
    this.name = "ImageCorruptionError";
    this.sha256 = sha256_value;
  }
}

export class ImageMediaTypeError extends Error {
  constructor(claimed_media_type: string) {
    super(`Image bytes do not match the claimed media type: ${claimed_media_type}`);
    this.name = "ImageMediaTypeError";
  }
}

export class GalleryImageRecordRepository extends IndexedDbRepository<
  "image_records",
  GalleryImageRecord
> {
  constructor(database: IDBPDatabase<DBSchema>) {
    // rejects_provider_secrets stays false: it only scans the generic `payload`, which gallery
    // records never set.
    super(database, "image_records", GalleryImageRecordSchema);
  }
}

export interface StoredImageBlob {
  readonly sha256: Sha256;
  readonly byte_length: number;
  readonly media_type: ImageMediaType;
  readonly ref_count: number;
}

export type PutImageRecordMetadata = Omit<ImageRecordFields, "media_type" | "quarantined">;

export interface PutImageRecordInput {
  readonly id: string;
  readonly bytes: Uint8Array;
  readonly claimed_media_type: string;
  readonly created_at: string;
  readonly metadata: PutImageRecordMetadata;
  readonly pinned?: boolean;
}

async function to_bytes(data: Blob | ArrayBuffer): Promise<Uint8Array> {
  if (data instanceof ArrayBuffer) {
    return new Uint8Array(data);
  }
  return new Uint8Array(await data.arrayBuffer());
}

async function count_referencing_image_records(
  transaction: StorageWriteTransaction,
  sha256_value: Sha256,
): Promise<number> {
  return transaction.objectStore("image_records").index("sha256").count(sha256_value);
}

export async function put_image_blob(
  transaction: StorageWriteTransaction,
  blobs: ImageBlobRepository,
  bytes: Uint8Array,
  claimed_media_type: string,
): Promise<StoredImageBlob> {
  const media_type = detect_image_media_type(bytes);
  if (media_type === undefined || media_type !== claimed_media_type) {
    throw new ImageMediaTypeError(claimed_media_type);
  }

  const digest = Sha256Schema.parse(bytesToHex(sha256(bytes)));
  const existing = await blobs.get(digest, transaction);
  if (existing === null) {
    // The blob row can be absent while records still reference the content (LRU eviction deletes only
    // `image_blobs`), so ref_count is rebuilt from the index; `+ 1` is the reference this call adds.
    const referencing_count = await count_referencing_image_records(transaction, digest);
    const ref_count = referencing_count + 1;
    const blob: ImageBlob = {
      sha256: digest,
      ref_count,
      byte_length: bytes.byteLength,
      blob: new Blob([new Uint8Array(bytes)], { type: media_type }),
    };
    await blobs.create(blob, transaction);
    return { sha256: digest, byte_length: blob.byte_length, media_type, ref_count };
  }

  const updated: ImageBlob = { ...existing, ref_count: existing.ref_count + 1 };
  await blobs.put(updated, transaction);
  return {
    sha256: digest,
    byte_length: existing.byte_length,
    media_type,
    ref_count: updated.ref_count,
  };
}

export async function release_image_blob(
  transaction: StorageWriteTransaction,
  blobs: ImageBlobRepository,
  sha256_value: string,
): Promise<boolean> {
  const key = Sha256Schema.parse(sha256_value);
  const existing = await blobs.get(key, transaction);
  if (existing === null) {
    return false;
  }
  if (existing.ref_count <= 1) {
    await blobs.delete(key, transaction);
    return true;
  }
  await blobs.put({ ...existing, ref_count: existing.ref_count - 1 }, transaction);
  return false;
}

export async function read_image_blob(
  transaction: StorageTransaction,
  blobs: ImageBlobRepository,
  sha256_value: string,
): Promise<Uint8Array | null> {
  const key = Sha256Schema.parse(sha256_value);
  const existing = await blobs.get(key, transaction);
  if (existing === null) {
    return null;
  }
  const bytes = await to_bytes(existing.blob);
  const actual_digest = bytesToHex(sha256(bytes));
  if (actual_digest !== key) {
    throw new ImageCorruptionError(key);
  }
  return bytes;
}

export async function create_image_record(
  transaction: StorageWriteTransaction,
  records: GalleryImageRecordRepository,
  blobs: ImageBlobRepository,
  namespace: string,
  input: PutImageRecordInput,
): Promise<GalleryImageRecord> {
  const blob = await put_image_blob(transaction, blobs, input.bytes, input.claimed_media_type);
  const record: GalleryImageRecord = {
    schema_version: 1,
    id: input.id,
    namespace,
    record_key: `${namespace}:${input.id}`,
    created_at: input.created_at,
    updated_at: input.created_at,
    sha256: blob.sha256,
    last_accessed_at: input.created_at,
    pinned: input.pinned ?? false,
    ...input.metadata,
    media_type: blob.media_type,
    quarantined: false,
  };
  await records.create(namespace, record, transaction);
  return record;
}

export async function delete_image_record_entry(
  transaction: StorageWriteTransaction,
  records: GalleryImageRecordRepository,
  blobs: ImageBlobRepository,
  namespace: string,
  id: string,
): Promise<{ readonly sha256: Sha256; readonly blob_deleted: boolean }> {
  const existing = await records.get(namespace, id, transaction);
  if (existing === null) {
    throw new RepositoryNotFoundError("image_records", `${namespace}:${id}`);
  }
  await records.delete(namespace, id, transaction);
  const blob_deleted = await release_image_blob(transaction, blobs, existing.sha256);
  return { sha256: existing.sha256, blob_deleted };
}

// `quarantined` exists only on the gallery shape: base-shape rows sharing the sha256 are skipped,
// and rows matching neither shape are left untouched.
async function quarantine_records_for_sha256(
  transaction: StorageWriteTransaction,
  records: GalleryImageRecordRepository,
  sha256_value: Sha256,
): Promise<void> {
  const index = transaction.objectStore("image_records").index("sha256");
  const raw_matches = await index.getAll(sha256_value);
  for (const raw of raw_matches) {
    const parsed = ImageRecordUnionSchema.safeParse(raw);
    if (!parsed.success || !is_gallery_image_record(parsed.data)) {
      continue;
    }
    const record = parsed.data;
    if (record.quarantined) {
      continue;
    }
    await records.update(record.namespace, { ...record, quarantined: true }, transaction);
  }
}

export async function put_image(
  database: IDBPDatabase<DBSchema>,
  namespace: string,
  input: PutImageRecordInput,
): Promise<GalleryImageRecord> {
  const records = new GalleryImageRecordRepository(database);
  const blobs = new ImageBlobRepository(database);
  return with_transaction(database, IMAGE_STORES, (transaction) =>
    create_image_record(transaction, records, blobs, namespace, input),
  );
}

export async function delete_image_record(
  database: IDBPDatabase<DBSchema>,
  namespace: string,
  id: string,
): Promise<{ readonly sha256: Sha256; readonly blob_deleted: boolean }> {
  const records = new GalleryImageRecordRepository(database);
  const blobs = new ImageBlobRepository(database);
  return with_transaction(database, IMAGE_STORES, (transaction) =>
    delete_image_record_entry(transaction, records, blobs, namespace, id),
  );
}

export async function read_image_bytes(
  database: IDBPDatabase<DBSchema>,
  sha256_value: string,
): Promise<Uint8Array | null> {
  const records = new GalleryImageRecordRepository(database);
  const blobs = new ImageBlobRepository(database);
  // The quarantine write is committed although the read fails: corruption is captured as a value and
  // re-thrown after the transaction settles.
  const outcome = await with_transaction(database, IMAGE_STORES, async (transaction) => {
    try {
      return { bytes: await read_image_blob(transaction, blobs, sha256_value) };
    } catch (error) {
      if (!(error instanceof ImageCorruptionError)) {
        throw error;
      }
      await quarantine_records_for_sha256(transaction, records, error.sha256);
      return { error };
    }
  });
  if ("error" in outcome) {
    throw outcome.error;
  }
  return outcome.bytes;
}
