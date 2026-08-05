import { z } from "zod";

import { Sha256Schema } from "../generation.js";
import { AssetIdSchema, RequestIdSchema } from "../ids.js";

export const MAX_PROVIDER_SEED = 4_294_967_295;

export const ProviderIdentifierSchema = z
  .string()
  .trim()
  .min(1)
  .max(128)
  .regex(/^[A-Za-z0-9][A-Za-z0-9+._/ -]*$/u);

export const ProviderSeedSchema = z.number().int().min(0).max(MAX_PROVIDER_SEED);

export const ProviderDimensionSchema = z.number().int().min(64).max(4096).multipleOf(8);

export const BaseImageGenerationRequestFields = {
  request_id: RequestIdSchema,
  generation_anchor: Sha256Schema,
  prompt: z.string().trim().min(1).max(12_000),
  negative_prompt: z.string().trim().max(4_000).optional(),
  output_count: z.number().int().min(1).max(4),
} as const;

export { AssetIdSchema };
