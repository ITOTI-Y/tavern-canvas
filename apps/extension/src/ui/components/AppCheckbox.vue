<script setup lang="ts">
import { Check, Minus } from "lucide-vue-next";
import { CheckboxIndicator, CheckboxRoot } from "reka-ui";

import AppIcon from "./AppIcon.vue";
import styles from "./components.module.css";

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
