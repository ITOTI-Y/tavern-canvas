import type {
  ChatChangeHandler,
  FinalAssistantHandler,
  GenerationJobListener,
  GenerationJobSnapshot,
  MessageAttachmentUpdate,
  MessageBindingJobPort,
  MessagePort,
  MessageTarget,
  MessageTargetQuery,
  SwipeChangeHandler,
} from "@tavern-canvas/core";
import type { TavernCanvasMessageMetadata } from "@tavern-canvas/contracts";
import { describe, expect, it, vi } from "vitest";

import type {
  HostAdapter,
  HostChatChangeHandler,
  HostGenerationEvent,
  HostGenerationHandler,
  HostImageTool,
  HostMessageSwipedHandler,
  MessageUpdateRequest,
} from "../../host/index.js";
import {
  HostMessagePort,
  MessageBindingModule,
  type FinalAssistantBindingSource,
} from "./message_binding_module.js";

class EmptyJobPort implements MessageBindingJobPort {
  listeners = new Set<GenerationJobListener>();

  get(): GenerationJobSnapshot | null {
    return null;
  }

  subscribe(listener: GenerationJobListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  mark_attached(): Promise<GenerationJobSnapshot> {
    return Promise.reject(new Error("No jobs"));
  }

  mark_orphaned(): Promise<GenerationJobSnapshot> {
    return Promise.reject(new Error("No jobs"));
  }
}

class EmptyMessagePort implements MessagePort {
  final_handlers = new Set<FinalAssistantHandler>();
  chat_handlers = new Set<ChatChangeHandler>();
  swipe_handlers = new Set<SwipeChangeHandler>();

  find_target(_request: MessageTargetQuery): Promise<MessageTarget | null> {
    return Promise.resolve(null);
  }

  update_target(_request: MessageAttachmentUpdate): Promise<void> {
    return Promise.resolve();
  }

  subscribe_final_assistant(handler: FinalAssistantHandler): () => void {
    this.final_handlers.add(handler);
    return () => this.final_handlers.delete(handler);
  }

  subscribe_chat_change(handler: ChatChangeHandler): () => void {
    this.chat_handlers.add(handler);
    return () => this.chat_handlers.delete(handler);
  }

  subscribe_swipe_change(handler: SwipeChangeHandler): () => void {
    this.swipe_handlers.add(handler);
    return () => this.swipe_handlers.delete(handler);
  }
}

describe("MessageBindingModule", () => {
  it("owns binder subscriptions across idempotent runtime lifecycle", async () => {
    const jobs = new EmptyJobPort();
    const messages = new EmptyMessagePort();
    const module = new MessageBindingModule(jobs, messages);

    await module.start();
    await module.start();

    expect(module.module_id).toBe("message_binding");
    expect(jobs.listeners.size).toBe(1);
    expect(messages.final_handlers.size).toBe(1);
    expect(messages.chat_handlers.size).toBe(1);
    expect(messages.swipe_handlers.size).toBe(1);

    await module.stop();
    await module.stop();

    expect(jobs.listeners.size).toBe(0);
    expect(messages.final_handlers.size).toBe(0);
    expect(messages.chat_handlers.size).toBe(0);
    expect(messages.swipe_handlers.size).toBe(0);
  });
});

class RecordingHost implements HostAdapter {
  readonly capabilities = {};
  readonly generation_handlers = new Set<HostGenerationHandler>();
  readonly chat_handlers = new Set<HostChatChangeHandler>();
  readonly swipe_handlers = new Set<HostMessageSwipedHandler>();
  readonly updates: MessageUpdateRequest[] = [];
  readonly metadata: TavernCanvasMessageMetadata = {
    schema_version: 1,
    generation_anchor: "a".repeat(64),
    source_anchor: "b".repeat(64),
    request_ids: ["11111111-1111-4111-8111-111111111111"],
    image_ids: ["33333333-3333-4333-8333-333333333333"],
  };

  get_locale(): string {
    return "en";
  }

  get_active_chat() {
    return Promise.resolve({
      chat_id: "chat-a",
      messages: [
        {
          message_id: 9,
          name: "Assistant",
          role: "assistant" as const,
          is_hidden: false,
          active_swipe_id: 0,
          swipes: [
            {
              swipe_id: 0,
              content: "Final answer",
              data: {
                extra: {
                  media: [
                    {
                      image_id: "33333333-3333-4333-8333-333333333333",
                      path: "/existing.png",
                    },
                  ],
                },
              },
              metadata: { tavern_canvas: this.metadata },
            },
          ],
        },
      ],
    });
  }

  subscribe_generation(handler: HostGenerationHandler): () => void {
    this.generation_handlers.add(handler);
    return () => this.generation_handlers.delete(handler);
  }

