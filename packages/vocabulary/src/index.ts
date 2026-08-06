export {
  create_package_client,
  PackageFetchError,
  PackageSourceConfigError,
} from "./package_client.js";
export type {
  DownloadProgress,
  FetchShardOptions,
  PackageClient,
  PackageSourceConfig,
} from "./package_client.js";

export {
  compare_semver,
  PackageVerificationError,
  verify_manifest,
  verify_shard_bytes,
} from "./package_verifier.js";
export type {
  PackageVerificationFailureReason,
  VerifiedShard,
  VerifyManifestOptions,
} from "./package_verifier.js";

export {
  PackageStoreError,
  VocabularyPackageStore,
  VOCABULARY_PACKAGE_STATES,
} from "./package_store.js";
export type { StoredVocabularyPackage, VocabularyPackageState } from "./package_store.js";

export { PackageUpdateError, PackageUpdater } from "./package_updater.js";
export type {
  PackageUpdateProgress,
  PackageUpdateResult,
  PackageUpdaterOptions,
} from "./package_updater.js";

export {
  code_point_group_key,
  normalize_vocabulary_query,
  type NormalizedVocabularyQuery,
} from "./search/query_normalizer.js";
export {
  plan_vocabulary_query,
  resolve_trigram_candidates,
  type VocabularyIndexEntry,
  type VocabularyPlannerCandidate,
  type VocabularyPlannerInput,
} from "./search/query_planner.js";
export {
  rank_vocabulary_candidates,
  select_hydration_targets,
  type RankVocabularyCandidatesOptions,
  type VocabularyRankedResult,
  type VocabularyRecordLike,
} from "./search/result_ranker.js";
export {
  DESKTOP_LRU_BUDGET_BYTES,
  MOBILE_LRU_BUDGET_BYTES,
  resolve_shard_lru_budget_bytes,
  ShardLru,
  type ShardCacheEntry,
  type ShardMemoryMode,
} from "./search/shard_lru.js";
export { decode_shard_bytes, encode_shard_bytes, type DecodedShard } from "./search/shard_codec.js";
export type {
  ShardByteSource,
  VocabularyAliasShardPayload,
  VocabularyDetailShardPayload,
  VocabularyHotShardPayload,
  VocabularyPrefixOrAliasShardPayload,
  VocabularyPrefixShardPayload,
  VocabularyShardPayload,
  VocabularyTrigramShardPayload,
} from "./search/vocabulary_shard_payloads.js";
