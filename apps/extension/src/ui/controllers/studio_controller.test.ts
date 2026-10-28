import type { TavernCanvasSettings, Uuid } from "@tavern-canvas/contracts";
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
import { create_unavailable_capabilities } from "./unavailable_capabilities.js";

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
  credential_storage_mode: "host",
  active_provider_profile_id: null,
  global_concurrency: 1,
  auto_generation_enabled: false,
  vocabulary_update_channel: "bundled",
  illustration: {
    preset_name: "in_use",
    connection: { kind: "current" },
    max_chat_history: 4,
    max_images_per_message: 2,
    prompt_preset_id: null,
    world_info: { mode: "chat" },
    wardrobe_model: null,
    analysis_guidance: "",
    wardrobe_guidance: "",
  },
  translation: { deepl_endpoint: "free", glossary: [] },
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
  workflow: [],
  prompt_tag: [],
};

const EMPTY_DIAGNOSTICS_SNAPSHOT: DiagnosticsSnapshot = {
  capability_matrix: {},
  helper_version: null,
  storage_usage_bytes: null,
  storage_quota_bytes: null,
};

const DEFAULT_SETTINGS_SNAPSHOT: SettingsSnapshot = {
  settings: DEFAULT_SETTINGS,
  vocabulary_update_channel: "bundled",
  browser_secret_vault: { state: "unavailable", secret_count: 0 },
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
    dismiss: vi.fn(),
  };

  const profiles_harness = harness<readonly ProviderProfileSummary[], ProfilesDomainEvent>();
  const profiles: ProfilesCapability = {
    load: profiles_harness.load,
    subscribe: profiles_harness.sub.subscribe,
    save: vi.fn(),
    remove: vi.fn(),
    set_credential: vi.fn(),
    clear_credential: vi.fn(),
    save_novelai_defaults: vi.fn(),
    save_prompt_tags: vi.fn(),
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

  const gallery_harness = harness<readonly GalleryRecordSummary[], GalleryDomainEvent>();
  const gallery: GalleryCapability = {
    load: gallery_harness.load,
    subscribe: gallery_harness.sub.subscribe,
    read_bytes: vi.fn(),
    pin: vi.fn(),
    detach_from_message: vi.fn(),
    delete_record: vi.fn(),
    reveal_source: vi.fn(),
    bulk_delete: vi.fn(),
  };

  const vocabulary_load = vi.fn(() => Promise.resolve([]));
  const vocabulary: VocabularyCapability = {
    load: vocabulary_load,
    search: vi.fn(),
    lookup: vi.fn(),
    prepare: vi.fn(),
    next_page: vi.fn(),
    install: vi.fn(),
    cancel_install: vi.fn(),
  };

  const diagnostics_harness = harness<DiagnosticsSnapshot, DiagnosticsDomainEvent>();
  const diagnostics: DiagnosticsCapability = {
    load: diagnostics_harness.load,
    subscribe: diagnostics_harness.sub.subscribe,
    load_timeline: vi.fn(),
    export_support_bundle: vi.fn(),
  };

  const settings_harness = harness<SettingsSnapshot, SettingsDomainEvent>();
  const settings: SettingsCapability = {
    load: settings_harness.load,
    subscribe: settings_harness.sub.subscribe,
    update: vi.fn(),
    set_analysis_key: vi.fn(() => Promise.resolve()),
    list_worldbooks: vi.fn(() => Promise.resolve([])),
    clear_analysis_key: vi.fn(() => Promise.resolve()),
    set_deepl_key: vi.fn(() => Promise.resolve()),
    clear_deepl_key: vi.fn(() => Promise.resolve()),
    initialize_browser_secret_vault: vi.fn(),
    unlock_browser_secret_vault: vi.fn(),
    lock_browser_secret_vault: vi.fn(),
    reset_browser_secret_vault: vi.fn(),
    set_vocabulary_update_channel: vi.fn(),
    import_vocabulary_package: vi.fn(),
    cancel_vocabulary_import: vi.fn(),
    export_archive: vi.fn(),
    import_archive: vi.fn(),
  };

  const capabilities: StudioCapabilities = {
    generation,
    profiles,
    novelai: create_unavailable_capabilities().novelai,
    prompt_presets,
    assets,
    gallery,
    vocabulary,
    diagnostics,
    settings,
  };

  return {
    capabilities,
    vocabulary_load,
    generation: { ...generation_harness, submit, cancel, retry },
    profiles: profiles_harness,
    prompt_presets: prompt_presets_harness,
    assets: assets_harness,
    gallery: gallery_harness,
    diagnostics: diagnostics_harness,
    settings: settings_harness,
  };
}

