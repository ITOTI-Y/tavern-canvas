import type {
  SillyTavernContextSurface,
  SillyTavernEventListener,
  SillyTavernFunctionTool,
} from "../../../apps/extension/src/host/sillytavern_host.js";
import type { HostMessageRole } from "../../../apps/extension/src/host/host_adapter.js";

/**
 * The host-global surface the real extension probes and binds to, built as a plain object graph
 * rather than as a `HostAdapter`. `tests/harness/src/fake_host.ts` fakes the *adapter*, which is
 * the right seam for the unit/integration suites; the all-host E2E has to prove one level lower --
 * that `probe_host_capabilities`, `create_composite_host`, `SillyTavernHost`, `TavernHelperHost`
 * and `TauriTavernHost` themselves work against a host shaped like the real one, inside a real
 * browser. So everything below is expressed exactly as SillyTavern 1.18.0, JS-Slash-Runner 4.9.1
 * and TauriTavern 2.2.0 expose it, and the extension is given nothing but `window`.
 */

export interface RecordedRequest {
  readonly url: string;
  readonly method: string;
  readonly headers: Readonly<Record<string, string>>;
  readonly body: string;
}

export interface HostEnvironmentOptions {
  /** `null` installs no `window.TavernHelper` at all (the "extension is missing" blocked case). */
  readonly helper_version: string | null;
  readonly native_tool_manager: boolean;
  readonly tauri: boolean;
  /** Whether the host reveals stored credentials (SillyTavern's `allowKeysExposure`). */
  readonly secrets_readable: boolean;
  /** Seeded under `extension_settings["st-chatu8"]` so the migration capability sees a v2 install. */
  readonly legacy_settings: unknown;
  readonly active_provider_profile_id: string;
  readonly gateway_endpoint: string | null;
  readonly http_acknowledgments: Readonly<Record<string, string>>;
}

export interface WorldInfoActivationRecord {
  readonly uid: string;
  readonly world: string;
}

export interface HostEnvironmentControl {
  readonly registered_tools: readonly SillyTavernFunctionTool[];
  readonly unregistered_tool_names: readonly string[];
  readonly subscribed_events: readonly string[];
  /** Every value the extension published through SillyTavern's `setExtensionPrompt`. The trigger
   * injection is how the main LLM learns the generation anchor it must echo back. */
  readonly trigger_injections: readonly string[];
  readonly upload_requests: readonly RecordedRequest[];
  readonly requests: readonly RecordedRequest[];
  readonly chat_messages: readonly MutableChatMessage[];
  /**
   * Every property name the extension read off `window.TavernHelper`. Acceptance criterion 7's
   * second half ("运行代码只使用 TavernHelper 公开 API") is only checkable by watching the reads.
   */
  readonly helper_property_reads: readonly string[];
  readonly saved_settings_count: () => number;
  readonly extension_settings: Record<string, unknown>;
  emit_generation_started(generation_type: string, dry_run: boolean): void;
  emit_generation_ended(message_id: number): void;
  emit_stream_token(cumulative_text: string): void;
  emit_chat_changed(chat_id: string): void;
  emit_message_swiped(message_id: number): void;
  set_active_chat_id(chat_id: string): void;
  set_active_swipe(message_id: number, swipe_id: number): void;
  append_swipe(message_id: number, content: string): void;
  delete_message(message_id: number): void;
  emit_world_info_activation(entries: readonly WorldInfoActivationRecord[]): void;
  subscribed_world_info_handler_count(): number;
  chat_surface_participant_count(): number;
}

export interface MutableChatMessage {
  message_id: number;
  name: string;
  role: HostMessageRole;
  is_hidden: boolean;
  swipe_id: number;
  swipes: string[];
  swipes_data: Record<string, unknown>[];
  swipes_info: Record<string, unknown>[];
}

const SEEDED_CREDENTIAL = "seeded-plaintext-credential-never-in-a-bundle";
const CSRF_HEADER_VALUE = "harness-csrf-token";

