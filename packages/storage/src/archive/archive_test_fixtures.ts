import { type Entry, TextWriter } from "@zip.js/zip.js";
import { deleteDB, type IDBPDatabase } from "idb";

import {
  DATABASE_NAME,
  type DBSchema,
  type GenerationJob,
  type ImageBlob,
  type ImageRecord,
  type NamespacedRecord,
  type VocabularyGroup,
} from "../database_schema.js";
import type { GalleryImageRecord } from "../images/image_schema.js";
import { dispose_database, open_database } from "../open_database.js";

export const NAMESPACE = "primary";
export const NOW = "2026-08-05T00:00:00.000Z";

export const IDS = {
  first: "11111111-1111-4111-8111-111111111111",
  second: "22222222-2222-4222-8222-222222222222",
  third: "33333333-3333-4333-8333-333333333333",
  fourth: "44444444-4444-4444-8444-444444444444",
  fifth: "55555555-5555-4555-8555-555555555555",
} as const;

export async function open_test_database(): Promise<IDBPDatabase<DBSchema>> {
  return open_database();
}

export async function reset_test_database(): Promise<void> {
  await dispose_database();
  await deleteDB(DATABASE_NAME);
}

export function business_record<T extends Record<string, unknown>>(
  id: string,
  fields: T,
  namespace = NAMESPACE,
): NamespacedRecord & T {
  return {
    schema_version: 1,
    id,
    namespace,
    record_key: `${namespace}:${id}`,
    created_at: NOW,
    updated_at: NOW,
    payload: { value: id },
    ...fields,
  };
}

export function image_record(
  id: string,
  sha256_hex: string,
  namespace = NAMESPACE,
  pinned = false,
): ImageRecord {
  return business_record(
    id,
    {
      sha256: sha256_hex,
      last_accessed_at: NOW,
      pinned,
    },
    namespace,
  );
}

/** A runtime gallery-shape row (flat domain fields) — the shape `image_records` also holds alongside migrated `image_record()` rows. */
export function gallery_image_record(
  id: string,
  sha256_hex: string,
  namespace = NAMESPACE,
): GalleryImageRecord {
  return {
    schema_version: 1,
    id,
    namespace,
    record_key: `${namespace}:${id}`,
    created_at: NOW,
    updated_at: NOW,
    sha256: sha256_hex,
    last_accessed_at: NOW,
    pinned: false,
    provider_id: "sd_webui",
    source_message: { chat_id: "chat-1", message_id: "msg-1", swipe_id: 0 },
    generation_parameters: {
      generation_anchor: "a".repeat(64),
      scene_description: "A scene",
    },
    media_type: "image/png",
    quarantined: false,
  };
}

export function vocabulary_group_record(
  id: string,
  vocabulary_id: string,
  namespace = NAMESPACE,
): VocabularyGroup {
  return business_record(id, { vocabulary_id }, namespace);
}

export function job_record(
  id: string,
  image_ids: readonly string[],
  namespace = NAMESPACE,
): GenerationJob {
  return {
    schema_version: 1,
    id,
    namespace,
    record_key: `${namespace}:${id}`,
    created_at: NOW,
    updated_at: NOW,
    request_id: IDS.fourth,
    request_digest: "b".repeat(64),
    generation_anchor: "c".repeat(64),
    source_anchor: "d".repeat(64),
    chat_id: "chat-1",
    requested_swipe_id: 0,
    provider_id: "sd_webui",
    arguments: {
      generation_anchor: "e".repeat(64),
      scene_description: "A scene",
    },
    state: "queued",
    error: null,
    image_ids: [...image_ids],
  };
}

const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

export function make_asset_bytes(payload: string): Uint8Array {
  const encoded = new TextEncoder().encode(payload);
  const bytes = new Uint8Array(PNG_SIGNATURE.length + encoded.byteLength);
  bytes.set(PNG_SIGNATURE, 0);
  bytes.set(encoded, PNG_SIGNATURE.length);
  return bytes;
}

export function image_blob(sha256_hex: string, bytes: Uint8Array): ImageBlob {
  return {
    sha256: sha256_hex,
    ref_count: 1,
    byte_length: bytes.byteLength,
    blob: new Blob([new Uint8Array(bytes)]),
  };
}

export async function read_entry_text(
  entries: readonly Entry[],
  filename: string,
): Promise<string> {
  const entry = entries.find((candidate) => candidate.filename === filename);
  if (entry === undefined || entry.directory) {
    throw new Error(`Entry not found in archive: ${filename}`);
  }
  return entry.getData(new TextWriter());
}

export async function read_entry_bytes(
  entries: readonly Entry[],
  filename: string,
): Promise<Uint8Array> {
  const entry = entries.find((candidate) => candidate.filename === filename);
  if (entry === undefined || entry.directory) {
    throw new Error(`Entry not found in archive: ${filename}`);
  }
  return new Uint8Array(await entry.arrayBuffer());
}
