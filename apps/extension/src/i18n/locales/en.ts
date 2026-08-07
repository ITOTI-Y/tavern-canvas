const app = {
  name: "TavernCanvas",
  tagline: "Bilingual image generation workbench for SillyTavern",
  version_label: "Version {version}",
  startup: {
    loading_title: "Starting TavernCanvas",
    loading_description: "Connecting to JS Slash Runner and loading your workspace.",
  },
  unsupported_host: {
    title: "JS Slash Runner update required",
    description:
      "TavernCanvas needs JS Slash Runner {required_version} or newer. The installed version is {current_version}.",
    update_action: "Open update instructions",
  },
  fatal_error: {
    title: "TavernCanvas could not start",
    description:
      "Runtime initialization failed. Reload SillyTavern, then check Diagnostics for details.",
    reload_action: "Reload SillyTavern",
  },
  partial_init: {
    banner_title: "Running with limited functionality",
    banner_description:
      "Some data failed to load. Retry from Diagnostics or continue with what's available.",
  },
};

const nav = {
  workbench: "Workbench",
  prompt: "Prompt",
  assets: "Assets",
  gallery: "Gallery",
  diagnostics: "Diagnostics",
  settings: "Settings",
  more: "More",
  inspector_expand: "Expand inspector",
  inspector_collapse: "Collapse inspector",
  task_strip_expand: "Show running tasks",
  task_strip_collapse: "Hide running tasks",
  task_strip_count: "{n} task running | {n} tasks running",
};

const common = {
  actions: {
    save: "Save",
    cancel: "Cancel",
    close: "Close",
    confirm: "Confirm",
    delete: "Delete",
    retry: "Retry",
    copy: "Copy",
    copied: "Copied",
    download: "Download",
    search: "Search",
    filter: "Filter",
    clear: "Clear",
    select_all: "Select all",
    deselect_all: "Deselect all",
    continue: "Continue",
    back: "Back",
    next: "Next",
    import: "Import",
    export: "Export",
    edit: "Edit",
    duplicate: "Duplicate",
    regenerate: "Regenerate",
    increase: "Increase",
    decrease: "Decrease",
  },
  labels: {
    name: "Name",
    description: "Description",
    status: "Status",
    type: "Type",
    size: "Size",
    created_at: "Created",
    updated_at: "Updated",
  },
  inspector: {
    title: "Inspector",
    empty_title: "Nothing selected",
    empty_description: "Select a job, image, or asset to see its details here.",
  },
  workspace_unavailable: "This workspace isn't available yet.",
};

const status = {
  loading: "Loading",
  empty: "Empty",
  partial: "Partial",
  error: "Error",
  disabled: "Disabled",
  success: "Success",
  pending: "Pending",
  running: "Running",
  cancelled: "Cancelled",
  completed: "Completed",
  failed: "Failed",
  retrying: "Retrying",
  online: "Online",
  offline: "Offline",
  connected: "Connected",
  blocked: "Blocked",
  unknown: "Unknown",
};

const workbench = {
  prompt_composer: {
    positive_label: "Positive prompt",
    positive_placeholder: "Describe what the image should contain",
    negative_label: "Negative prompt",
    negative_placeholder: "Describe what to avoid",
    image_count_label: "Image count",
  },
  reference_strip: {
    title: "Reference images",
    empty_title: "No reference images yet",
    empty_description:
      "Add up to 4 reference images from Assets or your device to guide generation.",
    add_action: "Add reference",
    remove_action: "Remove reference",
  },
  provider_summary: {
    title: "Provider",
    no_profile_title: "No provider profile selected",
    no_profile_description: "Choose a provider profile in Settings to enable generation.",
    open_settings_action: "Open provider settings",
  },
  active_jobs: {
    title: "Active jobs",
    active_count: "{n} job running | {n} jobs running",
    empty_title: "No jobs running",
    empty_description: "Submit a generation request to see progress here.",
    cancel_action: "Cancel job",
    cancel_confirm_title: "Cancel this job?",
    cancel_confirm_description:
      "The provider request for {provider} stops immediately and cannot be resumed.",
  },
  generation_inspector: {
    title: "Generation parameters",
    seed_label: "Seed",
    steps_label: "Steps",
    sampler_label: "Sampler",
    model_label: "Model",
  },
  submit: {
    action: "Generate",
    validation: {
      profile_required: "Select a provider profile before generating.",
      prompt_required: "Enter a positive prompt before generating.",
      image_count_range: "Choose between 1 and 4 images.",
    },
  },
  retry_action: "Retry generation",
};

