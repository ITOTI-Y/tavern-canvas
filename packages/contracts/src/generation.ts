import { z } from "zod";

import { UuidSchema } from "./ids.js";

export const Sha256Schema = z.string().regex(/^[a-f0-9]{64}$/u);
export type Sha256 = z.infer<typeof Sha256Schema>;

export const RequestImageArgumentsSchema = z.strictObject({
  generation_anchor: Sha256Schema,
  scene_description: z.string().trim().min(1).max(12_000),
  negative_constraints: z.string().trim().max(4_000).optional(),
  context_turns: z.number().int().min(0).max(12).optional(),
  style_preset_id: UuidSchema.optional(),
  image_count: z.number().int().min(1).max(4).optional(),
});

export type RequestImageArguments = z.infer<typeof RequestImageArgumentsSchema>;

export const GenerationStateSchema = z.enum([
  "queued",
  "preparing",
  "submitting",
  "running",
  "completed",
  "failed",
  "cancelled",
  "attached",
  "orphaned",
]);

export type GenerationState = z.infer<typeof GenerationStateSchema>;
