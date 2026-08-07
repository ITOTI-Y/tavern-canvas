<script setup lang="ts">
import { ChevronDown, ChevronUp } from "lucide-vue-next";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

import type { TaskStripItemViewModel } from "../contracts/view_models.js";
import { ICON_STROKE_WIDTH } from "./route_nav.js";
import styles from "./shell.module.css";

const props = defineProps<{
  tasks: readonly TaskStripItemViewModel[];
}>();

const { t, n } = useI18n();
// Not part of StudioState (task-2-brief.md's "task-strip expansion" is a local interaction, never
// listed as a field the controller needs to persist) -- purely local UI state, defaulting open so
// running work is visible without an extra click.
const expanded = ref(true);

// item.label_code (view_models.ts's TaskStripItemViewModel) is a controller-owned lookup key into
// the `status` locale domain, not a rendered sentence -- but tools/locale_check's dynamic-key rule
// bans calling the translate helper with anything other than a source-literal string argument, so
// indexing it with item.label_code directly is not allowed. This literal object is the
// checker-visible resolution the stage review settled on (task-8-brief.md's preferred fix): every
// entry the strip can ever show is spelled out here as its own literal call, which both satisfies
// the checker and makes every `status.*` key it lists a real, referenced translation instead of
// dead catalog weight. A label_code with no entry here (nothing currently produces one) falls back
// to the raw code so a future, not-yet-catalogued status still renders *something* instead of
// throwing.
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
        <component
          :is="expanded ? ChevronDown : ChevronUp"
          :size="16"
          :stroke-width="ICON_STROKE_WIDTH"
          aria-hidden="true"
        />
      </button>
    </div>
    <div v-if="expanded" :class="styles.task_strip_list">
      <div v-for="item in props.tasks" :key="item.id" :class="styles.task_chip">
        <span :class="styles.task_chip_dot" :data-status="item.status" />
        <!-- item.label_code is a controller-owned lookup key (view_models.ts's UiFailure/
             TaskStripItemViewModel contract), never a rendered sentence -- resolved through the
             static TASK_LABEL_RESOLVERS table above instead of indexing the translate helper with
             it directly, so every reachable label stays a checker-visible literal call (see that
             table's comment). -->
        <span :class="styles.task_chip_label">{{ resolve_task_label(item.label_code) }}</span>
        <span v-if="item.progress !== null" class="tc-tabular-nums">
          {{ n(item.progress, "percent") }}
        </span>
      </div>
    </div>
  </div>
</template>
