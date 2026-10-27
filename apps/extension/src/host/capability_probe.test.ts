import { describe, expect, it, vi } from "vitest";

import { probe_host_capabilities } from "./capability_probe.js";

function create_globals(version = "4.11.1"): {
  globals: Record<string, unknown>;
  helper: Record<string, unknown>;
  context: Record<string, unknown>;
} {
  const helper: Record<string, unknown> = {
    getTavernHelperVersion: vi.fn(() => version),
    getChatMessages: vi.fn(),
    setChatMessages: vi.fn(),
    generate: vi.fn(),
    stopGenerationById: vi.fn(),
    getWorldbookNames: vi.fn(() => []),
    getWorldbook: vi.fn(() => Promise.resolve([])),
    getTavernRegexes: vi.fn(),
    replaceTavernRegexes: vi.fn(),
    retrieveDisplayedMessage: vi.fn(),
  };
  const context: Record<string, unknown> = {
    getCurrentLocale: () => "zh-CN",
    getCurrentChatId: () => "chat-42",
    chat: [],
    saveChat: vi.fn(),
    eventSource: { on: vi.fn(), removeListener: vi.fn() },
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
  };
  return {
    globals: { TavernHelper: helper, SillyTavern: { getContext: () => context } },
    helper,
    context,
  };
}

describe("probe_host_capabilities", () => {
  it("reports a ready host with every required capability", () => {
    expect(probe_host_capabilities(create_globals().globals)).toEqual({
      ready: true,
      helper_version: "4.11.1",
      matrix: {
        main_generation_events: { available: true },
        preset_generation: { available: true },
        message_swipe_metadata: { available: true },
        tavern_regex: { available: true },
        tavern_helper: { available: true },
        gateway_protocol: { available: false, reason: "Gateway protocol is not connected" },
      },
    });
  });

  it("blocks activation when TavernHelper is missing", () => {
    const { globals } = create_globals();
    globals.TavernHelper = undefined;

    expect(probe_host_capabilities(globals)).toEqual({
      ready: false,
      error_code: "tavern_helper_missing",
      missing_capabilities: [
        "preset_generation",
        "message_swipe_metadata",
        "tavern_regex",
        "tavern_helper",
      ],
    });
  });

  it("rejects a helper older than the minimum version", () => {
    expect(probe_host_capabilities(create_globals("4.10.0").globals)).toEqual({
      ready: false,
      error_code: "helper_version_unsupported",
      missing_capabilities: ["tavern_helper"],
      current_version: "4.10.0",
    });
  });

  it("rejects an unparseable helper version", () => {
    expect(probe_host_capabilities(create_globals("latest").globals)).toMatchObject({
      ready: false,
      error_code: "helper_version_invalid",
    });
  });

  it("lists each missing API group when the helper is incomplete", () => {
    const { globals, helper, context } = create_globals();
    delete helper.generate;
    delete context.saveChat;

    expect(probe_host_capabilities(globals)).toEqual({
      ready: false,
      error_code: "helper_api_incomplete",
      missing_capabilities: ["preset_generation", "message_swipe_metadata"],
    });
  });
});
