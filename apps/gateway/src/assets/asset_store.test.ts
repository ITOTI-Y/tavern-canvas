// @vitest-environment node

import { createHash } from "node:crypto";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import type { GeneratedAsset } from "@tavern-canvas/contracts";
import sharp from "sharp";
import { afterEach, describe, expect, it } from "vitest";

import { AssetRepository } from "../persistence/asset_repository.js";
import { open_gateway_database, type GatewayDatabase } from "../persistence/database.js";
import { AssetStore, type AssetStoreWriteFile } from "./asset_store.js";

const CREATED_AT = "2026-08-05T12:00:00.000Z";
const GENERATED_ASSET_ID = "00000000-0000-4000-8000-000000000001";
const PNG_BYTES = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
  "base64",
);

const limits = {
  max_image_bytes: 2_000_000,
  max_image_pixels: 4_000_000,
  max_image_dimension: 2_048,
};

const open_databases: GatewayDatabase[] = [];
const temporary_directories: string[] = [];

afterEach(async () => {
  for (const database of open_databases.splice(0)) {
    database.close();
  }
  for (const directory of temporary_directories.splice(0)) {
    await rm(directory, { force: true, recursive: true });
  }
});

type ImageFormat = "png" | "jpeg" | "webp";

type ImageFixtureOptions = {
  readonly width?: number;
  readonly height?: number;
  readonly with_metadata?: boolean;
};

type CreateStoreOptions = {
  readonly limits?: Partial<typeof limits>;
  readonly write_file?: AssetStoreWriteFile;
};
type StoreContext = {
  readonly database: GatewayDatabase;
  readonly store: AssetStore;
};

async function create_store(options: CreateStoreOptions = {}) {
  const directory = await mkdtemp(path.join(os.tmpdir(), "tavern-canvas-asset-store-"));
  temporary_directories.push(directory);
  const database = open_gateway_database({ file_path: path.join(directory, "gateway.sqlite") });
  open_databases.push(database);
  const asset_repository = new AssetRepository(database.connection);
  return {
    directory,
    database,
    store: new AssetStore({
      data_directory: directory,
      asset_repository,
      ...limits,
      ...(options.limits ?? {}),
      ...(options.write_file === undefined ? {} : { write_file: options.write_file }),
    }),
  };
}

async function create_image(
  format: ImageFormat,
  options: ImageFixtureOptions = {},
): Promise<Buffer> {
  let image = sharp({
    create: {
      width: options.width ?? 1,
      height: options.height ?? 1,
      channels: 3,
      background: { r: 10, g: 20, b: 30 },
    },
  });
  if (options.with_metadata === true) {
    image = image.withMetadata({
      exif: {
        IFD0: {
          ImageDescription: "tavern-canvas fixture",
        },
      },
    });
  }
  switch (format) {
    case "png":
      return image.png().toBuffer();
    case "jpeg":
      return image.jpeg().toBuffer();
    case "webp":
      return image.webp().toBuffer();
  }
}

async function create_jpeg(): Promise<Buffer> {
  return create_image("jpeg");
}

async function create_animated_webp(): Promise<Buffer> {
  return sharp(Uint8Array.from([255, 0, 0, 0, 255, 0]), {
    raw: { width: 1, height: 2, channels: 3, pageHeight: 1 },
  })
    .webp({ loop: 0, delay: [100, 100], lossless: true })
    .toBuffer();
}

async function create_generated_asset(
  bytes: Buffer,
  media_type: Extract<GeneratedAsset["media_type"], `image/${string}`>,
  overrides: Partial<GeneratedAsset> = {},
): Promise<GeneratedAsset> {
  const metadata = await sharp(bytes).metadata();
  const base: GeneratedAsset = {
    asset_id: GENERATED_ASSET_ID,
    media_type,
    byte_length: bytes.byteLength,
    sha256: createHash("sha256").update(bytes).digest("hex"),
    ...(metadata.width === undefined ? {} : { width: metadata.width }),
    ...(metadata.height === undefined ? {} : { height: metadata.height }),
  };
  return { ...base, ...overrides };
}

