import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { expect, test, type Page, type Worker as PlaywrightWorker } from "@playwright/test";

import type {
  BenchmarkConfig,
  BenchmarkResult,
  QueryOracle,
} from "../harness/vocabulary_benchmark_harness.js";

// Stage 05 Task 6 gate. Drives the REAL, unmodified
// apps/extension/src/workers/vocabulary_worker.ts as an actual Web Worker
// (via tests/harness/vocabulary_benchmark_harness.ts, loaded by
// vocabulary_benchmark.html) against the 500,000-record package generated
// deterministically by generate_benchmark_fixture.ts (seed 20260804) and
// built by the real vocabulary-builder CLI -- see playwright.config.ts's
// webServer for the build/serve pipeline. Acceptance budgets are the plan's
// (docs/_dev/plans/2026-08-04-tavern-canvas-05-vocabulary.md, Task 6):
// prefix p95 <= 100 ms, content/fuzzy p95 <= 300 ms, LRU budgets 16 MiB
// (mobile) / 64 MiB (desktop), zero main-thread long tasks > 50 ms, zero
// incorrect query results.

const MOBILE_LRU_BUDGET_BYTES = 16 * 1024 * 1024;
const DESKTOP_LRU_BUDGET_BYTES = 64 * 1024 * 1024;
const PREFIX_P95_BUDGET_MS = 100;
const CONTENT_FUZZY_P95_BUDGET_MS = 300;
const MIN_MEASURED_PREFIX_QUERIES = 100;
const MIN_MEASURED_CONTENT_FUZZY_QUERIES = 100;
const RESIDENT_BYTES_POLL_INTERVAL_MS = 100;

interface KnownQueriesFile {
  readonly seed: number;
  readonly record_count: number;
  readonly queries: readonly QueryOracle[];
}

function load_known_queries(): KnownQueriesFile {
  const path = resolve(import.meta.dirname, "../../output/benchmark/known_queries.json");
  let text: string;
  try {
    text = readFileSync(path, "utf8");
  } catch (error) {
    throw new Error(
      `Cannot read ${path}. Run "pnpm --filter @tavern-canvas/vocabulary-builder generate-benchmark" ` +
        `and "build-package" first (see task-6-brief.md Step 2).`,
      { cause: error },
    );
  }
  return JSON.parse(text) as KnownQueriesFile;
}

function build_benchmark_config(known: KnownQueriesFile): BenchmarkConfig {
  const prefix_all = known.queries.filter((query) => query.bucket === "prefix");
  const content_fuzzy = known.queries.filter((query) => query.bucket === "content_fuzzy");
  const exact_queries = known.queries.filter((query) => query.bucket === "exact");
  const hot_query = known.queries.find((query) => query.bucket === "hot");

  if (prefix_all.length < 1 || hot_query === undefined) {
    throw new Error("known_queries.json is missing required prefix or hot probes");
  }

  const [warmup_query, ...prefix_queries] = prefix_all;
  if (warmup_query === undefined) {
    throw new Error("known_queries.json has no prefix probe to use as the warmup query");
  }

  return {
    warmup_query,
    prefix_queries,
    content_fuzzy_queries: content_fuzzy,
    exact_queries,
    hot_query,
  };
}

function percentile(sorted_ascending: readonly number[], p: number): number {
  if (sorted_ascending.length === 0) {
    return 0;
  }
  const rank = Math.min(
    sorted_ascending.length - 1,
    Math.max(0, Math.ceil((p / 100) * sorted_ascending.length) - 1),
  );
  return sorted_ascending[rank] ?? 0;
}

interface DurationStats {
  readonly count: number;
  readonly p50_ms: number;
  readonly p95_ms: number;
  readonly max_ms: number;
}

function summarize_durations(durations: readonly number[]): DurationStats {
  const sorted = [...durations].sort((left, right) => left - right);
  const last = sorted.length > 0 ? sorted[sorted.length - 1] : undefined;
  return {
    count: sorted.length,
    p50_ms: percentile(sorted, 50),
    p95_ms: percentile(sorted, 95),
    max_ms: last ?? 0,
  };
}

function all_measurements(run: BenchmarkResult["primary"]) {
  return [...run.prefix, ...run.content_fuzzy, ...run.exact, ...run.hot];
}

async function read_resident_shard_bytes(worker: PlaywrightWorker): Promise<number | null> {
  try {
    return await worker.evaluate(() => {
      const debug_global = globalThis as {
        __vocabulary_worker_engine_debug__?: { resident_shard_bytes: number };
      };
      return debug_global.__vocabulary_worker_engine_debug__?.resident_shard_bytes ?? null;
    });
  } catch {
    return null; // Worker not yet initialized, or already terminated -- not an error here.
  }
}

interface ResidentBytesTracker {
  readonly peaks: Map<PlaywrightWorker, number>;
  stop(): Promise<void>;
}

declare global {
  interface Window {
    __bench_done__?: boolean;
    __bench_result__?: BenchmarkResult;
    __bench_error__?: string;
  }
}

/**
 * A single `page.evaluate()` that itself `await`s the whole ~10+ minute
 * benchmark run hangs indefinitely in this environment: Playwright's
 * `Runtime.evaluate(awaitPromise: true)` does not reliably pump the page's
 * Worker message channel while the outer promise is pending (reproduced
 * directly during implementation -- a fire-and-forget trigger plus a
 * separately-polled `window` flag resolves in seconds instead; the same
 * evaluate() calls used for the trigger and each poll tick, individually
 * short-lived, never hang). This is a harness-infrastructure workaround,
 * not a change to what is measured or asserted.
 */
