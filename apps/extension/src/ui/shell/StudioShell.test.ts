import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

import { DOMWrapper, flushPromises, mount } from "@vue/test-utils";
import postcss, { type Rule } from "postcss";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { markRaw, nextTick } from "vue";
import { createI18n } from "vue-i18n";

import { PORTAL_TARGET_KEY } from "../contracts/portal_keys.js";
import { create_studio_controller } from "../controllers/studio_controller.js";
import { create_unavailable_capabilities } from "../controllers/unavailable_capabilities.js";
import { IDLE_COMMAND_STATE, type StudioState } from "../contracts/view_models.js";
import { en_messages } from "../../i18n/locales/en.js";
import { zh_cn_messages } from "../../i18n/locales/zh_cn.js";
import StudioShell from "./StudioShell.vue";

function build_state(overrides: Partial<StudioState> = {}): StudioState {
  return {
    route: "settings",
    settings_section: "illustration",
    color_mode: "light",
    loading: new Set(),
    failures: new Map(),
    generation: {
      profiles: [],
      active_profile_id: null,
      jobs: [],
    },
    llm_connections: { connections: [], selected_connection_id: null },
    prompt: {
      presets: [],
      selected_preset_id: null,
      draft: null,
      save_command: IDLE_COMMAND_STATE,
    },
    assets: {
      active_category: "character",
      records: { character: [], outfit: [], lora: [], vibe: [], workflow: [], prompt_tag: [] },
      vocabulary_catalog: [],
      vocabulary_install_command: IDLE_COMMAND_STATE,
    },
    gallery: { records: [], selected_record_id: null, bulk_delete_command: IDLE_COMMAND_STATE },
    diagnostics: {
      snapshot: null,
      timeline: [],
      connection_test_command: IDLE_COMMAND_STATE,
      support_bundle_command: IDLE_COMMAND_STATE,
    },
    settings: {
      settings: null,
      vocabulary_update_channel: null,
      browser_secret_vault: { state: "unavailable", secret_count: 0 },
      update_command: IDLE_COMMAND_STATE,
    },
    inspector: { collapsed: false, width: 320, selected_record: null },
    tasks: [],
    ...overrides,
  };
}

beforeAll(async () => {
  await Promise.all([
    import("../views/gallery/GalleryView.vue"),
    import("../views/settings/SettingsView.vue"),
    import("./ContextInspector.vue"),
    import("./DesktopIconRail.vue"),
    import("./InspectorSheet.vue"),
    import("./MobileBottomNav.vue"),
  ]);
}, 60_000);

interface MountOptions {
  readonly state?: Partial<StudioState>;
  readonly viewport?: "desktop" | "mobile";
  readonly locale?: "en" | "zh-CN";
  readonly messages?: Record<string, unknown>;
}

async function mount_shell(options: MountOptions = {}) {
  const i18n = createI18n({
    legacy: false,
    locale: options.locale ?? "en",
    fallbackLocale: "en",
    messages: {
      en: (options.messages?.en ?? en_messages) as typeof en_messages,
      "zh-CN": (options.messages?.["zh-CN"] ?? zh_cn_messages) as typeof zh_cn_messages,
    },
  });

  const portal_target = document.createElement("div");
  portal_target.dataset.shadowRole = "portal";
  document.body.append(portal_target);

  const host = document.createElement("div");
  document.body.append(host);

  const controller = markRaw(
    create_studio_controller({ capabilities: create_unavailable_capabilities() }),
  );

  const wrapper = mount(StudioShell, {
    props: {
      state: build_state(options.state),
      controller,
      viewport: options.viewport ?? "desktop",
    },
    global: {
      plugins: [i18n],
      provide: { [PORTAL_TARGET_KEY]: portal_target },
    },
    attachTo: host,
  });

  await flushPromises();
  return { wrapper, portal_target, host, controller };
}

afterEach(() => {
  document.body.innerHTML = "";
});

