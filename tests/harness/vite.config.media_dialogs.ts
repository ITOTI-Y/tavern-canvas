import { resolve } from "node:path";
import { fileURLToPath, URL } from "node:url";

import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

import package_metadata from "../../package.json" with { type: "json" };

/**
 * Stage 07 Task 3's browser-smoke harness for InpaintDialog.vue, ImageEditDialog.vue, and
 * GenerationParametersDialog.vue plus media_command_service.ts's job flows. Mirrors
 * vite.config.studio.ts's shape (separate Vite config, same alias workaround for
 * "tests/harness" not being a pnpm workspace member, same Shadow Root + FIRST_PARTY_STYLESHEET +
 * create_i18n mounting approach) rather than reusing AppRoot.vue's full StudioController tree,
 * since none of these three dialogs are reachable through the existing studio_host.html harness
 * yet (no production caller wires them to an open Gallery/ContextInspector action -- see
 * task-3-report.md's concerns section).
 */
export default defineConfig({
  root: resolve(import.meta.dirname),
  base: "./",
  plugins: [vue()],
  define: {
    __TAVERN_CANVAS_VERSION__: JSON.stringify(package_metadata.version),
  },
  resolve: {
    alias: {
      "@tavern-canvas/contracts": fileURLToPath(
        new URL("../../packages/contracts/src/index.ts", import.meta.url),
      ),
      "@tavern-canvas/core": fileURLToPath(
        new URL("../../packages/core/src/index.ts", import.meta.url),
      ),
      "@tavern-canvas/providers/adapters": fileURLToPath(
        new URL("../../packages/providers/src/adapters.ts", import.meta.url),
      ),
      "@tavern-canvas/providers": fileURLToPath(
        new URL("../../packages/providers/src/index.ts", import.meta.url),
      ),
      vue: fileURLToPath(new URL("../../apps/extension/node_modules/vue", import.meta.url)),
    },
  },
  build: {
    outDir: resolve(import.meta.dirname, "../../output/media_dialogs_harness/site"),
    emptyOutDir: true,
    sourcemap: true,
    rolldownOptions: {
      input: resolve(import.meta.dirname, "media_dialogs_host.html"),
    },
  },
});
