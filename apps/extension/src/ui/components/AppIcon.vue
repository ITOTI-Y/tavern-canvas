<script setup lang="ts">
import type { Component } from "vue";

/**
 * The single place that pins Lucide's stroke width for the whole Studio (roadmap rule 7 /
 * taste-directive 11: one icon family, one standardized stroke width -- never a per-usage prop,
 * so no call site can drift the value).
 *
 * This was previously true only on paper: shell/route_nav.ts exported a second copy of the same
 * constant, and fourteen call sites rendered Lucide components directly instead of going through
 * this wrapper. Nine of those set no stroke width at all and silently fell back to Lucide's own
 * default of 2, which is why icons of the same nominal weight did not match across views. Both the
 * duplicate constant and every bypassing call site are gone; icon_contract.test.ts keeps them gone.
 */
const ICON_STROKE_WIDTH = 1.75;
const DEFAULT_ICON_SIZE = 20;

withDefaults(
  defineProps<{
    /** A lucide-vue-next icon component reference (e.g. `Sparkles`, `Trash2`). */
    readonly icon: Component;
    readonly size?: number;
    /**
     * When set, the icon carries its own accessible name (`role="img"` + `aria-label`) -- only for
     * the rare case where no sibling text or wrapping control already names it. Left unset, the
     * icon is `aria-hidden` and purely decorative, which is the default for every icon paired with
     * a labeled control (IconButton, AppButton, menu items).
     */
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
