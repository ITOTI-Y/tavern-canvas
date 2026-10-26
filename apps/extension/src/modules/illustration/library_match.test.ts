import { describe, expect, it } from "vitest";

import { match_library, mentions, type SlotLibrary } from "./library_match.js";

const LIBRARY: SlotLibrary = {
  characters: [
    { id: "c1", name: "Ann", appearance: "red hair" },
    { id: "c2", name: "小雪", appearance: "white hair" },
  ],
  outfits: [
    { id: "o1", name: "School uniform", description: "serafuku", character_id: "c1" },
    { id: "o2", name: "Ball gown", description: "ball gown", character_id: "c1" },
    { id: "o3", name: "Raincoat", description: "yellow raincoat", character_id: null },
  ],
};

describe("mentions", () => {
  it("matches Latin names as whole words and CJK names as substrings", () => {
    expect(mentions("Then ann smiled.", "Ann")).toBe(true);
    expect(mentions("Anna smiled.", "Ann")).toBe(false);
    expect(mentions("小雪笑了。", "小雪")).toBe(true);
  });
});

describe("match_library", () => {
  it("uses the outfit named in the text, else the character's first linked outfit", () => {
    const named = match_library("Ann wore her ball gown.", [], LIBRARY);
    expect(named.characters.map((entry) => [entry.character.id, entry.outfit?.id])).toEqual([
      ["c1", "o2"],
    ]);

    const fallback = match_library("Ann waved.", [], LIBRARY);
    expect(fallback.characters[0]?.outfit?.id).toBe("o1");
  });

  it("adds characters the analysis reported even when the text does not name them", () => {
    const match = match_library("She waved.", ["ann"], LIBRARY);
    expect(match.characters.map((entry) => entry.character.id)).toEqual(["c1"]);
  });

  it("keeps a named outfit no matched character wears as a loose outfit", () => {
    const match = match_library("小雪 put on the raincoat.", [], LIBRARY);
    expect(match.characters.map((entry) => [entry.character.id, entry.outfit])).toEqual([
      ["c2", null],
    ]);
    expect(match.loose_outfits.map((outfit) => outfit.id)).toEqual(["o3"]);
  });
});
