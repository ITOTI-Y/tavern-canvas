import { fileURLToPath, URL } from "node:url";

import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vitest/config";

import package_metadata from "./package.json" with { type: "json" };

const workspace_alias = {
  "@tavern-canvas/contracts": fileURLToPath(
    new URL("./packages/contracts/src/index.ts", import.meta.url),
  ),
  "@tavern-canvas/core": fileURLToPath(new URL("./packages/core/src/index.ts", import.meta.url)),
  // Subpath entries first: an object alias replaces the matched prefix, so the barrel entry would
  // otherwise rewrite "@tavern-canvas/storage/archive" to ".../src/index.ts/archive".
  "@tavern-canvas/storage/archive": fileURLToPath(
    new URL("./packages/storage/src/archive.ts", import.meta.url),
  ),
  "@tavern-canvas/storage": fileURLToPath(
    new URL("./packages/storage/src/index.ts", import.meta.url),
  ),
  "@tavern-canvas/vocabulary": fileURLToPath(
    new URL("./packages/vocabulary/src/index.ts", import.meta.url),
  ),
  "@tavern-canvas/vocabulary-builder": fileURLToPath(
    new URL("./tools/vocabulary_builder/src/index.ts", import.meta.url),
  ),
  "@tavern-canvas/v2-migration": fileURLToPath(
    new URL("./tools/v2_migration/src/index.ts", import.meta.url),
  ),
};

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: workspace_alias,
  },
  // Mirrors apps/extension/vite.config.ts's build-time define so code that
  // references this global (e.g. apps/extension/src/index.ts, the
  // vocabulary Worker's production bootstrap) evaluates identically under
  // test.
  define: {
    __TAVERN_CANVAS_VERSION__: JSON.stringify(package_metadata.version),
  },
  test: {
    projects: [
      {
        test: {
          name: "packages",
          include: ["packages/**/*.test.ts", "packages/**/*.spec.ts"],
        },
      },
      {
        define: {
          __TAVERN_CANVAS_VERSION__: JSON.stringify(package_metadata.version),
        },
        test: {
          name: "apps",
          include: ["apps/**/*.test.ts", "apps/**/*.spec.ts"],
          environment: "happy-dom",
        },
        plugins: [vue()],
      },
      {
        test: {
          name: "tools",
          include: ["tools/**/*.test.ts", "tools/**/*.spec.ts"],
        },
      },
      {
        resolve: {
          alias: workspace_alias,
        },
        test: {
          name: "integration",
          include: ["tests/integration/**/*.test.ts", "tests/integration/**/*.spec.ts"],
          environment: "node",
        },
      },
    ],
  },
});
