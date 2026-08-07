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
import styles from "./components.module.css";

/**
 * Numeric-value control (roadmap rule: "numeric values use steppers/inputs"). Wraps Reka's
 * NumberField primitives -- Reka's own increment/decrement buttons hard-code English
 * `aria-label="Increase"/"Decrease"` internally, so `incrementLabel`/`decrementLabel` are required
 * props here and forwarded as explicit `aria-label` overrides (Vue's fallthrough-attrs merge lets
 * the caller's attr win over the component's own template default), keeping the control
 * locale-agnostic like every other shared component.
 */
const props = withDefaults(
  defineProps<{
    readonly modelValue: number | undefined;
    readonly incrementLabel: string;
    readonly decrementLabel: string;
    readonly min?: number;
    readonly max?: number;
    readonly step?: number;
    readonly disabled?: boolean;
    readonly id?: string;
    readonly describedBy?: string;
  }>(),
  {
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
const input_props = computed(() => drop_undefined({ "aria-describedby": props.describedBy }));
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
