import type { InjectionKey, Ref } from "vue";

/** Reka portals must render into the Shadow Root's portal element, never `document.body`. */
export const PORTAL_TARGET_KEY: InjectionKey<HTMLElement> = Symbol("tavern-canvas-portal-target");

/** The active chat's id, so library views can show the entries bound to it; `null` without a host. */
export const ACTIVE_CHAT_ID_KEY: InjectionKey<Readonly<Ref<string | null>>> = Symbol(
  "tavern-canvas-active-chat-id",
);
