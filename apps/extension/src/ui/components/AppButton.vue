<script setup lang="ts">
import { LoaderCircle } from "lucide-vue-next";
import type { Component } from "vue";
import { computed } from "vue";

import AppIcon from "./AppIcon.vue";
import styles from "./components.module.css";

/**
 * The one control reserved for clear, named commands (never icon-only -- that is `IconButton`).
 * Every variant renders as text/icon-on-neutral-surface rather than a solid color fill: the
 * mandated accent/error values are calibrated as *foreground* colors (style_contract.test.ts checks
 * `--tc-accent`/`--tc-error` at body-text AA against every neutral surface in both themes), but
 * `--tc-accent` in dark mode is a light tint that fails AA as a solid fill under white label text
 * (2.9:1, verified by hand against the dark palette). Reusing the same foreground-on-surface
 * treatment as the controller's status-badge ruling sidesteps that failure without inventing an
 * unratified "on-accent" token.
 */
const props = withDefaults(
  defineProps<{
    readonly label: string;
    readonly icon?: Component | undefined;
    readonly variant?: "primary" | "secondary" | "destructive";
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
