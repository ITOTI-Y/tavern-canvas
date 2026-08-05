import { z } from "zod";

export const CapabilityIdSchema = z
  .string()
  .regex(/^[a-z][a-z0-9_]*$/u)
  .max(100);
export type CapabilityId = z.infer<typeof CapabilityIdSchema>;

export const CapabilityStatusSchema = z.strictObject({
  available: z.boolean(),
  reason: z.string().trim().min(1).max(200).optional(),
});
export type CapabilityStatus = z.infer<typeof CapabilityStatusSchema>;

export const CapabilityMatrixSchema = z.record(CapabilityIdSchema, CapabilityStatusSchema);
export type CapabilityMatrix = z.infer<typeof CapabilityMatrixSchema>;
