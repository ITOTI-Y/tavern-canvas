<script setup lang="ts">
import { computed, defineAsyncComponent, provide, ref } from "vue";
import { useI18n } from "vue-i18n";

import ToastViewport, { type ToastItem } from "../components/ToastViewport.vue";
import { DEFER_DELETION_KEY } from "../contracts/portal_keys.js";
import type { DeletionSubject, StudioRoute, StudioState } from "../contracts/view_models.js";
import { DELETION_UNDO_MS, type StudioController } from "../controllers/studio_controller.js";
import styles from "./shell.module.css";
import StudioWorkspace from "./StudioWorkspace.vue";
import TopCommandBar from "./TopCommandBar.vue";
import { use_shell_viewport, type ShellViewport } from "./use_shell_viewport.js";

const ContextInspector = defineAsyncComponent(() => import("./ContextInspector.vue"));
const InspectorSheet = defineAsyncComponent(() => import("./InspectorSheet.vue"));
const MobileBottomNav = defineAsyncComponent(() => import("./MobileBottomNav.vue"));

const props = defineProps<{
  state: StudioState;
  controller: StudioController;
  viewport?: ShellViewport;
}>();

const emit = defineEmits<{
  "select-route": [route: StudioRoute];
  "set-inspector-collapsed": [collapsed: boolean];
  "resize-inspector": [width: number];
  close: [];
}>();

const { t } = useI18n();
const viewport = use_shell_viewport(props.viewport);

/** The startup skeleton must not be raised by loads the workspace starts itself (the vocabulary catalog): unmounting the routed view discards its local state. */
const ON_DEMAND_SLICES: ReadonlySet<string> = new Set(["vocabulary"]);
const is_loading = computed(() =>
  [...props.state.loading].some((capability_id) => !ON_DEMAND_SLICES.has(capability_id)),
);
const has_failures = computed(() => props.state.failures.size > 0);
const inspector_style = computed(() => ({
  "--tc-inspector-width": `${String(props.state.inspector.width)}px`,
}));

const mobile_inspector_open = ref(false);

const context_inspector_available = computed(() => props.state.route === "gallery");
const desktop_inspector_collapsed = computed(
  () => !context_inspector_available.value || props.state.inspector.collapsed,
);

const top_bar_inspector_collapsed = computed(() =>
  viewport.value === "mobile" ? !mobile_inspector_open.value : desktop_inspector_collapsed.value,
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

provide(DEFER_DELETION_KEY, (subject, actions) => {
  props.controller.defer_deletion(subject, actions);
});

function deleted_text(subject: DeletionSubject): string {
  return subject.label === null
    ? t("app.deletion.deleted_count", { n: subject.count })
    : t("app.deletion.deleted_named", { name: subject.label });
}

/** Deletion toasts the user closed; the deletion itself still runs. */
const closed_toasts = ref<ReadonlySet<string>>(new Set());

const deletion_toasts = computed<readonly ToastItem[]>(() => [
  ...props.state.pending_deletions
    .filter((item) => !closed_toasts.value.has(item.id))
    .map((item) => ({
      id: item.id,
      title: deleted_text(item),
      duration: DELETION_UNDO_MS,
      action: {
        label: t("app.deletion.undo"),
        run: () => {
          props.controller.undo_deletion(item.id);
        },
      },
    })),
  ...(props.state.deletion_failure === null
    ? []
    : [
        {
          id: "deletion-failure",
          title: t("app.deletion.failed"),
          description: props.state.deletion_failure.message,
          variant: "error" as const,
        },
      ]),
]);

function close_deletion_toast(id: string): void {
  if (id === "deletion-failure") {
    props.controller.dismiss_deletion_failure();
    return;
  }
  closed_toasts.value = new Set([...closed_toasts.value, id]);
}
</script>

<template>
  <div
    :class="styles.shell"
    :data-viewport="viewport"
    :data-inspector-collapsed="viewport === 'desktop' ? desktop_inspector_collapsed : null"
    :style="inspector_style"
  >
    <TopCommandBar
      :route="props.state.route"
      :tasks="props.state.tasks"
      :show-tabs="viewport === 'desktop'"
      :inspector-collapsed="top_bar_inspector_collapsed"
      :inspector-available="context_inspector_available"
      @select-route="select_route"
      @set-inspector-collapsed="handle_set_inspector_collapsed"
      @clear-failed-tasks="() => void props.controller.dismiss_failed_tasks()"
      @close="emit('close')"
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
          @click="props.controller.set_settings_section('diagnostics')"
        >
          {{ t("settings.nav.diagnostics") }}
        </button>
      </div>

      <div
        v-if="is_loading"
        :class="styles.workspace_placeholder"
        data-testid="workspace-skeleton"
        role="status"
        :aria-label="t('status.loading')"
      >
        <div :class="[styles.skeleton_block, styles.skeleton_title]" />
        <div :class="[styles.skeleton_block, styles.skeleton_line]" />
        <div :class="[styles.skeleton_block, styles.skeleton_line_short]" />
      </div>
      <StudioWorkspace v-else :state="props.state" :controller="props.controller" />
    </main>

    <ContextInspector
      v-if="
        viewport === 'desktop' && context_inspector_available && !props.state.inspector.collapsed
      "
      :width="props.state.inspector.width"
      :selection="props.state.inspector.selected_record"
      @resize="(width) => emit('resize-inspector', width)"
    />

    <MobileBottomNav
      v-if="viewport === 'mobile'"
      :route="props.state.route"
      @select="select_route"
    />

    <InspectorSheet
      v-if="viewport === 'mobile' && context_inspector_available"
      :open="mobile_inspector_open"
      :selection="props.state.inspector.selected_record"
      @update:open="(open) => handle_set_inspector_collapsed(!open)"
    />

    <ToastViewport
      :toasts="deletion_toasts"
      :viewport-label="t('common.notifications.viewport_label')"
      :announce-label="t('common.notifications.announce_label')"
      :close-label="t('common.actions.close')"
      @dismiss="close_deletion_toast"
    />
  </div>
</template>
