import tokens_stylesheet from "./tokens.css?inline";
import base_stylesheet from "./base.css?inline";
import utilities_stylesheet from "./utilities.css?inline";
import components_stylesheet from "../components/components.module.css?inline";
import dialogs_stylesheet from "../dialogs/dialogs.module.css?inline";
import experience_stylesheet from "../experience/experience.module.css?inline";
import shell_stylesheet from "../shell/shell.module.css?inline";
import assets_view_stylesheet from "../views/assets/assets.module.css?inline";
import diagnostics_view_stylesheet from "../views/diagnostics/diagnostics.module.css?inline";
import gallery_view_stylesheet from "../views/gallery/gallery.module.css?inline";
import prompt_view_stylesheet from "../views/prompt/prompt.module.css?inline";
import settings_view_stylesheet from "../views/settings/settings.module.css?inline";
import workbench_view_stylesheet from "../views/workbench/workbench.module.css?inline";

/**
 * The full first-party stylesheet injected into the Shadow Root's own `<style>` element
 * (create_shadow_root.ts) -- Shadow DOM content never inherits page-level `<link>` stylesheets,
 * so this is the *only* place these rules actually reach the running extension. Vite's
 * `cssCodeSplit: false` (apps/extension/vite.config.ts) merges every reachable stylesheet into
 * one physical `dist/index.css`, but that file is never linked into the host page -- nothing
 * automatically feeds its content into the shadow root. Each `?inline` import below pulls in that
 * one file's own processed CSS (CSS Modules' scoped class names included, resolved deterministically
 * by file path so they match the exact names each Vue component's `styles.xxx` binding uses) as a
 * string; joined together they become the shadow root's real, complete stylesheet.
 *
 * IMPORTANT for later Stage 06 tasks: every new first-party CSS Module a component imports (Task
 * 4's components.module.css, any per-view stylesheet Tasks 5-7 add) must be added here too, or
 * its rules will silently never reach the Shadow Root at runtime -- unit tests (happy-dom) cannot
 * catch this, since they never exercise the real Vite build's CSS pipeline; only a real browser
 * build+run (task-2-brief.md's Step 4 harness, Task 8's formal harness) surfaces it.
 *
 * Task 8 found this had already happened: prompt.module.css, workbench.module.css,
 * diagnostics.module.css, and settings.module.css (all four of T5's and T7's own per-view
 * stylesheets) were never added here, so once Task 8 actually wired real views into every route
 * (the routing-wiring gap, task-8-report.md) those four views rendered completely unstyled in the
 * real Shadow Root -- exactly the class of defect this file's own header comment already warned
 * about. Fixed by adding all four below.
 */
const ASSET_URL_MARKER_PATTERN = /__TAVERN_CANVAS_ASSET_URL__(.*?)__/gu;

/**
 * vite.config.ts's `renderBuiltUrl` emits `__TAVERN_CANVAS_ASSET_URL__<relative-path>__` markers
 * in place of every CSS-referenced asset URL (currently just the Geist font's `@font-face src`)
 * instead of the default root-absolute path, which is wrong for this extension (see that config's
 * comment). Substituting each marker with an absolute URL resolved from `import.meta.url` --
 * `dist/index.js`'s own real, load-time-known location -- is the only correct way to reference a
 * sibling build asset from a stylesheet that is injected as plain text, not loaded as a real
 * linked `.css` file (Shadow DOM content never inherits page-level `<link>` stylesheets either
 * way).
 */
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
    // components.module.css (Task 4) was never actually wired in here despite this file's own
    // header comment already flagging the requirement -- every shared control's real CSS (AppButton,
    // AppDialog, ConfirmDialog, FieldGroup, NumberStepper, StateSurface, ...) was silently never
    // reaching the Shadow Root at runtime. Found while browser-smoking Task 6's views, which lean on
    // most of these controls; fixed here since it blocks meaningful visual verification of any view,
    // not just this task's.
    components_stylesheet,
    experience_stylesheet,
    dialogs_stylesheet,
    shell_stylesheet,
    assets_view_stylesheet,
    gallery_view_stylesheet,
    workbench_view_stylesheet,
    prompt_view_stylesheet,
    diagnostics_view_stylesheet,
    settings_view_stylesheet,
  ].join("\n"),
);
