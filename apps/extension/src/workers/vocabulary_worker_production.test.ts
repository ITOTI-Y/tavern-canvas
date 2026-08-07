import "fake-indexeddb/auto";

import { deleteDB } from "idb";
import { afterEach, describe, expect, it, vi } from "vitest";

import type { VocabularyShardEntry, VocabularyWorkerResponse } from "@tavern-canvas/contracts";
import { DATABASE_NAME, dispose_database, open_database } from "@tavern-canvas/storage";
import { VocabularyPackageStore } from "@tavern-canvas/vocabulary";

import {
  PackageStoreShardByteSource,
  resolve_bundled_baseline_base_url,
  with_activation_lifecycle,
  type WorkerScopeLike,
} from "./vocabulary_worker.js";

// Covers task-5-brief.md controller pre-ruling #5: the production
// ShardByteSource wiring and the activation-after-first-successful-query
// lifecycle. VocabularyWorkerEngine/start_vocabulary_worker themselves are
// covered by vocabulary_worker.test.ts and stay untouched by this task.

const NAMESPACE = "vocabulary";

async function close_test_database(): Promise<void> {
  await dispose_database();
  await deleteDB(DATABASE_NAME);
}

afterEach(async () => {
  await close_test_database();
});

async function seed_active_package(store: VocabularyPackageStore): Promise<void> {
  const shard_entry: VocabularyShardEntry = {
    shard_id: "hot:global",
    package_id: "tavern-canvas-baseline",
    kind: "hot",
    path: "hot/global.msgpack.gz",
    sha256: "e".repeat(64),
    byte_length: 2,
  };
  const staged = await store.create_staging_package({
    package_id: "tavern-canvas-baseline",
    schema_version: 1,
    data_version: "1.0.0",
    changelog: "initial",
    record_count: 0,
    compressed_size: 0,
    minimum_extension_version: "0.0.0",
    shards: [shard_entry],
  });
  await store.put_shard_content(staged, shard_entry, new Uint8Array([1, 2]));
  await store.mark_ready(staged.record_id);
  await store.activate(staged.record_id);
}

function fake_scope(overrides: Partial<WorkerScopeLike> = {}): WorkerScopeLike {
  return {
    postMessage: vi.fn(),
    addEventListener: vi.fn(),
    ...overrides,
  };
}

describe("resolve_bundled_baseline_base_url", () => {
  it("resolves the baseline directory one level up from the worker's own script location", () => {
    const scope = fake_scope({
      location: { href: "https://example.com/dist/workers/vocabulary_worker.js" },
    });
    expect(resolve_bundled_baseline_base_url(scope)).toBe(
      "https://example.com/dist/vocabulary/baseline/",
    );
  });

  it("throws when self.location is unavailable", () => {
    const scope = fake_scope();
    expect(() => resolve_bundled_baseline_base_url(scope)).toThrow(/location is unavailable/u);
  });
});

