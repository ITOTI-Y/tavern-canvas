import type { VocabularyMatchKind, VocabularyWorkerResponse } from "@tavern-canvas/contracts";
import { detect_shard_memory_mode } from "@tavern-canvas/vocabulary";

// Stage 05 benchmark harness (runs on the page/main thread, bundled by Vite
// -- see tests/harness/vite.config.ts). Drives two real Web Workers:
//
// - "primary": `new Worker(new URL(".../vocabulary_worker.ts", ...))`
//   against the REAL, unmodified production entry point. This is both the
//   benchmark vehicle and the end-to-end Worker-to-URL wiring proof (no
//   `new Worker()` call site existed anywhere in the codebase before Task 6
//   -- see task-5-report.md's concern #1). It resolves its own LRU budget
//   from navigator.deviceMemory, exactly as production does.
// - "secondary": a thin entry (vocabulary_benchmark_worker_{mobile,desktop}.ts)
//   that reuses the same real exported engine with the memory_mode the
//   primary did NOT resolve, so the 16 MiB and 64 MiB budgets are BOTH
//   proven whatever the environment reports. Stage 05 Task 6 assumed
//   navigator.deviceMemory was unavailable here and therefore that the
//   primary ran on the mobile budget; it is in fact reported as 16, so that
//   run measured the desktop budget twice and never exercised the mobile
//   one. Picking the complement removes the environment dependency.
//
// Correctness and timing are measured entirely inside this module so a
// single trigger call from Playwright captures everything (see
// tests/e2e/vocabulary_performance.spec.ts's polling wrapper -- a
// `page.evaluate()` that itself awaits this whole run is unreliable in
// some environments, so Playwright fires this off and polls a `window`
// flag instead of awaiting it directly). Playwright separately polls each
// Worker's own LRU resident-byte high-water mark and configured budget via
// `Worker.evaluate()` while this runs.
//
// `request_id` MUST be a bare UUID (`crypto.randomUUID()`): the frozen
// protocol's `RequestIdSchema` is `UuidSchema` (packages/contracts/src/ids.ts).
// `VocabularyWorkerRequestSchema.safeParse` silently drops any message
// whose `request_id` fails that check (start_vocabulary_worker: "No
// request_id to correlate an error response to; drop silently") -- no
// error, no response, ever. A prefixed id like `bench-<uuid>` reproduces
// as an indefinite hang with zero Worker responses, which is easy to
// misdiagnose as a bundler or environment bug (it was, at length, during
// Task 6) rather than a malformed request silently rejected by design.

export interface QueryOracle {
  readonly query: string;
  readonly bucket: "prefix" | "content_fuzzy" | "exact" | "hot";
  readonly subtype: string;
  readonly expected_match_kind: VocabularyMatchKind;
  readonly expected_display_text: string;
}

export interface BenchmarkConfig {
  readonly warmup_query: QueryOracle;
  readonly prefix_queries: readonly QueryOracle[];
  readonly content_fuzzy_queries: readonly QueryOracle[];
  readonly exact_queries: readonly QueryOracle[];
  readonly hot_query: QueryOracle;
}

export interface QueryMeasurement {
  readonly query: string;
  readonly subtype: string;
  readonly duration_ms: number;
  readonly first_partial_ms: number | null;
  readonly correct: boolean;
  readonly actual_display_text: string | null;
  readonly actual_match_kind: string | null;
  readonly error: string | null;
}

export interface WorkerRunResult {
  readonly label: string;
  readonly package_id: string;
  readonly data_version: string;
  readonly record_count: number;
  readonly bootstrap_ms: number;
  readonly warmup_ms: number;
  readonly prefix: readonly QueryMeasurement[];
  readonly content_fuzzy: readonly QueryMeasurement[];
  readonly exact: readonly QueryMeasurement[];
  readonly hot: readonly QueryMeasurement[];
}

export interface LongTaskEntry {
  readonly name: string;
  readonly duration: number;
  readonly startTime: number;
}

export interface BenchmarkResult {
  readonly primary_memory_mode: string;
  readonly secondary_memory_mode: string;
  readonly primary: WorkerRunResult;
  readonly secondary: WorkerRunResult;
  readonly long_tasks: readonly LongTaskEntry[];
}

interface ReadyInfo {
  readonly package_id: string;
  readonly data_version: string;
  readonly record_count: number;
}

interface QueryPage {
  readonly results: readonly {
    readonly display_text: string;
    readonly match_kind: string;
  }[];
  readonly first_partial_ms: number | null;
}

interface PendingQuery {
  readonly resolve: (page: QueryPage) => void;
  readonly reject: (error: unknown) => void;
  readonly start_time: number;
  first_partial_at: number | null;
}

