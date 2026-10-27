<script setup lang="ts">
import styles from "./components_styles.js";

withDefaults(
  defineProps<{
    readonly status: "loading" | "empty" | "error" | "ready";
    readonly minHeight?: string;
    readonly emptyTitle?: string;
    readonly emptyMessage?: string;
    readonly errorMessage?: string;
  }>(),
  {
    emptyTitle: "",
    emptyMessage: "",
    errorMessage: "",
    minHeight: "160px",
  },
);
</script>

<template>
  <div :class="styles.stateSurface" :style="{ minHeight }">
    <div v-if="status === 'loading'" :class="styles.stateSurfaceSkeleton" aria-hidden="true">
      <slot name="skeleton">
        <div :class="styles.skeletonBlock" :style="{ width: '70%' }" />
        <div :class="styles.skeletonBlock" :style="{ width: '100%' }" />
        <div :class="styles.skeletonBlock" :style="{ width: '85%' }" />
      </slot>
    </div>
    <div v-else-if="status === 'empty'" :class="styles.stateSurfaceMessage">
      <div :class="styles.stateSurfaceMessageGroup">
        <p v-if="emptyTitle" :class="styles.stateSurfaceMessageTitle">{{ emptyTitle }}</p>
        <p v-if="emptyMessage" :class="styles.stateSurfaceMessageText">{{ emptyMessage }}</p>
      </div>
      <div v-if="$slots.action" :class="styles.stateSurfaceAction">
        <slot name="action" />
      </div>
    </div>
    <div v-else-if="status === 'error'" :class="styles.stateSurfaceMessage" role="alert">
      <p :class="[styles.stateSurfaceMessageText, styles.stateSurfaceErrorText]">
        {{ errorMessage }}
      </p>
      <div v-if="$slots.action" :class="styles.stateSurfaceAction">
        <slot name="action" />
      </div>
    </div>
    <slot v-else />
  </div>
</template>
