<script setup lang="ts">
import { RadioGroupItem, RadioGroupRoot } from "reka-ui";

import styles from "./components.module.css";

export interface SegmentedControlOption {
  readonly value: string;
  readonly label: string;
}

/**
 * Mode-choice control (roadmap rule: "mode choices use segmented controls"). A mutually exclusive
 * choice is a radio-group pattern for assistive tech ("radio button, 2 of 3, selected"), so this
 * wraps Reka's `RadioGroupRoot`/`RadioGroupItem` -- which already provides the roving-tabindex
 * arrow-key navigation (Left/Right/Up/Down move selection, Tab leaves the group as one stop) --
 * rather than a plain button row.
 */
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
