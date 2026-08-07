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

/**
 * ContextInspector previously ignored `selected_record` entirely and always rendered the empty
 * state (Stage 06 gap, carried over to Task 3). These tests prove it now renders
 * `InspectorViewModel.selected_record` for every `InspectorSelection` variant.
 */
describe("ContextInspector: renders selected_record", () => {
  it("renders the empty state when nothing is selected", () => {
    const wrapper = mount_inspector(null);
    expect(wrapper.text()).toContain("Nothing selected");
  });

  it("renders a generation_job selection", () => {
    const wrapper = mount_inspector({
      kind: "generation_job",
      job_id: "22222222-2222-4222-8222-222222222222",
    });
    expect(wrapper.text()).toContain("Generation job");
    expect(wrapper.text()).toContain("22222222-2222-4222-8222-222222222222");
    expect(wrapper.text()).not.toContain("Nothing selected");
  });

  it("renders a gallery_record selection with no intent as a plain view (no action row)", () => {
    const wrapper = mount_inspector({
      kind: "gallery_record",
      record_id: "33333333-3333-4333-8333-333333333333",
    });
    expect(wrapper.text()).toContain("Gallery image");
    expect(wrapper.text()).toContain("33333333-3333-4333-8333-333333333333");
    expect(wrapper.text()).not.toContain("Action");
  });

  it.each([
    ["modify_prompt", "Modify prompt"],
    ["regenerate", "Regenerate"],
    ["edit", "Edit"],
    ["inpaint", "Inpaint"],
  ] as const)("renders the %s intent as an action row", (intent, expected_label) => {
    const wrapper = mount_inspector({
      kind: "gallery_record",
      record_id: "33333333-3333-4333-8333-333333333333",
      intent,
    });
    expect(wrapper.text()).toContain("Action");
    expect(wrapper.text()).toContain(expected_label);
  });

  it("renders an asset selection", () => {
    const wrapper = mount_inspector({
      kind: "asset",
      category: "lora",
      asset_id: "44444444-4444-4444-8444-444444444444",
    });
    expect(wrapper.text()).toContain("Asset");
    expect(wrapper.text()).toContain("44444444-4444-4444-8444-444444444444");
  });
});
