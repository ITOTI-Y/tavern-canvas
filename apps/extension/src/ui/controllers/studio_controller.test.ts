import type {
  KnowledgeRecord,
  LlmConnectionProfile,
  PersonaProfile,
  TavernCanvasSettings,
  Uuid,
} from "@tavern-canvas/contracts";
import { describe, expect, it, vi, type Mock } from "vitest";

import type {
  AssetCategory,
  AssetRecordSummary,
  AssetsCapability,
  AssetsDomainEvent,
  DiagnosticsCapability,
  DiagnosticsDomainEvent,
  DiagnosticsSnapshot,
  GalleryCapability,
  GalleryDomainEvent,
  GalleryRecordSummary,
  GenerationCapability,
  GenerationDomainEvent,
  GenerationJobSummary,
  GenerationSubmitCommand,
  KnowledgeCapability,
  KnowledgeDomainEvent,
  LlmConnectionsCapability,
  LlmConnectionsDomainEvent,
  MigrationCapability,
  PersonasCapability,
  PersonasDomainEvent,
  MigrationDomainEvent,
  MigrationSnapshot,
  ProfilesCapability,
  ProfilesDomainEvent,
  ProviderProfileSummary,
  PromptPresetDraft,
  PromptPresetSummary,
  PromptPresetsCapability,
  PromptPresetsDomainEvent,
  PromptRegexRule,
  SettingsCapability,
  SettingsDomainEvent,
  SettingsSnapshot,
  StudioCapabilities,
  VocabularyCapability,
} from "../contracts/ui_capabilities.js";
import { create_studio_controller } from "./studio_controller.js";

const PROFILE_ID = "11111111-1111-4111-8111-111111111111" as Uuid;
const JOB_ID = "22222222-2222-4222-8222-222222222222" as Uuid;
const RECORD_ID = "33333333-3333-4333-8333-333333333333" as Uuid;
const PRESET_ID = "44444444-4444-4444-8444-444444444444" as Uuid;
const PRESET_ID_2 = "55555555-5555-4555-8555-555555555555" as Uuid;

function deferred<T>(): {
  readonly promise: Promise<T>;
  readonly resolve: (value: T) => void;
  readonly reject: (error: unknown) => void;
} {
  let resolve!: (value: T) => void;
  let reject!: (error: unknown) => void;
  const promise = new Promise<T>((resolve_, reject_) => {
    resolve = resolve_;
    reject = reject_;
  });
  return { promise, resolve, reject };
}

function make_subscribable<TEvent>(): {
  readonly subscribe: (handler: (event: TEvent) => void) => () => void;
  readonly unsubscribe: ReturnType<typeof vi.fn>;
  readonly emit: (event: TEvent) => void;
} {
  const unsubscribe = vi.fn();
  let handler: ((event: TEvent) => void) | null = null;
  const subscribe = vi.fn((next_handler: (event: TEvent) => void) => {
    handler = next_handler;
    return unsubscribe;
  });
  return {
    subscribe,
    unsubscribe,
    emit(event: TEvent) {
      handler?.(event);
    },
  };
}

const DEFAULT_SETTINGS: TavernCanvasSettings = {
  schema_version: 1,
  active_namespace: "default",
  locale: "auto",
  active_provider_profile_id: null,
  global_concurrency: 1,
  auto_generation_enabled: false,
  fallback_generation_enabled: false,
  vocabulary_update_channel: "bundled",
  gateway: { endpoint: null, token_secret_id: null, http_acknowledgments: {} },
  ui: {
    color_mode: "system",
    inspector_width: 320,
    inspector_collapsed: false,
    optional_entry_enabled: false,
  },
};

const EMPTY_ASSET_RECORDS: Readonly<Record<AssetCategory, readonly AssetRecordSummary[]>> = {
  character: [],
  outfit: [],
  lora: [],
  vibe: [],
  reference: [],
  workflow: [],
};

const EMPTY_DIAGNOSTICS_SNAPSHOT: DiagnosticsSnapshot = {
  capability_matrix: {},
  helper_version: null,
  protocol_version: null,
  storage_usage_bytes: null,
  storage_quota_bytes: null,
};

const NOT_REQUIRED_MIGRATION_SNAPSHOT: MigrationSnapshot = {
  state: "not_required",
  counts: {},
  warnings: [],
  failure_reason: null,
  failure_message: null,
};