describe("PackageStoreShardByteSource", () => {
  it("does not touch IndexedDB at construction time", () => {
    // No fake-indexeddb interaction should be observable here: constructing
    // does not call open_database. If it did, this synchronous call would
    // need to be async and would otherwise throw in a real Worker global
    // scope before the module even finishes evaluating (the regression this
    // test guards against).
    expect(
      () =>
        new PackageStoreShardByteSource(
          fake_scope({
            location: { href: "https://example.com/dist/workers/vocabulary_worker.js" },
          }),
        ),
    ).not.toThrow();
  });

  it("bootstraps from the bundled baseline on first use when no package is active yet", async () => {
    const database = await open_database();
    const scope = fake_scope({
      location: { href: "https://example.com/dist/workers/vocabulary_worker.js" },
    });
    const original_fetch = globalThis.fetch;
    globalThis.fetch = vi.fn((input: RequestInfo | URL) => {
      // PackageClient always calls fetch with a resolved URL object
      // (package_client.ts's resolve_relative), never a bare string or a
      // Request -- narrowing directly keeps this fake honest about that.
      if (!(input instanceof URL)) {
        throw new TypeError("expected fetch to be called with a URL");
      }
      const url = input.href;
      if (url.endsWith("manifest.json")) {
        return Promise.resolve(
          new Response(
            JSON.stringify({
              package_id: "tavern-canvas-baseline",
              schema_version: 1,
              data_version: "1.0.0",
              changelog: "initial",
              record_count: 0,
              compressed_size: 0,
              minimum_extension_version: "0.0.0",
              shards: [
                {
                  shard_id: "hot:global",
                  package_id: "tavern-canvas-baseline",
                  kind: "hot",
                  path: "hot/global.msgpack.gz",
                  sha256: "e".repeat(64),
                  byte_length: 0,
                },
              ],
            }),
            { status: 200 },
          ),
        );
      }
      return Promise.resolve(new Response(new Uint8Array(), { status: 404 }));
    }) as typeof fetch;

    try {
      const byte_source = new PackageStoreShardByteSource(scope);
      await expect(byte_source.manifest()).rejects.toThrow();
      // The manifest fetch above always 404s (no real shard bytes fixture),
      // so the update itself fails -- but bootstrapping must still have
      // *attempted* the bundled fetch against the URL this class computed,
      // proving the wiring reaches PackageUpdater.update() rather than
      // silently no-op-ing.
      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.objectContaining({
          href: "https://example.com/dist/vocabulary/baseline/manifest.json",
        }),
        expect.anything(),
      );

      const store = new VocabularyPackageStore(database, NAMESPACE);
      expect(await store.list_packages()).toHaveLength(0);
    } finally {
      globalThis.fetch = original_fetch;
    }
  });

  it("skips the bundled fetch once a package is already active", async () => {
    const database = await open_database();
    const store = new VocabularyPackageStore(database, NAMESPACE);
    await seed_active_package(store);

    const original_fetch = globalThis.fetch;
    const fetch_spy = vi.fn();
    globalThis.fetch = fetch_spy as unknown as typeof fetch;

    try {
      const scope = fake_scope({
        location: { href: "https://example.com/dist/workers/vocabulary_worker.js" },
      });
      const byte_source = new PackageStoreShardByteSource(scope);
      const result = await byte_source.manifest();
      expect(result.package_id).toBe("tavern-canvas-baseline");
      expect(fetch_spy).not.toHaveBeenCalled();
    } finally {
      globalThis.fetch = original_fetch;
    }
  });

  it("confirms the active package after report_query_success", async () => {
    const database = await open_database();
    const store = new VocabularyPackageStore(database, NAMESPACE);
    await seed_active_package(store);

    const scope = fake_scope({
      location: { href: "https://example.com/dist/workers/vocabulary_worker.js" },
    });
    const byte_source = new PackageStoreShardByteSource(scope);
    await byte_source.manifest();

    expect((await store.find_active_or_confirmed())?.state).toBe("active");
    await byte_source.report_query_success();
    expect((await store.find_active_or_confirmed())?.state).toBe("confirmed");
  });
});

