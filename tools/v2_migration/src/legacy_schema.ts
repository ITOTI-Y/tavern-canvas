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
const legacy_llm_route_default: z.infer<typeof legacy_llm_route> = {
  api_profile: "",
  context_profile: "",
};

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
const legacy_llm_request_type_profile_default: z.infer<typeof legacy_llm_request_type_profile> = {
  image_gen: legacy_llm_route_default,
  char_design: legacy_llm_route_default,
  char_display: legacy_llm_route_default,
  char_modify: legacy_llm_route_default,
  translation: legacy_llm_route_default,
  tag_modify: legacy_llm_route_default,
  ai_assistant: legacy_llm_route_default,
  persona_gen: legacy_llm_route_default,
  user_persona_gen: legacy_llm_route_default,
  chat_summary: legacy_llm_route_default,
};

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
// v2's shipped default is an unconfigured local install (placeholder key,
// localhost URL); a root install missing this field entirely predates the
// field's introduction and is in the same "never configured" state.
const legacy_banana_default: z.infer<typeof legacy_banana_settings> = {
  apiKey: "123456",
  apiUrl: "http://localhost:8008",
  model: "",
  editModel: "",
  videoModel: "",
  aspectRatio: "1:1",
  imageSize: "1024x1024",
  useGrokFormat: "false",
  conversationPresetId: "",
  editPresetId: "",
  videoPresetId: "",
  conversationPresets: {},
  prompt_replace: {},
  prompt_replace_id: "",
};

const legacy_chatu8_ai_assistant = z.strictObject({
  api_url: z.string(),
  api_key: z.string(),
  model: z.string(),
  bypass_proxy: z.boolean(),
  stream: z.boolean(),
  system_prompt: z.string(),
});
const legacy_chatu8_ai_assistant_default: z.infer<typeof legacy_chatu8_ai_assistant> = {
  api_url: "",
  api_key: "",
  model: "mistral",
  bypass_proxy: false,
  stream: true,
  system_prompt: "",
};

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
const legacy_asr_default: z.infer<typeof legacy_asr_settings> = {
  enabled: false,
  asrServerUrl: "https://qwen-qwen3-asr-demo.ms.show",
  mode: "vad",
  silenceTimeout: 1200,
  vadThreshold: 0.02,
  maxKeepDuration: 10,
  language: "auto",
  appendMode: true,
  autoSend: true,
  conversationMode: false,
};

const legacy_knowledge_base_config = z.strictObject({
  enabled: z.boolean(),
  triggerDepth: z.number(),
  worldBookSelections: z.record(z.string(), z.union([z.boolean(), z.literal("force")])),
  worldEntrySelections: z.record(
    z.string(),
    z.record(z.string(), z.union([z.boolean(), z.literal("force")])),
  ),
});
const legacy_knowledge_base_config_default: z.infer<typeof legacy_knowledge_base_config> = {
  enabled: false,
  triggerDepth: 1,
  worldBookSelections: {},
  worldEntrySelections: {},
};

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
const legacy_image_gen_stats_default: z.infer<typeof legacy_image_gen_stats> = {
  backends: {
    sd: { success: 0, fail: 0 },
    comfyui: { success: 0, fail: 0 },
    banana: { success: 0, fail: 0 },
    novelai: { success: 0, fail: 0 },
  },
  total: { success: 0, fail: 0 },
  firstGenTime: null,
  lastGenTime: null,
  daily: {},
};

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
const legacy_ai_persona_default: z.infer<typeof legacy_ai_persona_profile> = {
  model: "mistral",
  temperature: 0.8,
  systemPrompt: "",
  lastPrompt: "",
};

/**
 * `extension_settings["st-chatu8"]`. Every own path here must classify via
 * `converter_registry.ts`; `worldBookConfig` and `personaProfiles` are absent
 * from the static v2 `defaultSettings` object but are lazily attached to this
 * same settings object the first time their owning feature runs.
 *
 * Every field below carries `.default(...)`: an install that predates a
 * field's introduction (or never re-booted to merge new defaults) must not
 * be permanently blocked from migrating (see Stage 04 review finding I5).
 * Defaults mirror v2 2.8.1's own `defaultSettings` for short/scalar values;
 * dictionaries the user populates (presets, profiles, themes, workflows) and
 * long/CJK cosmetic copy default to an empty/blank "never configured" state
 * rather than replicating shipped example content byte-for-byte — a missing
 * field has no data to lose, and the safe fallback never masks a field that
 * was genuinely present.
 */
