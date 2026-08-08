import { defineConfig, devices } from "@playwright/test";

// Stage 05 Task 6: real-Chromium proof that the vocabulary Worker
// (apps/extension/src/workers/vocabulary_worker.ts) can be bundled and
// instantiated as an actual Web Worker, and meets the 500,000-record
// performance/correctness budgets (tests/e2e/vocabulary_performance.spec.ts).
// The webServer builds tests/harness/vocabulary_benchmark.html with Vite
// (staging the benchmark package first -- prepare_benchmark_site.mjs) and
// serves the static output; nothing here touches the extension's own
// production build or dev server.
const VOCABULARY_HARNESS_PORT = 4173;
const VOCABULARY_HARNESS_URL = `http://127.0.0.1:${String(VOCABULARY_HARNESS_PORT)}`;

// Stage 06 Task 8: real-Chromium browser/accessibility/visual-regression gate for the Vue Studio.
// tests/harness/studio_host.html mounts the real, unmodified apps/extension/src/ui/AppRoot.vue
// inside an actual Shadow Root, wired to deterministic mock capabilities
// (tests/harness/src/mock_capabilities.ts) instead of production's
// create_unavailable_capabilities() default. `localhost`, not `127.0.0.1`: under this
// dispatcher's own environment, `vite preview`'s dev server only accepted the IPv6 loopback
// address (`127.0.0.1` connections were refused even though the process was listening);
// `localhost` resolves to whichever loopback family is actually bound.
const STUDIO_HARNESS_PORT = 4174;
const STUDIO_HARNESS_URL = `http://localhost:${String(STUDIO_HARNESS_PORT)}`;

// Stage 07 Task 3: real-Chromium proof that InpaintDialog.vue's Pointer Events (mouse/pen/touch),
// canvas rendering, and media_command_service.ts's job flows behave correctly outside Node/
// happy-dom. tests/harness/media_dialogs_host.html mounts these dialogs directly (see that file's
// own header comment for why it does not reuse studio_host.html).
const MEDIA_DIALOGS_HARNESS_PORT = 4175;
const MEDIA_DIALOGS_HARNESS_URL = `http://localhost:${String(MEDIA_DIALOGS_HARNESS_PORT)}`;

// Stage 07 Task 7: the all-host acceptance harness. tests/harness/sillytavern_host.html and
// tauri_host.html boot the REAL apps/extension/src/bootstrap/bootstrap.ts (or the same
// compose_capabilities.ts composition root it calls) against a fake SillyTavern/TavernHelper/
// TauriTavern global object graph, so the host adapters, capability probe and composition root
// are all exercised as shipped. One server serves both pages and every spec that drives them.
const ALL_HOST_HARNESS_PORT = 4176;
const ALL_HOST_HARNESS_URL = `http://localhost:${String(ALL_HOST_HARNESS_PORT)}`;

// `webServer` is a top-level Playwright option: every entry starts before any test runs,
// regardless of which spec files were actually requested on the CLI. The two harnesses' startup
// costs are too asymmetric to always pay both (vocabulary's boots a 500,000-record benchmark
// package build; studio's is a plain Vite build) -- scoped here by inspecting the CLI's own
// positional `*.spec.ts` arguments. Naming only one harness's specs starts only that harness's
// server; naming none (e.g. plain `playwright test`, or `--grep` with no path) starts both, since
// that means "run everything" (or "ambiguous, so don't guess wrong and strand a test with no
// server").
// This file has no owning tsconfig project (eslint.config.js's `allowDefaultProject:
// ["*.config.ts"]` fallback infers an ad-hoc program with no `@types/node`), so the ambient
// global `process` resolves as an unchecked error type there -- this explicit local shape,
// asserted once through `unknown`, gives every subsequent operation on `argv` a real, checked
// type instead of letting `any` propagate through `.slice`/`.filter`/`.some`/`.includes` below.
const process_argv = (globalThis as unknown as { process: { argv: readonly string[] } }).process
  .argv;
const requested_spec_paths = process_argv.slice(2).filter((arg) => arg.endsWith(".spec.ts"));
const explicit_selection = requested_spec_paths.length > 0;
const wants_vocabulary =
  !explicit_selection || requested_spec_paths.some((path) => path.includes("vocabulary_"));
const wants_studio =
  !explicit_selection || requested_spec_paths.some((path) => path.includes("studio_"));
const wants_media_dialogs =
  !explicit_selection || requested_spec_paths.some((path) => path.includes("media_dialogs_"));
