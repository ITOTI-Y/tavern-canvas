import type {
  HostChatMessageSnapshot,
  HostChatSnapshot,
  HostMessageRole,
  HostRegexScript,
  HostWorldbookEntry,
  HostWorldbookKey,
  PresetGenerationRequest,
  PresetGenerationResult,
} from "./host_adapter.js";

interface TavernHelperChatMessage {
  readonly message_id: number;
  readonly name: string;
  readonly role: HostMessageRole;
  readonly is_hidden: boolean;
  readonly swipe_id: number;
  readonly swipes: readonly string[];
}

export interface TavernRegex {
  id: string;
  script_name: string;
  enabled: boolean;
  find_regex: string;
  replace_string: string;
  trim_strings: string[];
  source: {
    user_input: boolean;
    ai_output: boolean;
    slash_command: boolean;
    world_info: boolean;
    reasoning: boolean;
  };
  destination: { display: boolean; prompt: boolean };
  run_on_edit: boolean;
  min_depth: number | null;
  max_depth: number | null;
}

/** The `generate` config fields TavernCanvas sends; see JS-Slash-Runner `@types/function/generate.d.ts`. */
export interface TavernHelperGenerateConfig {
  readonly generation_id: string;
  readonly preset_name: string;
  readonly user_input: string;
  readonly max_chat_history: number;
  readonly should_silence: true;
  readonly should_stream: false;
  readonly should_return_reasoning: true;
  readonly custom_api?: Readonly<Record<string, string>>;
  readonly overrides?: {
    readonly world_info_before: string;
    readonly world_info_after: string;
    readonly chat_history: { readonly with_depth_entries: false };
  };
  readonly json_schema?: {
    readonly name: string;
    readonly value: Readonly<Record<string, unknown>>;
    readonly strict: true;
  };
  /**
   * Data URLs. A single image goes onto the chat message, where SillyTavern drops it unless it
   * recognizes the model as accepting images; an array is written into the final request as is.
   */
  readonly image?: readonly string[];
}

interface GlobalRegexOption {
  readonly type: "global";
}

export interface TavernHelperSurface {
  getChatMessages(range: string | number, options: { readonly include_swipes: true }): unknown;
  setChatMessages(
    messages: readonly { readonly message_id: number; readonly message: string }[],
    options: { readonly refresh: "affected" },
  ): Promise<void>;
  generate(config: TavernHelperGenerateConfig): Promise<unknown>;
  getWorldbookNames(): unknown;
  getWorldbook(worldbook_name: string): Promise<unknown>;
  stopGenerationById(generation_id: string): boolean;
  getTavernRegexes(option: GlobalRegexOption): TavernRegex[];
  replaceTavernRegexes(regexes: TavernRegex[], option: GlobalRegexOption): Promise<void>;
  retrieveDisplayedMessage(message_id: number): { get(index: number): HTMLElement | undefined };
}

const REQUIRED_HELPER_METHODS = {
  message_swipe_metadata: ["getChatMessages", "setChatMessages"],
  preset_generation: ["generate", "stopGenerationById", "getWorldbookNames", "getWorldbook"],
  tavern_regex: ["getTavernRegexes", "replaceTavernRegexes", "retrieveDisplayedMessage"],
} as const;

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

export type TavernHelperVersionInspection =
  | { readonly state: "available"; readonly value: string }
  | { readonly state: "missing" }
  | { readonly state: "invalid" }
  | { readonly state: "threw" };

export interface TavernHelperInspection {
  readonly detected: boolean;
  readonly version: TavernHelperVersionInspection;
  readonly message_swipe_metadata: boolean;
  readonly preset_generation: boolean;
  readonly tavern_regex: boolean;
}

function read_property(value: object, property_name: string): unknown {
  try {
    return Reflect.get(value, property_name);
  } catch {
    return undefined;
  }
}

function has_methods(value: object, names: readonly string[]): boolean {
  return names.every((name) => typeof read_property(value, name) === "function");
}

function inspect_helper_version(helper: object): TavernHelperVersionInspection {
  let version_method: unknown;
  try {
    version_method = Reflect.get(helper, "getTavernHelperVersion");
  } catch {
    return { state: "threw" };
  }
  if (typeof version_method !== "function") {
    return { state: "missing" };
  }
  let version: unknown;
  try {
    version = Reflect.apply(version_method, helper, []);
  } catch {
    return { state: "threw" };
  }
  return typeof version === "string"
    ? { state: "available", value: version }
    : { state: "invalid" };
}

