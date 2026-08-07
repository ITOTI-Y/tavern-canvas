import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";
import { nextTick } from "vue";

import { PORTAL_TARGET_KEY } from "../contracts/portal_keys.js";
import ImageEditDialog from "./ImageEditDialog.vue";

function create_portal_host(): HTMLElement {
  const portal = document.createElement("div");
  document.body.append(portal);
  return portal;
}

function mount_dialog(props: Record<string, unknown> = {}) {
  const portal = create_portal_host();
  const attach_host = document.createElement("div");
  document.body.append(attach_host);
  return mount(ImageEditDialog, {
    attachTo: attach_host,
    props: {
      open: true,
      title: "Edit tag",
      closeLabel: "Close",
      text: "a cat, masterpiece",
      locked: false,
      presets: [{ preset_id: "quality", label: "masterpiece" }],
      textLabel: "Tag text",
      resetLabel: "Reset",
      lockLabel: "Lock",
      unlockLabel: "Unlock",
      deleteLabel: "Delete",
      saveLabel: "Save",
      processMenuLabel: "Process with",
      bananaRetouchLabel: "Banana retouch",
      grokVideoLabel: "Grok video",
      comfyuiInpaintLabel: "ComfyUI inpaint",
      novelaiInpaintLabel: "NovelAI inpaint",
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

describe("ImageEditDialog: tag-edit textbox with preset-match highlighting underlay", () => {
  it("highlights a recognized preset label inside the current text", async () => {
    const wrapper = mount_dialog();
    await nextTick();
    const highlight = document.querySelector(`[class*="editHighlightMatch"]`);
    expect(highlight?.textContent).toBe("masterpiece");
    wrapper.unmount();
  });

  it("emits save with the edited textarea contents", async () => {
    const wrapper = mount_dialog();
    await nextTick();
    const textarea = document.querySelector<HTMLTextAreaElement>('textarea[aria-label="Tag text"]');
    if (textarea === null) {
      throw new Error("tag textarea not found");
    }
    textarea.value = "a dog";
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
    await nextTick();

    const save_button = document.querySelector('button[aria-label="Save"]');
    (save_button as HTMLElement).click();
    expect(wrapper.emitted("save")).toEqual([["a dog"]]);
    wrapper.unmount();
  });
});

describe("ImageEditDialog: tag actions (reset/lock/unlock/delete)", () => {
  it("emits reset, toggle-lock, and delete from their respective buttons", async () => {
    const wrapper = mount_dialog();
    await nextTick();
    (document.querySelector('button[aria-label="Reset"]') as HTMLElement).click();
    (document.querySelector('button[aria-label="Lock"]') as HTMLElement).click();
    (document.querySelector('button[aria-label="Delete"]') as HTMLElement).click();
    expect(wrapper.emitted("reset")).toBeTruthy();
    expect(wrapper.emitted("toggle-lock")).toBeTruthy();
    expect(wrapper.emitted("delete")).toBeTruthy();
    wrapper.unmount();
  });

  it("locking disables the textarea, reset, delete, and save", async () => {
    const wrapper = mount_dialog({ locked: true });
    await nextTick();
    const textarea = document.querySelector<HTMLTextAreaElement>('textarea[aria-label="Tag text"]');
    expect(textarea?.disabled).toBe(true);
    expect(document.querySelector('button[aria-label="Reset"]')?.hasAttribute("disabled")).toBe(
      true,
    );
    expect(document.querySelector('button[aria-label="Delete"]')?.hasAttribute("disabled")).toBe(
      true,
    );
    expect(document.querySelector('button[aria-label="Save"]')?.hasAttribute("disabled")).toBe(
      true,
    );
    expect(document.querySelector('button[aria-label="Unlock"]')).not.toBeNull();
    wrapper.unmount();
  });
});

describe("ImageEditDialog: 4-way image-processing submenu", () => {
  it("emits the matching open-* event for each submenu action", async () => {
    const wrapper = mount_dialog();
    await nextTick();
    (document.querySelector('button[aria-label="Banana retouch"]') as HTMLElement).click();
    (document.querySelector('button[aria-label="Grok video"]') as HTMLElement).click();
    (document.querySelector('button[aria-label="ComfyUI inpaint"]') as HTMLElement).click();
    (document.querySelector('button[aria-label="NovelAI inpaint"]') as HTMLElement).click();
    expect(wrapper.emitted("open-banana-retouch")).toBeTruthy();
    expect(wrapper.emitted("open-grok-video")).toBeTruthy();
    expect(wrapper.emitted("open-comfyui-inpaint")).toBeTruthy();
    expect(wrapper.emitted("open-novelai-inpaint")).toBeTruthy();
    wrapper.unmount();
  });

  it("every submenu action renders a lucide SVG icon", async () => {
    const wrapper = mount_dialog();
    await nextTick();
    for (const label of ["Banana retouch", "Grok video", "ComfyUI inpaint", "NovelAI inpaint"]) {
      const button = document.querySelector(`button[aria-label="${label}"]`);
      expect(button?.querySelector("svg")).not.toBeNull();
    }
    wrapper.unmount();
  });
});
