import type {
  HostChatMessageSnapshot,
  HostChatSnapshot,
  HostMessageRole,
  MessageUpdateRequest,
  PrivatePromptRequest,
} from "./host_adapter.js";

export const TAVERN_CANVAS_SWIPE_METADATA_KEY = "tavern_canvas";

export interface TavernHelperChatMessage {
  readonly message_id: number;
  readonly name: string;
  readonly role: HostMessageRole;
  readonly is_hidden: boolean;
  readonly swipe_id: number;
  readonly swipes: readonly string[];
  readonly swipes_data: readonly Readonly<Record<string, unknown>>[];
  readonly swipes_info: readonly Readonly<Record<string, unknown>>[];
}

export interface TavernHelperMessageUpdate {
  readonly message_id: number;
  readonly swipes: readonly string[];
  readonly swipes_data: readonly Readonly<Record<string, unknown>>[];
  readonly swipes_info: readonly Readonly<Record<string, unknown>>[];
}

export interface TavernHelperStructuredGenerationResult {
  readonly content: string;
  readonly tool_calls: readonly unknown[];
}

export interface TavernHelperGenerateRawRequest {
  readonly generation_id: string;
  readonly ordered_prompts: readonly {
    readonly role: HostMessageRole;
    readonly content: string;
  }[];
  readonly should_silence: true;
  readonly should_stream: false;
  readonly max_chat_history?: "all" | number;
}

export interface TavernHelperSurface {
  getChatMessages(range: string | number, options: { readonly include_swipes: true }): unknown;
  setChatMessages(
    messages: readonly TavernHelperMessageUpdate[],
    options: { readonly refresh: "affected" },
  ): Promise<void>;
  generateRaw(request: TavernHelperGenerateRawRequest): Promise<unknown>;
}

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

function is_dense_array(value: readonly unknown[]): boolean {
  for (let index = 0; index < value.length; index += 1) {
    if (!Object.prototype.hasOwnProperty.call(value, index)) {
      return false;
    }
  }
  return true;
}

export type TavernHelperVersionInspection =
  | { readonly state: "available"; readonly value: string }
  | { readonly state: "missing" }
  | { readonly state: "invalid" }
  | { readonly state: "threw" };

export interface TavernHelperInspection {
  readonly detected: boolean;
  readonly version: TavernHelperVersionInspection;
  readonly private_prompt_generation: boolean;
  readonly message_swipe_metadata: boolean;
}

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

function inspect_helper_version(helper: object): TavernHelperVersionInspection {
  const version_method = read_property(helper, "getTavernHelperVersion");
  if (!version_method.ok) {
    return { state: "threw" };
  }
  if (typeof version_method.value !== "function") {
    return { state: "missing" };
  }

  let version: unknown;
  try {
    version = Reflect.apply(version_method.value, helper, []);
  } catch {
    return { state: "threw" };
  }
  return typeof version === "string"
    ? { state: "available", value: version }
    : { state: "invalid" };
}

export function inspect_tavern_helper(value: unknown): TavernHelperInspection {
  if (value === undefined) {
    return {
      detected: false,
      version: { state: "missing" },
      private_prompt_generation: false,
      message_swipe_metadata: false,
    };
  }
  if (!is_property_container(value)) {
    return {
      detected: true,
      version: { state: "invalid" },
      private_prompt_generation: false,
      message_swipe_metadata: false,
    };
  }

  return {
    detected: true,
    version: inspect_helper_version(value),
    private_prompt_generation: has_function_property(value, "generateRaw"),
    message_swipe_metadata:
      has_function_property(value, "getChatMessages") &&
      has_function_property(value, "setChatMessages"),
  };
}

function is_message_role(value: unknown): value is HostMessageRole {
  return value === "system" || value === "assistant" || value === "user";
}

function invalid_chat_messages(): never {
  throw new Error("TavernHelper returned invalid chat messages");
}

function validate_chat_message(value: unknown): TavernHelperChatMessage {
  if (!is_plain_record(value)) {
    return invalid_chat_messages();
  }

  const { message_id, name, role, is_hidden, swipe_id, swipes, swipes_data, swipes_info } = value;
  if (
    !Number.isInteger(message_id) ||
    typeof message_id !== "number" ||
    message_id < 0 ||
    typeof name !== "string" ||
    !is_message_role(role) ||
    typeof is_hidden !== "boolean" ||
    !Number.isInteger(swipe_id) ||
    typeof swipe_id !== "number" ||
    !Array.isArray(swipes) ||
    swipes.length === 0 ||
    !is_dense_array(swipes) ||
    !swipes.every((content) => typeof content === "string") ||
    !Array.isArray(swipes_data) ||
    !is_dense_array(swipes_data) ||
    !swipes_data.every(is_plain_record) ||
    !Array.isArray(swipes_info) ||
    !is_dense_array(swipes_info) ||
    !swipes_info.every(is_plain_record) ||
    swipes_data.length !== swipes.length ||
    swipes_info.length !== swipes.length ||
    swipe_id < 0 ||
    swipe_id >= swipes.length
  ) {
    return invalid_chat_messages();
  }

  return {
    message_id,
    name,
    role,
    is_hidden,
    swipe_id,
    swipes,
    swipes_data,
    swipes_info,
  };
}

