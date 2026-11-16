import type { ImageSize } from "@tavern-canvas/contracts";

import type { SlotLibrary } from "./library_match.js";
import type { Paragraph } from "./slot_markers.js";
import { size_field_lines } from "./size_choice.js";
import { guidance_lines } from "./user_guidance.js";

export function library_lines(library: SlotLibrary): readonly string[] {
  if (library.characters.length === 0 && library.outfits.length === 0) {
    return [];
  }
  const owner = new Map(library.characters.map((character) => [character.id, character.name]));
  return [
    "",
    "Characters and outfits below have stored appearance tags that are added automatically. For these characters, character tags hold only pose, action, gaze and expression, never hair, eyes, face, body or clothing, and never an outfit name; use exactly the name shown, not an alias.",
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
  "- caption: one plain English sentence without commas that tells the image model who is where and doing what to whom, calling every character by their look, such as the pink-haired girl, never by name",
  "- tags: comma-separated Danbooru-style English tags for an anime image model describing what the characters share: setting, background, lighting, composition. When nobody is visible, describe the whole picture here",
  "- characters: one entry per character visible in the picture, with name exactly as written in the story and tags: that character's own Danbooru-style tags starting with girl or boy by the character's gender as the story shows it (other only for a creature or machine without one; no numbers), then appearance, clothing, pose, action, gaze and expression; use a character name tag only when it is a well-known Danbooru character; and position: where the character is in the picture, x one of left, center-left, center, center-right, right and y one of top, middle, bottom, where bottom is nearer the viewer",
];

/** What each picture must keep from the story beyond the paragraph's own words. */
function continuity_lines(viewer: string | null): readonly string[] {
  return [
    "Put everyone who takes part in the moment into the picture, so both sides of an exchange are visible: a character being tended, handed something or spoken to belongs in it too.",
    "In each character's tags include what they hold and the visible states the story has set up that still hold, such as wet hair, a bandaged arm, blood or torn clothing.",
    "Give every character one gaze tag that says where they look and fits their pose: looking at another, looking down, looking up, looking to the side, looking back, looking away or closed eyes. Characters look at each other or at what they are doing; looking at viewer is only for a character who addresses the viewer. For a character turned away from the viewer add profile, from side or from behind.",
    "Animals and creatures that take part in the moment are characters too: give each its own entry named by kind, such as wolf 1, with tags starting with other.",
    "For an action between two characters, put it in both entries with a prefix: source# for the one who acts and target# for the one acted on, or mutual# on both when they act on each other, such as source#hug and target#hug.",
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
  sizes: readonly ImageSize[],
): string {
  return [
    "[Inkwell illustration request]",
    selection,
    ...PROPOSAL_FIELD_LINES,
    ...size_field_lines(sizes),
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
  sizes: readonly ImageSize[],
): string {
  return request_input(
    `Read the latest reply below, split into numbered paragraphs. Choose at most ${String(max_images)} paragraphs that would benefit most from an illustration: vivid, visually distinct moments. For each one give:`,
    'Reply with only a JSON object of the form {"illustrations":[...]}. Use an empty array when nothing should be illustrated.',
    paragraphs,
    library,
    guidance,
    viewer,
    sizes,
  );
}

/** Asks for the paragraphs the user picked; the rest of the reply is sent as context. */
export function build_chosen_paragraphs_input(
  paragraphs: readonly Paragraph[],
  chosen: readonly number[],
  library: SlotLibrary,
  guidance: string,
  viewer: string | null,
  sizes: readonly ImageSize[],
): string {
  return request_input(
    `Read the latest reply below, split into numbered paragraphs. Illustrate exactly these paragraphs, one entry each: ${chosen.map((index) => `[${String(index)}]`).join(", ")}. For each one give:`,
    'Reply with only a JSON object of the form {"illustrations":[...]}.',
    paragraphs,
    library,
    guidance,
    viewer,
    sizes,
  );
}
