import {
  RequestIdSchema,
  type IllustrationSlot,
  type ImageGenerationRequest,
  type SwipeIllustrations,
} from "@tavern-canvas/contracts";
import { flushPromises, mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { markRaw } from "vue";
import { createI18n } from "vue-i18n";

import type { HostAdapter } from "../../host/index.js";
import { en_messages } from "../../i18n/locales/en.js";
import { IllustrationService } from "../../modules/illustration/illustration_service.js";
import { WardrobeService } from "../../modules/wardrobe/wardrobe_service.js";
import type { GalleryCapability, NovelAiCapability } from "../contracts/ui_capabilities.js";
import ChatLayer from "./ChatLayer.vue";

const IMAGE_ID = "01906f4e-5f1c-7a2a-8d73-cc3a51abf1ed";
const REQUEST_ID = "550e8400-e29b-41d4-a716-446655440000";

const SLOT: IllustrationSlot = {
  slot_id: "slot_0001",
  paragraph: 0,
  anchor: "She opened the door.",
  scene: "a girl opening a door",
  characters: [],
  positive_prompt: "1girl, door",
  negative_prompt: "lowres",
  character_prompts: [],
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
    get_active_swipe_id: (message_id: number) => (message_id === 3 ? 0 : null),
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
    subscribe_message_released: () => () => undefined,
    subscribe_chat_rendered: () => () => undefined,
    find_message_element: (message_id) => (message_id === 3 ? text_element : null),
    read_swipe_record: () => record,
    write_swipe_record: () => Promise.resolve(),
    replace_message_text: () => Promise.resolve(true),
    generate_with_preset: vi.fn(() => Promise.reject(new Error("not expected"))),
    stop_generation: () => undefined,
    sync_regex_scripts: () => Promise.resolve(false),
    list_worldbooks: () => [],
    read_worldbook: () => Promise.resolve([]),
    translate_deepl: () => Promise.reject(new Error("not used")),
    read_swipe_wardrobe: () => null,
    write_swipe_wardrobe: () => Promise.resolve(),
  };
}

