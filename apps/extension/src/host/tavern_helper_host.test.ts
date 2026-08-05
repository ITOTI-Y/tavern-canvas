import { describe, expect, it, vi } from "vitest";

import {
  inspect_tavern_helper,
  TavernHelperHost,
  type TavernHelperMessageUpdate,
  type TavernHelperSurface,
} from "./tavern_helper_host.js";

const generation_anchor = "a".repeat(64);
const source_anchor = "b".repeat(64);
const request_id = "550e8400-e29b-41d4-a716-446655440000";
const image_id = "01906f4e-5f1c-7a2a-8d73-cc3a51abf1ed";

function create_message() {
  return {
    message_id: 7,
    name: "Assistant",
    role: "assistant" as const,
    is_hidden: false,
    swipe_id: 1,
    swipes: ["first", "second"],
    swipes_data: [
      { score: 1, nested: { rank: 1 } },
      { score: 2, nested: { rank: 2 } },
    ],
    swipes_info: [
      { provider: "alpha", nested: { rank: 1 } },
      { provider: "beta", tavern_canvas: { old: true } },
    ],
  };
}

type PrivateGenerationResult =
  string | { readonly content: string; readonly tool_calls: readonly unknown[] };

function create_helper(generation_result: PrivateGenerationResult = "private response") {
  const messages = [create_message()];
  const get_chat_messages = vi.fn<TavernHelperSurface["getChatMessages"]>(() => messages);
  const set_chat_messages = vi.fn<TavernHelperSurface["setChatMessages"]>(async () => undefined);
  const generate_raw = vi.fn<TavernHelperSurface["generateRaw"]>(async () => generation_result);
  return {
    messages,
    surface: {
      getChatMessages: get_chat_messages,
      setChatMessages: set_chat_messages,
      generateRaw: generate_raw,
    },
  };
}

