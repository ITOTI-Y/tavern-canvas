import { describe, expect, it, vi } from "vitest";

import * as public_host from "./index.js";
import { probe_host_capabilities } from "./capability_probe.js";
import type { BootstrapProbeResult } from "./index.js";

// @ts-expect-error Raw global envelopes are module-private.
type ForbiddenGlobals = import("./index.js").HostProbeGlobals;
// @ts-expect-error Raw helper surfaces are module-private.
type ForbiddenHelper = import("./index.js").ProbeTavernHelperSurface;
// @ts-expect-error Raw context surfaces are module-private.
type ForbiddenContext = import("./index.js").ProbeSillyTavernContext;
// @ts-expect-error Raw SillyTavern globals are module-private.
type ForbiddenSillyTavern = import("./index.js").ProbeSillyTavernGlobal;
// @ts-expect-error Raw event sources are module-private.
type ForbiddenEventSource = import("./index.js").ProbeEventSourceSurface;
// @ts-expect-error Raw event types are module-private.
type ForbiddenEventTypes = import("./index.js").ProbeEventTypesSurface;
// @ts-expect-error Raw Tauri globals are module-private.
type ForbiddenTauri = import("./index.js").ProbeTauriTavernHost;

function assert_forbidden_export_types(
  _globals: ForbiddenGlobals,
  _helper: ForbiddenHelper,
  _context: ForbiddenContext,
  _sillytavern: ForbiddenSillyTavern,
  _event_source: ForbiddenEventSource,
  _event_types: ForbiddenEventTypes,
  _tauri: ForbiddenTauri,
): void {}

interface ProbeFixture {
  readonly globals: Record<string, unknown>;
  readonly helper: Record<string, unknown>;
  readonly sillytavern: Record<string, unknown>;
  readonly context: Record<string, unknown>;
  readonly event_source: Record<string, unknown>;
  readonly event_types: Record<string, unknown>;
}

function create_fixture(version = "4.9.1"): ProbeFixture {
  const helper: Record<string, unknown> = {
    getTavernHelperVersion: vi.fn(() => version),
    generateRaw: vi.fn(),
    getChatMessages: vi.fn(),
    setChatMessages: vi.fn(),
  };
  const event_source: Record<string, unknown> = {
    on: vi.fn(),
    removeListener: vi.fn(),
  };
  const event_types: Record<string, unknown> = {
    GENERATION_STARTED: "generation_started",
    GENERATION_STOPPED: "generation_stopped",
    GENERATION_ENDED: "generation_ended",
  };
  const context: Record<string, unknown> = {
    getCurrentLocale: vi.fn(() => "zh-CN"),
    getCurrentChatId: vi.fn(() => "chat-42"),
    getRequestHeaders: vi.fn(() => ({
      "Content-Type": "application/json",
    })),
    eventSource: event_source,
    eventTypes: event_types,
    registerFunctionTool: vi.fn(),
    unregisterFunctionTool: vi.fn(),
  };
  const sillytavern: Record<string, unknown> = {
    getContext: vi.fn(() => context),
  };
  return {
    globals: {
      TavernHelper: helper,
      SillyTavern: sillytavern,
      __TAURITAVERN__: undefined,
      fetch: vi.fn(),
    },
    helper,
    sillytavern,
    context,
    event_source,
    event_types,
  };
}

const standard_matrix = {
  native_tool_manager: { available: true },
  main_generation_events: { available: true },
  private_prompt_generation: { available: true },
  message_swipe_metadata: { available: true },
  host_image_upload: { available: true },
  tavern_helper: { available: true },
  tauri_chat_surface: {
    available: false,
    reason: "TauriTavern ChatSurface API is unavailable",
  },
  tauri_world_info_activation: {
    available: false,
    reason: "TauriTavern WorldInfo activation API is unavailable",
  },
  gateway_protocol: {
    available: false,
    reason: "Gateway protocol is not connected",
  },
};

