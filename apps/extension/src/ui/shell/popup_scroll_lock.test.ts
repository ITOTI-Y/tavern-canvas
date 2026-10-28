import { afterEach, describe, expect, it } from "vitest";

import { install_popup_scroll_lock } from "./popup_scroll_lock.js";

function wheel_on(target: Element): boolean {
  const event = new WheelEvent("wheel", { bubbles: true, cancelable: true, composed: true });
  target.dispatchEvent(event);
  return event.defaultPrevented;
}

afterEach(() => {
  document.body.innerHTML = "";
});

describe("install_popup_scroll_lock", () => {
  it("cancels scrolling outside an open popup and lets the popup scroll", () => {
    document.body.innerHTML = `
      <div id="workspace"></div>
      <div id="portal"><div role="listbox"><div id="option"></div></div></div>`;
    const portal = document.getElementById("portal") as HTMLElement;
    const release = install_popup_scroll_lock(portal);

    expect(wheel_on(document.getElementById("workspace") as Element)).toBe(true);
    expect(wheel_on(document.getElementById("option") as Element)).toBe(false);
    release();
    expect(wheel_on(document.getElementById("workspace") as Element)).toBe(false);
  });

  it("leaves scrolling alone while only a tooltip is shown", () => {
    document.body.innerHTML = `
      <div id="workspace"></div>
      <div id="portal"><div role="tooltip"></div></div>`;
    const release = install_popup_scroll_lock(document.getElementById("portal") as HTMLElement);

    expect(wheel_on(document.getElementById("workspace") as Element)).toBe(false);
    release();
  });
});
