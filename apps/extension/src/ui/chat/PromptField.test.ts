import { flushPromises, mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { createI18n } from "vue-i18n";

import { en_messages } from "../../i18n/locales/en.js";
import type { PromptTranslator } from "../../modules/translation/prompt_translator.js";
import PromptField from "./PromptField.vue";

function mount_field(translator: Partial<PromptTranslator>) {
  const i18n = createI18n({ legacy: false, locale: "en", messages: { en: en_messages } });
  const wrapper = mount(PromptField, {
    props: {
      modelValue: "girl",
      label: "Prompt",
      translator: {
        to_tags: (prompt: string) => Promise.resolve(prompt),
        read_in_chinese: () => Promise.resolve(""),
        suggest: () => Promise.resolve([]),
        prepare: () => Promise.resolve(),
        ...translator,
      },
      "onUpdate:modelValue": (value: string) => wrapper.setProps({ modelValue: value }),
    },
    global: { plugins: [i18n] },
    attachTo: document.body,
  });
  return wrapper;
}

afterEach(() => {
  vi.useRealTimers();
  document.body.innerHTML = "";
});

describe("PromptField", () => {
  it("suggests tags with their Chinese names and completes the one chosen with Tab", async () => {
    vi.useFakeTimers();
    const suggest = vi.fn(() =>
      Promise.resolve([
        { tag: "kisaki (blue archive)", translation: "木崎", popularity: 12_698 },
        { tag: "kisaragi (kancolle)", translation: "如月", popularity: 2_387 },
      ]),
    );
    const wrapper = mount_field({ suggest });
    const textarea = wrapper.get("textarea");

    textarea.element.value = "girl, kisa";
    textarea.element.setSelectionRange(10, 10);
    await textarea.trigger("input");
    await vi.advanceTimersByTimeAsync(200);
    await flushPromises();

    expect(suggest).toHaveBeenCalledWith("kisa");
    expect(wrapper.findAll('[role="option"]').map((option) => option.text())).toEqual([
      "kisaki (blue archive)木崎",
      "kisaragi (kancolle)如月",
    ]);
    await textarea.trigger("keydown", { key: "ArrowDown" });
    await textarea.trigger("keydown", { key: "ArrowDown" });
    await textarea.trigger("keydown", { key: "Tab" });
    await flushPromises();

    expect(wrapper.props("modelValue")).toBe("girl, kisaragi (kancolle), ");
    expect(wrapper.find('[role="listbox"]').exists()).toBe(false);
  });

  it("says the vocabulary is still being prepared instead of suggesting nothing", async () => {
    vi.useFakeTimers();
    const wrapper = mount_field({ suggest: () => Promise.resolve(null) });
    const textarea = wrapper.get("textarea");

    textarea.element.value = "kisa";
    textarea.element.setSelectionRange(4, 4);
    await textarea.trigger("input");
    await vi.advanceTimersByTimeAsync(200);
    await flushPromises();

    expect(wrapper.text()).toContain("The vocabulary takes about a minute to prepare");
  });

  it("shows this field's own Chinese reading while the toggle is on", async () => {
    const read_in_chinese = vi.fn(() => Promise.resolve("女孩"));
    const wrapper = mount_field({ read_in_chinese });

    await wrapper.get('button[aria-label="Read in Chinese"]').trigger("click");
    await flushPromises();
    expect(read_in_chinese).toHaveBeenCalledWith("girl");
    expect(wrapper.text()).toContain("女孩");

    await wrapper.get('button[aria-label="Read in Chinese"]').trigger("click");
    expect(wrapper.text()).not.toContain("女孩");
  });
});
