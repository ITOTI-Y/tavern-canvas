/** Popups that take over scrolling while open; tooltips are passive and never lock anything. */
const POPUP_SELECTOR = '[role="listbox"], [role="dialog"], [role="alertdialog"], [role="menu"]';

/**
 * While a popup is open in `portal`, wheel and touch scrolling anywhere outside it is cancelled,
 * so scrolling a dropdown never moves the page or panel behind it.
 */
export function install_popup_scroll_lock(portal: HTMLElement): () => void {
  const document_ = portal.ownerDocument;

  function block_outside_popups(event: Event): void {
    const popups = [...portal.querySelectorAll(POPUP_SELECTOR)];
    if (popups.length === 0) {
      return;
    }
    const path = event.composedPath();
    if (!popups.some((popup) => path.includes(popup))) {
      event.preventDefault();
    }
  }

  const options = { capture: true, passive: false } as const;
  document_.addEventListener("wheel", block_outside_popups, options);
  document_.addEventListener("touchmove", block_outside_popups, options);
  return () => {
    document_.removeEventListener("wheel", block_outside_popups, options);
    document_.removeEventListener("touchmove", block_outside_popups, options);
  };
}
