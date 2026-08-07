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

// These domain fields live as flat properties on the record (mirroring how
// GenerationJobSchema adds its own fields in database_schema.ts) rather than
// nested under the generic `payload` field. `payload` is typed as
// `JsonValue | undefined`, and a structured object with optional properties
// does not structurally satisfy that recursive index-signature type under
// exactOptionalPropertyTypes.
export const ImageRecordFieldsSchema = z.strictObject({
  provider_id: ProviderIdSchema,
  source_message: SourceMessageIdentitySchema,
  generation_parameters: RequestImageArgumentsSchema,
  media_type: ImageMediaTypeSchema,
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  persisted_url: z.url().max(2048).optional(),
  quarantined: z.boolean().default(false),
  // Video-only, both optional (Stage 07 Task 3): `duration_ms` is read directly off the decoded
  // media_type="video/mp4" record. `poster_image_id` links to a plain image/jpeg record created
  // in the same namespace holding an extracted first-frame poster, rather than a second blob field
  // on this record -- this reuses put_image/create_image_record unchanged for both the video bytes
  // and the poster bytes instead of teaching the store a two-blob-per-record shape.
  duration_ms: z.number().int().positive().optional(),
  poster_image_id: UuidSchema.optional(),
  source_job_id: UuidSchema.optional(),
});
export type ImageRecordFields = z.infer<typeof ImageRecordFieldsSchema>;

export const GalleryImageRecordSchema = ImageRecordSchema.extend(ImageRecordFieldsSchema.shape);
export type GalleryImageRecord = z.infer<typeof GalleryImageRecordSchema>;

/**
 * `image_records` holds two mutually-incompatible shapes sharing one store:
 * migrated v2 rows (`ImageRecordSchema`, generic data under `payload`) and
 * runtime gallery rows (`GalleryImageRecordSchema`, flat domain fields). Both
 * are `z.strictObject`, so each rejects the other outright. Any reader that
 * must tolerate a namespace containing both — archive export/import,
 * blob-corruption quarantine — validates through this union instead of
 * either shape alone (Stage 04 review finding I1).
 */
export const ImageRecordUnionSchema = z.union([ImageRecordSchema, GalleryImageRecordSchema]);
export type ImageRecordUnion = z.infer<typeof ImageRecordUnionSchema>;

/** `media_type` exists only on the gallery shape — `ImageRecordSchema` is a strictObject that cannot carry it. */
export function is_gallery_image_record(record: ImageRecordUnion): record is GalleryImageRecord {
  return "media_type" in record;
}

const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const JPEG_SIGNATURE = [0xff, 0xd8, 0xff];
const WEBP_RIFF_SIGNATURE = [0x52, 0x49, 0x46, 0x46];
const WEBP_MARKER = [0x57, 0x45, 0x42, 0x50];
// ISO-BMFF/MP4: a 4-byte box-size field (value varies) followed by the 4-character box type. The
// first top-level box is not always literally "ftyp" (some encoders emit "free"/"skip" first), but
// every MP4 this app either generates or accepts starts with one, matching this app's own
// fix_mp4_faststart (video_generation.ts) box-scan assumption.
const MP4_FTYP_MARKER = [0x66, 0x74, 0x79, 0x70];

function matches_signature(bytes: Uint8Array, signature: readonly number[], offset = 0): boolean {
  if (bytes.length < offset + signature.length) {
    return false;
  }
  return signature.every((byte, index) => bytes[offset + index] === byte);
}

/**
 * Independently sniffs the media type from magic bytes instead of trusting a
 * caller-supplied MIME type. This duplicates the minimal signature checks
 * from Stage 03's packages/providers/src/image_bytes.ts: packages/storage may
 * only depend on packages/contracts, so it cannot import packages/providers.
 */
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
