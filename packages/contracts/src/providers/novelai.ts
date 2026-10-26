import { z } from "zod";

import {
  AssetIdSchema,
  BaseImageGenerationRequestFields,
  ProviderIdentifierSchema,
  ProviderSeedSchema,
} from "./common.js";

export const NOVELAI_MAX_PIXELS = 3_145_728;
export const NOVELAI_MAX_UPSCALE_PIXELS = 1_048_576;

const NovelAiDimensionSchema = z.number().int().min(64).max(8192).multipleOf(64);
const UnitIntervalSchema = z.number().min(0).max(1);

export const NovelAiSamplerSchema = z.enum([
  "k_euler",
  "k_euler_ancestral",
  "k_dpmpp_2s_ancestral",
  "k_dpmpp_2m_sde",
  "k_dpmpp_2m",
  "k_dpmpp_sde",
  "ddim_v3",
]);
export type NovelAiSampler = z.infer<typeof NovelAiSamplerSchema>;

export const NovelAiNoiseScheduleSchema = z.enum([
  "native",
  "karras",
  "exponential",
  "polyexponential",
]);
export type NovelAiNoiseSchedule = z.infer<typeof NovelAiNoiseScheduleSchema>;

export const NovelAiUndesiredContentPresetSchema = z.enum([
  "heavy",
  "light",
  "human_focus",
  "furry_focus",
  "none",
]);

export const NovelAiQualityPresetSchema = z.enum(["standard", "light", "none"]);

export const NovelAiCharacterPromptSchema = z.strictObject({
  prompt: z.string().trim().min(1).max(4_000),
  negative_prompt: z.string().trim().max(4_000).optional(),
  /** Normalised image coordinates; omitted lets the model place the character. */
  center: z.strictObject({ x: UnitIntervalSchema, y: UnitIntervalSchema }).optional(),
});

const Base64Schema = z
  .string()
  .min(1)
  .max(40_000_000)
  .regex(/^[A-Za-z0-9+/]+={0,2}$/u);

export const NovelAiVibeReferenceSchema = z.strictObject({
  asset_id: AssetIdSchema,
  strength: z.number().min(-1).max(1),
  information_extracted: UnitIntervalSchema,
  /** `/ai/encode-vibe` output for this asset, model family and information_extracted. */
  encoding: Base64Schema.optional(),
});

export const NovelAiCharacterReferenceSchema = z.strictObject({
  asset_id: AssetIdSchema,
  description: z.enum(["character", "style", "costume", "character_and_style"]),
  strength: UnitIntervalSchema,
  fidelity: UnitIntervalSchema,
  information_extracted: UnitIntervalSchema,
});

const DiffusionFields = {
  ...BaseImageGenerationRequestFields,
  provider_id: z.literal("novelai"),
  model_id: ProviderIdentifierSchema,
  sampler: NovelAiSamplerSchema,
  width: NovelAiDimensionSchema,
  height: NovelAiDimensionSchema,
  steps: z.number().int().min(1).max(50),
  scale: z.number().min(0).max(10),
  cfg_rescale: UnitIntervalSchema,
  noise_schedule: NovelAiNoiseScheduleSchema,
  seed: ProviderSeedSchema.optional(),
  quality_preset: NovelAiQualityPresetSchema,
  undesired_content_preset: NovelAiUndesiredContentPresetSchema,
  smea: z.boolean(),
  dyn: z.boolean(),
  variety_plus: z.boolean(),
  characters: z.array(NovelAiCharacterPromptSchema).max(32).optional(),
  vibe_references: z.array(NovelAiVibeReferenceSchema).max(16).optional(),
  normalize_vibe_strengths: z.boolean().optional(),
  character_references: z.array(NovelAiCharacterReferenceSchema).max(16).optional(),
};

function check_pixel_budget(
  context: z.core.ParsePayload<{ readonly width: number; readonly height: number }>,
): void {
  if (context.value.width * context.value.height > NOVELAI_MAX_PIXELS) {
    context.issues.push({
      code: "custom",
      input: context.value,
      message: `width × height must not exceed ${String(NOVELAI_MAX_PIXELS)} pixels`,
      path: ["width"],
    });
  }
}

export const NovelAiGenerateRequestSchema = z
  .strictObject({ ...DiffusionFields, action: z.literal("generate") })
  .check(check_pixel_budget);

