import type {
  SillyTavernContextSurface,
  SillyTavernEventListener,
} from "../../../apps/extension/src/host/sillytavern_host.js";
import type { TavernRegex } from "../../../apps/extension/src/host/tavern_helper_host.js";
import type { HostMessageRole } from "../../../apps/extension/src/host/host_adapter.js";

export interface RecordedRequest {
  readonly url: string;
  readonly method: string;
  readonly headers: Readonly<Record<string, string>>;
  readonly body: string;
}

export interface HostEnvironmentOptions {
  /** `null` installs no `window.TavernHelper` at all (the "extension is missing" blocked case). */
  readonly helper_version: string | null;
  /** Whether the host reveals stored credentials (SillyTavern's `allowKeysExposure`). */
  readonly secrets_readable: boolean;
  readonly active_provider_profile_id: string;
}

/** A message in SillyTavern's own `chat` format; TavernHelper's view is derived from it. */
export interface MutableChatMessage {
  name: string;
  is_user: boolean;
  is_system: boolean;
  mes: string;
  swipe_id: number;
  swipes: string[];
  extra: Record<string, unknown>;
  swipe_info: { extra?: Record<string, unknown> }[];
}

export interface HostEnvironmentControl {
  readonly subscribed_events: readonly string[];
  readonly requests: readonly RecordedRequest[];
  readonly chat_messages: readonly MutableChatMessage[];
  readonly regex_scripts: readonly TavernRegex[];
  readonly generate_calls: readonly Readonly<Record<string, unknown>>[];
  readonly helper_property_reads: readonly string[];
  readonly saved_settings_count: () => number;
  readonly extension_settings: Record<string, unknown>;
  set_generate_response(response: string): void;
  emit_generation_started(generation_type: string, dry_run: boolean): void;
  emit_generation_ended(message_id: number): void;
  emit_chat_changed(chat_id: string): void;
  emit_message_rendered(message_id: number): void;
  set_active_chat_id(chat_id: string): void;
}

const SEEDED_CREDENTIAL = "seeded-plaintext-credential-never-in-a-bundle";
const CSRF_HEADER_VALUE = "harness-csrf-token";

export const SEEDED_SECRET_VALUE = SEEDED_CREDENTIAL;
export const SEEDED_PROMPT_TEXT = "SEEDED_PROMPT_a_rainy_alley_at_night_marker";
export const SEEDED_CHAT_TEXT = "SEEDED_CHAT_CONTENT_marker_never_leaves_the_host";

function initial_chat_messages(): MutableChatMessage[] {
  return [
    {
      name: "User",
      is_user: true,
      is_system: false,
      mes: SEEDED_CHAT_TEXT,
      swipe_id: 0,
      swipes: [SEEDED_CHAT_TEXT],
      extra: {},
      swipe_info: [{ extra: {} }],
    },
    {
      name: "Assistant",
      is_user: false,
      is_system: false,
      mes: "first assistant swipe",
      swipe_id: 0,
      swipes: ["first assistant swipe"],
      extra: {},
      swipe_info: [{ extra: {} }],
    },
  ];
}

function to_helper_message(message: MutableChatMessage, message_id: number) {
  const role: HostMessageRole = message.is_user ? "user" : "assistant";
  return {
    message_id,
    name: message.name,
    role,
    is_hidden: message.is_system,
    swipe_id: message.swipe_id,
    swipes: [...message.swipes],
    swipes_data: message.swipes.map(() => ({})),
    swipes_info: structuredClone(message.swipe_info),
  };
}

function to_header_record(init: RequestInit | undefined): Readonly<Record<string, string>> {
  const headers = init?.headers;
  if (headers === undefined) {
    return {};
  }
  const record: Record<string, string> = {};
  new Headers(headers).forEach((value, key) => {
    record[key.toLowerCase()] = value;
  });
  return record;
}

function to_body_text(init: RequestInit | undefined): string {
  const body = init?.body;
  if (typeof body === "string") {
    return body;
  }
  if (ArrayBuffer.isView(body)) {
    return new TextDecoder().decode(body);
  }
  return body instanceof ArrayBuffer ? new TextDecoder().decode(body) : "";
}

