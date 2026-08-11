import { createApp } from "vue";

import type { StartupStatus } from "../../../apps/extension/src/bootstrap/startup_error.js";
import type { BootstrapProbeResult } from "../../../apps/extension/src/host/index.js";
import { create_i18n } from "../../../apps/extension/src/i18n/create_i18n.js";
import AppRoot from "../../../apps/extension/src/ui/AppRoot.vue";
import { create_shadow_root } from "../../../apps/extension/src/ui/create_shadow_root.js";
import {
  bind_shadow_root_stylesheet,
  INITIAL_STYLESHEET,
} from "../../../apps/extension/src/dev/stylesheet_hmr.js";
import { create_mock_capabilities, type ScenarioName } from "./mock_capabilities.js";

/**
 * Stage 06 Task 8's harness entry point. Mounts the REAL, unmodified production component tree
 * (AppRoot.vue -- the same component apps/extension/src/bootstrap/bootstrap.ts mounts) inside an
 * actual Shadow Root, exactly as production does (create_shadow_root.ts, FIRST_PARTY_STYLESHEET,
 * create_i18n.ts). The one substitution is `capabilities`: production wires
 * create_unavailable_capabilities() (unavailable_capabilities.ts); this harness wires
 * mock_capabilities.ts's deterministic, interactive fixtures instead, through the exact same
 * `capabilities?` extension point AppRoot.vue already exposes for tests ("tests can supply mocks
 * directly", per that prop's own doc comment) -- nothing about AppRoot, StudioShell, or any view
 * is different from production.
 *
 * Everything else the test suite needs to vary (scenario/locale) is read from the URL query
 * string at load time, so a Playwright test selects a state by navigating to a URL
 * (`studio_host.html?scenario=full&locale=zh-CN`) rather than through any harness-only backdoor
 * API. Route and color-mode are deliberately NOT harness parameters: route changes through the
 * real desktop rail/mobile nav (exactly what studio_navigation.spec.ts exercises), and color mode
 * follows `prefers-color-scheme` exactly like production (AppRoot.vue's own
 * `detect_system_color_mode`) -- Playwright's `page.emulateMedia({ colorScheme })` drives it from
 * the outside, no separate code path to keep in sync.
 */

const params = new URLSearchParams(window.location.search);
const scenario = (params.get("scenario") ?? "full") as ScenarioName;
const locale = params.get("locale") === "zh-CN" ? "zh-CN" : "en";

const document_ = document;
const surface = create_shadow_root(document_, INITIAL_STYLESHEET);
// Dev server only: a CSS edit rewrites this Shadow Root's <style> in place instead of
// reloading the page. Inert in the built harness (stylesheet_hmr.ts).
bind_shadow_root_stylesheet(surface.shadow_root);
const locale_runtime = create_i18n();

const status: StartupStatus = {
  state: "ready",
  title: "TavernCanvas ready",
  message: "Studio harness",
};
const probe: BootstrapProbeResult = {
  ready: true,
  matrix: {},
  helper_version: "4.9.1",
};

const app = createApp(AppRoot, {
  status,
  probe,
  version: "harness",
  portalTarget: surface.portal_element,
  hostElement: surface.host_element,
  capabilities: create_mock_capabilities(scenario),
});
app.use(locale_runtime.i18n);
app.mount(surface.app_element);

async function signal_ready(): Promise<void> {
  await locale_runtime.apply_locale(locale, locale);
  await document_.fonts.ready;
  // One more animation frame after fonts settle so any layout the font swap triggers (Geist's
  // metrics differ from the fallback stack) has actually painted before a test starts measuring
  // or screenshotting -- matches Step 3's "stable fonts" requirement.
  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      resolve();
    });
  });
  document_.documentElement.dataset.studioHarnessReady = "true";
}

void signal_ready();
