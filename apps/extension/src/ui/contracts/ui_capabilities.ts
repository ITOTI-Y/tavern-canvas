import type {
  CapabilityMatrix,
  GenerationState,
  ImageGenerationRequest,
  KnowledgeRecord,
  KnowledgeRecordDraft,
  LlmConnectionDraft,
  LlmConnectionProfile,
  LlmConnectionTestResult,
  PersonaProfile,
  PersonaProfileDraft,
  ProviderError,
  ProviderId,
  TavernCanvasSettings,
  Uuid,
  VocabularyCatalogEntry,
  VocabularyCategory,
  VocabularySearchResult,
} from "@tavern-canvas/contracts";

/**
 * The Studio never imports domain modules, storage repositories, or provider adapters directly
 * (roadmap rule 5) -- it depends on these nine capability ports instead. A future adapter layer
 * implements each port by wrapping the real generation/vocabulary modules, storage repositories,
 * the migration runner, and the settings adapter; the shapes below are deliberately faithful to
 * those existing surfaces (see task-1-report.md for the mapping) without importing their classes.
 */

export type Unsubscribe = () => void;

// ---------------------------------------------------------------------------
// Generation
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Provider profiles
// ---------------------------------------------------------------------------

export interface ProviderProfileSummary {
  readonly id: Uuid;
  readonly provider_id: ProviderId;
  readonly display_name: string;
  readonly is_default: boolean;
  readonly updated_at: string;
}

export interface ProviderProfileDraft extends ProviderProfileSummary {
  readonly secret_reference: string | null;
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
}

// ---------------------------------------------------------------------------
// Text-LLM connections (Stage 07 feature-gap addition)
//
// The text counterpart to the image `ProfilesCapability`. It mirrors that port deliberately, with
// one difference that carries the whole credential design: a credential is never part of the save
// payload. `LlmConnectionDraft` (packages/contracts) is a strict object with no credential,
// header, or endpoint field, and `set_credential` is a separate operation whose plaintext argument
// goes straight to host secret storage. Nothing the UI can send reaches a repository as a secret,
// and nothing it reads back carries one.
// ---------------------------------------------------------------------------

export type LlmConnectionsDomainEvent =
  | { readonly type: "connection_upserted"; readonly connection: LlmConnectionProfile }
  | { readonly type: "connection_removed"; readonly connection_id: Uuid };

export interface LlmConnectionsCapability {
  load(): Promise<readonly LlmConnectionProfile[]>;
  subscribe(handler: (event: LlmConnectionsDomainEvent) => void): Unsubscribe;
  save(draft: LlmConnectionDraft): Promise<LlmConnectionProfile>;
  remove(connection_id: Uuid): Promise<void>;
  /** Hands a plaintext credential to host secret storage; resolves with the reference-only view. */
  set_credential(connection_id: Uuid, plaintext_value: string): Promise<LlmConnectionProfile>;
  clear_credential(connection_id: Uuid): Promise<LlmConnectionProfile>;
  test_connection(connection_id: Uuid): Promise<LlmConnectionTestResult>;
}

// ---------------------------------------------------------------------------
// Prompt presets
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Assets (character / outfit / lora / vibe / reference / workflow)
// ---------------------------------------------------------------------------

/**
 * Storage keeps asset content as an opaque payload (packages/storage's namespaced_schema
 * pattern) -- only identity and bookkeeping fields are typed at the storage layer, so the UI
 * capability mirrors that shape instead of inventing per-category schemas the domain doesn't have.
 */
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

// ---------------------------------------------------------------------------
// Personas and knowledge (Stage 07 feature-gap addition)
//
// Stage 06 shipped only read paths for these two. They are separate ports rather than extra
// `AssetCategory` members because a persona and a knowledge entry both carry typed, validated
// fields, while `AssetRecordSummary` is deliberately an opaque payload the storage layer never
// types.
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Gallery
// ---------------------------------------------------------------------------

export type GalleryMediaType = "image/png" | "image/jpeg" | "image/webp";

