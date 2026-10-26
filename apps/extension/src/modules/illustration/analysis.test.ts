import { describe, expect, it } from "vitest";

import { AnalysisParseError, build_analysis_input, parse_analysis_output } from "./analysis.js";

const PROPOSAL = {
  paragraph: 1,
  scene: "a girl at a door",
  tags: "1girl, door",
  characters: ["Alice"],
};

describe("build_analysis_input", () => {
  it("lists every paragraph with its number and states the image limit", () => {
    const input = build_analysis_input(
      [
        { index: 0, text: "First.", line: 0 },
        { index: 1, text: "Second.", line: 2 },
      ],
      2,
      { characters: [], outfits: [] },
    );

    expect(input).toContain("Choose at most 2 paragraphs");
    expect(input).toContain("[0] First.\n[1] Second.");
    expect(input).not.toContain("stored tags");
  });

  it("names library characters and outfits so the model leaves their looks out", () => {
    const input = build_analysis_input([{ index: 0, text: "Hi.", line: 0 }], 1, {
      characters: [{ id: "c1", name: "Seraphina", appearance: "pink hair" }],
      outfits: [{ id: "o1", name: "Forest cloak", description: "green cloak", character_id: "c1" }],
    });

    expect(input).toContain("do not describe their hair, eyes, face, body or clothing");
    expect(input).toContain("- character: Seraphina");
    expect(input).toContain("- outfit: Forest cloak (worn by Seraphina)");
    expect(input).not.toContain("pink hair");
  });
});

describe("parse_analysis_output", () => {
  it("reads a structured reply directly", () => {
    expect(parse_analysis_output(JSON.stringify({ illustrations: [PROPOSAL] }), 3, 2)).toEqual([
      PROPOSAL,
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

    expect(parse_analysis_output(raw, 3, 2)).toEqual([PROPOSAL]);
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
