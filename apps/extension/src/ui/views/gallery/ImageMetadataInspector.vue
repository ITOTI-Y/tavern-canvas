<script setup lang="ts">
import { Check, Copy, ExternalLink, RefreshCw, Wand2 } from "lucide-vue-next";
import { ref } from "vue";

import AppButton from "../../components/AppButton.vue";
import type { GalleryRecordSummary } from "../../contracts/ui_capabilities.js";
import type { ExtractedGenerationParameters } from "./image_metadata.js";
import styles from "./gallery.module.css";

/**
 * Parameters panel: seed/provider/model/prompt when the PNG carries embedded generation
 * parameters (image_metadata.ts), a composed empty state otherwise -- openai_image/google_image
 * outputs, or any file with no recognized text chunk, are a real "nothing to show" case, not a
 * bug. Modify prompt/regenerate/edit/inpaint all hand off through the same
 * select-inspector-record channel (InspectorSelection's `intent`, Stage 06 Task 6 addition) since
 * there is no other cross-view channel into the Workbench yet.
 */
const props = defineProps<{
  readonly record: GalleryRecordSummary;
  readonly parameters: ExtractedGenerationParameters | null;
  readonly loading: boolean;
  readonly title: string;
  readonly orphanLabel: string;
  readonly seedLabel: string;
  readonly providerLabel: string;
  readonly modelLabel: string;
  readonly promptLabel: string;
  readonly copyLabel: string;
  readonly copiedLabel: string;
  readonly emptyDescription: string;
  readonly modifyPromptLabel: string;
  readonly regenerateLabel: string;
  readonly editLabel: string;
  readonly inpaintLabel: string;
  readonly sourceMessageLabel: string;
}>();

const emit = defineEmits<{
  "modify-prompt": [];
  regenerate: [];
  edit: [];
  inpaint: [];
  "source-message": [];
  copied: [];
}>();

const copied = ref(false);

async function copy_parameters(): Promise<void> {
  if (!props.parameters) {
    return;
  }
  await navigator.clipboard.writeText(props.parameters.raw_text);
  copied.value = true;
  emit("copied");
  setTimeout(() => {
    copied.value = false;
  }, 2000);
}
</script>

<template>
  <div :class="styles.metadataInspector">
    <h2 :class="styles.metadataTitle">{{ title }}</h2>
    <p v-if="record.quarantined" :class="styles.metadataOrphanNotice">{{ orphanLabel }}</p>

    <dl :class="styles.metadataList">
      <div :class="styles.metadataRow">
        <dt>{{ providerLabel }}</dt>
        <dd class="tc-tabular-nums">{{ record.provider_id }}</dd>
      </div>
      <template v-if="parameters">
        <div v-if="parameters.seed" :class="styles.metadataRow">
          <dt>{{ seedLabel }}</dt>
          <dd class="tc-tabular-nums">{{ parameters.seed }}</dd>
        </div>
        <div v-if="parameters.model" :class="styles.metadataRow">
          <dt>{{ modelLabel }}</dt>
          <dd>{{ parameters.model }}</dd>
        </div>
        <div v-if="parameters.positive_prompt" :class="styles.metadataRow">
          <dt>{{ promptLabel }}</dt>
          <dd :class="styles.metadataPrompt">{{ parameters.positive_prompt }}</dd>
        </div>
      </template>
    </dl>

    <p v-if="!loading && !parameters" :class="styles.metadataEmpty">{{ emptyDescription }}</p>

    <AppButton
      v-if="parameters"
      :label="copied ? copiedLabel : copyLabel"
      :icon="copied ? Check : Copy"
      variant="secondary"
      @click="() => void copy_parameters()"
    />

    <div :class="styles.metadataActions">
      <AppButton
        :label="modifyPromptLabel"
        :icon="Wand2"
        variant="secondary"
        @click="emit('modify-prompt')"
      />
      <AppButton
        :label="regenerateLabel"
        :icon="RefreshCw"
        variant="secondary"
        @click="emit('regenerate')"
      />
      <AppButton :label="editLabel" variant="secondary" @click="emit('edit')" />
      <AppButton :label="inpaintLabel" variant="secondary" @click="emit('inpaint')" />
      <AppButton
        :label="sourceMessageLabel"
        :icon="ExternalLink"
        variant="secondary"
        @click="emit('source-message')"
      />
    </div>
  </div>
</template>
