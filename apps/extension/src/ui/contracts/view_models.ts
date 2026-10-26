import type {
  KnowledgeRecord,
  LlmConnectionProfile,
  PersonaProfile,
  TavernCanvasSettings,
  Uuid,
  VocabularyCatalogEntry,
} from "@tavern-canvas/contracts";
import type { BrowserSecretVaultStatus } from "../../storage/browser_secret_vault.js";

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

/** `code` is a locale lookup key, never a rendered sentence; `params` holds only stable data. */
export interface UiFailure {
  readonly code: string;
  readonly params?: Readonly<Record<string, string | number>>;
}

export type CommandState<TResult> =
  | { readonly status: "idle" }
  | { readonly status: "pending" }
  | { readonly status: "success"; readonly result: TResult }
  | { readonly status: "error"; readonly failure: UiFailure };

export const IDLE_COMMAND_STATE: CommandState<never> = { status: "idle" };

export interface WorkbenchViewModel {
  readonly profiles: readonly ProviderProfileSummary[];
  readonly active_profile_id: Uuid | null;
  readonly jobs: readonly GenerationJobSummary[];
  readonly submit_command: CommandState<GenerationJobSummary>;
}

export interface LlmConnectionsViewModel {
  readonly connections: readonly LlmConnectionProfile[];
  readonly selected_connection_id: Uuid | null;
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

export interface LibraryViewModel {
  readonly personas: readonly PersonaProfile[];
  readonly knowledge: readonly KnowledgeRecord[];
  readonly selected_knowledge_ids: readonly Uuid[];
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
  readonly browser_secret_vault: BrowserSecretVaultStatus;
  readonly update_command: CommandState<TavernCanvasSettings>;
  readonly migration_retry_command: CommandState<MigrationSnapshot>;
}

export interface InspectorSelectionPrefill {
  readonly positive_prompt: string | null;
  readonly negative_prompt: string | null;
}

export type InspectorSelection =
  | { readonly kind: "generation_job"; readonly job_id: Uuid }
  | {
      readonly kind: "gallery_record";
      readonly record_id: Uuid;
      readonly intent?: "view" | "modify_prompt" | "regenerate" | "edit" | "inpaint";
      readonly prefill?: InspectorSelectionPrefill;
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

export interface StudioState {
  route: "workbench" | "prompt" | "assets" | "gallery" | "diagnostics" | "settings";
  color_mode: "light" | "dark";
  loading: ReadonlySet<string>;
  failures: ReadonlyMap<string, UiFailure>;
  workbench: WorkbenchViewModel;
  llm_connections: LlmConnectionsViewModel;
  prompt: PromptViewModel;
  assets: AssetsViewModel;
  library: LibraryViewModel;
  gallery: GalleryViewModel;
  diagnostics: DiagnosticsViewModel;
  settings: SettingsViewModel;
  inspector: InspectorViewModel;
  tasks: readonly TaskStripItemViewModel[];
}

export type StudioRoute = StudioState["route"];
export type ColorMode = StudioState["color_mode"];
