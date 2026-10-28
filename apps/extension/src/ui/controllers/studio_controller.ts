import type {
  GenerationState,
  NovelAiAccountStatus,
  NovelAiGenerationDefaults,
  PromptTagSelection,
  ResolvedNovelAiModel,
  TavernCanvasSettings,
  Uuid,
  VocabularyCatalogEntry,
  VocabularyCategory,
} from "@tavern-canvas/contracts";

import type {
  AssetCategory,
  AssetRecordSummary,
  AssetsDomainEvent,
  CapabilityId,
  DiagnosticsDomainEvent,
  GalleryDomainEvent,
  GenerationDomainEvent,
  GenerationJobSummary,
  ProfileConnectionTestResult,
  ProfilesDomainEvent,
  ProviderProfileDraft,
  ProviderProfileSummary,
  PromptPresetDraft,
  PromptPresetsDomainEvent,
  PromptRegexRule,
  SettingsDomainEvent,
  SourceRevealOutcome,
  StudioCapabilities,
  Unsubscribe,
  VocabularyImportProgressView,
  VocabularyInstallProgressView,
  VocabularySearchPageView,
  VocabularyUpdateChannel,
} from "../contracts/ui_capabilities.js";
import {
  IDLE_COMMAND_STATE,
  type AssetsViewModel,
  type ColorMode,
  type CommandState,
  type DiagnosticsViewModel,
  type GalleryViewModel,
  type GenerationViewModel,
  type InspectorSelection,
  type InspectorViewModel,
  type PromptViewModel,
  type SettingsSection,
  type SettingsViewModel,
  type StudioRoute,
  type StudioState,
  type TaskStripItemViewModel,
  type UiFailure,
} from "../contracts/view_models.js";

export interface StudioControllerOptions {
  readonly capabilities: StudioCapabilities;
  readonly initial_route?: StudioRoute;
  readonly initial_color_mode?: ColorMode;
  readonly initial_inspector_width?: number;
}

export interface StudioController {
  readonly state: Readonly<StudioState>;
  on_change(listener: () => void): Unsubscribe;
  start(): Promise<void>;
  stop(): Promise<void>;
  set_route(route: StudioRoute): void;
  /** Also switches to the settings route. */
  set_settings_section(section: SettingsSection): void;
  set_inspector_width(width: number): void;
  set_inspector_collapsed(collapsed: boolean): void;
  select_inspector_record(selection: InspectorSelection | null): void;
  select_prompt_preset(preset_id: Uuid): Promise<void>;
  start_new_prompt_preset(): void;
  update_prompt_draft(patch: Partial<PromptPresetDraft>): void;
  bulk_remove_prompt_presets(preset_ids: readonly Uuid[]): Promise<void>;
  test_prompt_regex(rule: PromptRegexRule, sample_text: string): Promise<string>;
  save_prompt_preset(draft: PromptPresetDraft): Promise<void>;
  install_vocabulary_package(
    entry: VocabularyCatalogEntry,
    on_progress?: (progress: VocabularyInstallProgressView) => void,
  ): Promise<void>;
  load_vocabulary_catalog(): Promise<void>;
  update_settings(partial: Partial<TavernCanvasSettings>): Promise<void>;
  export_support_bundle(): Promise<void>;

  load_diagnostics_timeline(): Promise<void>;
  save_provider_profile(draft: ProviderProfileDraft): Promise<ProviderProfileSummary>;
  remove_provider_profile(profile_id: Uuid): Promise<void>;
  test_provider_profile_connection(profile_id: Uuid): Promise<ProfileConnectionTestResult>;
  set_provider_profile_credential(
    profile_id: Uuid,
    plaintext_value: string,
  ): Promise<ProviderProfileSummary>;
  clear_provider_profile_credential(profile_id: Uuid): Promise<ProviderProfileSummary>;
  save_novelai_defaults(
    profile_id: Uuid,
    defaults: NovelAiGenerationDefaults,
  ): Promise<ProviderProfileSummary>;
  save_prompt_tags(
    profile_id: Uuid,
    selection: PromptTagSelection,
  ): Promise<ProviderProfileSummary>;
  /** Tier and Anlas of the account behind the active NovelAI profile. */
  load_novelai_account(): Promise<NovelAiAccountStatus>;
  load_novelai_models(): Promise<readonly ResolvedNovelAiModel[]>;
  set_deepl_key(plaintext_value: string): Promise<void>;
  clear_deepl_key(): Promise<void>;
  set_analysis_key(plaintext_value: string): Promise<void>;
  list_worldbooks(): Promise<readonly string[]>;
  clear_analysis_key(): Promise<void>;
  initialize_browser_secret_vault(passphrase: string): Promise<void>;
  unlock_browser_secret_vault(passphrase: string): Promise<void>;
  lock_browser_secret_vault(): Promise<void>;
  reset_browser_secret_vault(): Promise<void>;
  set_vocabulary_update_channel(channel: VocabularyUpdateChannel): Promise<void>;
  import_vocabulary_package(
    file: Blob,
    on_progress?: (progress: VocabularyImportProgressView) => void,
  ): Promise<void>;
  cancel_vocabulary_import(): void;
  export_settings_archive(): Promise<Blob>;
  import_settings_archive(archive: Blob): Promise<void>;

