import { describe, expect, it } from "vitest";

import { assemble_slot_prompt } from "./slot_prompt.js";

const ALICE = { id: "c1", name: "Alice", appearance: "silver hair, blue eyes" };

describe("assemble_slot_prompt", () => {
  it("joins preset tags, matched characters with their outfits and the scene tags, then applies the rules", () => {
    const prompt = assemble_slot_prompt({
      preset: {
        fixed_positive_prompt: "masterpiece, best quality",
        fixed_negative_prompt: "lowres, lowres",
        replacement_rules: [{ triggers: ["door"], replacement: "wooden door" }],
        regex_rules: [{ id: "r1", pattern: "night", flags: "g", replacement: "night sky" }],
      },
      library: {
        characters: [
          {
            character: ALICE,
            outfit: { id: "o1", name: "Gala", description: "red gown", character_id: "c1" },
          },
        ],
        loose_outfits: [{ id: "o2", name: "Cape", description: "black cape", character_id: null }],
      },
      scene_tags: "1girl, door, night, best quality",
    });

    expect(prompt).toEqual({
      positive_prompt:
        "masterpiece, best quality, silver hair, blue eyes, red gown, black cape, 1girl, wooden door, night sky",
      negative_prompt: "lowres",
    });
  });

  it("uses only the scene tags without a preset or library match", () => {
    expect(
      assemble_slot_prompt({
        preset: null,
        library: { characters: [], loose_outfits: [] },
        scene_tags: "1boy",
      }),
    ).toEqual({ positive_prompt: "1boy", negative_prompt: "" });
  });
});
