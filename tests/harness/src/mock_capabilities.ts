import type {
  CapabilityMatrix,
  KnowledgeRecord,
  LlmConnectionProfile,
  LlmConnectionTestResult,
  PersonaProfile,
  ProviderId,
  TavernCanvasSettings,
  Uuid,
  VocabularyCatalogEntry,
} from "@tavern-canvas/contracts";

import type {
  AssetCategory,
  AssetRecordSummary,
  AssetsCapability,
  ConnectionTestResult,
  DiagnosticsCapability,
  DiagnosticsSnapshot,
  GalleryCapability,
  GalleryDomainEvent,
  GalleryRecordSummary,
  GenerationCapability,
  GenerationDomainEvent,
  GenerationJobSummary,
  GenerationSubmitCommand,
  KnowledgeCapability,
  LlmConnectionsCapability,
  MigrationCapability,
  MigrationSnapshot,
  PersonasCapability,
  ProfileConnectionTestResult,
  ProfilesCapability,
  ProviderProfileDraft,
  ProviderProfileSummary,
  PromptPresetDraft,
  PromptPresetsCapability,
  PromptPresetSummary,
  PromptRegexRule,
  SettingsCapability,
  StudioCapabilities,
  SupportBundle,
  TaskTimelineEntry,
  VocabularyCapability,
  VocabularySearchPageView,
} from "../../../apps/extension/src/ui/contracts/ui_capabilities.js";
import { BITMAP_FIXTURES, read_bitmap_fixture_bytes } from "./bitmap_fixtures.js";

export type ScenarioName = "full" | "empty" | "loading" | "partial" | "error";

/** Deterministic, readable, schema-valid UUIDs (UuidSchema: lowercase, version nibble 1-8,
 * variant nibble 8/9/a/b) -- `seq` only ever fills the trailing 12 hex digits so every id stays
 * visually distinguishable in a snapshot diff or a failed assertion message. */
function uuid(seq: number): Uuid {
  return `00000000-0000-4000-8000-${seq.toString().padStart(12, "0")}`;
}

/** `noUncheckedIndexedAccess` makes every fixed-size array index a `T | undefined` -- this
 * fixture data is a compile-time-known, always-in-range constant, so a thrown error (never
 * actually reachable) reads better than a banned non-null assertion at each call site. */
function required<T>(value: T | undefined, label: string): T {
  if (value === undefined) {
    throw new Error(`mock_capabilities: expected ${label} to be defined`);
  }
  return value;
}

/** A real network call is never instant -- resolving a mutating command on the same microtask
 * (a bare `Promise.resolve()`) makes its pending UI state (e.g. a submit button's `aria-busy`)
 * physically unobservable by anything, including a real user's screen reader announcement or a
 * test's own assertion. A short, fixed delay keeps every command genuinely async. */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const PROFILE_SD: ProviderProfileSummary = {
  id: uuid(1),
  provider_id: "sd_webui",
  display_name: "Local SD WebUI",
  is_default: true,
  updated_at: "2026-07-01T09:00:00.000Z",
};

const PROFILE_NOVELAI: ProviderProfileSummary = {
  id: uuid(2),
  provider_id: "novelai",
  display_name:
    "NovelAI production account with an unusually long profile name for truncation testing 测试账号名称非常长用于验证省略号截断效果",
  is_default: false,
  updated_at: "2026-07-02T09:00:00.000Z",
};

const PROFILE_COMFYUI: ProviderProfileSummary = {
  id: uuid(3),
  provider_id: "comfyui",
  display_name: "ComfyUI (workflow, unsupported in Workbench yet)",
  is_default: false,
  updated_at: "2026-07-03T09:00:00.000Z",
};

const REFERENCE_ASSET: AssetRecordSummary = {
  id: uuid(10),
  category: "reference",
  record_key: "mock-reference-sunset",
  display_name: "Mock sunset reference",
  updated_at: "2026-07-04T09:00:00.000Z",
  payload: { source_url: "", notes: "Mock fixture -- warm rim light, three-quarter angle." },
};

const CHARACTER_ASSET: AssetRecordSummary = {
  id: uuid(11),
  category: "character",
  record_key: "mock-character-narrator",
  display_name: "Mock character: Narrator",
  updated_at: "2026-07-04T09:05:00.000Z",
  payload: {
    role_label: "Narrator",
    appearance: "Silver hair, teal coat, mock fixture data only.",
    context_notes: "Used across the harness's Assets and Workbench scenarios.",
    world_info_reference: "",
  },
};

const OUTFIT_ASSET: AssetRecordSummary = {
  id: uuid(12),
  category: "outfit",
  record_key: "mock-outfit-formal",
  display_name: "Mock outfit: Formal coat",
  updated_at: "2026-07-04T09:06:00.000Z",
  payload: {
    description: "Long teal coat, mock fixture data only.",
    character_id: CHARACTER_ASSET.id,
  },
};

