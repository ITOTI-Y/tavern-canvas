import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { createI18n } from "vue-i18n";

import { en_messages } from "../../../i18n/locales/en.js";
import StripRange from "./StripRange.vue";

const MESSAGES = [
  { message_id: 1, name: "You", is_user: true, text: "Run." },
  { message_id: 2, name: "Lin", is_user: false, text: "She runs." },
  { message_id: 3, name: "You", is_user: true, text: "Jump!" },
  { message_id: 4, name: "Lin", is_user: false, text: "She jumps\n\nover the wall." },
  { message_id: 5, name: "You", is_user: true, text: "Wait." },
];

function mount_range() {
  return mount(StripRange, {
    props: { messages: MESSAGES, from: 4, to: 4 },
    global: {
      plugins: [createI18n({ legacy: false, locale: "en", messages: { en: en_messages } })],
    },
  });
}

describe("StripRange", () => {
  it("starts a range on the first click and closes it on the second, in either direction", async () => {
    const wrapper = mount_range();
    const rows = wrapper.findAll("button[aria-pressed]");

    await rows[3]?.trigger("click");
    await rows[1]?.trigger("click");

    expect(wrapper.emitted("change")).toEqual([
      [4, 4],
      [2, 4],
    ]);
  });

  it("selects only the latest reply, and shows each message on one line", async () => {
    const wrapper = mount_range();
    await wrapper.get("button:not([aria-pressed])").trigger("click");

    expect(wrapper.emitted("change")).toEqual([[4, 4]]);
    expect(wrapper.text()).toContain("She jumps over the wall.");
  });
});