describe("StudioShell layout contract (shell.module.css)", () => {
  let css_text: string;
  let rules_by_selector: Map<string, Rule[]>;

  beforeAll(async () => {
    const css_path = resolve(import.meta.dirname, "shell.module.css");
    css_text = await readFile(css_path, "utf8");
    const root = postcss.parse(css_text);
    rules_by_selector = new Map();
    root.walkRules((rule) => {
      const list = rules_by_selector.get(rule.selector) ?? [];
      list.push(rule);
      rules_by_selector.set(rule.selector, list);
    });
  });

  function declaration(selector: string, prop: string): string | undefined {
    for (const rule of rules_by_selector.get(selector) ?? []) {
      for (const decl of rule.nodes) {
        if (decl.type === "decl" && decl.prop === prop) {
          return decl.value;
        }
      }
    }
    return undefined;
  }

  it("desktop: 56px top bar, 64px rail, fluid workspace, inspector clamped 320-400px, auto task strip", () => {
    const columns = declaration('.shell[data-viewport="desktop"]', "grid-template-columns");
    const rows = declaration('.shell[data-viewport="desktop"]', "grid-template-rows");
    expect(columns).toBeDefined();
    expect(rows).toBeDefined();
    expect(columns).toMatch(/(?:^|\s)64px(?:\s|$)/u);
    expect(columns).toMatch(/minmax\(0,\s*1fr\)/u);
    expect(columns).toMatch(/clamp\(320px,\s*var\(--tc-inspector-width[^)]*\),\s*400px\)/u);
    expect(rows?.split(/\s+/u)[0]).toBe("56px");
    expect(rows?.trim().endsWith("auto")).toBe(true);
  });

  it("mobile: 100dvh, one content layer, 56px top bar row, safe-area padding on the bottom nav", () => {
    const height = declaration('.shell[data-viewport="mobile"]', "height");
    const rows = declaration('.shell[data-viewport="mobile"]', "grid-template-rows");
    expect(height).toBe("100dvh");
    expect(rows?.split(/\s+/u)[0]).toBe("56px");

    const safe_area = declaration(".bottom_nav", "padding-bottom");
    expect(safe_area).toMatch(/env\(safe-area-inset-bottom/u);
  });

  it("mobile grid-template-areas reserves a taskstrip row, so .task_strip's grid-area actually resolves", () => {
    const areas = declaration('.shell[data-viewport="mobile"]', "grid-template-areas");
    expect(areas).toMatch(/taskstrip/u);
    const rows = declaration('.shell[data-viewport="mobile"]', "grid-template-rows");
    expect(rows).toMatch(/^56px\s+minmax\(0,\s*1fr\)\s+auto\s+64px$/u);
  });

  it("desktop rail and mobile bottom-nav items declare fixed dimensions with no per-state override", () => {
    expect(declaration(".rail_button", "width")).toBe("48px");
    expect(declaration(".rail_button", "height")).toBe("48px");
    expect(declaration('.rail_button[data-selected="true"]', "width")).toBeUndefined();
    expect(declaration('.rail_button[data-selected="true"]', "height")).toBeUndefined();
  });

  it("long labels truncate instead of growing their container: ellipsis + nowrap + hidden overflow", () => {
    for (const selector of [".task_chip_label", ".bottom_nav_item_label", ".top_bar_title"]) {
      expect(declaration(selector, "white-space"), selector).toBe("nowrap");
      expect(declaration(selector, "text-overflow"), selector).toBe("ellipsis");
      expect(declaration(selector, "overflow"), selector).toBe("hidden");
    }
    expect(declaration(".task_chip", "max-width")).toBeDefined();
  });

  it("shell sections are unframed bands separated by 1px dividers, never wrapped in a card", () => {
    expect(declaration(".top_bar", "border-bottom")).toMatch(/^1px solid var\(--tc-divider\)$/u);
    expect(declaration(".rail", "border-right")).toMatch(/^1px solid var\(--tc-divider\)$/u);
    expect(declaration(".inspector", "border-left")).toMatch(/^1px solid var\(--tc-divider\)$/u);
    expect(declaration(".task_strip", "border-top")).toMatch(/^1px solid var\(--tc-divider\)$/u);
    expect(declaration(".workspace", "border-radius")).toBeUndefined();
    expect(declaration(".inspector", "border-radius")).toBeUndefined();
  });
});

