import type { SlotLibrary } from "./library_match.js";
import type { Paragraph } from "./slot_markers.js";
import { guidance_lines } from "./user_guidance.js";

export function library_lines(library: SlotLibrary): readonly string[] {
  if (library.characters.length === 0 && library.outfits.length === 0) {
    return [];
  }
  const owner = new Map(library.characters.map((character) => [character.id, character.name]));
  return [
    "",
    "Characters and outfits below have stored appearance tags that are added automatically. For these characters, character tags hold only pose, action and expression, never hair, eyes, face, body or clothing, and never an outfit name; use exactly the name shown, not an alias.",
    ...library.characters.map(
      (character) =>
        `- character: ${character.name}${character.aliases.length > 0 ? ` (also called ${character.aliases.join(", ")})` : ""}`,
    ),
    ...library.outfits.map((outfit) => {
      const worn_by = outfit.character_id === null ? undefined : owner.get(outfit.character_id);
      return `- outfit: ${outfit.name}${worn_by === undefined ? "" : ` (worn by ${worn_by})`}`;
    }),
  ];
}

/** The fields every proposed reply illustration carries. */
const PROPOSAL_FIELD_LINES: readonly string[] = [
  "- paragraph: the paragraph number",
  "- scene: one sentence describing what the picture shows",
  "- tags: comma-separated Danbooru-style English tags for an anime image model describing what the characters share: setting, background, lighting, composition. When nobody is visible, describe the whole picture here",
  "- characters: one entry per character visible in the picture, with name exactly as written in the story and tags: that character's own Danbooru-style tags starting with girl or boy by the character's gender as the story shows it (other only for a creature or machine without one; no numbers), then appearance, clothing, pose, action and expression; use a character name tag only when it is a well-known Danbooru character",
];

/** What each picture must keep from the story beyond the paragraph's own words. */
function continuity_lines(viewer: string | null): readonly string[] {
  return [
    "Put everyone who takes part in the moment into the picture, so both sides of an exchange are visible: a character being tended, handed something or spoken to belongs in it too.",
    "In each character's tags include what they hold and the visible states the story has set up that still hold, such as wet hair, a bandaged arm, blood or torn clothing.",
    ...(viewer === null
      ? []
      : [`"You" in the story is ${viewer}; when ${viewer} is visible, list them under that name.`]),
  ];
}

function request_input(
  selection: string,
  reply_format: string,
  paragraphs: readonly Paragraph[],
  library: SlotLibrary,
  guidance: string,
  viewer: string | null,
): string {
  return [
    "[Inkwell illustration request]",
    selection,
    ...PROPOSAL_FIELD_LINES,
    ...continuity_lines(viewer),
    reply_format,
    ...library_lines(library),
    ...guidance_lines(guidance),
    "",
    "Paragraphs:",
    ...paragraphs.map((paragraph) => `[${String(paragraph.index)}] ${paragraph.text}`),
  ].join("\n");
}

export function build_analysis_input(
  paragraphs: readonly Paragraph[],
  max_images: number,
  library: SlotLibrary,
  guidance: string,
  viewer: string | null,
): string {
  return request_input(
    `Read the latest reply below, split into numbered paragraphs. Choose at most ${String(max_images)} paragraphs that would benefit most from an illustration: vivid, visually distinct moments. For each one give:`,
    'Reply with only a JSON object of the form {"illustrations":[...]}. Use an empty array when nothing should be illustrated.',
    paragraphs,
    library,
    guidance,
    viewer,
  );
}

/** Asks for the paragraphs the user picked; the rest of the reply is sent as context. */
export function build_chosen_paragraphs_input(
  paragraphs: readonly Paragraph[],
  chosen: readonly number[],
  library: SlotLibrary,
  guidance: string,
  viewer: string | null,
): string {
  return request_input(
    `Read the latest reply below, split into numbered paragraphs. Illustrate exactly these paragraphs, one entry each: ${chosen.map((index) => `[${String(index)}]`).join(", ")}. For each one give:`,
    'Reply with only a JSON object of the form {"illustrations":[...]}.',
    paragraphs,
    library,
    guidance,
    viewer,
  );
}
