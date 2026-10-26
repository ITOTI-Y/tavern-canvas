<script setup lang="ts">
import type { Component } from "vue";

const ICON_STROKE_WIDTH = 1.75;
const DEFAULT_ICON_SIZE = 20;

withDefaults(
  defineProps<{
    readonly icon: Component;
    readonly size?: number;
    readonly label?: string | undefined;
  }>(),
  {
    label: undefined,
    size: DEFAULT_ICON_SIZE,
  },
);
</script>

<template>
  <component
    :is="icon"
    :size="size"
    :stroke-width="ICON_STROKE_WIDTH"
    :role="label ? 'img' : undefined"
    :aria-label="label"
    :aria-hidden="label ? undefined : 'true'"
  />
</template>
