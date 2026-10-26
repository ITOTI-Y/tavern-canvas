import { inject } from "vue";

import { PORTAL_TARGET_KEY } from "../contracts/portal_keys.js";

/** Throws instead of returning `undefined`, which would let a portal fall back to `document.body`. */
export function use_portal_target(): HTMLElement {
  const target = inject(PORTAL_TARGET_KEY);
  if (target === undefined) {
    throw new Error(
      "No portal target was provided: every Reka portal must render inside the Shadow Root's " +
        "dedicated portal element (see contracts/portal_keys.ts). Wrap this component tree in " +
        "<PortalProvider>.",
    );
  }
  return target;
}
