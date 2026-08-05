import { z } from "zod";

import { Sha256Schema } from "./generation.js";
import { RequestIdSchema } from "./ids.js";

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

const base_image_generation_request_fields = {
  request_id: RequestIdSchema,
  generation_anchor: Sha256Schema,
  prompt: z.string().trim().min(1).max(12_000),
  negative_prompt: z.string().trim().max(4_000).optional(),
  output_count: z.number().int().min(1).max(4),
};

export const BaseImageGenerationRequestSchema = z.strictObject({
  provider_id: ProviderIdSchema,
  ...base_image_generation_request_fields,
});
export type BaseImageGenerationRequest = z.infer<
  typeof BaseImageGenerationRequestSchema
>;

export const ImageGenerationRequestSchema = z.discriminatedUnion(
  "provider_id",
  [
    z.strictObject({
      provider_id: z.literal("sd_webui"),
      ...base_image_generation_request_fields,
    }),
    z.strictObject({
      provider_id: z.literal("novelai"),
      ...base_image_generation_request_fields,
    }),
    z.strictObject({
      provider_id: z.literal("comfyui"),
      ...base_image_generation_request_fields,
    }),
    z.strictObject({
      provider_id: z.literal("openai_image"),
      ...base_image_generation_request_fields,
    }),
    z.strictObject({
      provider_id: z.literal("google_image"),
      ...base_image_generation_request_fields,
    }),
  ],
);
export type ImageGenerationRequest = z.infer<
  typeof ImageGenerationRequestSchema
>;
