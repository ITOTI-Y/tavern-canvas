<script setup lang="ts">
import { useI18n } from "vue-i18n";

import FieldGroup from "../../components/FieldGroup.vue";
import StateSurface from "../../components/StateSurface.vue";
import type { ContextPreview } from "./context_preview.js";
import styles from "./prompt.module.css";

const props = defineProps<{
  readonly fixedPositivePrompt: string;
  readonly fixedNegativePrompt: string;
  readonly contextPreview: ContextPreview | null;
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
          @input="emit('update:fixedPositivePrompt', (($event.target) as HTMLTextAreaElement).value)"
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
          @input="emit('update:fixedNegativePrompt', (($event.target) as HTMLTextAreaElement).value)"
        />
      </template>
    </FieldGroup>

    <div :class="styles.section_header">
      <span :class="styles.section_title">{{ t("prompt.builder.context_preview_title") }}</span>
    </div>

    <div :class="styles.context_preview" data-testid="context-preview">
      <div :class="styles.context_block">
        <p :class="styles.context_block_title">{{ t("prompt.builder.world_info_label") }}</p>
        <StateSurface
          :status="props.contextPreview && props.contextPreview.worldInfo.length > 0 ? 'ready' : 'empty'"
          min-height="32px"
          :empty-message="t('prompt.builder.world_info_empty_description')"
        >
          <ul :class="styles.context_list">
            <li v-for="(entry, index) in props.contextPreview?.worldInfo ?? []" :key="index">
              {{ entry }}
            </li>
          </ul>
        </StateSurface>
      </div>
      <div :class="styles.context_block">
        <p :class="styles.context_block_title">{{ t("prompt.builder.user_persona_label") }}</p>
        <StateSurface
          :status="props.contextPreview?.userPersona ? 'ready' : 'empty'"
          min-height="32px"
          :empty-message="t('prompt.builder.user_persona_empty_description')"
        >
          <p>{{ props.contextPreview?.userPersona }}</p>
        </StateSurface>
      </div>
      <div :class="styles.context_block">
        <p :class="styles.context_block_title">{{ t("prompt.builder.character_context_label") }}</p>
        <StateSurface
          :status="props.contextPreview?.characterContext ? 'ready' : 'empty'"
          min-height="32px"
          :empty-message="t('prompt.builder.character_context_empty_description')"
        >
          <p>{{ props.contextPreview?.characterContext }}</p>
        </StateSurface>
      </div>
    </div>
  </div>
</template>