const DEFAULT_SETTINGS_SNAPSHOT: SettingsSnapshot = {
  settings: DEFAULT_SETTINGS,
  vocabulary_update_channel: "bundled",
};

function harness<TLoad, TEvent>(): {
  readonly load: Mock<() => Promise<TLoad>>;
  readonly deferred_load: ReturnType<typeof deferred<TLoad>>;
  readonly sub: ReturnType<typeof make_subscribable<TEvent>>;
} {
  const deferred_load = deferred<TLoad>();
  const load = vi.fn<() => Promise<TLoad>>(() => deferred_load.promise);
  const sub = make_subscribable<TEvent>();
  return { load, deferred_load, sub };
}

function build_mock_studio() {
  const generation_harness = harness<readonly GenerationJobSummary[], GenerationDomainEvent>();
  const submit = vi.fn();
  const cancel = vi.fn();
  const retry = vi.fn();
  const generation: GenerationCapability = {
    load: generation_harness.load,
    subscribe: generation_harness.sub.subscribe,
    submit,
    cancel,
    retry,
  };

  const profiles_harness = harness<readonly ProviderProfileSummary[], ProfilesDomainEvent>();
  const profiles: ProfilesCapability = {
    load: profiles_harness.load,
    subscribe: profiles_harness.sub.subscribe,
    save: vi.fn(),
    remove: vi.fn(),
    test_connection: vi.fn(),
  };

  const llm_connections_harness = harness<
    readonly LlmConnectionProfile[],
    LlmConnectionsDomainEvent
  >();
  const llm_connections: LlmConnectionsCapability = {
    load: llm_connections_harness.load,
    subscribe: llm_connections_harness.sub.subscribe,
    save: vi.fn(),
    remove: vi.fn(),
    set_credential: vi.fn(),
    clear_credential: vi.fn(),
    test_connection: vi.fn(),
  };

  const prompt_presets_harness = harness<
    readonly PromptPresetSummary[],
    PromptPresetsDomainEvent
  >();
  const prompt_presets: PromptPresetsCapability = {
    load: prompt_presets_harness.load,
    subscribe: prompt_presets_harness.sub.subscribe,
    load_draft: vi.fn(),
    save_draft: vi.fn(),
    remove: vi.fn(),
    bulk_remove: vi.fn(),
    test_regex: vi.fn(),
  };

  const assets_harness = harness<
    Readonly<Record<AssetCategory, readonly AssetRecordSummary[]>>,
    AssetsDomainEvent
  >();
  const assets: AssetsCapability = {
    load: assets_harness.load,
    subscribe: assets_harness.sub.subscribe,
    save: vi.fn(),
    remove: vi.fn(),
    reorder: vi.fn(),
  };

  const personas_harness = harness<readonly PersonaProfile[], PersonasDomainEvent>();
  const personas: PersonasCapability = {
    load: personas_harness.load,
    subscribe: personas_harness.sub.subscribe,
    save: vi.fn(),
    remove: vi.fn(),
  };

  const knowledge_harness = harness<readonly KnowledgeRecord[], KnowledgeDomainEvent>();
  const knowledge: KnowledgeCapability = {
    load: knowledge_harness.load,
    subscribe: knowledge_harness.sub.subscribe,
    save: vi.fn(),
    set_enabled: vi.fn(),
    remove: vi.fn(),
    bulk_remove: vi.fn(),
  };

  const gallery_harness = harness<readonly GalleryRecordSummary[], GalleryDomainEvent>();
  const gallery: GalleryCapability = {
    load: gallery_harness.load,
    subscribe: gallery_harness.sub.subscribe,
    read_bytes: vi.fn(),
    pin: vi.fn(),
    detach_from_message: vi.fn(),
    delete_record: vi.fn(),
    bulk_delete: vi.fn(),
  };

  const vocabulary_load = vi.fn(() => Promise.resolve([]));
  const vocabulary: VocabularyCapability = {
    load: vocabulary_load,
    search: vi.fn(),
    next_page: vi.fn(),
    install: vi.fn(),
    cancel_install: vi.fn(),
  };

  const diagnostics_harness = harness<DiagnosticsSnapshot, DiagnosticsDomainEvent>();
  const diagnostics: DiagnosticsCapability = {
    load: diagnostics_harness.load,
    subscribe: diagnostics_harness.sub.subscribe,
    test_connection: vi.fn(),
    load_timeline: vi.fn(),
    export_support_bundle: vi.fn(),
  };

  const migration_harness = harness<MigrationSnapshot, MigrationDomainEvent>();
  const migration: MigrationCapability = {
    load: migration_harness.load,
    subscribe: migration_harness.sub.subscribe,
    retry: vi.fn(),
    confirm_legacy_cleanup: vi.fn(),
  };

  const settings_harness = harness<SettingsSnapshot, SettingsDomainEvent>();
  const settings: SettingsCapability = {
    load: settings_harness.load,
    subscribe: settings_harness.sub.subscribe,
    update: vi.fn(),
    acknowledge_http_origin: vi.fn(),
    set_gateway_token: vi.fn(),
    clear_gateway_token: vi.fn(),
    set_vocabulary_update_channel: vi.fn(),
    import_vocabulary_package: vi.fn(),
    cancel_vocabulary_import: vi.fn(),
    export_archive: vi.fn(),
    import_archive: vi.fn(),
  };

  const capabilities: StudioCapabilities = {
    generation,
    profiles,
    llm_connections,
    prompt_presets,
    assets,
    personas,
    knowledge,
    gallery,
    vocabulary,
    diagnostics,
    migration,
    settings,
  };

  return {
    capabilities,
    vocabulary_load,
    generation: { ...generation_harness, submit, cancel, retry },
    profiles: profiles_harness,
    llm_connections: llm_connections_harness,
    prompt_presets: prompt_presets_harness,
    assets: assets_harness,
    personas: personas_harness,
    knowledge: knowledge_harness,
    gallery: gallery_harness,
    diagnostics: diagnostics_harness,
    migration: migration_harness,
    settings: settings_harness,
  };
}

