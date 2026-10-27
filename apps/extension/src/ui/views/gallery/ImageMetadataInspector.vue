<script setup lang="ts">
import { Check, Copy, ExternalLink } from "lucide-vue-next";
import { ref } from "vue";

import AppButton from "../../components/AppButton.vue";
import type { GalleryRecordSummary } from "../../contracts/ui_capabilities.js";
import type { ExtractedGenerationParameters } from "./image_metadata.js";
import styles from "./gallery_styles.js";

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
  readonly sourceMessageLabel: string;
}>();

const emit = defineEmits<{
  "open-source": [];
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
        :label="sourceMessageLabel"
        :icon="ExternalLink"
        variant="secondary"
        :disabled="record.source_message_id === null"
        @click="emit('open-source')"
      />
    </div>
  </div>
</template>
