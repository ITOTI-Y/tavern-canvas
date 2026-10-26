import { AssetIdSchema, type AssetId } from "@tavern-canvas/contracts";
import type { ProviderAssetReader, ProviderSourceAsset } from "@tavern-canvas/providers";
import type {
  NovelAiVibeEncodingRepository,
  ProviderInputAssetRepository,
} from "@tavern-canvas/storage";

import type { VibeEncodingCache, VibeEncodingKey } from "./novelai_request_preparation.js";

const INPUT_RETENTION_MS = 7 * 24 * 60 * 60 * 1000;

export async function sha256_hex(bytes: Uint8Array): Promise<string> {
  const digest = new Uint8Array(await crypto.subtle.digest("SHA-256", new Uint8Array(bytes)));
  return Array.from(digest, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

/** A stable record id for a cache key, formatted as an RFC 9562 version 8 UUID. */
async function key_to_uuid(key: string): Promise<string> {
  const hex = await sha256_hex(new TextEncoder().encode(key));
  const variant = ((Number.parseInt(hex.slice(16, 17), 16) & 0x3) | 0x8).toString(16);
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-8${hex.slice(13, 16)}-${variant}${hex.slice(17, 20)}-${hex.slice(20, 32)}`;
}

function cache_key(key: VibeEncodingKey): string {
  return `${key.image_sha256}:${key.model_id}:${String(key.information_extracted)}`;
}

export function create_vibe_encoding_cache(
  repository: NovelAiVibeEncodingRepository,
  namespace: () => string,
  now: () => string,
): VibeEncodingCache {
  return {
    async get(key) {
      const record = await repository.get(namespace(), await key_to_uuid(cache_key(key)));
      return record?.encoding ?? null;
    },
    async put(key, encoding) {
      const timestamp = now();
      const id = await key_to_uuid(cache_key(key));
      await repository.put(namespace(), {
        schema_version: 1,
        id,
        namespace: namespace(),
        record_key: `${namespace()}:${id}`,
        created_at: timestamp,
        updated_at: timestamp,
        image_sha256: key.image_sha256,
        model_id: key.model_id,
        information_extracted: key.information_extracted,
        encoding,
      });
    },
  };
}

function media_type_of(bytes: Uint8Array): ProviderSourceAsset["media_type"] {
  if (bytes[0] === 0xff && bytes[1] === 0xd8) {
    return "image/jpeg";
  }
  if (bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46) {
    return "image/webp";
  }
  return "image/png";
}

export interface ProviderInputStore {
  put(bytes: Uint8Array): Promise<AssetId>;
  read(asset_id: AssetId): Promise<ProviderSourceAsset | null>;
}

export function create_provider_input_store(
  repository: ProviderInputAssetRepository,
  namespace: () => string,
  now: () => number,
): ProviderInputStore {
  async function prune(): Promise<void> {
    const cutoff = now() - INPUT_RETENTION_MS;
    for (const record of await repository.list(namespace())) {
      if (Date.parse(record.created_at) < cutoff) {
        await repository.delete(namespace(), record.id);
      }
    }
  }

  return {
    async put(bytes) {
      await prune();
      const id = AssetIdSchema.parse(crypto.randomUUID());
      const timestamp = new Date(now()).toISOString();
      await repository.put(namespace(), {
        schema_version: 1,
        id,
        namespace: namespace(),
        record_key: `${namespace()}:${id}`,
        created_at: timestamp,
        updated_at: timestamp,
        media_type: media_type_of(bytes),
        byte_length: bytes.byteLength,
        blob: new Uint8Array(bytes).buffer,
      });
      return id;
    },
    async read(asset_id) {
      const record = await repository.get(namespace(), asset_id);
      if (record === null) {
        return null;
      }
      const buffer =
        record.blob instanceof ArrayBuffer ? record.blob : await record.blob.arrayBuffer();
      return { asset_id, media_type: record.media_type, bytes: new Uint8Array(buffer) };
    },
  };
}

/** Gallery images first, then inputs derived for a pending provider request. */
export function with_provider_inputs(
  gallery: ProviderAssetReader,
  inputs: ProviderInputStore,
): ProviderAssetReader {
  return {
    async read(asset_id, signal) {
      const derived = await inputs.read(asset_id);
      return derived ?? gallery.read(asset_id, signal);
    },
  };
}