describe("StudioShell desktop navigation", () => {
  it("exposes settings and gallery in the rail with a visible selected state", async () => {
    const { wrapper } = await mount_shell({ state: { route: "gallery" } });
    const rail_buttons = wrapper.findAll('[data-testid="studio-rail"] > button');
    expect(rail_buttons.map((button) => button.attributes("aria-label"))).toEqual([
      "Settings",
      "Gallery",
    ]);

    const selected = wrapper.find('button[aria-current="page"]');
    expect(selected.attributes("aria-label")).toBe("Gallery");
    expect(selected.attributes("data-selected")).toBe("true");
  });

  it("activates a route on click and reports it through select-route", async () => {
    const { wrapper } = await mount_shell({ state: { route: "settings" } });
    const rail_buttons = wrapper.findAll('[data-testid="studio-rail"] > button');
    const gallery_button = rail_buttons.find(
      (button) => button.attributes("aria-label") === "Gallery",
    );
    expect(gallery_button).toBeDefined();

    await gallery_button?.trigger("click");

    expect(wrapper.emitted("select-route")).toEqual([["gallery"]]);
  });

  it("rail buttons are real <button> elements (native Enter/Space activation, no negative tabindex)", async () => {
    const { wrapper } = await mount_shell();
    for (const button of wrapper.findAll('[data-testid="studio-rail"] > button')) {
      expect(button.element.tagName).toBe("BUTTON");
      expect(button.attributes("tabindex")).not.toBe("-1");
    }
  });

  it("does not render the mobile bottom nav or inspector sheet on desktop", async () => {
    const { wrapper } = await mount_shell({ viewport: "desktop" });
    expect(wrapper.find('[data-testid="inspector-sheet"]').exists()).toBe(false);
  });

  it("tooltips portal into the injected Shadow-Root portal element, never document.body", async () => {
    const { wrapper, portal_target } = await mount_shell();
    const first_rail_button = wrapper.findAll('[data-testid="studio-rail"] > button')[0];
    await first_rail_button?.trigger("focus");
    await nextTick();
    await nextTick();
    await nextTick();

    const tooltip = portal_target.querySelector('[role="tooltip"]');
    expect(tooltip).not.toBeNull();
    expect(Array.from(document.body.children)).not.toContain(tooltip);
  });
});

describe("StudioShell mobile navigation", () => {
  it("shows the settings and gallery routes in the bottom nav", async () => {
    const { wrapper } = await mount_shell({ viewport: "mobile" });
    const items = wrapper.find('[data-testid="studio-bottom-nav"]').findAll("button");
    expect(items.map((item) => item.text())).toEqual(["Settings", "Gallery"]);
  });

  it("does not render the desktop rail or the persistent inspector column", async () => {
    const { wrapper } = await mount_shell({
      viewport: "mobile",
      state: { route: "gallery" },
    });
    expect(wrapper.find(".rail, nav.rail").exists()).toBe(false);
    expect(wrapper.find('[data-testid="inspector-toggle"]').exists()).toBe(true);
  });

  it("activates a route on click", async () => {
    const { wrapper } = await mount_shell({ viewport: "mobile", state: { route: "settings" } });
    const nav = wrapper.find('[data-testid="studio-bottom-nav"]');
    const gallery_button = nav.findAll("button").find((button) => button.text() === "Gallery");

    await gallery_button?.trigger("click");

    expect(wrapper.emitted("select-route")).toEqual([["gallery"]]);
  });
});

