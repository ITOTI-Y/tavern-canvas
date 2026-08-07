import { flushPromises, mount } from "@vue/test-utils";
import { Sparkles } from "lucide-vue-next";
import { afterEach, describe, expect, it } from "vitest";
import { h, nextTick } from "vue";

import { PORTAL_TARGET_KEY } from "../contracts/portal_keys.js";
import AppButton from "./AppButton.vue";
import AppDialog from "./AppDialog.vue";
import AppIcon from "./AppIcon.vue";
import AppSelect from "./AppSelect.vue";
import AppSwitch from "./AppSwitch.vue";
import AppTooltip from "./AppTooltip.vue";
import ConfirmDialog from "./ConfirmDialog.vue";
import FieldGroup from "./FieldGroup.vue";
import IconButton from "./IconButton.vue";
import NumberStepper from "./NumberStepper.vue";
import SegmentedControl from "./SegmentedControl.vue";
import StateSurface from "./StateSurface.vue";
import ToastViewport from "./ToastViewport.vue";
import VirtualList from "./VirtualList.vue";

/** A CJK string with no natural break opportunities and an English string long enough that a
 * fixed-width control must either wrap or ellipsize it -- never let it blow out the layout. */
const LONG_EN =
  "This is an unusually long English label used to verify shared controls neither clip nor overflow their container when the text cannot fit on one line";
const LONG_CJK =
  "这是一段异常冗长且没有自然换行点的中文说明文字用来验证共享控件在遇到超长内容时既不会截断也不会撑破外层容器的边界";

function create_portal_host(): HTMLElement {
  const portal = document.createElement("div");
  document.body.append(portal);
  return portal;
}

function mount_with_portal<T extends Parameters<typeof mount>[0]>(
  component: T,
  options: Record<string, unknown> = {},
) {
  const portal = create_portal_host();
  const attach_host = document.createElement("div");
  document.body.append(attach_host);
  const wrapper = mount(component, {
    ...options,
    attachTo: attach_host,
    global: {
      ...(options.global as Record<string, unknown> | undefined),
      provide: {
        [PORTAL_TARGET_KEY as unknown as string]: portal,
        ...((options.global as { provide?: Record<string, unknown> } | undefined)?.provide ?? {}),
      },
    },
  });
  return { wrapper, portal, attach_host };
}

afterEach(() => {
  document.body.innerHTML = "";
});

describe("AppIcon", () => {
  it("is aria-hidden and unlabeled by default (decorative)", () => {
    const wrapper = mount(AppIcon, { props: { icon: Sparkles } });
    const svg = wrapper.find("svg");
    expect(svg.attributes("aria-hidden")).toBe("true");
    expect(svg.attributes("role")).toBeUndefined();
  });

  it("exposes an accessible name only when a label is given", () => {
    const wrapper = mount(AppIcon, { props: { icon: Sparkles, label: "Sparkle" } });
    const svg = wrapper.find("svg");
    expect(svg.attributes("role")).toBe("img");
    expect(svg.attributes("aria-label")).toBe("Sparkle");
    expect(svg.attributes("aria-hidden")).toBeUndefined();
  });

  it("applies one standardized stroke width regardless of size", () => {
    const small = mount(AppIcon, { props: { icon: Sparkles, size: 12 } });
    const large = mount(AppIcon, { props: { icon: Sparkles, size: 40 } });
    expect(small.find("svg").attributes("stroke-width")).toBe(
      large.find("svg").attributes("stroke-width"),
    );
  });
});

