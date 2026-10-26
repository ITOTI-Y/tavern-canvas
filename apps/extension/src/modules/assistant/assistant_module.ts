import type { CapabilityMatrix, TavernCanvasSettings } from "@tavern-canvas/contracts";
import type { ModuleContext, RuntimeModule } from "@tavern-canvas/core";

import {
  build_chat_completion_request,
  build_prompt_building_request,
  type AssistantConnectionMessage,
  type AssistantCompletionRequest,
  type AssistantToolDefinition,
} from "./assistant_context.js";
import {
  create_session,
  delete_sessions,
  export_sessions_json,
  load_session_safe,
  rename_session,
  type AssistantImageAttachment,
  type AssistantMessageRecord,
  type AssistantSession,
  type AssistantSessionStore,
  type AssistantSummaryRecord,
  type AssistantToolCallRecord,
  type LoadSessionResult,
} from "./assistant_session.js";
import { ScreenInputService } from "./screen_input.js";
import {
  create_settings_draft,
  is_known_ui_action,
  list_diagnostics_codes,
  list_settings_schema,
  list_workflow_metadata,
  read_settings_path,
  search_settings_paths,
} from "./settings_draft_tools.js";

export interface AssistantConnectionResult {
  readonly content: string;
  readonly tool_calls: readonly {
    readonly name: string;
    readonly arguments: Readonly<Record<string, unknown>>;
  }[];
}

/** Injected so the module never builds a URL, header or credential; the real implementation resolves route-only operations host-side. */
export interface AssistantConnectionPort {
  send(
    request: AssistantCompletionRequest,
    on_chunk: (delta: string) => void,
    signal: AbortSignal,
  ): Promise<AssistantConnectionResult>;
  fetch_models(): Promise<readonly string[]>;
}

export interface AssistantImageGenerationJob {
  readonly job_id: string;
}

export interface AssistantImageGenerationPort {
  submit(request: {
    readonly profile_id: string;
    readonly positive_prompt: string;
  }): Promise<AssistantImageGenerationJob>;
}

export interface AssistantTaskStripEntry {
  readonly job_id: string;
  readonly profile_id: string;
  readonly positive_prompt: string;
  readonly created_at: string;
}

export type AssistantTaskKind = "tool_call" | "image_generation" | "summary";
export type AssistantTaskState = "running" | "completed" | "failed";

/** One tracked unit of assistant work; every model-issued tool call opens one. */
export interface AssistantTask {
  readonly task_id: string;
  readonly kind: AssistantTaskKind;
  /** The tool name, or the prompt for an image generation. Never a credential or a full payload. */
  readonly label: string;
  readonly state: AssistantTaskState;
  readonly created_at: string;
  readonly updated_at: string;
  readonly job_id: string | null;
  readonly profile_id: string | null;
  readonly error_code: string | null;
}

/** `done` fires exactly once per turn, including when nothing streamed. */
export interface AssistantStreamEvent {
  readonly session_id: string;
  readonly message_id: string;
  readonly delta: string;
  readonly accumulated: string;
  readonly done: boolean;
}

export interface AssistantModuleDependencies {
  readonly connection: AssistantConnectionPort;
  readonly session_store: AssistantSessionStore;
  readonly image_generation: AssistantImageGenerationPort;
  readonly settings_provider: () => TavernCanvasSettings;
  readonly diagnostics_provider: () => readonly { readonly error_code: string | null }[];
  readonly capability_matrix_provider: () => CapabilityMatrix;
  readonly workflow_metadata_provider: () => readonly {
    readonly id: string;
    readonly display_name: string;
    readonly updated_at: string;
  }[];
  readonly screen_input: ScreenInputService;
  readonly clock: () => string;
  readonly id_source: () => string;
  /** Max model turns per `send`; `1` dispatches the tool calls and returns, higher values feed tool results back until the model stops requesting tools or the cap is hit. */
  readonly auto_query_max_iterations?: number;
}

