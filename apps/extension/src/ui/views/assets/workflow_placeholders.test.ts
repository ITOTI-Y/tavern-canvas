import { describe, expect, it } from "vitest";

import { scan_workflow_placeholders, WORKFLOW_INPUT_TARGETS } from "./workflow_placeholders.js";

describe("scan_workflow_placeholders", () => {
  it("finds every distinct {{placeholder}} in the text", () => {
    const json = '{"text": "{{positive_prompt}}", "other": "{{seed}}"}';
    expect(scan_workflow_placeholders(json)).toEqual(["positive_prompt", "seed"]);
  });

  it("deduplicates a placeholder that appears more than once", () => {
    const json = '{"a": "{{seed}}", "b": "{{seed}}"}';
    expect(scan_workflow_placeholders(json)).toEqual(["seed"]);
  });

  it("returns an empty list when there are no placeholders", () => {
    expect(scan_workflow_placeholders('{"prompt": "a fixed value"}')).toEqual([]);
  });

  it("tolerates whitespace inside the braces", () => {
    expect(scan_workflow_placeholders("{{ width }}")).toEqual(["width"]);
  });

  it("never throws on malformed JSON -- scanning is a text search, not a parse", () => {
    expect(() => scan_workflow_placeholders("{{seed}} not valid json at all {")).not.toThrow();
    expect(scan_workflow_placeholders("{{seed}} not valid json at all {")).toEqual(["seed"]);
  });

  it("preserves first-seen order", () => {
    expect(scan_workflow_placeholders("{{b}} {{a}} {{b}} {{c}}")).toEqual(["b", "a", "c"]);
  });
});

describe("WORKFLOW_INPUT_TARGETS", () => {
  it("is a fixed, non-empty list of known TavernCanvas input keys", () => {
    expect(WORKFLOW_INPUT_TARGETS.length).toBeGreaterThan(0);
    expect(WORKFLOW_INPUT_TARGETS).toContain("positive_prompt");
    expect(WORKFLOW_INPUT_TARGETS).toContain("seed");
  });
});
