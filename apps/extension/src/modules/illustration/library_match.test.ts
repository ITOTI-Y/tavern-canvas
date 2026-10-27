import { describe, expect, it } from "vitest";

import { test_character, test_outfit } from "../wardrobe/wardrobe_test_fixtures.js";
import { find_characters, match_library, mentions, type SlotLibrary } from "./library_match.js";

const LIBRARY: SlotLibrary = {
  characters: [
    test_character({ id: "c1", name: "Ann", aliases: ["Annie"], default_outfit_id: "o2" }),
    test_character({ id: "c2", name: "小雪" }),
  ],
  outfits: [
    test_outfit({
      id: "o1",
      name: "School uniform",
      character_id: "c1",
      slots: { top: ["serafuku"] },
    }),
    test_outfit({
      id: "o2",
      name: "Ball gown",
      character_id: "c1",
      slots: { full_body: ["ball gown"] },
    }),
  ],
  loras: [],
};

describe("mentions", () => {
  it("matches Latin names as whole words and CJK names as substrings", () => {
    expect(mentions("Then ann smiled.", "Ann")).toBe(true);
    expect(mentions("Anna smiled.", "Ann")).toBe(false);
    expect(mentions("小雪笑了。", "小雪")).toBe(true);
  });
});

describe("match_library", () => {
  it("matches a character by alias and dresses it from the reply's wardrobe snapshot", () => {
    const match = match_library("Annie waved.", [], LIBRARY, [
      { character_id: "c1", outfit_id: "o1", overrides: {}, conditions: ["wet clothes"] },
    ]);

    expect(match.characters.map((entry) => [entry.character.id, entry.outfit_tags])).toEqual([
      ["c1", ["serafuku", "wet clothes"]],
    ]);
  });

  it("falls back to the default outfit when the snapshot does not mention the character", () => {
    const match = match_library("She waved.", ["ann"], LIBRARY, []);
    expect(match.characters[0]?.outfit_tags).toEqual(["ball gown"]);
  });

  it("finds characters by name or alias in the order given", () => {
    expect(find_characters(["小雪", "annie", "Bob"], LIBRARY).map((c) => c.id)).toEqual([
      "c2",
      "c1",
    ]);
  });
});
