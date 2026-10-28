import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";
import { createI18n } from "vue-i18n";

import { en_messages } from "../../../i18n/locales/en.js";
import { PORTAL_TARGET_KEY } from "../../contracts/portal_keys.js";
import AppSelect from "../../components/AppSelect.vue";
import NumberStepper from "../../components/NumberStepper.vue";
import ImageSizeField from "./ImageSizeField.vue";

function mount_field() {
  const portal_target = document.createElement("div");
  document.body.append(portal_target);
  return mount(ImageSizeField, {
    props: { modelValue: { width: 832, height: 1216 } },
    global: {
      plugins: [createI18n({ legacy: false, locale: "en", messages: { en: en_messages } })],
      provide: { [PORTAL_TARGET_KEY as symbol]: portal_target },
    },
    attachTo: document.body,
  });
}

afterEach(() => {
  document.body.innerHTML = "";
});

describe("ImageSizeField", () => {
  it("names the standard canvas the size matches", () => {
    const select = mount_field().getComponent(AppSelect);
    expect(select.props("modelValue")).toBe("portrait");
    expect(select.props("options")[0]).toEqual({ value: "portrait", label: "Portrait 832 × 1216" });
  });

  it("changes one side freely, and both once the ratio is locked", async () => {
    const wrapper = mount_field();
    const set_width = (value: number) =>
      wrapper.findAllComponents(NumberStepper)[0]?.vm.$emit("update:modelValue", value);

    set_width(896);
    expect(wrapper.emitted("update:modelValue")?.at(-1)).toEqual([{ width: 896, height: 1216 }]);

    await wrapper.get('button[aria-label="Lock the aspect ratio"]').trigger("click");
    set_width(1024);
    expect(wrapper.emitted("update:modelValue")?.at(-1)).toEqual([{ width: 1024, height: 1472 }]);
  });
});
