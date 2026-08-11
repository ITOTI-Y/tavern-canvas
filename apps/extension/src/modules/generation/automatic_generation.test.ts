import { describe, expect, it, vi } from "vitest";

import { SessionRegistry, type RandomSource } from "@tavern-canvas/core";

import type {
  HostAdapter,
  HostChatSnapshot,
  HostGenerationHandler,
  HostGenerationEvent,
  MessageUpdateRequest,
} from "../../host/index.js";
import { HostFallbackTextSink, HostGenerationSessionPort } from "./automatic_generation.js";

const REQUEST_ID = "11111111-1111-4111-8111-111111111111";
const MARKER = '<!-- tavern-canvas:image {"generation_anchor":"' + "a".repeat(64) + '"} -->';

class IncrementingRandomSource implements RandomSource {
  #seed = 0;

  bytes(length: number): Uint8Array {
    const bytes = new Uint8Array(length);
    bytes.fill(this.#seed);
    this.#seed += 1;
    return bytes;
  }
}

class RecordingHost implements HostAdapter {
  readonly capabilities = {};
  readonly generation_handlers = new Set<HostGenerationHandler>();
  readonly updates: MessageUpdateRequest[] = [];
  readonly chat: HostChatSnapshot = {
    chat_id: "chat-a",
    messages: [
      {
        message_id: 0,
        name: "User",
        role: "user",
        is_hidden: false,
        active_swipe_id: 0,
        swipes: [{ swipe_id: 0, content: "Generate an image", data: {}, metadata: {} }],
      },
      {
        message_id: 1,
        name: "Assistant",
        role: "assistant",
        is_hidden: false,
        active_swipe_id: 0,
        swipes: [{ swipe_id: 0, content: `cleaned ${MARKER}`, data: {}, metadata: {} }],
      },
    ],
  };

  can_use_native_tools(): boolean {
    return false;
  }

  get_locale(): string {
    return "en";
  }

  get_active_chat(): Promise<HostChatSnapshot> {
    return Promise.resolve(this.chat);
  }

  subscribe_generation(handler: HostGenerationHandler): () => void {
    this.generation_handlers.add(handler);
    return () => this.generation_handlers.delete(handler);
  }

  subscribe_generation_chunk(): () => void {
    return () => undefined;
  }

  subscribe_chat_change(): () => void {
    return () => undefined;
  }

  subscribe_message_swiped(): () => void {
    return () => undefined;
  }

  register_image_tool(): () => void {
    return () => undefined;
  }

  set_trigger_injection(): void {}

  generate_private_prompt(): Promise<string> {
    return Promise.resolve("");
  }

  update_message(request: MessageUpdateRequest): Promise<void> {
    this.updates.push(request);
    return Promise.resolve();
  }

  upload_image() {
    return Promise.resolve({ path: "/image.png" });
  }

  emit(event: HostGenerationEvent): void {
    for (const handler of [...this.generation_handlers]) {
      handler(event);
    }
  }
}

describe("HostFallbackTextSink", () => {
  it("keeps the finishing session metadata when the next session is prepared immediately", async () => {
    const host = new RecordingHost();
    const sessions = new SessionRegistry(new IncrementingRandomSource());
    let root_id = 0;
    const session_port = new HostGenerationSessionPort({
      host,
      sessions,
      new_root_id: () => `root-${String(++root_id)}`,
      is_auto_generation_enabled: () => true,
    });
    const sink = new HostFallbackTextSink({ host, sessions: session_port });

    session_port.start();
    sink.start();
    await vi.waitFor(() => expect(session_port.active_session).not.toBeNull());

    const finishing_session = session_port.begin({
      phase: "started",
      generation_type: "normal",
      dry_run: false,
    });
    sessions.add_request(finishing_session.generation_anchor, REQUEST_ID);
    sink.append("cleaned ");
    host.emit({ phase: "ended", message_id: 1 });

    await vi.waitFor(() => expect(host.updates).toHaveLength(1));

    expect(host.updates[0]?.metadata).toMatchObject({
      generation_anchor: finishing_session.generation_anchor,
      request_ids: [REQUEST_ID],
    });
    expect(session_port.active_session?.generation_anchor).not.toBe(
      finishing_session.generation_anchor,
    );

    sink.stop();
    session_port.stop();
  });
});
