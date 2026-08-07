import type { GenerationJobSnapshot } from "@tavern-canvas/core";

export type ChatPlaceholderStatus = "pending" | "resolved" | "failed" | "cancelled";

export interface ChatPlaceholder {
  readonly request_id: string;
  readonly status: ChatPlaceholderStatus;
  readonly image_ids: readonly string[];
  readonly error_code: string | null;
}

export type ChatPlaceholderListener = (placeholder: ChatPlaceholder) => void;

const RESOLVED_STATES = new Set(["completed", "attached"]);

function terminal_placeholder(
  job: GenerationJobSnapshot,
): Pick<ChatPlaceholder, "status" | "image_ids" | "error_code"> | null {
  if (RESOLVED_STATES.has(job.state)) {
    return { status: "resolved", image_ids: job.image_ids, error_code: null };
  }
  if (job.state === "failed") {
    return { status: "failed", image_ids: [], error_code: job.error?.code ?? null };
  }
  if (job.state === "cancelled") {
    return { status: "cancelled", image_ids: [], error_code: null };
  }
  return null;
}

/**
 * Tracks one streaming placeholder per in-flight chat generation, keyed by `request_id` (known
 * the moment a trigger fires, before any Stage 02 job exists). `handle_job` only ever replaces a
 * placeholder on a matching, terminal job state (`completed`/`attached`/`failed`/`cancelled`) --
 * every intermediate state (`queued`/`preparing`/`submitting`/`running`) leaves the placeholder
 * untouched so the chat UI keeps showing its own streaming indicator until real completion.
 */
export class ChatPlaceholderRegistry {
  readonly #placeholders = new Map<string, ChatPlaceholder>();
  readonly #listeners = new Set<ChatPlaceholderListener>();

  register(request_id: string): ChatPlaceholder {
    const placeholder: ChatPlaceholder = {
      request_id,
      status: "pending",
      image_ids: [],
      error_code: null,
    };
    this.#placeholders.set(request_id, placeholder);
    this.#publish(placeholder);
    return placeholder;
  }

  get(request_id: string): ChatPlaceholder | null {
    return this.#placeholders.get(request_id) ?? null;
  }

  subscribe(listener: ChatPlaceholderListener): () => void {
    this.#listeners.add(listener);
    return () => {
      this.#listeners.delete(listener);
    };
  }

  /** Removes a placeholder outright, e.g. once its message rendering has consumed it. */
  discard(request_id: string): void {
    this.#placeholders.delete(request_id);
  }

  handle_job(job: GenerationJobSnapshot): void {
    const existing = this.#placeholders.get(job.request_id);
    if (existing === undefined || existing.status !== "pending") {
      return;
    }
    const outcome = terminal_placeholder(job);
    if (outcome === null) {
      return;
    }
    const resolved: ChatPlaceholder = { ...existing, ...outcome };
    this.#placeholders.set(job.request_id, resolved);
    this.#publish(resolved);
  }

  #publish(placeholder: ChatPlaceholder): void {
    for (const listener of this.#listeners) {
      listener(placeholder);
    }
  }
}
