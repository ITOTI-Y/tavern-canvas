import type { GenerationJobSnapshot } from "@tavern-canvas/core";
import { describe, expect, it, vi } from "vitest";

import { ChatPlaceholderRegistry } from "./chat_placeholder.js";

function job(overrides: Partial<GenerationJobSnapshot> = {}): GenerationJobSnapshot {
  return {
    job_id: "job-1",
    request_id: "req-1",
    request_digest: "d".repeat(64),
    generation_anchor: "a".repeat(64),
    source_anchor: "b".repeat(64),
    chat_id: "chat-1",
    requested_swipe_id: 0,
    provider_id: "sd_webui",
    arguments: { generation_anchor: "a".repeat(64), scene_description: "s" },
    state: "queued",
    created_at: "2026-08-07T00:00:00.000Z",
    updated_at: "2026-08-07T00:00:00.000Z",
    error: null,
    image_ids: [],
    ...overrides,
  };
}

describe("ChatPlaceholderRegistry", () => {
  it("registers a pending placeholder keyed by request_id", () => {
    const registry = new ChatPlaceholderRegistry();
    const placeholder = registry.register("req-1");
    expect(placeholder).toEqual({
      request_id: "req-1",
      status: "pending",
      image_ids: [],
      error_code: null,
    });
    expect(registry.get("req-1")).toEqual(placeholder);
  });

  it("leaves the placeholder untouched for intermediate job states", () => {
    const registry = new ChatPlaceholderRegistry();
    registry.register("req-1");
    for (const state of ["queued", "preparing", "submitting", "running"] as const) {
      registry.handle_job(job({ state }));
    }
    expect(registry.get("req-1")?.status).toBe("pending");
  });

  it("resolves the placeholder only on a matching completed job, carrying image_ids", () => {
    const registry = new ChatPlaceholderRegistry();
    registry.register("req-1");
    const listener = vi.fn();
    registry.subscribe(listener);

    registry.handle_job(job({ request_id: "req-other", state: "completed", image_ids: ["img-x"] }));
    expect(registry.get("req-1")?.status).toBe("pending");
    expect(listener).not.toHaveBeenCalled();

    registry.handle_job(
      job({ request_id: "req-1", state: "completed", image_ids: ["img-1", "img-2"] }),
    );
    expect(registry.get("req-1")).toEqual({
      request_id: "req-1",
      status: "resolved",
      image_ids: ["img-1", "img-2"],
      error_code: null,
    });
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("resolves on attached as well as completed", () => {
    const registry = new ChatPlaceholderRegistry();
    registry.register("req-1");
    registry.handle_job(job({ request_id: "req-1", state: "attached", image_ids: ["img-1"] }));
    expect(registry.get("req-1")?.status).toBe("resolved");
  });

  it("marks the placeholder failed with the job's error code", () => {
    const registry = new ChatPlaceholderRegistry();
    registry.register("req-1");
    registry.handle_job(
      job({
        request_id: "req-1",
        state: "failed",
        error: { code: "provider_unavailable", retryable: false },
      }),
    );
    expect(registry.get("req-1")).toMatchObject({
      status: "failed",
      error_code: "provider_unavailable",
    });
  });

  it("marks the placeholder cancelled", () => {
    const registry = new ChatPlaceholderRegistry();
    registry.register("req-1");
    registry.handle_job(job({ request_id: "req-1", state: "cancelled" }));
    expect(registry.get("req-1")?.status).toBe("cancelled");
  });

  it("does not replace an already-resolved placeholder on a later stray event", () => {
    const registry = new ChatPlaceholderRegistry();
    registry.register("req-1");
    registry.handle_job(job({ request_id: "req-1", state: "completed", image_ids: ["img-1"] }));
    registry.handle_job(
      job({ request_id: "req-1", state: "failed", error: { code: "timed_out", retryable: true } }),
    );
    expect(registry.get("req-1")?.status).toBe("resolved");
  });

  it("ignores job events for a request_id that was never registered", () => {
    const registry = new ChatPlaceholderRegistry();
    registry.handle_job(job({ request_id: "unregistered", state: "completed" }));
    expect(registry.get("unregistered")).toBeNull();
  });

  it("discard removes a placeholder and unsubscribe stops future notifications", () => {
    const registry = new ChatPlaceholderRegistry();
    registry.register("req-1");
    const listener = vi.fn();
    const unsubscribe = registry.subscribe(listener);
    unsubscribe();
    registry.handle_job(job({ request_id: "req-1", state: "completed", image_ids: ["img-1"] }));
    expect(listener).not.toHaveBeenCalled();

    registry.discard("req-1");
    expect(registry.get("req-1")).toBeNull();
  });
});
