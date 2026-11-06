<script setup lang="ts">
import { Trash2 } from "lucide-vue-next";
import { computed, useId } from "vue";
import { useI18n } from "vue-i18n";

import AppCheckbox from "../../components/AppCheckbox.vue";
import IconButton from "../../components/IconButton.vue";
import SegmentedControl from "../../components/SegmentedControl.vue";
import TagInput from "../../components/TagInput.vue";
import { FRAME_SIZES } from "../../../modules/creation/creation_planning.js";
import type { CreationScene, SceneFrame } from "../../../modules/creation/creation_record.js";
import styles from "./create_styles.js";

export type ScenePatch = Partial<
  Pick<CreationScene, "enabled" | "scene" | "positive_prompt" | "size">
>;

const props = defineProps<{
  readonly scene: CreationScene;
  readonly index: number;
}>();

const emit = defineEmits<{
  change: [patch: ScenePatch, debounce: boolean];
  remove: [];
}>();

const { t } = useI18n();

const frame = computed<SceneFrame>(() => {
  const { width, height } = props.scene.size;
  return width === height ? "square" : width > height ? "landscape" : "portrait";
});

const frame_options = computed(() => [
  { value: "portrait", label: t("create.frame.portrait") },
  { value: "landscape", label: t("create.frame.landscape") },
  { value: "square", label: t("create.frame.square") },
]);

const tags_id = useId();

const number = computed(() => String(props.index + 1).padStart(2, "0"));

function set_frame(value: string): void {
  const size = FRAME_SIZES[value as SceneFrame];
  emit("change", { size: { ...size } }, false);
}
</script>

<template>
  <article :class="styles.scene" :data-disabled="String(!scene.enabled)">
    <div :class="styles.scene_side">
      <AppCheckbox
        :model-value="scene.enabled"
        :label="t('create.scene_enabled', { n: index + 1 })"
        label-hidden
        @update:model-value="emit('change', { enabled: $event }, false)"
      />
      <span :class="styles.scene_number">{{ number }}</span>
    </div>
    <div :class="styles.scene_main">
      <div :class="styles.scene_top">
        <textarea
          :class="styles.scene_text"
          rows="2"
          :value="scene.scene"
          :aria-label="t('create.scene_text_label', { n: index + 1 })"
          @input="emit('change', { scene: ($event.target as HTMLTextAreaElement).value }, true)"
        />
        <IconButton
          :icon="Trash2"
          size="sm"
          :label="t('create.scene_remove')"
          @click="emit('remove')"
        />
      </div>
      <div v-if="scene.excerpt !== ''" :class="styles.scene_source">{{ scene.excerpt }}</div>
      <div :class="styles.scene_meta">
        <span v-for="name in scene.characters" :key="name" :class="styles.who">{{ name }}</span>
        <SegmentedControl
          :class="styles.compact"
          :model-value="frame"
          :options="frame_options"
          :label="t('create.frame_label')"
          @update:model-value="set_frame"
        />
      </div>
      <label :for="tags_id" class="tc-visually-hidden">{{ t("create.scene_tags_label") }}</label>
      <TagInput
        :id="tags_id"
        :model-value="scene.positive_prompt"
        @update:model-value="emit('change', { positive_prompt: $event }, true)"
      />
      <p v-if="scene.last_error !== null" :class="styles.scene_error" role="alert">
        {{ t("create.scene_failed", { reason: scene.last_error }) }}
      </p>
    </div>
  </article>
</template>
