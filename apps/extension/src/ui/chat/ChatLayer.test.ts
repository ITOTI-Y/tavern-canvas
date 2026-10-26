import type { IllustrationSlot, SwipeIllustrations } from "@tavern-canvas/contracts";
import { flushPromises, mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { markRaw } from "vue";
import { createI18n } from "vue-i18n";

import type { HostAdapter } from "../../host/index.js";
import { en_messages } from "../../i18n/locales/en.js";
import { IllustrationService } from "../../modules/illustration/illustration_service.js";
import type { GalleryCapability, NovelAiCapability } from "../contracts/ui_capabilities.js";
import ChatLayer from "./ChatLayer.vue";

const IMAGE_ID = "01906f4e-5f1c-7a2a-8d73-cc3a51abf1ed";

const SLOT: IllustrationSlot = {
  slot_id: "slot_0001",
  paragraph: 0,
  anchor: "She opened the door.",
  scene: "a girl opening a door",
  characters: [],
  positive_prompt: "1girl, door",
  negative_prompt: "lowres",
  image_ids: [IMAGE_ID],
  active_image_id: IMAGE_ID,
  pending_request_ids: [],
  last_error: null,
};

function render_chat(): HTMLElement {
  document.body.innerHTML = `
    <div id="chat">
      <div class="mes" mesid="3">
        <div class="mes_buttons"><div class="extraMesButtons"></div></div>
        <div class="mes_text"><p>She opened the door.</p><div data-tc-slot="slot_0001"></div></div>
      </div>
    </div>`;
  const text = document.querySelector<HTMLElement>(".mes_text");
  if (text === null) {
    throw new Error("fixture is missing .mes_text");
  }
  return text;
}

function create_host(text_element: HTMLElement): HostAdapter {
  const record: SwipeIllustrations = { schema_version: 2, slots: [SLOT] };
  return {
    capabilities: {},
    get_locale: () => "en",
    get_active_chat_id: () => "chat-1",
    get_active_chat: () =>
      Promise.resolve({
        chat_id: "chat-1",
        messages: [
          {
            message_id: 3,
            name: "Alice",
            role: "assistant",
            is_hidden: false,
            active_swipe_id: 0,
            swipes: [{ swipe_id: 0, content: "She opened the door." }],
          },
        ],
      }),
    subscribe_generation: () => () => undefined,
    subscribe_chat_change: () => () => undefined,
    subscribe_message_rendered: () => () => undefined,
    subscribe_chat_rendered: () => () => undefined,
    find_message_element: (message_id) => (message_id === 3 ? text_element : null),
    read_swipe_record: () => record,
    write_swipe_record: () => Promise.resolve(),
    replace_message_text: () => Promise.resolve(true),
    generate_with_preset: vi.fn(() => Promise.reject(new Error("not expected"))),
    stop_generation: () => undefined,
    sync_regex_scripts: () => Promise.resolve(false),
  };
}

function mount_layer() {
  const text_element = render_chat();
  const host = create_host(text_element);
  const service = new IllustrationService({
    host,
    settings: () => ({
      preset_name: "in_use",
      connection: { kind: "current" },
      max_chat_history: 4,
      max_images_per_message: 2,
      prompt_preset_id: null,
    }),
    auto_generation_enabled: () => false,
    prompt_context: () => Promise.resolve({ preset: null, appearances: [] }),
    build_request: () => Promise.reject(new Error("no provider profile")),
    submit: () => Promise.reject(new Error("no provider profile")),
    jobs: {
      subscribe: () => () => undefined,
      mark_attached: () => Promise.resolve(),
      mark_orphaned: () => Promise.resolve(),
    },
    new_slot_id: () => "slot_0002",
    new_generation_id: () => "generation-1",
  });
  const gallery = {
    read_bytes: vi.fn(() => Promise.resolve(new Uint8Array([1, 2, 3]))),
  } as unknown as GalleryCapability;
  const i18n = createI18n({ legacy: false, locale: "en", messages: { en: en_messages } });
  const wrapper = mount(ChatLayer, {
    props: { host, service: markRaw(service), gallery, novelai: {} as NovelAiCapability },
    global: { plugins: [i18n] },
    attachTo: document.body,
  });
  return { wrapper, host, gallery };
}

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

describe("ChatLayer", () => {
  it("renders the slot's active image inside its marker element", async () => {
    vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:slot-image");
    const { wrapper, gallery } = mount_layer();
    await flushPromises();

    const image = document.querySelector<HTMLImageElement>('[data-tc-slot="slot_0001"] img');
    expect(image?.getAttribute("src")).toBe("blob:slot-image");
    expect(image?.alt).toBe("a girl opening a door");
    expect(gallery.read_bytes).toHaveBeenCalledWith(IMAGE_ID);
    wrapper.unmount();
  });

  it("adds an illustrate button to the message that opens the dialog with the slot's prompts", async () => {
    vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:slot-image");
    const { wrapper, host } = mount_layer();
    await flushPromises();

    const button = document.querySelector<HTMLElement>(".extraMesButtons [data-tc-illustrate]");
    expect(button?.title).toBe("Illustrate this reply");
    button?.click();
    await flushPromises();

    const prompts = [...document.querySelectorAll("textarea")].map((element) => element.value);
    expect(prompts).toEqual(["1girl, door", "lowres"]);
    expect(host.generate_with_preset).not.toHaveBeenCalled();

    wrapper.unmount();
    expect(document.querySelector("[data-tc-illustrate]")).toBeNull();
  });
});