describe("with_activation_lifecycle", () => {
  function response_scope(): { scope: WorkerScopeLike; forwarded: unknown[] } {
    const forwarded: unknown[] = [];
    return {
      scope: fake_scope({
        postMessage: (message: unknown) => {
          forwarded.push(message);
        },
      }),
      forwarded,
    };
  }

  it("calls report_query_success on a complete response and still forwards it", () => {
    const { scope, forwarded } = response_scope();
    const report_query_success = vi.fn().mockResolvedValue(undefined);
    const byte_source = {
      report_query_success,
      report_query_failure: vi.fn(),
    } as unknown as PackageStoreShardByteSource;

    const wrapped = with_activation_lifecycle(scope, byte_source);
    const response: VocabularyWorkerResponse = {
      type: "complete",
      request_id: "00000000-0000-4000-8000-000000000001",
      results: [],
      next_cursor: null,
    };
    wrapped.postMessage(response);

    expect(report_query_success).toHaveBeenCalledOnce();
    expect(forwarded).toEqual([response]);
  });

  it("calls report_query_failure on a package_unavailable error", () => {
    const { scope, forwarded } = response_scope();
    const report_query_failure = vi.fn().mockResolvedValue(null);
    const byte_source = {
      report_query_success: vi.fn(),
      report_query_failure,
    } as unknown as PackageStoreShardByteSource;

    const wrapped = with_activation_lifecycle(scope, byte_source);
    const response: VocabularyWorkerResponse = {
      type: "error",
      request_id: "00000000-0000-4000-8000-000000000002",
      code: "package_unavailable",
      message: "no active package",
    };
    wrapped.postMessage(response);

    expect(report_query_failure).toHaveBeenCalledOnce();
    expect(forwarded).toEqual([response]);
  });

  it("does not reselect on a cancelled or protocol-misuse error", () => {
    const { scope } = response_scope();
    const report_query_failure = vi.fn();
    const byte_source = {
      report_query_success: vi.fn(),
      report_query_failure,
    } as unknown as PackageStoreShardByteSource;

    const wrapped = with_activation_lifecycle(scope, byte_source);
    for (const code of ["cancelled", "not_ready", "invalid_request"] as const) {
      wrapped.postMessage({
        type: "error",
        request_id: "00000000-0000-4000-8000-000000000003",
        code,
        message: "x",
      } satisfies VocabularyWorkerResponse);
    }

    expect(report_query_failure).not.toHaveBeenCalled();
  });

  it("attaches a rejection handler to report_query_success instead of leaving it bare", async () => {
    // A direct check that `.catch` is actually invoked on the returned
    // promise, rather than relying on the platform's unhandled-rejection
    // event -- that event's channel differs between Node (`process`
    // 'unhandledRejection') and the browser/happy-dom ('unhandledrejection'
    // on the global), and proved unreliable to observe deterministically
    // inside this test environment either way.
    const { scope } = response_scope();
    const inner_promise = Promise.reject(new Error("indexeddb write failed"));
    let catch_was_called = false;
    const tracked_promise = {
      then: inner_promise.then.bind(inner_promise),
      catch: (handler: (error: unknown) => void) => {
        catch_was_called = true;
        return inner_promise.catch(handler);
      },
      finally: inner_promise.finally.bind(inner_promise),
      [Symbol.toStringTag]: "Promise",
    } as unknown as Promise<void>;
    const report_query_success = vi.fn().mockReturnValue(tracked_promise);
    const byte_source = {
      report_query_success,
      report_query_failure: vi.fn(),
    } as unknown as PackageStoreShardByteSource;

    const wrapped = with_activation_lifecycle(scope, byte_source);
    wrapped.postMessage({
      type: "complete",
      request_id: "00000000-0000-4000-8000-000000000005",
      results: [],
      next_cursor: null,
    } satisfies VocabularyWorkerResponse);
    await Promise.resolve();

    expect(catch_was_called).toBe(true);
  });

  it("ignores a ready response (no request_id, not a package-health signal)", () => {
    const { scope, forwarded } = response_scope();
    const report_query_success = vi.fn();
    const byte_source = {
      report_query_success,
      report_query_failure: vi.fn(),
    } as unknown as PackageStoreShardByteSource;

    const wrapped = with_activation_lifecycle(scope, byte_source);
    const response: VocabularyWorkerResponse = {
      type: "ready",
      package_id: "tavern-canvas-baseline",
      data_version: "1.0.0",
      record_count: 0,
    };
    wrapped.postMessage(response);

    expect(report_query_success).not.toHaveBeenCalled();
    expect(forwarded).toEqual([response]);
  });
});
