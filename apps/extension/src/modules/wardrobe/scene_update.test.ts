import type { Wearing } from "@tavern-canvas/contracts";
import { describe, expect, it } from "vitest";

import {
  apply_scene_update,
  build_scene_update_input,
  characters_needing_outfit,
  parse_scene_update,
  scene_update_json_schema,
  type SceneUpdate,
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
    subject: null,
    wearing_changed: false,
    outfit_id: null,
    new_outfit: null,
    overrides: [],
    conditions: [],
    ...fields,
  };
}

function update(...characters: SceneUpdateEntry[]): SceneUpdate {
  return { characters, initial_outfits: {} };
}

let sequence = 0;
const new_id = () => `new-${String((sequence += 1))}`;

describe("apply_scene_update", () => {
  it("keeps the previous wearing when the reply changes nothing", () => {
    const previous: Wearing[] = [
      { character_id: "c1", outfit_id: "o1", overrides: {}, conditions: ["wet clothes"] },
    ];
    const applied = apply_scene_update(
      update(entry({ ref: "c1", name: "Seraphina" })),
      previous,
      LIBRARY,
      new_id,
    );
    expect(applied.wearing).toEqual(previous);
  });

  it("switches outfits, takes a slot off and replaces the passing states", () => {
    const applied = apply_scene_update(
      update(
        entry({
          ref: "c1",
          name: "Seraphina",
          wearing_changed: true,
          outfit_id: "o1",
          overrides: [{ slot: "outerwear", tags: [], removed: true }],
          conditions: ["messy hair"],
        }),
      ),
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
      update(
        entry({
          name: "Kael",
          new_character: {
            subject: "boy",
            aliases: ["Kael", "the ranger"],
            appearance: { hair: ["black hair"], features: ["scar on cheek"] },
            outfit: { name: "Ranger gear", slots: { outerwear: ["dark green cloak"] } },
          },
        }),
      ),
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
      update(
        entry({
          name: "seraphina",
          appearance_additions: { hair: ["blonde hair"], eyes: ["red eyes"], makeup: ["lipstick"] },
        }),
      ),
      [],
      LIBRARY,
      new_id,
    );
    expect(applied.appearance_additions).toEqual([
      { character_id: "c1", slots: { makeup: ["lipstick"] }, subject: null },
    ]);
  });

  it("corrects only a subject the library holds as other", () => {
    const library: WardrobeLibrary = {
      characters: [
        test_character({ id: "c4", name: "Chen", subject: "other" }),
        test_character({ id: "c5", name: "Ye", subject: "girl" }),
      ],
      outfits: [],
    };
    const applied = apply_scene_update(
      update(
        entry({ ref: "c4", name: "Chen", subject: "girl" }),
        entry({ ref: "c5", name: "Ye", subject: "boy" }),
      ),
      [],
      library,
      new_id,
    );
    expect(applied.appearance_additions).toEqual([
      { character_id: "c4", slots: {}, subject: "girl" },
    ]);
  });

  it("gives a known character without an outfit the initial outfit the model returned", () => {
    sequence = 0;
    const library: WardrobeLibrary = {
      characters: [
        test_character({ id: "c2", name: "Kael", subject: "boy" }),
        test_character({ id: "c3", name: "Mira" }),
      ],
      outfits: [],
    };
    const applied = apply_scene_update(
      {
        characters: [entry({ ref: "c2", name: "Kael" })],
        initial_outfits: {
          c2: { name: "Ranger gear", slots: { top: ["leather armor"] } },
          c3: { name: "Nothing", slots: { top: ["unknown"] } },
        },
      },
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

  it("keeps a listed id when the story uses a shorter or fuller form of the name", () => {
    const library: WardrobeLibrary = {
      characters: [test_character({ id: "c6", name: "林小雨" })],
      outfits: [test_outfit({ id: "o6", name: "Uniform", character_id: "c6", slots: {} })],
    };
    const applied = apply_scene_update(
      update(entry({ ref: "c6", name: "小雨" }), entry({ name: "小雨的妈妈" })),
      [],
      library,
      new_id,
    );
    expect(applied.new_characters.map((character) => character.name)).toEqual(["小雨的妈妈"]);
    expect(applied.wearing[0]).toEqual({
      character_id: "c6",
      outfit_id: "o6",
      overrides: {},
      conditions: [],
    });
  });

  it("reuses a known outfit that the model describes again tag for tag", () => {
    const applied = apply_scene_update(
      update(
        entry({
          ref: "c1",
          name: "Seraphina",
          wearing_changed: true,
          new_outfit: {
            name: "Cloak and dress",
            slots: { top: ["White dress"], outerwear: ["green cloak"] },
          },
        }),
      ),
      [],
      LIBRARY,
      new_id,
    );
    expect(applied.new_outfits).toEqual([]);
    expect(applied.wearing).toEqual([
      { character_id: "c1", outfit_id: "o1", overrides: {}, conditions: [] },
    ]);
  });

  it("keeps a known character's outfit on its first appearance in the chat", () => {
    sequence = 0;
    const changed = entry({
      ref: "c1",
      name: "Seraphina",
      wearing_changed: true,
      new_outfit: { name: "Worn sweater", slots: { top: ["sweater"], bottom: ["jeans"] } },
      conditions: ["torn clothes"],
    });

    const first = apply_scene_update(update(changed), [], LIBRARY, new_id);
    expect(first.new_outfits).toEqual([]);
    expect(first.wearing).toEqual([
      { character_id: "c1", outfit_id: "o1", overrides: {}, conditions: ["torn clothes"] },
    ]);

    const later = apply_scene_update(update(changed), first.wearing, LIBRARY, new_id);
    expect(later.new_outfits.map((outfit) => outfit.name)).toEqual(["Worn sweater"]);
    expect(later.wearing[0]?.outfit_id).toBe("new-1");
  });

  it("ignores an id that belongs to another character and drops placeholder tags", () => {
    sequence = 0;
    const applied = apply_scene_update(
      update(
        entry({
          ref: "c1",
          name: "Yu",
          appearance_additions: { age: ["unknown"], skin: ["pale skin"], makeup: ["none"] },
        }),
      ),
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
    expect(parse_scene_update(raw)).toEqual({
      characters: [entry({ ref: "c1", name: "Seraphina" })],
      initial_outfits: {},
    });
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

describe("initial outfits", () => {
  it("requires an outfit for each named character that wears none yet", () => {
    const library: WardrobeLibrary = {
      characters: [
        ...LIBRARY.characters,
        test_character({ id: "c2", name: "Kael", aliases: ["the ranger"] }),
        test_character({ id: "c3", name: "Mira" }),
      ],
      outfits: LIBRARY.outfits,
    };
    const reply = "The ranger nods to Seraphina.";
    expect(characters_needing_outfit(reply, [], library).map((character) => character.id)).toEqual([
      "c2",
    ]);
    expect(build_scene_update_input(null, reply, [], library)).toContain(
      "empty slots are not an answer):\n- id c2: Kael",
    );
    expect(scene_update_json_schema(["c2"]).value).toMatchObject({
      required: ["characters", "initial_outfits"],
      properties: { initial_outfits: { required: ["c2"] } },
    });
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