function is_worker_response(value: unknown): value is VocabularyWorkerResponse {
  return typeof value === "object" && value !== null && "type" in value;
}

/**
 * Turns an already-settled query outcome into the reported DTO -- pure
 * data, never touches the Worker.
 *
 * "typo" and "prefix3" probes are checked by membership (the expected
 * record appears somewhere in the result page); every other subtype by
 * strict top-1.
 *
 * - "typo": trigram-tier candidates all carry the same match tier, so the
 *   final rank among them is decided purely by (real, hydrated)
 *   popularity -- exactly like any other tier, but trigram is the one
 *   tier with no stronger signal to fall back on. A typo query's
 *   designated target can therefore be legitimately outranked by a
 *   different, unrelated, higher-popularity record that also happens to
 *   share a trigram with the query (coincidental 3-gram collisions among
 *   a 500,000-record corpus are common, not a ranker bug).
 * - "prefix3": a prefix3 group's key (e.g. "aax") is a strict text
 *   superset match of its parent prefix2 group's key ("aa") -- every
 *   prefix3 group is nested inside exactly one prefix2 group. The
 *   designated winner of that PARENT prefix2 group is therefore also a
 *   legitimate prefix-tier candidate for the prefix3 query whenever its
 *   own tag happens to start with the (longer) prefix3 text too, and
 *   since every prefix2 sentinel is assigned before (and is therefore
 *   larger than) every prefix3 sentinel (generate_benchmark_fixture.ts
 *   processes all prefix2 groups first, precisely so a prefix2 query can
 *   never be hijacked by a nested prefix3 winner), that parent winner can
 *   legitimately outrank the prefix3 group's own winner. Both directions
 *   can't be made strict simultaneously without per-pair coordination
 *   this fixture does not attempt; membership still proves the prefix
 *   phase found the right record.
 *
 * "prefix2", "exact", "alias", "translation", and "hot" have no such
 * competing tier reachable (hot: an empty query only ever produces
 * hot-tier candidates; prefix2: no group is nested inside it), so strict
 * top-1 remains the correct, provable criterion for them.
 */
function to_measurement(
  oracle: QueryOracle,
  duration_ms: number,
  page: QueryPage | null,
  error: string | null,
): QueryMeasurement {
  const top = page?.results[0] ?? null;
  const matches = (entry: QueryPage["results"][number]) =>
    entry.display_text === oracle.expected_display_text &&
    entry.match_kind === oracle.expected_match_kind;
  const checked_by_membership = oracle.subtype === "typo" || oracle.subtype === "prefix3";
  const correct =
    error === null &&
    page !== null &&
    (checked_by_membership ? page.results.some(matches) : top !== null && matches(top));

  return {
    query: oracle.query,
    subtype: oracle.subtype,
    duration_ms,
    first_partial_ms: page?.first_partial_ms ?? null,
    correct,
    actual_display_text: top?.display_text ?? null,
    actual_match_kind: top?.match_kind ?? null,
    error,
  };
}

/** Runs the measured query sequence (warmup + all four buckets) against an already-initialized driver. Touches no Worker API directly. */
async function run_measured_queries(
  config: BenchmarkConfig,
  send_query: (text: string) => Promise<QueryPage>,
): Promise<{
  readonly warmup_ms: number;
  readonly prefix: QueryMeasurement[];
  readonly content_fuzzy: QueryMeasurement[];
  readonly exact: QueryMeasurement[];
  readonly hot: QueryMeasurement[];
}> {
  async function measure(oracle: QueryOracle): Promise<QueryMeasurement> {
    const start = performance.now();
    let page: QueryPage | null = null;
    let error: string | null = null;
    try {
      page = await send_query(oracle.query);
    } catch (query_error) {
      error = query_error instanceof Error ? query_error.message : String(query_error);
    }
    return to_measurement(oracle, performance.now() - start, page, error);
  }

  const warmup_start = performance.now();
  await send_query(config.warmup_query.query);
  const warmup_ms = performance.now() - warmup_start;

  const prefix: QueryMeasurement[] = [];
  for (const oracle of config.prefix_queries) {
    prefix.push(await measure(oracle));
  }

  const content_fuzzy: QueryMeasurement[] = [];
  for (const oracle of config.content_fuzzy_queries) {
    content_fuzzy.push(await measure(oracle));
  }

  const exact: QueryMeasurement[] = [];
  for (const oracle of config.exact_queries) {
    exact.push(await measure(oracle));
  }

  const hot: QueryMeasurement[] = [await measure(config.hot_query)];

  return { warmup_ms, prefix, content_fuzzy, exact, hot };
}

