import { resolve } from "node:path";
import { fileURLToPath, URL } from "node:url";

import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

import package_metadata from "../../package.json" with { type: "json" };

/**
 * Stage 07 Task 7's all-host harness build. Serves tests/harness/sillytavern_host.html and
 * tests/harness/tauri_host.html, both of which boot the real extension bootstrap/composition root
 * (tests/harness/src/all_host_boot.ts). Separate from vite.config.studio.ts because that harness
 * mounts AppRoot.vue with mock capabilities and never touches bootstrap, storage or the host
 * adapters; sharing one config would entangle two unrelated entry graphs and make each page pay
 * for the other's dependencies. Output goes to output/all_host_harness/site (gitignored).
 */
export default defineConfig({
  root: resolve(import.meta.dirname),
  base: "./",
  plugins: [vue()],
  define: {
    __TAVERN_CANVAS_VERSION__: JSON.stringify(package_metadata.version),
  },
  resolve: {
    // Same reason as vite.config.studio.ts: "tests/harness" is not a pnpm workspace member, so its
    // own files have no node_modules symlink for bare "@tavern-canvas/*" or "vue" specifiers.
    // Files under apps/extension/src and packages/* resolve their own imports normally, since
    // Vite walks up from each file's real location on disk.
    alias: {
      "@tavern-canvas/contracts": fileURLToPath(
        new URL("../../packages/contracts/src/index.ts", import.meta.url),
      ),
      "@tavern-canvas/core": fileURLToPath(
        new URL("../../packages/core/src/index.ts", import.meta.url),
      ),
      // Subpath entries first: an object alias replaces the matched prefix, so a barrel entry
      // would otherwise rewrite "@tavern-canvas/providers/adapters" to ".../src/index.ts/adapters".
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
