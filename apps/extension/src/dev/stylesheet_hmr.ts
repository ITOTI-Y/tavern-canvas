import { FIRST_PARTY_STYLESHEET } from "../ui/styles/runtime_stylesheet.js";

/**
 * Accepts `runtime_stylesheet.ts` updates so a CSS edit reaches the Shadow Root's `<style>` instead of
 * triggering a full reload. Entries must import the stylesheet from this module.
 */

type StylesheetListener = (stylesheet: string) => void;

const listeners = new Set<StylesheetListener>();

export const INITIAL_STYLESHEET = FIRST_PARTY_STYLESHEET;

export function subscribe_stylesheet(listener: StylesheetListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

if (import.meta.hot) {
  import.meta.hot.accept("../ui/styles/runtime_stylesheet.js", (updated) => {
    const next = (updated as { FIRST_PARTY_STYLESHEET?: string } | undefined)
      ?.FIRST_PARTY_STYLESHEET;
    if (next === undefined) {
      return;
    }
    for (const listener of listeners) {
      listener(next);
    }
  });
}

/** Assumes the first `<style>` child of the Shadow Root is the first-party stylesheet (`create_shadow_root.ts`). */
export function bind_shadow_root_stylesheet(shadow_root: ShadowRoot): () => void {
  return subscribe_stylesheet((stylesheet) => {
    const style_element = shadow_root.querySelector("style");
    if (style_element) {
      style_element.textContent = stylesheet;
    }
  });
}
