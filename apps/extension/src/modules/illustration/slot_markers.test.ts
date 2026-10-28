import { describe, expect, it } from "vitest";

import {
  find_slot_ids,
  insert_markers,
  SLOT_REGEX_SCRIPTS,
  paragraph_index_of,
  slot_marker,
  split_paragraphs,
} from "./slot_markers.js";

function regex_of(find_regex: string): RegExp {
  const match = /^\/(.*)\/([a-z]*)$/su.exec(find_regex);
  if (match === null) {
    throw new Error(`not a regex literal: ${find_regex}`);
  }
  return new RegExp(match[1] ?? "", match[2]);
}

describe("split_paragraphs", () => {
  it("numbers non-empty lines and skips fenced blocks and existing markers", () => {
    const text = [
      "She opened the door.",
      "",
      "```",
      "status: ok",
      "```",
      slot_marker("abcdefgh"),
      "Rain fell outside.",
    ].join("\n");

    expect(split_paragraphs(text)).toEqual([
      { index: 0, text: "She opened the door.", line: 0 },
      { index: 1, text: "Rain fell outside.", line: 6 },
    ]);
  });
});

describe("insert_markers", () => {
  it("places each marker on its own line after the chosen paragraph", () => {
    const text = "First.\n\nSecond.\nThird.";

    const marked = insert_markers(text, [
      { paragraph: 2, slot_id: "slot0003" },
      { paragraph: 0, slot_id: "slot0001" },
    ]);

    expect(marked).toBe(
      "First.\n<!--tc-image:slot0001-->\n\nSecond.\nThird.\n<!--tc-image:slot0003-->",
    );
    expect(find_slot_ids(marked)).toEqual(["slot0001", "slot0003"]);
  });

  it("rejects a paragraph that does not exist", () => {
    expect(() => insert_markers("Only one.", [{ paragraph: 1, slot_id: "slot0001" }])).toThrow(
      RangeError,
    );
  });
});

describe("SLOT_REGEX_SCRIPTS", () => {
  const [display, prompt] = SLOT_REGEX_SCRIPTS;
  const marked = "Line.\n<!--tc-image:slot_0001-->\nNext.";

  it("renders a marker as a slot element and removes it from prompts", () => {
    if (display === undefined || prompt === undefined) {
      throw new Error("both scripts are defined");
    }
    expect(marked.replace(regex_of(display.find_regex), display.replace_string)).toBe(
      'Line.\n<div class="tavern-canvas-slot" data-tc-slot="slot_0001"></div>\nNext.',
    );
    expect(marked.replace(regex_of(prompt.find_regex), prompt.replace_string)).toBe("Line.\nNext.");
  });
});

describe("paragraph_index_of", () => {
  const paragraphs = split_paragraphs(
    [
      "*She opened the door*, slowly.",
      "",
      '"Rain," he said. It fell **hard** outside.',
      "",
      "她笑了笑。",
    ].join("\n"),
  );

  it("finds the paragraph of rendered text that lost its Markdown", () => {
    expect(paragraph_index_of(paragraphs, "She opened the door, slowly.")).toBe(0);
    expect(paragraph_index_of(paragraphs, "It fell hard outside")).toBe(1);
    expect(paragraph_index_of(paragraphs, "她笑了")).toBe(2);
  });

  it("matches a selection spanning several paragraphs to the first it starts in", () => {
    expect(paragraph_index_of(paragraphs, "slowly. Rain, he said.")).toBe(0);
  });

  it("returns null for text that is not in the reply", () => {
    expect(paragraph_index_of(paragraphs, "Something else entirely")).toBeNull();
    expect(paragraph_index_of(paragraphs, "  …  ")).toBeNull();
  });
});
