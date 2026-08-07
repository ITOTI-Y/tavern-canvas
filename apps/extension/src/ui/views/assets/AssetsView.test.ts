import { DOMWrapper, flushPromises, mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createI18n } from "vue-i18n";

import type { Uuid, VocabularyCatalogEntry } from "@tavern-canvas/contracts";
import { en_messages } from "../../../i18n/locales/en.js";
import { zh_cn_messages } from "../../../i18n/locales/zh_cn.js";
import type { AssetCategory, AssetRecordSummary } from "../../contracts/ui_capabilities.js";
import { IDLE_COMMAND_STATE, type StudioState } from "../../contracts/view_models.js";
import type { StudioController } from "../../controllers/studio_controller.js";
import AssetsView from "./AssetsView.vue";

function build_state(overrides: Partial<StudioState["assets"]> = {}): StudioState {
  return {
    route: "assets",
    color_mode: "light",
    loading: new Set(),
    failures: new Map(),
    workbench: {
      profiles: [],
      active_profile_id: null,
      jobs: [],
      submit_command: IDLE_COMMAND_STATE,
    },
    llm_connections: { connections: [], selected_connection_id: null },
    library: { personas: [], knowledge: [], selected_knowledge_ids: [] },
    prompt: {
      presets: [],
      selected_preset_id: null,
      draft: null,
      save_command: IDLE_COMMAND_STATE,
    },
    assets: {
      active_category: "character",
      records: { character: [], outfit: [], lora: [], vibe: [], reference: [], workflow: [] },
      vocabulary_catalog: [],
      vocabulary_install_command: IDLE_COMMAND_STATE,
      ...overrides,
    },
    gallery: { records: [], selected_record_id: null, bulk_delete_command: IDLE_COMMAND_STATE },
    diagnostics: {
      snapshot: null,
      timeline: [],
      migration: null,
      connection_test_command: IDLE_COMMAND_STATE,
      support_bundle_command: IDLE_COMMAND_STATE,
    },
    settings: {
      settings: null,
      vocabulary_update_channel: null,
      update_command: IDLE_COMMAND_STATE,
      migration_retry_command: IDLE_COMMAND_STATE,
    },
    inspector: { collapsed: false, width: 320, selected_record: null },
    tasks: [],
  };
}