function asset_row_count(database: GatewayDatabase): number {
  const row = database.connection.prepare("SELECT COUNT(*) AS count FROM assets").get() as {
    readonly count: number;
  };
  return row.count;
}

async function expect_rejected_before_persistence(
  store_context: StoreContext,
  generated: { readonly asset: GeneratedAsset; readonly bytes?: Uint8Array },
  write_calls: readonly string[] = [],
): Promise<void> {
  await expect(
    store_context.store.register_generated_asset(generated, CREATED_AT),
  ).rejects.toMatchObject({ code: "invalid_asset" });
  expect(asset_row_count(store_context.database)).toBe(0);
  expect(write_calls).toHaveLength(0);
}
describe("AssetStore generated image validation", () => {
  it("rejects generated metadata over the global byte limit before persistence", async () => {
    const image = await create_image("png");
    const write_calls: string[] = [];
    const store_context = await create_store({
      limits: { max_image_bytes: image.byteLength - 1 },
      write_file: async (file_path) => {
        write_calls.push(file_path);
      },
    });
    const asset = await create_generated_asset(image, "image/png");

    await expect_rejected_before_persistence(store_context, { asset, bytes: image }, write_calls);
  });

  it("rejects generated bytes over the global byte limit before persistence", async () => {
    const image = await create_image("png");
    const write_calls: string[] = [];
    const store_context = await create_store({
      limits: { max_image_bytes: image.byteLength - 1 },
      write_file: async (file_path) => {
        write_calls.push(file_path);
      },
    });
    const asset = await create_generated_asset(image, "image/png", {
      byte_length: image.byteLength - 1,
    });

    await expect_rejected_before_persistence(store_context, { asset, bytes: image }, write_calls);
  });

  it("rejects generated output without bytes before persistence", async () => {
    const image = await create_image("png");
    const write_calls: string[] = [];
    const store_context = await create_store({
      write_file: async (file_path) => {
        write_calls.push(file_path);
      },
    });
    const asset = await create_generated_asset(image, "image/png");

    await expect_rejected_before_persistence(store_context, { asset }, write_calls);
  });

  it("rejects generated output over the dimension limit before persistence", async () => {
    const image = await create_image("png", { width: 3, height: 1 });
    const write_calls: string[] = [];
    const store_context = await create_store({
      limits: { max_image_dimension: 2 },
      write_file: async (file_path) => {
        write_calls.push(file_path);
      },
    });
    const asset = await create_generated_asset(image, "image/png");

    await expect_rejected_before_persistence(store_context, { asset, bytes: image }, write_calls);
  });

  it("rejects generated output over the pixel limit before persistence", async () => {
    const image = await create_image("png", { width: 2, height: 2 });
    const write_calls: string[] = [];
    const store_context = await create_store({
      limits: { max_image_pixels: 3 },
      write_file: async (file_path) => {
        write_calls.push(file_path);
      },
    });
    const asset = await create_generated_asset(image, "image/png");

    await expect_rejected_before_persistence(store_context, { asset, bytes: image }, write_calls);
  });

  it("rejects generated multi-page images before persistence", async () => {
    const image = await create_animated_webp();
    const write_calls: string[] = [];
    const store_context = await create_store({
      write_file: async (file_path) => {
        write_calls.push(file_path);
      },
    });
    const asset = await create_generated_asset(image, "image/webp");

    await expect_rejected_before_persistence(store_context, { asset, bytes: image }, write_calls);
  });

  it("rejects malformed generated media before persistence", async () => {
    const image = await create_image("png");
    const malformed = image.subarray(0, image.byteLength - 1);
    const source_asset = await create_generated_asset(image, "image/png");
    const asset: GeneratedAsset = {
      ...source_asset,
      byte_length: malformed.byteLength,
      sha256: createHash("sha256").update(malformed).digest("hex"),
    };
    const write_calls: string[] = [];
    const store_context = await create_store({
      write_file: async (file_path) => {
        write_calls.push(file_path);
      },
    });

    await expect_rejected_before_persistence(
      store_context,
      { asset, bytes: malformed },
      write_calls,
    );
  });

  it("rejects generated media whose bytes do not match the declared type", async () => {
    const image = await create_image("png");
    const write_calls: string[] = [];
    const store_context = await create_store({
      write_file: async (file_path) => {
        write_calls.push(file_path);
      },
    });
    const asset = await create_generated_asset(image, "image/jpeg");

    await expect_rejected_before_persistence(store_context, { asset, bytes: image }, write_calls);
  });

  it.each<readonly [string, Partial<GeneratedAsset>]>([
    ["width", { width: 2 }],
    ["height", { height: 2 }],
  ])("rejects generated metadata with a mismatched %s", async (_label, overrides) => {
    const image = await create_image("png");
    const write_calls: string[] = [];
    const store_context = await create_store({
      write_file: async (file_path) => {
        write_calls.push(file_path);
      },
    });
    const asset = await create_generated_asset(image, "image/png", overrides);

    await expect_rejected_before_persistence(store_context, { asset, bytes: image }, write_calls);
  });

  it("stores and retrieves valid generated bytes at every configured boundary", async () => {
    const image = await create_image("png", { width: 2, height: 2 });
    const store_context = await create_store({
      limits: {
        max_image_bytes: image.byteLength,
        max_image_pixels: 4,
        max_image_dimension: 2,
      },
    });
    const asset = await create_generated_asset(image, "image/png");
    const stored = await store_context.store.register_generated_asset(
      { asset, bytes: image },
      CREATED_AT,
    );

    const retrieved = await store_context.store.read_bytes(stored.asset_id);
    expect(retrieved.bytes).toEqual(image);
    expect(retrieved.asset.sha256).toBe(asset.sha256);
    expect(retrieved.asset.byte_length).toBe(image.byteLength);
  });
});

