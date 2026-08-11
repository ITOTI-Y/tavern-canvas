<script setup lang="ts">
import { Check, Minus } from "lucide-vue-next";
import { CheckboxIndicator, CheckboxRoot } from "reka-ui";

import AppIcon from "./AppIcon.vue";
import styles from "./components.module.css";

/**
 * Selection control (`role="checkbox"`), the counterpart to AppSwitch's `role="switch"`: a checkbox
 * marks an item for a later batch command, a switch applies a setting the moment it moves. Wraps
 * Reka's `CheckboxRoot`/`CheckboxIndicator` for those semantics, the `mixed` state a partial
 * "select all" needs, and Space-to-toggle with Enter deliberately inert (WAI-ARIA) -- this file
 * only adds tokens and the label row.
 *
 * `labelHidden` exists for list rows. A row already renders the item's own name, so a visible
 * "Select <name>" label repeats it while costing the row the horizontal space that repetition
 * needs; hidden, the same string stays the control's accessible name.
 */
withDefaults(
  defineProps<{
    readonly modelValue: boolean | "indeterminate";
    readonly label: string;
    readonly labelHidden?: boolean;
    readonly disabled?: boolean;
  }>(),
  {
    labelHidden: false,
    disabled: false,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

/** Reka reports the mixed state back as the literal string; a caller only ever wants in or out. */
function handle_update(value: boolean | "indeterminate"): void {
  emit("update:modelValue", value === true);
}
</script>

<template>
  <label :class="styles.checkboxRow" :data-disabled="disabled ? '' : undefined">
    <CheckboxRoot
      class="tc-interactive"
      :class="styles.checkboxBox"
      :model-value="modelValue"
      :disabled="disabled"
      :aria-label="labelHidden ? label : undefined"
      @update:model-value="handle_update"
    >
      <CheckboxIndicator :class="styles.checkboxIndicator">
        <AppIcon :icon="modelValue === 'indeterminate' ? Minus : Check" :size="14" />
      </CheckboxIndicator>
    </CheckboxRoot>
    <span v-if="!labelHidden" :class="styles.checkboxLabel">{{ label }}</span>
  </label>
</template>
