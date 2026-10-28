import { flushPromises, mount } from "@vue/test-utils";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";
import { createI18n } from "vue-i18n";

import type { BootstrapProbeResult } from "../host/index.js";
import type { StartupStatus } from "../bootstrap/startup_error.js";
import { en_messages } from "../i18n/locales/en.js";
import { zh_cn_messages } from "../i18n/locales/zh_cn.js";
import AppRoot from "./AppRoot.vue";
import type { StudioCapabilities } from "./contracts/ui_capabilities.js";
import { create_unavailable_capabilities } from "./controllers/unavailable_capabilities.js";

beforeAll(async () => {
  await Promise.all([
    import("./shell/ContextInspector.vue"),
    import("./shell/DesktopIconRail.vue"),
    import("./shell/InspectorSheet.vue"),
    import("./shell/MobileBottomNav.vue"),
  ]);
});

function mock_matches(dark_color_scheme: boolean): void {
  vi.spyOn(window, "matchMedia").mockImplementation(
    (query: string) =>
      ({
        matches: query.includes("prefers-color-scheme") ? dark_color_scheme : true,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }) as unknown as MediaQueryList,
  );
}

function mount_app_root(props: {
  status: StartupStatus;
  probe: BootstrapProbeResult;
  capabilities?: StudioCapabilities;
}) {
  const i18n = createI18n({
    legacy: false,
    locale: "en",
    fallbackLocale: "en",
    messages: { en: en_messages, "zh-CN": zh_cn_messages },
  });
  const portal_target = document.createElement("div");
  portal_target.dataset.shadowRole = "portal";
  document.body.append(portal_target);
  const host_element = document.createElement("div");
  document.body.append(host_element);
  const mount_point = document.createElement("div");
  document.body.append(mount_point);

  const wrapper = mount(AppRoot, {
    props: {
      status: props.status,
      probe: props.probe,
      version: "3.0.0-alpha.1",
      portalTarget: portal_target,
      hostElement: host_element,
      capabilities: props.capabilities ?? create_unavailable_capabilities(),
    },
    global: { plugins: [i18n] },
    attachTo: mount_point,
  });

  return { wrapper, portal_target, host_element };
}

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

describe("AppRoot capability-blocked state", () => {
  it("shows the version requirement, the detected current version, and one update link", () => {
    mock_matches(false);
    const { wrapper } = mount_app_root({
      status: {
        state: "blocked",
        title: "ignored",
        message: "ignored",
        update_url: "https://github.com/N0VI028/JS-Slash-Runner",
      },
      probe: {
        ready: false,
        error_code: "helper_version_unsupported",
        missing_capabilities: ["tavern_helper"],
        current_version: "4.10.0",
      },
    });

    const screen = wrapper.get('[data-startup-state="blocked"]');
    expect(screen.text()).toContain("4.11.1");
    expect(screen.text()).toContain("4.10.0");
    expect(wrapper.findAll("a")).toHaveLength(1);
    expect(wrapper.get("a").attributes("href")).toBe("https://github.com/N0VI028/JS-Slash-Runner");
    expect(wrapper.find("nav").exists()).toBe(false);
  });

  it("falls back to an explicit unknown current version when the probe never detected one", () => {
    mock_matches(false);
    const { wrapper } = mount_app_root({
      status: {
        state: "blocked",
        title: "ignored",
        message: "ignored",
        update_url: "https://github.com/N0VI028/JS-Slash-Runner",
      },
      probe: {
        ready: false,
        error_code: "tavern_helper_missing",
        missing_capabilities: ["tavern_helper"],
      },
    });

    expect(wrapper.get('[data-startup-state="blocked"]').text()).toContain("Unknown");
  });
});

describe("AppRoot fatal bootstrap error state", () => {
  it("shows the startup error, a reload action and no operational controls", async () => {
    mock_matches(false);
    const reload = vi.fn();
    vi.spyOn(window.location, "reload").mockImplementation(reload);

    const { wrapper } = mount_app_root({
      status: {
        state: "failed",
        title: "ignored",
        message: "ignored",
        detail: "TypeError: settings is undefined",
      },
      probe: { ready: true, matrix: {}, helper_version: "4.9.1" },
    });

    const screen = wrapper.get('[data-startup-state="failed"]');
    expect(screen.get('[data-testid="startup-error-detail"]').text()).toBe(
      "TypeError: settings is undefined",
    );
    expect(wrapper.find("nav").exists()).toBe(false);

    await screen.get("button").trigger("click");
    expect(reload).toHaveBeenCalledOnce();
  });
});

