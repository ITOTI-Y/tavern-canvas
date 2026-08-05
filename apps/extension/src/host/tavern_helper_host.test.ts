import { describe, expect, it, vi } from "vitest";

import { TavernHelperHost } from "./tavern_helper_host.js";

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
    swipes_data: [{ score: 1 }, { score: 2 }],
    swipes_info: [
      { provider: "alpha", nested: { rank: 1 } },
      { provider: "beta", tavern_canvas: { old: true } },
    ],
  };
}

type PrivateGenerationResult =
  | string
  | { readonly content: string; readonly tool_calls: readonly unknown[] };

function create_helper(
  generation_result: PrivateGenerationResult = "private response",
) {
  const messages = [create_message()];
  return {
    messages,
    surface: {
      getChatMessages: vi.fn(() => messages),
      setChatMessages: vi.fn(async () => undefined),
      generateRaw: vi.fn(async () => generation_result),
    },
  };
}

describe("TavernHelperHost", () => {
  it("returns a normalized deep clone of active chat swipe state", async () => {
    const helper = create_helper();
    const host = new TavernHelperHost(helper.surface, () => "chat-42");

    const snapshot = await host.get_active_chat();

    expect(helper.surface.getChatMessages).toHaveBeenCalledWith(
      "0-{{lastMessageId}}",
      { include_swipes: true },
    );
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
              data: { score: 1 },
              metadata: { provider: "alpha", nested: { rank: 1 } },
            },
            {
              swipe_id: 1,
              content: "second",
              data: { score: 2 },
              metadata: { provider: "beta", tavern_canvas: { old: true } },
            },
          ],
        },
      ],
    });
    const nested_metadata = helper.messages[0]?.swipes_info[0]?.nested;
    if (nested_metadata === undefined) {
      throw new Error("test fixture is missing nested metadata");
    }
    nested_metadata.rank = 99;
    expect(snapshot.messages[0]?.swipes[0]?.metadata).toEqual({
      provider: "alpha",
      nested: { rank: 1 },
    });
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
    });

    expect(helper.surface.setChatMessages).toHaveBeenCalledWith(
      [
        {
          message_id: 7,
          swipes: ["first", "second with image"],
          swipes_data: [{ score: 1 }, { score: 2 }],
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
      }),
    ).rejects.toThrowError(/message 8/u);
    await expect(
      host.update_message({
        message_id: 7,
        swipe_id: 2,
        content: "missing swipe",
        metadata,
      }),
    ).rejects.toThrowError(/swipe 2/u);
    expect(helper.surface.setChatMessages).not.toHaveBeenCalled();
  });
});
