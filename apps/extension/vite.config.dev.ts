import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

import package_metadata from "../../package.json" with { type: "json" };

const DEV_PORT = 5182;
const DEV_ORIGIN = `http://localhost:${String(DEV_PORT)}`;

/**
 * Dev server that a running SillyTavern loads the extension from. `origin` makes Vite emit absolute
 * URLs, because the `?inline` CSS is injected as a string and relative `url()` would resolve against
 * SillyTavern. `cors.origin` allow-lists loopback and private-network origins (Vite denies
 * cross-origin requests by default). `host: true` is needed under WSL.
 */
export default defineConfig({
  root: import.meta.dirname,
  plugins: [vue()],
  define: {
    __TAVERN_CANVAS_VERSION__: JSON.stringify(package_metadata.version),
  },
  server: {
    port: DEV_PORT,
    strictPort: true,
    host: true,
    origin: DEV_ORIGIN,
    cors: {
      origin: [
        /^https?:\/\/localhost(:\d+)?$/u,
        /^https?:\/\/127\.0\.0\.1(:\d+)?$/u,
        /^https?:\/\/\[::1\](:\d+)?$/u,
        /^https?:\/\/192\.168\.\d{1,3}\.\d{1,3}(:\d+)?$/u,
        /^https?:\/\/10\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?$/u,
        /^https?:\/\/172\.(1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}(:\d+)?$/u,
      ],
    },
  },
});
