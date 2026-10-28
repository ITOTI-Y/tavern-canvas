<script setup lang="ts">
import { LoaderCircle } from "lucide-vue-next";
import type { Component } from "vue";
import { computed } from "vue";

import AppIcon from "./AppIcon.vue";
import styles from "./components_styles.js";

const props = withDefaults(
  defineProps<{
    readonly label: string;
    readonly icon?: Component | undefined;
    readonly variant?: "primary" | "secondary" | "ghost" | "destructive";
    readonly pending?: boolean;
    readonly disabled?: boolean;
    readonly type?: "button" | "submit";
  }>(),
  {
    icon: undefined,
    variant: "secondary",
    pending: false,
    disabled: false,
    type: "button",
  },
);

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const VARIANT_CLASSES = {
  primary: styles.appButtonPrimary,
  secondary: styles.appButtonSecondary,
  ghost: styles.appButtonGhost,
  destructive: styles.appButtonDestructive,
} as const;

const variant_class = computed(() => VARIANT_CLASSES[props.variant]);
const is_disabled = computed(() => props.disabled || props.pending);

function handle_click(event: MouseEvent): void {
  if (is_disabled.value) {
    return;
  }
  emit("click", event);
}
</script>

<template>
  <button
    :type="type"
    class="tc-interactive"
    :class="[styles.appButton, variant_class]"
    :disabled="is_disabled"
    :aria-busy="pending"
    :aria-label="label"
    @click="handle_click"
  >
    <span
      :class="[styles.appButtonContent, pending && styles.appButtonContentPending]"
      aria-hidden="true"
    >
      <AppIcon v-if="icon" :icon="icon" :size="16" />
      <span :class="styles.appButtonLabel">{{ label }}</span>
    </span>
    <span v-if="pending" :class="styles.appButtonSpinner" aria-hidden="true">
      <AppIcon :icon="LoaderCircle" :size="16" />
    </span>
  </button>
</template>
