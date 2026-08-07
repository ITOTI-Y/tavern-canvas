import type { TavernCanvasSettings } from "@tavern-canvas/contracts";

import type {
  AssetCategory,
  AssetRecordSummary,
  AssetsCapability,
  DiagnosticsCapability,
  DiagnosticsSnapshot,
  GalleryCapability,
  GenerationCapability,
  MigrationCapability,
  MigrationSnapshot,
  ProfilesCapability,
  PromptPresetsCapability,
  SettingsCapability,
  SettingsSnapshot,
  StudioCapabilities,
  Unsubscribe,
  VocabularyCapability,
} from "../contracts/ui_capabilities.js";

/**
 * Stable failure code for every mutating command below (studio_controller.ts's `to_ui_failure`
 * passes an `Error#code` matching /^[a-z][a-z0-9_]*$/ straight through).
 */
export const CAPABILITY_NOT_IMPLEMENTED_CODE = "capability_not_implemented";

function unavailable_command<T>(): Promise<T> {
  const error = new Error(
    "No adapter wraps the real domain module for this capability yet (see task-1-report.md's " +
      '"future adapter layer" note); bootstrap.ts uses this placeholder until one is wired in.',
  ) as Error & { readonly code: string };
  Object.defineProperty(error, "code", { value: CAPABILITY_NOT_IMPLEMENTED_CODE });
  return Promise.reject(error);
}

function no_subscription(): Unsubscribe {
  return () => {};
}

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

const EMPTY_SETTINGS: TavernCanvasSettings = {
  schema_version: 1,
  active_namespace: "default",
  locale: "auto",
  active_provider_profile_id: null,
  global_concurrency: 1,
  auto_generation_enabled: false,
  fallback_generation_enabled: false,
  gateway: { endpoint: null, token_secret_id: null, http_acknowledgments: {} },
  ui: {
    color_mode: "system",
    inspector_width: 320,
    inspector_collapsed: false,
    optional_entry_enabled: false,
  },
};

/**
 * Every `load()` resolves to an empty snapshot (so the shell renders a genuinely empty "normal"
 * studio instead of a permanent failure banner), every `subscribe()` is a no-op unsubscribe, and
 * every mutating command rejects with the stable `capability_not_implemented` code. Stage 06 does
 * not wire real generation/storage/vocabulary adapters into the Studio controller (that is
 * unscheduled future work per task-1-report.md); bootstrap.ts's composition root uses this as the
 * production default until a real `StudioCapabilities` implementation replaces it there -- nothing
 * in AppRoot or below needs to change when that happens.
 */
export function create_unavailable_capabilities(): StudioCapabilities {
  const generation: GenerationCapability = {
    load: () => Promise.resolve([]),
    subscribe: no_subscription,
    submit: unavailable_command,
    cancel: unavailable_command,
    retry: unavailable_command,
  };

  const profiles: ProfilesCapability = {
    load: () => Promise.resolve([]),
    subscribe: no_subscription,
    save: unavailable_command,
    remove: unavailable_command,
    test_connection: unavailable_command,
  };

  const prompt_presets: PromptPresetsCapability = {
    load: () => Promise.resolve([]),
    subscribe: no_subscription,
    load_draft: unavailable_command,
    save_draft: unavailable_command,
    remove: unavailable_command,
    bulk_remove: unavailable_command,
    test_regex: unavailable_command,
  };

  const assets: AssetsCapability = {
    load: () => Promise.resolve(EMPTY_ASSET_RECORDS),
    subscribe: no_subscription,
    save: unavailable_command,
    remove: unavailable_command,
    reorder: unavailable_command,
  };

  const gallery: GalleryCapability = {
    load: () => Promise.resolve([]),
    subscribe: no_subscription,
    read_bytes: unavailable_command,
    pin: unavailable_command,
    detach_from_message: unavailable_command,
    delete_record: unavailable_command,
    bulk_delete: unavailable_command,
  };

  const vocabulary: VocabularyCapability = {
    load: () => Promise.resolve([]),
    search: unavailable_command,
    next_page: unavailable_command,
    install: unavailable_command,
    cancel_install: () => {},
  };

  const diagnostics: DiagnosticsCapability = {
    load: () => Promise.resolve(EMPTY_DIAGNOSTICS_SNAPSHOT),
    subscribe: no_subscription,
    test_connection: unavailable_command,
    load_timeline: () => Promise.resolve([]),
    export_support_bundle: unavailable_command,
  };

  const migration: MigrationCapability = {
    load: () => Promise.resolve(NOT_REQUIRED_MIGRATION_SNAPSHOT),
    subscribe: no_subscription,
    retry: unavailable_command,
    confirm_legacy_cleanup: unavailable_command,
  };

  const settings: SettingsCapability = {
    load: () =>
      Promise.resolve({
        settings: EMPTY_SETTINGS,
        vocabulary_update_channel: "bundled",
      } satisfies SettingsSnapshot),
    subscribe: no_subscription,
    update: unavailable_command,
    acknowledge_http_origin: unavailable_command,
    set_vocabulary_update_channel: unavailable_command,
    export_archive: unavailable_command,
    import_archive: unavailable_command,
  };

  return {
    generation,
    profiles,
    prompt_presets,
    assets,
    gallery,
    vocabulary,
    diagnostics,
    migration,
    settings,
  };
}
