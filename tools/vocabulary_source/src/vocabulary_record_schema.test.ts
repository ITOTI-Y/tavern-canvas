import { describe, expect, it } from "vitest";

import { VocabularyRecordSchema } from "./vocabulary_record_schema.js";

describe("VocabularyRecordSchema", () => {
  it("parses a minimal record and fills defaults", () => {
    const result = VocabularyRecordSchema.parse({ record_id: 1, tag: "1girl" });

    expect(result).toEqual({
      record_id: 1,
      tag: "1girl",
      aliases: [],
      popularity: 0,
      is_nsfw: false,
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
      is_nsfw: false,
    });

    expect(result.translation).toBe("合成角色标签");
    expect(result.aliases).toEqual(["synthetic_alias"]);
  });

  it("rejects unknown fields (strict object)", () => {
    const result = VocabularyRecordSchema.safeParse({
      record_id: 1,
      tag: "1girl",
      unexpected_field: "surprise",
    });

    expect(result.success).toBe(false);
  });

  it("rejects a negative record_id", () => {
    const result = VocabularyRecordSchema.safeParse({ record_id: -1, tag: "1girl" });

    expect(result.success).toBe(false);
  });

  it("rejects an empty tag", () => {
    const result = VocabularyRecordSchema.safeParse({ record_id: 1, tag: "" });

    expect(result.success).toBe(false);
  });

  it("rejects a tag exceeding the max length", () => {
    const result = VocabularyRecordSchema.safeParse({
      record_id: 1,
      tag: "a".repeat(257),
    });

    expect(result.success).toBe(false);
  });

  it("rejects more than 32 aliases", () => {
    const result = VocabularyRecordSchema.safeParse({
      record_id: 1,
      tag: "1girl",
      aliases: Array.from({ length: 33 }, (_, index) => `alias_${String(index)}`),
    });

    expect(result.success).toBe(false);
  });

  it("treats HTML/script strings as plain text without stripping them", () => {
    const result = VocabularyRecordSchema.parse({
      record_id: 1,
      tag: "1girl",
      description: "<script>alert('x')</script>",
    });

    expect(result.description).toBe("<script>alert('x')</script>");
  });

  it("does not deduplicate identical record_id values by itself (caller's responsibility)", () => {
    const first = VocabularyRecordSchema.parse({ record_id: 1, tag: "1girl" });
    const second = VocabularyRecordSchema.parse({ record_id: 1, tag: "solo" });

    expect(first.record_id).toBe(second.record_id);
  });
});
