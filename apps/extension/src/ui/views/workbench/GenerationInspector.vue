<script setup lang="ts">
import type { ImageGenerationRequest } from "@tavern-canvas/contracts";
import { Copy, ImageOff, RotateCcw } from "lucide-vue-next";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import AppIcon from "../../components/AppIcon.vue";
import IconButton from "../../components/IconButton.vue";
import StateSurface from "../../components/StateSurface.vue";
import type { GenerationJobSummary } from "../../contracts/ui_capabilities.js";
import styles from "./workbench.module.css";

const RETRYABLE_STATES: readonly GenerationJobSummary["state"][] = ["failed", "cancelled"];

const props = defineProps<{
  readonly job: GenerationJobSummary | null;
  readonly request: ImageGenerationRequest | null;
  readonly previewUrls: Readonly<Record<string, string>>;
}>();

const emit = defineEmits<{
  "copy-parameters": [];
  retry: [];
}>();

const { t } = useI18n();

const seed = computed(() =>
  props.request && "seed" in props.request ? props.request.seed : undefined,
);
const steps = computed(() =>
  props.request && "steps" in props.request ? props.request.steps : undefined,
);
const sampler = computed(() =>
  props.request && "sampler" in props.request ? props.request.sampler : undefined,
);
const model_id = computed(() =>
  props.request && "model_id" in props.request ? props.request.model_id : undefined,
);

const is_retryable = computed(
  () => props.job !== null && RETRYABLE_STATES.includes(props.job.state),
);

async function copy_parameters(): Promise<void> {
  if (!props.job) {
    return;
  }
  const summary = {
    job_id: props.job.job_id,
    provider_id: props.job.provider_id,
    seed: seed.value,
    steps: steps.value,
    sampler: sampler.value,
    model_id: model_id.value,
  };
  await navigator.clipboard.writeText(JSON.stringify(summary, null, 2));
  emit("copy-parameters");
}
</script>

<template>
  <div :class="styles.generation_inspector" data-testid="generation-inspector">
    <div :class="styles.section_header">
      <span :class="styles.section_title">{{ t("workbench.generation_inspector.title") }}</span>
    </div>

    <StateSurface
      :status="props.job ? 'ready' : 'empty'"
      :empty-title="t('workbench.generation_inspector.empty_title')"
      :empty-message="t('workbench.generation_inspector.empty_description')"
    >
      <dl v-if="props.job" :class="styles.inspector_field_list" data-testid="inspector-fields">
        <div :class="styles.inspector_field">
          <dt>{{ t("workbench.generation_inspector.provider_label") }}</dt>
          <dd>{{ props.job.provider_id }}</dd>
        </div>
        <div :class="styles.inspector_field">
          <dt>{{ t("workbench.generation_inspector.submitted_at_label") }}</dt>
          <dd class="tc-tabular-nums">{{ props.job.submitted_at }}</dd>
        </div>
        <div v-if="model_id !== undefined" :class="styles.inspector_field">
          <dt>{{ t("workbench.generation_inspector.model_label") }}</dt>
          <dd>{{ model_id }}</dd>
        </div>
        <div v-if="sampler !== undefined" :class="styles.inspector_field">
          <dt>{{ t("workbench.generation_inspector.sampler_label") }}</dt>
          <dd>{{ sampler }}</dd>
        </div>
        <div v-if="steps !== undefined" :class="styles.inspector_field">
          <dt>{{ t("workbench.generation_inspector.steps_label") }}</dt>
          <dd class="tc-tabular-nums">{{ steps }}</dd>
        </div>
        <div v-if="seed !== undefined" :class="styles.inspector_field">
          <dt>{{ t("workbench.generation_inspector.seed_label") }}</dt>
          <dd class="tc-tabular-nums">{{ seed }}</dd>
        </div>
      </dl>

      <div :class="styles.inspector_actions">
        <button
          type="button"
          class="tc-interactive"
          :class="styles.text_action_button"
          data-testid="copy-parameters"
          @click="copy_parameters"
        >
          <AppIcon :icon="Copy" :size="14" />
          {{ t("common.actions.copy") }}
        </button>
        <IconButton
          v-if="is_retryable"
          :icon="RotateCcw"
          size="sm"
          :label="t('workbench.retry_action')"
          data-testid="inspector-retry"
          @click="emit('retry')"
        />
      </div>

      <template v-if="props.job && props.job.completed_image_ids.length > 0">
        <p :class="styles.section_title">
          {{ t("workbench.generation_inspector.completed_images_title") }}
        </p>
        <ul :class="styles.completion_preview_list" data-testid="completion-preview">
          <li
            v-for="(image_id, index) in props.job.completed_image_ids"
            :key="image_id"
            :class="styles.completion_preview_tile"
          >
            <img
              v-if="props.previewUrls[image_id]"
              :src="props.previewUrls[image_id]"
              :alt="t('workbench.generation_inspector.image_alt', { n: index + 1 })"
            />
            <span
              v-else
              :class="styles.completion_preview_placeholder"
              role="img"
              :aria-label="t('workbench.generation_inspector.image_alt', { n: index + 1 })"
            >
              <AppIcon :icon="ImageOff" :size="20" />
            </span>
          </li>
        </ul>
      </template>
    </StateSurface>
  </div>
</template>
