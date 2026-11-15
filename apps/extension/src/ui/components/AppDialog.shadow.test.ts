import { flushPromises, mount } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";
import { h } from "vue";

import { PORTAL_TARGET_KEY } from "../contracts/portal_keys.js";
import AppDialog from "./AppDialog.vue";
import PromptTagChip from "./PromptTagChip.vue";

const PRESETS = [
  { id: "a", kind: "quality", group: null, label: "First", text: "masterpiece" },
  { id: "b", kind: "quality", group: null, label: "Second", text: "very aesthetic" },
] as const;

/** Mounts the dialog the way Inkwell renders: inside a shadow root, with popovers portaled next to it. */
async function mount_in_shadow_root() {
  const host = document.createElement("div");
  document.body.append(host);
  const root = host.attachShadow({ mode: "open" });
  const attach = document.createElement("div");
  const portal = document.createElement("div");
  root.append(attach, portal);
  const chosen: string[] = [];
  const wrapper = mount(AppDialog, {
    attachTo: attach,
    props: { open: true, title: "Illustrate", closeLabel: "Close" },
    slots: {
      default: () =>
        h(PromptTagChip, {
          prefix: "Quality: ",
          choice: { enabled: true, preset_id: "a" },
          presets: PRESETS,
          customGroupLabel: "Custom",
          missingLabel: "Missing",
          enableLabel: "Enable",
          disableLabel: "Disable",
          "onUpdate:choice": (choice: { preset_id: string }) => chosen.push(choice.preset_id),
        }),
    },
    global: { provide: { [PORTAL_TARGET_KEY as symbol]: portal } },
  });
  // Reka starts listening for outside presses a tick after a layer mounts.
  const settle = async (): Promise<void> => {
    await flushPromises();
    await new Promise((resolve) => setTimeout(resolve, 10));
    await flushPromises();
  };
  await settle();
  return { wrapper, portal, chosen, settle };
}

function press(element: Element): void {
  element.dispatchEvent(
    new PointerEvent("pointerdown", { bubbles: true, composed: true, button: 0 }),
  );
}

afterEach(() => {
  document.body.innerHTML = "";
});

describe("AppDialog inside a shadow root", () => {
  it("stays open while an option of a popover opened from it is pressed and chosen", async () => {
    const { wrapper, portal, chosen, settle } = await mount_in_shadow_root();
    const trigger = portal.querySelector<HTMLElement>('[role="dialog"] button[aria-haspopup]');
    trigger?.click();
    await settle();
    const option = [
      ...portal.querySelectorAll<HTMLElement>('[data-testid="prompt-tag-list"] button'),
    ].find((button) => button.textContent.includes("Second"));
    if (option === undefined) {
      throw new Error("the preset list did not open");
    }

    press(option);
    await settle();
    option.click();
    await settle();

    expect(wrapper.emitted("update:open")).toBeUndefined();
    expect(chosen).toEqual(["b"]);
    wrapper.unmount();
  });

  it("closes when the overlay behind it is pressed", async () => {
    const { wrapper, portal, settle } = await mount_in_shadow_root();
    const overlay = portal.querySelector('[role="dialog"]')?.previousElementSibling;
    if (overlay === null || overlay === undefined) {
      throw new Error("the dialog has no overlay");
    }

    press(overlay);
    await settle();

    expect(wrapper.emitted("update:open")).toEqual([[false]]);
    wrapper.unmount();
  });
});
