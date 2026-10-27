import {
  APPEARANCE_SLOTS,
  OUTFIT_SLOTS,
  OutfitSlotSchema,
  type AppearanceSlot,
  type OutfitSlot,
  type Wearing,
} from "@tavern-canvas/contracts";
import { z } from "zod";

import type { HostJsonSchema } from "../../host/index.js";
import { mentions } from "../illustration/library_match.js";
import { json_candidates } from "../illustration/model_json.js";
import {
  join_tags,
  type CharacterSubject,
  type WardrobeCharacter,
  type WardrobeOutfit,
} from "./wardrobe_library.js";
import { initial_wearing, wearing_of, wearing_tags } from "./wearing.js";

const TAG_ARRAY = { type: "array", items: { type: "string" } } as const;

function slots_schema(slots: readonly string[]): Record<string, unknown> {
  return {
    type: "object",
    properties: Object.fromEntries(slots.map((slot) => [slot, TAG_ARRAY])),
    required: [...slots],
    additionalProperties: false,
  };
}

function nullable(schema: Record<string, unknown>): Record<string, unknown> {
  return { anyOf: [schema, { type: "null" }] };
}

export const SCENE_UPDATE_JSON_SCHEMA: HostJsonSchema = {
  name: "tavern_canvas_wardrobe",
  value: {
    type: "object",
    properties: {
      characters: {
        type: "array",
        items: {
          type: "object",
          properties: {
            ref: { type: ["string", "null"] },
            name: { type: "string" },
            new_character: nullable({
              type: "object",
              properties: {
                subject: { type: "string", enum: ["girl", "boy", "other"] },
                aliases: TAG_ARRAY,
                appearance: slots_schema(APPEARANCE_SLOTS),
              },
              required: ["subject", "aliases", "appearance"],
              additionalProperties: false,
            }),
            appearance_additions: nullable(slots_schema(APPEARANCE_SLOTS)),
            wearing_changed: { type: "boolean" },
            outfit_id: { type: ["string", "null"] },
            new_outfit: nullable({
              type: "object",
              properties: { name: { type: "string" }, slots: slots_schema(OUTFIT_SLOTS) },
              required: ["name", "slots"],
              additionalProperties: false,
            }),
            overrides: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  slot: { type: "string", enum: [...OUTFIT_SLOTS] },
                  tags: TAG_ARRAY,
                  removed: { type: "boolean" },
                },
                required: ["slot", "tags", "removed"],
                additionalProperties: false,
              },
            },
            conditions: TAG_ARRAY,
          },
          required: [
            "ref",
            "name",
            "new_character",
            "appearance_additions",
            "wearing_changed",
            "outfit_id",
            "new_outfit",
            "overrides",
            "conditions",
          ],
          additionalProperties: false,
        },
      },
    },
    required: ["characters"],
    additionalProperties: false,
  },
};

const Tags = z.array(z.string()).catch([]);

function slot_record<T extends string>(slots: readonly T[]) {
  return z.object(
    Object.fromEntries(slots.map((slot) => [slot, Tags.default([])])),
  ) as unknown as z.ZodType<Partial<Record<T, string[]>>>;
}

const EntrySchema = z.object({
  ref: z.string().nullable().catch(null),
  name: z.string().trim().min(1).max(120),
  new_character: z
    .object({
      subject: z.enum(["girl", "boy", "other"]).catch("other"),
      aliases: Tags.default([]),
      appearance: slot_record(APPEARANCE_SLOTS).default({}),
    })
    .nullable()
    .catch(null),
  appearance_additions: slot_record(APPEARANCE_SLOTS).nullable().catch(null),
  wearing_changed: z.boolean().catch(false),
  outfit_id: z.string().nullable().catch(null),
  new_outfit: z
    .object({ name: z.string().trim().min(1).max(120), slots: slot_record(OUTFIT_SLOTS) })
    .nullable()
    .catch(null),
  overrides: z
    .array(z.object({ slot: OutfitSlotSchema, tags: Tags.default([]), removed: z.boolean() }))
    .catch([]),
  conditions: Tags.default([]),
});
export type SceneUpdateEntry = z.infer<typeof EntrySchema>;

const OutputSchema = z.object({ characters: z.array(EntrySchema).max(32) });

export class SceneUpdateParseError extends Error {
  constructor(raw: string) {
    super(`The wardrobe reply contains no characters JSON object: ${raw.slice(0, 200)}`);
    this.name = "SceneUpdateParseError";
  }
}

export function parse_scene_update(raw: string): readonly SceneUpdateEntry[] {
  for (const candidate of json_candidates(raw, "characters")) {
    let value: unknown;
    try {
      value = JSON.parse(candidate);
    } catch {
      continue;
    }
    const parsed = OutputSchema.safeParse(value);
    if (parsed.success) {
      return parsed.data.characters;
    }
  }
  throw new SceneUpdateParseError(raw);
}

