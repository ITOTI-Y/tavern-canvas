const JSON_PLACEHOLDER_PATTERN = /\$([^$]+)\$/g;
const LEADING_BRACKET_PATTERN = /^[([{<]+/;
const TRAILING_BRACKET_PATTERN = /[)\]}>]+$/;
const LEADING_WEIGHT_PREFIX_PATTERN = /^[\d.]+::/;
const TRAILING_WEIGHT_SUFFIX_PATTERN = /::$/;
const TRAILING_WEIGHT_NUMBER_PATTERN = /:(?:\d*\.\d+|\d+)$/;

export function get_base_tag(tag: string): string {
  let base = tag.toLowerCase();
  let previous: string;
  do {
    previous = base;
    base = base.replace(LEADING_BRACKET_PATTERN, "");
    base = base.replace(TRAILING_BRACKET_PATTERN, "");
    base = base.replace(LEADING_WEIGHT_PREFIX_PATTERN, "");
    base = base.replace(TRAILING_WEIGHT_SUFFIX_PATTERN, "");
    base = base.replace(TRAILING_WEIGHT_NUMBER_PATTERN, "");
    base = base.trim();
  } while (base !== previous);
  return base;
}

export function has_weight(tag: string): boolean {
  return tag.toLowerCase() !== get_base_tag(tag);
}

/** An empty fragment never produces a doubled comma or a leading/trailing separator. */
export function join_prompt_parts(parts: readonly (string | null | undefined)[]): string {
  return parts
    .map((part) => part?.trim() ?? "")
    .filter((part) => part.length > 0)
    .join(", ");
}

export function normalize_physical_newlines(text: string): string {
  return text
    .replace(/[ \t]*[\r\n]+[ \t]*/g, " ")
    .replace(/ {2,}/g, " ")
    .trim();
}

export function deduplicate_tags(tag_string: string): string {
  if (!tag_string) {
    return "";
  }

  const placeholders: string[] = [];
  const with_placeholders_masked = tag_string.replace(JSON_PLACEHOLDER_PATTERN, (match) => {
    placeholders.push(match);
    return `__ST_JSON_TAG_${String(placeholders.length - 1)}__`;
  });

  const tags = with_placeholders_masked
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
  if (tags.length === 0) {
    return "";
  }

  const unique_tags = new Map<string, string>();
  for (const masked_tag of tags) {
    const tag = masked_tag.replace(
      /__ST_JSON_TAG_(\d+)__/g,
      (_match, index: string) => placeholders[Number(index)] ?? "",
    );
    const base_tag = get_base_tag(tag);
    const existing_tag = unique_tags.get(base_tag);
    if (existing_tag === undefined) {
      unique_tags.set(base_tag, tag);
      continue;
    }
    if (!has_weight(existing_tag) && has_weight(tag)) {
      unique_tags.set(base_tag, tag);
    }
  }

  return Array.from(unique_tags.values()).join(", ");
}
