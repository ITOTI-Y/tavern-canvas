import { describe, expect, it } from "vitest";

import { normalize_vocabulary_query } from "./query_normalizer.js";

describe("normalize_vocabulary_query", () => {
  it("folds underscores, case, and whitespace like the contracts search key", () => {
    const query = normalize_vocabulary_query("Blue_Sky  Tag");
    expect(query.normalized).toBe("blue sky tag");
  });

  it("marks an empty (or whitespace-only) query as empty", () => {
    expect(normalize_vocabulary_query("").is_empty).toBe(true);
    expect(normalize_vocabulary_query("   ").is_empty).toBe(true);
    expect(normalize_vocabulary_query("a").is_empty).toBe(false);
  });

  it("derives a two-code-point group key once at least two code points exist", () => {
    expect(normalize_vocabulary_query("").group_key).toBeNull();
    expect(normalize_vocabulary_query("a").group_key).toBeNull();
    expect(normalize_vocabulary_query("ab").group_key).toBe("ab");
    expect(normalize_vocabulary_query("abc").group_key).toBe("ab");
  });

  it("counts CJK ideographs as single code points for grouping and trigrams", () => {
    const query = normalize_vocabulary_query("東京タワー");
    expect(query.group_key).toBe("東京");
    expect(query.trigrams).toContain("東京タ");
  });

  it("builds deduplicated, first-occurrence-ordered trigrams", () => {
    const query = normalize_vocabulary_query("aaaa");
    expect(query.trigrams).toEqual(["aaa"]);
  });

  it("produces no trigrams for queries shorter than three code points", () => {
    expect(normalize_vocabulary_query("ab").trigrams).toEqual([]);
  });
});
