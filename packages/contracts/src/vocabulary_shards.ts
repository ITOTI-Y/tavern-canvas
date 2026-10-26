import { z } from "zod";

import {
  VocabularyCategorySchema,
  VocabularyPopularitySchema,
  VocabularyRecordIdSchema,
  VocabularyRecordSchema,
} from "./vocabulary.js";

export const VOCABULARY_DETAIL_SHARD_MAX_RECORDS = 4_096 as const;
export const VOCABULARY_HOT_SHARD_GLOBAL_CAP = 1_000 as const;
export const VOCABULARY_HOT_SHARD_CATEGORY_CAP = 500 as const;

// Alias keys are spread over a fixed number of hash buckets of the two-code-point group key, not the
// whole key: whole-key hashing would reduce alias/translation search to exact match. The Worker
// computes a query's bucket directly, and a bucket is a superset of a group.
export const VOCABULARY_ALIAS_SHARD_BUCKET_COUNT = 512 as const;
export const VOCABULARY_ALIAS_SHARD_GROUP_CODE_POINTS = 2 as const;

const FNV1A_32_OFFSET_BASIS = 2_166_136_261;
const FNV1A_32_PRIME = 16_777_619;

export function fnv1a_32(text: string): number {
  let hash = FNV1A_32_OFFSET_BASIS;
  for (const byte of new TextEncoder().encode(text)) {
    hash = Math.imul(hash ^ byte, FNV1A_32_PRIME);
  }
  return hash >>> 0;
}

/** Builder, import builder and Worker must all use this implementation so bucket names agree. */
export function vocabulary_alias_shard_partition(group_key: string): string {
  const bucket = fnv1a_32(group_key) % VOCABULARY_ALIAS_SHARD_BUCKET_COUNT;
  return `h${String(bucket).padStart(3, "0")}`;
}

// Max 512 matches the translation limit in VocabularyRecordSchema: a 512-char translation must fit
// its own normalized key.
const VocabularyShardKeyEntrySchema = z.tuple([
  z.string().trim().min(1).max(512),
  VocabularyRecordIdSchema,
  VocabularyPopularitySchema,
]);

export const VocabularyPrefixShardPayloadSchema = z.strictObject({
  kind: z.literal("prefix"),
  entries: z.array(VocabularyShardKeyEntrySchema),
});
export type VocabularyPrefixShardPayload = z.infer<typeof VocabularyPrefixShardPayloadSchema>;

export const VocabularyAliasShardPayloadSchema = z.strictObject({
  kind: z.literal("alias"),
  entries: z.array(VocabularyShardKeyEntrySchema),
});
export type VocabularyAliasShardPayload = z.infer<typeof VocabularyAliasShardPayloadSchema>;

// deltas: [first_id, id2-first_id, id3-id2, ...] over ascending record_ids;
// the first delta is the absolute id, later deltas are positive gaps.
const VocabularyTrigramDeltaListSchema = z
  .array(z.number().int())
  .min(1)
  .check((context) => {
    context.value.forEach((delta, index) => {
      if (index === 0) {
        if (delta < 0) {
          context.issues.push({
            code: "custom",
            input: delta,
            message: "first delta must be a nonnegative record_id",
            path: [index],
          });
        }
        return;
      }
      if (delta < 1) {
        context.issues.push({
          code: "custom",
          input: delta,
          message: "subsequent deltas must be positive",
          path: [index],
        });
      }
    });
  });

const VocabularyTrigramEntrySchema = z.tuple([
  z.string().trim().min(1).max(24),
  VocabularyTrigramDeltaListSchema,
]);

export const VocabularyTrigramShardPayloadSchema = z.strictObject({
  kind: z.literal("trigram"),
  entries: z.array(VocabularyTrigramEntrySchema),
});
export type VocabularyTrigramShardPayload = z.infer<typeof VocabularyTrigramShardPayloadSchema>;

export const VocabularyDetailShardPayloadSchema = z.strictObject({
  kind: z.literal("detail"),
  start_id: VocabularyRecordIdSchema,
  records: z.array(VocabularyRecordSchema).min(1).max(VOCABULARY_DETAIL_SHARD_MAX_RECORDS),
});
export type VocabularyDetailShardPayload = z.infer<typeof VocabularyDetailShardPayloadSchema>;

export const VocabularyHotShardPayloadSchema = z.strictObject({
  kind: z.literal("hot"),
  global: z.array(VocabularyRecordIdSchema).max(VOCABULARY_HOT_SHARD_GLOBAL_CAP),
  by_category: z.record(
    VocabularyCategorySchema,
    z.array(VocabularyRecordIdSchema).max(VOCABULARY_HOT_SHARD_CATEGORY_CAP),
  ),
});
export type VocabularyHotShardPayload = z.infer<typeof VocabularyHotShardPayloadSchema>;

export const VocabularyShardPayloadSchema = z.discriminatedUnion("kind", [
  VocabularyPrefixShardPayloadSchema,
  VocabularyAliasShardPayloadSchema,
  VocabularyTrigramShardPayloadSchema,
  VocabularyDetailShardPayloadSchema,
  VocabularyHotShardPayloadSchema,
]);
export type VocabularyShardPayload = z.infer<typeof VocabularyShardPayloadSchema>;
