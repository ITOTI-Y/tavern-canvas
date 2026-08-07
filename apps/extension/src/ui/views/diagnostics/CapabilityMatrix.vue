<script setup lang="ts">
import type { CapabilityMatrix } from "@tavern-canvas/contracts";
import { Check, X } from "lucide-vue-next";
import { useI18n } from "vue-i18n";

import AppIcon from "../../components/AppIcon.vue";
import { CAPABILITY_MATRIX_IDS, capability_label } from "./capability_labels.js";
import styles from "./diagnostics.module.css";

/**
 * Displays all nine capability IDs (`CAPABILITY_MATRIX_IDS`) unconditionally, in fixed order, even
 * when `matrix` has not reported a status for one yet (host probing runs before the Gateway
 * protocol capability is ever known, for example) -- rendered as "unknown" rather than omitted, so
 * the row count never changes across loading states.
 */
defineProps<{
  readonly matrix: CapabilityMatrix;
}>();

const { t } = useI18n();
</script>

<template>
  <div :class="styles.section" data-testid="capability-matrix">
    <div :class="styles.section_header">
      <h2 :class="styles.section_title">{{ t("diagnostics.capability_matrix.title") }}</h2>
    </div>
    <div>
      <div
        v-for="id in CAPABILITY_MATRIX_IDS"
        :key="id"
        :class="styles.row"
        :data-capability-id="id"
      >
        <span :class="styles.row_label">{{ capability_label(t, id) }}</span>
        <span
          :class="styles.status_text"
          :data-tone="matrix[id]?.available ? 'success' : 'error'"
          :data-available="matrix[id]?.available === true"
        >
          <AppIcon :icon="matrix[id]?.available ? Check : X" :size="14" />
          {{
            matrix[id]?.available
              ? t("diagnostics.capability_matrix.available")
              : t("diagnostics.capability_matrix.unavailable")
          }}
        </span>
      </div>
    </div>
  </div>
</template>
