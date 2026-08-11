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
    /**
     * Optional headline above `emptyMessage`. Callers whose locale bundle already splits the state
     * into a title and a description pass both and get two lines; the eight that used to join them
     * with a template literal produced a single run-on line, which in Chinese put two complete
     * sentences side by side separated by one half-width space. Callers with only a description
     * leave this unset and render exactly as before.
     */
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
