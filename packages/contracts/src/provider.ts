import { z } from "zod";

import { Sha256Schema } from "./generation.js";
import { AssetIdSchema, RequestIdSchema } from "./ids.js";
import { BaseImageGenerationRequestFields, ProviderSeedSchema } from "./providers/common.js";
import {
  ComfyUiRequestSchema,
  GoogleImageRequestSchema,
  NovelAiRequestSchema,
  OpenAiImageRequestSchema,
  SdWebuiRequestSchema,
} from "./providers/index.js";

export const ProviderIdSchema = z.enum([
  "sd_webui",
  "novelai",
  "comfyui",
  "openai_image",
  "google_image",
]);
export type ProviderId = z.infer<typeof ProviderIdSchema>;

export const ProviderCapabilitySchema = z.enum([
  "text_to_image",
  "image_to_image",
  "reference_image",
  "progress",
  "cancel",
  "seed",
  "workflow",
  "streaming_result",
]);
export type ProviderCapability = z.infer<typeof ProviderCapabilitySchema>;

export const ProviderErrorCodeSchema = z.enum([
  "auth_failed",
  "rate_limited",
  "content_blocked",
  "invalid_request",
  "provider_unavailable",
  "timed_out",
  "cancelled",
  "malformed_response",
]);
export type ProviderErrorCode = z.infer<typeof ProviderErrorCodeSchema>;

export const ProviderErrorSchema = z.strictObject({
  code: ProviderErrorCodeSchema,
  retryable: z.boolean(),
  retry_after_ms: z.number().int().nonnegative().optional(),
  status_code: z.number().int().min(100).max(599).optional(),
});
export type ProviderError = z.infer<typeof ProviderErrorSchema>;

export const BaseImageGenerationRequestSchema = z.strictObject({
  provider_id: ProviderIdSchema,
  ...BaseImageGenerationRequestFields,
});
export type BaseImageGenerationRequest = z.infer<typeof BaseImageGenerationRequestSchema>;

export const ImageGenerationRequestSchema = z.discriminatedUnion("provider_id", [
  SdWebuiRequestSchema,
  NovelAiRequestSchema,
  ComfyUiRequestSchema,
  OpenAiImageRequestSchema,
  GoogleImageRequestSchema,
]);
export type ImageGenerationRequest = z.infer<typeof ImageGenerationRequestSchema>;

export const GeneratedAssetSchema = z.strictObject({
  asset_id: AssetIdSchema,
  media_type: z.enum(["image/png", "image/jpeg", "image/webp", "video/mp4"]),
  byte_length: z.number().int().positive().max(100_000_000),
  sha256: Sha256Schema,
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  duration_ms: z.number().int().positive().optional(),
  persisted_url: z.url().optional(),
});
export type GeneratedAsset = z.infer<typeof GeneratedAssetSchema>;

export const ImageGenerationResultSchema = z.strictObject({
  request_id: RequestIdSchema,
  provider_id: ProviderIdSchema,
  assets: z.array(GeneratedAssetSchema).min(1).max(4),
  seed: ProviderSeedSchema.optional(),
});
export type ImageGenerationResult = z.infer<typeof ImageGenerationResultSchema>;
