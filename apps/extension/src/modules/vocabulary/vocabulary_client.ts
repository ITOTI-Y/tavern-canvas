import {
  VocabularyWorkerResponseSchema,
  type VocabularySearchResult,
  type VocabularyWorkerErrorCode,
  type VocabularyWorkerRequest,
} from "@tavern-canvas/contracts";

const DEFAULT_DEBOUNCE_MS = 120;

export class VocabularySearchError extends Error {
  readonly code: VocabularyWorkerErrorCode;

  constructor(code: VocabularyWorkerErrorCode, message: string) {
    super(message);
    this.name = "VocabularySearchError";
    this.code = code;
  }
}

export interface VocabularySearchPage {
  readonly results: readonly VocabularySearchResult[];
  readonly next_cursor: string | null;
}

// Subset of the DOM Worker interface the client actually uses -- lets tests
// inject a plain object instead of spinning up a real Worker thread.
export interface VocabularyWorkerHandle {
  postMessage(message: unknown): void;
  terminate(): void;
  addEventListener(type: "message", handler: (event: { data: unknown }) => void): void;
}

export interface VocabularySearchOptions {
  readonly category?: string;
  // Invoked once per partial_results response for the request this
  // search() call produced -- exact/prefix results ahead of trigram recall.
  readonly on_partial?: (page: VocabularySearchPage) => void;
}

export interface VocabularyClientOptions {
  readonly create_worker: () => VocabularyWorkerHandle;
  readonly debounce_ms?: number;
}

interface PendingRequest {
  readonly resolve: (page: VocabularySearchPage) => void;
  readonly reject: (error: unknown) => void;
  readonly on_partial?: (page: VocabularySearchPage) => void;
}

interface ActiveCommitment {
  readonly generation: number;
  readonly request_id: string | null; // null while still debouncing, not yet dispatched
  readonly reject: (error: unknown) => void;
}

function cancelled_error(message: string): VocabularySearchError {
  return new VocabularySearchError("cancelled", message);
}

/**
 * Owns the Worker handshake, debounce, and request correlation for
 * vocabulary search. This is the capability Stage 06's Vue layer depends
 * on -- it never talks to VocabularyWorkerRequest/Response directly.
 */
export class VocabularyClient {
  readonly #worker: VocabularyWorkerHandle;
  readonly #debounce_ms: number;
  readonly #pending = new Map<string, PendingRequest>();
  #ready = false;
  #ready_waiters: (() => void)[] = [];
  #disposed = false;
  #debounce_timer: ReturnType<typeof setTimeout> | null = null;
  #active: ActiveCommitment | null = null;
  #generation = 0;

