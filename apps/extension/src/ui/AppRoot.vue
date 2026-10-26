<script setup lang="ts">
import { computed, defineAsyncComponent, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

import type { StartupStatus } from "../bootstrap/startup_error.js";
import {
  MINIMUM_TAVERN_HELPER_VERSION,
  type BootstrapProbeResult,
  type HostAdapter,
} from "../host/index.js";
import type { IllustrationService } from "../modules/illustration/illustration_service.js";
import type { PromptTranslator } from "../modules/translation/prompt_translator.js";
import type { StudioCapabilities } from "./contracts/ui_capabilities.js";
import type { StudioRoute } from "./contracts/view_models.js";
import { create_unavailable_capabilities } from "./controllers/unavailable_capabilities.js";
import { use_studio_controller } from "./controllers/use_studio_controller.js";
import FloatingEntry from "./experience/FloatingEntry.vue";
import { use_extensions_menu_entry } from "./experience/use_extensions_menu_entry.js";
import { use_host_entry_points } from "./experience/use_host_entry_points.js";
import FloatingStudioWindow from "./experience/FloatingStudioWindow.vue";
import PortalProvider from "./shell/PortalProvider.vue";
import styles from "./shell/shell.module.css";
import StudioShell from "./shell/StudioShell.vue";

const props = defineProps<{
  status: StartupStatus;
  probe: BootstrapProbeResult;
  version: string;
  portalTarget: HTMLElement;
  hostElement: HTMLElement;
  capabilities?: StudioCapabilities;
  host?: HostAdapter | null;
  illustrations?: IllustrationService | null;
  translator?: PromptTranslator | null;
}>();

const ChatLayer = defineAsyncComponent(() => import("./chat/ChatLayer.vue"));

const { t } = useI18n();

function detect_system_color_mode(): "light" | "dark" {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return "light";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

const host_element = props.hostElement;

const initial_color_mode = detect_system_color_mode();
host_element.dataset.colorMode = initial_color_mode;

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

const studio_opened = ref(false);
const shell_visible = computed(() => studio_opened.value);
const menu_entry_available = use_extensions_menu_entry(() => t("app.name"), open_studio);
use_host_entry_points(
  {
    name: () => t("app.name"),
    description: () => t("app.entry_description"),
    open: () => t("app.open_action"),
  },
  open_studio,
);
/** Without SillyTavern's extensions menu the floating entry is the only way to open the studio. */
const floating_entry_enabled = computed(
  () =>
    !menu_entry_available.value ||
    studio?.state.value.settings.settings?.ui.optional_entry_enabled === true,
);

watch(
  shell_visible,
  (visible) => {
    host_element.dataset.surfaceMode = visible ? "studio" : "entry";
  },
  { immediate: true },
);

function open_studio(): void {
  studio_opened.value = true;
}

function close_studio(): void {
  studio_opened.value = false;
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

    <template v-else-if="studio">
      <FloatingStudioWindow v-if="shell_visible" :label="t('app.name')">
        <StudioShell
          :state="studio.state.value"
          :controller="studio.controller"
          @select-route="select_route"
          @set-inspector-collapsed="set_inspector_collapsed"
          @resize-inspector="resize_inspector"
          @close="close_studio"
        />
      </FloatingStudioWindow>
      <FloatingEntry
        :enabled="floating_entry_enabled && !shell_visible"
        :open-label="t('app.name')"
        @open="open_studio"
      />
      <ChatLayer
        v-if="host && illustrations && capabilities"
        :host="host"
        :service="illustrations"
        :gallery="capabilities.gallery"
        :novelai="capabilities.novelai"
        :translator="translator ?? null"
      />
    </template>
  </PortalProvider>
</template>