function build_controller(state: StudioState): StudioController & { state: StudioState } {
  return {
    state,
    on_change: vi.fn(() => () => {}),
    start: vi.fn(() => Promise.resolve()),
    stop: vi.fn(() => Promise.resolve()),
    set_route: vi.fn(),
    set_color_mode: vi.fn(),
    set_inspector_width: vi.fn(),
    set_inspector_collapsed: vi.fn(),
    select_inspector_record: vi.fn(),
    submit_generation: vi.fn(() => Promise.resolve()),
    cancel_generation: vi.fn(() => Promise.resolve()),
    retry_generation: vi.fn(() => Promise.resolve()),
    save_prompt_preset: vi.fn(() => Promise.resolve()),
    install_vocabulary_package: vi.fn(() => Promise.resolve()),
    update_settings: vi.fn(() => Promise.resolve()),
    test_diagnostics_connection: vi.fn(() => Promise.resolve()),
    export_support_bundle: vi.fn(() => Promise.resolve()),
    retry_migration: vi.fn(() => Promise.resolve()),
    set_active_asset_category: vi.fn(),
    save_asset: vi.fn(() => Promise.resolve()),
    remove_asset: vi.fn(() => Promise.resolve()),
    reorder_assets: vi.fn(() => Promise.resolve()),
    search_vocabulary: vi.fn(() => Promise.resolve({ results: [], next_cursor: null })),
    load_more_vocabulary: vi.fn(() => Promise.resolve({ results: [], next_cursor: null })),
    select_gallery_record: vi.fn(),
    read_gallery_bytes: vi.fn(() => Promise.resolve(new Uint8Array())),
    pin_gallery_record: vi.fn(() => Promise.resolve()),
    detach_gallery_record: vi.fn(() => Promise.resolve()),
    delete_gallery_record: vi.fn(() => Promise.resolve()),
    bulk_delete_gallery_records: vi.fn(() => Promise.resolve()),
    update_prompt_draft: vi.fn(),
    clear_prompt_draft: vi.fn(),
    select_prompt_preset: vi.fn(),
    start_new_prompt_preset: vi.fn(),
    remove_prompt_preset: vi.fn(() => Promise.resolve()),
    bulk_remove_prompt_presets: vi.fn(() => Promise.resolve()),
    test_prompt_regex: vi.fn(() => Promise.resolve("")),
    select_provider_profile: vi.fn(),
    select_llm_connection: vi.fn(),
    save_persona: vi.fn(() => Promise.resolve({}) as ReturnType<StudioController["save_persona"]>),
    remove_persona: vi.fn(() => Promise.resolve()),
    save_knowledge_entry: vi.fn(
      () => Promise.resolve({}) as ReturnType<StudioController["save_knowledge_entry"]>,
    ),
    set_knowledge_entry_enabled: vi.fn(
      () => Promise.resolve({}) as ReturnType<StudioController["set_knowledge_entry_enabled"]>,
    ),
    remove_knowledge_entry: vi.fn(() => Promise.resolve()),
    set_knowledge_selection: vi.fn(),
    bulk_remove_knowledge_entries: vi.fn(() => Promise.resolve()),
    save_llm_connection: vi.fn(
      () => Promise.resolve({}) as ReturnType<StudioController["save_llm_connection"]>,
    ),
    remove_llm_connection: vi.fn(() => Promise.resolve()),
    set_llm_connection_credential: vi.fn(
      () => Promise.resolve({}) as ReturnType<StudioController["set_llm_connection_credential"]>,
    ),
    clear_llm_connection_credential: vi.fn(
      () => Promise.resolve({}) as ReturnType<StudioController["clear_llm_connection_credential"]>,
    ),
    test_llm_connection: vi.fn(
      () => Promise.resolve({}) as ReturnType<StudioController["test_llm_connection"]>,
    ),
    save_provider_profile: vi.fn(
      () => Promise.resolve({}) as ReturnType<StudioController["save_provider_profile"]>,
    ),
    remove_provider_profile: vi.fn(() => Promise.resolve()),
    test_provider_profile_connection: vi.fn(
      () => Promise.resolve({}) as ReturnType<StudioController["test_provider_profile_connection"]>,
    ),
    acknowledge_http_origin: vi.fn(() => Promise.resolve()),
    set_vocabulary_update_channel: vi.fn(() => Promise.resolve()),
    export_settings_archive: vi.fn(() => Promise.resolve(new Blob())),
    import_settings_archive: vi.fn(() => Promise.resolve()),
    load_diagnostics_timeline: vi.fn(() => Promise.resolve()),
    confirm_legacy_cleanup: vi.fn(() => Promise.resolve()),
  };
}

function make_record(
  category: AssetCategory,
  id: string,
  display_name: string,
  payload: Record<string, unknown> = {},
): AssetRecordSummary {
  return {
    id: id as Uuid,
    category,
    record_key: id,
    display_name,
    updated_at: "2026-01-01T00:00:00.000Z",
    payload,
  };
}

function make_catalog_entry(
  overrides: Partial<VocabularyCatalogEntry> = {},
): VocabularyCatalogEntry {
  return {
    package_id: "tavern-canvas-extra",
    display_name: { en: "Extra pack", "zh-CN": "扩展包" },
    description: { en: "More tags", "zh-CN": "更多标签" },
    data_version: "1.0.0",
    record_count: 500,
    compressed_bytes: 1000,
    manifest_sha256: "a".repeat(64),
    languages: ["en"],
    min_extension_version: "3.0.0",
    base_url: "https://example.com/catalog/extra",
    updated_at: "2026-01-01T00:00:00.000Z",
    ...overrides,
  };
}

interface MountOptions {
  readonly state?: StudioState;
}

function mount_assets_view(options: MountOptions = {}) {
  const state = options.state ?? build_state();
  const controller = build_controller(state);
  const i18n = createI18n({
    legacy: false,
    locale: "en",
    fallbackLocale: "en",
    messages: { en: en_messages, "zh-CN": zh_cn_messages },
  });

  const wrapper = mount(AssetsView, {
    props: { state, controller },
    global: {
      plugins: [i18n],
      // AppDialog/AppSelect/ConfirmDialog all inject PORTAL_TARGET_KEY -- without it they fall
      // back to no `to` prop, and Reka's Portal defaults to teleporting into document.body
      // anyway, which `dom()` below already covers either way.
      provide: {},
    },
    attachTo: document.body,
  });

  return { wrapper, state, controller };
}

