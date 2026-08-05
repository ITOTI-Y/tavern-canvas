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