function has_plain_chat_records(value: unknown): boolean {
  try {
    if (!Array.isArray(value) || !is_dense_array(value)) {
      return false;
    }

    for (let index = 0; index < value.length; index += 1) {
      const message: unknown = value[index];
      if (!is_plain_record(message)) {
        return false;
      }
      const swipes_data = read_property(message, "swipes_data");
      const swipes_info = read_property(message, "swipes_info");
      if (
        !swipes_data.ok ||
        !Array.isArray(swipes_data.value) ||
        !is_dense_array(swipes_data.value) ||
        !swipes_data.value.every(is_plain_record) ||
        !swipes_info.ok ||
        !Array.isArray(swipes_info.value) ||
        !is_dense_array(swipes_info.value) ||
        !swipes_info.value.every(is_plain_record)
      ) {
        return false;
      }
    }
    return true;
  } catch {
    return false;
  }
}

function validate_and_clone_chat_messages(value: unknown): readonly TavernHelperChatMessage[] {
  if (!has_plain_chat_records(value)) {
    return invalid_chat_messages();
  }
  let clone: unknown;
  try {
    clone = structuredClone(value);
  } catch {
    return invalid_chat_messages();
  }

  if (!Array.isArray(clone) || !is_dense_array(clone)) {
    return invalid_chat_messages();
  }
  return clone.map(validate_chat_message);
}

function clone_update_metadata(
  metadata: MessageUpdateRequest["metadata"],
): MessageUpdateRequest["metadata"] {
  try {
    return structuredClone(metadata);
  } catch {
    throw new Error("TavernHelper message update metadata could not be cloned");
  }
}

function normalize_chat_message(message: TavernHelperChatMessage): HostChatMessageSnapshot {
  return {
    message_id: message.message_id,
    name: message.name,
    role: message.role,
    is_hidden: message.is_hidden,
    active_swipe_id: message.swipe_id,
    swipes: message.swipes.map((content, swipe_id) => ({
      swipe_id,
      content,
      data: message.swipes_data[swipe_id] ?? {},
      metadata: message.swipes_info[swipe_id] ?? {},
    })),
  };
}

export class TavernHelperHost {
  readonly #helper: TavernHelperSurface;
  readonly #get_active_chat_id: () => string;

  constructor(helper: TavernHelperSurface, get_active_chat_id: () => string) {
    this.#helper = helper;
    this.#get_active_chat_id = get_active_chat_id;
  }

  async get_active_chat(): Promise<HostChatSnapshot> {
    const messages = validate_and_clone_chat_messages(
      this.#helper.getChatMessages("0-{{lastMessageId}}", {
        include_swipes: true,
      }),
    );
    const chat_id = this.#get_active_chat_id();
    if (typeof chat_id !== "string" || chat_id.trim().length === 0) {
      throw new Error("TavernHelper returned an invalid active chat ID");
    }

    return {
      chat_id,
      messages: messages.map(normalize_chat_message),
    };
  }

  async generate_private_prompt(request: PrivatePromptRequest): Promise<string> {
    const config: TavernHelperGenerateRawRequest = {
      generation_id: request.generation_id,
      ordered_prompts: request.prompts.map((prompt) => ({ ...prompt })),
      should_silence: true,
      should_stream: false,
      ...(request.max_chat_history === undefined
        ? {}
        : { max_chat_history: request.max_chat_history }),
    };
    const result = await this.#helper.generateRaw(config);

    if (typeof result !== "string") {
      throw new Error("Private prompt generation returned structured tool calls");
    }

    return result;
  }

  async update_message(request: MessageUpdateRequest): Promise<void> {
    const messages = validate_and_clone_chat_messages(
      this.#helper.getChatMessages(request.message_id, {
        include_swipes: true,
      }),
    );
    const message = messages.find((candidate) => candidate.message_id === request.message_id);
    if (message === undefined) {
      throw new Error(`Host message ${String(request.message_id)} no longer exists`);
    }
    if (
      !Number.isInteger(request.swipe_id) ||
      request.swipe_id < 0 ||
      request.swipe_id >= message.swipes.length
    ) {
      throw new Error(
        `Host message ${String(request.message_id)} swipe ${String(request.swipe_id)} no longer exists`,
      );
    }

    const swipes = message.swipes.map((content, swipe_id) =>
      swipe_id === request.swipe_id ? request.content : content,
    );
    const swipes_info = message.swipes_info.map((metadata, swipe_id) =>
      swipe_id === request.swipe_id
        ? {
            ...metadata,
            [TAVERN_CANVAS_SWIPE_METADATA_KEY]: clone_update_metadata(request.metadata),
          }
        : metadata,
    );

    await this.#helper.setChatMessages(
      [
        {
          message_id: message.message_id,
          swipes,
          swipes_data: message.swipes_data,
          swipes_info,
        },
      ],
      { refresh: "affected" },
    );
  }
}
