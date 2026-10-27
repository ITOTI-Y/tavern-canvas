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

export function slots_schema(slots: readonly string[]): Record<string, unknown> {
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

const OUTFIT_OBJECT = {
  type: "object",
  properties: { name: { type: "string" }, slots: slots_schema(OUTFIT_SLOTS) },
  required: ["name", "slots"],
  additionalProperties: false,
} as const;

const CHARACTERS_SCHEMA = {
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
          outfit: OUTFIT_OBJECT,
        },
        required: ["subject", "aliases", "appearance", "outfit"],
        additionalProperties: false,
      }),
      appearance_additions: nullable(slots_schema(APPEARANCE_SLOTS)),
      subject: { type: ["string", "null"], enum: ["girl", "boy", null] },
      wearing_changed: { type: "boolean" },
      outfit_id: { type: ["string", "null"] },
      new_outfit: nullable(OUTFIT_OBJECT),
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
      "subject",
      "wearing_changed",
      "outfit_id",
      "new_outfit",
      "overrides",
      "conditions",
    ],
    additionalProperties: false,
  },
};

/**
 * Strict mode has no conditional requirements, so the outfits that must be returned are built into
 * the schema: a new character carries its outfit, and `initial_outfits` requires one key per known
 * character the reply names who has no outfit yet.
 */
export function scene_update_json_schema(needs_outfit: readonly string[]): HostJsonSchema {
  return {
    name: "tavern_canvas_wardrobe",
    value: {
      type: "object",
      properties: {
        characters: CHARACTERS_SCHEMA,
        initial_outfits: {
          type: "object",
          properties: Object.fromEntries(needs_outfit.map((id) => [id, OUTFIT_OBJECT])),
          required: [...needs_outfit],
          additionalProperties: false,
        },
      },
      required: ["characters", "initial_outfits"],
      additionalProperties: false,
    },
  };
}

const Tags = z.array(z.string()).catch([]);

function slot_record<T extends string>(slots: readonly T[]) {
  return z.object(
    Object.fromEntries(slots.map((slot) => [slot, Tags.default([])])),
  ) as unknown as z.ZodType<Partial<Record<T, string[]>>>;
}

export const OutfitSchema = z.object({
  name: z.string().trim().min(1).max(120),
  slots: slot_record(OUTFIT_SLOTS),
});
export type SceneOutfit = z.infer<typeof OutfitSchema>;

const EntrySchema = z.object({
  ref: z.string().nullable().catch(null),
  name: z.string().trim().min(1).max(120),
  new_character: z
    .object({
      subject: z.enum(["girl", "boy", "other"]).catch("other"),
      aliases: Tags.default([]),
      appearance: slot_record(APPEARANCE_SLOTS).default({}),
      outfit: OutfitSchema.nullable().catch(null),
    })
    .nullable()
    .catch(null),
  appearance_additions: slot_record(APPEARANCE_SLOTS).nullable().catch(null),
  subject: z.enum(["girl", "boy"]).nullable().catch(null),
  wearing_changed: z.boolean().catch(false),
  outfit_id: z.string().nullable().catch(null),
  new_outfit: OutfitSchema.nullable().catch(null),
  overrides: z
    .array(z.object({ slot: OutfitSlotSchema, tags: Tags.default([]), removed: z.boolean() }))
    .catch([]),
  conditions: Tags.default([]),
});
export type SceneUpdateEntry = z.infer<typeof EntrySchema>;

const OutputSchema = z.object({
  characters: z.array(EntrySchema).max(32),
  initial_outfits: z.record(z.string(), OutfitSchema.nullable().catch(null)).catch({}),
});
export interface SceneUpdate {
  readonly characters: readonly SceneUpdateEntry[];
  /** Keyed by the id of a known character that had no outfit. */
  readonly initial_outfits: Readonly<Record<string, SceneOutfit | null>>;
}

export class SceneUpdateParseError extends Error {
  constructor(raw: string) {
    super(`The wardrobe reply contains no characters JSON object: ${raw.slice(0, 200)}`);
    this.name = "SceneUpdateParseError";
  }
}

