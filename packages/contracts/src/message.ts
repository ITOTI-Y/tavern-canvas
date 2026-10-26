import { z } from "zod";

import { ImageIdSchema, RequestIdSchema } from "./ids.js";

/** Restricted so the id survives SillyTavern's regex `substituteParams` pass and HTML attribute quoting. */
export const IllustrationSlotIdSchema = z.string().regex(/^[A-Za-z0-9_-]{8,32}$/u);
export type IllustrationSlotId = z.infer<typeof IllustrationSlotIdSchema>;

export const MAX_SLOTS_PER_SWIPE = 16;

/** One NovelAI character prompt; the slot's positive prompt then holds only shared tags. */
export const SlotCharacterPromptSchema = z.strictObject({
  name: z.string().trim().min(1).max(120),
  prompt: z.string().trim().min(1).max(4000),
  negative_prompt: z.string().max(4000),
});
export type SlotCharacterPrompt = z.infer<typeof SlotCharacterPromptSchema>;

export const IllustrationSlotSchema = z.strictObject({
  slot_id: IllustrationSlotIdSchema,
  /** Zero-based index of the paragraph the marker follows when the slot was created. */
  paragraph: z.number().int().min(0),
  anchor: z.string().max(400),
  scene: z.string().max(2000),
  characters: z.array(z.string().trim().min(1).max(120)).max(16),
  positive_prompt: z.string().max(8000),
  negative_prompt: z.string().max(8000),
  character_prompts: z.array(SlotCharacterPromptSchema).max(16),
  image_ids: z.array(ImageIdSchema),
  active_image_id: ImageIdSchema.nullable(),
  pending_request_ids: z.array(RequestIdSchema),
  last_error: z.string().max(500).nullable(),
});
export type IllustrationSlot = z.infer<typeof IllustrationSlotSchema>;

/** Stored under one swipe's `extra.tavern_canvas`; SillyTavern moves it with the swipe. */
export const SwipeIllustrationsSchema = z.strictObject({
  schema_version: z.literal(2),
  slots: z.array(IllustrationSlotSchema).max(MAX_SLOTS_PER_SWIPE),
});
export type SwipeIllustrations = z.infer<typeof SwipeIllustrationsSchema>;
