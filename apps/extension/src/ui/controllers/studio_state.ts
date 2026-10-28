import type { GenerationState } from "@tavern-canvas/contracts";

import type {
  AssetsDomainEvent,
  DiagnosticsDomainEvent,
  GalleryDomainEvent,
  GenerationDomainEvent,
  GenerationJobSummary,
  ProfilesDomainEvent,
  PromptPresetsDomainEvent,
  SettingsDomainEvent,
} from "../contracts/ui_capabilities.js";
import {
  IDLE_COMMAND_STATE,
  type ColorMode,
  type CommandState,
  type StudioRoute,
  type StudioState,
  type TaskStripItemViewModel,
  type UiFailure,
} from "../contracts/view_models.js";

export const DEFAULT_FAILURE_CODE = "capability_load_failed";
export const DEFAULT_COMMAND_FAILURE_CODE = "command_failed";
const STABLE_CODE_PATTERN = /^[a-z][a-z0-9_]*$/u;

export function to_ui_failure(error: unknown, fallback_code: string): UiFailure {
  if (error instanceof Error) {
    const candidate = (error as { readonly code?: unknown }).code;
    if (typeof candidate === "string" && STABLE_CODE_PATTERN.test(candidate)) {
      return { code: candidate };
    }
  }
  return { code: fallback_code };
}

export function upsert_by_id<TItem>(
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

export function jobs_to_tasks(
  jobs: readonly GenerationJobSummary[],
): readonly TaskStripItemViewModel[] {
  return jobs.filter((job) => TASK_STRIP_STATES.has(job.state)).map(job_to_task);
}

export function run_command<TResult>(
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

export function create_initial_state(
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

type StatePatch = Partial<StudioState>;

export function reduce_generation_event(
  state: StudioState,
  event: GenerationDomainEvent,
): StatePatch {
  const jobs =
    event.type === "job_updated"
      ? upsert_by_id(state.generation.jobs, event.job, (job) => job.job_id)
      : state.generation.jobs.filter((job) => job.job_id !== event.job_id);
  return { generation: { ...state.generation, jobs }, tasks: jobs_to_tasks(jobs) };
}

export function reduce_profiles_event(state: StudioState, event: ProfilesDomainEvent): StatePatch {
  const profiles =
    event.type === "profile_upserted"
      ? upsert_by_id(state.generation.profiles, event.profile, (p) => p.id)
      : state.generation.profiles.filter((p) => p.id !== event.profile_id);
  return { generation: { ...state.generation, profiles } };
}

export function reduce_prompt_presets_event(
  state: StudioState,
  event: PromptPresetsDomainEvent,
): StatePatch {
  const presets =
    event.type === "preset_upserted"
      ? upsert_by_id(state.prompt.presets, event.preset, (p) => p.id)
      : state.prompt.presets.filter((p) => p.id !== event.preset_id);
  return { prompt: { ...state.prompt, presets } };
}

export function reduce_assets_event(state: StudioState, event: AssetsDomainEvent): StatePatch {
  const records =
    event.type === "asset_upserted"
      ? {
          ...state.assets.records,
          [event.asset.category]: upsert_by_id(
            state.assets.records[event.asset.category],
            event.asset,
            (a) => a.id,
          ),
        }
      : {
          ...state.assets.records,
          [event.category]: state.assets.records[event.category].filter(
            (a) => a.id !== event.asset_id,
          ),
        };
  return { assets: { ...state.assets, records } };
}

export function reduce_gallery_event(state: StudioState, event: GalleryDomainEvent): StatePatch {
  const records =
    event.type === "record_upserted"
      ? upsert_by_id(state.gallery.records, event.record, (r) => r.id)
      : state.gallery.records.filter((r) => r.id !== event.record_id);
  return { gallery: { ...state.gallery, records } };
}

export function reduce_diagnostics_event(
  state: StudioState,
  event: DiagnosticsDomainEvent,
): StatePatch {
  return {
    diagnostics: { ...state.diagnostics, timeline: [...state.diagnostics.timeline, event.entry] },
  };
}

export function reduce_settings_event(state: StudioState, event: SettingsDomainEvent): StatePatch {
  return { settings: { ...state.settings, settings: event.settings } };
}