const provider = {
  connection_test: {
    action: "Test connection",
    testing: "Testing connection",
    success: "Connection succeeded",
    failed: "Connection failed",
  },
  credentials: {
    not_stored_locally:
      "The token is kept in host secret storage and never appears in TavernCanvas UI or exports.",
  },
  concurrency_label: "Concurrent requests",
  fallback_enabled_label: "Fall back to the next provider profile on failure",
  errors: {
    auth_failed: "{provider} rejected the credentials. Check the token in provider settings.",
    rate_limited: "{provider} is rate limiting requests. Retry after a short wait.",
    content_blocked: "{provider} blocked this request under its content policy.",
    invalid_request: "{provider} rejected the request parameters: {message}",
    provider_unavailable: "{provider} is unreachable right now.",
    timed_out: "{provider} did not respond in time.",
    cancelled: "The request to {provider} was cancelled.",
    malformed_response: "{provider} returned a response TavernCanvas could not parse.",
  },
};

const prompt = {
  preset_browser: {
    title: "Presets",
    search_placeholder: "Search presets",
    empty_title: "No presets yet",
    empty_description: "Create a preset from the prompt builder to reuse it across generations.",
    bulk_delete_action: "Delete selected",
    bulk_delete_confirm_title: "Delete {n} preset? | Delete {n} presets?",
    bulk_delete_confirm_description:
      "This removes the selected presets permanently and cannot be undone.",
  },
  fixed_prompts: {
    positive_label: "Fixed positive prompt",
    negative_label: "Fixed negative prompt",
  },
  quality_controls: {
    ucp_label: "Universal Composition Prompt",
    aqt_label: "Auto Quality Tags",
  },
  replacement_rules: {
    title: "Replacement rules",
    add_action: "Add rule",
    trigger_label: "Trigger",
    replacement_label: "Replacement",
    empty_title: "No replacement rules yet",
    empty_description: "Add a rule to substitute matched text before it reaches the provider.",
  },
  regex_rules: {
    title: "Regex rules",
    pattern_label: "Pattern",
    test_input_label: "Test text",
    test_action: "Test pattern",
    invalid_pattern: "This is not a valid regular expression: {message}",
  },
  builder: {
    title: "Prompt builder",
    context_preview_title: "Context preview",
    world_info_label: "World Info",
    user_persona_label: "User persona",
    character_context_label: "Character context",
  },
  test_panel: {
    title: "Private prompt test",
    run_action: "Run test",
    tools_disabled_note: "Tools are disabled for this test run.",
    running: "Running the prompt against the private LLM channel",
    result_title: "Result",
  },
};

const assets = {
  tabs: {
    vocabulary: "Vocabulary",
    characters: "Characters",
    outfits: "Outfits",
    lora: "LoRA",
    vibe: "Vibe",
    reference: "Reference",
    workflow: "Workflow",
  },
  vocabulary: {
    search_placeholder: "Search tags",
    empty_title: "No vocabulary loaded yet",
    empty_description:
      "Install a vocabulary package from the update channel to search and insert tags.",
    tag_count: "{n} tag | {n} tags",
    update_action: "Check for updates",
    import_action: "Import package",
  },
  characters: {
    empty_title: "No characters saved yet",
    empty_description:
      "Create a character profile to reuse names, appearance, and context across prompts.",
    add_action: "Add character",
  },
  outfits: {
    empty_title: "No outfits saved yet",
    empty_description: "Add an outfit to a character to reuse it across generations.",
    add_action: "Add outfit",
  },
  lora: {
    empty_title: "No LoRA metadata yet",
    empty_description: "Add a LoRA entry to track its trigger words and recommended weight.",
    add_action: "Add LoRA",
    weight_label: "Weight",
    trigger_words_label: "Trigger words",
  },
  vibe: {
    empty_title: "No vibe or reference groups yet",
    empty_description:
      "Add a NovelAI vibe transfer group or a Google reference group to reuse across requests.",
    add_action: "Add group",
  },
  reference: {
    empty_title: "No reference images saved yet",
    empty_description: "Save a reference image here to reuse it across generations.",
    add_action: "Add reference",
  },
  workflow: {
    empty_title: "No ComfyUI workflows imported yet",
    empty_description:
      "Import a workflow JSON file to map its placeholders to TavernCanvas inputs.",
    import_action: "Import workflow",
    placeholder_scan_action: "Scan placeholders",
    edit_action: "Edit workflow",
  },
  random_selection_action: "Pick random",
  reorder_hint: "Drag to reorder",
  delete_confirm_title: "Delete {name}?",
  delete_confirm_description:
    "This removes it from your asset library permanently and cannot be undone.",
};

