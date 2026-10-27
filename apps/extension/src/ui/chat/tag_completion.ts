const SEPARATOR = /[,，]/u;
const CJK_PATTERN = /[぀-ヿ㐀-鿿豈-﫿]/u;
/** NovelAI `1.2::` weights and opening `{`, `[` or `(` stay in front of the completed tag. */
const WEIGHT_PREFIX = /^(?:-?[\d.]+::)?[{[(]*/u;

export interface TagToken {
  /** Where the tag starts, after its weight prefix. */
  readonly start: number;
  /** Where the tag ends: the next separator, or the end of the text. */
  readonly end: number;
  /** What has been typed of the tag up to the caret. */
  readonly query: string;
}

/** The comma-separated tag the caret is in, or `null` when nothing worth completing is typed. */
export function token_at(value: string, caret: number): TagToken | null {
  const before = value.slice(0, caret);
  let start = 0;
  for (let index = before.length - 1; index >= 0; index -= 1) {
    if (SEPARATOR.test(before.charAt(index))) {
      start = index + 1;
      break;
    }
  }
  const next = value.slice(caret).search(SEPARATOR);
  const end = next === -1 ? value.length : caret + next;
  const typed = value.slice(start, caret);
  const leading = typed.length - typed.trimStart().length;
  const prefix = WEIGHT_PREFIX.exec(typed.trimStart())?.[0] ?? "";
  const query = typed.trim().slice(prefix.length).trim();
  const long_enough = CJK_PATTERN.test(query) ? query.length >= 1 : query.length >= 2;
  return long_enough ? { start: start + leading + prefix.length, end, query } : null;
}

/** Replaces the whole tag with `tag` and moves the caret past the separator that follows it. */
export function apply_suggestion(
  value: string,
  token: TagToken,
  tag: string,
): { readonly value: string; readonly caret: number } {
  const rest = value.slice(token.end).replace(/^[,，]?\s*/u, "");
  const head = `${value.slice(0, token.start)}${tag}, `;
  return { value: `${head}${rest}`, caret: head.length };
}

/** Four steps of how common a tag is, for the dot beside each suggestion. */
export function popularity_tier(popularity: number): 0 | 1 | 2 | 3 {
  if (popularity >= 100_000) {
    return 3;
  }
  if (popularity >= 10_000) {
    return 2;
  }
  return popularity >= 1_000 ? 1 : 0;
}
