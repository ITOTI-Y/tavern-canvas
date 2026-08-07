import type { TavernCanvasSettings, Uuid, VocabularyCatalogEntry } from "@tavern-canvas/contracts";

import type {
  AssetsDomainEvent,
  CapabilityId,
  DiagnosticsDomainEvent,
  GalleryDomainEvent,
  GenerationDomainEvent,
  GenerationSubmitCommand,
  MigrationDomainEvent,
  ProfileConnectionTestResult,
  ProfilesDomainEvent,
  ProviderProfileDraft,
  ProviderProfileSummary,
  PromptPresetDraft,
  PromptPresetsDomainEvent,
  PromptRegexRule,
  SettingsDomainEvent,
  StudioCapabilities,
  Unsubscribe,
  VocabularyUpdateChannel,
} from "../contracts/ui_capabilities.js";
import {
  IDLE_COMMAND_STATE,
  type AssetsViewModel,
  type ColorMode,
  type CommandState,
  type DiagnosticsViewModel,
  type GalleryViewModel,
  type InspectorSelection,
  type InspectorViewModel,
  type PromptViewModel,
  type SettingsViewModel,
  type StudioRoute,
  type StudioState,
  type UiFailure,
  type WorkbenchViewModel,
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
  set_color_mode(color_mode: ColorMode): void;
  set_inspector_width(width: number): void;
  set_inspector_collapsed(collapsed: boolean): void;
  select_inspector_record(selection: InspectorSelection | null): void;
  submit_generation(command: GenerationSubmitCommand): Promise<void>;
  cancel_generation(job_id: Uuid): Promise<void>;
  retry_generation(job_id: Uuid): Promise<void>;
  /** Sets the Workbench's active provider profile selection (local UI state, no capability call). */
  select_provider_profile(profile_id: Uuid | null): void;
  /** Loads a preset's editable draft and selects it. The draft then lives only in controller state
   * (`state.prompt.draft`) until `save_prompt_preset` persists it -- matching the plan's "draft
   * edits remain local until Save" rule. */
  select_prompt_preset(preset_id: Uuid): Promise<void>;
  /** Starts a new, unsaved preset draft (`id: null`) and clears the current selection. */
  start_new_prompt_preset(): void;
  /** Clears the current draft/selection without loading a replacement (e.g. after a confirmed
   * discard). */
  clear_prompt_draft(): void;
  /** Patches the in-progress draft locally; never calls `save_draft` itself. */
  update_prompt_draft(patch: Partial<PromptPresetDraft>): void;
  remove_prompt_preset(preset_id: Uuid): Promise<void>;
  bulk_remove_prompt_presets(preset_ids: readonly Uuid[]): Promise<void>;
  test_prompt_regex(rule: PromptRegexRule, sample_text: string): Promise<string>;
  save_prompt_preset(draft: PromptPresetDraft): Promise<void>;
  install_vocabulary_package(entry: VocabularyCatalogEntry): Promise<void>;
  update_settings(partial: Partial<TavernCanvasSettings>): Promise<void>;
  test_diagnostics_connection(): Promise<void>;
  export_support_bundle(): Promise<void>;
  retry_migration(): Promise<void>;

  // -------------------------------------------------------------------------
  // Additive Diagnostics/Settings command surface (Stage 06 Task 7).
  //
  // T1's command surface was intentionally partial (task-1-report.md, ledgered concern (a)):
  // "T5-7 extend via run_command pattern". These are plain async passthroughs rather than
  // run_command-tracked CommandState slices -- each one is either a collection-item-level
  // mutation (profile save/remove/test) whose pending/error UI belongs to the row/dialog that
  // triggered it, not shared StudioState, or a page-level action (archive export/import, legacy
  // cleanup) with no other view depending on its pending state. None of them add fields to
  // SettingsViewModel/DiagnosticsViewModel/MigrationSnapshot: every new field would be a required
  // addition T1/T2's own already-passing test fixtures (studio_controller.test.ts,
  // StudioShell.test.ts) don't know about, which is outside this task's ownership to edit.
  // -------------------------------------------------------------------------

  /** Diagnostics' timeline is intentionally not part of the eager `start()` load (a large
   * historical ring buffer a session may never need) -- the Diagnostics view requests it once
   * mounted. */
  load_diagnostics_timeline(): Promise<void>;
  save_provider_profile(draft: ProviderProfileDraft): Promise<ProviderProfileSummary>;
  remove_provider_profile(profile_id: Uuid): Promise<void>;
  test_provider_profile_connection(profile_id: Uuid): Promise<ProfileConnectionTestResult>;
  /** Re-fetches the settings snapshot after acknowledging, so `state.settings.settings.gateway
   * .http_acknowledgments` reflects the host adapter's own persisted timestamp rather than a
   * client-guessed one. */
  acknowledge_http_origin(origin: string): Promise<void>;
  set_vocabulary_update_channel(channel: VocabularyUpdateChannel): Promise<void>;
  export_settings_archive(): Promise<Blob>;
  import_settings_archive(archive: Blob): Promise<void>;
  /** Re-fetches the migration snapshot after cleanup so `state.diagnostics.migration` reflects
   * the post-cleanup counts. */
  confirm_legacy_cleanup(confirmation_text: string): Promise<void>;
}