function mount_layer(options: { readonly edits?: boolean } = {}) {
  const text_element = render_chat();
  const host = create_host(text_element);
  const submit = vi.fn(() => Promise.resolve(RequestIdSchema.parse(REQUEST_ID)));
  const service = new IllustrationService({
    host,
    settings: () => ({
      preset_name: "in_use",
      connection: { kind: "current" },
      max_chat_history: 4,
      max_images_per_message: 2,
      prompt_preset_id: null,
      world_info: { mode: "chat" },
      wardrobe_model: null,
      analysis_guidance: "",
      wardrobe_guidance: "",
    }),
    auto_generation_enabled: () => false,
    prompt_context: () =>
      Promise.resolve({ preset: null, library: { characters: [], outfits: [], loras: [] } }),
    wardrobe: new WardrobeService({
      host,
      library: {
        load: () => Promise.resolve({ characters: [], outfits: [] }),
        create_character: () => Promise.resolve(),
        create_outfit: () => Promise.resolve(),
        add_appearance: () => Promise.resolve(),
      },
      run: () => Promise.resolve(JSON.stringify({ characters: [] })),
      new_id: () => "id-1",
    }),
    build_request: () => Promise.reject(new Error("no provider profile")),
    build_edit_request: (edit) =>
      Promise.resolve({ provider_id: "sd_webui", prompt: edit.kind } as ImageGenerationRequest),
    edits_available: () => options.edits ?? false,
    resolve_analysis_key: () => Promise.resolve("analysis-key"),
    submit,
    jobs: {
      subscribe: () => () => undefined,
      mark_attached: () => Promise.resolve(),
      mark_orphaned: () => Promise.resolve(),
    },
    new_slot_id: () => "slot_0002",
    new_generation_id: () => "generation-1",
    wait: () => Promise.resolve(),
  });
  const gallery = {
    read_bytes: vi.fn(() => Promise.resolve(new Uint8Array([1, 2, 3]))),
  } as unknown as GalleryCapability;
  const i18n = createI18n({ legacy: false, locale: "en", messages: { en: en_messages } });
  const wrapper = mount(ChatLayer, {
    props: {
      host,
      service: markRaw(service),
      gallery,
      novelai: {} as NovelAiCapability,
      promptTags: { profile: null, custom_presets: [], save: () => Promise.resolve() },
      translator: {
        to_tags: (prompt: string) => Promise.resolve(`${prompt}, smile`),
        read_in_chinese: () => Promise.resolve("一个女孩，门"),
        suggest: () => Promise.resolve([]),
        prepare: () => Promise.resolve(),
      },
    },
    global: { plugins: [i18n] },
    attachTo: document.body,
  });
  return { wrapper, host, gallery, submit };
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

    document
      .querySelector<HTMLButtonElement>(
        '[role="dialog"] button[aria-label="Translate to English tags"]',
      )
      ?.click();
    await flushPromises();
    expect(document.querySelector("textarea")?.value).toBe("1girl, door, smile");

    wrapper.unmount();
    expect(document.querySelector("[data-tc-illustrate]")).toBeNull();
  });

  it("illustrates a hovered paragraph from the button beside it", async () => {
    vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:slot-image");
    const illustrate = vi
      .spyOn(IllustrationService.prototype, "illustrate_paragraph")
      .mockResolvedValue("slot_0001");
    const { wrapper } = mount_layer();
    await flushPromises();

    document
      .querySelector(".mes_text > p")
      ?.dispatchEvent(new PointerEvent("pointerover", { bubbles: true }));
    await flushPromises();
    document.querySelector<HTMLButtonElement>('[data-testid="paragraph-illustrate"]')?.click();
    await flushPromises();

    expect(illustrate).toHaveBeenCalledWith(3, 0);
    wrapper.unmount();
  });

  it("shows no paragraph button while no chat is open", async () => {
    vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:slot-image");
    const { wrapper, host } = mount_layer();
    await flushPromises();
    host.get_active_chat_id = () => null;

    document
      .querySelector(".mes_text > p")
      ?.dispatchEvent(new PointerEvent("pointerover", { bubbles: true }));
    await flushPromises();

    expect(document.querySelector('[data-testid="paragraph-illustrate"]')).toBeNull();
    wrapper.unmount();
  });

  it("offers quick edits only when the provider supports them and queues an upscale", async () => {
    vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:slot-image");
    const without = mount_layer();
    await flushPromises();
    expect(document.querySelector('button[aria-label="More actions"]')).toBeNull();
    without.wrapper.unmount();

    const { wrapper, submit } = mount_layer({ edits: true });
    await flushPromises();
    document.querySelector<HTMLButtonElement>('button[aria-label="More actions"]')?.click();
    await flushPromises();
    const upscale = [...document.querySelectorAll("button")].find(
      (button) => button.textContent?.trim() === "Upscale",
    );
    upscale?.click();
    await flushPromises();
    const confirm = [...document.querySelectorAll('[role="dialog"] button')].find(
      (button) => button.textContent?.trim() === "Generate",
    );
    (confirm as HTMLButtonElement | undefined)?.click();

    await vi.waitFor(() => {
      expect(submit).toHaveBeenCalledWith({ provider_id: "sd_webui", prompt: "upscale" });
    });
    wrapper.unmount();
  });

  it("does not submit a slot again after a later slot in the same confirm failed", async () => {
    vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:slot-image");
    const second = {
      ...SLOT,
      slot_id: "slot_0002",
      scene: "a cat",
      image_ids: [],
      active_image_id: null,
    };
    vi.spyOn(IllustrationService.prototype, "analyze").mockResolvedValue({
      schema_version: 2,
      slots: [{ ...SLOT, image_ids: [], active_image_id: null }, second],
    });
    const generate = vi
      .spyOn(IllustrationService.prototype, "generate")
      .mockResolvedValueOnce()
      .mockRejectedValueOnce(new Error("upstream 502"))
      .mockResolvedValue();
    const { wrapper } = mount_layer();
    await flushPromises();
    document.querySelector<HTMLElement>(".extraMesButtons [data-tc-illustrate]")?.click();
    await flushPromises();
    const confirm = (): HTMLButtonElement | undefined =>
      [...document.querySelectorAll<HTMLButtonElement>('[role="dialog"] button')].find((button) =>
        button.textContent?.trim().startsWith("Generate"),
      );

    confirm()?.click();
    await flushPromises();
    expect(document.body.textContent).toContain("Submitted 1 of 2");
    confirm()?.click();
    await flushPromises();

    expect(generate.mock.calls.map((call) => call[1])).toEqual([
      "slot_0001",
      "slot_0002",
      "slot_0002",
    ]);
    wrapper.unmount();
  });
});
