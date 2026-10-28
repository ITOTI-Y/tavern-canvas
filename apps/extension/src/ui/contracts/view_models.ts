import type { TavernCanvasSettings, Uuid, VocabularyCatalogEntry } from "@tavern-canvas/contracts";
import type { BrowserSecretVaultStatus } from "../../storage/browser_secret_vault.js";

import type {
  AssetCategory,
  AssetRecordSummary,
  DiagnosticsSnapshot,
  GalleryRecordSummary,
  GenerationJobSummary,
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

export interface GenerationViewModel {
  readonly profiles: readonly ProviderProfileSummary[];
  readonly active_profile_id: Uuid | null;
  readonly jobs: readonly GenerationJobSummary[];
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
  readonly support_bundle_command: CommandState<SupportBundle>;
}

export interface SettingsViewModel {
  readonly settings: TavernCanvasSettings | null;
  readonly vocabulary_update_channel: VocabularyUpdateChannel | null;
  readonly browser_secret_vault: BrowserSecretVaultStatus;
  readonly update_command: CommandState<TavernCanvasSettings>;
}

export interface InspectorSelection {
  readonly kind: "gallery_record";
  readonly record_id: Uuid;
}

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
  /** The provider error code of a failed job. */
  readonly error: string | null;
}

export type SettingsSection =
  "illustration" | "providers" | "translation" | "prompts" | "general" | "diagnostics";

export interface StudioState {
  route: "library" | "gallery" | "settings";
  settings_section: SettingsSection;
  color_mode: "light" | "dark";
  loading: ReadonlySet<string>;
  failures: ReadonlyMap<string, UiFailure>;
  generation: GenerationViewModel;
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
