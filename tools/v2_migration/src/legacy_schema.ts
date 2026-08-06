import { z } from "zod";

/**
 * Shapes below are reverse-engineered from the archived v2 `index.js`
 * (`defaultSettings`, `dbs.*`, `configDatabase.js`, and the message-image
 * insertion pipeline). Field names and nesting mirror the legacy source
 * exactly; values in fixtures are synthetic.
 */

const legacy_scalar = z.union([z.string(), z.number(), z.boolean()]);

const legacy_prompt_preset = z.strictObject({
  fixedPrompt: z.string(),
  fixedPrompt_end: z.string(),
  negativePrompt: z.string(),
});

const legacy_vibe_preset = z.strictObject({
  model: z.string(),
  infoExtract: z.number(),
  strength: z.number(),
  imageId: z.string().nullable(),
  vibeDataId: z.string().nullable(),
});

const legacy_regex_profile = z.strictObject({
  beforeAfterRegex: z.string(),
  textRegex: z.string(),
});

const legacy_word_replacement_profile = z.strictObject({
  textReplacement: z.string(),
  aiReplacement: z.string(),
});

const legacy_prompt_replace_profile = z.strictObject({
  text: z.string(),
});

const legacy_fab_theme = z.strictObject({
  bgColor: z.string(),
  iconColor: z.string(),
  opacity: z.number(),
});

const legacy_theme = z.strictObject({
  bgColor: z.string().optional(),
  textColor: z.string().optional(),
  accentColor: z.string().optional(),
});

const legacy_novelai_profile = z.strictObject({
  novelaiApi: z.string(),
  novelaisite: z.string(),
  novelaiOtherSite: z.string(),
  enableCloudQueue: z.string(),
  cloudQueueUrl: z.string(),
  cloudQueueGreeting: z.string(),
  showQueueGreeting: z.string(),
  novelaimode: z.string(),
  novelai_sampler: z.string(),
  Schedule: z.string(),
  nai3Scale: z.string(),
  cfg_rescale: z.string(),
  AI_use_coords: z.string(),
  sm: z.string(),
  dyn: z.string(),
  nai3Variety: z.string(),
  nai3Deceisp: z.string(),
  enableVibeGroupTransfer: z.string(),
  randomVibeGroup: z.string(),
  normalizeRefStrength: z.string(),
  novelai_width: z.string(),
  novelai_height: z.string(),
  novelai_steps: z.string(),
  novelai_seed: z.string(),
});

const legacy_comfyui_profile = z.strictObject({
  workerid: z.string(),
  worker: z.string(),
  editWorkerid: z.string(),
  editWorker: z.string(),
  comfyuiUrl: z.string(),
  MODEL_NAME: z.string(),
  comfyuisamplerName: z.string(),
  comfyui_vae: z.string(),
  comfyui_scheduler: z.string(),
  comfyuiCLIPName: z.string(),
  comfyui_width: z.string(),
  comfyui_height: z.string(),
  comfyui_steps: z.string(),
  comfyui_seed: z.string(),
  cfg_comfyui: z.string(),
});

const legacy_llm_profile = z.strictObject({
  api_url: z.string(),
  api_key: z.string(),
  model: z.string(),
  temperature: z.number(),
  top_p: z.number(),
  max_tokens: z.number(),
  stream: z.boolean(),
  bypass_proxy: z.boolean(),
});

const legacy_llm_route = z.strictObject({
  api_profile: z.string(),
  context_profile: z.string(),
});

const legacy_llm_request_type_profile = z.strictObject({
  image_gen: legacy_llm_route,
  char_design: legacy_llm_route,
  char_display: legacy_llm_route,
  char_modify: legacy_llm_route,
  translation: legacy_llm_route,
  tag_modify: legacy_llm_route,
  ai_assistant: legacy_llm_route,
  persona_gen: legacy_llm_route,
  user_persona_gen: legacy_llm_route,
  chat_summary: legacy_llm_route,
});

const legacy_test_context_entry = z.strictObject({
  id: z.string(),
  name: z.string(),
  role: z.enum(["system", "user", "assistant"]),
  content: z.string(),
  enabled: z.boolean(),
  triggerMode: z.enum(["always", "trigger"]),
  triggerWords: z.string(),
  andTriggerWords: z.string(),
});

const legacy_test_context_profile = z.strictObject({
  entries: z.array(legacy_test_context_entry),
});