const gallery = {
  empty_title: "No generated images yet",
  empty_description: "Generate an image from the Workbench to see it here.",
  filters: {
    title: "Filters",
    provider_label: "Provider",
    date_range_label: "Date range",
    pinned_only_label: "Pinned only",
    orphaned_only_label: "Orphaned only",
  },
  orphan_label: "Not attached to any message",
  cache_occupancy: {
    label: "Local cache usage",
    description: "{used} of {limit} used",
  },
  thumbnail_failed: "Thumbnail unavailable",
  metadata_inspector: {
    title: "Parameters",
    seed_label: "Seed",
    provider_label: "Provider",
    model_label: "Model",
    prompt_label: "Prompt",
    copy_action: "Copy parameters",
    copied_toast: "Parameters copied",
    modify_prompt_action: "Modify prompt",
    regenerate_action: "Regenerate",
    edit_action: "Edit image",
    inpaint_action: "Inpaint",
    source_message_action: "Go to source message",
  },
  selection: {
    selected_count: "{n} image selected | {n} images selected",
    download_action: "Download selected",
    delete_action: "Delete selected",
    delete_confirm_title: "Delete {n} image? | Delete {n} images?",
    delete_confirm_description:
      "This removes the selected images and their files permanently and cannot be undone.",
    detach_action: "Detach from message",
    detach_confirm_title:
      "Detach {n} image from this message? | Detach {n} images from this message?",
    detach_confirm_description:
      "The image stays in Gallery but is no longer linked to this message.",
  },
  pin_action: "Pin",
  unpin_action: "Unpin",
  download_action: "Download",
};

const diagnostics = {
  capability_matrix: {
    title: "Capability matrix",
    available: "Available",
    unavailable: "Unavailable",
    capabilities: {
      native_tool_manager: "Native tool manager",
      main_generation_events: "Main generation events",
      private_prompt_generation: "Private prompt generation",
      message_swipe_metadata: "Message swipe metadata",
      host_image_upload: "Host image upload",
      tavern_helper: "JS Slash Runner",
      tauri_chat_surface: "Tauri chat surface",
      tauri_world_info_activation: "Tauri World Info activation",
      gateway_protocol: "Gateway protocol",
    },
  },
  versions: {
    title: "Versions",
    helper_label: "JS Slash Runner",
    host_label: "SillyTavern",
    protocol_label: "Gateway protocol",
  },
  connection_tests: {
    title: "Connection tests",
    run_action: "Run tests",
    running: "Running connection tests",
    latency_label: "{ms} ms",
  },
  task_timeline: {
    title: "Task timeline",
    empty_title: "No tasks recorded yet",
    empty_description: "Generation, migration, and sync activity appear here as they run.",
    error_code_label: "Error code",
    time_label: "Time",
    event_label: "Event",
    module_label: "Module",
    provider_label: "Provider",
    count_label: "{n} event | {n} events",
  },
  migration_status: {
    title: "Migration",
    counts_label: "Record counts",
    warnings_label: "Warnings",
  },
  storage_usage: {
    title: "Storage",
    estimate_label: "Estimated usage",
    quota_label: "Quota",
    quota_unavailable: "Storage estimate is unavailable on this host.",
    quota_high_pressure:
      "Storage usage is close to the browser quota. Free space in Gallery or Assets.",
    cache_references_label: "Cached references",
    cache_references_unavailable: "Cache reference count is unavailable on this host.",
  },
  support_bundle: {
    title: "Support bundle",
    description:
      "Includes the version, capability matrix, redacted settings, error codes, and task timeline. It never includes prompts, message content, secrets, or image names.",
    export_action: "Export support bundle",
    exported_toast: "Support bundle exported",
  },
};

