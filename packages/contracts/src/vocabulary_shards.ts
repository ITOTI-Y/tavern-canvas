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

/**
 * Alias shard partitioning (payload contract addendum v2). Grouping alias
 * keys by their first two code points the way prefix shards group tags
 * explodes for CJK — a bilingual 50,000-record baseline produced 17,313
 * alias shards at ~2.5 entries each — so alias keys are instead spread over
 * a fixed number of hash buckets.
 *
 * The hashed value is the alias key's two-code-point GROUP key, not the
 * whole key. That is a deliberate, flagged refinement of the addendum's
 * literal wording ("hash of the UTF-8 bytes of the normalized alias key"):
 * the alias index is the only prefix-searchable tier aliases and
 * translations have — the trigram index deliberately covers primary tag
 * text only (build_trigram_index.ts) — so hashing whole keys would silently
 * reduce alias/translation search to exact-match-only, deleting partial
 * CJK translation search entirely. Hashing the group key bounds the shard
 * count identically (<= 512), still lets the Worker compute a query's
 * bucket directly with no manifest scan, and keeps every v1 search
 * semantic: a bucket is a superset of a v1 group, and the query planner
 * already filters entries by `startsWith`.
 */
export const VOCABULARY_ALIAS_SHARD_BUCKET_COUNT = 512 as const;
export const VOCABULARY_ALIAS_SHARD_GROUP_CODE_POINTS = 2 as const;

const FNV1A_32_OFFSET_BASIS = 2_166_136_261;
const FNV1A_32_PRIME = 16_777_619;

/** FNV-1a over the UTF-8 bytes of `text`, as an unsigned 32-bit integer. */
export function fnv1a_32(text: string): number {
  let hash = FNV1A_32_OFFSET_BASIS;
  for (const byte of new TextEncoder().encode(text)) {
    hash = Math.imul(hash ^ byte, FNV1A_32_PRIME);
  }
  return hash >>> 0;
}

/**
 * Bucket name for an alias key's group key: `h000`..`h511`. Builder
 * (encode), the in-browser import builder, and the Worker (lookup) all call
 * this one implementation, so the two sides cannot drift.
 */
export function vocabulary_alias_shard_partition(group_key: string): string {
  const bucket = fnv1a_32(group_key) % VOCABULARY_ALIAS_SHARD_BUCKET_COUNT;
  return `h${String(bucket).padStart(3, "0")}`;
}

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
