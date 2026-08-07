import type { InjectionKey } from "vue";

/**
 * The Shadow Root's dedicated portal element (a sibling of the app mount, appended after it so
 * it always paints on top in light-DOM order). Every Reka UI dialog, tooltip, menu, and sheet
 * portal must render into this element instead of `document.body` -- the extension mounts inside
 * a closed Shadow Root and must never leak overlay content past its own boundary. Defined here in
 * the contracts layer, not in the shell that provides it, so the shell (Task 2) and the shared
 * components that consume it (Task 4) resolve the exact same symbol.
 */
export const PORTAL_TARGET_KEY: InjectionKey<HTMLElement> = Symbol("tavern-canvas-portal-target");
