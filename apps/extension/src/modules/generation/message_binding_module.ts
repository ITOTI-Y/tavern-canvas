import {
  ImageIdSchema,
  RequestIdSchema,
  Sha256Schema,
  TavernCanvasMessageMetadataSchema,
  type RequestId,
  type Sha256,
} from "@tavern-canvas/contracts";
import {
  MessageBinder,
  type FinalAssistantHandler,
  type MessageAttachmentUpdate,
  type MessageBindingJobPort,
  type MessageMedia,
  type MessagePort,
  type MessageTarget,
  type MessageTargetQuery,
  type RuntimeModule,
  type SwipeChangeHandler,
} from "@tavern-canvas/core";

import {
  TAVERN_CANVAS_SWIPE_METADATA_KEY,
  type HostAdapter,
  type HostChatMessageSnapshot,
  type HostMessageSwipeSnapshot,
} from "../../host/index.js";

export interface FinalAssistantBinding {
  readonly generation_anchor: Sha256;
  readonly source_anchor: Sha256;
  readonly request_ids: readonly RequestId[];
}

export interface FinalAssistantBindingSource {
  resolve(message_id: number): FinalAssistantBinding | null;
}

function is_record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function find_message(
  messages: readonly HostChatMessageSnapshot[],
  message_id: number,
): HostChatMessageSnapshot | null {
  return messages.find((message) => message.message_id === message_id) ?? null;
}

function find_swipe(
  message: HostChatMessageSnapshot,
  swipe_id: number,
): HostMessageSwipeSnapshot | null {
  return message.swipes.find((swipe) => swipe.swipe_id === swipe_id) ?? null;
}

function read_metadata(
  swipe: HostMessageSwipeSnapshot,
): ReturnType<typeof TavernCanvasMessageMetadataSchema.parse> | null {
  const raw_metadata = swipe.metadata[TAVERN_CANVAS_SWIPE_METADATA_KEY];
  if (raw_metadata === undefined) {
    return null;
  }
  const result = TavernCanvasMessageMetadataSchema.safeParse(raw_metadata);
  return result.success ? result.data : null;
}

function read_media(swipe: HostMessageSwipeSnapshot): readonly MessageMedia[] {
  const extra = swipe.data.extra;
  if (!is_record(extra) || !Array.isArray(extra.media)) {
    return [];
  }
  const media: MessageMedia[] = [];
  for (const raw_media of extra.media) {
    if (!is_record(raw_media)) {
      continue;
    }
    const image_id = ImageIdSchema.safeParse(raw_media.image_id);
    if (image_id.success) {
      media.push(Object.freeze({ ...raw_media, image_id: image_id.data }));
    }
  }
  return Object.freeze(media);
}

export class HostMessagePort implements MessagePort {
  readonly #host: HostAdapter;
  readonly #bindings: FinalAssistantBindingSource;

  constructor(host: HostAdapter, bindings: FinalAssistantBindingSource) {
    this.#host = host;
    this.#bindings = bindings;
  }

  async find_target(request: MessageTargetQuery): Promise<MessageTarget | null> {
    const chat = await this.#host.get_active_chat();
    if (chat.chat_id !== request.chat_id) {
      return null;
    }
    const message = find_message(chat.messages, request.message_id);
    if (message === null) {
      return null;
    }
    const swipe = find_swipe(message, request.swipe_id);
    if (swipe === null) {
      return null;
    }
    const metadata = read_metadata(swipe);
    if (metadata !== null && metadata.generation_anchor !== request.generation_anchor) {
      return null;
    }

    return Object.freeze({
      chat_id: chat.chat_id,
      message_id: message.message_id,
      swipe_id: swipe.swipe_id,
      generation_anchor: metadata?.generation_anchor ?? request.generation_anchor,
      metadata,
      media: read_media(swipe),
    });
  }

  async update_target(request: MessageAttachmentUpdate): Promise<void> {
    const chat = await this.#host.get_active_chat();
    if (chat.chat_id !== request.chat_id) {
      throw new Error(`Host chat ${request.chat_id} is not active`);
    }
    const message = find_message(chat.messages, request.message_id);
    const swipe = message === null ? null : find_swipe(message, request.swipe_id);
    if (message === null || swipe === null) {
      throw new Error(
        `Host message ${String(request.message_id)} swipe ${String(request.swipe_id)} no longer exists`,
      );
    }
    const existing_metadata = read_metadata(swipe);
    if (
      existing_metadata !== null &&
      existing_metadata.generation_anchor !== request.metadata.generation_anchor
    ) {
      throw new Error("Host message generation anchor changed before attachment");
    }

    await this.#host.update_message({
      message_id: message.message_id,
      swipe_id: swipe.swipe_id,
      content: swipe.content,
      metadata: TavernCanvasMessageMetadataSchema.parse(request.metadata),
      media: request.media.map((media) => ({ ...media })),
    });
  }

  subscribe_final_assistant(handler: FinalAssistantHandler): () => void {
    let active = true;
    const unsubscribe = this.#host.subscribe_generation((event) => {
      if (event.phase !== "ended") {
        return;
      }
      const binding = this.#bindings.resolve(event.message_id);
      if (binding === null) {
        return;
      }
      void this.#host.get_active_chat().then((chat) => {
        if (!active) {
          return;
        }
        const message = find_message(chat.messages, event.message_id);
        if (message === null) {
          return;
        }
        handler({
          chat_id: chat.chat_id,
          message_id: message.message_id,
          swipe_id: message.active_swipe_id,
          role: message.role,
          is_final: message.role === "assistant" && !message.is_hidden,
          generation_anchor: Sha256Schema.parse(binding.generation_anchor),
          source_anchor: Sha256Schema.parse(binding.source_anchor),
          request_ids: binding.request_ids.map((request_id) => RequestIdSchema.parse(request_id)),
        });
      });
    });
    return () => {
      if (!active) {
        return;
      }
      active = false;
      unsubscribe();
    };
  }

  subscribe_chat_change(handler: (event: { readonly chat_id: string }) => void): () => void {
    return this.#host.subscribe_chat_change(handler);
  }

  subscribe_swipe_change(handler: SwipeChangeHandler): () => void {
    let active = true;
    const unsubscribe = this.#host.subscribe_message_swiped((event) => {
      void this.#host.get_active_chat().then((chat) => {
        if (!active) {
          return;
        }
        const message = find_message(chat.messages, event.message_id);
        if (message !== null) {
          handler({
            chat_id: chat.chat_id,
            message_id: message.message_id,
            swipe_id: message.active_swipe_id,
          });
        }
      });
    });
    return () => {
      if (!active) {
        return;
      }
      active = false;
      unsubscribe();
    };
  }
}

export class MessageBindingModule implements RuntimeModule {
  readonly module_id = "message_binding";
  readonly requires: readonly string[] = [];
  readonly #binder: MessageBinder;

  constructor(jobs: MessageBindingJobPort, messages: MessagePort) {
    this.#binder = new MessageBinder(jobs, messages);
  }

  start(): Promise<void> {
    this.#binder.start();
    return Promise.resolve();
  }

  stop(): Promise<void> {
    this.#binder.stop();
    return Promise.resolve();
  }
}