type MockStudio = ReturnType<typeof build_mock_studio>;

/**
 * Resolves every capability's load() with an empty/default snapshot. Native promise resolvers
 * are idempotent no-ops once a promise has already settled, so calling this after a test has
 * already resolved or rejected a specific capability's load is safe.
 */
function resolve_all_defaults(mock: MockStudio): void {
  mock.generation.deferred_load.resolve([]);
  mock.profiles.deferred_load.resolve([]);
  mock.llm_connections.deferred_load.resolve([]);
  mock.prompt_presets.deferred_load.resolve([]);
  mock.assets.deferred_load.resolve(EMPTY_ASSET_RECORDS);
  mock.personas.deferred_load.resolve([]);
  mock.knowledge.deferred_load.resolve([]);
  mock.gallery.deferred_load.resolve([]);
  mock.diagnostics.deferred_load.resolve(EMPTY_DIAGNOSTICS_SNAPSHOT);
  mock.migration.deferred_load.resolve(NOT_REQUIRED_MIGRATION_SNAPSHOT);
  mock.settings.deferred_load.resolve(DEFAULT_SETTINGS_SNAPSHOT);
}

function build_submit_command(): GenerationSubmitCommand {
  return {
    profile_id: PROFILE_ID,
    request: { provider_id: "sd_webui" } as unknown as GenerationSubmitCommand["request"],
  };
}

