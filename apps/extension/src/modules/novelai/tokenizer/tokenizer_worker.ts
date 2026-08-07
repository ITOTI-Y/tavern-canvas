import { AutoTokenizer, env } from "@huggingface/transformers";

import {
  is_tokenizer_worker_request,
  strip_novelai_weight_syntax,
  type TokenizerErrorResponse,
  type TokenizerResultResponse,
} from "./tokenizer_protocol.js";

// Directory name under apps/extension/public/tokenizers/ (and the AutoTokenizer model id passed
// to from_pretrained) this module loads from. See SOURCE.json alongside the bundled assets for
// the pinned upstream model/revision/checksums this directory was downloaded from.
const TOKENIZER_MODEL_ID = "novelai";

type NovelAiTokenizer = Awaited<ReturnType<typeof AutoTokenizer.from_pretrained>>;

export class TokenizerLoadError extends Error {
  constructor(message: string, options?: { readonly cause?: unknown }) {
    super(message, options);
    this.name = "TokenizerLoadError";
  }
}

/**
 * Owns lazy tokenizer loading and token counting, decoupled from any Worker/DOM plumbing so it is
 * directly testable against the real bundled assets (tokenizer_service.test.ts) without spinning
 * up an actual Worker thread. The load promise is created on the first count_tokens() call, never
 * at construction, and a failure is cached permanently for this instance's lifetime rather than
 * retried: the assets are static bundled files, so a load failure here means a missing or corrupt
 * asset, not a transient condition. Mirrors VocabularyClient's permanent #init_error
 * (apps/extension/src/modules/vocabulary/vocabulary_client.ts) rather than retrying blindly.
 */
export class TokenizerEngine {
  #tokenizer_promise: Promise<NovelAiTokenizer> | null = null;
  readonly #load: () => Promise<NovelAiTokenizer>;

  constructor(load: () => Promise<NovelAiTokenizer>) {
    this.#load = load;
  }

  async count_tokens(prompt: string): Promise<number> {
    const tokenizer = await this.#ensure_loaded();
    // PreTrainedTokenizer's call signature is synchronous (tokenization needs no I/O, unlike
    // model inference), so this legitimately isn't a Promise -- no `await` here.
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

/**
 * Configures the env singleton for local-only loading before the first from_pretrained call
 * (transformers.js reads these at call time, not import time): remote models are disabled
 * outright, so a missing local asset fails loudly instead of silently falling back to a
 * huggingface.co fetch (roadmap rule 6 -- no remote runtime model requests).
 */
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
  // Only the real production entry point (below) reads this; test fakes never need to supply it.
  readonly location?: { readonly href: string };
}

// The bundled tokenizer assets (apps/extension/public/tokenizers/novelai) are copied verbatim to
// dist/tokenizers/novelai (vite.config.ts, copyPublicDir), while this Worker script is pinned to
// dist/workers/*.js (vite.config.ts's worker.rolldownOptions.output) -- so from the Worker's own
// self.location, the tokenizers directory is always exactly one directory up. Mirrors
// resolve_bundled_baseline_base_url in apps/extension/src/workers/vocabulary_worker.ts.
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

/**
 * Wires the engine to a real (or fake, in tests) Worker message scope. Validates every inbound
 * message against the protocol type guard before touching the engine, and always answers with
 * either a result or an error response -- never lets a rejected count_tokens() surface as an
 * unhandled rejection inside the Worker.
 */
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

// Purely synchronous: constructing the engine and registering the listener never touches the
// network or the filesystem. AutoTokenizer.from_pretrained only runs on the first inbound
// count_tokens message (TokenizerEngine#ensure_loaded), so the Worker stays lazy even after the
// Worker thread itself has started.
if (typeof self !== "undefined" && typeof self.postMessage === "function") {
  const engine = new TokenizerEngine(
    create_local_tokenizer_loader(resolve_bundled_tokenizer_base_url(self)),
  );
  start_tokenizer_worker(engine, self);
}
