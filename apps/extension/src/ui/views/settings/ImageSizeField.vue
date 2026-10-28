<script setup lang="ts">
import { Link2, Unlink2 } from "lucide-vue-next";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

import AppSelect, { type AppSelectOption } from "../../components/AppSelect.vue";
import IconButton from "../../components/IconButton.vue";
import NumberStepper from "../../components/NumberStepper.vue";
import {
  IMAGE_SIZE_PRESETS,
  MAX_SIZE,
  MIN_SIZE,
  preset_of,
  resize,
  SIZE_STEP,
  type ImageSize,
  type ImageSizePresetId,
} from "./image_size.js";
import styles from "./settings_styles.js";

const props = defineProps<{
  readonly modelValue: ImageSize;
}>();

const emit = defineEmits<{
  "update:modelValue": [size: ImageSize];
}>();

const { t } = useI18n();
const CUSTOM = "custom";

/** The ratio the locked sides keep, taken from the size when the lock was turned on. */
const locked_ratio = ref<number | null>(null);

function preset_label(id: ImageSizePresetId): string {
  switch (id) {
    case "portrait":
      return t("settings.image_size.portrait");
    case "landscape":
      return t("settings.image_size.landscape");
    case "square":
      return t("settings.image_size.square");
    case "portrait_large":
      return t("settings.image_size.portrait_large");
    case "landscape_large":
      return t("settings.image_size.landscape_large");
    case "square_large":
      return t("settings.image_size.square_large");
    case "wallpaper_portrait":
      return t("settings.image_size.wallpaper_portrait");
    case "wallpaper_landscape":
      return t("settings.image_size.wallpaper_landscape");
  }
}

const options = computed<readonly AppSelectOption[]>(() => [
  ...IMAGE_SIZE_PRESETS.map((preset) => ({
    value: preset.id,
    label: `${preset_label(preset.id)} ${String(preset.width)} × ${String(preset.height)}`,
  })),
  { value: CUSTOM, label: t("settings.image_size.custom") },
]);

const selected = computed(() => preset_of(props.modelValue) ?? CUSTOM);

function choose(value: string): void {
  const preset = IMAGE_SIZE_PRESETS.find((candidate) => candidate.id === value);
  if (preset === undefined) {
    return;
  }
  emit("update:modelValue", { width: preset.width, height: preset.height });
  if (locked_ratio.value !== null) {
    locked_ratio.value = preset.width / preset.height;
  }
}

function toggle_lock(): void {
  locked_ratio.value =
    locked_ratio.value === null ? props.modelValue.width / props.modelValue.height : null;
}

function set_side(side: "width" | "height", value: number): void {
  emit("update:modelValue", resize(props.modelValue, side, value, locked_ratio.value));
}
</script>

<template>
  <div :class="styles.image_size" data-testid="image-size-field">
    <span :class="styles.row_label">{{ t("settings.image_size.label") }}</span>
    <AppSelect
      :model-value="selected"
      :options="options"
      :placeholder="t('settings.image_size.label')"
      :aria-label="t('settings.image_size.label')"
      @update:model-value="choose"
    />
    <div :class="styles.image_size_sides">
      <div :class="styles.row">
        <span :class="styles.row_label">{{ t("settings.novelai.width_label") }}</span>
        <NumberStepper
          :model-value="modelValue.width"
          :label="t('settings.novelai.width_label')"
          :min="MIN_SIZE"
          :max="MAX_SIZE"
          :step="SIZE_STEP"
          :increment-label="t('common.actions.increase')"
          :decrement-label="t('common.actions.decrease')"
          @update:model-value="(value) => set_side('width', value)"
        />
      </div>
      <IconButton
        :icon="locked_ratio === null ? Unlink2 : Link2"
        :label="t('settings.image_size.lock_ratio')"
        :pressed="locked_ratio !== null"
        @click="toggle_lock"
      />
      <div :class="styles.row">
        <span :class="styles.row_label">{{ t("settings.novelai.height_label") }}</span>
        <NumberStepper
          :model-value="modelValue.height"
          :label="t('settings.novelai.height_label')"
          :min="MIN_SIZE"
          :max="MAX_SIZE"
          :step="SIZE_STEP"
          :increment-label="t('common.actions.increase')"
          :decrement-label="t('common.actions.decrease')"
          @update:model-value="(value) => set_side('height', value)"
        />
      </div>
    </div>
  </div>
</template>
