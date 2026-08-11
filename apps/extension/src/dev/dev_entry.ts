declare const __TAVERN_CANVAS_VERSION__: string;

import { bootstrap_tavern_canvas } from "../bootstrap/bootstrap.js";
import { bind_shadow_root_stylesheet, INITIAL_STYLESHEET } from "./stylesheet_hmr.js";

/**
 * The dev server's entry point, loaded into a real running SillyTavern by the dev loader extension
 * (tools/dev_loader/) instead of dist/index.js. Everything it boots is production code: the same
 * `bootstrap_tavern_canvas` composition root src/index.ts calls, against the real host globals.
 *
 * It exists as a separate entry from src/index.ts for two reasons, both about what a *reloadable*
 * entry has to do that a shipped one does not:
 *
 * - Disposal. src/index.ts bootstraps at module top level, which is correct exactly once. Under
 *   HMR that module can re-execute, and a second bootstrap would leave the first one's Vue app,
 *   host event subscriptions, IndexedDB handles and Worker running with nothing holding them --
 *   create_shadow_root.ts removes the stale `#tavern-canvas-root` element, so the leak would be
 *   invisible in the DOM while still firing. The dispose hook below tears the old instance down
 *   before the new module body runs.
 * - Stylesheet binding. A CSS edit has to reach the Shadow Root's `<style>` element, which
 *   bootstrap owns rather than returns (stylesheet_hmr.ts).
 *
 * The four plain stylesheet imports src/index.ts carries are deliberately absent: their only job
 * there is to make the production build emit dist/index.css, and no build runs here.
 */

/** Carried across module re-executions by Vite, so a replacement instance can wait for its
 * predecessor's teardown instead of racing it. */
interface DevEntryHotData {
  dispose_previous?: Promise<void>;
}

// `hot.dispose` is a synchronous API, but bootstrap's teardown is not: it unmounts Vue, drops host
// subscriptions, closes the database and stops the Worker runtime. Awaiting the previous instance's
// teardown promise here -- rather than firing it and forgetting -- is what keeps a fast series of
// edits from stacking two live Studios against one IndexedDB connection.
await (import.meta.hot?.data as DevEntryHotData | undefined)?.dispose_previous;

const handle = await bootstrap_tavern_canvas({
  stylesheet: INITIAL_STYLESHEET,
  version: `${__TAVERN_CANVAS_VERSION__}-dev`,
  composition: {
    // A Worker script must be same-origin, and these modules are served from the dev server while
    // the page is SillyTavern's -- `new Worker(new URL(..., import.meta.url))` therefore throws
    // SecurityError here, and would do so from inside VocabularyClient at first search. Declining
    // the worker up front turns that into the capability's own designed unavailable state, which
    // Diagnostics reports with a reason. Vocabulary search itself is unaffected under `pnpm dev`
    // and `pnpm dev:host`, where page and modules share an origin.
    create_vocabulary_worker: null,
  },
});

const shadow_root = document.getElementById("tavern-canvas-root")?.shadowRoot;
if (shadow_root) {
  bind_shadow_root_stylesheet(shadow_root);
}

if (import.meta.hot) {
  // Runs before the replacement module body: Vue app unmounted, host subscriptions dropped,
  // composition and runtime stopped (bootstrap.ts's own dispose()). The promise is handed forward
  // through `data` for the replacement to await.
  import.meta.hot.dispose((data: DevEntryHotData) => {
    data.dispose_previous = handle.dispose();
  });
  import.meta.hot.accept();
}

export const bootstrap_handle = handle;
