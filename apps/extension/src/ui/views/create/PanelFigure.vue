<script setup lang="ts">
import { LoaderCircle, Pencil, RefreshCw } from "lucide-vue-next";
import { computed, ref, useId, watch } from "vue";
import { useI18n } from "vue-i18n";

import AppButton from "../../components/AppButton.vue";
import AppIcon from "../../components/AppIcon.vue";
import component_styles from "../../components/components_styles.js";
import IconButton from "../../components/IconButton.vue";
import TagInput from "../../components/TagInput.vue";
import type { CreationScene } from "../../../modules/creation/creation_record.js";
import CreationImage from "./CreationImage.vue";
import styles from "./create_styles.js";

const props = defineProps<{
  readonly scene: CreationScene;
  readonly index: number;
  readonly pending: boolean;
  readonly numbered: boolean;
  readonly readImage: (image_id: string) => Promise<Blob>;
}>();

const emit = defineEmits<{
  regenerate: [];
  "update:prompt": [value: string];
}>();

const { t } = useI18n();

const editing = ref(false);
const failed = ref(false);
const tags_id = useId();

watch(
  () => props.scene.active_image_id,
  () => {
    failed.value = false;
  },
);

const aspect_ratio = computed(
  () => `${String(props.scene.size.width)} / ${String(props.scene.size.height)}`,
);
const caption = computed(() => props.scene.scene || props.scene.positive_prompt);
</script>

<template>
  <figure :class="styles.panel">
    <div :class="styles.panel_frame" :style="{ aspectRatio: aspect_ratio }">
      <div v-if="pending" :class="styles.panel_state">
        <span :class="component_styles.appButtonSpinner" aria-hidden="true">
          <AppIcon :icon="LoaderCircle" />
        </span>
        {{ t("create.panel_pending") }}
      </div>
      <CreationImage
        v-else-if="scene.active_image_id !== null && !failed"
        :key="scene.active_image_id"
        :image-id="scene.active_image_id"
        :alt="caption"
        :read-image="readImage"
        :image-class="styles.panel_image"
        zoomable
        @failed="failed = true"
      />
      <div
        v-else
        :class="styles.panel_state"
        :data-error="String(scene.last_error !== null || failed)"
      >
        {{
          failed
            ? t("create.panel_missing")
            : scene.last_error !== null
              ? t("create.scene_failed", { reason: scene.last_error })
              : t("create.panel_empty")
        }}
      </div>
      <span v-if="numbered" :class="styles.panel_number">{{ index + 1 }}</span>
    </div>
    <figcaption :class="styles.panel_bar">
      <span :class="styles.panel_caption">{{ caption }}</span>
      <AppButton
        :class="styles.wide_only"
        :icon="RefreshCw"
        :label="t('create.panel_regenerate')"
        variant="ghost"
        :disabled="pending"
        @click="emit('regenerate')"
      />
      <AppButton
        :class="styles.wide_only"
        :icon="Pencil"
        :label="t('create.panel_edit_prompt')"
        variant="ghost"
        @click="editing = !editing"
      />
      <span :class="styles.narrow_only">
        <IconButton
          :icon="RefreshCw"
          size="sm"
          :label="t('create.panel_regenerate')"
          :disabled="pending"
          @click="emit('regenerate')"
        />
        <IconButton
          :icon="Pencil"
          size="sm"
          :label="t('create.panel_edit_prompt')"
          :pressed="editing"
          @click="editing = !editing"
        />
      </span>
    </figcaption>
    <template v-if="editing">
      <label :for="tags_id" class="tc-visually-hidden">{{ t("create.scene_tags_label") }}</label>
      <TagInput
        :id="tags_id"
        :model-value="scene.positive_prompt"
        @update:model-value="emit('update:prompt', $event)"
      />
    </template>
  </figure>
</template>
