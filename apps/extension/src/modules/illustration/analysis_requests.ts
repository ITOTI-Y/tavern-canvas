import type {
  AnalysisConnection,
  AnalysisWorldInfo,
  IllustrationSettings,
} from "@tavern-canvas/contracts";

import type {
  HostAdapter,
  HostChatSnapshot,
  HostGenerationConnection,
  HostHistoryMessage,
  HostJsonSchema,
  HostWorldInfo,
} from "../../host/index.js";
import { strip_slot_markers } from "./slot_markers.js";
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

/** The analysis request was stopped by the user or ran past its time limit; it is not retried. */
export class AnalysisStoppedError extends Error {
  readonly reason: "cancelled" | "timed_out";

  constructor(reason: "cancelled" | "timed_out") {
    super(reason === "cancelled" ? "Analysis was cancelled" : "Analysis timed out");
    this.name = "AnalysisStoppedError";
    this.reason = reason;
  }
}

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
  const result = await deps.host.generate_with_preset({
    generation_id: deps.new_generation_id(),
    preset_name: settings.preset_name,
    user_input: input,
    chat_history: [],
    connection: await to_host_connection(connection, deps.resolve_analysis_key),
    json_schema,
    world_info: { kind: "replace", text: "" },
    image,
  });
  return result.content;
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
}

/** Replaces the analysis settings' world info for one request. */
export interface AnalysisOverrides {
  readonly world_info?: AnalysisWorldInfo;
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
  for (let attempt = 1; ; attempt += 1) {
    if (signal.aborted) {
      throw new AnalysisStoppedError("cancelled");
    }
    const generation_id = deps.new_generation_id();
    try {
      const result = await generate_until_stopped(
        deps.host,
        generation_id,
        deps.host.generate_with_preset({
          generation_id,
          preset_name: settings.preset_name,
          user_input: request.user_input,
          chat_history: request.history,
          connection,
          json_schema: request.json_schema,
          world_info,
          image: null,
        }),
        signal,
      );
      return request.parse(result.content);
    } catch (error) {
      if (attempt >= ANALYSIS_ATTEMPTS || error instanceof AnalysisStoppedError) {
        throw error;
      }
      await deps.wait(ANALYSIS_RETRY_DELAY_MS * attempt);
    }
  }
}
