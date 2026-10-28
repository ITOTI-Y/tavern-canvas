import { flushPromises, mount } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";
import { createI18n } from "vue-i18n";

import { en_messages } from "../../i18n/locales/en.js";
import { PORTAL_TARGET_KEY } from "../contracts/portal_keys.js";
import ZoomableImage from "./ZoomableImage.vue";

afterEach(() => {
  document.body.innerHTML = "";
});

describe("ZoomableImage", () => {
  it("enlarges the picture in the portal and closes again", async () => {
    const portal_target = document.createElement("div");
    document.body.append(portal_target);
    const wrapper = mount(ZoomableImage, {
      props: { src: "data:image/png;base64,AAAA", alt: "Reference" },
      global: {
        plugins: [createI18n({ legacy: false, locale: "en", messages: { en: en_messages } })],
        provide: { [PORTAL_TARGET_KEY as symbol]: portal_target },
      },
      attachTo: document.body,
    });

    await wrapper.get('button[aria-label="Enlarge: Reference"]').trigger("click");
    await flushPromises();
    expect(portal_target.querySelector('[role="dialog"] img')?.getAttribute("src")).toBe(
      "data:image/png;base64,AAAA",
    );

    portal_target.querySelector<HTMLButtonElement>('button[aria-label="Close"]')?.click();
    await flushPromises();
    expect(portal_target.querySelector('[role="dialog"]')).toBeNull();
  });
});
