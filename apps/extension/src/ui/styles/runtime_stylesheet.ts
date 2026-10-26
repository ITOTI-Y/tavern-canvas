import tokens_stylesheet from "./tokens.css?inline";
import base_stylesheet from "./base.css?inline";
import utilities_stylesheet from "./utilities.css?inline";
import components_stylesheet from "../components/components.module.css?inline";
import dialogs_stylesheet from "../dialogs/dialogs.module.css?inline";
import experience_stylesheet from "../experience/experience.module.css?inline";
import floating_window_stylesheet from "../experience/floating_window.module.css?inline";
import shell_stylesheet from "../shell/shell.module.css?inline";
import assets_view_stylesheet from "../views/assets/assets.module.css?inline";
import diagnostics_view_stylesheet from "../views/diagnostics/diagnostics.module.css?inline";
import gallery_view_stylesheet from "../views/gallery/gallery.module.css?inline";
import prompt_view_stylesheet from "../views/prompt/prompt.module.css?inline";
import settings_view_stylesheet from "../views/settings/settings.module.css?inline";
import workbench_view_stylesheet from "../views/workbench/workbench.module.css?inline";

/** Shadow DOM does not inherit page stylesheets: every first-party CSS Module must be imported here, or its rules never reach the shadow root. */
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
    components_stylesheet,
    experience_stylesheet,
    dialogs_stylesheet,
    floating_window_stylesheet,
    shell_stylesheet,
    assets_view_stylesheet,
    gallery_view_stylesheet,
    workbench_view_stylesheet,
    prompt_view_stylesheet,
    diagnostics_view_stylesheet,
    settings_view_stylesheet,
  ].join("\n"),
);