export interface WardrobeLibrary {
  readonly characters: readonly WardrobeCharacter[];
  readonly outfits: readonly WardrobeOutfit[];
}

function describe_character(
  character: WardrobeCharacter,
  snapshot: readonly Wearing[],
  library: WardrobeLibrary,
): string {
  const wearing = wearing_of(character, snapshot, library.outfits);
  const outfit = library.outfits.find((candidate) => candidate.id === wearing.outfit_id);
  const empty = APPEARANCE_SLOTS.filter(
    (slot) => character.appearance[slot].length === 0 && !character.locked_fields.includes(slot),
  );
  return [
    `- id ${character.id}: ${character.name}`,
    character.aliases.length > 0 ? `, also called ${character.aliases.join(" / ")}` : "",
    `; wears ${outfit === undefined ? "nothing recorded" : `outfit ${outfit.id} (${outfit.name})`}`,
    `: ${join_tags(wearing_tags(wearing, library.outfits)) || "no tags"}`,
    empty.length > 0 ? `; appearance slots still empty: ${empty.join(", ")}` : "",
  ].join("");
}

export function build_scene_update_input(
  user_message: string | null,
  reply: string,
  snapshot: readonly Wearing[],
  library: WardrobeLibrary,
): string {
  const owner = new Map(library.characters.map((character) => [character.id, character.name]));
  return [
    "[Inkwell wardrobe update]",
    "Track what each named character wears across the story. Read the latest reply and return one entry for every named character who appears in it or is clearly present. Skip unnamed people.",
    "- ref: the id listed for this exact character below, or null for a named character not listed; never another character's id",
    "- name: the name as written in the story",
    "- new_character: only when ref is null: subject (girl, boy or other), aliases (other names used for them) and appearance tags per slot taken from what the story states; otherwise null",
    "- appearance_additions: for a known character, tags for the appearance slots listed as still empty, only when the reply states them; otherwise null",
    "- wearing_changed: true only when the reply changes what the character wears or their passing state; when false the other wearing fields are ignored",
    "- outfit_id: the known outfit now worn, or null with new_outfit filled for clothing that matches no known outfit",
    "- new_outfit: also fill it, even when wearing_changed is false, for a new character or one that wears nothing recorded, with the clothing the story or the character description gives them; otherwise null",
    "- overrides: slots of that outfit the reply changes, with the new tags, or removed true when taken off",
    "- conditions: the complete list of visible passing states of clothing or body now in effect, such as wet clothes, torn sleeve or messy hair; moods, actions and illness are not conditions; an empty list clears them",
    "All tags are visual Danbooru-style English tags for an anime image model. Leave a slot out, or give it an empty list, when the story does not state it; never write placeholders such as unknown or none. Appearance slots: age, body, skin, hair, eyes, makeup, expression, features (species traits such as pointy ears belong in features). Outfit slots: full_body, outerwear, top, bottom, legwear, footwear, headwear, accessories.",
    'Reply with only a JSON object of the form {"characters":[...]}. Use an empty array when no named character appears.',
    "",
    "Known characters:",
    ...(library.characters.length === 0
      ? ["(none)"]
      : library.characters.map((character) => describe_character(character, snapshot, library))),
    "",
    "Known outfits:",
    ...(library.outfits.length === 0
      ? ["(none)"]
      : library.outfits.map((outfit) => {
          const worn_by = outfit.character_id === null ? null : owner.get(outfit.character_id);
          return `- id ${outfit.id}: ${outfit.name}${worn_by === null || worn_by === undefined ? "" : ` (${worn_by})`}: ${join_tags(OUTFIT_SLOTS.flatMap((slot) => outfit.slots[slot]))}`;
        })),
    "",
    ...(user_message === null ? [] : ["Latest user message:", user_message, ""]),
    "Latest reply:",
    reply,
  ].join("\n");
}

export interface CharacterDraft {
  readonly id: string;
  readonly name: string;
  readonly aliases: readonly string[];
  readonly subject: CharacterSubject;
  readonly appearance: Readonly<Partial<Record<AppearanceSlot, readonly string[]>>>;
  readonly default_outfit_id: string | null;
}

export interface OutfitDraft {
  readonly id: string;
  readonly name: string;
  readonly character_id: string;
  readonly slots: Readonly<Partial<Record<OutfitSlot, readonly string[]>>>;
}

export interface AppearanceAddition {
  readonly character_id: string;
  readonly slots: Readonly<Partial<Record<AppearanceSlot, readonly string[]>>>;
}

