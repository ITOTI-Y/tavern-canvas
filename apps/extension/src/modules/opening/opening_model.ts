import { z } from "zod";

export const MAX_ROUNDS = 3;
export const MAX_STEPS = 12;
export const MAX_OPTIONS = 5;

/** A step either writes world book entries or the opening message itself. */
export const OpeningStepSchema = z.object({
  id: z.string().min(1),
  name: z.string().max(40),
  /** What the model should settle and write in this step. */
  instruction: z.string().max(2_000),
  max_rounds: z.number().int().min(0).max(MAX_ROUNDS),
  output: z.enum(["entries", "message"]),
});
export type OpeningStep = z.infer<typeof OpeningStepSchema>;

export const OpeningOptionSchema = z.object({
  label: z.string().trim().min(1).max(80),
  detail: z.string().max(240),
});
export type OpeningOption = z.infer<typeof OpeningOptionSchema>;

export const OpeningQuestionSchema = z.object({
  text: z.string().trim().min(1).max(240),
  /** Why the answer matters for this step, shown under the question. */
  why: z.string().max(240),
  multiple: z.boolean(),
  options: z.array(OpeningOptionSchema).min(2).max(MAX_OPTIONS),
});
export type OpeningQuestion = z.infer<typeof OpeningQuestionSchema>;

export const OpeningAnswerSchema = z.object({
  question: OpeningQuestionSchema,
  selected: z.array(z.string()),
  /** The free text typed under "other"; empty when none. */
  other: z.string(),
});
export type OpeningAnswer = z.infer<typeof OpeningAnswerSchema>;

export const OpeningEntrySchema = z.object({
  id: z.string().min(1),
  title: z.string().trim().min(1).max(120),
  constant: z.boolean(),
  keys: z.array(z.string().trim().min(1).max(80)).max(12),
  content: z.string().max(8_000),
});
export type OpeningEntry = z.infer<typeof OpeningEntrySchema>;

export const OpeningMessageSchema = z.object({
  speaker: z.string().trim().min(1).max(80),
  text: z.string().min(1).max(20_000),
});
export type OpeningMessage = z.infer<typeof OpeningMessageSchema>;

/** `stale` keeps the previous result until it is generated again from the changed steps before it. */
export const STEP_STATUSES = ["pending", "asking", "done", "stale"] as const;
export type StepStatus = (typeof STEP_STATUSES)[number];

export const OpeningStepStateSchema = z.object({
  status: z.enum(STEP_STATUSES),
  answers: z.array(OpeningAnswerSchema),
  /** The question waiting for an answer; `null` once the model has enough to write the step. */
  question: OpeningQuestionSchema.nullable(),
  entries: z.array(OpeningEntrySchema),
  message: OpeningMessageSchema.nullable(),
});
export type OpeningStepState = z.infer<typeof OpeningStepStateSchema>;

export const OpeningConnectionSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("analysis") }),
  z.object({ kind: z.literal("current") }),
  z.object({ kind: z.literal("proxy_preset"), proxy_preset: z.string().min(1) }),
]);

/** A copy of the character card taken when the user chose it, so later card edits never shift a draft. */
export const OpeningCardSchema = z.object({
  name: z.string(),
  description: z.string(),
  personality: z.string(),
  scenario: z.string(),
  first_message: z.string(),
});
export type OpeningCard = z.infer<typeof OpeningCardSchema>;

export const OpeningDraftPayloadSchema = z.object({
  kind: z.literal("draft"),
  display_name: z.string(),
  created_at: z.string(),
  description: z.string().max(4_000),
  template_name: z.string(),
  /** A copy of the template's steps, so editing the template never changes a draft under way. */
  steps: z.array(OpeningStepSchema).min(1).max(MAX_STEPS),
  states: z.array(OpeningStepStateSchema),
  current: z.number().int().min(0),
  started: z.boolean(),
  connection: OpeningConnectionSchema,
  preset_name: z.string().min(1),
  worldbooks: z.array(z.string()).max(20),
  card: OpeningCardSchema.nullable().default(null),
  /** Sends the card's first message too, which some cards use to describe the world. */
  use_greeting: z.boolean().default(false),
});
export type OpeningDraftPayload = z.infer<typeof OpeningDraftPayloadSchema>;

export interface OpeningDraft extends OpeningDraftPayload {
  readonly id: string;
}

export const OpeningTemplatePayloadSchema = z.object({
  kind: z.literal("template"),
  display_name: z.string().max(60),
  created_at: z.string(),
  steps: z.array(OpeningStepSchema).min(1).max(MAX_STEPS),
});
export type OpeningTemplatePayload = z.infer<typeof OpeningTemplatePayloadSchema>;

export interface OpeningTemplate extends OpeningTemplatePayload {
  readonly id: string;
  readonly builtin: boolean;
}

export const BUILTIN_TEMPLATE_ID = "builtin-default";

/** The built-in five steps; their names and instructions are filled from the page's locale. */
export const BUILTIN_STEP_IDS = ["genre", "world", "cast", "rules", "opening"] as const;
export type BuiltinStepId = (typeof BUILTIN_STEP_IDS)[number];

export function builtin_template(
  text: (step: BuiltinStepId) => { readonly name: string; readonly instruction: string },
  name: string,
): OpeningTemplate {
  const rounds: Record<BuiltinStepId, number> = {
    genre: 2,
    world: 3,
    cast: 3,
    rules: 2,
    opening: 1,
  };
  return {
    id: BUILTIN_TEMPLATE_ID,
    builtin: true,
    kind: "template",
    display_name: name,
    created_at: "1970-01-01T00:00:00.000Z",
    steps: BUILTIN_STEP_IDS.map((id) => ({
      id,
      ...text(id),
      max_rounds: rounds[id],
      output: id === "opening" ? "message" : "entries",
    })),
  };
}

export function empty_state(): OpeningStepState {
  return { status: "pending", answers: [], question: null, entries: [], message: null };
}

/** Steps after `index` that already have a result must be written again. */
export function mark_later_stale(draft: OpeningDraftPayload, index: number): void {
  draft.states.forEach((state, position) => {
    if (position > index && (state.status === "done" || state.status === "stale")) {
      state.status = "stale";
    }
  });
}

type RecordLike = { readonly id: string; readonly payload: Readonly<Record<string, unknown>> };

export function read_draft(record: RecordLike): OpeningDraft | null {
  const parsed = OpeningDraftPayloadSchema.safeParse(record.payload);
  if (!parsed.success) {
    return null;
  }
  const draft = parsed.data;
  while (draft.states.length < draft.steps.length) {
    draft.states.push(empty_state());
  }
  draft.states.length = draft.steps.length;
  return { ...draft, current: Math.min(draft.current, draft.steps.length - 1), id: record.id };
}

export function read_template(record: RecordLike): OpeningTemplate | null {
  const parsed = OpeningTemplatePayloadSchema.safeParse(record.payload);
  return parsed.success ? { ...parsed.data, id: record.id, builtin: false } : null;
}

/** A plain copy for storage: reactive proxies cannot be cloned into IndexedDB. */
export function plain<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}