const ASSISTANT_TOOLS: readonly AssistantToolDefinition[] = [
  {
    name: "browse_settings_schema",
    description: "List browsable settings paths with help text.",
    parameters: {},
  },
  {
    name: "search_settings",
    description: "Search settings paths by keyword.",
    parameters: { type: "object", properties: { query: { type: "string" } }, required: ["query"] },
  },
  {
    name: "read_settings_path",
    description: "Read one non-secret setting's current value.",
    parameters: { type: "object", properties: { path: { type: "string" } }, required: ["path"] },
  },
  {
    name: "create_settings_draft",
    description: "Propose settings changes as a draft the user must explicitly review and apply.",
    parameters: {
      type: "object",
      properties: { changes: { type: "object" } },
      required: ["changes"],
    },
  },
  {
    name: "list_diagnostics_codes",
    description: "List recent diagnostic error codes.",
    parameters: {},
  },
  {
    name: "list_provider_capabilities",
    description: "List host/provider capability availability.",
    parameters: {},
  },
  { name: "list_workflow_metadata", description: "List saved workflow names.", parameters: {} },
  {
    name: "highlight_ui_section",
    description: "Highlight one known Studio section for the user.",
    parameters: {
      type: "object",
      properties: { action: { type: "string" } },
      required: ["action"],
    },
  },
  {
    name: "generate_image",
    description: "Queue an image generation request, visible in the task strip.",
    parameters: {
      type: "object",
      properties: { profile_id: { type: "string" }, positive_prompt: { type: "string" } },
      required: ["profile_id", "positive_prompt"],
    },
  },
];

export type AssistantToolResult =
  | { readonly status: "ok"; readonly result: unknown }
  | { readonly status: "rejected"; readonly reason: string };

function is_record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function read_string_argument(arguments_: Readonly<Record<string, unknown>>, key: string): string {
  const value = arguments_[key];
  return typeof value === "string" ? value : "";
}

/**
 * `#dispatch_tool` is the only path that executes a model-issued tool call. Writes go through
 * `create_settings_draft`, which only returns a diff; `apply_settings_draft` must never be imported here.
 */
export class AssistantModule implements RuntimeModule {
  readonly module_id = "assistant";
  readonly requires: readonly string[] = [];

  readonly #deps: AssistantModuleDependencies;
  #sessions: readonly AssistantSession[] = [];
  #abort_controller: AbortController | null = null;
  #tasks: readonly AssistantTask[] = [];
  readonly #object_urls = new Set<string>();
  readonly #stream_listeners = new Set<(event: AssistantStreamEvent) => void>();
  readonly #task_listeners = new Set<(tasks: readonly AssistantTask[]) => void>();

  constructor(dependencies: AssistantModuleDependencies) {
    this.#deps = dependencies;
  }

  start(context: ModuleContext): Promise<void> {
    context.capabilities.register("assistant", this.module_id, {
      send: this.send.bind(this),
      abort: this.abort.bind(this),
    });
    return Promise.resolve();
  }

  stop(): Promise<void> {
    this.#abort_controller?.abort();
    this.#deps.screen_input.dispose();
    for (const url of this.#object_urls) {
      URL.revokeObjectURL(url);
    }
    this.#object_urls.clear();
    return Promise.resolve();
  }

  get sessions(): readonly AssistantSession[] {
    return this.#sessions;
  }

  get tasks(): readonly AssistantTask[] {
    return this.#tasks;
  }

  get task_strip(): readonly AssistantTaskStripEntry[] {
    return this.#tasks
      .filter((task) => task.kind === "image_generation" && task.job_id !== null)
      .map((task) => ({
        job_id: task.job_id ?? "",
        profile_id: task.profile_id ?? "",
        positive_prompt: task.label,
        created_at: task.created_at,
      }));
  }