  constructor(options: VocabularyClientOptions) {
    this.#debounce_ms = options.debounce_ms ?? DEFAULT_DEBOUNCE_MS;
    this.#worker = options.create_worker();
    this.#worker.addEventListener("message", (event) => {
      this.#handle_message(event.data);
    });
    this.#post({ type: "initialize", request_id: crypto.randomUUID() });
  }

  search(query: string, options: VocabularySearchOptions = {}): Promise<VocabularySearchPage> {
    if (this.#disposed) {
      return Promise.reject(cancelled_error("client disposed"));
    }
    this.#supersede_active();
    this.#generation += 1;
    const generation = this.#generation;

    return new Promise<VocabularySearchPage>((resolve, reject) => {
      this.#active = { generation, request_id: null, reject };
      this.#debounce_timer = setTimeout(() => {
        this.#debounce_timer = null;
        void this.#dispatch_query(generation, query, options, resolve, reject);
      }, this.#debounce_ms);
    });
  }

  async next_page(cursor: string): Promise<VocabularySearchPage> {
    this.#throw_if_disposed();
    if (!this.#ready) {
      await this.#ensure_ready();
    }
    // dispose() can run on the microtask queue during the await above --
    // re-check via a method call (not a direct field read) so the type
    // checker does not stale-narrow #disposed to false across that gap.
    this.#throw_if_disposed();
    const request_id = crypto.randomUUID();
    return new Promise<VocabularySearchPage>((resolve, reject) => {
      this.#pending.set(request_id, { resolve, reject });
      this.#post({ type: "next_page", request_id, cursor });
    });
  }

  dispose(): void {
    if (this.#disposed) {
      return;
    }
    this.#disposed = true;
    if (this.#debounce_timer !== null) {
      clearTimeout(this.#debounce_timer);
      this.#debounce_timer = null;
    }
    const error = cancelled_error("client disposed");
    for (const pending of this.#pending.values()) {
      pending.reject(error);
    }
    this.#pending.clear();
    if (this.#active !== null && this.#active.request_id === null) {
      this.#active.reject(error); // still debouncing, never made it into #pending
    }
    this.#active = null;
    for (const waiter of this.#ready_waiters) {
      waiter();
    }
    this.#ready_waiters = [];
    this.#worker.terminate();
  }

  async #dispatch_query(
    generation: number,
    query: string,
    options: VocabularySearchOptions,
    resolve: (page: VocabularySearchPage) => void,
    reject: (error: unknown) => void,
  ): Promise<void> {
    if (!this.#ready) {
      await this.#ensure_ready();
    }
    if (generation !== this.#generation || this.#disposed) {
      return; // superseded or disposed while awaiting readiness; already settled elsewhere.
    }
    const request_id = crypto.randomUUID();
    this.#active = { generation, request_id, reject };
    this.#pending.set(request_id, {
      resolve,
      reject,
      ...(options.on_partial !== undefined ? { on_partial: options.on_partial } : {}),
    });
    this.#post({
      type: "query",
      request_id,
      query,
      ...(options.category !== undefined ? { category: options.category } : {}),
    });
  }

  #supersede_active(): void {
    const previous = this.#active;
    this.#active = null;
    if (this.#debounce_timer !== null) {
      clearTimeout(this.#debounce_timer);
      this.#debounce_timer = null;
    }
    if (previous === null) {
      return;
    }
    if (previous.request_id !== null) {
      this.#pending.delete(previous.request_id);
      this.#post({
        type: "cancel",
        request_id: crypto.randomUUID(),
        target_request_id: previous.request_id,
      });
    }
    previous.reject(cancelled_error("superseded by a newer search"));
  }

  #throw_if_disposed(): void {
    if (this.#disposed) {
      throw cancelled_error("client disposed");
    }
  }

  #ensure_ready(): Promise<void> {
    if (this.#ready || this.#disposed) {
      return Promise.resolve();
    }
    return new Promise<void>((resolve) => {
      this.#ready_waiters.push(resolve);
    });
  }

  #handle_message(data: unknown): void {
    const parsed = VocabularyWorkerResponseSchema.safeParse(data);
    if (!parsed.success) {
      return;
    }
    const response = parsed.data;

    if (response.type === "ready") {
      this.#ready = true;
      this.#flush_ready_waiters();
      return;
    }

    const pending = this.#pending.get(response.request_id);
    if (pending === undefined) {
      return; // Stale response for a cancelled/superseded/unknown request -- ignore.
    }

    switch (response.type) {
      case "partial_results":
        pending.on_partial?.({ results: response.results, next_cursor: null });
        return;
      case "progress":
        return; // No progress consumer surface in this client yet.
      case "complete":
        this.#settle(response.request_id);
        pending.resolve({ results: response.results, next_cursor: response.next_cursor });
        return;
      case "error":
        this.#settle(response.request_id);
        pending.reject(new VocabularySearchError(response.code, response.message));
        return;
    }
  }

  #settle(request_id: string): void {
    this.#pending.delete(request_id);
    if (this.#active?.request_id === request_id) {
      this.#active = null;
    }
  }

  #flush_ready_waiters(): void {
    const waiters = this.#ready_waiters;
    this.#ready_waiters = [];
    for (const waiter of waiters) {
      waiter();
    }
  }

  #post(message: VocabularyWorkerRequest): void {
    this.#worker.postMessage(message);
  }
}