async function run_benchmark_via_polling(
  page: Page,
  config: BenchmarkConfig,
  poll_interval_ms: number,
): Promise<BenchmarkResult> {
  await page.evaluate((benchmark_config) => {
    window.__bench_done__ = false;
    window.__vocabulary_benchmark__
      .run_full_benchmark(benchmark_config)
      .then((result) => {
        window.__bench_result__ = result;
        window.__bench_done__ = true;
      })
      .catch((error: unknown) => {
        window.__bench_error__ = error instanceof Error ? error.message : String(error);
        window.__bench_done__ = true;
      });
  }, config);

  for (;;) {
    const done = await page.evaluate(() => window.__bench_done__ === true);
    if (done) {
      break;
    }
    await new Promise((resolve_delay) => setTimeout(resolve_delay, poll_interval_ms));
  }

  const outcome = await page.evaluate(() => ({
    result: window.__bench_result__,
    error: window.__bench_error__,
  }));
  if (outcome.error !== undefined) {
    throw new Error(`run_full_benchmark rejected: ${outcome.error}`);
  }
  if (outcome.result === undefined) {
    throw new Error("run_full_benchmark reported done with neither a result nor an error");
  }
  return outcome.result;
}

function track_resident_shard_bytes(workers: readonly PlaywrightWorker[]): ResidentBytesTracker {
  const peaks = new Map<PlaywrightWorker, number>();
  const stop_signal = { stopped: false };

  const loop = (async () => {
    while (!stop_signal.stopped) {
      for (const worker of workers) {
        const bytes = await read_resident_shard_bytes(worker);
        if (bytes !== null) {
          peaks.set(worker, Math.max(peaks.get(worker) ?? 0, bytes));
        }
      }
      await new Promise((resolve_delay) =>
        setTimeout(resolve_delay, RESIDENT_BYTES_POLL_INTERVAL_MS),
      );
    }
  })();

  return {
    peaks,
    async stop() {
      stop_signal.stopped = true;
      await loop;
    },
  };
}

test("500,000-record vocabulary Worker meets latency, correctness, and LRU budgets", async ({
  page,
}) => {
  test.setTimeout(10 * 60_000);

  const known = load_known_queries();
  expect(known.record_count).toBe(500_000);
  const config = build_benchmark_config(known);
  expect(config.prefix_queries.length).toBeGreaterThanOrEqual(MIN_MEASURED_PREFIX_QUERIES);
  expect(config.content_fuzzy_queries.length).toBeGreaterThanOrEqual(
    MIN_MEASURED_CONTENT_FUZZY_QUERIES,
  );

  const tracked_workers: PlaywrightWorker[] = [];
  page.on("worker", (worker) => tracked_workers.push(worker));

  await page.goto("/vocabulary_benchmark.html");

  const resident_tracker = track_resident_shard_bytes(tracked_workers);
  const result = await run_benchmark_via_polling(page, config, RESIDENT_BYTES_POLL_INTERVAL_MS);
  await resident_tracker.stop();

  expect(
    tracked_workers,
    "expected exactly two Workers: primary (real, unmodified) then desktop",
  ).toHaveLength(2);
  const [primary_worker, desktop_worker] = tracked_workers;
  const primary_peak_bytes =
    primary_worker !== undefined ? (resident_tracker.peaks.get(primary_worker) ?? 0) : 0;
  const desktop_peak_bytes =
    desktop_worker !== undefined ? (resident_tracker.peaks.get(desktop_worker) ?? 0) : 0;

  const prefix_stats = summarize_durations(result.primary.prefix.map((m) => m.duration_ms));
  const content_fuzzy_stats = summarize_durations(
    result.primary.content_fuzzy.map((m) => m.duration_ms),
  );

  const incorrect = [
    ...all_measurements(result.primary),
    ...all_measurements(result.desktop),
  ].filter((measurement) => !measurement.correct);

  console.log(
    JSON.stringify(
      {
        primary_memory_mode_note: result.primary_memory_mode_note,
        primary_bootstrap_ms: result.primary.bootstrap_ms,
        primary_warmup_ms: result.primary.warmup_ms,
        desktop_bootstrap_ms: result.desktop.bootstrap_ms,
        prefix_stats,
        content_fuzzy_stats,
        primary_resident_shard_bytes_peak: primary_peak_bytes,
        desktop_resident_shard_bytes_peak: desktop_peak_bytes,
        long_task_count: result.long_tasks.length,
        incorrect_count: incorrect.length,
        incorrect_sample: incorrect.slice(0, 10),
      },
      null,
      2,
    ),
  );

  expect(
    incorrect,
    `${String(incorrect.length)} of ${String(all_measurements(result.primary).length + all_measurements(result.desktop).length)} queries returned an incorrect top result`,
  ).toEqual([]);
  expect(result.long_tasks, "main-thread long tasks (>50ms) recorded during the benchmark").toEqual(
    [],
  );
  expect(prefix_stats.p95_ms).toBeLessThanOrEqual(PREFIX_P95_BUDGET_MS);
  expect(content_fuzzy_stats.p95_ms).toBeLessThanOrEqual(CONTENT_FUZZY_P95_BUDGET_MS);
  expect(primary_peak_bytes).toBeLessThanOrEqual(MOBILE_LRU_BUDGET_BYTES);
  expect(desktop_peak_bytes).toBeLessThanOrEqual(DESKTOP_LRU_BUDGET_BYTES);
});