export const LegacySettingsSchema = z.object({
  theme_id: z.string().default(""),
  themes: z.record(z.string(), legacy_theme).default({}),
  generate_btn_style: z.string().default(""),
  image_frame_style: z.string().default(""),
  collapse_style: z.string().default(""),
  scriptEnabled: z.boolean().default(false),
  helpTipsEnabled: legacy_scalar.default("true"),
  characterAI: legacy_ai_persona_profile.default(legacy_ai_persona_default),
  outfitAI: legacy_ai_persona_profile.default(legacy_ai_persona_default),
  newlineFixEnabled: legacy_scalar.default("true"),
  yushe: z.record(z.string(), legacy_prompt_preset).default({}),
  yusheid_sd: z.string().default(""),
  yusheid_novelai: z.string().default(""),
  yusheid_comfyui: z.string().default(""),
  randomYushe: legacy_scalar.default("false"),
  aiAutonomousResolution: z.boolean().default(true),
  prompt_replace: z.record(z.string(), legacy_prompt_replace_profile).default({}),
  prompt_replace_id: z.string().default(""),
  vibePresets: z.record(z.string(), legacy_vibe_preset).default({}),
  vibePresetId: z.string().default(""),
  regex_profiles: z.record(z.string(), legacy_regex_profile).default({}),
  current_regex_profile: z.string().default(""),
  word_replacement_profiles: z.record(z.string(), legacy_word_replacement_profile).default({}),
  current_word_replacement_profile: z.string().default(""),
  regexTestMode: z.boolean().default(false),
  mode: z.string().default("comfyui"),
  client: z.string().default("browser"),
  cache: z.string().default("1"),
  sdUrl: z.string().default("http://localhost:7860"),
  st_chatu8_sd_auth: z.string().default(""),
  comfyuiUrl: z.string().default("http://localhost:8188"),
  novelaiApi: z.string().default("000000"),
  novelaiApi_id: z.string().default("000000"),
  startTag: z.string().default("image###"),
  endTag: z.string().default("###"),
  nai3Scale: z.string().default("10"),
  sdCfgScale: z.string().default("7"),
  sm: z.string().default("true"),
  dyn: z.string().default("true"),
  cfg_rescale: z.string().default("0.18"),
  AQT_sd: z.string().default(
    "best quality, amazing quality, very aesthetic, absurdres",
  ),
  UCP_sd: z.string().default(
    "bad proportions, out of focus, username, text, bad anatomy, lowres, worstquality, watermark, cropped, bad body, deformed, mutated, disfigured, poorly drawn face, malformed hands, extra arms, extra limb, missing limb, too many fingers, extra legs, bad feet, missing fingers, fused fingers, acnes, floating limbs, disconnected limbs, long neck, long body, mutation, ugly, blurry, low quality, sketches, normal quality, monochrome, grayscale, signature, logo, jpeg artifacts, unfinished, displeasing, chromatic aberration, extra digits, artistic error, scan, abstract, photo, realism, screencap",
  ),
  AQT_novelai: z.string().default(
    "best quality, amazing quality, very aesthetic, absurdres",
  ),
  UCP_novelai: z.string().default("Heavy"),
  addFurryDataset: legacy_scalar.default("false"),
  AQT_comfyui: z.string().default(
    "best quality, amazing quality, very aesthetic, absurdres",
  ),
  UCP_comfyui: z.string().default(
    "bad proportions, out of focus, username, text, bad anatomy, lowres, worstquality, watermark, cropped, bad body, deformed, mutated, disfigured, poorly drawn face, malformed hands, extra arms, extra limb, missing limb, too many fingers, extra legs, bad feet, missing fingers, fused fingers, acnes, floating limbs, disconnected limbs, long neck, long body, mutation, ugly, blurry, low quality, sketches, normal quality, monochrome, grayscale, signature, logo, jpeg artifacts, unfinished, displeasing, chromatic aberration, extra digits, artistic error, scan, abstract, photo, realism, screencap",
  ),
  sd_csteps: z.string().default("28"),
  sd_cwidth: z.string().default("1024"),
  sd_cheight: z.string().default("1024"),
  sd_cseed: z.string().default("-1"),
  novelai_steps: z.string().default("28"),
  novelai_width: z.string().default("1024"),
  novelai_height: z.string().default("1024"),
  novelai_seed: z.string().default("0"),
  comfyui_steps: z.string().default("28"),
  comfyui_width: z.string().default("1024"),
  comfyui_height: z.string().default("1024"),
  comfyui_seed: z.string().default("0"),
  inpaint_denoise: z.string().default("0.75"),
  weilin_lora_fix: legacy_scalar.default("false"),
  inpaint_brush_size: z.number().default(30),
  inpaint_positive_prompt: z.string().default(""),
  inpaint_negative_prompt: z.string().default(""),
  cfg_comfyui: z.string().default("6"),
  sd_cchatu_8_model: z.string().default(""),
  sd_cchatu_8_vae: z.string().default("Automatic"),
  sd_cchatu_8_scheduler: z.string().default(""),
  sd_cchatu_8_upscaler: z.string().default("Latent"),
  sd_cupscale_factor: z.string().default("1"),
  sd_chires_fix: z.string().default("false"),
  sd_chires_steps: z.string().default("0"),
  sd_cdenoising_strength: z.string().default("0.7"),
  sd_cclip_skip: z.string().default("2"),
  sd_cadetailer: z.string().default("false"),
  restoreFaces: z.string().default("false"),
  sd_cchatu_8_samplerName: z.string().default("DPM++ 2M"),
  comfyuisamplerName: z.string().default(""),
  comfyuiCLIPName: z.string().default(""),
  comfyui_scheduler: z.string().default(""),
  comfyui_vae: z.string().default(""),
  novelai_sampler: z.string().default("k_euler"),
  zidongdianji: legacy_scalar.default("false"),
  zidongdianji2: legacy_scalar.default("false"),
  longPressToEdit: legacy_scalar.default("false"),
  clickToPreview: legacy_scalar.default("true"),
  nai3VibeTransfer: legacy_scalar.default("false"),
  enableVibeGroupTransfer: legacy_scalar.default("false"),
  randomVibeGroup: legacy_scalar.default("false"),
  normalizeRefStrength: legacy_scalar.default("false"),
  nai3CharRef: legacy_scalar.default("false"),
  nai3StylePerception: legacy_scalar.default("false"),
  InformationExtracted: z.string().default("0.3"),
  ReferenceStrength: z.string().default("0.6"),
  nai3Deceisp: legacy_scalar.default("true"),
  nai3Variety: legacy_scalar.default("true"),
  Schedule: z.string().default("karras"),
  MODEL_NAME: z.string().default(""),
  c_fenwei: z.string().default("0.8"),
  c_xijie: z.string().default("0.8"),
  c_idquanzhong: z.string().default("1.10"),
  c_quanzhong: z.string().default("0.8"),
  ipa: z.string().default("STANDARD (medium strength)"),
  dbclike: legacy_scalar.default("false"),
  collapseImage: legacy_scalar.default("false"),
  workers: z.record(z.string(), z.string()).default({}),
  workerid: z.string().default(""),
  worker: z.string().default(""),
  editWorkerid: z.string().default(""),
  editWorker: z.string().default(""),
  novelaimode: z.string().default("nai-diffusion-4-5-full"),
  novelaisite: z.string().default(""),
  novelaiOtherSite: z.string().default("http://localhost:9696/get-new-token"),
  enableCloudQueue: legacy_scalar.default("false"),
  cloudQueueUrl: z.string().default("https://st-chatu-novelai-queue.hf.space"),
  cloudQueueGreeting: z.string().default(""),
  showQueueGreeting: legacy_scalar.default("true"),
  displayMode: z.string().default(""),
  heavyFrontendMode: legacy_scalar.default("false"),
  insertOriginalText: legacy_scalar.default("false"),
  tagthinkEcho: legacy_scalar.default("false"),
  historyKeepImageTag: z.boolean().default(false),
  enablePregen: legacy_scalar.default("false"),
  autoLLMImageGen: legacy_scalar.default("false"),
  imageAlignment: z.string().default("center"),
  imageSizeScale: z.string().default("100"),
  imageGenInterval: z.number().default(100),
  ai_temperature: z.number().default(1),
  ai_top_p: z.number().default(1),
  ai_presence_penalty: z.number().default(0),
  ai_frequency_penalty: z.number().default(0),
  ai_stream: legacy_scalar.default("false"),
  ai_private: legacy_scalar.default("true"),
  ai_token: z.string().default(""),
  ai_test_system: z.string().default("You are a helpful assistant."),
  ai_test_user: z.string().default("What is the capital of France?"),
  ai_test_output: z.string().default(""),
  chatu8_ai_assistant: legacy_chatu8_ai_assistant.default(legacy_chatu8_ai_assistant_default),
  chatu8_code: z.string().default(""),
  asr: legacy_asr_settings.default(legacy_asr_default),
  knowledgeBaseConfig: legacy_knowledge_base_config.default(legacy_knowledge_base_config_default),
  llm_history_depth: z.number().default(2),
  imageGenStats: legacy_image_gen_stats.default(legacy_image_gen_stats_default),
  llm_profiles: z.record(z.string(), legacy_llm_profile).default({}),
  current_llm_profile: z.string().default(""),
  llm_request_type_profiles: z.record(z.string(), legacy_llm_request_type_profile).default({}),
  current_llm_request_type_profile: z.string().default(""),
  llm_request_type_configs: legacy_llm_request_type_profile.default(
    legacy_llm_request_type_profile_default,
  ),
  test_context_profiles: z.record(z.string(), legacy_test_context_profile).default({}),
  current_test_context_profile: z.string().default(""),
  translation_model: z.string().default("mistral"),
  translation_system_prompt: z.string().default(""),
  AI_use_coords: legacy_scalar.default("true"),
  fabThemes: z.record(z.string(), legacy_fab_theme).default({}),
  chatu8_fab_theme: z.string().default(""),
  enable_chatu8_fab: z.boolean().default(true),
  enable_chatu8_fab_video: z.boolean().default(false),
  enable_chatu8_desktop_pet: z.boolean().default(false),
  chatu8_fab_bg_color: z.string().default("#ADD8E6"),
  chatu8_fab_icon_color: z.string().default("#FFFFFF"),
  chatu8_fab_icon_image_id: z.string().default(""),
  chatu8_fab_opacity: z.number().default(1),
  chatu8_fab_size: z
    .strictObject({ desktop: z.number(), mobile: z.number() })
    .default({ desktop: 50, mobile: 40 }),
  chatu8_fab_position: z
    .strictObject({
      desktop: z.strictObject({ top: z.string(), left: z.string() }),
      mobile: z.strictObject({ top: z.string(), left: z.string() }),
    })
    .default({
      desktop: { top: "65vh", left: "20px" },
      mobile: { top: "80vh", left: "10px" },
    }),
  chatu8_fab_video_paths: z
    .strictObject({ idle: z.string(), dragging: z.string() })
    .default({ idle: "", dragging: "" }),
  lastTab: z.string().default("main"),
  cacheStorageMigrated: z.boolean().default(false),
  worldBookEnabled: legacy_scalar.default("false"),
  worldBookList: z.record(z.string(), z.strictObject({ content: z.string() })).default({}),
  worldBookList_id: z.string().default(""),
  vocabulary_search_startswith: legacy_scalar.default("false"),
  vocabulary_search_limit: z.number().default(100),
  vocabulary_search_sort: z.string().default("hot_desc"),
  jiuguanchucun: legacy_scalar.default("false"),
  vibeJiuguanchucun: legacy_scalar.default("true"),
  convertToJpegStorage: legacy_scalar.default("false"),
  // `path` is a host filesystem reference with no locally hashable bytes; a
  // resolved `data_base64` (fetched by the Task 6 runner, not this pure
  // converter) is required before gallery_converter can mint an ImageRecord.
  jiuguanStorage: z
    .record(
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
    )
    .default({}),
  banana: legacy_banana_settings.default(legacy_banana_default),
  bananaCharacterPresets: z.record(z.string(), legacy_banana_character_preset).default({}),
  bananaCharacterPresetId: z.string().default(""),
  gestureEnabled: z.boolean().default(false),
  clickTriggerEnabled: z.boolean().default(true),
  gesture1: z.array(z.string()).default([]),
  gesture2: z.array(z.string()).default([]),
  gestureShowRecognition: z.boolean().default(true),
  gestureShowTrail: z.boolean().default(true),
  gestureTrailColor: z.string().default("#00ff00"),
  gestureMatchThreshold: z.number().default(60),
  defaultCharDemand: z.string().default(""),
  defaultImageDemand: z.string().default(""),
  novelai_profiles: z.record(z.string(), legacy_novelai_profile).default({}),
  novelai_profile_id: z.string().default(""),
  comfyui_profiles: z.record(z.string(), legacy_comfyui_profile).default({}),
  comfyui_profile_id: z.string().default(""),
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
