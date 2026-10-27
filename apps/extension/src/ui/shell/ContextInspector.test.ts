import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";
import { createI18n } from "vue-i18n";

import { en_messages } from "../../i18n/locales/en.js";
import type { InspectorSelection } from "../contracts/view_models.js";
import ContextInspector from "./ContextInspector.vue";

function mount_inspector(selection: InspectorSelection | null) {
  const i18n = createI18n({
    legacy: false,
    locale: "en",
    fallbackLocale: "en",
    messages: { en: en_messages },
  });
  return mount(ContextInspector, {
    props: { width: 320, selection },
    global: { plugins: [i18n] },
  });
}

afterEach(() => {
  document.body.innerHTML = "";
});

describe("ContextInspector: renders selected_record", () => {
  it("renders the empty state when nothing is selected", () => {
    const wrapper = mount_inspector(null);
    expect(wrapper.text()).toContain("Nothing selected");
  });

  it("renders a gallery_record selection", () => {
    const wrapper = mount_inspector({
      kind: "gallery_record",
      record_id: "33333333-3333-4333-8333-333333333333",
    });
    expect(wrapper.text()).toContain("Gallery image");
    expect(wrapper.text()).toContain("33333333-3333-4333-8333-333333333333");
    expect(wrapper.text()).not.toContain("Action");
  });
});