const legacy_banana_conversation_turn = z.strictObject({
  user: z.strictObject({ text: z.string(), image: z.string() }),
  model: z.strictObject({ text: z.string(), image: z.string() }),
});

const legacy_banana_conversation_preset = z.strictObject({
  fixedPrompt: z.string(),
  postfixPrompt: z.string(),
  conversation: z.array(legacy_banana_conversation_turn),
});

const legacy_banana_character_preset = z.strictObject({
  triggers: z.string(),
  conversation: legacy_banana_conversation_turn,
});

const legacy_banana_settings = z.strictObject({
  apiKey: z.string(),
  apiUrl: z.string(),
  model: z.string(),
  editModel: z.string(),
  videoModel: z.string(),
  aspectRatio: z.string(),
  imageSize: z.string(),
  useGrokFormat: z.string(),
  conversationPresetId: z.string(),
  editPresetId: z.string(),
  videoPresetId: z.string(),
  conversationPresets: z.record(z.string(), legacy_banana_conversation_preset),
  prompt_replace: z.record(z.string(), legacy_prompt_replace_profile),
  prompt_replace_id: z.string(),
});

const legacy_chatu8_ai_assistant = z.strictObject({
  api_url: z.string(),
  api_key: z.string(),
  model: z.string(),
  bypass_proxy: z.boolean(),
  stream: z.boolean(),
  system_prompt: z.string(),
});

const legacy_asr_settings = z.strictObject({
  enabled: z.boolean(),
  asrServerUrl: z.string(),
  mode: z.enum(["vad", "ptt"]),
  silenceTimeout: z.number(),
  vadThreshold: z.number(),
  maxKeepDuration: z.number(),
  language: z.string(),
  appendMode: z.boolean(),
  autoSend: z.boolean(),
  conversationMode: z.boolean(),
});

const legacy_knowledge_base_config = z.strictObject({
  enabled: z.boolean(),
  triggerDepth: z.number(),
  worldBookSelections: z.record(z.string(), z.union([z.boolean(), z.literal("force")])),
  worldEntrySelections: z.record(
    z.string(),
    z.record(z.string(), z.union([z.boolean(), z.literal("force")])),
  ),
});

const legacy_world_book_config = z.strictObject({
  worldBookSelections: z.record(z.string(), z.union([z.boolean(), z.literal("force")])),
  worldEntrySelections: z.record(
    z.string(),
    z.record(z.string(), z.union([z.boolean(), z.literal("force")])),
  ),
});

const legacy_image_gen_stats = z.strictObject({
  backends: z.strictObject({
    sd: z.strictObject({ success: z.number(), fail: z.number() }),
    comfyui: z.strictObject({ success: z.number(), fail: z.number() }),
    banana: z.strictObject({ success: z.number(), fail: z.number() }),
    novelai: z.strictObject({ success: z.number(), fail: z.number() }),
  }),
  total: z.strictObject({ success: z.number(), fail: z.number() }),
  firstGenTime: z.number().nullable(),
  lastGenTime: z.number().nullable(),
  daily: z.record(z.string(), z.unknown()),
});

const legacy_persona_profiles = z.strictObject({
  presets: z.record(z.string(), z.record(z.string(), z.unknown())),
  currentPresetId: z.string().optional(),
  enabled: z.boolean().optional(),
  injectionMode: z.string().optional(),
  currentUserPresetId: z.string().optional(),
  userEnabled: z.boolean().optional(),
  userInjectionMode: z.string().optional(),
});

const legacy_ai_persona_profile = z.strictObject({
  model: z.string(),
  temperature: z.number(),
  systemPrompt: z.string(),
  lastPrompt: z.string(),
});

/**
 * `extension_settings["st-chatu8"]`. Every own path here must classify via
 * `converter_registry.ts`; `worldBookConfig` and `personaProfiles` are absent
 * from the static v2 `defaultSettings` object but are lazily attached to this
 * same settings object the first time their owning feature runs.
 */
