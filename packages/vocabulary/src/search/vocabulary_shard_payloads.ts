import type {
  VocabularyCategory,
  VocabularyManifest,
  VocabularyRecord,
  VocabularyShardPath,
} from "@tavern-canvas/contracts";

/**
 * Local structural mirror of the controller contract addendum's decoded
 * shard payload shapes (`.superpowers/sdd/2026-08-04-tavern-canvas-05-vocabulary/payload-contract.md`,
 * BINDING for T2/T4). T2 commits the canonical Zod version as
 * `packages/contracts/src/vocabulary_shards.ts`; the controller swaps every
 * import of this file for that one at merge, so this stays the single file
 * search/** code depends on for these shapes.
 */

export interface VocabularyPrefixOrAliasShardPayload {
  readonly kind: "prefix" | "alias";
  // sorted by key (code-point order), then popularity desc, then record_id asc.
  // For alias shards, key is the normalized alias/translation string and
  // record_id points at the primary record.
  readonly entries: readonly (readonly [key: string, record_id: number, popularity: number])[];
}

export interface VocabularyTrigramShardPayload {
  readonly kind: "trigram";
  // each normalized 3-code-point sequence -> ascending record_ids,
  // delta-encoded: [first_id, id2-first_id, id3-id2, ...]; entries sorted by
  // trigram (code-point order).
  readonly entries: readonly (readonly [trigram: string, deltas: readonly number[]])[];
}

export interface VocabularyDetailShardPayload {
  readonly kind: "detail";
  // at most 4096 consecutive records ordered by record_id.
  readonly start_id: number;
  readonly records: readonly VocabularyRecord[];
}

export interface VocabularyHotShardPayload {
  readonly kind: "hot";
  // record_ids by popularity desc, then record_id asc; global capped at
  // 1000, per-category capped at 500 each.
  readonly global: readonly number[];
  readonly by_category: Partial<Record<VocabularyCategory, readonly number[]>>;
}

export type VocabularyShardPayload =
  | VocabularyPrefixOrAliasShardPayload
  | VocabularyTrigramShardPayload
  | VocabularyDetailShardPayload
  | VocabularyHotShardPayload;

/**
 * Storage port the Worker drives to reach package bytes. T3's package store
 * satisfies this at integration; T4 only depends on the interface and drives
 * it with in-memory fakes in tests.
 */
export interface ShardByteSource {
  manifest(): Promise<VocabularyManifest>;
  shard_bytes(path: VocabularyShardPath): Promise<Uint8Array>; // compressed bytes as stored
}
