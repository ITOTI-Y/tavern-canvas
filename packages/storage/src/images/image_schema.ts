import { ProviderIdSchema, RequestImageArgumentsSchema } from "@tavern-canvas/contracts";
import { z } from "zod";

import { ImageRecordSchema, UuidSchema } from "../database_schema.js";

export const IMAGE_MEDIA_TYPES = ["image/png", "image/jpeg", "image/webp", "video/mp4"] as const;
export const ImageMediaTypeSchema = z.enum(IMAGE_MEDIA_TYPES);
export type ImageMediaType = z.infer<typeof ImageMediaTypeSchema>;

export const SourceMessageIdentitySchema = z.strictObject({
  chat_id: z.string().trim().min(1).max(512),
  message_id: z.string().trim().min(1).max(512),
  swipe_id: z.number().int().nonnegative(),
});
export type SourceMessageIdentity = z.infer<typeof SourceMessageIdentitySchema>;

export const ImageRecordFieldsSchema = z.strictObject({
  provider_id: ProviderIdSchema,
  /** `null` for images generated outside a chat message, such as from the workbench. */
  source_message: SourceMessageIdentitySchema.nullable(),
  generation_parameters: RequestImageArgumentsSchema,
  media_type: ImageMediaTypeSchema,
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  persisted_url: z.url().max(2048).optional(),
  quarantined: z.boolean().default(false),
  // Video only: `poster_image_id` links to a plain image/jpeg record in the same namespace that
  // holds the extracted first-frame poster.
  duration_ms: z.number().int().positive().optional(),
  poster_image_id: UuidSchema.optional(),
  source_job_id: UuidSchema.optional(),
});
export type ImageRecordFields = z.infer<typeof ImageRecordFieldsSchema>;

export const GalleryImageRecordSchema = ImageRecordSchema.extend(ImageRecordFieldsSchema.shape);
export type GalleryImageRecord = z.infer<typeof GalleryImageRecordSchema>;

// `image_records` holds two mutually incompatible strict shapes (migrated rows with data under
// `payload`, gallery rows with flat fields). Readers that tolerate both must validate through this
// union.
export const ImageRecordUnionSchema = z.union([ImageRecordSchema, GalleryImageRecordSchema]);
export type ImageRecordUnion = z.infer<typeof ImageRecordUnionSchema>;

export function is_gallery_image_record(record: ImageRecordUnion): record is GalleryImageRecord {
  return "media_type" in record;
}

const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const JPEG_SIGNATURE = [0xff, 0xd8, 0xff];
const WEBP_RIFF_SIGNATURE = [0x52, 0x49, 0x46, 0x46];
const WEBP_MARKER = [0x57, 0x45, 0x42, 0x50];
const MP4_FTYP_MARKER = [0x66, 0x74, 0x79, 0x70];

function matches_signature(bytes: Uint8Array, signature: readonly number[], offset = 0): boolean {
  if (bytes.length < offset + signature.length) {
    return false;
  }
  return signature.every((byte, index) => bytes[offset + index] === byte);
}

// Sniffs magic bytes instead of trusting a caller-supplied MIME type. packages/storage may only
// depend on contracts, so providers' image_bytes.ts checks are duplicated here.
export function detect_image_media_type(bytes: Uint8Array): ImageMediaType | undefined {
  if (matches_signature(bytes, PNG_SIGNATURE)) {
    return "image/png";
  }
  if (matches_signature(bytes, JPEG_SIGNATURE)) {
    return "image/jpeg";
  }
  if (matches_signature(bytes, WEBP_RIFF_SIGNATURE) && matches_signature(bytes, WEBP_MARKER, 8)) {
    return "image/webp";
  }
  if (matches_signature(bytes, MP4_FTYP_MARKER, 4)) {
    return "video/mp4";
  }
  return undefined;
}
