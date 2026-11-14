import { z } from "zod";

import type { CharacterCenter, ImageSize } from "@tavern-canvas/contracts";

import type { HostJsonSchema } from "../../host/index.js";
import { AnalysisParseError } from "./analysis_error.js";
import { json_candidates } from "./model_json.js";
import { chosen_size, size_json_schema } from "./size_choice.js";

export interface ProposedCharacter {
  readonly name: string;
  readonly tags: string;
  /** `undefined` lets the image model place the character. */
  readonly center?: CharacterCenter;
}

export interface IllustrationProposal {
  readonly paragraph: number;
  readonly scene: string;
  /** One plain sentence for the image model on who is where doing what; may be empty. */
  readonly caption: string;
  readonly tags: string;
  readonly characters: readonly ProposedCharacter[];
  /** `undefined` keeps the image profile's canvas. */
  readonly size?: ImageSize;
}

const POSITION_X = { left: 0.1, "center-left": 0.3, center: 0.5, "center-right": 0.7, right: 0.9 };
const POSITION_Y = { top: 0.3, middle: 0.5, bottom: 0.7 };

/** The JSON Schema of a character's place in the picture, shared with created scenes. */
export const POSITION_JSON_SCHEMA = {
  type: "object",
  properties: {
    x: { type: "string", enum: Object.keys(POSITION_X) },
    y: { type: "string", enum: Object.keys(POSITION_Y) },
  },
  required: ["x", "y"],
  additionalProperties: false,
} as const;

export const PositionSchema = z
  .object({
    x: z.enum(["left", "center-left", "center", "center-right", "right"]),
    y: z.enum(["top", "middle", "bottom"]),
  })
  .nullable()
  .catch(null);

/** The image coordinates of a named position, or nothing when the model gave none. */
export function center_of(position: z.infer<typeof PositionSchema>): {
  readonly center?: CharacterCenter;
} {
  return position === null
    ? {}
    : { center: { x: POSITION_X[position.x], y: POSITION_Y[position.y] } };
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
            caption: { type: "string" },
            tags: { type: "string" },
            characters: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  tags: { type: "string" },
                  position: POSITION_JSON_SCHEMA,
                },
                required: ["name", "tags", "position"],
                additionalProperties: false,
              },
            },
          },
          required: ["paragraph", "scene", "caption", "tags", "characters"],
          additionalProperties: false,
        },
      },
    },
    required: ["illustrations"],
    additionalProperties: false,
  },
};

interface ObjectSchema {
  readonly properties: Record<string, unknown>;
  readonly required: readonly string[];
}

/** The analysis schema with each picture's canvas to choose when the size set offers a choice. */
export function analysis_json_schema(sizes: readonly ImageSize[]): HostJsonSchema {
  if (sizes.length < 2) {
    return ANALYSIS_JSON_SCHEMA;
  }
  const root = ANALYSIS_JSON_SCHEMA.value as unknown as ObjectSchema;
  const list = root.properties.illustrations as { readonly items: ObjectSchema };
  return {
    name: ANALYSIS_JSON_SCHEMA.name,
    value: {
      ...root,
      properties: {
        illustrations: {
          ...list,
          items: {
            ...list.items,
            properties: { ...list.items.properties, size: size_json_schema(sizes) },
            required: [...list.items.required, "size"],
          },
        },
      },
    },
  };
}

/** One request that also carries a wardrobe update, answered as `{illustrations, wardrobe}`. */
export function combined_analysis_json_schema(
  wardrobe: HostJsonSchema,
  schema: HostJsonSchema = ANALYSIS_JSON_SCHEMA,
): HostJsonSchema {
  const analysis = schema.value as unknown as ObjectSchema;
  return {
    name: schema.name,
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

const ProposalSchema = z
  .object({
    paragraph: z.number().int().min(0),
    scene: z.string().trim().min(1).max(2000),
    caption: z.string().trim().max(600).catch(""),
    tags: z.union([z.string(), z.array(z.string()).transform((tags) => tags.join(", "))]),
    characters: z
      .array(
        z.object({
          name: z.string().trim().min(1).max(120),
          tags: z.string().trim(),
          position: PositionSchema,
        }),
      )
      .max(16),
    size: z.unknown().optional(),
  })
  .transform(({ characters, ...proposal }) => ({
    ...proposal,
    characters: characters.map(({ position, ...character }) => ({
      ...character,
      ...center_of(position),
    })),
  }));

const AnalysisOutputSchema = z.object({ illustrations: z.array(ProposalSchema) });

/** Structured output when the backend honored the schema; otherwise the JSON is dug out of the text. */
export function parse_analysis_output(
  raw: string,
  paragraph_count: number,
  max_images: number,
  sizes: readonly ImageSize[] = [],
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
      .slice(0, max_images)
      .map(({ size, ...proposal }) => {
        const chosen = chosen_size(size, sizes);
        return chosen === undefined ? proposal : { ...proposal, size: chosen };
      });
  }
  throw new AnalysisParseError("The analysis reply contains no illustrations JSON object", raw);
}
