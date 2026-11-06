import type { StripSettings, Wearing } from "@tavern-canvas/contracts";
import { z } from "zod";

import type { HostJsonSchema } from "../../host/index.js";
import {
  AnalysisParseError,
  library_lines,
  type IllustrationProposal,
} from "../illustration/analysis.js";
import { is_named } from "../illustration/library_match.js";
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

export const SHOTS = [
  "establishing",
  "wide",
  "medium",
  "close-up",
  "extreme close-up",
  "over the shoulder",
  "pov",
  "insert",
] as const;
export type Shot = (typeof SHOTS)[number];

/** The image-model tags that frame each shot size. */
const SHOT_TAGS: Readonly<Record<Shot, string>> = {
  establishing: "wide shot, scenery",
  wide: "wide shot, full body",
  medium: "cowboy shot",
  "close-up": "close-up, portrait",
  "extreme close-up": "close-up, face focus",
  "over the shoulder": "from behind, depth of field",
  pov: "pov",
  insert: "close-up, still life, object focus",
};

export interface ScenePlan extends IllustrationProposal {
  readonly frame: SceneFrame;
  readonly shot: Shot | null;
  /** The name of the place in `places` the picture is set in. */
  readonly place: string | null;
}

/** A name with the tags it stands for: a character's fixed look, or a place. */
export interface NamedTags {
  readonly name: string;
  readonly tags: string;
}

/** The planned pictures, the fixed look of everyone in them and the places they happen in. */
export interface PlannedScenes {
  readonly cast: readonly NamedTags[];
  readonly places: readonly NamedTags[];
  readonly plans: readonly ScenePlan[];
}

const NAMED_TAGS = {
  type: "object",
  properties: { name: { type: "string" }, tags: { type: "string" } },
  required: ["name", "tags"],
  additionalProperties: false,
} as const;

export const SCENE_JSON_SCHEMA: HostJsonSchema = {
  name: "tavern_canvas_scenes",
  value: {
    type: "object",
    properties: {
      cast: { type: "array", items: NAMED_TAGS },
      places: { type: "array", items: NAMED_TAGS },
      scenes: {
        type: "array",
        items: {
          type: "object",
          properties: {
            paragraph: { type: "integer" },
            scene: { type: "string" },
            shot: { type: "string", enum: [...SHOTS] },
            place: { type: "string" },
            frame: { type: "string", enum: ["portrait", "landscape", "square"] },
            tags: { type: "string" },
            characters: { type: "array", items: NAMED_TAGS },
          },
          required: ["paragraph", "scene", "shot", "place", "frame", "tags", "characters"],
          additionalProperties: false,
        },
      },
    },
    required: ["cast", "places", "scenes"],
    additionalProperties: false,
  },
};

export type ScenePlanKind = "story" | "strip";

/** Storyboard rules shared by stories and strips: each picture must carry its own beat. */
const STORYBOARD_LINES: readonly string[] = [
  "Plan the pictures like a storyboard:",
  "- The first picture establishes the place, who is there and the time of day.",
  "- Each later picture shows the next story beat: an action, its result or a reaction. Something visible changes from the previous picture: a pose, a gesture, an object changing hands, an expression, the light.",
  "- Show feelings through faces, gestures and body language. Use a close-up for an emotional beat and an insert shot for an object the plot turns on.",
  "- Vary shot sizes and camera angles; do not repeat the same framing in consecutive pictures.",
  "- Keep the place, the lighting and each character's look the same unless the story changes them.",
  "- Put everyone who takes part in a moment into its picture, so both sides of an exchange are visible. Characters look at each other or at what they are doing, not at the viewer, except in a pov shot.",
  "- Make what is only said or thought visible. When a character tells of a danger, a memory or something far away, draw that thing itself, or the speaker pointing at it with the listener reacting in the same picture; never a picture of something the reader has not been shown a reason for.",
  "- Lead into every change of view: before a picture of a new place or object, the previous picture shows someone looking at it, pointing at it or moving toward it.",
];

const CAST_LINE =
  "Give cast: one entry per character who appears in any picture, with name exactly as written in the text and tags: that character's fixed look as Danbooru-style English tags for an anime image model, starting with girl or boy by the character's gender as the text shows it (other only for a creature or machine without one; no numbers), then hair, eyes, build and clothing. These tags are repeated on every picture, so leave out pose and expression; use a character name tag only when it is a well-known Danbooru character.";

const PLACES_LINE =
  "Give places: one entry per distinct place a picture is set in, with a short name and tags: Danbooru-style English tags for that place's look (indoor or outdoor, building, materials, furniture, landscape). These tags are added to every picture set there, so leave out lighting that changes and the props of a single moment.";

const SCENE_FIELD_LINES: readonly string[] = [
  "Give scenes, in reading order, one entry per picture:",
  "- paragraph: the number of the paragraph the picture retells",
  "- scene: one sentence saying what happens in this picture",
  `- shot: one of ${SHOTS.join(", ")}`,
  "- place: the name of its place in places",
  "- frame: portrait for one figure or a close-up, landscape for an establishing or wide shot or several figures side by side, square otherwise",
  "- tags: Danbooru-style English tags for this picture's lighting, time of day and the props that matter in it, plus any style or artist tags the guidance below asks for",
  "- characters: one entry per character visible in this picture, with name as in cast and tags: only this picture's pose, action, gaze and expression",
];

