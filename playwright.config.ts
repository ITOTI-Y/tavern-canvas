import { defineConfig, devices } from "@playwright/test";

// Stage 05 Task 6: real-Chromium proof that the vocabulary Worker
// (apps/extension/src/workers/vocabulary_worker.ts) can be bundled and
// instantiated as an actual Web Worker, and meets the 500,000-record
// performance/correctness budgets (tests/e2e/vocabulary_performance.spec.ts).
// The webServer builds tests/harness/vocabulary_benchmark.html with Vite
// (staging the benchmark package first -- prepare_benchmark_site.mjs) and
// serves the static output; nothing here touches the extension's own
// production build or dev server.
const HARNESS_PORT = 4173;
const HARNESS_URL = `http://127.0.0.1:${String(HARNESS_PORT)}`;

export default defineConfig({
  testDir: "./tests/e2e",
  // A cold run bootstraps a 500,000-record package into IndexedDB (thousands
  // of sequential shard writes -- packages/vocabulary/src/package_updater.ts
  // is not the object of this task) before either of the ~370-query
  // measured suites even starts; generous headroom, not a performance target.
  timeout: 10 * 60_000,
  expect: { timeout: 30_000 },
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [["list"]],
  use: {
    baseURL: HARNESS_URL,
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    // Plain static server (tests/harness/static_server.mjs), not `vite
    // preview`: preview's static middleware treats `.gz`-suffixed paths as
    // precompressed assets and answers with `Content-Encoding: gzip`, which
    // corrupts every shard fetch (see that file's header comment).
    command:
      "node tests/harness/prepare_benchmark_site.mjs && " +
      "pnpm exec vite build --config tests/harness/vite.config.ts && " +
      `STATIC_SERVER_PORT=${String(HARNESS_PORT)} node tests/harness/static_server.mjs`,
    // Explicit page path, not the bare origin: static_server.mjs has no
    // index.html at "/" (the harness's only page is vocabulary_benchmark.html),
    // so a readiness probe against the bare origin would 404 forever.
    url: `${HARNESS_URL}/vocabulary_benchmark.html`,
    reuseExistingServer: false,
    timeout: 5 * 60_000,
    stdout: "pipe",
    stderr: "pipe",
  },
});
