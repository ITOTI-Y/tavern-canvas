<script setup lang="ts">
import { useI18n } from "vue-i18n";

import { drop_undefined } from "../../components/_prop_utils.js";
import FieldGroup from "../../components/FieldGroup.vue";
import NumberStepper from "../../components/NumberStepper.vue";
import styles from "./workbench.module.css";

const props = defineProps<{
  readonly positivePrompt: string;
  readonly negativePrompt: string;
  readonly imageCount: number;
  readonly positiveError?: string | null;
  readonly imageCountError?: string | null;
}>();

const emit = defineEmits<{
  "update:positivePrompt": [value: string];
  "update:negativePrompt": [value: string];
  "update:imageCount": [value: number];
}>();

const { t } = useI18n();

function handle_positive_input(event: Event): void {
  emit("update:positivePrompt", (event.target as HTMLTextAreaElement).value);
}

function handle_negative_input(event: Event): void {
  emit("update:negativePrompt", (event.target as HTMLTextAreaElement).value);
}
</script>

<template>
  <div :class="styles.prompt_composer" data-testid="prompt-composer">
    <FieldGroup
      :label="t('workbench.prompt_composer.positive_label')"
      :error="props.positiveError ?? null"
      required
    >
      <template #default="{ fieldId, describedBy, invalid }">
        <textarea
          :id="fieldId"
          :class="styles.prompt_textarea"
          data-testid="positive-prompt-input"
          :value="props.positivePrompt"
          :placeholder="t('workbench.prompt_composer.positive_placeholder')"
          :aria-describedby="describedBy"
          :aria-invalid="invalid"
          rows="6"
          @input="handle_positive_input"
        />
      </template>
    </FieldGroup>

    <FieldGroup :label="t('workbench.prompt_composer.negative_label')">
      <template #default="{ fieldId, describedBy }">
        <textarea
          :id="fieldId"
          :class="styles.prompt_textarea"
          data-testid="negative-prompt-input"
          :value="props.negativePrompt"
          :placeholder="t('workbench.prompt_composer.negative_placeholder')"
          :aria-describedby="describedBy"
          rows="3"
          @input="handle_negative_input"
        />
      </template>
    </FieldGroup>

    <FieldGroup
      :label="t('workbench.prompt_composer.image_count_label')"
      :error="props.imageCountError ?? null"
    >
      <template #default="{ fieldId, describedBy }">
        <NumberStepper
          v-bind="drop_undefined({ describedBy })"
          :id="fieldId"
          :model-value="props.imageCount"
          :label="t('workbench.prompt_composer.image_count_label')"
          :min="1"
          :max="4"
          :step="1"
          :increment-label="t('common.actions.increase')"
          :decrement-label="t('common.actions.decrease')"
          data-testid="image-count-stepper"
          @update:model-value="(value) => emit('update:imageCount', value)"
        />
      </template>
    </FieldGroup>
  </div>
</template>
