import { APPEARANCE_SLOTS, OUTFIT_SLOTS, type AppearanceSlot } from "@tavern-canvas/contracts";
import { z } from "zod";

import type { HostJsonSchema } from "../../host/index.js";
import { json_candidates } from "../illustration/model_json.js";
import type { OutfitTags } from "./outfit_from_image.js";
import { clean_slots, OutfitSchema, slot_record, slots_schema } from "./scene_update.js";
import type { CharacterSubject } from "./wardrobe_library.js";

export interface CharacterTags {
  readonly subject: CharacterSubject;
  readonly appearance: Readonly<Partial<Record<AppearanceSlot, readonly string[]>>>;
  /** `null` when the image shows no clothing, such as a close-up of the face. */
  readonly outfit: OutfitTags | null;
}

export const CHARACTER_FROM_IMAGE_JSON_SCHEMA: HostJsonSchema = {
  name: "tavern_canvas_character",
  value: {
    type: "object",
    properties: {
      subject: { type: "string", enum: ["girl", "boy", "other"] },
      appearance: slots_schema(APPEARANCE_SLOTS),
      outfit: {
        type: "object",
        properties: { name: { type: "string" }, slots: slots_schema(OUTFIT_SLOTS) },
        required: ["name", "slots"],
        additionalProperties: false,
      },
    },
    required: ["subject", "appearance", "outfit"],
    additionalProperties: false,
  },
};

export const CHARACTER_FROM_IMAGE_INPUT = [
  "[Inkwell character from image]",
  "The attached image shows one character. Describe how they look as visual Danbooru-style English tags for an anime image model.",
  "- subject: girl for a woman or girl, boy for a man or boy, other only for a character without a gender, such as a creature or a machine",
  "- appearance: tags per slot: age, body, skin, hair (length, color, style), eyes (color, shape), makeup, expression, features (species traits such as pointy ears, scars, tattoos)",
  "- outfit: the clothing and accessories worn, sorted into these slots: full_body (dresses, jumpsuits, swimsuits), outerwear, top, bottom, legwear, footwear, headwear, accessories; give the outfit a short descriptive name",
  "Leave out the pose, the background and the art style. Give an empty list for a slot the image does not show; never write placeholders such as unknown or none.",
  'Reply with only a JSON object of the form {"subject":"...","appearance":{...},"outfit":{"name":"...","slots":{...}}}.',
].join("\n");

const CharacterSchema = z.object({
  subject: z.enum(["girl", "boy", "other"]).catch("other"),
  appearance: slot_record(APPEARANCE_SLOTS).catch({}),
  outfit: OutfitSchema.nullable().catch(null),
});

/** The character in the model's reply, with placeholder and empty tags dropped. */
export function parse_character_from_image(raw: string): CharacterTags {
  for (const candidate of json_candidates(raw, "appearance")) {
    let value: unknown;
    try {
      value = JSON.parse(candidate);
    } catch {
      continue;
    }
    const parsed = CharacterSchema.safeParse(value);
    if (!parsed.success) {
      continue;
    }
    const appearance = clean_slots(parsed.data.appearance, APPEARANCE_SLOTS);
    const outfit_slots = clean_slots(parsed.data.outfit?.slots ?? null, OUTFIT_SLOTS);
    const outfit =
      parsed.data.outfit === null || Object.keys(outfit_slots).length === 0
        ? null
        : { name: parsed.data.outfit.name, slots: outfit_slots };
    if (Object.keys(appearance).length > 0 || outfit !== null) {
      return { subject: parsed.data.subject, appearance, outfit };
    }
  }
  throw new Error(`The model returned no character tags: ${raw.slice(0, 200)}`);
}