const LORA_ASSET: AssetRecordSummary = {
  id: uuid(13),
  category: "lora",
  record_key: "mock-lora-ink",
  display_name: "Mock LoRA: Ink wash style",
  updated_at: "2026-07-04T09:07:00.000Z",
  payload: { weight: 0.8, trigger_words: "ink wash, mock fixture" },
};

const VIBE_ASSET: AssetRecordSummary = {
  id: uuid(14),
  category: "vibe",
  record_key: "mock-vibe-warm",
  display_name: "Mock vibe: Warm evening",
  updated_at: "2026-07-04T09:08:00.000Z",
  payload: { provider: "novelai", notes: "Mock fixture data only.", strength: 0.6 },
};

const WORKFLOW_ASSET: AssetRecordSummary = {
  id: uuid(15),
  category: "workflow",
  record_key: "mock-workflow-basic",
  display_name: "Mock workflow: Basic txt2img",
  updated_at: "2026-07-04T09:09:00.000Z",
  payload: { workflow_json: "{}" },
};

const ASSET_RECORDS: Readonly<Record<AssetCategory, readonly AssetRecordSummary[]>> = {
  character: [CHARACTER_ASSET],
  outfit: [OUTFIT_ASSET],
  lora: [LORA_ASSET],
  vibe: [VIBE_ASSET],
  reference: [REFERENCE_ASSET],
  workflow: [WORKFLOW_ASSET],
};

const EMPTY_ASSET_RECORDS: Readonly<Record<AssetCategory, readonly AssetRecordSummary[]>> = {
  character: [],
  outfit: [],
  lora: [],
  vibe: [],
  reference: [],
  workflow: [],
};

const PRESET_SHORT: PromptPresetSummary = {
  id: uuid(20),
  display_name: "Mock preset: Portrait",
  group: "Characters",
  updated_at: "2026-07-05T09:00:00.000Z",
};

const PRESET_LONG_NAME: PromptPresetSummary = {
  id: uuid(21),
  display_name:
    "Mock preset with a deliberately long English display name for overflow and ellipsis truncation testing across every viewport width",
  group: null,
  updated_at: "2026-07-05T09:10:00.000Z",
};

const PRESET_LONG_NAME_ZH: PromptPresetSummary = {
  id: uuid(22),
  display_name:
    "用于验证在各种视口宽度下文本省略号截断效果的一个故意设置得很长的简体中文预设显示名称示例",
  group: null,
  updated_at: "2026-07-05T09:20:00.000Z",
};

const PRESET_DRAFTS = new Map<Uuid, PromptPresetDraft>([
  [
    PRESET_SHORT.id,
    {
      id: PRESET_SHORT.id,
      display_name: PRESET_SHORT.display_name,
      group: PRESET_SHORT.group,
      fixed_positive_prompt: "a detailed portrait, mock fixture",
      fixed_negative_prompt: "blurry, low detail",
      replacement_rules: [{ id: "r1", triggers: ["mock"], replacement: "fixture" }],
      regex_rules: [{ id: "x1", pattern: "\\bmock\\b", flags: "giu", replacement: "fixture" }],
    },
  ],
  [
    PRESET_LONG_NAME.id,
    {
      id: PRESET_LONG_NAME.id,
      display_name: PRESET_LONG_NAME.display_name,
      group: PRESET_LONG_NAME.group,
      fixed_positive_prompt: "",
      fixed_negative_prompt: "",
      replacement_rules: [],
      regex_rules: [],
    },
  ],
  [
    PRESET_LONG_NAME_ZH.id,
    {
      id: PRESET_LONG_NAME_ZH.id,
      display_name: PRESET_LONG_NAME_ZH.display_name,
      group: PRESET_LONG_NAME_ZH.group,
      fixed_positive_prompt: "",
      fixed_negative_prompt: "",
      replacement_rules: [],
      regex_rules: [],
    },
  ],
]);

const CAPABILITY_MATRIX: CapabilityMatrix = {
  native_tool_manager: { available: true },
  main_generation_events: { available: true },
  private_prompt_generation: { available: false, reason: "Mock fixture: not wired in the harness" },
  message_swipe_metadata: { available: true },
  host_image_upload: { available: true },
  tavern_helper: { available: true },
  tauri_chat_surface: { available: false, reason: "Mock fixture: browser harness, not Tauri" },
  tauri_world_info_activation: {
    available: false,
    reason: "Mock fixture: browser harness, not Tauri",
  },
  gateway_protocol: { available: true },
};

const DIAGNOSTICS_SNAPSHOT: DiagnosticsSnapshot = {
  capability_matrix: CAPABILITY_MATRIX,
  helper_version: "4.9.1",
  protocol_version: "1.2.0",
  storage_usage_bytes: 41_943_040,
  storage_quota_bytes: 2_147_483_648,
};

const TIMELINE: readonly TaskTimelineEntry[] = [
  {
    event_id: "evt-1",
    occurred_at: "2026-07-06T08:00:00.000Z",
    event_code: "generation.job_submitted",
    module_id: "generation",
    generation_anchor: null,
    request_id: null,
    job_id: null,
    provider_id: "sd_webui",
    error_code: null,
  },
  {
    event_id: "evt-2",
    occurred_at: "2026-07-06T08:00:12.000Z",
    event_code: "generation.job_failed",
    module_id: "generation",
    generation_anchor: null,
    request_id: null,
    job_id: null,
    provider_id: "novelai",
    error_code: "provider_unavailable",
  },
];