export interface GalleryRecordSummary {
  readonly id: Uuid;
  readonly provider_id: ProviderId;
  readonly source_chat_id: string;
  readonly source_message_id: number;
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

export interface GalleryCapability {
  load(): Promise<readonly GalleryRecordSummary[]>;
  subscribe(handler: (event: GalleryDomainEvent) => void): Unsubscribe;
  read_bytes(record_id: Uuid): Promise<Uint8Array>;
  pin(record_id: Uuid, pinned: boolean): Promise<void>;
  /** Detaching from a message and deleting the record are distinct confirmed actions (plan rule). */
  detach_from_message(record_id: Uuid): Promise<void>;
  delete_record(record_id: Uuid): Promise<void>;
  bulk_delete(record_ids: readonly Uuid[]): Promise<void>;
}

// ---------------------------------------------------------------------------
// Vocabulary (search + catalog install) -- mirrors VocabularyClient /
// VocabularyCatalogClient's real request/response shape: no event stream, request/response only.
// ---------------------------------------------------------------------------

export interface VocabularySearchPageView {
  readonly results: readonly VocabularySearchResult[];
  readonly next_cursor: string | null;
}

export type VocabularyInstallProgressView =
  | { readonly phase: "verifying_catalog_manifest" }
  | { readonly phase: "downloading"; readonly received_bytes: number; readonly total_bytes: number }
  | { readonly phase: "verifying_package" }
  | { readonly phase: "installing" };

export interface VocabularyCapability {
  load(): Promise<readonly VocabularyCatalogEntry[]>;
  search(query: string, category?: VocabularyCategory): Promise<VocabularySearchPageView>;
  next_page(cursor: string): Promise<VocabularySearchPageView>;
  /**
   * A live VocabularyClient's Worker will not see a package installed mid-session until disposed
   * and recreated (carried over from Stage 05) -- the caller must plan to recreate its search
   * session after this resolves.
   */
  install(
    entry: VocabularyCatalogEntry,
    on_progress?: (progress: VocabularyInstallProgressView) => void,
  ): Promise<void>;
  cancel_install(): void;
}

// ---------------------------------------------------------------------------
// Diagnostics
// ---------------------------------------------------------------------------

export interface DiagnosticsSnapshot {
  readonly capability_matrix: CapabilityMatrix;
  readonly helper_version: string | null;
  readonly protocol_version: string | null;
  readonly storage_usage_bytes: number | null;
  readonly storage_quota_bytes: number | null;
}

/** Correlation fields per the architecture doc's logging contract (generation_anchor, request_id,
 * job_id, provider_id, module_id, error_code); never prompt/message content or secrets. */
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

// ---------------------------------------------------------------------------
// Migration (v2 -> v3)
// ---------------------------------------------------------------------------

export type MigrationJournalStateView =
  | "inventory"
  | "copying"
  | "verifying"
  | "ready_to_switch"
  | "completed"
  | "failed"
  | "not_required";

export interface MigrationSnapshot {
  readonly state: MigrationJournalStateView;
  readonly counts: Readonly<Record<string, number>>;
  readonly warnings: readonly string[];
  readonly failure_reason: string | null;
  readonly failure_message: string | null;
}

export type MigrationDomainEvent = {
  readonly type: "state_changed";
  readonly snapshot: MigrationSnapshot;
};

export interface MigrationCapability {
  load(): Promise<MigrationSnapshot>;
  subscribe(handler: (event: MigrationDomainEvent) => void): Unsubscribe;
  /** run_migration is idempotent/resumable from the journal -- there is no separate retry op. */
  retry(): Promise<MigrationSnapshot>;
  /** UI never auto-deletes v2 data; this requires an explicit typed confirmation string. */
  confirm_legacy_cleanup(confirmation_text: string): Promise<void>;
}

// ---------------------------------------------------------------------------
// Settings
// ---------------------------------------------------------------------------

export type VocabularyUpdateChannel = "bundled" | "remote";

export interface SettingsSnapshot {
  readonly settings: TavernCanvasSettings;
  readonly vocabulary_update_channel: VocabularyUpdateChannel;
}

export type SettingsDomainEvent = {
  readonly type: "settings_changed";
  readonly settings: TavernCanvasSettings;
};

export interface SettingsCapability {
  load(): Promise<SettingsSnapshot>;
  subscribe(handler: (event: SettingsDomainEvent) => void): Unsubscribe;
  update(partial: Partial<TavernCanvasSettings>): Promise<TavernCanvasSettings>;
  /** Records disclosure acknowledgment for one normalized origin's plaintext HTTP risk. */
  acknowledge_http_origin(origin: string): Promise<void>;
  set_vocabulary_update_channel(channel: VocabularyUpdateChannel): Promise<void>;
  export_archive(): Promise<Blob>;
  import_archive(archive: Blob): Promise<void>;
}

// ---------------------------------------------------------------------------
// Aggregate
// ---------------------------------------------------------------------------

export interface StudioCapabilities {
  readonly generation: GenerationCapability;
  readonly profiles: ProfilesCapability;
  readonly llm_connections: LlmConnectionsCapability;
  readonly prompt_presets: PromptPresetsCapability;
  readonly assets: AssetsCapability;
  readonly personas: PersonasCapability;
  readonly knowledge: KnowledgeCapability;
  readonly gallery: GalleryCapability;
  readonly vocabulary: VocabularyCapability;
  readonly diagnostics: DiagnosticsCapability;
  readonly migration: MigrationCapability;
  readonly settings: SettingsCapability;
}

/** The stable loading/failure key for each capability -- doubles as the controller's slice code. */
export type CapabilityId = keyof StudioCapabilities;