  set_active_asset_category(category: AssetCategory): void;
  save_asset(category: AssetCategory, asset: Omit<AssetRecordSummary, "updated_at">): Promise<void>;
  remove_asset(category: AssetCategory, asset_id: Uuid): Promise<void>;
  reorder_assets(category: AssetCategory, ordered_ids: readonly Uuid[]): Promise<void>;

  search_vocabulary(
    query: string,
    category?: VocabularyCategory,
  ): Promise<VocabularySearchPageView>;
  load_more_vocabulary(cursor: string): Promise<VocabularySearchPageView>;

  select_gallery_record(record_id: Uuid | null): void;
  read_gallery_bytes(record_id: Uuid): Promise<Uint8Array>;
  pin_gallery_record(record_id: Uuid, pinned: boolean): Promise<void>;
  /** Clears only the message attachment; `delete_gallery_record` is the separate permanent action. */
  detach_gallery_record(record_id: Uuid): Promise<void>;
  delete_gallery_record(record_id: Uuid): Promise<void>;
  reveal_gallery_source(record_id: Uuid): Promise<SourceRevealOutcome>;
  bulk_delete_gallery_records(record_ids: readonly Uuid[]): Promise<void>;
  /** Removes every failed job from the task strip and the job store. */
  dismiss_failed_tasks(): Promise<void>;
}

const DEFAULT_FAILURE_CODE = "capability_load_failed";
const DEFAULT_COMMAND_FAILURE_CODE = "command_failed";
const STABLE_CODE_PATTERN = /^[a-z][a-z0-9_]*$/u;

function to_ui_failure(error: unknown, fallback_code: string): UiFailure {
  if (error instanceof Error) {
    const candidate = (error as { readonly code?: unknown }).code;
    if (typeof candidate === "string" && STABLE_CODE_PATTERN.test(candidate)) {
      return { code: candidate };
    }
  }
  return { code: fallback_code };
}

function upsert_by_id<TItem>(
  list: readonly TItem[],
  item: TItem,
  key: (item: TItem) => unknown,
): readonly TItem[] {
  const item_key = key(item);
  const index = list.findIndex((existing) => key(existing) === item_key);
  if (index === -1) {
    return [...list, item];
  }
  const next = [...list];
  next[index] = item;
  return next;
}

const TASK_STRIP_STATES: ReadonlySet<GenerationState> = new Set([
  "queued",
  "preparing",
  "submitting",
  "running",
  "failed",
]);

function job_to_task_status(state: GenerationState): TaskStripItemViewModel["status"] {
  return state === "failed" ? "error" : "pending";
}

function job_to_task_label_code(state: GenerationState): string {
  if (state === "running") {
    return "status.running";
  }
  if (state === "failed") {
    return "status.failed";
  }
  return "status.pending";
}

function job_to_task(job: GenerationJobSummary): TaskStripItemViewModel {
  return {
    id: job.job_id,
    label_code: job_to_task_label_code(job.state),
    status: job_to_task_status(job.state),
    progress:
      job.state !== "failed" && job.image_count > 0
        ? job.completed_image_ids.length / job.image_count
        : null,
    error: job.state === "failed" ? (job.error?.code ?? null) : null,
  };
}

function jobs_to_tasks(jobs: readonly GenerationJobSummary[]): readonly TaskStripItemViewModel[] {
  return jobs.filter((job) => TASK_STRIP_STATES.has(job.state)).map(job_to_task);
}

