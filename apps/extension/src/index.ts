declare const __TAVERN_CANVAS_VERSION__: string;

import "./style.css";
import first_party_stylesheet from "./style.css?inline";

import { bootstrap_tavern_canvas } from "./bootstrap/bootstrap.js";

export const bootstrap_handle = bootstrap_tavern_canvas({
  stylesheet: first_party_stylesheet,
  version: __TAVERN_CANVAS_VERSION__,
});
