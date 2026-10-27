const REASONING_BLOCK_PATTERN = /<(think|thinking|reasoning)>[\s\S]*?<\/\1>/giu;
const FENCED_JSON_PATTERN = /```(?:json)?\s*([\s\S]*?)```/giu;

function last_balanced_object(text: string, key: string): string | null {
  for (let end = text.lastIndexOf("}"); end >= 0; end = text.lastIndexOf("}", end - 1)) {
    let depth = 0;
    for (let start = end; start >= 0; start -= 1) {
      const character = text[start];
      if (character === "}") {
        depth += 1;
      } else if (character === "{") {
        depth -= 1;
        if (depth === 0) {
          const candidate = text.slice(start, end + 1);
          if (candidate.includes(`"${key}"`)) {
            return candidate;
          }
          break;
        }
      }
    }
  }
  return null;
}

/**
 * Texts that may hold the JSON object with this top-level key: the whole reply without reasoning
 * blocks, its fenced code blocks, and the last balanced object that mentions the key.
 */
export function json_candidates(raw: string, key: string): readonly string[] {
  const without_reasoning = raw.replace(REASONING_BLOCK_PATTERN, "").trim();
  const fenced = [...without_reasoning.matchAll(FENCED_JSON_PATTERN)]
    .map((match) => (match[1] ?? "").trim())
    .reverse();
  const balanced = last_balanced_object(without_reasoning, key);
  return [without_reasoning, ...fenced, ...(balanced === null ? [] : [balanced])];
}
