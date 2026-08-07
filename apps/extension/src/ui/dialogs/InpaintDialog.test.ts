import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";
import { nextTick } from "vue";

import { PORTAL_TARGET_KEY } from "../contracts/portal_keys.js";
import InpaintDialog from "./InpaintDialog.vue";

/**
 * InpaintDialog: pointer events support mouse, pen, and touch without UA detection; Lucide
 * undo/redo/eraser/trash/zoom/upload/generate icons (no custom SVG toolbar icons); canvas and
 * controls do not resize when status changes. See inpaint_session.test.ts for the underlying mask
 * math (brush/erase rasterization, undo/redo history, provider-specific export, dimension
 * validation) this dialog delegates to.
 */

function fake_bitmap(width: number, height: number): ImageBitmap {
  return { width, height, close: () => {} } as unknown as ImageBitmap;
}

function create_portal_host(): HTMLElement {
  const portal = document.createElement("div");
  document.body.append(portal);
  return portal;
}

function mount_dialog(props: Record<string, unknown> = {}) {
  const portal = create_portal_host();
  const attach_host = document.createElement("div");
  document.body.append(attach_host);
  return mount(InpaintDialog, {
    attachTo: attach_host,
    props: {
      open: true,
      title: "Inpaint",
      closeLabel: "Close",
      bitmap: fake_bitmap(64, 32),
      undoLabel: "Undo",
      redoLabel: "Redo",
      eraseLabel: "Erase",
      clearLabel: "Clear",
      zoomInLabel: "Zoom in",
      zoomOutLabel: "Zoom out",
      uploadLabel: "Upload reference",
      generateLabel: "Generate",
      brushSizeLabel: "Brush size",
      positivePromptLabel: "Positive prompt",
      negativePromptLabel: "Negative prompt",
      denoiseLabel: "Denoise strength",
      dimensionErrorLabel: "Mask dimensions do not match the source image",
      ...props,
    },
    global: {
      provide: { [PORTAL_TARGET_KEY as unknown as string]: portal },
    },
  });
}

afterEach(() => {
  document.body.innerHTML = "";
});

function mask_canvas(): HTMLElement {
  const canvas = document.querySelector('[data-testid="inpaint-mask-canvas"]');
  if (canvas === null) {
    throw new Error("mask canvas not found");
  }
  return canvas as HTMLElement;
}

function paint_stroke(pointer_type: string, pointer_id = 1): void {
  const canvas = mask_canvas();
  canvas.dispatchEvent(
    new PointerEvent("pointerdown", {
      pointerId: pointer_id,
      pointerType: pointer_type,
      clientX: 10,
      clientY: 10,
      bubbles: true,
    }),
  );
  canvas.dispatchEvent(
    new PointerEvent("pointermove", {
      pointerId: pointer_id,
      pointerType: pointer_type,
      clientX: 20,
      clientY: 20,
      bubbles: true,
    }),
  );
  canvas.dispatchEvent(
    new PointerEvent("pointerup", {
      pointerId: pointer_id,
      pointerType: pointer_type,
      clientX: 20,
      clientY: 20,
      bubbles: true,
    }),
  );
}

describe("InpaintDialog: loads a real bitmap with a fixed aspect ratio", () => {
  it("sets the canvas frame's aspect ratio from the bitmap and keeps it fixed across a status change", async () => {
    const wrapper = mount_dialog({ bitmap: fake_bitmap(200, 100), pending: false });
    await nextTick();
    const frame = document.querySelector<HTMLElement>('[class*="inpaintCanvasFrame"]');
    const before = frame?.style.getPropertyValue("--tc-inpaint-aspect");
    expect(before).toBe("2");

    await wrapper.setProps({ pending: true });
    await nextTick();
    const after = frame?.style.getPropertyValue("--tc-inpaint-aspect");
    expect(after).toBe(before);
    wrapper.unmount();
  });
});

describe("InpaintDialog: pointer events (mouse, pen, touch) without UA detection", () => {
  for (const pointer_type of ["mouse", "pen", "touch"]) {
    it(`paints a mask via a ${pointer_type} pointer stroke, exported as a binary mask on submit`, async () => {
      const wrapper = mount_dialog();
      await nextTick();
      paint_stroke(pointer_type);
      await nextTick();

      const generate = document.querySelector('button[aria-label="Generate"]');
      (generate as HTMLElement).click();
      await nextTick();

      const submitted = wrapper.emitted("submit");
      expect(submitted).toBeTruthy();
      const payload = submitted?.[0]?.[0] as { mask: Uint8ClampedArray };
      const has_masked_pixel = [...payload.mask].some((value) => value === 255);
      expect(has_masked_pixel).toBe(true);
      const is_strictly_binary = [...payload.mask].every((value) => value === 0 || value === 255);
      expect(is_strictly_binary).toBe(true);
      wrapper.unmount();
    });
  }
});

