import type { RuntimeModule } from "@tavern-canvas/core";
import { afterEach, describe, expect, it, type Mock, vi } from "vitest";

import { bootstrap_tavern_canvas } from "./bootstrap.js";

interface HostFixture {
  readonly globals: Record<string, unknown>;
  readonly register_tool: Mock;
  readonly subscribe_event: Mock;
}

function create_host_fixture(version = "4.9.1"): HostFixture {
  const register_tool = vi.fn();
  const subscribe_event = vi.fn();
  const event_source = {
    on: subscribe_event,
    removeListener: vi.fn(),
  };
  const context = {
    getCurrentLocale: vi.fn(() => "en"),
    getCurrentChatId: vi.fn(() => "chat-42"),
    getRequestHeaders: vi.fn(() => ({ "Content-Type": "application/json" })),
    eventSource: event_source,
    eventTypes: {
      GENERATION_STARTED: "generation_started",
      GENERATION_STOPPED: "generation_stopped",
      GENERATION_ENDED: "generation_ended",
    },
    registerFunctionTool: register_tool,
    unregisterFunctionTool: vi.fn(),
  };

  return {
    globals: {
      TavernHelper: {
        getTavernHelperVersion: vi.fn(() => version),
        generateRaw: vi.fn(),
        getChatMessages: vi.fn(),
        setChatMessages: vi.fn(),
      },
      SillyTavern: {
        getContext: vi.fn(() => context),
      },
      __TAURITAVERN__: undefined,
      fetch: vi.fn(),
    },
    register_tool,
    subscribe_event,
  };
}

function create_module(
  module_id: string,
  requires: readonly string[],
  sequence: string[],
  start_error?: Error,
): RuntimeModule {
  return {
    module_id,
    requires,
    async start() {
      sequence.push(`start:${module_id}`);
      if (start_error !== undefined) {
        throw start_error;
      }
    },
    async stop() {
      sequence.push(`stop:${module_id}`);
    },
  };
}

afterEach(() => {
  document.querySelector("#tavern-canvas-root")?.remove();
  vi.restoreAllMocks();
});

describe("bootstrap_tavern_canvas", () => {
  it("blocks every runtime module before an unsupported helper can register host effects", async () => {
    const fixture = create_host_fixture("4.9.0");
    const sequence: string[] = [];

    const handle = await bootstrap_tavern_canvas({
      globals: fixture.globals,
      modules: [create_module("host", [], sequence)],
      stylesheet: ":host { color: rgb(1 2 3); }",
      version: "3.0.0-alpha.1",
    });

    const root = document.querySelector("#tavern-canvas-root");
    expect(handle.state).toBe("blocked");
    expect(sequence).toEqual([]);
    expect(fixture.register_tool).not.toHaveBeenCalled();
    expect(fixture.subscribe_event).not.toHaveBeenCalled();
    expect(document.querySelectorAll("#tavern-canvas-root")).toHaveLength(1);
    expect(root?.shadowRoot?.querySelector('[data-startup-state="blocked"]')).not.toBeNull();
    expect(root?.shadowRoot?.textContent).toContain("4.9.1");
    expect(root?.shadowRoot?.querySelectorAll("a")).toHaveLength(1);

    await handle.dispose();
  });

  it("rolls back started modules in reverse order when startup fails", async () => {
    const fixture = create_host_fixture();
    const sequence: string[] = [];
    const modules = [
      create_module("host", [], sequence),
      create_module("generation", ["host"], sequence),
      create_module("ui", ["generation"], sequence, new Error("startup failed")),
    ];

    const handle = await bootstrap_tavern_canvas({
      globals: fixture.globals,
      modules,
      stylesheet: "",
      version: "3.0.0-alpha.1",
    });

    expect(handle.state).toBe("failed");
    expect(sequence).toEqual([
      "start:host",
      "start:generation",
      "start:ui",
      "stop:generation",
      "stop:host",
    ]);
    expect(
      document
        .querySelector("#tavern-canvas-root")
        ?.shadowRoot?.querySelector('[data-startup-state="failed"]'),
    ).not.toBeNull();

    await handle.dispose();
  });

  it("disposes the Vue surface, owned resources, host element, and runtime once", async () => {
    const fixture = create_host_fixture();
    const sequence: string[] = [];
    const unsubscribe = vi.fn();
    const revoke_object_url = vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => undefined);

    const handle = await bootstrap_tavern_canvas({
      globals: fixture.globals,
      modules: [create_module("host", [], sequence)],
      stylesheet: ":host { color: rgb(1 2 3); }",
      version: "3.0.0-alpha.1",
      owned_resources: {
        subscriptions: [unsubscribe],
        object_urls: ["blob:tavern-canvas/owned"],
      },
    });

    const shadow_root = document.querySelector("#tavern-canvas-root")?.shadowRoot;
    expect(handle.state).toBe("ready");
    expect(shadow_root?.querySelector('[data-shadow-role="app"]')).not.toBeNull();
    expect(shadow_root?.querySelector('[data-shadow-role="portal"]')).not.toBeNull();
    expect(shadow_root?.querySelector("style")?.textContent).toContain("rgb(1 2 3)");

    await handle.dispose();
    await handle.dispose();

    expect(unsubscribe).toHaveBeenCalledTimes(1);
    expect(revoke_object_url).toHaveBeenCalledOnce();
    expect(revoke_object_url).toHaveBeenCalledWith("blob:tavern-canvas/owned");
    expect(sequence).toEqual(["start:host", "stop:host"]);
    expect(document.querySelector("#tavern-canvas-root")).toBeNull();
  });
});
