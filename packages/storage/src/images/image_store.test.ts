import "fake-indexeddb/auto";

import { sha256 } from "@noble/hashes/sha2.js";
import { bytesToHex } from "@noble/hashes/utils.js";
import { deleteDB } from "idb";
import { afterEach, describe, expect, it } from "vitest";

import { DATABASE_NAME } from "../database_schema.js";
import { dispose_database, open_database } from "../open_database.js";
import {
  ImageBlobRepository,
  ImageRecordRepository,
} from "../repositories/business_repositories.js";
import { type ImageRecordFields } from "./image_schema.js";
import {
  delete_image_record,
  GalleryImageRecordRepository,
  ImageCorruptionError,
  ImageMediaTypeError,
  put_image,
  read_image_bytes,
  type PutImageRecordInput,
} from "./image_store.js";

const NAMESPACE = "primary";
const NOW = "2026-08-05T00:00:00.000Z";
const LATER = "2026-08-05T00:00:01.000Z";
const IDS = {
  first: "11111111-1111-4111-8111-111111111111",
  second: "22222222-2222-4222-8222-222222222222",
  job: "33333333-3333-4333-8333-333333333333",
} as const;

function png_bytes(...extra: number[]): Uint8Array {
  return Uint8Array.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, ...extra]);
}

function jpeg_bytes(...extra: number[]): Uint8Array {
  return Uint8Array.from([0xff, 0xd8, 0xff, ...extra]);
}

function base_metadata(): Omit<ImageRecordFields, "media_type" | "quarantined"> {
  return {
    provider_id: "sd_webui",
    source_message: { chat_id: "chat-1", message_id: "msg-1", swipe_id: 0 },
    generation_parameters: {
      generation_anchor: "a".repeat(64),
      scene_description: "A scene",
    },
  };
}

function put_input(overrides: Partial<PutImageRecordInput> = {}): PutImageRecordInput {
  return {
    id: IDS.first,
    bytes: png_bytes(1, 2, 3),
    claimed_media_type: "image/png",
    created_at: NOW,
    metadata: base_metadata(),
    ...overrides,
  };
}

afterEach(async () => {
  await dispose_database();
  await deleteDB(DATABASE_NAME);
});

