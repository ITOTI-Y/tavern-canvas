import { describe, expect, it, vi } from "vitest";

import {
  inspect_sillytavern,
  SillyTavernHost,
  type SillyTavernContextSurface,
} from "./sillytavern_host.js";

class FakeEventSource {
  readonly #listeners = new Map<string, Set<(...arguments_: readonly unknown[]) => void>>();
  remove_count = 0;
  throw_on_registration: number | undefined;
  throw_on_removal: string | undefined;
  on_count = 0;
  removed_events: string[] = [];

  on(event_name: string, listener: (...arguments_: readonly unknown[]) => void): void {
    const listeners = this.#listeners.get(event_name) ?? new Set();
    this.on_count += 1;
    if (this.on_count === this.throw_on_registration) {
      throw new Error(`registration ${this.on_count} failed`);
    }
    listeners.add(listener);
    this.#listeners.set(event_name, listeners);
  }

  removeListener(event_name: string, listener: (...arguments_: readonly unknown[]) => void): void {
    this.remove_count += 1;
    this.removed_events.push(event_name);
    if (event_name === this.throw_on_removal) {
      throw new Error(`removal ${event_name} failed`);
    }
    this.#listeners.get(event_name)?.delete(listener);
  }

  emit(event_name: string, ...arguments_: readonly unknown[]): void {
    for (const listener of this.#listeners.get(event_name) ?? []) {
      listener(...arguments_);
    }
  }
}

