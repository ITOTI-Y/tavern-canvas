// @vitest-environment node
//
// Forced to the "node" environment (overriding the "apps" vitest project's happy-dom default):
// the real-asset tests below load the actual pinned tokenizer via a Node filesystem path, which
// @huggingface/transformers only takes when it detects a Node-like environment.
import path from "node:path";
import { fileURLToPath } from "node:url";

import { afterEach, describe, expect, it } from "vitest";

import {
  is_tokenizer_worker_request,
  is_tokenizer_worker_response,
  strip_novelai_weight_syntax,
  type TokenizerWorkerRequest,
  type TokenizerWorkerResponse,
} from "./tokenizer_protocol.js";
import { TokenizerService, type TokenizerWorkerHandle } from "./tokenizer_service.js";
import {
  create_local_tokenizer_loader,
  start_tokenizer_worker,
  TokenizerEngine,
  TokenizerLoadError,
} from "./tokenizer_worker.js";

const TEST_FILE_DIR = path.dirname(fileURLToPath(import.meta.url));
// apps/extension/src/modules/novelai/tokenizer -> apps/extension, then into public/tokenizers --
// the real committed assets this whole module ships (SOURCE.json records their pinned
// model/revision/checksums).
const LOCAL_TOKENIZER_BASE_URL =
  path.join(TEST_FILE_DIR, "..", "..", "..", "..", "public", "tokenizers") + "/";
const MISSING_TOKENIZER_BASE_URL =
  path.join(TEST_FILE_DIR, "..", "..", "..", "..", "public", "tokenizers-missing") + "/";

class FakeWorker implements TokenizerWorkerHandle {
  readonly posted: TokenizerWorkerRequest[] = [];
  terminated = false;
  readonly #handlers: ((event: { data: unknown }) => void)[] = [];

  postMessage(message: unknown): void {
    this.posted.push(message as TokenizerWorkerRequest);
  }

  terminate(): void {
    this.terminated = true;
  }

  addEventListener(_type: "message", handler: (event: { data: unknown }) => void): void {
    this.#handlers.push(handler);
  }

  emit(response: TokenizerWorkerResponse): void {
    for (const handler of this.#handlers) {
      handler({ data: response });
    }
  }
}

function last_request(worker: FakeWorker): TokenizerWorkerRequest {
  const request = worker.posted.at(-1);
  if (request === undefined) {
    throw new Error("expected a request to have been posted");
  }
  return request;
}

describe("strip_novelai_weight_syntax", () => {
  it("strips numeric weight::tag:: emphasis syntax", () => {
    expect(strip_novelai_weight_syntax("1.5::masterpiece::")).toBe("masterpiece");
    expect(strip_novelai_weight_syntax("-0.8::feet::")).toBe("feet");
  });

  it("strips grouping brackets and braces", () => {
    expect(strip_novelai_weight_syntax("[worst quality], {bad anatomy}")).toBe(
      "worst quality, bad anatomy",
    );
  });

  it("collapses newlines to spaces", () => {
    expect(strip_novelai_weight_syntax("a\nb\r\nc")).toBe("a b c");
  });

  it("combines all rules the way legacy calculateNovelAITokens did", () => {
    expect(strip_novelai_weight_syntax("1.5::masterpiece::, [worst quality], {bad anatomy}")).toBe(
      "masterpiece, worst quality, bad anatomy",
    );
  });
});

describe("tokenizer_protocol type guards", () => {
  it("accepts a well-formed count_tokens request", () => {
    expect(
      is_tokenizer_worker_request({ type: "count_tokens", request_id: "a", prompt: "hi" }),
    ).toBe(true);
  });

  it("rejects malformed or foreign requests", () => {
    expect(is_tokenizer_worker_request(null)).toBe(false);
    expect(is_tokenizer_worker_request({ type: "count_tokens", request_id: "a" })).toBe(false);
    expect(is_tokenizer_worker_request({ type: "query", request_id: "a" })).toBe(false);
  });

  it("accepts well-formed result and error responses", () => {
    expect(is_tokenizer_worker_response({ type: "result", request_id: "a", token_count: 3 })).toBe(
      true,
    );
    expect(
      is_tokenizer_worker_response({
        type: "error",
        request_id: "a",
        code: "tokenizer_unavailable",
        message: "boom",
      }),
    ).toBe(true);
  });

  it("rejects malformed responses", () => {
    expect(is_tokenizer_worker_response({ type: "result", request_id: "a" })).toBe(false);
    expect(is_tokenizer_worker_response({ type: "error", request_id: "a", code: "other" })).toBe(
      false,
    );
  });
});

