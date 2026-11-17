import type { ComfyUiInspection } from "../../modules/comfyui/server_inspection.js";
import type { ServerWorkflow } from "../../modules/comfyui/server_workflows.js";
import type {
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
  ComfyUiInspectionInput,
  GenerationJobSummary,
  InstalledVocabularyView,
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
} from "../contracts/ui_capabilities.js";
import {
  type AssetsViewModel,
  type ColorMode,
  type DiagnosticsViewModel,
  type GalleryViewModel,
  type GenerationViewModel,
  type InspectorSelection,
  type DeletionSubject,
  type InspectorViewModel,
  type PromptViewModel,
  type SettingsSection,
  type SettingsViewModel,
  type StudioRoute,
  type StudioState,
  type UiFailure,
} from "../contracts/view_models.js";

import {
  create_initial_state,
  DEFAULT_COMMAND_FAILURE_CODE,
  DEFAULT_FAILURE_CODE,
  jobs_to_tasks,
  reduce_assets_event,
  reduce_diagnostics_event,
  reduce_gallery_event,
  reduce_generation_event,
  reduce_profiles_event,
  reduce_prompt_presets_event,
  reduce_settings_event,
  run_command,
  to_ui_failure,
  upsert_by_id,
} from "./studio_state.js";

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
  /** Chooses the one profile generation uses. */
  set_active_provider_profile(profile_id: Uuid | null): Promise<void>;
  remove_provider_profile(profile_id: Uuid): Promise<void>;
  test_provider_profile_connection(profile_id: Uuid): Promise<ProfileConnectionTestResult>;
  inspect_comfyui(input: ComfyUiInspectionInput): Promise<ComfyUiInspection>;
  list_comfyui_workflows(base_url: string): Promise<readonly ServerWorkflow[]>;
  read_comfyui_workflow(base_url: string, path: string): Promise<string>;
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
  set_vocabulary_token(plaintext_value: string): Promise<void>;
  clear_vocabulary_token(): Promise<void>;
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
  load_installed_vocabulary(): Promise<InstalledVocabularyView | null>;

  select_gallery_record(record_id: Uuid | null): void;
  read_gallery_bytes(record_id: Uuid): Promise<Uint8Array>;
  /** A WebP picture at most 384 px on its long edge, made and cached on first read. */
  read_gallery_thumbnail(record_id: Uuid): Promise<Uint8Array>;
  pin_gallery_record(record_id: Uuid, pinned: boolean): Promise<void>;
  /** Clears only the message attachment; `delete_gallery_record` is the separate permanent action. */
  detach_gallery_record(record_id: Uuid): Promise<void>;
  delete_gallery_record(record_id: Uuid): Promise<void>;
  reveal_gallery_source(record_id: Uuid): Promise<SourceRevealOutcome>;
  bulk_delete_gallery_records(record_ids: readonly Uuid[]): Promise<void>;
  /** Removes every failed job from the task strip and the job store. */
  dismiss_failed_tasks(): Promise<void>;

  /**
   * Shows a deletion with an undo button and carries it out after `DELETION_UNDO_MS`. The caller
   * hides the item itself; `restore` shows it again on undo or when `commit` fails.
   */
  defer_deletion(subject: DeletionSubject, actions: DeferredDeletionActions): void;
  /** Cancels a pending deletion and shows its item again. */
  undo_deletion(pending_id: string): void;
  dismiss_deletion_failure(): void;
}

export interface DeferredDeletionActions {
  readonly commit: () => Promise<void>;
  readonly restore: () => void;
}

/** How long a deletion can be undone before it is carried out. */
export const DELETION_UNDO_MS = 8000;

