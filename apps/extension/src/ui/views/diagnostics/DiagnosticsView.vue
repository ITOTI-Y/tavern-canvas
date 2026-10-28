<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";

import type { StudioController } from "../../controllers/studio_controller.js";
import type { StudioState } from "../../contracts/view_models.js";
import AppButton from "../../components/AppButton.vue";
import CapabilityMatrix from "./CapabilityMatrix.vue";
import styles from "./diagnostics_styles.js";
import StorageUsage from "./StorageUsage.vue";
import TaskTimeline from "./TaskTimeline.vue";

/** Never reads any `secret_reference`: diagnostics must not render credential material. */
const props = defineProps<{
  readonly state: StudioState;
  readonly controller: StudioController;
}>();

const { t } = useI18n();

const snapshot = computed(() => props.state.diagnostics.snapshot);
const support_bundle_command = computed(() => props.state.diagnostics.support_bundle_command);
const is_exporting = computed(() => support_bundle_command.value.status === "pending");

onMounted(() => {
  void props.controller.load_diagnostics_timeline();
});

function export_bundle(): void {
  void props.controller.export_support_bundle();
}

function download_bundle(): void {
  if (support_bundle_command.value.status !== "success") {
    return;
  }
  const json = JSON.stringify(support_bundle_command.value.result, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "tavern-canvas-support-bundle.json";
  anchor.click();
  URL.revokeObjectURL(url);
}
</script>

<template>
  <div :class="styles.view" data-testid="diagnostics-view">
    <div :class="styles.section">
      <div :class="styles.section_header">
        <h2 :class="styles.section_title">{{ t("diagnostics.versions.title") }}</h2>
      </div>
      <div :class="styles.row">
        <span :class="styles.row_label">{{ t("diagnostics.versions.helper_label") }}</span>
        <span class="tc-tabular-nums" :class="styles.row_value">
          {{ snapshot?.helper_version ?? t("status.unknown") }}
        </span>
      </div>
    </div>

    <CapabilityMatrix :matrix="snapshot?.capability_matrix ?? {}" />

    <TaskTimeline :entries="state.diagnostics.timeline" />

    <StorageUsage
      :usage-bytes="snapshot?.storage_usage_bytes ?? null"
      :quota-bytes="snapshot?.storage_quota_bytes ?? null"
    />

    <div :class="styles.section" data-testid="support-bundle">
      <div :class="styles.section_header">
        <h2 :class="styles.section_title">{{ t("diagnostics.support_bundle.title") }}</h2>
      </div>
      <p :class="styles.description">{{ t("diagnostics.support_bundle.description") }}</p>
      <div :class="styles.actions_row">
        <AppButton
          :label="t('diagnostics.support_bundle.export_action')"
          :pending="is_exporting"
          @click="export_bundle"
        />
        <AppButton
          v-if="support_bundle_command.status === 'success'"
          :label="t('common.actions.download')"
          variant="secondary"
          @click="download_bundle"
        />
      </div>
      <p
        v-if="support_bundle_command.status === 'success'"
        :class="[styles.status_text, styles.description]"
        data-tone="success"
        data-testid="support-bundle-summary"
      >
        {{ t("diagnostics.support_bundle.exported_toast") }} &middot;
        {{ support_bundle_command.result.error_codes.length }} &middot;
        {{ support_bundle_command.result.timeline.length }}
      </p>
      <p
        v-else-if="support_bundle_command.status === 'error'"
        :class="[styles.status_text, styles.description]"
        data-tone="error"
      >
        {{ t("errors.unexpected") }}
      </p>
      <pre
        v-if="support_bundle_command.status === 'success'"
        :class="styles.description"
        data-testid="support-bundle-preview"
        >{{ JSON.stringify(support_bundle_command.result, null, 2) }}</pre>
    </div>
  </div>
</template>
