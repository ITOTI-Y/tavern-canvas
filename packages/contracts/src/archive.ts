import { z } from "zod";

export const ARCHIVE_FORMAT = "tavern-canvas-archive" as const;
export const ARCHIVE_SCHEMA_VERSION = 1 as const;

export const ARCHIVE_RECORD_STORES = [
  "provider_profiles",
  "prompt_presets",
  "comfy_workflows",
  "novelai_vibes",
  "character_profiles",
  "regex_rules",
  "outfit_profiles",
  "lora_profiles",
  "vocabularies",
  "vocabulary_groups",
  "image_records",
  "generation_jobs",
  "legacy_preferences",
] as const;
export type ArchiveRecordStore = (typeof ARCHIVE_RECORD_STORES)[number];
export const ArchiveRecordStoreSchema = z.enum(ARCHIVE_RECORD_STORES);

export const ARCHIVE_EXCLUDED_SECRET_CATEGORIES = [
  "gateway_token",
  "provider_credentials",
  "logs",
  "support_bundles",
  "host_secrets",
] as const;
export type ArchiveExcludedSecretCategory = (typeof ARCHIVE_EXCLUDED_SECRET_CATEGORIES)[number];
export const ArchiveExcludedSecretCategorySchema = z.enum(ARCHIVE_EXCLUDED_SECRET_CATEGORIES);

export const ArchiveManifestSchema = z.strictObject({
  format: z.literal(ARCHIVE_FORMAT),
  schema_version: z.literal(ARCHIVE_SCHEMA_VERSION),
  extension_version: z.string().trim().min(1).max(64),
  created_at: z.iso.datetime({ offset: true }),
  record_counts: z.record(ArchiveRecordStoreSchema, z.number().int().nonnegative()),
  asset_count: z.number().int().nonnegative(),
  excluded_secret_categories: z.array(ArchiveExcludedSecretCategorySchema),
});
export type ArchiveManifest = z.infer<typeof ArchiveManifestSchema>;

export const ArchiveChecksumEntrySchema = z.strictObject({
  sha256: z.string().regex(/^[a-f0-9]{64}$/u),
  byte_length: z.number().int().nonnegative(),
});
export type ArchiveChecksumEntry = z.infer<typeof ArchiveChecksumEntrySchema>;

export const ArchiveChecksumsSchema = z.record(z.string(), ArchiveChecksumEntrySchema);
export type ArchiveChecksums = z.infer<typeof ArchiveChecksumsSchema>;
