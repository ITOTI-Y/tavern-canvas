<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from "reka-ui";
import { computed } from "vue";

import { drop_undefined } from "./_prop_utils.js";
import styles from "./components.module.css";

/**
 * Binary settings control (roadmap rule: "binary settings use switches/checkboxes"). Wraps Reka's
 * `SwitchRoot`/`SwitchThumb` for `role="switch"` + keyboard (Space/Enter toggle, native button
 * focus order) -- this file only adds tokens and the label row.
 */
const props = withDefaults(
  defineProps<{
    readonly modelValue: boolean;
    readonly label: string;
    readonly description?: string | undefined;
    readonly disabled?: boolean;
    readonly id?: string | undefined;
    readonly describedBy?: string | undefined;
  }>(),
  {
    description: undefined,
    id: undefined,
    describedBy: undefined,
    disabled: false,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

function handle_update(value: boolean): void {
  emit("update:modelValue", value);
}

const root_props = computed(() =>
  drop_undefined({ id: props.id, "aria-describedby": props.describedBy }),
);
</script>

<template>
  <label :class="styles.switchRow" :data-disabled="disabled ? '' : undefined">
    <span :class="styles.switchLabelGroup">
      <span :class="styles.switchLabel">{{ label }}</span>
      <span v-if="description" :class="styles.switchDescription">{{ description }}</span>
    </span>
    <SwitchRoot
      v-bind="root_props"
      class="tc-interactive"
      :class="styles.switchRoot"
      :model-value="modelValue"
      :disabled="disabled"
      @update:model-value="handle_update"
    >
      <SwitchThumb :class="styles.switchThumb" />
    </SwitchRoot>
  </label>
</template>
