import { createHash, randomUUID } from "node:crypto";
import { mkdir, readFile, rename, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

import type { AssetId, GeneratedAsset, Sha256 } from "@tavern-canvas/contracts";
import { fileTypeFromBuffer } from "file-type";
import sharp, { type Metadata, type Sharp } from "sharp";

import type { AssetRepository, StoredAsset } from "../persistence/asset_repository.js";

export type ReferenceImageMediaType = "image/png" | "image/jpeg" | "image/webp";

export interface AssetStoreLimits {
  readonly max_image_bytes: number;
  readonly max_image_pixels: number;
  readonly max_image_dimension: number;
}

export interface AssetStoreOptions extends AssetStoreLimits {
  readonly data_directory: string;
  readonly asset_repository: AssetRepository;
  readonly write_file?: AssetStoreWriteFile;
}

export type AssetStoreWriteFile = (file_path: string, bytes: Uint8Array) => Promise<void>;

export interface IngestedAsset {
  readonly asset: StoredAsset;
  readonly canonical_bytes: Uint8Array;
}

export interface GeneratedAssetBytes {
  readonly asset: GeneratedAsset;
  readonly bytes?: Uint8Array;
}

const REFERENCE_MEDIA_TYPES: ReadonlySet<ReferenceImageMediaType> = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
]);

export class AssetStore {
  readonly #data_directory: string;
  readonly #asset_directory: string;
  readonly #asset_repository: AssetRepository;
  readonly #limits: AssetStoreLimits;
  readonly #write_file: AssetStoreWriteFile;

  constructor(options: AssetStoreOptions) {
    this.#data_directory = path.resolve(options.data_directory);
    this.#asset_directory = path.resolve(this.#data_directory, "assets");
    this.#asset_repository = options.asset_repository;
    this.#limits = options;
    this.#write_file =
      options.write_file ??
      ((file_path, bytes) => writeFile(file_path, bytes, { flag: "wx", mode: 0o600 }));
  }