export function parse_scene_update(raw: string): SceneUpdate {
  for (const candidate of json_candidates(raw, "characters")) {
    let value: unknown;
    try {
      value = JSON.parse(candidate);
    } catch {
      continue;
    }
    const parsed = OutputSchema.safeParse(value);
    if (parsed.success) {
      return parsed.data;
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
    outfit === undefined
      ? "; outfit not yet known"
      : `; wears outfit ${outfit.id} (${outfit.name}): ${join_tags(wearing_tags(wearing, library.outfits))}`,
    empty.length > 0 ? `; appearance slots still empty: ${empty.join(", ")}` : "",
    character.subject === "other" ? "; subject not yet known" : "",
  ].join("");
}

/** Known characters the reply names who wear no outfit yet; the update must give each one. */
export function characters_needing_outfit(
  reply: string,
  snapshot: readonly Wearing[],
  library: WardrobeLibrary,
): readonly WardrobeCharacter[] {
  return library.characters.filter(
    (character) =>
      wearing_of(character, snapshot, library.outfits).outfit_id === null &&
      [character.name, ...character.aliases].some((name) => mentions(reply, name)),
  );
}

export function build_scene_update_input(
  user_message: string | null,
  reply: string,
  snapshot: readonly Wearing[],
  library: WardrobeLibrary,
): string {
  const owner = new Map(library.characters.map((character) => [character.id, character.name]));
  const needs_outfit = characters_needing_outfit(reply, snapshot, library);
  return [
    "[Inkwell wardrobe update]",
    "Track what each named character wears across the story. Read the latest reply and return one entry for every named character who appears in it or is clearly present. Skip unnamed people.",
    "- ref: the id listed for this exact character below, or null for a named character not listed; never another character's id",
    "- name: the name as written in the story",
    "- new_character: only when ref is null: subject (see Subject), aliases (other names used for them), appearance tags per slot taken from what the story states, and outfit: what they wear now (see Outfit choice); otherwise null",
    "- appearance_additions: for a known character, tags for the appearance slots listed as still empty, only when the reply states them; otherwise null",
    "- subject: for a known character whose subject is not yet known, girl or boy when the story shows it; otherwise null",
    "Subject: girl for a woman or girl, boy for a man or boy, judged from pronouns such as 他 / 她 or he / she, how others address them, the name and the description. other only for a character without a gender, such as a creature or a machine.",
    "- wearing_changed: true only when the reply changes what the character wears or their passing state; when false the other wearing fields are ignored",
    "- outfit_id: the known outfit now worn, or null with new_outfit filled for clothing that matches no known outfit",
    "- overrides: slots of that outfit the reply changes, with the new tags, or removed true when taken off",
    "- conditions: the complete list of visible passing states of clothing or body now in effect, such as wet clothes, torn sleeve or messy hair; moods, actions and illness are not conditions; an empty list clears them",
    "All tags are visual Danbooru-style English tags for an anime image model. Leave a slot out, or give it an empty list, when the story does not state it; never write placeholders such as unknown or none. Appearance slots: age, body, skin, hair, eyes, makeup, expression, features (species traits such as pointy ears belong in features). Outfit slots: full_body, outerwear, top, bottom, legwear, footwear, headwear, accessories.",
    "initial_outfits: one entry per id listed under Outfits needed, giving what that character wears now (see Outfit choice); an empty object when none are listed.",
    "Outfit choice: take the clothing from the story, else from the character description; when neither states it, choose plausible clothing for the character's role, the setting and the era. Fill at least the top and bottom, or full_body, and give the outfit a short descriptive name.",
    'Reply with only a JSON object of the form {"characters":[...],"initial_outfits":{...}}. Use an empty array when no named character appears.',
    "",
    ...(needs_outfit.length === 0
      ? []
      : [
          "Outfits needed (decide each one now; empty slots are not an answer):",
          ...needs_outfit.map((character) => `- id ${character.id}: ${character.name}`),
          "",
        ]),
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
  /** Set only when the library had the subject as other. */
  readonly subject: "girl" | "boy" | null;
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

export function clean_slots<T extends string>(
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
  update: SceneUpdate,
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
  /** `null` when the outfit has no tags left, so an empty answer creates nothing. */
  const add_outfit = (outfit: SceneOutfit, character_id: string): string | null => {
    const slots = clean_slots(outfit.slots, OUTFIT_SLOTS);
    if (Object.keys(slots).length === 0) {
      return null;
    }
    const id = new_id();
    new_outfits.push({ id, name: outfit.name, character_id, slots });
    return id;
  };

  for (const entry of update.characters) {
    const known = find_known(entry, library.characters);
    let character_id: string;
    if (known !== undefined) {
      character_id = known.id;
      const fillable = APPEARANCE_SLOTS.filter(
        (slot) => known.appearance[slot].length === 0 && !known.locked_fields.includes(slot),
      );
      const slots = clean_slots(entry.appearance_additions, fillable);
      const subject = known.subject === "other" ? entry.subject : null;
      if (Object.keys(slots).length > 0 || subject !== null) {
        appearance_additions.push({ character_id, slots, subject });
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
    const first =
      prior.outfit_id === null ? (entry.new_outfit ?? entry.new_character?.outfit ?? null) : null;
    if (!entry.wearing_changed) {
      const outfit_id = first === null ? null : add_outfit(first, character_id);
      wearing.set(character_id, outfit_id === null ? prior : { ...prior, outfit_id });
      continue;
    }
    let outfit_id = known_outfit(entry.outfit_id) ? entry.outfit_id : prior.outfit_id;
    const introduced = entry.new_outfit ?? first;
    if (introduced !== null) {
      outfit_id = add_outfit(introduced, character_id) ?? outfit_id;
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

  for (const [character_id, outfit] of Object.entries(update.initial_outfits)) {
    const character = library.characters.find((candidate) => candidate.id === character_id);
    if (character === undefined || outfit === null) {
      continue;
    }
    const current = wearing.get(character_id) ?? initial_wearing(character, library.outfits);
    const outfit_id = current.outfit_id === null ? add_outfit(outfit, character_id) : null;
    if (outfit_id !== null) {
      wearing.set(character_id, { ...current, outfit_id });
    }
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
