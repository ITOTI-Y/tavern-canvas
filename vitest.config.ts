import { fileURLToPath, URL } from "node:url";

import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vitest/config";

const workspace_alias = {
  "@tavern-canvas/contracts": fileURLToPath(
    new URL("./packages/contracts/src/index.ts", import.meta.url),
  ),
  "@tavern-canvas/core": fileURLToPath(new URL("./packages/core/src/index.ts", import.meta.url)),
};

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: workspace_alias,
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
