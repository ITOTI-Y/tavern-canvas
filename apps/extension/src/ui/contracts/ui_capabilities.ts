import type {
  CapabilityMatrix,
  GenerationState,
  ImageGenerationRequest,
  KnowledgeRecord,
  KnowledgeRecordDraft,
  LlmConnectionDraft,
  LlmConnectionProfile,
  LlmConnectionTestResult,
  NovelAiAccountStatus,
  NovelAiCostEstimate,
  NovelAiRequest,
  PersonaProfile,
  PersonaProfileDraft,
  ProviderError,
  ProviderId,
  ResolvedNovelAiModel,
  TavernCanvasSettings,
  Uuid,
  VocabularyCatalogEntry,
  VocabularyCategory,
  VocabularySearchResult,
  NovelAiGenerationDefaults,
} from "@tavern-canvas/contracts";
import type { BrowserSecretVaultStatus } from "../../storage/browser_secret_vault.js";

export type Unsubscribe = () => void;

export interface GenerationJobSummary {
  readonly job_id: Uuid;
  readonly request_id: Uuid;
  readonly provider_id: ProviderId;
  readonly state: GenerationState;
  readonly image_count: number;
  readonly completed_image_ids: readonly Uuid[];
  readonly error: ProviderError | null;
  readonly submitted_at: string;
}

export interface GenerationSubmitCommand {
  readonly profile_id: Uuid;
  readonly request: ImageGenerationRequest;
}

export type GenerationDomainEvent =
  | { readonly type: "job_updated"; readonly job: GenerationJobSummary }
  | { readonly type: "job_removed"; readonly job_id: Uuid };

export interface GenerationCapability {
  load(): Promise<readonly GenerationJobSummary[]>;
  subscribe(handler: (event: GenerationDomainEvent) => void): Unsubscribe;
  /** Carries a profile ID and a typed request only; credential resolution stays server/adapter-side. */
  submit(command: GenerationSubmitCommand): Promise<GenerationJobSummary>;
  cancel(job_id: Uuid): Promise<GenerationJobSummary>;
  retry(job_id: Uuid): Promise<GenerationJobSummary>;
}

export interface ProviderProfileSummary {
  readonly id: Uuid;
  readonly provider_id: ProviderId;
  readonly display_name: string;
  readonly model_id?: string | null;
  readonly workflow_id?: string | null;
  readonly is_default: boolean;
  readonly credential_reference: string | null;
  readonly updated_at: string;
  /** Only a NovelAI profile has them; `null` until saved once. */
  readonly novelai_defaults: NovelAiGenerationDefaults | null;
}

export interface ProviderProfileDraft {
  readonly id: Uuid;
  readonly provider_id: ProviderId;
  readonly display_name: string;
  readonly model_id: string;
  readonly workflow_id: string | null;
  readonly is_default: boolean;
  readonly updated_at: string;
}

export type ProfileConnectionTestResult =
  | { readonly status: "success"; readonly latency_ms: number }
  | { readonly status: "failed"; readonly error: ProviderError };

export type ProfilesDomainEvent =
  | { readonly type: "profile_upserted"; readonly profile: ProviderProfileSummary }
  | { readonly type: "profile_removed"; readonly profile_id: Uuid };

export interface ProfilesCapability {
  load(): Promise<readonly ProviderProfileSummary[]>;
  subscribe(handler: (event: ProfilesDomainEvent) => void): Unsubscribe;
  save(profile: ProviderProfileDraft): Promise<ProviderProfileSummary>;
  remove(profile_id: Uuid): Promise<void>;
  test_connection(profile_id: Uuid): Promise<ProfileConnectionTestResult>;
  set_credential(profile_id: Uuid, plaintext_value: string): Promise<ProviderProfileSummary>;
  clear_credential(profile_id: Uuid): Promise<ProviderProfileSummary>;
  save_novelai_defaults(
    profile_id: Uuid,
    defaults: NovelAiGenerationDefaults,
  ): Promise<ProviderProfileSummary>;
}

// A credential is never part of a save payload; `set_credential` hands the plaintext straight to the credential backend.

export type LlmConnectionsDomainEvent =
  | { readonly type: "connection_upserted"; readonly connection: LlmConnectionProfile }
  | { readonly type: "connection_removed"; readonly connection_id: Uuid };

