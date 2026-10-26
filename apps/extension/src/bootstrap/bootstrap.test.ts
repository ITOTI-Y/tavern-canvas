import type { RuntimeModule } from "@tavern-canvas/core";
import { afterEach, describe, expect, it, type Mock, vi } from "vitest";

import { bootstrap_tavern_canvas } from "./bootstrap.js";

interface HostFixture {
  readonly globals: Record<string, unknown>;
  readonly subscribe_event: Mock;
}

function create_host_fixture(version = "4.11.1"): HostFixture {
  const subscribe_event = vi.fn();
  const context = {
    getCurrentLocale: vi.fn(() => "en"),
    getCurrentChatId: vi.fn(() => "chat-42"),
    getRequestHeaders: vi.fn(() => ({ "Content-Type": "application/json" })),
    chat: [],
    saveChat: vi.fn(() => Promise.resolve()),
    eventSource: { on: subscribe_event, removeListener: vi.fn() },
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
    globals: {
      TavernHelper: {
        getTavernHelperVersion: vi.fn(() => version),
        getChatMessages: vi.fn(() => []),
        setChatMessages: vi.fn(),
        generate: vi.fn(),
        stopGenerationById: vi.fn(),
        getTavernRegexes: vi.fn(() => []),
        replaceTavernRegexes: vi.fn(),
        retrieveDisplayedMessage: vi.fn(() => ({ get: () => undefined })),
      },
      SillyTavern: {
        getContext: vi.fn(() => context),
      },
      fetch: vi.fn(),
    },
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
    const fixture = create_host_fixture("4.10.0");
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
    expect(fixture.subscribe_event).not.toHaveBeenCalled();
    expect(document.querySelectorAll("#tavern-canvas-root")).toHaveLength(1);
    expect(root?.shadowRoot?.querySelector('[data-startup-state="blocked"]')).not.toBeNull();
    expect(root?.shadowRoot?.textContent).toContain("4.11.1");
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

  it("mounts the studio with real capability resolutions, one per capability", async () => {
    const fixture = create_host_fixture();

    const handle = await bootstrap_tavern_canvas({
      globals: fixture.globals,
      stylesheet: "",
      version: "3.0.0-alpha.1",
      composition: {
        open_storage: () => Promise.reject(new Error("no storage in this environment")),
        create_vocabulary_worker: null,
        estimate_storage: () => Promise.resolve(undefined),
      },
    });

    expect(handle.state).toBe("ready");
    expect(handle.resolutions).toHaveLength(12);
    expect(handle.resolutions.some((entry) => entry.status === "unavailable")).toBe(true);
    expect(handle.resolutions.every((entry) => entry.capability_id.length > 0)).toBe(true);
    expect(
      document
        .querySelector("#tavern-canvas-root")
        ?.shadowRoot?.querySelector("[data-shadow-role='app']"),
    ).not.toBeNull();

    await handle.dispose();
  });

  it("still reports resolutions when the host probe blocks startup", async () => {
    const fixture = create_host_fixture("4.10.0");

    const handle = await bootstrap_tavern_canvas({
      globals: fixture.globals,
      stylesheet: "",
      version: "3.0.0-alpha.1",
      composition: {
        open_storage: () => Promise.reject(new Error("no storage in this environment")),
        create_vocabulary_worker: null,
        estimate_storage: () => Promise.resolve(undefined),
      },
    });

    expect(handle.state).toBe("blocked");
    expect(handle.resolutions).toHaveLength(12);
    await handle.dispose();
  });
});
