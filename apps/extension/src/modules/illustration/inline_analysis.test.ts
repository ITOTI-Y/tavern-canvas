import { describe, expect, it } from "vitest";

import {
  derive_inline_artifact,
  inline_copy_source,
  INLINE_MODULE_ID,
  is_inline_copy,
} from "../../host/ap_inline_structure.js";
import {
  build_inline_request,
  INLINE_FIELD,
  INLINE_MACRO,
  INLINE_STRUCTURE_ID,
  paragraph_of_quote,
  resolve_inline_reply,
} from "./inline_analysis.js";
import { split_paragraphs } from "./slot_markers.js";

const REPLY = [
  '*Seraphina kneels beside the cot,* holding out a steaming clay cup. "Drink this."',
  "",
  "Outside, rain drums on the leaves of the ancient oaks around the glade.",
].join("\n");

const NAMES = { structure_id: INLINE_STRUCTURE_ID, field: INLINE_FIELD, macro: INLINE_MACRO };

describe("inline analysis", () => {
  it("finds a paragraph by the opening words the model quoted, whatever markup surrounds them", () => {
    const paragraphs = split_paragraphs(REPLY);

    expect(paragraph_of_quote("Seraphina kneels beside the cot, holding out", paragraphs)).toBe(0);
    expect(paragraph_of_quote("rain drums on the leaves", paragraphs)).toBe(1);
    expect(paragraph_of_quote("A dragon lands", paragraphs)).toBeNull();
  });

  it("turns quotes into paragraph indexes and drops pictures whose quote matches nothing", () => {
    const raw = JSON.stringify({
      illustrations: [
        { quote: "Outside, rain drums on the leaves", tags: "rain" },
        { quote: "Nothing like this", tags: "x" },
      ],
      wardrobe: { characters: [], initial_outfits: {} },
    });

    expect(JSON.parse(resolve_inline_reply(raw, split_paragraphs(REPLY)) ?? "null")).toEqual({
      illustrations: [{ tags: "rain", paragraph: 1 }],
      wardrobe: { characters: [], initial_outfits: {} },
    });
    expect(resolve_inline_reply("not json", split_paragraphs(REPLY))).toBeNull();
  });

  it("asks for the wardrobe half only when there is a wardrobe request", () => {
    expect(build_inline_request("pictures", null)).not.toContain("wardrobe");
    expect(build_inline_request("pictures", "clothes")).toContain('"wardrobe":{');
  });

  it("adds the structure, an always-on module and its entry to a copy of the built-in preset", () => {
    const artifact = {
      id: "petals",
      version: "1.0.0",
      hash: "abc",
      regions: [{ id: "top" }, { id: "task" }, { id: "bottom" }],
      structures: { reply: { id: "reply", kind: "reply" } },
      modules: [{ id: "core" }],
      entries: [
        { id: "a", region: "top", order: 100 },
        { id: "b", region: "task", order: 300 },
        { id: "c", region: "bottom", order: 100 },
      ],
    };

    const copy = derive_inline_artifact(artifact, NAMES);

    expect(copy?.["id"]).toBe("petals");
    expect(copy?.["version"]).toBe("1.0.0");
    expect(Object.keys(copy?.["structures"] as object)).toEqual(["reply", INLINE_STRUCTURE_ID]);
    expect((copy?.["modules"] as { id: string }[]).map((module) => module.id)).toEqual([
      "core",
      INLINE_MODULE_ID,
    ]);
    expect((copy?.["entries"] as { id: string }[]).map((entry) => entry.id)).toEqual([
      "a",
      "b",
      `${INLINE_MODULE_ID}/main`,
      "c",
    ]);
    expect(JSON.stringify(copy?.["entries"])).toContain(`{{${INLINE_MACRO}}}`);
    expect(is_inline_copy(copy)).toBe(true);
    expect(inline_copy_source(copy)).toBe("abc");
    expect(is_inline_copy(artifact)).toBe(false);
    expect(artifact.entries).toHaveLength(3);
  });
});