describe("AssetStore reference image validation", () => {
  it.each<readonly [string, ImageFormat, string]>([
    ["PNG", "png", "image/png"],
    ["JPEG", "jpeg", "image/jpeg"],
    ["WebP", "webp", "image/webp"],
  ])("accepts a complete %s image", async (_label, format, media_type) => {
    const { store } = await create_store();
    const image = await create_image(format);
    const result = await store.ingest_reference_image(image, media_type, CREATED_AT);

    expect(result.asset.media_type).toBe(media_type);
    expect(result.canonical_bytes.byteLength).toBeGreaterThan(0);
  });

  it("strips metadata from canonical image bytes", async () => {
    const { store } = await create_store();
    const image = await create_image("jpeg", { with_metadata: true });
    const source_metadata = await sharp(image).metadata();

    expect(source_metadata.exif).toBeDefined();

    const result = await store.ingest_reference_image(image, "image/jpeg", CREATED_AT);
    const canonical_metadata = await sharp(result.canonical_bytes).metadata();

    expect(canonical_metadata.exif).toBeUndefined();
  });

  it("rejects an image when the content type does not match its bytes", async () => {
    const { store } = await create_store();
    const image = await create_image("png");

    await expect(
      store.ingest_reference_image(image, "image/jpeg", CREATED_AT),
    ).rejects.toMatchObject({ code: "invalid_asset" });
  });

  it.each<readonly [string, Buffer]>([
    ["SVG", Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" />')],
    ["HTML", Buffer.from("<!doctype html><html><body>asset</body></html>")],
    ["ZIP", Buffer.from("PK\x03\x04\x14\x00\x00\x00\x00\x00\x00\x00")],
    [
      "video",
      Buffer.from([
        0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6f, 0x6d, 0x00, 0x00, 0x02,
        0x00, 0x69, 0x73, 0x6f, 0x6d, 0x69, 0x73, 0x6f, 0x32,
      ]),
    ],
  ])("rejects %s content", async (_label, bytes) => {
    const { store } = await create_store();

    await expect(
      store.ingest_reference_image(bytes, "image/png", CREATED_AT),
    ).rejects.toMatchObject({ code: "invalid_asset" });
  });
});

describe("AssetStore image limits", () => {
  it("rejects an image over the byte limit", async () => {
    const image = await create_image("png", { width: 8, height: 8 });
    const { store } = await create_store({
      limits: { max_image_bytes: image.byteLength - 1 },
    });

    await expect(
      store.ingest_reference_image(image, "image/png", CREATED_AT),
    ).rejects.toMatchObject({ code: "invalid_asset" });
  });

  it("rejects an image over the pixel limit", async () => {
    const image = await create_image("png", { width: 2, height: 2 });
    const { store } = await create_store({
      limits: { max_image_pixels: 3 },
    });

    await expect(
      store.ingest_reference_image(image, "image/png", CREATED_AT),
    ).rejects.toMatchObject({ code: "invalid_asset" });
  });

  it("rejects an image over the dimension limit", async () => {
    const image = await create_image("png", { width: 3, height: 1 });
    const { store } = await create_store({
      limits: { max_image_dimension: 2 },
    });

    await expect(
      store.ingest_reference_image(image, "image/png", CREATED_AT),
    ).rejects.toMatchObject({ code: "invalid_asset" });
  });
});

describe("AssetStore JPEG container validation", () => {
  it("accepts a complete JPEG container", async () => {
    const { store } = await create_store();
    const jpeg = await create_jpeg();
    const result = await store.ingest_reference_image(jpeg, "image/jpeg", CREATED_AT);

    expect(result.asset.media_type).toBe("image/jpeg");
    expect(result.canonical_bytes.byteLength).toBeGreaterThan(0);
  });

  it.each<readonly [string, Buffer]>([
    ["html", Buffer.from("<html><body>polyglot</body></html>")],
    ["zip", Buffer.from("PK\x03\x04polyglot")],
    ["extra EOI", Buffer.alloc(0)],
  ])("rejects a JPEG with %s trailing data", async (_label, trailing) => {
    const { store } = await create_store();
    const jpeg = await create_jpeg();
    const polyglot =
      _label === "extra EOI"
        ? Buffer.concat([jpeg, Buffer.from([0xff, 0xd9])])
        : Buffer.concat([jpeg, trailing, Buffer.from([0xff, 0xd9])]);

    await expect(
      store.ingest_reference_image(polyglot, "image/jpeg", CREATED_AT),
    ).rejects.toMatchObject({ code: "invalid_asset" });
  });

  it("rejects a truncated JPEG scan", async () => {
    const { store } = await create_store();
    const jpeg = await create_jpeg();

    await expect(
      store.ingest_reference_image(jpeg.subarray(0, jpeg.byteLength - 2), "image/jpeg", CREATED_AT),
    ).rejects.toMatchObject({ code: "invalid_asset" });
  });
});

describe("AssetStore file integrity", () => {
  it("repairs a corrupted dedupe target on re-upload", async () => {
    const { directory, store } = await create_store();
    const first = await store.ingest_reference_image(PNG_BYTES, "image/png", CREATED_AT);
    await writeFile(path.resolve(directory, first.asset.relative_path), Buffer.from("corrupted"));

    const replay = await store.ingest_reference_image(PNG_BYTES, "image/png", CREATED_AT);
    const content = await store.read_bytes(first.asset.asset_id);

    expect(replay.asset.asset_id).toBe(first.asset.asset_id);
    expect(content.bytes).toEqual(replay.canonical_bytes);
    expect(createHash("sha256").update(content.bytes).digest("hex")).toBe(first.asset.sha256);
  });

  it("reports an injected write failure as a retryable store error", async () => {
    const { store } = await create_store({
      write_file: async () => {
        throw new Error("synthetic disk full");
      },
    });

    await expect(store.ingest_reference_image(PNG_BYTES, "image/png", CREATED_AT)).rejects.toEqual(
      expect.objectContaining({ code: "asset_storage_unavailable" }),
    );
  });
});
