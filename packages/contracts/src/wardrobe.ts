import { z } from "zod";

export const OUTFIT_SLOTS = [
  "full_body",
  "outerwear",
  "top",
  "bottom",
  "legwear",
  "footwear",
  "headwear",
  "accessories",
] as const;
export const OutfitSlotSchema = z.enum(OUTFIT_SLOTS);
export type OutfitSlot = z.infer<typeof OutfitSlotSchema>;

export const APPEARANCE_SLOTS = [
  "age",
  "body",
  "skin",
  "hair",
  "eyes",
  "makeup",
  "expression",
  "features",
] as const;
export const AppearanceSlotSchema = z.enum(APPEARANCE_SLOTS);
export type AppearanceSlot = z.infer<typeof AppearanceSlotSchema>;

const TagListSchema = z.array(z.string().trim().min(1).max(120)).max(64);

/** What one character wears at the end of a reply: a base outfit, slot changes and passing states. */
export const WearingSchema = z.strictObject({
  character_id: z.string().min(1).max(64),
  outfit_id: z.string().min(1).max(64).nullable(),
  /** A slot's replacement tags, or `removed` when the character took that part off. */
  overrides: z.partialRecord(OutfitSlotSchema, z.union([TagListSchema, z.literal("removed")])),
  /** States that pass, such as wet clothes or messy hair; kept until a later reply clears them. */
  conditions: TagListSchema,
});
export type Wearing = z.infer<typeof WearingSchema>;

/** Stored under one swipe's `extra.tavern_canvas_wardrobe`; later replies inherit it. */
export const SwipeWardrobeSchema = z.strictObject({
  schema_version: z.literal(1),
  wearing: z.array(WearingSchema).max(64),
});
export type SwipeWardrobe = z.infer<typeof SwipeWardrobeSchema>;
