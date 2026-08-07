import type { TavernCanvasSettings, Uuid, VocabularyCatalogEntry } from "@tavern-canvas/contracts";

import type {
  AssetCategory,
  AssetRecordSummary,
  ConnectionTestResult,
  DiagnosticsSnapshot,
  GalleryRecordSummary,
  GenerationJobSummary,
  MigrationSnapshot,
  ProviderProfileSummary,
  PromptPresetDraft,
  PromptPresetSummary,
  SupportBundle,
  TaskTimelineEntry,
  VocabularyUpdateChannel,
} from "./ui_capabilities.js";

/**
 * Stable, non-translated failure descriptor. `code` is a lookup key into the locale layer
 * (Stage 06 Task 3), never a rendered sentence; `params` carries only stable data (IDs, counts,
 * enum values), never pre-formatted or translated text.
 */
export interface UiFailure {
  readonly code: string;
  readonly params?: Readonly<Record<string, string | number>>;
}

/** Discriminated command lifecycle: idle before first submission, then pending/success/error. */
export type CommandState<TResult> =
  | { readonly status: "idle" }
  | { readonly status: "pending" }
  | { readonly status: "success"; readonly result: TResult }
  | { readonly status: "error"; readonly failure: UiFailure };

export const IDLE_COMMAND_STATE: CommandState<never> = { status: "idle" };

// ---------------------------------------------------------------------------
// Per-route view models
// ---------------------------------------------------------------------------

export interface WorkbenchViewModel {
  readonly profiles: readonly ProviderProfileSummary[];
  readonly active_profile_id: Uuid | null;
  readonly jobs: readonly GenerationJobSummary[];
  readonly submit_command: CommandState<GenerationJobSummary>;
}

export interface PromptViewModel {
  readonly presets: readonly PromptPresetSummary[];
  readonly selected_preset_id: Uuid | null;
  readonly draft: PromptPresetDraft | null;
  readonly save_command: CommandState<PromptPresetSummary>;
}

export interface AssetsViewModel {
  readonly active_category: AssetCategory;
  readonly records: Readonly<Record<AssetCategory, readonly AssetRecordSummary[]>>;
  readonly vocabulary_catalog: readonly VocabularyCatalogEntry[];
  readonly vocabulary_install_command: CommandState<void>;
}

export interface GalleryViewModel {
  readonly records: readonly GalleryRecordSummary[];
  readonly selected_record_id: Uuid | null;
  readonly bulk_delete_command: CommandState<void>;
}

export interface DiagnosticsViewModel {
  readonly snapshot: DiagnosticsSnapshot | null;
  readonly timeline: readonly TaskTimelineEntry[];
  readonly migration: MigrationSnapshot | null;
  readonly connection_test_command: CommandState<ConnectionTestResult>;
  readonly support_bundle_command: CommandState<SupportBundle>;
}

export interface SettingsViewModel {
  readonly settings: TavernCanvasSettings | null;
  readonly vocabulary_update_channel: VocabularyUpdateChannel | null;
  readonly update_command: CommandState<TavernCanvasSettings>;
  readonly migration_retry_command: CommandState<MigrationSnapshot>;
}

/**
 * `intent` on the gallery_record variant (Stage 06 Task 6, additive) records which action handed
 * the record off to the inspector/Workbench -- "modify_prompt"/"regenerate"/"edit"/"inpaint" all
 * reuse this same selection channel (there is no other cross-view hand-off primitive yet), so the
 * discriminant is what lets a future consumer tell them apart instead of collapsing to one
 * indistinguishable "a gallery record got selected" signal. Optional and defaults to plain
 * selection ("view") when omitted, so every existing caller stays valid.
 */
export type InspectorSelection =
  | { readonly kind: "generation_job"; readonly job_id: Uuid }
  | {
      readonly kind: "gallery_record";
      readonly record_id: Uuid;
      readonly intent?: "view" | "modify_prompt" | "regenerate" | "edit" | "inpaint";
    }
  | { readonly kind: "asset"; readonly category: AssetCategory; readonly asset_id: Uuid };

export interface InspectorViewModel {
  readonly collapsed: boolean;
  readonly width: number;
  readonly selected_record: InspectorSelection | null;
}

export interface TaskStripItemViewModel {
  readonly id: string;
  readonly label_code: string;
  readonly status: "pending" | "success" | "error";
  readonly progress: number | null;
}

// ---------------------------------------------------------------------------
// Top-level Studio state (verbatim per task-1-brief.md)
// ---------------------------------------------------------------------------

export interface StudioState {
  route: "workbench" | "prompt" | "assets" | "gallery" | "diagnostics" | "settings";
  color_mode: "light" | "dark";
  loading: ReadonlySet<string>;
  failures: ReadonlyMap<string, UiFailure>;
  workbench: WorkbenchViewModel;
  prompt: PromptViewModel;
  assets: AssetsViewModel;
  gallery: GalleryViewModel;
  diagnostics: DiagnosticsViewModel;
  settings: SettingsViewModel;
  inspector: InspectorViewModel;
  tasks: readonly TaskStripItemViewModel[];
}

export type StudioRoute = StudioState["route"];
export type ColorMode = StudioState["color_mode"];
