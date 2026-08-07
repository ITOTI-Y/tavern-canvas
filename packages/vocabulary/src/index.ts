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
  detect_shard_memory_mode,
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

export {
  IMPORT_SOURCE_ADAPTERS,
  ImportedRecordDraftSchema,
  ImportSourceFormatError,
  legacy_v2_adapter,
  tavern_canvas_jsonl_adapter,
} from "./import/import_source.js";
export type {
  ImportBatchParseResult,
  ImportedRecordDraft,
  ImportSourceAdapter,
  MalformedImportRecord,
} from "./import/import_source.js";
export {
  DEFAULT_MAX_BATCH_PAYLOAD_LENGTH,
  DEFAULT_MAX_TOTAL_RECORDS,
  ImportBuilder,
  ImportBuilderError,
  ImportCancelledError,
  ImportSizeLimitError,
} from "./import/import_builder.js";
export type {
  ImportBatchOutcome,
  ImportBatchRequest,
  ImportBuilderOptions,
  ImportProgress,
} from "./import/import_builder.js";

export {
  CatalogFetchError,
  CatalogPlanError,
  CatalogSourceConfigError,
  CatalogValidationError,
  create_catalog_client,
  DEFAULT_CATALOG_URL,
  plan_catalog_install,
} from "./catalog/catalog_client.js";
export type {
  CatalogClient,
  CatalogClientOptions,
  CatalogInstallPlanOptions,
  FetchCatalogOptions,
} from "./catalog/catalog_client.js";

export { CatalogInstallError, install_catalog_entry } from "./catalog/catalog_install.js";
export type {
  CatalogInstallFailureReason,
  CatalogInstallOptions,
  CatalogInstallProgress,
} from "./catalog/catalog_install.js";