/**
 * Drives an already-constructed real Worker through the frozen postMessage
 * protocol: initialize -> warmup -> the full measured query suite ->
 * dispose. The Worker itself is constructed by the caller because Vite only
 * bundles a worker when it sees a literal `new Worker(new URL("./literal",
 * import.meta.url))` at the call site.
 */
async function run_worker_suite(
  label: string,
  worker: Worker,
  config: BenchmarkConfig,
): Promise<WorkerRunResult> {
  const pending = new Map<string, PendingQuery>();

  const bootstrap_start = performance.now();
  const ready_promise = new Promise<ReadyInfo>((resolve) => {
    worker.addEventListener("message", (event: MessageEvent) => {
      const data: unknown = event.data;
      if (!is_worker_response(data)) {
        return;
      }
      if (data.type === "ready") {
        resolve({
          package_id: data.package_id,
          data_version: data.data_version,
          record_count: data.record_count,
        });
        return;
      }
      const entry = pending.get(data.request_id);
      if (entry === undefined) {
        return;
      }
      if (data.type === "partial_results") {
        entry.first_partial_at ??= performance.now();
        return;
      }
      if (data.type === "complete") {
        pending.delete(data.request_id);
        entry.resolve({
          results: data.results,
          first_partial_ms:
            entry.first_partial_at === null ? null : entry.first_partial_at - entry.start_time,
        });
        return;
      }
      if (data.type === "error") {
        pending.delete(data.request_id);
        entry.reject(new Error(`${data.code}: ${data.message}`));
      }
    });
    worker.postMessage({ type: "initialize", request_id: crypto.randomUUID() });
  });

  function send_query(text: string): Promise<QueryPage> {
    const request_id = crypto.randomUUID();
    return new Promise<QueryPage>((resolve, reject) => {
      pending.set(request_id, {
        resolve,
        reject,
        start_time: performance.now(),
        first_partial_at: null,
      });
      worker.postMessage({ type: "query", request_id, query: text });
    });
  }

  const ready = await ready_promise;
  const bootstrap_ms = performance.now() - bootstrap_start;

  const { warmup_ms, prefix, content_fuzzy, exact, hot } = await run_measured_queries(
    config,
    send_query,
  );

  worker.postMessage({ type: "dispose", request_id: crypto.randomUUID() });
  worker.terminate();

  return {
    label,
    package_id: ready.package_id,
    data_version: ready.data_version,
    record_count: ready.record_count,
    bootstrap_ms,
    warmup_ms,
    prefix,
    content_fuzzy,
    exact,
    hot,
  };
}

async function run_full_benchmark(config: BenchmarkConfig): Promise<BenchmarkResult> {
  const long_tasks: LongTaskEntry[] = [];
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      long_tasks.push({ name: entry.name, duration: entry.duration, startTime: entry.startTime });
    }
  });
  observer.observe({ entryTypes: ["longtask"] });

  // "unknown" and "mobile" both resolve to the 16 MiB budget
  // (resolve_shard_lru_budget_bytes), so the complement of either is
  // "desktop".
  const primary_memory_mode = detect_shard_memory_mode();
  const secondary_memory_mode = primary_memory_mode === "desktop" ? "mobile" : "desktop";

  // Sequenced, not concurrent: the secondary worker's initialize() must run
  // after the primary worker's package bootstrap has activated a package in
  // IndexedDB, so it finds an already-active package (PackageStoreShardByteSource
  // skips its own PackageUpdater.update() call in that case) instead of
  // racing a second concurrent bootstrap into the same namespace.
  const primary = await run_worker_suite(
    `primary (production entry, ${primary_memory_mode})`,
    new Worker(new URL("../../apps/extension/src/workers/vocabulary_worker.ts", import.meta.url), {
      type: "module",
    }),
    config,
  );
  const secondary = await run_worker_suite(
    `secondary (${secondary_memory_mode})`,
    secondary_memory_mode === "desktop"
      ? new Worker(new URL("./vocabulary_benchmark_worker_desktop.ts", import.meta.url), {
          type: "module",
        })
      : new Worker(new URL("./vocabulary_benchmark_worker_mobile.ts", import.meta.url), {
          type: "module",
        }),
    config,
  );

  observer.disconnect();

  return { primary_memory_mode, secondary_memory_mode, primary, secondary, long_tasks };
}

declare global {
  interface Window {
    __vocabulary_benchmark__: {
      run_full_benchmark: typeof run_full_benchmark;
    };
  }
}

window.__vocabulary_benchmark__ = { run_full_benchmark };