type MockStudio = ReturnType<typeof build_mock_studio>;

function resolve_all_defaults(mock: MockStudio): void {
  mock.generation.deferred_load.resolve([]);
  mock.profiles.deferred_load.resolve([]);
  mock.prompt_presets.deferred_load.resolve([]);
  mock.assets.deferred_load.resolve(EMPTY_ASSET_RECORDS);
  mock.gallery.deferred_load.resolve([]);
  mock.diagnostics.deferred_load.resolve(EMPTY_DIAGNOSTICS_SNAPSHOT);
  mock.settings.deferred_load.resolve(DEFAULT_SETTINGS_SNAPSHOT);
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
    mock.prompt_presets.deferred_load.resolve([]);
    mock.assets.deferred_load.resolve(EMPTY_ASSET_RECORDS);
    mock.gallery.deferred_load.resolve([]);
    mock.diagnostics.deferred_load.resolve(EMPTY_DIAGNOSTICS_SNAPSHOT);

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
        credential_reference: null,
        novelai_defaults: null,
        prompt_tags: {
          quality: { enabled: false, preset_id: "novelai:v4_5_full:standard" },
          undesired_content: { enabled: false, preset_id: "novelai:v4_5_full:heavy" },
        },
        updated_at: "2026-01-01T00:00:00Z",
      },
    ]);
    mock.gallery.deferred_load.reject(new Error("indexeddb unavailable"));
    resolve_all_defaults(mock);
    await start_promise;

    expect(controller.state.failures.has("gallery")).toBe(true);
    expect(controller.state.gallery.records).toEqual([]);
    expect(controller.state.generation.profiles).toHaveLength(1);
    expect(controller.state.generation.profiles[0]?.id).toBe(PROFILE_ID);
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
        credential_reference: null,
        novelai_defaults: null,
        prompt_tags: {
          quality: { enabled: false, preset_id: "novelai:v4_5_full:standard" },
          undesired_content: { enabled: false, preset_id: "novelai:v4_5_full:heavy" },
        },
        updated_at: "2026-01-02T00:00:00Z",
      },
    });

    expect(controller.state.generation.profiles).toHaveLength(1);
    expect(controller.state.generation.profiles[0]?.id).toBe(PROFILE_ID);
    expect(controller.state.gallery).toBe(gallery_before);
    expect(controller.state.diagnostics).toBe(diagnostics_before);
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

    expect(controller.state.route).toBe("gallery");
    expect(controller.state.inspector.selected_record).toEqual({
      kind: "gallery_record",
      record_id: RECORD_ID,
    });
    expect(controller.state.inspector.width).toBe(400);
  });

  it("unsubscribes every domain listener on stop", async () => {
    const mock = build_mock_studio();
    const controller = create_studio_controller({ capabilities: mock.capabilities });
    const start_promise = controller.start();
    resolve_all_defaults(mock);
    await start_promise;

    await controller.stop();

    expect(mock.generation.sub.unsubscribe).toHaveBeenCalledTimes(1);
    expect(mock.profiles.sub.unsubscribe).toHaveBeenCalledTimes(1);
    expect(mock.prompt_presets.sub.unsubscribe).toHaveBeenCalledTimes(1);
    expect(mock.assets.sub.unsubscribe).toHaveBeenCalledTimes(1);
    expect(mock.gallery.sub.unsubscribe).toHaveBeenCalledTimes(1);
    expect(mock.diagnostics.sub.unsubscribe).toHaveBeenCalledTimes(1);
    expect(mock.settings.sub.unsubscribe).toHaveBeenCalledTimes(1);
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

  it("populates state.tasks from a running job event", async () => {
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
      { id: JOB_ID, label_code: "status.running", status: "pending", progress: 0.5, error: null },
    ]);
    expect(controller.state.generation.jobs).toHaveLength(1);
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
      { id: JOB_ID, label_code: "status.pending", status: "pending", progress: 0, error: null },
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
    expect(controller.state.generation.jobs).toHaveLength(1);
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
      {
        id: JOB_ID,
        label_code: "status.failed",
        status: "error",
        progress: null,
        error: "timed_out",
      },
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

describe("create_studio_controller: archive import", () => {
  it("reloads the stored slices once an archive has been imported", async () => {
    const mock = build_mock_studio();
    const controller = create_studio_controller({ capabilities: mock.capabilities });
    const start_promise = controller.start();
    resolve_all_defaults(mock);
    await start_promise;
    const record = {
      id: "33333333-3333-4333-8333-333333333333",
      category: "character" as const,
      record_key: "primary:33333333-3333-4333-8333-333333333333",
      display_name: "Seraphina",
      updated_at: "2026-10-27T00:00:00.000Z",
      payload: {},
    };
    mock.assets.load.mockResolvedValueOnce({ ...EMPTY_ASSET_RECORDS, character: [record] });

    await controller.import_settings_archive(new Blob());

    expect(mock.capabilities.settings.import_archive).toHaveBeenCalledOnce();
    expect(controller.state.assets.records.character).toEqual([record]);
  });
});

describe("create_studio_controller: prompt and provider profile commands", () => {
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
      credential_reference: null,
      novelai_defaults: null,
      prompt_tags: {
        quality: { enabled: false, preset_id: "novelai:v4_5_full:standard" },
        undesired_content: { enabled: false, preset_id: "novelai:v4_5_full:heavy" },
      },
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
    });

    expect(mock.capabilities.settings.update).toHaveBeenCalledWith({
      active_provider_profile_id: PROFILE_ID,
    });
    expect(controller.state.generation.active_profile_id).toBe(PROFILE_ID);
  });
  it("keeps a vault passphrase out of state while applying the returned vault status", async () => {
    const mock = build_mock_studio();
    const controller = create_studio_controller({ capabilities: mock.capabilities });
    const start_promise = controller.start();
    resolve_all_defaults(mock);
    await start_promise;
    vi.mocked(mock.capabilities.settings.initialize_browser_secret_vault).mockResolvedValue({
      state: "unlocked",
      secret_count: 0,
    });

    await controller.initialize_browser_secret_vault("correct horse battery staple");

    expect(mock.capabilities.settings.initialize_browser_secret_vault).toHaveBeenCalledWith(
      "correct horse battery staple",
    );
    expect(controller.state.settings.browser_secret_vault).toEqual({
      state: "unlocked",
      secret_count: 0,
    });
    expect(JSON.stringify(controller.state)).not.toContain("correct horse battery staple");
  });
  it("refreshes vault state when the credential storage mode changes", async () => {
    const mock = build_mock_studio();
    const controller = create_studio_controller({ capabilities: mock.capabilities });
    const start_promise = controller.start();
    resolve_all_defaults(mock);
    await start_promise;

    const settings = {
      ...DEFAULT_SETTINGS,
      credential_storage_mode: "browser_encrypted" as const,
    };
    vi.mocked(mock.capabilities.settings.update).mockResolvedValue(settings);
    vi.mocked(mock.capabilities.settings.load).mockResolvedValue({
      settings,
      vocabulary_update_channel: settings.vocabulary_update_channel,
      browser_secret_vault: { state: "locked", secret_count: 2 },
    });

    await controller.update_settings({ credential_storage_mode: "browser_encrypted" });

    expect(mock.capabilities.settings.load).toHaveBeenCalledTimes(2);
    expect(controller.state.settings.settings).toEqual(settings);
    expect(controller.state.settings.browser_secret_vault).toEqual({
      state: "locked",
      secret_count: 2,
    });
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
