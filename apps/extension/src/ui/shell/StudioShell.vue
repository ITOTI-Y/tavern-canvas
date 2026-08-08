<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from "vue";
import { useI18n } from "vue-i18n";

import type { StudioRoute, StudioState } from "../contracts/view_models.js";
import type { StudioController } from "../controllers/studio_controller.js";
import { route_label } from "./route_nav.js";
import styles from "./shell.module.css";
import StudioWorkspace from "./StudioWorkspace.vue";
import TaskStrip from "./TaskStrip.vue";
import TopCommandBar from "./TopCommandBar.vue";
import { use_shell_viewport, type ShellViewport } from "./use_shell_viewport.js";

/**
 * The four viewport-exclusive surfaces. Each is rendered behind a `viewport === ...` guard, so a
 * desktop session never needs the mobile drawer or the dropdown navigation and a mobile session
 * never needs the rail or the docked inspector; loading both halves eagerly put Reka's Drawer,
 * DropdownMenu and the Floating UI positioning engine into every session's initial payload.
 */
const ContextInspector = defineAsyncComponent(() => import("./ContextInspector.vue"));
const DesktopIconRail = defineAsyncComponent(() => import("./DesktopIconRail.vue"));
const InspectorSheet = defineAsyncComponent(() => import("./InspectorSheet.vue"));
const MobileBottomNav = defineAsyncComponent(() => import("./MobileBottomNav.vue"));

const props = defineProps<{
  state: StudioState;
  controller: StudioController;
  /** Forces desktop/mobile instead of tracking `matchMedia` -- see use_shell_viewport.ts. */
  viewport?: ShellViewport;
}>();

const emit = defineEmits<{
  "select-route": [route: StudioRoute];
  "set-inspector-collapsed": [collapsed: boolean];
  "resize-inspector": [width: number];
}>();

const { t } = useI18n();
const viewport = use_shell_viewport(props.viewport);

// "Startup loading" and "partial initialization" (task-2-brief.md's shell-level states) are both
// driven directly by StudioState -- loading.size > 0 while any of the nine capability slices is
// still resolving its first load, failures.size > 0 once at least one slice has settled with an
// error. The two are not mutually exclusive: some slices can still be loading while others have
// already failed.
/**
 * The startup skeleton stands in for the whole workspace, so it must never be raised by a load the
 * workspace itself started: swapping the routed view out for a skeleton unmounts it, and the view
 * comes back having lost every piece of local state, including which tab was open. The vocabulary
 * catalog is the one slice loaded on demand from inside a view (VocabularyPanel), so it drives that
 * panel's own surface and nothing above it.
 */
const ON_DEMAND_SLICES: ReadonlySet<string> = new Set(["vocabulary"]);
const is_loading = computed(() =>
  [...props.state.loading].some((capability_id) => !ON_DEMAND_SLICES.has(capability_id)),
);
const has_failures = computed(() => props.state.failures.size > 0);
const inspector_style = computed(() => ({
  "--tc-inspector-width": `${String(props.state.inspector.width)}px`,
}));

// StudioState.inspector.collapsed defaults to false (create_initial_state, studio_controller.ts):
// a sensible default for the *desktop* persistent panel (visible unless the user hides it), but
// wrong for the *mobile* sheet -- a modal overlay must never auto-open over the workspace on
// first paint just because the shared "collapsed" flag happens to default to false. Mobile's open
// state is therefore local, always starting closed, and only forwards to set-inspector-collapsed
// (keeping the persisted preference in sync for whenever the viewport becomes desktop again).
const mobile_inspector_open = ref(false);

const top_bar_inspector_collapsed = computed(() =>
  viewport.value === "mobile" ? !mobile_inspector_open.value : props.state.inspector.collapsed,
);

function handle_set_inspector_collapsed(collapsed: boolean): void {
  if (viewport.value === "mobile") {
    mobile_inspector_open.value = !collapsed;
  }
  emit("set-inspector-collapsed", collapsed);
}

function select_route(route: StudioRoute): void {
  emit("select-route", route);
}
</script>

<template>
  <div
    :class="styles.shell"
    :data-viewport="viewport"
    :data-inspector-collapsed="viewport === 'desktop' ? props.state.inspector.collapsed : null"
    :style="inspector_style"
  >
    <TopCommandBar
      :route="props.state.route"
      :inspector-collapsed="top_bar_inspector_collapsed"
      @set-inspector-collapsed="handle_set_inspector_collapsed"
    />

    <DesktopIconRail
      v-if="viewport === 'desktop'"
      :route="props.state.route"
      @select="select_route"
    />

    <main :class="styles.workspace" data-testid="workspace">
      <div v-if="has_failures" :class="styles.partial_banner" data-testid="partial-banner">
        <div>
          <p>{{ t("app.partial_init.banner_title") }}</p>
          <p>{{ t("app.partial_init.banner_description") }}</p>
        </div>
        <button
          type="button"
          class="tc-interactive"
          :class="styles.icon_button"
          data-testid="partial-banner-diagnostics"
          @click="select_route('diagnostics')"
        >
          {{ route_label(t, "diagnostics") }}
        </button>
      </div>

      <div
        v-if="is_loading"
        :class="styles.workspace_placeholder"
        data-testid="workspace-skeleton"
        role="status"
        :aria-label="t('status.loading')"
      >
        <div :class="styles.skeleton_block" style="width: 40%; height: 20px" />
        <div :class="styles.skeleton_block" style="width: 90%; height: 14px; margin-top: 12px" />
        <div :class="styles.skeleton_block" style="width: 75%; height: 14px; margin-top: 8px" />
      </div>
      <StudioWorkspace v-else :state="props.state" :controller="props.controller" />
    </main>

    <ContextInspector
      v-if="viewport === 'desktop' && !props.state.inspector.collapsed"
      :width="props.state.inspector.width"
      :selection="props.state.inspector.selected_record"
      @resize="(width) => emit('resize-inspector', width)"
    />

    <TaskStrip :tasks="props.state.tasks" />

    <MobileBottomNav
      v-if="viewport === 'mobile'"
      :route="props.state.route"
      @select="select_route"
    />

    <InspectorSheet
      v-if="viewport === 'mobile'"
      :open="mobile_inspector_open"
      :selection="props.state.inspector.selected_record"
      @update:open="(open) => handle_set_inspector_collapsed(!open)"
    />
  </div>
</template>