export const LegacySettingsSchema = z.object({
  theme_id: z.string(),
  themes: z.record(z.string(), legacy_theme),
  generate_btn_style: z.string(),
  image_frame_style: z.string(),
  collapse_style: z.string(),
  scriptEnabled: z.boolean(),
  helpTipsEnabled: legacy_scalar,
  characterAI: legacy_ai_persona_profile,
  outfitAI: legacy_ai_persona_profile,
  newlineFixEnabled: legacy_scalar,
  yushe: z.record(z.string(), legacy_prompt_preset),
  yusheid_sd: z.string(),
  yusheid_novelai: z.string(),
  yusheid_comfyui: z.string(),
  randomYushe: legacy_scalar,
  aiAutonomousResolution: z.boolean(),
  prompt_replace: z.record(z.string(), legacy_prompt_replace_profile),
  prompt_replace_id: z.string(),
  vibePresets: z.record(z.string(), legacy_vibe_preset),
  vibePresetId: z.string(),
  regex_profiles: z.record(z.string(), legacy_regex_profile),
  current_regex_profile: z.string(),
  word_replacement_profiles: z.record(z.string(), legacy_word_replacement_profile),
  current_word_replacement_profile: z.string(),
  regexTestMode: z.boolean(),
  mode: z.string(),
  client: z.string(),
  cache: z.string(),
  sdUrl: z.string(),
  st_chatu8_sd_auth: z.string(),
  comfyuiUrl: z.string(),
  novelaiApi: z.string(),
  novelaiApi_id: z.string(),
  startTag: z.string(),
  endTag: z.string(),
  nai3Scale: z.string(),
  sdCfgScale: z.string(),
  sm: z.string(),
  dyn: z.string(),
  cfg_rescale: z.string(),
  AQT_sd: z.string(),
  UCP_sd: z.string(),
  AQT_novelai: z.string(),
  UCP_novelai: z.string(),
  addFurryDataset: legacy_scalar,
  AQT_comfyui: z.string(),
  UCP_comfyui: z.string(),
  sd_csteps: z.string(),
  sd_cwidth: z.string(),
  sd_cheight: z.string(),
  sd_cseed: z.string(),
  novelai_steps: z.string(),
  novelai_width: z.string(),
  novelai_height: z.string(),
  novelai_seed: z.string(),
  comfyui_steps: z.string(),
  comfyui_width: z.string(),
  comfyui_height: z.string(),
  comfyui_seed: z.string(),
  inpaint_denoise: z.string(),
  weilin_lora_fix: legacy_scalar,
  inpaint_brush_size: z.number(),
  inpaint_positive_prompt: z.string(),
  inpaint_negative_prompt: z.string(),
  cfg_comfyui: z.string(),
  sd_cchatu_8_model: z.string(),
  sd_cchatu_8_vae: z.string(),
  sd_cchatu_8_scheduler: z.string(),
  sd_cchatu_8_upscaler: z.string(),
  sd_cupscale_factor: z.string(),
  sd_chires_fix: z.string(),
  sd_chires_steps: z.string(),
  sd_cdenoising_strength: z.string(),
  sd_cclip_skip: z.string(),
  sd_cadetailer: z.string(),
  restoreFaces: z.string(),
  sd_cchatu_8_samplerName: z.string(),
  comfyuisamplerName: z.string(),
  comfyuiCLIPName: z.string(),
  comfyui_scheduler: z.string(),
  comfyui_vae: z.string(),
  novelai_sampler: z.string(),
  zidongdianji: legacy_scalar,
  zidongdianji2: legacy_scalar,
  longPressToEdit: legacy_scalar,
  clickToPreview: legacy_scalar,
  nai3VibeTransfer: legacy_scalar,
  enableVibeGroupTransfer: legacy_scalar,
  randomVibeGroup: legacy_scalar,
  normalizeRefStrength: legacy_scalar,
  nai3CharRef: legacy_scalar,
  nai3StylePerception: legacy_scalar,
  InformationExtracted: z.string(),
  ReferenceStrength: z.string(),
  nai3Deceisp: legacy_scalar,
  nai3Variety: legacy_scalar,
  Schedule: z.string(),
  MODEL_NAME: z.string(),
  c_fenwei: z.string(),
  c_xijie: z.string(),
  c_idquanzhong: z.string(),
  c_quanzhong: z.string(),
  ipa: z.string(),
  dbclike: legacy_scalar,
  collapseImage: legacy_scalar,
  workers: z.record(z.string(), z.string()),
  workerid: z.string(),
  worker: z.string(),
  editWorkerid: z.string(),
  editWorker: z.string(),
  novelaimode: z.string(),
  novelaisite: z.string(),
  novelaiOtherSite: z.string(),
  enableCloudQueue: legacy_scalar,
  cloudQueueUrl: z.string(),
  cloudQueueGreeting: z.string(),
  showQueueGreeting: legacy_scalar,
  displayMode: z.string(),
  heavyFrontendMode: legacy_scalar,
  insertOriginalText: legacy_scalar,
  tagthinkEcho: legacy_scalar,
  historyKeepImageTag: z.boolean(),
  enablePregen: legacy_scalar,
  autoLLMImageGen: legacy_scalar,
  imageAlignment: z.string(),
  imageSizeScale: z.string(),
  imageGenInterval: z.number(),
  ai_temperature: z.number(),
  ai_top_p: z.number(),
  ai_presence_penalty: z.number(),
  ai_frequency_penalty: z.number(),
  ai_stream: legacy_scalar,
  ai_private: legacy_scalar,
  ai_token: z.string(),
  ai_test_system: z.string(),
  ai_test_user: z.string(),
  ai_test_output: z.string(),
  chatu8_ai_assistant: legacy_chatu8_ai_assistant,
  chatu8_code: z.string(),
  asr: legacy_asr_settings,
  knowledgeBaseConfig: legacy_knowledge_base_config,
  llm_history_depth: z.number(),
  imageGenStats: legacy_image_gen_stats,
  llm_profiles: z.record(z.string(), legacy_llm_profile),
  current_llm_profile: z.string(),
  llm_request_type_profiles: z.record(z.string(), legacy_llm_request_type_profile),
  current_llm_request_type_profile: z.string(),
  llm_request_type_configs: legacy_llm_request_type_profile,
  test_context_profiles: z.record(z.string(), legacy_test_context_profile),
  current_test_context_profile: z.string(),
  translation_model: z.string(),
  translation_system_prompt: z.string(),
  AI_use_coords: legacy_scalar,
  fabThemes: z.record(z.string(), legacy_fab_theme),
  chatu8_fab_theme: z.string(),
  enable_chatu8_fab: z.boolean(),
  enable_chatu8_fab_video: z.boolean(),
  enable_chatu8_desktop_pet: z.boolean(),
  chatu8_fab_bg_color: z.string(),
  chatu8_fab_icon_color: z.string(),
  chatu8_fab_icon_image_id: z.string(),
  chatu8_fab_opacity: z.number(),
  chatu8_fab_size: z.strictObject({ desktop: z.number(), mobile: z.number() }),
  chatu8_fab_position: z.strictObject({
    desktop: z.strictObject({ top: z.string(), left: z.string() }),
    mobile: z.strictObject({ top: z.string(), left: z.string() }),
  }),
  chatu8_fab_video_paths: z.strictObject({ idle: z.string(), dragging: z.string() }),
  lastTab: z.string(),
  cacheStorageMigrated: z.boolean(),
  worldBookEnabled: legacy_scalar,
  worldBookList: z.record(z.string(), z.strictObject({ content: z.string() })),
  worldBookList_id: z.string(),
  vocabulary_search_startswith: legacy_scalar,
  vocabulary_search_limit: z.number(),
  vocabulary_search_sort: z.string(),
  jiuguanchucun: legacy_scalar,
  vibeJiuguanchucun: legacy_scalar,
  convertToJpegStorage: legacy_scalar,
  // `path` is a host filesystem reference with no locally hashable bytes; a
  // resolved `data_base64` (fetched by the Task 6 runner, not this pure
  // converter) is required before gallery_converter can mint an ImageRecord.
  jiuguanStorage: z.record(
    z.string(),
    z.strictObject({
      images: z.array(
        z.strictObject({
          uuid: z.string(),
          path: z.string(),
          thumbnail_uuid: z.string(),
          thumbnail_path: z.string(),
          date: z.number(),
          isVideo: z.boolean(),
          originalUrl: z.string(),
          size: z.number(),
          thumbnail_size: z.number(),
          genParams: z.record(z.string(), z.unknown()).nullable().optional(),
          data_base64: z.string().optional(),
        }),
      ),
      index: z.number(),
      change: z.string(),
    }),
  ),
  banana: legacy_banana_settings,
  bananaCharacterPresets: z.record(z.string(), legacy_banana_character_preset),
  bananaCharacterPresetId: z.string(),
  gestureEnabled: z.boolean(),
  clickTriggerEnabled: z.boolean(),
  gesture1: z.array(z.string()),
  gesture2: z.array(z.string()),
  gestureShowRecognition: z.boolean(),
  gestureShowTrail: z.boolean(),
  gestureTrailColor: z.string(),
  gestureMatchThreshold: z.number(),
  defaultCharDemand: z.string(),
  defaultImageDemand: z.string(),
  novelai_profiles: z.record(z.string(), legacy_novelai_profile),
  novelai_profile_id: z.string(),
  comfyui_profiles: z.record(z.string(), legacy_comfyui_profile),
  comfyui_profile_id: z.string(),
  worldBookConfig: legacy_world_book_config.optional(),
  personaProfiles: legacy_persona_profiles.optional(),
});
export type LegacySettings = z.infer<typeof LegacySettingsSchema>;

