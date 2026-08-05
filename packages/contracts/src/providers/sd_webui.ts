import { z } from "zod";

import {
  AssetIdSchema,
  BaseImageGenerationRequestFields,
  ProviderDimensionSchema,
  ProviderIdentifierSchema,
  ProviderSeedSchema,
} from "./common.js";

export const SdWebuiHiresFixSchema = z.strictObject({
  scale: z.number().min(1).max(4),
  upscaler_id: ProviderIdentifierSchema,
  steps: z.number().int().min(1).max(150),
  denoise_strength: z.number().min(0).max(1),
});

export const SdWebuiAdetailerSchema = z.strictObject({
  model_id: ProviderIdentifierSchema,
  prompt: z.string().trim().max(4_000).optional(),
  negative_prompt: z.string().trim().max(4_000).optional(),
  confidence: z.number().min(0).max(1).optional(),
  mask_blur: z.number().int().min(0).max(64).optional(),
  denoise_strength: z.number().min(0).max(1).optional(),
});

export const SdWebuiControlNetReferenceSchema = z
  .strictObject({
    asset_id: AssetIdSchema,
    model_id: ProviderIdentifierSchema,
    module: ProviderIdentifierSchema,
    weight: z.number().min(0).max(2),
    guidance_start: z.number().min(0).max(1),
    guidance_end: z.number().min(0).max(1),
    control_mode: z.enum(["balanced", "prompt", "control"]).optional(),
    resize_mode: z.enum(["resize", "crop_and_resize", "resize_and_fill"]).optional(),
  })
  .check((context) => {
    if (context.value.guidance_start > context.value.guidance_end) {
      context.issues.push({
        code: "custom",
        input: context.value,
        message: "guidance_start must not exceed guidance_end",
        path: ["guidance_start"],
      });
    }
  });

export const SdWebuiLoraTokenSchema = z.strictObject({
  lora_id: ProviderIdentifierSchema,
  weight: z.number().min(-2).max(2),
});

export const SdWebuiRequestSchema = z
  .strictObject({
    provider_id: z.literal("sd_webui"),
    ...BaseImageGenerationRequestFields,
    mode: z.enum(["txt2img", "img2img"]),
    model_id: ProviderIdentifierSchema,
    vae_id: ProviderIdentifierSchema.optional(),
    sampler: ProviderIdentifierSchema,
    scheduler: ProviderIdentifierSchema,
    width: ProviderDimensionSchema,
    height: ProviderDimensionSchema,
    steps: z.number().int().min(1).max(150),
    cfg_scale: z.number().min(0).max(30),
    seed: ProviderSeedSchema.optional(),
    input_asset_id: AssetIdSchema.optional(),
    denoise_strength: z.number().min(0).max(1).optional(),
    hires_fix: SdWebuiHiresFixSchema.optional(),
    adetailer: z.array(SdWebuiAdetailerSchema).max(4).optional(),
    controlnet: z.array(SdWebuiControlNetReferenceSchema).max(4).optional(),
    lora_tokens: z.array(SdWebuiLoraTokenSchema).max(16).optional(),
  })
  .check((context) => {
    const is_img2img = context.value.mode === "img2img";
    if (is_img2img && context.value.hires_fix !== undefined) {
      context.issues.push({
        code: "custom",
        input: context.value.hires_fix,
        message: "img2img does not accept hires_fix",
        path: ["hires_fix"],
      });
    }
    if (is_img2img && context.value.input_asset_id === undefined) {
      context.issues.push({
        code: "custom",
        input: context.value,
        message: "img2img requires input_asset_id",
        path: ["input_asset_id"],
      });
    }
    if (is_img2img && context.value.denoise_strength === undefined) {
      context.issues.push({
        code: "custom",
        input: context.value,
        message: "img2img requires denoise_strength",
        path: ["denoise_strength"],
      });
    }
    if (!is_img2img && context.value.input_asset_id !== undefined) {
      context.issues.push({
        code: "custom",
        input: context.value.input_asset_id,
        message: "txt2img does not accept input_asset_id",
        path: ["input_asset_id"],
      });
    }
    if (!is_img2img && context.value.denoise_strength !== undefined) {
      context.issues.push({
        code: "custom",
        input: context.value.denoise_strength,
        message: "txt2img does not accept denoise_strength",
        path: ["denoise_strength"],
      });
    }
  });

export type SdWebuiRequest = z.infer<typeof SdWebuiRequestSchema>;