describe("TokenizerService (fake Worker -- protocol and lifecycle)", () => {
  it("does not create a Worker at construction time", () => {
    let create_calls = 0;
    new TokenizerService({
      create_worker: () => {
        create_calls += 1;
        return new FakeWorker();
      },
    });
    expect(create_calls).toBe(0);
  });

  it("creates exactly one Worker for the first count_tokens() call", () => {
    let create_calls = 0;
    const worker = new FakeWorker();
    const service = new TokenizerService({
      create_worker: () => {
        create_calls += 1;
        return worker;
      },
    });
    void service.count_tokens("hello");
    expect(create_calls).toBe(1);
    expect(worker.posted).toHaveLength(1);
    expect(last_request(worker)).toMatchObject({ type: "count_tokens", prompt: "hello" });
  });

  it("shares the single Worker across concurrent count_tokens() calls instead of creating another", () => {
    let create_calls = 0;
    const worker = new FakeWorker();
    const service = new TokenizerService({
      create_worker: () => {
        create_calls += 1;
        return worker;
      },
    });
    void service.count_tokens("a");
    void service.count_tokens("b");
    void service.count_tokens("c");
    expect(create_calls).toBe(1);
    expect(worker.posted).toHaveLength(3);
    const request_ids = new Set(worker.posted.map((request) => request.request_id));
    expect(request_ids.size).toBe(3);
  });

  it("resolves concurrent requests independently, correlated by request_id", async () => {
    const worker = new FakeWorker();
    const service = new TokenizerService({ create_worker: () => worker });
    const first = service.count_tokens("a");
    const second = service.count_tokens("b");
    const [first_request, second_request] = worker.posted;
    if (first_request === undefined || second_request === undefined) {
      throw new Error("expected two posted requests");
    }
    // Answer out of order to prove correlation isn't positional.
    worker.emit({ type: "result", request_id: second_request.request_id, token_count: 2 });
    worker.emit({ type: "result", request_id: first_request.request_id, token_count: 1 });
    await expect(first).resolves.toEqual({ status: "ok", token_count: 1 });
    await expect(second).resolves.toEqual({ status: "ok", token_count: 2 });
  });

  it("resolves to a tokenizer_unavailable error result on a Worker error response, never rejecting", async () => {
    const worker = new FakeWorker();
    const service = new TokenizerService({ create_worker: () => worker });
    const pending = service.count_tokens("a");
    const request = last_request(worker);
    worker.emit({
      type: "error",
      request_id: request.request_id,
      code: "tokenizer_unavailable",
      message: "asset missing",
    });
    await expect(pending).resolves.toEqual({
      status: "error",
      code: "tokenizer_unavailable",
      message: "asset missing",
    });
  });

  it("ignores responses for unknown or already-settled request ids", async () => {
    const worker = new FakeWorker();
    const service = new TokenizerService({ create_worker: () => worker });
    const pending = service.count_tokens("a");
    worker.emit({ type: "result", request_id: "unrelated-id", token_count: 99 });
    worker.emit({
      type: "result",
      request_id: last_request(worker).request_id,
      token_count: 5,
    });
    await expect(pending).resolves.toEqual({ status: "ok", token_count: 5 });
  });

  it("dispose() terminates the Worker and settles pending requests as cancelled", async () => {
    const worker = new FakeWorker();
    const service = new TokenizerService({ create_worker: () => worker });
    const pending = service.count_tokens("a");
    service.dispose();
    expect(worker.terminated).toBe(true);
    await expect(pending).resolves.toMatchObject({ status: "error", code: "cancelled" });
  });

  it("resolves count_tokens() as cancelled after dispose(), without ever creating a Worker", async () => {
    let create_calls = 0;
    const service = new TokenizerService({
      create_worker: () => {
        create_calls += 1;
        return new FakeWorker();
      },
    });
    service.dispose();
    const result = await service.count_tokens("a");
    expect(result).toMatchObject({ status: "error", code: "cancelled" });
    expect(create_calls).toBe(0);
  });

  it("dispose() is idempotent", () => {
    const worker = new FakeWorker();
    const service = new TokenizerService({ create_worker: () => worker });
    void service.count_tokens("a");
    service.dispose();
    expect(() => {
      service.dispose();
    }).not.toThrow();
    expect(worker.terminated).toBe(true);
  });
});