function run_command<TResult>(
  get_current: () => CommandState<TResult>,
  set_next: (next: CommandState<TResult>) => void,
  operation: () => Promise<TResult>,
): Promise<void> {
  if (get_current().status === "pending") {
    return Promise.resolve();
  }
  set_next({ status: "pending" });
  return operation().then(
    (result) => {
      set_next({ status: "success", result });
    },
    (error: unknown) => {
      set_next({ status: "error", failure: to_ui_failure(error, DEFAULT_COMMAND_FAILURE_CODE) });
    },
  );
}

function create_initial_state(
  route: StudioRoute,
  color_mode: ColorMode,
  inspector_width: number,
): StudioState {
  return {
    route,
    settings_section: "illustration",
    color_mode,
    loading: new Set(),
    failures: new Map(),
    generation: {
      profiles: [],
      active_profile_id: null,
      jobs: [],
    },
    prompt: {
      presets: [],
      selected_preset_id: null,
      draft: null,
      save_command: IDLE_COMMAND_STATE,
    },
    assets: {
      active_category: "character",
      records: { character: [], outfit: [], lora: [], vibe: [], workflow: [], prompt_tag: [] },
      vocabulary_catalog: [],
      vocabulary_install_command: IDLE_COMMAND_STATE,
    },
    gallery: {
      records: [],
      selected_record_id: null,
      bulk_delete_command: IDLE_COMMAND_STATE,
    },
    diagnostics: {
      snapshot: null,
      timeline: [],
      support_bundle_command: IDLE_COMMAND_STATE,
    },
    settings: {
      settings: null,
      vocabulary_update_channel: null,
      browser_secret_vault: { state: "unavailable", secret_count: 0 },
      update_command: IDLE_COMMAND_STATE,
    },
    inspector: {
      collapsed: false,
      width: inspector_width,
      selected_record: null,
    },
    tasks: [],
  };
}

class StudioControllerImpl implements StudioController {
  readonly #capabilities: StudioCapabilities;
  #state: StudioState;
  readonly #listeners = new Set<() => void>();
  #unsubscribes: readonly Unsubscribe[] = [];
  #stopped = false;

