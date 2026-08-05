import { create_generation_anchors, type RandomSource } from "./anchors.js";
import type { GenerationSession, OpenGenerationSessionRequest } from "./generation_session.js";
import { SourceContextSchema, type SourceContext } from "./source_context.js";

export const DEFAULT_SESSION_RETENTION_MS = 15 * 60 * 1_000;

export interface TimeSource {
  now(): Date;
}

export type GenerationSessionErrorCode = "missing" | "expired" | "mismatched" | "invalid_depth";

export class GenerationSessionError extends Error {
  readonly code: GenerationSessionErrorCode;

  constructor(code: GenerationSessionErrorCode, message: string) {
    super(message);
    this.name = "GenerationSessionError";
    this.code = code;
  }
}

interface SessionRecord {
  readonly session: GenerationSession;
  readonly request_ids: Set<string>;
  readonly active_request_ids: Set<string>;
}

function freeze_source_context(source_context: SourceContext): SourceContext {
  const parsed = SourceContextSchema.parse(source_context);
  for (const active_swipe of parsed.active_swipes) {
    Object.freeze(active_swipe);
  }
  for (const message of parsed.messages) {
    Object.freeze(message);
  }
  Object.freeze(parsed.active_swipes);
  Object.freeze(parsed.messages);
  return Object.freeze(parsed);
}

export class SessionRegistry {
  readonly #random_source: RandomSource;
  readonly #time_source: TimeSource;
  readonly #retention_ms: number;
  readonly #records_by_root = new Map<string, SessionRecord>();
  readonly #records_by_anchor = new Map<string, SessionRecord>();

  constructor(
    random_source: RandomSource,
    time_source: TimeSource = { now: () => new Date() },
    retention_ms = DEFAULT_SESSION_RETENTION_MS,
  ) {
    if (!Number.isFinite(retention_ms) || retention_ms < 0) {
      throw new RangeError("Session retention must be a nonnegative finite duration");
    }
    this.#random_source = random_source;
    this.#time_source = time_source;
    this.#retention_ms = retention_ms;
  }

  open(request: OpenGenerationSessionRequest): GenerationSession {
    if (!Number.isInteger(request.depth) || request.depth < 0) {
      throw new GenerationSessionError(
        "invalid_depth",
        "Generation depth must be a nonnegative integer",
      );
    }
    const existing = this.#records_by_root.get(request.host_root_generation_id);
    if (existing !== undefined) {
      if (this.#is_expired(existing)) {
        throw new GenerationSessionError(
          "expired",
          `Generation session for root "${request.host_root_generation_id}" has expired`,
        );
      }
      return existing.session;
    }
    if (request.depth !== 0) {
      throw new GenerationSessionError(
        "missing",
        `Root generation session "${request.host_root_generation_id}" does not exist`,
      );
    }

    const source_context = freeze_source_context(request.source_context);
    const anchors = create_generation_anchors(source_context, this.#random_source);
    const request_ids = new Set<string>();
    const session: GenerationSession = {
      session_id: anchors.generation_anchor,
      host_root_generation_id: request.host_root_generation_id,
      chat_id: source_context.chat_id,
      source_context,
      source_anchor: anchors.source_anchor,
      generation_anchor: anchors.generation_anchor,
      started_at: this.#time_source.now().toISOString(),
      request_ids,
      completed_at: null,
    };
    const record: SessionRecord = {
      session,
      request_ids,
      active_request_ids: new Set(),
    };
    this.#records_by_root.set(session.host_root_generation_id, record);
    this.#records_by_anchor.set(session.generation_anchor, record);
    return session;
  }

  get_by_anchor(generation_anchor: string): GenerationSession | undefined {
    const record = this.#records_by_anchor.get(generation_anchor);
    if (
      record === undefined ||
      (this.#is_expired(record) && record.active_request_ids.size === 0)
    ) {
      return undefined;
    }
    return record.session;
  }

  require_actionable(
    host_root_generation_id: string,
    generation_anchor: string,
  ): GenerationSession {
    const record = this.#records_by_anchor.get(generation_anchor);
    if (record === undefined) {
      throw new GenerationSessionError(
        "missing",
        `Generation session "${generation_anchor}" does not exist`,
      );
    }
    if (record.session.host_root_generation_id !== host_root_generation_id) {
      throw new GenerationSessionError(
        "mismatched",
        `Generation anchor "${generation_anchor}" does not belong to root "${host_root_generation_id}"`,
      );
    }
    if (this.#is_expired(record)) {
      throw new GenerationSessionError(
        "expired",
        `Generation session "${generation_anchor}" has expired`,
      );
    }
    return record.session;
  }

  complete(host_root_generation_id: string): GenerationSession {
    const record = this.#records_by_root.get(host_root_generation_id);
    if (record === undefined) {
      throw new GenerationSessionError(
        "missing",
        `Root generation session "${host_root_generation_id}" does not exist`,
      );
    }
    record.session.completed_at ??= this.#time_source.now().toISOString();
    return record.session;
  }

  add_request(generation_anchor: string, request_id: string): void {
    const record = this.#records_by_anchor.get(generation_anchor);
    if (record === undefined) {
      throw new GenerationSessionError(
        "missing",
        `Generation session "${generation_anchor}" does not exist`,
      );
    }
    if (this.#is_expired(record)) {
      throw new GenerationSessionError(
        "expired",
        `Generation session "${generation_anchor}" has expired`,
      );
    }
    if (request_id.length === 0) {
      throw new TypeError("Generation request ID must not be empty");
    }
    record.request_ids.add(request_id);
    record.active_request_ids.add(request_id);
  }

  settle_request(generation_anchor: string, request_id: string): void {
    this.#records_by_anchor.get(generation_anchor)?.active_request_ids.delete(request_id);
  }

  cleanup(): number {
    let removed = 0;
    for (const [generation_anchor, record] of this.#records_by_anchor) {
      if (this.#is_expired(record) && record.active_request_ids.size === 0) {
        this.#records_by_anchor.delete(generation_anchor);
        this.#records_by_root.delete(record.session.host_root_generation_id);
        removed += 1;
      }
    }
    return removed;
  }

  #is_expired(record: SessionRecord): boolean {
    if (record.session.completed_at === null) {
      return false;
    }
    const deadline = Date.parse(record.session.completed_at) + this.#retention_ms;
    return this.#time_source.now().getTime() >= deadline;
  }
}
