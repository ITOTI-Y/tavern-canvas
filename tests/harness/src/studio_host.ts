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

const params = new URLSearchParams(window.location.search);
const scenario = (params.get("scenario") ?? "full") as ScenarioName;
const locale = params.get("locale") === "zh-CN" ? "zh-CN" : "en";

const document_ = document;
const surface = create_shadow_root(document_, INITIAL_STYLESHEET);
// Dev server only: a CSS edit rewrites this Shadow Root's <style> in place.
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
  // One more frame after fonts settle so the font-swap layout has painted before measuring or screenshotting.
  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      resolve();
    });
  });
  document_.documentElement.dataset.studioHarnessReady = "true";
}

void signal_ready();
