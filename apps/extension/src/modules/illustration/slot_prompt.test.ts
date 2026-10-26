import { describe, expect, it } from "vitest";

import { assemble_slot_prompt } from "./slot_prompt.js";

describe("assemble_slot_prompt", () => {
  it("joins preset tags, the named characters' appearance and the scene tags, then applies the rules", () => {
    const prompt = assemble_slot_prompt({
      preset: {
        fixed_positive_prompt: "masterpiece, best quality",
        fixed_negative_prompt: "lowres, lowres",
        replacement_rules: [{ triggers: ["door"], replacement: "wooden door" }],
        regex_rules: [{ id: "r1", pattern: "night", flags: "g", replacement: "night sky" }],
      },
      characters: ["alice", "Stranger"],
      appearances: [
        { name: "Alice", appearance: "silver hair, blue eyes" },
        { name: "Bob", appearance: "beard" },
      ],
      scene_tags: "1girl, door, night, best quality",
    });

    expect(prompt).toEqual({
      positive_prompt:
        "masterpiece, best quality, silver hair, blue eyes, 1girl, wooden door, night sky",
      negative_prompt: "lowres",
    });
  });

  it("uses only the scene tags without a preset", () => {
    expect(
      assemble_slot_prompt({ preset: null, characters: [], appearances: [], scene_tags: "1boy" }),
    ).toEqual({ positive_prompt: "1boy", negative_prompt: "" });
  });
});
