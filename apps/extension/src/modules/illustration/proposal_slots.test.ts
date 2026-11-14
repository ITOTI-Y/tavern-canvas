import { describe, expect, it } from "vitest";

import { proposal_slots } from "./proposal_slots.js";

const CONTEXT = { preset: null, library: { characters: [], outfits: [], loras: [] } };

describe("proposal_slots", () => {
  it("ends the prompt with the caption as one part and keeps each character's place", () => {
    const [slot] = proposal_slots(
      [{ index: 0, text: "Three wolves close in on her at the river.", line: 0 }],
      [
        {
          paragraph: 0,
          scene: "Wolves surround her",
          caption: "a girl stands in a river, facing three wolves on the bank",
          tags: "river, forest",
          characters: [
            {
              name: "Lin",
              tags: "girl, holding staff, target#threatening",
              center: { x: 0.5, y: 0.7 },
            },
            { name: "wolf 1", tags: "other, wolf, source#threatening", center: { x: 0.1, y: 0.3 } },
          ],
        },
      ],
      CONTEXT,
      [],
      () => "slot_0001",
    );

    expect(slot?.positive_prompt).toBe(
      "1girl, 1other, river, forest, a girl stands in a river facing three wolves on the bank",
    );
    expect(slot?.character_prompts).toEqual([
      expect.objectContaining({ name: "Lin", center: { x: 0.5, y: 0.7 } }),
      expect.objectContaining({ name: "wolf 1", center: { x: 0.1, y: 0.3 } }),
    ]);
  });
});
