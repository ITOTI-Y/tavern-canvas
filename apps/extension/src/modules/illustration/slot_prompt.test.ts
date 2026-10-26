import { describe, expect, it } from "vitest";

import { assemble_slot_prompt, type SlotPromptPreset } from "./slot_prompt.js";

const PRESET: SlotPromptPreset = {
  fixed_positive_prompt: "masterpiece, best quality",
  fixed_negative_prompt: "lowres, lowres",
  replacement_rules: [{ triggers: ["door"], replacement: "wooden door" }],
  regex_rules: [{ id: "r1", pattern: "night", flags: "g", replacement: "night sky" }],
};

const ALICE = { id: "c1", name: "Alice", appearance: "1girl, silver hair, blue eyes" };
const GALA = { id: "o1", name: "Gala", description: "red gown", character_id: "c1" };

describe("assemble_slot_prompt", () => {
  it("keeps everything in one prompt when nobody is in the picture", () => {
    expect(
      assemble_slot_prompt({
        preset: PRESET,
        library: { characters: [], loose_outfits: [] },
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
      library: { characters: [{ character: ALICE, outfit: GALA }], loose_outfits: [] },
      characters: [{ name: "alice", tags: "girl, standing, door, smile" }],
      scene_tags: "1girl, night, indoors",
    });

    expect(prompt.positive_prompt).toBe("masterpiece, best quality, 1girl, night sky, indoors");
    expect(prompt.character_prompts).toEqual([
      {
        name: "Alice",
        prompt: "girl, silver hair, blue eyes, red gown, standing, wooden door, smile",
        negative_prompt: "",
      },
    ]);
  });

  it("counts every character and keeps a non-library character's own description", () => {
    const prompt = assemble_slot_prompt({
      preset: null,
      library: { characters: [{ character: ALICE, outfit: null }], loose_outfits: [] },
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
});
