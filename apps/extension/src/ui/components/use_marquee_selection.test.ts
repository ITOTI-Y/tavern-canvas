import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { defineComponent, h, ref } from "vue";

import { use_marquee_selection } from "./use_marquee_selection.js";

/** Two 100 px items side by side, the second starting at x = 200. */
function rect(left: number): DOMRect {
  return {
    left,
    right: left + 100,
    top: 0,
    bottom: 100,
    x: left,
    y: 0,
    width: 100,
    height: 100,
    toJSON: () => ({}),
  };
}

function mount_area(start_on_items: boolean) {
  const on_select = vi.fn();
  const Area = defineComponent(() => {
    const container = ref<HTMLElement | null>(null);
    const marquee = use_marquee_selection(container, { start_on_items, on_select });
    return () =>
      h("div", { ref: container, id: "area", onPointerdown: marquee.on_pointerdown }, [
        h("div", { "data-select-id": "a", id: "a" }),
        h("div", { "data-select-id": "b", id: "b" }),
      ]);
  });
  const wrapper = mount(Area, { attachTo: document.body });
  vi.spyOn(wrapper.get("#a").element, "getBoundingClientRect").mockReturnValue(rect(0));
  vi.spyOn(wrapper.get("#b").element, "getBoundingClientRect").mockReturnValue(rect(200));
  return { wrapper, on_select };
}

function pointer(type: string, x: number, init: PointerEventInit = {}): PointerEvent {
  return new PointerEvent(type, {
    bubbles: true,
    button: 0,
    pointerType: "mouse",
    clientX: x,
    clientY: 50,
    ...init,
  });
}

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

describe("use_marquee_selection", () => {
  it("selects the items a dragged box touches", () => {
    const { wrapper, on_select } = mount_area(true);
    wrapper.get("#a").element.dispatchEvent(pointer("pointerdown", 10));
    window.dispatchEvent(pointer("pointermove", 150));
    window.dispatchEvent(pointer("pointerup", 150));
    expect(on_select).toHaveBeenCalledWith(["a"], "replace");
  });

  it("adds to the selection with a modifier held and treats a short press as a click", () => {
    const { wrapper, on_select } = mount_area(true);
    wrapper.get("#area").element.dispatchEvent(pointer("pointerdown", 150, { shiftKey: true }));
    window.dispatchEvent(pointer("pointermove", 250));
    window.dispatchEvent(pointer("pointerup", 250));
    expect(on_select).toHaveBeenLastCalledWith(["b"], "add");

    wrapper.get("#area").element.dispatchEvent(pointer("pointerdown", 150));
    window.dispatchEvent(pointer("pointerup", 152));
    expect(on_select).toHaveBeenCalledTimes(1);
  });

  it("starts only from empty space when items have their own drag", () => {
    const { wrapper, on_select } = mount_area(false);
    wrapper.get("#a").element.dispatchEvent(pointer("pointerdown", 10));
    window.dispatchEvent(pointer("pointermove", 250));
    window.dispatchEvent(pointer("pointerup", 250));
    expect(on_select).not.toHaveBeenCalled();
  });
});