const legacy_gallery_image_entry = z.strictObject({
  uuid: z.string().min(1),
  path: z.string().optional(),
  thumbnail_uuid: z.string().min(1).optional(),
  thumbnail_path: z.string().optional(),
  date: z.number().int().nonnegative(),
  isVideo: z.boolean(),
  originalUrl: z.string(),
  size: z.number().int().nonnegative(),
  thumbnail_size: z.number().int().nonnegative(),
  genParams: z.record(z.string(), z.unknown()).nullable().optional(),
  data_base64: z.string().min(1).optional(),
});
export type LegacyGalleryImageEntry = z.infer<typeof legacy_gallery_image_entry>;

const legacy_gallery_tag_entry = z.strictObject({
  images: z.array(legacy_gallery_image_entry),
  index: z.number().int().nonnegative(),
  change: z.string(),
});
export type LegacyGalleryTagEntry = z.infer<typeof legacy_gallery_tag_entry>;

const legacy_gallery_group_row = z.strictObject({
  id_index: z.string().min(1),
  fileName: z.string().min(1),
  name: z.string().min(1),
});

const legacy_gallery_tag_row = z.strictObject({
  fileName: z.string().min(1),
  name: z.string().min(1),
  hot: z.number().int().optional(),
});

const legacy_config_image_entry = z.strictObject({
  id: z.string().min(1),
  data_base64: z.string().min(1),
  date: z.number().int().nonnegative(),
});

