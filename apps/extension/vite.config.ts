import { resolve } from "node:path";

import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

import package_metadata from "../../package.json" with { type: "json" };

export default defineConfig(({ mode }) => ({
  plugins: [vue()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
    __TAVERN_CANVAS_VERSION__: JSON.stringify(package_metadata.version),
  },
  build: {
    outDir: resolve(import.meta.dirname, "../../dist"),
    emptyOutDir: true,
    assetsDir: "assets",
    cssCodeSplit: false,
    sourcemap: mode !== "release",
    // Explicit rather than relying on Vite's default: the committed
    // vocabulary baseline (public/vocabulary/baseline) must reach dist/ as
    // plain static files, byte-identical, for the extension's bundled
    // ShardByteSource to fetch at a relative runtime path (packages/vocabulary's
    // PackageClient "bundled" source kind). Verified by
    // apps/extension/scripts/assert_bundle.mjs after every build.
    copyPublicDir: true,
    lib: {
      entry: resolve(import.meta.dirname, "src/index.ts"),
      formats: ["es"],
      fileName: () => "index.js",
      cssFileName: "index",
    },
    rolldownOptions: {
      output: {
        entryFileNames: "index.js",
        chunkFileNames: "chunks/[name]-[hash].js",
      },
    },
  },
  // A future `new Worker(new URL("../workers/vocabulary_worker.ts", import.meta.url), { type: "module" })`
  // call site (not yet wired -- see apps/extension/src/workers/vocabulary_worker.ts)
  // needs a stable output path to compute the bundled baseline's URL relative
  // to its own self.location: pinning it under dist/workers/ keeps that
  // offset ("../vocabulary/baseline/" from the worker back up to dist/)
  // fixed regardless of how other chunks are named.
  worker: {
    format: "es",
    rolldownOptions: {
      output: {
        entryFileNames: "workers/[name].js",
        chunkFileNames: "workers/chunks/[name]-[hash].js",
      },
    },
  },
}));
