import type { VocabularyMatchKind, VocabularyWorkerResponse } from "@tavern-canvas/contracts";
import { detect_shard_memory_mode } from "@tavern-canvas/vocabulary";

// The "primary" worker is the production entry point; the "secondary" worker uses the memory_mode
// the primary did not resolve, so both the 16 MiB and 64 MiB LRU budgets are exercised.
//
// `request_id` must be a bare UUID (`crypto.randomUUID()`): the worker silently drops any message
// whose `request_id` fails `UuidSchema`, so a prefixed id shows up as a hang with no response.

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

// "typo" and "prefix3" probes are checked by membership in the result page, not top-1: unrelated records can outrank the designated target (trigram collisions, nested prefix2 winners).
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

// The Worker is constructed by the caller: Vite only bundles a worker for a literal `new Worker(new URL("./literal", import.meta.url))`.
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

  const primary_memory_mode = detect_shard_memory_mode();
  const secondary_memory_mode = primary_memory_mode === "desktop" ? "mobile" : "desktop";

  // Sequenced: the secondary worker must find the package the primary already activated, not race a second bootstrap.
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
