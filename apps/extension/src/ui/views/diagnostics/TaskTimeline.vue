<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import type { TaskTimelineEntry } from "../../contracts/ui_capabilities.js";
import StateSurface from "../../components/StateSurface.vue";
import VirtualList from "../../components/VirtualList.vue";
import styles from "./diagnostics.module.css";

/**
 * Renders every field `TaskTimelineEntry` carries and nothing else (event_code, module_id,
 * generation_anchor, request_id, job_id, provider_id, error_code) -- the type itself has no
 * prompt/message/secret field to leak (view_models.ts's doc comment), so this component's
 * redaction guarantee is structural, not a runtime filter that could be bypassed. Always goes
 * through VirtualList regardless of entry count, so the 1,000-event ring buffer and a 3-event
 * list share one rendering path.
 */
const props = defineProps<{
  readonly entries: readonly TaskTimelineEntry[];
}>();

const { t, d } = useI18n();

const ROW_HEIGHT = 32;
const LIST_HEIGHT = "320px";

const status = computed(() => (props.entries.length === 0 ? "empty" : "ready"));

function occurred_at_label(iso: string): string {
  const parsed = new Date(iso);
  return Number.isNaN(parsed.getTime()) ? iso : d(parsed, "short_time");
}
</script>

<template>
  <div :class="styles.section" data-testid="task-timeline">
    <div :class="styles.section_header">
      <h2 :class="styles.section_title">{{ t("diagnostics.task_timeline.title") }}</h2>
      <span v-if="entries.length > 0" class="tc-tabular-nums" :class="styles.row_label">
        {{ t("diagnostics.task_timeline.count_label", entries.length) }}
      </span>
    </div>
    <StateSurface
      :status="status"
      :empty-message="t('diagnostics.task_timeline.empty_description')"
      min-height="80px"
    >
      <div :class="styles.timeline_list">
        <div
          v-if="entries.length > 0"
          :class="[styles.timeline_row, styles.timeline_header]"
          data-testid="timeline-header"
        >
          <span :class="styles.timeline_cell">{{ t("diagnostics.task_timeline.time_label") }}</span>
          <span :class="styles.timeline_cell">{{
            t("diagnostics.task_timeline.event_label")
          }}</span>
          <span :class="styles.timeline_cell">{{
            t("diagnostics.task_timeline.module_label")
          }}</span>
          <span :class="styles.timeline_cell">{{
            t("diagnostics.task_timeline.provider_label")
          }}</span>
        </div>
        <VirtualList
          :items="entries"
          :item-size="ROW_HEIGHT"
          :height="LIST_HEIGHT"
          :aria-label="t('diagnostics.task_timeline.title')"
          :get-key="(entry: TaskTimelineEntry) => entry.event_id"
        >
          <template #default="{ item }">
            <div v-if="item" :class="styles.timeline_row" data-testid="timeline-row">
              <span :class="styles.timeline_cell">{{ occurred_at_label(item.occurred_at) }}</span>
              <span :class="[styles.timeline_cell, styles.timeline_code]">{{
                item.event_code
              }}</span>
              <span :class="[styles.timeline_cell, styles.timeline_code]">{{
                item.module_id
              }}</span>
              <span
                v-if="item.error_code"
                :class="[styles.timeline_cell, styles.timeline_code, styles.timeline_error]"
              >
                {{ t("diagnostics.task_timeline.error_code_label") }}: {{ item.error_code }}
              </span>
              <span v-else-if="item.provider_id" :class="styles.timeline_cell">
                {{ item.provider_id }}
              </span>
              <span v-else :class="styles.timeline_cell" />
            </div>
          </template>
        </VirtualList>
      </div>
    </StateSurface>
  </div>
</template>
