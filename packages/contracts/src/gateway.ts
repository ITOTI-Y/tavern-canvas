import { z } from "zod";

import { GenerationStateSchema } from "./generation.js";
import { ImageIdSchema, JobIdSchema, RequestIdSchema } from "./ids.js";
import {
  ImageGenerationRequestSchema,
  ProviderCapabilitySchema,
  ProviderErrorSchema,
  ProviderIdSchema,
} from "./provider.js";

export const PROTOCOL_VERSION = "1.0" as const;
const ProtocolVersionSchema = z.literal(PROTOCOL_VERSION);

export const GatewayCreateJobRequestSchema = z.strictObject({
  protocol_version: ProtocolVersionSchema,
  request: ImageGenerationRequestSchema,
});
export type GatewayCreateJobRequest = z.infer<
  typeof GatewayCreateJobRequestSchema
>;

export const GatewayJobResponseSchema = z.strictObject({
  protocol_version: ProtocolVersionSchema,
  job_id: JobIdSchema,
  request_id: RequestIdSchema,
  provider_id: ProviderIdSchema,
  state: GenerationStateSchema,
  image_ids: z.array(ImageIdSchema).optional(),
  error: ProviderErrorSchema.optional(),
});
export type GatewayJobResponse = z.infer<typeof GatewayJobResponseSchema>;

export const GatewayJobEventSchema = z.strictObject({
  protocol_version: ProtocolVersionSchema,
  job_id: JobIdSchema,
  sequence: z.number().int().positive(),
  state: GenerationStateSchema,
  occurred_at: z.iso.datetime({ offset: false }),
  image_ids: z.array(ImageIdSchema).optional(),
  error: ProviderErrorSchema.optional(),
});
export type GatewayJobEvent = z.infer<typeof GatewayJobEventSchema>;

export const GatewayProviderCapabilitiesSchema = z.strictObject({
  provider_id: ProviderIdSchema,
  capabilities: z.array(ProviderCapabilitySchema),
});
export type GatewayProviderCapabilities = z.infer<
  typeof GatewayProviderCapabilitiesSchema
>;

export const GatewayLimitsSchema = z.strictObject({
  max_concurrency: z.number().int().positive(),
  max_image_count: z.number().int().min(1).max(4),
  max_request_bytes: z.number().int().positive(),
});
export type GatewayLimits = z.infer<typeof GatewayLimitsSchema>;

export const GatewayCapabilitiesResponseSchema = z.strictObject({
  protocol_version: ProtocolVersionSchema,
  providers: z.array(GatewayProviderCapabilitiesSchema),
  limits: GatewayLimitsSchema,
});
export type GatewayCapabilitiesResponse = z.infer<
  typeof GatewayCapabilitiesResponseSchema
>;
