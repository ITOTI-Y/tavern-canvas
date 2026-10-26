import type {
  DeepLEndpoint,
  DeepLTarget,
  HostChatChangeHandler,
  HostGenerationHandler,
  HostMessageRenderedHandler,
  HostSwipeLocation,
} from "./host_adapter.js";

export type SillyTavernEventListener = (...arguments_: readonly unknown[]) => void;

/** The key under a message's `extra` (and each `swipe_info[i].extra`) that holds TavernCanvas data. */
export const TAVERN_CANVAS_EXTRA_KEY = "tavern_canvas";

export interface SillyTavernEventSource {
  on(event_name: string, listener: SillyTavernEventListener): void;
  removeListener(event_name: string, listener: SillyTavernEventListener): void;
}

type EventTypeName =
  | "GENERATION_STARTED"
  | "GENERATION_STOPPED"
  | "GENERATION_ENDED"
  | "CHAT_CHANGED"
  | "MESSAGE_SWIPED"
  | "MESSAGE_UPDATED"
  | "MESSAGE_EDITED"
  | "CHARACTER_MESSAGE_RENDERED"
  | "MORE_MESSAGES_LOADED";

/** A SillyTavern chat message as stored in `context.chat`; only the fields TavernCanvas touches. */
export interface SillyTavernChatMessage {
  swipe_id?: number;
  extra?: Record<string, unknown>;
  swipe_info?: { extra?: Record<string, unknown> }[];
}

export interface SillyTavernContextSurface {
  getCurrentLocale(): unknown;
  getCurrentChatId(): unknown;
  getRequestHeaders(): unknown;
  readonly chat: SillyTavernChatMessage[];
  saveChat(): Promise<void>;
  readonly eventSource: SillyTavernEventSource;
  readonly eventTypes: Readonly<Record<EventTypeName, string>>;
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

export function bind_sillytavern_fetch(fetch_: SillyTavernFetch): SillyTavernFetch {
  return fetch_.bind(globalThis);
}

function is_property_container(value: unknown): value is object {
  return (typeof value === "object" && value !== null) || typeof value === "function";
}

function is_plain_record(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const prototype: unknown = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

export interface SillyTavernInspection {
  readonly main_generation_events: boolean;
  readonly message_swipe_metadata: boolean;
}

function read_property(value: object, property_name: string): unknown {
  try {
    return Reflect.get(value, property_name);
  } catch {
    return undefined;
  }
}

function call_method(value: object, method_name: string): unknown {
  const method = read_property(value, method_name);
  if (typeof method !== "function") {
    return undefined;
  }
  try {
    return Reflect.apply(method, value, []);
  } catch {
    return undefined;
  }
}

function has_events(context: object, names: readonly EventTypeName[]): boolean {
  const event_source = read_property(context, "eventSource");
  const event_types = read_property(context, "eventTypes");
  if (!is_property_container(event_source) || !is_property_container(event_types)) {
    return false;
  }
  return (
    typeof read_property(event_source, "on") === "function" &&
    typeof read_property(event_source, "removeListener") === "function" &&
    names.every((name) => {
      const value = read_property(event_types, name);
      return typeof value === "string" && value.length > 0;
    })
  );
}

export function inspect_sillytavern(value: unknown): SillyTavernInspection {
  const context = is_property_container(value) ? call_method(value, "getContext") : undefined;
  if (!is_property_container(context)) {
    return { main_generation_events: false, message_swipe_metadata: false };
  }
  const locale = call_method(context, "getCurrentLocale");
  return {
    main_generation_events:
      typeof locale === "string" &&
      locale.trim().length > 0 &&
      has_events(context, ["GENERATION_STARTED", "GENERATION_STOPPED", "GENERATION_ENDED"]),
    message_swipe_metadata:
      typeof read_property(context, "getCurrentChatId") === "function" &&
      Array.isArray(read_property(context, "chat")) &&
      typeof read_property(context, "saveChat") === "function" &&
      has_events(context, [
        "CHAT_CHANGED",
        "MESSAGE_SWIPED",
        "MESSAGE_UPDATED",
        "MESSAGE_EDITED",
        "CHARACTER_MESSAGE_RENDERED",
        "MORE_MESSAGES_LOADED",
      ]),
  };
}

function read_nonempty_string(value: unknown, error_message: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(error_message);
  }
  return value;
}

/** Exported for the secret modules, which authenticate the same CSRF-header way against `/api/secrets/*`. */
export function clone_request_headers(value: unknown): Readonly<Record<string, string>> {
  if (
    !is_plain_record(value) ||
    !Object.values(value).every((header) => typeof header === "string")
  ) {
    throw new Error("SillyTavern returned invalid request headers");
  }
  return { ...(value as Record<string, string>) };
}

function read_message_id(value: unknown): number | null {
  return typeof value === "number" && Number.isInteger(value) && value >= 0 ? value : null;
}

export class SillyTavernHost {
  readonly #get_context: () => SillyTavernContextSurface;
  readonly #fetch: typeof fetch;

