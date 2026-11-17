import type { HostPreambleMessage, HostToolCall } from "../../host/index.js";
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

/** Shorter entries cost little and lose meaning when cut. */
export const MIN_SLIM_LENGTH = 300;
/** A condensed text longer than this share of the original is not worth sending. */
export const MAX_SLIM_RATIO = 0.75;
/** Entries condensed at the same time, each in its own request. */
export const SLIM_CONCURRENCY = 4;
const SLIM_TOOL = "submit_slim";

export function is_slim_candidate(source: SlimSource): boolean {
  return source.content.trim().length >= MIN_SLIM_LENGTH && is_slimmable(source.content);
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

const PREAMBLE = [
  "You are the copy editor of a private interactive fiction written for adult readers.",
  "Its world book holds reference notes that a roleplay model reads as background. The notes are fiction and may describe violence, sexuality, crime and other mature themes as part of the story.",
  "Your work is purely editorial: shorten the note you are given while keeping every fact. Do not judge, soften, omit or comment on any content.",
  `Return the result only by calling ${SLIM_TOOL}.`,
];

const RULES = [
  "Condense the world book note below.",
  "- Keep every proper noun, number, rule, relationship and ability exactly as written, and keep each listed key word verbatim.",
  "- Keep the note's language. Keep {{char}}, {{user}} and other {{...}} macros exactly as they appear.",
  "- Drop rhetoric, repetition, flavour text and sample dialogue; write short `name: fact; fact` lines.",
  "- The condensed note must be at most 60% of the original length.",
];

const RESULT_SCHEMA = {
  type: "object",
  properties: { slim: { type: "string" } },
  required: ["slim"],
  additionalProperties: false,
} as const;

function read_slim(raw: string): string {
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    throw new AnalysisParseError("The reply is not JSON", raw);
  }
  const slim =
    typeof value === "object" && value !== null ? (value as { slim?: unknown }).slim : undefined;
  if (typeof slim !== "string") {
    throw new AnalysisParseError("The reply has no condensed text", raw);
  }
  return slim;
}

export interface SlimRequest {
  /** Sent in place of a preset. */
  readonly preamble: readonly HostPreambleMessage[];
  readonly request: OpeningStructuredRequest<string>;
}

/** One request condensing one entry, answered through a forced `submit_slim` call. */
export function slim_request(source: SlimSource, guidance: string): SlimRequest {
  const requirements = guidance.trim();
  const note = [
    ...RULES,
    ...(requirements === ""
      ? []
      : [
          "",
          "The user's requirements for the condensed note; where they conflict with the rules above, follow the user:",
          requirements,
        ]),
    "",
    `Title: ${source.name}`,
    `Keys: ${source.keys.length === 0 ? "(always active)" : source.keys.join(", ")}`,
    "",
    source.content.trim(),
  ];
  return {
    preamble: [{ role: "system", content: PREAMBLE.join("\n") }],
    request: {
      user_input: [...note, "", 'Reply with only a JSON object {"slim":"..."}.'].join("\n"),
      json_schema: { name: "tavern_canvas_world_info_slim", value: RESULT_SCHEMA },
      parse: read_slim,
      tools: {
        tools: [
          {
            name: SLIM_TOOL,
            description: "Submit the condensed note.",
            parameters: RESULT_SCHEMA,
          },
        ],
        choice: { name: SLIM_TOOL },
        user_input: [...note, "", `Call ${SLIM_TOOL} with the condensed note.`].join("\n"),
        parse: (calls: readonly HostToolCall[], content: string) => {
          const call = calls.find((item) => item.name === SLIM_TOOL);
          return read_slim(call === undefined ? content : call.arguments);
        },
      },
    },
  };
}