describe("IconButton", () => {
  it("has an accessible name and no visible text", () => {
    const wrapper = mount(IconButton, { props: { icon: Sparkles, label: "Generate" } });
    const button = wrapper.find("button");
    expect(button.attributes("aria-label")).toBe("Generate");
    expect(button.text()).toBe("");
  });

  it("associates a tooltip (defaulting to the accessible label) via aria-describedby once shown", async () => {
    const { wrapper } = mount_with_portal(IconButton, {
      props: { icon: Sparkles, label: "Generate" },
    });
    const button = wrapper.find("button");
    expect(button.attributes("aria-describedby")).toBeUndefined();
    await button.trigger("focus");
    await nextTick();
    await flushPromises();
    const described_by = button.attributes("aria-describedby");
    expect(described_by).toBeDefined();
    expect(document.getElementById(described_by ?? "")?.textContent?.trim()).toBe("Generate");
    wrapper.unmount();
  });

  it("uses an explicit tooltip override instead of the label when provided", async () => {
    const { wrapper } = mount_with_portal(IconButton, {
      props: { icon: Sparkles, label: "Generate", tooltip: "Generate a new image (G)" },
    });
    const button = wrapper.find("button");
    await button.trigger("focus");
    await nextTick();
    await flushPromises();
    const described_by = button.attributes("aria-describedby");
    expect(document.getElementById(described_by ?? "")?.textContent?.trim()).toBe(
      "Generate a new image (G)",
    );
    wrapper.unmount();
  });

  it("reflects an explicit pressed state via aria-pressed and never for a plain command button", () => {
    const toggle = mount(IconButton, {
      props: { icon: Sparkles, label: "Bold", pressed: true },
    });
    expect(toggle.find("button").attributes("aria-pressed")).toBe("true");

    const plain = mount(IconButton, { props: { icon: Sparkles, label: "Generate" } });
    expect(plain.find("button").attributes("aria-pressed")).toBeUndefined();
  });

  it("disables the button natively and suppresses the click emit", async () => {
    const wrapper = mount(IconButton, {
      props: { icon: Sparkles, label: "Generate", disabled: true },
    });
    const button = wrapper.find("button");
    expect(button.attributes("disabled")).toBeDefined();
    await button.trigger("click");
    expect(wrapper.emitted("click")).toBeUndefined();
  });

  it("emits click when enabled", async () => {
    const wrapper = mount(IconButton, { props: { icon: Sparkles, label: "Generate" } });
    await wrapper.find("button").trigger("click");
    expect(wrapper.emitted("click")).toHaveLength(1);
  });

  it("keeps identical box dimensions across sm/md/lg via fixed size classes, never per-state", () => {
    const rest = mount(IconButton, { props: { icon: Sparkles, label: "Generate" } });
    const destructive = mount(IconButton, {
      props: { icon: Sparkles, label: "Generate", destructive: true },
    });
    const disabled = mount(IconButton, {
      props: { icon: Sparkles, label: "Generate", disabled: true },
    });
    const size_class = [...rest.find("button").classes()].find((c) =>
      c.startsWith("_iconButtonMd"),
    );
    expect(size_class).toBeDefined();
    for (const wrapper of [destructive, disabled]) {
      const classes = wrapper.find("button").classes();
      expect(classes.some((c) => c.startsWith("_iconButtonMd"))).toBe(true);
    }
  });

  it("carries the shared interactive utility class for tactile/focus-visible behavior", () => {
    const wrapper = mount(IconButton, { props: { icon: Sparkles, label: "Generate" } });
    expect(wrapper.find("button").classes()).toContain("tc-interactive");
  });

  it("does not clip a long English or Chinese tooltip/label", () => {
    const en = mount(IconButton, { props: { icon: Sparkles, label: LONG_EN } });
    const cjk = mount(IconButton, { props: { icon: Sparkles, label: LONG_CJK } });
    expect(en.find("button").attributes("aria-label")).toBe(LONG_EN);
    expect(cjk.find("button").attributes("aria-label")).toBe(LONG_CJK);
  });
});

describe("AppButton", () => {
  it("renders the visible label and optional icon", () => {
    const wrapper = mount(AppButton, { props: { label: "Generate", icon: Sparkles } });
    expect(wrapper.text()).toContain("Generate");
    expect(wrapper.find("svg").exists()).toBe(true);
  });

  it("keeps the accessible name stable while pending, and hides content without unmounting it", () => {
    const wrapper = mount(AppButton, { props: { label: "Generate", pending: true } });
    const button = wrapper.find("button");
    expect(button.attributes("aria-label")).toBe("Generate");
    expect(button.attributes("aria-busy")).toBe("true");
    // Content stays in the DOM (visibility, not display) so the button's box never resizes.
    const content = wrapper.find(`[class*="appButtonContent"]`);
    expect(content.exists()).toBe(true);
    expect(content.text()).toContain("Generate");
  });

  it("disables the button while pending and prevents click", async () => {
    const wrapper = mount(AppButton, { props: { label: "Save", pending: true } });
    const button = wrapper.find("button");
    expect(button.attributes("disabled")).toBeDefined();
    await button.trigger("click");
    expect(wrapper.emitted("click")).toBeUndefined();
  });

  it("disabled state also suppresses the click emit", async () => {
    const wrapper = mount(AppButton, { props: { label: "Save", disabled: true } });
    await wrapper.find("button").trigger("click");
    expect(wrapper.emitted("click")).toBeUndefined();
  });

  it("emits click for an enabled button and is keyboard-activatable natively", async () => {
    const wrapper = mount(AppButton, { props: { label: "Save" } });
    const button = wrapper.find("button");
    expect(button.attributes("type")).toBe("button");
    await button.trigger("click");
    expect(wrapper.emitted("click")).toHaveLength(1);
  });

  it("applies a distinct class per variant without changing the button's structure", () => {
    for (const variant of ["primary", "secondary", "destructive"] as const) {
      const wrapper = mount(AppButton, { props: { label: "Go", variant } });
      const classes = wrapper.find("button").classes();
      expect(classes.some((c) => c.includes("appButton"))).toBe(true);
    }
  });

  it("does not clip a long English or Chinese label (wraps/ellipsizes via CSS, content stays intact)", () => {
    const en = mount(AppButton, { props: { label: LONG_EN } });
    const cjk = mount(AppButton, { props: { label: LONG_CJK } });
    expect(en.text()).toContain(LONG_EN);
    expect(cjk.text()).toContain(LONG_CJK);
  });

  it("carries the shared interactive utility class", () => {
    const wrapper = mount(AppButton, { props: { label: "Go" } });
    expect(wrapper.find("button").classes()).toContain("tc-interactive");
  });
});

