import type { HostRegexScript } from "../../host/index.js";

const SLOT_ID_CHARACTERS = "[A-Za-z0-9_-]{8,32}";
const MARKER_PATTERN = new RegExp(`<!--tc-image:(${SLOT_ID_CHARACTERS})-->`, "gu");

export function slot_marker(slot_id: string): string {
  return `<!--tc-image:${slot_id}-->`;
}

/** `data-tc-slot` is the mount selector: SillyTavern's sanitizer prefixes every class with `custom-`. */
export const SLOT_REGEX_SCRIPTS: readonly HostRegexScript[] = [
  {
    id: "tavern-canvas-image-slot-display",
    script_name: "TavernCanvas image slot (display)",
    find_regex: `/<!--tc-image:(${SLOT_ID_CHARACTERS})-->/g`,
    replace_string: '<div class="tavern-canvas-slot" data-tc-slot="$1"></div>',
    destination: "display",
  },
  {
    id: "tavern-canvas-image-slot-prompt",
    script_name: "TavernCanvas image slot (prompt)",
    find_regex: `/\\n?<!--tc-image:${SLOT_ID_CHARACTERS}-->/g`,
    replace_string: "",
    destination: "prompt",
  },
];

export function find_slot_ids(text: string): readonly string[] {
  return [...text.matchAll(MARKER_PATTERN)].map((match) => match[1] ?? "");
}

export interface Paragraph {
  readonly index: number;
  readonly text: string;
  /** Line number in the message text, so a marker can be placed after it. */
  readonly line: number;
}

/** Non-empty lines outside fenced code blocks; status panels and code are never illustrated. */
export function split_paragraphs(text: string): readonly Paragraph[] {
  const paragraphs: Paragraph[] = [];
  let in_fence = false;
  text.split("\n").forEach((raw_line, line) => {
    const trimmed = raw_line.trim();
    if (trimmed.startsWith("```")) {
      in_fence = !in_fence;
      return;
    }
    if (in_fence || trimmed.length === 0 || find_slot_ids(trimmed).length > 0) {
      return;
    }
    paragraphs.push({ index: paragraphs.length, text: trimmed, line });
  });
  return paragraphs;
}

export interface MarkerPlacement {
  readonly paragraph: number;
  readonly slot_id: string;
}

export function insert_markers(text: string, placements: readonly MarkerPlacement[]): string {
  const paragraphs = split_paragraphs(text);
  const markers_by_line = new Map<number, string[]>();
  for (const placement of placements) {
    const paragraph = paragraphs[placement.paragraph];
    if (paragraph === undefined) {
      throw new RangeError(`Paragraph ${String(placement.paragraph)} does not exist`);
    }
    const markers = markers_by_line.get(paragraph.line) ?? [];
    markers.push(slot_marker(placement.slot_id));
    markers_by_line.set(paragraph.line, markers);
  }
  return text
    .split("\n")
    .flatMap((line, index) => [line, ...(markers_by_line.get(index) ?? [])])
    .join("\n");
}
