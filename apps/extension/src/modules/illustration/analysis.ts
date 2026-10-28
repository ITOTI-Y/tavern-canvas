import { z } from "zod";

import type { HostJsonSchema } from "../../host/index.js";
import { json_candidates } from "./model_json.js";
import type { SlotLibrary } from "./library_match.js";
import type { Paragraph } from "./slot_markers.js";
import { guidance_lines } from "./user_guidance.js";

export interface ProposedCharacter {
  readonly name: string;
  readonly tags: string;
}

export interface IllustrationProposal {
  readonly paragraph: number;
  readonly scene: string;
  readonly tags: string;
  readonly characters: readonly ProposedCharacter[];
}

export const ANALYSIS_JSON_SCHEMA: HostJsonSchema = {
  name: "tavern_canvas_illustrations",
  value: {
    type: "object",
    properties: {
      illustrations: {
        type: "array",
        items: {
          type: "object",
          properties: {
            paragraph: { type: "integer" },
            scene: { type: "string" },
            tags: { type: "string" },
            characters: {
              type: "array",
              items: {
                type: "object",
                properties: { name: { type: "string" }, tags: { type: "string" } },
                required: ["name", "tags"],
                additionalProperties: false,
              },
            },
          },
          required: ["paragraph", "scene", "tags", "characters"],
          additionalProperties: false,
        },
      },
    },
    required: ["illustrations"],
    additionalProperties: false,
  },
};

/** One request that also carries a wardrobe update, answered as `{illustrations, wardrobe}`. */
export function combined_analysis_json_schema(wardrobe: HostJsonSchema): HostJsonSchema {
  const analysis = ANALYSIS_JSON_SCHEMA.value as { readonly properties: Record<string, unknown> };
  return {
    name: ANALYSIS_JSON_SCHEMA.name,
    value: {
      type: "object",
      properties: { ...analysis.properties, wardrobe: wardrobe.value },
      required: ["illustrations", "wardrobe"],
      additionalProperties: false,
    },
  };
}

export const COMBINED_REPLY_FORMAT =
  'Answer both requests above in one JSON object of the form {"illustrations":[...],"wardrobe":{"characters":[...],"initial_outfits":{...}}}. This replaces the reply format each request states.';

/** The `wardrobe` member of a combined reply as JSON text, or `null` when the reply has none. */
export function wardrobe_reply_of(raw: string): string | null {
  for (const candidate of json_candidates(raw, "illustrations")) {
    try {
      const value = JSON.parse(candidate) as { readonly wardrobe?: unknown };
      if (typeof value.wardrobe === "object" && value.wardrobe !== null) {
        return JSON.stringify(value.wardrobe);
      }
    } catch {
      continue;
    }
  }
  return null;
}

function library_lines(library: SlotLibrary): readonly string[] {
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

function request_input(
  selection: string,
  reply_format: string,
  paragraphs: readonly Paragraph[],
  library: SlotLibrary,
  guidance: string,
): string {
  return [
    "[Inkwell illustration request]",
    selection,
    "- paragraph: the paragraph number",
    "- scene: one sentence describing what the picture shows",
    "- tags: comma-separated Danbooru-style English tags for an anime image model describing what the characters share: setting, background, lighting, composition. When nobody is visible, describe the whole picture here",
    "- characters: one entry per character visible in the picture, with name exactly as written in the story and tags: that character's own Danbooru-style tags starting with girl or boy by the character's gender as the story shows it (other only for a creature or machine without one; no numbers), then appearance, clothing, pose, action and expression; use a character name tag only when it is a well-known Danbooru character",
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
): string {
  return request_input(
    `Read the latest reply below, split into numbered paragraphs. Choose at most ${String(max_images)} paragraphs that would benefit most from an illustration: vivid, visually distinct moments. For each one give:`,
    'Reply with only a JSON object of the form {"illustrations":[...]}. Use an empty array when nothing should be illustrated.',
    paragraphs,
    library,
    guidance,
  );
}

/** Asks for the paragraphs the user picked; the rest of the reply is sent as context. */
export function build_chosen_paragraphs_input(
  paragraphs: readonly Paragraph[],
  chosen: readonly number[],
  library: SlotLibrary,
  guidance: string,
): string {
  return request_input(
    `Read the latest reply below, split into numbered paragraphs. Illustrate exactly these paragraphs, one entry each: ${chosen.map((index) => `[${String(index)}]`).join(", ")}. For each one give:`,
    'Reply with only a JSON object of the form {"illustrations":[...]}.',
    paragraphs,
    library,
    guidance,
  );
}

const ProposalSchema = z.object({
  paragraph: z.number().int().min(0),
  scene: z.string().trim().min(1).max(2000),
  tags: z.union([z.string(), z.array(z.string()).transform((tags) => tags.join(", "))]),
  characters: z
    .array(z.object({ name: z.string().trim().min(1).max(120), tags: z.string().trim() }))
    .max(16),
});

const AnalysisOutputSchema = z.object({ illustrations: z.array(ProposalSchema) });

/** Carries the start of the raw output so the user can see what their preset made the model write. */
export class AnalysisParseError extends Error {
  readonly excerpt: string;

  constructor(message: string, raw: string) {
    super(message);
    this.name = "AnalysisParseError";
    this.excerpt = raw.slice(0, 400);
  }
}

/** Structured output when the backend honored the schema; otherwise the JSON is dug out of the text. */
export function parse_analysis_output(
  raw: string,
  paragraph_count: number,
  max_images: number,
): readonly IllustrationProposal[] {
  for (const candidate of json_candidates(raw, "illustrations")) {
    let value: unknown;
    try {
      value = JSON.parse(candidate);
    } catch {
      continue;
    }
    const parsed = AnalysisOutputSchema.safeParse(value);
    if (!parsed.success) {
      continue;
    }
    const seen = new Set<number>();
    return parsed.data.illustrations
      .filter((proposal) => {
        if (proposal.paragraph >= paragraph_count || seen.has(proposal.paragraph)) {
          return false;
        }
        seen.add(proposal.paragraph);
        return true;
      })
      .slice(0, max_images);
  }
  throw new AnalysisParseError("The analysis reply contains no illustrations JSON object", raw);
}
