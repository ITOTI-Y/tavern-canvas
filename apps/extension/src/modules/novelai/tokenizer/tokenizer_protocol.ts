// Wire protocol between tokenizer_service.ts (main thread) and tokenizer_worker.ts (Worker
// thread), plus the prompt normalization both real and fake tokenizer paths agree on. Kept free
// of any @huggingface/transformers import so tokenizer_service.ts can depend on it without
// pulling the lazy Worker module's heavy dependency into the initial bundle.

export type TokenizerErrorCode = "tokenizer_unavailable";

export interface TokenizerCountTokensRequest {
  readonly type: "count_tokens";
  readonly request_id: string;
  readonly prompt: string;
}

export type TokenizerWorkerRequest = TokenizerCountTokensRequest;

export interface TokenizerResultResponse {
  readonly type: "result";
  readonly request_id: string;
  readonly token_count: number;
}

export interface TokenizerErrorResponse {
  readonly type: "error";
  readonly request_id: string;
  readonly code: TokenizerErrorCode;
  readonly message: string;
}

export type TokenizerWorkerResponse = TokenizerResultResponse | TokenizerErrorResponse;

export function is_tokenizer_worker_request(value: unknown): value is TokenizerWorkerRequest {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const candidate = value as Partial<TokenizerCountTokensRequest>;
  return (
    candidate.type === "count_tokens" &&
    typeof candidate.request_id === "string" &&
    typeof candidate.prompt === "string"
  );
}

export function is_tokenizer_worker_response(value: unknown): value is TokenizerWorkerResponse {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const candidate = value as { readonly type?: unknown; readonly request_id?: unknown };
  if (typeof candidate.request_id !== "string") {
    return false;
  }
  if (candidate.type === "result") {
    return typeof (value as Partial<TokenizerResultResponse>).token_count === "number";
  }
  if (candidate.type === "error") {
    const error = value as Partial<TokenizerErrorResponse>;
    return error.code === "tokenizer_unavailable" && typeof error.message === "string";
  }
  return false;
}

// Mirrors legacy utils/novelaiTokenCalculator.js:22034 calculateNovelAITokens's normalization
// (st-chatu8 v2.8.1), so counts stay meaningful against the same 512-token budget the editor UI
// historically showed: strip NovelAI's own `weight::tag::` emphasis syntax and `{}`/`[]` grouping
// before counting, since none of those characters reach the model as prompt text.
export function strip_novelai_weight_syntax(prompt: string): string {
  return prompt
    .replace(/[-+]?\d*\.?\d+::/g, "")
    .replace(/::/g, "")
    .replace(/[\r\n]+/g, " ")
    .replace(/[{}[\]]/g, "");
}
