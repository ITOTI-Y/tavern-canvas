<script setup lang="ts">
import { Trash2 } from "lucide-vue-next";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import { slot_error_label } from "../chat/slot_error_label.js";
import AppIcon from "../components/AppIcon.vue";
import type { TaskStripItemViewModel } from "../contracts/view_models.js";
import styles from "./shell.module.css";

const props = defineProps<{
  tasks: readonly TaskStripItemViewModel[];
}>();

const emit = defineEmits<{
  "clear-failed": [];
}>();

const { t, n } = useI18n();

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

function chip_label(item: TaskStripItemViewModel): string {
  const label = resolve_task_label(item.label_code);
  return item.error === null
    ? label
    : label + t("nav.task_strip_error", { reason: slot_error_label(t, item.error) });
}

const has_failed = computed(() => props.tasks.some((item) => item.status === "error"));
</script>

<template>
  <div :class="styles.task_strip" data-testid="task-list">
    <div :class="styles.task_strip_header">
      <span :class="styles.task_strip_summary" class="tc-tabular-nums">
        {{ t("nav.task_strip_count", props.tasks.length) }}
      </span>
      <button
        v-if="has_failed"
        type="button"
        class="tc-interactive"
        :class="styles.icon_button"
        :aria-label="t('nav.task_strip_clear_failed')"
        :title="t('nav.task_strip_clear_failed')"
        data-testid="task-strip-clear-failed"
        @click="emit('clear-failed')"
      >
        <AppIcon :icon="Trash2" :size="16" />
      </button>
    </div>
    <div :class="styles.task_strip_list">
      <div v-for="item in props.tasks" :key="item.id" :class="styles.task_chip">
        <span :class="styles.task_chip_dot" :data-status="item.status" />
        <span :class="styles.task_chip_label">{{ chip_label(item) }}</span>
        <span v-if="item.progress !== null" class="tc-tabular-nums">
          {{ n(item.progress, "percent") }}
        </span>
      </div>
    </div>
  </div>
</template>
