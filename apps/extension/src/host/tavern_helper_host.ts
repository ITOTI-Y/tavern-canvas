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
  getChatMessages(
    range: string | number,
    options: { readonly include_swipes: true },
  ): readonly TavernHelperChatMessage[];
  setChatMessages(
    messages: readonly TavernHelperMessageUpdate[],
    options: { readonly refresh: "affected" },
  ): Promise<void>;
  generateRaw(
    request: TavernHelperGenerateRawRequest,
  ): Promise<string | TavernHelperStructuredGenerationResult>;
}

export class TavernHelperHost {
  readonly #helper: TavernHelperSurface;
  readonly #get_active_chat_id: () => string;

  constructor(
    helper: TavernHelperSurface,
    get_active_chat_id: () => string,
  ) {
    this.#helper = helper;
    this.#get_active_chat_id = get_active_chat_id;
  }

  async get_active_chat(): Promise<HostChatSnapshot> {
    const messages = this.#helper.getChatMessages("0-{{lastMessageId}}", {
      include_swipes: true,
    });

    return {
      chat_id: this.#get_active_chat_id(),
      messages: messages.map((message) => this.#clone_message(message)),
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
    const messages = this.#helper.getChatMessages(request.message_id, {
      include_swipes: true,
    });
    const message = messages.find(
      (candidate) => candidate.message_id === request.message_id,
    );
    if (message === undefined) {
      throw new Error(`Host message ${request.message_id} no longer exists`);
    }
    if (
      !Number.isInteger(request.swipe_id) ||
      request.swipe_id < 0 ||
      request.swipe_id >= message.swipes.length
    ) {
      throw new Error(
        `Host message ${request.message_id} swipe ${request.swipe_id} no longer exists`,
      );
    }

    const swipes = message.swipes.map((content, swipe_id) =>
      swipe_id === request.swipe_id ? request.content : content,
    );
    const swipes_data = message.swipes_data.map((data) =>
      structuredClone(data),
    );
    const swipes_info = message.swipes.map((_, swipe_id) => {
      const metadata = structuredClone(message.swipes_info[swipe_id] ?? {});
      if (swipe_id !== request.swipe_id) {
        return metadata;
      }

      return {
        ...metadata,
        [TAVERN_CANVAS_SWIPE_METADATA_KEY]: structuredClone(request.metadata),
      };
    });

    await this.#helper.setChatMessages(
      [
        {
          message_id: message.message_id,
          swipes,
          swipes_data,
          swipes_info,
        },
      ],
      { refresh: "affected" },
    );
  }

  #clone_message(message: TavernHelperChatMessage): HostChatMessageSnapshot {
    return {
      message_id: message.message_id,
      name: message.name,
      role: message.role,
      is_hidden: message.is_hidden,
      active_swipe_id: message.swipe_id,
      swipes: message.swipes.map((content, swipe_id) => ({
        swipe_id,
        content,
        data: structuredClone(message.swipes_data[swipe_id] ?? {}),
        metadata: structuredClone(message.swipes_info[swipe_id] ?? {}),
      })),
    };
  }
}
