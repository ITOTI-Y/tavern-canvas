import { z } from "zod";

const lowercase_uuid_pattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/u;

export const UuidSchema = z.uuid().regex(lowercase_uuid_pattern);
export type Uuid = z.infer<typeof UuidSchema>;

export const RequestIdSchema = UuidSchema;
export type RequestId = z.infer<typeof RequestIdSchema>;

export const ImageIdSchema = UuidSchema;
export type ImageId = z.infer<typeof ImageIdSchema>;

export const AssetIdSchema = UuidSchema;
export type AssetId = z.infer<typeof AssetIdSchema>;

export const JobIdSchema = UuidSchema;
export type JobId = z.infer<typeof JobIdSchema>;

/**
 * A handle into the host secret vault, never the secret itself. The `tavern_canvas:` prefix is
 * what makes "someone pasted a raw provider key into this field" a schema failure rather than a
 * silent plaintext write, and it matches `derive_secret_reference`'s migration-side format so
 * every path -- provider profiles, LLM connections, the Gateway token -- addresses the same vault
 * entries through one validated shape.
 */
export const VaultReferenceSchema = z
  .string()
  .min(1)
  .max(256)
  .regex(/^tavern_canvas:[A-Za-z0-9_.:-]+$/u);
export type VaultReference = z.infer<typeof VaultReferenceSchema>;