const MIGRATION_SNAPSHOT: MigrationSnapshot = {
  state: "completed",
  counts: { messages: 128, gallery_records: 42, settings: 1 },
  warnings: [
    "One legacy provider profile referenced a token that could not be transferred and was skipped.",
  ],
  failure_reason: null,
  failure_message: null,
};

const MIGRATION_NOT_REQUIRED: MigrationSnapshot = {
  state: "not_required",
  counts: {},
  warnings: [],
  failure_reason: null,
  failure_message: null,
};

function build_settings(with_http_warning: boolean): TavernCanvasSettings {
  return {
    schema_version: 1,
    active_namespace: "default",
    locale: "auto",
    active_provider_profile_id: PROFILE_SD.id,
    global_concurrency: 2,
    auto_generation_enabled: false,
    fallback_generation_enabled: true,
    gateway: {
      endpoint: with_http_warning ? "http://192.168.1.50:7860" : "https://gateway.example.invalid",
      token_secret_id: "mock-secret-reference",
      http_acknowledgments: {},
    },
    ui: {
      color_mode: "system",
      inspector_width: 320,
      inspector_collapsed: false,
      optional_entry_enabled: false,
    },
  };
}

const VOCABULARY_CATALOG: readonly VocabularyCatalogEntry[] = [
  {
    package_id: "tavern-canvas-baseline",
    display_name: { en: "Baseline Vocabulary (mock)", "zh-CN": "基础词汇表（mock）" },
    description: {
      en: "Mock fixture standing in for the bundled baseline package.",
      "zh-CN": "用于替代内置基线包的 mock 固件数据。",
    },
    data_version: "1.1.0",
    record_count: 50_000,
    compressed_bytes: 3_882_215,
    manifest_sha256: "c9292db97c41a4fed52dd720437a126d54bc77718488b217d7af724ac39fc69"
      .padEnd(64, "0")
      .slice(0, 64),
    languages: ["en", "zh-CN"],
    min_extension_version: "3.0.0-alpha.1",
    base_url: null,
    bundled: true,
    updated_at: "2026-08-06T18:36:34.789Z",
  },
];

/** Every fixture rendered as a gallery record, cycling through provider ids and pin/quarantine
 * flags so the grid, filters, and metadata inspector all have something real to show. */
function build_gallery_records(): readonly GalleryRecordSummary[] {
  const providers: readonly ProviderId[] = [
    "sd_webui",
    "novelai",
    "sd_webui",
    "google_image",
    "sd_webui",
    "novelai",
  ];
  return BITMAP_FIXTURES.map((fixture, index) => ({
    id: uuid(200 + index),
    provider_id: providers[index] ?? "sd_webui",
    source_chat_id: "mock-chat-1",
    source_message_id: 100 + index,
    media_type: fixture.media_type,
    width: fixture.width,
    height: fixture.height,
    pinned: index === 0,
    quarantined: index === 5,
    created_at: new Date(Date.UTC(2026, 6, 10, 8, index * 7)).toISOString(),
  }));
}

const GALLERY_RECORDS = build_gallery_records();
const GALLERY_RECORD_TO_FIXTURE = new Map(
  GALLERY_RECORDS.map(
    (record, index) =>
      [record.id, required(BITMAP_FIXTURES[index], `bitmap fixture ${String(index)}`)] as const,
  ),
);

function build_jobs(): GenerationJobSummary[] {
  const completed_record = required(GALLERY_RECORDS[2], "gallery record 2 (square)");
  return [
    {
      job_id: uuid(300),
      request_id: uuid(310),
      provider_id: "sd_webui",
      state: "running",
      image_count: 2,
      completed_image_ids: [],
      error: null,
      submitted_at: "2026-07-06T08:10:00.000Z",
    },
    {
      job_id: uuid(301),
      request_id: uuid(311),
      provider_id: "sd_webui",
      state: "completed",
      image_count: 1,
      completed_image_ids: [completed_record.id],
      error: null,
      submitted_at: "2026-07-06T08:05:00.000Z",
    },
    {
      job_id: uuid(302),
      request_id: uuid(312),
      provider_id: "novelai",
      state: "failed",
      image_count: 1,
      completed_image_ids: [],
      error: { code: "provider_unavailable", retryable: true },
      submitted_at: "2026-07-06T08:02:00.000Z",
    },
    {
      job_id: uuid(303),
      request_id: uuid(313),
      provider_id: "sd_webui",
      state: "queued",
      image_count: 1,
      completed_image_ids: [],
      error: null,
      submitted_at: "2026-07-06T08:12:00.000Z",
    },
  ];
}