  async initialize(): Promise<void> {
    try {
      await mkdir(this.#asset_directory, { recursive: true });
    } catch {
      throw new AssetStoreError("asset_storage_unavailable");
    }
  }

  async ingest_reference_image(
    body: Uint8Array,
    content_type: string,
    created_at: string,
  ): Promise<IngestedAsset> {
    if (body.byteLength === 0 || body.byteLength > this.#limits.max_image_bytes) {
      throw new AssetStoreError("invalid_asset");
    }
    const expected_media_type = parse_reference_media_type(content_type);
    if (expected_media_type === undefined) {
      throw new AssetStoreError("invalid_asset");
    }
    const detected = await fileTypeFromBuffer(body);
    if (detected === undefined || detected.mime !== expected_media_type) {
      throw new AssetStoreError("invalid_asset");
    }
    assert_image_container(body, expected_media_type);

    let metadata: Metadata;
    try {
      metadata = await sharp(body, {
        failOn: "error",
        limitInputPixels: this.#limits.max_image_pixels,
      }).metadata();
    } catch {
      throw new AssetStoreError("invalid_asset");
    }
    const width = metadata.width;
    const height = metadata.height;
    if (
      !Number.isSafeInteger(width) ||
      !Number.isSafeInteger(height) ||
      width <= 0 ||
      height <= 0 ||
      width > this.#limits.max_image_dimension ||
      height > this.#limits.max_image_dimension ||
      width * height > this.#limits.max_image_pixels ||
      (metadata.pages !== undefined && metadata.pages > 1)
    ) {
      throw new AssetStoreError("invalid_asset");
    }

    let canonical_bytes: Buffer;
    try {
      const image = sharp(body, {
        failOn: "error",
        limitInputPixels: this.#limits.max_image_pixels,
      }).rotate();
      canonical_bytes = await encode_canonical(image, expected_media_type);
    } catch {
      throw new AssetStoreError("invalid_asset");
    }
    if (
      canonical_bytes.byteLength === 0 ||
      canonical_bytes.byteLength > this.#limits.max_image_bytes
    ) {
      throw new AssetStoreError("invalid_asset");
    }
    const sha256 = sha256_hex(canonical_bytes);
    const asset = this.#asset_repository.create_or_get({
      sha256,
      media_type: expected_media_type,
      byte_length: canonical_bytes.byteLength,
      created_at,
    });
    await this.#ensure_asset_bytes(asset, canonical_bytes);
    return { asset, canonical_bytes };
  }

  async register_generated_asset(
    generated: GeneratedAssetBytes,
    created_at: string,
  ): Promise<StoredAsset> {
    const { asset, bytes } = generated;
    const media_type = asset.media_type;
    if (!is_reference_media_type(media_type)) {
      throw new AssetStoreError("invalid_asset");
    }
    if (!Number.isSafeInteger(asset.byte_length) || asset.byte_length <= 0) {
      throw new AssetStoreError("invalid_asset");
    }
    if (bytes !== undefined) {
      if (bytes.byteLength !== asset.byte_length || sha256_hex(bytes) !== asset.sha256) {
        throw new AssetStoreError("invalid_asset");
      }
      const detected = await fileTypeFromBuffer(bytes);
      if (detected?.mime !== media_type) {
        throw new AssetStoreError("invalid_asset");
      }
      assert_image_container(bytes, media_type);
    }
    const stored = this.#asset_repository.create_or_get({
      sha256: asset.sha256,
      media_type,
      byte_length: asset.byte_length,
      created_at,
    });
    if (bytes !== undefined) {
      await this.#ensure_asset_bytes(stored, bytes);
    }
    return stored;
  }

  get_metadata(asset_id: AssetId): StoredAsset | undefined {
    return this.#asset_repository.get_by_id(asset_id);
  }

  async read_bytes(
    asset_id: AssetId,
  ): Promise<{ readonly asset: StoredAsset; readonly bytes: Uint8Array }> {
    const asset = this.#asset_repository.get_by_id(asset_id);
    if (asset === undefined) {
      throw new AssetStoreError("asset_not_found");
    }
    const file_path = this.#safe_asset_path(asset);
    let bytes: Buffer;
    try {
      bytes = await readFile(file_path);
    } catch (error) {
      if (is_missing_file_error(error)) {
        throw new AssetStoreError("asset_content_unavailable");
      }
      throw new AssetStoreError("asset_storage_unavailable");
    }
    if (sha256_hex(bytes) !== asset.sha256 || bytes.byteLength !== asset.byte_length) {
      throw new AssetStoreError("asset_content_unavailable");
    }
    return { asset, bytes };
  }

  async read_provider_asset(
    asset_id: AssetId,
    signal: AbortSignal,
  ): Promise<{
    readonly asset_id: AssetId;
    readonly media_type: ReferenceImageMediaType;
    readonly bytes: Uint8Array;
  }> {
    if (signal.aborted) {
      throw new DOMException("The operation was aborted", "AbortError");
    }
    const result = await this.read_bytes(asset_id);
    if (!REFERENCE_MEDIA_TYPES.has(result.asset.media_type)) {
      throw new AssetStoreError("invalid_asset");
    }
    return {
      asset_id,
      media_type: result.asset.media_type,
      bytes: result.bytes,
    };
  }

  #safe_asset_path(asset: StoredAsset): string {
    const resolved = path.resolve(this.#data_directory, asset.relative_path);
    if (resolved !== path.resolve(this.#asset_directory, path.basename(resolved))) {
      throw new AssetStoreError("asset_content_unavailable");
    }
    return resolved;
  }

  async #ensure_asset_bytes(asset: StoredAsset, bytes: Uint8Array): Promise<void> {
    await this.initialize();
    const target = this.#safe_asset_path(asset);
    if (await this.#has_valid_asset_bytes(asset, target)) {
      return;
    }

    const temporary = path.join(this.#asset_directory, `.${randomUUID()}.tmp`);
    try {
      await this.#write_file(temporary, bytes);
      try {
        await rename(temporary, target);
      } catch {
        if (await this.#has_valid_asset_bytes(asset, target)) {
          await unlink(temporary).catch(() => undefined);
          return;
        }
        throw new AssetStoreError("asset_storage_unavailable");
      }
    } catch (error) {
      await unlink(temporary).catch(() => undefined);
      if (error instanceof AssetStoreError) {
        throw error;
      }
      throw new AssetStoreError("asset_storage_unavailable");
    }
  }

  async #has_valid_asset_bytes(asset: StoredAsset, target: string): Promise<boolean> {
    let existing: Buffer;
    try {
      existing = await readFile(target);
    } catch (error) {
      if (is_missing_file_error(error)) {
        return false;
      }
      throw new AssetStoreError("asset_storage_unavailable");
    }
    return existing.byteLength === asset.byte_length && sha256_hex(existing) === asset.sha256;
  }
}
function is_missing_file_error(error: unknown): boolean {
  return error !== null && typeof error === "object" && "code" in error && error.code === "ENOENT";
}

export class AssetStoreError extends Error {
  readonly code:
    "invalid_asset" | "asset_not_found" | "asset_content_unavailable" | "asset_storage_unavailable";

  constructor(code: AssetStoreError["code"]) {
    super(code);
    this.name = "AssetStoreError";
    this.code = code;
  }
}

function encode_canonical(image: Sharp, media_type: ReferenceImageMediaType): Promise<Buffer> {
  switch (media_type) {
    case "image/png":
      return image.png({ force: true }).toBuffer();
    case "image/jpeg":
      return image.jpeg({ force: true }).toBuffer();
    case "image/webp":
      return image.webp({ force: true }).toBuffer();
  }
}
function is_reference_media_type(value: string): value is ReferenceImageMediaType {
  return value === "image/png" || value === "image/jpeg" || value === "image/webp";
}

function parse_reference_media_type(value: string): ReferenceImageMediaType | undefined {
  const media_type = value.split(";", 1)[0]?.trim().toLowerCase();
  return media_type === "image/png" || media_type === "image/jpeg" || media_type === "image/webp"
    ? media_type
    : undefined;
}

