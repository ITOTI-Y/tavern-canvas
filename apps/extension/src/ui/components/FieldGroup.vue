<script setup lang="ts">
import { computed, useId } from "vue";

import styles from "./components.module.css";

const props = withDefaults(
  defineProps<{
    readonly label: string;
    readonly hint?: string | undefined;
    readonly error?: string | null;
    readonly required?: boolean;
  }>(),
  {
    hint: undefined,
    error: null,
    required: false,
  },
);

const field_id = useId();
const hint_id = useId();
const error_id = useId();

const described_by = computed(() => {
  if (props.error) {
    return error_id;
  }
  if (props.hint) {
    return hint_id;
  }
  return undefined;
});
</script>

<template>
  <div :class="styles.fieldGroup">
    <label :for="field_id" :class="styles.fieldGroupLabel">
      {{ label }}
      <span v-if="required" :class="styles.fieldGroupRequired" aria-hidden="true">*</span>
    </label>
    <slot :field-id="field_id" :described-by="described_by" :invalid="Boolean(error)" />
    <p v-if="error" :id="error_id" :class="styles.fieldGroupError" role="alert">
      {{ error }}
    </p>
    <p v-else-if="hint" :id="hint_id" :class="styles.fieldGroupHint">
      {{ hint }}
    </p>
  </div>
</template>
