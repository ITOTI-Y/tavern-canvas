import { resolve } from "node:path";
import { fileURLToPath, URL } from "node:url";

import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

import package_metadata from "../../package.json" with { type: "json" };

export default defineConfig({
  root: resolve(import.meta.dirname),
  base: "./",
  plugins: [vue()],
  define: {
    __TAVERN_CANVAS_VERSION__: JSON.stringify(package_metadata.version),
  },
  resolve: {
    // tests/harness is not a pnpm workspace member, so bare "@tavern-canvas/*" and "vue" imports from its own files need explicit aliases.
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
