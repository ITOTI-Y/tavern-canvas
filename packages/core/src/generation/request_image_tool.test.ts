import { describe, expect, it } from "vitest";

import type { RandomSource } from "./anchors.js";
import {
  RequestImageTool,
  type ImageRequestQueuePort,
  type QueuedImageRequest,
  type RequestIdSource,
} from "./request_image_tool.js";
import {
  DEFAULT_SESSION_RETENTION_MS,
  SessionRegistry,
  type TimeSource,
} from "./session_registry.js";
import { SourceContextSchema } from "./source_context.js";

class FixedRandomSource implements RandomSource {
  bytes(length: number): Uint8Array {
    return new Uint8Array(length).fill(4);
  }
}

class FixedRequestIdSource implements RequestIdSource {
  next(): string {
    return "11111111-1111-4111-8111-111111111111";
  }
}

class RecordingQueue implements ImageRequestQueuePort {
  readonly requests: QueuedImageRequest[] = [];
  provider_started = false;

  enqueue(request: QueuedImageRequest): void {
    this.requests.push(request);
  }
}

class ControlledTimeSource implements TimeSource {
  #timestamp = Date.parse("2026-08-05T00:00:00.000Z");

  now(): Date {
    return new Date(this.#timestamp);
  }

  advance(milliseconds: number): void {
    this.#timestamp += milliseconds;
  }
}

function source_context() {
  return SourceContextSchema.parse({
    schema_version: 1,
    chat_id: "chat-a",
    active_swipes: [{ message_id: 1, swipe_id: 0 }],
    messages: [
      {
        message_id: 1,
        role: "user",
        content_sha256: "a".repeat(64),
        swipe_id: null,
      },
    ],
  });
}

function create_fixture(time_source = new ControlledTimeSource()) {
  const sessions = new SessionRegistry(new FixedRandomSource(), time_source);
  const session = sessions.open({
    depth: 0,
    host_root_generation_id: "host-root-a",
    source_context: source_context(),
  });
  const queue = new RecordingQueue();
  const tool = new RequestImageTool(sessions, new FixedRequestIdSource(), queue);
  return { sessions, session, queue, tool, time_source };
}

describe("RequestImageTool", () => {
  it("exposes a non-stealth strict request_image definition", () => {
    const { tool } = create_fixture();

    expect(tool.definition).toMatchObject({
      name: "request_image",
      display_name: "Request image",
      stealth: false,
      parameters: {
        type: "object",
        additionalProperties: false,
        required: ["generation_anchor", "scene_description"],
        properties: {
          generation_anchor: { type: "string", pattern: "^[a-f0-9]{64}$" },
          context_turns: { type: "integer", minimum: 0, maximum: 12 },
          image_count: { type: "integer", minimum: 1, maximum: 4 },
        },
      },
    });
  });

  it("queues a validated request and returns only public queue identity", () => {
    const { session, queue, tool } = create_fixture();
    const result = tool.execute("host-root-a", {
      generation_anchor: session.generation_anchor,
      scene_description: "A rainy alley",
      image_count: 2,
    });

    expect(result).toEqual({
      status: "queued",
      request_id: "11111111-1111-4111-8111-111111111111",
      generation_anchor: session.generation_anchor,
    });
    expect(Object.keys(result).sort()).toEqual(["generation_anchor", "request_id", "status"]);
    expect(queue.provider_started).toBe(false);
    expect(queue.requests).toHaveLength(1);
    expect(queue.requests[0]).toMatchObject({
      request_id: result.request_id,
      arguments: {
        generation_anchor: session.generation_anchor,
        scene_description: "A rainy alley",
        image_count: 2,
      },
    });
    expect(session.request_ids).toEqual(new Set([result.request_id]));
  });

  it("rejects an anchor that is not owned by the active root", () => {
    const { tool } = create_fixture();

    expect(() =>
      tool.execute("host-root-a", {
        generation_anchor: "b".repeat(64),
        scene_description: "A rainy alley",
      }),
    ).toThrow(expect.objectContaining({ code: "missing" }));
  });

  it("rejects a root that does not own the anchor", () => {
    const { session, tool } = create_fixture();

    expect(() =>
      tool.execute("host-root-b", {
        generation_anchor: session.generation_anchor,
        scene_description: "A rainy alley",
      }),
    ).toThrow(expect.objectContaining({ code: "mismatched" }));
  });

  it("rejects tool actions after session expiry", () => {
    const fixture = create_fixture();
    fixture.sessions.complete("host-root-a");
    fixture.time_source.advance(DEFAULT_SESSION_RETENTION_MS + 1);

    expect(() =>
      fixture.tool.execute("host-root-a", {
        generation_anchor: fixture.session.generation_anchor,
        scene_description: "A rainy alley",
      }),
    ).toThrow(expect.objectContaining({ code: "expired" }));
  });

  it("rejects unknown provider controls before queueing", () => {
    const { session, queue, tool } = create_fixture();

    expect(() =>
      tool.execute("host-root-a", {
        generation_anchor: session.generation_anchor,
        scene_description: "A rainy alley",
        provider_url: "https://example.invalid",
      }),
    ).toThrow();
    expect(queue.requests).toEqual([]);
  });
});
