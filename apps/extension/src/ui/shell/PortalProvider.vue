<script setup lang="ts">
import { provide } from "vue";

import { PORTAL_TARGET_KEY } from "../contracts/portal_keys.js";

const props = defineProps<{
  /**
   * The Shadow Root's dedicated portal element (see contracts/portal_keys.ts). Every Reka dialog,
   * tooltip, menu, and sheet portal under this subtree resolves to this exact element instead of
   * `document.body` -- the extension mounts inside a closed Shadow Root and must never leak
   * overlay content past its own boundary.
   */
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
