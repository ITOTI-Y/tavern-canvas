import { resolve } from "node:path";
import { fileURLToPath, URL } from "node:url";

import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

import package_metadata from "../../package.json" with { type: "json" };

// Stage 06 Task 8's browser/accessibility/visual-regression harness. Builds
// tests/harness/studio_host.html, which mounts the REAL, unmodified
// apps/extension/src/ui/AppRoot.vue (the same component bootstrap.ts mounts
// in production) inside an actual Shadow Root, wired to deterministic mock
// StudioCapabilities (tests/harness/src/mock_capabilities.ts) instead of the
// production create_unavailable_capabilities() default. This is a separate
// Vite config from vite.config.ts (Stage 05's vocabulary-benchmark harness):
// that one is a Worker-bundling, gz-safe static-file harness with its own
// unrelated build shape; sharing one config would entangle two independent
// concerns for no benefit. Output goes to output/studio_harness/site
// (gitignored, never committed), served with plain `vite preview` -- unlike
// the vocabulary harness, nothing here emits `.gz`-suffixed files, so
// preview's default static middleware is safe to use as-is.
export default defineConfig({
  root: resolve(import.meta.dirname),
  base: "./",
  plugins: [vue()],
  define: {
    __TAVERN_CANVAS_VERSION__: JSON.stringify(package_metadata.version),
  },
  resolve: {
    // "tests/harness" is not a pnpm workspace member (pnpm-workspace.yaml only lists apps/*,
    // packages/*, tools/*), so it has no node_modules symlink for bare "@tavern-canvas/*"
    // imports -- mirrors vite.config.ts's and vitest.config.ts's own alias block for the same
    // reason. studio_host.ts and mock_capabilities.ts both import @tavern-canvas/contracts
    // directly; apps/extension/src/** files pulled in transitively (AppRoot.vue and everything
    // below it) resolve their own "@tavern-canvas/*" imports normally, since Vite's resolver
    // walks up from each file's real location on disk into apps/extension's own node_modules.
    //
    // "vue" needs the same treatment for the one direct import studio_host.ts itself makes
    // (`createApp`) -- every *.vue file under apps/extension/src resolves "vue" fine on its own
    // (Vite walks up from each file's real location into apps/extension/node_modules/vue), but
    // studio_host.ts's own directory has no such chain since it lives outside apps/extension.
    alias: {
      "@tavern-canvas/contracts": fileURLToPath(
        new URL("../../packages/contracts/src/index.ts", import.meta.url),
      ),
      vue: fileURLToPath(new URL("../../apps/extension/node_modules/vue", import.meta.url)),
    },
  },
  build: {
    outDir: resolve(import.meta.dirname, "../../output/studio_harness/site"),
    emptyOutDir: true,
    sourcemap: true,
    rolldownOptions: {
      input: resolve(import.meta.dirname, "studio_host.html"),
    },
  },
});
