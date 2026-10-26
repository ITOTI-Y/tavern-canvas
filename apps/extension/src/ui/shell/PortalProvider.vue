<script setup lang="ts">
import { provide } from "vue";

import { PORTAL_TARGET_KEY } from "../contracts/portal_keys.js";

const props = defineProps<{
  /** Portals under this subtree render into the Shadow Root's portal element, never `document.body`. */
  portalTarget: HTMLElement;
}>();

if (props.portalTarget === document.body) {
  throw new Error(
    "PortalProvider must never receive document.body as the portal target -- pass the Shadow " +
      'Root\'s dedicated [data-shadow-role="portal"] element instead.',
  );
}

provide(PORTAL_TARGET_KEY, props.portalTarget);
</script>

<template>
  <slot />
</template>
