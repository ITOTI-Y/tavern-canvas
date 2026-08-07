import { mount } from "@vue/test-utils";
import { DialogContent, DialogPortal, DialogRoot, DialogTitle } from "reka-ui";
import { afterEach, describe, expect, it } from "vitest";
import { defineComponent, h, inject, nextTick } from "vue";

import { PORTAL_TARGET_KEY } from "../contracts/portal_keys.js";
import PortalProvider from "./PortalProvider.vue";

const InjectProbe = defineComponent({
  setup() {
    const target = inject(PORTAL_TARGET_KEY, null);
    return () => h("span", { "data-testid": "probe" }, target?.dataset.shadowRole ?? "none");
  },
});

function make_portal_element(): HTMLElement {
  const element = document.createElement("div");
  element.dataset.shadowRole = "portal";
  document.body.append(element);
  return element;
}

afterEach(() => {
  document.body.innerHTML = "";
});

describe("PortalProvider", () => {
  it("provides the given portal target element to every descendant", () => {
    const target = make_portal_element();
    const wrapper = mount(PortalProvider, {
      props: { portalTarget: target },
      slots: { default: () => h(InjectProbe) },
    });

    expect(wrapper.get('[data-testid="probe"]').text()).toBe("portal");
  });

  it("refuses document.body as the portal target", () => {
    expect(() =>
      mount(PortalProvider, {
        props: { portalTarget: document.body },
        slots: { default: () => h("div") },
      }),
    ).toThrow(/document\.body/u);
  });

  it("renders a real Reka portal (Dialog) inside the provided target, never document.body directly", async () => {
    const target = make_portal_element();
    const host = document.createElement("div");
    document.body.append(host);

    mount(PortalProvider, {
      props: { portalTarget: target },
      slots: {
        default: () =>
          h(DialogRoot, { open: true }, () =>
            h(DialogPortal, { to: target }, () =>
              h(DialogContent, () => [
                h(DialogTitle, () => "Portal proof"),
                h("div", { "data-testid": "portal-content" }, "content"),
              ]),
            ),
          ),
      },
      attachTo: host,
    });
    // Reka's DialogContent mounts through an internal Presence wrapper that resolves over a
    // couple of microtask ticks even with `open` already true on first render.
    await nextTick();
    await nextTick();

    const rendered = target.querySelector('[data-testid="portal-content"]');
    expect(rendered).not.toBeNull();
    expect(rendered?.closest('[data-shadow-role="portal"]')).toBe(target);
    // The dialog content must not be a *direct* child of document.body -- it must land inside the
    // dedicated portal element, matching the "never document.body" contract from task-2-brief.md.
    expect(Array.from(document.body.children)).not.toContain(rendered);
  });
});