function sha256_hex(value: Uint8Array): Sha256 {
  return createHash("sha256").update(value).digest("hex");
}

function assert_image_container(body: Uint8Array, media_type: ReferenceImageMediaType): void {
  switch (media_type) {
    case "image/png":
      assert_png_container(body);
      return;
    case "image/jpeg":
      assert_jpeg_container(body);
      return;
    case "image/webp":
      assert_webp_container(body);
      return;
  }
}

function assert_png_container(body: Uint8Array): void {
  if (body.byteLength < 24) {
    throw new AssetStoreError("invalid_asset");
  }
  let offset = 8;
  let has_iend = false;
  while (offset + 12 <= body.byteLength) {
    const chunk_length = read_uint32_be(body, offset);
    const chunk_end = offset + 12 + chunk_length;
    if (chunk_end > body.byteLength) {
      throw new AssetStoreError("invalid_asset");
    }
    const chunk_type = ascii(body.subarray(offset + 4, offset + 8));
    offset = chunk_end;
    if (chunk_type === "IEND") {
      has_iend = true;
      break;
    }
  }
  if (!has_iend || offset !== body.byteLength) {
    throw new AssetStoreError("invalid_asset");
  }
}

function assert_jpeg_container(body: Uint8Array): void {
  const length = body.byteLength;
  if (length < 4 || body[0] !== 0xff || body[1] !== 0xd8) {
    throw new AssetStoreError("invalid_asset");
  }

  let offset = 2;
  let saw_scan = false;
  while (offset < length) {
    if (body[offset] !== 0xff) {
      throw new AssetStoreError("invalid_asset");
    }
    while (offset < length && body[offset] === 0xff) {
      offset += 1;
    }
    if (offset >= length) {
      throw new AssetStoreError("invalid_asset");
    }
    const marker = body[offset];
    offset += 1;
    if (marker === undefined || marker === 0x00 || marker === 0xd8) {
      throw new AssetStoreError("invalid_asset");
    }
    if (marker === 0xd9) {
      if (!saw_scan || offset !== length) {
        throw new AssetStoreError("invalid_asset");
      }
      return;
    }
    if (marker === 0xda) {
      saw_scan = true;
      offset = read_jpeg_segment_end(body, offset);
      const scan = consume_jpeg_scan(body, offset);
      offset = scan.offset;
      if (scan.eoi) {
        if (offset !== length) {
          throw new AssetStoreError("invalid_asset");
        }
        return;
      }
      continue;
    }
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      continue;
    }
    offset = read_jpeg_segment_end(body, offset);
  }
  throw new AssetStoreError("invalid_asset");
}

function read_jpeg_segment_end(body: Uint8Array, offset: number): number {
  if (offset + 2 > body.byteLength) {
    throw new AssetStoreError("invalid_asset");
  }
  const high_byte = body[offset];
  const low_byte = body[offset + 1];
  if (high_byte === undefined || low_byte === undefined) {
    throw new AssetStoreError("invalid_asset");
  }
  const segment_length = (high_byte << 8) | low_byte;
  if (segment_length < 2 || segment_length > body.byteLength - offset) {
    throw new AssetStoreError("invalid_asset");
  }
  return offset + segment_length;
}

function consume_jpeg_scan(
  body: Uint8Array,
  offset: number,
): { readonly offset: number; readonly eoi: boolean } {
  while (offset < body.byteLength) {
    if (body[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    const marker_start = offset;
    offset += 1;
    while (offset < body.byteLength && body[offset] === 0xff) {
      offset += 1;
    }
    if (offset >= body.byteLength) {
      throw new AssetStoreError("invalid_asset");
    }
    const marker = body[offset];
    offset += 1;
    if (marker === undefined) {
      throw new AssetStoreError("invalid_asset");
    }
    if (marker === 0x00 || (marker >= 0xd0 && marker <= 0xd7)) {
      continue;
    }
    return marker === 0xd9 ? { offset, eoi: true } : { offset: marker_start, eoi: false };
  }
  throw new AssetStoreError("invalid_asset");
}

function assert_webp_container(body: Uint8Array): void {
  if (body.byteLength < 12 || read_uint32_le(body, 4) + 8 !== body.byteLength) {
    throw new AssetStoreError("invalid_asset");
  }
}

function read_uint32_be(value: Uint8Array, offset: number): number {
  return (
    (((value[offset] ?? 0) << 24) |
      ((value[offset + 1] ?? 0) << 16) |
      ((value[offset + 2] ?? 0) << 8) |
      (value[offset + 3] ?? 0)) >>>
    0
  );
}

function read_uint32_le(value: Uint8Array, offset: number): number {
  return (
    ((value[offset] ?? 0) |
      ((value[offset + 1] ?? 0) << 8) |
      ((value[offset + 2] ?? 0) << 16) |
      ((value[offset + 3] ?? 0) << 24)) >>>
    0
  );
}

function ascii(value: Uint8Array): string {
  return String.fromCharCode(...value);
}
