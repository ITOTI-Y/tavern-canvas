import tokens_stylesheet from "./tokens.css?inline";
import base_stylesheet from "./base.css?inline";
import utilities_stylesheet from "./utilities.css?inline";
import experience_stylesheet from "../experience/experience.module.css?inline";
import floating_window_stylesheet from "../experience/floating_window.module.css?inline";
import shell_stylesheet from "../shell/shell.module.css?inline";

/**
 * Shadow DOM does not inherit page stylesheets: every first-party CSS Module must either be imported
 * here or be registered through `deferred_stylesheets.ts`, or its rules never reach the shadow root.
 */
const ASSET_URL_MARKER_PATTERN = /__TAVERN_CANVAS_ASSET_URL__(.*?)__/gu;

/** Replaces `renderBuiltUrl` asset markers with absolute URLs resolved from `import.meta.url`, since the stylesheet is injected as text. */
function resolve_asset_urls(css: string): string {
  return css.replaceAll(
    ASSET_URL_MARKER_PATTERN,
    (_match, relative_path: string) => new URL(relative_path, import.meta.url).href,
  );
}

export const FIRST_PARTY_STYLESHEET = resolve_asset_urls(
  [
    tokens_stylesheet,
    base_stylesheet,
    utilities_stylesheet,
    experience_stylesheet,
    floating_window_stylesheet,
    shell_stylesheet,
  ].join("\n"),
);
