import type { GlossaryEntry } from "@tavern-canvas/contracts";

import type { DeepLTarget } from "../../host/index.js";

export interface PromptTranslationDeps {
  readonly glossary: readonly GlossaryEntry[];
  /** The tag whose stored Chinese translation equals `term`, if the vocabulary has one. */
  readonly find_tag: (term: string) => Promise<string | null>;
  /** The stored Chinese translation of `tag`, if the vocabulary has one. */
  readonly find_translation: (tag: string) => Promise<string | null>;
  readonly deepl: (text: string, target: DeepLTarget) => Promise<string>;
}

const CJK_PATTERN = /[぀-ヿ㐀-鿿豈-﫿]/u;
const SEGMENT_SEPARATOR = /[,，、]/u;

function split_segments(prompt: string): readonly string[] {
  return prompt
    .split(SEGMENT_SEPARATOR)
    .map((segment) => segment.trim())
    .filter((segment) => segment.length > 0);
}

function same_term(left: string, right: string): boolean {
  return left.trim().toLowerCase() === right.trim().toLowerCase();
}

/** Removes NovelAI `{}`/`[]` and `1.2::tag::` and SD `(tag:1.2)` weights, keeping parentheses that belong to the tag. */
function strip_weight(segment: string): string {
  let tag = segment
    .trim()
    .replace(/^-?[\d.]+::/u, "")
    .replace(/::$/u, "");
  const sd_weight = /^\((.+):[\d.]+\)$/u.exec(tag);
  if (sd_weight?.[1] !== undefined) {
    tag = sd_weight[1];
  }
  while (/^[{[].*[}\]]$/u.test(tag)) {
    tag = tag.slice(1, -1);
  }
  return tag.trim().toLowerCase();
}

/** DeepL answers in prose; a tag is lowercase without a closing period. */
function as_tag(text: string): string {
  return text
    .trim()
    .replace(/[.。]+$/u, "")
    .toLowerCase();
}

/**
 * Turns every Chinese segment of a comma-separated prompt into an English tag: the user's glossary
 * first, then the vocabulary's Chinese translations, and DeepL only for what is left.
 */
export async function translate_prompt_to_tags(
  prompt: string,
  deps: PromptTranslationDeps,
): Promise<string> {
  const segments = split_segments(prompt);
  const translated = await Promise.all(
    segments.map(async (segment) => {
      if (!CJK_PATTERN.test(segment)) {
        return segment;
      }
      const entry = deps.glossary.find((candidate) => same_term(candidate.source, segment));
      if (entry !== undefined) {
        return entry.target;
      }
      return (await deps.find_tag(segment)) ?? as_tag(await deps.deepl(segment, "EN-US"));
    }),
  );
  return translated.join(", ");
}

/** A Chinese reading of an English prompt, so the user can check what the tags say. */
export async function read_prompt_in_chinese(
  prompt: string,
  deps: PromptTranslationDeps,
): Promise<string> {
  const segments = split_segments(prompt);
  const read = await Promise.all(
    segments.map(async (segment) => {
      if (CJK_PATTERN.test(segment)) {
        return segment;
      }
      const base = strip_weight(segment);
      const entry = deps.glossary.find((candidate) => same_term(candidate.target, base));
      if (entry !== undefined) {
        return entry.source;
      }
      return (await deps.find_translation(base)) ?? (await deps.deepl(base, "ZH")).trim();
    }),
  );
  return read.join("，");
}
