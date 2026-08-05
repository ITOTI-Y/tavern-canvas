import { sha256 } from "@noble/hashes/sha2.js";
import { bytesToHex } from "@noble/hashes/utils.js";
import {
  AssetIdSchema,
  type GeneratedAsset,
  type ImageGenerationResult,
} from "@tavern-canvas/contracts";

import { ProviderAdapterError } from "./provider_error.js";

export type ImageMediaType = Extract<
  GeneratedAsset["media_type"],
  "image/png" | "image/jpeg" | "image/webp"
>;

export function decode_base64_image(value: string, max_bytes: number): Uint8Array {
  const separator_index = value.indexOf(",");
  const payload = value.startsWith("data:")
    ? separator_index < 0
      ? ""
      : value.slice(separator_index + 1)
    : value;
  if (
    payload.length === 0 ||
    payload.length % 4 === 1 ||
    !/^[A-Za-z0-9+/]*={0,2}$/u.test(payload)
  ) {
    throw malformed_response();
  }

  let decoded: string;
  try {
    decoded = atob(payload);
  } catch {
    throw malformed_response();
  }
  if (decoded.length === 0 || decoded.length > max_bytes) {
    throw malformed_response();
  }
  return Uint8Array.from(decoded, (character) => character.charCodeAt(0));
}

export function encode_base64(value: Uint8Array): string {
  let binary = "";
  const chunk_size = 32_768;
  for (let offset = 0; offset < value.length; offset += chunk_size) {
    binary += String.fromCharCode(...value.subarray(offset, offset + chunk_size));
  }
  return btoa(binary);
}

export function detect_image_media_type(bytes: Uint8Array): ImageMediaType | undefined {
  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  ) {
    return "image/png";
  }
  if (bytes.length >= 4 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "image/jpeg";
  }
  if (
    bytes.length >= 12 &&
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return "image/webp";
  }
  return undefined;
}

export function create_generated_asset(
  bytes: Uint8Array,
  width: number | undefined,
  height: number | undefined,
  allowed_media_types: readonly GeneratedAsset["media_type"][],
): GeneratedAsset {
  const media_type = detect_image_media_type(bytes);
  if (media_type === undefined || !allowed_media_types.includes(media_type)) {
    throw malformed_response();
  }

  const digest = sha256(bytes);
  const sha256_hex = bytesToHex(digest);
  const uuid_bytes = digest.slice(0, 16);
  uuid_bytes[6] = ((uuid_bytes[6] ?? 0) & 0x0f) | 0x50;
  uuid_bytes[8] = ((uuid_bytes[8] ?? 0) & 0x3f) | 0x80;
  const uuid_hex = bytesToHex(uuid_bytes);
  const asset_id = AssetIdSchema.parse(
    `${uuid_hex.slice(0, 8)}-${uuid_hex.slice(8, 12)}-${uuid_hex.slice(12, 16)}-${uuid_hex.slice(16, 20)}-${uuid_hex.slice(20)}`,
  );

  return {
    asset_id,
    media_type,
    byte_length: bytes.byteLength,
    sha256: sha256_hex,
    ...(width === undefined ? {} : { width }),
    ...(height === undefined ? {} : { height }),
  };
}

export function result_with_optional_seed(
  result: Omit<ImageGenerationResult, "seed">,
  seed: number | undefined,
): ImageGenerationResult {
  return seed === undefined ? result : { ...result, seed };
}

export function malformed_response(): ProviderAdapterError {
  return new ProviderAdapterError({ code: "malformed_response", retryable: false });
}

export function invalid_request(): ProviderAdapterError {
  return new ProviderAdapterError({ code: "invalid_request", retryable: false });
}
