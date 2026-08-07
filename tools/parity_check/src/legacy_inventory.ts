/**
 * The frozen ground truth of every legacy (v2.8.1) user-observable workflow that TavernCanvas v3
 * must either port or approve for removal. This list is the parity checker's single source of
 * truth: `index.ts` requires the committed matrix (docs/parity/feature_matrix.md) to cover this
 * exact set of IDs -- one matrix row per entry, no more, no fewer. A later stage task that adds a
 * genuinely new legacy-derived row appends an entry here in the same commit; a task that merely
 * flips a row's status/owner/acceptance-test does not touch this file.
 *
 * Entries were enumerated by reading the legacy v2.8.1 archive's bundled `index.js` (85,726
 * lines, 196 concatenated original source modules) and its `html/settings/*.html` panels in
 * full, module by module, cross-checked against apps/extension's already-shipped Stage 01-06
 * source tree. See docs/parity/feature_matrix.md's header for the full methodology note.
 */

export const PARITY_GROUPS = [
  "startup and update",
  "main trigger and streaming pre-generation",
  "SD WebUI",
  "NovelAI",
  "ComfyUI",
  "OpenAI compatible and Google/Banana/Grok",
  "prompt presets and transformations",
  "LLM prompt generation and testing",
  "character, outfit, persona, and knowledge context",
  "World Info and send-data selection",
  "LORA, vibe, character reference, and workflows",
  "manual generation, edit, inpaint, video, and image upload",
  "gallery, cache, metadata, download, regenerate, and batch operations",
  "vocabulary import, grouping, search, and update",
  "regular-expression and click/drawing triggers",
  "themes and optional floating entry",
  "AI assistant, TTS, ASR, summary, and screen input",
  "diagnostics, migration, import/export, and cleanup",
] as const;

export type ParityGroup = (typeof PARITY_GROUPS)[number];

export interface LegacyInventoryEntry {
  readonly id: string;
  readonly group: ParityGroup;
}

