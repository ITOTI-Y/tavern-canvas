import { z } from "zod";

import type { OpeningStructuredRequest } from "../../ui/contracts/opening_port.js";
import { AnalysisParseError } from "../illustration/analysis_error.js";
import { json_candidates } from "../illustration/model_json.js";
import {
  MAX_OPTIONS,
  OpeningMessageSchema,
  OpeningQuestionSchema,
  type OpeningAnswer,
  type OpeningDraftPayload,
  type OpeningEntry,
  type OpeningMessage,
  type OpeningQuestion,
} from "./opening_model.js";

const STRING = { type: "string" } as const;

const QUESTION_VALUE = {
  type: "object",
  properties: {
    text: STRING,
    why: STRING,
    multiple: { type: "boolean" },
    options: {
      type: "array",
      items: {
        type: "object",
        properties: { label: STRING, detail: STRING },
        required: ["label", "detail"],
        additionalProperties: false,
      },
    },
  },
  required: ["text", "why", "multiple", "options"],
  additionalProperties: false,
} as const;

const ENTRY_VALUE = {
  type: "object",
  properties: {
    title: STRING,
    constant: { type: "boolean" },
    keys: { type: "array", items: STRING },
    content: STRING,
  },
  required: ["title", "constant", "keys", "content"],
  additionalProperties: false,
} as const;

export const QUESTION_JSON_SCHEMA = {
  name: "tavern_canvas_opening_question",
  value: {
    type: "object",
    properties: { question: { anyOf: [QUESTION_VALUE, { type: "null" }] } },
    required: ["question"],
    additionalProperties: false,
  },
} as const;

export const ENTRIES_JSON_SCHEMA = {
  name: "tavern_canvas_opening_entries",
  value: {
    type: "object",
    properties: { entries: { type: "array", items: ENTRY_VALUE } },
    required: ["entries"],
    additionalProperties: false,
  },
} as const;

export const ENTRY_JSON_SCHEMA = {
  name: "tavern_canvas_opening_entry",
  value: {
    type: "object",
    properties: { entry: ENTRY_VALUE },
    required: ["entry"],
    additionalProperties: false,
  },
} as const;

export const MESSAGE_JSON_SCHEMA = {
  name: "tavern_canvas_opening_message",
  value: {
    type: "object",
    properties: { speaker: STRING, text: STRING },
    required: ["speaker", "text"],
    additionalProperties: false,
  },
} as const;

const RULES = [
  "[Inkwell opening builder]",
  "You help the user build the opening of a roleplay story one step at a time: its world, characters, rules and first scene.",
  "Write every value in the language of the user's description.",
  "The user's own character is {{user}}. Refer to them only as {{user}} and never decide their appearance, personality or past.",
  "Keep everything consistent with what is settled below and with any world info you were given.",
];

function answer_line(answer: OpeningAnswer): string {
  const chosen = [...answer.selected, ...(answer.other.trim() === "" ? [] : [answer.other.trim()])];
  return `- Q: ${answer.question.text}\n  A: ${chosen.length === 0 ? "(left to you)" : chosen.join("; ")}`;
}

function entry_line(entry: OpeningEntry): string {
  const trigger = entry.constant ? "always active" : `keys: ${entry.keys.join(", ")}`;
  return `- ${entry.title} (${trigger}): ${entry.content}`;
}

/** Everything settled in the steps before `index`; a stale step still counts with its last result. */
function settled_lines(draft: OpeningDraftPayload, index: number): string[] {
  const lines: string[] = [];
  draft.steps.slice(0, index).forEach((step, position) => {
    const state = draft.states[position];
    if (state === undefined || (state.status !== "done" && state.status !== "stale")) {
      return;
    }
    lines.push(`## ${step.name}`);
    lines.push(...state.entries.map(entry_line));
    if (state.message !== null) {
      lines.push(`- Opening message by ${state.message.speaker}: ${state.message.text}`);
    }
  });
  return lines.length === 0 ? ["(nothing yet)"] : lines;
}

/** The chosen character card, as background the opening must stay consistent with. */
function card_lines(draft: OpeningDraftPayload): string[] {
  const { card } = draft;
  if (card === null) {
    return [];
  }
  const field = (label: string, text: string): string[] =>
    text.trim() === "" ? [] : [`${label}: ${text.trim()}`];
  const greeting =
    draft.use_greeting && card.first_message.trim() !== ""
      ? ["", "The card's first message, which also describes the world:", card.first_message.trim()]
      : [];
  return [
    "",
    `Character card of ${card.name} (background; keep everything consistent with it):`,
    ...field("Description", card.description),
    ...field("Personality", card.personality),
    ...field("Scenario", card.scenario),
    ...greeting,
  ];
}

function context_lines(draft: OpeningDraftPayload, index: number): string[] {
  const step = draft.steps[index];
  const state = draft.states[index];
  if (step === undefined || state === undefined) {
    throw new RangeError(`The draft has no step ${String(index)}`);
  }
  return [
    ...RULES,
    "",
    "The user's description:",
    draft.description.trim(),
    ...card_lines(draft),
    "",
    "Settled so far:",
    ...settled_lines(draft, index),
    "",
    `Current step: ${step.name}`,
    `What this step settles: ${step.instruction}`,
    "",
    "Answers given in this step:",
    ...(state.answers.length === 0 ? ["(none)"] : state.answers.map(answer_line)),
  ];
}