/**
 * AppDialog/AppSelect/ConfirmDialog all render their real content through a Reka `<Teleport>`
 * into a portal element that is a *sibling* of the mounted component's own root, not a
 * descendant of it -- `wrapper.find()`/`wrapper.text()` only ever search the wrapper's own
 * subtree (confirmed against components.test.ts's AppDialog suite, which queries
 * `document.querySelector` directly for the same reason) and silently miss anything teleported.
 * Every mount here uses `attachTo: document.body`, so a `document.body`-scoped DOMWrapper is a
 * strict superset that reaches both the app's own tree and every teleported dialog/select.
 */
function dom(): DOMWrapper<HTMLElement> {
  return new DOMWrapper(document.body);
}

afterEach(() => {
  document.body.innerHTML = "";
  vi.useRealTimers();
});

/** Reka's TabsTrigger renders a plain `<button role="tab">` with no `value` DOM attribute (a
 * generated `id` instead), so tabs can only be located by their visible label text. Selection
 * fires on `mousedown` (Reka's own TabsTrigger.js), not `click` -- a plain `.trigger("click")`
 * never activates the tab. */
async function click_tab(label: string): Promise<void> {
  const tab = dom()
    .findAll('[role="tab"]')
    .find((candidate) => candidate.text() === label);
  if (!tab) {
    throw new Error(`No tab found with label "${label}"`);
  }
  await tab.trigger("mousedown", { button: 0 });
}

describe("AssetsView tabs", () => {
  it("renders a tab for vocabulary and every asset category", () => {
    mount_assets_view();
    const text = dom().text();
    expect(text).toContain("Vocabulary");
    expect(text).toContain("Characters");
    expect(text).toContain("Outfits");
    expect(text).toContain("LoRA");
    expect(text).toContain("Vibe");
    expect(text).toContain("Reference");
    expect(text).toContain("Workflow");
  });

  it("starts on the category the controller already considers active", () => {
    mount_assets_view();
    expect(dom().text()).toContain("No characters saved yet");
  });

  it("switching to a category tab notifies the controller of the active category", async () => {
    const { controller } = mount_assets_view();
    await click_tab("LoRA");
    await flushPromises();
    expect(controller.set_active_asset_category).toHaveBeenCalledWith("lora");
  });
});

