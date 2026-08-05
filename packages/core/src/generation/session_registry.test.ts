import { describe, expect, it } from "vitest";

import type { RandomSource } from "./anchors.js";
import {
  DEFAULT_SESSION_RETENTION_MS,
  GenerationSessionError,
  SessionRegistry,
  type TimeSource,
} from "./session_registry.js";
import { SourceContextSchema, type SourceContext } from "./source_context.js";

class SequenceRandomSource implements RandomSource {
  #next_value = 1;

  bytes(length: number): Uint8Array {
    return new Uint8Array(length).fill(this.#next_value++);
  }
}

class ControlledTimeSource implements TimeSource {
  #timestamp_ms = Date.parse("2026-08-05T00:00:00.000Z");

  now(): Date {
    return new Date(this.#timestamp_ms);
  }

  advance(milliseconds: number): void {
    this.#timestamp_ms += milliseconds;
  }
}

function context(chat_id = "chat-a"): SourceContext {
  return SourceContextSchema.parse({
    schema_version: 1,
    chat_id,
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

function registry(time_source = new ControlledTimeSource()): SessionRegistry {
  return new SessionRegistry(new SequenceRandomSource(), time_source);
}

describe("SessionRegistry", () => {
  it("creates one depth-zero root and reuses it for recursive generations", () => {
    const sessions = registry();
    const root = sessions.open({
      depth: 0,
      host_root_generation_id: "host-root-a",
      source_context: context(),
    });
    const recursive = sessions.open({
      depth: 2,
      host_root_generation_id: "host-root-a",
      source_context: context("chat-after-recursion"),
    });

    expect(recursive).toBe(root);
    expect(recursive.chat_id).toBe("chat-a");
    expect(Object.isFrozen(recursive.source_context)).toBe(true);
  });

  it("creates a new generation anchor and keeps the source anchor for regeneration", () => {
    const sessions = registry();
    const first = sessions.open({
      depth: 0,
      host_root_generation_id: "host-root-a",
      source_context: context(),
    });
    const regenerated = sessions.open({
      depth: 0,
      host_root_generation_id: "host-root-b",
      source_context: context(),
    });

    expect(regenerated.source_anchor).toBe(first.source_anchor);
    expect(regenerated.generation_anchor).not.toBe(first.generation_anchor);
  });

  it("keeps a completed session readable through its retention deadline", () => {
    const time_source = new ControlledTimeSource();
    const sessions = registry(time_source);
    const session = sessions.open({
      depth: 0,
      host_root_generation_id: "host-root-a",
      source_context: context(),
    });

    sessions.complete("host-root-a");
    time_source.advance(DEFAULT_SESSION_RETENTION_MS - 1);
    expect(sessions.get_by_anchor(session.generation_anchor)).toBe(session);

    time_source.advance(2);
    expect(sessions.get_by_anchor(session.generation_anchor)).toBeUndefined();
  });

  it("rejects new actions after session expiry", () => {
    const time_source = new ControlledTimeSource();
    const sessions = registry(time_source);
    const session = sessions.open({
      depth: 0,
      host_root_generation_id: "host-root-a",
      source_context: context(),
    });
    sessions.complete("host-root-a");
    time_source.advance(DEFAULT_SESSION_RETENTION_MS + 1);

    expect(() => sessions.add_request(session.generation_anchor, "request-a")).toThrow(
      expect.objectContaining({ code: "expired" }),
    );
  });

  it("reports missing and mismatched roots explicitly", () => {
    const sessions = registry();
    const session = sessions.open({
      depth: 0,
      host_root_generation_id: "host-root-a",
      source_context: context(),
    });

    expect(() =>
      sessions.open({
        depth: 1,
        host_root_generation_id: "missing-root",
        source_context: context(),
      }),
    ).toThrow(expect.objectContaining({ code: "missing" }));
    expect(() => sessions.require_actionable("another-root", session.generation_anchor)).toThrow(
      expect.objectContaining({ code: "mismatched" }),
    );
    expect(GenerationSessionError).toBeDefined();
  });

  it("retains expired sessions with active jobs until every job settles", () => {
    const time_source = new ControlledTimeSource();
    const sessions = registry(time_source);
    const session = sessions.open({
      depth: 0,
      host_root_generation_id: "host-root-a",
      source_context: context(),
    });
    sessions.add_request(session.generation_anchor, "request-a");
    sessions.complete("host-root-a");
    time_source.advance(DEFAULT_SESSION_RETENTION_MS + 1);

    expect(sessions.cleanup()).toBe(0);
    expect(session.request_ids).toEqual(new Set(["request-a"]));

    sessions.settle_request(session.generation_anchor, "request-a");
    expect(sessions.cleanup()).toBe(1);
  });
});
