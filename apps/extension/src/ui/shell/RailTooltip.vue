<script setup lang="ts">
import {
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from "reka-ui";

import styles from "./shell.module.css";
import { use_portal_target } from "./use_portal_target.js";

/**
 * One rail item's hover label. Split out of `DesktopIconRail` so Reka's Tooltip primitives and the
 * Floating UI positioning engine behind them -- together the largest single block of the initial
 * bundle after the Vue runtime -- load on the first pointer or keyboard entry into the rail rather
 * than at extension load. The rail renders its buttons identically either way.
 */
defineProps<{ readonly label: string }>();

const portal_target = use_portal_target();
</script>

<template>
  <TooltipProvider :delay-duration="300">
    <TooltipRoot>
      <TooltipTrigger as-child>
        <slot />
      </TooltipTrigger>
      <TooltipPortal :to="portal_target">
        <TooltipContent :class="styles.tooltip_content" side="right" :side-offset="8">
          {{ label }}
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>
