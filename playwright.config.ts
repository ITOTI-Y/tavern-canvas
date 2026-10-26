import { defineConfig, devices } from "@playwright/test";

// `pnpm test:e2e` prepares the 500,000-record package before invoking `test:e2e:playwright`, which assumes it exists.
// The webServer hook only stages that package into Vite's publicDir; it does not rebuild it.
const VOCABULARY_HARNESS_PORT = 4173;
const VOCABULARY_HARNESS_URL = `http://127.0.0.1:${String(VOCABULARY_HARNESS_PORT)}`;

// `localhost`, not `127.0.0.1`: `vite preview` can bind only the IPv6 loopback, and `localhost` resolves to whichever family is bound.
const STUDIO_HARNESS_PORT = 4174;
const STUDIO_HARNESS_URL = `http://localhost:${String(STUDIO_HARNESS_PORT)}`;

const MEDIA_DIALOGS_HARNESS_PORT = 4175;
const MEDIA_DIALOGS_HARNESS_URL = `http://localhost:${String(MEDIA_DIALOGS_HARNESS_PORT)}`;

const ALL_HOST_HARNESS_PORT = 4176;
const ALL_HOST_HARNESS_URL = `http://localhost:${String(ALL_HOST_HARNESS_PORT)}`;

// Every webServer entry starts regardless of the requested specs, so servers are scoped by the CLI's positional `*.spec.ts`
// arguments; naming no spec path starts all of them.
// This file has no owning tsconfig project and no `@types/node`, so `process` is typed through a local shape.
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
  "full_gateway",
  "vocabulary_update",
  "security_boundaries",
];
const wants_all_host =
  !explicit_selection ||
  requested_spec_paths.some((path) =>
    ALL_HOST_SPEC_MARKERS.some((marker) => path.includes(marker)),
  );

export default defineConfig({
  testDir: "./tests/e2e",
  // A cold run bootstraps a 500,000-record package into IndexedDB before the measured suites start.
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
        /(full_standard_host|full_gateway|vocabulary_update|security_boundaries)\.spec\.ts$/u,
      use: { ...devices["Desktop Chrome"], baseURL: ALL_HOST_HARNESS_URL },
    },
  ],
  webServer: [
    ...(wants_vocabulary
      ? [
          {
            // Plain static server, not `vite preview`, which would answer `.gz` paths with Content-Encoding: gzip and corrupt shard fetches.
            command:
              "node tests/harness/prepare_benchmark_site.mjs && " +
              "pnpm exec vite build --config tests/harness/vite.config.ts && " +
              `STATIC_SERVER_PORT=${String(VOCABULARY_HARNESS_PORT)} node tests/harness/static_server.mjs`,
            // Explicit page path: the server has no index.html at "/", so probing the bare origin would 404 forever.
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
