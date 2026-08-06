import "fake-indexeddb/auto";

import { deleteDB } from "idb";
import { afterEach, describe, expect, it } from "vitest";

import { DATABASE_NAME } from "../database_schema.js";
import { dispose_database, open_database } from "../open_database.js";
import {
  create_business_repositories,
  ImageBlobRepository,
} from "../repositories/business_repositories.js";
import { run_lru_eviction } from "./lru_eviction.js";
import { type ImageRecordFields } from "./image_schema.js";
import { GalleryImageRecordRepository, put_image, type GalleryImageRecord } from "./image_store.js";

const NAMESPACE = "primary";
const NOW = "2026-08-05T00:00:00.000Z";
const LATER = "2026-08-05T00:00:01.000Z";
const IDS = {
  a: "11111111-1111-4111-8111-111111111111",
  b: "22222222-2222-4222-8222-222222222222",
  c: "33333333-3333-4333-8333-333333333333",
} as const;

function png_bytes_of_length(total_length: number, marker: number): Uint8Array {
  const bytes = new Uint8Array(total_length);
  bytes.set([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  bytes[total_length - 1] = marker;
  return bytes;
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

async function seed_record(
  database: Awaited<ReturnType<typeof open_database>>,
  input: {
    id: string;
    bytes: Uint8Array;
    last_accessed_at: string;
    pinned?: boolean;
    persisted_url?: string;
  },
): Promise<GalleryImageRecord> {
  const metadata: Omit<ImageRecordFields, "media_type" | "quarantined"> =
    input.persisted_url === undefined
      ? base_metadata()
      : { ...base_metadata(), persisted_url: input.persisted_url };
  return put_image(database, NAMESPACE, {
    id: input.id,
    bytes: input.bytes,
    claimed_media_type: "image/png",
    created_at: input.last_accessed_at,
    metadata,
    ...(input.pinned === undefined ? {} : { pinned: input.pinned }),
  });
}

afterEach(async () => {
  await dispose_database();
  await deleteDB(DATABASE_NAME);
});

describe("lru_eviction", () => {
  it("does not start cleanup below the configured quota pressure", async () => {
    const database = await open_database();
    await seed_record(database, {
      id: IDS.a,
      bytes: png_bytes_of_length(20, 1),
      last_accessed_at: NOW,
      persisted_url: "https://cdn.example.com/a.png",
    });

    const result = await run_lru_eviction(
      database,
      { start_pressure_ratio: 0.8, target_pressure_ratio: 0.5 },
      () => Promise.resolve({ usage: 500, quota: 1000 }),
    );

    expect(result).toEqual({ reclaimed_bytes: 0, evicted_sha256: [] });
    expect(await new ImageBlobRepository(database).list()).toHaveLength(1);
  });

  it("never evicts a pinned record even under high pressure", async () => {
    const database = await open_database();
    const record = await seed_record(database, {
      id: IDS.a,
      bytes: png_bytes_of_length(600, 2),
      last_accessed_at: NOW,
      pinned: true,
      persisted_url: "https://cdn.example.com/a.png",
    });

    const result = await run_lru_eviction(
      database,
      { start_pressure_ratio: 0.8, target_pressure_ratio: 0.5 },
      () => Promise.resolve({ usage: 950, quota: 1000 }),
    );

    expect(result).toEqual({ reclaimed_bytes: 0, evicted_sha256: [] });
    expect(await new ImageBlobRepository(database).get(record.sha256)).not.toBeNull();
  });

  it("never evicts the sole copy of content with no persisted URL fallback", async () => {
    const database = await open_database();
    const record = await seed_record(database, {
      id: IDS.a,
      bytes: png_bytes_of_length(600, 3),
      last_accessed_at: NOW,
    });

    const result = await run_lru_eviction(
      database,
      { start_pressure_ratio: 0.8, target_pressure_ratio: 0.5 },
      () => Promise.resolve({ usage: 950, quota: 1000 }),
    );

    expect(result).toEqual({ reclaimed_bytes: 0, evicted_sha256: [] });
    expect(await new ImageBlobRepository(database).get(record.sha256)).not.toBeNull();
  });

  it("evicts local bytes for content with a persisted URL while retaining its metadata", async () => {
    const database = await open_database();
    const record = await seed_record(database, {
      id: IDS.a,
      bytes: png_bytes_of_length(600, 4),
      last_accessed_at: NOW,
      persisted_url: "https://cdn.example.com/a.png",
    });

    const result = await run_lru_eviction(
      database,
      { start_pressure_ratio: 0.8, target_pressure_ratio: 0.5 },
      () => Promise.resolve({ usage: 950, quota: 1000 }),
    );

    expect(result).toEqual({ reclaimed_bytes: 600, evicted_sha256: [record.sha256] });
    expect(await new ImageBlobRepository(database).get(record.sha256)).toBeNull();

    const retained = await new GalleryImageRecordRepository(database).get(NAMESPACE, IDS.a);
    expect(retained).not.toBeNull();
    expect(retained?.persisted_url).toBe("https://cdn.example.com/a.png");
  });

  it("selects least recently accessed eligible content first", async () => {
    const database = await open_database();
    const oldest = await seed_record(database, {
      id: IDS.a,
      bytes: png_bytes_of_length(300, 10),
      last_accessed_at: "2026-08-05T00:00:00.000Z",
      persisted_url: "https://cdn.example.com/a.png",
    });
    const middle = await seed_record(database, {
      id: IDS.b,
      bytes: png_bytes_of_length(300, 11),
      last_accessed_at: "2026-08-05T00:00:01.000Z",
      persisted_url: "https://cdn.example.com/b.png",
    });
    const newest = await seed_record(database, {
      id: IDS.c,
      bytes: png_bytes_of_length(300, 12),
      last_accessed_at: "2026-08-05T00:00:02.000Z",
      persisted_url: "https://cdn.example.com/c.png",
    });

    const result = await run_lru_eviction(
      database,
      { start_pressure_ratio: 0.8, target_pressure_ratio: 0.4 },
      () => Promise.resolve({ usage: 1000, quota: 1000 }),
    );

    expect(result.evicted_sha256).toEqual([oldest.sha256, middle.sha256]);
    expect(result.reclaimed_bytes).toBe(600);
    expect(await new ImageBlobRepository(database).get(newest.sha256)).not.toBeNull();
  });

  it("counts a shared blob's bytes once even when multiple records reference it", async () => {
    const database = await open_database();
    const bytes = png_bytes_of_length(500, 20);
    const first = await seed_record(database, {
      id: IDS.a,
      bytes,
      last_accessed_at: NOW,
      persisted_url: "https://cdn.example.com/a.png",
    });
    await seed_record(database, {
      id: IDS.b,
      bytes,
      last_accessed_at: LATER,
      persisted_url: "https://cdn.example.com/a.png",
    });

    expect((await new ImageBlobRepository(database).get(first.sha256))?.ref_count).toBe(2);

    const result = await run_lru_eviction(
      database,
      { start_pressure_ratio: 0.8, target_pressure_ratio: 0.5 },
      () => Promise.resolve({ usage: 900, quota: 1000 }),
    );

    expect(result).toEqual({ reclaimed_bytes: 500, evicted_sha256: [first.sha256] });
  });

  it("stops cleanup once the target pressure ratio is reached and reports reclaimed bytes", async () => {
    const database = await open_database();
    const small = await seed_record(database, {
      id: IDS.a,
      bytes: png_bytes_of_length(100, 30),
      last_accessed_at: "2026-08-05T00:00:00.000Z",
      persisted_url: "https://cdn.example.com/a.png",
    });
    const medium = await seed_record(database, {
      id: IDS.b,
      bytes: png_bytes_of_length(200, 31),
      last_accessed_at: "2026-08-05T00:00:01.000Z",
      persisted_url: "https://cdn.example.com/b.png",
    });
    const large = await seed_record(database, {
      id: IDS.c,
      bytes: png_bytes_of_length(300, 32),
      last_accessed_at: "2026-08-05T00:00:02.000Z",
      persisted_url: "https://cdn.example.com/c.png",
    });

    const result = await run_lru_eviction(
      database,
      { start_pressure_ratio: 0.8, target_pressure_ratio: 0.75 },
      () => Promise.resolve({ usage: 1000, quota: 1000 }),
    );

    expect(result).toEqual({ reclaimed_bytes: 300, evicted_sha256: [small.sha256, medium.sha256] });
    expect(await new ImageBlobRepository(database).get(large.sha256)).not.toBeNull();
  });

  it("skips an image_records row from a different domain instead of crashing on it", async () => {
    // `image_records` is shared with non-gallery writers (e.g. a migrated v2
    // asset), whose rows do not carry `provider_id`/`source_message`/
    // `generation_parameters`/`media_type` and so fail `GalleryImageRecordSchema`.
    // Such a row must never crash cleanup, and its blob must never be evicted
    // since eligibility (pinned, persisted_url) cannot be determined for it.
    const database = await open_database();
    const repositories = create_business_repositories(database);
    const foreign_bytes = png_bytes_of_length(400, 50);
    const foreign_sha256 = "5".repeat(64);
    await repositories.image_blobs.create({
      sha256: foreign_sha256,
      ref_count: 1,
      byte_length: foreign_bytes.byteLength,
      blob: new Blob([new Uint8Array(foreign_bytes)]),
    });
    await repositories.image_records.create(NAMESPACE, {
      schema_version: 1,
      id: IDS.a,
      namespace: NAMESPACE,
      record_key: `${NAMESPACE}:${IDS.a}`,
      created_at: NOW,
      updated_at: NOW,
      sha256: foreign_sha256,
      last_accessed_at: NOW,
      pinned: false,
      payload: { kind: "uploaded_configuration_image", legacy_id: "cfgimg_1" },
    });
    const eligible = await seed_record(database, {
      id: IDS.b,
      bytes: png_bytes_of_length(400, 51),
      last_accessed_at: NOW,
      persisted_url: "https://cdn.example.com/b.png",
    });

    const result = await run_lru_eviction(
      database,
      { start_pressure_ratio: 0.5, target_pressure_ratio: 0.0 },
      () => Promise.resolve({ usage: 800, quota: 1000 }),
    );

    expect(result).toEqual({ reclaimed_bytes: 400, evicted_sha256: [eligible.sha256] });
    expect(await new ImageBlobRepository(database).get(foreign_sha256)).not.toBeNull();
  });

  it("disables cleanup without deleting anything when the quota estimate is unavailable", async () => {
    const database = await open_database();
    const record = await seed_record(database, {
      id: IDS.a,
      bytes: png_bytes_of_length(600, 40),
      last_accessed_at: NOW,
      persisted_url: "https://cdn.example.com/a.png",
    });

    const config = { start_pressure_ratio: 0.1, target_pressure_ratio: 0.0 };
    const undefined_result = await run_lru_eviction(database, config, () =>
      Promise.resolve(undefined),
    );
    expect(undefined_result).toEqual({ reclaimed_bytes: 0, evicted_sha256: [] });

    const rejected_result = await run_lru_eviction(database, config, () =>
      Promise.reject(new Error("storage estimate unavailable")),
    );
    expect(rejected_result).toEqual({ reclaimed_bytes: 0, evicted_sha256: [] });

    expect(await new ImageBlobRepository(database).get(record.sha256)).not.toBeNull();
  });
});