/** The request that turns a story, or a stretch of chat, into pictures to confirm before drawing. */
export function build_scene_input(
  kind: ScenePlanKind,
  paragraphs: readonly Paragraph[],
  max_scenes: number,
  context: SlotPromptContext,
  guidance: string,
  viewer: string | null,
): string {
  const count = String(max_scenes);
  const selection =
    kind === "story"
      ? [
          `Read the story below, split into numbered paragraphs. Choose at most ${count} moments that together tell the story, in story order, so that someone who has not read it can follow it from the pictures.`,
        ]
      : [
          `Read the chat messages below, split into numbered paragraphs, and retell them as a wordless comic strip of at most ${count} panels in the order the events happen; several panels may come from one paragraph. A reader who has not seen the text must be able to follow the story from the panels alone.`,
          "Each panel is one single picture with no lettering: no speech bubbles, captions, sound effects or written signs. Turn dialogue into expressions and gestures.",
        ];
  const viewer_line =
    viewer === null
      ? []
      : [
          `"You" in the text is ${viewer}. Draw ${viewer} like any other character in cast, or use the pov shot when a moment is seen through ${viewer}'s eyes.`,
        ];
  return [
    kind === "story" ? "[Inkwell scene request]" : "[Inkwell comic strip request]",
    ...selection,
    ...STORYBOARD_LINES,
    ...viewer_line,
    CAST_LINE,
    PLACES_LINE,
    ...SCENE_FIELD_LINES,
    'Reply with only a JSON object of the form {"cast":[...],"places":[...],"scenes":[...]}.',
    ...library_lines(context.library),
    ...guidance_lines(guidance),
    "",
    "Paragraphs:",
    ...paragraphs.map((paragraph) => `[${String(paragraph.index)}] ${paragraph.text}`),
  ].join("\n");
}

const TagsSchema = z.union([z.string(), z.array(z.string()).transform((tags) => tags.join(", "))]);
const NamedTagsSchema = z.object({ name: z.string().trim().min(1).max(120), tags: TagsSchema });

const PlanSchema = z.object({
  paragraph: z.number().int().min(0),
  scene: z.string().trim().min(1).max(2000),
  shot: z.enum(SHOTS).nullable().catch(null),
  place: z.string().trim().nullable().catch(null),
  frame: z.enum(["portrait", "landscape", "square"]).catch("square"),
  tags: TagsSchema,
  characters: z.array(NamedTagsSchema).max(16),
});
const PlanOutputSchema = z.object({
  cast: z.array(NamedTagsSchema).max(32).catch([]),
  places: z.array(NamedTagsSchema).max(32).catch([]),
  scenes: z.array(PlanSchema),
});

/** Structured output when the backend honored the schema; otherwise the JSON is dug out of the text. */
export function parse_scene_output(
  raw: string,
  paragraph_count: number,
  max_scenes: number,
): PlannedScenes {
  for (const candidate of json_candidates(raw, "scenes")) {
    let value: unknown;
    try {
      value = JSON.parse(candidate);
    } catch {
      continue;
    }
    const parsed = PlanOutputSchema.safeParse(value);
    if (parsed.success) {
      return {
        cast: parsed.data.cast,
        places: parsed.data.places,
        plans: parsed.data.scenes
          .filter((plan) => plan.paragraph < paragraph_count)
          .slice(0, max_scenes),
      };
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

/**
 * Prompts for each planned picture, assembled the way chat illustrations assemble theirs. The shot
 * adds its framing tags and the place its look, the same on every picture set there; every character
 * outside the library carries the cast look on every picture so it stays the same person, while
 * library characters keep their own appearance.
 */
export function scenes_from_plans(
  paragraphs: readonly Paragraph[],
  planned: PlannedScenes,
  context: SlotPromptContext,
  snapshot: readonly Wearing[],
  new_id: () => string,
): CreationScene[] {
  const tags_of = (entries: readonly NamedTags[], name: string): string => {
    const lowered = name.trim().toLowerCase();
    return entries.find((entry) => entry.name.trim().toLowerCase() === lowered)?.tags ?? "";
  };
  const look = (name: string): string =>
    context.library.characters.some((character) => is_named(character, name))
      ? ""
      : tags_of(planned.cast, name);
  const plans = planned.plans.map((plan) => ({
    ...plan,
    tags: join_tags(
      plan.shot === null ? "" : SHOT_TAGS[plan.shot],
      plan.place === null ? "" : tags_of(planned.places, plan.place),
      plan.tags,
    ),
    characters: plan.characters.map((character) => ({
      name: character.name,
      tags: join_tags(look(character.name), character.tags),
    })),
  }));
  // Matched by the listed names only: a library character the paragraph merely mentions stays out
  // of a picture the plan leaves them out of.
  const unnamed = paragraphs.map((paragraph) => ({ ...paragraph, text: "" }));
  const slots = proposal_slots(
    unnamed,
    plans.map((plan) => ({ ...plan, scene: "" })),
    context,
    snapshot,
    new_id,
  );
  return slots.map((slot, index) => ({
    id: slot.slot_id,
    enabled: true,
    scene: plans[index]?.scene ?? "",
    excerpt: (paragraphs[plans[index]?.paragraph ?? -1]?.text ?? "").slice(0, 200),
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

/** A strip panel is one picture; these keep the image model from drawing a page of panels. */
const SINGLE_PICTURE_NEGATIVE = "comic, multiple views, 4koma, split screen";

/**
 * What one scene submits; a strip adds its style tags, and always the no-lettering tags and the
 * single-picture tags.
 */
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
        : join_tags(scene.negative_prompt, strip.settings.no_text_tags, SINGLE_PICTURE_NEGATIVE),
    character_prompts: scene.character_prompts,
    size: scene.size,
  };
}