describe("Character panel CRUD and destructive confirmation", () => {
  it("shows the composed empty state when there are no characters yet", () => {
    mount_assets_view();
    expect(dom().text()).toContain("No characters saved yet");
    expect(dom().text()).toContain("Create a character profile");
  });

  it("creating a character calls save_asset with the entered name and fields", async () => {
    const { controller } = mount_assets_view();
    await dom().find('button[aria-label="Add character"]').trigger("click");
    const name_input = dom().find('input[placeholder="Name"]');
    await name_input.setValue("Kaede");
    const appearance = dom().findAll("textarea")[0];
    await appearance?.setValue("Tall, silver hair");
    await dom().find('button[type="submit"]').trigger("click");
    await flushPromises();

    expect(controller.save_asset).toHaveBeenCalledWith(
      "character",
      expect.objectContaining({
        category: "character",
        display_name: "Kaede",
        payload: expect.objectContaining({ appearance: "Tall, silver hair" }),
      }),
    );
  });

  it("blocks saving with an empty name and never calls save_asset", async () => {
    const { controller } = mount_assets_view();
    await dom().find('button[aria-label="Add character"]').trigger("click");
    await dom().find('button[type="submit"]').trigger("click");
    await flushPromises();
    expect(controller.save_asset).not.toHaveBeenCalled();
    expect(dom().text()).toContain("This field is required.");
  });

  it("editing an existing character preloads its saved fields", async () => {
    const state = build_state({
      records: {
        character: [
          make_record("character", "11111111-1111-4111-8111-111111111111", "Kaede", {
            appearance: "Tall",
          }),
        ],
        outfit: [],
        lora: [],
        vibe: [],
        reference: [],
        workflow: [],
      },
    });
    mount_assets_view({ state });
    await dom().find('button[aria-label="Edit: Kaede"]').trigger("click");
    const name_input = dom().find<HTMLInputElement>('input[placeholder="Name"]');
    expect(name_input.element.value).toBe("Kaede");
  });

  it("deleting a character requires confirmation before remove_asset is called", async () => {
    const record = make_record("character", "22222222-2222-4222-8222-222222222222", "Kaede");
    const state = build_state({
      records: { character: [record], outfit: [], lora: [], vibe: [], reference: [], workflow: [] },
    });
    const { controller } = mount_assets_view({ state });

    await dom().find('button[aria-label="Delete"]').trigger("click");
    expect(controller.remove_asset).not.toHaveBeenCalled();

    // The card's own delete icon and the confirm dialog's confirm button share the same
    // accessible name ("Delete") by design (confirmations.destructive.default_confirm_action);
    // the alertdialog role scopes to the confirm button specifically.
    await dom().find('[role="alertdialog"] button[aria-label="Delete"]').trigger("click");
    await flushPromises();
    expect(controller.remove_asset).toHaveBeenCalledWith("character", record.id);
  });

  it("cancelling the delete confirmation never calls remove_asset", async () => {
    const record = make_record("character", "33333333-3333-4333-8333-333333333333", "Kaede");
    const state = build_state({
      records: { character: [record], outfit: [], lora: [], vibe: [], reference: [], workflow: [] },
    });
    const { controller } = mount_assets_view({ state });
    await dom().find('button[aria-label="Delete"]').trigger("click");
    // AlertDialogCancel's accessible name comes from its text content, not an aria-label attr.
    const cancel_button = dom()
      .findAll('[role="alertdialog"] button')
      .find((candidate) => candidate.text() === "Cancel");
    await cancel_button?.trigger("click");
    await flushPromises();
    expect(controller.remove_asset).not.toHaveBeenCalled();
  });

  it("moving a record down calls reorder_assets with the new order", async () => {
    const first = make_record("character", "44444444-4444-4444-8444-444444444444", "First");
    const second = make_record("character", "55555555-5555-4555-8555-555555555555", "Second");
    const state = build_state({
      records: {
        character: [first, second],
        outfit: [],
        lora: [],
        vibe: [],
        reference: [],
        workflow: [],
      },
    });
    const { controller } = mount_assets_view({ state });
    const move_down_buttons = dom().findAll('button[aria-label="Move down"]');
    await move_down_buttons[0]?.trigger("click");
    await flushPromises();
    expect(controller.reorder_assets).toHaveBeenCalledWith("character", [second.id, first.id]);
  });

  it("random selection opens the edit dialog for a record already in the list", async () => {
    const record = make_record("character", "66666666-6666-4666-8666-666666666666", "OnlyOne");
    const state = build_state({
      records: { character: [record], outfit: [], lora: [], vibe: [], reference: [], workflow: [] },
    });
    mount_assets_view({ state });
    await dom().find('button[aria-label="Pick random"]').trigger("click");
    const name_input = dom().find<HTMLInputElement>('input[placeholder="Name"]');
    expect(name_input.element.value).toBe("OnlyOne");
  });

  it("search filters the visible character cards by name", async () => {
    const a = make_record("character", "77777777-7777-4777-8777-777777777777", "Alpha");
    const b = make_record("character", "88888888-8888-4888-8888-888888888888", "Beta");
    const state = build_state({
      records: { character: [a, b], outfit: [], lora: [], vibe: [], reference: [], workflow: [] },
    });
    mount_assets_view({ state });
    const search_inputs = dom().findAll('input[aria-label="Search"]');
    await search_inputs[0]?.setValue("Alpha");
    expect(dom().text()).toContain("Alpha");
    expect(dom().text()).not.toContain("Beta");
  });
});

describe("Outfit panel character link", () => {
  it("populates the character dropdown from the loaded character records", async () => {
    const character = make_record("character", "99999999-9999-4999-8999-999999999999", "Kaede");
    const state = build_state({
      records: {
        character: [character],
        outfit: [],
        lora: [],
        vibe: [],
        reference: [],
        workflow: [],
      },
    });
    mount_assets_view({ state });
    await click_tab("Outfits");
    await dom().find('button[aria-label="Add outfit"]').trigger("click");
    // AppSelect renders its option list lazily, only once opened. Reka's SelectTrigger opens on
    // `pointerdown` (SelectTrigger.js), not `click` or `mousedown` -- matching the same
    // Reka-internal-widget-interaction caveat already ledgered for SegmentedControl (Task 4).
    await dom().find('button[role="combobox"]').trigger("pointerdown", { button: 0, pointerId: 1 });
    await flushPromises();
    expect(dom().text()).toContain("Kaede");
  });
});

