<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import type { MigrationSnapshot } from "../../contracts/ui_capabilities.js";
import { migration_failure_reason_label, migration_state_label } from "./migration_labels.js";
import styles from "./diagnostics.module.css";

const props = defineProps<{
  readonly snapshot: MigrationSnapshot | null;
}>();

const { t } = useI18n();

const counts = computed(() => Object.entries(props.snapshot?.counts ?? {}));
const total_records = computed(() => counts.value.reduce((sum, [, count]) => sum + count, 0));
</script>

<template>
  <div :class="styles.section" data-testid="migration-status">
    <div :class="styles.section_header">
      <h2 :class="styles.section_title">{{ t("diagnostics.migration_status.title") }}</h2>
    </div>
    <div v-if="snapshot" :class="styles.row">
      <span :class="styles.row_label">{{ t("common.labels.status") }}</span>
      <span
        :class="styles.status_text"
        :data-tone="snapshot.state === 'failed' ? 'error' : 'success'"
        data-testid="migration-state"
      >
        {{ migration_state_label(t, snapshot.state) }}
      </span>
    </div>
    <div v-if="snapshot && total_records > 0" :class="styles.row">
      <span :class="styles.row_label">{{ t("diagnostics.migration_status.counts_label") }}</span>
      <span class="tc-tabular-nums" :class="styles.row_value">
        {{ t("migration.record_count", total_records) }}
      </span>
    </div>
    <div v-if="snapshot?.failure_reason" :class="styles.row">
      <span :class="styles.row_label">{{ t("common.labels.description") }}</span>
      <span :class="[styles.status_text, styles.row_value]" data-tone="error">
        {{ migration_failure_reason_label(t, snapshot.failure_reason) }}
      </span>
    </div>
    <div v-if="snapshot && snapshot.warnings.length > 0" :class="styles.warning_list">
      <span :class="styles.row_label">{{ t("diagnostics.migration_status.warnings_label") }}</span>
      <p v-for="(warning, index) in snapshot.warnings" :key="index" :class="styles.warning_item">
        {{ warning }}
      </p>
    </div>
    <p v-if="!snapshot" :class="styles.description" data-testid="migration-status-unknown">
      {{ t("status.unknown") }}
    </p>
  </div>
</template>
