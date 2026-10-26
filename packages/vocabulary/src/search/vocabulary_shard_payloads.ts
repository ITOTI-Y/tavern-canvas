import type { VocabularyManifest, VocabularyShardPath } from "@tavern-canvas/contracts";
import type {
  VocabularyAliasShardPayload,
  VocabularyPrefixShardPayload,
} from "@tavern-canvas/contracts";

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

export interface ShardByteSource {
  manifest(): Promise<VocabularyManifest>;
  shard_bytes(path: VocabularyShardPath): Promise<Uint8Array>;
}
