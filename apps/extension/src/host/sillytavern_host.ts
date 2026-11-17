import {
  derive_inline_artifact,
  inline_copy_source,
  is_inline_copy,
  type InlineStructureNames,
} from "./ap_inline_structure.js";
import { set_generation_interceptor } from "./generation_interceptor.js";
import type {
  HostChatCompletionTarget,
  DeepLEndpoint,
  DeepLTarget,
  HostChatChangeHandler,
  HostGenerationHandler,
  HostMessageRenderedHandler,
  HostStoryStatus,
  HostSwipeLocation,
  WorldInfoSlimLookup,
  InlineStructureStatus,
} from "./host_adapter.js";
import { content_hash, is_slimmable } from "../modules/world_info/slim_store.js";

export type SillyTavernEventListener = (...arguments_: readonly unknown[]) => void;

/** The key under a message's `extra` (and each `swipe_info[i].extra`) that holds TavernCanvas data. */
export const TAVERN_CANVAS_EXTRA_KEY = "tavern_canvas";
const WARDROBE_EXTRA_KEY = "tavern_canvas_wardrobe";
const ADVANCED_PRESET_EXTRA_KEY = "advanced_preset";

function text_field(record: unknown, key: string): string | null {
  if (typeof record !== "object" || record === null) {
    return null;
  }
  const value = (record as Record<string, unknown>)[key];
  return typeof value === "string" && value.trim() !== "" ? value.trim() : null;
}

/** Reads Advanced Preset's sidecar (`v` 1): the status bar first, else the event synopsis. */
function story_status_of(sidecar: unknown): HostStoryStatus | null {
  if (typeof sidecar !== "object" || sidecar === null) {
    return null;
  }
  const record = sidecar as Record<string, unknown>;
  const structures = record["structures"];
  if (record["v"] !== 1 || typeof structures !== "object" || structures === null) {
    return null;
  }
  const status = (structures as Record<string, unknown>)["status"];
  const synopsis = (structures as Record<string, unknown>)["synopsis"];
  const result = {
    date: text_field(status, "date"),
    time: text_field(status, "time") ?? text_field(synopsis, "time"),
    location: text_field(status, "location") ?? text_field(synopsis, "location"),
  };
  return result.date === null && result.time === null && result.location === null ? null : result;
}

/** The built-in artifact Advanced Preset ships for `id`, or `null` when it has none. */
async function load_builtin_artifact(id: string): Promise<Record<string, unknown> | null> {
  const base = "/scripts/extensions/third-party/advanced-preset/dist/presets/";
  try {
    const index: unknown = await (await fetch(`${base}index.json`, { cache: "no-cache" })).json();
    const file = Array.isArray(index)
      ? (index as unknown[]).find((item) => is_plain_record(item) && item["id"] === id)
      : undefined;
    if (!is_plain_record(file) || typeof file["file"] !== "string") {
      return null;
    }
    const artifact: unknown = await (
      await fetch(`${base}${file["file"]}`, { cache: "no-cache" })
    ).json();
    return is_plain_record(artifact) && artifact["id"] === id ? artifact : null;
  } catch {
    return null;
  }
}

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
  | "MORE_MESSAGES_LOADED"
  | "CHAT_COMPLETION_SETTINGS_READY";

/** JS-Slash-Runner's `iframe_events.GENERATION_STARTED`, emitted with the `generate` call's generation id. */
const JS_GENERATION_STARTED = "js_generation_started";

/** A SillyTavern chat message as stored in `context.chat`; only the fields TavernCanvas touches. */
export interface SillyTavernChatMessage {
  swipe_id?: number;
  extra?: Record<string, unknown>;
  /** TauriTavern's on-demand swipe loading leaves inactive entries of older messages `null`. */
  swipe_info?: ({ extra?: Record<string, unknown> } | null)[];
}

export interface SillyTavernContextSurface {
  getCurrentLocale(): unknown;
  getCurrentChatId(): unknown;
  getRequestHeaders(): unknown;
  readonly chat: SillyTavernChatMessage[];
  saveChat(): Promise<void>;
  readonly eventSource: SillyTavernEventSource;
  readonly eventTypes: Readonly<Record<EventTypeName, string>>;
  readonly mainApi?: unknown;
  readonly chatCompletionSettings?: unknown;
  readonly chatMetadata?: Record<string, unknown>;
  readonly substituteParams?: (text: string) => string;
  readonly extensionSettings?: Record<string, unknown>;
  readonly saveSettingsDebounced?: () => void;
  readonly registerMacro?: (name: string, value: () => string) => void;
  readonly unregisterMacro?: (name: string) => void;
}

export interface RequestAdjustments {
  readonly native: boolean;
  /** `null` keeps the chat completion settings' effort. */
  readonly reasoning_effort: "min" | null;
}

