import { flushPromises, mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { createI18n } from "vue-i18n";

import { en_messages } from "../../../i18n/locales/en.js";
import { REFERENCE_IMAGE_KEY, type ReferenceImagePort } from "../../contracts/portal_keys.js";
import CharacterReference from "./CharacterReference.vue";

vi.mock("./reference_image.js", () => ({
  read_reference_image: () => Promise.resolve("data:image/jpeg;base64,AAAA"),
}));

function mount_reference(generator: ReferenceImagePort | null) {
  const i18n = createI18n({ legacy: false, locale: "en", messages: { en: en_messages } });
  return mount(CharacterReference, {
    props: {
      image: null,
      send: false,
      mode: "vibe",
      defaultPrompt: { positive_prompt: "1girl, solo, pink hair", negative_prompt: "pointy ears" },
    },
    global: { plugins: [i18n], provide: { [REFERENCE_IMAGE_KEY as symbol]: generator } },
  });
}

describe("CharacterReference", () => {
  it("generates a reference from the edited default prompt and offers it as the image", async () => {
    const generate = vi.fn(() => Promise.resolve(new Blob([new Uint8Array([1])])));
    const wrapper = mount_reference({ generate });

    await wrapper.get('[data-testid="character-reference-generate"]').trigger("click");
    const [positive, negative] = wrapper.findAll("textarea");
    expect(positive?.element.value).toBe("1girl, solo, pink hair");
    expect(negative?.element.value).toBe("pointy ears");
    await positive?.setValue("1girl, solo, pink hair, smile");
    await wrapper.get('[data-testid="character-reference-submit"]').trigger("click");
    await flushPromises();

    expect(generate).toHaveBeenCalledWith({
      positive_prompt: "1girl, solo, pink hair, smile",
      negative_prompt: "pointy ears",
    });
    expect(wrapper.emitted("update:image")).toEqual([["data:image/jpeg;base64,AAAA"]]);
    expect(wrapper.find("textarea").exists()).toBe(false);
  });

  it("offers only uploading when no generator is available", () => {
    const wrapper = mount_reference(null);
    expect(wrapper.find('[data-testid="character-reference-generate"]').exists()).toBe(false);
    expect(wrapper.text()).toContain("Upload image");
  });
});