describe("LoRA metadata panel", () => {
  it("saves weight and trigger words", async () => {
    const { controller } = mount_assets_view();
    await click_tab("LoRA");
    await dom().find('button[aria-label="Add LoRA"]').trigger("click");
    await dom().find('input[placeholder="Name"]').setValue("Detail LoRA");
    // Scoped to the open dialog specifically: AssetCategoryList's own search box (still mounted
    // behind the dialog) is also `input[type="text"]`, and a document.body-wide query would pick
    // it up as an unwanted extra match ahead of the dialog's own fields.
    const trigger_words_input = dom().findAll('[role="dialog"] input[type="text"]')[1];
    await trigger_words_input?.setValue("detailed, sharp focus");
    await dom().find('button[type="submit"]').trigger("click");
    await flushPromises();
    expect(controller.save_asset).toHaveBeenCalledWith(
      "lora",
      expect.objectContaining({
        payload: expect.objectContaining({ trigger_words: "detailed, sharp focus" }),
      }),
    );
  });
});

describe("Vibe/reference group panel", () => {
  it("hides NovelAI-only strength fields when the source is switched to Google", async () => {
    mount_assets_view();
    await click_tab("Vibe");
    await dom().find('button[aria-label="Add group"]').trigger("click");
    expect(dom().text()).toContain("Strength");
    const radios = dom().findAll('[role="radio"]');
    await radios[1]?.trigger("click"); // options: [novelai, google]
    await flushPromises();
    expect(dom().text()).not.toContain("Strength");
  });
});

describe("ComfyUI workflow panel", () => {
  it("importing a workflow file scans and lists its placeholders", async () => {
    mount_assets_view();
    await click_tab("Workflow");

    const workflow_json = JSON.stringify({ text: "{{positive_prompt}}", seed_value: "{{seed}}" });
    const file = new File([workflow_json], "my_workflow.json", { type: "application/json" });
    const file_input = dom().find<HTMLInputElement>('input[type="file"]');
    Object.defineProperty(file_input.element, "files", { value: [file], configurable: true });
    await file_input.trigger("change");
    await flushPromises();

    expect(dom().text()).toContain("{{positive_prompt}}");
    expect(dom().text()).toContain("{{seed}}");
    const name_input = dom().find<HTMLInputElement>('input[placeholder="Name"]');
    expect(name_input.element.value).toBe("my_workflow");
  });

  it("re-scanning after editing the JSON preserves already-mapped targets", async () => {
    mount_assets_view();
    await click_tab("Workflow");

    const workflow_json = JSON.stringify({ text: "{{positive_prompt}}" });
    const file = new File([workflow_json], "workflow.json", { type: "application/json" });
    const file_input = dom().find<HTMLInputElement>('input[type="file"]');
    Object.defineProperty(file_input.element, "files", { value: [file], configurable: true });
    await file_input.trigger("change");
    await flushPromises();

    await dom().find('button[aria-label="Scan placeholders"]').trigger("click");
    await flushPromises();
    expect(dom().text()).toContain("{{positive_prompt}}");
  });

  it("saving a mapped workflow calls save_asset with the placeholder map JSON-encoded", async () => {
    const { controller } = mount_assets_view();
    await click_tab("Workflow");

    const workflow_json = JSON.stringify({ text: "{{positive_prompt}}" });
    const file = new File([workflow_json], "workflow.json", { type: "application/json" });
    const file_input = dom().find<HTMLInputElement>('input[type="file"]');
    Object.defineProperty(file_input.element, "files", { value: [file], configurable: true });
    await file_input.trigger("change");
    await flushPromises();

    await dom().find('button[type="submit"]').trigger("click");
    await flushPromises();

    expect(controller.save_asset).toHaveBeenCalledWith(
      "workflow",
      expect.objectContaining({
        payload: expect.objectContaining({
          workflow_json,
          placeholder_map: JSON.stringify({ positive_prompt: "" }),
        }),
      }),
    );
  });
});