describe("create_studio_controller", () => {
  it("never touches the remote vocabulary catalog while starting", async () => {
    const mock = build_mock_studio();
    const controller = create_studio_controller({ capabilities: mock.capabilities });

    const start_promise = controller.start();
    resolve_all_defaults(mock);
    await start_promise;

    expect(
      mock.vocabulary_load,
      "opening the studio must not reach any origin the user did not ask it to",
    ).not.toHaveBeenCalled();
    expect(controller.state.assets.vocabulary_catalog).toEqual([]);
  });

  it("loads the vocabulary catalog when the panel asks for it", async () => {
    const mock = build_mock_studio();
    const controller = create_studio_controller({ capabilities: mock.capabilities });
    const start_promise = controller.start();
    resolve_all_defaults(mock);
    await start_promise;

    await controller.load_vocabulary_catalog();

    expect(mock.vocabulary_load).toHaveBeenCalledTimes(1);
    expect(controller.state.loading.has("vocabulary")).toBe(false);
  });

  it("resolves each capability's initial load independently, not gated on the slowest one", async () => {
    const mock = build_mock_studio();
    const controller = create_studio_controller({ capabilities: mock.capabilities });

    const start_promise = controller.start();
    mock.generation.deferred_load.resolve([]);
    mock.profiles.deferred_load.resolve([]);
    mock.llm_connections.deferred_load.resolve([]);
    mock.prompt_presets.deferred_load.resolve([]);
    mock.assets.deferred_load.resolve(EMPTY_ASSET_RECORDS);
    mock.personas.deferred_load.resolve([]);
    mock.knowledge.deferred_load.resolve([]);
    mock.gallery.deferred_load.resolve([]);
    mock.diagnostics.deferred_load.resolve(EMPTY_DIAGNOSTICS_SNAPSHOT);
    mock.migration.deferred_load.resolve(NOT_REQUIRED_MIGRATION_SNAPSHOT);
    // settings is deliberately left unresolved.

    await vi.waitFor(() => {
      expect(controller.state.loading.has("generation")).toBe(false);
      expect(controller.state.loading.has("vocabulary")).toBe(false);
    });
    expect(controller.state.loading.has("settings")).toBe(true);

    mock.settings.deferred_load.resolve(DEFAULT_SETTINGS_SNAPSHOT);
    await start_promise;

    expect(controller.state.loading.size).toBe(0);
    expect(controller.state.settings.settings).toEqual(DEFAULT_SETTINGS);
  });

  it("yields partial state when one slice's initial load fails, without blanking the rest", async () => {
    const mock = build_mock_studio();
    const controller = create_studio_controller({ capabilities: mock.capabilities });

    const start_promise = controller.start();
    mock.profiles.deferred_load.resolve([
      {
        id: PROFILE_ID,
        provider_id: "sd_webui",
        display_name: "Local SD",
        is_default: true,
        updated_at: "2026-01-01T00:00:00Z",
      },
    ]);
    mock.gallery.deferred_load.reject(new Error("indexeddb unavailable"));
    resolve_all_defaults(mock);
    await start_promise;

    expect(controller.state.failures.has("gallery")).toBe(true);
    expect(controller.state.gallery.records).toEqual([]);
    expect(controller.state.workbench.profiles).toHaveLength(1);
    expect(controller.state.workbench.profiles[0]?.id).toBe(PROFILE_ID);
    expect(controller.state.loading.size).toBe(0);
  });

  it("routes a domain event to only its owning slice", async () => {
    const mock = build_mock_studio();
    const controller = create_studio_controller({ capabilities: mock.capabilities });
    const start_promise = controller.start();
    resolve_all_defaults(mock);
    await start_promise;

    const gallery_before = controller.state.gallery;
    const diagnostics_before = controller.state.diagnostics;

    mock.profiles.sub.emit({
      type: "profile_upserted",
      profile: {
        id: PROFILE_ID,
        provider_id: "novelai",
        display_name: "NovelAI",
        is_default: false,
        updated_at: "2026-01-02T00:00:00Z",
      },
    });

    expect(controller.state.workbench.profiles).toHaveLength(1);
    expect(controller.state.workbench.profiles[0]?.id).toBe(PROFILE_ID);
    expect(controller.state.gallery).toBe(gallery_before);
    expect(controller.state.diagnostics).toBe(diagnostics_before);
  });

  it("tracks command pending/success/error state and rejects a duplicate in-flight submission", async () => {
    const mock = build_mock_studio();
    const controller = create_studio_controller({ capabilities: mock.capabilities });
    const start_promise = controller.start();
    resolve_all_defaults(mock);
    await start_promise;

    expect(controller.state.workbench.submit_command.status).toBe("idle");

    const submit_deferred = deferred<GenerationJobSummary>();
    mock.generation.submit.mockReturnValue(submit_deferred.promise);

    const command = build_submit_command();
    const first_call = controller.submit_generation(command);
    expect(controller.state.workbench.submit_command.status).toBe("pending");

    const second_call = controller.submit_generation(command);
    expect(mock.generation.submit).toHaveBeenCalledTimes(1);

    const job: GenerationJobSummary = {
      job_id: JOB_ID,
      request_id: JOB_ID,
      provider_id: "sd_webui",
      state: "queued",
      image_count: 1,
      completed_image_ids: [],
      error: null,
      submitted_at: "2026-01-01T00:00:00Z",
    };
    submit_deferred.resolve(job);
    await Promise.all([first_call, second_call]);

    expect(controller.state.workbench.submit_command).toEqual({ status: "success", result: job });
  });

  it("survives panel resize and color-mode change without losing route or selected-record state", async () => {
    const mock = build_mock_studio();
    const controller = create_studio_controller({ capabilities: mock.capabilities });
    const start_promise = controller.start();
    resolve_all_defaults(mock);
    await start_promise;

    controller.set_route("gallery");
    controller.select_inspector_record({ kind: "gallery_record", record_id: RECORD_ID });

    controller.set_inspector_width(400);
    controller.set_color_mode("dark");

    expect(controller.state.route).toBe("gallery");
    expect(controller.state.inspector.selected_record).toEqual({
      kind: "gallery_record",
      record_id: RECORD_ID,
    });
    expect(controller.state.inspector.width).toBe(400);
    expect(controller.state.color_mode).toBe("dark");
  });

  it("unsubscribes every domain listener on stop, and never rejects an already-settling command", async () => {
    const mock = build_mock_studio();
    const controller = create_studio_controller({ capabilities: mock.capabilities });
    const start_promise = controller.start();
    resolve_all_defaults(mock);
    await start_promise;

    const submit_deferred = deferred<GenerationJobSummary>();
    mock.generation.submit.mockReturnValue(submit_deferred.promise);
    const pending_submit = controller.submit_generation(build_submit_command());

    await controller.stop();

    expect(mock.generation.sub.unsubscribe).toHaveBeenCalledTimes(1);
    expect(mock.profiles.sub.unsubscribe).toHaveBeenCalledTimes(1);
    expect(mock.prompt_presets.sub.unsubscribe).toHaveBeenCalledTimes(1);
    expect(mock.assets.sub.unsubscribe).toHaveBeenCalledTimes(1);
    expect(mock.gallery.sub.unsubscribe).toHaveBeenCalledTimes(1);
    expect(mock.diagnostics.sub.unsubscribe).toHaveBeenCalledTimes(1);
    expect(mock.migration.sub.unsubscribe).toHaveBeenCalledTimes(1);
    expect(mock.settings.sub.unsubscribe).toHaveBeenCalledTimes(1);

    submit_deferred.resolve({
      job_id: JOB_ID,
      request_id: JOB_ID,
      provider_id: "sd_webui",
      state: "queued",
      image_count: 1,
      completed_image_ids: [],
      error: null,
      submitted_at: "2026-01-01T00:00:00Z",
    });
    await expect(pending_submit).resolves.toBeUndefined();
  });

  it("carries stable failure codes, never a raw error message, in controller state", async () => {
    const mock = build_mock_studio();
    const controller = create_studio_controller({ capabilities: mock.capabilities });
    const start_promise = controller.start();
    mock.profiles.deferred_load.reject(new Error("Could not reach the profile store right now."));
    resolve_all_defaults(mock);
    await start_promise;

    const failure = controller.state.failures.get("profiles");
    expect(failure).toBeDefined();
    expect(failure?.code).toMatch(/^[a-z][a-z0-9_]*$/);
    expect(failure?.code).not.toContain(" ");
    expect(failure?.code).not.toContain("Could not reach");
  });

  it("populates state.tasks from a running job event, so the task strip is not dead code", async () => {
    const mock = build_mock_studio();
    const controller = create_studio_controller({ capabilities: mock.capabilities });
    const start_promise = controller.start();
    resolve_all_defaults(mock);
    await start_promise;

    expect(controller.state.tasks).toEqual([]);

    mock.generation.sub.emit({
      type: "job_updated",
      job: {
        job_id: JOB_ID,
        request_id: JOB_ID,
        provider_id: "sd_webui",
        state: "running",
        image_count: 4,
        completed_image_ids: [PRESET_ID, PRESET_ID_2],
        error: null,
        submitted_at: "2026-01-01T00:00:00Z",
      },
    });

    expect(controller.state.tasks).toEqual([
      { id: JOB_ID, label_code: "status.running", status: "pending", progress: 0.5 },
    ]);
    // The job list itself is unaffected -- tasks is a derived projection, not a replacement.
    expect(controller.state.workbench.jobs).toHaveLength(1);
  });

  it("derives tasks from the initial job load and drops a job once it reaches a terminal state", async () => {
    const mock = build_mock_studio();
    const controller = create_studio_controller({ capabilities: mock.capabilities });
    const start_promise = controller.start();
    mock.generation.deferred_load.resolve([
      {
        job_id: JOB_ID,
        request_id: JOB_ID,
        provider_id: "sd_webui",
        state: "queued",
        image_count: 1,
        completed_image_ids: [],
        error: null,
        submitted_at: "2026-01-01T00:00:00Z",
      },
    ]);
    resolve_all_defaults(mock);
    await start_promise;

    expect(controller.state.tasks).toEqual([
      { id: JOB_ID, label_code: "status.pending", status: "pending", progress: 0 },
    ]);

    mock.generation.sub.emit({
      type: "job_updated",
      job: {
        job_id: JOB_ID,
        request_id: JOB_ID,
        provider_id: "sd_webui",
        state: "completed",
        image_count: 1,
        completed_image_ids: [JOB_ID],
        error: null,
        submitted_at: "2026-01-01T00:00:00Z",
      },
    });

    expect(controller.state.tasks).toEqual([]);
    expect(controller.state.workbench.jobs).toHaveLength(1);
  });

  it("reflects a failed job in tasks as a status.failed error entry", async () => {
    const mock = build_mock_studio();
    const controller = create_studio_controller({ capabilities: mock.capabilities });
    const start_promise = controller.start();
    resolve_all_defaults(mock);
    await start_promise;

    mock.generation.sub.emit({
      type: "job_updated",
      job: {
        job_id: JOB_ID,
        request_id: JOB_ID,
        provider_id: "sd_webui",
        state: "failed",
        image_count: 1,
        completed_image_ids: [],
        error: { code: "timed_out", retryable: true },
        submitted_at: "2026-01-01T00:00:00Z",
      },
    });

    expect(controller.state.tasks).toEqual([
      { id: JOB_ID, label_code: "status.failed", status: "error", progress: 0 },
    ]);
  });
});

