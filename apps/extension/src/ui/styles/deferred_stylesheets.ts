/**
 * CSS Modules used only by lazily loaded components are kept out of `FIRST_PARTY_STYLESHEET`; each one's
 * `*_styles.ts` registers it here when its chunk first loads. A deferred sheet must not contain asset
 * URLs, since only the first-party stylesheet resolves them.
 */
const DEFERRED_STYLESHEET_ORDER = [
  "components",
  "dialogs",
  "illustrate_dialog",
  "prompt_field",
  "assets",
  "gallery",
  "prompt",
  "diagnostics",
  "settings",
] as const;

export type DeferredStylesheetKey = (typeof DEFERRED_STYLESHEET_ORDER)[number];

const KEY_ATTRIBUTE = "data-deferred-stylesheet";

const stylesheets = new Map<DeferredStylesheetKey, string>();
const shadow_roots = new Set<ShadowRoot>();

/** The first-party `<style>` ranks -1, so deferred sheets always follow it in this fixed order. */
function cascade_rank(style_element: HTMLStyleElement): number {
  const key = style_element.getAttribute(KEY_ATTRIBUTE);
  return key === null ? -1 : (DEFERRED_STYLESHEET_ORDER as readonly string[]).indexOf(key);
}

function write_stylesheet(shadow_root: ShadowRoot, key: DeferredStylesheetKey, css: string): void {
  const style_elements = [...shadow_root.querySelectorAll("style")];
  const existing = style_elements.find((element) => element.getAttribute(KEY_ATTRIBUTE) === key);
  if (existing) {
    existing.textContent = css;
    return;
  }

  const style_element = shadow_root.ownerDocument.createElement("style");
  style_element.setAttribute(KEY_ATTRIBUTE, key);
  style_element.textContent = css;
  const rank = DEFERRED_STYLESHEET_ORDER.indexOf(key);
  const preceding = style_elements.findLast((element) => cascade_rank(element) < rank);
  if (preceding) {
    preceding.after(style_element);
  } else {
    shadow_root.prepend(style_element);
  }
}

export function register_deferred_stylesheet(key: DeferredStylesheetKey, css: string): void {
  stylesheets.set(key, css);
  for (const shadow_root of shadow_roots) {
    write_stylesheet(shadow_root, key, css);
  }
}

export function attach_deferred_stylesheets(shadow_root: ShadowRoot): () => void {
  shadow_roots.add(shadow_root);
  for (const [key, css] of stylesheets) {
    write_stylesheet(shadow_root, key, css);
  }
  return () => {
    shadow_roots.delete(shadow_root);
  };
}