export function inspect_tavern_helper(value: unknown): TavernHelperInspection {
  if (!is_property_container(value)) {
    return {
      detected: value !== undefined,
      version: value === undefined ? { state: "missing" } : { state: "invalid" },
      message_swipe_metadata: false,
      preset_generation: false,
      tavern_regex: false,
    };
  }
  return {
    detected: true,
    version: inspect_helper_version(value),
    message_swipe_metadata: has_methods(value, REQUIRED_HELPER_METHODS.message_swipe_metadata),
    preset_generation: has_methods(value, REQUIRED_HELPER_METHODS.preset_generation),
    tavern_regex: has_methods(value, REQUIRED_HELPER_METHODS.tavern_regex),
  };
}

function is_message_role(value: unknown): value is HostMessageRole {
  return value === "system" || value === "assistant" || value === "user";
}

function validate_chat_message(value: unknown): TavernHelperChatMessage {
  if (!is_plain_record(value)) {
    throw new Error("TavernHelper returned an invalid chat message");
  }
  const { message_id, name, role, is_hidden, swipe_id, swipes } = value;
  if (
    typeof message_id !== "number" ||
    !Number.isInteger(message_id) ||
    message_id < 0 ||
    typeof name !== "string" ||
    !is_message_role(role) ||
    (is_hidden !== undefined && typeof is_hidden !== "boolean") ||
    typeof swipe_id !== "number" ||
    !Number.isInteger(swipe_id) ||
    !Array.isArray(swipes) ||
    !swipes.every((content) => typeof content === "string") ||
    swipe_id < 0 ||
    swipe_id >= swipes.length
  ) {
    throw new Error(`TavernHelper returned an invalid chat message ${String(message_id)}`);
  }
  return { message_id, name, role, is_hidden: is_hidden ?? false, swipe_id, swipes };
}

function normalize_chat_message(message: TavernHelperChatMessage): HostChatMessageSnapshot {
  return {
    message_id: message.message_id,
    name: message.name,
    role: message.role,
    is_hidden: message.is_hidden,
    active_swipe_id: message.swipe_id,
    swipes: message.swipes.map((content, swipe_id) => ({ swipe_id, content })),
  };
}

function read_generation_result(value: unknown): PresetGenerationResult {
  if (typeof value === "string") {
    return { content: value, reasoning: null };
  }
  if (is_plain_record(value) && typeof value.content === "string") {
    return {
      content: value.content,
      reasoning:
        typeof value.reasoning === "string" && value.reasoning.length > 0 ? value.reasoning : null,
    };
  }
  throw new Error("TavernHelper.generate returned neither text nor a detailed result");
}

const SECONDARY_LOGIC = new Set(["and_any", "and_all", "not_all", "not_any"]);
const STRATEGIES = new Set(["constant", "selective", "vectorized"]);

function to_worldbook_keys(value: unknown): readonly HostWorldbookKey[] {
  if (!Array.isArray(value)) {
    throw new Error("TavernHelper returned invalid world info keys");
  }
  return value.map((key: unknown) => {
    if (typeof key === "string") {
      return key;
    }
    if (key instanceof RegExp) {
      return { source: key.source, flags: key.flags };
    }
    throw new Error("TavernHelper returned an invalid world info key");
  });
}

function to_worldbook_entry(value: unknown): HostWorldbookEntry {
  if (
    !is_plain_record(value) ||
    !is_plain_record(value.strategy) ||
    !is_plain_record(value.position)
  ) {
    throw new Error("TavernHelper returned an invalid world info entry");
  }
  const { enabled, content, strategy, position } = value;
  const secondary = strategy.keys_secondary;
  const logic = is_plain_record(secondary) ? (secondary.logic ?? "and_any") : undefined;
  if (
    typeof enabled !== "boolean" ||
    typeof content !== "string" ||
    typeof strategy.type !== "string" ||
    !STRATEGIES.has(strategy.type) ||
    !is_plain_record(secondary) ||
    typeof logic !== "string" ||
    !SECONDARY_LOGIC.has(logic) ||
    typeof position.order !== "number"
  ) {
    throw new Error("TavernHelper returned an invalid world info entry");
  }
  return {
    enabled,
    strategy: strategy.type as HostWorldbookEntry["strategy"],
    keys: to_worldbook_keys(strategy.keys),
    secondary_logic: logic as HostWorldbookEntry["secondary_logic"],
    secondary_keys: to_worldbook_keys(secondary.keys),
    order: position.order,
    content,
  };
}

function to_custom_api(
  connection: PresetGenerationRequest["connection"],
): Readonly<Record<string, string>> | undefined {
  switch (connection.kind) {
    case "current":
      return undefined;
    case "proxy_preset":
      return connection.model === null
        ? { proxy_preset: connection.proxy_preset }
        : { proxy_preset: connection.proxy_preset, model: connection.model };
    case "custom":
      return {
        apiurl: connection.api_url,
        key: connection.api_key,
        model: connection.model,
        source: connection.source,
      };
  }
}

