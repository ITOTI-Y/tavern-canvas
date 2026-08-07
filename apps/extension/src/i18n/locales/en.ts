const app = {
  name: "TavernCanvas",
  version_label: "Version {version}",
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
    copy: "Copy",
    copied: "Copied",
    download: "Download",
    search: "Search",
    clear: "Clear",
    select_all: "Select all",
    deselect_all: "Deselect all",
    back: "Back",
    next: "Next",
    edit: "Edit",
    increase: "Increase",
    decrease: "Decrease",
  },
  labels: {
    name: "Name",
    description: "Description",
    status: "Status",
  },
  inspector: {
    title: "Inspector",
    empty_title: "Nothing selected",
    empty_description: "Select a job, image, or asset to see its details here.",
  },
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
    move_up_action: "Move reference earlier",
    move_down_action: "Move reference later",
    picker_title: "Add a reference image",
    picker_empty_title: "No saved reference images",
    picker_empty_description: "Save a reference image in Assets first, then add it here.",
    picker_error: "The reference image list failed to load.",
    max_reached_hint: "Up to 4 reference images.",
  },
  provider_summary: {
    title: "Provider",
    no_profile_title: "No provider profile selected",
    no_profile_description: "Choose a provider profile in Settings to enable generation.",
    open_settings_action: "Open provider settings",
    select_label: "Provider profile",
    load_error: "Provider profiles failed to load.",
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
    progress_label: "{completed}/{total} images",
    load_error: "Active jobs failed to load.",
    state_labels: {
      queued: "Queued",
      preparing: "Preparing",
      submitting: "Submitting",
      running: "Running",
      completed: "Completed",
      failed: "Failed",
      cancelled: "Cancelled",
      attached: "Attached",
      orphaned: "Orphaned",
    },
  },
  generation_inspector: {
    title: "Generation parameters",
    seed_label: "Seed",
    steps_label: "Steps",
    sampler_label: "Sampler",
    model_label: "Model",
    provider_label: "Provider",
    submitted_at_label: "Submitted",
    empty_title: "Nothing selected",
    empty_description: "Select a job in Active jobs to see its parameters here.",
    completed_images_title: "Completed images",
    image_alt: "Generated image {n}",
  },
  submit: {
    action: "Generate",
    validation: {
      profile_required: "Select a provider profile before generating.",
      prompt_required: "Enter a positive prompt before generating.",
      image_count_range: "Choose between 1 and 4 images.",
      provider_unsupported:
        "This provider profile is not supported in Workbench yet. Choose a different profile.",
    },
  },
  retry_action: "Retry generation",
};

