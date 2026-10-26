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
    // The emitted CSS keeps relative font URLs; the string copy injected into the Shadow Root gets a
    // marker that runtime_stylesheet.ts resolves against import.meta.url.
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
    manifest: true,
    assetsDir: "assets",
    cssCodeSplit: false,
    // Hidden source maps keep `sourceMappingURL` out of the shipped JS.
    sourcemap: mode === "debug" ? true : "hidden",
    // The committed vocabulary baseline must reach dist/ byte-identical for the bundled ShardByteSource.
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
  // Worker output stays under dist/workers/ so the bundled baseline path ("../vocabulary/baseline/") is fixed.
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
