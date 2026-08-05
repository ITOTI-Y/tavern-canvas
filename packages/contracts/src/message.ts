import { z } from "zod";

import { Sha256Schema } from "./generation.js";
import { ImageIdSchema, RequestIdSchema } from "./ids.js";

export const TavernCanvasMessageMetadataSchema = z
  .strictObject({
    schema_version: z.literal(1),
    generation_anchor: Sha256Schema,
    source_anchor: Sha256Schema,
    request_ids: z.array(RequestIdSchema),
    image_ids: z.array(ImageIdSchema),
  })
  .check((context) => {
    if (new Set(context.value.request_ids).size !== context.value.request_ids.length) {
      context.issues.push({
        code: "custom",
        input: context.value.request_ids,
        message: "request_ids must not contain duplicates",
        path: ["request_ids"],
      });
    }

    if (new Set(context.value.image_ids).size !== context.value.image_ids.length) {
      context.issues.push({
        code: "custom",
        input: context.value.image_ids,
        message: "image_ids must not contain duplicates",
        path: ["image_ids"],
      });
    }
  });

export type TavernCanvasMessageMetadata = z.infer<typeof TavernCanvasMessageMetadataSchema>;