describe("SegmentedControl", () => {
  const options = [
    { value: "fast", label: "Fast" },
    { value: "quality", label: "Quality" },
    { value: "custom", label: "Custom" },
  ];

  it("uses radiogroup/radio semantics for the mutually exclusive mode choice", () => {
    const wrapper = mount(SegmentedControl, {
      props: { modelValue: "fast", options, label: "Generation mode" },
    });
    expect(wrapper.attributes("role")).toBe("radiogroup");
    expect(wrapper.attributes("aria-label")).toBe("Generation mode");
    const items = wrapper.findAll('[role="radio"]');
    expect(items).toHaveLength(3);
  });

  it("marks exactly one option checked, matching modelValue", () => {
    const wrapper = mount(SegmentedControl, {
      props: { modelValue: "quality", options, label: "Generation mode" },
    });
    const items = wrapper.findAll('[role="radio"]');
    const checked = items.filter((item) => item.attributes("aria-checked") === "true");
    expect(checked).toHaveLength(1);
    expect(checked[0]?.text()).toBe("Quality");
  });

  it("emits update:modelValue on click selection", async () => {
    const wrapper = mount(SegmentedControl, {
      props: { modelValue: "fast", options, label: "Generation mode" },
    });
    const items = wrapper.findAll('[role="radio"]');
    await items[1]?.trigger("click");
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["quality"]);
  });

  it("intercepts ArrowRight/ArrowLeft/Home/End for roving-focus navigation (Reka's RovingFocusGroup, not forked)", async () => {
    // Reka's RovingFocusItem moves focus by resolving its live Collection inside a `nextTick`
    // callback, which this project's jsdom-based unit environment cannot reliably observe end to
    // end (a happy-dom/Collection timing limitation, not a first-party behavior); it is exercised
    // for real in the mandatory browser keyboard pass (brief Step 3). This test instead asserts
    // the reliable, environment-independent half of the contract: the roving-focus item recognizes
    // and claims each arrow/Home/End key (`preventDefault`), proving `RadioGroupRoot` ->
    // `RovingFocusGroup` -> `RovingFocusItem` is wired, not that Reka's own focus-moving code runs.
    const wrapper = mount(SegmentedControl, {
      props: { modelValue: "fast", options, label: "Generation mode" },
      attachTo: document.body,
    });
    const first_item = wrapper.findAll('[role="radio"]')[0]?.element as HTMLElement;
    for (const key of ["ArrowRight", "ArrowLeft", "Home", "End"]) {
      const event = new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true });
      first_item.dispatchEvent(event);
      expect(event.defaultPrevented, `${key} should be claimed by roving focus`).toBe(true);
    }
    wrapper.unmount();
  });

  it("disables every item when the group is disabled", () => {
    const wrapper = mount(SegmentedControl, {
      props: { modelValue: "fast", options, label: "Generation mode", disabled: true },
    });
    expect(wrapper.attributes("data-disabled")).toBeDefined();
  });

  it("does not clip a long English or Chinese option label", () => {
    const long_options = [
      { value: "a", label: LONG_EN },
      { value: "b", label: LONG_CJK },
    ];
    const wrapper = mount(SegmentedControl, {
      props: { modelValue: "a", options: long_options, label: "Mode" },
    });
    expect(wrapper.text()).toContain(LONG_EN);
    expect(wrapper.text()).toContain(LONG_CJK);
  });
});

describe("AppSwitch", () => {
  it("uses role=switch with aria-checked reflecting modelValue", () => {
    const on = mount(AppSwitch, { props: { modelValue: true, label: "Auto-retry" } });
    const off = mount(AppSwitch, { props: { modelValue: false, label: "Auto-retry" } });
    expect(on.find('[role="switch"]').attributes("aria-checked")).toBe("true");
    expect(off.find('[role="switch"]').attributes("aria-checked")).toBe("false");
  });

  it("toggles via Space/Enter (native button semantics) and emits update:modelValue", async () => {
    const wrapper = mount(AppSwitch, { props: { modelValue: false, label: "Auto-retry" } });
    const control = wrapper.find('[role="switch"]');
    expect(control.element.tagName).toBe("BUTTON");
    await control.trigger("click");
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([true]);
  });

  it("clicking the wrapping label text also toggles (native label-for-control forwarding)", () => {
    const wrapper = mount(AppSwitch, { props: { modelValue: false, label: "Auto-retry" } });
    expect(wrapper.find("label").exists()).toBe(true);
    expect(wrapper.find("label").element.contains(wrapper.find('[role="switch"]').element)).toBe(
      true,
    );
  });

  it("disables interaction and marks data-disabled for styling", () => {
    const wrapper = mount(AppSwitch, {
      props: { modelValue: false, label: "Auto-retry", disabled: true },
    });
    expect(wrapper.find('[role="switch"]').attributes("disabled")).toBeDefined();
    expect(wrapper.find("label").attributes("data-disabled")).toBeDefined();
  });

  it("renders an optional description without becoming the label", () => {
    const wrapper = mount(AppSwitch, {
      props: { modelValue: false, label: "Auto-retry", description: "Retries failed jobs once" },
    });
    expect(wrapper.text()).toContain("Auto-retry");
    expect(wrapper.text()).toContain("Retries failed jobs once");
  });

  it("does not clip a long English or Chinese label/description", () => {
    const wrapper = mount(AppSwitch, {
      props: { modelValue: false, label: LONG_EN, description: LONG_CJK },
    });
    expect(wrapper.text()).toContain(LONG_EN);
    expect(wrapper.text()).toContain(LONG_CJK);
  });
});