describe("TokenizerEngine (real pinned tokenizer, real local assets, no fake Worker)", () => {
  const ORIGINAL_FETCH = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = ORIGINAL_FETCH;
  });

  // Golden values recorded from the actual pinned Xenova/t5-small tokenizer.json/
  // tokenizer_config.json committed at apps/extension/public/tokenizers/novelai/ (see SOURCE.json
  // for the pinned model/revision/checksums). Regression fixture: a broken or swapped asset would
  // silently change these counts.
  const fixed_prompts: readonly [prompt: string, expected_token_count: number][] = [
    ["1girl, masterpiece, best quality", 8],
    ["1.5::masterpiece::, [worst quality], {bad anatomy}", 8],
    ["a serene mountain landscape at sunset, highly detailed, 8k", 14],
    ["", 1],
    ["solo, long hair, blue eyes, school uniform, smile, looking at viewer", 17],
  ];

  it.each(fixed_prompts)(
    "counts %j as %i tokens against the committed local asset",
    async (prompt, expected_token_count) => {
      const engine = new TokenizerEngine(create_local_tokenizer_loader(LOCAL_TOKENIZER_BASE_URL));
      await expect(engine.count_tokens(prompt)).resolves.toBe(expected_token_count);
    },
  );

  it("never calls fetch while loading the tokenizer or counting tokens (no remote/network request)", async () => {
    let fetch_calls = 0;
    globalThis.fetch = ((...args: Parameters<typeof fetch>) => {
      fetch_calls += 1;
      return ORIGINAL_FETCH(...args);
    }) as typeof fetch;

    const engine = new TokenizerEngine(create_local_tokenizer_loader(LOCAL_TOKENIZER_BASE_URL));
    await engine.count_tokens("1girl, masterpiece, best quality");
    await engine.count_tokens("a second prompt to prove the cached tokenizer stays fetch-free");

    expect(fetch_calls).toBe(0);
  });

  it("loads the tokenizer exactly once for concurrent count_tokens() calls (shared init promise)", async () => {
    let loader_calls = 0;
    const raw_loader = create_local_tokenizer_loader(LOCAL_TOKENIZER_BASE_URL);
    const engine = new TokenizerEngine(() => {
      loader_calls += 1;
      return raw_loader();
    });

    const results = await Promise.all([
      engine.count_tokens("1girl, masterpiece, best quality"),
      engine.count_tokens("1girl, masterpiece, best quality"),
      engine.count_tokens("1girl, masterpiece, best quality"),
    ]);

    expect(loader_calls).toBe(1);
    expect(results).toEqual([8, 8, 8]);
  });

  it("rejects with TokenizerLoadError when the local asset directory is missing, without ever reaching the network", async () => {
    let fetch_calls = 0;
    globalThis.fetch = ((...args: Parameters<typeof fetch>) => {
      fetch_calls += 1;
      return ORIGINAL_FETCH(...args);
    }) as typeof fetch;

    const engine = new TokenizerEngine(create_local_tokenizer_loader(MISSING_TOKENIZER_BASE_URL));
    await expect(engine.count_tokens("hello")).rejects.toBeInstanceOf(TokenizerLoadError);
    expect(fetch_calls).toBe(0);
  });

  it("caches a load failure permanently rather than retrying on the next call", async () => {
    let loader_calls = 0;
    const engine = new TokenizerEngine(() => {
      loader_calls += 1;
      return Promise.reject(new Error("simulated load failure"));
    });

    await expect(engine.count_tokens("a")).rejects.toBeInstanceOf(TokenizerLoadError);
    await expect(engine.count_tokens("b")).rejects.toBeInstanceOf(TokenizerLoadError);
    expect(loader_calls).toBe(1);
  });
});

describe("TokenizerService end-to-end via start_tokenizer_worker (real engine, no DOM Worker)", () => {
  it("returns tokenizer_unavailable through the full request/response protocol on a load failure", async () => {
    // Reuses the real message-handling wiring (start_tokenizer_worker) with a failing loader,
    // proving the Worker-side error path -> "error" response -> TokenizerService's
    // tokenizer_unavailable result, end to end, without a real DOM Worker thread.
    const engine = new TokenizerEngine(() => Promise.reject(new Error("asset missing")));

    const client_handlers: ((event: { data: unknown }) => void)[] = [];
    const worker_handlers: ((event: { data: unknown }) => void)[] = [];
    const worker: TokenizerWorkerHandle = {
      postMessage(message) {
        for (const handler of worker_handlers) {
          handler({ data: message });
        }
      },
      terminate() {},
      addEventListener(_type, handler) {
        client_handlers.push(handler);
      },
    };
    const worker_scope = {
      postMessage(message: unknown) {
        for (const handler of client_handlers) {
          handler({ data: message });
        }
      },
      addEventListener(_type: "message", handler: (event: { data: unknown }) => void) {
        worker_handlers.push(handler);
      },
    };

    start_tokenizer_worker(engine, worker_scope);

    const service = new TokenizerService({ create_worker: () => worker });
    const result = await service.count_tokens("hello");
    expect(result.status).toBe("error");
    if (result.status === "error") {
      expect(result.code).toBe("tokenizer_unavailable");
      expect(result.message).toContain("asset missing");
    }
  });
});
