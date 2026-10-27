import type { TavernCanvasSettings } from "@tavern-canvas/contracts";

import type {
  AssetCategory,
  AssetRecordSummary,
  AssetsCapability,
  DiagnosticsCapability,
  DiagnosticsSnapshot,
  GalleryCapability,
  GenerationCapability,
  NovelAiCapability,
  ProfilesCapability,
  PromptPresetsCapability,
  SettingsCapability,
  SettingsSnapshot,
  StudioCapabilities,
  Unsubscribe,
  VocabularyCapability,
} from "../contracts/ui_capabilities.js";

export const CAPABILITY_NOT_IMPLEMENTED_CODE = "capability_not_implemented";

function unavailable_command<T>(): Promise<T> {
  const error = new Error("This capability is not available in the current host") as Error & {
    readonly code: string;
  };
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
  workflow: [],
  prompt_tag: [],
};

const EMPTY_DIAGNOSTICS_SNAPSHOT: DiagnosticsSnapshot = {
  capability_matrix: {},
  helper_version: null,
  protocol_version: null,
  storage_usage_bytes: null,
  storage_quota_bytes: null,
};

const EMPTY_SETTINGS: TavernCanvasSettings = {
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
  },
  translation: { deepl_endpoint: "free", glossary: [] },
  gateway: { endpoint: null, token_secret_id: null, http_acknowledgments: {} },
  ui: {
    color_mode: "system",
    inspector_width: 320,
    inspector_collapsed: false,
    optional_entry_enabled: false,
  },
};

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
    set_credential: unavailable_command,
    clear_credential: unavailable_command,
    save_novelai_defaults: unavailable_command,
    save_prompt_tags: unavailable_command,
  };

  const novelai: NovelAiCapability = {
    get_account: unavailable_command,
    load: () => Promise.resolve([]),
    refresh_models: unavailable_command,
    estimate_cost: unavailable_command,
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
    reveal_source: unavailable_command,
    bulk_delete: unavailable_command,
  };

  const vocabulary: VocabularyCapability = {
    load: () => Promise.resolve([]),
    search: unavailable_command,
    lookup: () => Promise.resolve(null),
    prepare: unavailable_command,
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

  const settings: SettingsCapability = {
    load: () =>
      Promise.resolve({
        settings: EMPTY_SETTINGS,
        vocabulary_update_channel: "bundled",
        browser_secret_vault: { state: "unavailable", secret_count: 0 },
      } satisfies SettingsSnapshot),
    subscribe: no_subscription,
    update: unavailable_command,
    acknowledge_http_origin: unavailable_command,
    set_gateway_token: unavailable_command,
    clear_gateway_token: unavailable_command,
    set_analysis_key: unavailable_command,
    list_worldbooks: unavailable_command,
    clear_analysis_key: unavailable_command,
    set_deepl_key: unavailable_command,
    clear_deepl_key: unavailable_command,
    initialize_browser_secret_vault: unavailable_command,
    unlock_browser_secret_vault: unavailable_command,
    lock_browser_secret_vault: unavailable_command,
    reset_browser_secret_vault: unavailable_command,
    set_vocabulary_update_channel: unavailable_command,
    import_vocabulary_package: unavailable_command,
    cancel_vocabulary_import: () => {},
    export_archive: unavailable_command,
    import_archive: unavailable_command,
  };

  return {
    generation,
    profiles,
    novelai,
    prompt_presets,
    assets,
    gallery,
    vocabulary,
    diagnostics,
    settings,
  };
}