function build_prompt_draft(overrides: Partial<PromptPresetDraft> = {}): PromptPresetDraft {
  return {
    id: PRESET_ID,
    display_name: "Preset A",
    group: null,
    fixed_positive_prompt: "",
    fixed_negative_prompt: "",
    replacement_rules: [],
    regex_rules: [],
    ...overrides,
  };
}

describe("create_studio_controller: Task 5 command extensions", () => {
  it("persists the Workbench active provider profile selection", async () => {
    const mock = build_mock_studio();
    const controller = create_studio_controller({ capabilities: mock.capabilities });
    const start_promise = controller.start();
    resolve_all_defaults(mock);
    await start_promise;

    await controller.select_provider_profile(PROFILE_ID);
    expect(controller.state.workbench.active_profile_id).toBe(PROFILE_ID);
    expect(mock.capabilities.settings.update).toHaveBeenLastCalledWith({
      active_provider_profile_id: PROFILE_ID,
    });

    await controller.select_provider_profile(null);
    expect(controller.state.workbench.active_profile_id).toBeNull();
    expect(mock.capabilities.settings.update).toHaveBeenLastCalledWith({
      active_provider_profile_id: null,
    });
  });

  it("selects and persists a newly saved default provider profile", async () => {
    const mock = build_mock_studio();
    const controller = create_studio_controller({ capabilities: mock.capabilities });
    const start_promise = controller.start();
    resolve_all_defaults(mock);
    await start_promise;
    vi.mocked(mock.capabilities.profiles.save).mockResolvedValue({
      id: PROFILE_ID,
      provider_id: "novelai",
      display_name: "NovelAI",
      model_id: "nai-diffusion-4-5-full",
      workflow_id: null,
      is_default: true,
      updated_at: "2026-08-10T00:00:00Z",
    });

    await controller.save_provider_profile({
      id: PROFILE_ID,
      provider_id: "novelai",
      display_name: "NovelAI",
      model_id: "nai-diffusion-4-5-full",
      workflow_id: null,
      is_default: true,
      updated_at: "2026-08-10T00:00:00Z",
      secret_reference: null,
    });

    expect(mock.capabilities.settings.update).toHaveBeenCalledWith({
      active_provider_profile_id: PROFILE_ID,
    });
    expect(controller.state.workbench.active_profile_id).toBe(PROFILE_ID);
  });

  it("selects a prompt preset by loading its draft, then keeps edits local until save", async () => {
    const mock = build_mock_studio();
    const controller = create_studio_controller({ capabilities: mock.capabilities });
    const start_promise = controller.start();
    resolve_all_defaults(mock);
    await start_promise;

    vi.mocked(mock.capabilities.prompt_presets.load_draft).mockResolvedValue(
      build_prompt_draft({ display_name: "Loaded preset" }),
    );

    await controller.select_prompt_preset(PRESET_ID);

    expect(mock.capabilities.prompt_presets.load_draft).toHaveBeenCalledWith(PRESET_ID);
    expect(controller.state.prompt.selected_preset_id).toBe(PRESET_ID);
    expect(controller.state.prompt.draft?.display_name).toBe("Loaded preset");

    controller.update_prompt_draft({ display_name: "Edited locally" });
    expect(controller.state.prompt.draft?.display_name).toBe("Edited locally");
    expect(mock.capabilities.prompt_presets.save_draft).not.toHaveBeenCalled();
  });

  it("starts a blank new preset draft with a null id and no current selection", async () => {
    const mock = build_mock_studio();
    const controller = create_studio_controller({ capabilities: mock.capabilities });
    const start_promise = controller.start();
    resolve_all_defaults(mock);
    await start_promise;

    controller.start_new_prompt_preset();

    expect(controller.state.prompt.selected_preset_id).toBeNull();
    expect(controller.state.prompt.draft).toMatchObject({
      id: null,
      display_name: "",
      replacement_rules: [],
      regex_rules: [],
    });
  });

  it("removes a single preset and clears the draft when the removed preset was selected", async () => {
    const mock = build_mock_studio();
    const controller = create_studio_controller({ capabilities: mock.capabilities });
    const start_promise = controller.start();
    mock.prompt_presets.deferred_load.resolve([
      { id: PRESET_ID, display_name: "Preset A", group: null, updated_at: "2026-01-01T00:00:00Z" },
    ]);
    resolve_all_defaults(mock);
    await start_promise;

    vi.mocked(mock.capabilities.prompt_presets.load_draft).mockResolvedValue(build_prompt_draft());
    await controller.select_prompt_preset(PRESET_ID);
    vi.mocked(mock.capabilities.prompt_presets.remove).mockResolvedValue(undefined);

    await controller.remove_prompt_preset(PRESET_ID);

    expect(controller.state.prompt.presets).toEqual([]);
    expect(controller.state.prompt.selected_preset_id).toBeNull();
    expect(controller.state.prompt.draft).toBeNull();
  });

  it("bulk removes presets and clears the selection only if it was among the removed ids", async () => {
    const mock = build_mock_studio();
    const controller = create_studio_controller({ capabilities: mock.capabilities });
    const start_promise = controller.start();
    mock.prompt_presets.deferred_load.resolve([
      { id: PRESET_ID, display_name: "Preset A", group: null, updated_at: "2026-01-01T00:00:00Z" },
      {
        id: PRESET_ID_2,
        display_name: "Preset B",
        group: null,
        updated_at: "2026-01-01T00:00:00Z",
      },
    ]);
    resolve_all_defaults(mock);
    await start_promise;

    vi.mocked(mock.capabilities.prompt_presets.bulk_remove).mockResolvedValue(undefined);
    await controller.bulk_remove_prompt_presets([PRESET_ID]);

    expect(controller.state.prompt.presets).toHaveLength(1);
    expect(controller.state.prompt.presets[0]?.id).toBe(PRESET_ID_2);
  });

  it("delegates regex testing to the capability and returns its result without mutating state", async () => {
    const mock = build_mock_studio();
    const controller = create_studio_controller({ capabilities: mock.capabilities });
    const start_promise = controller.start();
    resolve_all_defaults(mock);
    await start_promise;

    const rule: PromptRegexRule = { id: "r1", pattern: "foo", flags: "g", replacement: "bar" };
    vi.mocked(mock.capabilities.prompt_presets.test_regex).mockResolvedValue("bar baz");

    const result = await controller.test_prompt_regex(rule, "foo baz");

    expect(mock.capabilities.prompt_presets.test_regex).toHaveBeenCalledWith(rule, "foo baz");
    expect(result).toBe("bar baz");
  });
});
