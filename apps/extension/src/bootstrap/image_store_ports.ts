import type { ImageGenerationRequest, ProviderId } from "@tavern-canvas/contracts";
import type { ProviderAdapter, ProviderAssetReader } from "@tavern-canvas/providers";
import {
  create_business_repositories,
  GalleryImageRecordRepository,
  ImageRecordFieldsSchema,
  put_image,
  read_image_bytes,
  type PutImageRecordMetadata,
  type StorageDatabase,
} from "@tavern-canvas/storage";

import type { ImageStorePort } from "../modules/media/media_command_service.js";

/** Longest side of a gallery or library thumbnail, in pixels. */
const THUMBNAIL_EDGE = 384;

/** Scales an image to a WebP no larger than THUMBNAIL_EDGE on its longest side. */
export async function make_webp_thumbnail(
  bytes: Uint8Array,
  media_type: string,
): Promise<Uint8Array> {
  const bitmap = await createImageBitmap(new Blob([new Uint8Array(bytes)], { type: media_type }));
  const scale = Math.min(1, THUMBNAIL_EDGE / Math.max(bitmap.width, bitmap.height));
  const canvas = new OffscreenCanvas(
    Math.max(1, Math.round(bitmap.width * scale)),
    Math.max(1, Math.round(bitmap.height * scale)),
  );
  const context = canvas.getContext("2d");
  if (context === null) {
    bitmap.close();
    throw new Error("This browser cannot draw thumbnails");
  }
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const blob = await canvas.convertToBlob({ type: "image/webp", quality: 0.82 });
  return new Uint8Array(await blob.arrayBuffer());
}

export async function build_provider_adapters(
  database: StorageDatabase | null,
): Promise<Partial<Record<ProviderId, ProviderAdapter<ImageGenerationRequest>>>> {
  const { ComfyUiAdapter, GoogleImageAdapter, NovelAiAdapter, OpenAiImageAdapter, SdWebuiAdapter } =
    await import("@tavern-canvas/providers/adapters");
  const adapters: Record<string, ProviderAdapter<ImageGenerationRequest>> = {
    novelai: new NovelAiAdapter(),
    sd_webui: new SdWebuiAdapter(),
    openai_image: new OpenAiImageAdapter(),
    google_image: new GoogleImageAdapter(),
  };
  if (database !== null) {
    const repositories = create_business_repositories(database);
    adapters.comfyui = new ComfyUiAdapter({
      workflow_store: {
        async load(workflow_id) {
          const record = await repositories.comfy_workflows.get("primary", workflow_id);
          return record?.payload;
        },
      },
    });
  }
  return adapters;
}

export function create_asset_reader(
  database: StorageDatabase,
  namespace: () => string,
): ProviderAssetReader {
  const records = new GalleryImageRecordRepository(database);
  return {
    async read(asset_id) {
      const record = await records.get(namespace(), asset_id);
      if (record === null) {
        throw new Error(`Source asset ${asset_id} is not in the image store`);
      }
      const bytes = await read_image_bytes(database, record.sha256);
      if (bytes === null) {
        throw new Error(`Source asset ${asset_id} has no stored bytes`);
      }
      if (record.media_type === "video/mp4") {
        throw new Error(`Source asset ${asset_id} is a video and cannot be a provider input`);
      }
      return { asset_id, media_type: record.media_type, bytes };
    },
  };
}

function to_image_metadata(metadata: Readonly<Record<string, unknown>>): PutImageRecordMetadata {
  return ImageRecordFieldsSchema.omit({ media_type: true, quarantined: true }).parse(metadata);
}

export function create_image_store_port(
  database: StorageDatabase,
  namespace: () => string,
): ImageStorePort {
  return {
    async put_image(input) {
      const record = await put_image(database, namespace(), {
        id: input.id,
        bytes: input.bytes,
        claimed_media_type: input.claimed_media_type,
        created_at: input.created_at,
        metadata: to_image_metadata(input.metadata),
      });
      return { id: record.id };
    },
    async read_image(id) {
      const records = new GalleryImageRecordRepository(database);
      const record = await records.get(namespace(), id);
      if (record === null) {
        return null;
      }
      const bytes = await read_image_bytes(database, record.sha256);
      return bytes === null ? null : { bytes, media_type: record.media_type };
    },
  };
}
