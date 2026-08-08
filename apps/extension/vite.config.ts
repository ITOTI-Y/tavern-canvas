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
    // Default CSS asset URLs are root-absolute (`/geist_variable.woff2`), which is wrong for
    // this extension: it never runs from the origin root, and its Shadow Root stylesheet is
    // injected as a plain string (`element.textContent = css`, see runtime_stylesheet.ts), so
    // even a *relative* url() would resolve against the host page's location, not dist/'s own.
    // Emitting a `__TAVERN_CANVAS_ASSET_URL__<relative-path>__` marker instead lets
    // runtime_stylesheet.ts substitute the one correct absolute URL at runtime, computed from
    // `import.meta.url` (dist/index.js's own real, load-time-known location) the same way
    // vocabulary_worker.ts already resolves its own bundled-baseline URL from `self.location`.
    renderBuiltUrl(filename, { hostType }) {
      // Scoped to first-party CSS-referenced assets only (currently just the Geist font) so this
      // never touches an unrelated JS-imported asset that expects Vite's normal URL. `hostType`
      // is "css" for the asset's copy inside the emitted dist/index.css chunk (inert, see the
      // comment above) and "js" for the copy inside the `?inline` CSS-as-JS-string transform that
      // actually reaches FIRST_PARTY_STYLESHEET -- both copies need the marker.
      if ((hostType === "css" || hostType === "js") && filename.endsWith(".woff2")) {
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
