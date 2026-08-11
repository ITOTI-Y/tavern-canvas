import { resolve } from "node:path";

import { defineConfig } from "vite";

export default defineConfig({
  build: {
    emptyOutDir: true,
    minify: false,
    outDir: resolve(import.meta.dirname, "dist"),
    rolldownOptions: {
      output: {
        entryFileNames: "index.js",
      },
    },
    ssr: resolve(import.meta.dirname, "src/index.ts"),
    target: "node24",
  },
  ssr: {
    noExternal: [/^@tavern-canvas\//u, "@noble/hashes", "zod"],
  },
});
