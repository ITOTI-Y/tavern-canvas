<script setup lang="ts">
import { ChevronDown, ChevronUp } from "lucide-vue-next";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

import AppIcon from "../components/AppIcon.vue";
import type { TaskStripItemViewModel } from "../contracts/view_models.js";
import styles from "./shell.module.css";

const props = defineProps<{
  tasks: readonly TaskStripItemViewModel[];
}>();

const { t, n } = useI18n();
const expanded = ref(true);

// Literal translate calls are required by tools/locale_check's dynamic-key rule; an unknown code falls back to the raw code.
const TASK_LABEL_RESOLVERS: Readonly<Record<string, () => string>> = {
  "status.loading": () => t("status.loading"),
  "status.empty": () => t("status.empty"),
  "status.partial": () => t("status.partial"),
  "status.error": () => t("status.error"),
  "status.disabled": () => t("status.disabled"),
  "status.success": () => t("status.success"),
  "status.pending": () => t("status.pending"),
  "status.running": () => t("status.running"),
  "status.cancelled": () => t("status.cancelled"),
  "status.completed": () => t("status.completed"),
  "status.failed": () => t("status.failed"),
  "status.retrying": () => t("status.retrying"),
  "status.online": () => t("status.online"),
  "status.offline": () => t("status.offline"),
  "status.connected": () => t("status.connected"),
  "status.blocked": () => t("status.blocked"),
  "status.unknown": () => t("status.unknown"),
};

function resolve_task_label(label_code: string): string {
  return TASK_LABEL_RESOLVERS[label_code]?.() ?? label_code;
}

const toggle_label = computed(() =>
  expanded.value ? t("nav.task_strip_collapse") : t("nav.task_strip_expand"),
);

function toggle(): void {
  expanded.value = !expanded.value;
}
</script>

<template>
  <div v-if="props.tasks.length > 0" :class="styles.task_strip">
    <div :class="styles.task_strip_header">
      <span :class="styles.task_strip_summary" class="tc-tabular-nums">
        {{ t("nav.task_strip_count", props.tasks.length) }}
      </span>
      <button
        type="button"
        class="tc-interactive"
        :class="styles.icon_button"
        :aria-label="toggle_label"
        :aria-expanded="expanded"
        @click="toggle"
      >
        <AppIcon :icon="expanded ? ChevronDown : ChevronUp" :size="16" />
      </button>
    </div>
    <div v-if="expanded" :class="styles.task_strip_list">
      <div v-for="item in props.tasks" :key="item.id" :class="styles.task_chip">
        <span :class="styles.task_chip_dot" :data-status="item.status" />
        <span :class="styles.task_chip_label">{{ resolve_task_label(item.label_code) }}</span>
        <span v-if="item.progress !== null" class="tc-tabular-nums">
          {{ n(item.progress, "percent") }}
        </span>
      </div>
    </div>
  </div>
</template>
