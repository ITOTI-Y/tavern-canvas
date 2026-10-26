import type { InjectionKey } from "vue";

/** Reka portals must render into the Shadow Root's portal element, never `document.body`. */
export const PORTAL_TARGET_KEY: InjectionKey<HTMLElement> = Symbol("tavern-canvas-portal-target");
