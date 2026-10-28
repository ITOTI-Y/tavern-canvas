import { flushPromises, mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { createI18n } from "vue-i18n";

import { en_messages } from "../../i18n/locales/en.js";
import type { PromptTranslator } from "../../modules/translation/prompt_translator.js";
import { PORTAL_TARGET_KEY, TAG_SUGGESTIONS_KEY } from "../contracts/portal_keys.js";
import TagInput from "./TagInput.vue";

type TagSuggestionSource = Pick<PromptTranslator, "suggest">;

function mount_tag_input(
  model_value: string,
  suggest = vi.fn<TagSuggestionSource["suggest"]>(() => Promise.resolve([])),
) {
  const portal_target = document.createElement("div");
  document.body.append(portal_target);
  const wrapper = mount(TagInput, {
    props: { modelValue: model_value },
    global: {
      plugins: [createI18n({ legacy: false, locale: "en", messages: { en: en_messages } })],
      provide: {
        [PORTAL_TARGET_KEY as symbol]: portal_target,
        [TAG_SUGGESTIONS_KEY as symbol]: { suggest },
      },
    },
    attachTo: document.body,
  });
  return { wrapper, portal_target, suggest };
}

afterEach(() => {
  document.body.innerHTML = "";
  vi.useRealTimers();
});

describe("TagInput", () => {
  it("turns typed text before a comma into tags and keeps the rest as the draft", async () => {
    const { wrapper } = mount_tag_input("red eyes");
    const input = wrapper.get("input");

    await input.setValue("long hair, silver hair, blu");

    expect(wrapper.emitted("update:modelValue")?.at(-1)).toEqual([
      "red eyes, long hair, silver hair",
    ]);
    expect((input.element as HTMLInputElement).value).toBe("blu");
  });

  it("removes a tag from its chip and the last tag on Backspace in an empty draft", async () => {
    const { wrapper } = mount_tag_input("long hair, red eyes");

    await wrapper.get('button[aria-label="Remove long hair"]').trigger("click");
    expect(wrapper.emitted("update:modelValue")?.at(-1)).toEqual(["red eyes"]);

    await wrapper.get("input").trigger("keydown", { key: "Backspace" });
    expect(wrapper.emitted("update:modelValue")?.at(-1)).toEqual(["long hair"]);
  });

  it("looks up a Chinese query and adds the highlighted English tag on Enter without submitting", async () => {
    vi.useFakeTimers();
    const suggest = vi.fn<TagSuggestionSource["suggest"]>(() =>
      Promise.resolve([
        { tag: "blue eyes", translation: "蓝色眼睛", popularity: 1_284_000 },
        { tag: "blue hair", translation: "蓝发", popularity: 417_000 },
      ]),
    );
    const { wrapper, portal_target } = mount_tag_input("", suggest);
    const input = wrapper.get("input");

    await input.setValue("蓝");
    await vi.advanceTimersByTimeAsync(200);
    await flushPromises();

    expect(suggest).toHaveBeenCalledWith("蓝");
    expect(portal_target.querySelectorAll('[role="option"]')).toHaveLength(2);
    await input.trigger("keydown", { key: "ArrowDown" });
    const enter = new KeyboardEvent("keydown", { key: "Enter", cancelable: true });
    input.element.dispatchEvent(enter);

    expect(wrapper.emitted("update:modelValue")?.at(-1)).toEqual(["blue hair"]);
    expect(enter.defaultPrevented).toBe(true);
  });
});
