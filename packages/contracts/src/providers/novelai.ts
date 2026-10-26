import { z } from "zod";

import {
  AssetIdSchema,
  BaseImageGenerationRequestFields,
  ProviderIdentifierSchema,
  ProviderSeedSchema,
} from "./common.js";

const NovelAiDimensionSchema = z.number().int().min(64).max(2048).multipleOf(64);

export const NovelAiVibeReferenceSchema = z.strictObject({
  asset_id: AssetIdSchema,
  strength: z.number().min(0).max(1),
  information_extracted: z.number().min(0).max(1),
});

export const NovelAiCharacterReferenceSchema = z.strictObject({
  asset_id: AssetIdSchema,
  prompt: z.string().trim().min(1).max(4_000),
  strength: z.number().min(0).max(1),
});

export const NovelAiRequestSchema = z
  .strictObject({
    provider_id: z.literal("novelai"),
    ...BaseImageGenerationRequestFields,
    model_id: ProviderIdentifierSchema,
    sampler: z.enum(["k_euler", "k_euler_ancestral", "k_dpmpp_2m", "k_dpmpp_sde", "ddim_v3"]),
    width: NovelAiDimensionSchema,
    height: NovelAiDimensionSchema,
    steps: z.number().int().min(1).max(50),
    scale: z.number().min(0).max(30),
    cfg_rescale: z.number().min(0).max(1),
    noise_schedule: z.enum(["native", "karras", "exponential", "polyexponential"]),
    seed: ProviderSeedSchema.optional(),
    quality_toggle: z.boolean(),
    undesired_content_preset: z.enum(["heavy", "light", "human_focus", "none"]),
    smea: z.boolean(),
    dyn: z.boolean(),
    vibe_references: z.array(NovelAiVibeReferenceSchema).max(4).optional(),
    character_references: z.array(NovelAiCharacterReferenceSchema).max(6).optional(),
    // Optional inpaint fields: `action` defaults to plain generation; "infill" is NovelAI's masked
    // inpaint action and requires `image_asset_id` and `mask_asset_id`.
    action: z.enum(["generate", "infill"]).optional(),
    image_asset_id: AssetIdSchema.optional(),
    mask_asset_id: AssetIdSchema.optional(),
    inpaint_strength: z.number().min(0).max(1).optional(),
  })
  .check((context) => {
    const is_infill = context.value.action === "infill";
    if (
      is_infill &&
      (context.value.image_asset_id === undefined || context.value.mask_asset_id === undefined)
    ) {
      context.issues.push({
        code: "custom",
        input: context.value,
        message: "infill requires both image_asset_id and mask_asset_id",
        path: ["action"],
      });
    }
    if (!is_infill && context.value.image_asset_id !== undefined) {
      context.issues.push({
        code: "custom",
        input: context.value.image_asset_id,
        message: "image_asset_id only applies to the infill action",
        path: ["image_asset_id"],
      });
    }
    if (!is_infill && context.value.mask_asset_id !== undefined) {
      context.issues.push({
        code: "custom",
        input: context.value.mask_asset_id,
        message: "mask_asset_id only applies to the infill action",
        path: ["mask_asset_id"],
      });
    }
    if (!is_infill && context.value.inpaint_strength !== undefined) {
      context.issues.push({
        code: "custom",
        input: context.value.inpaint_strength,
        message: "inpaint_strength only applies to the infill action",
        path: ["inpaint_strength"],
      });
    }
  });

export type NovelAiRequest = z.infer<typeof NovelAiRequestSchema>;
