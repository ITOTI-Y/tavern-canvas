import { z } from "zod";

import { AssetIdSchema, BaseImageGenerationRequestFields } from "./common.js";

export const OpenAiImageRequestSchema = z
  .strictObject({
    provider_id: z.literal("openai_image"),
    ...BaseImageGenerationRequestFields,
    mode: z.enum(["generate", "edit"]),
    model_id: z.enum(["gpt-image-1", "gpt-image-1-mini"]),
    size: z.enum(["auto", "1024x1024", "1536x1024", "1024x1536"]),
    quality: z.enum(["auto", "low", "medium", "high"]),
    background: z.enum(["auto", "opaque", "transparent"]),
    output_format: z.enum(["png", "jpeg", "webp"]),
    compression: z.number().int().min(0).max(100).optional(),
    input_asset_ids: z.array(AssetIdSchema).max(16),
    mask_asset_id: AssetIdSchema.optional(),
  })
  .check((context) => {
    if (context.value.mode === "edit" && context.value.input_asset_ids.length === 0) {
      context.issues.push({
        code: "custom",
        input: context.value.input_asset_ids,
        message: "edit mode requires at least one input asset",
        path: ["input_asset_ids"],
      });
    }
    if (context.value.mode === "generate" && context.value.input_asset_ids.length > 0) {
      context.issues.push({
        code: "custom",
        input: context.value.input_asset_ids,
        message: "generate mode does not accept input assets",
        path: ["input_asset_ids"],
      });
    }
    if (context.value.mode === "generate" && context.value.mask_asset_id !== undefined) {
      context.issues.push({
        code: "custom",
        input: context.value.mask_asset_id,
        message: "generate mode does not accept a mask asset",
        path: ["mask_asset_id"],
      });
    }
    if (context.value.output_format === "png" && context.value.compression !== undefined) {
      context.issues.push({
        code: "custom",
        input: context.value.compression,
        message: "compression applies only to jpeg and webp output",
        path: ["compression"],
      });
    }
  });

export type OpenAiImageRequest = z.infer<typeof OpenAiImageRequestSchema>;
