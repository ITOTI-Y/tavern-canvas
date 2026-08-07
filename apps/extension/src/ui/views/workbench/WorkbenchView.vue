<script setup lang="ts">
import type { ImageGenerationRequest, Uuid } from "@tavern-canvas/contracts";
import { computed, reactive, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

import AppButton from "../../components/AppButton.vue";
import ToastViewport from "../../components/ToastViewport.vue";
import type { GenerationSubmitCommand } from "../../contracts/ui_capabilities.js";
import type { StudioState } from "../../contracts/view_models.js";
import ActiveJobs from "./ActiveJobs.vue";
import { build_generation_request, type ReferenceDraftItem } from "./build_generation_request.js";
import GenerationInspector from "./GenerationInspector.vue";
import PromptComposer from "./PromptComposer.vue";
import ProviderSummary from "./ProviderSummary.vue";
import ReferenceStrip from "./ReferenceStrip.vue";
import { use_toasts } from "./use_toasts.js";
import styles from "./workbench.module.css";

/**
 * Presentational, controller-agnostic view (mirrors StudioShell.vue's own pattern): receives the
 * full `StudioState` and emits granular intent events instead of importing/calling
 * `StudioController` directly, so it mounts and tests standalone. Wiring these events to a live
 * controller instance -- and mounting this view into StudioShell's workspace slot for a given
 * route -- is deferred to the stage's whole-review integration pass (StudioShell.vue currently
 * always renders a generic placeholder; see task-5-report.md).
 */
const props = defineProps<{
  readonly state: StudioState;
  /** `GalleryCapability.read_bytes` (Task 1) can resolve a completed image's bytes, but nothing
   * in this view's own props/events reaches that capability (only `StudioState` and generation
   * intents flow through here). The caller resolves object URLs (e.g. keyed by
   * `GeneratedAsset.asset_id` once a job's result is known) and passes them in; omitted entirely
   * until that wiring exists, the completion preview then shows its placeholder tile instead of
   * silently never having a real-image code path at all. */
  readonly previewUrls?: Readonly<Record<string, string>>;
}>();

const emit = defineEmits<{
  "select-profile": [profileId: Uuid];
  submit: [command: GenerationSubmitCommand];
  "cancel-job": [jobId: Uuid];
  "retry-job": [jobId: Uuid];
  "open-settings": [];
  /** Fired once a `modify_prompt`/`regenerate` gallery hand-off (`InspectorSelection`) has been
   * applied to the draft, so the caller clears `state.inspector.selected_record` and a later
   * unrelated Workbench mount does not re-apply a stale prefill. */
  "consume-inspector-selection": [];
}>();

const { t } = useI18n();
const { toasts, push: push_toast, dismiss: dismiss_toast } = use_toasts();

const draft = reactive({
  positive_prompt: "",
  negative_prompt: "",
  image_count: 1,
  references: [] as ReferenceDraftItem[],
});

const validation_touched = ref(false);
const selected_job_id = ref<Uuid | null>(null);
const submitted_requests = new Map<Uuid, ImageGenerationRequest>();
const last_submitted_request = ref<ImageGenerationRequest | null>(null);

const active_profile = computed(
  () =>
    props.state.workbench.profiles.find(
      (profile) => profile.id === props.state.workbench.active_profile_id,
    ) ?? null,
);

const validation_errors = computed(() => {
  const errors: { profile?: string; prompt?: string; image_count?: string; provider?: string } = {};
  if (!props.state.workbench.active_profile_id) {
    errors.profile = t("workbench.submit.validation.profile_required");
  }
  if (draft.positive_prompt.trim() === "") {
    errors.prompt = t("workbench.submit.validation.prompt_required");
  }
  if (draft.image_count < 1 || draft.image_count > 4) {
    errors.image_count = t("workbench.submit.validation.image_count_range");
  }
  if (active_profile.value?.provider_id === "comfyui") {
    errors.provider = t("workbench.submit.validation.provider_unsupported");
  }
  return errors;
});

const has_validation_errors = computed(() => Object.keys(validation_errors.value).length > 0);

const selected_job = computed(
  () => props.state.workbench.jobs.find((job) => job.job_id === selected_job_id.value) ?? null,
);
const selected_job_request = computed(() =>
  selected_job.value ? (submitted_requests.get(selected_job.value.request_id) ?? null) : null,
);

async function handle_submit(): Promise<void> {
  validation_touched.value = true;
  const profile_id = props.state.workbench.active_profile_id;
  const profile = active_profile.value;
  if (has_validation_errors.value || !profile_id || !profile) {
    return;
  }
  const request_id = crypto.randomUUID() as Uuid;
  const request = await build_generation_request(
    {
      provider_id: profile.provider_id,
      positive_prompt: draft.positive_prompt,
      negative_prompt: draft.negative_prompt,
      image_count: draft.image_count,
      references: draft.references,
    },
    request_id,
  );
  last_submitted_request.value = request;
  emit("submit", { profile_id, request });
}

watch(
  () => props.state.workbench.submit_command,
  (command) => {
    if (command.status === "success" && last_submitted_request.value) {
      submitted_requests.set(command.result.request_id, last_submitted_request.value);
      selected_job_id.value = command.result.job_id;
      validation_touched.value = false;
    }
  },
);

// Gallery's "modify prompt"/"regenerate" hand-off (GalleryView.vue's hand_off_to_workbench)
// selects the record for the inspector *and* routes here in the same tick, so by the time this
// view mounts the selection is already set -- `immediate: true` picks it up on first render, not
// only on a later change. Only these two intents carry a prefill; `view`/`edit`/`inpaint` (the
// latter two never produced by Gallery -- see ImageMetadataInspector.vue) are left alone.
watch(
  () => props.state.inspector.selected_record,
  (selection) => {
    if (
      selection?.kind !== "gallery_record" ||
      (selection.intent !== "modify_prompt" && selection.intent !== "regenerate")
    ) {
      return;
    }
    const prefill = selection.prefill;
    if (prefill?.positive_prompt) {
      draft.positive_prompt = prefill.positive_prompt;
    }
    if (prefill?.negative_prompt) {
      draft.negative_prompt = prefill.negative_prompt;
    }
    if (prefill?.positive_prompt) {
      push_toast({ title: t("workbench.prefilled_from_gallery_notice"), variant: "info" });
    }
    emit("consume-inspector-selection");
  },
  { immediate: true },
);

function add_reference(asset_id: ReferenceDraftItem["asset_id"]): void {
  const asset = props.state.assets.records.reference.find((record) => record.id === asset_id);
  if (!asset || draft.references.length >= 4) {
    return;
  }
  draft.references = [...draft.references, { asset_id, display_name: asset.display_name }];
}

function remove_reference(index: number): void {
  draft.references = draft.references.filter((_, i) => i !== index);
}

function reorder_reference(from_index: number, to_index: number): void {
  const next = [...draft.references];
  const [moved] = next.splice(from_index, 1);
  if (moved) {
    next.splice(to_index, 0, moved);
  }
  draft.references = next;
}

function handle_copy_parameters(): void {
  push_toast({ title: t("common.actions.copied"), variant: "success" });
}

function handle_inspector_retry(): void {
  if (selected_job.value) {
    emit("retry-job", selected_job.value.job_id);
  }
}
</script>

<template>
  <div :class="styles.workbench_view" data-testid="workbench-view">
    <div :class="styles.main_column">
      <ProviderSummary
        :profiles="props.state.workbench.profiles"
        :active-profile-id="props.state.workbench.active_profile_id"
        :loading="props.state.loading.has('profiles')"
        :has-error="props.state.failures.has('profiles')"
        @select="(id) => emit('select-profile', id)"
        @open-settings="emit('open-settings')"
      />

      <PromptComposer
        v-model:positive-prompt="draft.positive_prompt"
        v-model:negative-prompt="draft.negative_prompt"
        v-model:image-count="draft.image_count"
        :positive-error="
          validation_touched && validation_errors.prompt ? validation_errors.prompt : null
        "
        :image-count-error="
          validation_touched && validation_errors.image_count ? validation_errors.image_count : null
        "
      />

      <ReferenceStrip
        :references="draft.references"
        :available="props.state.assets.records.reference"
        :status="
          props.state.loading.has('assets')
            ? 'loading'
            : props.state.failures.has('assets')
              ? 'error'
              : 'ready'
        "
        @add="add_reference"
        @remove="remove_reference"
        @reorder="reorder_reference"
      />

      <div :class="styles.submit_row">
        <AppButton
          :label="t('workbench.submit.action')"
          variant="primary"
          :pending="props.state.workbench.submit_command.status === 'pending'"
          data-testid="submit-generation"
          @click="handle_submit"
        />
        <p
          v-if="validation_touched && validation_errors.profile"
          role="alert"
          :class="styles.inline_error"
          data-testid="validation-profile"
        >
          {{ validation_errors.profile }}
        </p>
        <p
          v-if="validation_touched && validation_errors.provider"
          role="alert"
          :class="styles.inline_error"
          data-testid="validation-provider"
        >
          {{ validation_errors.provider }}
        </p>
        <p
          v-if="props.state.workbench.submit_command.status === 'error'"
          role="alert"
          :class="styles.inline_error"
          data-testid="submit-error"
        >
          {{
            t("errors.generation_failed", {
              message: props.state.workbench.submit_command.failure.code,
            })
          }}
        </p>
      </div>

      <ActiveJobs
        :jobs="props.state.workbench.jobs"
        :loading="props.state.loading.has('generation')"
        :has-error="props.state.failures.has('generation')"
        :selected-job-id="selected_job_id"
        @cancel="(id) => emit('cancel-job', id)"
        @retry="(id) => emit('retry-job', id)"
        @select="(id) => (selected_job_id = id)"
      />
    </div>

    <div :class="styles.side_column">
      <GenerationInspector
        :job="selected_job"
        :request="selected_job_request"
        :preview-urls="props.previewUrls ?? {}"
        @copy-parameters="handle_copy_parameters"
        @retry="handle_inspector_retry"
      />
    </div>

    <ToastViewport
      :toasts="toasts"
      :viewport-label="t('common.notifications.viewport_label')"
      :announce-label="t('common.notifications.announce_label')"
      :close-label="t('common.actions.close')"
      @dismiss="dismiss_toast"
    />
  </div>
</template>