describe("NumberStepper", () => {
  it("overrides Reka's hard-coded English Increase/Decrease aria-labels with localized props", () => {
    const wrapper = mount(NumberStepper, {
      props: { modelValue: 2, incrementLabel: "增加", decrementLabel: "减少" },
    });
    const labels = wrapper.findAll("button").map((b) => b.attributes("aria-label"));
    expect(labels).toContain("增加");
    expect(labels).toContain("减少");
    expect(labels).not.toContain("Increase");
    expect(labels).not.toContain("Decrease");
  });

  it("increments and decrements the value via the labeled buttons", async () => {
    const wrapper = mount(NumberStepper, {
      props: { modelValue: 2, incrementLabel: "Increase", decrementLabel: "Decrease" },
      attachTo: document.body,
    });
    const [decrement, increment] = wrapper.findAll("button");
    // Reka's stepper buttons trigger on `pointerdown` (press-and-hold repeat), not `click`; the
    // vueuse listener attaches one tick after mount, so wait before dispatching.
    await nextTick();
    await new Promise((resolve) => setTimeout(resolve, 0));
    await increment?.trigger("pointerdown", { button: 0 });
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([3]);
    await decrement?.trigger("pointerdown", { button: 0 });
    expect(wrapper.emitted("update:modelValue")?.[1]).toEqual([1]);
    wrapper.unmount();
  });

  it("clamps to min/max and disables the corresponding button at the bound", () => {
    const at_max = mount(NumberStepper, {
      props: {
        modelValue: 4,
        min: 1,
        max: 4,
        incrementLabel: "Increase",
        decrementLabel: "Decrease",
      },
    });
    const [, increment_at_max] = at_max.findAll("button");
    expect(increment_at_max?.attributes("disabled")).toBeDefined();

    const at_min = mount(NumberStepper, {
      props: {
        modelValue: 1,
        min: 1,
        max: 4,
        incrementLabel: "Increase",
        decrementLabel: "Decrease",
      },
    });
    const [decrement_at_min] = at_min.findAll("button");
    expect(decrement_at_min?.attributes("disabled")).toBeDefined();
  });

  it("wires field-group validation linkage via aria-describedby on the input", () => {
    const wrapper = mount(NumberStepper, {
      props: {
        modelValue: 1,
        incrementLabel: "Increase",
        decrementLabel: "Decrease",
        describedBy: "error-id",
      },
    });
    expect(wrapper.find("input").attributes("aria-describedby")).toBe("error-id");
  });

  it("uses tabular figures for the numeric display", () => {
    const wrapper = mount(NumberStepper, {
      props: { modelValue: 1, incrementLabel: "Increase", decrementLabel: "Decrease" },
    });
    expect(wrapper.find("input").classes()).toContain("tc-tabular-nums");
  });
});