/** Real, working request/response mocks shared by every scenario (subscribe/submit/cancel/retry
 * are genuine state machines, not scripted no-ops -- the interaction workflow spec depends on
 * real job-state transitions actually happening). */
function create_generation_capability(initial_jobs: GenerationJobSummary[]): GenerationCapability {
  const jobs = new Map(initial_jobs.map((job) => [job.job_id, job]));
  const listeners = new Set<(event: GenerationDomainEvent) => void>();
  let sequence = 1000;

  function emit(event: GenerationDomainEvent): void {
    for (const listener of listeners) {
      listener(event);
    }
  }

  function update(job: GenerationJobSummary): void {
    jobs.set(job.job_id, job);
    emit({ type: "job_updated", job });
  }

  return {
    load: () => Promise.resolve([...jobs.values()]),
    subscribe: (handler) => {
      listeners.add(handler);
      return () => {
        listeners.delete(handler);
      };
    },
    submit: (command: GenerationSubmitCommand) => {
      sequence += 1;
      const job_id = uuid(9000 + sequence);
      const image_count = command.request.output_count;
      const job: GenerationJobSummary = {
        job_id,
        request_id: command.request.request_id,
        provider_id: command.request.provider_id,
        state: "running",
        image_count,
        completed_image_ids: [],
        error: null,
        submitted_at: new Date().toISOString(),
      };
      update(job);
      // Mimics the real domain event stream: a job started "running" transitions to "completed"
      // on its own after a short, deterministic delay, so the interaction workflow spec can wait
      // on real UI state instead of the harness faking a synchronous "already done" result.
      setTimeout(() => {
        const completed_ids = BITMAP_FIXTURES.slice(0, image_count).map(
          (_, index) =>
            required(GALLERY_RECORDS[index % GALLERY_RECORDS.length], "gallery record").id,
        );
        update({ ...job, state: "completed", completed_image_ids: completed_ids });
      }, 400);
      return delay(80).then(() => job);
    },
    cancel: (job_id) => {
      const job = jobs.get(job_id);
      if (!job) {
        return Promise.reject(new Error("mock: unknown job"));
      }
      const next: GenerationJobSummary = { ...job, state: "cancelled" };
      update(next);
      return Promise.resolve(next);
    },
    retry: (job_id) => {
      const job = jobs.get(job_id);
      if (!job) {
        return Promise.reject(new Error("mock: unknown job"));
      }
      const next: GenerationJobSummary = { ...job, state: "running", error: null };
      update(next);
      setTimeout(() => {
        update({
          ...next,
          state: "completed",
          completed_image_ids: [required(GALLERY_RECORDS[3], "gallery record 3").id],
        });
      }, 400);
      return Promise.resolve(next);
    },
  };
}

function create_gallery_capability(
  initial_records: readonly GalleryRecordSummary[],
): GalleryCapability {
  const records = new Map(initial_records.map((record) => [record.id, record]));
  const listeners = new Set<(event: GalleryDomainEvent) => void>();

  function emit(event: GalleryDomainEvent): void {
    for (const listener of listeners) {
      listener(event);
    }
  }

  return {
    load: () => Promise.resolve([...records.values()]),
    subscribe: (handler) => {
      listeners.add(handler);
      return () => {
        listeners.delete(handler);
      };
    },
    read_bytes: async (record_id) => {
      const fixture =
        GALLERY_RECORD_TO_FIXTURE.get(record_id) ??
        required(BITMAP_FIXTURES[0], "bitmap fixture 0");
      return read_bitmap_fixture_bytes(fixture);
    },
    pin: (record_id, pinned) => {
      const record = records.get(record_id);
      if (!record) {
        return Promise.reject(new Error("mock: unknown gallery record"));
      }
      const next = { ...record, pinned };
      records.set(record_id, next);
      emit({ type: "record_upserted", record: next });
      return Promise.resolve();
    },
    detach_from_message: (record_id) => {
      const record = records.get(record_id);
      if (!record) {
        return Promise.reject(new Error("mock: unknown gallery record"));
      }
      const next = { ...record, quarantined: true };
      records.set(record_id, next);
      emit({ type: "record_upserted", record: next });
      return Promise.resolve();
    },
    delete_record: (record_id) => {
      records.delete(record_id);
      emit({ type: "record_removed", record_id });
      return Promise.resolve();
    },
    bulk_delete: (record_ids) => {
      for (const record_id of record_ids) {
        records.delete(record_id);
        emit({ type: "record_removed", record_id });
      }
      return Promise.resolve();
    },
  };
}

function create_profiles_capability(initial: ProviderProfileSummary[]): ProfilesCapability {
  const profiles = new Map(initial.map((profile) => [profile.id, profile]));
  return {
    load: () => Promise.resolve([...profiles.values()]),
    subscribe: () => () => {},
    save: (draft: ProviderProfileDraft) => {
      const summary: ProviderProfileSummary = {
        id: draft.id,
        provider_id: draft.provider_id,
        display_name: draft.display_name,
        is_default: draft.is_default,
        updated_at: new Date().toISOString(),
      };
      profiles.set(summary.id, summary);
      return Promise.resolve(summary);
    },
    remove: (profile_id) => {
      profiles.delete(profile_id);
      return Promise.resolve();
    },
    test_connection: (profile_id): Promise<ProfileConnectionTestResult> => {
      const profile = profiles.get(profile_id);
      if (profile?.provider_id === "novelai") {
        return Promise.resolve({
          status: "failed",
          error: { code: "auth_failed", retryable: true },
        });
      }
      return Promise.resolve({ status: "success", latency_ms: 128 });
    },
  };
}

