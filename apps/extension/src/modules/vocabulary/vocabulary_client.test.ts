import type {
  VocabularySearchResult,
  VocabularyWorkerRequest,
  VocabularyWorkerResponse,
} from "@tavern-canvas/contracts";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  VocabularyClient,
  VocabularySearchError,
  type VocabularyWorkerHandle,
} from "./vocabulary_client.js";

class FakeWorker implements VocabularyWorkerHandle {
  readonly posted: VocabularyWorkerRequest[] = [];
  terminated = false;
  readonly #handlers: ((event: { data: unknown }) => void)[] = [];
  readonly #error_handlers: ((event: { readonly message: string }) => void)[] = [];

  postMessage(message: unknown): void {
    this.posted.push(message as VocabularyWorkerRequest);
  }

  terminate(): void {
    this.terminated = true;
  }

  addEventListener(type: "message", handler: (event: { data: unknown }) => void): void;
  addEventListener(type: "error", handler: (event: { readonly message: string }) => void): void;
  addEventListener(
    type: "message" | "error",
    handler: ((event: { data: unknown }) => void) & ((event: { readonly message: string }) => void),
  ): void {
    (type === "message" ? this.#handlers : this.#error_handlers).push(handler);
  }

  fail(message: string): void {
    for (const handler of this.#error_handlers) {
      handler({ message });
    }
  }

  emit(response: VocabularyWorkerResponse): void {
    for (const handler of this.#handlers) {
      handler({ data: response });
    }
  }
}

function result(record_id: number, display_text: string): VocabularySearchResult {
  return { record_id, display_text, popularity: 0, match_kind: "exact", score: 0 };
}

function ready_client(): { client: VocabularyClient; worker: FakeWorker } {
  const worker = new FakeWorker();
  const client = new VocabularyClient({ create_worker: () => worker });
  worker.emit({ type: "ready", package_id: "baseline", data_version: "1.0.0", record_count: 5 });
  return { client, worker };
}

function last_query_request(
  worker: FakeWorker,
): Extract<VocabularyWorkerRequest, { type: "query" }> {
  const request = worker.posted.filter((entry) => entry.type === "query").at(-1);
  if (request === undefined) {
    throw new Error("expected a query request to have been posted");
  }
  return request;
}

function initialize_request(
  worker: FakeWorker,
): Extract<VocabularyWorkerRequest, { type: "initialize" }> {
  const request = worker.posted.find((entry) => entry.type === "initialize");
  if (request === undefined) {
    throw new Error("expected an initialize request to have been posted");
  }
  return request;
}

afterEach(() => {
  vi.useRealTimers();
});

describe("VocabularyClient", () => {
  it("rejects waiting lookups when the Worker script fails to load", async () => {
    const worker = new FakeWorker();
    const client = new VocabularyClient({ create_worker: () => worker });

    const lookup = client.lookup("girl");
    worker.fail("404 Not Found");

    await expect(lookup).rejects.toMatchObject({ code: "package_unavailable" });
    await expect(client.lookup("river")).rejects.toMatchObject({ code: "package_unavailable" });
  });

  it("runs several lookups at once without one cancelling another", async () => {
    const { client, worker } = ready_client();

    const first = client.lookup("girl");
    const second = client.lookup("river");
    await Promise.resolve();
    await Promise.resolve();
    const queries = worker.posted.filter((entry) => entry.type === "query");
    expect(queries.map((entry) => entry.query)).toEqual(["girl", "river"]);
    for (const [index, query] of queries.entries()) {
      worker.emit({
        type: "complete",
        request_id: query.request_id,
        results: [result(index + 1, query.query)],
        next_cursor: null,
      });
    }

    await expect(first).resolves.toMatchObject({ results: [{ display_text: "girl" }] });
    await expect(second).resolves.toMatchObject({ results: [{ display_text: "river" }] });
    expect(worker.posted.some((entry) => entry.type === "cancel")).toBe(false);
  });

  it("debounces search() calls by 120ms, sending only the last query", () => {
    vi.useFakeTimers();
    const { client, worker } = ready_client();

    client.search("a").catch(() => {});
    vi.advanceTimersByTime(50);
    client.search("ab").catch(() => {});
    vi.advanceTimersByTime(50);
    void client.search("abc");
    expect(worker.posted.some((request) => request.type === "query")).toBe(false);

    vi.advanceTimersByTime(120);
    const query_requests = worker.posted.filter((request) => request.type === "query");
    expect(query_requests).toHaveLength(1);
    expect(query_requests[0]).toMatchObject({ query: "abc" });
  });

  it("does not dispatch before 120ms of silence has elapsed", () => {
    vi.useFakeTimers();
    const { client, worker } = ready_client();
    void client.search("cat");
    vi.advanceTimersByTime(119);
    expect(worker.posted.some((request) => request.type === "query")).toBe(false);
    vi.advanceTimersByTime(1);
    expect(worker.posted.some((request) => request.type === "query")).toBe(true);
  });

  it("sends cancel for the previous request id when a new query supersedes an in-flight one", async () => {
    vi.useFakeTimers();
    const { client, worker } = ready_client();

    client.search("cat").catch(() => {});
    vi.advanceTimersByTime(120);
    const first_request = last_query_request(worker);

    void client.search("dog");
    vi.advanceTimersByTime(120);

    const cancel_requests = worker.posted.filter((request) => request.type === "cancel");
    expect(cancel_requests).toHaveLength(1);
    expect(cancel_requests[0]).toMatchObject({ target_request_id: first_request.request_id });
  });

  it("rejects a superseded search's promise with a cancelled error", async () => {
    vi.useFakeTimers();
    const { client, worker } = ready_client();

    const first = client.search("cat");
    vi.advanceTimersByTime(120);
    const second = client.search("dog");
    vi.advanceTimersByTime(120);

    await expect(first).rejects.toMatchObject({ code: "cancelled" });
    worker.emit({
      type: "complete",
      request_id: last_query_request(worker).request_id,
      results: [result(1, "dog")],
      next_cursor: null,
    });
    await expect(second).resolves.toMatchObject({ results: [result(1, "dog")] });
  });

  it("ignores a stale response for an already-superseded request", async () => {
    vi.useFakeTimers();
    const { client, worker } = ready_client();

    const first = client.search("cat");
    vi.advanceTimersByTime(120);
    const stale_request_id = last_query_request(worker).request_id;
    first.catch(() => {}); // superseded rejection is expected; silence unhandled-rejection noise

    const second = client.search("dog");
    vi.advanceTimersByTime(120);
    const current_request_id = last_query_request(worker).request_id;

    // A late response for the cancelled request must not resolve `second`.
    worker.emit({
      type: "complete",
      request_id: stale_request_id,
      results: [result(1, "cat")],
      next_cursor: null,
    });
    worker.emit({
      type: "complete",
      request_id: current_request_id,
      results: [result(2, "dog")],
      next_cursor: null,
    });

    await expect(second).resolves.toMatchObject({ results: [result(2, "dog")] });
  });

  it("resolves search() with the complete page's results and next_cursor", async () => {
    vi.useFakeTimers();
    const { client, worker } = ready_client();
    const search = client.search("cat");
    vi.advanceTimersByTime(120);
    const request_id = last_query_request(worker).request_id;

    worker.emit({
      type: "complete",
      request_id,
      results: [result(1, "cat")],
      next_cursor: "cursor-1",
    });
    await expect(search).resolves.toEqual({ results: [result(1, "cat")], next_cursor: "cursor-1" });
  });

  it("invokes on_partial before the search promise resolves", async () => {
    vi.useFakeTimers();
    const { client, worker } = ready_client();
    const partial_pages: unknown[] = [];
    const search = client.search("cat", { on_partial: (page) => partial_pages.push(page) });
    vi.advanceTimersByTime(120);
    const request_id = last_query_request(worker).request_id;

    worker.emit({ type: "partial_results", request_id, results: [result(1, "cat")] });
    expect(partial_pages).toEqual([{ results: [result(1, "cat")], next_cursor: null }]);

    worker.emit({
      type: "complete",
      request_id,
      results: [result(1, "cat"), result(2, "catalog")],
      next_cursor: null,
    });
    await expect(search).resolves.toMatchObject({
      results: [result(1, "cat"), result(2, "catalog")],
    });
  });

  it("sends next_page and resolves with the continued page", async () => {
    vi.useFakeTimers();
    const { client, worker } = ready_client();
    const page = client.next_page("cursor-1");
    const next_page_request = worker.posted.find((request) => request.type === "next_page");
    expect(next_page_request).toMatchObject({ cursor: "cursor-1" });

    worker.emit({
      type: "complete",
      request_id: (next_page_request as { request_id: string }).request_id,
      results: [result(3, "third")],
      next_cursor: null,
    });
    await expect(page).resolves.toEqual({ results: [result(3, "third")], next_cursor: null });
  });

  it("rejects on a Worker error response with the protocol error code", async () => {
    vi.useFakeTimers();
    const { client, worker } = ready_client();
    const search = client.search("cat");
    vi.advanceTimersByTime(120);
    const request_id = last_query_request(worker).request_id;

    worker.emit({ type: "error", request_id, code: "internal_error", message: "boom" });
    await expect(search).rejects.toMatchObject({ code: "internal_error" });
  });

  it("terminates the Worker and rejects pending promises with cancelled on dispose", async () => {
    vi.useFakeTimers();
    const { client, worker } = ready_client();
    const search = client.search("cat");
    vi.advanceTimersByTime(120);
    const pending_page = client.next_page("cursor-1");

    client.dispose();

    expect(worker.terminated).toBe(true);
    await expect(search).rejects.toMatchObject({ code: "cancelled" });
    await expect(pending_page).rejects.toMatchObject({ code: "cancelled" });
  });

  it("rejects search() called after dispose without touching the terminated Worker again", async () => {
    const { client, worker } = ready_client();
    client.dispose();
    await expect(client.search("cat")).rejects.toBeInstanceOf(VocabularySearchError);
    expect(worker.posted.filter((request) => request.type === "query")).toHaveLength(0);
  });

  it("rejects a search debouncing at the time initialize fails, instead of hanging forever", async () => {
    vi.useFakeTimers();
    const worker = new FakeWorker();
    const client = new VocabularyClient({ create_worker: () => worker });
    const init_request = initialize_request(worker);

    const search = client.search("cat");
    vi.advanceTimersByTime(120);

    worker.emit({
      type: "error",
      request_id: init_request.request_id,
      code: "package_unavailable",
      message: "no active package",
    });

    await expect(search).rejects.toMatchObject({ code: "package_unavailable" });
    // The failed initialize must never have let a query request through.
    expect(worker.posted.some((request) => request.type === "query")).toBe(false);
  });

  it("rejects next_page when initialize fails while it is awaiting readiness", async () => {
    const worker = new FakeWorker();
    const client = new VocabularyClient({ create_worker: () => worker });
    const init_request = initialize_request(worker);

    const page = client.next_page("cursor-1");
    worker.emit({
      type: "error",
      request_id: init_request.request_id,
      code: "package_unavailable",
      message: "no active package",
    });

    await expect(page).rejects.toMatchObject({ code: "package_unavailable" });
  });

  it("rejects search() called after initialize already failed, without hanging", async () => {
    vi.useFakeTimers();
    const worker = new FakeWorker();
    const client = new VocabularyClient({ create_worker: () => worker });
    const init_request = initialize_request(worker);

    worker.emit({
      type: "error",
      request_id: init_request.request_id,
      code: "package_unavailable",
      message: "no active package",
    });

    const search = client.search("cat");
    vi.advanceTimersByTime(120);
    await expect(search).rejects.toMatchObject({ code: "package_unavailable" });
  });
});