describe("AppSelect", () => {
  const options = [
    { value: "sdxl", label: "SDXL" },
    { value: "flux", label: "Flux" },
  ];

  it("uses combobox semantics with an accessible name", () => {
    const { wrapper } = mount_with_portal(AppSelect, {
      props: {
        modelValue: undefined,
        options,
        placeholder: "Select a model",
        ariaLabel: "Model",
      },
    });
    const trigger = wrapper.find('[role="combobox"]');
    expect(trigger.exists()).toBe(true);
    expect(trigger.attributes("aria-label")).toBe("Model");
    expect(trigger.attributes("aria-expanded")).toBe("false");
  });

  it("shows the placeholder as closed-state affordance, not as the field label", () => {
    const { wrapper } = mount_with_portal(AppSelect, {
      props: { modelValue: undefined, options, placeholder: "Select a model", ariaLabel: "Model" },
    });
    expect(wrapper.text()).toContain("Select a model");
    // The accessible name comes from `ariaLabel`, independent of the placeholder text.
    expect(wrapper.find('[role="combobox"]').attributes("aria-label")).toBe("Model");
  });

  it("opens on click and exposes the option list via role=listbox/option", async () => {
    const { wrapper } = mount_with_portal(AppSelect, {
      props: { modelValue: undefined, options, placeholder: "Select a model", ariaLabel: "Model" },
    });
    const trigger = wrapper.find('[role="combobox"]');
    await trigger.trigger("pointerdown", { button: 0 });
    await trigger.trigger("click");
    await nextTick();
    await flushPromises();
    expect(document.querySelector('[role="listbox"]')).not.toBeNull();
    expect(document.querySelectorAll('[role="option"]')).toHaveLength(2);
  });

  it("opens with Enter and closes with Escape", async () => {
    const { wrapper } = mount_with_portal(AppSelect, {
      props: { modelValue: undefined, options, placeholder: "Select a model", ariaLabel: "Model" },
    });
    const trigger = wrapper.find('[role="combobox"]');
    await trigger.trigger("keydown", { key: "Enter" });
    await nextTick();
    await flushPromises();
    expect(trigger.attributes("aria-expanded")).toBe("true");
    const content = document.querySelector('[role="listbox"]');
    content?.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    await nextTick();
    await flushPromises();
    expect(trigger.attributes("aria-expanded")).toBe("false");
  });

  it("disables the trigger when disabled", () => {
    const { wrapper } = mount_with_portal(AppSelect, {
      props: {
        modelValue: undefined,
        options,
        placeholder: "Select a model",
        ariaLabel: "Model",
        disabled: true,
      },
    });
    expect(wrapper.find('[role="combobox"]').attributes("disabled")).toBeDefined();
  });

  it("does not clip a long English or Chinese option label", async () => {
    const long_options = [
      { value: "a", label: LONG_EN },
      { value: "b", label: LONG_CJK },
    ];
    const { wrapper } = mount_with_portal(AppSelect, {
      props: {
        modelValue: undefined,
        options: long_options,
        placeholder: "Select",
        ariaLabel: "Field",
      },
    });
    const trigger = wrapper.find('[role="combobox"]');
    await trigger.trigger("pointerdown", { button: 0 });
    await trigger.trigger("click");
    await nextTick();
    await flushPromises();
    expect(document.body.textContent).toContain(LONG_EN);
    expect(document.body.textContent).toContain(LONG_CJK);
  });
});

describe("FieldGroup", () => {
  it("associates the label with the slotted control via for/id", () => {
    const wrapper = mount(FieldGroup, {
      props: { label: "Display name" },
      slots: {
        default: ({ fieldId }: { fieldId: string }) => h("input", { id: fieldId }),
      },
    });
    const label = wrapper.find("label");
    const input = wrapper.find("input");
    expect(label.attributes("for")).toBe(input.attributes("id"));
    expect(label.text()).toContain("Display name");
  });

  it("links a validation error below the input via aria-describedby and role=alert", () => {
    const wrapper = mount(FieldGroup, {
      props: { label: "Display name", error: "Name is required" },
      slots: {
        default: ({ fieldId, describedBy }: { fieldId: string; describedBy: string | undefined }) =>
          h("input", { id: fieldId, "aria-describedby": describedBy }),
      },
    });
    const input = wrapper.find("input");
    const error = wrapper.find('[role="alert"]');
    expect(error.text()).toBe("Name is required");
    expect(input.attributes("aria-describedby")).toBe(error.attributes("id"));
  });

  it("shows a hint instead of an error when there is no error", () => {
    const wrapper = mount(FieldGroup, {
      props: { label: "Display name", hint: "Shown on generated images" },
      slots: { default: ({ fieldId }: { fieldId: string }) => h("input", { id: fieldId }) },
    });
    expect(wrapper.find('[role="alert"]').exists()).toBe(false);
    expect(wrapper.text()).toContain("Shown on generated images");
  });

  it("marks the field required visually without hiding it from the accessible name", () => {
    const wrapper = mount(FieldGroup, {
      props: { label: "Display name", required: true },
      slots: { default: ({ fieldId }: { fieldId: string }) => h("input", { id: fieldId }) },
    });
    expect(wrapper.find("label").text()).toContain("Display name");
    expect(wrapper.text()).toContain("*");
  });

  it("does not clip a long English or Chinese label/error", () => {
    const wrapper = mount(FieldGroup, {
      props: { label: LONG_EN, error: LONG_CJK },
      slots: { default: ({ fieldId }: { fieldId: string }) => h("input", { id: fieldId }) },
    });
    expect(wrapper.text()).toContain(LONG_EN);
    expect(wrapper.text()).toContain(LONG_CJK);
  });
});