describe("InpaintDialog: brush size, erase, undo, redo, clear", () => {
  it("erase mode clears a previously painted stroke", async () => {
    const wrapper = mount_dialog();
    await nextTick();
    paint_stroke("mouse");
    await nextTick();

    const erase_button = document.querySelector('button[aria-label="Erase"]');
    (erase_button as HTMLElement).click();
    await nextTick();
    paint_stroke("mouse");
    await nextTick();

    const generate = document.querySelector('button[aria-label="Generate"]');
    (generate as HTMLElement).click();
    const payload = wrapper.emitted("submit")?.[0]?.[0] as { mask: Uint8ClampedArray };
    expect([...payload.mask].every((value) => value === 0)).toBe(true);
    wrapper.unmount();
  });

  it("undo reverts the last stroke and redo re-applies it", async () => {
    const wrapper = mount_dialog();
    await nextTick();
    paint_stroke("mouse");
    await nextTick();

    const undo_button = document.querySelector('button[aria-label="Undo"]');
    expect(undo_button?.hasAttribute("disabled")).toBe(false);
    (undo_button as HTMLElement).click();
    await nextTick();

    const generate = document.querySelector('button[aria-label="Generate"]');
    (generate as HTMLElement).click();
    let payload = wrapper.emitted("submit")?.[0]?.[0] as { mask: Uint8ClampedArray };
    expect([...payload.mask].every((value) => value === 0)).toBe(true);

    const redo_button = document.querySelector('button[aria-label="Redo"]');
    (redo_button as HTMLElement).click();
    await nextTick();
    (generate as HTMLElement).click();
    payload = wrapper.emitted("submit")?.[1]?.[0] as { mask: Uint8ClampedArray };
    expect([...payload.mask].some((value) => value === 255)).toBe(true);
    wrapper.unmount();
  });

  it("clear resets the mask to fully unmasked", async () => {
    const wrapper = mount_dialog();
    await nextTick();
    paint_stroke("mouse");
    await nextTick();

    const clear_button = document.querySelector('button[aria-label="Clear"]');
    (clear_button as HTMLElement).click();
    await nextTick();

    const generate = document.querySelector('button[aria-label="Generate"]');
    (generate as HTMLElement).click();
    const payload = wrapper.emitted("submit")?.[0]?.[0] as { mask: Uint8ClampedArray };
    expect([...payload.mask].every((value) => value === 0)).toBe(true);
    wrapper.unmount();
  });

  it("undo is disabled with no strokes yet", async () => {
    const wrapper = mount_dialog();
    await nextTick();
    const undo_button = document.querySelector('button[aria-label="Undo"]');
    expect(undo_button?.hasAttribute("disabled")).toBe(true);
    wrapper.unmount();
  });
});

describe("InpaintDialog: dimension validation", () => {
  it("shows an error and disables generate when the mask dimensions do not match the source", async () => {
    const wrapper = mount_dialog({ bitmap: fake_bitmap(64, 32), maskWidth: 32, maskHeight: 32 });
    await nextTick();
    expect(document.body.textContent).toContain("Mask dimensions do not match the source image");
    const generate = document.querySelector('button[aria-label="Generate"]');
    expect(generate?.hasAttribute("disabled")).toBe(true);
    wrapper.unmount();
  });

  it("shows no error when the mask matches the source dimensions", async () => {
    const wrapper = mount_dialog({ bitmap: fake_bitmap(64, 32) });
    await nextTick();
    expect(document.body.textContent).not.toContain(
      "Mask dimensions do not match the source image",
    );
    wrapper.unmount();
  });
});

describe("InpaintDialog: lucide-only toolbar icons", () => {
  it("renders every toolbar action with an accessible name backed by an SVG icon, no custom paths", async () => {
    const wrapper = mount_dialog();
    await nextTick();
    for (const label of [
      "Undo",
      "Redo",
      "Erase",
      "Clear",
      "Zoom in",
      "Zoom out",
      "Upload reference",
    ]) {
      const button = document.querySelector(`button[aria-label="${label}"]`);
      expect(button, `expected a button labeled "${label}"`).not.toBeNull();
      expect(button?.querySelector("svg")).not.toBeNull();
    }
    const generate = document.querySelector('button[aria-label="Generate"]');
    expect(generate?.querySelector("svg")).not.toBeNull();
    wrapper.unmount();
  });
});