describe("TavernHelperHost", () => {
  it("returns a normalized deep clone of active chat swipe state", async () => {
    const helper = create_helper();
    const host = new TavernHelperHost(helper.surface, () => "chat-42");

    const snapshot = await host.get_active_chat();

    expect(helper.surface.getChatMessages).toHaveBeenCalledWith("0-{{lastMessageId}}", {
      include_swipes: true,
    });
    expect(snapshot).toEqual({
      chat_id: "chat-42",
      messages: [
        {
          message_id: 7,
          name: "Assistant",
          role: "assistant",
          is_hidden: false,
          active_swipe_id: 1,
          swipes: [
            {
              swipe_id: 0,
              content: "first",
              data: { score: 1, nested: { rank: 1 } },
              metadata: { provider: "alpha", nested: { rank: 1 } },
            },
            {
              swipe_id: 1,
              content: "second",
              data: { score: 2, nested: { rank: 2 } },
              metadata: { provider: "beta", tavern_canvas: { old: true } },
            },
          ],
        },
      ],
    });
    const raw_message = helper.messages[0];
    const raw_data = raw_message?.swipes_data[0]?.nested;
    const raw_metadata = raw_message?.swipes_info[0]?.nested;
    if (raw_message === undefined || raw_data === undefined || raw_metadata === undefined) {
      throw new Error("test fixture is missing nested swipe state");
    }
    raw_data.rank = 98;
    raw_metadata.rank = 99;
    raw_message.swipes.push("third");
    expect(snapshot.messages[0]?.swipes).toHaveLength(2);
    expect(snapshot.messages[0]?.swipes[0]?.data).toEqual({
      score: 1,
      nested: { rank: 1 },
    });
    expect(snapshot.messages[0]?.swipes[0]?.metadata).toEqual({
      provider: "alpha",
      nested: { rank: 1 },
    });

    const snapshot_data = snapshot.messages[0]?.swipes[0]?.data.nested;
    const snapshot_metadata = snapshot.messages[0]?.swipes[0]?.metadata.nested;
    if (
      typeof snapshot_data !== "object" ||
      snapshot_data === null ||
      typeof snapshot_metadata !== "object" ||
      snapshot_metadata === null
    ) {
      throw new Error("snapshot is missing nested swipe state");
    }
    Reflect.set(snapshot_data, "rank", 198);
    Reflect.set(snapshot_metadata, "rank", 199);
    if (Array.isArray(snapshot.messages[0]?.swipes)) {
      snapshot.messages[0].swipes.push({
        swipe_id: 2,
        content: "injected",
        data: {},
        metadata: {},
      });
    }
    expect(raw_message.swipes_data[0]?.nested.rank).toBe(98);
    expect(raw_message.swipes_info[0]?.nested?.rank).toBe(99);
    expect(raw_message.swipes).toEqual(["first", "second", "third"]);
    expect(snapshot.messages[0]).not.toHaveProperty("swipes_info");
  });

  it("uses generateRaw for silent non-streaming private prompts", async () => {
    const helper = create_helper();
    const host = new TavernHelperHost(helper.surface, () => "chat-42");

    await expect(
      host.generate_private_prompt({
        generation_id: "private-1",
        prompts: [
          { role: "system", content: "Return only a caption." },
          { role: "user", content: "Describe the rainy alley." },
        ],
        max_chat_history: 4,
      }),
    ).resolves.toBe("private response");
    expect(helper.surface.generateRaw).toHaveBeenCalledWith({
      generation_id: "private-1",
      ordered_prompts: [
        { role: "system", content: "Return only a caption." },
        { role: "user", content: "Describe the rainy alley." },
      ],
      should_silence: true,
      should_stream: false,
      max_chat_history: 4,
    });
  });

  it("rejects structured tool-call results from private generation", async () => {
    const helper = create_helper({
      content: "",
      tool_calls: [
        {
          id: "call-1",
          type: "function",
          function: { name: "request_image", arguments: "{}" },
        },
      ],
    });
    const host = new TavernHelperHost(helper.surface, () => "chat-42");

    await expect(
      host.generate_private_prompt({
        generation_id: "private-2",
        prompts: [{ role: "user", content: "Describe this." }],
      }),
    ).rejects.toThrowError(/structured tool calls/u);
  });

  it("updates only the selected swipe content and TavernCanvas metadata", async () => {
    const helper = create_helper();
    const host = new TavernHelperHost(helper.surface, () => "chat-42");
    const metadata = {
      schema_version: 1 as const,
      generation_anchor,
      source_anchor,
      request_ids: [request_id],
      image_ids: [image_id],
    };

    await host.update_message({
      message_id: 7,
      swipe_id: 1,
      content: "second with image",
      metadata,
      media: [{ image_id, path: "/image.png" }],
    });

    expect(helper.surface.setChatMessages).toHaveBeenCalledWith(
      [
        {
          message_id: 7,
          swipes: ["first", "second with image"],
          swipes_data: [
            { score: 1, nested: { rank: 1 } },
            {
              score: 2,
              nested: { rank: 2 },
              extra: { media: [{ image_id, path: "/image.png" }] },
            },
          ],
          swipes_info: [
            { provider: "alpha", nested: { rank: 1 } },
            { provider: "beta", tavern_canvas: metadata },
          ],
        },
      ],
      { refresh: "affected" },
    );
    expect(helper.messages[0]).toEqual(create_message());
  });

  it("rejects an update when the target message or swipe no longer exists", async () => {
    const helper = create_helper();
    const host = new TavernHelperHost(helper.surface, () => "chat-42");
    const metadata = {
      schema_version: 1 as const,
      generation_anchor,
      source_anchor,
      request_ids: [],
      image_ids: [],
    };

    await expect(
      host.update_message({
        message_id: 8,
        swipe_id: 0,
        content: "missing message",
        metadata,
        media: [],
      }),
    ).rejects.toThrowError(/message 8/u);
    await expect(
      host.update_message({
        message_id: 7,
        swipe_id: 2,
        content: "missing swipe",
        metadata,
        media: [],
      }),
    ).rejects.toThrowError(/swipe 2/u);
    expect(helper.surface.setChatMessages).not.toHaveBeenCalled();
  });

  const sparse_swipes = Object.assign(Array<string>(2), { 0: "first" });
  const sparse_swipes_data = Object.assign(Array<Record<string, unknown>>(2), { 0: {} });
  const sparse_swipes_info = Object.assign(Array<Record<string, unknown>>(2), { 0: {} });
  const sparse_messages = Array(1);
  class BrandedRecord {
    readonly branded = true;
  }
  const custom_prototype_message = Object.assign(new BrandedRecord(), create_message());
  const custom_prototype_record = Object.assign(new BrandedRecord(), {
    provider: "custom",
  });

  it.each([
    ["a non-array result", null],
    ["a non-record message", [null]],
    ["a custom-prototype message", [custom_prototype_message]],
    ["a negative message ID", [{ ...create_message(), message_id: -1 }]],
    ["a fractional message ID", [{ ...create_message(), message_id: 1.5 }]],
    ["a non-string name", [{ ...create_message(), name: null }]],
    ["an unknown role", [{ ...create_message(), role: "tool" }]],
    ["a non-boolean hidden flag", [{ ...create_message(), is_hidden: 0 }]],
    ["a negative selected swipe", [{ ...create_message(), swipe_id: -1 }]],
    ["an out-of-range selected swipe", [{ ...create_message(), swipe_id: 2 }]],
    ["a non-string swipe", [{ ...create_message(), swipes: ["first", 2] }]],
    ["non-record swipe data", [{ ...create_message(), swipes_data: [{}, []] }]],
    ["non-record swipe metadata", [{ ...create_message(), swipes_info: [{}, null] }]],
    ["misaligned swipe data", [{ ...create_message(), swipes_data: [{}] }]],
    ["misaligned swipe metadata", [{ ...create_message(), swipes_info: [{}, {}, {}] }]],
    ["a sparse message array", sparse_messages],
    ["a sparse active swipe", [{ ...create_message(), swipes: sparse_swipes }]],
    ["sparse swipe data", [{ ...create_message(), swipes_data: sparse_swipes_data }]],
    ["sparse swipe metadata", [{ ...create_message(), swipes_info: sparse_swipes_info }]],
    ["Date swipe data", [{ ...create_message(), swipes_data: [{}, new Date()] }]],
    ["Map swipe data", [{ ...create_message(), swipes_data: [{}, new Map()] }]],
    ["Set swipe metadata", [{ ...create_message(), swipes_info: [{}, new Set()] }]],
    ["Error swipe metadata", [{ ...create_message(), swipes_info: [{}, new Error()] }]],
    [
      "custom-prototype swipe data",
      [{ ...create_message(), swipes_data: [{}, custom_prototype_record] }],
    ],
    [
      "custom-prototype swipe metadata",
      [{ ...create_message(), swipes_info: [{}, custom_prototype_record] }],
    ],

    [
      "uncloneable nested swipe state",
      [
        {
          ...create_message(),
          swipes_data: [{ callback: () => undefined }, {}],
        },
      ],
    ],
  ])("rejects %s from getChatMessages", async (_, raw_messages) => {
    const helper = create_helper();
    helper.surface.getChatMessages.mockReturnValue(raw_messages);
    const host = new TavernHelperHost(helper.surface, () => "chat-42");

    await expect(host.get_active_chat()).rejects.toThrowError(
      /TavernHelper returned invalid chat messages/u,
    );
  });
  it("accepts dense null-prototype swipe records", async () => {
    const helper = create_helper();
    const data: Record<string, unknown> = Object.create(null);
    const metadata: Record<string, unknown> = Object.create(null);
    data.score = 2;
    metadata.provider = "beta";
    helper.surface.getChatMessages.mockReturnValue([
      {
        ...create_message(),
        swipes_data: [{}, data],
        swipes_info: [{}, metadata],
      },
    ]);
    const host = new TavernHelperHost(helper.surface, () => "chat-42");

    await expect(host.get_active_chat()).resolves.toMatchObject({
      messages: [
        {
          active_swipe_id: 1,
          swipes: [
            { data: {}, metadata: {} },
            { data: { score: 2 }, metadata: { provider: "beta" } },
          ],
        },
      ],
    });
  });

  it("validates chat messages before constructing an update payload", async () => {
    const helper = create_helper();
    helper.surface.getChatMessages.mockReturnValue([{ ...create_message(), swipes_info: [{}] }]);
    const host = new TavernHelperHost(helper.surface, () => "chat-42");

    await expect(
      host.update_message({
        message_id: 7,
        swipe_id: 1,
        content: "updated",
        metadata: {
          schema_version: 1,
          generation_anchor,
          source_anchor,
          request_ids: [],
          image_ids: [],
        },
        media: [],
      }),
    ).rejects.toThrowError(/TavernHelper returned invalid chat messages/u);
    expect(helper.surface.setChatMessages).not.toHaveBeenCalled();
  });

  it.each(["", null])("rejects an invalid active chat ID %j", async (chat_id) => {
    const helper = create_helper();
    const host = new TavernHelperHost(helper.surface, () => chat_id as unknown as string);

    await expect(host.get_active_chat()).rejects.toThrowError(
      /TavernHelper returned an invalid active chat ID/u,
    );
  });

  it("isolates message update inputs from host mutation", async () => {
    const helper = create_helper();
    helper.surface.setChatMessages.mockImplementation(
      async (messages: readonly TavernHelperMessageUpdate[]) => {
        const update = messages[0];
        const nested_data = update?.swipes_data[0]?.nested;
        const canvas_metadata = update?.swipes_info[1]?.tavern_canvas;
        if (
          typeof nested_data !== "object" ||
          nested_data === null ||
          typeof canvas_metadata !== "object" ||
          canvas_metadata === null ||
          update === undefined
        ) {
          throw new Error("update fixture is missing nested state");
        }
        Reflect.set(nested_data, "rank", 500);
        Reflect.set(canvas_metadata, "generation_anchor", "mutated");
        if (Array.isArray(update.swipes)) {
          update.swipes.push("host mutation");
        }
      },
    );
    const metadata = {
      schema_version: 1 as const,
      generation_anchor,
      source_anchor,
      request_ids: [request_id],
      image_ids: [image_id],
    };
    const host = new TavernHelperHost(helper.surface, () => "chat-42");

    await host.update_message({
      message_id: 7,
      swipe_id: 1,
      content: "second with image",
      metadata,
      media: [{ image_id, path: "/image.png" }],
    });

    expect(helper.messages[0]).toEqual(create_message());
    expect(metadata.generation_anchor).toBe(generation_anchor);
  });
});

