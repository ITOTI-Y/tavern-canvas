import { resolve } from "node:path";
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";

import package_metadata from "../../package.json" with { type: "json" };

// Stage 05 Task 6 benchmark harness build. Bundles the REAL, unmodified
// apps/extension/src/workers/vocabulary_worker.ts as an actual Web Worker
// (via `new Worker(new URL(...))` in vocabulary_benchmark_harness.ts) and
// pins its output path to `workers/*.js`, mirroring
// apps/extension/vite.config.ts's production layout exactly -- so
// resolve_bundled_baseline_base_url's "the bundled baseline is one
// directory up from the worker's own self.location" assumption is
// exercised the same way it would be in the real extension build, just
// serving the 500,000-record benchmark package (copied into
// tests/harness/.benchmark_public/vocabulary/baseline by
// prepare_benchmark_site.mjs, gitignored) instead of the shipped baseline.
// Output goes to output/benchmark/site (gitignored, never committed).
export default defineConfig({
  root: resolve(import.meta.dirname),
  base: "./",
  publicDir: resolve(import.meta.dirname, ".benchmark_public"),
  define: {
    __TAVERN_CANVAS_VERSION__: JSON.stringify(package_metadata.version),
  },
  resolve: {
    // "tests/harness" is not a pnpm workspace member (pnpm-workspace.yaml
    // only lists apps/*, packages/*, tools/*), so it has no node_modules
    // symlink for bare "@tavern-canvas/*" imports -- mirrors the same alias
    // vitest.config.ts uses for the same reason. Only vocabulary_benchmark_harness.ts
    // needs this directly; vocabulary_benchmark_worker_desktop.ts resolves
    // its own imports via apps/extension's own node_modules, since Vite's
    // resolver walks up from each file's real location on disk.
    alias: {
      "@tavern-canvas/contracts": fileURLToPath(
        new URL("../../packages/contracts/src/index.ts", import.meta.url),
      ),
    },
  },
  build: {
    outDir: resolve(import.meta.dirname, "../../output/benchmark/site"),
    emptyOutDir: true,
    sourcemap: true,
    rolldownOptions: {
      input: resolve(import.meta.dirname, "vocabulary_benchmark.html"),
    },
  },
  worker: {
    format: "es",
    rolldownOptions: {
      output: {
        entryFileNames: "workers/[name].js",
        chunkFileNames: "workers/chunks/[name]-[hash].js",
      },
    },
  },
});
