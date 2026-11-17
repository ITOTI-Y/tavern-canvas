import type { IllustrationSettings } from "@tavern-canvas/contracts";

import type {
  HostAdapter,
  HostGenerationConnection,
  HostJsonSchema,
  HostTool,
  HostToolCall,
  HostToolRequest,
} from "../../host/index.js";

/** Chat completion sources whose tool calls JS-Slash-Runner's `generate` passes on. */
const TOOL_SOURCES: ReadonlySet<string> = new Set([
  "openai",
  "claude",
  "openrouter",
  "makersuite",
  "vertexai",
  "azure_openai",
  "custom",
  "deepseek",
  "xai",
]);

/** Connections that failed to call tools this session; a reload tries them again. */
const no_tools = new Set<string>();

/**
 * Tools to offer instead of the JSON schema. With one tool and `choice` set to its name the reply
 * is one call; with `required` the model may answer through several calls at once.
 */
export interface ToolPlan<T> {
  readonly tools: readonly HostTool[];
  readonly choice: "required" | { readonly name: string };
  /** Replaces the request's input when it asks for a reply format that tools change. */
  readonly user_input?: string;
  /** `content` is the reply's text, for a model that answered in prose instead of calling. */
  readonly parse: (calls: readonly HostToolCall[], content: string) => T;
}

export type StructuredMode = "tools" | "json_schema";
export type StructuredOutcome = "ok" | "fallback" | "failed";

/** One attempt as the diagnostics timeline records it; never the prompt or the reply. */
export type StructuredAttemptLog = (mode: StructuredMode, outcome: StructuredOutcome) => void;

/** The single submit tool a JSON schema becomes; the arguments are parsed as the JSON reply was. */
export function submit_tool<T>(schema: HostJsonSchema, parse: (raw: string) => T): ToolPlan<T> {
  return {
    tools: [{ name: schema.name, description: "Submit the result.", parameters: schema.value }],
    choice: { name: schema.name },
    parse: (calls, content) =>
      parse(calls.find((call) => call.name === schema.name)?.arguments ?? content),
  };
}

export function tool_request(plan: ToolPlan<unknown>): HostToolRequest {
  return { tools: plan.tools, choice: plan.choice };
}

/** The connection and model a tool failure is remembered for; `null` when tools cannot be sent. */
export function tool_key(host: HostAdapter, connection: HostGenerationConnection): string | null {
  if (connection.kind === "custom") {
    return `custom:${connection.api_url}:${connection.model}`;
  }
  const target = host.chat_completion_target?.() ?? null;
  if (target === null || !TOOL_SOURCES.has(target.source)) {
    return null;
  }
  return connection.kind === "proxy_preset"
    ? `proxy:${connection.proxy_preset}:${connection.model ?? target.model}`
    : `${target.source}:${target.model}`;
}

/**
 * Whether this attempt offers tools: always in `tools` mode; in `auto` unless the API takes text
 * completions (`key` is null) or this connection already failed them.
 */
export function uses_tools(
  mode: IllustrationSettings["structured_output"],
  key: string | null,
): boolean {
  return mode === "tools" || (key !== null && !no_tools.has(key));
}

export function forget_tools(key: string | null): void {
  if (key !== null) {
    no_tools.add(key);
  }
}

/** Test hook: the session memory is module state. */
export function reset_tool_memory(): void {
  no_tools.clear();
}