const settings = {
  sections: {
    provider_profiles: "Provider profiles",
    gateway: "Gateway",
    automation: "Automation",
    appearance: "Appearance",
    data: "Data",
  },
  provider_profiles: {
    empty_title: "No provider profiles yet",
    empty_description: "Add a provider profile to connect an image generation backend.",
    add_action: "Add provider profile",
    connection_test_action: "Test connection",
    dialog_add_title: "Add provider profile",
    dialog_edit_title: "Edit provider profile",
    provider_label: "Provider",
    provider_types: {
      sd_webui: "SD WebUI",
      novelai: "NovelAI",
      comfyui: "ComfyUI",
      openai_image: "OpenAI Image",
      google_image: "Google Image",
    },
    default_badge: "Default",
    set_default_action: "Set as default",
    remove_confirm_title: "Remove {name}?",
    remove_confirm_description:
      "This disconnects the provider profile from TavernCanvas. Jobs already submitted are not affected.",
  },
  gateway: {
    endpoint_label: "Gateway endpoint",
    protocol_label: "Protocol",
    detect_action: "Detect protocol",
    token_secret_label: "Token secret reference",
    auto_generate_action: "Generate token",
    token_not_set: "No token configured",
    endpoint_hint: "The Gateway endpoint your provider profiles connect through.",
  },
  http_risk: {
    warning_title: "This connection is not encrypted",
    warning_description_local:
      "{origin} uses plain HTTP on a loopback or private network. Traffic stays on your local network but is not encrypted.",
    error_description_public:
      "{origin} uses plain HTTP on a public or unrecognized host. The token, prompts, and images travel in plaintext and can be intercepted.",
    disclosure: "The token, prompts, and images travel in plaintext over this connection.",
    continue_action: "Continue anyway",
    acknowledged_label: "Acknowledged for this origin",
  },
  automation: {
    auto_generation_label: "Generate automatically after each message",
    fallback_generation_label: "Fall back to the next provider profile on failure",
    global_concurrency_label: "Global concurrent requests",
    provider_concurrency_label: "Per-provider concurrent requests",
  },
  appearance: {
    theme_label: "Theme",
    theme_system: "Match system",
    theme_light: "Light",
    theme_dark: "Dark",
    language_label: "Language",
    language_auto: "Match SillyTavern",
    language_zh_cn: "Simplified Chinese",
    language_en: "English",
    inspector_width_label: "Inspector width",
    optional_entry_label: "Show optional entry point in the extensions menu",
  },
  data: {
    vocabulary_channel_label: "Vocabulary update channel",
    vocabulary_channel_bundled: "Bundled baseline",
    vocabulary_channel_https: "Remote update channel",
    archive_export_action: "Export archive",
    archive_import_action: "Import archive",
    archive_import_description:
      "Importing merges records from the archive into this namespace. It never deletes existing data.",
    migration_retry_action: "Retry migration",
    migration_report_action: "View migration report",
    manual_cleanup: {
      title: "Remove legacy v2 data",
      description:
        "Only available after a verified migration or archive. This never runs automatically.",
      record_summary: "{count} record, {bytes} | {count} records, {bytes}",
      confirm_action: "Delete legacy data",
      bytes_unavailable: "Size estimate is unavailable.",
      unlock_hint: "Complete a migration or export an archive first to enable this.",
      confirm_phrase: "DELETE LEGACY DATA",
    },
  },
};

const migration = {
  journal: {
    inventory: "Scanning legacy data",
    copying: "Copying records",
    verifying: "Verifying copied data",
    ready_to_switch: "Ready to switch to the new namespace",
    completed: "Migration completed",
    failed: "Migration failed",
    not_required: "No migration needed",
  },
  failure_reasons: {
    invalid_source: "The legacy source data is invalid or corrupted.",
    unknown_setting_path: "A legacy setting path is not recognized.",
    converter_error: "A record failed to convert: {message}",
    missing_blob: "An image file referenced by legacy data is missing.",
    hash_mismatch: "A copied file does not match its expected checksum.",
    count_mismatch: "The copied record count does not match the source count.",
    secret_transfer_blocked: "The provider token could not be transferred securely.",
    switch_failed: "Switching to the new namespace failed after copying.",
  },
  retry_action: "Retry migration",
  report_action: "View report",
  record_count: "{n} record | {n} records",
  never_auto_deletes: "TavernCanvas never deletes your legacy data automatically.",
};

const errors = {
  network: "TavernCanvas could not reach the network.",
  capability_blocked: "This action needs {capability}, which is unavailable on the current host.",
  validation_required: "This field is required.",
  storage_quota_exceeded: "The browser storage quota is full. Free space in Gallery or Assets.",
  locale_load_failed:
    "The Simplified Chinese language pack failed to load. Showing English instead.",
  gateway_incompatible: "The Gateway at {origin} reports an incompatible protocol version.",
  gateway_offline: "The Gateway at {origin} is not reachable.",
  image_upload_failed: "Uploading {file_name} to the host failed.",
  generation_failed: "Generation failed: {message}",
  connection_test_failed: "Connection test failed: {code}",
  unexpected: "Something went wrong. Check Diagnostics for details.",
};

const confirmations = {
  destructive: {
    default_confirm_action: "Delete",
    default_cancel_action: "Cancel",
    irreversible_note: "This action cannot be undone.",
  },
  typed_confirmation: {
    label: "Type {phrase} to confirm",
    placeholder: "Type the confirmation phrase",
    mismatch: "The typed text does not match {phrase}.",
  },
  discard_unsaved: {
    title: "Discard unsaved changes?",
    description: "Your edits are not saved yet. Leaving now discards them.",
    stay_action: "Keep editing",
    discard_action: "Discard changes",
  },
};

export const en_messages = {
  app,
  nav,
  common,
  status,
  workbench,
  provider,
  prompt,
  assets,
  gallery,
  diagnostics,
  settings,
  migration,
  errors,
  confirmations,
};

export type LocaleMessageSchema = typeof en_messages;
