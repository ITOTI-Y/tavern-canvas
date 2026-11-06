import type { StripSettings, Wearing } from "@tavern-canvas/contracts";
import { z } from "zod";

import type { HostJsonSchema } from "../../host/index.js";
import {
  AnalysisParseError,
  library_lines,
  PROPOSAL_FIELD_LINES,
  type IllustrationProposal,
} from "../illustration/analysis.js";
import type {
  SlotGenerationInput,
  SlotPromptContext,
} from "../illustration/illustration_service.js";
import { json_candidates } from "../illustration/model_json.js";
import { proposal_slots } from "../illustration/proposal_slots.js";
import { split_paragraphs, type Paragraph } from "../illustration/slot_markers.js";
import { guidance_lines } from "../illustration/user_guidance.js";
import type { CreationScene, ImageSize, SceneFrame } from "./creation_record.js";

/** NovelAI's normal canvases, the ones that cost no extra Anlas. */
export const FRAME_SIZES: Readonly<Record<SceneFrame, ImageSize>> = {
  portrait: { width: 832, height: 1216 },
  landscape: { width: 1216, height: 832 },
  square: { width: 1024, height: 1024 },
};

export interface ScenePlan extends IllustrationProposal {
  readonly frame: SceneFrame;
}

export const SCENE_JSON_SCHEMA: HostJsonSchema = {
  name: "tavern_canvas_scenes",
  value: {
    type: "object",
    properties: {
      scenes: {
        type: "array",
        items: {
          type: "object",
          properties: {
            paragraph: { type: "integer" },
            scene: { type: "string" },
            frame: { type: "string", enum: ["portrait", "landscape", "square"] },
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
          required: ["paragraph", "scene", "frame", "tags", "characters"],
          additionalProperties: false,
        },
      },
    },
    required: ["scenes"],
    additionalProperties: false,
  },
};

const FRAME_LINE =
  "- frame: portrait for one figure or a close-up, landscape for a wide shot, a place or several figures side by side, square otherwise";

export type ScenePlanKind = "story" | "strip";

/** The request that turns a story, or a stretch of chat, into pictures to confirm before drawing. */
export function build_scene_input(
  kind: ScenePlanKind,
  paragraphs: readonly Paragraph[],
  max_scenes: number,
  context: SlotPromptContext,
  guidance: string,
): string {
  const selection =
    kind === "story"
      ? `Read the story below, split into numbered paragraphs. Choose at most ${String(max_scenes)} moments that would make the strongest pictures, in story order. For each one give:`
      : `Read the chat messages below, split into numbered paragraphs. Retell them as a comic strip of at most ${String(max_scenes)} panels, in the order the events happen; several panels may come from one paragraph. A panel is a single picture with no lettering: no speech bubbles, captions or sound effects. For each panel give:`;
  return [
    kind === "story" ? "[Inkwell scene request]" : "[Inkwell comic strip request]",
    selection,
    ...PROPOSAL_FIELD_LINES,
    FRAME_LINE,
    'Reply with only a JSON object of the form {"scenes":[...]}.',
    ...library_lines(context.library),
    ...guidance_lines(guidance),
    "",
    "Paragraphs:",
    ...paragraphs.map((paragraph) => `[${String(paragraph.index)}] ${paragraph.text}`),
  ].join("\n");
}

const PlanSchema = z.object({
  paragraph: z.number().int().min(0),
  scene: z.string().trim().min(1).max(2000),
  frame: z.enum(["portrait", "landscape", "square"]).catch("square"),
  tags: z.union([z.string(), z.array(z.string()).transform((tags) => tags.join(", "))]),
  characters: z
    .array(z.object({ name: z.string().trim().min(1).max(120), tags: z.string().trim() }))
    .max(16),
});
const PlanOutputSchema = z.object({ scenes: z.array(PlanSchema) });

/** Structured output when the backend honored the schema; otherwise the JSON is dug out of the text. */
export function parse_scene_output(
  raw: string,
  paragraph_count: number,
  max_scenes: number,
): readonly ScenePlan[] {
  for (const candidate of json_candidates(raw, "scenes")) {
    let value: unknown;
    try {
      value = JSON.parse(candidate);
    } catch {
      continue;
    }
    const parsed = PlanOutputSchema.safeParse(value);
    if (parsed.success) {
      return parsed.data.scenes
        .filter((plan) => plan.paragraph < paragraph_count)
        .slice(0, max_scenes);
    }
  }
  throw new AnalysisParseError("The reply contains no scenes JSON object", raw);
}

export interface StripMessage {
  readonly name: string;
  readonly text: string;
}

/** Each message's paragraphs prefixed with who wrote them, numbered across the whole stretch. */
export function strip_paragraphs(messages: readonly StripMessage[]): readonly Paragraph[] {
  const paragraphs: Paragraph[] = [];
  for (const message of messages) {
    for (const paragraph of split_paragraphs(message.text)) {
      paragraphs.push({
        index: paragraphs.length,
        text: `${message.name}: ${paragraph.text}`,
        line: paragraph.line,
      });
    }
  }
  return paragraphs;
}

/** Prompts for each planned picture, assembled the way chat illustrations assemble theirs. */
export function scenes_from_plans(
  paragraphs: readonly Paragraph[],
  plans: readonly ScenePlan[],
  context: SlotPromptContext,
  snapshot: readonly Wearing[],
  new_id: () => string,
): CreationScene[] {
  const slots = proposal_slots(paragraphs, plans, context, snapshot, new_id);
  return slots.map((slot, index) => ({
    id: slot.slot_id,
    enabled: true,
    scene: slot.scene,
    excerpt: slot.anchor.slice(0, 200),
    characters: slot.characters,
    size: FRAME_SIZES[plans[index]?.frame ?? "square"],
    positive_prompt: slot.positive_prompt,
    negative_prompt: slot.negative_prompt,
    character_prompts: slot.character_prompts,
    image_ids: [],
    active_image_id: null,
    last_error: null,
  }));
}

function join_tags(...parts: readonly string[]): string {
  return parts
    .map((part) =>
      part
        .trim()
        .replace(/^,+|,+$/gu, "")
        .trim(),
    )
    .filter((part) => part !== "")
    .join(", ");
}

/** What one scene submits; a strip adds its style tags and always the no-lettering tags. */
export function scene_generation_input(
  scene: CreationScene,
  strip: { readonly settings: StripSettings; readonly style: "strip" | "default" } | null,
): SlotGenerationInput {
  return {
    positive_prompt:
      strip?.style === "strip"
        ? join_tags(scene.positive_prompt, strip.settings.style_tags)
        : scene.positive_prompt,
    negative_prompt:
      strip === null
        ? scene.negative_prompt
        : join_tags(scene.negative_prompt, strip.settings.no_text_tags),
    character_prompts: scene.character_prompts,
    size: scene.size,
  };
}