describe("AppRoot normal studio state", () => {
  it("mounts the Studio shell once ready, wired to a live controller", async () => {
    mock_matches(false);
    const { wrapper } = mount_app_root({
      status: { state: "ready", title: "ignored", message: "ignored" },
      probe: { ready: true, matrix: {}, helper_version: "4.9.1" },
    });

    await flushPromises();
    await wrapper.get('[data-shadow-role="entry"]').trigger("click");
    await flushPromises();

    expect(wrapper.find('[data-startup-state="blocked"]').exists()).toBe(false);
    expect(wrapper.find('[data-startup-state="failed"]').exists()).toBe(false);
    expect(wrapper.findAll('[data-testid="studio-rail"] > button')).toHaveLength(2);
  });

  it("starts closed, opens from the entry and closes back to it", async () => {
    mock_matches(false);
    const { wrapper, host_element } = mount_app_root({
      status: { state: "ready", title: "ignored", message: "ignored" },
      probe: { ready: true, matrix: {}, helper_version: "4.9.1" },
    });
    await flushPromises();

    expect(wrapper.find('[data-window-role="studio"]').exists()).toBe(false);
    await wrapper.get('[data-shadow-role="entry"]').trigger("click");
    expect(wrapper.find('[data-window-role="studio"]').exists()).toBe(true);
    await wrapper.get('[data-testid="studio-close"]').trigger("click");

    expect(wrapper.find('[data-window-role="studio"]').exists()).toBe(false);
    expect(host_element.dataset.surfaceMode).toBe("entry");
    await wrapper.get('[data-shadow-role="entry"]').trigger("click");

    expect(wrapper.find('[data-window-role="studio"]').exists()).toBe(true);
    expect(host_element.dataset.surfaceMode).toBe("studio");
  });

  it("lets the host page receive input while only the optional entry is visible", async () => {
    mock_matches(false);
    const capabilities = create_unavailable_capabilities();
    const snapshot = await capabilities.settings.load();
    capabilities.settings.load = () =>
      Promise.resolve({
        ...snapshot,
        settings: {
          ...snapshot.settings,
          ui: { ...snapshot.settings.ui, optional_entry_enabled: true },
        },
      });
    const { wrapper, host_element } = mount_app_root({
      status: { state: "ready", title: "ignored", message: "ignored" },
      probe: { ready: true, matrix: {}, helper_version: "4.9.1" },
      capabilities,
    });

    await flushPromises();

    expect(host_element.dataset.surfaceMode).toBe("entry");
    await wrapper.get('[data-shadow-role="entry"]').trigger("click");
    expect(host_element.dataset.surfaceMode).toBe("studio");
  });

  it("reflects the detected system color scheme onto the Shadow Root host element", () => {
    mock_matches(true);
    const { host_element } = mount_app_root({
      status: { state: "ready", title: "ignored", message: "ignored" },
      probe: { ready: true, matrix: {}, helper_version: "4.9.1" },
    });

    expect(host_element.dataset.colorMode).toBe("dark");
  });

  it("defaults to light when no system preference signal is available", () => {
    mock_matches(false);
    const { host_element } = mount_app_root({
      status: { state: "ready", title: "ignored", message: "ignored" },
      probe: { ready: true, matrix: {}, helper_version: "4.9.1" },
    });

    expect(host_element.dataset.colorMode).toBe("light");
  });
});

describe("AppRoot SillyTavern extensions menu", () => {
  it("adds a menu entry that opens the studio and hides the floating entry", async () => {
    mock_matches(false);
    const menu = document.createElement("div");
    menu.id = "extensionsMenu";
    document.body.append(menu);
    const { wrapper } = mount_app_root({
      status: { state: "ready", title: "ignored", message: "ignored" },
      probe: { ready: true, matrix: {}, helper_version: "4.9.1" },
    });
    await flushPromises();

    expect(wrapper.find('[data-shadow-role="entry"]').exists()).toBe(false);
    menu.querySelector<HTMLElement>("[data-tavern-canvas-menu-entry]")?.click();
    await flushPromises();
    expect(wrapper.find('[data-window-role="studio"]').exists()).toBe(true);

    wrapper.unmount();
    expect(menu.children).toHaveLength(0);
  });
});

describe("AppRoot portal wiring", () => {
  it("provides the given portal target to descendant Reka portals, never document.body", async () => {
    mock_matches(false);
    const { wrapper, portal_target } = mount_app_root({
      status: { state: "ready", title: "ignored", message: "ignored" },
      probe: { ready: true, matrix: {}, helper_version: "4.9.1" },
    });
    await flushPromises();
    await wrapper.get('[data-shadow-role="entry"]').trigger("click");
    await flushPromises();

    const first_rail_button = wrapper.findAll('[data-testid="studio-rail"] > button')[0];
    await first_rail_button?.trigger("focus");
    await nextTick();
    await nextTick();
    await nextTick();

    expect(portal_target.querySelector('[role="tooltip"]')).not.toBeNull();
  });
});