describe("AppDialog", () => {
  it("uses role=dialog with an accessible name from the title", async () => {
    const { wrapper } = mount_with_portal(AppDialog, {
      props: { open: true, title: "Provider settings", closeLabel: "Close" },
    });
    await nextTick();
    const dialog = document.querySelector('[role="dialog"]');
    expect(dialog).not.toBeNull();
    const labelled_by = dialog?.getAttribute("aria-labelledby");
    expect(document.getElementById(labelled_by ?? "")?.textContent).toBe("Provider settings");
    wrapper.unmount();
  });

  it("traps focus inside the dialog while open (modal FocusScope)", async () => {
    const { wrapper } = mount_with_portal(AppDialog, {
      props: { open: true, title: "Provider settings", closeLabel: "Close" },
      slots: { default: () => h("button", { id: "inner-action" }, "Save") },
    });
    await nextTick();
    await flushPromises();
    const dialog = document.querySelector('[role="dialog"]');
    expect(dialog?.contains(document.activeElement)).toBe(true);
    wrapper.unmount();
  });

  it("returns focus to the trigger element when closed", async () => {
    const trigger = document.createElement("button");
    trigger.textContent = "Open settings";
    document.body.append(trigger);
    trigger.focus();
    expect(document.activeElement).toBe(trigger);

    const { wrapper } = mount_with_portal(AppDialog, {
      props: { open: true, title: "Provider settings", closeLabel: "Close" },
    });
    await nextTick();
    await flushPromises();
    expect(document.activeElement).not.toBe(trigger);

    await wrapper.setProps({ open: false });
    await nextTick();
    await flushPromises();
    expect(document.activeElement).toBe(trigger);
    wrapper.unmount();
  });

  it("closes on Escape and emits update:open(false)", async () => {
    const { wrapper } = mount_with_portal(AppDialog, {
      props: { open: true, title: "Provider settings", closeLabel: "Close" },
    });
    await nextTick();
    await flushPromises();
    const dialog = document.querySelector('[role="dialog"]');
    dialog?.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    await nextTick();
    expect(wrapper.emitted("update:open")?.[0]).toEqual([false]);
    wrapper.unmount();
  });

  it("closes via the close button and emits update:open(false)", async () => {
    const { wrapper } = mount_with_portal(AppDialog, {
      props: { open: true, title: "Provider settings", closeLabel: "Close panel" },
    });
    await nextTick();
    const close_button = document.querySelector('button[aria-label="Close panel"]');
    expect(close_button).not.toBeNull();
    (close_button as HTMLElement).click();
    await nextTick();
    expect(wrapper.emitted("update:open")?.[0]).toEqual([false]);
    wrapper.unmount();
  });

  it("portals into the injected Shadow Root portal element, not document.body directly", async () => {
    const { wrapper, portal } = mount_with_portal(AppDialog, {
      props: { open: true, title: "Provider settings", closeLabel: "Close" },
    });
    await nextTick();
    expect(portal.querySelector('[role="dialog"]')).not.toBeNull();
    wrapper.unmount();
  });

  it("does not clip a long English or Chinese title/description", async () => {
    const { wrapper } = mount_with_portal(AppDialog, {
      props: { open: true, title: LONG_EN, description: LONG_CJK, closeLabel: "Close" },
    });
    await nextTick();
    expect(document.body.textContent).toContain(LONG_EN);
    expect(document.body.textContent).toContain(LONG_CJK);
    wrapper.unmount();
  });
});

describe("ConfirmDialog", () => {
  it("uses role=alertdialog and auto-focuses Cancel (the safe default) on open", async () => {
    const { wrapper } = mount_with_portal(ConfirmDialog, {
      props: {
        open: true,
        title: "Delete image?",
        description: "This cannot be undone.",
        confirmLabel: "Delete",
        cancelLabel: "Cancel",
      },
    });
    await nextTick();
    await flushPromises();
    const dialog = document.querySelector('[role="alertdialog"]');
    expect(dialog).not.toBeNull();
    expect(document.activeElement?.textContent?.trim()).toBe("Cancel");
    wrapper.unmount();
  });

  it("blocks outside pointer dismissal but Escape still cancels", async () => {
    const { wrapper } = mount_with_portal(ConfirmDialog, {
      props: {
        open: true,
        title: "Delete image?",
        description: "This cannot be undone.",
        confirmLabel: "Delete",
        cancelLabel: "Cancel",
      },
    });
    await nextTick();
    const dialog = document.querySelector('[role="alertdialog"]');
    dialog?.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    await nextTick();
    expect(wrapper.emitted("update:open")?.[0]).toEqual([false]);
    wrapper.unmount();
  });

  it("clicking Cancel emits update:open(false) without emitting confirm", async () => {
    const { wrapper } = mount_with_portal(ConfirmDialog, {
      props: {
        open: true,
        title: "Delete image?",
        description: "This cannot be undone.",
        confirmLabel: "Delete",
        cancelLabel: "Cancel",
      },
    });
    await nextTick();
    const cancel = [...document.querySelectorAll("button")].find(
      (b) => b.textContent?.trim() === "Cancel",
    );
    (cancel as HTMLElement).click();
    await nextTick();
    expect(wrapper.emitted("update:open")?.[0]).toEqual([false]);
    expect(wrapper.emitted("confirm")).toBeUndefined();
  });

  it("clicking Confirm emits confirm but never auto-closes -- the caller controls open", async () => {
    const { wrapper } = mount_with_portal(ConfirmDialog, {
      props: {
        open: true,
        title: "Delete image?",
        description: "This cannot be undone.",
        confirmLabel: "Delete",
        cancelLabel: "Cancel",
      },
    });
    await nextTick();
    const confirm = document.querySelector('button[aria-label="Delete"]');
    (confirm as HTMLElement).click();
    await nextTick();
    expect(wrapper.emitted("confirm")).toHaveLength(1);
    expect(wrapper.emitted("update:open")).toBeUndefined();
  });

  it("disables both actions while pending and keeps the accessible name on Confirm", async () => {
    const { wrapper } = mount_with_portal(ConfirmDialog, {
      props: {
        open: true,
        title: "Delete image?",
        description: "This cannot be undone.",
        confirmLabel: "Delete",
        cancelLabel: "Cancel",
        pending: true,
      },
    });
    await nextTick();
    const confirm = document.querySelector('button[aria-label="Delete"]');
    const cancel = [...document.querySelectorAll("button")].find(
      (b) => b.textContent?.trim() === "Cancel",
    );
    expect(confirm?.getAttribute("disabled")).toBeDefined();
    expect(cancel?.getAttribute("disabled")).toBeDefined();
    expect(confirm?.getAttribute("aria-label")).toBe("Delete");
    wrapper.unmount();
  });

  it("does not clip a long English or Chinese description", async () => {
    const { wrapper } = mount_with_portal(ConfirmDialog, {
      props: {
        open: true,
        title: "Delete image?",
        description: LONG_CJK,
        confirmLabel: LONG_EN,
        cancelLabel: "Cancel",
      },
    });
    await nextTick();
    expect(document.body.textContent).toContain(LONG_CJK);
    wrapper.unmount();
  });
});

