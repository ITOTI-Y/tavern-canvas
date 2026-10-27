import { describe, expect, it } from "vitest";

import { test_character } from "../wardrobe/wardrobe_test_fixtures.js";
import { assemble_slot_prompt, type SlotPromptPreset } from "./slot_prompt.js";

const PRESET: SlotPromptPreset = {
  fixed_positive_prompt: "masterpiece, best quality",
  fixed_negative_prompt: "lowres, lowres",
  replacement_rules: [{ triggers: ["door"], replacement: "wooden door" }],
  regex_rules: [{ id: "r1", pattern: "night", flags: "g", replacement: "night sky" }],
};

const ALICE = test_character({
  id: "c1",
  name: "Alice",
  appearance: { hair: ["silver hair"], eyes: ["blue eyes"], expression: ["calm"] },
  excluded_traits: ["beard", "beard"],
});

describe("assemble_slot_prompt", () => {
  it("keeps everything in one prompt when nobody is in the picture", () => {
    expect(
      assemble_slot_prompt({
        preset: PRESET,
        library: { characters: [], outfit_names: [] },
        characters: [],
        scene_tags: "door, night, best quality",
      }),
    ).toEqual({
      positive_prompt: "masterpiece, best quality, wooden door, night sky",
      negative_prompt: "lowres",
      character_prompts: [],
    });
  });

  it("gives a library character its appearance, outfit and own action in a character prompt", () => {
    const prompt = assemble_slot_prompt({
      preset: PRESET,
      library: {
        characters: [{ character: ALICE, outfit_tags: ["red gown"] }],
        outfit_names: [],
      },
      characters: [{ name: "alice", tags: "girl, standing, door, smile" }],
      scene_tags: "1girl, night, indoors",
    });

    expect(prompt.positive_prompt).toBe("masterpiece, best quality, 1girl, night sky, indoors");
    expect(prompt.character_prompts).toEqual([
      {
        name: "Alice",
        prompt: "girl, silver hair, blue eyes, red gown, standing, wooden door, smile",
        negative_prompt: "beard",
      },
    ]);
  });

  it("drops outfit names the model echoed as tags, keeping the stored outfit", () => {
    const prompt = assemble_slot_prompt({
      preset: null,
      library: {
        characters: [{ character: ALICE, outfit_tags: ["red gown"] }],
        outfit_names: ["Gala", "Forest cloak"],
      },
      characters: [{ name: "Alice", tags: "forest cloak, wearing gala, waving" }],
      scene_tags: "garden",
    });

    expect(prompt.character_prompts[0]?.prompt).toBe(
      "girl, silver hair, blue eyes, red gown, waving",
    );
  });

  it("counts every character and keeps a non-library character's own description", () => {
    const prompt = assemble_slot_prompt({
      preset: null,
      library: {
        characters: [{ character: ALICE, outfit_tags: [] }],
        outfit_names: [],
      },
      characters: [
        { name: "Alice", tags: "sitting" },
        { name: "Bob", tags: "1boy, black hair, armor, standing" },
      ],
      scene_tags: "2girls, tavern",
    });

    expect(prompt.positive_prompt).toBe("1girl, 1boy, tavern");
    expect(prompt.character_prompts.map((character) => character.prompt)).toEqual([
      "girl, silver hair, blue eyes, sitting",
      "boy, black hair, armor, standing",
    ]);
  });

  it("takes the analysis subject for a library character stored as other", () => {
    const prompt = assemble_slot_prompt({
      preset: null,
      library: {
        characters: [
          {
            character: test_character({ id: "c2", name: "Yu", subject: "other" }),
            outfit_tags: [],
          },
          { character: ALICE, outfit_tags: [] },
        ],
        outfit_names: [],
      },
      characters: [
        { name: "Yu", tags: "boy, standing" },
        { name: "Alice", tags: "boy, sitting" },
      ],
      scene_tags: "corridor",
    });

    expect(prompt.positive_prompt).toBe("1girl, 1boy, corridor");
    expect(prompt.character_prompts.map((character) => character.prompt)).toEqual([
      "boy, standing",
      "girl, silver hair, blue eyes, sitting",
    ]);
  });
});