describe("inspect_tavern_helper", () => {
  it("owns helper version calls and method grouping", () => {
    const helper = create_helper();

    expect(
      inspect_tavern_helper({
        ...helper.surface,
        getTavernHelperVersion: () => "4.9.1",
      }),
    ).toEqual({
      detected: true,
      version: { state: "available", value: "4.9.1" },
      private_prompt_generation: true,
      message_swipe_metadata: true,
    });
  });

  it.each([undefined, null, 7, "helper"])("fails closed for malformed helper value %j", (value) => {
    expect(() => inspect_tavern_helper(value)).not.toThrow();
    expect(inspect_tavern_helper(value)).toEqual({
      detected: value !== undefined,
      version: { state: value === undefined ? "missing" : "invalid" },
      private_prompt_generation: false,
      message_swipe_metadata: false,
    });
  });
  it("fails closed for a revoked helper proxy", () => {
    const helper = create_helper();
    const { proxy, revoke } = Proxy.revocable(
      {
        ...helper.surface,
        getTavernHelperVersion: () => "4.9.1",
      },
      {},
    );
    revoke();

    expect(() => inspect_tavern_helper(proxy)).not.toThrow();
    expect(inspect_tavern_helper(proxy)).toEqual({
      detected: true,
      version: { state: "threw" },
      private_prompt_generation: false,
      message_swipe_metadata: false,
    });
  });

  it.each(["getTavernHelperVersion", "generateRaw", "getChatMessages", "setChatMessages"])(
    "fails closed when the %s getter throws",
    (property_name) => {
      const helper = create_helper();
      const surface: Record<string, unknown> = {
        ...helper.surface,
        getTavernHelperVersion: () => "4.9.1",
      };
      Object.defineProperty(surface, property_name, {
        get: () => {
          throw new Error("getter failed");
        },
      });

      expect(() => inspect_tavern_helper(surface)).not.toThrow();
      const result = inspect_tavern_helper(surface);
      if (property_name === "getTavernHelperVersion") {
        expect(result.version).toEqual({ state: "threw" });
      } else if (property_name === "generateRaw") {
        expect(result.private_prompt_generation).toBe(false);
      } else {
        expect(result.message_swipe_metadata).toBe(false);
      }
    },
  );

  it("fails closed when the helper version call throws", () => {
    const helper = create_helper();

    expect(
      inspect_tavern_helper({
        ...helper.surface,
        getTavernHelperVersion: () => {
          throw new Error("call failed");
        },
      }).version,
    ).toEqual({ state: "threw" });
  });

  it("classifies non-string helper versions as invalid", () => {
    const helper = create_helper();

    expect(
      inspect_tavern_helper({
        ...helper.surface,
        getTavernHelperVersion: () => 491,
      }).version,
    ).toEqual({ state: "invalid" });
  });
});
