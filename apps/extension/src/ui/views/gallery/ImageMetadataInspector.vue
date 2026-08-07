<script setup lang="ts">
import { Brush, Check, Copy, ExternalLink, Pencil, RefreshCw, Wand2 } from "lucide-vue-next";
import { ref } from "vue";

import AppButton from "../../components/AppButton.vue";
import type { GalleryRecordSummary } from "../../contracts/ui_capabilities.js";
import type { ExtractedGenerationParameters } from "./image_metadata.js";
import styles from "./gallery.module.css";

/**
 * Parameters panel: seed/provider/model/prompt when the PNG carries embedded generation
 * parameters (image_metadata.ts), a composed empty state otherwise -- openai_image/google_image
 * outputs, or any file with no recognized text chunk, are a real "nothing to show" case, not a
 * bug. Modify prompt/regenerate hand off through the select-inspector-record channel
 * (InspectorSelection's `intent`/`prefill`, Stage 06 Task 6 addition, extended in the stage
 * fix-wave) carrying the already-extracted `parameters` prop along so the Workbench can prefill
 * its prompt fields -- there is no other cross-view channel into the Workbench yet. Edit and
 * inpaint hand off the same way, carrying `intent: "edit" | "inpaint"`, which the inspector's
 * action row consumes and turns into a real media command. Source-message stays disabled: no host
 * exposes a chat-navigation hook, so rendering it active would be a live control that silently does
 * nothing -- the banned state -- rather than an honest unavailable one.
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
  readonly actionsUnavailableHint: string;
}>();

const emit = defineEmits<{
  "modify-prompt": [parameters: ExtractedGenerationParameters | null];
  regenerate: [parameters: ExtractedGenerationParameters | null];
  edit: [parameters: ExtractedGenerationParameters | null];
  inpaint: [parameters: ExtractedGenerationParameters | null];
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
        @click="emit('modify-prompt', parameters)"
      />
      <AppButton
        :label="regenerateLabel"
        :icon="RefreshCw"
        variant="secondary"
        @click="emit('regenerate', parameters)"
      />
      <AppButton
        :label="editLabel"
        :icon="Pencil"
        variant="secondary"
        @click="emit('edit', parameters)"
      />
      <AppButton
        :label="inpaintLabel"
        :icon="Brush"
        variant="secondary"
        @click="emit('inpaint', parameters)"
      />
      <AppButton :label="sourceMessageLabel" :icon="ExternalLink" variant="secondary" disabled />
    </div>
    <p :class="styles.metadataActionsHint">{{ actionsUnavailableHint }}</p>
  </div>
</template>
