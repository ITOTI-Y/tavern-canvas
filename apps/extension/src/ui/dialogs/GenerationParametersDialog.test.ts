import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";
import { nextTick } from "vue";

import { PORTAL_TARGET_KEY } from "../contracts/portal_keys.js";
import GenerationParametersDialog from "./GenerationParametersDialog.vue";

function create_portal_host(): HTMLElement {
  const portal = document.createElement("div");
  document.body.append(portal);
  return portal;
}

function mount_dialog(props: Record<string, unknown>) {
  const portal = create_portal_host();
  const attach_host = document.createElement("div");
  document.body.append(attach_host);
  return mount(GenerationParametersDialog, {
    attachTo: attach_host,
    props: {
      open: true,
      title: "Generation size",
      closeLabel: "Close",
      mode: "dimensions",
      widthLabel: "Width",
      heightLabel: "Height",
      width: 1024,
      height: 1024,
      widthStepLabel: "Adjust width",
      heightStepLabel: "Adjust height",
      aspectRatioLabel: "Aspect ratio",
      aspectRatioPlaceholder: "Choose an aspect ratio",
      swapLabel: "Swap",
      generateLabel: "Generate",
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

describe("GenerationParametersDialog", () => {
  it("renders width/height steppers in dimensions mode", async () => {
    const wrapper = mount_dialog({ mode: "dimensions" });
    await nextTick();
    expect(document.querySelectorAll('[role="spinbutton"]')).toHaveLength(2);
    wrapper.unmount();
  });

  it("renders an aspect-ratio select and swap button in aspect_ratio mode", async () => {
    const wrapper = mount_dialog({
      mode: "aspect_ratio",
      aspectRatio: "1:1",
      aspectRatioOptions: [
        { value: "1:1", label: "1:1" },
        { value: "16:9", label: "16:9" },
      ],
    });
    await nextTick();
    expect(document.querySelector('[role="combobox"]')).not.toBeNull();
    expect(document.body.textContent).toContain("Swap");
    wrapper.unmount();
  });

  it("emits update:width when the width stepper's button is pressed", async () => {
    const wrapper = mount_dialog({ mode: "dimensions" });
    await nextTick();
    await new Promise((resolve) => setTimeout(resolve, 0));
    const width_button = [...document.querySelectorAll("button")].find(
      (button) => button.getAttribute("aria-label") === "Adjust width",
    );
    width_button?.dispatchEvent(new PointerEvent("pointerdown", { button: 0, bubbles: true }));
    await nextTick();
    expect(wrapper.emitted("update:width")).toBeTruthy();
    wrapper.unmount();
  });

  it("emits swap when the swap button is clicked (aspect_ratio mode)", async () => {
    const wrapper = mount_dialog({
      mode: "aspect_ratio",
      aspectRatio: "1:1",
      aspectRatioOptions: [{ value: "1:1", label: "1:1" }],
    });
    await nextTick();
    const swap_button = [...document.querySelectorAll("button")].find((button) =>
      button.textContent?.includes("Swap"),
    );
    (swap_button as HTMLElement).click();
    await nextTick();
    expect(wrapper.emitted("swap")).toBeTruthy();
    wrapper.unmount();
  });

  it("emits generate when the generate button is clicked", async () => {
    const wrapper = mount_dialog({ mode: "dimensions" });
    await nextTick();
    const generate_button = document.querySelector('button[aria-label="Generate"]');
    (generate_button as HTMLElement).click();
    await nextTick();
    expect(wrapper.emitted("generate")).toBeTruthy();
    wrapper.unmount();
  });

  it("marks the generate button aria-busy while pending, without changing its box (dimension stability)", async () => {
    const idle = mount_dialog({ mode: "dimensions", pending: false });
    await nextTick();
    const idle_button = document.querySelector('button[aria-label="Generate"]');
    expect(idle_button?.getAttribute("aria-busy")).toBe("false");
    idle.unmount();

    const pending = mount_dialog({ mode: "dimensions", pending: true });
    await nextTick();
    const pending_button = document.querySelector('button[aria-label="Generate"]');
    expect(pending_button?.getAttribute("aria-busy")).toBe("true");
    pending.unmount();
  });
});
