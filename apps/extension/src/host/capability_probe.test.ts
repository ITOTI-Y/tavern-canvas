import { describe, expect, it, vi } from "vitest";

import {
  probe_host_capabilities,
  type HostProbeGlobals,
} from "./capability_probe.js";

function create_helper(version = "4.9.1") {
  return {
    getTavernHelperVersion: vi.fn(() => version),
    generateRaw: vi.fn(),
    getChatMessages: vi.fn(),
    setChatMessages: vi.fn(),
  };
}

function create_context() {
  return {
    eventSource: {
      on: vi.fn(),
      removeListener: vi.fn(),
    },
    eventTypes: {
      GENERATION_STARTED: "generation_started",
      GENERATION_STOPPED: "generation_stopped",
      GENERATION_ENDED: "generation_ended",
    },
    registerFunctionTool: vi.fn(),
    unregisterFunctionTool: vi.fn(),
    getRequestHeaders: vi.fn(() => ({ "Content-Type": "application/json" })),
  };
}

function create_globals(): HostProbeGlobals {
  return {
    TavernHelper: create_helper(),
    SillyTavern: { getContext: () => create_context() },
    __TAURITAVERN__: undefined,
    fetch: vi.fn(),
  };
}

const core_capability_ids = [
  "native_tool_manager",
  "main_generation_events",
  "private_prompt_generation",
  "message_swipe_metadata",
  "host_image_upload",
  "tavern_helper",
];

describe("probe_host_capabilities", () => {
  it("blocks activation when TavernHelper is missing", () => {
    const globals = create_globals();
    globals.TavernHelper = undefined;

    expect(probe_host_capabilities(globals)).toEqual({
      ready: false,
      error_code: "tavern_helper_missing",
      missing_capabilities: [
        "private_prompt_generation",
        "message_swipe_metadata",
        "tavern_helper",
      ],
    });
  });

  it("blocks helper version 4.9.0", () => {
    const globals = create_globals();
    globals.TavernHelper = create_helper("4.9.0");

    expect(probe_host_capabilities(globals)).toEqual({
      ready: false,
      error_code: "helper_version_unsupported",
      missing_capabilities: ["tavern_helper"],
    });
  });

  it("accepts the minimum helper version 4.9.1", () => {
    const result = probe_host_capabilities(create_globals());

    expect(result.ready).toBe(true);
    if (result.ready) {
      expect(result.helper_version).toBe("4.9.1");
    }
  });

  it.each(["", "4.9", "4.9.1.0", "latest", "4.9.1beta"])(
    "fails closed for malformed helper version %j",
    (version) => {
      const globals = create_globals();
      globals.TavernHelper = create_helper(version);

      expect(probe_host_capabilities(globals)).toEqual({
        ready: false,
        error_code: "helper_version_invalid",
        missing_capabilities: ["tavern_helper"],
      });
    },
  );

  it("reports every missing required method group by stable capability ID", () => {
    const globals: HostProbeGlobals = {
      TavernHelper: {
        getTavernHelperVersion: () => "4.9.1",
        generateRaw: undefined,
        getChatMessages: undefined,
        setChatMessages: undefined,
      },
      SillyTavern: {
        getContext: () => ({
          eventSource: { on: vi.fn(), removeListener: undefined },
          eventTypes: {
            GENERATION_STARTED: "generation_started",
            GENERATION_STOPPED: "generation_stopped",
            GENERATION_ENDED: "generation_ended",
          },
          registerFunctionTool: vi.fn(),
          unregisterFunctionTool: undefined,
          getRequestHeaders: undefined,
        }),
      },
      __TAURITAVERN__: undefined,
      fetch: undefined,
    };

    expect(probe_host_capabilities(globals)).toEqual({
      ready: false,
      error_code: "helper_api_incomplete",
      missing_capabilities: [
        "native_tool_manager",
        "main_generation_events",
        "private_prompt_generation",
        "message_swipe_metadata",
        "host_image_upload",
      ],
    });
  });

  it("returns a deterministic full nine-capability matrix", () => {
    const result = probe_host_capabilities(create_globals());

    expect(result.ready).toBe(true);
    if (result.ready) {
      expect(Object.keys(result.matrix)).toEqual([
        "native_tool_manager",
        "main_generation_events",
        "private_prompt_generation",
        "message_swipe_metadata",
        "host_image_upload",
        "tavern_helper",
        "tauri_chat_surface",
        "tauri_world_info_activation",
        "gateway_protocol",
      ]);
      expect(
        core_capability_ids.map((id) => result.matrix[id]?.available),
      ).toEqual(Array.from({ length: core_capability_ids.length }, () => true));
      expect(result.matrix.tauri_chat_surface?.available).toBe(false);
      expect(result.matrix.tauri_world_info_activation?.available).toBe(false);
      expect(result.matrix.gateway_protocol).toEqual({
        available: false,
        reason: "Gateway protocol is not connected",
      });
    }
  });

  it("sets optional Tauri capability statuses independently", () => {
    const chat_globals = create_globals();
    chat_globals.__TAURITAVERN__ = {
      api: {
        chatSurface: {
          protocolVersion: 1,
          registerParticipant: vi.fn(),
        },
      },
    };
    const chat_result = probe_host_capabilities(chat_globals);

    expect(chat_result.ready).toBe(true);
    if (chat_result.ready) {
      expect(chat_result.matrix.tauri_chat_surface?.available).toBe(true);
      expect(chat_result.matrix.tauri_world_info_activation?.available).toBe(
        false,
      );
    }

    const world_globals = create_globals();
    world_globals.__TAURITAVERN__ = {
      api: {
        worldInfo: {
          getLastActivation: vi.fn(),
          subscribeActivations: vi.fn(),
        },
      },
    };
    const world_result = probe_host_capabilities(world_globals);

    expect(world_result.ready).toBe(true);
    if (world_result.ready) {
      expect(world_result.matrix.tauri_chat_surface?.available).toBe(false);
      expect(
        world_result.matrix.tauri_world_info_activation?.available,
      ).toBe(true);
    }
  });

  it("does not inspect the user agent or query the DOM", () => {
    const globals = create_globals();
    Object.defineProperties(globals, {
      navigator: {
        get: () => {
          throw new Error("user agent accessed");
        },
      },
      document: {
        get: () => {
          throw new Error("DOM accessed");
        },
      },
    });

    expect(() => probe_host_capabilities(globals)).not.toThrow();
  });
});