export interface LlmConnectionsCapability {
  load(): Promise<readonly LlmConnectionProfile[]>;
  subscribe(handler: (event: LlmConnectionsDomainEvent) => void): Unsubscribe;
  save(draft: LlmConnectionDraft): Promise<LlmConnectionProfile>;
  remove(connection_id: Uuid): Promise<void>;
  /** Hands a plaintext credential to the selected backend; resolves with the reference-only view. */
  set_credential(connection_id: Uuid, plaintext_value: string): Promise<LlmConnectionProfile>;
  clear_credential(connection_id: Uuid): Promise<LlmConnectionProfile>;
  test_connection(connection_id: Uuid): Promise<LlmConnectionTestResult>;
}

export interface NovelAiCapability {
  /** Tier, expiry and Anlas balance of the account behind the active NovelAI profile. */
  get_account(): Promise<NovelAiAccountStatus>;
  /** The selectable models known without a network request. */
  load(): Promise<readonly ResolvedNovelAiModel[]>;
  /** Re-reads the published model list from novelai.net through an available host relay. */
  refresh_models(): Promise<readonly ResolvedNovelAiModel[]>;
  /** Uses the balance from the last `get_account` call to decide whether the Opus free image applies. */
  estimate_cost(request: NovelAiRequest): Promise<NovelAiCostEstimate>;
}

export interface PromptPresetSummary {
  readonly id: Uuid;
  readonly display_name: string;
  readonly group: string | null;
  readonly updated_at: string;
}

export interface PromptReplacementRule {
  readonly id: string;
  readonly triggers: readonly string[];
  readonly replacement: string;
}

export interface PromptRegexRule {
  readonly id: string;
  readonly pattern: string;
  readonly flags: string;
  readonly replacement: string;
}

export interface PromptPresetDraft {
  readonly id: Uuid | null;
  readonly display_name: string;
  readonly group: string | null;
  readonly fixed_positive_prompt: string;
  readonly fixed_negative_prompt: string;
  readonly replacement_rules: readonly PromptReplacementRule[];
  readonly regex_rules: readonly PromptRegexRule[];
}

export type PromptPresetsDomainEvent =
  | { readonly type: "preset_upserted"; readonly preset: PromptPresetSummary }
  | { readonly type: "preset_removed"; readonly preset_id: Uuid };

export interface PromptPresetsCapability {
  load(): Promise<readonly PromptPresetSummary[]>;
  subscribe(handler: (event: PromptPresetsDomainEvent) => void): Unsubscribe;
  load_draft(preset_id: Uuid): Promise<PromptPresetDraft>;
  save_draft(draft: PromptPresetDraft): Promise<PromptPresetSummary>;
  remove(preset_id: Uuid): Promise<void>;
  bulk_remove(preset_ids: readonly Uuid[]): Promise<void>;
  test_regex(rule: PromptRegexRule, sample_text: string): Promise<string>;
}

export type AssetCategory = "character" | "outfit" | "lora" | "vibe" | "reference" | "workflow";

export interface AssetRecordSummary {
  readonly id: Uuid;
  readonly category: AssetCategory;
  readonly record_key: string;
  readonly display_name: string;
  readonly updated_at: string;
  readonly payload: Readonly<Record<string, unknown>>;
}

export type AssetsDomainEvent =
  | { readonly type: "asset_upserted"; readonly asset: AssetRecordSummary }
  | { readonly type: "asset_removed"; readonly category: AssetCategory; readonly asset_id: Uuid };

export interface AssetsCapability {
  load(): Promise<Readonly<Record<AssetCategory, readonly AssetRecordSummary[]>>>;
  subscribe(handler: (event: AssetsDomainEvent) => void): Unsubscribe;
  save(
    category: AssetCategory,
    asset: Omit<AssetRecordSummary, "updated_at">,
  ): Promise<AssetRecordSummary>;
  remove(category: AssetCategory, asset_id: Uuid): Promise<void>;
  reorder(category: AssetCategory, ordered_ids: readonly Uuid[]): Promise<void>;
}

export type PersonasDomainEvent =
  | { readonly type: "persona_upserted"; readonly persona: PersonaProfile }
  | { readonly type: "persona_removed"; readonly persona_id: Uuid };

