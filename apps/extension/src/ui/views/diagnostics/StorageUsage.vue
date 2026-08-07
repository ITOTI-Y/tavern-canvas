<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import { format_byte_size } from "../../../i18n/create_i18n.js";
import styles from "./diagnostics.module.css";

const props = defineProps<{
  readonly usageBytes: number | null;
  readonly quotaBytes: number | null;
}>();

const { t, locale } = useI18n();

const HIGH_PRESSURE_RATIO = 0.9;

const is_high_pressure = computed(
  () =>
    props.usageBytes !== null &&
    props.quotaBytes !== null &&
    props.quotaBytes > 0 &&
    props.usageBytes / props.quotaBytes >= HIGH_PRESSURE_RATIO,
);

function format_bytes(value: number): string {
  return format_byte_size(value, locale.value as "en" | "zh-CN");
}
</script>

<template>
  <div :class="styles.section" data-testid="storage-usage">
    <div :class="styles.section_header">
      <h2 :class="styles.section_title">{{ t("diagnostics.storage_usage.title") }}</h2>
    </div>
    <div :class="styles.row">
      <span :class="styles.row_label">{{ t("diagnostics.storage_usage.estimate_label") }}</span>
      <span class="tc-tabular-nums" :class="styles.row_value">
        {{ usageBytes === null ? t("status.unknown") : format_bytes(usageBytes) }}
      </span>
    </div>
    <div :class="styles.row">
      <span :class="styles.row_label">{{ t("diagnostics.storage_usage.quota_label") }}</span>
      <span
        v-if="quotaBytes !== null"
        class="tc-tabular-nums"
        :class="styles.row_value"
        data-testid="storage-quota-value"
      >
        {{ format_bytes(quotaBytes) }}
      </span>
      <span
        v-else
        :class="styles.status_text"
        data-tone="warning"
        data-testid="storage-quota-unavailable"
      >
        {{ t("diagnostics.storage_usage.quota_unavailable") }}
      </span>
    </div>
    <p
      v-if="is_high_pressure"
      :class="[styles.status_text, styles.description]"
      data-tone="warning"
      data-testid="storage-quota-high-pressure"
    >
      {{ t("diagnostics.storage_usage.quota_high_pressure") }}
    </p>
    <div :class="styles.row">
      <span :class="styles.row_label">{{
        t("diagnostics.storage_usage.cache_references_label")
      }}</span>
      <span :class="styles.status_text" data-tone="warning" data-testid="cache-references-value">
        {{ t("diagnostics.storage_usage.cache_references_unavailable") }}
      </span>
    </div>
  </div>
</template>
