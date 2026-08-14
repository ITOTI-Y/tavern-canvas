<script setup lang="ts">
import { PanelRightClose, PanelRightOpen, X } from "lucide-vue-next";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import AppIcon from "../components/AppIcon.vue";
import type { StudioRoute } from "../contracts/view_models.js";
import { route_label } from "./route_nav.js";
import styles from "./shell.module.css";

const props = defineProps<{
  route: StudioRoute;
  inspectorCollapsed: boolean;
  inspectorAvailable: boolean;
}>();

const emit = defineEmits<{
  "set-inspector-collapsed": [collapsed: boolean];
  close: [];
}>();

const { t } = useI18n();

const title = computed(() => route_label(t, props.route));
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
    <div :class="styles.top_bar_start">
      <span :class="styles.top_bar_brand">{{ t("app.name") }}</span>
      <span :class="styles.top_bar_divider" aria-hidden="true">/</span>
      <span :class="styles.top_bar_title">{{ title }}</span>
    </div>
    <div :class="styles.top_bar_end">
      <button
        v-if="inspectorAvailable"
        type="button"
        class="tc-interactive"
        :class="styles.icon_button"
        data-testid="inspector-toggle"
        :aria-label="toggle_label"
        :aria-pressed="!inspectorCollapsed"
        @click="toggle_inspector"
      >
        <AppIcon :icon="toggle_icon" :size="18" />
      </button>
      <button
        type="button"
        class="tc-interactive"
        :class="[styles.icon_button, styles.close_button]"
        data-testid="studio-close"
        :aria-label="t('common.close')"
        :title="t('common.close')"
        @click="emit('close')"
      >
        <AppIcon :icon="X" :size="18" />
      </button>
    </div>
  </header>
</template>
