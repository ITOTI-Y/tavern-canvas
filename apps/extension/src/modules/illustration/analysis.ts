import { z } from "zod";

import type { HostJsonSchema } from "../../host/index.js";
import type { SlotLibrary } from "./library_match.js";
import type { Paragraph } from "./slot_markers.js";

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

function library_lines(library: SlotLibrary): readonly string[] {
  if (library.characters.length === 0 && library.outfits.length === 0) {
    return [];
  }
  const owner = new Map(library.characters.map((character) => [character.id, character.name]));
  return [
    "",
    "Characters and outfits below have stored appearance tags that are added automatically. For these characters, character tags hold only pose, action and expression, never hair, eyes, face, body or clothing, and never an outfit name; use exactly the name shown.",
    ...library.characters.map((character) => `- character: ${character.name}`),
    ...library.outfits.map((outfit) => {
      const worn_by = outfit.character_id === null ? undefined : owner.get(outfit.character_id);
      return `- outfit: ${outfit.name}${worn_by === undefined ? "" : ` (worn by ${worn_by})`}`;
    }),
  ];
}

export function build_analysis_input(
  paragraphs: readonly Paragraph[],
  max_images: number,
  library: SlotLibrary,
): string {
  return [
    "[Inkwell illustration request]",
    `Read the latest reply below, split into numbered paragraphs. Choose at most ${String(max_images)} paragraphs that would benefit most from an illustration: vivid, visually distinct moments. For each one give:`,
    "- paragraph: the paragraph number",
    "- scene: one sentence describing what the picture shows",
    "- tags: comma-separated Danbooru-style English tags for an anime image model describing what the characters share: setting, background, lighting, composition. When nobody is visible, describe the whole picture here",
    "- characters: one entry per character visible in the picture, with name exactly as written in the story and tags: that character's own Danbooru-style tags starting with girl, boy or other (no numbers), then appearance, clothing, pose, action and expression; use a character name tag only when it is a well-known Danbooru character",
    'Reply with only a JSON object of the form {"illustrations":[...]}. Use an empty array when nothing should be illustrated.',
    ...library_lines(library),
    "",
    "Paragraphs:",
    ...paragraphs.map((paragraph) => `[${String(paragraph.index)}] ${paragraph.text}`),
  ].join("\n");
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

const REASONING_BLOCK_PATTERN = /<(think|thinking|reasoning)>[\s\S]*?<\/\1>/giu;
const FENCED_JSON_PATTERN = /```(?:json)?\s*([\s\S]*?)```/giu;

function last_balanced_object(text: string): string | null {
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
          if (candidate.includes('"illustrations"')) {
            return candidate;
          }
          break;
        }
      }
    }
  }
  return null;
}

function candidate_texts(raw: string): readonly string[] {
  const without_reasoning = raw.replace(REASONING_BLOCK_PATTERN, "").trim();
  const fenced = [...without_reasoning.matchAll(FENCED_JSON_PATTERN)]
    .map((match) => (match[1] ?? "").trim())
    .reverse();
  const balanced = last_balanced_object(without_reasoning);
  return [without_reasoning, ...fenced, ...(balanced === null ? [] : [balanced])];
}

/** Structured output when the backend honored the schema; otherwise the JSON is dug out of the text. */
export function parse_analysis_output(
  raw: string,
  paragraph_count: number,
  max_images: number,
): readonly IllustrationProposal[] {
  for (const candidate of candidate_texts(raw)) {
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