const ALL_HOST_SPEC_MARKERS = [
  "full_standard_host",
  "full_tauri_host",
  "full_gateway",
  "migration_and_update",
  "security_boundaries",
];
const wants_all_host =
  !explicit_selection ||
  requested_spec_paths.some((path) =>
    ALL_HOST_SPEC_MARKERS.some((marker) => path.includes(marker)),
  );

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
    baseURL: VOCABULARY_HARNESS_URL,
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "vocabulary",
      testMatch: /vocabulary_performance\.spec\.ts$/u,
      use: { ...devices["Desktop Chrome"], baseURL: VOCABULARY_HARNESS_URL },
    },
    {
      name: "studio",
      testMatch: /studio_.*\.spec\.ts$/u,
      use: { ...devices["Desktop Chrome"], baseURL: STUDIO_HARNESS_URL },
    },
    {
      name: "media_dialogs_desktop",
      testMatch: /media_dialogs_.*\.spec\.ts$/u,
      use: { ...devices["Desktop Chrome"], baseURL: MEDIA_DIALOGS_HARNESS_URL },
    },
    {
      name: "media_dialogs_mobile",
      testMatch: /media_dialogs_.*\.spec\.ts$/u,
      use: { ...devices["Pixel 7"], baseURL: MEDIA_DIALOGS_HARNESS_URL },
    },
    {
      name: "all_host",
      testMatch:
        /(full_standard_host|full_tauri_host|full_gateway|migration_and_update|security_boundaries)\.spec\.ts$/u,
      use: { ...devices["Desktop Chrome"], baseURL: ALL_HOST_HARNESS_URL },
    },
  ],
  webServer: [
    ...(wants_vocabulary
      ? [
          {
            // Plain static server (tests/harness/static_server.mjs), not `vite
            // preview`: preview's static middleware treats `.gz`-suffixed paths as
            // precompressed assets and answers with `Content-Encoding: gzip`, which
            // corrupts every shard fetch (see that file's header comment).
            command:
              "node tests/harness/prepare_benchmark_site.mjs && " +
              "pnpm exec vite build --config tests/harness/vite.config.ts && " +
              `STATIC_SERVER_PORT=${String(VOCABULARY_HARNESS_PORT)} node tests/harness/static_server.mjs`,
            // Explicit page path, not the bare origin: static_server.mjs has no
            // index.html at "/" (the harness's only page is vocabulary_benchmark.html),
            // so a readiness probe against the bare origin would 404 forever.
            url: `${VOCABULARY_HARNESS_URL}/vocabulary_benchmark.html`,
            reuseExistingServer: false,
            timeout: 5 * 60_000,
            stdout: "pipe" as const,
            stderr: "pipe" as const,
          },
        ]
      : []),
    ...(wants_studio
      ? [
          {
            command:
              "pnpm exec vite build --config tests/harness/vite.config.studio.ts && " +
              `pnpm exec vite preview --config tests/harness/vite.config.studio.ts --port ${String(STUDIO_HARNESS_PORT)} --strictPort`,
            url: `${STUDIO_HARNESS_URL}/studio_host.html`,
            reuseExistingServer: false,
            timeout: 5 * 60_000,
            stdout: "pipe" as const,
            stderr: "pipe" as const,
          },
        ]
      : []),
    ...(wants_media_dialogs
      ? [
          {
            command:
              "pnpm exec vite build --config tests/harness/vite.config.media_dialogs.ts && " +
              `pnpm exec vite preview --config tests/harness/vite.config.media_dialogs.ts --port ${String(MEDIA_DIALOGS_HARNESS_PORT)} --strictPort`,
            url: `${MEDIA_DIALOGS_HARNESS_URL}/media_dialogs_host.html`,
            reuseExistingServer: false,
            timeout: 5 * 60_000,
            stdout: "pipe" as const,
            stderr: "pipe" as const,
          },
        ]
      : []),
    ...(wants_all_host
      ? [
          {
            command:
              "pnpm exec vite build --config tests/harness/vite.config.all_host.ts && " +
              `pnpm exec vite preview --config tests/harness/vite.config.all_host.ts --port ${String(ALL_HOST_HARNESS_PORT)} --strictPort`,
            url: `${ALL_HOST_HARNESS_URL}/sillytavern_host.html`,
            reuseExistingServer: false,
            timeout: 5 * 60_000,
            stdout: "pipe" as const,
            stderr: "pipe" as const,
          },
        ]
      : []),
  ],
});