  /** The context is fetched per call: `getContext()` returns a snapshot whose `chat` binding is replaced on chat load. */
  constructor(get_context: () => SillyTavernContextSurface, fetch_: typeof fetch) {
    this.#get_context = get_context;
    this.#fetch = fetch_.bind(globalThis);
  }

  get_locale(): string {
    return read_nonempty_string(
      this.#get_context().getCurrentLocale(),
      "SillyTavern returned an invalid locale",
    );
  }

  get_active_chat_id(): string {
    return read_nonempty_string(
      this.#get_context().getCurrentChatId(),
      "SillyTavern returned an invalid active chat ID",
    );
  }

  #listen(listeners: readonly (readonly [EventTypeName, SillyTavernEventListener])[]): () => void {
    const context = this.#get_context();
    const registered = listeners.map(
      ([name, listener]) => [context.eventTypes[name], listener] as const,
    );
    for (const [event_name, listener] of registered) {
      context.eventSource.on(event_name, listener);
    }
    let disposed = false;
    return () => {
      if (disposed) {
        return;
      }
      disposed = true;
      for (const [event_name, listener] of registered) {
        context.eventSource.removeListener(event_name, listener);
      }
    };
  }

  subscribe_generation(handler: HostGenerationHandler): () => void {
    return this.#listen([
      [
        "GENERATION_STARTED",
        (generation_type, _options, dry_run) => {
          if (typeof generation_type === "string" && typeof dry_run === "boolean") {
            handler({ phase: "started", generation_type, dry_run });
          }
        },
      ],
      [
        "GENERATION_STOPPED",
        () => {
          handler({ phase: "stopped" });
        },
      ],
      [
        "GENERATION_ENDED",
        (next_message_id) => {
          // SillyTavern emits `chat.length`, the next zero-based message ID.
          const message_id = read_message_id(next_message_id);
          if (message_id !== null && message_id > 0) {
            handler({ phase: "ended", message_id: message_id - 1 });
          }
        },
      ],
    ]);
  }

  subscribe_chat_change(handler: HostChatChangeHandler): () => void {
    return this.#listen([
      [
        "CHAT_CHANGED",
        (chat_id) => {
          if (typeof chat_id === "string" && chat_id.trim().length > 0) {
            handler({ chat_id });
          }
        },
      ],
    ]);
  }

  subscribe_message_rendered(handler: HostMessageRenderedHandler): () => void {
    const listener: SillyTavernEventListener = (value) => {
      const message_id = read_message_id(value);
      if (message_id !== null) {
        handler(message_id);
      }
    };
    return this.#listen([
      ["CHARACTER_MESSAGE_RENDERED", listener],
      ["MESSAGE_UPDATED", listener],
      ["MESSAGE_EDITED", listener],
      ["MESSAGE_SWIPED", listener],
    ]);
  }

  subscribe_chat_rendered(handler: () => void): () => void {
    const listener: SillyTavernEventListener = () => {
      handler();
    };
    return this.#listen([
      ["CHAT_CHANGED", listener],
      ["MORE_MESSAGES_LOADED", listener],
    ]);
  }

  #find_extra(location: HostSwipeLocation, create: boolean): Record<string, unknown> | null {
    const context = this.#get_context();
    if (context.getCurrentChatId() !== location.chat_id) {
      return null;
    }
    const message = context.chat[location.message_id];
    if (message === undefined) {
      return null;
    }
    // SillyTavern keeps the active swipe's extra on the message and copies it into swipe_info on swipe.
    if ((message.swipe_id ?? 0) === location.swipe_id) {
      if (message.extra === undefined && create) {
        message.extra = {};
      }
      return message.extra ?? null;
    }
    const info = message.swipe_info?.[location.swipe_id];
    if (info === undefined) {
      return null;
    }
    if (info.extra === undefined && create) {
      info.extra = {};
    }
    return info.extra ?? null;
  }

  read_swipe_record(location: HostSwipeLocation): unknown {
    const extra = this.#find_extra(location, false);
    const record = extra?.[TAVERN_CANVAS_EXTRA_KEY];
    return record === undefined ? null : structuredClone(record);
  }

  async translate_deepl(
    text: string,
    target: DeepLTarget,
    endpoint: DeepLEndpoint,
  ): Promise<string> {
    const response = await this.#fetch("/api/translate/deepl", {
      method: "POST",
      headers: clone_request_headers(this.#get_context().getRequestHeaders()),
      body: JSON.stringify({ text, lang: target, endpoint }),
    });
    if (response.status === 400) {
      throw new Error("No DeepL key is stored in SillyTavern; set it in Settings > Translation");
    }
    if (!response.ok) {
      throw new Error(`DeepL translation failed with status ${String(response.status)}`);
    }
    return response.text();
  }

  async write_swipe_record(location: HostSwipeLocation, record: unknown): Promise<void> {
    const extra = this.#find_extra(location, true);
    if (extra === null) {
      throw new Error(
        `Chat ${location.chat_id} message ${String(location.message_id)} swipe ${String(location.swipe_id)} is not available`,
      );
    }
    extra[TAVERN_CANVAS_EXTRA_KEY] = structuredClone(record);
    await this.#get_context().saveChat();
  }
}
