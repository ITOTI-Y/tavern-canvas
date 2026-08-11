<script setup lang="ts">
import { PanelRightClose, PanelRightOpen } from "lucide-vue-next";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import AppIcon from "../components/AppIcon.vue";
import type { StudioRoute } from "../contracts/view_models.js";
import { route_label } from "./route_nav.js";
import styles from "./shell.module.css";

const props = defineProps<{
  route: StudioRoute;
  inspectorCollapsed: boolean;
}>();

const emit = defineEmits<{
  "set-inspector-collapsed": [collapsed: boolean];
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
  <header :class="styles.top_bar">
    <div :class="styles.top_bar_start">
      <span :class="styles.top_bar_title">{{ title }}</span>
    </div>
    <div :class="styles.top_bar_end">
      <button
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
    </div>
  </header>
</template>
