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
      "@tavern-canvas/core": fileURLToPath(
        new URL("../../packages/core/src/index.ts", import.meta.url),
      ),
      // Subpath entries first: an object alias replaces the matched prefix, so a barrel entry would rewrite subpath imports.
      "@tavern-canvas/providers/adapters": fileURLToPath(
        new URL("../../packages/providers/src/adapters.ts", import.meta.url),
      ),
      "@tavern-canvas/storage/archive": fileURLToPath(
        new URL("../../packages/storage/src/archive.ts", import.meta.url),
      ),
      "@tavern-canvas/providers": fileURLToPath(
        new URL("../../packages/providers/src/index.ts", import.meta.url),
      ),
      "@tavern-canvas/storage": fileURLToPath(
        new URL("../../packages/storage/src/index.ts", import.meta.url),
      ),
      "@tavern-canvas/vocabulary": fileURLToPath(
        new URL("../../packages/vocabulary/src/index.ts", import.meta.url),
      ),
      "@tavern-canvas/v2-migration": fileURLToPath(
        new URL("../../tools/v2_migration/src/index.ts", import.meta.url),
      ),
      vue: fileURLToPath(new URL("../../apps/extension/node_modules/vue", import.meta.url)),
    },
  },
  build: {
    outDir: resolve(import.meta.dirname, "../../output/all_host_harness/site"),
    emptyOutDir: true,
    sourcemap: true,
    rolldownOptions: {
      input: [
        resolve(import.meta.dirname, "sillytavern_host.html"),
        resolve(import.meta.dirname, "tauri_host.html"),
      ],
    },
  },
});
