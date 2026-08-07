<script setup lang="ts">
import { computed, watch } from "vue";
import { useI18n } from "vue-i18n";

import type { StartupStatus } from "../bootstrap/startup_error.js";
import { MINIMUM_TAVERN_HELPER_VERSION, type BootstrapProbeResult } from "../host/index.js";
import type { StudioCapabilities } from "./contracts/ui_capabilities.js";
import type { StudioRoute } from "./contracts/view_models.js";
import { create_unavailable_capabilities } from "./controllers/unavailable_capabilities.js";
import { use_studio_controller } from "./controllers/use_studio_controller.js";
import PortalProvider from "./shell/PortalProvider.vue";
import styles from "./shell/shell.module.css";
import StudioShell from "./shell/StudioShell.vue";

const props = defineProps<{
  /** Derived from BootstrapHandle.state -- authoritative for which of the five shell-level
   * states to render. Only `.title`/`.message` (pre-formatted English) are ignored in favor of
   * this component's own i18n-driven copy; `.state` and (for "blocked") `.update_url` still come
   * from here. */
  status: StartupStatus;
  /** Carries the structured data the blocked screen needs (current/required version) that
   * StartupStatus's pre-formatted strings do not expose. */
  probe: BootstrapProbeResult;
  version: string;
  portalTarget: HTMLElement;
  /** The Shadow Root host element (create_shadow_root.ts) -- color_mode is reflected onto it as
   * `data-color-mode`, per tokens.css's single dark-mode override block. */
  hostElement: HTMLElement;
  /** No real capability adapters exist yet (see unavailable_capabilities.ts); production
   * bootstrap wiring supplies the placeholder, tests can supply mocks directly. */
  capabilities?: StudioCapabilities;
}>();

const { t } = useI18n();

function detect_system_color_mode(): "light" | "dark" {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return "light";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// `hostElement` is an imperative DOM node reference the Shadow Root already owns (not reactive
// app state) -- read once into a local binding so mutating its dataset doesn't read as a Vue
// prop mutation (vue/no-mutating-props), which is meant for reactive data, not a passed-through
// element handle.
const host_element = props.hostElement;

const initial_color_mode = detect_system_color_mode();
// Applied unconditionally (even on the blocked/failed screens) so the whole Shadow Root -- not
// just the eventual normal studio -- respects the system theme from first paint.
host_element.dataset.colorMode = initial_color_mode;

// probe and status are two independent discriminated unions describing the same bootstrap
// outcome (see BootstrapOptions/BootstrapHandle in bootstrap.ts); `current_version` only exists
// on probe's not-ready branch, and only ever carries a value for "helper_version_unsupported".
const current_version = computed(() =>
  !props.probe.ready ? props.probe.current_version : undefined,
);
const eyebrow = computed(
  () => `${t("app.name")} ${t("app.version_label", { version: props.version })}`,
);

const studio =
  props.status.state === "ready"
    ? use_studio_controller({
        capabilities: props.capabilities ?? create_unavailable_capabilities(),
        initial_color_mode,
      })
    : null;

if (studio) {
  watch(
    () => studio.state.value.color_mode,
    (color_mode) => {
      host_element.dataset.colorMode = color_mode;
    },
  );
}

function select_route(route: StudioRoute): void {
  studio?.controller.set_route(route);
}

function set_inspector_collapsed(collapsed: boolean): void {
  studio?.controller.set_inspector_collapsed(collapsed);
}

function resize_inspector(width: number): void {
  studio?.controller.set_inspector_width(width);
}

function reload(): void {
  window.location.reload();
}
</script>

<template>
  <PortalProvider :portal-target="portalTarget">
    <div
      v-if="status.state === 'blocked'"
      :class="styles.state_screen"
      data-startup-state="blocked"
    >
      <p :class="styles.state_screen_eyebrow">{{ eyebrow }}</p>
      <h1 :class="styles.state_screen_title">{{ t("app.unsupported_host.title") }}</h1>
      <p :class="styles.state_screen_description">
        {{
          t("app.unsupported_host.description", {
            required_version: MINIMUM_TAVERN_HELPER_VERSION,
            current_version: current_version ?? t("status.unknown"),
          })
        }}
      </p>
      <a
        class="tc-interactive"
        :class="styles.state_screen_action"
        :href="status.update_url"
        target="_blank"
        rel="noreferrer"
      >
        {{ t("app.unsupported_host.update_action") }}
      </a>
    </div>

    <div
      v-else-if="status.state === 'failed'"
      :class="styles.state_screen"
      data-startup-state="failed"
    >
      <p :class="styles.state_screen_eyebrow">{{ eyebrow }}</p>
      <h1 :class="styles.state_screen_title">{{ t("app.fatal_error.title") }}</h1>
      <p :class="styles.state_screen_description">{{ t("app.fatal_error.description") }}</p>
      <button
        type="button"
        class="tc-interactive"
        :class="styles.state_screen_action"
        @click="reload"
      >
        {{ t("app.fatal_error.reload_action") }}
      </button>
    </div>

    <StudioShell
      v-else-if="studio"
      :state="studio.state.value"
      @select-route="select_route"
      @set-inspector-collapsed="set_inspector_collapsed"
      @resize-inspector="resize_inspector"
    />
  </PortalProvider>
</template>
