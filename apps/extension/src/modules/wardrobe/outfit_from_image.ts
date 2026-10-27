import { OUTFIT_SLOTS, type OutfitSlot } from "@tavern-canvas/contracts";

import type { HostJsonSchema } from "../../host/index.js";
import { json_candidates } from "../illustration/model_json.js";
import { clean_slots, OutfitSchema, slots_schema } from "./scene_update.js";

export interface OutfitTags {
  readonly name: string;
  readonly slots: Readonly<Partial<Record<OutfitSlot, readonly string[]>>>;
}

export const OUTFIT_FROM_IMAGE_JSON_SCHEMA: HostJsonSchema = {
  name: "tavern_canvas_outfit",
  value: {
    type: "object",
    properties: { name: { type: "string" }, slots: slots_schema(OUTFIT_SLOTS) },
    required: ["name", "slots"],
    additionalProperties: false,
  },
};

export const OUTFIT_FROM_IMAGE_INPUT = [
  "[Inkwell outfit from image]",
  "The attached image shows one character. Describe only the clothing and accessories it wears, as visual Danbooru-style English tags for an anime image model, sorted into these slots: full_body (dresses, jumpsuits, swimsuits), outerwear, top, bottom, legwear, footwear, headwear, accessories.",
  "Leave out the body, hair, eyes, expression, pose, and background. Give an empty list for a slot the image does not show, and give the outfit a short descriptive name.",
  'Reply with only a JSON object of the form {"name":"...","slots":{...}}.',
].join("\n");

/** The outfit in the model's reply, with placeholder and empty tags dropped. */
export function parse_outfit_from_image(raw: string): OutfitTags {
  for (const candidate of json_candidates(raw, "slots")) {
    let value: unknown;
    try {
      value = JSON.parse(candidate);
    } catch {
      continue;
    }
    const parsed = OutfitSchema.safeParse(value);
    if (!parsed.success) {
      continue;
    }
    const slots = clean_slots(parsed.data.slots, OUTFIT_SLOTS);
    if (Object.keys(slots).length > 0) {
      return { name: parsed.data.name, slots };
    }
  }
  throw new Error(`The model returned no outfit with clothing tags: ${raw.slice(0, 200)}`);
}
