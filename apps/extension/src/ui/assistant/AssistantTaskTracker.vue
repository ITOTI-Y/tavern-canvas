<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import type { AssistantTask } from "../../modules/assistant/assistant_module.js";
import AppButton from "../components/AppButton.vue";
import styles from "./assistant.module.css";

/**
 * What the assistant is doing right now, and what it just finished. Status dots carry real
 * semantic state only (running, completed, failed) and never decorate a row for its own sake.
 */
const props = defineProps<{
  readonly tasks: readonly AssistantTask[];
}>();

const emit = defineEmits<{
  "clear-finished": [];
}>();

const { t } = useI18n();

const running_count = computed(() => props.tasks.filter((task) => task.state === "running").length);
const has_finished = computed(() => props.tasks.some((task) => task.state !== "running"));

function task_state_label(task: AssistantTask): string {
  switch (task.state) {
    case "running":
      return t("status.running");
    case "completed":
      return t("status.completed");
    case "failed":
      return t("status.failed");
  }
}

function task_kind_label(task: AssistantTask): string {
  switch (task.kind) {
    case "tool_call":
      return t("assistant.tasks.kind_tool_call");
    case "image_generation":
      return t("assistant.tasks.kind_image_generation");
    case "summary":
      return t("assistant.tasks.kind_summary");
  }
}
</script>

<template>
  <section
    v-if="tasks.length > 0"
    :class="styles.taskTracker"
    :aria-label="t('assistant.tasks.panel_title')"
    data-testid="assistant-task-tracker"
  >
    <header :class="styles.taskTrackerHeader">
      <span>{{ t("assistant.tasks.running_count", { n: running_count }) }}</span>
      <AppButton
        v-if="has_finished"
        :label="t('assistant.tasks.clear_finished_action')"
        variant="secondary"
        @click="emit('clear-finished')"
      />
    </header>
    <ul :class="styles.taskList">
      <li
        v-for="task in tasks"
        :key="task.task_id"
        :class="styles.taskRow"
        data-testid="assistant-task-row"
      >
        <span :class="styles.taskDot" :data-state="task.state" aria-hidden="true" />
        <span :class="styles.taskLabel">{{ task.label }}</span>
        <span :class="styles.taskMeta">{{ task_kind_label(task) }}</span>
        <span :class="styles.taskMeta" data-testid="assistant-task-state">
          {{ task_state_label(task) }}
        </span>
        <span v-if="task.error_code" :class="styles.taskMeta" data-tone="error">
          {{ t("assistant.tasks.error_code", { code: task.error_code }) }}
        </span>
      </li>
    </ul>
  </section>
</template>
