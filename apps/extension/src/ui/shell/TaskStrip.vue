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
             TaskStripItemViewModel contract), never a rendered sentence -- resolved dynamically by
             design, the one first-party call site tools/locale_check's dynamic-key rule cannot
             statically verify (see task-2-report.md). -->
        <span :class="styles.task_chip_label">{{ t(item.label_code) }}</span>
        <span v-if="item.progress !== null" class="tc-tabular-nums">
          {{ n(item.progress, "percent") }}
        </span>
      </div>
    </div>
  </div>
</template>
