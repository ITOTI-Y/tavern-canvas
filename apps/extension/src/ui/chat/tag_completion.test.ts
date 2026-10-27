import { describe, expect, it } from "vitest";

import { apply_suggestion, popularity_tier, token_at } from "./tag_completion.js";

describe("token_at", () => {
  it("returns the tag typed before the caret and where the whole tag ends", () => {
    const value = "girl, kisa, smile";
    expect(token_at(value, 10)).toEqual({ start: 6, end: 10, query: "kisa" });
  });

  it("keeps a weight prefix out of the query", () => {
    expect(token_at("{{kisa", 6)).toEqual({ start: 2, end: 6, query: "kisa" });
    expect(token_at("1.2::long ha", 12)).toEqual({ start: 5, end: 12, query: "long ha" });
  });

  it("completes one Chinese character but needs two Latin letters", () => {
    expect(token_at("girl, 长", 7)?.query).toBe("长");
    expect(token_at("girl, k", 7)).toBeNull();
  });
});

describe("apply_suggestion", () => {
  it("replaces the whole tag and puts the caret after its separator", () => {
    const value = "girl, kisa, smile";
    const token = token_at(value, 8);
    expect(token).not.toBeNull();
    if (token !== null) {
      expect(apply_suggestion(value, token, "kisaki (blue archive)")).toEqual({
        value: "girl, kisaki (blue archive), smile",
        caret: 29,
      });
    }
  });
});

describe("popularity_tier", () => {
  it("steps at a thousand, ten thousand and a hundred thousand uses", () => {
    expect([999, 1_000, 10_000, 100_000].map(popularity_tier)).toEqual([0, 1, 2, 3]);
  });
});