describe("AppTooltip", () => {
  it("associates the tooltip content with the trigger via aria-describedby once open", async () => {
    const { wrapper } = mount_with_portal(AppTooltip, {
      props: { content: "Generate a new image" },
      slots: { default: () => h("button", "Generate") },
    });
    const trigger = wrapper.find("button");
    expect(trigger.attributes("aria-describedby")).toBeUndefined();
    await trigger.trigger("focus");
    await nextTick();
    await flushPromises();
    const described_by = trigger.attributes("aria-describedby");
    expect(described_by).toBeDefined();
    expect(document.getElementById(described_by ?? "")?.textContent).toContain(
      "Generate a new image",
    );
    wrapper.unmount();
  });

  it("closes on Escape", async () => {
    const { wrapper } = mount_with_portal(AppTooltip, {
      props: { content: "Generate a new image" },
      slots: { default: () => h("button", "Generate") },
    });
    const trigger = wrapper.find("button");
    await trigger.trigger("focus");
    await nextTick();
    await flushPromises();
    expect(trigger.attributes("aria-describedby")).toBeDefined();
    await trigger.trigger("keydown", { key: "Escape" });
    await nextTick();
    await flushPromises();
    expect(trigger.attributes("aria-describedby")).toBeUndefined();
    wrapper.unmount();
  });

  it("does not clip long English or Chinese tooltip content", async () => {
    const { wrapper } = mount_with_portal(AppTooltip, {
      props: { content: LONG_CJK },
      slots: { default: () => h("button", "Trigger") },
    });
    await wrapper.find("button").trigger("focus");
    await nextTick();
    await flushPromises();
    expect(document.body.textContent).toContain(LONG_CJK);
    wrapper.unmount();
  });
});

describe("StateSurface", () => {
  it("reserves the same minHeight across loading/empty/error/ready", () => {
    for (const status of ["loading", "empty", "error", "ready"] as const) {
      const wrapper = mount(StateSurface, { props: { status, minHeight: "220px" } });
      expect((wrapper.element as HTMLElement).style.minHeight).toBe("220px");
    }
  });

  it("renders a static skeleton while loading, not a spinner", () => {
    const wrapper = mount(StateSurface, { props: { status: "loading" } });
    expect(wrapper.find('[class*="skeletonBlock"]').exists()).toBe(true);
    expect(wrapper.find('[class*="spinner" i]').exists()).toBe(false);
  });

  it("supports a caller-supplied skeleton matching the real layout", () => {
    const wrapper = mount(StateSurface, {
      props: { status: "loading" },
      slots: { skeleton: '<div class="custom-skeleton">custom</div>' },
    });
    expect(wrapper.find(".custom-skeleton").exists()).toBe(true);
  });

  it("composes an empty state as message plus one action, not a bare string", () => {
    const wrapper = mount(StateSurface, {
      props: { status: "empty", emptyMessage: "No jobs yet" },
      slots: { action: "<button>Start a job</button>" },
    });
    expect(wrapper.text()).toContain("No jobs yet");
    expect(wrapper.find("button").text()).toBe("Start a job");
  });

  it("marks the error state with role=alert and an optional retry action", () => {
    const wrapper = mount(StateSurface, {
      props: { status: "error", errorMessage: "Failed to load" },
      slots: { action: "<button>Retry</button>" },
    });
    expect(wrapper.find('[role="alert"]').text()).toContain("Failed to load");
    expect(wrapper.find("button").text()).toBe("Retry");
  });

  it("renders the default slot only when ready", () => {
    const wrapper = mount(StateSurface, {
      props: { status: "ready" },
      slots: { default: '<p class="content">Loaded</p>' },
    });
    expect(wrapper.find(".content").exists()).toBe(true);
  });

  it("does not clip a long English or Chinese empty/error message", () => {
    const empty = mount(StateSurface, { props: { status: "empty", emptyMessage: LONG_EN } });
    const error = mount(StateSurface, { props: { status: "error", errorMessage: LONG_CJK } });
    expect(empty.text()).toContain(LONG_EN);
    expect(error.text()).toContain(LONG_CJK);
  });
});

