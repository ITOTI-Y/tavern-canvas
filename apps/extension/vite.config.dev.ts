import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

import package_metadata from "../../package.json" with { type: "json" };

const DEV_PORT = 5182;
const DEV_ORIGIN = `http://localhost:${String(DEV_PORT)}`;

/**
 * The dev server a *real*, running SillyTavern loads the extension from, in place of dist/index.js.
 * Paired with tools/dev_loader/, whose one-line module imports src/dev/dev_entry.ts from this
 * server; see that directory's README for the install step.
 *
 * This is a server-only config: it never builds anything, and it deliberately does not touch
 * vite.config.ts's `build`/`experimental` blocks, which describe the shipped bundle and must stay
 * the single description of it.
 *
 * Three settings exist purely because the page loading these modules is served from a *different*
 * origin (SillyTavern's) than the modules themselves:
 *
 * - `origin` makes Vite emit absolute URLs for anything it rewrites -- most importantly the Geist
 *   `@font-face src` inside the `?inline` CSS that becomes the Shadow Root's stylesheet. That text
 *   is injected as a plain string into a `<style>` element, so the browser resolves any relative
 *   url() against SillyTavern's document URL, not against this server. It is the dev-mode form of
 *   the same problem vite.config.ts's `renderBuiltUrl` marker solves for the shipped build.
 * - `cors.origin` allow-lists the loopback and private-network origins a local SillyTavern is
 *   reachable on. Vite denies cross-origin requests by default (CVE-2025-24010); a cross-origin
 *   ES module import needs the header, so without this every import fails before it runs.
 * - `host: true` binds every interface, not just loopback: under WSL the browser and SillyTavern
 *   run on the Windows side while this server runs inside the distro.
 *
 * SillyTavern itself imposes no obstacle: it loads `manifest.json`'s `js` as an ES module and runs
 * helmet with `contentSecurityPolicy: false` (its src/server-main.js), so a cross-origin import is
 * neither blocked nor downgraded.
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