describe("Vocabulary panel: search, pagination, install, NSFW opt-in", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("debounces search-as-you-type and calls search_vocabulary with the typed query", async () => {
    const { controller } = mount_assets_view();
    await click_tab("Vocabulary");
    const search_input = dom().find<HTMLInputElement>("#vocabulary-search-input");
    await search_input.setValue("smile");
    expect(controller.search_vocabulary).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(300);
    expect(controller.search_vocabulary).toHaveBeenCalledWith("smile");
  });

  it("shows a load-more control when next_cursor is present and appends results on click", async () => {
    const controller_search = vi.fn().mockResolvedValueOnce({
      results: [
        { record_id: 1, display_text: "smile", popularity: 10, match_kind: "exact", score: 1 },
      ],
      next_cursor: "cursor-1",
    });
    const state = build_state();
    const controller = build_controller(state);
    controller.search_vocabulary = controller_search;
    controller.load_more_vocabulary = vi.fn().mockResolvedValueOnce({
      results: [
        { record_id: 2, display_text: "smiling", popularity: 5, match_kind: "prefix", score: 0.5 },
      ],
      next_cursor: null,
    });

    const i18n = createI18n({
      legacy: false,
      locale: "en",
      fallbackLocale: "en",
      messages: { en: en_messages, "zh-CN": zh_cn_messages },
    });
    mount(AssetsView, {
      props: { state, controller },
      global: { plugins: [i18n] },
      attachTo: document.body,
    });

    await click_tab("Vocabulary");
    const search_input = dom().find<HTMLInputElement>("#vocabulary-search-input");
    await search_input.setValue("smile");
    await vi.advanceTimersByTimeAsync(300);
    await flushPromises();

    expect(dom().text()).toContain("smile");
    const load_more = dom().find('button[aria-label="Next"]');
    expect(load_more.exists()).toBe(true);
    await load_more.trigger("click");
    await flushPromises();
    expect(controller.load_more_vocabulary).toHaveBeenCalledWith("cursor-1");
    expect(dom().text()).toContain("smiling");
  });

  it("installing a package is always an explicit click, never automatic on mount", () => {
    const state = build_state({
      vocabulary_catalog: [
        make_catalog_entry({ package_id: "tavern-canvas-baseline", bundled: true }),
      ],
    });
    const { controller } = mount_assets_view({ state });
    expect(controller.install_vocabulary_package).not.toHaveBeenCalled();
  });

  it("clicking install calls install_vocabulary_package for that entry", async () => {
    const entry = make_catalog_entry();
    const state = build_state({ vocabulary_catalog: [entry] });
    const { controller } = mount_assets_view({ state });
    await click_tab("Vocabulary");
    await dom().find('button[aria-label="Import package"]').trigger("click");
    await flushPromises();
    expect(controller.install_vocabulary_package).toHaveBeenCalledWith(entry, expect.any(Function));
  });

  it("after a successful install, re-issues the active search query (Worker recreate handoff)", async () => {
    const entry = make_catalog_entry();
    const state = build_state({ vocabulary_catalog: [entry] });
    const controller = build_controller(state);
    controller.search_vocabulary = vi.fn(() => Promise.resolve({ results: [], next_cursor: null }));
    controller.install_vocabulary_package = vi.fn(async () => {
      state.assets = {
        ...state.assets,
        vocabulary_install_command: { status: "success", result: undefined },
      };
    });

    const i18n = createI18n({
      legacy: false,
      locale: "en",
      fallbackLocale: "en",
      messages: { en: en_messages, "zh-CN": zh_cn_messages },
    });
    mount(AssetsView, {
      props: { state, controller },
      global: { plugins: [i18n] },
      attachTo: document.body,
    });

    await click_tab("Vocabulary");
    const search_input = dom().find<HTMLInputElement>("#vocabulary-search-input");
    await search_input.setValue("smile");
    await vi.advanceTimersByTimeAsync(300);
    await flushPromises();
    (controller.search_vocabulary as ReturnType<typeof vi.fn>).mockClear();

    await dom().find('button[aria-label="Import package"]').trigger("click");
    await flushPromises();

    expect(controller.search_vocabulary).toHaveBeenCalledWith("smile");
  });

  it("a catalog entry whose id/name reads as NSFW is hidden behind a disclosure, never shown by default", async () => {
    const nsfw_entry = make_catalog_entry({
      package_id: "legacy-nsfw-group-tree",
      display_name: { en: "NSFW pack", "zh-CN": "NSFW 包" },
    });
    const state = build_state({ vocabulary_catalog: [nsfw_entry] });
    mount_assets_view({ state });
    await click_tab("Vocabulary");
    expect(dom().text()).not.toContain("NSFW pack");
    expect(dom().text()).toContain("Show packages that may include adult content");
  });

  it("expanding the NSFW disclosure reveals the entry but still requires an explicit install click", async () => {
    const nsfw_entry = make_catalog_entry({
      package_id: "legacy-nsfw-group-tree",
      display_name: { en: "NSFW pack", "zh-CN": "NSFW 包" },
    });
    const state = build_state({ vocabulary_catalog: [nsfw_entry] });
    const { controller } = mount_assets_view({ state });
    await click_tab("Vocabulary");
    await dom().find('button[aria-expanded="false"]').trigger("click");
    expect(dom().text()).toContain("NSFW pack");
    expect(controller.install_vocabulary_package).not.toHaveBeenCalled();
  });
});