  subscribe_generation_chunk(): () => void {
    return () => undefined;
  }

  subscribe_chat_change(handler: HostChatChangeHandler): () => void {
    this.chat_handlers.add(handler);
    return () => this.chat_handlers.delete(handler);
  }

  subscribe_message_swiped(handler: HostMessageSwipedHandler): () => void {
    this.swipe_handlers.add(handler);
    return () => this.swipe_handlers.delete(handler);
  }

  register_image_tool(_tool: HostImageTool): () => void {
    return () => undefined;
  }

  generate_private_prompt(): Promise<string> {
    return Promise.resolve("");
  }

  update_message(request: MessageUpdateRequest): Promise<void> {
    this.updates.push(request);
    return Promise.resolve();
  }

  upload_image(): Promise<{ path: string }> {
    return Promise.resolve({ path: "/image.png" });
  }

  emit_generation(event: HostGenerationEvent): void {
    for (const handler of this.generation_handlers) {
      handler(event);
    }
  }
}

class FixedBindingSource implements FinalAssistantBindingSource {
  resolve(message_id: number) {
    if (message_id !== 9) {
      return null;
    }
    return {
      generation_anchor: "a".repeat(64),
      source_anchor: "b".repeat(64),
      request_ids: ["11111111-1111-4111-8111-111111111111"],
    };
  }
}

describe("HostMessagePort", () => {
  it("maps supported host events, exact targets, metadata, and media", async () => {
    const host = new RecordingHost();
    const port = new HostMessagePort(host, new FixedBindingSource());
    const final_events: unknown[] = [];
    const chat_events: unknown[] = [];
    const swipe_events: unknown[] = [];
    const dispose_final = port.subscribe_final_assistant((event) => final_events.push(event));
    const dispose_chat = port.subscribe_chat_change((event) => chat_events.push(event));
    const dispose_swipe = port.subscribe_swipe_change((event) => swipe_events.push(event));

    host.emit_generation({ phase: "ended", message_id: 9 });
    for (const handler of host.chat_handlers) {
      handler({ chat_id: "chat-a" });
    }
    for (const handler of host.swipe_handlers) {
      handler({ message_id: 9 });
    }

    await vi.waitFor(() => expect(final_events).toHaveLength(1));
    await vi.waitFor(() => expect(swipe_events).toHaveLength(1));
    expect(final_events).toEqual([
      {
        chat_id: "chat-a",
        message_id: 9,
        swipe_id: 0,
        role: "assistant",
        is_final: true,
        generation_anchor: "a".repeat(64),
        source_anchor: "b".repeat(64),
        request_ids: ["11111111-1111-4111-8111-111111111111"],
      },
    ]);
    expect(chat_events).toEqual([{ chat_id: "chat-a" }]);
    expect(swipe_events).toEqual([{ chat_id: "chat-a", message_id: 9, swipe_id: 0 }]);

    const target = await port.find_target({
      chat_id: "chat-a",
      message_id: 9,
      swipe_id: 0,
      generation_anchor: "a".repeat(64),
    });
    expect(target).toEqual({
      chat_id: "chat-a",
      message_id: 9,
      swipe_id: 0,
      generation_anchor: "a".repeat(64),
      metadata: host.metadata,
      media: [
        {
          image_id: "33333333-3333-4333-8333-333333333333",
          path: "/existing.png",
        },
      ],
    });

    await port.update_target({
      chat_id: "chat-a",
      message_id: 9,
      swipe_id: 0,
      metadata: host.metadata,
      media: target?.media ?? [],
    });
    expect(host.updates).toEqual([
      {
        message_id: 9,
        swipe_id: 0,
        content: "Final answer",
        metadata: host.metadata,
        media: [
          {
            image_id: "33333333-3333-4333-8333-333333333333",
            path: "/existing.png",
          },
        ],
      },
    ]);

    dispose_swipe();
    dispose_chat();
    dispose_final();
    expect(host.generation_handlers.size).toBe(0);
    expect(host.chat_handlers.size).toBe(0);
    expect(host.swipe_handlers.size).toBe(0);
  });

  it("never resolves another chat or a nonmatching generation anchor", async () => {
    const port = new HostMessagePort(new RecordingHost(), new FixedBindingSource());

    await expect(
      port.find_target({
        chat_id: "chat-b",
        message_id: 9,
        swipe_id: 0,
        generation_anchor: "a".repeat(64),
      }),
    ).resolves.toBeNull();
    await expect(
      port.find_target({
        chat_id: "chat-a",
        message_id: 9,
        swipe_id: 0,
        generation_anchor: "d".repeat(64),
      }),
    ).resolves.toBeNull();
  });
});
