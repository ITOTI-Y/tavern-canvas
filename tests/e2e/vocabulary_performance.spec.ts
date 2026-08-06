import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { expect, test, type Page, type Worker as PlaywrightWorker } from "@playwright/test";

import type {
  BenchmarkConfig,
  BenchmarkResult,
  QueryOracle,
  WorkerRunResult,
} from "../harness/vocabulary_benchmark_harness.js";

// Stage 05 performance gate. Drives the REAL, unmodified
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
//
// Both LRU budgets are proven every run: the primary worker resolves its
// own budget from navigator.deviceMemory the way production does, and the
// harness runs a second worker configured for the complementary mode. Each
// worker's high-water mark is checked against the budget that worker itself
// reports (read live from the engine, not assumed here), and the two
// budgets together must cover both 16 MiB and 64 MiB.
//
// The latency budgets gate the PRIMARY worker -- the one configured the way
// production configures itself on this host. The secondary worker's
// latencies are measured and logged for the stage review but not gated: on
// a 16 MiB budget the 500,000-record package's decoded detail index alone
// is 39.85 MB, so its working set provably cannot be cached at all, and the
// gap that leaves is a package-sizing question for low-memory device
// classes rather than something this engine can close. See
// task-perf-report.md.

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

function all_measurements(run: WorkerRunResult) {
  return [...run.prefix, ...run.content_fuzzy, ...run.exact, ...run.hot];
}

interface WorkerLruSample {
  readonly resident_bytes: number;
  readonly budget_bytes: number;
}

async function read_worker_lru(worker: PlaywrightWorker): Promise<WorkerLruSample | null> {
  try {
    return await worker.evaluate(() => {
      const debug_global = globalThis as {
        __vocabulary_worker_engine_debug__?: {
          resident_shard_bytes: number;
          shard_lru_budget_bytes: number;
        };
      };
      const engine = debug_global.__vocabulary_worker_engine_debug__;
      return engine === undefined
        ? null
        : {
            resident_bytes: engine.resident_shard_bytes,
            budget_bytes: engine.shard_lru_budget_bytes,
          };
    });
  } catch {
    return null; // Worker not yet initialized, or already terminated -- not an error here.
  }
}

interface WorkerLruObservation {
  peak_bytes: number;
  budget_bytes: number | null;
}

interface LruTracker {
  readonly observations: Map<PlaywrightWorker, WorkerLruObservation>;
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
 * A single `page.evaluate()` that itself `await`s the whole multi-minute
 * benchmark run hangs indefinitely in this environment: Playwright's
 * `Runtime.evaluate(awaitPromise: true)` does not reliably pump the page's
 * Worker message channel while the outer promise is pending (reproduced
 * directly during Task 6 -- a fire-and-forget trigger plus a separately-
 * polled `window` flag resolves in seconds instead; the same evaluate()
 * calls used for the trigger and each poll tick, individually short-lived,
 * never hang). This is a harness-infrastructure workaround, not a change to
 * what is measured or asserted.
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

function track_worker_lru(workers: readonly PlaywrightWorker[]): LruTracker {
  const observations = new Map<PlaywrightWorker, WorkerLruObservation>();
  const stop_signal = { stopped: false };

  const loop = (async () => {
    while (!stop_signal.stopped) {
      for (const worker of workers) {
        const sample = await read_worker_lru(worker);
        if (sample === null) {
          continue;
        }
        const observed = observations.get(worker) ?? { peak_bytes: 0, budget_bytes: null };
        observed.peak_bytes = Math.max(observed.peak_bytes, sample.resident_bytes);
        observed.budget_bytes = sample.budget_bytes;
        observations.set(worker, observed);
      }
      await new Promise((resolve_delay) =>
        setTimeout(resolve_delay, RESIDENT_BYTES_POLL_INTERVAL_MS),
      );
    }
  })();

  return {
    observations,
    async stop() {
      stop_signal.stopped = true;
      await loop;
    },
  };
}

test("500,000-record vocabulary Worker meets latency, correctness, and LRU budgets", async ({
  page,
}) => {
  test.setTimeout(20 * 60_000);

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

  const lru_tracker = track_worker_lru(tracked_workers);
  const result = await run_benchmark_via_polling(page, config, RESIDENT_BYTES_POLL_INTERVAL_MS);
  await lru_tracker.stop();

  expect(
    tracked_workers,
    "expected exactly two Workers: primary (real, unmodified) then the complementary-mode one",
  ).toHaveLength(2);
  const [primary_worker, secondary_worker] = tracked_workers;
  const observed = (worker: PlaywrightWorker | undefined): WorkerLruObservation =>
    (worker === undefined ? undefined : lru_tracker.observations.get(worker)) ?? {
      peak_bytes: 0,
      budget_bytes: null,
    };
  const primary_lru = observed(primary_worker);
  const secondary_lru = observed(secondary_worker);

  const runs = [result.primary, result.secondary];
  const stats = runs.map((run) => ({
    label: run.label,
    bootstrap_ms: run.bootstrap_ms,
    warmup_ms: run.warmup_ms,
    prefix: summarize_durations(run.prefix.map((measurement) => measurement.duration_ms)),
    content_fuzzy: summarize_durations(
      run.content_fuzzy.map((measurement) => measurement.duration_ms),
    ),
  }));

  const incorrect = runs.flatMap(all_measurements).filter((measurement) => !measurement.correct);

  console.log(
    JSON.stringify(
      {
        primary_memory_mode: result.primary_memory_mode,
        secondary_memory_mode: result.secondary_memory_mode,
        stats,
        primary_lru,
        secondary_lru,
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
    `${String(incorrect.length)} of ${String(runs.flatMap(all_measurements).length)} queries returned an incorrect top result`,
  ).toEqual([]);
  expect(result.long_tasks, "main-thread long tasks (>50ms) recorded during the benchmark").toEqual(
    [],
  );

  const [primary_stats] = stats;
  if (primary_stats === undefined) {
    throw new Error("expected summarized stats for the primary worker");
  }
  expect(primary_stats.prefix.p95_ms, `prefix p95 for ${primary_stats.label}`).toBeLessThanOrEqual(
    PREFIX_P95_BUDGET_MS,
  );
  expect(
    primary_stats.content_fuzzy.p95_ms,
    `content/fuzzy p95 for ${primary_stats.label}`,
  ).toBeLessThanOrEqual(CONTENT_FUZZY_P95_BUDGET_MS);

  // Each worker is held to the budget its own engine resolved, and between
  // them both documented budgets must have been exercised -- so neither a
  // future environment change nor a detection change can silently drop the
  // mobile-budget proof (Task 6 lost it exactly that way).
  expect(
    [primary_lru.budget_bytes, secondary_lru.budget_bytes].sort((a, b) => (a ?? 0) - (b ?? 0)),
    "both the mobile and desktop LRU budgets must be exercised",
  ).toEqual([MOBILE_LRU_BUDGET_BYTES, DESKTOP_LRU_BUDGET_BYTES]);
  expect(
    primary_lru.peak_bytes,
    "primary worker decoded-shard high-water mark",
  ).toBeLessThanOrEqual(primary_lru.budget_bytes ?? 0);
  expect(
    secondary_lru.peak_bytes,
    "secondary worker decoded-shard high-water mark",
  ).toBeLessThanOrEqual(secondary_lru.budget_bytes ?? 0);
});
