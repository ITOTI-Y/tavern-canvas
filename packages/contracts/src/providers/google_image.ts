import { z } from "zod";

import { AssetIdSchema, BaseImageGenerationRequestFields } from "./common.js";

export const GoogleImageRequestSchema = z.strictObject({
  provider_id: z.literal("google_image"),
  ...BaseImageGenerationRequestFields,
  model_id: z.enum(["gemini-2.5-flash-image", "gemini-3-pro-image-preview"]),
  reference_asset_ids: z.array(AssetIdSchema).max(14),
  aspect_ratio: z.enum(["1:1", "2:3", "3:2", "3:4", "4:3", "4:5", "5:4", "9:16", "16:9", "21:9"]),
  image_size: z.enum(["1K", "2K", "4K"]),
  output_mime_type: z.enum(["image/png", "image/jpeg", "image/webp"]),
});

export type GoogleImageRequest = z.infer<typeof GoogleImageRequestSchema>;
