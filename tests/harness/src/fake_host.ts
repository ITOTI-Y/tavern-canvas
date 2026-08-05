import type {
  HostAdapter,
  HostChatChangeHandler,
  HostChatSnapshot,
  HostGenerationChunkHandler,
  HostGenerationEvent,
  HostGenerationHandler,
  HostImageTool,
  HostImageUploadRequest,
  HostImageUploadResult,
  HostMessageRole,
  HostMessageSwipedHandler,
  MessageUpdateRequest,
  PrivatePromptRequest,
} from "../../../apps/extension/src/host/index.js";
import { TAVERN_CANVAS_SWIPE_METADATA_KEY } from "../../../apps/extension/src/host/index.js";

interface MutableSwipe {
  swipe_id: number;
  content: string;
  data: Record<string, unknown>;
  metadata: Record<string, unknown>;
}

interface MutableMessage {
  message_id: number;
  name: string;
  role: HostMessageRole;
  is_hidden: boolean;
  active_swipe_id: number;
  swipes: MutableSwipe[];
}

interface MutableChat {
  chat_id: string;
  messages: MutableMessage[];
}

export interface AddMessageRequest {
  readonly chat_id: string;
  readonly message_id: number;
  readonly role: HostMessageRole;
  readonly content: string;
  readonly swipe_id?: number;
  readonly is_hidden?: boolean;
}

export class FakeHost implements HostAdapter {
  readonly capabilities;
  readonly tools = new Map<string, HostImageTool>();
  readonly generation_handlers = new Set<HostGenerationHandler>();
  readonly chunk_handlers = new Set<HostGenerationChunkHandler>();
  readonly chat_handlers = new Set<HostChatChangeHandler>();
  readonly swipe_handlers = new Set<HostMessageSwipedHandler>();
  readonly message_updates: MessageUpdateRequest[] = [];
  readonly #chats = new Map<string, MutableChat>();
  #active_chat_id: string;
  raw_model_text = "";
  cleaned_model_text = "";

  constructor(native_tool_available: boolean, initial_chat_id = "chat-a") {
    this.capabilities = {
      native_tool_manager: { available: native_tool_available },
      main_generation_events: { available: true },
      message_swipe_metadata: { available: true },
    };
    this.#active_chat_id = initial_chat_id;
    this.#chats.set(initial_chat_id, { chat_id: initial_chat_id, messages: [] });
  }

  get_locale(): string {
    return "en";
  }

  get_active_chat(): Promise<HostChatSnapshot> {
    const chat = this.#require_chat(this.#active_chat_id);
    return Promise.resolve(structuredClone(chat));
  }

  subscribe_generation(handler: HostGenerationHandler): () => void {
    return this.#subscribe(this.generation_handlers, handler);
  }

  subscribe_generation_chunk(handler: HostGenerationChunkHandler): () => void {
    return this.#subscribe(this.chunk_handlers, handler);
  }

  subscribe_chat_change(handler: HostChatChangeHandler): () => void {
    return this.#subscribe(this.chat_handlers, handler);
  }

  subscribe_message_swiped(handler: HostMessageSwipedHandler): () => void {
    return this.#subscribe(this.swipe_handlers, handler);
  }

  register_image_tool(tool: HostImageTool): () => void {
    this.tools.set(tool.name, tool);
    let disposed = false;
    return () => {
      if (disposed) {
        return;
      }
      disposed = true;
      if (this.tools.get(tool.name) === tool) {
        this.tools.delete(tool.name);
      }
    };
  }

  generate_private_prompt(_request: PrivatePromptRequest): Promise<string> {
    return Promise.resolve("private response");
  }

