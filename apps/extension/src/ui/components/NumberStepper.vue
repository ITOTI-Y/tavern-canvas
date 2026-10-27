<script setup lang="ts">
import { Minus, Plus } from "lucide-vue-next";
import {
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldRoot,
} from "reka-ui";
import { computed } from "vue";

import { drop_undefined } from "./_prop_utils.js";
import AppIcon from "./AppIcon.vue";
import styles from "./components_styles.js";

const props = withDefaults(
  defineProps<{
    readonly modelValue: number | undefined;
    /** Set as `aria-label` on the spinbutton input; the Reka root is a plain `<div>`, so `<label for>` cannot reach it. */
    readonly label: string;
    readonly incrementLabel: string;
    readonly decrementLabel: string;
    readonly min?: number | undefined;
    readonly max?: number | undefined;
    readonly step?: number;
    readonly disabled?: boolean;
    readonly id?: string | undefined;
    readonly describedBy?: string | undefined;
  }>(),
  {
    min: undefined,
    max: undefined,
    id: undefined,
    describedBy: undefined,
    step: 1,
    disabled: false,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: number];
}>();

function handle_update(value: number): void {
  emit("update:modelValue", value);
}

const root_props = computed(() => drop_undefined({ id: props.id, min: props.min, max: props.max }));
const input_props = computed(() =>
  drop_undefined({ "aria-label": props.label, "aria-describedby": props.describedBy }),
);
</script>

<template>
  <NumberFieldRoot
    v-bind="root_props"
    :class="styles.numberStepper"
    :model-value="modelValue ?? null"
    :step="step"
    :disabled="disabled"
    @update:model-value="handle_update"
  >
    <NumberFieldDecrement
      class="tc-interactive"
      :class="styles.numberStepperButton"
      :aria-label="decrementLabel"
    >
      <AppIcon :icon="Minus" :size="14" />
    </NumberFieldDecrement>
    <NumberFieldInput
      v-bind="input_props"
      class="tc-tabular-nums"
      :class="styles.numberStepperInput"
    />
    <NumberFieldIncrement
      class="tc-interactive"
      :class="styles.numberStepperButton"
      :aria-label="incrementLabel"
    >
      <AppIcon :icon="Plus" :size="14" />
    </NumberFieldIncrement>
  </NumberFieldRoot>
</template>
