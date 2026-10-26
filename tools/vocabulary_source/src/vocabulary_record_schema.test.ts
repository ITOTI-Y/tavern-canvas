import { describe, expect, it } from "vitest";

import { VocabularyRecordSchema } from "./vocabulary_record_schema.js";

describe("VocabularyRecordSchema (re-exported from @tavern-canvas/contracts)", () => {
  it("parses a minimal record and fills defaults", () => {
    const result = VocabularyRecordSchema.parse({ record_id: 1, tag: "1girl" });

    expect(result).toEqual({
      record_id: 1,
      tag: "1girl",
      aliases: [],
      popularity: 0,
    });
  });

  it("accepts a fully populated record", () => {
    const result = VocabularyRecordSchema.parse({
      record_id: 42,
      tag: "synthetic_character_tag",
      translation: "合成角色标签",
      aliases: ["synthetic_alias"],
      category: "character",
      popularity: 1_234,
      description: "a synthetic test fixture, not real vocabulary data",
    });

    expect(result.translation).toBe("合成角色标签");
    expect(result.aliases).toEqual(["synthetic_alias"]);
  });

  it("rejects unknown fields (strict object) — in particular, no longer accepts is_nsfw", () => {
    const result = VocabularyRecordSchema.safeParse({
      record_id: 1,
      tag: "1girl",
      is_nsfw: false,
    });

    expect(result.success).toBe(false);
  });

  it("rejects a negative record_id", () => {
    const result = VocabularyRecordSchema.safeParse({ record_id: -1, tag: "1girl" });

    expect(result.success).toBe(false);
  });
});
