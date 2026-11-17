import { describe, expect, it, vi } from "vitest";

import {
  SillyTavernHost,
  type SillyTavernChatMessage,
  type SillyTavernContextSurface,
  type SillyTavernEventListener,
} from "./sillytavern_host.js";
import { content_hash } from "../modules/world_info/slim_store.js";

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
  CHAT_COMPLETION_SETTINGS_READY: "chat_completion_settings_ready",
  WORLDINFO_ENTRIES_LOADED: "worldinfo_entries_loaded",
  WORLDINFO_SCAN_DONE: "worldinfo_scan_done",
};

function create_host(
  chat: SillyTavernChatMessage[] = [],
  fetch_: typeof fetch = vi.fn<typeof fetch>(),
): {
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
    host: new SillyTavernHost(() => context, fetch_),
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

describe("SillyTavernHost Advanced Preset marker", () => {
  it("removes the marker only from the request sent right after the given generation started", () => {
    const { host, emit } = create_host();
    const restore = host.adjust_request("inkwell-1", { native: true, reasoning_effort: null });
    const ready = (data: object) => {
      emit(EVENT_TYPES.CHAT_COMPLETION_SETTINGS_READY, data);
      return "__ap_gen_id" in data;
    };

    const before = ready({ __ap_gen_id: "a" });
    emit("js_generation_started", "inkwell-1");
    const own = ready({ __ap_gen_id: "b" });
    const next = ready({ __ap_gen_id: "c" });
    emit("js_generation_started", "other");
    const other = ready({ __ap_gen_id: "d" });
    restore();
    emit("js_generation_started", "inkwell-1");
    const after = ready({ __ap_gen_id: "e" });

    expect([before, own, next, other, after]).toEqual([true, false, true, true, true]);
  });

  it("lowers the reasoning effort of its own request only, keeping the marker", () => {
    const { host, emit } = create_host();
    const restore = host.adjust_request("inkwell-1", { native: false, reasoning_effort: "min" });
    const own: Record<string, unknown> = { __ap_gen_id: "b", reasoning_effort: "low" };
    const next: Record<string, unknown> = { reasoning_effort: "low" };

    emit("js_generation_started", "inkwell-1");
    emit(EVENT_TYPES.CHAT_COMPLETION_SETTINGS_READY, own);
    emit(EVENT_TYPES.CHAT_COMPLETION_SETTINGS_READY, next);
    restore();

    expect(own).toEqual({ __ap_gen_id: "b", reasoning_effort: "min" });
    expect(next).toEqual({ reasoning_effort: "low" });
  });
});

describe("SillyTavernHost world info recursion", () => {
  it("stops entries of the named books from activating others at each scan", () => {
    const { host, emit } = create_host();
    const stop = host.prevent_world_info_recursion(() => new Set(["开篇"]));
    const own = { world: "开篇", preventRecursion: false };
    const other = { world: "设定集", preventRecursion: false };

    emit("worldinfo_entries_loaded", { chatLore: [own], globalLore: [other] });
    stop();
    const later = { world: "开篇", preventRecursion: false };
    emit("worldinfo_entries_loaded", { chatLore: [later] });

    expect([own.preventRecursion, other.preventRecursion, later.preventRecursion]).toEqual([
      true,
      false,
      false,
    ]);
  });
});

describe("SillyTavernHost condensed world info", () => {
  it("sends the stored condensed text of active entries whose original is unchanged", () => {
    const { host, context, emit } = create_host();
    (context as { substituteParams?: (text: string) => string }).substituteParams = (text) =>
      text.replace("{{char}}", "Seraphina");
    const lookup = vi.fn((_book: string, uid: number, hash: string) =>
      uid === 1 && hash === content_hash("long original") ? "{{char}} guards it" : null,
    );
    const stop = host.inject_world_info_slims(lookup);
    const kept = { world: "Eldoria", uid: 2, content: "kept" };
    const condensed = { world: "Eldoria", uid: 1, content: "long original, substituted" };

    emit("worldinfo_entries_loaded", {
      globalLore: [
        { world: "Eldoria", uid: 1, content: "long original" },
        { world: "Eldoria", uid: 2, content: "kept" },
      ],
    });
    emit("worldinfo_scan_done", {
      isFinal: false,
      activated: { entries: new Map([["1", condensed]]) },
    });
    expect(condensed.content).toBe("long original, substituted");
    emit("worldinfo_scan_done", {
      isFinal: true,
      activated: {
        entries: new Map([
          ["1", condensed],
          ["2", kept],
        ]),
      },
    });
    stop();

    expect(condensed.content).toBe("Seraphina guards it");
    expect(kept.content).toBe("kept");
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

describe("SillyTavernHost DeepL translation", () => {
  it("posts the text, target and endpoint to SillyTavern's DeepL route", async () => {
    const fetch_ = vi.fn<typeof fetch>(() => Promise.resolve(new Response("1girl, smile")));
    const { host } = create_host([], fetch_);

    await expect(host.translate_deepl("微笑的女孩", "EN-US", "pro")).resolves.toBe("1girl, smile");
    expect(fetch_).toHaveBeenCalledWith("/api/translate/deepl", {
      method: "POST",
      headers: {},
      body: JSON.stringify({ text: "微笑的女孩", lang: "EN-US", endpoint: "pro" }),
    });
  });

  it("explains a missing key, which SillyTavern reports as status 400", async () => {
    const fetch_ = vi.fn<typeof fetch>(() => Promise.resolve(new Response(null, { status: 400 })));
    const { host } = create_host([], fetch_);

    await expect(host.translate_deepl("文本", "EN-US", "free")).rejects.toThrow("No DeepL key");
  });
});