function create_context(event_source = new FakeEventSource()) {
  const get_current_locale = vi.fn<SillyTavernContextSurface["getCurrentLocale"]>(() => "zh-CN");
  const get_current_chat_id = vi.fn<SillyTavernContextSurface["getCurrentChatId"]>(() => "chat-42");
  const get_request_headers = vi.fn<SillyTavernContextSurface["getRequestHeaders"]>(() => ({
    "Content-Type": "application/json",
    "X-CSRF-TOKEN": "csrf-token",
  }));
  const register_function_tool = vi.fn<SillyTavernContextSurface["registerFunctionTool"]>();
  const unregister_function_tool = vi.fn<SillyTavernContextSurface["unregisterFunctionTool"]>();
  return {
    event_source,
    surface: {
      getCurrentLocale: get_current_locale,
      getCurrentChatId: get_current_chat_id,
      getRequestHeaders: get_request_headers,
      eventSource: event_source,
      eventTypes: {
        GENERATION_STARTED: "generation_started",
        GENERATION_STOPPED: "generation_stopped",
        GENERATION_ENDED: "generation_ended",
        STREAM_TOKEN_RECEIVED: "stream_token_received",
        CHAT_CHANGED: "chat_changed",
        MESSAGE_SWIPED: "message_swiped",
      },
      registerFunctionTool: register_function_tool,
      unregisterFunctionTool: unregister_function_tool,
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

  it("normalizes cumulative streaming snapshots into deduplicated chunks", () => {
    const context = create_context();
    const host = new SillyTavernHost(context.surface, vi.fn());
    const chunks: string[] = [];
    const dispose = host.subscribe_generation_chunk((chunk) => chunks.push(chunk));

    context.event_source.emit("stream_token_received", "first");
    context.event_source.emit("stream_token_received", "first second");
    context.event_source.emit("stream_token_received", "first second");
    context.event_source.emit("stream_token_received", 2);
    dispose();
    dispose();
    context.event_source.emit("stream_token_received", "ignored");

    expect(chunks).toEqual(["first", " second"]);
    expect(context.event_source.removed_events).toEqual(["stream_token_received"]);
  });

  it("normalizes chat and swipe events with independent cleanup", () => {
    const context = create_context();
    const host = new SillyTavernHost(context.surface, vi.fn());
    const chats: unknown[] = [];
    const swipes: unknown[] = [];
    const dispose_chat = host.subscribe_chat_change((event) => chats.push(event));
    const dispose_swipe = host.subscribe_message_swiped((event) => swipes.push(event));

    context.event_source.emit("chat_changed", "chat-43");
    context.event_source.emit("chat_changed", "");
    context.event_source.emit("message_swiped", 9);
    context.event_source.emit("message_swiped", -1);
    dispose_chat();
    dispose_swipe();

    expect(chats).toEqual([{ chat_id: "chat-43" }]);
    expect(swipes).toEqual([{ message_id: 9 }]);
    expect(context.event_source.removed_events).toEqual(["chat_changed", "message_swiped"]);
  });

  it.each([2, 3])("rolls back listeners when registration %i fails", (registration_number) => {
    const event_source = new FakeEventSource();
    event_source.throw_on_registration = registration_number;
    const context = create_context(event_source);
    const host = new SillyTavernHost(context.surface, vi.fn());
    const events: unknown[] = [];

    expect(() => host.subscribe_generation((event) => events.push(event))).toThrowError(
      `registration ${registration_number} failed`,
    );
    event_source.emit("generation_started", "normal", {}, false);
    event_source.emit("generation_stopped");
    expect(events).toEqual([]);
    expect(event_source.remove_count).toBe(registration_number - 1);
    expect(event_source.removed_events).toEqual(
      registration_number === 2
        ? ["generation_started"]
        : ["generation_stopped", "generation_started"],
    );
  });

  it("attempts every listener removal when one removal throws", () => {
    const event_source = new FakeEventSource();
    event_source.throw_on_removal = "generation_stopped";
    const context = create_context(event_source);
    const host = new SillyTavernHost(context.surface, vi.fn());
    const dispose = host.subscribe_generation(() => undefined);

    expect(() => dispose()).toThrowError(/removal generation_stopped failed/u);
    expect(event_source.removed_events).toEqual([
      "generation_ended",
      "generation_stopped",
      "generation_started",
    ]);
    expect(() => dispose()).not.toThrow();
  });

  it("registers and idempotently unregisters an image tool", async () => {
    const context = create_context();
    const host = new SillyTavernHost(context.surface, vi.fn());
    const execute = vi.fn(async () => "queued request-1");
    const dispose = host.register_image_tool({
      name: "request_image",
      display_name: "Request image",
      description: "Queue an image request",
      stealth: false,
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
      stealth: false,
    });
    await expect(registered_tool?.action({ scene_description: "Rainy alley" })).resolves.toBe(
      "queued request-1",
    );
    expect(execute).toHaveBeenCalledWith({ scene_description: "Rainy alley" });

    dispose();
    dispose();
    expect(context.surface.unregisterFunctionTool).toHaveBeenCalledTimes(1);
    expect(context.surface.unregisterFunctionTool).toHaveBeenCalledWith("request_image");
  });

  it.each([null, [], "invalid"])("rejects non-record tool arguments %j", async (arguments_) => {
    const context = create_context();
    const execute = vi.fn(async () => "queued");
    const host = new SillyTavernHost(context.surface, vi.fn());
    host.register_image_tool({
      name: "request_image",
      display_name: "Request image",
      description: "Queue an image request",
      stealth: false,
      parameters: { type: "object" },
      execute,
    });
    const registered_tool = context.surface.registerFunctionTool.mock.calls[0]?.[0];
    const action = registered_tool?.action as unknown as
      ((value: unknown) => string | Promise<string>) | undefined;

    await expect(() => action?.(arguments_)).rejects.toThrowError(
      /Image tool arguments must be a record/u,
    );
    expect(execute).not.toHaveBeenCalled();
  });
  it.each([
    ["Date", new Date()],
    ["Map", new Map()],
    ["Set", new Set()],
    ["Error", new Error("host value")],
  ])("rejects branded %s tool arguments before domain invocation", async (_, arguments_) => {
    const context = create_context();
    const execute = vi.fn(async () => "queued");
    const host = new SillyTavernHost(context.surface, vi.fn());
    host.register_image_tool({
      name: "request_image",
      display_name: "Request image",
      description: "Queue an image request",
      stealth: false,
      parameters: { type: "object" },
      execute,
    });
    const registered_tool = context.surface.registerFunctionTool.mock.calls[0]?.[0];

    await expect(registered_tool?.action(arguments_)).rejects.toThrowError(
      /Image tool arguments must be a record/u,
    );
    expect(execute).not.toHaveBeenCalled();
  });

  it.each([
    [
      "a prototype trap",
      new Proxy(
        {},
        {
          getPrototypeOf: () => {
            throw new Error("prototype failed");
          },
        },
      ),
    ],
    [
      "a revoked proxy",
      (() => {
        const { proxy, revoke } = Proxy.revocable({}, {});
        revoke();
        return proxy;
      })(),
    ],
  ])("rejects tool arguments with %s before domain invocation", async (_, arguments_) => {
    const context = create_context();
    const execute = vi.fn(async () => "queued");
    const host = new SillyTavernHost(context.surface, vi.fn());
    host.register_image_tool({
      name: "request_image",
      display_name: "Request image",
      description: "Queue an image request",
      stealth: false,
      parameters: { type: "object" },
      execute,
    });
    const registered_tool = context.surface.registerFunctionTool.mock.calls[0]?.[0];

    await expect(registered_tool?.action(arguments_)).rejects.toThrowError(
      /Image tool arguments must be a record/u,
    );
    expect(execute).not.toHaveBeenCalled();
  });

  it("accepts null-prototype tool argument records", async () => {
    const context = create_context();
    const execute = vi.fn(async () => "queued");
    const host = new SillyTavernHost(context.surface, vi.fn());
    host.register_image_tool({
      name: "request_image",
      display_name: "Request image",
      description: "Queue an image request",
      stealth: false,
      parameters: { type: "object" },
      execute,
    });
    const arguments_: Record<string, unknown> = Object.create(null);
    arguments_.scene_description = "Rainy alley";
    const registered_tool = context.surface.registerFunctionTool.mock.calls[0]?.[0];

    await expect(registered_tool?.action(arguments_)).resolves.toBe("queued");
    expect(execute).toHaveBeenCalledWith({ scene_description: "Rainy alley" });
  });

  it("rejects tool arguments that cannot be cloned", async () => {
    const context = create_context();
    const execute = vi.fn(async () => "queued");
    const host = new SillyTavernHost(context.surface, vi.fn());
    host.register_image_tool({
      name: "request_image",
      display_name: "Request image",
      description: "Queue an image request",
      stealth: false,
      parameters: { type: "object" },
      execute,
    });
    const registered_tool = context.surface.registerFunctionTool.mock.calls[0]?.[0];

    await expect(registered_tool?.action({ callback: () => undefined })).rejects.toThrowError(
      /Image tool arguments could not be cloned/u,
    );
    expect(execute).not.toHaveBeenCalled();
  });

  it("clones tool arguments before invoking domain code", async () => {
    const context = create_context();
    const received: Readonly<Record<string, unknown>>[] = [];
    const execute = vi.fn(async (arguments_: Readonly<Record<string, unknown>>) => {
      received.push(arguments_);
      return "queued";
    });
    const host = new SillyTavernHost(context.surface, vi.fn());
    host.register_image_tool({
      name: "request_image",
      display_name: "Request image",
      description: "Queue an image request",
      stealth: false,
      parameters: { type: "object" },
      execute,
    });
    const registered_tool = context.surface.registerFunctionTool.mock.calls[0]?.[0];
    const raw_arguments = { scene: { description: "Rainy alley" } };

    await registered_tool?.action(raw_arguments);
    raw_arguments.scene.description = "mutated";

    expect(received).toEqual([{ scene: { description: "Rainy alley" } }]);
    const received_scene = received[0]?.scene;
    if (typeof received_scene !== "object" || received_scene === null) {
      throw new Error("received tool arguments are missing scene data");
    }
    Reflect.set(received_scene, "description", "domain mutation");
    expect(raw_arguments.scene.description).toBe("mutated");
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

  it.each(["empty", "invalid JSON"])(
    "preserves HTTP status for a non-OK %s response body",
    async () => {
      const context = create_context();
      const fetch_ = vi.fn(async () => ({
        ok: false,
        status: 502,
        json: async () => {
          throw new SyntaxError("body is not JSON");
        },
      }));
      const host = new SillyTavernHost(context.surface, fetch_);

      await expect(
        host.upload_image({
          image_base64: "aW1hZ2U=",
          character_name: "Character",
          file_name: "image",
          format: "png",
        }),
      ).rejects.toThrowError("Host image upload failed with status 502");
    },
  );

  it("keeps invalid-response behavior for a successful non-JSON body", async () => {
    const context = create_context();
    const fetch_ = vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => {
        throw new SyntaxError("body is not JSON");
      },
    }));
    const host = new SillyTavernHost(context.surface, fetch_);

    await expect(
      host.upload_image({
        image_base64: "aW1hZ2U=",
        character_name: "Character",
        file_name: "image",
        format: "png",
      }),
    ).rejects.toThrowError("Host image upload returned an invalid response");
  });

  it("validates locale, chat ID, and request headers at the boundary", async () => {
    const context = create_context();
    const host = new SillyTavernHost(context.surface, vi.fn());
    context.surface.getCurrentLocale.mockReturnValue("" as string);
    expect(() => host.get_locale()).toThrowError(/invalid locale/u);
    context.surface.getCurrentLocale.mockReturnValue("zh-CN");
    context.surface.getCurrentChatId.mockReturnValue(null as unknown as string);
    expect(() => host.get_active_chat_id()).toThrowError(/invalid active chat ID/u);
    context.surface.getCurrentChatId.mockReturnValue("chat-42");
    context.surface.getRequestHeaders.mockReturnValue({
      "Content-Type": 7,
    } as unknown as Record<string, string>);

    await expect(
      host.upload_image({
        image_base64: "aW1hZ2U=",
        character_name: "Character",
        file_name: "image",
        format: "png",
      }),
    ).rejects.toThrowError(/invalid request headers/u);
  });
  class BrandedRequestHeaders {
    readonly branded = true;
    readonly ["X-CSRF-TOKEN"] = "csrf-token";
  }

  it.each([
    ["Date", new Date()],
    ["Map", new Map()],
    ["Set", new Set()],
    ["Error", new Error("host value")],
    ["custom-prototype object", new BrandedRequestHeaders()],
  ])("rejects branded %s request headers before fetch", async (_, headers) => {
    const context = create_context();
    context.surface.getRequestHeaders.mockReturnValue(headers);
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
        file_name: "image",
        format: "png",
      }),
    ).rejects.toThrowError(/invalid request headers/u);
    expect(fetch_).not.toHaveBeenCalled();
  });

  it("accepts null-prototype string request headers", async () => {
    const context = create_context();
    const headers: Record<string, unknown> = Object.create(null);
    headers["X-CSRF-TOKEN"] = "csrf-token";
    context.surface.getRequestHeaders.mockReturnValue(headers);
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
        file_name: "image",
        format: "png",
      }),
    ).resolves.toEqual({ path: "/user/images/character/image.png" });
    expect(fetch_).toHaveBeenCalledWith(
      "/api/images/upload",
      expect.objectContaining({ headers: { "X-CSRF-TOKEN": "csrf-token" } }),
    );
  });
});

