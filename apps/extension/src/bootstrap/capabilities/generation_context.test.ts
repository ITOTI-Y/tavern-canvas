import { describe, expect, it, vi } from "vitest";

import type { HostAdapter, HostChatSnapshot } from "../../host/index.js";
import { HostGenerationOriginSource, LIBRARY_CHAT_ID } from "./generation_context.js";

const random = { bytes: (length: number) => new Uint8Array(length).fill(7) };

function host_with(chat: HostChatSnapshot | null): HostAdapter {
  return {
    get_active_chat_id: () => chat?.chat_id ?? null,
    get_active_chat: vi.fn(() =>
      chat === null ? Promise.reject(new Error("No chat is open")) : Promise.resolve(chat),
    ),
  } as unknown as HostAdapter;
}

describe("HostGenerationOriginSource", () => {
  it("anchors a generation to the open chat and its last swipe", async () => {
    const origin = await new HostGenerationOriginSource(
      host_with({
        chat_id: "chat-a",
        messages: [
          {
            message_id: 0,
            role: "assistant",
            active_swipe_id: 2,
            swipes: [{ swipe_id: 2, content: "Hello" }],
          },
        ],
      } as unknown as HostChatSnapshot),
      random,
    ).resolve();

    expect(origin.chat_id).toBe("chat-a");
    expect(origin.requested_swipe_id).toBe(2);
  });

  it("resolves a library origin when no chat is open", async () => {
    const host = host_with(null);
    const origin = await new HostGenerationOriginSource(host, random).resolve();

    expect(origin.chat_id).toBe(LIBRARY_CHAT_ID);
    expect(origin.requested_swipe_id).toBe(0);
    expect(origin.generation_anchor).toMatch(/^[0-9a-f]{64}$/u);
    expect(host.get_active_chat).not.toHaveBeenCalled();
  });
});