export interface AppliedSceneUpdate {
  readonly wearing: readonly Wearing[];
  readonly new_characters: readonly CharacterDraft[];
  readonly new_outfits: readonly OutfitDraft[];
  readonly appearance_additions: readonly AppearanceAddition[];
}

const PLACEHOLDER_TAGS = new Set(["unknown", "none", "n/a", "null", "unspecified"]);

function clean_tags(tags: readonly string[]): string[] {
  return [
    ...new Set(
      tags
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "" && !PLACEHOLDER_TAGS.has(tag.toLowerCase())),
    ),
  ];
}

function clean_slots<T extends string>(
  slots: Partial<Record<T, string[]>> | null,
  allowed: readonly T[],
): Partial<Record<T, readonly string[]>> {
  const result: Partial<Record<T, readonly string[]>> = {};
  for (const slot of allowed) {
    const tags = clean_tags(slots?.[slot] ?? []);
    if (tags.length > 0) {
      result[slot] = tags;
    }
  }
  return result;
}

function is_called(character: WardrobeCharacter, name: string): boolean {
  return [character.name, ...character.aliases].some(
    (candidate) => mentions(name, candidate) && mentions(candidate, name),
  );
}

/** Models sometimes pair a name with another character's id, so the id counts only when the name agrees. */
function find_known(
  entry: SceneUpdateEntry,
  characters: readonly WardrobeCharacter[],
): WardrobeCharacter | undefined {
  const by_ref = characters.find((character) => character.id === entry.ref);
  return by_ref !== undefined && is_called(by_ref, entry.name)
    ? by_ref
    : characters.find((character) => is_called(character, entry.name));
}

/**
 * Turns the model's entries into the reply's wardrobe snapshot and the library entries to create.
 * Characters the reply leaves out keep their previous wearing; appearance additions only fill
 * slots that are empty and unlocked.
 */
export function apply_scene_update(
  entries: readonly SceneUpdateEntry[],
  previous: readonly Wearing[],
  library: WardrobeLibrary,
  new_id: () => string,
): AppliedSceneUpdate {
  const wearing = new Map(previous.map((item) => [item.character_id, item]));
  const new_characters: CharacterDraft[] = [];
  const new_outfits: OutfitDraft[] = [];
  const appearance_additions: AppearanceAddition[] = [];
  const known_outfit = (id: string | null) =>
    library.outfits.some((outfit) => outfit.id === id) ||
    new_outfits.some((outfit) => outfit.id === id);

  for (const entry of entries) {
    const known = find_known(entry, library.characters);
    let character_id: string;
    if (known !== undefined) {
      character_id = known.id;
      const fillable = APPEARANCE_SLOTS.filter(
        (slot) => known.appearance[slot].length === 0 && !known.locked_fields.includes(slot),
      );
      const slots = clean_slots(entry.appearance_additions, fillable);
      if (Object.keys(slots).length > 0) {
        appearance_additions.push({ character_id, slots });
      }
    } else {
      const created = entry.new_character ?? {
        subject: "other" as const,
        aliases: [],
        appearance: entry.appearance_additions ?? {},
      };
      character_id = new_id();
      new_characters.push({
        id: character_id,
        name: entry.name,
        aliases: created.aliases.filter((alias) => alias.trim() !== entry.name),
        subject: created.subject,
        appearance: clean_slots(created.appearance, APPEARANCE_SLOTS),
        default_outfit_id: null,
      });
    }

    const prior =
      wearing.get(character_id) ??
      (known === undefined
        ? { character_id, outfit_id: null, overrides: {}, conditions: [] }
        : initial_wearing(known, library.outfits));
    const first_outfit = prior.outfit_id === null && entry.new_outfit !== null;
    if (!entry.wearing_changed && !first_outfit) {
      wearing.set(character_id, prior);
      continue;
    }
    let outfit_id = known_outfit(entry.outfit_id) ? entry.outfit_id : prior.outfit_id;
    if (entry.new_outfit !== null) {
      outfit_id = new_id();
      new_outfits.push({
        id: outfit_id,
        name: entry.new_outfit.name,
        character_id,
        slots: clean_slots(entry.new_outfit.slots, OUTFIT_SLOTS),
      });
    }
    const overrides: Wearing["overrides"] = {};
    for (const override of entry.overrides) {
      overrides[override.slot] = override.removed ? "removed" : clean_tags(override.tags);
    }
    wearing.set(character_id, {
      character_id,
      outfit_id,
      overrides,
      conditions: clean_tags(entry.conditions),
    });
  }

  const created = new Map(new_outfits.map((outfit) => [outfit.character_id, outfit.id]));
  return {
    wearing: [...wearing.values()],
    new_characters: new_characters.map((character) => ({
      ...character,
      default_outfit_id: created.get(character.id) ?? null,
    })),
    new_outfits,
    appearance_additions,
  };
}
