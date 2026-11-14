import { z } from "zod";

import type { HostToolCall } from "../../host/index.js";
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

const QuestionSchema = z.preprocess(
  (value) =>
    typeof value === "object" &&
    value !== null &&
    "options" in value &&
    Array.isArray(value.options)
      ? { ...value, options: value.options.slice(0, MAX_OPTIONS) }
      : value,
  OpeningQuestionSchema,
);

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

const MAX_ENTRIES = 30;

function with_id(entry: z.infer<typeof ReplyEntrySchema>): OpeningEntry {
  return { id: crypto.randomUUID(), ...entry, keys: entry.constant ? [] : entry.keys };
}

/** Entries written by a step; `dropped` counts the ones that failed validation and were left out. */
export interface WrittenEntries {
  readonly entries: OpeningEntry[];
  readonly dropped: number;
}

/** Each entry is checked on its own, so one malformed entry no longer costs the whole step. */
function written_entries(items: readonly unknown[], raw: string): WrittenEntries {
  const entries = items.slice(0, MAX_ENTRIES).flatMap((item) => {
    const parsed = ReplyEntrySchema.safeParse(item);
    return parsed.success ? [with_id(parsed.data)] : [];
  });
  if (entries.length === 0) {
    throw new AnalysisParseError("The reply contains no valid entry", raw);
  }
  return { entries, dropped: items.length - entries.length };
}

function call_arguments(calls: readonly HostToolCall[], name: string): unknown[] {
  return calls
    .filter((call) => call.name === name)
    .flatMap((call) => {
      try {
        return [JSON.parse(call.arguments) as unknown];
      } catch {
        return [null];
      }
    });
}

const ENTRY_RULES = [
  "- One entry per distinct thing: the world overview, each faction, each place, each character, each group of rules.",
  "- title: '<kind>｜<name>', both in the language of the description, for example a faction, a place or a character.",
  "- constant: true only for what must always be in context: the world overview, hard rules of the world, narration and style requirements, content boundaries. Otherwise false.",
  "- keys: when constant is false, 1 to 5 words or names that appear in the story whenever this entry matters; [] when constant is true.",
  "- content: self-contained prose a storyteller can rely on, without referring to other entries by number.",
];

const MESSAGE_RULES = [
  "The opening message is the first message of the roleplay, sent by the character who meets {{user}} first.",
  "- speaker: that character's name.",
  "- text: the whole message, following the narration person, style and length settled above, ending at a moment {{user}} can answer. Do not speak or act for {{user}}.",
];

const QUESTION_RULES = [
  "Ask only about a choice that changes what this step writes and that the description and the answers leave open. Never ask about anything already settled.",
  "A question has the question text, a one-sentence reason it matters (why), and 3 or 4 options, each a short label with a one-sentence detail. Set multiple to true only when several options can hold at once. Do not add an 'other' option; the user can always type their own.",
];

const ASK_TOOL = "ask_question";
const ENTRY_TOOL = "add_entry";
const MESSAGE_TOOL = "write_message";

const EntriesReplySchema = z.object({ entries: z.array(z.unknown()).min(1) });

/** Writes the step's entries: one `add_entry` call per entry, or one JSON array. */
export function entries_request(
  draft: OpeningDraftPayload,
  index: number,
): OpeningStructuredRequest<WrittenEntries> {
  const context = [
    ...context_lines(draft, index),
    "",
    "Now write this step's result as world book entries.",
    ...ENTRY_RULES,
  ];
  const parse = (raw: string): WrittenEntries =>
    written_entries(first_match(raw, "entries", EntriesReplySchema, "entries").entries, raw);
  return {
    user_input: [...context, 'Reply with only a JSON object of the form {"entries": [...]}.'].join(
      "\n",
    ),
    json_schema: ENTRIES_JSON_SCHEMA,
    parse,
    tools: {
      tools: [
        { name: ENTRY_TOOL, description: "Add one world book entry.", parameters: ENTRY_VALUE },
      ],
      choice: "required",
      user_input: [...context, `Call ${ENTRY_TOOL} once for each entry, all in this reply.`].join(
        "\n",
      ),
      parse: (calls, content) => {
        const items = call_arguments(calls, ENTRY_TOOL);
        return items.length === 0 ? parse(content) : written_entries(items, content);
      },
    },
  };
}

export type OpeningTurn =
  | { readonly kind: "question"; readonly question: OpeningQuestion }
  | ({ readonly kind: "entries" } & WrittenEntries)
  | { readonly kind: "message"; readonly message: OpeningMessage };

const TURN_ENTRIES_SCHEMA = {
  name: "tavern_canvas_opening_turn",
  value: {
    type: "object",
    properties: {
      question: { anyOf: [QUESTION_VALUE, { type: "null" }] },
      entries: { type: "array", items: ENTRY_VALUE },
    },
    required: ["question", "entries"],
    additionalProperties: false,
  },
} as const;