function to_url(input: RequestInfo | URL): string {
  if (typeof input === "string") {
    return input;
  }
  return input instanceof URL ? input.href : input.url;
}

function json_response(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export function create_host_environment(options: HostEnvironmentOptions): {
  readonly globals: Record<string, unknown>;
  readonly control: HostEnvironmentControl;
  readonly provider_fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
  readonly provider_requests: readonly RecordedRequest[];
} {
  const listeners = new Map<string, Set<SillyTavernEventListener>>();
  const subscribed_events: string[] = [];
  const requests: RecordedRequest[] = [];
  const provider_requests: RecordedRequest[] = [];
  const chat_messages = initial_chat_messages();
  const regex_scripts: TavernRegex[] = [];
  const generate_calls: Record<string, unknown>[] = [];
  let generate_response = JSON.stringify({ illustrations: [] });
  const stored_secret_keys = new Set<string>(["tavern_canvas:image:openai_image:default"]);
  let active_chat_id = "chat-a";
  let saved_settings_count = 0;

  const extension_settings: Record<string, unknown> = {
    tavern_canvas: {
      schema_version: 1,
      active_namespace: "primary",
      locale: "auto",
      credential_storage_mode: "host",
      active_provider_profile_id: options.active_provider_profile_id,
      global_concurrency: 2,
      auto_generation_enabled: false,
      vocabulary_update_channel: "bundled",
      illustration: {
        preset_name: "in_use",
        connection: { kind: "current" },
        max_chat_history: 4,
        max_images_per_message: 2,
        prompt_preset_id: null,
        world_info: { mode: "chat" },
        wardrobe_model: null,
        analysis_guidance: "",
        wardrobe_guidance: "",
      },
      translation: { deepl_endpoint: "free", glossary: [] },
      ui: {
        color_mode: "system",
        inspector_width: 320,
        inspector_collapsed: false,
        optional_entry_enabled: false,
      },
    },
  };

  function emit(event_name: string, ...arguments_: readonly unknown[]): void {
    for (const listener of [...(listeners.get(event_name) ?? [])]) {
      listener(...arguments_);
    }
  }

  const context: SillyTavernContextSurface & {
    extensionSettings: Record<string, unknown>;
    saveSettingsDebounced: () => void;
  } = {
    getCurrentLocale: () => "en",
    getCurrentChatId: () => active_chat_id,
    getRequestHeaders: () => ({
      "Content-Type": "application/json",
      "X-CSRF-Token": CSRF_HEADER_VALUE,
    }),
    eventSource: {
      on(event_name, listener) {
        subscribed_events.push(event_name);
        const set = listeners.get(event_name) ?? new Set<SillyTavernEventListener>();
        set.add(listener);
        listeners.set(event_name, set);
      },
      removeListener(event_name, listener) {
        listeners.get(event_name)?.delete(listener);
      },
    },
    chat: chat_messages,
    saveChat: () => Promise.resolve(),
    eventTypes: {
      GENERATION_STARTED: "GENERATION_STARTED",
      GENERATION_STOPPED: "GENERATION_STOPPED",
      GENERATION_ENDED: "GENERATION_ENDED",
      CHAT_CHANGED: "CHAT_CHANGED",
      MESSAGE_SWIPED: "MESSAGE_SWIPED",
      MESSAGE_UPDATED: "MESSAGE_UPDATED",
      MESSAGE_EDITED: "MESSAGE_EDITED",
      CHARACTER_MESSAGE_RENDERED: "CHARACTER_MESSAGE_RENDERED",
      MORE_MESSAGES_LOADED: "MORE_MESSAGES_LOADED",
    },
    extensionSettings: extension_settings,
    saveSettingsDebounced() {
      saved_settings_count += 1;
    },
  };

  const host_fetch = (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const record: RecordedRequest = {
      url: to_url(input),
      method: init?.method ?? "GET",
      headers: to_header_record(init),
      body: to_body_text(init),
    };
    requests.push(record);

    if (record.url === "/api/secrets/write") {
      const key: unknown = (JSON.parse(record.body) as { key?: unknown }).key;
      if (typeof key === "string") {
        stored_secret_keys.add(key);
      }
      return Promise.resolve(json_response({}));
    }
    if (record.url === "/api/secrets/read") {
      return Promise.resolve(
        json_response(
          Object.fromEntries([...stored_secret_keys].map((key) => [key, [{ active: true }]])),
        ),
      );
    }
    if (record.url === "/api/secrets/find") {
      return Promise.resolve(
        options.secrets_readable
          ? json_response({ value: SEEDED_CREDENTIAL })
          : json_response({ error: "not exposed" }, 403),
      );
    }
    if (record.url === "/api/secrets/view") {
      return Promise.resolve(
        options.secrets_readable
          ? json_response(
              Object.fromEntries([...stored_secret_keys].map((key) => [key, SEEDED_CREDENTIAL])),
            )
          : json_response({ error: "not exposed" }, 403),
      );
    }
    return Promise.resolve(json_response({ error: "not a first-party host route" }, 404));
  };

  const globals: Record<string, unknown> = {
    SillyTavern: { getContext: () => context },
    fetch: host_fetch,
  };

  const helper_property_reads: string[] = [];
  if (options.helper_version !== null) {
    const helper = {
      getTavernHelperVersion: () => options.helper_version,
      getChatMessages: (range: string | number) => {
        if (typeof range !== "number") {
          return chat_messages.map(to_helper_message);
        }
        const message = chat_messages[range];
        return message === undefined ? [] : [to_helper_message(message, range)];
      },
      setChatMessages: (updates: readonly { message_id: number; message: string }[]) => {
        for (const update of updates) {
          const message = chat_messages[update.message_id];
          if (message !== undefined) {
            message.mes = update.message;
            message.swipes[message.swipe_id] = update.message;
          }
        }
        return Promise.resolve();
      },
      generate: (config: Record<string, unknown>) => {
        generate_calls.push(structuredClone(config));
        return Promise.resolve({ content: generate_response });
      },
      stopGenerationById: () => true,
      getWorldbookNames: () => [],
      getWorldbook: () => Promise.resolve([]),
      getTavernRegexes: () => structuredClone(regex_scripts),
      replaceTavernRegexes: (regexes: TavernRegex[]) => {
        regex_scripts.splice(0, regex_scripts.length, ...structuredClone(regexes));
        return Promise.resolve();
      },
      retrieveDisplayedMessage: (message_id: number) => ({
        get: () =>
          document.querySelector<HTMLElement>(
            `#chat .mes[mesid="${String(message_id)}"] .mes_text`,
          ) ?? undefined,
      }),
    };
    globals.TavernHelper = new Proxy(helper, {
      get(target, property, receiver) {
        if (typeof property === "string") {
          helper_property_reads.push(property);
        }
        return Reflect.get(target, property, receiver) as unknown;
      },
    });
  }

  const provider_fetch = (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    provider_requests.push({
      url: to_url(input),
      method: init?.method ?? "GET",
      headers: to_header_record(init),
      body: to_body_text(init),
    });
    return Promise.resolve(json_response(PROVIDER_RESPONSE));
  };

  const control: HostEnvironmentControl = {
    subscribed_events,
    requests,
    chat_messages,
    regex_scripts,
    generate_calls,
    helper_property_reads,
    saved_settings_count: () => saved_settings_count,
    extension_settings,
    set_generate_response(response) {
      generate_response = response;
    },
    emit_generation_started(generation_type, dry_run) {
      emit("GENERATION_STARTED", generation_type, {}, dry_run);
    },
    emit_generation_ended(message_id) {
      emit("GENERATION_ENDED", message_id + 1);
    },
    emit_chat_changed(chat_id) {
      active_chat_id = chat_id;
      emit("CHAT_CHANGED", chat_id);
    },
    emit_message_rendered(message_id) {
      emit("CHARACTER_MESSAGE_RENDERED", message_id, "normal");
    },
    set_active_chat_id(chat_id) {
      active_chat_id = chat_id;
    },
  };

  return { globals, control, provider_fetch, provider_requests };
}

// Inlined: this module is bundled into a browser page without filesystem access.
const PROVIDER_RESPONSE = {
  images: [
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACXBIWXMAAAsSAAALEgHS3X78AAAADUlEQVQImWNgYGD4DwABBAEAfbLI3wAAAABJRU5ErkJggg==",
  ],
  info: JSON.stringify({ seed: 42 }),
};