/** Most sources keep their model under `<source>_model`; Google AI Studio is the exception. */
const MODEL_SETTING: Readonly<Record<string, string>> = { makersuite: "google_model" };

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

  get_active_chat_id(): string | null {
    const chat_id = this.#get_context().getCurrentChatId();
    return typeof chat_id === "string" && chat_id.trim().length > 0 ? chat_id : null;
  }

  chat_completion_target(): HostChatCompletionTarget | null {
    const context = this.#get_context();
    const settings = context.chatCompletionSettings;
    if (context.mainApi !== "openai" || typeof settings !== "object" || settings === null) {
      return null;
    }
    const values = settings as Readonly<Record<string, unknown>>;
    const source = values.chat_completion_source;
    if (typeof source !== "string") {
      return null;
    }
    const model = values[MODEL_SETTING[source] ?? `${source}_model`];
    return { source, model: typeof model === "string" ? model : "" };
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

  /**
   * Until the returned function is called, the chat completion request that JS-Slash-Runner sends
   * for `generation_id` is changed as `adjustments` asks. With `native` it loses the Advanced
   * Preset marker, so SillyTavern sends it as built: Advanced Preset's own sending replaces
   * `tool_choice` with `auto`, adds its workflow tools and rejects a reply that holds only tool
   * calls; the preset's prompt is assembled before the marker is set. A `reasoning_effort` replaces
   * the chat completion settings' effort for this request alone. The request is told apart by
   * JS-Slash-Runner's `js_generation_started` event, emitted with the generation id right before
   * its request; tools are added to the request by a listener that runs after this one.
   */
  adjust_request(generation_id: string, adjustments: RequestAdjustments): () => void {
    const context = this.#get_context();
    const settings_ready = context.eventTypes.CHAT_COMPLETION_SETTINGS_READY;
    let ours = false;
    const on_started: SillyTavernEventListener = (id) => {
      ours = id === generation_id;
    };
    const on_settings: SillyTavernEventListener = (data) => {
      if (ours && is_plain_record(data)) {
        ours = false;
        if (adjustments.native) {
          delete data.__ap_gen_id;
        }
        if (adjustments.reasoning_effort !== null) {
          data.reasoning_effort = adjustments.reasoning_effort;
        }
      }
    };
    context.eventSource.on(JS_GENERATION_STARTED, on_started);
    context.eventSource.on(settings_ready, on_settings);
    return () => {
      context.eventSource.removeListener(JS_GENERATION_STARTED, on_started);
      context.eventSource.removeListener(settings_ready, on_settings);
    };
  }

  /**
   * Advanced Preset looks a preset up by id at every generation, an installed copy first when its
   * version is not older than the built-in, and reads `installed` live; a copy put there takes
   * effect from the next generation and keeps the id's configuration, modules and carrier.
   */
  async sync_inline_structure(
    enabled: boolean,
    names: InlineStructureNames,
  ): Promise<InlineStructureStatus> {
    const context = this.#get_context();
    const api = (globalThis as { AdvancedPreset?: { activePresetId?: () => unknown } })
      .AdvancedPreset;
    const settings = context.extensionSettings?.["advancedPreset"];
    const installed =
      is_plain_record(settings) && is_plain_record(settings["installed"])
        ? settings["installed"]
        : null;
    if (api?.activePresetId === undefined || installed === null) {
      return enabled ? "no_ap" : "off";
    }
    const active = api.activePresetId();
    let changed = false;
    for (const [id, copy] of Object.entries(installed)) {
      if (is_inline_copy(copy) && (!enabled || id !== active)) {
        Reflect.deleteProperty(installed, id);
        changed = true;
      }
    }
    const result = await (async (): Promise<InlineStructureStatus> => {
      if (!enabled) {
        return "off";
      }
      if (typeof active !== "string") {
        return "no_preset";
      }
      const current = installed[active];
      if (current !== undefined && !is_inline_copy(current)) {
        return "own_copy";
      }
      const builtin = await load_builtin_artifact(active);
      if (builtin === null) {
        return "unsupported";
      }
      if (current !== undefined && inline_copy_source(current) === builtin["hash"]) {
        return "ready";
      }
      const copy = derive_inline_artifact(builtin, names);
      if (copy === null) {
        return "unsupported";
      }
      installed[active] = copy;
      changed = true;
      return "ready";
    })();
    if (changed) {
      context.saveSettingsDebounced?.();
    }
    return result;
  }

  read_inline_structure(location: HostSwipeLocation, structure_id: string): string | null {
    const sidecar = this.#find_extra(location, false)?.[ADVANCED_PRESET_EXTRA_KEY];
    if (!is_plain_record(sidecar) || sidecar["v"] !== 1 || sidecar["turn"] !== "story") {
      return null;
    }
    const structures = sidecar["structures"];
    const value = is_plain_record(structures) ? structures[structure_id] : undefined;
    return typeof value === "string" && value.trim() !== "" ? value : null;
  }

  provide_inline_request(
    macro: string,
    produce: (generation_type: string) => Promise<string>,
  ): () => void {
    const context = this.#get_context();
    let current = "";
    context.registerMacro?.(macro, () => current);
    set_generation_interceptor(async (generation_type) => {
      current = "";
      current = await produce(generation_type);
    });
    return () => {
      set_generation_interceptor(null);
      context.unregisterMacro?.(macro);
    };
  }

  /** SillyTavern hands each scan fresh copies of the entries, so the flag never reaches the books. */
  prevent_world_info_recursion(books: () => ReadonlySet<string>): () => void {
    const context = this.#get_context();
    const event_name = (context.eventTypes as Readonly<Record<string, string | undefined>>)
      .WORLDINFO_ENTRIES_LOADED;
    if (event_name === undefined) {
      return () => {};
    }
    const listener: SillyTavernEventListener = (loaded) => {
      const names = books();
      if (names.size === 0 || !is_plain_record(loaded)) {
        return;
      }
      for (const list of Object.values(loaded)) {
        if (!Array.isArray(list)) {
          continue;
        }
        for (const entry of list) {
          if (is_plain_record(entry) && typeof entry.world === "string" && names.has(entry.world)) {
            entry.preventRecursion = true;
          }
        }
      }
    };
    context.eventSource.on(event_name, listener);
    return () => {
      context.eventSource.removeListener(event_name, listener);
    };
  }

  /**
   * Hashes each entry's original text as the scan loads it, then, once the scan has settled which
   * entries are active, swaps in the condensed text the lookup holds for that exact original.
   */
  inject_world_info_slims(lookup: WorldInfoSlimLookup): () => void {
    const context = this.#get_context();
    const names = context.eventTypes as Readonly<Record<string, string | undefined>>;
    const loaded_event = names.WORLDINFO_ENTRIES_LOADED;
    const done_event = names.WORLDINFO_SCAN_DONE;
    if (loaded_event === undefined || done_event === undefined) {
      return () => {};
    }
    let hashes = new Map<string, string>();
    const key = (world: string, uid: number): string => `${world}\u0000${String(uid)}`;
    const on_loaded: SillyTavernEventListener = (loaded) => {
      hashes = new Map();
      if (!is_plain_record(loaded)) {
        return;
      }
      for (const list of Object.values(loaded)) {
        for (const entry of Array.isArray(list) ? list : []) {
          if (
            is_plain_record(entry) &&
            typeof entry.world === "string" &&
            typeof entry.uid === "number" &&
            typeof entry.content === "string" &&
            is_slimmable(entry.content)
          ) {
            hashes.set(key(entry.world, entry.uid), content_hash(entry.content));
          }
        }
      }
    };
    const on_done: SillyTavernEventListener = (args) => {
      if (!is_plain_record(args) || args.isFinal !== true || !is_plain_record(args.activated)) {
        return;
      }
      const entries = args.activated.entries;
      if (!(entries instanceof Map)) {
        return;
      }
      const substitute = this.#get_context().substituteParams ?? ((text: string) => text);
      for (const entry of entries.values() as Iterable<unknown>) {
        if (
          !is_plain_record(entry) ||
          typeof entry.world !== "string" ||
          typeof entry.uid !== "number"
        ) {
          continue;
        }
        const hash = hashes.get(key(entry.world, entry.uid));
        const slim = hash === undefined ? null : lookup(entry.world, entry.uid, hash);
        if (slim !== null) {
          entry.content = substitute(slim);
        }
      }
    };
    context.eventSource.on(loaded_event, on_loaded);
    context.eventSource.on(done_event, on_done);
    return () => {
      context.eventSource.removeListener(loaded_event, on_loaded);
      context.eventSource.removeListener(done_event, on_done);
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
    if (info === undefined || info === null) {
      return null;
    }
    if (info.extra === undefined && create) {
      info.extra = {};
    }
    return info.extra ?? null;
  }

  read_swipe_record(location: HostSwipeLocation): unknown {
    return this.#read_extra(location, TAVERN_CANVAS_EXTRA_KEY);
  }

  read_swipe_wardrobe(location: HostSwipeLocation): unknown {
    return this.#read_extra(location, WARDROBE_EXTRA_KEY);
  }

  read_story_status(location: HostSwipeLocation): HostStoryStatus | null {
    return story_status_of(this.#find_extra(location, false)?.[ADVANCED_PRESET_EXTRA_KEY]);
  }

  #read_extra(location: HostSwipeLocation, key: string): unknown {
    const extra = this.#find_extra(location, false);
    const record = extra?.[key];
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

  write_swipe_record(location: HostSwipeLocation, record: unknown): Promise<void> {
    return this.#write_extra(location, TAVERN_CANVAS_EXTRA_KEY, record);
  }

  write_swipe_wardrobe(location: HostSwipeLocation, record: unknown): Promise<void> {
    return this.#write_extra(location, WARDROBE_EXTRA_KEY, record);
  }

  async #write_extra(location: HostSwipeLocation, key: string, record: unknown): Promise<void> {
    const extra = this.#find_extra(location, true);
    if (extra === null) {
      throw new Error(
        `Chat ${location.chat_id} message ${String(location.message_id)} swipe ${String(location.swipe_id)} is not available`,
      );
    }
    extra[key] = structuredClone(record);
    await this.#get_context().saveChat();
  }
}
