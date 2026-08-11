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
  experimental: {
    // The emitted stylesheet is linked by SillyTavern, so its font URL must remain relative to
    // dist/index.css. The same CSS is also imported as a string for injection into the Shadow
    // Root; that copy needs a marker which runtime_stylesheet.ts resolves against import.meta.url,
    // because relative url() values in a plain <style> resolve against the host page instead.
    renderBuiltUrl(filename, { hostType }) {
      if (!filename.endsWith(".woff2")) {
        return;
      }
      if (hostType === "css") {
        return filename;
      }
      if (hostType === "js") {
        return `__TAVERN_CANVAS_ASSET_URL__${filename}__`;
      }
    },
  },
  build: {
    outDir: resolve(import.meta.dirname, "../../dist"),
    emptyOutDir: true,
    // Emits dist/.vite/manifest.json, the input the bundle-budget gate
    // (tools/bundle_budget) walks to size the initial payload.
    manifest: true,
    assetsDir: "assets",
    cssCodeSplit: false,
    // "hidden" emits the maps tools/bundle_budget needs to attribute the initial chunk's modules
    // but writes no `sourceMappingURL` into the shipped JS, so a released extension neither
    // carries nor points at the first-party source tree. `--mode debug` opts back in locally.
    sourcemap: mode === "debug" ? true : "hidden",
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