describe("inspect_sillytavern", () => {
  const unavailable = {
    native_tool_manager: false,
    main_generation_events: false,
    message_swipe_metadata: false,
    host_image_upload: false,
  };

  it("owns getContext and validates every unconditional context result", () => {
    const context = create_context();

    expect(inspect_sillytavern({ getContext: () => context.surface }, vi.fn())).toEqual({
      native_tool_manager: true,
      main_generation_events: true,
      message_swipe_metadata: true,
      host_image_upload: true,
    });
  });

  it.each([undefined, null, 7, "SillyTavern", {}])(
    "fails closed for malformed global value %j",
    (value) => {
      expect(() => inspect_sillytavern(value, vi.fn())).not.toThrow();
      expect(inspect_sillytavern(value, vi.fn())).toEqual(unavailable);
    },
  );
  it.each([
    [
      "revoked global",
      (() => {
        const { proxy, revoke } = Proxy.revocable({}, {});
        revoke();
        return proxy;
      })(),
    ],
    [
      "revoked context",
      {
        getContext: () => {
          const { proxy, revoke } = Proxy.revocable({}, {});
          revoke();
          return proxy;
        },
      },
    ],
  ])("fails closed for a %s proxy", (_, sillytavern) => {
    expect(() => inspect_sillytavern(sillytavern, vi.fn())).not.toThrow();
    expect(inspect_sillytavern(sillytavern, vi.fn())).toEqual(unavailable);
  });

  it("does not classify a raw context through its prototype", () => {
    const context = create_context();
    const hostile_context = new Proxy(context.surface, {
      getPrototypeOf: () => {
        throw new Error("prototype failed");
      },
    });

    expect(inspect_sillytavern({ getContext: () => hostile_context }, vi.fn())).toEqual({
      native_tool_manager: true,
      main_generation_events: true,
      message_swipe_metadata: true,
      host_image_upload: true,
    });
  });

  it.each([
    ["throwing getContext getter", Object.create(null)],
    [
      "throwing getContext call",
      {
        getContext: () => {
          throw new Error("context failed");
        },
      },
    ],
    ["null context", { getContext: () => null }],
    ["scalar context", { getContext: () => 7 }],
  ])("fails closed for a %s", (_, sillytavern) => {
    if (Object.getPrototypeOf(sillytavern) === null) {
      Object.defineProperty(sillytavern, "getContext", {
        get: () => {
          throw new Error("getter failed");
        },
      });
    }

    expect(() => inspect_sillytavern(sillytavern, vi.fn())).not.toThrow();
    expect(inspect_sillytavern(sillytavern, vi.fn())).toEqual(unavailable);
  });

  it.each([
    ["getCurrentLocale", "main_generation_events"],
    ["getCurrentChatId", "message_swipe_metadata"],
    ["getRequestHeaders", "host_image_upload"],
  ] as const)(
    "fails only the assigned group when %s returns a malformed value",
    (method_name, capability) => {
      const context = create_context();
      context.surface[method_name].mockReturnValue(null as never);

      const result = inspect_sillytavern({ getContext: () => context.surface }, vi.fn());

      expect(result[capability]).toBe(false);
      for (const [name, available] of Object.entries(result)) {
        if (name !== capability) {
          expect(available).toBe(true);
        }
      }
    },
  );

  it.each(["getCurrentLocale", "getCurrentChatId", "getRequestHeaders"] as const)(
    "fails closed when the %s call throws",
    (method_name) => {
      const context = create_context();
      context.surface[method_name].mockImplementation(() => {
        throw new Error("context method failed");
      });

      expect(() =>
        inspect_sillytavern({ getContext: () => context.surface }, vi.fn()),
      ).not.toThrow();
    },
  );
});
