<script setup lang="ts">
import { ArrowLeftRight, Sparkles } from "lucide-vue-next";
import { computed } from "vue";

import AppButton from "../components/AppButton.vue";
import AppDialog from "../components/AppDialog.vue";
import AppSelect from "../components/AppSelect.vue";
import FieldGroup from "../components/FieldGroup.vue";
import NumberStepper from "../components/NumberStepper.vue";
import styles from "./dialogs.module.css";

/**
 * Long-press-send size popup (manual.image_size_popup / manual.send_button_longpress): a 500ms
 * long-press on the send control opens this before generating, auto-parsed from an existing WxH
 * in the tag when one exists. Two mutually exclusive modes -- SD/NovelAI/ComfyUI expose raw
 * width/height steppers; Banana/Grok expose an aspect-ratio select plus a swap action instead,
 * since those providers take an aspect ratio rather than pixel dimensions.
 */
const props = withDefaults(
  defineProps<{
    readonly open: boolean;
    readonly title: string;
    readonly closeLabel: string;
    readonly mode: "dimensions" | "aspect_ratio";
    readonly widthLabel: string;
    readonly heightLabel: string;
    readonly width: number;
    readonly height: number;
    readonly widthStepLabel: string;
    readonly heightStepLabel: string;
    readonly aspectRatioLabel: string;
    readonly aspectRatio?: string | undefined;
    readonly aspectRatioPlaceholder: string;
    readonly aspectRatioOptions?: readonly { readonly value: string; readonly label: string }[];
    readonly swapLabel: string;
    readonly generateLabel: string;
    readonly pending?: boolean;
    readonly minDimension?: number;
    readonly maxDimension?: number;
  }>(),
  {
    aspectRatio: undefined,
    pending: false,
    minDimension: 64,
    maxDimension: 4096,
    aspectRatioOptions: () => [],
  },
);

const emit = defineEmits<{
  "update:open": [value: boolean];
  "update:width": [value: number];
  "update:height": [value: number];
  "update:aspectRatio": [value: string];
  swap: [];
  generate: [];
}>();

const is_dimensions_mode = computed(() => props.mode === "dimensions");

function handle_generate(): void {
  emit("generate");
}
</script>

<template>
  <AppDialog
    :open="open"
    :title="title"
    :close-label="closeLabel"
    @update:open="emit('update:open', $event)"
  >
    <div :class="styles.paramsBody">
      <template v-if="is_dimensions_mode">
        <div :class="styles.paramsDimensionRow">
          <FieldGroup :label="widthLabel">
            <NumberStepper
              :model-value="width"
              :label="widthLabel"
              :increment-label="widthStepLabel"
              :decrement-label="widthStepLabel"
              :min="minDimension"
              :max="maxDimension"
              :step="8"
              @update:model-value="emit('update:width', $event)"
            />
          </FieldGroup>
          <FieldGroup :label="heightLabel">
            <NumberStepper
              :model-value="height"
              :label="heightLabel"
              :increment-label="heightStepLabel"
              :decrement-label="heightStepLabel"
              :min="minDimension"
              :max="maxDimension"
              :step="8"
              @update:model-value="emit('update:height', $event)"
            />
          </FieldGroup>
        </div>
      </template>
      <template v-else>
        <div :class="styles.paramsAspectRow">
          <FieldGroup :label="aspectRatioLabel" :class="styles.paramsAspectField">
            <AppSelect
              :model-value="aspectRatio"
              :placeholder="aspectRatioPlaceholder"
              :aria-label="aspectRatioLabel"
              :options="[...(aspectRatioOptions ?? [])]"
              @update:model-value="emit('update:aspectRatio', $event)"
            />
          </FieldGroup>
          <AppButton
            :label="swapLabel"
            :icon="ArrowLeftRight"
            variant="secondary"
            @click="emit('swap')"
          />
        </div>
      </template>

      <AppButton
        :label="generateLabel"
        :icon="Sparkles"
        variant="primary"
        :pending="pending"
        @click="handle_generate"
      />
    </div>
  </AppDialog>
</template>
