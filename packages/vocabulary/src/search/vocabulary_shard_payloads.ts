import type { VocabularyManifest, VocabularyShardPath } from "@tavern-canvas/contracts";
import type {
  VocabularyAliasShardPayload,
  VocabularyPrefixShardPayload,
} from "@tavern-canvas/contracts";

/**
 * Payload shapes now come directly from Task 2's canonical
 * `packages/contracts/src/vocabulary_shards.ts` (verified structurally
 * identical to the payload-contract.md addendum this file used to mirror
 * locally: prefix/alias `(key, record_id, popularity)` tuples, trigram
 * `(trigram, deltas)` delta-encoded tuples, detail `{start_id, records}`,
 * hot `{global, by_category}`). This file now only re-exports them for a
 * stable import surface within search/**, plus the one thing that is
 * genuinely local: the `ShardByteSource` port (T4's port, not a payload
 * shape) and a prefix/alias convenience union (contracts keeps prefix and
 * alias as separate types -- identical fields, different `kind` literal --
 * search/** code that only cares about "a key/record_id/popularity entry
 * shard" uses the union).
 */
export type {
  VocabularyAliasShardPayload,
  VocabularyDetailShardPayload,
  VocabularyHotShardPayload,
  VocabularyPrefixShardPayload,
  VocabularyShardPayload,
  VocabularyTrigramShardPayload,
} from "@tavern-canvas/contracts";

export type VocabularyPrefixOrAliasShardPayload =
  VocabularyPrefixShardPayload | VocabularyAliasShardPayload;

/**
 * Storage port the Worker drives to reach package bytes. T3's package store
 * satisfies this at integration; T4 only depends on the interface and drives
 * it with in-memory fakes in tests.
 */
export interface ShardByteSource {
  manifest(): Promise<VocabularyManifest>;
  shard_bytes(path: VocabularyShardPath): Promise<Uint8Array>; // compressed bytes as stored
}
