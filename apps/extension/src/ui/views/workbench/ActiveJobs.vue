<script setup lang="ts">
import type { Uuid } from "@tavern-canvas/contracts";
import type { GenerationState } from "@tavern-canvas/contracts";
import { Ban, RotateCcw } from "lucide-vue-next";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

import ConfirmDialog from "../../components/ConfirmDialog.vue";
import IconButton from "../../components/IconButton.vue";
import StateSurface from "../../components/StateSurface.vue";
import type { GenerationJobSummary } from "../../contracts/ui_capabilities.js";
import styles from "./workbench.module.css";

const CANCELLABLE_STATES: readonly GenerationState[] = [
  "queued",
  "preparing",
  "submitting",
  "running",
];
const RETRYABLE_STATES: readonly GenerationState[] = ["failed", "cancelled"];

const props = defineProps<{
  readonly jobs: readonly GenerationJobSummary[];
  readonly loading: boolean;
  readonly hasError: boolean;
  readonly selectedJobId: Uuid | null;
}>();

const emit = defineEmits<{
  cancel: [jobId: Uuid];
  retry: [jobId: Uuid];
  select: [jobId: Uuid];
}>();

const { t } = useI18n();
const cancel_target = ref<Uuid | null>(null);

const surface_status = computed<"loading" | "empty" | "error" | "ready">(() => {
  if (props.loading) {
    return "loading";
  }
  if (props.hasError) {
    return "error";
  }
  return props.jobs.length === 0 ? "empty" : "ready";
});

const empty_message = computed(
  () => `${t("workbench.active_jobs.empty_title")} ${t("workbench.active_jobs.empty_description")}`,
);

// "{n} job(s) running" (workbench.active_jobs.active_count) means literally in-flight jobs --
// this list also keeps completed/failed/cancelled rows visible (for completion preview and
// retry), so the header count must exclude those terminal states rather than count every row.
const running_count = computed(
  () => props.jobs.filter((job) => CANCELLABLE_STATES.includes(job.state)).length,
);

/**
 * Locale keys are looked up by a literal string at every call site (plan rule: "Dynamic keys are
 * forbidden", enforced mechanically by tools/locale_check). `GenerationState` has nine members, so
 * this is a plain switch over nine separate, literally-keyed translate calls instead of building
 * the lookup key from `job.state` at runtime.
 */
function state_label(state: GenerationState): string {
  switch (state) {
    case "queued":
      return t("workbench.active_jobs.state_labels.queued");
    case "preparing":
      return t("workbench.active_jobs.state_labels.preparing");
    case "submitting":
      return t("workbench.active_jobs.state_labels.submitting");
    case "running":
      return t("workbench.active_jobs.state_labels.running");
    case "completed":
      return t("workbench.active_jobs.state_labels.completed");
    case "failed":
      return t("workbench.active_jobs.state_labels.failed");
    case "cancelled":
      return t("workbench.active_jobs.state_labels.cancelled");
    case "attached":
      return t("workbench.active_jobs.state_labels.attached");
    case "orphaned":
      return t("workbench.active_jobs.state_labels.orphaned");
  }
}

function is_cancellable(job: GenerationJobSummary): boolean {
  return CANCELLABLE_STATES.includes(job.state);
}

function is_retryable(job: GenerationJobSummary): boolean {
  return RETRYABLE_STATES.includes(job.state);
}

function request_cancel(job_id: Uuid): void {
  cancel_target.value = job_id;
}

function confirm_cancel(): void {
  if (cancel_target.value) {
    emit("cancel", cancel_target.value);
  }
  cancel_target.value = null;
}

const cancel_target_job = computed(() =>
  props.jobs.find((job) => job.job_id === cancel_target.value),
);
</script>

<template>
  <div :class="styles.active_jobs" data-testid="active-jobs">
    <div :class="styles.section_header">
      <span :class="styles.section_title">{{ t("workbench.active_jobs.title") }}</span>
      <span v-if="running_count > 0" :class="styles.section_hint" class="tc-tabular-nums">
        {{ t("workbench.active_jobs.active_count", { n: running_count }, running_count) }}
      </span>
    </div>

    <StateSurface
      :status="surface_status"
      :empty-message="empty_message"
      :error-message="t('workbench.active_jobs.load_error')"
    >
      <ul :class="styles.job_list" data-testid="job-list">
        <li
          v-for="job in props.jobs"
          :key="job.job_id"
          :class="[styles.job_row, job.job_id === props.selectedJobId && styles.job_row_selected]"
          data-testid="job-row"
          :data-job-state="job.state"
        >
          <button
            type="button"
            class="tc-interactive"
            :class="styles.job_row_main"
            data-testid="job-select"
            @click="emit('select', job.job_id)"
          >
            <span
              v-if="job.state === 'running'"
              :class="styles.job_status_dot"
              aria-hidden="true"
            />
            <span :class="styles.job_provider">{{ job.provider_id }}</span>
            <span :class="styles.job_state" data-testid="job-state-label">
              {{ state_label(job.state) }}
            </span>
            <span class="tc-tabular-nums" :class="styles.job_progress" data-testid="job-progress">
              {{
                t("workbench.active_jobs.progress_label", {
                  completed: job.completed_image_ids.length,
                  total: job.image_count,
                })
              }}
            </span>
          </button>
          <p v-if="job.error" role="alert" :class="styles.job_error">
            {{ t("errors.generation_failed", { message: job.error.code }) }}
          </p>
          <span :class="styles.job_row_actions">
            <IconButton
              v-if="is_cancellable(job)"
              :icon="Ban"
              size="sm"
              destructive
              :label="t('workbench.active_jobs.cancel_action')"
              data-testid="job-cancel"
              @click="request_cancel(job.job_id)"
            />
            <IconButton
              v-if="is_retryable(job)"
              :icon="RotateCcw"
              size="sm"
              :label="t('workbench.retry_action')"
              data-testid="job-retry"
              @click="emit('retry', job.job_id)"
            />
          </span>
        </li>
      </ul>
    </StateSurface>

    <ConfirmDialog
      :open="cancel_target !== null"
      :title="t('workbench.active_jobs.cancel_confirm_title')"
      :description="
        t('workbench.active_jobs.cancel_confirm_description', {
          provider: cancel_target_job?.provider_id ?? '',
        })
      "
      :confirm-label="t('common.actions.confirm')"
      :cancel-label="t('common.actions.cancel')"
      @update:open="(open) => (cancel_target = open ? cancel_target : null)"
      @confirm="confirm_cancel"
    />
  </div>
</template>