function to_tavern_regex(script: HostRegexScript): TavernRegex {
  return {
    id: script.id,
    script_name: script.script_name,
    enabled: true,
    find_regex: script.find_regex,
    replace_string: script.replace_string,
    trim_strings: [],
    source: {
      user_input: false,
      ai_output: true,
      slash_command: false,
      world_info: false,
      reasoning: false,
    },
    destination: {
      display: script.destination === "display",
      prompt: script.destination === "prompt",
    },
    run_on_edit: true,
    min_depth: null,
    max_depth: null,
  };
}

function regex_matches(current: TavernRegex, desired: TavernRegex): boolean {
  return (
    current.script_name === desired.script_name &&
    current.find_regex === desired.find_regex &&
    current.replace_string === desired.replace_string &&
    current.source.ai_output === desired.source.ai_output &&
    current.source.user_input === desired.source.user_input &&
    current.destination.display === desired.destination.display &&
    current.destination.prompt === desired.destination.prompt &&
    current.run_on_edit === desired.run_on_edit
  );
}

export class TavernHelperHost {
  readonly #helper: TavernHelperSurface;
  readonly #get_active_chat_id: () => string;

  constructor(helper: TavernHelperSurface, get_active_chat_id: () => string) {
    this.#helper = helper;
    this.#get_active_chat_id = get_active_chat_id;
  }

  #read_messages(range: string | number): readonly TavernHelperChatMessage[] {
    const messages = this.#helper.getChatMessages(range, { include_swipes: true });
    if (!Array.isArray(messages)) {
      throw new Error("TavernHelper returned invalid chat messages");
    }
    return messages.map(validate_chat_message);
  }

  get_active_swipe_id(message_id: number): number | null {
    return this.#read_messages(message_id)[0]?.swipe_id ?? null;
  }

  get_active_chat(): Promise<HostChatSnapshot> {
    const messages = this.#read_messages("0-{{lastMessageId}}");
    return Promise.resolve({
      chat_id: this.#get_active_chat_id(),
      messages: messages.map(normalize_chat_message),
    });
  }

  async replace_message_text(message_id: number, expected: string, next: string): Promise<boolean> {
    const [message] = this.#read_messages(message_id);
    if (message?.swipes[message.swipe_id] !== expected) {
      return false;
    }
    await this.#helper.setChatMessages([{ message_id, message: next }], { refresh: "affected" });
    return true;
  }

  async generate_with_preset(request: PresetGenerationRequest): Promise<PresetGenerationResult> {
    const custom_api = to_custom_api(request.connection);
    const result = await this.#helper.generate({
      generation_id: request.generation_id,
      preset_name: request.preset_name,
      user_input: request.user_input,
      max_chat_history: request.max_chat_history,
      should_silence: true,
      should_stream: false,
      should_return_reasoning: true,
      ...(custom_api === undefined ? {} : { custom_api }),
      ...(request.world_info.kind === "chat"
        ? {}
        : {
            overrides: {
              world_info_before: request.world_info.text,
              world_info_after: "",
              chat_history: { with_depth_entries: false },
            },
          }),
      ...(request.json_schema === null
        ? {}
        : { json_schema: { ...request.json_schema, strict: true } }),
      ...(request.image === null ? {} : { image: [request.image] }),
    });
    return read_generation_result(result);
  }

  list_worldbooks(): readonly string[] {
    const names = this.#helper.getWorldbookNames();
    if (!Array.isArray(names) || !names.every((name) => typeof name === "string")) {
      throw new Error("TavernHelper returned invalid world info book names");
    }
    return names;
  }

  async read_worldbook(name: string): Promise<readonly HostWorldbookEntry[]> {
    const entries = await this.#helper.getWorldbook(name);
    if (!Array.isArray(entries)) {
      throw new Error(`TavernHelper returned invalid entries for world info book ${name}`);
    }
    return entries.map(to_worldbook_entry);
  }

  stop_generation(generation_id: string): void {
    this.#helper.stopGenerationById(generation_id);
  }

  async sync_regex_scripts(scripts: readonly HostRegexScript[]): Promise<boolean> {
    const option = { type: "global" } as const;
    const current = this.#helper.getTavernRegexes(option);
    const desired = scripts.map(to_tavern_regex);
    const pending = desired.filter((script) => {
      const existing = current.find((candidate) => candidate.id === script.id);
      return existing === undefined || !regex_matches(existing, script);
    });
    if (pending.length === 0) {
      return false;
    }
    const kept = current.filter(
      (candidate) => !pending.some((script) => script.id === candidate.id),
    );
    await this.#helper.replaceTavernRegexes([...kept, ...pending], option);
    return true;
  }

  find_message_element(message_id: number): HTMLElement | null {
    return this.#helper.retrieveDisplayedMessage(message_id).get(0) ?? null;
  }
}
