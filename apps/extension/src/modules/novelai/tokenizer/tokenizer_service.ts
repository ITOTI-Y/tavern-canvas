import {
  is_tokenizer_worker_response,
  type TokenizerErrorCode,
  type TokenizerWorkerRequest,
} from "./tokenizer_protocol.js";

// Subset of the DOM Worker interface this service actually uses -- lets tests inject a plain
// object instead of spinning up a real Worker thread. Mirrors VocabularyWorkerHandle
// (apps/extension/src/modules/vocabulary/vocabulary_client.ts).
export interface TokenizerWorkerHandle {
  postMessage(message: unknown): void;
  terminate(): void;
  addEventListener(type: "message", handler: (event: { data: unknown }) => void): void;
}

export type TokenizerCountResult =
  | { readonly status: "ok"; readonly token_count: number }
  | {
      readonly status: "error";
      readonly code: TokenizerErrorCode | "cancelled";
      readonly message: string;
    };

export interface TokenizerServiceOptions {
  // Overrides how the Worker is constructed -- tests inject a fake; production defaults to the
  // real lazy Worker below. Never invoked until the first count_tokens() call.
  readonly create_worker?: () => TokenizerWorkerHandle;
}

function default_create_worker(): TokenizerWorkerHandle {
  return new Worker(new URL("./tokenizer_worker.ts", import.meta.url), { type: "module" });
}

function disposed_result(): TokenizerCountResult {
  return { status: "error", code: "cancelled", message: "tokenizer service disposed" };
}

interface PendingCount {
  readonly resolve: (result: TokenizerCountResult) => void;
}

/**
 * The capability the NovelAI prompt editor's live token-budget display depends on. Owns lazy
 * Worker construction (never before the first count_tokens() call, so opening an unrelated view
 * never loads the tokenizer chunk or its bundled assets), request/response correlation, and
 * teardown. Never imports @huggingface/transformers itself -- only tokenizer_worker.ts does, and
 * that file is reached exclusively through the `new Worker(new URL(...))` call below, which Vite
 * code-splits into its own chunk rather than inlining into whatever imports this service.
 */
export class TokenizerService {
  readonly #create_worker: () => TokenizerWorkerHandle;
  #worker: TokenizerWorkerHandle | null = null;
  readonly #pending = new Map<string, PendingCount>();
  #disposed = false;

  constructor(options: TokenizerServiceOptions = {}) {
    this.#create_worker = options.create_worker ?? default_create_worker;
  }

  /**
   * Counts prompt tokens against the NovelAI budget. Never throws or rejects -- a load failure
   * (missing/corrupt bundled asset) resolves to a `tokenizer_unavailable` error result instead,
   * so a caller can skip the budget display without needing to guard generation behind a
   * try/catch.
   */
  count_tokens(prompt: string): Promise<TokenizerCountResult> {
    if (this.#disposed) {
      return Promise.resolve(disposed_result());
    }
    const worker = this.#ensure_worker();
    const request_id = crypto.randomUUID();
    return new Promise<TokenizerCountResult>((resolve) => {
      this.#pending.set(request_id, { resolve });
      const request: TokenizerWorkerRequest = { type: "count_tokens", request_id, prompt };
      worker.postMessage(request);
    });
  }

  /** Terminates the Worker (if one was ever created) and settles every pending count_tokens()
   * call as cancelled. Idempotent. */
  dispose(): void {
    if (this.#disposed) {
      return;
    }
    this.#disposed = true;
    for (const pending of this.#pending.values()) {
      pending.resolve(disposed_result());
    }
    this.#pending.clear();
    this.#worker?.terminate();
    this.#worker = null;
  }

  #ensure_worker(): TokenizerWorkerHandle {
    if (this.#worker === null) {
      const worker = this.#create_worker();
      worker.addEventListener("message", (event) => {
        this.#handle_message(event.data);
      });
      this.#worker = worker;
    }
    return this.#worker;
  }

  #handle_message(data: unknown): void {
    if (!is_tokenizer_worker_response(data)) {
      return;
    }
    const pending = this.#pending.get(data.request_id);
    if (pending === undefined) {
      return; // Stale response for a disposed/unknown request -- ignore.
    }
    this.#pending.delete(data.request_id);
    if (data.type === "result") {
      pending.resolve({ status: "ok", token_count: data.token_count });
    } else {
      pending.resolve({ status: "error", code: data.code, message: data.message });
    }
  }
}
