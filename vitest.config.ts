import { defineConfig } from "vitest/config";

export default defineConfig({
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
      },
      {
        test: {
          name: "tools",
          include: ["tools/**/*.test.ts", "tools/**/*.spec.ts"],
        },
      },
      {
        test: {
          name: "integration",
          include: ["tests/integration/**/*.test.ts", "tests/integration/**/*.spec.ts"],
        },
      },
    ],
  },
});
