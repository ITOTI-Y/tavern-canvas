<script setup lang="ts">
import { RadioGroupItem, RadioGroupRoot } from "reka-ui";

import styles from "./components_styles.js";

export interface SegmentedControlOption {
  readonly value: string;
  readonly label: string;
}

withDefaults(
  defineProps<{
    readonly modelValue: string;
    readonly options: readonly SegmentedControlOption[];
    readonly label: string;
    readonly disabled?: boolean;
  }>(),
  {
    disabled: false,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

function handle_update(value: unknown): void {
  emit("update:modelValue", value as string);
}
</script>

<template>
  <RadioGroupRoot
    :class="styles.segmentedControl"
    :data-layout="options.some((option) => option.label.length > 6) ? 'hug' : 'fill'"
    :model-value="modelValue"
    :disabled="disabled"
    orientation="horizontal"
    :aria-label="label"
    @update:model-value="handle_update"
  >
    <RadioGroupItem
      v-for="option in options"
      :key="option.value"
      class="tc-interactive"
      :class="styles.segmentedControlItem"
      :value="option.value"
    >
      <span :class="styles.segmentedControlItemLabel">{{ option.label }}</span>
    </RadioGroupItem>
  </RadioGroupRoot>
</template>
