<script setup lang="ts">
import styles from "./components.module.css";

/**
 * Unframed region whose box never changes size across loading/empty/error/ready (`minHeight`
 * reserves the box up front, so downstream content never shifts). Loading renders a static
 * skeleton matching the final layout's shape (taste directive: skeleton over spinner) -- the
 * caller supplies its own `skeleton` slot shaped like the real content; without one, a generic
 * set of neutral blocks stands in. Empty/error states are composed: one message plus one optional
 * action slot, never a bare "no data" string.
 */
withDefaults(
  defineProps<{
    readonly status: "loading" | "empty" | "error" | "ready";
    readonly minHeight?: string;
    readonly emptyMessage?: string;
    readonly errorMessage?: string;
  }>(),
  {
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
      <p :class="styles.stateSurfaceMessageText">{{ emptyMessage }}</p>
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
