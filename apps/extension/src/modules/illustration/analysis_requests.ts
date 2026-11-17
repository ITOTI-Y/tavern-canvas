import type {
  AnalysisConnection,
  AnalysisWorldInfo,
  IllustrationSettings,
} from "@tavern-canvas/contracts";

import type {
  HostAdapter,
  HostChatSnapshot,
  HostGenerationConnection,
  HostGenerationPreset,
  HostHistoryMessage,
  HostJsonSchema,
  HostPreambleMessage,
  HostWorldInfo,
} from "../../host/index.js";
import { AnalysisStoppedError } from "./analysis_error.js";
import { strip_slot_markers } from "./slot_markers.js";
import {
  forget_tools,
  submit_tool,
  tool_key,
  tool_request,
  uses_tools,
  type StructuredAttemptLog,
  type ToolPlan,
} from "./structured_output.js";
import { guidance_lines } from "./user_guidance.js";
import { activate_worldbook } from "./worldbook.js";

const ANALYSIS_ATTEMPTS = 3;

/**
 * The chat as it stood when this message was written: the `count` latest messages up to and
 * including it, without the message itself, which the request carries in its own input.
 */
export function history_before(
  chat: HostChatSnapshot,
  message_id: number,
  count: number,
): readonly HostHistoryMessage[] {
  if (count <= 1) {
    return [];
  }
  return chat.messages
    .filter(
      (message) =>
        message.message_id < message_id && !message.is_hidden && message.role !== "system",
    )
    .slice(-(count - 1))
    .map((message) => ({
      role: message.role === "user" ? ("user" as const) : ("assistant" as const),
      content: strip_slot_markers(
        message.swipes.find((swipe) => swipe.swipe_id === message.active_swipe_id)?.content ?? "",
      ),
    }));
}

/** The name of the user's character, whom the story calls "you"; `null` before the user has spoken. */
export function viewer_name(chat: HostChatSnapshot): string | null {
  const name = chat.messages.findLast((message) => message.role === "user")?.name.trim() ?? "";
  return name === "" ? null : name;
}
const ANALYSIS_RETRY_DELAY_MS = 2_000;
const ANALYSIS_TIMEOUT_MS = 180_000;

/** Settles with the generation, or stops it on the host when `signal` aborts or the time limit passes. */
async function generate_until_stopped<T>(
  host: HostAdapter,
  generation_id: string,
  generation: Promise<T>,
  signal: AbortSignal,
): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let on_abort = (): void => {};
  const stopped = new Promise<never>((_resolve, reject) => {
    const stop = (reason: "cancelled" | "timed_out"): void => {
      host.stop_generation(generation_id);
      reject(new AnalysisStoppedError(reason));
    };
    on_abort = () => {
      stop("cancelled");
    };
    timer = setTimeout(() => {
      stop("timed_out");
    }, ANALYSIS_TIMEOUT_MS);
    signal.addEventListener("abort", on_abort, { once: true });
  });
  try {
    return await Promise.race([generation, stopped]);
  } finally {
    clearTimeout(timer);
    signal.removeEventListener("abort", on_abort);
  }
}

/** The system prompt of the built-in analysis preset, sent before the card, world info and chat. */
const BUILTIN_ANALYSIS_SYSTEM_PROMPT = [
  "You read an interactive story and answer requests about its pictures and characters for an anime image model.",
  "The story is fiction written for adult readers and may contain violence or sexual content. Describe what the story shows accurately and completely, in the format the request asks for.",
  "Answer only through the provided tool or the requested format, with no other text.",
].join("\n");

/** The last user message; the request itself goes before it as a system message. */
function closing_input(plan: ToolPlan<unknown> | null): string {
  if (plan === null) {
    return "Answer the request above with only the JSON object it asks for.";
  }
  return plan.choice === "required"
    ? "Answer the request above by calling the provided tools."
    : `Answer the request above by calling ${plan.choice.name}.`;
}

