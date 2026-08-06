import { z } from "zod";

import {
  VocabularyCategorySchema,
  VocabularyPopularitySchema,
  VocabularyRecordIdSchema,
  VocabularyRecordSchema,
} from "./vocabulary.js";

/**
 * Decoded shard payload shapes shared by the builder (encoder) and the
 * Worker search (decoder). See
 * .superpowers/sdd/2026-08-04-tavern-canvas-05-vocabulary/payload-contract.md
 * for the binding definition this file transcribes. Every shard file on disk
 * is one of these values, MessagePack-encoded then gzipped.
 */

export const VOCABULARY_DETAIL_SHARD_MAX_RECORDS = 4_096 as const;
export const VOCABULARY_HOT_SHARD_GLOBAL_CAP = 1_000 as const;
export const VOCABULARY_HOT_SHARD_CATEGORY_CAP = 500 as const;

// key: normalized tag (prefix shards) or normalized alias/translation (alias
// shards); record_id always points at the primary record.
const VocabularyShardKeyEntrySchema = z.tuple([
  z.string().trim().min(1).max(256),
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
