declare const __TAVERN_CANVAS_VERSION__: string;

// These plain imports make the build emit dist/index.css (required by assert_bundle.mjs); the Shadow
// Root's stylesheet is FIRST_PARTY_STYLESHEET.
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