export interface PersonasCapability {
  load(): Promise<readonly PersonaProfile[]>;
  subscribe(handler: (event: PersonasDomainEvent) => void): Unsubscribe;
  save(draft: PersonaProfileDraft): Promise<PersonaProfile>;
  remove(persona_id: Uuid): Promise<void>;
}

export type KnowledgeDomainEvent =
  | { readonly type: "entry_upserted"; readonly entry: KnowledgeRecord }
  | { readonly type: "entry_removed"; readonly entry_id: Uuid };

export interface KnowledgeCapability {
  load(): Promise<readonly KnowledgeRecord[]>;
  subscribe(handler: (event: KnowledgeDomainEvent) => void): Unsubscribe;
  save(draft: KnowledgeRecordDraft): Promise<KnowledgeRecord>;
  set_enabled(entry_id: Uuid, enabled: boolean): Promise<KnowledgeRecord>;
  remove(entry_id: Uuid): Promise<void>;
  bulk_remove(entry_ids: readonly Uuid[]): Promise<void>;
}

export type GalleryMediaType = "image/png" | "image/jpeg" | "image/webp";

export interface GalleryRecordSummary {
  readonly id: Uuid;
  readonly provider_id: ProviderId;
  readonly source_chat_id: string | null;
  readonly source_message_id: number | null;
  readonly media_type: GalleryMediaType;
  readonly width: number | null;
  readonly height: number | null;
  readonly pinned: boolean;
  readonly quarantined: boolean;
  readonly created_at: string;
}

export type GalleryDomainEvent =
  | { readonly type: "record_upserted"; readonly record: GalleryRecordSummary }
  | { readonly type: "record_removed"; readonly record_id: Uuid };

export type SourceRevealOutcome = "revealed" | "other_chat" | "not_found";

export interface GalleryCapability {
  load(): Promise<readonly GalleryRecordSummary[]>;
  subscribe(handler: (event: GalleryDomainEvent) => void): Unsubscribe;
  read_bytes(record_id: Uuid): Promise<Uint8Array>;
  pin(record_id: Uuid, pinned: boolean): Promise<void>;
  /** Detaching from a message and deleting the record are distinct confirmed actions. */
  detach_from_message(record_id: Uuid): Promise<void>;
  delete_record(record_id: Uuid): Promise<void>;
  /** Scrolls the chat to the message the image was generated for. */
  reveal_source(record_id: Uuid): Promise<SourceRevealOutcome>;
  bulk_delete(record_ids: readonly Uuid[]): Promise<void>;
}

export interface VocabularySearchPageView {
  readonly results: readonly VocabularySearchResult[];
  readonly next_cursor: string | null;
}

export type VocabularyInstallProgressView =
  | { readonly phase: "verifying_catalog_manifest" }
  | { readonly phase: "downloading"; readonly received_bytes: number; readonly total_bytes: number }
  | { readonly phase: "verifying_package" }
  | { readonly phase: "installing" };

export type VocabularyImportProgressView =
  | {
      readonly phase: "reading";
      readonly received_bytes: number;
      readonly total_bytes: number;
    }
  | {
      readonly phase: "batch";
      readonly batch_index: number;
      readonly batch_count: number;
      readonly accepted_records: number;
      readonly malformed_records: number;
    }
  | { readonly phase: "indexing" }
  | {
      readonly phase: "staging_shard";
      readonly shard_index: number;
      readonly shard_count: number;
    }
  | { readonly phase: "activating" }
  | {
      readonly phase: "complete";
      readonly data_version: string;
      readonly record_count: number;
      readonly package_record_id: string;
      readonly malformed_records: number;
      readonly merge_conflicts: number;
    }
  | { readonly phase: "cancelled" };

export interface VocabularyCapability {
  load(): Promise<readonly VocabularyCatalogEntry[]>;
  search(query: string, category?: VocabularyCategory): Promise<VocabularySearchPageView>;
  next_page(cursor: string): Promise<VocabularySearchPageView>;
  /** A live VocabularyClient Worker does not see a package installed mid-session; recreate the search session after this resolves. */
  install(
    entry: VocabularyCatalogEntry,
    on_progress?: (progress: VocabularyInstallProgressView) => void,
  ): Promise<void>;
  cancel_install(): void;
}

