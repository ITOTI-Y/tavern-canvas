declare const __TAVERN_CANVAS_VERSION__: string;

// Plain (non-inline) imports of every first-party stylesheet, purely so Vite's cssCodeSplit:false
// build still emits dist/index.css (apps/extension/scripts/assert_bundle.mjs requires it to
// exist) and processes the Geist font's url() into a real emitted asset. Their content there is
// otherwise inert: nothing ever links dist/index.css into the host page. The Shadow Root's real
// stylesheet is FIRST_PARTY_STYLESHEET (runtime_stylesheet.ts), built from the same files'
// `?inline` text.
import "./ui/styles/tokens.css";
import "./ui/styles/base.css";
import "./ui/styles/utilities.css";
import "./ui/shell/shell.module.css";

import { bootstrap_tavern_canvas } from "./bootstrap/bootstrap.js";
import { wait_for_sillytavern_app_ready } from "./bootstrap/host_readiness.js";
import { FIRST_PARTY_STYLESHEET } from "./ui/styles/runtime_stylesheet.js";

export const bootstrap_handle = wait_for_sillytavern_app_ready(globalThis).then(() =>
  bootstrap_tavern_canvas({
    stylesheet: FIRST_PARTY_STYLESHEET,
    version: __TAVERN_CANVAS_VERSION__,
  }),
);