class StudioControllerImpl implements StudioController {
  readonly #capabilities: StudioCapabilities;
  #state: StudioState;
  readonly #listeners = new Set<() => void>();
  #unsubscribes: readonly Unsubscribe[] = [];
  #stopped = false;
  #settings_queue: Promise<void> = Promise.resolve();
  readonly #pending_deletions = new Map<
    string,
    {
      readonly subject: DeletionSubject;
      readonly actions: DeferredDeletionActions;
      readonly timer: ReturnType<typeof setTimeout>;
    }
  >();
  /** Records waiting for a deferred deletion; every write to the state leaves them out. */
  readonly #hidden_assets = new Set<Uuid>();
  readonly #hidden_gallery = new Set<Uuid>();

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
    this.#state = { ...this.#state, ...this.#without_hidden(patch) };
    this.#notify();
  }

  #without_hidden(patch: Partial<StudioState>): Partial<StudioState> {
    let result = patch;
    if (patch.assets !== undefined && this.#hidden_assets.size > 0) {
      const records: Record<AssetCategory, readonly AssetRecordSummary[]> = {
        ...patch.assets.records,
      };
      for (const category of Object.keys(records) as AssetCategory[]) {
        records[category] = records[category].filter(
          (record) => !this.#hidden_assets.has(record.id),
        );
      }
      result = { ...result, assets: { ...patch.assets, records } };
    }
    if (patch.gallery !== undefined && this.#hidden_gallery.size > 0) {
      const records = patch.gallery.records.filter(
        (record) => !this.#hidden_gallery.has(record.id),
      );
      result = { ...result, gallery: { ...patch.gallery, records } };
    }
    return result;
  }

  defer_deletion(subject: DeletionSubject, actions: DeferredDeletionActions): void {
    const id = crypto.randomUUID();
    const timer = setTimeout(() => {
      void this.#commit_deletion(id);
    }, DELETION_UNDO_MS);
    this.#pending_deletions.set(id, { subject, actions, timer });
    this.#patch({
      pending_deletions: [...this.#state.pending_deletions, { id, ...subject }],
    });
  }

  undo_deletion(pending_id: string): void {
    const pending = this.#pending_deletions.get(pending_id);
    if (pending === undefined) {
      return;
    }
    clearTimeout(pending.timer);
    this.#pending_deletions.delete(pending_id);
    pending.actions.restore();
    this.#patch({
      pending_deletions: this.#state.pending_deletions.filter((item) => item.id !== pending_id),
    });
  }

  dismiss_deletion_failure(): void {
    this.#patch({ deletion_failure: null });
  }

  async #commit_deletion(pending_id: string): Promise<void> {
    const pending = this.#pending_deletions.get(pending_id);
    if (pending === undefined) {
      return;
    }
    clearTimeout(pending.timer);
    this.#pending_deletions.delete(pending_id);
    this.#patch({
      pending_deletions: this.#state.pending_deletions.filter((item) => item.id !== pending_id),
    });
    try {
      await pending.actions.commit();
    } catch (error) {
      pending.actions.restore();
      this.#patch({
        deletion_failure: {
          ...pending.subject,
          message: error instanceof Error ? error.message : String(error),
        },
      });
    }
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
    if (!this.#stopped) {
      this.#patch(reduce_generation_event(this.#state, event));
    }
  }

  #apply_profiles_event(event: ProfilesDomainEvent): void {
    if (!this.#stopped) {
      this.#patch(reduce_profiles_event(this.#state, event));
    }
  }

  #apply_prompt_presets_event(event: PromptPresetsDomainEvent): void {
    if (!this.#stopped) {
      this.#patch(reduce_prompt_presets_event(this.#state, event));
    }
  }

  #apply_assets_event(event: AssetsDomainEvent): void {
    if (!this.#stopped) {
      this.#patch(reduce_assets_event(this.#state, event));
    }
  }

  #apply_gallery_event(event: GalleryDomainEvent): void {
    if (!this.#stopped) {
      this.#patch(reduce_gallery_event(this.#state, event));
    }
  }

  #apply_diagnostics_event(event: DiagnosticsDomainEvent): void {
    if (!this.#stopped) {
      this.#patch(reduce_diagnostics_event(this.#state, event));
    }
  }

  #apply_settings_event(event: SettingsDomainEvent): void {
    if (!this.#stopped) {
      this.#patch(reduce_settings_event(this.#state, event));
    }
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
    // Deletions the user did not undo are carried out now rather than dropped.
    const commits = [...this.#pending_deletions.keys()].map((id) => this.#commit_deletion(id));
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
    return Promise.all(commits).then(() => undefined);
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

  /** Updates run one after another, so a change made while another is saving is never dropped. */
  update_settings(partial: Partial<TavernCanvasSettings>): Promise<void> {
    const run = this.#settings_queue.then(() => this.#apply_settings(partial));
    this.#settings_queue = run;
    return run;
  }

  async #apply_settings(partial: Partial<TavernCanvasSettings>): Promise<void> {
    this.#patch_settings({ update_command: { status: "pending" } });
    try {
      const settings = await this.#save_settings(partial);
      this.#patch_settings({ update_command: { status: "success", result: settings } });
    } catch (error) {
      this.#patch_settings({
        update_command: {
          status: "error",
          failure: to_ui_failure(error, DEFAULT_COMMAND_FAILURE_CODE),
        },
      });
    }
  }

  async #save_settings(partial: Partial<TavernCanvasSettings>): Promise<TavernCanvasSettings> {
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
      browser_secret_vault: snapshot.browser_secret_vault,
    });
    this.#patch_generation({ profiles });
    return snapshot.settings;
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
    if (!this.#stopped) {
      this.#patch_generation({
        profiles: upsert_by_id(this.#state.generation.profiles, profile, (p) => p.id),
      });
    }
    // The first profile is the one generation uses until another is chosen.
    if (this.#active_provider_profile() === null) {
      await this.set_active_provider_profile(profile.id);
    }
    return profile;
  }

  async remove_provider_profile(profile_id: Uuid): Promise<void> {
    await this.#capabilities.profiles.remove(profile_id);
    const profiles = this.#state.generation.profiles.filter((p) => p.id !== profile_id);
    if (!this.#stopped) {
      this.#patch_generation({ profiles });
    }
    if (this.#state.settings.settings?.active_provider_profile_id === profile_id) {
      await this.set_active_provider_profile(profiles[0]?.id ?? null);
    }
  }

  /** The profile generation uses, or `null` when none is chosen or the chosen one is gone. */
  #active_provider_profile(): ProviderProfileSummary | null {
    const profile_id = this.#state.settings.settings?.active_provider_profile_id ?? null;
    return this.#state.generation.profiles.find((profile) => profile.id === profile_id) ?? null;
  }

  async set_active_provider_profile(profile_id: Uuid | null): Promise<void> {
    await this.update_settings({ active_provider_profile_id: profile_id });
    if (!this.#stopped) {
      this.#patch_generation({
        active_profile_id: this.#state.settings.settings?.active_provider_profile_id ?? null,
      });
    }
  }

  test_provider_profile_connection(profile_id: Uuid): Promise<ProfileConnectionTestResult> {
    return this.#capabilities.profiles.test_connection(profile_id);
  }
  inspect_comfyui(input: ComfyUiInspectionInput): Promise<ComfyUiInspection> {
    return this.#capabilities.profiles.inspect_comfyui(input);
  }
  list_comfyui_workflows(base_url: string): Promise<readonly ServerWorkflow[]> {
    return this.#capabilities.profiles.list_comfyui_workflows(base_url);
  }
  read_comfyui_workflow(base_url: string, path: string): Promise<string> {
    return this.#capabilities.profiles.read_comfyui_workflow(base_url, path);
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

  set_vocabulary_token(plaintext_value: string): Promise<void> {
    return this.#capabilities.settings.set_vocabulary_token(plaintext_value);
  }

  clear_vocabulary_token(): Promise<void> {
    return this.#capabilities.settings.clear_vocabulary_token();
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

  remove_asset(category: AssetCategory, asset_id: Uuid): Promise<void> {
    const list = this.#state.assets.records[category];
    const index = list.findIndex((record) => record.id === asset_id);
    const record = list[index];
    this.#hidden_assets.add(asset_id);
    this.#patch_assets({ records: { ...this.#state.assets.records } });
    this.defer_deletion(
      { label: record?.display_name ?? null, count: 1 },
      {
        commit: async () => {
          await this.#capabilities.assets.remove(category, asset_id);
          this.#hidden_assets.delete(asset_id);
        },
        restore: () => {
          this.#hidden_assets.delete(asset_id);
          const current = this.#state.assets.records[category];
          if (record === undefined || current.some((candidate) => candidate.id === asset_id)) {
            return;
          }
          const restored = [...current];
          restored.splice(Math.min(index, restored.length), 0, record);
          this.#patch_assets({ records: { ...this.#state.assets.records, [category]: restored } });
        },
      },
    );
    return Promise.resolve();
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

  load_installed_vocabulary(): Promise<InstalledVocabularyView | null> {
    return this.#capabilities.vocabulary.installed();
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

  read_gallery_thumbnail(record_id: Uuid): Promise<Uint8Array> {
    return this.#capabilities.gallery.read_thumbnail(record_id);
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

  delete_gallery_record(record_id: Uuid): Promise<void> {
    this.#hide_gallery_records([record_id], () =>
      this.#capabilities.gallery.delete_record(record_id),
    );
    return Promise.resolve();
  }

  /** Hides gallery records at once and deletes them unless the user undoes it in time. */
  #hide_gallery_records(record_ids: readonly Uuid[], remove: () => Promise<void>): void {
    const ids = new Set(record_ids);
    const before = this.#state.gallery.records;
    for (const id of ids) {
      this.#hidden_gallery.add(id);
    }
    this.#patch_gallery({
      records: before,
      selected_record_id:
        this.#state.gallery.selected_record_id !== null &&
        ids.has(this.#state.gallery.selected_record_id)
          ? null
          : this.#state.gallery.selected_record_id,
    });
    this.defer_deletion(
      { label: null, count: ids.size },
      {
        commit: async () => {
          await remove();
          for (const id of ids) {
            this.#hidden_gallery.delete(id);
          }
        },
        restore: () => {
          for (const id of ids) {
            this.#hidden_gallery.delete(id);
          }
          const present = new Set(this.#state.gallery.records.map((record) => record.id));
          const missing = before.filter((record) => ids.has(record.id) && !present.has(record.id));
          if (missing.length === 0) {
            return;
          }
          const order = new Map(before.map((record, index) => [record.id, index] as const));
          const records = [...this.#state.gallery.records, ...missing].sort(
            (a, b) =>
              (order.get(a.id) ?? Number.MAX_SAFE_INTEGER) -
              (order.get(b.id) ?? Number.MAX_SAFE_INTEGER),
          );
          this.#patch_gallery({ records });
        },
      },
    );
  }

  async dismiss_failed_tasks(): Promise<void> {
    const failed = this.#state.generation.jobs.filter((job) => job.state === "failed");
    await this.#capabilities.generation.dismiss(failed.map((job) => job.job_id));
  }

  bulk_delete_gallery_records(record_ids: readonly Uuid[]): Promise<void> {
    this.#hide_gallery_records(record_ids, () =>
      this.#capabilities.gallery.bulk_delete(record_ids),
    );
    return Promise.resolve();
  }
}

export function create_studio_controller(options: StudioControllerOptions): StudioController {
  return new StudioControllerImpl(options);
}
