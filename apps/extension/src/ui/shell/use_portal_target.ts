import { inject } from "vue";

import { PORTAL_TARGET_KEY } from "../contracts/portal_keys.js";

/**
 * Thin wrapper over `inject(PORTAL_TARGET_KEY)` that fails fast instead of handing every Reka
 * portal an `HTMLElement | undefined` (`exactOptionalPropertyTypes` rejects `undefined` for
 * Teleport's `to` prop, and a silently-undefined target would otherwise let a portal fall back to
 * `document.body` -- exactly what task-2-brief.md forbids). Every component that reaches this
 * must be mounted under `<PortalProvider>`.
 */
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
