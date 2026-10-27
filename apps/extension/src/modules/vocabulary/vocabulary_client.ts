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

export interface VocabularyWorkerHandle {
  postMessage(message: unknown): void;
  terminate(): void;
  addEventListener(type: "message", handler: (event: { data: unknown }) => void): void;
  /** Fires when the Worker script cannot be loaded or throws, after which it never answers. */
  addEventListener(type: "error", handler: (event: { readonly message: string }) => void): void;
}

export interface VocabularySearchOptions {
  readonly category?: string;
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

interface ReadyWaiter {
  readonly resolve: () => void;
  readonly reject: (error: unknown) => void;
}

function cancelled_error(message: string): VocabularySearchError {
  return new VocabularySearchError("cancelled", message);
}

export class VocabularyClient {
  readonly #worker: VocabularyWorkerHandle;
  readonly #debounce_ms: number;
  readonly #pending = new Map<string, PendingRequest>();
  #ready = false;
  #ready_waiters: ReadyWaiter[] = [];
  #disposed = false;
  #debounce_timer: ReturnType<typeof setTimeout> | null = null;
  #active: ActiveCommitment | null = null;
  #generation = 0;
  readonly #initialize_request_id: string;
  // Set when the Worker reports that `initialize` failed; without it every `#ensure_ready()` waiter would hang forever.
  #init_error: VocabularySearchError | null = null;

  constructor(options: VocabularyClientOptions) {
    this.#debounce_ms = options.debounce_ms ?? DEFAULT_DEBOUNCE_MS;
    this.#worker = options.create_worker();
    this.#worker.addEventListener("message", (event) => {
      this.#handle_message(event.data);
    });
    this.#worker.addEventListener("error", (event) => {
      this.#fail(new VocabularySearchError("package_unavailable", event.message));
    });
    this.#initialize_request_id = crypto.randomUUID();
    this.#post({ type: "initialize", request_id: this.#initialize_request_id });
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

  /**
   * One lookup that neither debounces nor supersedes other queries, so several can run at once,
   * unlike `search`, which serves a single search box.
   */
  async lookup(query: string): Promise<VocabularySearchPage> {
    await this.ready();
    this.#throw_if_disposed();
    const request_id = crypto.randomUUID();
    return new Promise<VocabularySearchPage>((resolve, reject) => {
      this.#pending.set(request_id, { resolve, reject });
      this.#post({ type: "query", request_id, query });
    });
  }

  /** `false` until the Worker has opened its package; the first run installs the bundled one. */
  get is_ready(): boolean {
    return this.#ready;
  }

  /** The Worker failed to load or to open a package, so every query rejects. */
  get has_failed(): boolean {
    return this.#init_error !== null;
  }

  /** Resolves once the Worker reports ready; rejects when it could not open a package. */
  async ready(): Promise<void> {
    this.#throw_if_disposed();
    if (!this.#ready) {
      await this.#ensure_ready();
    }
    this.#throw_if_disposed();
  }

  async next_page(cursor: string): Promise<VocabularySearchPage> {
    this.#throw_if_disposed();
    if (!this.#ready) {
      await this.#ensure_ready();
    }
    // Re-check through a method call: dispose() may have run during the await, and a field read would be stale-narrowed.
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
    // Resolve (not reject): each waiter re-checks `#throw_if_disposed()` and produces the uniform error.
    for (const waiter of this.#ready_waiters) {
      waiter.resolve();
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
      try {
        await this.#ensure_ready();
      } catch (error) {
        // initialize failed, so this search can never dispatch; reject instead of hanging.
        if (generation === this.#generation && !this.#disposed) {
          if (this.#active?.generation === generation) {
            this.#active = null;
          }
          reject(error);
        }
        return;
      }
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
    if (this.#init_error !== null) {
      return Promise.reject(this.#init_error);
    }
    return new Promise<void>((resolve, reject) => {
      this.#ready_waiters.push({ resolve, reject });
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

    if (response.type === "error" && response.request_id === this.#initialize_request_id) {
      // Response to the constructor's own `initialize` request, which is not in `#pending`; without this branch it is dropped and waiters hang.
      this.#fail(new VocabularySearchError(response.code, response.message));
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

  /** Rejects everything waiting on a Worker that will not answer, and every later query. */
  #fail(error: VocabularySearchError): void {
    this.#init_error = error;
    this.#reject_ready_waiters(error);
    for (const pending of this.#pending.values()) {
      pending.reject(error);
    }
    this.#pending.clear();
    this.#active = null;
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
      waiter.resolve();
    }
  }

  #reject_ready_waiters(error: unknown): void {
    const waiters = this.#ready_waiters;
    this.#ready_waiters = [];
    for (const waiter of waiters) {
      waiter.reject(error);
    }
  }

  #post(message: VocabularyWorkerRequest): void {
    this.#worker.postMessage(message);
  }
}