describe("image_store content addressing", () => {
  it("creates one blob and two image records for identical bytes", async () => {
    const database = await open_database();
    const bytes = png_bytes(1, 2, 3);

    const first = await put_image(
      database,
      NAMESPACE,
      put_input({ id: IDS.first, bytes, created_at: NOW }),
    );
    const second = await put_image(
      database,
      NAMESPACE,
      put_input({ id: IDS.second, bytes, created_at: LATER }),
    );

    expect(first.sha256).toBe(second.sha256);
    expect(first.id).not.toBe(second.id);

    const blobs = new ImageBlobRepository(database);
    expect(await blobs.list()).toHaveLength(1);
    expect((await blobs.get(first.sha256))?.ref_count).toBe(2);

    const records = new GalleryImageRecordRepository(database);
    expect(await records.list(NAMESPACE)).toHaveLength(2);
  });

  it("hashes raw blob bytes and re-verifies them after read", async () => {
    const database = await open_database();
    const bytes = png_bytes(9, 9, 9);

    const record = await put_image(database, NAMESPACE, put_input({ bytes }));
    expect(record.sha256).toBe(bytesToHex(sha256(bytes)));

    const read_bytes = await read_image_bytes(database, record.sha256);
    expect(read_bytes).toEqual(bytes);
  });

  it("updates metadata without duplicating or touching the blob store", async () => {
    const database = await open_database();
    const record = await put_image(database, NAMESPACE, put_input());

    const records = new GalleryImageRecordRepository(database);
    await records.update(NAMESPACE, { ...record, updated_at: LATER, pinned: true });

    const blobs = new ImageBlobRepository(database);
    expect(await blobs.list()).toHaveLength(1);
    expect((await blobs.get(record.sha256))?.ref_count).toBe(1);
    expect((await records.get(NAMESPACE, IDS.first))?.pinned).toBe(true);
  });

  it("keeps a blob alive when another record still references it, but retains it at zero", async () => {
    const database = await open_database();
    const bytes = png_bytes(5, 5, 5);
    const first = await put_image(
      database,
      NAMESPACE,
      put_input({ id: IDS.first, bytes, created_at: NOW }),
    );
    await put_image(database, NAMESPACE, put_input({ id: IDS.second, bytes, created_at: LATER }));

    const first_deletion = await delete_image_record(database, NAMESPACE, IDS.first);
    expect(first_deletion.blob_deleted).toBe(false);

    const blobs = new ImageBlobRepository(database);
    expect((await blobs.get(first.sha256))?.ref_count).toBe(1);

    const second_deletion = await delete_image_record(database, NAMESPACE, IDS.second);
    expect(second_deletion.blob_deleted).toBe(true);
    expect(await blobs.get(first.sha256)).toBeNull();
  });

  it("quarantines matching records and reports a stable corruption error on hash mismatch", async () => {
    const database = await open_database();
    const bytes = png_bytes(6, 6, 6);
    const record = await put_image(database, NAMESPACE, put_input({ bytes }));

    const blobs = new ImageBlobRepository(database);
    const stored = await blobs.get(record.sha256);
    if (stored === null) {
      throw new Error("expected the freshly stored blob to exist");
    }
    const corrupted_bytes = Uint8Array.from(bytes);
    const last_index = corrupted_bytes.length - 1;
    corrupted_bytes[last_index] = ((corrupted_bytes[last_index] ?? 0) ^ 0xff) & 0xff;
    await blobs.put({
      ...stored,
      blob: new Blob([corrupted_bytes], { type: "image/png" }),
    });

    const caught: unknown = await read_image_bytes(database, record.sha256).catch(
      (error: unknown) => error,
    );
    expect(caught).toBeInstanceOf(ImageCorruptionError);
    expect((caught as ImageCorruptionError).sha256).toBe(record.sha256);
    expect((caught as ImageCorruptionError).code).toBe("image_hash_mismatch");

    const records = new GalleryImageRecordRepository(database);
    expect((await records.get(NAMESPACE, IDS.first))?.quarantined).toBe(true);
  });

  it("quarantines the gallery row without crashing when a migrated (base-shape) row shares the same corrupted sha256", async () => {
    const database = await open_database();
    const bytes = png_bytes(7, 7, 7);
    const record = await put_image(database, NAMESPACE, put_input({ bytes }));

    const image_records = new ImageRecordRepository(database);
    await image_records.create(NAMESPACE, {
      schema_version: 1,
      id: IDS.second,
      namespace: NAMESPACE,
      record_key: `${NAMESPACE}:${IDS.second}`,
      created_at: NOW,
      updated_at: NOW,
      sha256: record.sha256,
      last_accessed_at: NOW,
      pinned: false,
      payload: { kind: "uploaded_configuration_image", legacy_id: "cfgimg_1" },
    });

    const blobs = new ImageBlobRepository(database);
    const stored = await blobs.get(record.sha256);
    if (stored === null) {
      throw new Error("expected the freshly stored blob to exist");
    }
    const corrupted_bytes = Uint8Array.from(bytes);
    const last_index = corrupted_bytes.length - 1;
    corrupted_bytes[last_index] = ((corrupted_bytes[last_index] ?? 0) ^ 0xff) & 0xff;
    await blobs.put({ ...stored, blob: new Blob([corrupted_bytes], { type: "image/png" }) });

    const caught: unknown = await read_image_bytes(database, record.sha256).catch(
      (error: unknown) => error,
    );
    expect(caught).toBeInstanceOf(ImageCorruptionError);

    const records = new GalleryImageRecordRepository(database);
    expect((await records.get(NAMESPACE, IDS.first))?.quarantined).toBe(true);
    // The base-shape row has no `quarantined` field to set and must be left untouched.
    const migrated_row = await image_records.get(NAMESPACE, IDS.second);
    expect(migrated_row).not.toBeNull();
    expect(migrated_row).not.toHaveProperty("quarantined");
  });

  it("stores the full gallery metadata shape without leaking secrets", async () => {
    const database = await open_database();
    const record = await put_image(
      database,
      NAMESPACE,
      put_input({
        metadata: {
          ...base_metadata(),
          width: 512,
          height: 768,
          persisted_url: "https://gateway.example.com/images/abc.png",
        },
      }),
    );

    expect(record.provider_id).toBe("sd_webui");
    expect(record.source_message).toEqual({
      chat_id: "chat-1",
      message_id: "msg-1",
      swipe_id: 0,
    });
    expect(record.generation_parameters.scene_description).toBe("A scene");
    expect(record.persisted_url).toBe("https://gateway.example.com/images/abc.png");
    expect(record.pinned).toBe(false);
    expect(record.width).toBe(512);
    expect(record.height).toBe(768);
    expect(record.media_type).toBe("image/png");
    expect(JSON.stringify(record)).not.toMatch(/secret|password|token|apikey/iu);
  });

  it("rejects bytes whose magic-byte signature does not match the claimed media type", async () => {
    const database = await open_database();
    await expect(
      put_image(
        database,
        NAMESPACE,
        put_input({ bytes: png_bytes(1), claimed_media_type: "image/jpeg" }),
      ),
    ).rejects.toThrow(ImageMediaTypeError);
    await expect(
      put_image(
        database,
        NAMESPACE,
        put_input({ bytes: jpeg_bytes(1), claimed_media_type: "image/png" }),
      ),
    ).rejects.toThrow(ImageMediaTypeError);
  });

  it("stores a video/mp4 record with duration_ms, poster_image_id, and source_job_id", async () => {
    const database = await open_database();
    const poster = await put_image(
      database,
      NAMESPACE,
      put_input({ id: IDS.second, bytes: jpeg_bytes(9), claimed_media_type: "image/jpeg" }),
    );
    const mp4_bytes = Uint8Array.from([
      0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6f, 0x6d,
    ]);

    const video = await put_image(
      database,
      NAMESPACE,
      put_input({
        bytes: mp4_bytes,
        claimed_media_type: "video/mp4",
        metadata: {
          ...base_metadata(),
          duration_ms: 4_200,
          poster_image_id: poster.id,
          source_job_id: IDS.job,
        },
      }),
    );

    expect(video.media_type).toBe("video/mp4");
    expect(video.duration_ms).toBe(4_200);
    expect(video.poster_image_id).toBe(poster.id);
    expect(video.source_job_id).toBe(IDS.job);
  });
});
