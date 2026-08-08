import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { DOMWrapper, flushPromises, mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";
import { createI18n } from "vue-i18n";

import type { Uuid } from "@tavern-canvas/contracts";
import { en_messages } from "../../../i18n/locales/en.js";
import { zh_cn_messages } from "../../../i18n/locales/zh_cn.js";
import AppSelect from "../../components/AppSelect.vue";
import type { GalleryRecordSummary } from "../../contracts/ui_capabilities.js";
import { IDLE_COMMAND_STATE, type StudioState } from "../../contracts/view_models.js";
import type { StudioController } from "../../controllers/studio_controller.js";
import GalleryTile from "./GalleryTile.vue";
import GalleryView from "./GalleryView.vue";
import ImageGrid from "./ImageGrid.vue";

const FIXTURES_DIR = resolve(import.meta.dirname, "../../../../../../tests/fixtures/ui");
const DETAILED_PNG = new Uint8Array(readFileSync(resolve(FIXTURES_DIR, "detailed.png")));
const PORTRAIT_PNG = new Uint8Array(readFileSync(resolve(FIXTURES_DIR, "portrait.png")));

function make_record(overrides: Partial<GalleryRecordSummary> = {}): GalleryRecordSummary {
  return {
    id: "11111111-1111-4111-8111-111111111111" as Uuid,
    provider_id: "sd_webui",
    source_chat_id: "chat-1",
    source_message_id: 1,
    media_type: "image/png",
    width: 640,
    height: 480,
    pinned: false,
    quarantined: false,
    created_at: "2026-01-01T00:00:00.000Z",
    ...overrides,
  };
}

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

// ---------------------------------------------------------------------------
// GalleryTile: mounted directly. TanStack Vue Virtual (ImageGrid's VirtualList) reads the real
// scroll element's offsetHeight/offsetWidth to decide which rows are visible -- happy-dom (this
// repo's test environment) has no layout engine and always reports 0 there, so it never actually
// renders a virtualized row's content (the same class of Reka/TanStack-internal, real-DOM-only
// limitation already ledgered for SegmentedControl in Task 4's report). Tile-level behavior is
// therefore verified against GalleryTile directly, and GalleryView-level interactions below drive
// ImageGrid's `open`/`toggle-select` emits directly instead of a synthetic DOM click on a row that
// this environment cannot render.
// ---------------------------------------------------------------------------

describe("GalleryTile: stable dimensions before load, object URL lifecycle, failed fallback", () => {
  it("reserves its pixel box immediately, before the image byte fetch resolves", () => {
    let resolve_bytes!: (bytes: Uint8Array) => void;
    const pending = new Promise<Uint8Array>((res) => {
      resolve_bytes = res;
    });
    const wrapper = mount(GalleryTile, {
      props: {
        record: make_record(),
        pixelWidth: 234,
        rowHeight: 176,
        selected: false,
        readBytes: () => pending,
        thumbnailFailedLabel: "Thumbnail unavailable",
        pinnedLabel: "Pin",
        selectLabel: "Select",
        openLabel: "Open",
      },
    });
    const style = wrapper.attributes("style") ?? "";
    expect(style).toContain("width: 234px");
    expect(style).toContain("height: 176px");
    resolve_bytes(DETAILED_PNG);
  });

  it("creates an object URL once bytes resolve and revokes it on unmount", async () => {
    const create_spy = vi.spyOn(URL, "createObjectURL");
    const revoke_spy = vi.spyOn(URL, "revokeObjectURL");
    const wrapper = mount(GalleryTile, {
      props: {
        record: make_record(),
        pixelWidth: 176,
        rowHeight: 176,
        selected: false,
        readBytes: () => Promise.resolve(DETAILED_PNG),
        thumbnailFailedLabel: "Thumbnail unavailable",
        pinnedLabel: "Pin",
        selectLabel: "Select",
        openLabel: "Open",
      },
    });
    await flushPromises();
    expect(create_spy).toHaveBeenCalledTimes(1);
    expect(wrapper.find("img").exists()).toBe(true);

    wrapper.unmount();
    expect(revoke_spy).toHaveBeenCalledTimes(1);
  });

  it("shows a composed fallback (icon + message), not a blank tile, when the byte fetch rejects", async () => {
    const wrapper = mount(GalleryTile, {
      props: {
        record: make_record(),
        pixelWidth: 176,
        rowHeight: 176,
        selected: false,
        readBytes: () => Promise.reject(new Error("missing blob")),
        thumbnailFailedLabel: "Thumbnail unavailable",
        pinnedLabel: "Pin",
        selectLabel: "Select",
        openLabel: "Open",
      },
    });
    await flushPromises();
    expect(wrapper.find("img").exists()).toBe(false);
    expect(wrapper.text()).toContain("Thumbnail unavailable");
  });

  it("emits open on the main button and toggle-select on the corner control, independently", async () => {
    const wrapper = mount(GalleryTile, {
      props: {
        record: make_record(),
        pixelWidth: 176,
        rowHeight: 176,
        selected: false,
        readBytes: () => Promise.resolve(DETAILED_PNG),
        thumbnailFailedLabel: "Thumbnail unavailable",
        pinnedLabel: "Pin",
        selectLabel: "Select",
        openLabel: "Open",
      },
    });
    await wrapper.find("[aria-pressed]").trigger("click");
    expect(wrapper.emitted("toggle-select")).toHaveLength(1);
    expect(wrapper.emitted("open")).toBeUndefined();

    await wrapper.find("button:not([aria-pressed])").trigger("click");
    expect(wrapper.emitted("open")).toHaveLength(1);
  });

  it("shows the pinned badge only for a pinned record", () => {
    const pinned = mount(GalleryTile, {
      props: {
        record: make_record({ pinned: true }),
        pixelWidth: 176,
        rowHeight: 176,
        selected: false,
        readBytes: () => new Promise<Uint8Array>(() => {}),
        thumbnailFailedLabel: "Thumbnail unavailable",
        pinnedLabel: "Pin",
        selectLabel: "Select",
        openLabel: "Open",
      },
    });
    expect(pinned.find('[aria-label="Pin"]').exists()).toBe(true);
    pinned.unmount();

    const unpinned = mount(GalleryTile, {
      props: {
        record: make_record({ pinned: false }),
        pixelWidth: 176,
        rowHeight: 176,
        selected: false,
        readBytes: () => new Promise<Uint8Array>(() => {}),
        thumbnailFailedLabel: "Thumbnail unavailable",
        pinnedLabel: "Pin",
        selectLabel: "Select",
        openLabel: "Open",
      },
    });
    expect(unpinned.find('[aria-label="Pin"]').exists()).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// GalleryView
// ---------------------------------------------------------------------------

function build_state(overrides: Partial<StudioState["gallery"]> = {}): StudioState {
  return {
    route: "gallery",
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
    },
    gallery: {
      records: [],
      selected_record_id: null,
      bulk_delete_command: IDLE_COMMAND_STATE,
      ...overrides,
    },
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
    load_vocabulary_catalog: vi.fn(() => Promise.resolve()),
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
    read_gallery_bytes: vi.fn(() => Promise.resolve(DETAILED_PNG)),
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
    set_gateway_token: vi.fn(() => Promise.resolve()),
    clear_gateway_token: vi.fn(() => Promise.resolve()),
    set_vocabulary_update_channel: vi.fn(() => Promise.resolve()),
    export_settings_archive: vi.fn(() => Promise.resolve(new Blob())),
    import_settings_archive: vi.fn(() => Promise.resolve()),
    load_diagnostics_timeline: vi.fn(() => Promise.resolve()),
    confirm_legacy_cleanup: vi.fn(() => Promise.resolve()),
  };
}

interface MountOptions {
  readonly state?: StudioState;
  readonly controller?: StudioController & { state: StudioState };
}

function mount_gallery_view(options: MountOptions = {}) {
  const state = options.state ?? build_state();
  const controller = options.controller ?? build_controller(state);
  const i18n = createI18n({
    legacy: false,
    locale: "en",
    fallbackLocale: "en",
    messages: { en: en_messages, "zh-CN": zh_cn_messages },
  });

  const wrapper = mount(GalleryView, {
    props: { state, controller, gridWidthOverride: 900, gridHeightOverride: 600 },
    global: { plugins: [i18n] },
    attachTo: document.body,
  });

  return { wrapper, state, controller };
}

/** AppDialog/ImagePreviewDialog/ConfirmDialog/AppSelect all teleport their real content to a
 * sibling of the mounted root -- see the identical note in AssetsView.test.ts. */
function dom(): DOMWrapper<HTMLElement> {
  return new DOMWrapper(document.body);
}

/** Simulates "the user opened this record's tile" without depending on TanStack Virtual actually
 * rendering a row (see the module-level comment above) -- emits ImageGrid's real `open` event,
 * which GalleryView's real `open_preview` handler (and everything downstream of it: the preview
 * dialog, the controller calls) still runs exactly as it would from a real click. */
function open_tile(
  wrapper: ReturnType<typeof mount_gallery_view>["wrapper"],
  record_id: string,
): void {
  wrapper.findComponent(ImageGrid).vm.$emit("open", record_id);
}

function toggle_tile_select(
  wrapper: ReturnType<typeof mount_gallery_view>["wrapper"],
  record_id: string,
): void {
  wrapper.findComponent(ImageGrid).vm.$emit("toggle-select", record_id);
}

describe("GalleryView: state surface and data flow into ImageGrid", () => {
  it("shows a skeleton grid while gallery is loading", () => {
    const state = build_state();
    state.loading = new Set(["gallery"]);
    mount_gallery_view({ state });
    expect(dom().findAll('[class*="skeletonTile"]').length).toBeGreaterThan(0);
  });

  it("shows the composed empty state with no records and not loading", () => {
    mount_gallery_view();
    expect(dom().text()).toContain("No generated images yet");
    expect(dom().text()).toContain("Generate an image from the Workbench");
  });

  // Regression test for the fix-wave a11y-correctness finding: each tile's select toggle and
  // open-preview button were previously wired to `common.actions.select_all` ("Select all") and
  // `gallery.download_action` ("Download") -- non-empty and unique, so the pre-existing e2e
  // "accessible names" checks passed, but the announced names were wrong for what the controls
  // actually do (a single-image toggle, an open-preview action, not "select all"/"download").
  it("passes the correct select/open-preview accessible-name labels to ImageGrid, not select_all/download", () => {
    const state = build_state({ records: [make_record()] });
    const { wrapper } = mount_gallery_view({ state });
    const grid = wrapper.findComponent(ImageGrid);
    expect(grid.props("selectLabel")).toBe("Select image");
    expect(grid.props("openLabel")).toBe("Open preview");
    expect(grid.props("selectLabel")).not.toBe("Select all");
    expect(grid.props("openLabel")).not.toBe("Download");
  });

  it("passes every loaded record through to ImageGrid once ready", () => {
    const records = Array.from({ length: 40 }, (_unused, index) =>
      make_record({
        id: `22222222-2222-4222-8222-2222222222${String(index).padStart(2, "0")}` as Uuid,
      }),
    );
    const state = build_state({ records });
    const { wrapper } = mount_gallery_view({ state });
    expect(wrapper.findComponent(ImageGrid).props("records")).toHaveLength(40);
  });
});

describe("filters", () => {
  it("pinned-only filter reduces the records handed to ImageGrid", async () => {
    const pinned = make_record({
      id: "33333333-3333-4333-8333-333333333333" as Uuid,
      pinned: true,
    });
    const unpinned = make_record({
      id: "44444444-4444-4444-8444-444444444444" as Uuid,
      pinned: false,
    });
    const state = build_state({ records: [pinned, unpinned] });
    const { wrapper } = mount_gallery_view({ state });
    expect(wrapper.findComponent(ImageGrid).props("records")).toHaveLength(2);

    const pinned_switch = dom().findAll('button[role="switch"]')[0];
    await pinned_switch?.trigger("click");
    await flushPromises();
    expect(wrapper.findComponent(ImageGrid).props("records")).toHaveLength(1);
  });

  it("orphaned-only filter shows only quarantined records (the detach signal)", async () => {
    const attached = make_record({
      id: "55555555-5555-4555-8555-555555555555" as Uuid,
      quarantined: false,
    });
    const orphaned = make_record({
      id: "66666666-6666-4666-8666-666666666666" as Uuid,
      quarantined: true,
    });
    const state = build_state({ records: [attached, orphaned] });
    const { wrapper } = mount_gallery_view({ state });

    const orphaned_switch = dom().findAll('button[role="switch"]')[1];
    await orphaned_switch?.trigger("click");
    await flushPromises();
    const remaining = wrapper
      .findComponent(ImageGrid)
      .props("records") as readonly GalleryRecordSummary[];
    expect(remaining).toHaveLength(1);
    expect(remaining[0]?.id).toBe(orphaned.id);
  });

  it("provider filter narrows to the selected provider", async () => {
    const sd = make_record({
      id: "77777777-7777-4777-8777-777777777777" as Uuid,
      provider_id: "sd_webui",
    });
    const nai = make_record({
      id: "88888888-8888-4888-8888-888888888888" as Uuid,
      provider_id: "novelai",
    });
    const state = build_state({ records: [sd, nai] });
    const { wrapper } = mount_gallery_view({ state });
    // AppSelect's own interactive open/select flow is Reka-internal pointer-event driven (see
    // AssetsView.test.ts's outfit-dropdown test); here the underlying data flow is asserted by
    // driving the same v-model update the component would emit.
    wrapper.findComponent(AppSelect).vm.$emit("update:modelValue", "novelai");
    await flushPromises();
    const remaining = wrapper
      .findComponent(ImageGrid)
      .props("records") as readonly GalleryRecordSummary[];
    expect(remaining).toHaveLength(1);
    expect(remaining[0]?.provider_id).toBe("novelai");
  });
});

describe("cache occupancy", () => {
  it("renders storage usage and quota from the diagnostics snapshot", () => {
    const state = build_state();
    state.diagnostics = {
      ...state.diagnostics,
      snapshot: {
        capability_matrix: {},
        helper_version: null,
        protocol_version: null,
        storage_usage_bytes: 52_428_800,
        storage_quota_bytes: 1_073_741_824,
      },
    };
    mount_gallery_view({ state });
    expect(dom().text()).toContain("Local cache usage");
  });

  it("omits the cache occupancy line when no storage estimate is available", () => {
    mount_gallery_view();
    expect(dom().text()).not.toContain("Local cache usage");
  });
});

describe("preview dialog: parameter inspector, copy, hand-offs, pin, detach, delete", () => {
  it("opening a tile loads the preview and selects the record for the inspector", async () => {
    const record = make_record();
    const state = build_state({ records: [record] });
    const { wrapper, controller } = mount_gallery_view({ state });
    open_tile(wrapper, record.id);
    await flushPromises();
    expect(controller.select_gallery_record).toHaveBeenCalledWith(record.id);
    expect(controller.select_inspector_record).toHaveBeenCalledWith({
      kind: "gallery_record",
      record_id: record.id,
      intent: "view",
    });
    expect(dom().find('[role="dialog"]').exists()).toBe(true);
  });

  it("extracts and displays the real embedded sd_webui parameters from the fixture bytes", async () => {
    const record = make_record();
    const state = build_state({ records: [record] });
    const { wrapper } = mount_gallery_view({ state });
    open_tile(wrapper, record.id);
    await flushPromises();
    await flushPromises();
    expect(dom().text()).toContain("123456789"); // seed
    expect(dom().text()).toContain("tavern-canvas-fixture-v1"); // model
  });

  it("shows a composed 'no parameters' message for an image with no embedded metadata", async () => {
    const record = make_record();
    const state = build_state({ records: [record] });
    const controller = build_controller(state);
    controller.read_gallery_bytes = vi.fn(() => Promise.resolve(PORTRAIT_PNG));
    const { wrapper } = mount_gallery_view({ state, controller });
    open_tile(wrapper, record.id);
    await flushPromises();
    await flushPromises();
    expect(dom().text()).toContain("No embedded generation parameters were found");
  });

  it("copy parameters writes the raw parameter text to the clipboard and shows a toast", async () => {
    const write_text = vi.fn(() => Promise.resolve());
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: write_text },
      configurable: true,
    });
    const record = make_record();
    const state = build_state({ records: [record] });
    const { wrapper } = mount_gallery_view({ state });
    open_tile(wrapper, record.id);
    await flushPromises();
    await flushPromises();
    await dom().find('button[aria-label="Copy parameters"]').trigger("click");
    await flushPromises();
    expect(write_text).toHaveBeenCalledWith(expect.stringContaining("Seed: 123456789"));
    expect(dom().text()).toContain("Parameters copied");
  });

  it("modify prompt hands off with the extracted prompt prefilled and navigates to Workbench", async () => {
    const record = make_record();
    const state = build_state({ records: [record] });
    const { wrapper, controller } = mount_gallery_view({ state });
    open_tile(wrapper, record.id);
    await flushPromises();
    await flushPromises();
    await dom().find('button[aria-label="Modify prompt"]').trigger("click");
    expect(controller.select_inspector_record).toHaveBeenCalledWith({
      kind: "gallery_record",
      record_id: record.id,
      intent: "modify_prompt",
      prefill: {
        positive_prompt: "a detailed mosaic tile study, vivid color blocks, high texture",
        negative_prompt: "blurry, low detail",
      },
    });
    expect(controller.set_route).toHaveBeenCalledWith("workbench");
  });

  it("regenerate hands off with the same prefilled prompt and navigates to Workbench", async () => {
    const record = make_record();
    const state = build_state({ records: [record] });
    const { wrapper, controller } = mount_gallery_view({ state });
    open_tile(wrapper, record.id);
    await flushPromises();
    await flushPromises();
    await dom().find('button[aria-label="Regenerate"]').trigger("click");
    expect(controller.select_inspector_record).toHaveBeenCalledWith(
      expect.objectContaining({
        intent: "regenerate",
        prefill: expect.objectContaining({
          positive_prompt: "a detailed mosaic tile study, vivid color blocks, high texture",
        }),
      }),
    );
    expect(controller.set_route).toHaveBeenCalledWith("workbench");
  });

  it("modify prompt still navigates, with no prefill, when the image has no embedded parameters", async () => {
    const record = make_record();
    const state = build_state({ records: [record] });
    const controller = build_controller(state);
    controller.read_gallery_bytes = vi.fn(() => Promise.resolve(PORTRAIT_PNG));
    const { wrapper } = mount_gallery_view({ state, controller });
    open_tile(wrapper, record.id);
    await flushPromises();
    await flushPromises();
    await dom().find('button[aria-label="Modify prompt"]').trigger("click");
    expect(controller.select_inspector_record).toHaveBeenCalledWith({
      kind: "gallery_record",
      record_id: record.id,
      intent: "modify_prompt",
      prefill: { positive_prompt: null, negative_prompt: null },
    });
    expect(controller.set_route).toHaveBeenCalledWith("workbench");
  });

  it("edit and inpaint hand off through the inspector selection channel", async () => {
    const record = make_record();
    const state = build_state({ records: [record] });
    const { wrapper, controller } = mount_gallery_view({ state });
    open_tile(wrapper, record.id);
    await flushPromises();
    (controller.select_inspector_record as ReturnType<typeof vi.fn>).mockClear();
    (controller.set_route as ReturnType<typeof vi.fn>).mockClear();

    await dom().find('button[aria-label="Edit image"]').trigger("click");
    expect(controller.select_inspector_record).toHaveBeenCalledWith(
      expect.objectContaining({ kind: "gallery_record", record_id: record.id, intent: "edit" }),
    );
    expect(controller.set_route).toHaveBeenCalledWith("workbench");

    open_tile(wrapper, record.id);
    await flushPromises();
    await dom().find('button[aria-label="Inpaint"]').trigger("click");
    expect(controller.select_inspector_record).toHaveBeenCalledWith(
      expect.objectContaining({ kind: "gallery_record", record_id: record.id, intent: "inpaint" }),
    );
  });

  it("keeps source-message navigation disabled: no host exposes a chat-navigation hook", async () => {
    const record = make_record();
    const state = build_state({ records: [record] });
    const { wrapper, controller } = mount_gallery_view({ state });
    open_tile(wrapper, record.id);
    await flushPromises();
    (controller.select_inspector_record as ReturnType<typeof vi.fn>).mockClear();
    (controller.set_route as ReturnType<typeof vi.fn>).mockClear();

    const source_message_button = dom().find('button[aria-label="Go to source message"]');
    expect(source_message_button.attributes("disabled")).toBeDefined();
    expect(dom().text()).toContain(
      "Jumping to the source message is not available in this version yet.",
    );

    await source_message_button.trigger("click");
    expect(controller.select_inspector_record).not.toHaveBeenCalled();
    expect(controller.set_route).not.toHaveBeenCalled();
  });

  it("pin toggles pinned state via pin_gallery_record", async () => {
    const record = make_record({ pinned: false });
    const state = build_state({ records: [record] });
    const { wrapper, controller } = mount_gallery_view({ state });
    open_tile(wrapper, record.id);
    await flushPromises();
    await dom().find('button[aria-label="Pin"]').trigger("click");
    expect(controller.pin_gallery_record).toHaveBeenCalledWith(record.id, true);
  });

  it("detaching from a message is a distinct confirmed action from deleting", async () => {
    const record = make_record();
    const state = build_state({ records: [record] });
    const { wrapper, controller } = mount_gallery_view({ state });
    open_tile(wrapper, record.id);
    await flushPromises();
    await dom().find('button[aria-label="Detach from message"]').trigger("click");
    await flushPromises();
    expect(controller.detach_gallery_record).not.toHaveBeenCalled();
    expect(controller.delete_gallery_record).not.toHaveBeenCalled();
    // The detach confirm dialog's own confirm button says "Detach from message", not the
    // generic "Delete" -- confirming this action must never read as if it deletes the image.
    await dom()
      .find('[role="alertdialog"] button[aria-label="Detach from message"]')
      .trigger("click");
    await flushPromises();
    expect(controller.detach_gallery_record).toHaveBeenCalledWith(record.id);
    expect(controller.delete_gallery_record).not.toHaveBeenCalled();
  });

  it("deleting the record requires its own separate confirmation", async () => {
    const record = make_record();
    const state = build_state({ records: [record] });
    const { wrapper, controller } = mount_gallery_view({ state });
    open_tile(wrapper, record.id);
    await flushPromises();
    const delete_buttons = dom().findAll('button[aria-label="Delete"]');
    await delete_buttons[delete_buttons.length - 1]?.trigger("click");
    await flushPromises();
    await dom().find('[role="alertdialog"] button[aria-label="Delete"]').trigger("click");
    await flushPromises();
    expect(controller.delete_gallery_record).toHaveBeenCalledWith(record.id);
    expect(controller.detach_gallery_record).not.toHaveBeenCalled();
  });
});

describe("multi-select and batch actions", () => {
  it("selecting two tiles shows the bulk action bar with the correct count", async () => {
    const a = make_record({ id: "99999999-9999-4999-8999-999999999999" as Uuid });
    const b = make_record({ id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa" as Uuid });
    const state = build_state({ records: [a, b] });
    const { wrapper } = mount_gallery_view({ state });
    toggle_tile_select(wrapper, a.id);
    toggle_tile_select(wrapper, b.id);
    await flushPromises();
    expect(dom().text()).toContain("2 images selected");
  });

  it("batch download reads bytes for every selected record", async () => {
    const a = make_record({ id: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb" as Uuid });
    const b = make_record({ id: "cccccccc-cccc-4ccc-8ccc-cccccccccccc" as Uuid });
    const state = build_state({ records: [a, b] });
    const { wrapper, controller } = mount_gallery_view({ state });
    toggle_tile_select(wrapper, a.id);
    toggle_tile_select(wrapper, b.id);
    await flushPromises();
    (controller.read_gallery_bytes as ReturnType<typeof vi.fn>).mockClear();
    await dom().find('button[aria-label="Download selected"]').trigger("click");
    await flushPromises();
    expect(controller.read_gallery_bytes).toHaveBeenCalledWith(a.id);
    expect(controller.read_gallery_bytes).toHaveBeenCalledWith(b.id);
  });

  it("batch delete requires confirmation, then calls bulk_delete_gallery_records with every selected id", async () => {
    const a = make_record({ id: "dddddddd-dddd-4ddd-8ddd-dddddddddddd" as Uuid });
    const b = make_record({ id: "eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee" as Uuid });
    const state = build_state({ records: [a, b] });
    const { wrapper, controller } = mount_gallery_view({ state });
    toggle_tile_select(wrapper, a.id);
    toggle_tile_select(wrapper, b.id);
    await flushPromises();

    await dom().find('button[aria-label="Delete selected"]').trigger("click");
    await flushPromises();
    expect(controller.bulk_delete_gallery_records).not.toHaveBeenCalled();

    await dom().find('[role="alertdialog"] button[aria-label="Delete"]').trigger("click");
    await flushPromises();
    expect(controller.bulk_delete_gallery_records).toHaveBeenCalledWith([a.id, b.id]);
  });

  it("clearing the selection empties it without calling any destructive command", async () => {
    const a = make_record({ id: "ffffffff-ffff-4fff-8fff-ffffffffffff" as Uuid });
    const state = build_state({ records: [a] });
    const { wrapper, controller } = mount_gallery_view({ state });
    toggle_tile_select(wrapper, a.id);
    await flushPromises();
    expect(dom().text()).toContain("1 image selected");
    await dom().find('button[aria-label="Deselect all"]').trigger("click");
    await flushPromises();
    expect(dom().text()).not.toContain("1 image selected");
    expect(controller.bulk_delete_gallery_records).not.toHaveBeenCalled();
  });
});

describe("GalleryView: toast notification region", () => {
  // Regression test for the fix-wave a11y-correctness finding: the toast region was previously
  // labeled with common.actions.copy ("Copy") and the "Parameters copied" toast text itself,
  // announcing the notification region as something unrelated to notifications.
  it("names the toast notification region correctly, not Copy/copied", async () => {
    mount_gallery_view();
    await nextTick();
    await nextTick();
    expect(dom().find('[role="region"][aria-label="Notifications"]').exists()).toBe(true);
    expect(document.querySelector('[role="region"][aria-label="Copy"]')).toBeNull();
  });
});
