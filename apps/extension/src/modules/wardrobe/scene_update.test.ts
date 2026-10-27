import type { Wearing } from "@tavern-canvas/contracts";
import { describe, expect, it } from "vitest";

import {
  apply_scene_update,
  build_scene_update_input,
  parse_scene_update,
  type SceneUpdateEntry,
  type WardrobeLibrary,
} from "./scene_update.js";
import { test_character, test_outfit } from "./wardrobe_test_fixtures.js";
import { replace_outfit_tags } from "./wearing.js";

const LIBRARY: WardrobeLibrary = {
  characters: [
    test_character({
      id: "c1",
      name: "Seraphina",
      appearance: { hair: ["pink hair"] },
      locked_fields: ["eyes"],
    }),
  ],
  outfits: [
    test_outfit({
      id: "o1",
      name: "Forest cloak",
      character_id: "c1",
      slots: { outerwear: ["green cloak"], top: ["white dress"] },
    }),
    test_outfit({
      id: "o2",
      name: "Nightgown",
      character_id: "c1",
      slots: { full_body: ["nightgown"] },
    }),
  ],
};

function entry(fields: Partial<SceneUpdateEntry> & { readonly name: string }): SceneUpdateEntry {
  return {
    ref: null,
    new_character: null,
    appearance_additions: null,
    wearing_changed: false,
    outfit_id: null,
    new_outfit: null,
    overrides: [],
    conditions: [],
    ...fields,
  };
}

let sequence = 0;
const new_id = () => `new-${String((sequence += 1))}`;

describe("apply_scene_update", () => {
  it("keeps the previous wearing when the reply changes nothing", () => {
    const previous: Wearing[] = [
      { character_id: "c1", outfit_id: "o1", overrides: {}, conditions: ["wet clothes"] },
    ];
    const applied = apply_scene_update(
      [entry({ ref: "c1", name: "Seraphina" })],
      previous,
      LIBRARY,
      new_id,
    );
    expect(applied.wearing).toEqual(previous);
  });

  it("switches outfits, takes a slot off and replaces the passing states", () => {
    const applied = apply_scene_update(
      [
        entry({
          ref: "c1",
          name: "Seraphina",
          wearing_changed: true,
          outfit_id: "o1",
          overrides: [{ slot: "outerwear", tags: [], removed: true }],
          conditions: ["messy hair"],
        }),
      ],
      [{ character_id: "c1", outfit_id: "o2", overrides: {}, conditions: ["wet clothes"] }],
      LIBRARY,
      new_id,
    );
    expect(applied.wearing).toEqual([
      {
        character_id: "c1",
        outfit_id: "o1",
        overrides: { outerwear: "removed" },
        conditions: ["messy hair"],
      },
    ]);
  });

  it("creates a named character with its outfit and makes that outfit the default", () => {
    sequence = 0;
    const applied = apply_scene_update(
      [
        entry({
          name: "Kael",
          new_character: {
            subject: "boy",
            aliases: ["Kael", "the ranger"],
            appearance: { hair: ["black hair"], features: ["scar on cheek"] },
          },
          new_outfit: { name: "Ranger gear", slots: { outerwear: ["dark green cloak"] } },
        }),
      ],
      [],
      LIBRARY,
      new_id,
    );
    expect(applied.new_characters).toEqual([
      {
        id: "new-1",
        name: "Kael",
        aliases: ["the ranger"],
        subject: "boy",
        appearance: { hair: ["black hair"], features: ["scar on cheek"] },
        default_outfit_id: "new-2",
      },
    ]);
    expect(applied.new_outfits).toEqual([
      {
        id: "new-2",
        name: "Ranger gear",
        character_id: "new-1",
        slots: { outerwear: ["dark green cloak"] },
      },
    ]);
    expect(applied.wearing).toEqual([
      { character_id: "new-1", outfit_id: "new-2", overrides: {}, conditions: [] },
    ]);
  });

  it("fills only empty, unlocked appearance slots of a known character", () => {
    const applied = apply_scene_update(
      [
        entry({
          name: "seraphina",
          appearance_additions: { hair: ["blonde hair"], eyes: ["red eyes"], makeup: ["lipstick"] },
        }),
      ],
      [],
      LIBRARY,
      new_id,
    );
    expect(applied.appearance_additions).toEqual([
      { character_id: "c1", slots: { makeup: ["lipstick"] } },
    ]);
  });

  it("records the first outfit of a known character even when nothing changed", () => {
    sequence = 0;
    const library: WardrobeLibrary = {
      characters: [test_character({ id: "c2", name: "Kael", subject: "boy" })],
      outfits: [],
    };
    const applied = apply_scene_update(
      [
        entry({
          name: "Kael",
          new_outfit: { name: "Ranger gear", slots: { top: ["leather armor"] } },
        }),
      ],
      [],
      library,
      new_id,
    );
    expect(applied.new_outfits).toEqual([
      { id: "new-1", name: "Ranger gear", character_id: "c2", slots: { top: ["leather armor"] } },
    ]);
    expect(applied.wearing).toEqual([
      { character_id: "c2", outfit_id: "new-1", overrides: {}, conditions: [] },
    ]);
  });

  it("ignores an id that belongs to another character and drops placeholder tags", () => {
    sequence = 0;
    const applied = apply_scene_update(
      [
        entry({
          ref: "c1",
          name: "Yu",
          appearance_additions: { age: ["unknown"], skin: ["pale skin"], makeup: ["none"] },
        }),
      ],
      [],
      LIBRARY,
      new_id,
    );
    expect(applied.appearance_additions).toEqual([]);
    expect(applied.new_characters).toEqual([
      {
        id: "new-1",
        name: "Yu",
        aliases: [],
        subject: "other",
        appearance: { skin: ["pale skin"] },
        default_outfit_id: null,
      },
    ]);
  });
});

describe("parse_scene_update", () => {
  it("reads the JSON object out of reasoning and fills missing fields", () => {
    const raw = `<think>hmm</think>\n\`\`\`json\n${JSON.stringify({ characters: [{ ref: "c1", name: "Seraphina" }] })}\n\`\`\``;
    expect(parse_scene_update(raw)).toEqual([entry({ ref: "c1", name: "Seraphina" })]);
  });
});

describe("build_scene_update_input", () => {
  it("lists what each character wears and which appearance slots are still open", () => {
    const input = build_scene_update_input(
      "Change for bed.",
      "Seraphina slips into her nightgown.",
      [{ character_id: "c1", outfit_id: "o1", overrides: {}, conditions: [] }],
      LIBRARY,
    );
    expect(input).toContain(
      "- id c1: Seraphina; wears outfit o1 (Forest cloak): green cloak, white dress",
    );
    expect(input).toContain(
      "appearance slots still empty: age, body, skin, makeup, expression, features",
    );
    expect(input).toContain("- id o2: Nightgown (Seraphina): nightgown");
    expect(input).toContain("Latest user message:\nChange for bed.");
  });
});

describe("replace_outfit_tags", () => {
  it("swaps the old outfit tags where they stood and keeps the rest", () => {
    expect(
      replace_outfit_tags(
        "girl, pink hair, green cloak, white dress, smile",
        ["green cloak", "white dress"],
        ["nightgown"],
      ),
    ).toBe("girl, pink hair, nightgown, smile");
  });
});
