import type { Paragraph } from "./slot_markers.js";

/**
 * Inline analysis: the story reply itself carries the illustration analysis and wardrobe update,
 * through a hidden structure Inkwell adds to the active Advanced Preset preset.
 */
export const INLINE_STRUCTURE_ID = "inkwell";
export const INLINE_FIELD = "inkwell_illustrations";
/** The SillyTavern macro the injected module expands to this turn's request. */
export const INLINE_MACRO = "inkwell_illustration_request";

/** The request the story model reads before it writes the structure. */
export function build_inline_request(illustrations: string, wardrobe: string | null): string {
  return [
    illustrations,
    ...(wardrobe === null
      ? []
      : ["", wardrobe, "Here the latest reply is the one you are writing now."]),
    "",
    `Fill the ${INLINE_FIELD} field with one JSON object written as a string: ${
      wardrobe === null
        ? '{"illustrations":[...]}'
        : '{"illustrations":[...],"wardrobe":{"characters":[...],"initial_outfits":{...}}}'
    }. Give at least one illustration whenever your reply shows a visible scene. This replaces the reply format each request states.`,
  ].join("\n");
}

/** Letters and digits only, lower-cased: a quote matches whatever markup surrounds it. */
function bare(text: string): string {
  return text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
}

/** The paragraph a quote of its opening words points at, or `null`. */
export function paragraph_of_quote(quote: string, paragraphs: readonly Paragraph[]): number | null {
  const needle = bare(quote).slice(0, 24);
  if (needle.length < 4) {
    return null;
  }
  const starts = paragraphs.find((paragraph) => bare(paragraph.text).startsWith(needle));
  const found = starts ?? paragraphs.find((paragraph) => bare(paragraph.text).includes(needle));
  return found?.index ?? null;
}

/**
 * The structure's JSON with each illustration's `quote` turned into the `paragraph` index the
 * analysis parser reads; illustrations whose quote matches no paragraph are dropped. `null` when
 * the text is not a JSON object.
 */
export function resolve_inline_reply(raw: string, paragraphs: readonly Paragraph[]): string | null {
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return null;
  }
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return null;
  }
  const record = value as Record<string, unknown>;
  const items = Array.isArray(record["illustrations"]) ? record["illustrations"] : [];
  const illustrations = items.flatMap((item: unknown) => {
    if (typeof item !== "object" || item === null) {
      return [];
    }
    const { quote, ...rest } = item as Record<string, unknown>;
    const paragraph = typeof quote === "string" ? paragraph_of_quote(quote, paragraphs) : null;
    return paragraph === null ? [] : [{ ...rest, paragraph }];
  });
  return JSON.stringify({ ...record, illustrations });
}
