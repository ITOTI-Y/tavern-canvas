import { z } from "zod";

import {
  AssetIdSchema,
  BaseImageGenerationRequestFields,
  ProviderIdentifierSchema,
  ProviderSeedSchema,
} from "./common.js";

export const ComfyUiPlaceholderValueSchema = z.union([
  z.string().max(4_000),
  z.number(),
  z.boolean(),
]);

const ComfyUiPlaceholderValuesSchema = z
  .record(ProviderIdentifierSchema, ComfyUiPlaceholderValueSchema)
  .check((context) => {
    if (Object.keys(context.value).length > 64) {
      context.issues.push({
        code: "custom",
        input: context.value,
        message: "placeholder_values must contain at most 64 entries",
      });
    }
  });

const ComfyUiInputAssetBindingsSchema = z
  .record(ProviderIdentifierSchema, AssetIdSchema)
  .check((context) => {
    if (Object.keys(context.value).length > 16) {
      context.issues.push({
        code: "custom",
        input: context.value,
        message: "input_asset_bindings must contain at most 16 entries",
      });
    }
  });

export const ComfyUiRequestSchema = z
  .strictObject({
    provider_id: z.literal("comfyui"),
    ...BaseImageGenerationRequestFields,
    workflow_id: AssetIdSchema,
    placeholder_values: ComfyUiPlaceholderValuesSchema,
    input_asset_bindings: ComfyUiInputAssetBindingsSchema,
    output_node_ids: z.array(ProviderIdentifierSchema).min(1).max(16),
    seed: ProviderSeedSchema.optional(),
  })
  .check((context) => {
    if (new Set(context.value.output_node_ids).size !== context.value.output_node_ids.length) {
      context.issues.push({
        code: "custom",
        input: context.value.output_node_ids,
        message: "output_node_ids must not contain duplicates",
        path: ["output_node_ids"],
      });
    }
  });

export type ComfyUiRequest = z.infer<typeof ComfyUiRequestSchema>;