export const NovelAiImg2ImgRequestSchema = z
  .strictObject({
    ...DiffusionFields,
    action: z.literal("img2img"),
    /** Must already be `width` × `height`. */
    image_asset_id: AssetIdSchema,
    strength: UnitIntervalSchema,
    noise: UnitIntervalSchema,
  })
  .check(check_pixel_budget);

export const NovelAiInfillRequestSchema = z
  .strictObject({
    ...DiffusionFields,
    action: z.literal("infill"),
    /** Must already be `width` × `height`; the mask is a white-on-black PNG of the same size. */
    image_asset_id: AssetIdSchema,
    mask_asset_id: AssetIdSchema,
    inpaint_strength: UnitIntervalSchema,
  })
  .check(check_pixel_budget);

export const NovelAiUpscaleRequestSchema = z.strictObject({
  ...BaseImageGenerationRequestFields,
  provider_id: z.literal("novelai"),
  action: z.literal("upscale"),
  image_asset_id: AssetIdSchema,
  output_count: z.literal(1),
});

export const NovelAiEmotionSchema = z.enum([
  "neutral",
  "happy",
  "sad",
  "angry",
  "scared",
  "surprised",
  "tired",
  "excited",
  "nervous",
  "thinking",
  "confused",
  "shy",
  "disgusted",
  "smug",
  "bored",
  "laughing",
  "irritated",
  "aroused",
  "embarrassed",
  "worried",
  "love",
  "determined",
  "hurt",
  "playful",
]);

export const NovelAiAugmentToolSchema = z.enum([
  "bg-removal",
  "declutter",
  "declutter-keep-bubbles",
  "lineart",
  "sketch",
  "colorize",
  "emotion",
]);
export type NovelAiAugmentTool = z.infer<typeof NovelAiAugmentToolSchema>;

export const NovelAiAugmentRequestSchema = z
  .strictObject({
    ...BaseImageGenerationRequestFields,
    provider_id: z.literal("novelai"),
    action: z.literal("augment"),
    tool: NovelAiAugmentToolSchema,
    /** Must already be `width` × `height`. */
    image_asset_id: AssetIdSchema,
    width: z.number().int().min(64).max(8192),
    height: z.number().int().min(64).max(8192),
    tool_prompt: z.string().trim().max(1_000).optional(),
    emotion: NovelAiEmotionSchema.optional(),
    defry: z.number().int().min(0).max(5).optional(),
    output_count: z.literal(1),
  })
  .check((context) => {
    check_pixel_budget(context);
    const { tool, emotion, defry, tool_prompt } = context.value;
    if (tool === "emotion" && emotion === undefined) {
      context.issues.push({
        code: "custom",
        input: context.value,
        message: "the emotion tool requires an emotion",
        path: ["emotion"],
      });
    }
    if (tool !== "emotion" && emotion !== undefined) {
      context.issues.push({
        code: "custom",
        input: emotion,
        message: "emotion only applies to the emotion tool",
        path: ["emotion"],
      });
    }
    const takes_prompt = tool === "colorize" || tool === "emotion";
    if (!takes_prompt && (defry !== undefined || tool_prompt !== undefined)) {
      context.issues.push({
        code: "custom",
        input: context.value,
        message: "tool_prompt and defry only apply to the colorize and emotion tools",
        path: ["tool"],
      });
    }
  });

export const NovelAiRequestSchema = z.discriminatedUnion("action", [
  NovelAiGenerateRequestSchema,
  NovelAiImg2ImgRequestSchema,
  NovelAiInfillRequestSchema,
  NovelAiUpscaleRequestSchema,
  NovelAiAugmentRequestSchema,
]);

export type NovelAiRequest = z.infer<typeof NovelAiRequestSchema>;
export type NovelAiDiffusionRequest = Extract<
  NovelAiRequest,
  { readonly action: "generate" | "img2img" | "infill" }
>;
export type NovelAiCharacterPrompt = z.infer<typeof NovelAiCharacterPromptSchema>;
export type NovelAiVibeReference = z.infer<typeof NovelAiVibeReferenceSchema>;
export type NovelAiCharacterReference = z.infer<typeof NovelAiCharacterReferenceSchema>;

/** NovelAI ignores vibe transfer when a mask or character references are present, so the client never sends it then. */
export function novelai_sends_vibes(request: NovelAiDiffusionRequest): boolean {
  return request.action !== "infill" && (request.character_references?.length ?? 0) === 0;
}

export function is_novelai_diffusion_request(
  request: NovelAiRequest,
): request is NovelAiDiffusionRequest {
  return (
    request.action === "generate" || request.action === "img2img" || request.action === "infill"
  );
}