describe("StudioShell inspector", () => {
  it("leaves the global inspector out of the settings sections other than the library", async () => {
    const { wrapper } = await mount_shell();
    expect(wrapper.find('[data-testid="inspector-toggle"]').exists()).toBe(false);
    expect(wrapper.find(".inspector, [class*=inspector_panel]").exists()).toBe(false);
    expect(wrapper.attributes("data-inspector-collapsed")).toBe("true");
  });

  it("toggling the top-bar control reports the next collapsed value", async () => {
    const { wrapper } = await mount_shell({
      state: {
        route: "gallery",
        settings_section: "illustration",
        inspector: { collapsed: false, width: 320, selected_record: null },
      },
    });
    const toggle = wrapper.get('[data-testid="inspector-toggle"]');

    await toggle.trigger("click");

    expect(wrapper.emitted("set-inspector-collapsed")).toEqual([[true]]);
  });

  it("hides the inspector column and sets the collapsed grid track when collapsed", async () => {
    const { wrapper } = await mount_shell({
      state: {
        route: "gallery",
        settings_section: "illustration",
        inspector: { collapsed: true, width: 320, selected_record: null },
      },
    });
    expect(wrapper.find(".inspector, [class*=inspector_panel]").exists()).toBe(false);
    expect(wrapper.attributes("data-inspector-collapsed")).toBe("true");
  });

  it("keyboard-resizes the inspector from its separator handle and reports the new width", async () => {
    const { wrapper } = await mount_shell({
      state: {
        route: "gallery",
        settings_section: "illustration",
        inspector: { collapsed: false, width: 320, selected_record: null },
      },
    });
    const resizer = wrapper.get('[role="separator"]');

    await resizer.trigger("keydown", { key: "ArrowLeft" });

    expect(wrapper.emitted("resize-inspector")).toEqual([[336]]);
  });

  it("pointer-drags the inspector resizer and reports a clamped width", async () => {
    const { wrapper } = await mount_shell({
      state: {
        route: "gallery",
        settings_section: "illustration",
        inspector: { collapsed: false, width: 320, selected_record: null },
      },
    });
    const resizer = wrapper.get('[role="separator"]');

    await resizer.trigger("pointerdown", { clientX: 500, button: 0, pointerId: 1 });
    resizer.element.dispatchEvent(new PointerEvent("pointermove", { clientX: 460, pointerId: 1 }));
    await nextTick();

    const emitted = wrapper.emitted("resize-inspector");
    expect(emitted).toBeDefined();
    expect(emitted?.at(-1)).toEqual([360]);
  });

  it("renders a full-width sheet on mobile and returns focus to the trigger after it closes", async () => {
    const { wrapper, portal_target } = await mount_shell({
      viewport: "mobile",
      state: {
        route: "gallery",
        settings_section: "illustration",
        inspector: { collapsed: true, width: 320, selected_record: null },
      },
    });
    const toggle = wrapper.get('[data-testid="inspector-toggle"]');
    (toggle.element as HTMLElement).focus();
    expect(document.activeElement).toBe(toggle.element);

    await toggle.trigger("click");
    expect(wrapper.emitted("set-inspector-collapsed")).toEqual([[false]]);
    await wrapper.setProps({
      state: build_state({
        route: "gallery",
        settings_section: "illustration",
        inspector: { collapsed: false, width: 320, selected_record: null },
      }),
    });
    await nextTick();
    await nextTick();
    await nextTick();
    await nextTick();

    const sheet_element = portal_target.querySelector('[data-testid="inspector-sheet"]');
    expect(sheet_element).not.toBeNull();
    const sheet = new DOMWrapper(sheet_element as Element);

    await sheet.get('[aria-label="Close"]').trigger("click");
    const last_event = wrapper.emitted("set-inspector-collapsed")?.at(-1);
    expect(last_event).toEqual([true]);
    await wrapper.setProps({
      state: build_state({
        route: "gallery",
        settings_section: "illustration",
        inspector: { collapsed: true, width: 320, selected_record: null },
      }),
    });
    await nextTick();
    await nextTick();
    await nextTick();
    await nextTick();

    expect(document.activeElement).toBe(toggle.element);
  });
});

