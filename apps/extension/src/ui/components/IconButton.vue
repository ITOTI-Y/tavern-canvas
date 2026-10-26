<script setup lang="ts">
import type { Component } from "vue";
import { computed } from "vue";

import AppIcon from "./AppIcon.vue";
import AppTooltip from "./AppTooltip.vue";
import styles from "./components.module.css";

const props = withDefaults(
  defineProps<{
    readonly icon: Component;
    readonly label: string;
    readonly tooltip?: string | undefined;
    readonly size?: "sm" | "md" | "lg";
    /** `null` renders a plain command button, a boolean a toggle; Vue would cast an absent Boolean prop to `false`. */
    readonly pressed?: boolean | null;
    readonly disabled?: boolean;
    readonly destructive?: boolean;
  }>(),
  {
    tooltip: undefined,
    size: "md",
    pressed: null,
    disabled: false,
    destructive: false,
  },
);

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const SIZE_CLASSES = {
  sm: styles.iconButtonSm,
  md: styles.iconButtonMd,
  lg: styles.iconButtonLg,
} as const;

const ICON_PIXEL_SIZES = { sm: 16, md: 18, lg: 22 } as const;

const size_class = computed(() => SIZE_CLASSES[props.size]);
const icon_size = computed(() => ICON_PIXEL_SIZES[props.size]);

function handle_click(event: MouseEvent): void {
  if (props.disabled) {
    return;
  }
  emit("click", event);
}
</script>

<template>
  <AppTooltip :content="tooltip ?? label">
    <button
      type="button"
      class="tc-interactive"
      :class="[
        styles.iconButton,
        size_class,
        destructive && styles.iconButtonDestructive,
        pressed === true && styles.iconButtonPressed,
      ]"
      :aria-label="label"
      :aria-pressed="pressed === null ? undefined : pressed"
      :disabled="disabled"
      @click="handle_click"
    >
      <AppIcon :icon="icon" :size="icon_size" />
    </button>
  </AppTooltip>
</template>
