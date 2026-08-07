import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

import { DOMWrapper, mount } from "@vue/test-utils";
import postcss, { type Rule } from "postcss";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { nextTick } from "vue";
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
    route: "workbench",
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
    ...overrides,
  };
}

interface MountOptions {
  readonly state?: Partial<StudioState>;
  readonly viewport?: "desktop" | "mobile";
  readonly locale?: "en" | "zh-CN";
  readonly messages?: Record<string, unknown>;
}

function mount_shell(options: MountOptions = {}) {
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

  // A real controller (over the same honest "unavailable" capabilities production uses --
  // unavailable_capabilities.ts) rather than a hand-rolled mock: StudioShell now mounts the
  // routed view for real (StudioWorkspace.vue), and every wired-through view expects a genuine
  // `StudioController` instance, not just a same-shaped object.
  const controller = create_studio_controller({ capabilities: create_unavailable_capabilities() });

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

  return { wrapper, portal_target, host };
}

afterEach(() => {
  document.body.innerHTML = "";
});

// ---------------------------------------------------------------------------
// Layout contract: parsed straight from shell.module.css (postcss, matching
// style_contract.test.ts's precedent) since happy-dom has no real layout engine to measure boxes.
// ---------------------------------------------------------------------------

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

  // Regression test: `.task_strip`'s `grid-area: taskstrip` (declared once, shared by both
  // viewports) silently no-ops when the current viewport's `grid-template-areas` has no
  // "taskstrip" area -- the item then falls into grid auto-placement, landing in an unplanned
  // implicit row that breaks the mobile shell's fixed 100dvh layout. Undetectable before the
  // fix wave that made `state.tasks` non-empty (TaskStrip never rendered on any viewport until
  // then), caught by an actual browser render (Playwright), not happy-dom.
  it("mobile grid-template-areas reserves a taskstrip row, so .task_strip's grid-area actually resolves", () => {
    const areas = declaration('.shell[data-viewport="mobile"]', "grid-template-areas");
    expect(areas).toMatch(/taskstrip/u);
    // 4 tracks: 56px topbar, flexible workspace, auto (content-sized) taskstrip, 64px bottomnav --
    // matched as a whole pattern rather than split on whitespace, since `minmax(0, 1fr)`'s own
    // internal comma-space would otherwise miscount as two tokens.
    const rows = declaration('.shell[data-viewport="mobile"]', "grid-template-rows");
    expect(rows).toMatch(/^56px\s+minmax\(0,\s*1fr\)\s+auto\s+64px$/u);
  });

  it("desktop rail and mobile bottom-nav items declare fixed dimensions with no per-state override", () => {
    // The base rule sets width/height once; no `[data-selected="true"]` (or any other state)
    // block may redeclare either, so a route button never changes size when it becomes selected.
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
    // The chip itself is capped so a long task label cannot widen the task strip row.
    expect(declaration(".task_chip", "max-width")).toBeDefined();
  });

  it("shell sections are unframed bands separated by 1px dividers, never wrapped in a card", () => {
    expect(declaration(".top_bar", "border-bottom")).toMatch(/^1px solid var\(--tc-divider\)$/u);
    expect(declaration(".rail", "border-right")).toMatch(/^1px solid var\(--tc-divider\)$/u);
    expect(declaration(".inspector", "border-left")).toMatch(/^1px solid var\(--tc-divider\)$/u);
    expect(declaration(".task_strip", "border-top")).toMatch(/^1px solid var\(--tc-divider\)$/u);
    // No panel radius anywhere on the workspace/inspector bands themselves (radius belongs to
    // fields/images/status pills, never the shell bands -- taste directive 10).
    expect(declaration(".workspace", "border-radius")).toBeUndefined();
    expect(declaration(".inspector", "border-radius")).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// Desktop navigation
// ---------------------------------------------------------------------------

describe("StudioShell desktop navigation", () => {
  it("exposes all six routes directly in the rail with a visible selected state", () => {
    const { wrapper } = mount_shell({ state: { route: "gallery" } });
    const buttons = wrapper.findAll("nav button[aria-current], nav button:not([aria-current])");
    const rail_buttons = wrapper.findAll("nav > button");
    expect(rail_buttons).toHaveLength(6);

    const selected = wrapper.find('button[aria-current="page"]');
    expect(selected.exists()).toBe(true);
    expect(selected.attributes("data-selected")).toBe("true");
    expect(buttons.length).toBeGreaterThanOrEqual(6);
  });

  it("activates a route on click and reports it through select-route", async () => {
    const { wrapper } = mount_shell({ state: { route: "workbench" } });
    const rail_buttons = wrapper.findAll("nav > button");
    const gallery_button = rail_buttons.find(
      (button) => button.attributes("aria-label") === "Gallery",
    );
    expect(gallery_button).toBeDefined();

    await gallery_button?.trigger("click");

    expect(wrapper.emitted("select-route")).toEqual([["gallery"]]);
  });

  it("rail buttons are real <button> elements (native Enter/Space activation, no negative tabindex)", () => {
    const { wrapper } = mount_shell();
    for (const button of wrapper.findAll("nav > button")) {
      expect(button.element.tagName).toBe("BUTTON");
      expect(button.attributes("tabindex")).not.toBe("-1");
    }
  });

  it("does not render the mobile bottom nav or inspector sheet on desktop", () => {
    const { wrapper } = mount_shell({ viewport: "desktop" });
    expect(wrapper.find('[data-testid="mobile-more-trigger"]').exists()).toBe(false);
    expect(wrapper.find('[data-testid="inspector-sheet"]').exists()).toBe(false);
  });

  it("tooltips portal into the injected Shadow-Root portal element, never document.body", async () => {
    const { wrapper, portal_target } = mount_shell();
    const first_rail_button = wrapper.findAll("nav > button")[0];
    await first_rail_button?.trigger("focus");
    // Reka's Tooltip opens on focus without the provider's hover delay.
    await nextTick();
    await nextTick();
    await nextTick();

    const tooltip = portal_target.querySelector('[role="tooltip"]');
    expect(tooltip).not.toBeNull();
    expect(Array.from(document.body.children)).not.toContain(tooltip);
  });
});

// ---------------------------------------------------------------------------
// Mobile navigation
// ---------------------------------------------------------------------------

describe("StudioShell mobile navigation", () => {
  it("shows exactly five stable bottom-nav items: four routes plus More", () => {
    const { wrapper } = mount_shell({ viewport: "mobile" });
    const nav = wrapper.find("nav");
    const items = nav.findAll("button");
    expect(items).toHaveLength(5);
    expect(wrapper.find('[data-testid="mobile-more-trigger"]').exists()).toBe(true);
  });

  it("does not render the desktop rail or the persistent inspector column", () => {
    const { wrapper } = mount_shell({ viewport: "mobile" });
    expect(wrapper.find(".rail, nav.rail").exists()).toBe(false);
    expect(wrapper.find('[data-testid="inspector-toggle"]').exists()).toBe(true); // stays in the top bar
  });

  it("More opens Diagnostics and Settings, portaled to the Shadow-Root portal element", async () => {
    const { wrapper, portal_target } = mount_shell({ viewport: "mobile" });
    const more_trigger = wrapper.get('[data-testid="mobile-more-trigger"]');
    await more_trigger.trigger("click");
    await nextTick();
    await nextTick();

    const menu_items = Array.from(portal_target.querySelectorAll('[role="menuitem"]'));
    expect(menu_items.map((node) => node.textContent?.trim())).toEqual(["Diagnostics", "Settings"]);
    for (const item of menu_items) {
      expect(item.closest('[data-shadow-role="portal"]')).toBe(portal_target);
    }
  });

  it("activates a primary route on click", async () => {
    const { wrapper } = mount_shell({ viewport: "mobile", state: { route: "workbench" } });
    const nav = wrapper.find("nav");
    const prompt_button = nav.findAll("button").find((button) => button.text().includes("Prompt"));

    await prompt_button?.trigger("click");

    expect(wrapper.emitted("select-route")).toEqual([["prompt"]]);
  });

  it("marks More as selected when the active route lives behind it", () => {
    const { wrapper } = mount_shell({ viewport: "mobile", state: { route: "settings" } });
    const more_trigger = wrapper.get('[data-testid="mobile-more-trigger"]');
    expect(more_trigger.attributes("data-selected")).toBe("true");
  });
});

// ---------------------------------------------------------------------------
// Inspector: collapse, resize, mobile sheet, focus return
// ---------------------------------------------------------------------------

describe("StudioShell inspector", () => {
  it("toggling the top-bar control reports the next collapsed value", async () => {
    const { wrapper } = mount_shell({
      state: { inspector: { collapsed: false, width: 320, selected_record: null } },
    });
    const toggle = wrapper.get('[data-testid="inspector-toggle"]');

    await toggle.trigger("click");

    expect(wrapper.emitted("set-inspector-collapsed")).toEqual([[true]]);
  });

  it("hides the inspector column and sets the collapsed grid track when collapsed", () => {
    const { wrapper } = mount_shell({
      state: { inspector: { collapsed: true, width: 320, selected_record: null } },
    });
    expect(wrapper.find(".inspector, [class*=inspector_panel]").exists()).toBe(false);
    expect(wrapper.attributes("data-inspector-collapsed")).toBe("true");
  });

  it("keyboard-resizes the inspector from its separator handle and reports the new width", async () => {
    const { wrapper } = mount_shell({
      state: { inspector: { collapsed: false, width: 320, selected_record: null } },
    });
    const resizer = wrapper.get('[role="separator"]');

    await resizer.trigger("keydown", { key: "ArrowLeft" });

    expect(wrapper.emitted("resize-inspector")).toEqual([[336]]);
  });

  it("pointer-drags the inspector resizer and reports a clamped width", async () => {
    const { wrapper } = mount_shell({
      state: { inspector: { collapsed: false, width: 320, selected_record: null } },
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
    const { wrapper, portal_target } = mount_shell({
      viewport: "mobile",
      state: { inspector: { collapsed: true, width: 320, selected_record: null } },
    });
    const toggle = wrapper.get('[data-testid="inspector-toggle"]');
    (toggle.element as HTMLElement).focus();
    expect(document.activeElement).toBe(toggle.element);

    await toggle.trigger("click");
    expect(wrapper.emitted("set-inspector-collapsed")).toEqual([[false]]);
    // DrawerRoot's `open` is controlled by StudioState.inspector.collapsed -- applying the
    // emitted next value is what AppRoot (via the Studio controller) would do in production.
    await wrapper.setProps({
      state: build_state({ inspector: { collapsed: false, width: 320, selected_record: null } }),
    });
    await nextTick();
    await nextTick();
    await nextTick();
    await nextTick();

    // The sheet's content is Teleported into the Shadow-Root portal element, outside
    // `wrapper.element`'s own subtree -- it must be queried from the portal target directly.
    const sheet_element = portal_target.querySelector('[data-testid="inspector-sheet"]');
    expect(sheet_element).not.toBeNull();
    const sheet = new DOMWrapper(sheet_element as Element);

    await sheet.get('[aria-label="Close"]').trigger("click");
    const last_event = wrapper.emitted("set-inspector-collapsed")?.at(-1);
    expect(last_event).toEqual([true]);
    await wrapper.setProps({
      state: build_state({ inspector: { collapsed: true, width: 320, selected_record: null } }),
    });
    await nextTick();
    await nextTick();
    await nextTick();
    await nextTick();

    expect(document.activeElement).toBe(toggle.element);
  });
});

// ---------------------------------------------------------------------------
// Task strip
// ---------------------------------------------------------------------------

describe("StudioShell task strip", () => {
  it("renders nothing when there are no tasks", () => {
    const { wrapper } = mount_shell({ state: { tasks: [] } });
    expect(
      wrapper.find('[aria-label="Show running tasks"], [aria-label="Hide running tasks"]').exists(),
    ).toBe(false);
  });

  it("shows a chip per task with a semantic status dot, and can collapse/expand", async () => {
    const { wrapper } = mount_shell({
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

    const collapse_button = wrapper.get('[aria-label="Hide running tasks"]');
    await collapse_button.trigger("click");
    expect(wrapper.findAll("[data-status]")).toHaveLength(0);

    const expand_button = wrapper.get('[aria-label="Show running tasks"]');
    await expand_button.trigger("click");
    expect(wrapper.findAll("[data-status]")).toHaveLength(2);
  });

  it("changing a task's status text does not change the chip count or remove other chips", async () => {
    const { wrapper } = mount_shell({
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

// ---------------------------------------------------------------------------
// Shell-level states: startup loading, partial initialization, normal
// ---------------------------------------------------------------------------

describe("StudioShell shell-level states", () => {
  it("shows a skeleton matching the final layout while capabilities are still loading, not a spinner", () => {
    const { wrapper } = mount_shell({ state: { loading: new Set(["generation", "settings"]) } });
    expect(wrapper.find('[data-testid="workspace-skeleton"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="workspace-placeholder"]').exists()).toBe(false);
    // No spinner element or animated keyframe class -- skeleton-over-spinner (taste directive 1).
    expect(wrapper.html()).not.toMatch(/spinner/iu);
  });

  it("shows a non-blocking partial-initialization banner without hiding the rest of the shell", () => {
    const { wrapper } = mount_shell({
      state: { failures: new Map([["gallery", { code: "capability_load_failed" }]]) },
    });
    const banner = wrapper.find('[data-testid="partial-banner"]');
    expect(banner.exists()).toBe(true);
    expect(banner.text()).toContain("Running with limited functionality");
    // The rest of the shell keeps rendering underneath the banner.
    expect(wrapper.findAll("nav > button")).toHaveLength(6);
  });

  it("navigates to Diagnostics from the partial-initialization banner", async () => {
    const { wrapper } = mount_shell({
      state: { failures: new Map([["gallery", { code: "capability_load_failed" }]]) },
    });
    await wrapper.get('[data-testid="partial-banner-diagnostics"]').trigger("click");
    expect(wrapper.emitted("select-route")).toEqual([["diagnostics"]]);
  });

  it("renders the routed workbench view once nothing is loading and nothing has failed", () => {
    const { wrapper } = mount_shell();
    expect(wrapper.find('[data-testid="workbench-view"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="workspace-skeleton"]').exists()).toBe(false);
    expect(wrapper.find('[data-testid="partial-banner"]').exists()).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Narrow / long locale labels
// ---------------------------------------------------------------------------

describe("StudioShell narrow and long locale labels", () => {
  it("keeps all six desktop routes and their accessible names when a label is unusually long", () => {
    const long_label =
      "Workbench for generating and iterating on many concurrent image requests at once";
    const messages = {
      en: { ...en_messages, nav: { ...en_messages.nav, workbench: long_label } },
    };
    const { wrapper } = mount_shell({ messages });

    const buttons = wrapper.findAll("nav > button");
    expect(buttons).toHaveLength(6);
    expect(buttons.some((button) => button.attributes("aria-label") === long_label)).toBe(true);
  });

  it("renders full zh-CN labels in the mobile bottom nav without dropping any item", () => {
    const { wrapper } = mount_shell({ viewport: "mobile", locale: "zh-CN" });
    const nav = wrapper.find("nav");
    const items = nav.findAll("button");
    expect(items).toHaveLength(5);
    expect(items[0]?.text()).toContain("工作台");
  });
});
