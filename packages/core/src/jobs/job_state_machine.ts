import type { GenerationState } from "@tavern-canvas/contracts";

import type { GenerationJob } from "./generation_job.js";

const ALLOWED_TRANSITIONS = {
  queued: ["preparing", "cancelled"],
  preparing: ["submitting", "failed", "cancelled"],
  submitting: ["running", "completed", "failed", "cancelled"],
  running: ["completed", "failed", "cancelled"],
  completed: ["attached", "orphaned"],
  failed: [],
  cancelled: [],
  attached: [],
  orphaned: [],
} as const satisfies Record<GenerationState, readonly GenerationState[]>;

const TERMINAL_STATES: ReadonlySet<GenerationState> = new Set([
  "failed",
  "cancelled",
  "attached",
  "orphaned",
]);

export class GenerationJobTransitionError extends Error {
  readonly code = "invalid_generation_job_transition";
  readonly job_id: string;
  readonly prior_state: GenerationState;
  readonly attempted_state: GenerationState;

  constructor(job_id: string, prior_state: GenerationState, attempted_state: GenerationState) {
    super(`Job ${job_id} cannot transition from ${prior_state} to ${attempted_state}`);
    this.name = "GenerationJobTransitionError";
    this.job_id = job_id;
    this.prior_state = prior_state;
    this.attempted_state = attempted_state;
  }
}

export function is_terminal_generation_state(state: GenerationState): boolean {
  return TERMINAL_STATES.has(state);
}

export function transition_generation_job(
  job: GenerationJob,
  attempted_state: GenerationState,
  updated_at: string,
): void {
  const prior_state = job.state;
  if (prior_state === "cancelled" && attempted_state === "cancelled") {
    return;
  }
  const allowed_states: readonly GenerationState[] = ALLOWED_TRANSITIONS[prior_state];
  if (!allowed_states.includes(attempted_state)) {
    throw new GenerationJobTransitionError(job.job_id, prior_state, attempted_state);
  }

  job.state = attempted_state;
  job.updated_at = updated_at;
}