const TURN_MESSAGE_SCHEMA = {
  name: "tavern_canvas_opening_turn",
  value: {
    type: "object",
    properties: {
      question: { anyOf: [QUESTION_VALUE, { type: "null" }] },
      message: { anyOf: [MESSAGE_JSON_SCHEMA.value, { type: "null" }] },
    },
    required: ["question", "message"],
    additionalProperties: false,
  },
} as const;

const TurnReplySchema = z.object({
  question: z.unknown().optional(),
  entries: z.array(z.unknown()).optional(),
  message: z.unknown().optional(),
});

/**
 * One request that either asks the step's next question or, when nothing important is open,
 * writes the step at once; with tools the model picks by which tool it calls.
 */
export function turn_request(
  draft: OpeningDraftPayload,
  index: number,
  rounds_left: number,
): OpeningStructuredRequest<OpeningTurn> {
  const message_step = draft.steps[index]?.output === "message";
  const write_rules = message_step
    ? MESSAGE_RULES
    : ["The step's result is world book entries.", ...ENTRY_RULES];
  const context = [
    ...context_lines(draft, index),
    "",
    `Either ask one more question before writing this step (at most ${String(rounds_left)} more may be asked in this step), or write the step now if nothing important is open.`,
    ...QUESTION_RULES,
    ...write_rules,
  ];

  function turn_of(question: unknown, written: () => OpeningTurn, raw: string): OpeningTurn {
    const asked = QuestionSchema.safeParse(question);
    if (asked.success) {
      return { kind: "question", question: asked.data };
    }
    if (question !== null && question !== undefined) {
      throw new AnalysisParseError("The reply asks a malformed question", raw);
    }
    return written();
  }

  const parse = (raw: string): OpeningTurn => {
    const reply = first_match(raw, "question", TurnReplySchema, "opening turn");
    return turn_of(
      reply.question,
      () => {
        if (message_step) {
          const message = OpeningMessageSchema.safeParse(reply.message);
          if (!message.success) {
            throw new AnalysisParseError("The reply contains no opening message", raw);
          }
          return { kind: "message", message: message.data };
        }
        return { kind: "entries", ...written_entries(reply.entries ?? [], raw) };
      },
      raw,
    );
  };

  return {
    user_input: [
      ...context,
      message_step
        ? 'Reply with only a JSON object of the form {"question": {...} or null, "message": {"speaker": "...", "text": "..."} or null}: a question and a null message, or a null question and the message.'
        : 'Reply with only a JSON object of the form {"question": {...} or null, "entries": [...]}: a question and no entries, or a null question and the entries.',
    ].join("\n"),
    json_schema: message_step ? TURN_MESSAGE_SCHEMA : TURN_ENTRIES_SCHEMA,
    parse,
    tools: {
      tools: [
        {
          name: ASK_TOOL,
          description: "Ask the user one question with options.",
          parameters: QUESTION_VALUE,
        },
        message_step
          ? {
              name: MESSAGE_TOOL,
              description: "Write the opening message.",
              parameters: MESSAGE_JSON_SCHEMA.value,
            }
          : { name: ENTRY_TOOL, description: "Add one world book entry.", parameters: ENTRY_VALUE },
      ],
      choice: "required",
      user_input: [
        ...context,
        message_step
          ? `Call ${ASK_TOOL} once to ask, or ${MESSAGE_TOOL} once to write the message.`
          : `Call ${ASK_TOOL} once to ask, or ${ENTRY_TOOL} once for each entry, all in this reply, to write the step.`,
      ].join("\n"),
      parse: (calls, content) => {
        const [question] = call_arguments(calls, ASK_TOOL);
        if (calls.length === 0) {
          return parse(content);
        }
        return turn_of(
          question ?? null,
          () => {
            if (message_step) {
              const message = OpeningMessageSchema.safeParse(
                call_arguments(calls, MESSAGE_TOOL)[0],
              );
              if (!message.success) {
                throw new AnalysisParseError("The reply contains no opening message", content);
              }
              return { kind: "message", message: message.data };
            }
            return {
              kind: "entries",
              ...written_entries(call_arguments(calls, ENTRY_TOOL), content),
            };
          },
          content,
        );
      },
    },
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
      "Now write the opening message.",
      ...MESSAGE_RULES,
      'Reply with only a JSON object of the form {"speaker": "...", "text": "..."}.',
    ].join("\n"),
    json_schema: MESSAGE_JSON_SCHEMA,
    parse: (raw) => first_match(raw, "text", OpeningMessageSchema, "opening message"),
  };
}