/** The text world book keywords are matched against: the description and every answer so far. */
export function activation_text(draft: OpeningDraftPayload): string {
  const { card } = draft;
  return [
    draft.description,
    ...(card === null ? [] : [card.description, card.scenario]),
    ...(card !== null && draft.use_greeting ? [card.first_message] : []),
    ...draft.states.flatMap((state) => [
      ...state.answers.flatMap((answer) => [...answer.selected, answer.other]),
      ...state.entries.map((entry) => `${entry.title} ${entry.content}`),
    ]),
  ].join("\n");
}

function first_match<T>(raw: string, key: string, schema: z.ZodType<T>, what: string): T {
  for (const candidate of json_candidates(raw, key)) {
    let value: unknown;
    try {
      value = JSON.parse(candidate);
    } catch {
      continue;
    }
    const parsed = schema.safeParse(value);
    if (parsed.success) {
      return parsed.data;
    }
  }
  throw new AnalysisParseError(`The reply contains no ${what} JSON object`, raw);
}

const QuestionReplySchema = z.object({
  question: z
    .preprocess(
      (value) =>
        typeof value === "object" &&
        value !== null &&
        "options" in value &&
        Array.isArray(value.options)
          ? { ...value, options: value.options.slice(0, MAX_OPTIONS) }
          : value,
      OpeningQuestionSchema,
    )
    .nullable(),
});

/** Asks the model for the next question of the step, or `null` when it can write the step. */
export function question_request(
  draft: OpeningDraftPayload,
  index: number,
  rounds_left: number,
): OpeningStructuredRequest<OpeningQuestion | null> {
  return {
    user_input: [
      ...context_lines(draft, index),
      "",
      `Decide whether one more question is needed before writing this step. At most ${String(rounds_left)} more may be asked in this step.`,
      "Ask only about a choice that changes what this step writes and that the description and the answers leave open. Never ask about anything already settled.",
      "If you ask: write the question, a one-sentence reason it matters (why), and 3 or 4 options, each a short label with a one-sentence detail. Set multiple to true only when several options can hold at once. Do not add an 'other' option; the user can always type their own.",
      "If nothing important is open, set question to null.",
      'Reply with only a JSON object of the form {"question": {...} or null}.',
    ].join("\n"),
    json_schema: QUESTION_JSON_SCHEMA,
    parse: (raw) => first_match(raw, "question", QuestionReplySchema, "question").question,
  };
}

const ReplyEntrySchema = z.object({
  title: z.string().trim().min(1).max(120),
  constant: z.boolean(),
  keys: z
    .array(z.string())
    .transform((keys) =>
      [...new Set(keys.map((key) => key.trim()).filter((key) => key !== ""))].slice(0, 12),
    ),
  content: z.string().trim().min(1).max(8_000),
});

function with_id(entry: z.infer<typeof ReplyEntrySchema>): OpeningEntry {
  return { id: crypto.randomUUID(), ...entry, keys: entry.constant ? [] : entry.keys };
}

const ENTRY_RULES = [
  "- One entry per distinct thing: the world overview, each faction, each place, each character, each group of rules.",
  "- title: '<kind>｜<name>', both in the language of the description, for example a faction, a place or a character.",
  "- constant: true only for what must always be in context: the world overview, hard rules of the world, narration and style requirements, content boundaries. Otherwise false.",
  "- keys: when constant is false, 1 to 5 words or names that appear in the story whenever this entry matters; [] when constant is true.",
  "- content: self-contained prose a storyteller can rely on, without referring to other entries by number.",
];

export function entries_request(
  draft: OpeningDraftPayload,
  index: number,
): OpeningStructuredRequest<OpeningEntry[]> {
  return {
    user_input: [
      ...context_lines(draft, index),
      "",
      "Now write this step's result as world book entries.",
      ...ENTRY_RULES,
      'Reply with only a JSON object of the form {"entries": [...]}.',
    ].join("\n"),
    json_schema: ENTRIES_JSON_SCHEMA,
    parse: (raw) =>
      first_match(
        raw,
        "entries",
        z.object({ entries: z.array(ReplyEntrySchema).min(1).max(30) }),
        "entries",
      ).entries.map(with_id),
  };
}

/** Writes one entry again; `id` keeps its place in the step. */
export function rewrite_request(
  draft: OpeningDraftPayload,
  index: number,
  entry: OpeningEntry,
): OpeningStructuredRequest<OpeningEntry> {
  return {
    user_input: [
      ...context_lines(draft, index),
      "",
      "Entries this step already has:",
      ...(draft.states[index]?.entries ?? []).map(entry_line),
      "",
      `Rewrite only this entry, keeping its subject and fitting everything above: ${entry_line(entry)}`,
      ...ENTRY_RULES.slice(1),
      'Reply with only a JSON object of the form {"entry": {...}}.',
    ].join("\n"),
    json_schema: ENTRY_JSON_SCHEMA,
    parse: (raw) => ({
      ...with_id(first_match(raw, "entry", z.object({ entry: ReplyEntrySchema }), "entry").entry),
      id: entry.id,
    }),
  };
}

export function message_request(
  draft: OpeningDraftPayload,
  index: number,
): OpeningStructuredRequest<OpeningMessage> {
  return {
    user_input: [
      ...context_lines(draft, index),
      "",
      "Now write the opening message: the first message of the roleplay, sent by the character who meets {{user}} first.",
      "- speaker: that character's name.",
      "- text: the whole message, following the narration person, style and length settled above, ending at a moment {{user}} can answer. Do not speak or act for {{user}}.",
      'Reply with only a JSON object of the form {"speaker": "...", "text": "..."}.',
    ].join("\n"),
    json_schema: MESSAGE_JSON_SCHEMA,
    parse: (raw) => first_match(raw, "text", OpeningMessageSchema, "opening message"),
  };
}