/** The value the security spec searches for; deliberately distinctive so a substring hit is real. */
export const SEEDED_SECRET_VALUE = SEEDED_CREDENTIAL;
export const SEEDED_PROMPT_TEXT = "SEEDED_PROMPT_a_rainy_alley_at_night_marker";
export const SEEDED_CHAT_TEXT = "SEEDED_CHAT_CONTENT_marker_never_leaves_the_host";

function initial_chat_messages(): MutableChatMessage[] {
  return [
    {
      message_id: 0,
      name: "User",
      role: "user",
      is_hidden: false,
      swipe_id: 0,
      swipes: [SEEDED_CHAT_TEXT],
      swipes_data: [{}],
      swipes_info: [{}],
    },
    {
      message_id: 1,
      name: "Assistant",
      role: "assistant",
      is_hidden: false,
      swipe_id: 0,
      swipes: ["first assistant swipe"],
      swipes_data: [{}],
      swipes_info: [{}],
    },
  ];
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

/**
 * Builds the fake host globals and returns both the object the extension is booted against and the
 * control surface a spec drives it with. Nothing here reaches the network: any request that is not
 * one of SillyTavern's own first-party routes resolves to 404 and is recorded, which is what makes
 * "no remote runtime request occurred" an assertion rather than an assumption.
 */
export function create_host_environment(options: HostEnvironmentOptions): {
  readonly globals: Record<string, unknown>;
  readonly control: HostEnvironmentControl;
  readonly provider_fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
  readonly provider_requests: readonly RecordedRequest[];
} {
  const listeners = new Map<string, Set<SillyTavernEventListener>>();
  const registered_tools: SillyTavernFunctionTool[] = [];
  const unregistered_tool_names: string[] = [];
  const subscribed_events: string[] = [];
  const trigger_injections: string[] = [];
  const upload_requests: RecordedRequest[] = [];
  const requests: RecordedRequest[] = [];
  const provider_requests: RecordedRequest[] = [];
  const world_info_handlers = new Set<(batch: unknown) => void>();
  const chat_surface_participants: unknown[] = [];
  const chat_messages = initial_chat_messages();
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
      fallback_generation_enabled: false,
      vocabulary_update_channel: "bundled",
      gateway: {
        endpoint: options.gateway_endpoint,
        token_secret_id: null,
        http_acknowledgments: options.http_acknowledgments,
      },
      ui: {
        color_mode: "system",
        inspector_width: 320,
        inspector_collapsed: false,
        optional_entry_enabled: false,
      },
    },
  };
  if (options.legacy_settings !== undefined) {
    extension_settings["st-chatu8"] = options.legacy_settings;
  }

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
    eventTypes: {
      GENERATION_STARTED: "GENERATION_STARTED",
      GENERATION_STOPPED: "GENERATION_STOPPED",
      GENERATION_ENDED: "GENERATION_ENDED",
      STREAM_TOKEN_RECEIVED: "STREAM_TOKEN_RECEIVED",
      CHAT_CHANGED: "CHAT_CHANGED",
      MESSAGE_SWIPED: "MESSAGE_SWIPED",
    },
    registerFunctionTool(tool) {
      registered_tools.push(tool);
    },
    unregisterFunctionTool(name) {
      unregistered_tool_names.push(name);
    },
    isToolCallingSupported() {
      return true;
    },
    setExtensionPrompt(_key, value) {
      trigger_injections.push(value);
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

    if (record.url === "/api/images/upload") {
      upload_requests.push(record);
      return Promise.resolve(json_response({ path: "/user/images/harness/generated.png" }));
    }
    if (record.url === "/api/secrets/write") {
      const key: unknown = (JSON.parse(record.body) as { key?: unknown }).key;
      if (typeof key === "string") {
        stored_secret_keys.add(key);
      }
      return Promise.resolve(json_response({}));
    }
    if (record.url === "/api/secrets/read") {
      // SillyTavern's `/api/secrets/read` answers presence-and-active state for every stored key,
      // masked; the migration runner probes it after each write to confirm the transfer landed.
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
      generateRaw: () => Promise.resolve("harness private prompt response"),
      getChatMessages: (range: string | number) =>
        typeof range === "number"
          ? structuredClone(chat_messages.filter((message) => message.message_id === range))
          : structuredClone(chat_messages),
      setChatMessages: (updates: readonly { message_id: number }[]) => {
        for (const update of updates) {
          const index = chat_messages.findIndex(
            (message) => message.message_id === update.message_id,
          );
          const existing = chat_messages[index];
          if (existing !== undefined) {
            chat_messages[index] = { ...existing, ...structuredClone(update) };
          }
        }
        return Promise.resolve();
      },
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

  if (options.tauri) {
    globals.__TAURITAVERN__ = {
      abiVersion: 1,
      ready: Promise.resolve(),
      api: {
        chatSurface: {
          protocolVersion: 1,
          isManagedOwnershipRequired: () => true,
          registerParticipant: (participant: unknown) => {
            chat_surface_participants.push(participant);
            return () => {
              const index = chat_surface_participants.indexOf(participant);
              if (index >= 0) {
                chat_surface_participants.splice(index, 1);
              }
            };
          },
        },
        worldInfo: {
          getLastActivation: () => ({ entries: [] }),
          subscribeActivations: (handler: (batch: unknown) => void) => {
            world_info_handlers.add(handler);
            return () => {
              world_info_handlers.delete(handler);
            };
          },
        },
      },
    };
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
    registered_tools,
    unregistered_tool_names,
    subscribed_events,
    trigger_injections,
    upload_requests,
    requests,
    chat_messages,
    helper_property_reads,
    saved_settings_count: () => saved_settings_count,
    extension_settings,
    emit_generation_started(generation_type, dry_run) {
      emit("GENERATION_STARTED", generation_type, {}, dry_run);
    },
    emit_generation_ended(message_id) {
      emit("GENERATION_ENDED", message_id);
    },
    emit_stream_token(cumulative_text) {
      emit("STREAM_TOKEN_RECEIVED", cumulative_text);
    },
    emit_chat_changed(chat_id) {
      active_chat_id = chat_id;
      emit("CHAT_CHANGED", chat_id);
    },
    emit_message_swiped(message_id) {
      emit("MESSAGE_SWIPED", message_id);
    },
    set_active_chat_id(chat_id) {
      active_chat_id = chat_id;
    },
    set_active_swipe(message_id, swipe_id) {
      const message = chat_messages.find((candidate) => candidate.message_id === message_id);
      if (message !== undefined) {
        message.swipe_id = swipe_id;
      }
    },
    append_swipe(message_id, content) {
      const message = chat_messages.find((candidate) => candidate.message_id === message_id);
      if (message !== undefined) {
        message.swipes.push(content);
        message.swipes_data.push({});
        message.swipes_info.push({});
      }
    },
    delete_message(message_id) {
      const index = chat_messages.findIndex((message) => message.message_id === message_id);
      if (index >= 0) {
        chat_messages.splice(index, 1);
      }
    },
    // TauriTavern 2.2.0's real activation batch shape: `TauriWorldInfoActivationBatchSurface`
    // (apps/extension/src/host/tauritavern_host.ts). Emitting a partial batch went unnoticed while
    // nothing in the extension subscribed; a subscribed module validates it and rejects.
    emit_world_info_activation(entries) {
      for (const handler of [...world_info_handlers]) {
        handler({
          timestampMs: 1_780_000_000_000,
          trigger: "generation",
          entries: entries.map((entry) => ({
            uid: entry.uid,
            world: entry.world,
            displayName: entry.uid,
            constant: false,
            position: "before",
          })),
        });
      }
    },
    subscribed_world_info_handler_count: () => world_info_handlers.size,
    chat_surface_participant_count: () => chat_surface_participants.length,
  };

  return { globals, control, provider_fetch, provider_requests };
}

/**
 * A one-image SD WebUI txt2img body. Inlined rather than read from
 * `tests/fixtures/providers/sd_webui/txt2img_response.json` because this module is bundled into a
 * browser page, which has no filesystem; the bytes are a 1x1 PNG, the smallest thing
 * `decode_base64_image` accepts.
 */
const PROVIDER_RESPONSE = {
  images: [
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACXBIWXMAAAsSAAALEgHS3X78AAAADUlEQVQImWNgYGD4DwABBAEAfbLI3wAAAABJRU5ErkJggg==",
  ],
  info: JSON.stringify({ seed: 42 }),
};
