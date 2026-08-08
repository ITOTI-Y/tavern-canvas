import type {
  GenerationState,
  KnowledgeRecord,
  KnowledgeRecordDraft,
  LlmConnectionDraft,
  LlmConnectionProfile,
  LlmConnectionTestResult,
  PersonaProfile,
  PersonaProfileDraft,
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
  GenerationSubmitCommand,
  KnowledgeDomainEvent,
  LlmConnectionsDomainEvent,
  MigrationDomainEvent,
  PersonasDomainEvent,
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
  type InspectorSelection,
  type InspectorViewModel,
  type LibraryViewModel,
  type LlmConnectionsViewModel,
  type PromptViewModel,
  type SettingsViewModel,
  type StudioRoute,
  type StudioState,
  type TaskStripItemViewModel,
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
  /** `on_progress` (Stage 06 Task 6 addition) forwards VocabularyCapability.install's own
   * progress callback straight through -- see that method's doc comment on the Worker
   * dispose/recreate handoff the caller must do after this resolves. */
  install_vocabulary_package(
    entry: VocabularyCatalogEntry,
    on_progress?: (progress: VocabularyInstallProgressView) => void,
  ): Promise<void>;
  /** Fetches the remote catalog on demand. Never called during bootstrap -- see the implementation
   * for why the studio must open without touching the network. */
  load_vocabulary_catalog(): Promise<void>;
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
  /** Stores the Gateway bearer token in host secret storage and refreshes the settings snapshot
   * so the view renders the persisted reference rather than a client-guessed one. */
  set_gateway_token(plaintext_value: string): Promise<void>;
  clear_gateway_token(): Promise<void>;
  set_vocabulary_update_channel(channel: VocabularyUpdateChannel): Promise<void>;
  export_settings_archive(): Promise<Blob>;
  import_settings_archive(archive: Blob): Promise<void>;
  /** Re-fetches the migration snapshot after cleanup so `state.diagnostics.migration` reflects
   * the post-cleanup counts. */
  confirm_legacy_cleanup(confirmation_text: string): Promise<void>;

  // -------------------------------------------------------------------------
  // Assets (Stage 06 Task 6 addition -- T1's command surface intentionally left
  // these to the view tasks that actually need them; see task-1-report.md).
  // -------------------------------------------------------------------------
  set_active_asset_category(category: AssetCategory): void;
  save_asset(category: AssetCategory, asset: Omit<AssetRecordSummary, "updated_at">): Promise<void>;
  remove_asset(category: AssetCategory, asset_id: Uuid): Promise<void>;
  reorder_assets(category: AssetCategory, ordered_ids: readonly Uuid[]): Promise<void>;

  // -------------------------------------------------------------------------
  // Personas and knowledge (Stage 07 feature-gap addition). Stage 06 shipped read paths only;
  // these are the create/update/delete surface behind the Assets view's two new panels.
  // -------------------------------------------------------------------------
  save_persona(draft: PersonaProfileDraft): Promise<PersonaProfile>;
  remove_persona(persona_id: Uuid): Promise<void>;
  save_knowledge_entry(draft: KnowledgeRecordDraft): Promise<KnowledgeRecord>;
  set_knowledge_entry_enabled(entry_id: Uuid, enabled: boolean): Promise<KnowledgeRecord>;
  remove_knowledge_entry(entry_id: Uuid): Promise<void>;
  /** Local multi-select state for the knowledge panel's batch actions; no capability call. */
  set_knowledge_selection(entry_ids: readonly Uuid[]): void;
  bulk_remove_knowledge_entries(entry_ids: readonly Uuid[]): Promise<void>;

  // -------------------------------------------------------------------------
  // Vocabulary search (Stage 06 Task 6 addition). Plain request/response
  // pass-throughs, not run_command-tracked: VocabularyCapability.search/next_page
  // already mirror VocabularyClient's stateless request/response shape (no
  // domain event stream), and per-keystroke search pending state is local to
  // whichever panel is searching, not something the rest of the Studio observes.
  // -------------------------------------------------------------------------
  search_vocabulary(
    query: string,
    category?: VocabularyCategory,
  ): Promise<VocabularySearchPageView>;
  load_more_vocabulary(cursor: string): Promise<VocabularySearchPageView>;

  // -------------------------------------------------------------------------
  // Gallery (Stage 06 Task 6 addition).
  // -------------------------------------------------------------------------
  // -------------------------------------------------------------------------
  // Text-LLM connections (Stage 07 feature-gap addition). Plain pass-throughs for the same reason
  // the provider-profile commands are: pending state belongs to the row or dialog that triggered
  // the mutation, not to shared StudioState.
  // -------------------------------------------------------------------------
  select_llm_connection(connection_id: Uuid | null): void;
  save_llm_connection(draft: LlmConnectionDraft): Promise<LlmConnectionProfile>;
  remove_llm_connection(connection_id: Uuid): Promise<void>;
  /** The plaintext argument reaches host secret storage and nothing else; state only ever holds
   * the reference the capability resolves with. */
  set_llm_connection_credential(
    connection_id: Uuid,
    plaintext_value: string,
  ): Promise<LlmConnectionProfile>;
  clear_llm_connection_credential(connection_id: Uuid): Promise<LlmConnectionProfile>;
  test_llm_connection(connection_id: Uuid): Promise<LlmConnectionTestResult>;

  select_gallery_record(record_id: Uuid | null): void;
  read_gallery_bytes(record_id: Uuid): Promise<Uint8Array>;
  pin_gallery_record(record_id: Uuid, pinned: boolean): Promise<void>;
  /** Detaching and deleting are distinct confirmed actions (plan rule) -- this never deletes the
   * record, only clears its message attachment; `delete_gallery_record` is the separate,
   * permanent action. */
  detach_gallery_record(record_id: Uuid): Promise<void>;
  delete_gallery_record(record_id: Uuid): Promise<void>;
  bulk_delete_gallery_records(record_ids: readonly Uuid[]): Promise<void>;
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

/** Generation states the task strip mirrors -- terminal states (completed/cancelled/attached/
 * orphaned) drop off the strip immediately, since Active jobs (workbench.module.css) and Gallery
 * already surface finished work; the strip is only for in-flight/just-failed generation. */
const TASK_STRIP_STATES: ReadonlySet<GenerationState> = new Set([
  "queued",
  "preparing",
  "submitting",
  "running",
  "failed",
]);

/** `TaskStripItemViewModel.status` only has three values (pending/success/error, see
 * shell.module.css's chip-dot styling) -- every non-failed in-flight state maps to "pending". */
function job_to_task_status(state: GenerationState): TaskStripItemViewModel["status"] {
  return state === "failed" ? "error" : "pending";
}

/** `label_code` must be a literal `TASK_LABEL_RESOLVERS` key (TaskStrip.vue) -- "running" gets its
 * own code so the strip can distinguish it from merely-queued work; every other tracked state
 * reads as "pending". */
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
    progress: job.image_count > 0 ? job.completed_image_ids.length / job.image_count : null,
  };
}

