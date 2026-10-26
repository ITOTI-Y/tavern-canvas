import { AutoTokenizer, env } from "@huggingface/transformers";

import {
  is_tokenizer_worker_request,
  strip_novelai_weight_syntax,
  type TokenizerErrorResponse,
  type TokenizerResultResponse,
} from "./tokenizer_protocol.js";

const TOKENIZER_MODEL_ID = "novelai";

type NovelAiTokenizer = Awaited<ReturnType<typeof AutoTokenizer.from_pretrained>>;

export class TokenizerLoadError extends Error {
  constructor(message: string, options?: { readonly cause?: unknown }) {
    super(message, options);
    this.name = "TokenizerLoadError";
  }
}

/** A load failure is cached permanently: the assets are bundled, so failure means a missing or corrupt asset, not a transient condition. */
export class TokenizerEngine {
  #tokenizer_promise: Promise<NovelAiTokenizer> | null = null;
  readonly #load: () => Promise<NovelAiTokenizer>;

  constructor(load: () => Promise<NovelAiTokenizer>) {
    this.#load = load;
  }

  async count_tokens(prompt: string): Promise<number> {
    const tokenizer = await this.#ensure_loaded();
    const encoded = tokenizer(strip_novelai_weight_syntax(prompt)) as {
      readonly input_ids: { readonly data: { readonly length: number } };
    };
    return encoded.input_ids.data.length;
  }

  #ensure_loaded(): Promise<NovelAiTokenizer> {
    this.#tokenizer_promise ??= this.#load().catch((error: unknown) => {
      throw error instanceof TokenizerLoadError
        ? error
        : new TokenizerLoadError(error instanceof Error ? error.message : String(error), {
            cause: error,
          });
    });
    return this.#tokenizer_promise;
  }
}

/** Disables remote models so a missing local asset fails loudly instead of falling back to a huggingface.co fetch. */
function configure_local_only_env(local_model_path: string): void {
  env.allowRemoteModels = false;
  env.allowLocalModels = true;
  env.localModelPath = local_model_path;
  env.useFSCache = false;
  env.useBrowserCache = false;
}

export function create_local_tokenizer_loader(
  local_model_path: string,
): () => Promise<NovelAiTokenizer> {
  return async () => {
    configure_local_only_env(local_model_path);
    return AutoTokenizer.from_pretrained(TOKENIZER_MODEL_ID);
  };
}

export interface WorkerScopeLike {
  postMessage(message: unknown): void;
  addEventListener(type: "message", handler: (event: { data: unknown }) => void): void;
  readonly location?: { readonly href: string };
}

// The tokenizers directory sits one directory above the Worker script (dist/workers/*.js).
export function resolve_bundled_tokenizer_base_url(scope: WorkerScopeLike): string {
  const { location } = scope;
  if (location === undefined) {
    throw new Error(
      "tokenizer_worker: self.location is unavailable, cannot resolve the bundled tokenizer base URL",
    );
  }
  return new URL("../tokenizers/", location.href).href;
}

function error_message(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

/** Always answers with a result or an error response; a rejected count_tokens() never surfaces as an unhandled rejection. */
export function start_tokenizer_worker(engine: TokenizerEngine, scope: WorkerScopeLike): void {
  scope.addEventListener("message", (event) => {
    if (!is_tokenizer_worker_request(event.data)) {
      return; // No request_id to correlate an error response to; drop silently.
    }
    const request = event.data;
    engine
      .count_tokens(request.prompt)
      .then((token_count) => {
        scope.postMessage({
          type: "result",
          request_id: request.request_id,
          token_count,
        } satisfies TokenizerResultResponse);
      })
      .catch((error: unknown) => {
        scope.postMessage({
          type: "error",
          request_id: request.request_id,
          code: "tokenizer_unavailable",
          message: error_message(error),
        } satisfies TokenizerErrorResponse);
      });
  });
}

declare const self: WorkerScopeLike | undefined;

if (typeof self !== "undefined" && typeof self.postMessage === "function") {
  const engine = new TokenizerEngine(
    create_local_tokenizer_loader(resolve_bundled_tokenizer_base_url(self)),
  );
  start_tokenizer_worker(engine, self);
}
