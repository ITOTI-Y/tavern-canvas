import { describe, expect, it, vi } from "vitest";

import {
  SillyTavernHost,
  type SillyTavernChatMessage,
  type SillyTavernContextSurface,
  type SillyTavernEventListener,
} from "./sillytavern_host.js";

const EVENT_TYPES = {
  GENERATION_STARTED: "generation_started",
  GENERATION_STOPPED: "generation_stopped",
  GENERATION_ENDED: "generation_ended",
  CHAT_CHANGED: "chat_id_changed",
  MESSAGE_SWIPED: "message_swiped",
  MESSAGE_UPDATED: "message_updated",
  MESSAGE_EDITED: "message_edited",
  CHARACTER_MESSAGE_RENDERED: "character_message_rendered",
  MORE_MESSAGES_LOADED: "more_messages_loaded",
};

function create_host(chat: SillyTavernChatMessage[] = []): {
  host: SillyTavernHost;
  context: SillyTavernContextSurface;
  emit(event_name: string, ...arguments_: unknown[]): void;
} {
  const listeners = new Map<string, Set<SillyTavernEventListener>>();
  const context: SillyTavernContextSurface = {
    getCurrentLocale: () => "en",
    getCurrentChatId: () => "chat-1",
    getRequestHeaders: () => ({}),
    chat,
    saveChat: vi.fn(() => Promise.resolve()),
    eventSource: {
      on(event_name, listener) {
        const set = listeners.get(event_name) ?? new Set();
        set.add(listener);
        listeners.set(event_name, set);
      },
      removeListener(event_name, listener) {
        listeners.get(event_name)?.delete(listener);
      },
    },
    eventTypes: EVENT_TYPES,
  };
  return {
    host: new SillyTavernHost(() => context),
    context,
    emit(event_name, ...arguments_) {
      for (const listener of listeners.get(event_name) ?? []) {
        listener(...arguments_);
      }
    },
  };
}

describe("SillyTavernHost events", () => {
  it("reports the finished message as chat.length - 1 and stops after unsubscribe", () => {
    const { host, emit } = create_host();
    const handler = vi.fn();
    const unsubscribe = host.subscribe_generation(handler);

    emit(EVENT_TYPES.GENERATION_STARTED, "normal", {}, false);
    emit(EVENT_TYPES.GENERATION_ENDED, 5);
    unsubscribe();
    emit(EVENT_TYPES.GENERATION_ENDED, 6);

    expect(handler.mock.calls).toEqual([
      [{ phase: "started", generation_type: "normal", dry_run: false }],
      [{ phase: "ended", message_id: 4 }],
    ]);
  });

  it("forwards every message re-render event with its message id", () => {
    const { host, emit } = create_host();
    const handler = vi.fn();
    host.subscribe_message_rendered(handler);

    emit(EVENT_TYPES.CHARACTER_MESSAGE_RENDERED, 3, "normal");
    emit(EVENT_TYPES.MESSAGE_SWIPED, 4);
    emit(EVENT_TYPES.MESSAGE_EDITED, "not an id");

    expect(handler.mock.calls).toEqual([[3], [4]]);
  });
});

describe("SillyTavernHost swipe records", () => {
  it("writes the active swipe's record to message.extra and saves the chat", async () => {
    const message: SillyTavernChatMessage = { swipe_id: 1, extra: { reasoning: "kept" } };
    const { host, context } = create_host([message]);
    const location = { chat_id: "chat-1", message_id: 0, swipe_id: 1 };

    await host.write_swipe_record(location, { slots: { a: 1 } });

    expect(message.extra).toEqual({ reasoning: "kept", tavern_canvas: { slots: { a: 1 } } });
    expect(context.saveChat).toHaveBeenCalledOnce();
    expect(host.read_swipe_record(location)).toEqual({ slots: { a: 1 } });
  });

  it("writes an inactive swipe's record into its swipe_info extra", async () => {
    const message: SillyTavernChatMessage = {
      swipe_id: 0,
      extra: {},
      swipe_info: [{ extra: {} }, {}],
    };
    const { host } = create_host([message]);

    await host.write_swipe_record({ chat_id: "chat-1", message_id: 0, swipe_id: 1 }, "record");

    expect(message.swipe_info?.[1]?.extra).toEqual({ tavern_canvas: "record" });
    expect(message.extra).toEqual({});
  });

  it("refuses to write when the chat is no longer active", async () => {
    const { host, context } = create_host([{ swipe_id: 0 }]);

    await expect(
      host.write_swipe_record({ chat_id: "chat-2", message_id: 0, swipe_id: 0 }, "record"),
    ).rejects.toThrow("is not available");
    expect(context.saveChat).not.toHaveBeenCalled();
    expect(host.read_swipe_record({ chat_id: "chat-2", message_id: 0, swipe_id: 0 })).toBeNull();
  });
});
