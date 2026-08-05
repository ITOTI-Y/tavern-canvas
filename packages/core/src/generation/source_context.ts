import { Sha256Schema } from "@tavern-canvas/contracts";
import { z } from "zod";

export const SourceContextSchema = z.strictObject({
  schema_version: z.literal(1),
  chat_id: z.string().min(1).max(512),
  active_swipes: z.array(
    z.object({
      message_id: z.number().int().nonnegative(),
      swipe_id: z.number().int().nonnegative(),
    }),
  ),
  messages: z.array(
    z.object({
      message_id: z.number().int().nonnegative(),
      role: z.enum(["user", "assistant", "system"]),
      content_sha256: Sha256Schema,
      swipe_id: z.number().int().nonnegative().nullable(),
    }),
  ),
});

export type SourceContext = z.infer<typeof SourceContextSchema>;