/**
 * IndexedDB "chatu8_gallery" v6 (stores tupianhuancun/vocabularies/groups/
 * subgroups/tags), legacy "tupian" (same tupianhuancun shape, pre-migration),
 * and IndexedDB "chatu8_config_images" v2 / store "config_images".
 * `tupianhuancun_blobs` and `config_images[].data_base64` stand in for the
 * ArrayBuffer values IndexedDB stores natively; only user-created (fileName
 * "manual") vocabulary rows are in scope, never the bundled tag dataset.
 */
export const LegacyGalleryDatabaseFixtureSchema = z.strictObject({
  tupianhuancun_metadata: z.record(z.string(), legacy_gallery_tag_entry),
  tupianhuancun_blobs: z.record(z.string(), z.string().min(1)),
  groups: z.array(legacy_gallery_group_row),
  subgroups: z.array(legacy_gallery_group_row),
  tags: z.array(legacy_gallery_tag_row),
  config_images: z.array(legacy_config_image_entry),
});
export type LegacyGalleryDatabaseFixture = z.infer<typeof LegacyGalleryDatabaseFixtureSchema>;

const legacy_message_image_entry = z.strictObject({
  tag: z.string().min(1),
  regex: z.string().optional(),
  locked: z.boolean().optional(),
});
export type LegacyMessageImageEntry = z.infer<typeof legacy_message_image_entry>;

/**
 * `chat[messageId]`, source of prompt markers (`<image>tag</image>` written
 * via `startTag`/`endTag`), `extra.images[swipeId]` media entries, and
 * `extra.lockedTags`.
 */
export const LegacyMessageSchema = z.strictObject({
  chat_id: z.string().min(1),
  message_id: z.number().int().nonnegative(),
  role: z.enum(["user", "assistant", "system"]),
  mes: z.string(),
  swipe_id: z.number().int().nonnegative().nullable(),
  extra: z
    .strictObject({
      images: z.record(z.string(), z.array(legacy_message_image_entry)).optional(),
      lockedTags: z.array(z.string()).optional(),
    })
    .optional(),
});
export type LegacyMessage = z.infer<typeof LegacyMessageSchema>;

export const LegacyMessagesFixtureSchema = z.strictObject({
  messages: z.array(LegacyMessageSchema),
});
export type LegacyMessagesFixture = z.infer<typeof LegacyMessagesFixtureSchema>;

/** localStorage keys: gallery migration completion flag and the anonymous device id. */
export const LegacyLocalStorageFixtureSchema = z.strictObject({
  chatu8_uid: z.string().optional(),
  migration_flags: z.record(z.string(), z.string()),
});
export type LegacyLocalStorageFixture = z.infer<typeof LegacyLocalStorageFixtureSchema>;
