<script setup lang="ts">
import { Feather, LoaderCircle, PanelRightClose, PanelRightOpen, X } from "lucide-vue-next";
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from "reka-ui";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import AppIcon from "../components/AppIcon.vue";
import AppTooltip from "../components/AppTooltip.vue";
import type { StudioRoute, TaskStripItemViewModel } from "../contracts/view_models.js";
import { route_label, STUDIO_ROUTES } from "./route_nav.js";
import styles from "./shell.module.css";
import TaskStrip from "./TaskStrip.vue";
import { use_portal_target } from "./use_portal_target.js";

const props = defineProps<{
  route: StudioRoute;
  tasks: readonly TaskStripItemViewModel[];
  showTabs: boolean;
  inspectorCollapsed: boolean;
  inspectorAvailable: boolean;
}>();

const emit = defineEmits<{
  "select-route": [route: StudioRoute];
  "set-inspector-collapsed": [collapsed: boolean];
  "clear-failed-tasks": [];
  close: [];
}>();

const { t } = useI18n();
const portal_target = use_portal_target();

const tabs = computed(() =>
  STUDIO_ROUTES.map((item) => ({ ...item, label: route_label(t, item.route) })),
);
const running = computed(() => props.tasks.some((task) => task.status === "pending"));
const toggle_icon = computed(() => (props.inspectorCollapsed ? PanelRightOpen : PanelRightClose));
const toggle_label = computed(() =>
  props.inspectorCollapsed ? t("nav.inspector_expand") : t("nav.inspector_collapse"),
);

function toggle_inspector(): void {
  emit("set-inspector-collapsed", !props.inspectorCollapsed);
}
</script>

<template>
  <header :class="styles.top_bar" data-window-drag-handle>
    <span :class="styles.top_bar_brand">
      <span :class="styles.top_bar_brand_mark" aria-hidden="true">
        <AppIcon :icon="Feather" :size="15" />
      </span>
      {{ t("app.name") }}
    </span>
    <nav
      v-if="showTabs"
      :class="styles.top_tabs"
      :aria-label="t('app.name')"
      data-testid="studio-tabs"
    >
      <button
        v-for="tab in tabs"
        :key="tab.route"
        type="button"
        class="tc-interactive"
        :class="styles.top_tab"
        :aria-current="tab.route === props.route ? 'page' : undefined"
        @click="emit('select-route', tab.route)"
      >
        <AppIcon :icon="tab.icon" :size="16" />
        <span>{{ tab.label }}</span>
      </button>
    </nav>
    <div :class="styles.top_bar_end">
      <PopoverRoot v-if="props.tasks.length > 0">
        <PopoverTrigger as-child>
          <button
            type="button"
            class="tc-interactive"
            :class="styles.task_pill"
            data-testid="task-pill"
            :aria-label="t('nav.task_strip_count', props.tasks.length)"
          >
            <AppIcon
              :icon="LoaderCircle"
              :size="15"
              :class="running ? styles.task_pill_spin : undefined"
            />
            <span :class="styles.task_pill_label" class="tc-tabular-nums">
              {{ t("nav.task_strip_count", props.tasks.length) }}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverPortal :to="portal_target">
          <PopoverContent :class="styles.task_popover" align="end" :side-offset="8">
            <TaskStrip :tasks="props.tasks" @clear-failed="emit('clear-failed-tasks')" />
          </PopoverContent>
        </PopoverPortal>
      </PopoverRoot>
      <AppTooltip v-if="inspectorAvailable" :content="toggle_label" side="bottom">
        <button
          type="button"
          class="tc-interactive"
          :class="styles.icon_button"
          data-testid="inspector-toggle"
          :aria-label="toggle_label"
          :aria-pressed="!inspectorCollapsed"
          @click="toggle_inspector"
        >
          <AppIcon :icon="toggle_icon" :size="16" />
        </button>
      </AppTooltip>
      <AppTooltip :content="t('common.close')" side="bottom">
        <button
          type="button"
          class="tc-interactive"
          :class="[styles.icon_button, styles.close_button]"
          data-testid="studio-close"
          :aria-label="t('common.close')"
          @click="emit('close')"
        >
          <AppIcon :icon="X" :size="16" />
        </button>
      </AppTooltip>
    </div>
  </header>
</template>