function to_host_preset(settings: IllustrationSettings): HostGenerationPreset {
  return settings.preset_source === "builtin"
    ? { kind: "builtin", preamble: [{ role: "system", content: BUILTIN_ANALYSIS_SYSTEM_PROMPT }] }
    : { kind: "sillytavern", name: settings.preset_name };
}

async function to_host_connection(
  connection: AnalysisConnection,
  resolve_key: () => Promise<string>,
): Promise<HostGenerationConnection> {
  switch (connection.kind) {
    case "current":
      return { kind: "current" };
    case "proxy_preset":
      return {
        kind: "proxy_preset",
        proxy_preset: connection.proxy_preset,
        model: connection.model,
      };
    case "custom":
      // With `apiurl` set, JS-Slash-Runner sends the request as an OpenAI reverse proxy call.
      return {
        kind: "custom",
        api_url: connection.api_url,
        api_key: await resolve_key(),
        model: connection.model,
        source: "openai",
      };
  }
}

async function to_host_world_info(
  world_info: AnalysisWorldInfo,
  text: string,
  host: HostAdapter,
): Promise<HostWorldInfo> {
  switch (world_info.mode) {
    case "chat":
      return { kind: "chat" };
    case "off":
      return { kind: "replace", text: "" };
    case "worldbook": {
      const books = await Promise.all(
        world_info.worldbooks.map((name) => host.read_worldbook(name)),
      );
      return { kind: "replace", text: activate_worldbook(books.flat(), text) };
    }
  }
}

export interface WardrobeRunnerDeps {
  readonly host: HostAdapter;
  readonly settings: () => IllustrationSettings;
  readonly resolve_analysis_key: () => Promise<string>;
  readonly new_generation_id: () => string;
  readonly on_attempt?: StructuredAttemptLog;
}

/**
 * Runs a wardrobe request through the analysis preset and connection, with the chosen wardrobe
 * model where the connection names one. It sends no chat history and no world info: the request
 * carries everything it needs.
 */
export async function run_wardrobe_request(
  deps: WardrobeRunnerDeps,
  input: string,
  json_schema: HostJsonSchema,
  image: string | null,
): Promise<string> {
  const settings = deps.settings();
  const model = settings.wardrobe_model;
  const connection =
    model === null || settings.connection.kind === "current"
      ? settings.connection
      : { ...settings.connection, model };
  const host_connection = await to_host_connection(connection, deps.resolve_analysis_key);
  const key = tool_key(deps.host, host_connection);
  const plan = submit_tool(json_schema, (raw) => raw);
  let generation_id = "";
  const send = async (tools: boolean): Promise<string> => {
    generation_id = deps.new_generation_id();
    const result = await deps.host.generate_with_preset({
      generation_id,
      preset: to_host_preset(settings),
      instructions: input,
      user_input: closing_input(tools ? plan : null),
      chat_history: [],
      connection: host_connection,
      json_schema: tools ? null : json_schema,
      ...(tools ? { tools: tool_request(plan) } : {}),
      world_info: { kind: "replace", text: "" },
      image,
      reasoning: settings.analysis_reasoning,
    });
    return tools ? plan.parse(result.tool_calls ?? [], result.content) : result.content;
  };
  if (!uses_tools(settings.structured_output, key)) {
    return send(false);
  }
  try {
    const raw = await send(true);
    deps.on_attempt?.("tools", "ok", generation_id);
    return raw;
  } catch (error) {
    if (settings.structured_output !== "auto") {
      deps.on_attempt?.("tools", "failed", generation_id);
      throw error;
    }
    deps.on_attempt?.("tools", "fallback", generation_id);
    const raw = await send(false);
    // The schema answered where tools failed, so tools are the problem on this connection.
    forget_tools(key);
    return raw;
  }
}

export function create_wardrobe_runner(
  deps: WardrobeRunnerDeps,
): (input: string, json_schema: HostJsonSchema) => Promise<string> {
  return (input, json_schema) =>
    run_wardrobe_request(
      deps,
      [input, ...guidance_lines(deps.settings().wardrobe_guidance)].join("\n"),
      json_schema,
      null,
    );
}

