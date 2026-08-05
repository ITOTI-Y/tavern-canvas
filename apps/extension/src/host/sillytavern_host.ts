import type {
  HostGenerationHandler,
  HostImageTool,
  HostImageUploadRequest,
  HostImageUploadResult,
} from "./host_adapter.js";

export type SillyTavernEventListener = (...arguments_: readonly unknown[]) => void;

export interface SillyTavernEventSource {
  on(event_name: string, listener: SillyTavernEventListener): void;
  removeListener(event_name: string, listener: SillyTavernEventListener): void;
}

export interface SillyTavernFunctionTool {
  readonly name: string;
  readonly displayName: string;
  readonly description: string;
  readonly parameters: Readonly<Record<string, unknown>>;
  readonly action: (arguments_: unknown) => string | Promise<string>;
  readonly stealth: true;
}

export interface SillyTavernContextSurface {
  getCurrentLocale(): unknown;
  getCurrentChatId(): unknown;
  getRequestHeaders(): unknown;
  readonly eventSource: SillyTavernEventSource;
  readonly eventTypes: {
    readonly GENERATION_STARTED: string;
    readonly GENERATION_STOPPED: string;
    readonly GENERATION_ENDED: string;
  };
  registerFunctionTool(tool: SillyTavernFunctionTool): void;
  unregisterFunctionTool(name: string): void;
}

export interface SillyTavernUploadResponse {
  readonly ok: boolean;
  readonly status: number;
  json(): Promise<unknown>;
}

export type SillyTavernFetch = (
  input: string,
  init: {
    readonly method: "POST";
    readonly headers: Readonly<Record<string, string>>;
    readonly body: string;
  },
) => Promise<SillyTavernUploadResponse>;

function is_property_container(value: unknown): value is object {
  return (typeof value === "object" && value !== null) || typeof value === "function";
}

function is_plain_record(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  try {
    const prototype: unknown = Object.getPrototypeOf(value);
    return prototype === Object.prototype || prototype === null;
  } catch {
    return false;
  }
}

export interface SillyTavernInspection {
  readonly native_tool_manager: boolean;
  readonly main_generation_events: boolean;
  readonly message_swipe_metadata: boolean;
  readonly host_image_upload: boolean;
}

const SILLYTAVERN_UNAVAILABLE: SillyTavernInspection = {
  native_tool_manager: false,
  main_generation_events: false,
  message_swipe_metadata: false,
  host_image_upload: false,
};

type SafePropertyRead = { readonly ok: true; readonly value: unknown } | { readonly ok: false };

function read_property(value: object, property_name: string): SafePropertyRead {
  try {
    return { ok: true, value: Reflect.get(value, property_name) };
  } catch {
    return { ok: false };
  }
}

function has_function_property(value: object, property_name: string): boolean {
  const property = read_property(value, property_name);
  return property.ok && typeof property.value === "function";
}

function call_method(value: object, method_name: string): SafePropertyRead {
  const method = read_property(value, method_name);
  if (!method.ok || typeof method.value !== "function") {
    return { ok: false };
  }
  try {
    return { ok: true, value: Reflect.apply(method.value, value, []) };
  } catch {
    return { ok: false };
  }
}

function calls_with_nonempty_string(context: object, method_name: string): boolean {
  const result = call_method(context, method_name);
  return result.ok && typeof result.value === "string" && result.value.trim().length > 0;
}

function has_generation_events(context: object): boolean {
  const event_source_property = read_property(context, "eventSource");
  const event_types_property = read_property(context, "eventTypes");
  if (
    !event_source_property.ok ||
    !is_property_container(event_source_property.value) ||
    !event_types_property.ok ||
    !is_property_container(event_types_property.value)
  ) {
    return false;
  }

  const event_types = event_types_property.value;
  const started = read_property(event_types, "GENERATION_STARTED");
  const stopped = read_property(event_types, "GENERATION_STOPPED");
  const ended = read_property(event_types, "GENERATION_ENDED");
  return (
    has_function_property(event_source_property.value, "on") &&
    has_function_property(event_source_property.value, "removeListener") &&
    started.ok &&
    typeof started.value === "string" &&
    started.value.length > 0 &&
    stopped.ok &&
    typeof stopped.value === "string" &&
    stopped.value.length > 0 &&
    ended.ok &&
    typeof ended.value === "string" &&
    ended.value.length > 0
  );
}

function has_valid_request_headers(context: object): boolean {
  const headers = call_method(context, "getRequestHeaders");
  if (!headers.ok) {
    return false;
  }
  try {
    clone_request_headers(headers.value);
    return true;
  } catch {
    return false;
  }
}

export function inspect_sillytavern(value: unknown, fetch_: unknown): SillyTavernInspection {
  if (!is_property_container(value)) {
    return { ...SILLYTAVERN_UNAVAILABLE };
  }
  const context_result = call_method(value, "getContext");
  if (!context_result.ok || !is_property_container(context_result.value)) {
    return { ...SILLYTAVERN_UNAVAILABLE };
  }

  const context = context_result.value;
  const locale_available = calls_with_nonempty_string(context, "getCurrentLocale");
  const chat_id_available = calls_with_nonempty_string(context, "getCurrentChatId");
  return {
    native_tool_manager:
      locale_available &&
      has_function_property(context, "registerFunctionTool") &&
      has_function_property(context, "unregisterFunctionTool"),
    main_generation_events: has_generation_events(context),
    message_swipe_metadata: chat_id_available,
    host_image_upload: typeof fetch_ === "function" && has_valid_request_headers(context),
  };
}

