declare const __TAVERN_CANVAS_VERSION__: string;

import { bootstrap_tavern_canvas } from "../bootstrap/bootstrap.js";
import { bind_shadow_root_stylesheet, INITIAL_STYLESHEET } from "./stylesheet_hmr.js";

interface DevEntryHotData {
  dispose_previous?: Promise<void>;
}

// Awaiting the previous teardown keeps a fast series of edits from stacking two live Studios on one IndexedDB connection.
await (import.meta.hot?.data as DevEntryHotData | undefined)?.dispose_previous;

const handle = await bootstrap_tavern_canvas({
  stylesheet: INITIAL_STYLESHEET,
  version: `${__TAVERN_CANVAS_VERSION__}-dev`,
  composition: {
    // Worker scripts must be same-origin, but these modules are served from the dev server while the page is SillyTavern's.
    create_vocabulary_worker: null,
  },
});

const shadow_root = document.getElementById("tavern-canvas-root")?.shadowRoot;
if (shadow_root) {
  bind_shadow_root_stylesheet(shadow_root);
}

if (import.meta.hot) {
  import.meta.hot.dispose((data: DevEntryHotData) => {
    data.dispose_previous = handle.dispose();
  });
  import.meta.hot.accept();
}

export const bootstrap_handle = handle;
