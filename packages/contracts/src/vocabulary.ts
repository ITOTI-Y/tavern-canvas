import { z } from "zod";

import { Sha256Schema } from "./generation.js";

export const VOCABULARY_SCHEMA_VERSION = 1 as const;

export const VocabularyRecordIdSchema = z.number().int().nonnegative();
export type VocabularyRecordId = z.infer<typeof VocabularyRecordIdSchema>;

export const VocabularyCategorySchema = z.string().trim().max(64);
export type VocabularyCategory = z.infer<typeof VocabularyCategorySchema>;

export const VocabularyPopularitySchema = z.number().int().nonnegative();
export type VocabularyPopularity = z.infer<typeof VocabularyPopularitySchema>;

export const VocabularyIndexKindSchema = z.enum(["prefix", "alias", "trigram", "detail", "hot"]);
export type VocabularyIndexKind = z.infer<typeof VocabularyIndexKindSchema>;

/**
 * Folds display text into a stable search key: NFKC composition (so composed
 * and combining-accent forms collapse together, and fullwidth forms fold to
 * ASCII), underscore-to-space conversion, lowercasing, whitespace collapse,
 * and trim. Never mutates the user-visible original tag/alias/translation —
 * callers index the normalized key alongside the untouched source field.
 */
export function normalize_vocabulary_search_key(text: string): string {
  return text.normalize("NFKC").replace(/_/gu, " ").toLowerCase().replace(/\s+/gu, " ").trim();
}

export const VocabularyRecordSchema = z.strictObject({
  record_id: z.number().int().nonnegative(),
  tag: z.string().trim().min(1).max(256),
  translation: z.string().trim().max(512).optional(),
  aliases: z.array(z.string().trim().min(1).max(256)).max(32).default([]),
  category: z.string().trim().max(64).optional(),
  popularity: z.number().int().nonnegative().default(0),
  description: z.string().trim().max(4_096).optional(),
});
export type VocabularyRecord = z.infer<typeof VocabularyRecordSchema>;

export const VocabularyRecordCollectionSchema = z.array(VocabularyRecordSchema).check((context) => {
  const seen_record_ids = new Set<number>();
  const seen_normalized_tags = new Set<string>();

  context.value.forEach((record, index) => {
    if (seen_record_ids.has(record.record_id)) {
      context.issues.push({
        code: "custom",
        input: record.record_id,
        message: `duplicate record_id: ${String(record.record_id)}`,
        path: [index, "record_id"],
      });
    }
    seen_record_ids.add(record.record_id);

    const normalized_tag = normalize_vocabulary_search_key(record.tag);
    if (seen_normalized_tags.has(normalized_tag)) {
      context.issues.push({
        code: "custom",
        input: record.tag,
        message: `duplicate normalized tag: ${normalized_tag}`,
        path: [index, "tag"],
      });
    }
    seen_normalized_tags.add(normalized_tag);
  });
});
export type VocabularyRecordCollection = z.infer<typeof VocabularyRecordCollectionSchema>;

const SEMVER_PATTERN =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/u;

export const VocabularySemverSchema = z.string().regex(SEMVER_PATTERN);
export type VocabularySemver = z.infer<typeof VocabularySemverSchema>;

export const VocabularyPackageIdSchema = z
  .string()
  .trim()
  .min(1)
  .max(128)
  .regex(/^[a-z][a-z0-9_-]*$/u);
export type VocabularyPackageId = z.infer<typeof VocabularyPackageIdSchema>;

const PATH_TRAVERSAL_PATTERN = /\.\./u;

export const VocabularyShardPathSchema = z
  .string()
  .trim()
  .min(1)
  .max(512)
  .refine(
    (value) =>
      !value.startsWith("/") && !value.includes("\\") && !PATH_TRAVERSAL_PATTERN.test(value),
    "must be a relative path without traversal segments",
  );
export type VocabularyShardPath = z.infer<typeof VocabularyShardPathSchema>;

export const VocabularyShardEntrySchema = z.strictObject({
  shard_id: z.string().trim().min(1).max(128),
  package_id: VocabularyPackageIdSchema,
  kind: VocabularyIndexKindSchema,
  path: VocabularyShardPathSchema,
  sha256: Sha256Schema,
  byte_length: z.number().int().nonnegative(),
});
export type VocabularyShardEntry = z.infer<typeof VocabularyShardEntrySchema>;

export const VocabularyManifestSchema = z
  .strictObject({
    package_id: VocabularyPackageIdSchema,
    schema_version: z.literal(VOCABULARY_SCHEMA_VERSION),
    data_version: VocabularySemverSchema,
    changelog: z.string().trim().min(1).max(4_096),
    record_count: z.number().int().nonnegative(),
    compressed_size: z.number().int().nonnegative(),
    minimum_extension_version: VocabularySemverSchema,
    shards: z.array(VocabularyShardEntrySchema).min(1).max(50_000),
  })
  .check((context) => {
    const seen_shard_ids = new Set<string>();

    context.value.shards.forEach((shard, index) => {
      if (seen_shard_ids.has(shard.shard_id)) {
        context.issues.push({
          code: "custom",
          input: shard.shard_id,
          message: `duplicate shard_id: ${shard.shard_id}`,
          path: ["shards", index, "shard_id"],
        });
      }
      seen_shard_ids.add(shard.shard_id);

      if (shard.package_id !== context.value.package_id) {
        context.issues.push({
          code: "custom",
          input: shard.package_id,
          message: "shard package_id must match manifest package_id",
          path: ["shards", index, "package_id"],
        });
      }
    });
  });
export type VocabularyManifest = z.infer<typeof VocabularyManifestSchema>;