export const LEGACY_INVENTORY: readonly LegacyInventoryEntry[] = [
  { id: "startup.settings_menu_entry", group: "startup and update" },
  { id: "startup.mode_nav_dom_autobind", group: "startup and update" },
  { id: "startup.settings_tab_persistence", group: "startup and update" },
  { id: "startup.isolated_umd_lib_loader", group: "startup and update" },
  { id: "startup.in_app_update_checker", group: "startup and update" },
  { id: "maintrig.image_tag_parse", group: "main trigger and streaming pre-generation" },
  { id: "maintrig.inline_image_gen_trigger", group: "main trigger and streaming pre-generation" },
  { id: "maintrig.parse_failure_diagnosis", group: "main trigger and streaming pre-generation" },
  { id: "maintrig.generation_status_tracker", group: "main trigger and streaming pre-generation" },
  { id: "maintrig.generate_trigger_pipeline", group: "main trigger and streaming pre-generation" },
  { id: "maintrig.placeholder_scan_insert", group: "main trigger and streaming pre-generation" },
  {
    id: "maintrig.internal_placeholder_key_migration",
    group: "main trigger and streaming pre-generation",
  },
  { id: "maintrig.chat_iframe_scan_and_style", group: "main trigger and streaming pre-generation" },
  {
    id: "maintrig.chat_iframe_mutation_observer",
    group: "main trigger and streaming pre-generation",
  },
  {
    id: "maintrig.auto_click_after_generation",
    group: "main trigger and streaming pre-generation",
  },
  { id: "maintrig.novelai_router_dispatch", group: "main trigger and streaming pre-generation" },
  {
    id: "maintrig.background_task_queue_panel",
    group: "main trigger and streaming pre-generation",
  },
  { id: "maintrig.pregen_stream_queue", group: "main trigger and streaming pre-generation" },
  {
    id: "maintrig.script_enabled_variable_sync",
    group: "main trigger and streaming pre-generation",
  },
  { id: "sd.txt2img_generate", group: "SD WebUI" },
  { id: "sd.model_checkpoint_switch", group: "SD WebUI" },
  { id: "sd.connection_test_and_model_fetch", group: "SD WebUI" },
  { id: "sd.direct_url_auth_control", group: "SD WebUI" },
  { id: "sd.dispatch_retouch_video_to_other_providers", group: "SD WebUI" },
  { id: "sd.active_provider_toggle", group: "SD WebUI" },
  { id: "novelai.core_txt2img_generation", group: "NovelAI" },
  { id: "novelai.quality_negative_presets", group: "NovelAI" },
  { id: "novelai.reference_image_resize", group: "NovelAI" },
  { id: "novelai.token_budget_calculator", group: "NovelAI" },
  { id: "novelai.dual_client_direct_mode", group: "NovelAI" },
  { id: "novelai.task_cancel", group: "NovelAI" },
  { id: "novelai.cloud_shared_key_queue", group: "NovelAI" },
  { id: "novelai.model_version_conditional_ui", group: "NovelAI" },
  { id: "novelai.named_generation_param_profiles", group: "NovelAI" },
  { id: "comfyui.workflow_presets_builtin", group: "ComfyUI" },
  { id: "comfyui.param_injection_and_txt2img", group: "ComfyUI" },
  { id: "comfyui.skip_node_remap", group: "ComfyUI" },
  { id: "comfyui.exec_proxy_or_direct_poll", group: "ComfyUI" },
  { id: "comfyui.direct_url_control", group: "ComfyUI" },
  { id: "comfyui.dispatch_retouch_video", group: "ComfyUI" },
  { id: "comfyui.node_graph_visual_editor", group: "ComfyUI" },
  { id: "comfyui.main_and_inpaint_workflow_presets", group: "ComfyUI" },
  { id: "comfyui.simple_edit_json_simplify", group: "ComfyUI" },
  { id: "comfyui.node_level_ai_editing", group: "ComfyUI" },
  { id: "comfyui.reference_ipadapter_controls", group: "ComfyUI" },
  { id: "comfyui.keep_alive_ping", group: "ComfyUI" },
  { id: "comfyui.named_generation_param_profiles", group: "ComfyUI" },
  { id: "comfyui.edit_workflow_auto_seed", group: "ComfyUI" },
  { id: "banana.chat_multimodal_generation", group: "OpenAI compatible and Google/Banana/Grok" },
  { id: "banana.grok_native_image_gen", group: "OpenAI compatible and Google/Banana/Grok" },
  { id: "banana.imagen_generation", group: "OpenAI compatible and Google/Banana/Grok" },
  { id: "banana.video_generation", group: "OpenAI compatible and Google/Banana/Grok" },
  { id: "banana.response_parsing", group: "OpenAI compatible and Google/Banana/Grok" },
  { id: "banana.direct_url_auth_control", group: "OpenAI compatible and Google/Banana/Grok" },
  { id: "banana.cancel_task", group: "OpenAI compatible and Google/Banana/Grok" },
  { id: "banana.active_provider_toggle", group: "OpenAI compatible and Google/Banana/Grok" },
  { id: "banana.model_fetch", group: "OpenAI compatible and Google/Banana/Grok" },
  {
    id: "banana.multimodal_conversation_presets",
    group: "OpenAI compatible and Google/Banana/Grok",
  },
  {
    id: "banana.conversation_preset_export_import",
    group: "OpenAI compatible and Google/Banana/Grok",
  },
  { id: "banana.preset_image_upload_slots", group: "OpenAI compatible and Google/Banana/Grok" },
  {
    id: "banana.imagen_vs_multimodal_ui_switch",
    group: "OpenAI compatible and Google/Banana/Grok",
  },
  { id: "banana.prompt_replace_presets", group: "OpenAI compatible and Google/Banana/Grok" },
  { id: "banana.character_trigger_presets", group: "OpenAI compatible and Google/Banana/Grok" },
  { id: "banana.comfyui_redraw_dispatch", group: "OpenAI compatible and Google/Banana/Grok" },
  { id: "prompt.replace_rule_presets_crud", group: "prompt presets and transformations" },
  { id: "prompt.replace_rule_export_import", group: "prompt presets and transformations" },
  { id: "prompt.replace_rule_8_position_apply", group: "prompt presets and transformations" },
  { id: "prompt.image_tag_format_normalize", group: "prompt presets and transformations" },
  { id: "prompt.merge_adjacent_system_user", group: "prompt presets and transformations" },
  { id: "prompt.template_placeholder_substitution", group: "prompt presets and transformations" },
  { id: "prompt.variable_macro_read", group: "prompt presets and transformations" },
  { id: "prompt.roll_random_placeholder", group: "prompt presets and transformations" },
  { id: "prompt.tag_dedup_stable", group: "prompt presets and transformations" },
  { id: "prompt.positive_negative_assembly", group: "prompt presets and transformations" },
  { id: "prompt.random_preset_per_generation", group: "prompt presets and transformations" },
  { id: "prompt.fixed_prompt_preset_crud", group: "prompt presets and transformations" },
  { id: "prompt.fixed_prompt_preset_export_import", group: "prompt presets and transformations" },
  { id: "prompt.preset_group_management", group: "prompt presets and transformations" },
  { id: "prompt.preset_search_filter", group: "prompt presets and transformations" },
  { id: "prompt.bulk_select_toolbar", group: "prompt presets and transformations" },
  { id: "prompt.ai_tag_translate_annotate", group: "prompt presets and transformations" },
  { id: "prompt.tag_placeholder_expand", group: "prompt presets and transformations" },
  { id: "prompt.insert_original_text_auto_regex", group: "prompt presets and transformations" },
  { id: "llm.request_type_routing", group: "LLM prompt generation and testing" },
  { id: "llm.connection_profile_crud", group: "LLM prompt generation and testing" },
  { id: "llm.connection_profile_export_import", group: "LLM prompt generation and testing" },
  { id: "llm.api_key_visibility_toggle", group: "LLM prompt generation and testing" },
  { id: "llm.fetch_models", group: "LLM prompt generation and testing" },
  { id: "llm.model_and_param_controls", group: "LLM prompt generation and testing" },
  { id: "llm.bypass_proxy_toggle", group: "LLM prompt generation and testing" },
  { id: "llm.auto_retry_and_abort", group: "LLM prompt generation and testing" },
  { id: "llm.prompt_preview_and_test_send", group: "LLM prompt generation and testing" },
  { id: "llm.context_preset_crud", group: "LLM prompt generation and testing" },
  { id: "llm.context_preset_export_import", group: "LLM prompt generation and testing" },
  { id: "llm.context_entry_editor", group: "LLM prompt generation and testing" },
  { id: "llm.context_entry_reorder", group: "LLM prompt generation and testing" },
  { id: "llm.request_type_profile_crud", group: "LLM prompt generation and testing" },
  { id: "llm.history_context_window", group: "LLM prompt generation and testing" },
  { id: "llm.token_counter", group: "LLM prompt generation and testing" },
  { id: "llm.image_send_toggle", group: "LLM prompt generation and testing" },
  { id: "character.preset_crud", group: "character, outfit, persona, and knowledge context" },
  {
    id: "character.preset_export_import",
    group: "character, outfit, persona, and knowledge context",
  },
  { id: "character.visual_selector", group: "character, outfit, persona, and knowledge context" },
  { id: "character.preset_card_ops", group: "character, outfit, persona, and knowledge context" },
  {
    id: "character.outfit_list_management",
    group: "character, outfit, persona, and knowledge context",
  },
  {
    id: "character.clear_detail_fields",
    group: "character, outfit, persona, and knowledge context",
  },
  {
    id: "character.photo_reference_generate",
    group: "character, outfit, persona, and knowledge context",
  },
  { id: "character.photo_upload", group: "character, outfit, persona, and knowledge context" },
  {
    id: "character.photo_gallery_viewer",
    group: "character, outfit, persona, and knowledge context",
  },
  {
    id: "character.generation_data_editor",
    group: "character, outfit, persona, and knowledge context",
  },
  {
    id: "character.select_search_filter",
    group: "character, outfit, persona, and knowledge context",
  },
  { id: "character.tab_subnav", group: "character, outfit, persona, and knowledge context" },
  { id: "character.ai_prompt_modify", group: "character, outfit, persona, and knowledge context" },
  {
    id: "character.ai_photo_prompt_generate",
    group: "character, outfit, persona, and knowledge context",
  },
  {
    id: "character.message_autoimport_tags",
    group: "character, outfit, persona, and knowledge context",
  },
  {
    id: "character.ai_design_from_chat_context",
    group: "character, outfit, persona, and knowledge context",
  },
  {
    id: "character.external_import_api",
    group: "character, outfit, persona, and knowledge context",
  },
  { id: "character.send_photo_toggle", group: "character, outfit, persona, and knowledge context" },
  {
    id: "character.ai_gen_settings_cache",
    group: "character, outfit, persona, and knowledge context",
  },
  {
    id: "character.preset_autoswitch_on_chat_change",
    group: "character, outfit, persona, and knowledge context",
  },
  { id: "character.tag_autocomplete", group: "character, outfit, persona, and knowledge context" },
  {
    id: "character.enable_list_preset_crud",
    group: "character, outfit, persona, and knowledge context",
  },
  {
    id: "character.enable_list_membership_check",
    group: "character, outfit, persona, and knowledge context",
  },
  { id: "outfit.common_preset_crud", group: "character, outfit, persona, and knowledge context" },
  { id: "outfit.preset_crud", group: "character, outfit, persona, and knowledge context" },
  { id: "outfit.preset_export_import", group: "character, outfit, persona, and knowledge context" },
  { id: "outfit.visual_selector", group: "character, outfit, persona, and knowledge context" },
  { id: "outfit.clear_detail_fields", group: "character, outfit, persona, and knowledge context" },
  { id: "outfit.photo_generate", group: "character, outfit, persona, and knowledge context" },
  {
    id: "outfit.ai_photo_prompt_generate",
    group: "character, outfit, persona, and knowledge context",
  },
  {
    id: "outfit.ai_photo_prompt_modify",
    group: "character, outfit, persona, and knowledge context",
  },
  { id: "outfit.photo_upload", group: "character, outfit, persona, and knowledge context" },
  { id: "outfit.photo_gallery_viewer", group: "character, outfit, persona, and knowledge context" },
  { id: "outfit.send_photo_toggle", group: "character, outfit, persona, and knowledge context" },
  { id: "persona.preset_crud", group: "character, outfit, persona, and knowledge context" },
  {
    id: "persona.preset_export_import",
    group: "character, outfit, persona, and knowledge context",
  },
  { id: "persona.avatar_upload", group: "character, outfit, persona, and knowledge context" },
  { id: "persona.enable_toggle", group: "character, outfit, persona, and knowledge context" },
  {
    id: "persona.ai_generate_from_message",
    group: "character, outfit, persona, and knowledge context",
  },
  {
    id: "persona.ai_generate_from_panel",
    group: "character, outfit, persona, and knowledge context",
  },
  {
    id: "persona.reference_image_last_message_fallback",
    group: "character, outfit, persona, and knowledge context",
  },
  {
    id: "persona.prompt_injection_formatting",
    group: "character, outfit, persona, and knowledge context",
  },
  { id: "user_persona.preset_crud", group: "character, outfit, persona, and knowledge context" },
  {
    id: "user_persona.preset_export_import",
    group: "character, outfit, persona, and knowledge context",
  },
  { id: "user_persona.avatar_upload", group: "character, outfit, persona, and knowledge context" },
  {
    id: "user_persona.prompt_injection_formatting",
    group: "character, outfit, persona, and knowledge context",
  },
  { id: "worldinfo.entry_selection_toggle", group: "World Info and send-data selection" },
  { id: "worldinfo.batch_select_operations", group: "World Info and send-data selection" },
  { id: "worldinfo.entry_preview_modal", group: "World Info and send-data selection" },
  { id: "worldinfo.test_trigger_dialog", group: "World Info and send-data selection" },
  { id: "worldinfo.dual_pane_search_filter", group: "World Info and send-data selection" },
  { id: "worldinfo.keyword_trigger_engine", group: "World Info and send-data selection" },
  { id: "worldinfo.entry_placeholder_substitution", group: "World Info and send-data selection" },
  { id: "worldinfo.reference_photo_collection", group: "World Info and send-data selection" },
  {
    id: "worldinfo.char_outfit_enable_list_text_generation",
    group: "World Info and send-data selection",
  },
  { id: "worldinfo.variable_write_macros", group: "World Info and send-data selection" },
  { id: "worldinfo.import_convert_legacy_shapes", group: "World Info and send-data selection" },
  {
    id: "worldinfo.character_enable_list_trigger_test",
    group: "World Info and send-data selection",
  },
  { id: "worldinfo.injection_template_management", group: "World Info and send-data selection" },
  { id: "worldinfo.injection_template_editor", group: "World Info and send-data selection" },
  { id: "worldinfo.injection_template_live_preview", group: "World Info and send-data selection" },
  { id: "worldinfo.knowledge_base_content_storage", group: "World Info and send-data selection" },
  { id: "lora.tag_rewrite_and_settings", group: "LORA, vibe, character reference, and workflows" },
  { id: "vibe.group_transfer_apply", group: "LORA, vibe, character reference, and workflows" },
  {
    id: "vibe.single_legacy_transfer_apply",
    group: "LORA, vibe, character reference, and workflows",
  },
  { id: "vibe.group_editor_dialog", group: "LORA, vibe, character reference, and workflows" },
  { id: "vibe.group_export_import", group: "LORA, vibe, character reference, and workflows" },
  {
    id: "vibe.individual_visual_selector",
    group: "LORA, vibe, character reference, and workflows",
  },
  { id: "vibe.group_visual_selector", group: "LORA, vibe, character reference, and workflows" },
  { id: "vibe.preset_crud", group: "LORA, vibe, character reference, and workflows" },
  { id: "vibe.preset_export_import", group: "LORA, vibe, character reference, and workflows" },
  { id: "vibe.upload_existing_file", group: "LORA, vibe, character reference, and workflows" },
  { id: "vibe.generate_encode_via_api", group: "LORA, vibe, character reference, and workflows" },
  { id: "vibe.download_file", group: "LORA, vibe, character reference, and workflows" },
  {
    id: "vibe.reference_image_upload_legacy",
    group: "LORA, vibe, character reference, and workflows",
  },
  { id: "vibe.random_group_toggle", group: "LORA, vibe, character reference, and workflows" },
  { id: "charref.group_transfer_apply", group: "LORA, vibe, character reference, and workflows" },
  { id: "charref.group_editor_dialog", group: "LORA, vibe, character reference, and workflows" },
  { id: "charref.group_slots_manage", group: "LORA, vibe, character reference, and workflows" },
  { id: "charref.image_library_picker", group: "LORA, vibe, character reference, and workflows" },
  { id: "charref.upload_dialog", group: "LORA, vibe, character reference, and workflows" },
  {
    id: "charref.preset_crud_export_import",
    group: "LORA, vibe, character reference, and workflows",
  },
  {
    id: "charref.reference_image_upload_legacy",
    group: "LORA, vibe, character reference, and workflows",
  },
  {
    id: "novelai.reference_mode_mutual_exclusion",
    group: "LORA, vibe, character reference, and workflows",
  },
  {
    id: "inpaint.comfyui_mask_editor",
    group: "manual generation, edit, inpaint, video, and image upload",
  },
  {
    id: "inpaint.comfyui_submit",
    group: "manual generation, edit, inpaint, video, and image upload",
  },
  {
    id: "inpaint.novelai_mask_editor",
    group: "manual generation, edit, inpaint, video, and image upload",
  },
  {
    id: "inpaint.novelai_submit",
    group: "manual generation, edit, inpaint, video, and image upload",
  },
  {
    id: "manual.image_size_popup",
    group: "manual generation, edit, inpaint, video, and image upload",
  },
  {
    id: "manual.tag_edit_dialog",
    group: "manual generation, edit, inpaint, video, and image upload",
  },
  {
    id: "manual.tag_actions_menu",
    group: "manual generation, edit, inpaint, video, and image upload",
  },
  {
    id: "manual.image_process_submenu",
    group: "manual generation, edit, inpaint, video, and image upload",
  },
  {
    id: "manual.send_button_longpress",
    group: "manual generation, edit, inpaint, video, and image upload",
  },
  {
    id: "manual.longpress_edit_open",
    group: "manual generation, edit, inpaint, video, and image upload",
  },
  {
    id: "manual.video_playback_fallback",
    group: "manual generation, edit, inpaint, video, and image upload",
  },
  {
    id: "manual.banana_retouch_trigger_dialog",
    group: "manual generation, edit, inpaint, video, and image upload",
  },
  {
    id: "manual.grok_video_trigger_dialog",
    group: "manual generation, edit, inpaint, video, and image upload",
  },
  {
    id: "manual.banana_edit_mode_trigger",
    group: "manual generation, edit, inpaint, video, and image upload",
  },
  {
    id: "manual.banana_video_mode_trigger",
    group: "manual generation, edit, inpaint, video, and image upload",
  },
  {
    id: "manual.upload_mobile_compression",
    group: "manual generation, edit, inpaint, video, and image upload",
  },
  {
    id: "manual.video_mp4_faststart_fix",
    group: "manual generation, edit, inpaint, video, and image upload",
  },
  {
    id: "manual.comfyui_reference_upload",
    group: "manual generation, edit, inpaint, video, and image upload",
  },
  {
    id: "gallery.steganography_hidden_sync",
    group: "gallery, cache, metadata, download, regenerate, and batch operations",
  },
  {
    id: "gallery.dual_storage_backend",
    group: "gallery, cache, metadata, download, regenerate, and batch operations",
  },
  {
    id: "gallery.multi_image_cycling",
    group: "gallery, cache, metadata, download, regenerate, and batch operations",
  },
  {
    id: "gallery.delete_single_and_bulk",
    group: "gallery, cache, metadata, download, regenerate, and batch operations",
  },
  {
    id: "gallery.video_thumbnail_generation",
    group: "gallery, cache, metadata, download, regenerate, and batch operations",
  },
  {
    id: "gallery.storage_size_report",
    group: "gallery, cache, metadata, download, regenerate, and batch operations",
  },
  {
    id: "gallery.orphan_sync_cleanup",
    group: "gallery, cache, metadata, download, regenerate, and batch operations",
  },
  {
    id: "gallery.generation_params_panel",
    group: "gallery, cache, metadata, download, regenerate, and batch operations",
  },
  {
    id: "gallery.tag_lock_unlock",
    group: "gallery, cache, metadata, download, regenerate, and batch operations",
  },
  {
    id: "gallery.tag_delete_cascade",
    group: "gallery, cache, metadata, download, regenerate, and batch operations",
  },
  {
    id: "gallery.image_position_persistence",
    group: "gallery, cache, metadata, download, regenerate, and batch operations",
  },
  {
    id: "gallery.click_to_regenerate",
    group: "gallery, cache, metadata, download, regenerate, and batch operations",
  },
  {
    id: "gallery.click_to_preview",
    group: "gallery, cache, metadata, download, regenerate, and batch operations",
  },
  {
    id: "gallery.collapse_toggle_display",
    group: "gallery, cache, metadata, download, regenerate, and batch operations",
  },
  {
    id: "gallery.lightbox_navigation",
    group: "gallery, cache, metadata, download, regenerate, and batch operations",
  },
  {
    id: "gallery.lightbox_download",
    group: "gallery, cache, metadata, download, regenerate, and batch operations",
  },
  {
    id: "gallery.lightbox_params_panel",
    group: "gallery, cache, metadata, download, regenerate, and batch operations",
  },
  {
    id: "gallery.lightbox_delete",
    group: "gallery, cache, metadata, download, regenerate, and batch operations",
  },
  {
    id: "gallery.generation_stats_tracking",
    group: "gallery, cache, metadata, download, regenerate, and batch operations",
  },
  {
    id: "gallery.multiselect_batch_ops",
    group: "gallery, cache, metadata, download, regenerate, and batch operations",
  },
  {
    id: "gallery.pagination_lazy_load",
    group: "gallery, cache, metadata, download, regenerate, and batch operations",
  },
  {
    id: "gallery.storage_quota_display",
    group: "gallery, cache, metadata, download, regenerate, and batch operations",
  },
  {
    id: "gallery.clear_expired_cache",
    group: "gallery, cache, metadata, download, regenerate, and batch operations",
  },
  {
    id: "gallery.recalc_storage_size",
    group: "gallery, cache, metadata, download, regenerate, and batch operations",
  },
  {
    id: "gallery.convert_to_jpeg_storage_toggle",
    group: "gallery, cache, metadata, download, regenerate, and batch operations",
  },
  {
    id: "gallery.auto_generate_missing_thumbnails",
    group: "gallery, cache, metadata, download, regenerate, and batch operations",
  },
  {
    id: "vocabulary.pack_install_uninstall",
    group: "vocabulary import, grouping, search, and update",
  },
  {
    id: "vocabulary.batch_install_uninstall_all",
    group: "vocabulary import, grouping, search, and update",
  },
  { id: "vocabulary.tag_tree_browser", group: "vocabulary import, grouping, search, and update" },
  { id: "vocabulary.tag_search", group: "vocabulary import, grouping, search, and update" },
  {
    id: "vocabulary.selected_tags_box_ops",
    group: "vocabulary import, grouping, search, and update",
  },
  { id: "vocabulary.manual_tag_crud", group: "vocabulary import, grouping, search, and update" },
  {
    id: "vocabulary.manual_tag_export_import",
    group: "vocabulary import, grouping, search, and update",
  },
  {
    id: "vocabulary.autocomplete_in_editors",
    group: "vocabulary import, grouping, search, and update",
  },
  {
    id: "vocabulary.nsfw_group_tree_user_install",
    group: "vocabulary import, grouping, search, and update",
  },
  {
    id: "vocabulary.nsfw_group_tree_default_load",
    group: "vocabulary import, grouping, search, and update",
  },
  {
    id: "maintrig.fuzzy_tag_insertion_matching",
    group: "main trigger and streaming pre-generation",
  },
  {
    id: "maintrig.original_text_insertion_toggles",
    group: "main trigger and streaming pre-generation",
  },
  {
    id: "regex.worker_sandboxed_execution",
    group: "regular-expression and click/drawing triggers",
  },
  {
    id: "regex.dangerous_pattern_detection",
    group: "regular-expression and click/drawing triggers",
  },
  { id: "regex.entry_crud", group: "regular-expression and click/drawing triggers" },
  { id: "regex.entry_export_import", group: "regular-expression and click/drawing triggers" },
  {
    id: "regex.import_from_st_native_engine",
    group: "regular-expression and click/drawing triggers",
  },
  { id: "regex.entry_drag_reorder", group: "regular-expression and click/drawing triggers" },
  {
    id: "regex.profile_crud_export_import",
    group: "regular-expression and click/drawing triggers",
  },
  { id: "regex.test_preview", group: "regular-expression and click/drawing triggers" },
  { id: "regex.test_mode_toggle", group: "regular-expression and click/drawing triggers" },
  { id: "regex.ai_bridge_control", group: "regular-expression and click/drawing triggers" },
  { id: "gesture.draw_and_recognize", group: "regular-expression and click/drawing triggers" },
  { id: "gesture.template_recording", group: "regular-expression and click/drawing triggers" },
  { id: "gesture.visual_trail_settings", group: "regular-expression and click/drawing triggers" },
  { id: "gesture.monitor_iframe_scan", group: "regular-expression and click/drawing triggers" },
  { id: "clicktrigger.action_bubble_menu", group: "regular-expression and click/drawing triggers" },
  { id: "clicktrigger.enable_toggle", group: "regular-expression and click/drawing triggers" },
  {
    id: "clicktrigger.monitor_iframe_scan",
    group: "regular-expression and click/drawing triggers",
  },
  {
    id: "maintrig.demand_popup_before_generation",
    group: "regular-expression and click/drawing triggers",
  },
  { id: "theme.picker_and_custom_editor", group: "themes and optional floating entry" },
  { id: "theme.save_delete_custom", group: "themes and optional floating entry" },
  { id: "theme.import_export", group: "themes and optional floating entry" },
  { id: "theme.quick_cycle_toggle", group: "themes and optional floating entry" },
  { id: "theme.generate_button_style_catalog", group: "themes and optional floating entry" },
  { id: "theme.image_frame_style_catalog", group: "themes and optional floating entry" },
  { id: "theme.collapse_section_style_catalog", group: "themes and optional floating entry" },
  { id: "theme.legacy_dom_style_mutation", group: "themes and optional floating entry" },
  { id: "floatingentry.toggle_and_icon_customize", group: "themes and optional floating entry" },
  { id: "floatingentry.video_mascot_mode", group: "themes and optional floating entry" },
  { id: "floatingentry.media_state_asset_resolution", group: "themes and optional floating entry" },
  { id: "floatingentry.mascot_reaction_videos", group: "themes and optional floating entry" },
  { id: "floatingentry.alpha_hit_test", group: "themes and optional floating entry" },
  { id: "floatingentry.drag_reposition", group: "themes and optional floating entry" },
  {
    id: "floatingentry.click_opens_settings_or_headpat",
    group: "themes and optional floating entry",
  },
  { id: "floatingentry.loading_indicator", group: "themes and optional floating entry" },
  { id: "floatingentry.desktop_pet_pip_mode", group: "themes and optional floating entry" },
  { id: "floatingentry.theme_preset_apply", group: "themes and optional floating entry" },
  { id: "floatingentry.color_opacity_custom", group: "themes and optional floating entry" },
  { id: "floatingentry.size_slider_reflow", group: "themes and optional floating entry" },
  { id: "floatingentry.reset_position", group: "themes and optional floating entry" },
  { id: "floatingentry.video_mode_toggle", group: "themes and optional floating entry" },
  { id: "onboarding.opening_video_first_run", group: "themes and optional floating entry" },
  { id: "onboarding.code_generation_minigame", group: "themes and optional floating entry" },
  { id: "onboarding.skip_and_greeting_flow", group: "themes and optional floating entry" },
  { id: "theme.help_tooltip_injection", group: "themes and optional floating entry" },
  { id: "theme.help_tips_enabled_toggle", group: "themes and optional floating entry" },
  {
    id: "assistant.tts_engine_and_voice_catalog",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.tts_segmented_streaming_playback",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.tts_narration_scope_and_style",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.tts_per_message_and_autoplay",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.asr_mic_input_modes",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.asr_vad_and_conversation_mode",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.asr_mic_calibration_test",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.asr_result_validation_filter",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.asr_settings_sliders",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.chat_pagination_and_scroll",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.thinking_block_display",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.image_attach_input",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.message_fullscreen_zoom",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.message_ask_choice_buttons",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.message_tool_call_transcript",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.message_edit_resend_continue",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.message_streaming_render",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.session_new_and_switch",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.session_history_manage",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.session_export_json",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.session_v1_v2_storage_migration",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.dialog_open_drag_resize",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.settings_panel_autosave_tabs",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.avatar_dynamic_follows_persona",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.markdown_sandbox_render",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  { id: "assistant.model_fetch", group: "AI assistant, TTS, ASR, summary, and screen input" },
  {
    id: "assistant.command_execute_flow",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.command_image_gen_progress_overlay",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.screen_share_capture",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.auto_capture_on_send",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.prompt_assembly_and_templates",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.history_image_handling",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.streaming_send_and_abort",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.auto_query_iteration_loop",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.enter_to_send_input",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  { id: "assistant.summary_generate", group: "AI assistant, TTS, ASR, summary, and screen input" },
  {
    id: "assistant.summary_enable_disable_delete",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.summary_panel_and_multiselect",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.summary_reorder_and_estimate",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.summary_detail_and_graph",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.summary_injected_into_prompt",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.config_browse_with_descriptions",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.autonomous_config_write",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.ui_action_registry_click",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.generate_image_command",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  { id: "assistant.task_tracker", group: "AI assistant, TTS, ASR, summary, and screen input" },
  {
    id: "assistant.tavern_input_bridge",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.knowledge_base_query_tool",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.deep_key_search_fallback",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.diagnostics_query_tool",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.required_config_check",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.chat_session_and_image_storage",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.floor_message_collection",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.floor_regex_preprocessing",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  {
    id: "assistant.init_entry_and_image_insert",
    group: "AI assistant, TTS, ASR, summary, and screen input",
  },
  { id: "assistant.floor_info_panel", group: "AI assistant, TTS, ASR, summary, and screen input" },
  {
    id: "diagnostics.global_error_collector",
    group: "diagnostics, migration, import/export, and cleanup",
  },
  {
    id: "diagnostics.old_extension_db_migration",
    group: "diagnostics, migration, import/export, and cleanup",
  },
  {
    id: "diagnostics.config_blob_dual_storage",
    group: "diagnostics, migration, import/export, and cleanup",
  },
  {
    id: "diagnostics.sd_comfyui_cache_db_migration",
    group: "diagnostics, migration, import/export, and cleanup",
  },
  {
    id: "diagnostics.cache_completion_flags",
    group: "diagnostics, migration, import/export, and cleanup",
  },
  {
    id: "diagnostics.debug_log_panel",
    group: "diagnostics, migration, import/export, and cleanup",
  },
  {
    id: "diagnostics.debug_mode_structured_logger",
    group: "diagnostics, migration, import/export, and cleanup",
  },
  {
    id: "diagnostics.settings_export_import_reset",
    group: "diagnostics, migration, import/export, and cleanup",
  },
  {
    id: "diagnostics.generation_stats_dashboard",
    group: "diagnostics, migration, import/export, and cleanup",
  },
  {
    id: "diagnostics.storage_diagnose_console_tool",
    group: "diagnostics, migration, import/export, and cleanup",
  },
  {
    id: "diagnostics.storage_cleanup_modal",
    group: "diagnostics, migration, import/export, and cleanup",
  },
  {
    id: "diagnostics.vibe_storage_server_migration",
    group: "diagnostics, migration, import/export, and cleanup",
  },
  {
    id: "diagnostics.about_disclaimer_tamper_guard",
    group: "diagnostics, migration, import/export, and cleanup",
  },
  {
    id: "diagnostics.about_content_integrity_check_on_load",
    group: "diagnostics, migration, import/export, and cleanup",
  },
  {
    id: "diagnostics.dist_runtime_git_tracking_completeness",
    group: "diagnostics, migration, import/export, and cleanup",
  },
  { id: "startup.legacy_secret_storage", group: "startup and update" },
];
