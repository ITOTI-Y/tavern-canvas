import { FIRST_PARTY_STYLESHEET } from "../ui/styles/runtime_stylesheet.js";

/**
 * The dev server's HMR boundary for the Shadow Root's stylesheet, and the reason a CSS edit
 * updates the running Studio in place instead of reloading the page.
 *
 * Every first-party stylesheet reaches the browser as a plain string through runtime_stylesheet.ts's
 * `?inline` imports, injected once into the Shadow Root's own `<style>` element
 * (create_shadow_root.ts). Vite's normal CSS hot path does not apply: an `?inline` import is a JS
 * module exporting text, so it never self-accepts the way a side-effect `import "./x.css"` does.
 * Without a boundary the invalidation walks `*.module.css` -> runtime_stylesheet.ts -> whichever
 * entry imported it, finds nobody willing to accept it, and falls back to a full page reload --
 * which throws away exactly the state a CSS tweak usually needs to stay in (an open dialog, a
 * scrolled list, a half-filled form).
 *
 * Accepting the dependency here terminates that walk. Entries import the stylesheet from this
 * module rather than from runtime_stylesheet.ts directly, so this stays the single importer and
 * the single place that has to know about HMR at all; every subscriber just receives the new text
 * and writes it back over the `<style>` element it already owns.
 *
 * `import.meta.hot` is statically undefined in a production build, so the accept block and this
 * module's whole listener set are dropped from dist/ by tree shaking.
 */

type StylesheetListener = (stylesheet: string) => void;

const listeners = new Set<StylesheetListener>();

/** The stylesheet as of page load. Identical to importing FIRST_PARTY_STYLESHEET directly. */
export const INITIAL_STYLESHEET = FIRST_PARTY_STYLESHEET;

/**
 * Registers a listener for post-load stylesheet replacements. Returns an unsubscribe function.
 * In a production build no replacement can ever occur, so the listener is simply never called.
 */
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

/**
 * Points a Shadow Root's own `<style>` element at every subsequent stylesheet replacement.
 * Encodes the one assumption create_shadow_root.ts establishes and nothing else states: the first
 * `<style>` child of the Shadow Root is the first-party stylesheet. Returns an unsubscribe
 * function; in a production build it is a no-op subscription that never fires.
 */
export function bind_shadow_root_stylesheet(shadow_root: ShadowRoot): () => void {
  return subscribe_stylesheet((stylesheet) => {
    const style_element = shadow_root.querySelector("style");
    if (style_element) {
      style_element.textContent = stylesheet;
    }
  });
}
