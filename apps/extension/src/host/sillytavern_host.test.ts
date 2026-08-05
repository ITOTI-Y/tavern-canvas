import { describe, expect, it, vi } from "vitest";

import { SillyTavernHost } from "./sillytavern_host.js";

class FakeEventSource {
  readonly #listeners = new Map<
    string,
    Set<(...arguments_: readonly unknown[]) => void>
  >();
  remove_count = 0;

  on(
    event_name: string,
    listener: (...arguments_: readonly unknown[]) => void,
  ): void {
    const listeners = this.#listeners.get(event_name) ?? new Set();
    listeners.add(listener);
    this.#listeners.set(event_name, listeners);
  }

  removeListener(
    event_name: string,
    listener: (...arguments_: readonly unknown[]) => void,
  ): void {
    this.remove_count += 1;
    this.#listeners.get(event_name)?.delete(listener);
  }

  emit(event_name: string, ...arguments_: readonly unknown[]): void {
    for (const listener of this.#listeners.get(event_name) ?? []) {
      listener(...arguments_);
    }
  }
}

function create_context(event_source = new FakeEventSource()) {
  return {
    event_source,
    surface: {
      getCurrentLocale: vi.fn(() => "zh-CN"),
      getCurrentChatId: vi.fn(() => "chat-42"),
      getRequestHeaders: vi.fn(() => ({
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": "csrf-token",
      })),
      eventSource: event_source,
      eventTypes: {
        GENERATION_STARTED: "generation_started",
        GENERATION_STOPPED: "generation_stopped",
        GENERATION_ENDED: "generation_ended",
      },
      registerFunctionTool: vi.fn(),
      unregisterFunctionTool: vi.fn(),
    },
  };
}

describe("SillyTavernHost", () => {
  it("reads locale and active chat ID through public context APIs", () => {
    const context = create_context();
    const host = new SillyTavernHost(context.surface, vi.fn());

    expect(host.get_locale()).toBe("zh-CN");
    expect(host.get_active_chat_id()).toBe("chat-42");
  });

  it("normalizes all documented main generation events with symmetric cleanup", () => {
    const context = create_context();
    const host = new SillyTavernHost(context.surface, vi.fn());
    const events: unknown[] = [];
    const dispose = host.subscribe_generation((event) => events.push(event));

    context.event_source.emit("generation_started", "normal", {}, false);
    context.event_source.emit("generation_stopped");
    context.event_source.emit("generation_ended", 9);

    expect(events).toEqual([
      { phase: "started", generation_type: "normal", dry_run: false },
      { phase: "stopped" },
      { phase: "ended", message_id: 9 },
    ]);

    dispose();
    dispose();
    context.event_source.emit("generation_ended", 10);

    expect(events).toHaveLength(3);
    expect(context.event_source.remove_count).toBe(3);
  });

  it("registers and idempotently unregisters an image tool", async () => {
    const context = create_context();
    const host = new SillyTavernHost(context.surface, vi.fn());
    const execute = vi.fn(async () => "queued request-1");
    const dispose = host.register_image_tool({
      name: "request_image",
      display_name: "Request image",
      description: "Queue an image request",
      parameters: {
        type: "object",
        properties: { scene_description: { type: "string" } },
      },
      execute,
    });

    const registered_tool = context.surface.registerFunctionTool.mock.calls[0]?.[0];
    expect(registered_tool).toMatchObject({
      name: "request_image",
      displayName: "Request image",
      description: "Queue an image request",
      stealth: true,
    });
    await expect(
      registered_tool?.action({ scene_description: "Rainy alley" }),
    ).resolves.toBe("queued request-1");
    expect(execute).toHaveBeenCalledWith({ scene_description: "Rainy alley" });

    dispose();
    dispose();
    expect(context.surface.unregisterFunctionTool).toHaveBeenCalledTimes(1);
    expect(context.surface.unregisterFunctionTool).toHaveBeenCalledWith(
      "request_image",
    );
  });

  it("uploads an image through the supported host route", async () => {
    const context = create_context();
    const fetch_ = vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ path: "/user/images/character/image.png" }),
    }));
    const host = new SillyTavernHost(context.surface, fetch_);

    await expect(
      host.upload_image({
        image_base64: "aW1hZ2U=",
        character_name: "Character",
        file_name: "image.v1",
        format: "png",
      }),
    ).resolves.toEqual({ path: "/user/images/character/image.png" });
    expect(fetch_).toHaveBeenCalledWith("/api/images/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": "csrf-token",
      },
      body: JSON.stringify({
        image: "aW1hZ2U=",
        format: "png",
        ch_name: "Character",
        filename: "image_v1",
      }),
    });
  });

  it("rejects an invalid successful upload response", async () => {
    const context = create_context();
    const fetch_ = vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ path: "" }),
    }));
    const host = new SillyTavernHost(context.surface, fetch_);

    await expect(
      host.upload_image({
        image_base64: "aW1hZ2U=",
        character_name: "Character",
        file_name: "image",
        format: "png",
      }),
    ).rejects.toThrowError(/invalid response/u);
  });

  it("surfaces the public error from a non-OK upload response", async () => {
    const context = create_context();
    const fetch_ = vi.fn(async () => ({
      ok: false,
      status: 413,
      json: async () => ({ error: "Image exceeds host limit" }),
    }));
    const host = new SillyTavernHost(context.surface, fetch_);

    await expect(
      host.upload_image({
        image_base64: "aW1hZ2U=",
        character_name: "Character",
        file_name: "image",
        format: "png",
      }),
    ).rejects.toThrowError("Image exceeds host limit");
  });
});