type ListenerRegistration = readonly [string, SillyTavernEventListener];

type RemovalResult =
  { readonly failed: false } | { readonly failed: true; readonly error: unknown };

function remove_listeners(
  event_source: SillyTavernEventSource,
  listeners: readonly ListenerRegistration[],
): RemovalResult {
  let failed = false;
  let first_error: unknown;
  for (const [event_name, listener] of listeners.toReversed()) {
    try {
      event_source.removeListener(event_name, listener);
    } catch (error) {
      if (!failed) {
        failed = true;
        first_error = error;
      }
    }
  }
  return failed ? { failed: true, error: first_error } : { failed: false };
}

function read_nonempty_string(value: unknown, error_message: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(error_message);
  }
  return value;
}

function clone_tool_arguments(value: unknown): Readonly<Record<string, unknown>> {
  if (!is_plain_record(value)) {
    throw new Error("Image tool arguments must be a record");
  }

  let clone: unknown;
  try {
    clone = structuredClone(value);
  } catch {
    throw new Error("Image tool arguments could not be cloned");
  }
  if (!is_plain_record(clone)) {
    throw new Error("Image tool arguments could not be cloned");
  }
  return clone;
}

function clone_request_headers(value: unknown): Readonly<Record<string, string>> {
  if (!is_plain_record(value)) {
    throw new Error("SillyTavern returned invalid request headers");
  }

  let clone: unknown;
  try {
    clone = structuredClone(value);
  } catch {
    throw new Error("SillyTavern returned invalid request headers");
  }
  if (
    !is_plain_record(clone) ||
    !Object.values(clone).every((header) => typeof header === "string")
  ) {
    throw new Error("SillyTavern returned invalid request headers");
  }
  return clone as Record<string, string>;
}

export class SillyTavernHost {
  readonly #context: SillyTavernContextSurface;
  readonly #fetch: SillyTavernFetch;

  constructor(context: SillyTavernContextSurface, fetch_: SillyTavernFetch) {
    this.#context = context;
    this.#fetch = fetch_;
  }

  get_locale(): string {
    return read_nonempty_string(
      this.#context.getCurrentLocale(),
      "SillyTavern returned an invalid locale",
    );
  }

  get_active_chat_id(): string {
    return read_nonempty_string(
      this.#context.getCurrentChatId(),
      "SillyTavern returned an invalid active chat ID",
    );
  }

  subscribe_generation(handler: HostGenerationHandler): () => void {
    const started: SillyTavernEventListener = (...arguments_) => {
      const generation_type = arguments_[0];
      const dry_run = arguments_[2];
      if (typeof generation_type === "string" && typeof dry_run === "boolean") {
        handler({ phase: "started", generation_type, dry_run });
      }
    };
    const stopped: SillyTavernEventListener = () => {
      handler({ phase: "stopped" });
    };
    const ended: SillyTavernEventListener = (...arguments_) => {
      const message_id = arguments_[0];
      if (typeof message_id === "number") {
        handler({ phase: "ended", message_id });
      }
    };
    const listeners: readonly ListenerRegistration[] = [
      [this.#context.eventTypes.GENERATION_STARTED, started],
      [this.#context.eventTypes.GENERATION_STOPPED, stopped],
      [this.#context.eventTypes.GENERATION_ENDED, ended],
    ];
    const registered: ListenerRegistration[] = [];

    try {
      for (const listener_registration of listeners) {
        this.#context.eventSource.on(...listener_registration);
        registered.push(listener_registration);
      }
    } catch (error) {
      remove_listeners(this.#context.eventSource, registered);
      throw error;
    }

    let disposed = false;
    return () => {
      if (disposed) {
        return;
      }
      disposed = true;
      const result = remove_listeners(this.#context.eventSource, registered);
      if (result.failed) {
        throw result.error;
      }
    };
  }

  register_image_tool(tool: HostImageTool): () => void {
    this.#context.registerFunctionTool({
      name: tool.name,
      displayName: tool.display_name,
      description: tool.description,
      parameters: structuredClone(tool.parameters),
      action: async (arguments_) => tool.execute(clone_tool_arguments(arguments_)),
      stealth: true,
    });

    let disposed = false;
    return () => {
      if (disposed) {
        return;
      }
      disposed = true;
      this.#context.unregisterFunctionTool(tool.name);
    };
  }

  async upload_image(request: HostImageUploadRequest): Promise<HostImageUploadResult> {
    const response = await this.#fetch("/api/images/upload", {
      method: "POST",
      headers: clone_request_headers(this.#context.getRequestHeaders()),
      body: JSON.stringify({
        image: request.image_base64,
        format: request.format,
        ch_name: request.character_name,
        filename: request.file_name.replaceAll(".", "_"),
      }),
    });

    let payload: unknown;
    try {
      payload = await response.json();
    } catch {
      if (!response.ok) {
        throw new Error(`Host image upload failed with status ${String(response.status)}`);
      }
      throw new Error("Host image upload returned an invalid response");
    }

    if (!response.ok) {
      if (
        is_plain_record(payload) &&
        typeof payload.error === "string" &&
        payload.error.trim().length > 0
      ) {
        throw new Error(payload.error);
      }
      throw new Error(`Host image upload failed with status ${String(response.status)}`);
    }

    if (
      !is_plain_record(payload) ||
      typeof payload.path !== "string" ||
      payload.path.trim().length === 0
    ) {
      throw new Error("Host image upload returned an invalid response");
    }

    return { path: payload.path };
  }
}