  update_message(request: MessageUpdateRequest): Promise<void> {
    const chat = this.#require_chat(this.#active_chat_id);
    const message = chat.messages.find((candidate) => candidate.message_id === request.message_id);
    const swipe = message?.swipes.find((candidate) => candidate.swipe_id === request.swipe_id);
    if (message === undefined || swipe === undefined) {
      return Promise.reject(new Error("Exact fake host message target does not exist"));
    }
    swipe.content = request.content;
    swipe.metadata = {
      ...swipe.metadata,
      [TAVERN_CANVAS_SWIPE_METADATA_KEY]: structuredClone(request.metadata),
    };
    const current_extra =
      typeof swipe.data.extra === "object" && swipe.data.extra !== null ? swipe.data.extra : {};
    swipe.data = {
      ...swipe.data,
      extra: { ...current_extra, media: structuredClone(request.media) },
    };
    this.message_updates.push(structuredClone(request));
    return Promise.resolve();
  }

  upload_image(_request: HostImageUploadRequest): Promise<HostImageUploadResult> {
    return Promise.resolve({ path: "/fake/image.png" });
  }

  create_chat(chat_id: string): void {
    if (!this.#chats.has(chat_id)) {
      this.#chats.set(chat_id, { chat_id, messages: [] });
    }
  }

  add_message(request: AddMessageRequest): void {
    const chat = this.#require_chat(request.chat_id);
    const swipe_id = request.swipe_id ?? 0;
    const existing = chat.messages.find((message) => message.message_id === request.message_id);
    if (existing === undefined) {
      chat.messages.push({
        message_id: request.message_id,
        name: request.role === "assistant" ? "Assistant" : "System",
        role: request.role,
        is_hidden: request.is_hidden ?? false,
        active_swipe_id: swipe_id,
        swipes: [
          {
            swipe_id,
            content: request.content,
            data: {},
            metadata: {},
          },
        ],
      });
      return;
    }
    existing.swipes.push({
      swipe_id,
      content: request.content,
      data: {},
      metadata: {},
    });
    existing.active_swipe_id = swipe_id;
  }

  delete_message(chat_id: string, message_id: number): void {
    const chat = this.#require_chat(chat_id);
    chat.messages = chat.messages.filter((message) => message.message_id !== message_id);
  }

  switch_chat(chat_id: string): void {
    this.create_chat(chat_id);
    this.#active_chat_id = chat_id;
    for (const handler of this.chat_handlers) {
      handler({ chat_id });
    }
  }

  switch_swipe(chat_id: string, message_id: number, swipe_id: number): void {
    const chat = this.#require_chat(chat_id);
    const message = chat.messages.find((candidate) => candidate.message_id === message_id);
    if (message === undefined || !message.swipes.some((swipe) => swipe.swipe_id === swipe_id)) {
      throw new Error(`Fake swipe ${String(message_id)}:${String(swipe_id)} does not exist`);
    }
    this.#active_chat_id = chat_id;
    message.active_swipe_id = swipe_id;
    for (const handler of this.swipe_handlers) {
      handler({ message_id });
    }
  }

  emit_generation(event: HostGenerationEvent): void {
    for (const handler of [...this.generation_handlers]) {
      handler(event);
    }
  }

  emit_model_chunk(chunk: string): void {
    this.raw_model_text += chunk;
    for (const handler of [...this.chunk_handlers]) {
      handler(chunk);
    }
  }

  append_cleaned_text(text: string): void {
    this.cleaned_model_text += text;
  }

  invoke_tool(arguments_: Readonly<Record<string, unknown>>): Promise<string> {
    const tool = this.tools.get("request_image");
    if (tool === undefined) {
      return Promise.reject(new Error("request_image is not registered"));
    }
    return Promise.resolve(tool.execute(arguments_));
  }

  message(chat_id: string, message_id: number): MutableMessage | null {
    return (
      this.#require_chat(chat_id).messages.find((message) => message.message_id === message_id) ??
      null
    );
  }

  #require_chat(chat_id: string): MutableChat {
    const chat = this.#chats.get(chat_id);
    if (chat === undefined) {
      throw new Error(`Fake chat ${chat_id} does not exist`);
    }
    return chat;
  }

  #subscribe<T>(listeners: Set<T>, listener: T): () => void {
    listeners.add(listener);
    let disposed = false;
    return () => {
      if (disposed) {
        return;
      }
      disposed = true;
      listeners.delete(listener);
    };
  }
}