const provider = {
  credentials: {
    not_stored_locally:
      "The token is kept in host secret storage and never appears in TavernCanvas UI or exports.",
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
    new_preset_action: "New preset",
    random_group_action: "Pick random from group",
    ungrouped_label: "Ungrouped",
    load_error: "Presets failed to load.",
  },
  fixed_prompts: {
    positive_label: "Fixed positive prompt",
    positive_placeholder: "Text always added before the generated positive prompt",
    negative_label: "Fixed negative prompt",
    negative_placeholder: "Text always added before the generated negative prompt",
  },
  quality_controls: {
    title: "Quality controls",
    ucp_label: "Universal Composition Prompt",
    ucp_description: "Apply the shared composition prompt to every generation from this preset.",
    aqt_label: "Auto Quality Tags",
    aqt_description: "Append the standard quality tag set automatically.",
  },
  replacement_rules: {
    title: "Replacement rules",
    add_action: "Add rule",
    trigger_label: "Trigger",
    trigger_placeholder: "Comma-separated triggers",
    triggers_hint: "Separate multiple triggers with commas.",
    replacement_label: "Replacement",
    replacement_placeholder: "Replacement text",
    empty_title: "No replacement rules yet",
    empty_description: "Add a rule to substitute matched text before it reaches the provider.",
  },
  regex_rules: {
    title: "Regex rules",
    add_action: "Add regex rule",
    pattern_label: "Pattern",
    pattern_placeholder: "Regular expression pattern",
    flags_label: "Flags",
    test_input_label: "Test text",
    test_action: "Test pattern",
    test_result_label: "Test result",
    invalid_pattern: "This is not a valid regular expression: {message}",
    empty_title: "No regex rules yet",
    empty_description: "Add a rule to transform text with a regular expression before it reaches the provider.",
  },
  builder: {
    title: "Prompt builder",
    context_preview_title: "Context preview",
    world_info_label: "World Info",
    world_info_empty_description: "No World Info entries are active for the current context.",
    user_persona_label: "User persona",
    user_persona_empty_description: "No user persona is connected to this context yet.",
    character_context_label: "Character context",
    character_context_empty_description: "No character context is connected to this context yet.",
  },
  test_panel: {
    title: "Private prompt test",
    run_action: "Run test",
    tools_disabled_note: "Tools are disabled for this test run.",
    running: "Running the prompt against the private LLM channel",
    result_title: "Result",
    input_label: "Test prompt",
    input_placeholder: "Enter the prompt to send to the private LLM channel",
    unavailable_description:
      "The private LLM channel is not connected yet, so this test cannot run.",
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
    bundled_label: "Bundled",
    progress_verifying_catalog_manifest: "Verifying catalog manifest",
    progress_downloading: "Downloading package",
    progress_verifying_package: "Verifying package",
    progress_installing: "Installing package",
    nsfw_disclosure_label: "Show packages that may include adult content",
    nsfw_disclosure_hint:
      "These packages are never installed automatically. Review them before installing.",
  },
  characters: {
    empty_title: "No characters saved yet",
    empty_description:
      "Create a character profile to reuse names, appearance, and context across prompts.",
    add_action: "Add character",
    role_label: "Role",
    appearance_label: "Appearance",
    context_notes_label: "Character context",
    world_info_reference_label: "World Info reference",
    world_info_reference_hint: "A note naming the World Info book or entry this links to.",
  },
  outfits: {
    empty_title: "No outfits saved yet",
    empty_description: "Add an outfit to a character to reuse it across generations.",
    add_action: "Add outfit",
    description_label: "Description",
    character_label: "Character",
    character_placeholder: "Select a character",
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
    provider_label: "Source",
    provider_novelai: "NovelAI vibe transfer",
    provider_google: "Google reference",
    notes_label: "Notes",
    strength_label: "Strength",
    information_extracted_label: "Information extracted",
  },
  reference: {
    empty_title: "No reference images saved yet",
    empty_description: "Save a reference image here to reuse it across generations.",
    add_action: "Add reference",
    source_url_label: "Source URL",
    notes_label: "Notes",
  },
  workflow: {
    empty_title: "No ComfyUI workflows imported yet",
    empty_description:
      "Import a workflow JSON file to map its placeholders to TavernCanvas inputs.",
    import_action: "Import workflow",
    placeholder_scan_action: "Scan placeholders",
    edit_action: "Edit workflow",
    json_label: "Workflow JSON",
    placeholder_unmapped: "Not mapped",
    target_positive_prompt: "Positive prompt",
    target_negative_prompt: "Negative prompt",
    target_seed: "Seed",
    target_width: "Width",
    target_height: "Height",
    target_steps: "Steps",
  },
  random_selection_action: "Pick random",
  reorder_hint: "Drag to reorder",
  move_up_action: "Move up",
  move_down_action: "Move down",
  drag_handle_label: "Drag to reorder",
  form_dialog_description: "Fields marked * are required.",
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
    parameters_unavailable: "No embedded generation parameters were found in this image.",
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
  record_count: "{n} record | {n} records",
};

const errors = {
  capability_blocked: "This action needs {capability}, which is unavailable on the current host.",
  validation_required: "This field is required.",
  gateway_incompatible: "The Gateway at {origin} reports an incompatible protocol version.",
  gateway_offline: "The Gateway at {origin} is not reachable.",
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