describe("StudioShell task strip", () => {
  it("renders nothing when there are no tasks", async () => {
    const { wrapper } = await mount_shell({ state: { tasks: [] } });
    expect(wrapper.find('[aria-label="Show tasks"], [aria-label="Hide tasks"]').exists()).toBe(
      false,
    );
  });

  it("shows a chip per task with a semantic status dot, and can collapse/expand", async () => {
    const { wrapper } = await mount_shell({
      state: {
        tasks: [
          { id: "job-1", label_code: "status.running", status: "pending", progress: 0.5 },
          { id: "job-2", label_code: "status.completed", status: "success", progress: null },
        ],
      },
    });

    const dots = wrapper.findAll("[data-status]");
    expect(dots).toHaveLength(2);
    expect(dots[0]?.attributes("data-status")).toBe("pending");
    expect(dots[1]?.attributes("data-status")).toBe("success");

    const collapse_button = wrapper.get('[aria-label="Hide tasks"]');
    await collapse_button.trigger("click");
    expect(wrapper.findAll("[data-status]")).toHaveLength(0);

    const expand_button = wrapper.get('[aria-label="Show tasks"]');
    await expand_button.trigger("click");
    expect(wrapper.findAll("[data-status]")).toHaveLength(2);
    expect(wrapper.text()).toContain("2 tasks");
  });

  it("changing a task's status text does not change the chip count or remove other chips", async () => {
    const { wrapper } = await mount_shell({
      state: {
        tasks: [{ id: "job-1", label_code: "status.pending", status: "pending", progress: null }],
      },
    });
    expect(wrapper.findAll("[data-status]")).toHaveLength(1);

    await wrapper.setProps({
      state: build_state({
        tasks: [{ id: "job-1", label_code: "status.completed", status: "success", progress: null }],
      }),
    });

    expect(wrapper.findAll("[data-status]")).toHaveLength(1);
    expect(wrapper.get("[data-status]").attributes("data-status")).toBe("success");
  });
});

describe("StudioShell shell-level states", () => {
  it("shows a skeleton matching the final layout while capabilities are still loading, not a spinner", async () => {
    const { wrapper } = await mount_shell({
      state: { loading: new Set(["generation", "settings"]) },
    });
    expect(wrapper.find('[data-testid="workspace-skeleton"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="workspace-placeholder"]').exists()).toBe(false);
    expect(wrapper.html()).not.toMatch(/spinner/iu);
  });

  it("shows a non-blocking partial-initialization banner without hiding the rest of the shell", async () => {
    const { wrapper } = await mount_shell({
      state: { failures: new Map([["gallery", { code: "capability_load_failed" }]]) },
    });
    const banner = wrapper.find('[data-testid="partial-banner"]');
    expect(banner.exists()).toBe(true);
    expect(banner.text()).toContain("Running with limited functionality");
    expect(wrapper.findAll('[data-testid="studio-rail"] > button')).toHaveLength(2);
  });

  it("navigates to Diagnostics from the partial-initialization banner", async () => {
    const { wrapper, controller } = await mount_shell({
      state: { failures: new Map([["gallery", { code: "capability_load_failed" }]]) },
    });
    await wrapper.get('[data-testid="partial-banner-diagnostics"]').trigger("click");
    expect(controller.state.settings_section).toBe("diagnostics");
  });

  it("renders the routed settings view once nothing is loading and nothing has failed", async () => {
    const { wrapper } = await mount_shell();
    await expect.poll(() => wrapper.find('[data-testid="settings-view"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="workspace-skeleton"]').exists()).toBe(false);
    expect(wrapper.find('[data-testid="partial-banner"]').exists()).toBe(false);
  });
});

describe("StudioShell narrow and long locale labels", () => {
  it("keeps both desktop routes and their accessible names when a label is unusually long", async () => {
    const long_label = "Gallery of every image generated for this chat and earlier chats";
    const messages = {
      en: { ...en_messages, nav: { ...en_messages.nav, gallery: long_label } },
    };
    const { wrapper } = await mount_shell({ messages });

    const buttons = wrapper.findAll('[data-testid="studio-rail"] > button');
    expect(buttons).toHaveLength(2);
    expect(buttons.some((button) => button.attributes("aria-label") === long_label)).toBe(true);
  });

  it("renders full zh-CN labels in the mobile bottom nav without dropping any item", async () => {
    const { wrapper } = await mount_shell({ viewport: "mobile", locale: "zh-CN" });
    const nav = wrapper.find('[data-testid="studio-bottom-nav"]');
    const items = nav.findAll("button");
    expect(items.map((item) => item.text())).toEqual(["设置", "图库"]);
  });
});
