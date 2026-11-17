import type { HostToolCall } from "../../host/index.js";
import type { OpeningStructuredRequest } from "../../ui/contracts/opening_port.js";
import { AnalysisParseError } from "../illustration/analysis_error.js";
import { is_slimmable } from "./slim_store.js";

/** A world book entry as the condensing request sees it. */
export interface SlimSource {
  readonly uid: number;
  readonly name: string;
  readonly keys: readonly string[];
  readonly content: string;
}

export interface SlimResult {
  readonly uid: number;
  readonly slim: string;
}

/** Shorter entries cost little and lose meaning when cut. */
export const MIN_SLIM_LENGTH = 300;
/** A condensed text longer than this share of the original is not worth sending. */
export const MAX_SLIM_RATIO = 0.75;
const BATCH_CHARACTERS = 6000;
const BATCH_ENTRIES = 12;
const SLIM_TOOL = "submit_slim";

export function is_slim_candidate(source: SlimSource): boolean {
  return source.content.trim().length >= MIN_SLIM_LENGTH && is_slimmable(source.content);
}

/** Batches that keep each request near `BATCH_CHARACTERS` of entry text. */
export function slim_batches(sources: readonly SlimSource[]): SlimSource[][] {
  const batches: SlimSource[][] = [];
  let current: SlimSource[] = [];
  let size = 0;
  for (const source of sources) {
    if (
      current.length > 0 &&
      (size + source.content.length > BATCH_CHARACTERS || current.length >= BATCH_ENTRIES)
    ) {
      batches.push(current);
      current = [];
      size = 0;
    }
    current.push(source);
    size += source.content.length;
  }
  if (current.length > 0) {
    batches.push(current);
  }
  return batches;
}

/** Keys that are plain words of the original; a regex key reads as `/source/flags`. */
function kept_keys(source: SlimSource): string[] {
  const original = source.content.toLowerCase();
  return source.keys.filter(
    (key) => !/^\/.*\/[a-z]*$/u.test(key) && original.includes(key.toLowerCase()),
  );
}

/** A condensed text is used only when it is clearly shorter and still names every key it should. */
export function accept_slim(source: SlimSource, slim: string): boolean {
  const text = slim.trim();
  if (text === "" || text.length > source.content.trim().length * MAX_SLIM_RATIO) {
    return false;
  }
  const lower = text.toLowerCase();
  return kept_keys(source).every((key) => lower.includes(key.toLowerCase()));
}

const RULES = [
  "Rewrite each world book entry below as a compact version that a roleplay model reads as background.",
  "- Keep every proper noun, number, rule, relationship and ability exactly as written, and keep each listed key word verbatim.",
  "- Keep the entry's language. Keep {{char}}, {{user}} and other {{...}} macros exactly as they appear.",
  "- Drop rhetoric, repetition, flavour text and sample dialogue; write short `name: fact; fact` lines.",
  "- Each compact version must be at most 60% of its original length.",
];

const RESULT_SCHEMA = {
  type: "object",
  properties: {
    entries: {
      type: "array",
      items: {
        type: "object",
        properties: { uid: { type: "integer" }, slim: { type: "string" } },
        required: ["uid", "slim"],
        additionalProperties: false,
      },
    },
  },
  required: ["entries"],
  additionalProperties: false,
} as const;

function read_results(value: unknown, raw: string): SlimResult[] {
  const entries =
    typeof value === "object" && value !== null ? (value as { entries?: unknown }).entries : null;
  if (!Array.isArray(entries)) {
    throw new AnalysisParseError("The reply has no entries", raw);
  }
  return entries.flatMap((item: unknown): SlimResult[] => {
    if (typeof item !== "object" || item === null) {
      return [];
    }
    const { uid, slim } = item as { uid?: unknown; slim?: unknown };
    return typeof uid === "number" && typeof slim === "string" ? [{ uid, slim }] : [];
  });
}

function parse_json(raw: string): unknown {
  try {
    return JSON.parse(raw);
  } catch {
    throw new AnalysisParseError("The reply is not JSON", raw);
  }
}

/** One request condensing a batch of entries. */
export function slim_request(batch: readonly SlimSource[]): OpeningStructuredRequest<SlimResult[]> {
  const listing = batch.flatMap((source) => [
    "",
    `### uid ${String(source.uid)}: ${source.name}`,
    `Keys: ${source.keys.length === 0 ? "(always active)" : source.keys.join(", ")}`,
    source.content.trim(),
  ]);
  const parse = (raw: string): SlimResult[] => read_results(parse_json(raw), raw);
  return {
    user_input: [
      ...RULES,
      ...listing,
      "",
      'Reply with only a JSON object of the form {"entries":[{"uid":...,"slim":"..."}]}, one item per entry above.',
    ].join("\n"),
    json_schema: { name: "tavern_canvas_world_info_slim", value: RESULT_SCHEMA },
    parse,
    tools: {
      tools: [
        {
          name: SLIM_TOOL,
          description: "Submit the compact version of every entry.",
          parameters: RESULT_SCHEMA,
        },
      ],
      choice: { name: SLIM_TOOL },
      user_input: [...RULES, ...listing, "", `Call ${SLIM_TOOL} once with every entry above.`].join(
        "\n",
      ),
      parse: (calls: readonly HostToolCall[], content: string) => {
        const call = calls.find((item) => item.name === SLIM_TOOL);
        return call === undefined
          ? parse(content)
          : read_results(parse_json(call.arguments), content);
      },
    },
  };
}
