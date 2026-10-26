import { resolve } from "node:path";
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";

import package_metadata from "../../package.json" with { type: "json" };

export default defineConfig({
  root: resolve(import.meta.dirname),
  base: "./",
  publicDir: resolve(import.meta.dirname, ".benchmark_public"),
  define: {
    __TAVERN_CANVAS_VERSION__: JSON.stringify(package_metadata.version),
  },
  resolve: {
    // tests/harness is not a pnpm workspace member, so bare "@tavern-canvas/*" and "vue" imports from its own files need explicit aliases.
    alias: {
      "@tavern-canvas/contracts": fileURLToPath(
        new URL("../../packages/contracts/src/index.ts", import.meta.url),
      ),
      "@tavern-canvas/vocabulary": fileURLToPath(
        new URL("../../packages/vocabulary/src/index.ts", import.meta.url),
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