/** Derives `StudioState.tasks` from `workbench.jobs` -- the task strip is meant to mirror active
 * generation jobs (task-2-brief.md), so every mutation of `jobs` recomputes `tasks` from the same
 * list in the same patch instead of leaving the strip's own state to drift out of sync. */
function jobs_to_tasks(jobs: readonly GenerationJobSummary[]): readonly TaskStripItemViewModel[] {
  return jobs.filter((job) => TASK_STRIP_STATES.has(job.state)).map(job_to_task);
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
    llm_connections: {
      connections: [],
      selected_connection_id: null,
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
    library: {
      personas: [],
      knowledge: [],
      selected_knowledge_ids: [],
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

  /** Every call site that replaces `workbench.jobs` routes through here so `tasks` (the task
   * strip's own state) is recomputed from the same list in the same patch -- see `jobs_to_tasks`. */
  #patch_jobs(jobs: readonly GenerationJobSummary[]): void {
    this.#patch({
      workbench: { ...this.#state.workbench, jobs },
      tasks: jobs_to_tasks(jobs),
    });
  }

  #patch_llm_connections(patch: Partial<LlmConnectionsViewModel>): void {
    this.#patch({ llm_connections: { ...this.#state.llm_connections, ...patch } });
  }

  #patch_prompt(patch: Partial<PromptViewModel>): void {
    this.#patch({ prompt: { ...this.#state.prompt, ...patch } });
  }

  #patch_assets(patch: Partial<AssetsViewModel>): void {
    this.#patch({ assets: { ...this.#state.assets, ...patch } });
  }

  #patch_library(patch: Partial<LibraryViewModel>): void {
    this.#patch({ library: { ...this.#state.library, ...patch } });
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
      this.#patch_jobs(upsert_by_id(this.#state.workbench.jobs, event.job, (job) => job.job_id));
    } else {
      this.#patch_jobs(this.#state.workbench.jobs.filter((job) => job.job_id !== event.job_id));
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

  #apply_llm_connections_event(event: LlmConnectionsDomainEvent): void {
    if (this.#stopped) {
      return;
    }
    if (event.type === "connection_upserted") {
      this.#patch_llm_connections({
        connections: upsert_by_id(
          this.#state.llm_connections.connections,
          event.connection,
          (connection) => connection.id,
        ),
      });
    } else {
      this.#patch_llm_connections({
        connections: this.#state.llm_connections.connections.filter(
          (connection) => connection.id !== event.connection_id,
        ),
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

  #apply_personas_event(event: PersonasDomainEvent): void {
    if (this.#stopped) {
      return;
    }
    if (event.type === "persona_upserted") {
      this.#patch_library({
        personas: this.#merge_persona(event.persona),
      });
    } else {
      this.#patch_library({
        personas: this.#state.library.personas.filter((persona) => persona.id !== event.persona_id),
      });
    }
  }

  #apply_knowledge_event(event: KnowledgeDomainEvent): void {
    if (this.#stopped) {
      return;
    }
    if (event.type === "entry_upserted") {
      this.#patch_library({
        knowledge: upsert_by_id(this.#state.library.knowledge, event.entry, (item) => item.id),
      });
    } else {
      this.#patch_library({
        knowledge: this.#state.library.knowledge.filter((item) => item.id !== event.entry_id),
        selected_knowledge_ids: this.#state.library.selected_knowledge_ids.filter(
          (id) => id !== event.entry_id,
        ),
      });
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

  /**
   * Deliberately absent from `start()`: the vocabulary catalog lives on a remote host, and loading
   * it eagerly turned opening the studio into an unsolicited third-party request disclosing the
   * user's IP and extension version on every chat session. Called when the vocabulary panel is
   * opened or the user asks for updates -- both genuine user actions.
   */
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
      this.#capabilities.llm_connections.subscribe((event) => {
        this.#apply_llm_connections_event(event);
      }),
      this.#capabilities.prompt_presets.subscribe((event) => {
        this.#apply_prompt_presets_event(event);
      }),
      this.#capabilities.assets.subscribe((event) => {
        this.#apply_assets_event(event);
      }),
      this.#capabilities.personas.subscribe((event) => {
        this.#apply_personas_event(event);
      }),
      this.#capabilities.knowledge.subscribe((event) => {
        this.#apply_knowledge_event(event);
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
          this.#patch_jobs(jobs);
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
        "llm_connections",
        () => this.#capabilities.llm_connections.load(),
        (connections) => {
          this.#patch_llm_connections({
            connections,
            selected_connection_id:
              this.#state.llm_connections.selected_connection_id ?? connections[0]?.id ?? null,
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
        "personas",
        () => this.#capabilities.personas.load(),
        (personas) => {
          this.#patch_library({ personas });
        },
      ),
      this.#load_slice(
        "knowledge",
        () => this.#capabilities.knowledge.load(),
        (knowledge) => {
          this.#patch_library({ knowledge });
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
        this.#patch_jobs(upsert_by_id(this.#state.workbench.jobs, job, (j) => j.job_id));
        return job;
      },
    );
  }

  async cancel_generation(job_id: Uuid): Promise<void> {
    const job = await this.#capabilities.generation.cancel(job_id);
    if (this.#stopped) {
      return;
    }
    this.#patch_jobs(upsert_by_id(this.#state.workbench.jobs, job, (j) => j.job_id));
  }

  async retry_generation(job_id: Uuid): Promise<void> {
    const job = await this.#capabilities.generation.retry(job_id);
    if (this.#stopped) {
      return;
    }
    this.#patch_jobs(upsert_by_id(this.#state.workbench.jobs, job, (j) => j.job_id));
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
    if (this.#stopped) {
      return;
    }
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
    return this.#reload_settings(this.#capabilities.settings.acknowledge_http_origin(origin));
  }

  set_gateway_token(plaintext_value: string): Promise<void> {
    return this.#reload_settings(this.#capabilities.settings.set_gateway_token(plaintext_value));
  }

  clear_gateway_token(): Promise<void> {
    return this.#reload_settings(this.#capabilities.settings.clear_gateway_token());
  }

  async #reload_settings(pending: Promise<void>): Promise<void> {
    await pending;
    const snapshot = await this.#capabilities.settings.load();
    if (this.#stopped) {
      return;
    }
    this.#patch_settings({
      settings: snapshot.settings,
      vocabulary_update_channel: snapshot.vocabulary_update_channel,
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

  async save_persona(draft: PersonaProfileDraft): Promise<PersonaProfile> {
    const persona = await this.#capabilities.personas.save(draft);
    if (!this.#stopped) {
      this.#patch_library({ personas: this.#merge_persona(persona) });
    }
    return persona;
  }

  async remove_persona(persona_id: Uuid): Promise<void> {
    await this.#capabilities.personas.remove(persona_id);
    if (!this.#stopped) {
      this.#patch_library({
        personas: this.#state.library.personas.filter((persona) => persona.id !== persona_id),
      });
    }
  }

  /** Activation is exclusive per role, so promoting one persona demotes its same-role siblings in
   * the same patch rather than leaving two assistants briefly both active. */
  #merge_persona(persona: PersonaProfile): readonly PersonaProfile[] {
    const merged = upsert_by_id(this.#state.library.personas, persona, (item) => item.id);
    if (!persona.is_active) {
      return merged;
    }
    return merged.map((item) =>
      item.id === persona.id || item.role !== persona.role ? item : { ...item, is_active: false },
    );
  }

  async save_knowledge_entry(draft: KnowledgeRecordDraft): Promise<KnowledgeRecord> {
    const entry = await this.#capabilities.knowledge.save(draft);
    if (!this.#stopped) {
      this.#patch_library({
        knowledge: upsert_by_id(this.#state.library.knowledge, entry, (item) => item.id),
      });
    }
    return entry;
  }

  async set_knowledge_entry_enabled(entry_id: Uuid, enabled: boolean): Promise<KnowledgeRecord> {
    const entry = await this.#capabilities.knowledge.set_enabled(entry_id, enabled);
    if (!this.#stopped) {
      this.#patch_library({
        knowledge: upsert_by_id(this.#state.library.knowledge, entry, (item) => item.id),
      });
    }
    return entry;
  }

  async remove_knowledge_entry(entry_id: Uuid): Promise<void> {
    await this.#capabilities.knowledge.remove(entry_id);
    if (!this.#stopped) {
      this.#drop_knowledge_entries([entry_id]);
    }
  }

  set_knowledge_selection(entry_ids: readonly Uuid[]): void {
    this.#patch_library({ selected_knowledge_ids: [...entry_ids] });
  }

  async bulk_remove_knowledge_entries(entry_ids: readonly Uuid[]): Promise<void> {
    await this.#capabilities.knowledge.bulk_remove(entry_ids);
    if (!this.#stopped) {
      this.#drop_knowledge_entries(entry_ids);
    }
  }

  #drop_knowledge_entries(entry_ids: readonly Uuid[]): void {
    const removed = new Set(entry_ids);
    this.#patch_library({
      knowledge: this.#state.library.knowledge.filter((item) => !removed.has(item.id)),
      selected_knowledge_ids: this.#state.library.selected_knowledge_ids.filter(
        (id) => !removed.has(id),
      ),
    });
  }

  select_llm_connection(connection_id: Uuid | null): void {
    this.#patch_llm_connections({ selected_connection_id: connection_id });
  }

  async save_llm_connection(draft: LlmConnectionDraft): Promise<LlmConnectionProfile> {
    const connection = await this.#capabilities.llm_connections.save(draft);
    if (!this.#stopped) {
      this.#upsert_llm_connection(connection);
    }
    return connection;
  }

  async remove_llm_connection(connection_id: Uuid): Promise<void> {
    await this.#capabilities.llm_connections.remove(connection_id);
    if (this.#stopped) {
      return;
    }
    this.#patch_llm_connections({
      connections: this.#state.llm_connections.connections.filter(
        (connection) => connection.id !== connection_id,
      ),
      selected_connection_id:
        this.#state.llm_connections.selected_connection_id === connection_id
          ? null
          : this.#state.llm_connections.selected_connection_id,
    });
  }

  async set_llm_connection_credential(
    connection_id: Uuid,
    plaintext_value: string,
  ): Promise<LlmConnectionProfile> {
    const connection = await this.#capabilities.llm_connections.set_credential(
      connection_id,
      plaintext_value,
    );
    if (!this.#stopped) {
      this.#upsert_llm_connection(connection);
    }
    return connection;
  }

  async clear_llm_connection_credential(connection_id: Uuid): Promise<LlmConnectionProfile> {
    const connection = await this.#capabilities.llm_connections.clear_credential(connection_id);
    if (!this.#stopped) {
      this.#upsert_llm_connection(connection);
    }
    return connection;
  }

  test_llm_connection(connection_id: Uuid): Promise<LlmConnectionTestResult> {
    return this.#capabilities.llm_connections.test_connection(connection_id);
  }

  /** A default is exclusive, so promoting one connection demotes the rest in the same patch. */
  #upsert_llm_connection(connection: LlmConnectionProfile): void {
    const merged = upsert_by_id(
      this.#state.llm_connections.connections,
      connection,
      (item) => item.id,
    );
    this.#patch_llm_connections({
      connections: connection.is_default
        ? merged.map((item) => (item.id === connection.id ? item : { ...item, is_default: false }))
        : merged,
    });
  }

  select_gallery_record(record_id: Uuid | null): void {
    this.#patch_gallery({ selected_record_id: record_id });
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
    // GalleryRecordSummary has no dedicated "detached" flag (see ui_capabilities.ts) -- `quarantined`
    // is the closest existing signal for "no longer attached to a live message" and is what the
    // Gallery view's orphan filter reads (implementer judgment call, ledgered for stage review).
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
