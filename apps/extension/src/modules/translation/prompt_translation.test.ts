import { describe, expect, it, vi } from "vitest";

import {
  read_prompt_in_chinese,
  translate_prompt_to_tags,
  type PromptTranslationDeps,
} from "./prompt_translation.js";

function create_deps(): PromptTranslationDeps & { deepl: ReturnType<typeof vi.fn> } {
  return {
    glossary: [{ source: "爱丽丝", target: "alice (wonderland)" }],
    find_tag: (term) => Promise.resolve(term === "微笑" ? "smile" : null),
    find_translation: (tag) => Promise.resolve(tag === "smile" ? "微笑" : null),
    deepl: vi.fn((text: string) =>
      Promise.resolve(text === "雨夜的小巷" ? "Rainy night alley." : "下雨"),
    ),
  };
}

describe("translate_prompt_to_tags", () => {
  it("keeps English tags and resolves Chinese ones by glossary, vocabulary, then DeepL", async () => {
    const deps = create_deps();

    await expect(translate_prompt_to_tags("1girl，爱丽丝, 微笑、雨夜的小巷", deps)).resolves.toBe(
      "1girl, alice (wonderland), smile, rainy night alley",
    );
    expect(deps.deepl).toHaveBeenCalledExactlyOnceWith("雨夜的小巷", "EN-US");
  });
});

describe("read_prompt_in_chinese", () => {
  it("reads weighted tags through their base tag and falls back to DeepL", async () => {
    const deps = create_deps();

    await expect(read_prompt_in_chinese("Alice (wonderland), {smile}, rain", deps)).resolves.toBe(
      "爱丽丝，微笑，下雨",
    );
    expect(deps.deepl).toHaveBeenCalledExactlyOnceWith("rain", "ZH");
  });
});
