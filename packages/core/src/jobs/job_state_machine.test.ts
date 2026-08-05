import type { GenerationState } from "@tavern-canvas/contracts";
import { describe, expect, it } from "vitest";

import type { GenerationJob } from "./generation_job.js";
import {
  GenerationJobTransitionError,
  is_terminal_generation_state,
  transition_generation_job,
} from "./job_state_machine.js";

const JOB_ID = "22222222-2222-4222-8222-222222222222";

function job(state: GenerationState): GenerationJob {
  return {
    job_id: JOB_ID,
    request_id: "11111111-1111-4111-8111-111111111111",
    request_digest: "a".repeat(64),
    generation_anchor: "b".repeat(64),
    source_anchor: "c".repeat(64),
    chat_id: "chat-a",
    requested_swipe_id: 0,
    provider_id: "sd_webui",
    arguments: {
      generation_anchor: "b".repeat(64),
      scene_description: "A rainy alley",
    },
    state,
    created_at: "2026-08-05T00:00:00.000Z",
    updated_at: "2026-08-05T00:00:00.000Z",
    error: null,
    image_ids: [],
  };
}

const allowed_transitions: readonly [GenerationState, GenerationState][] = [
  ["queued", "preparing"],
  ["queued", "cancelled"],
  ["preparing", "submitting"],
  ["preparing", "failed"],
  ["preparing", "cancelled"],
  ["submitting", "running"],
  ["submitting", "completed"],
  ["submitting", "failed"],
  ["submitting", "cancelled"],
  ["running", "completed"],
  ["running", "failed"],
  ["running", "cancelled"],
  ["completed", "attached"],
  ["completed", "orphaned"],
];

describe("transition_generation_job", () => {
  it.each(allowed_transitions)("allows %s -> %s", (prior_state, attempted_state) => {
    const value = job(prior_state);

    transition_generation_job(value, attempted_state, "2026-08-05T00:00:01.000Z");

    expect(value.state).toBe(attempted_state);
    expect(value.updated_at).toBe("2026-08-05T00:00:01.000Z");
  });

  it("treats repeated cancellation as a successful no-op", () => {
    const value = job("cancelled");

    expect(() =>
      transition_generation_job(value, "cancelled", "2026-08-05T00:00:01.000Z"),
    ).not.toThrow();
    expect(value.updated_at).toBe("2026-08-05T00:00:00.000Z");
  });

  it.each([
    ["queued", "completed"],
    ["preparing", "attached"],
    ["completed", "failed"],
    ["failed", "queued"],
    ["cancelled", "running"],
    ["attached", "orphaned"],
    ["orphaned", "attached"],
  ] as const)("rejects %s -> %s before mutation", (prior_state, attempted_state) => {
    const value = job(prior_state);
    const original = structuredClone(value);

    expect(() =>
      transition_generation_job(value, attempted_state, "2026-08-05T00:00:01.000Z"),
    ).toThrow(
      expect.objectContaining({
        name: "GenerationJobTransitionError",
        job_id: JOB_ID,
        prior_state,
        attempted_state,
      }),
    );
    expect(value).toEqual(original);
  });

  it("exposes a typed internal transition error", () => {
    const value = job("failed");

    try {
      transition_generation_job(value, "running", "2026-08-05T00:00:01.000Z");
      throw new Error("Expected transition to fail");
    } catch (error) {
      expect(error).toBeInstanceOf(GenerationJobTransitionError);
      expect(error).toMatchObject({
        code: "invalid_generation_job_transition",
        message: `Job ${JOB_ID} cannot transition from failed to running`,
      });
    }
  });

  it("marks only failed, cancelled, attached, and orphaned as terminal", () => {
    const states: GenerationState[] = [
      "queued",
      "preparing",
      "submitting",
      "running",
      "completed",
      "failed",
      "cancelled",
      "attached",
      "orphaned",
    ];

    expect(states.filter(is_terminal_generation_state)).toEqual([
      "failed",
      "cancelled",
      "attached",
      "orphaned",
    ]);
  });
});
