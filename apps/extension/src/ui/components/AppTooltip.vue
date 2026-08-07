<script setup lang="ts">
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from "reka-ui";
import { computed, inject } from "vue";

import { PORTAL_TARGET_KEY } from "../contracts/portal_keys.js";
import styles from "./components.module.css";

/**
 * Generic tooltip wrapper around Reka UI's Tooltip primitives (dialog/tooltip/focus/portal
 * behavior stays exactly Reka's -- this file only adds tokens and layout). The default slot must
 * render exactly one element, which becomes the trigger via Reka's `as-child` composition; Reka
 * merges the hover/focus listeners and `aria-describedby` onto that element directly.
 *
 * Every instance owns its own `TooltipProvider` so `AppTooltip` works standalone anywhere in the
 * tree without depending on a shell-level provider; nesting Reka providers is supported and the
 * innermost one simply wins for its subtree.
 */
withDefaults(
  defineProps<{
    readonly content: string;
    readonly disabled?: boolean;
    readonly side?: "top" | "right" | "bottom" | "left";
    readonly delayDuration?: number;
  }>(),
  {
    disabled: false,
    side: "top",
    delayDuration: 300,
  },
);

const portal_target = inject(PORTAL_TARGET_KEY, undefined);
const portal_props = computed(() => (portal_target ? { to: portal_target } : {}));
</script>

<template>
  <TooltipProvider :disable-hoverable-content="false">
    <TooltipRoot :delay-duration="delayDuration" :disabled="disabled">
      <TooltipTrigger as-child>
        <slot />
      </TooltipTrigger>
      <TooltipPortal v-bind="portal_props">
        <TooltipContent :side="side" :side-offset="6" :class="styles.tooltipContent">
          {{ content }}
          <TooltipArrow :class="styles.tooltipArrow" :width="8" :height="5" />
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>