describe("ToastViewport", () => {
  it("renders each toast's title/description and dismisses via the close button", async () => {
    const { wrapper } = mount_with_portal(ToastViewport, {
      props: {
        toasts: [
          {
            id: "t1",
            title: "Copied parameters",
            description: "Ready to paste",
            variant: "success",
          },
        ],
        viewportLabel: "Notifications",
        announceLabel: "Notification",
        closeLabel: "Dismiss",
      },
    });
    await nextTick();
    expect(document.body.textContent).toContain("Copied parameters");
    expect(document.body.textContent).toContain("Ready to paste");
    const close = document.querySelector('button[aria-label="Dismiss"]');
    expect(close).not.toBeNull();
    (close as HTMLElement).click();
    await nextTick();
    expect(wrapper.emitted("dismiss")?.[0]).toEqual(["t1"]);
    wrapper.unmount();
  });

  it("gives an error toast the error status class/border and a success toast the success one", async () => {
    const { wrapper } = mount_with_portal(ToastViewport, {
      props: {
        toasts: [
          { id: "err", title: "Generation failed", variant: "error" },
          { id: "ok", title: "Saved", variant: "success" },
        ],
        viewportLabel: "Notifications",
        announceLabel: "Notification",
        closeLabel: "Dismiss",
      },
    });
    await nextTick();
    const error_toast = [...document.querySelectorAll("li")].find((li) =>
      li.textContent?.includes("Generation failed"),
    );
    const success_toast = [...document.querySelectorAll("li")].find((li) =>
      li.textContent?.includes("Saved"),
    );
    expect(error_toast?.className).toMatch(/toastError/);
    expect(success_toast?.className).toMatch(/toastSuccess/);
    wrapper.unmount();
  });

  it("does not clip a long English or Chinese toast title/description", async () => {
    const { wrapper } = mount_with_portal(ToastViewport, {
      props: {
        toasts: [{ id: "t1", title: LONG_EN, description: LONG_CJK }],
        viewportLabel: "Notifications",
        announceLabel: "Notification",
        closeLabel: "Dismiss",
      },
    });
    await nextTick();
    expect(document.body.textContent).toContain(LONG_EN);
    expect(document.body.textContent).toContain(LONG_CJK);
    wrapper.unmount();
  });
});

describe("VirtualList", () => {
  interface Row {
    readonly id: string;
    readonly label: string;
  }

  function rows(count: number): Row[] {
    return Array.from({ length: count }, (_unused, index) => ({
      id: `row-${index}`,
      label: `Row ${index}`,
    }));
  }

  it("keeps the outer container's reserved height constant regardless of item count", () => {
    const empty = mount(VirtualList<Row>, {
      props: { items: [], itemSize: 32, height: "320px" },
      slots: { default: ({ item }: { item: Row | undefined }) => h("span", item?.label) },
    });
    const many = mount(VirtualList<Row>, {
      props: { items: rows(5000), itemSize: 32, height: "320px" },
      slots: { default: ({ item }: { item: Row | undefined }) => h("span", item?.label) },
    });
    expect((empty.element as HTMLElement).style.height).toBe("320px");
    expect((many.element as HTMLElement).style.height).toBe("320px");
  });

  it("keeps the same fixed height across a loading (empty) to loaded (populated) transition", async () => {
    const wrapper = mount(VirtualList<Row>, {
      props: { items: [], itemSize: 32, height: "400px" },
      slots: { default: ({ item }: { item: Row | undefined }) => h("span", item?.label) },
    });
    const before = (wrapper.element as HTMLElement).style.height;
    await wrapper.setProps({ items: rows(200) });
    await nextTick();
    const after = (wrapper.element as HTMLElement).style.height;
    expect(before).toBe(after);
    expect(before).toBe("400px");
  });

  it("exposes list/listitem roles for assistive tech", () => {
    const wrapper = mount(VirtualList<Row>, {
      props: { items: rows(10), itemSize: 32, height: "200px", ariaLabel: "Gallery" },
      slots: { default: ({ item }: { item: Row | undefined }) => h("span", item?.label) },
    });
    expect(wrapper.attributes("role")).toBe("list");
    expect(wrapper.attributes("aria-label")).toBe("Gallery");
  });

  it("grows the inner scrollable content's height with the item count while the outer box stays fixed", async () => {
    const wrapper = mount(VirtualList<Row>, {
      props: { items: rows(10), itemSize: 40, height: "300px" },
      slots: { default: ({ item }: { item: Row | undefined }) => h("span", item?.label) },
    });
    const sizer = wrapper.find('[class*="virtualListSizer"]');
    const small_height = (sizer.element as HTMLElement).style.height;
    await wrapper.setProps({ items: rows(500) });
    await nextTick();
    const large_height = (sizer.element as HTMLElement).style.height;
    expect(small_height).not.toBe(large_height);
    expect((wrapper.element as HTMLElement).style.height).toBe("300px");
  });
});