export interface DiagnosticsSnapshot {
  readonly capability_matrix: CapabilityMatrix;
  readonly helper_version: string | null;
  readonly protocol_version: string | null;
  readonly storage_usage_bytes: number | null;
  readonly storage_quota_bytes: number | null;
}

/** Correlation fields only; never prompt/message content or secrets. */
export interface TaskTimelineEntry {
  readonly event_id: string;
  readonly occurred_at: string;
  readonly event_code: string;
  readonly module_id: string;
  readonly generation_anchor: string | null;
  readonly request_id: Uuid | null;
  readonly job_id: Uuid | null;
  readonly provider_id: ProviderId | null;
  readonly error_code: string | null;
}

export type ConnectionTestResult =
  | { readonly status: "success"; readonly latency_ms: number }
  | { readonly status: "failed"; readonly code: string };

export interface SupportBundle {
  readonly version: string;
  readonly capability_matrix: CapabilityMatrix;
  readonly redacted_settings: Readonly<Record<string, unknown>>;
  readonly error_codes: readonly string[];
  readonly timeline: readonly TaskTimelineEntry[];
}

export type DiagnosticsDomainEvent = {
  readonly type: "timeline_entry_appended";
  readonly entry: TaskTimelineEntry;
};

export interface DiagnosticsCapability {
  load(): Promise<DiagnosticsSnapshot>;
  subscribe(handler: (event: DiagnosticsDomainEvent) => void): Unsubscribe;
  test_connection(): Promise<ConnectionTestResult>;
  load_timeline(): Promise<readonly TaskTimelineEntry[]>;
  export_support_bundle(): Promise<SupportBundle>;
}

export type VocabularyUpdateChannel = "bundled" | "remote";

export interface SettingsSnapshot {
  readonly settings: TavernCanvasSettings;
  readonly vocabulary_update_channel: VocabularyUpdateChannel;
  readonly browser_secret_vault: BrowserSecretVaultStatus;
}

export type SettingsDomainEvent = {
  readonly type: "settings_changed";
  readonly settings: TavernCanvasSettings;
};

export interface SettingsCapability {
  load(): Promise<SettingsSnapshot>;
  subscribe(handler: (event: SettingsDomainEvent) => void): Unsubscribe;
  update(partial: Partial<TavernCanvasSettings>): Promise<TavernCanvasSettings>;
  acknowledge_http_origin(origin: string): Promise<void>;
  /** Hands the Gateway bearer token to the selected backend; settings keep only its reference. */
  set_gateway_token(plaintext_value: string): Promise<void>;
  clear_gateway_token(): Promise<void>;
  /** Writes SillyTavern's own DeepL key, which its translate route and translate extension share. */
  set_analysis_key(plaintext_value: string): Promise<void>;
  clear_analysis_key(): Promise<void>;
  set_deepl_key(plaintext_value: string): Promise<void>;
  clear_deepl_key(): Promise<void>;
  initialize_browser_secret_vault(passphrase: string): Promise<BrowserSecretVaultStatus>;
  unlock_browser_secret_vault(passphrase: string): Promise<BrowserSecretVaultStatus>;
  lock_browser_secret_vault(): Promise<BrowserSecretVaultStatus>;
  reset_browser_secret_vault(): Promise<BrowserSecretVaultStatus>;
  set_vocabulary_update_channel(channel: VocabularyUpdateChannel): Promise<void>;
  import_vocabulary_package(
    file: Blob,
    on_progress?: (progress: VocabularyImportProgressView) => void,
  ): Promise<void>;
  cancel_vocabulary_import(): void;
  export_archive(): Promise<Blob>;
  import_archive(archive: Blob): Promise<void>;
}

export interface StudioCapabilities {
  readonly generation: GenerationCapability;
  readonly profiles: ProfilesCapability;
  readonly llm_connections: LlmConnectionsCapability;
  readonly novelai: NovelAiCapability;
  readonly prompt_presets: PromptPresetsCapability;
  readonly assets: AssetsCapability;
  readonly personas: PersonasCapability;
  readonly knowledge: KnowledgeCapability;
  readonly gallery: GalleryCapability;
  readonly vocabulary: VocabularyCapability;
  readonly diagnostics: DiagnosticsCapability;
  readonly settings: SettingsCapability;
}

export type CapabilityId = keyof StudioCapabilities;
