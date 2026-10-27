<script setup lang="ts">
import { useI18n } from "vue-i18n";

import FieldGroup from "../../components/FieldGroup.vue";
import styles from "./prompt_styles.js";

const props = defineProps<{
  readonly fixedPositivePrompt: string;
  readonly fixedNegativePrompt: string;
}>();

const emit = defineEmits<{
  "update:fixedPositivePrompt": [value: string];
  "update:fixedNegativePrompt": [value: string];
}>();

const { t } = useI18n();
</script>

<template>
  <div :class="styles.prompt_builder" data-testid="prompt-builder">
    <div :class="styles.section_header">
      <span :class="styles.section_title">{{ t("prompt.builder.title") }}</span>
    </div>

    <FieldGroup :label="t('prompt.fixed_prompts.positive_label')">
      <template #default="{ fieldId }">
        <textarea
          :id="fieldId"
          :class="styles.textarea"
          data-testid="fixed-positive-prompt"
          :value="props.fixedPositivePrompt"
          :placeholder="t('prompt.fixed_prompts.positive_placeholder')"
          rows="3"
          @input="emit('update:fixedPositivePrompt', ($event.target as HTMLTextAreaElement).value)"
        />
      </template>
    </FieldGroup>
    <FieldGroup :label="t('prompt.fixed_prompts.negative_label')">
      <template #default="{ fieldId }">
        <textarea
          :id="fieldId"
          :class="styles.textarea"
          data-testid="fixed-negative-prompt"
          :value="props.fixedNegativePrompt"
          :placeholder="t('prompt.fixed_prompts.negative_placeholder')"
          rows="3"
          @input="emit('update:fixedNegativePrompt', ($event.target as HTMLTextAreaElement).value)"
        />
      </template>
    </FieldGroup>
  </div>
</template>