/** Stable fallback code for a rejection whose error doesn't already carry a snake_case `code`. */
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

/** Reused by every list-shaped domain event (upsert-by-id semantics) across five capabilities. */
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

/**
 * Runs a mutating command with pending/success/error tracking and duplicate-submission
 * prevention. A command already `pending` short-circuits to a resolved no-op instead of
 * re-invoking `operation`.
 */
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
    color_mode,
    loading: new Set(),
    failures: new Map(),
    workbench: {
      profiles: [],
      active_profile_id: null,
      jobs: [],
      submit_command: IDLE_COMMAND_STATE,
    },
    prompt: {
      presets: [],
      selected_preset_id: null,
      draft: null,
      save_command: IDLE_COMMAND_STATE,
    },
    assets: {
      active_category: "character",
      records: { character: [], outfit: [], lora: [], vibe: [], reference: [], workflow: [] },
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
      migration: null,
      connection_test_command: IDLE_COMMAND_STATE,
      support_bundle_command: IDLE_COMMAND_STATE,
    },
    settings: {
      settings: null,
      vocabulary_update_channel: null,
      update_command: IDLE_COMMAND_STATE,
      migration_retry_command: IDLE_COMMAND_STATE,
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
      options.initial_route ?? "workbench",
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

  #patch_workbench(patch: Partial<WorkbenchViewModel>): void {
    this.#patch({ workbench: { ...this.#state.workbench, ...patch } });
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

  /** Loads one capability's initial slice without gating on any other capability's load. */
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
      this.#patch_workbench({
        jobs: upsert_by_id(this.#state.workbench.jobs, event.job, (job) => job.job_id),
      });
    } else {
      this.#patch_workbench({
        jobs: this.#state.workbench.jobs.filter((job) => job.job_id !== event.job_id),
      });
    }
  }

  #apply_profiles_event(event: ProfilesDomainEvent): void {
    if (this.#stopped) {
      return;
    }
    if (event.type === "profile_upserted") {
      this.#patch_workbench({
        profiles: upsert_by_id(this.#state.workbench.profiles, event.profile, (p) => p.id),
      });
    } else {
      this.#patch_workbench({
        profiles: this.#state.workbench.profiles.filter((p) => p.id !== event.profile_id),
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

  #apply_migration_event(event: MigrationDomainEvent): void {
    if (this.#stopped) {
      return;
    }
    this.#patch_diagnostics({ migration: event.snapshot });
  }

  #apply_settings_event(event: SettingsDomainEvent): void {
    if (this.#stopped) {
      return;
    }
    this.#patch_settings({ settings: event.settings });
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
      this.#capabilities.migration.subscribe((event) => {
        this.#apply_migration_event(event);
      }),
      this.#capabilities.settings.subscribe((event) => {
        this.#apply_settings_event(event);
      }),
    ];

    await Promise.allSettled([
      this.#load_slice(
        "generation",
        () => this.#capabilities.generation.load(),
        (jobs) => {
          this.#patch_workbench({ jobs });
        },
      ),
      this.#load_slice(
        "profiles",
        () => this.#capabilities.profiles.load(),
        (profiles) => {
          this.#patch_workbench({
            profiles,
            active_profile_id: this.#state.workbench.active_profile_id ?? profiles[0]?.id ?? null,
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
      this.#load_slice(
        "vocabulary",
        () => this.#capabilities.vocabulary.load(),
        (vocabulary_catalog) => {
          this.#patch_assets({ vocabulary_catalog });
        },
      ),
      this.#load_slice(
        "diagnostics",
        () => this.#capabilities.diagnostics.load(),
        (snapshot) => {
          this.#patch_diagnostics({ snapshot });
        },
      ),
      this.#load_slice(
        "migration",
        () => this.#capabilities.migration.load(),
        (snapshot) => {
          this.#patch_diagnostics({ migration: snapshot });
        },
      ),
      this.#load_slice(
        "settings",
        () => this.#capabilities.settings.load(),
        (snapshot) => {
          this.#patch_settings({
            settings: snapshot.settings,
            vocabulary_update_channel: snapshot.vocabulary_update_channel,
          });
        },
      ),
    ]);
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

  set_color_mode(color_mode: ColorMode): void {
    this.#patch({ color_mode });
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

  submit_generation(command: GenerationSubmitCommand): Promise<void> {
    return run_command(
      () => this.#state.workbench.submit_command,
      (next) => {
        this.#patch_workbench({ submit_command: next });
      },
      async () => {
        const job = await this.#capabilities.generation.submit(command);
        this.#patch_workbench({
          jobs: upsert_by_id(this.#state.workbench.jobs, job, (j) => j.job_id),
        });
        return job;
      },
    );
  }

  async cancel_generation(job_id: Uuid): Promise<void> {
    const job = await this.#capabilities.generation.cancel(job_id);
    this.#patch_workbench({
      jobs: upsert_by_id(this.#state.workbench.jobs, job, (j) => j.job_id),
    });
  }

  async retry_generation(job_id: Uuid): Promise<void> {
    const job = await this.#capabilities.generation.retry(job_id);
    this.#patch_workbench({
      jobs: upsert_by_id(this.#state.workbench.jobs, job, (j) => j.job_id),
    });
  }

  select_provider_profile(profile_id: Uuid | null): void {
    this.#patch_workbench({ active_profile_id: profile_id });
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

  clear_prompt_draft(): void {
    this.#patch_prompt({ selected_preset_id: null, draft: null });
  }

  update_prompt_draft(patch: Partial<PromptPresetDraft>): void {
    if (!this.#state.prompt.draft) {
      return;
    }
    this.#patch_prompt({ draft: { ...this.#state.prompt.draft, ...patch } });
  }

  async remove_prompt_preset(preset_id: Uuid): Promise<void> {
    await this.#capabilities.prompt_presets.remove(preset_id);
    this.#patch_prompt({
      presets: this.#state.prompt.presets.filter((p) => p.id !== preset_id),
      selected_preset_id:
        this.#state.prompt.selected_preset_id === preset_id
          ? null
          : this.#state.prompt.selected_preset_id,
      draft: this.#state.prompt.selected_preset_id === preset_id ? null : this.#state.prompt.draft,
    });
  }

  async bulk_remove_prompt_presets(preset_ids: readonly Uuid[]): Promise<void> {
    await this.#capabilities.prompt_presets.bulk_remove(preset_ids);
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

  install_vocabulary_package(entry: VocabularyCatalogEntry): Promise<void> {
    return run_command(
      () => this.#state.assets.vocabulary_install_command,
      (next) => {
        this.#patch_assets({ vocabulary_install_command: next });
      },
      () => this.#capabilities.vocabulary.install(entry),
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
        this.#patch_settings({ settings });
        return settings;
      },
    );
  }

  test_diagnostics_connection(): Promise<void> {
    return run_command(
      () => this.#state.diagnostics.connection_test_command,
      (next) => {
        this.#patch_diagnostics({ connection_test_command: next });
      },
      () => this.#capabilities.diagnostics.test_connection(),
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

  retry_migration(): Promise<void> {
    return run_command(
      () => this.#state.settings.migration_retry_command,
      (next) => {
        this.#patch_settings({ migration_retry_command: next });
      },
      async () => {
        const snapshot = await this.#capabilities.migration.retry();
        this.#patch_diagnostics({ migration: snapshot });
        return snapshot;
      },
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
    if (!this.#stopped) {
      this.#patch_workbench({
        profiles: upsert_by_id(this.#state.workbench.profiles, profile, (p) => p.id),
      });
    }
    return profile;
  }

  async remove_provider_profile(profile_id: Uuid): Promise<void> {
    await this.#capabilities.profiles.remove(profile_id);
    if (!this.#stopped) {
      this.#patch_workbench({
        profiles: this.#state.workbench.profiles.filter((p) => p.id !== profile_id),
      });
    }
  }

  test_provider_profile_connection(profile_id: Uuid): Promise<ProfileConnectionTestResult> {
    return this.#capabilities.profiles.test_connection(profile_id);
  }

  acknowledge_http_origin(origin: string): Promise<void> {
    return this.#capabilities.settings
      .acknowledge_http_origin(origin)
      .then(() => this.#capabilities.settings.load())
      .then((snapshot) => {
        if (this.#stopped) {
          return;
        }
        this.#patch_settings({
          settings: snapshot.settings,
          vocabulary_update_channel: snapshot.vocabulary_update_channel,
        });
      });
  }

  async set_vocabulary_update_channel(channel: VocabularyUpdateChannel): Promise<void> {
    await this.#capabilities.settings.set_vocabulary_update_channel(channel);
    if (!this.#stopped) {
      this.#patch_settings({ vocabulary_update_channel: channel });
    }
  }

  export_settings_archive(): Promise<Blob> {
    return this.#capabilities.settings.export_archive();
  }

  import_settings_archive(archive: Blob): Promise<void> {
    return this.#capabilities.settings.import_archive(archive);
  }

  confirm_legacy_cleanup(confirmation_text: string): Promise<void> {
    return this.#capabilities.migration
      .confirm_legacy_cleanup(confirmation_text)
      .then(() => this.#capabilities.migration.load())
      .then((snapshot) => {
        if (this.#stopped) {
          return;
        }
        this.#patch_diagnostics({ migration: snapshot });
      });
  }
}

export function create_studio_controller(options: StudioControllerOptions): StudioController {
  return new StudioControllerImpl(options);
}
