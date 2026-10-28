import { vi } from "vitest";

import type { BootstrapProbeResult } from "../../../apps/extension/src/host/index.js";
import type { SillyTavernChatMessage } from "../../../apps/extension/src/host/sillytavern_host.js";

export const READY_PROBE: BootstrapProbeResult = {
  ready: true,
  helper_version: "4.11.1",
  matrix: {
    main_generation_events: { available: true },
    preset_generation: { available: true },
    message_swipe_metadata: { available: true },
    tavern_regex: { available: true },
    tavern_helper: { available: true },
  },
};

export interface StandardHostOptions {
  /** Stored under `extension_settings.tavern_canvas`; omitted leaves the extension on its defaults. */
  readonly settings?: Readonly<Record<string, unknown>>;
  readonly chat?: SillyTavernChatMessage[];
  readonly fetch?: unknown;
}

export interface StandardHost {
  readonly globals: Record<string, unknown>;
  readonly context: Record<string, unknown>;
  readonly helper: Record<string, ReturnType<typeof vi.fn>>;
  emit(event_name: string, ...arguments_: readonly unknown[]): void;
}

/** A SillyTavern context and JS-Slash-Runner surface that pass the bootstrap probe, with event emission for tests. */
export function create_standard_host(options: StandardHostOptions = {}): StandardHost {
  type Listener = (...arguments_: readonly unknown[]) => void;
  const listeners = new Map<string, Listener[]>();
  const context: Record<string, unknown> = {
    getCurrentLocale: () => "en",
    getCurrentChatId: () => "chat-42",
    getRequestHeaders: () => ({ "Content-Type": "application/json" }),
    chat: options.chat ?? [],
    saveChat: vi.fn(() => Promise.resolve()),
    eventSource: {
      on(event_name: string, listener: Listener) {
        listeners.set(event_name, [...(listeners.get(event_name) ?? []), listener]);
      },
      removeListener(event_name: string, listener: Listener) {
        listeners.set(
          event_name,
          (listeners.get(event_name) ?? []).filter((candidate) => candidate !== listener),
        );
      },
    },
    eventTypes: {
      GENERATION_STARTED: "generation_started",
      GENERATION_STOPPED: "generation_stopped",
      GENERATION_ENDED: "generation_ended",
      CHAT_CHANGED: "chat_id_changed",
      MESSAGE_SWIPED: "message_swiped",
      MESSAGE_UPDATED: "message_updated",
      MESSAGE_EDITED: "message_edited",
      CHARACTER_MESSAGE_RENDERED: "character_message_rendered",
      MORE_MESSAGES_LOADED: "more_messages_loaded",
    },
    extensionSettings:
      options.settings === undefined ? {} : { tavern_canvas: structuredClone(options.settings) },
    saveSettingsDebounced: vi.fn(),
  };
  const helper = {
    getTavernHelperVersion: vi.fn(() => "4.11.1"),
    getChatMessages: vi.fn(() => []),
    setChatMessages: vi.fn(() => Promise.resolve()),
    generate: vi.fn(() => Promise.resolve("")),
    stopGenerationById: vi.fn(() => true),
    getWorldbookNames: vi.fn(() => []),
    getWorldbook: vi.fn(() => Promise.resolve([])),
    getTavernRegexes: vi.fn(() => []),
    replaceTavernRegexes: vi.fn(() => Promise.resolve()),
    retrieveDisplayedMessage: vi.fn(() => ({ get: () => undefined })),
  };
  return {
    globals: {
      TavernHelper: helper,
      SillyTavern: { getContext: () => context },
      fetch: options.fetch ?? vi.fn(),
    },
    context,
    helper,
    emit(event_name, ...arguments_) {
      for (const listener of [...(listeners.get(event_name) ?? [])]) {
        listener(...arguments_);
      }
    },
  };
}