const LLM_CONNECTION_OPENAI: LlmConnectionProfile = {
  id: "9a1f0a2c-1111-4a11-8a11-0b0c0d0e0f01",
  display_name: "Studio text model",
  provider_kind: "openai_compatible",
  route: "/v1/chat/completions",
  model_id: "gpt-4o-mini",
  temperature: 0.7,
  max_output_tokens: 2048,
  is_default: true,
  credential_reference:
    "tavern_canvas:default:9a1f0a2c-1111-4a11-8a11-0b0c0d0e0f01:llm_profile_api_key",
  created_at: "2026-08-01T09:00:00.000Z",
  updated_at: "2026-08-06T18:20:00.000Z",
};

const LLM_CONNECTION_OLLAMA: LlmConnectionProfile = {
  id: "9a1f0a2c-2222-4a22-8a22-0b0c0d0e0f02",
  display_name: "Local Ollama",
  provider_kind: "ollama",
  route: "/api/chat",
  model_id: "qwen2.5:14b",
  temperature: 0.4,
  max_output_tokens: 4096,
  is_default: false,
  credential_reference: null,
  created_at: "2026-08-02T11:30:00.000Z",
  updated_at: "2026-08-05T08:05:00.000Z",
};

function create_llm_connections_capability(
  initial: LlmConnectionProfile[],
): LlmConnectionsCapability {
  const connections = new Map(initial.map((connection) => [connection.id, connection]));
  return {
    load: () => Promise.resolve([...connections.values()]),
    subscribe: () => () => {},
    save: (draft) => {
      const existing = connections.get(draft.id);
      const saved: LlmConnectionProfile = {
        ...draft,
        credential_reference: existing?.credential_reference ?? null,
        created_at: existing?.created_at ?? new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      connections.set(saved.id, saved);
      return Promise.resolve(saved);
    },
    remove: (connection_id) => {
      connections.delete(connection_id);
      return Promise.resolve();
    },
    /** The mock keeps the plaintext exactly as long as the real capability does: not at all. */
    set_credential: (connection_id) => {
      const existing = connections.get(connection_id);
      if (!existing) {
        return Promise.reject(new Error("mock: unknown_llm_connection"));
      }
      const updated: LlmConnectionProfile = {
        ...existing,
        credential_reference: `tavern_canvas:default:${connection_id}:llm_profile_api_key`,
      };
      connections.set(connection_id, updated);
      return Promise.resolve(updated);
    },
    clear_credential: (connection_id) => {
      const existing = connections.get(connection_id);
      if (!existing) {
        return Promise.reject(new Error("mock: unknown_llm_connection"));
      }
      const updated: LlmConnectionProfile = { ...existing, credential_reference: null };
      connections.set(connection_id, updated);
      return Promise.resolve(updated);
    },
    test_connection: (connection_id): Promise<LlmConnectionTestResult> => {
      const connection = connections.get(connection_id);
      if (connection === undefined || connection.credential_reference === null) {
        return Promise.resolve({ status: "failed", code: "auth_failed" });
      }
      return Promise.resolve({
        status: "success",
        latency_ms: 214,
        model_id: connection.model_id,
      });
    },
  };
}

function create_prompt_presets_capability(
  initial_presets: PromptPresetSummary[],
  drafts: Map<Uuid, PromptPresetDraft>,
): PromptPresetsCapability {
  const presets = new Map(initial_presets.map((preset) => [preset.id, preset]));
  let sequence = 5000;
  return {
    load: () => Promise.resolve([...presets.values()]),
    subscribe: () => () => {},
    load_draft: (preset_id) => {
      const draft = drafts.get(preset_id);
      if (!draft) {
        return Promise.reject(new Error("mock: unknown preset"));
      }
      return Promise.resolve(draft);
    },
    save_draft: (draft) => {
      sequence += 1;
      const id = draft.id ?? uuid(9000 + sequence);
      const summary: PromptPresetSummary = {
        id,
        display_name: draft.display_name,
        group: draft.group,
        updated_at: new Date().toISOString(),
      };
      presets.set(id, summary);
      drafts.set(id, { ...draft, id });
      return Promise.resolve(summary);
    },
    remove: (preset_id) => {
      presets.delete(preset_id);
      drafts.delete(preset_id);
      return Promise.resolve();
    },
    bulk_remove: (preset_ids) => {
      for (const preset_id of preset_ids) {
        presets.delete(preset_id);
        drafts.delete(preset_id);
      }
      return Promise.resolve();
    },
    // A real regex test (genuine RegExp execution, not a scripted response) so
    // PromptTestPanel/RegexRules exercise real match/replace behavior end to end.
    test_regex: (rule: PromptRegexRule, sample_text: string) => {
      try {
        const pattern = new RegExp(rule.pattern, rule.flags);
        return Promise.resolve(sample_text.replace(pattern, rule.replacement));
      } catch {
        return Promise.reject(
          Object.assign(new Error("mock: invalid pattern"), { code: "invalid_regex_pattern" }),
        );
      }
    },
  };
}

function create_assets_capability(
  initial: Readonly<Record<AssetCategory, readonly AssetRecordSummary[]>>,
): AssetsCapability {
  const records: Record<AssetCategory, AssetRecordSummary[]> = {
    character: [...initial.character],
    outfit: [...initial.outfit],
    lora: [...initial.lora],
    vibe: [...initial.vibe],
    reference: [...initial.reference],
    workflow: [...initial.workflow],
  };
  return {
    load: () => Promise.resolve(records),
    subscribe: () => () => {},
    save: (category, asset) => {
      const saved: AssetRecordSummary = { ...asset, updated_at: new Date().toISOString() };
      const list = records[category];
      const index = list.findIndex((existing) => existing.id === saved.id);
      if (index === -1) {
        list.push(saved);
      } else {
        list[index] = saved;
      }
      return Promise.resolve(saved);
    },
    remove: (category, asset_id) => {
      records[category] = records[category].filter((asset) => asset.id !== asset_id);
      return Promise.resolve();
    },
    reorder: (category, ordered_ids) => {
      const by_id = new Map(records[category].map((asset) => [asset.id, asset] as const));
      records[category] = ordered_ids
        .map((id) => by_id.get(id))
        .filter((asset): asset is AssetRecordSummary => asset !== undefined);
      return Promise.resolve();
    },
  };
}

const PERSONA_ASSISTANT: PersonaProfile = {
  id: uuid(30),
  display_name: "Mock persona: Narrator",
  role: "assistant",
  description: "Calm, precise, keeps scenes moving. Mock fixture data only.",
  greeting: "Where would you like to begin?",
  avatar_image_id: null,
  is_active: true,
  created_at: "2026-07-06T09:00:00.000Z",
  updated_at: "2026-07-06T09:00:00.000Z",
};

const PERSONA_USER: PersonaProfile = {
  id: uuid(31),
  display_name: "Mock persona: 玩家角色，名称较长用于验证省略号截断效果",
  role: "user",
  description: "Mock fixture data only.",
  greeting: "",
  avatar_image_id: null,
  is_active: true,
  created_at: "2026-07-06T09:05:00.000Z",
  updated_at: "2026-07-06T09:05:00.000Z",
};

const KNOWLEDGE_HARBOR: KnowledgeRecord = {
  id: uuid(40),
  title: "Mock knowledge: Harbor district",
  source_type: "manual",
  content: "The harbor district floods at every spring tide. Mock fixture data only.",
  keywords: ["harbor", "tide"],
  priority: 40,
  enabled: true,
  created_at: "2026-07-07T09:00:00.000Z",
  updated_at: "2026-07-07T09:00:00.000Z",
};

const KNOWLEDGE_OLD_TOWN: KnowledgeRecord = {
  id: uuid(41),
  title: "Mock knowledge: 旧城区",
  source_type: "imported",
  content: "旧城区的石板路在雨天很滑。仅为示例数据。",
  keywords: ["旧城", "石板路"],
  priority: 15,
  enabled: false,
  created_at: "2026-07-07T09:05:00.000Z",
  updated_at: "2026-07-07T09:05:00.000Z",
};

function create_personas_capability(initial: PersonaProfile[]): PersonasCapability {
  const personas = new Map(initial.map((persona) => [persona.id, persona]));
  return {
    load: () => Promise.resolve([...personas.values()]),
    subscribe: () => () => {},
    save: async (draft) => {
      await delay(80);
      const existing = personas.get(draft.id);
      const saved: PersonaProfile = {
        ...draft,
        created_at: existing?.created_at ?? new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      personas.set(saved.id, saved);
      if (saved.is_active) {
        for (const [id, other] of personas) {
          if (id !== saved.id && other.role === saved.role && other.is_active) {
            personas.set(id, { ...other, is_active: false });
          }
        }
      }
      return saved;
    },
    remove: async (persona_id) => {
      await delay(80);
      personas.delete(persona_id);
    },
  };
}

function create_knowledge_capability(initial: KnowledgeRecord[]): KnowledgeCapability {
  const entries = new Map(initial.map((entry) => [entry.id, entry]));
  const sorted = (): KnowledgeRecord[] =>
    [...entries.values()].sort((left, right) => right.priority - left.priority);
  return {
    load: () => Promise.resolve(sorted()),
    subscribe: () => () => {},
    save: async (draft) => {
      await delay(80);
      const existing = entries.get(draft.id);
      const saved: KnowledgeRecord = {
        ...draft,
        created_at: existing?.created_at ?? new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      entries.set(saved.id, saved);
      return saved;
    },
    set_enabled: async (entry_id, enabled) => {
      await delay(60);
      const existing = entries.get(entry_id);
      if (!existing) {
        throw new Error("mock: unknown_knowledge_entry");
      }
      const updated: KnowledgeRecord = { ...existing, enabled };
      entries.set(entry_id, updated);
      return updated;
    },
    remove: async (entry_id) => {
      await delay(80);
      entries.delete(entry_id);
    },
    bulk_remove: async (entry_ids) => {
      await delay(120);
      for (const entry_id of entry_ids) {
        entries.delete(entry_id);
      }
    },
  };
}

function create_vocabulary_capability(): VocabularyCapability {
  return {
    load: () => Promise.resolve(VOCABULARY_CATALOG),
    search: (query): Promise<VocabularySearchPageView> =>
      Promise.resolve({
        results:
          query.trim() === ""
            ? []
            : [
                {
                  record_id: 1,
                  display_text: query.trim(),
                  category: "general",
                  popularity: 50,
                  match_kind: "prefix",
                  score: 1,
                },
              ],
        next_cursor: null,
      }),
    next_page: () => Promise.resolve({ results: [], next_cursor: null }),
    install: () => Promise.resolve(),
    cancel_install: () => {},
  };
}

function create_diagnostics_capability(): DiagnosticsCapability {
  return {
    load: () => Promise.resolve(DIAGNOSTICS_SNAPSHOT),
    subscribe: () => () => {},
    test_connection: (): Promise<ConnectionTestResult> =>
      Promise.resolve({ status: "success", latency_ms: 96 }),
    load_timeline: () => Promise.resolve(TIMELINE),
    export_support_bundle: (): Promise<SupportBundle> =>
      Promise.resolve({
        version: "3.0.0-alpha.1-mock",
        capability_matrix: CAPABILITY_MATRIX,
        redacted_settings: { active_namespace: "default", global_concurrency: 2 },
        error_codes: ["provider_unavailable"],
        timeline: TIMELINE,
      }),
  };
}

function create_migration_capability(snapshot: MigrationSnapshot): MigrationCapability {
  let current = snapshot;
  return {
    load: () => Promise.resolve(current),
    subscribe: () => () => {},
    retry: () => {
      current = { ...current, state: "completed", failure_reason: null, failure_message: null };
      return Promise.resolve(current);
    },
    confirm_legacy_cleanup: () => Promise.resolve(),
  };
}

function create_settings_capability(initial: TavernCanvasSettings): SettingsCapability {
  let current = initial;
  return {
    load: () => Promise.resolve({ settings: current, vocabulary_update_channel: "bundled" }),
    subscribe: () => () => {},
    update: (partial) => {
      current = { ...current, ...partial };
      return Promise.resolve(current);
    },
    acknowledge_http_origin: (origin) => {
      current = {
        ...current,
        gateway: {
          ...current.gateway,
          http_acknowledgments: {
            ...current.gateway.http_acknowledgments,
            [origin]: new Date().toISOString(),
          },
        },
      };
      return Promise.resolve();
    },
    set_gateway_token: () => {
      current = {
        ...current,
        gateway: { ...current.gateway, token_secret_id: "mock-secret-reference" },
      };
      return Promise.resolve();
    },
    clear_gateway_token: () => {
      current = { ...current, gateway: { ...current.gateway, token_secret_id: null } };
      return Promise.resolve();
    },
    set_vocabulary_update_channel: () => Promise.resolve(),
    export_archive: () => Promise.resolve(new Blob(["{}"], { type: "application/json" })),
    import_archive: () => Promise.resolve(),
  };
}

/** A load() that never settles -- keeps StudioShell's is_loading skeleton showing indefinitely
 * (the "loading" scenario is a startup-loading snapshot, not a real transient state). */
function forever_pending<T>(): Promise<T> {
  return new Promise<T>(() => {});
}

function always_rejects<T>(code: string): Promise<T> {
  return Promise.reject(Object.assign(new Error(`mock: ${code}`), { code }));
}

export function create_mock_capabilities(scenario: ScenarioName): StudioCapabilities {
  if (scenario === "loading") {
    return {
      generation: { ...create_generation_capability([]), load: forever_pending },
      profiles: { ...create_profiles_capability([]), load: forever_pending },
      llm_connections: { ...create_llm_connections_capability([]), load: forever_pending },
      prompt_presets: { ...create_prompt_presets_capability([], new Map()), load: forever_pending },
      assets: { ...create_assets_capability(EMPTY_ASSET_RECORDS), load: forever_pending },
      personas: { ...create_personas_capability([]), load: forever_pending },
      knowledge: { ...create_knowledge_capability([]), load: forever_pending },
      gallery: { ...create_gallery_capability([]), load: forever_pending },
      vocabulary: { ...create_vocabulary_capability(), load: forever_pending },
      diagnostics: { ...create_diagnostics_capability(), load: forever_pending },
      migration: { ...create_migration_capability(MIGRATION_NOT_REQUIRED), load: forever_pending },
      settings: { ...create_settings_capability(build_settings(false)), load: forever_pending },
    };
  }

  if (scenario === "error") {
    return {
      generation: {
        ...create_generation_capability([]),
        load: () => always_rejects("generation_unavailable"),
      },
      profiles: {
        ...create_profiles_capability([]),
        load: () => always_rejects("profiles_unavailable"),
      },
      llm_connections: {
        ...create_llm_connections_capability([]),
        load: () => always_rejects("llm_connections_unavailable"),
      },
      prompt_presets: {
        ...create_prompt_presets_capability([], new Map()),
        load: () => always_rejects("prompt_presets_unavailable"),
      },
      assets: {
        ...create_assets_capability(EMPTY_ASSET_RECORDS),
        load: () => always_rejects("assets_unavailable"),
      },
      personas: {
        ...create_personas_capability([]),
        load: () => always_rejects("personas_unavailable"),
      },
      knowledge: {
        ...create_knowledge_capability([]),
        load: () => always_rejects("knowledge_unavailable"),
      },
      gallery: {
        ...create_gallery_capability([]),
        load: () => always_rejects("gallery_unavailable"),
      },
      vocabulary: {
        ...create_vocabulary_capability(),
        load: () => always_rejects("vocabulary_unavailable"),
      },
      diagnostics: {
        ...create_diagnostics_capability(),
        load: () => always_rejects("diagnostics_unavailable"),
      },
      migration: {
        ...create_migration_capability(MIGRATION_NOT_REQUIRED),
        load: () => always_rejects("migration_unavailable"),
      },
      settings: {
        ...create_settings_capability(build_settings(false)),
        load: () => always_rejects("settings_unavailable"),
      },
    };
  }

  if (scenario === "empty") {
    return {
      generation: create_generation_capability([]),
      profiles: create_profiles_capability([]),
      llm_connections: create_llm_connections_capability([]),
      prompt_presets: create_prompt_presets_capability([], new Map()),
      assets: create_assets_capability(EMPTY_ASSET_RECORDS),
      personas: create_personas_capability([]),
      knowledge: create_knowledge_capability([]),
      gallery: create_gallery_capability([]),
      vocabulary: create_vocabulary_capability(),
      diagnostics: create_diagnostics_capability(),
      migration: create_migration_capability(MIGRATION_NOT_REQUIRED),
      settings: create_settings_capability(build_settings(false)),
    };
  }

  if (scenario === "partial") {
    return {
      generation: create_generation_capability(build_jobs()),
      profiles: create_profiles_capability([PROFILE_SD, PROFILE_NOVELAI, PROFILE_COMFYUI]),
      llm_connections: create_llm_connections_capability([
        LLM_CONNECTION_OPENAI,
        LLM_CONNECTION_OLLAMA,
      ]),
      prompt_presets: create_prompt_presets_capability(
        [PRESET_SHORT, PRESET_LONG_NAME, PRESET_LONG_NAME_ZH],
        PRESET_DRAFTS,
      ),
      assets: create_assets_capability(ASSET_RECORDS),
      personas: create_personas_capability([PERSONA_ASSISTANT, PERSONA_USER]),
      knowledge: create_knowledge_capability([KNOWLEDGE_HARBOR, KNOWLEDGE_OLD_TOWN]),
      gallery: {
        ...create_gallery_capability(GALLERY_RECORDS),
        load: () => always_rejects("gallery_unavailable"),
      },
      vocabulary: create_vocabulary_capability(),
      diagnostics: {
        ...create_diagnostics_capability(),
        load: () => always_rejects("diagnostics_unavailable"),
      },
      migration: {
        ...create_migration_capability(MIGRATION_SNAPSHOT),
        load: () => always_rejects("migration_unavailable"),
      },
      settings: create_settings_capability(build_settings(true)),
    };
  }

  // "full": every slice loads real, rich, interactive data.
  return {
    generation: create_generation_capability(build_jobs()),
    profiles: create_profiles_capability([PROFILE_SD, PROFILE_NOVELAI, PROFILE_COMFYUI]),
    llm_connections: create_llm_connections_capability([
      LLM_CONNECTION_OPENAI,
      LLM_CONNECTION_OLLAMA,
    ]),
    prompt_presets: create_prompt_presets_capability(
      [PRESET_SHORT, PRESET_LONG_NAME, PRESET_LONG_NAME_ZH],
      PRESET_DRAFTS,
    ),
    assets: create_assets_capability(ASSET_RECORDS),
    personas: create_personas_capability([PERSONA_ASSISTANT, PERSONA_USER]),
    knowledge: create_knowledge_capability([KNOWLEDGE_HARBOR, KNOWLEDGE_OLD_TOWN]),
    gallery: create_gallery_capability(GALLERY_RECORDS),
    vocabulary: create_vocabulary_capability(),
    diagnostics: create_diagnostics_capability(),
    migration: create_migration_capability(MIGRATION_SNAPSHOT),
    settings: create_settings_capability(build_settings(true)),
  };
}
