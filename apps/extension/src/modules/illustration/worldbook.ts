import type { HostWorldbookEntry, HostWorldbookKey } from "../../host/index.js";
import { mentions } from "./library_match.js";

function key_matches(key: HostWorldbookKey, text: string): boolean {
  if (typeof key === "string") {
    return mentions(text, key);
  }
  return new RegExp(key.source, key.flags.replace("g", "")).test(text);
}

function secondary_matches(entry: HostWorldbookEntry, text: string): boolean {
  if (entry.secondary_keys.length === 0) {
    return true;
  }
  const hits = entry.secondary_keys.map((key) => key_matches(key, text));
  switch (entry.secondary_logic) {
    case "and_any":
      return hits.some(Boolean);
    case "and_all":
      return hits.every(Boolean);
    case "not_all":
      return !hits.every(Boolean);
    case "not_any":
      return !hits.some(Boolean);
  }
}

/**
 * The content of the enabled entries this text activates, in insertion order: constant entries
 * always, keyword entries when a primary key and the secondary-key rule match. Text keys match the
 * way library names do: whole words for Latin text, substrings for CJK. Vectorized entries
 * need SillyTavern's vector store and are skipped; recursion, probability and timed effects are
 * not applied.
 */
export function activate_worldbook(entries: readonly HostWorldbookEntry[], text: string): string {
  return entries
    .filter(
      (entry) =>
        entry.enabled &&
        entry.content.trim() !== "" &&
        (entry.strategy === "constant" ||
          (entry.strategy === "selective" &&
            entry.keys.some((key) => key_matches(key, text)) &&
            secondary_matches(entry, text))),
    )
    .sort((left, right) => left.order - right.order)
    .map((entry) => entry.content.trim())
    .join("\n\n");
}
