import type { IllustrationSettings } from "@tavern-canvas/contracts";
import { describe, expect, it } from "vitest";

import { analysis_json_schema, parse_analysis_output } from "./analysis.js";
import { active_sizes, chosen_size } from "./size_choice.js";

const WIDE = { width: 1344, height: 768 };
const TALL = { width: 832, height: 1216 };

const SETTINGS = {
  size_sets: [
    { id: "a", name: "A", sizes: [WIDE, TALL] },
    { id: "b", name: "B", sizes: [TALL] },
  ],
  size_set_id: "a",
  size_set_by_chat: { "chat-b": "b", "chat-none": null },
} as unknown as IllustrationSettings;

describe("size sets", () => {
  it("uses a chat's own set, else the default set, and none when a chat turned it off", () => {
    expect(active_sizes(SETTINGS, "chat-b")).toEqual([TALL]);
    expect(active_sizes(SETTINGS, "other")).toEqual([WIDE, TALL]);
    expect(active_sizes(SETTINGS, null)).toEqual([WIDE, TALL]);
    expect(active_sizes(SETTINGS, "chat-none")).toEqual([]);
  });

  it("keeps only a size from the set, and the only size of a one-size set", () => {
    expect(chosen_size("1344x768", [WIDE, TALL])).toEqual(WIDE);
    expect(chosen_size("1024x1024", [WIDE, TALL])).toBeUndefined();
    expect(chosen_size(undefined, [TALL])).toEqual(TALL);
    expect(chosen_size("1344x768", [])).toBeUndefined();
  });

  it("asks for a size only when the set offers a choice, and reads it back", () => {
    const schema = analysis_json_schema([WIDE, TALL]).value as {
      properties: { illustrations: { items: { required: string[]; properties: object } } };
    };
    expect(schema.properties.illustrations.items.required).toContain("size");
    expect(schema.properties.illustrations.items.properties).toMatchObject({
      size: { enum: ["1344x768", "832x1216"] },
    });
    expect(JSON.stringify(analysis_json_schema([TALL]).value)).not.toContain('"size"');

    const raw = JSON.stringify({
      illustrations: [
        { paragraph: 0, scene: "a", caption: "", tags: "", characters: [], size: "1344x768" },
        { paragraph: 1, scene: "b", caption: "", tags: "", characters: [], size: "9x9" },
      ],
    });
    const [first, second] = parse_analysis_output(raw, 2, 2, [WIDE, TALL]);
    expect(first?.size).toEqual(WIDE);
    expect(second?.size).toBeUndefined();
  });
});
