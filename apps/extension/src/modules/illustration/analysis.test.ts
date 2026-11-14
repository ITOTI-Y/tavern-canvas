import { describe, expect, it } from "vitest";

import { test_character, test_outfit } from "../wardrobe/wardrobe_test_fixtures.js";
import { parse_analysis_output } from "./analysis.js";
import { AnalysisParseError } from "./analysis_error.js";
import { build_analysis_input } from "./analysis_prompts.js";

/** As the model writes it. */
const PROPOSAL = {
  paragraph: 1,
  scene: "a girl at a door",
  caption: "a girl with silver hair opens the door on the left",
  tags: "1girl, door",
  characters: [{ name: "Alice", tags: "girl, smile", position: { x: "left", y: "middle" } }],
};

/** As parsed: the named position becomes image coordinates. */
const PARSED = {
  ...PROPOSAL,
  characters: [{ name: "Alice", tags: "girl, smile", center: { x: 0.1, y: 0.5 } }],
};

describe("build_analysis_input", () => {
  it("lists every paragraph with its number and states the image limit", () => {
    const input = build_analysis_input(
      [
        { index: 0, text: "First.", line: 0 },
        { index: 1, text: "Second.", line: 2 },
      ],
      2,
      { characters: [], outfits: [], loras: [] },
      "  ",
      null,
    );

    expect(input).toContain("Choose at most 2 paragraphs");
    expect(input).toContain("[0] First.\n[1] Second.");
    expect(input).not.toContain("stored tags");
    expect(input).not.toContain("User guidance");
  });

  it("asks for both sides of an exchange and names the user's character as you", () => {
    const input = build_analysis_input(
      [{ index: 0, text: "She hands you the cup.", line: 0 }],
      1,
      { characters: [], outfits: [], loras: [] },
      "",
      "Yu",
    );

    expect(input).toContain("both sides of an exchange are visible");
    expect(input).toContain('"You" in the story is Yu');
  });

  it("passes the user's guidance before the paragraphs", () => {
    const input = build_analysis_input(
      [{ index: 0, text: "Hi.", line: 0 }],
      1,
      { characters: [], outfits: [], loras: [] },
      " watercolor, summer evening ",
      null,
    );

    expect(input).toMatch(/User guidance[^\n]*\nwatercolor, summer evening\n\nParagraphs:/u);
  });

  it("names library characters and outfits so the model leaves their looks out", () => {
    const input = build_analysis_input(
      [{ index: 0, text: "Hi.", line: 0 }],
      1,
      {
        characters: [
          test_character({ id: "c1", name: "Seraphina", appearance: { hair: ["pink hair"] } }),
        ],
        outfits: [test_outfit({ id: "o1", name: "Forest cloak", character_id: "c1" })],
        loras: [],
      },
      "",
      null,
    );

    expect(input).toContain("never hair, eyes, face, body or clothing");
    expect(input).toContain("- character: Seraphina");
    expect(input).toContain("- outfit: Forest cloak (worn by Seraphina)");
    expect(input).not.toContain("pink hair");
  });
});

describe("parse_analysis_output", () => {
  it("reads a structured reply directly", () => {
    expect(parse_analysis_output(JSON.stringify({ illustrations: [PROPOSAL] }), 3, 2)).toEqual([
      PARSED,
    ]);
  });

  it("digs the JSON out of reasoning and a code fence", () => {
    const raw = [
      "<think>The second paragraph is vivid.</think>",
      "Here you go:",
      "```json",
      JSON.stringify({ illustrations: [{ ...PROPOSAL, tags: ["1girl", "door"] }] }),
      "```",
    ].join("\n");

    expect(parse_analysis_output(raw, 3, 2)).toEqual([PARSED]);
  });

  it("drops out-of-range and duplicate paragraphs and keeps the image limit", () => {
    const raw = JSON.stringify({
      illustrations: [
        { ...PROPOSAL, paragraph: 9 },
        PROPOSAL,
        { ...PROPOSAL, scene: "again" },
        { ...PROPOSAL, paragraph: 0 },
        { ...PROPOSAL, paragraph: 2 },
      ],
    });

    expect(parse_analysis_output(raw, 3, 2).map((proposal) => proposal.paragraph)).toEqual([1, 0]);
  });

  it("reports the start of the raw reply when no JSON can be found", () => {
    const raw = "I cannot help with that.";

    expect(() => parse_analysis_output(raw, 3, 2)).toThrow(AnalysisParseError);
    try {
      parse_analysis_output(raw, 3, 2);
    } catch (error) {
      expect((error as AnalysisParseError).excerpt).toBe(raw);
    }
  });
});