  subscribe_stream(handler: (event: AssistantStreamEvent) => void): () => void {
    this.#stream_listeners.add(handler);
    return () => {
      this.#stream_listeners.delete(handler);
    };
  }

  subscribe_tasks(handler: (tasks: readonly AssistantTask[]) => void): () => void {
    this.#task_listeners.add(handler);
    return () => {
      this.#task_listeners.delete(handler);
    };
  }

  complete_task(task_id: string): void {
    this.#settle_task(task_id, "completed", null);
  }

  fail_task(task_id: string, error_code: string): void {
    this.#settle_task(task_id, "failed", error_code);
  }

  clear_finished_tasks(): void {
    this.#set_tasks(this.#tasks.filter((task) => task.state === "running"));
  }

  get screen_input(): ScreenInputService {
    return this.#deps.screen_input;
  }

  track_object_url(url: string): void {
    this.#object_urls.add(url);
  }

  async new_session(): Promise<AssistantSession> {
    const session = create_session("New chat", this.#deps.clock());
    await this.#deps.session_store.put(session);
    this.#sessions = [...this.#sessions, session];
    return session;
  }

  async switch_session(id: string): Promise<LoadSessionResult | null> {
    const result = await load_session_safe(this.#deps.session_store, id, this.#deps.clock());
    if (result !== null && !this.#sessions.some((session) => session.id === result.session.id)) {
      this.#sessions = [...this.#sessions, result.session];
    }
    return result;
  }

  windowed_messages(
    session: AssistantSession,
    offset: number,
    limit: number,
  ): readonly AssistantMessageRecord[] {
    const end = Math.max(0, session.messages.length - offset);
    const start = Math.max(0, end - limit);
    return session.messages.slice(start, end);
  }

  abort(): void {
    this.#abort_controller?.abort();
  }

  async send(
    session_id: string,
    user_text: string,
    images: readonly AssistantImageAttachment[] = [],
  ): Promise<AssistantMessageRecord> {
    this.#require_session(session_id);
    const user_message: AssistantMessageRecord = {
      message_id: this.#deps.id_source(),
      role: "user",
      content: user_text,
      thinking: null,
      images,
      tool_calls: [],
      created_at: this.#deps.clock(),
    };
    this.#append_message(session_id, user_message);

    const settings = this.#deps.settings_provider();
    const assistant_message_id = this.#deps.id_source();
    const max_iterations = Math.max(1, this.#deps.auto_query_max_iterations ?? 1);

    this.#abort_controller = new AbortController();
    const conversation = [
      ...this.#to_connection_messages(this.#require_session(session_id).messages),
    ];
    const tool_call_records: AssistantToolCallRecord[] = [];
    let accumulated = "";
    let final_content = "";

    for (let iteration = 0; iteration < max_iterations; iteration += 1) {
      const request = build_chat_completion_request(conversation, ASSISTANT_TOOLS);
      const result = await this.#deps.connection.send(
        request,
        (delta) => {
          accumulated += delta;
          this.#emit_stream({
            session_id,
            message_id: assistant_message_id,
            delta,
            accumulated,
            done: false,
          });
        },
        this.#abort_controller.signal,
      );
      if (result.content.length > 0) {
        final_content = result.content;
      }
      if (result.tool_calls.length === 0) {
        break;
      }

      for (const call of result.tool_calls) {
        const record = await this.#run_tool_call(call.name, call.arguments, settings);
        tool_call_records.push(record);
        conversation.push({ role: "assistant", content: `${call.name} -> ${record.result}` });
      }
    }

    const content = final_content.length > 0 ? final_content : accumulated;
    this.#emit_stream({
      session_id,
      message_id: assistant_message_id,
      delta: "",
      accumulated: content,
      done: true,
    });

    const assistant_message: AssistantMessageRecord = {
      message_id: assistant_message_id,
      role: "assistant",
      content,
      thinking: null,
      images: [],
      tool_calls: tool_call_records,
      created_at: this.#deps.clock(),
    };
    this.#append_message(session_id, assistant_message);
    return assistant_message;
  }

  async load_sessions(): Promise<readonly AssistantSession[]> {
    this.#sessions = await this.#deps.session_store.list();
    return this.#sessions;
  }

  async rename_session(session_id: string, title: string): Promise<AssistantSession | null> {
    const renamed = await rename_session(
      this.#deps.session_store,
      session_id,
      title,
      this.#deps.clock(),
    );
    if (renamed !== null) {
      this.#sessions = this.#sessions.map((session) =>
        session.id === renamed.id ? renamed : session,
      );
    }
    return renamed;
  }

  /** One confirmed multi-select delete; unknown ids are ignored rather than aborting the batch. */
  async delete_sessions(session_ids: readonly string[]): Promise<void> {
    await delete_sessions(this.#deps.session_store, session_ids);
    const removed = new Set(session_ids);
    this.#sessions = this.#sessions.filter((session) => !removed.has(session.id));
  }

  export_sessions(session_ids: readonly string[]): string {
    const selected = new Set(session_ids);
    return export_sessions_json(
      this.#sessions.filter((session) => selected.has(session.id)),
      this.#deps.clock(),
    );
  }

  #emit_stream(event: AssistantStreamEvent): void {
    for (const listener of this.#stream_listeners) {
      listener(event);
    }
  }

  #set_tasks(tasks: readonly AssistantTask[]): void {
    this.#tasks = tasks;
    for (const listener of this.#task_listeners) {
      listener(tasks);
    }
  }

  #open_task(kind: AssistantTaskKind, label: string): string {
    const now = this.#deps.clock();
    const task_id = this.#deps.id_source();
    this.#set_tasks([
      ...this.#tasks,
      {
        task_id,
        kind,
        label,
        state: "running",
        created_at: now,
        updated_at: now,
        job_id: null,
        profile_id: null,
        error_code: null,
      },
    ]);
    return task_id;
  }

  #settle_task(
    task_id: string,
    state: AssistantTaskState,
    error_code: string | null,
    patch: Partial<Pick<AssistantTask, "kind" | "label" | "job_id" | "profile_id">> = {},
  ): void {
    this.#set_tasks(
      this.#tasks.map((task) =>
        task.task_id === task_id
          ? { ...task, ...patch, state, error_code, updated_at: this.#deps.clock() }
          : task,
      ),
    );
  }

  async #run_tool_call(
    name: string,
    arguments_: Readonly<Record<string, unknown>>,
    settings: TavernCanvasSettings,
  ): Promise<AssistantToolCallRecord> {
    const task_id = this.#open_task("tool_call", name);
    const dispatched = await this.#dispatch_tool(name, arguments_, settings);
    if (dispatched.status === "rejected") {
      this.#settle_task(task_id, "failed", dispatched.reason);
    } else if (name === "generate_image") {
      const job = dispatched.result as AssistantImageGenerationJob;
      this.#settle_task(task_id, "completed", null, {
        kind: "image_generation",
        label: read_string_argument(arguments_, "positive_prompt"),
        job_id: job.job_id,
        profile_id: read_string_argument(arguments_, "profile_id"),
      });
    } else {
      this.#settle_task(task_id, "completed", null);
    }
    return { tool_name: name, arguments: arguments_, result: JSON.stringify(dispatched) };
  }

  /** Truncates history at `message_id` (inclusive) and re-sends `new_content` as a fresh user turn. */
  async edit_and_resend(
    session_id: string,
    message_id: string,
    new_content: string,
  ): Promise<AssistantMessageRecord> {
    const session = this.#require_session(session_id);
    const index = session.messages.findIndex((message) => message.message_id === message_id);
    if (index === -1) {
      throw new Error(`Unknown assistant message "${message_id}"`);
    }
    this.#update_session(session_id, (current) => ({
      ...current,
      messages: current.messages.slice(0, index),
    }));
    return this.send(session_id, new_content);
  }

  /** Summary generation uses `build_prompt_building_request`, which structurally carries no tools. */
  async generate_summary(
    session_id: string,
    message_ids: readonly string[],
  ): Promise<AssistantSummaryRecord> {
    const session = this.#require_session(session_id);
    const covered = session.messages.filter((message) => message_ids.includes(message.message_id));
    const request = build_prompt_building_request(this.#to_connection_messages(covered));

    let streamed_content = "";
    const result = await this.#deps.connection.send(
      request,
      (delta) => {
        streamed_content += delta;
      },
      new AbortController().signal,
    );

    const summary: AssistantSummaryRecord = {
      id: this.#deps.id_source(),
      parent_id: null,
      enabled: true,
      text: result.content.length > 0 ? result.content : streamed_content,
      covers_up_to_message_id: covered.length,
    };
    this.#update_session(session_id, (current) => ({
      ...current,
      summaries: [...current.summaries, summary],
    }));
    return summary;
  }

  #to_connection_messages(
    messages: readonly AssistantMessageRecord[],
  ): readonly AssistantConnectionMessage[] {
    return messages.map((message) => ({ role: message.role, content: message.content }));
  }

  #require_session(id: string): AssistantSession {
    const session = this.#sessions.find((candidate) => candidate.id === id);
    if (session === undefined) {
      throw new Error(`Unknown assistant session "${id}"`);
    }
    return session;
  }

  #append_message(session_id: string, message: AssistantMessageRecord): void {
    this.#update_session(session_id, (current) => ({
      ...current,
      messages: [...current.messages, message],
      updated_at: this.#deps.clock(),
    }));
  }

  #update_session(id: string, updater: (session: AssistantSession) => AssistantSession): void {
    this.#sessions = this.#sessions.map((session) =>
      session.id === id ? updater(session) : session,
    );
    const updated = this.#sessions.find((session) => session.id === id);
    if (updated !== undefined) {
      void this.#deps.session_store.put(updated);
    }
  }

  async #dispatch_tool(
    name: string,
    arguments_: Readonly<Record<string, unknown>>,
    settings: TavernCanvasSettings,
  ): Promise<AssistantToolResult> {
    switch (name) {
      case "browse_settings_schema":
        return { status: "ok", result: list_settings_schema() };
      case "search_settings":
        return {
          status: "ok",
          result: search_settings_paths(read_string_argument(arguments_, "query")),
        };
      case "read_settings_path":
        return {
          status: "ok",
          result: read_settings_path(settings, read_string_argument(arguments_, "path")),
        };
      case "create_settings_draft": {
        const changes = is_record(arguments_.changes) ? arguments_.changes : {};
        return { status: "ok", result: create_settings_draft(settings, changes) };
      }
      case "list_diagnostics_codes":
        return { status: "ok", result: list_diagnostics_codes(this.#deps.diagnostics_provider()) };
      case "list_provider_capabilities":
        return { status: "ok", result: this.#deps.capability_matrix_provider() };
      case "list_workflow_metadata":
        return {
          status: "ok",
          result: list_workflow_metadata(this.#deps.workflow_metadata_provider()),
        };
      case "highlight_ui_section": {
        const action = read_string_argument(arguments_, "action");
        return is_known_ui_action(action)
          ? { status: "ok", result: { action } }
          : { status: "rejected", reason: "unknown_action" };
      }
      case "generate_image": {
        const profile_id = read_string_argument(arguments_, "profile_id");
        const positive_prompt = read_string_argument(arguments_, "positive_prompt");
        if (profile_id.length === 0 || positive_prompt.length === 0) {
          return { status: "rejected", reason: "invalid_arguments" };
        }
        const job = await this.#deps.image_generation.submit({ profile_id, positive_prompt });
        return { status: "ok", result: job };
      }
      default:
        return { status: "rejected", reason: "unknown_tool" };
    }
  }
}