describe("probe_host_capabilities", () => {
  it("blocks activation when TavernHelper is missing", () => {
    const fixture = create_fixture();
    fixture.globals.TavernHelper = undefined;

    expect(probe_host_capabilities(fixture.globals)).toEqual({
      ready: false,
      error_code: "tavern_helper_missing",
      missing_capabilities: [
        "private_prompt_generation",
        "message_swipe_metadata",
        "tavern_helper",
      ],
    });
  });

  it("preserves helper version error codes", () => {
    expect(probe_host_capabilities(create_fixture("4.9.0").globals)).toEqual({
      ready: false,
      error_code: "helper_version_unsupported",
      missing_capabilities: ["tavern_helper"],
    });
    for (const version of ["", "4.9", "4.9.1.0", "latest", "4.9.1beta"]) {
      expect(probe_host_capabilities(create_fixture(version).globals)).toEqual({
        ready: false,
        error_code: "helper_version_invalid",
        missing_capabilities: ["tavern_helper"],
      });
    }
  });

  it.each(["4.9.1", "4.9.2", "5.0.0", "10.1.3"])(
    "accepts supported helper version %s",
    (version) => {
      const result = probe_host_capabilities(create_fixture(version).globals);
      const typed_result: BootstrapProbeResult = result;

      expect(typed_result.ready).toBe(true);
      if (typed_result.ready) {
        expect(typed_result.helper_version).toBe(version);
      }
    },
  );

  it.each([
    ["TavernHelper.getTavernHelperVersion", "helper", "getTavernHelperVersion", ["tavern_helper"]],
    ["TavernHelper.generateRaw", "helper", "generateRaw", ["private_prompt_generation"]],
    ["TavernHelper.getChatMessages", "helper", "getChatMessages", ["message_swipe_metadata"]],
    ["TavernHelper.setChatMessages", "helper", "setChatMessages", ["message_swipe_metadata"]],
    [
      "SillyTavern.getContext",
      "sillytavern",
      "getContext",
      [
        "native_tool_manager",
        "main_generation_events",
        "message_swipe_metadata",
        "host_image_upload",
      ],
    ],
    ["context.getCurrentLocale", "context", "getCurrentLocale", ["native_tool_manager"]],
    ["context.getCurrentChatId", "context", "getCurrentChatId", ["message_swipe_metadata"]],
    ["context.getRequestHeaders", "context", "getRequestHeaders", ["host_image_upload"]],
    ["context.registerFunctionTool", "context", "registerFunctionTool", ["native_tool_manager"]],
    [
      "context.unregisterFunctionTool",
      "context",
      "unregisterFunctionTool",
      ["native_tool_manager"],
    ],
    ["eventSource.on", "event_source", "on", ["main_generation_events"]],
    ["eventSource.removeListener", "event_source", "removeListener", ["main_generation_events"]],
    [
      "eventTypes.GENERATION_STARTED",
      "event_types",
      "GENERATION_STARTED",
      ["main_generation_events"],
    ],
    [
      "eventTypes.GENERATION_STOPPED",
      "event_types",
      "GENERATION_STOPPED",
      ["main_generation_events"],
    ],
    ["eventTypes.GENERATION_ENDED", "event_types", "GENERATION_ENDED", ["main_generation_events"]],
  ] as const)(
    "reports the exact capability when %s is missing",
    (_, target_name, property_name, missing_capabilities) => {
      const fixture = create_fixture();
      Reflect.deleteProperty(fixture[target_name], property_name);

      const result = probe_host_capabilities(fixture.globals);

      expect(result).toEqual({
        ready: false,
        error_code: "helper_api_incomplete",
        missing_capabilities,
      });
    },
  );

  it("requires callable fetch for image upload", () => {
    const fixture = create_fixture();
    fixture.globals.fetch = undefined;

    expect(probe_host_capabilities(fixture.globals)).toEqual({
      ready: false,
      error_code: "helper_api_incomplete",
      missing_capabilities: ["host_image_upload"],
    });
  });

  it("returns the exact deterministic standard-host matrix", () => {
    const result = probe_host_capabilities(create_fixture().globals);

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
      expect(result.matrix).toEqual(standard_matrix);
    }
  });

  it("reports exact independent Tauri matrices only for ABI 1", () => {
    const chat_fixture = create_fixture();
    chat_fixture.globals.__TAURITAVERN__ = {
      abiVersion: 1,
      api: {
        chatSurface: {
          protocolVersion: 1,
          isManagedOwnershipRequired: vi.fn(),
          registerParticipant: vi.fn(),
        },
      },
    };
    const chat_result = probe_host_capabilities(chat_fixture.globals);
    expect(chat_result.ready).toBe(true);
    if (chat_result.ready) {
      expect(chat_result.matrix).toEqual({
        ...standard_matrix,
        tauri_chat_surface: { available: true },
      });
    }

    const world_fixture = create_fixture();
    world_fixture.globals.__TAURITAVERN__ = {
      abiVersion: 1,
      api: {
        worldInfo: {
          getLastActivation: vi.fn(),
          subscribeActivations: vi.fn(),
        },
      },
    };
    const world_result = probe_host_capabilities(world_fixture.globals);
    expect(world_result.ready).toBe(true);
    if (world_result.ready) {
      expect(world_result.matrix).toEqual({
        ...standard_matrix,
        tauri_world_info_activation: { available: true },
      });
    }

    for (const abiVersion of [undefined, 2]) {
      const incompatible_fixture = create_fixture();
      incompatible_fixture.globals.__TAURITAVERN__ = {
        abiVersion,
        api: {
          chatSurface: {
            protocolVersion: 1,
            isManagedOwnershipRequired: vi.fn(),
            registerParticipant: vi.fn(),
          },
          worldInfo: {
            getLastActivation: vi.fn(),
            subscribeActivations: vi.fn(),
          },
        },
      };
      const incompatible_result = probe_host_capabilities(incompatible_fixture.globals);
      expect(incompatible_result.ready).toBe(true);
      if (incompatible_result.ready) {
        expect(incompatible_result.matrix).toEqual(standard_matrix);
      }
    }
  });

  it.each([undefined, null, 7, "globals"])(
    "always returns its discriminated union for raw input %j",
    (value) => {
      expect(() => probe_host_capabilities(value)).not.toThrow();
      expect(probe_host_capabilities(value)).toEqual({
        ready: false,
        error_code: "tavern_helper_missing",
        missing_capabilities: [
          "native_tool_manager",
          "main_generation_events",
          "private_prompt_generation",
          "message_swipe_metadata",
          "host_image_upload",
          "tavern_helper",
        ],
      });
    },
  );
  it.each([
    [
      "object",
      (() => {
        const { proxy, revoke } = Proxy.revocable({}, {});
        revoke();
        return proxy;
      })(),
    ],
    [
      "function",
      (() => {
        const { proxy, revoke } = Proxy.revocable(() => undefined, {});
        revoke();
        return proxy;
      })(),
    ],
  ])("fails closed for a revoked root %s proxy", (_, value) => {
    expect(() => probe_host_capabilities(value)).not.toThrow();
    expect(probe_host_capabilities(value)).toEqual({
      ready: false,
      error_code: "tavern_helper_missing",
      missing_capabilities: [
        "native_tool_manager",
        "main_generation_events",
        "private_prompt_generation",
        "message_swipe_metadata",
        "host_image_upload",
        "tavern_helper",
      ],
    });
  });

  it("reads a function root without requiring a plain record", () => {
    const fixture = create_fixture();
    const function_globals = Object.assign(() => undefined, fixture.globals);

    const result = probe_host_capabilities(function_globals);

    expect(result.ready).toBe(true);
    if (result.ready) {
      expect(result.matrix).toEqual(standard_matrix);
    }
  });

  it("does not classify the root through its prototype", () => {
    const fixture = create_fixture();
    const hostile_globals = new Proxy(fixture.globals, {
      getPrototypeOf: () => {
        throw new Error("prototype failed");
      },
    });

    expect(probe_host_capabilities(hostile_globals).ready).toBe(true);
  });

  it("preserves missing-helper precedence for a hostile root getter", () => {
    const hostile_globals = new Proxy(
      {},
      {
        get: () => {
          throw new Error("getter failed");
        },
      },
    );

    expect(probe_host_capabilities(hostile_globals)).toEqual({
      ready: false,
      error_code: "tavern_helper_missing",
      missing_capabilities: [
        "native_tool_manager",
        "main_generation_events",
        "private_prompt_generation",
        "message_swipe_metadata",
        "host_image_upload",
        "tavern_helper",
      ],
    });
  });

  it("fails closed for getter and call exceptions without changing error ordering", () => {
    const fixture = create_fixture();
    fixture.globals.TavernHelper = undefined;
    Object.defineProperty(fixture.globals, "SillyTavern", {
      get: () => {
        throw new Error("SillyTavern getter failed");
      },
    });

    expect(() => probe_host_capabilities(fixture.globals)).not.toThrow();
    expect(probe_host_capabilities(fixture.globals)).toMatchObject({
      ready: false,
      error_code: "tavern_helper_missing",
    });
  });

  it.each([
    ["helper version getter", "helper", "getTavernHelperVersion", false],
    ["SillyTavern getContext getter", "sillytavern", "getContext", false],
    ["optional Tauri api getter", "tauri", "api", true],
  ] as const)(
    "does not throw for a throwing %s",
    (_, target_name, property_name, expected_ready) => {
      const fixture = create_fixture();
      const tauri: Record<string, unknown> = { abiVersion: 1, api: {} };
      const target = target_name === "tauri" ? tauri : fixture[target_name];
      if (target_name === "tauri") {
        fixture.globals.__TAURITAVERN__ = tauri;
      }
      Object.defineProperty(target, property_name, {
        get: () => {
          throw new Error("getter failed");
        },
      });

      expect(() => probe_host_capabilities(fixture.globals)).not.toThrow();
      expect(probe_host_capabilities(fixture.globals).ready).toBe(expected_ready);
    },
  );

  it.each([
    ["helper version", "helper", "getTavernHelperVersion"],
    ["SillyTavern getContext", "sillytavern", "getContext"],
    ["locale", "context", "getCurrentLocale"],
    ["chat ID", "context", "getCurrentChatId"],
    ["request headers", "context", "getRequestHeaders"],
  ] as const)("does not throw when the %s call throws", (_, target_name, method_name) => {
    const fixture = create_fixture();
    fixture[target_name][method_name] = () => {
      throw new Error("call failed");
    };

    expect(() => probe_host_capabilities(fixture.globals)).not.toThrow();
    expect(probe_host_capabilities(fixture.globals).ready).toBe(false);
  });

  it("does not inspect user agent, DOM, or private Tauri globals", () => {
    const fixture = create_fixture();
    Object.defineProperties(fixture.globals, {
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
      __TAURI__: {
        get: () => {
          throw new Error("private Tauri global accessed");
        },
      },
    });

    expect(() => probe_host_capabilities(fixture.globals)).not.toThrow();
    expect(probe_host_capabilities(fixture.globals).ready).toBe(true);
  });

  it("keeps raw inspectors and raw probe types off the public surface", () => {
    expect(public_host).not.toHaveProperty("inspect_tavern_helper");
    expect(public_host).not.toHaveProperty("inspect_sillytavern");
    expect(public_host).not.toHaveProperty("inspect_tauritavern");
    expect(assert_forbidden_export_types).toBeTypeOf("function");
  });
});
