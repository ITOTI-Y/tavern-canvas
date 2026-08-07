import type { KnowledgeRecord, PersonaProfile, Uuid } from "@tavern-canvas/contracts";
import { DOMWrapper, flushPromises, mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { createI18n } from "vue-i18n";

import { en_messages } from "../../../i18n/locales/en.js";
import { zh_cn_messages } from "../../../i18n/locales/zh_cn.js";
import { PORTAL_TARGET_KEY } from "../../contracts/portal_keys.js";
import type { StudioController } from "../../controllers/studio_controller.js";
import KnowledgePanel from "./KnowledgePanel.vue";
import PersonaPanel from "./PersonaPanel.vue";

const PERSONA_ID = "11111111-1111-4111-8111-111111111111" as Uuid;
const ENTRY_ID = "22222222-2222-4222-8222-222222222222" as Uuid;
const OTHER_ENTRY_ID = "33333333-3333-4333-8333-333333333333" as Uuid;
const NOW = "2026-08-07T00:00:00.000Z";

const PERSONA: PersonaProfile = {
  id: PERSONA_ID,
  display_name: "Narrator",
  role: "assistant",
  description: "Calm and precise.",
  greeting: "Where to?",
  avatar_image_id: null,
  is_active: true,
  created_at: NOW,
  updated_at: NOW,
};

const ENTRY: KnowledgeRecord = {
  id: ENTRY_ID,
  title: "Harbor district",
  source_type: "manual",
  content: "Floods at spring tide.",
  keywords: ["harbor", "tide"],
  priority: 40,
  enabled: true,
  created_at: NOW,
  updated_at: NOW,
};

function build_controller(overrides: Partial<StudioController> = {}): StudioController {
  return {
    save_persona: vi.fn(() => Promise.resolve(PERSONA)),
    remove_persona: vi.fn(() => Promise.resolve()),
    save_knowledge_entry: vi.fn(() => Promise.resolve(ENTRY)),
    set_knowledge_entry_enabled: vi.fn(() => Promise.resolve(ENTRY)),
    remove_knowledge_entry: vi.fn(() => Promise.resolve()),
    set_knowledge_selection: vi.fn(),
    bulk_remove_knowledge_entries: vi.fn(() => Promise.resolve()),
    ...overrides,
  } as unknown as StudioController;
}

function create_i18n(locale: "en" | "zh-CN") {
  return createI18n({
    legacy: false,
    locale,
    fallbackLocale: "en",
    messages: { en: en_messages, "zh-CN": zh_cn_messages },
  });
}

function mount_options(locale: "en" | "zh-CN") {
  const portal_target = document.createElement("div");
  document.body.append(portal_target);
  const host = document.createElement("div");
  document.body.append(host);
  return {
    global: {
      plugins: [create_i18n(locale)],
      provide: { [PORTAL_TARGET_KEY as unknown as string]: portal_target },
    },
    attachTo: host,
  };
}

function mount_persona_panel(
  options: {
    readonly personas?: readonly PersonaProfile[];
    readonly loading?: boolean;
    readonly controller?: StudioController;
    readonly locale?: "en" | "zh-CN";
  } = {},
) {
  const controller = options.controller ?? build_controller();
  const wrapper = mount(PersonaPanel, {
    props: {
      personas: options.personas ?? [PERSONA],
      loading: options.loading ?? false,
      controller,
    },
    ...mount_options(options.locale ?? "en"),
  });
  return { wrapper, controller };
}

function mount_knowledge_panel(
  options: {
    readonly entries?: readonly KnowledgeRecord[];
    readonly selectedIds?: readonly Uuid[];
    readonly loading?: boolean;
    readonly controller?: StudioController;
    readonly locale?: "en" | "zh-CN";
  } = {},
) {
  const controller = options.controller ?? build_controller();
  const wrapper = mount(KnowledgePanel, {
    props: {
      entries: options.entries ?? [ENTRY],
      selectedIds: options.selectedIds ?? [],
      loading: options.loading ?? false,
      controller,
    },
    ...mount_options(options.locale ?? "en"),
  });
  return { wrapper, controller };
}

function dom(): DOMWrapper<HTMLElement> {
  return new DOMWrapper(document.body);
}

function button_by_label(label: string): DOMWrapper<Element> {
  const found = dom()
    .findAll("button")
    .find((candidate) => candidate.text().trim() === label);
  if (!found) {
    throw new Error(`No button labelled "${label}"`);
  }
  return found;
}

async function confirm_destructive(label = "Delete"): Promise<void> {
  const confirm = dom()
    .find('[role="alertdialog"]')
    .findAll("button")
    .find((candidate) => candidate.text().trim() === label);
  await confirm?.trigger("click");
  await flushPromises();
}

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

describe("PersonaPanel", () => {
  it("lists personas with their role and active state", () => {
    const { wrapper } = mount_persona_panel();
    const cards = wrapper.findAll('[data-testid="persona-card"]');

    expect(cards).toHaveLength(1);
    expect(cards[0]?.text()).toContain("Narrator");
    expect(cards[0]?.text()).toContain("Assistant");
    expect(cards[0]?.text()).toContain("Active");
  });

  it("composes an empty state with an action", () => {
    const { wrapper } = mount_persona_panel({ personas: [] });
    expect(wrapper.text()).toContain(
      "Add a persona to give the chat a speaker identity, either your own or the assistant's.",
    );
    expect(wrapper.findAll("button").some((b) => b.text().includes("Add persona"))).toBe(true);
  });

  it("renders a skeleton while loading", () => {
    const { wrapper } = mount_persona_panel({ loading: true, personas: [] });
    expect(wrapper.find('[data-testid="persona-card"]').exists()).toBe(false);
    expect(wrapper.html()).toContain("aria-hidden");
  });

  it("creates a persona from the dialog", async () => {
    const { controller } = mount_persona_panel({ personas: [] });
    await button_by_label("Add persona").trigger("click");
    await flushPromises();

    await dom().find('input[type="text"]').setValue("Chronicler");
    const textareas = dom().findAll("textarea");
    await textareas[0]?.setValue("Dry, factual.");
    await button_by_label("Save").trigger("click");
    await flushPromises();

    const draft = vi.mocked(controller.save_persona).mock.calls[0]?.[0];
    expect(draft?.display_name).toBe("Chronicler");
    expect(draft?.description).toBe("Dry, factual.");
    expect(draft?.role).toBe("assistant");
  });

  it("blocks a save with a blank name and shows the error below the field", async () => {
    const { controller } = mount_persona_panel({ personas: [] });
    await button_by_label("Add persona").trigger("click");
    await flushPromises();

    await button_by_label("Save").trigger("click");
    await flushPromises();

    expect(controller.save_persona).not.toHaveBeenCalled();
    expect(
      dom()
        .findAll('[role="alert"]')
        .some((n) => n.text() === "This field is required."),
    ).toBe(true);
  });

  it("prefills the edit dialog", async () => {
    mount_persona_panel();
    await button_by_label("Edit").trigger("click");
    await flushPromises();

    expect((dom().find('input[type="text"]').element as HTMLInputElement).value).toBe("Narrator");
  });

  it("requires a destructive confirmation before deleting", async () => {
    const { controller } = mount_persona_panel();
    await button_by_label("Delete").trigger("click");
    await flushPromises();

    expect(controller.remove_persona).not.toHaveBeenCalled();
    expect(dom().text()).toContain("Delete Narrator?");

    await confirm_destructive();
    expect(controller.remove_persona).toHaveBeenCalledWith(PERSONA_ID);
  });

  it("toggling active saves the persona without opening the dialog", async () => {
    const { controller } = mount_persona_panel();
    const toggle = dom().findAll('[role="switch"]')[0];
    await toggle?.trigger("click");
    await flushPromises();

    expect(vi.mocked(controller.save_persona).mock.calls[0]?.[0]?.is_active).toBe(false);
  });
});

describe("KnowledgePanel", () => {
  it("lists entries with source, priority, and keywords", () => {
    const { wrapper } = mount_knowledge_panel();
    const card = wrapper.find('[data-testid="knowledge-card"]');

    expect(card.text()).toContain("Harbor district");
    expect(card.text()).toContain("Written here");
    expect(card.text()).toContain("Priority 40");
    expect(card.text()).toContain("harbor, tide");
  });

  it("composes an empty state with an action", () => {
    const { wrapper } = mount_knowledge_panel({ entries: [] });
    expect(wrapper.text()).toContain(
      "Add a knowledge entry to feed background facts into prompts when its keywords appear.",
    );
  });

  it("creates an entry and normalizes its comma separated keywords", async () => {
    const { controller } = mount_knowledge_panel({ entries: [] });
    await button_by_label("Add knowledge entry").trigger("click");
    await flushPromises();

    const inputs = dom().findAll('input[type="text"]');
    await inputs[0]?.setValue("Old town");
    await dom().find("textarea").setValue("Cobbled streets.");
    await inputs[1]?.setValue("old town, 旧城 , old town");
    await button_by_label("Save").trigger("click");
    await flushPromises();

    const draft = vi.mocked(controller.save_knowledge_entry).mock.calls[0]?.[0];
    expect(draft?.title).toBe("Old town");
    expect(draft?.keywords).toEqual(["old town", "旧城"]);
  });

  it("blocks a save with a blank title or blank content", async () => {
    const { controller } = mount_knowledge_panel({ entries: [] });
    await button_by_label("Add knowledge entry").trigger("click");
    await flushPromises();

    await button_by_label("Save").trigger("click");
    await flushPromises();

    expect(controller.save_knowledge_entry).not.toHaveBeenCalled();
    expect(
      dom()
        .findAll('[role="alert"]')
        .filter((n) => n.text() === "This field is required."),
    ).toHaveLength(2);
  });

  it("prefills the edit dialog including the joined keyword line", async () => {
    mount_knowledge_panel();
    await button_by_label("Edit").trigger("click");
    await flushPromises();

    const inputs = dom().findAll('input[type="text"]');
    expect((inputs[0]?.element as HTMLInputElement).value).toBe("Harbor district");
    expect((inputs[1]?.element as HTMLInputElement).value).toBe("harbor, tide");
  });

  it("requires a destructive confirmation before deleting one entry", async () => {
    const { controller } = mount_knowledge_panel();
    await button_by_label("Delete").trigger("click");
    await flushPromises();

    expect(controller.remove_knowledge_entry).not.toHaveBeenCalled();
    await confirm_destructive();
    expect(controller.remove_knowledge_entry).toHaveBeenCalledWith(ENTRY_ID);
  });

  it("tracks a multi-selection through the controller", async () => {
    const { controller } = mount_knowledge_panel();
    const select_switch = dom().findAll('[role="switch"]')[1];
    await select_switch?.trigger("click");
    await flushPromises();

    expect(controller.set_knowledge_selection).toHaveBeenCalledWith([ENTRY_ID]);
  });

  it("requires a destructive confirmation before deleting a multi-selection", async () => {
    const { controller } = mount_knowledge_panel({
      entries: [ENTRY, { ...ENTRY, id: OTHER_ENTRY_ID, title: "Old town" }],
      selectedIds: [ENTRY_ID, OTHER_ENTRY_ID],
    });

    await dom().find('[data-testid="knowledge-bulk-delete"]').trigger("click");
    await flushPromises();

    expect(controller.bulk_remove_knowledge_entries).not.toHaveBeenCalled();
    expect(dom().text()).toContain("Delete 2 knowledge entries?");

    await confirm_destructive();
    expect(controller.bulk_remove_knowledge_entries).toHaveBeenCalledWith([
      ENTRY_ID,
      OTHER_ENTRY_ID,
    ]);
  });

  it("hides the batch action while nothing is selected", () => {
    const { wrapper } = mount_knowledge_panel();
    expect(wrapper.find('[data-testid="knowledge-bulk-delete"]').exists()).toBe(false);
  });

  it("toggles an entry without opening the dialog", async () => {
    const { controller } = mount_knowledge_panel();
    const enabled_switch = dom().findAll('[role="switch"]')[2];
    await enabled_switch?.trigger("click");
    await flushPromises();

    expect(controller.set_knowledge_entry_enabled).toHaveBeenCalledWith(ENTRY_ID, false);
  });
});

describe("Persona and knowledge panels: bilingual copy", () => {
  it("renders native Simplified Chinese with no missing keys", () => {
    const persona = mount_persona_panel({ locale: "zh-CN" }).wrapper.text();
    document.body.innerHTML = "";
    const knowledge = mount_knowledge_panel({ locale: "zh-CN" }).wrapper.text();

    expect(persona).toContain("添加身份");
    expect(persona).toContain("助手");
    expect(knowledge).toContain("添加知识条目");
    expect(knowledge).toContain("优先级 40");
    expect(persona).not.toContain("undefined");
    expect(knowledge).not.toContain("undefined");
  });

  it("uses no em dashes in either locale", () => {
    const en = mount_knowledge_panel().wrapper.text();
    document.body.innerHTML = "";
    const zh = mount_knowledge_panel({ locale: "zh-CN" }).wrapper.text();

    expect(/[–—]/u.test(en)).toBe(false);
    expect(/[–—]/u.test(zh)).toBe(false);
  });
});