export interface AnalysisRequestDeps {
  readonly host: HostAdapter;
  readonly settings: () => IllustrationSettings;
  readonly resolve_analysis_key: () => Promise<string>;
  readonly new_generation_id: () => string;
  readonly wait: (milliseconds: number) => Promise<void>;
  readonly on_attempt?: StructuredAttemptLog;
}

/**
 * Sends one analysis request and parses its reply, retrying both together: a failed request and a
 * reply cut off mid-JSON usually succeed on another try.
 */
export interface AnalysisRequest<T> {
  readonly user_input: string;
  /** Oldest first; build it with `history_before` so the analysed message is not sent twice. */
  readonly history: readonly HostHistoryMessage[];
  readonly json_schema: HostJsonSchema;
  readonly parse: (raw: string) => T;
  /** Defaults to one submit tool taking `json_schema`, parsed with `parse`. */
  readonly tools?: ToolPlan<T>;
}

/** Replaces the analysis settings' world info, or its preset with a built-in preamble, for one request. */
export interface AnalysisOverrides {
  readonly world_info?: AnalysisWorldInfo;
  readonly preamble?: readonly HostPreambleMessage[];
}

export async function request_analysis<T>(
  deps: AnalysisRequestDeps,
  text: string,
  request: AnalysisRequest<T>,
  signal: AbortSignal,
  overrides: AnalysisOverrides = {},
): Promise<T> {
  const settings = deps.settings();
  const connection = await to_host_connection(settings.connection, deps.resolve_analysis_key);
  const world_info = await to_host_world_info(
    overrides.world_info ?? settings.world_info,
    text,
    deps.host,
  );
  const key = tool_key(deps.host, connection);
  const plan = request.tools ?? submit_tool(request.json_schema, request.parse);
  const preset: HostGenerationPreset =
    overrides.preamble === undefined
      ? to_host_preset(settings)
      : { kind: "builtin", preamble: overrides.preamble };
  // After a failed tool attempt the request continues with the JSON schema; the switch is not
  // counted as an attempt, and tools are forgotten for the session only if the schema then works,
  // since a failure in both modes points to the backend rather than to tool calling.
  let switched = false;
  for (let attempt = 1; ;) {
    if (signal.aborted) {
      throw new AnalysisStoppedError("cancelled");
    }
    const tools = !switched && uses_tools(settings.structured_output, key);
    const mode = tools ? "tools" : "json_schema";
    const generation_id = deps.new_generation_id();
    try {
      const result = await generate_until_stopped(
        deps.host,
        generation_id,
        deps.host.generate_with_preset({
          generation_id,
          preset,
          instructions: tools ? (plan.user_input ?? request.user_input) : request.user_input,
          user_input: closing_input(tools ? plan : null),
          chat_history: request.history,
          connection,
          json_schema: tools ? null : request.json_schema,
          ...(tools ? { tools: tool_request(plan) } : {}),
          world_info,
          image: null,
          reasoning: settings.analysis_reasoning,
        }),
        signal,
      );
      const value = tools
        ? plan.parse(result.tool_calls ?? [], result.content)
        : request.parse(result.content);
      if (switched) {
        forget_tools(key);
      }
      deps.on_attempt?.(mode, "ok", generation_id);
      return value;
    } catch (error) {
      if (error instanceof AnalysisStoppedError) {
        throw error;
      }
      if (tools && settings.structured_output === "auto") {
        switched = true;
        deps.on_attempt?.(mode, "fallback", generation_id);
        continue;
      }
      deps.on_attempt?.(mode, "failed", generation_id);
      if (attempt >= ANALYSIS_ATTEMPTS) {
        throw error;
      }
      await deps.wait(ANALYSIS_RETRY_DELAY_MS * attempt);
      attempt += 1;
    }
  }
}