  constructor(options: StudioControllerOptions) {
    this.#capabilities = options.capabilities;
    this.#state = create_initial_state(
      options.initial_route ?? "settings",
      options.initial_color_mode ?? "light",
      options.initial_inspector_width ?? 320,
    );
  }

  get state(): Readonly<StudioState> {
    return this.#state;
  }

  on_change(listener: () => void): Unsubscribe {
    this.#listeners.add(listener);
    return () => {
      this.#listeners.delete(listener);
    };
  }

  #notify(): void {
    for (const listener of this.#listeners) {
      listener();
    }
  }

  #patch(patch: Partial<StudioState>): void {
    this.#state = { ...this.#state, ...patch };
    this.#notify();
  }

  #patch_generation(patch: Partial<GenerationViewModel>): void {
    this.#patch({ generation: { ...this.#state.generation, ...patch } });
  }

  #patch_jobs(jobs: readonly GenerationJobSummary[]): void {
    this.#patch({
      generation: { ...this.#state.generation, jobs },
      tasks: jobs_to_tasks(jobs),
    });
  }

  #patch_prompt(patch: Partial<PromptViewModel>): void {
    this.#patch({ prompt: { ...this.#state.prompt, ...patch } });
  }

  #patch_assets(patch: Partial<AssetsViewModel>): void {
    this.#patch({ assets: { ...this.#state.assets, ...patch } });
  }

  #patch_gallery(patch: Partial<GalleryViewModel>): void {
    this.#patch({ gallery: { ...this.#state.gallery, ...patch } });
  }

  #patch_diagnostics(patch: Partial<DiagnosticsViewModel>): void {
    this.#patch({ diagnostics: { ...this.#state.diagnostics, ...patch } });
  }

  #patch_settings(patch: Partial<SettingsViewModel>): void {
    this.#patch({ settings: { ...this.#state.settings, ...patch } });
  }

  #patch_inspector(patch: Partial<InspectorViewModel>): void {
    this.#patch({ inspector: { ...this.#state.inspector, ...patch } });
  }

  #set_loading(id: CapabilityId, is_loading: boolean): void {
    const next = new Set(this.#state.loading);
    if (is_loading) {
      next.add(id);
    } else {
      next.delete(id);
    }
    this.#patch({ loading: next });
  }

  #set_failure(id: CapabilityId, failure: UiFailure | null): void {
    const next = new Map(this.#state.failures);
    if (failure) {
      next.set(id, failure);
    } else {
      next.delete(id);
    }
    this.#patch({ failures: next });
  }

  #load_slice<TSnapshot>(
    id: CapabilityId,
    load: () => Promise<TSnapshot>,
    apply: (snapshot: TSnapshot) => void,
  ): Promise<void> {
    this.#set_loading(id, true);
    return load()
      .then((snapshot) => {
        if (this.#stopped) {
          return;
        }
        apply(snapshot);
        this.#set_failure(id, null);
      })
      .catch((error: unknown) => {
        if (this.#stopped) {
          return;
        }
        this.#set_failure(id, to_ui_failure(error, DEFAULT_FAILURE_CODE));
      })
      .finally(() => {
        this.#set_loading(id, false);
      });
  }

  #apply_generation_event(event: GenerationDomainEvent): void {
    if (this.#stopped) {
      return;
    }
    if (event.type === "job_updated") {
      this.#patch_jobs(upsert_by_id(this.#state.generation.jobs, event.job, (job) => job.job_id));
    } else {
      this.#patch_jobs(this.#state.generation.jobs.filter((job) => job.job_id !== event.job_id));
    }
  }

  #apply_profiles_event(event: ProfilesDomainEvent): void {
    if (this.#stopped) {
      return;
    }
    if (event.type === "profile_upserted") {
      this.#patch_generation({
        profiles: upsert_by_id(this.#state.generation.profiles, event.profile, (p) => p.id),
      });
    } else {
      this.#patch_generation({
        profiles: this.#state.generation.profiles.filter((p) => p.id !== event.profile_id),
      });
    }
  }

  #apply_prompt_presets_event(event: PromptPresetsDomainEvent): void {
    if (this.#stopped) {
      return;
    }
    if (event.type === "preset_upserted") {
      this.#patch_prompt({
        presets: upsert_by_id(this.#state.prompt.presets, event.preset, (p) => p.id),
      });
    } else {
      this.#patch_prompt({
        presets: this.#state.prompt.presets.filter((p) => p.id !== event.preset_id),
      });
    }
  }

  #apply_assets_event(event: AssetsDomainEvent): void {
    if (this.#stopped) {
      return;
    }
    if (event.type === "asset_upserted") {
      const { category } = event.asset;
      const records = {
        ...this.#state.assets.records,
        [category]: upsert_by_id(this.#state.assets.records[category], event.asset, (a) => a.id),
      };
      this.#patch_assets({ records });
    } else {
      const records = {
        ...this.#state.assets.records,
        [event.category]: this.#state.assets.records[event.category].filter(
          (a) => a.id !== event.asset_id,
        ),
      };
      this.#patch_assets({ records });
    }
  }

  #apply_gallery_event(event: GalleryDomainEvent): void {
    if (this.#stopped) {
      return;
    }
    if (event.type === "record_upserted") {
      this.#patch_gallery({
        records: upsert_by_id(this.#state.gallery.records, event.record, (r) => r.id),
      });
    } else {
      this.#patch_gallery({
        records: this.#state.gallery.records.filter((r) => r.id !== event.record_id),
      });
    }
  }

  #apply_diagnostics_event(event: DiagnosticsDomainEvent): void {
    if (this.#stopped) {
      return;
    }
    this.#patch_diagnostics({ timeline: [...this.#state.diagnostics.timeline, event.entry] });
  }

  #apply_settings_event(event: SettingsDomainEvent): void {
    if (this.#stopped) {
      return;
    }
    this.#patch_settings({ settings: event.settings });
  }

  /** Not part of `start()`: the catalog is remote, and loading it eagerly would disclose the user's IP and extension version on every session. */
  load_vocabulary_catalog(): Promise<void> {
    return this.#load_slice(
      "vocabulary",
      () => this.#capabilities.vocabulary.load(),
      (vocabulary_catalog) => {
        this.#patch_assets({ vocabulary_catalog });
      },
    );
  }

  async start(): Promise<void> {
    this.#unsubscribes = [
      this.#capabilities.generation.subscribe((event) => {
        this.#apply_generation_event(event);
      }),
      this.#capabilities.profiles.subscribe((event) => {
        this.#apply_profiles_event(event);
      }),
      this.#capabilities.prompt_presets.subscribe((event) => {
        this.#apply_prompt_presets_event(event);
      }),
      this.#capabilities.assets.subscribe((event) => {
        this.#apply_assets_event(event);
      }),
      this.#capabilities.gallery.subscribe((event) => {
        this.#apply_gallery_event(event);
      }),
      this.#capabilities.diagnostics.subscribe((event) => {
        this.#apply_diagnostics_event(event);
      }),
      this.#capabilities.settings.subscribe((event) => {
        this.#apply_settings_event(event);
      }),
    ];

    await Promise.allSettled([
      ...this.#load_stored_records(),
      this.#load_slice(
        "diagnostics",
        () => this.#capabilities.diagnostics.load(),
        (snapshot) => {
          this.#patch_diagnostics({ snapshot });
        },
      ),
      this.#load_slice(
        "settings",
        () => this.#capabilities.settings.load(),
        (snapshot) => {
          this.#patch_settings({
            settings: snapshot.settings,
            vocabulary_update_channel: snapshot.vocabulary_update_channel,
            browser_secret_vault: snapshot.browser_secret_vault,
          });
        },
      ),
    ]);
  }

  /** The slices read from IndexedDB, which an archive import can change. */
  #load_stored_records(): Promise<void>[] {
    return [
      this.#load_slice(
        "generation",
        () => this.#capabilities.generation.load(),
        (jobs) => {
          this.#patch_jobs(jobs);
        },
      ),
      this.#load_slice(
        "profiles",
        () => this.#capabilities.profiles.load(),
        (profiles) => {
          this.#patch_generation({
            profiles,
            active_profile_id: this.#state.generation.active_profile_id ?? profiles[0]?.id ?? null,
          });
        },
      ),
      this.#load_slice(
        "prompt_presets",
        () => this.#capabilities.prompt_presets.load(),
        (presets) => {
          this.#patch_prompt({ presets });
        },
      ),
      this.#load_slice(
        "assets",
        () => this.#capabilities.assets.load(),
        (records) => {
          this.#patch_assets({ records });
        },
      ),
      this.#load_slice(
        "gallery",
        () => this.#capabilities.gallery.load(),
        (records) => {
          this.#patch_gallery({ records });
        },
      ),
    ];
  }

  stop(): Promise<void> {
    this.#stopped = true;
    const cleanup_failures: unknown[] = [];
    for (const unsubscribe of [...this.#unsubscribes].reverse()) {
      try {
        unsubscribe();
      } catch (error) {
        cleanup_failures.push(error);
      }
    }
    this.#unsubscribes = [];
    if (cleanup_failures.length > 0) {
      return Promise.reject(
        new AggregateError(cleanup_failures, "Studio controller cleanup failed"),
      );
    }
    return Promise.resolve();
  }

  set_route(route: StudioRoute): void {
    this.#patch({ route });
  }

  set_settings_section(section: SettingsSection): void {
    this.#patch({ route: "settings", settings_section: section });
  }

  set_inspector_width(width: number): void {
    this.#patch_inspector({ width });
  }

  set_inspector_collapsed(collapsed: boolean): void {
    this.#patch_inspector({ collapsed });
  }

  select_inspector_record(selection: InspectorSelection | null): void {
    this.#patch_inspector({ selected_record: selection });
  }

  async select_prompt_preset(preset_id: Uuid): Promise<void> {
    this.#patch_prompt({ selected_preset_id: preset_id });
    const draft = await this.#capabilities.prompt_presets.load_draft(preset_id);
    if (this.#stopped) {
      return;
    }
    this.#patch_prompt({ draft });
  }

  start_new_prompt_preset(): void {
    this.#patch_prompt({
      selected_preset_id: null,
      draft: {
        id: null,
        display_name: "",
        group: null,
        fixed_positive_prompt: "",
        fixed_negative_prompt: "",
        replacement_rules: [],
        regex_rules: [],
      },
    });
  }

  update_prompt_draft(patch: Partial<PromptPresetDraft>): void {
    if (!this.#state.prompt.draft) {
      return;
    }
    this.#patch_prompt({ draft: { ...this.#state.prompt.draft, ...patch } });
  }

  async bulk_remove_prompt_presets(preset_ids: readonly Uuid[]): Promise<void> {
    await this.#capabilities.prompt_presets.bulk_remove(preset_ids);
    if (this.#stopped) {
      return;
    }
    const removed = new Set(preset_ids);
    this.#patch_prompt({
      presets: this.#state.prompt.presets.filter((p) => !removed.has(p.id)),
      selected_preset_id:
        this.#state.prompt.selected_preset_id !== null &&
        removed.has(this.#state.prompt.selected_preset_id)
          ? null
          : this.#state.prompt.selected_preset_id,
      draft:
        this.#state.prompt.selected_preset_id !== null &&
        removed.has(this.#state.prompt.selected_preset_id)
          ? null
          : this.#state.prompt.draft,
    });
  }

  test_prompt_regex(rule: PromptRegexRule, sample_text: string): Promise<string> {
    return this.#capabilities.prompt_presets.test_regex(rule, sample_text);
  }

  save_prompt_preset(draft: PromptPresetDraft): Promise<void> {
    return run_command(
      () => this.#state.prompt.save_command,
      (next) => {
        this.#patch_prompt({ save_command: next });
      },
      async () => {
        const preset = await this.#capabilities.prompt_presets.save_draft(draft);
        this.#patch_prompt({
          presets: upsert_by_id(this.#state.prompt.presets, preset, (p) => p.id),
          draft: null,
        });
        return preset;
      },
    );
  }

  install_vocabulary_package(
    entry: VocabularyCatalogEntry,
    on_progress?: (progress: VocabularyInstallProgressView) => void,
  ): Promise<void> {
    return run_command(
      () => this.#state.assets.vocabulary_install_command,
      (next) => {
        this.#patch_assets({ vocabulary_install_command: next });
      },
      () => this.#capabilities.vocabulary.install(entry, on_progress),
    );
  }

  update_settings(partial: Partial<TavernCanvasSettings>): Promise<void> {
    return run_command(
      () => this.#state.settings.update_command,
      (next) => {
        this.#patch_settings({ update_command: next });
      },
      async () => {
        const settings = await this.#capabilities.settings.update(partial);
        if (partial.credential_storage_mode === undefined) {
          this.#patch_settings({ settings });
          return settings;
        }
        const [snapshot, profiles] = await Promise.all([
          this.#capabilities.settings.load(),
          // Credential presence is checked against the newly selected backend.
          this.#capabilities.profiles.load(),
        ]);
        this.#patch_settings({
          settings: snapshot.settings,
          vocabulary_update_channel: snapshot.vocabulary_update_channel,
          browser_secret_vault: snapshot.browser_secret_vault,
        });
        this.#patch_generation({ profiles });
        return snapshot.settings;
      },
    );
  }

  export_support_bundle(): Promise<void> {
    return run_command(
      () => this.#state.diagnostics.support_bundle_command,
      (next) => {
        this.#patch_diagnostics({ support_bundle_command: next });
      },
      () => this.#capabilities.diagnostics.export_support_bundle(),
    );
  }

  async load_diagnostics_timeline(): Promise<void> {
    const timeline = await this.#capabilities.diagnostics.load_timeline();
    if (this.#stopped) {
      return;
    }
    this.#patch_diagnostics({ timeline });
  }

  async save_provider_profile(draft: ProviderProfileDraft): Promise<ProviderProfileSummary> {
    const profile = await this.#capabilities.profiles.save(draft);
    const should_select = profile.is_default || this.#state.generation.active_profile_id === null;
    if (should_select) {
      await this.#capabilities.settings.update({ active_provider_profile_id: profile.id });
    }
    if (!this.#stopped) {
      this.#patch_generation({
        profiles: upsert_by_id(this.#state.generation.profiles, profile, (p) => p.id),
        ...(should_select ? { active_profile_id: profile.id } : {}),
      });
    }
    return profile;
  }

  async remove_provider_profile(profile_id: Uuid): Promise<void> {
    await this.#capabilities.profiles.remove(profile_id);
    if (!this.#stopped) {
      this.#patch_generation({
        profiles: this.#state.generation.profiles.filter((p) => p.id !== profile_id),
      });
    }
  }

  test_provider_profile_connection(profile_id: Uuid): Promise<ProfileConnectionTestResult> {
    return this.#capabilities.profiles.test_connection(profile_id);
  }
  async set_provider_profile_credential(
    profile_id: Uuid,
    plaintext_value: string,
  ): Promise<ProviderProfileSummary> {
    const profile = await this.#capabilities.profiles.set_credential(profile_id, plaintext_value);
    if (!this.#stopped) {
      this.#patch_generation({
        profiles: upsert_by_id(this.#state.generation.profiles, profile, (item) => item.id),
      });
    }
    return profile;
  }

  async clear_provider_profile_credential(profile_id: Uuid): Promise<ProviderProfileSummary> {
    const profile = await this.#capabilities.profiles.clear_credential(profile_id);
    if (!this.#stopped) {
      this.#patch_generation({
        profiles: upsert_by_id(this.#state.generation.profiles, profile, (item) => item.id),
      });
    }
    return profile;
  }

  async save_novelai_defaults(
    profile_id: Uuid,
    defaults: NovelAiGenerationDefaults,
  ): Promise<ProviderProfileSummary> {
    const profile = await this.#capabilities.profiles.save_novelai_defaults(profile_id, defaults);
    if (!this.#stopped) {
      this.#patch_generation({
        profiles: upsert_by_id(this.#state.generation.profiles, profile, (item) => item.id),
      });
    }
    return profile;
  }

  async save_prompt_tags(
    profile_id: Uuid,
    selection: PromptTagSelection,
  ): Promise<ProviderProfileSummary> {
    const profile = await this.#capabilities.profiles.save_prompt_tags(profile_id, selection);
    if (!this.#stopped) {
      this.#patch_generation({
        profiles: upsert_by_id(this.#state.generation.profiles, profile, (item) => item.id),
      });
    }
    return profile;
  }

  load_novelai_account(): Promise<NovelAiAccountStatus> {
    return this.#capabilities.novelai.get_account();
  }

  load_novelai_models(): Promise<readonly ResolvedNovelAiModel[]> {
    return this.#capabilities.novelai.load();
  }

  set_deepl_key(plaintext_value: string): Promise<void> {
    return this.#capabilities.settings.set_deepl_key(plaintext_value);
  }

  set_analysis_key(plaintext_value: string): Promise<void> {
    return this.#capabilities.settings.set_analysis_key(plaintext_value);
  }

  list_worldbooks(): Promise<readonly string[]> {
    return this.#capabilities.settings.list_worldbooks();
  }

  clear_analysis_key(): Promise<void> {
    return this.#capabilities.settings.clear_analysis_key();
  }

  clear_deepl_key(): Promise<void> {
    return this.#capabilities.settings.clear_deepl_key();
  }

  async initialize_browser_secret_vault(passphrase: string): Promise<void> {
    const status = await this.#capabilities.settings.initialize_browser_secret_vault(passphrase);
    if (!this.#stopped) {
      this.#patch_settings({ browser_secret_vault: status });
    }
  }

  async unlock_browser_secret_vault(passphrase: string): Promise<void> {
    const status = await this.#capabilities.settings.unlock_browser_secret_vault(passphrase);
    if (!this.#stopped) {
      this.#patch_settings({ browser_secret_vault: status });
    }
  }

  async lock_browser_secret_vault(): Promise<void> {
    const status = await this.#capabilities.settings.lock_browser_secret_vault();
    if (!this.#stopped) {
      this.#patch_settings({ browser_secret_vault: status });
    }
  }

  async reset_browser_secret_vault(): Promise<void> {
    const status = await this.#capabilities.settings.reset_browser_secret_vault();
    if (!this.#stopped) {
      this.#patch_settings({ browser_secret_vault: status });
    }
  }

  async set_vocabulary_update_channel(channel: VocabularyUpdateChannel): Promise<void> {
    await this.#capabilities.settings.set_vocabulary_update_channel(channel);
    if (!this.#stopped) {
      this.#patch_settings({ vocabulary_update_channel: channel });
    }
  }

  import_vocabulary_package(
    file: Blob,
    on_progress?: (progress: VocabularyImportProgressView) => void,
  ): Promise<void> {
    return this.#capabilities.settings.import_vocabulary_package(file, on_progress);
  }

  cancel_vocabulary_import(): void {
    this.#capabilities.settings.cancel_vocabulary_import();
  }

  export_settings_archive(): Promise<Blob> {
    return this.#capabilities.settings.export_archive();
  }

  async import_settings_archive(archive: Blob): Promise<void> {
    await this.#capabilities.settings.import_archive(archive);
    await Promise.allSettled(this.#load_stored_records());
  }

  set_active_asset_category(category: AssetCategory): void {
    this.#patch_assets({ active_category: category });
  }

  async save_asset(
    category: AssetCategory,
    asset: Omit<AssetRecordSummary, "updated_at">,
  ): Promise<void> {
    const saved = await this.#capabilities.assets.save(category, asset);
    if (this.#stopped) {
      return;
    }
    this.#patch_assets({
      records: {
        ...this.#state.assets.records,
        [category]: upsert_by_id(this.#state.assets.records[category], saved, (a) => a.id),
      },
    });
  }

  async remove_asset(category: AssetCategory, asset_id: Uuid): Promise<void> {
    await this.#capabilities.assets.remove(category, asset_id);
    if (this.#stopped) {
      return;
    }
    this.#patch_assets({
      records: {
        ...this.#state.assets.records,
        [category]: this.#state.assets.records[category].filter((a) => a.id !== asset_id),
      },
    });
  }

  async reorder_assets(category: AssetCategory, ordered_ids: readonly Uuid[]): Promise<void> {
    await this.#capabilities.assets.reorder(category, ordered_ids);
    if (this.#stopped) {
      return;
    }
    const by_id = new Map(this.#state.assets.records[category].map((a) => [a.id, a] as const));
    const reordered = ordered_ids
      .map((id) => by_id.get(id))
      .filter((a): a is AssetRecordSummary => a !== undefined);
    this.#patch_assets({
      records: { ...this.#state.assets.records, [category]: reordered },
    });
  }

  search_vocabulary(
    query: string,
    category?: VocabularyCategory,
  ): Promise<VocabularySearchPageView> {
    return this.#capabilities.vocabulary.search(query, category);
  }

  load_more_vocabulary(cursor: string): Promise<VocabularySearchPageView> {
    return this.#capabilities.vocabulary.next_page(cursor);
  }

  select_gallery_record(record_id: Uuid | null): void {
    this.#patch_gallery({ selected_record_id: record_id });
  }

  reveal_gallery_source(record_id: Uuid): Promise<SourceRevealOutcome> {
    return this.#capabilities.gallery.reveal_source(record_id);
  }

  read_gallery_bytes(record_id: Uuid): Promise<Uint8Array> {
    return this.#capabilities.gallery.read_bytes(record_id);
  }

  async pin_gallery_record(record_id: Uuid, pinned: boolean): Promise<void> {
    await this.#capabilities.gallery.pin(record_id, pinned);
    if (this.#stopped) {
      return;
    }
    this.#patch_gallery({
      records: this.#state.gallery.records.map((record) =>
        record.id === record_id ? { ...record, pinned } : record,
      ),
    });
  }

  async detach_gallery_record(record_id: Uuid): Promise<void> {
    await this.#capabilities.gallery.detach_from_message(record_id);
    if (this.#stopped) {
      return;
    }
    // `quarantined` marks a record no longer attached to a live message.
    this.#patch_gallery({
      records: this.#state.gallery.records.map((record) =>
        record.id === record_id ? { ...record, quarantined: true } : record,
      ),
    });
  }

  async delete_gallery_record(record_id: Uuid): Promise<void> {
    await this.#capabilities.gallery.delete_record(record_id);
    if (this.#stopped) {
      return;
    }
    this.#patch_gallery({
      records: this.#state.gallery.records.filter((record) => record.id !== record_id),
      selected_record_id:
        this.#state.gallery.selected_record_id === record_id
          ? null
          : this.#state.gallery.selected_record_id,
    });
  }

  async dismiss_failed_tasks(): Promise<void> {
    const failed = this.#state.generation.jobs.filter((job) => job.state === "failed");
    await this.#capabilities.generation.dismiss(failed.map((job) => job.job_id));
  }

  bulk_delete_gallery_records(record_ids: readonly Uuid[]): Promise<void> {
    return run_command(
      () => this.#state.gallery.bulk_delete_command,
      (next) => {
        this.#patch_gallery({ bulk_delete_command: next });
      },
      async () => {
        await this.#capabilities.gallery.bulk_delete(record_ids);
        const removed_ids = new Set(record_ids);
        this.#patch_gallery({
          records: this.#state.gallery.records.filter((record) => !removed_ids.has(record.id)),
          selected_record_id:
            this.#state.gallery.selected_record_id !== null &&
            removed_ids.has(this.#state.gallery.selected_record_id)
              ? null
              : this.#state.gallery.selected_record_id,
        });
      },
    );
  }
}

export function create_studio_controller(options: StudioControllerOptions): StudioController {
  return new StudioControllerImpl(options);
}
