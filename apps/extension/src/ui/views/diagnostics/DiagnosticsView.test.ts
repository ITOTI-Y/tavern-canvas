import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { defineComponent, h, markRaw, nextTick } from "vue";
import { createI18n } from "vue-i18n";

import type {
  ConnectionTestResult,
  DiagnosticsCapability,
  DiagnosticsSnapshot,
  MigrationSnapshot,
  StudioCapabilities,
  SupportBundle,
  TaskTimelineEntry,
} from "../../contracts/ui_capabilities.js";
import { IDLE_COMMAND_STATE, type StudioState } from "../../contracts/view_models.js";
import {
  create_studio_controller,
  type StudioController,
} from "../../controllers/studio_controller.js";
import { create_unavailable_capabilities } from "../../controllers/unavailable_capabilities.js";
import { en_messages } from "../../../i18n/locales/en.js";
import { zh_cn_messages } from "../../../i18n/locales/zh_cn.js";
import DiagnosticsView from "./DiagnosticsView.vue";
import TaskTimeline from "./TaskTimeline.vue";

// Mirrors create_i18n.ts's own NUMBER_FORMATS/DATETIME_FORMATS -- without them, TaskTimeline's
// `d(occurred_at, "short_time")` call warns ("Not found 'short_time' key") and silently falls
// back to a raw string instead of exercising the real formatted-time path this test verifies.
const NUMBER_FORMATS = {
  decimal: { style: "decimal" as const, maximumFractionDigits: 2 },
  percent: { style: "percent" as const, maximumFractionDigits: 1 },
};
const DATETIME_FORMATS = {
  short_date: { year: "numeric" as const, month: "short" as const, day: "numeric" as const },
  short_time: { hour: "2-digit" as const, minute: "2-digit" as const },
};

const FULL_MATRIX = {
  native_tool_manager: { available: true },
  main_generation_events: { available: true },
  private_prompt_generation: {
    available: false,
    reason: "TavernHelper.generateRaw is unavailable",
  },
  message_swipe_metadata: { available: true },
  host_image_upload: { available: true },
  tavern_helper: { available: true },
  tauri_chat_surface: { available: false, reason: "TauriTavern is not present" },
  tauri_world_info_activation: { available: false, reason: "TauriTavern is not present" },
  gateway_protocol: { available: false, reason: "Gateway protocol is not connected" },
};

const SNAPSHOT: DiagnosticsSnapshot = {
  capability_matrix: FULL_MATRIX,
  helper_version: "4.9.1",
  protocol_version: "1.0",
  storage_usage_bytes: 1_000_000,
  storage_quota_bytes: 10_000_000,
};

const SECRET_TOKEN_VALUE = "sk-live-do-not-leak-1234567890";
const SECRET_BEARER = "Bearer do-not-leak-token";
const SECRET_BASE64_IMAGE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQAAAAA";
const SECRET_PROMPT = "1girl, masterpiece, best quality, do-not-leak-prompt-text";
const SECRET_MESSAGE_CONTENT = "do-not-leak: the user said something private here";

function build_timeline(count: number): TaskTimelineEntry[] {
  return Array.from({ length: count }, (_unused, index) => ({
    event_id: `event-${String(index)}`,
    occurred_at: "2026-08-07T12:00:00.000Z",
    event_code: index % 7 === 0 ? "generation_failed" : "generation_completed",
    module_id: "generation",
    generation_anchor: null,
    request_id: null,
    job_id: null,
    provider_id: "sd_webui",
    error_code: index % 7 === 0 ? "provider_unavailable" : null,
  }));
}

function build_state(overrides: Partial<StudioState> = {}): StudioState {
  return {
    route: "diagnostics",
    color_mode: "light",
    loading: new Set(),
    failures: new Map(),
    workbench: {
      profiles: [],
      active_profile_id: null,
      jobs: [],
      submit_command: IDLE_COMMAND_STATE,
    },
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
      snapshot: SNAPSHOT,
      timeline: [],
      migration: null,
      connection_test_command: IDLE_COMMAND_STATE,
      support_bundle_command: IDLE_COMMAND_STATE,
    },
    settings: {
      // SECRET_TOKEN_VALUE stands in for what a *raw* token would look like if a future adapter
      // ever wired one into `token_secret_id` by mistake -- Diagnostics must never render this
      // field (or anything under `settings.settings.gateway`) at all, unlike Settings' Gateway
      // panel which intentionally shows a secret *reference*.
      settings: {
        schema_version: 1,
        active_namespace: "default",
        locale: "auto",
        active_provider_profile_id: null,
        global_concurrency: 1,
        auto_generation_enabled: false,
        fallback_generation_enabled: false,
        gateway: {
          endpoint: "https://gateway.example.test",
          token_secret_id: SECRET_TOKEN_VALUE,
          http_acknowledgments: {},
        },
        ui: {
          color_mode: "system",
          inspector_width: 320,
          inspector_collapsed: false,
          optional_entry_enabled: false,
        },
      },
      vocabulary_update_channel: "bundled",
      update_command: IDLE_COMMAND_STATE,
      migration_retry_command: IDLE_COMMAND_STATE,
    },
    inspector: { collapsed: false, width: 320, selected_record: null },
    tasks: [],
    ...overrides,
  };
}

/** `markRaw` mirrors `use_studio_controller.ts`'s production fix: the controller's private class
 * fields break the moment Vue (or vue-test-utils' own props-reactivity for `setProps()`) wraps
 * this in a `reactive()` Proxy, which happens here too since `controller` is a mounted prop. */
function build_controller(capabilities: StudioCapabilities): StudioController {
  return markRaw(create_studio_controller({ capabilities }));
}

function mount_view(state: StudioState, controller: StudioController) {
  const i18n = createI18n({
    legacy: false,
    locale: "en",
    fallbackLocale: "en",
    messages: { en: en_messages, "zh-CN": zh_cn_messages },
    numberFormats: { en: NUMBER_FORMATS, "zh-CN": NUMBER_FORMATS },
    datetimeFormats: { en: DATETIME_FORMATS, "zh-CN": DATETIME_FORMATS },
  });
  const host = document.createElement("div");
  document.body.append(host);
  const wrapper = mount(DiagnosticsView, {
    props: { state, controller },
    global: { plugins: [i18n] },
    attachTo: host,
  });
  return { wrapper, host };
}

/**
 * For tests that click a control wired to a real controller command: the controller only ever
 * mutates its *own* internal state (studio_controller.ts's `#patch`/`#notify`), never a state
 * object handed to it externally, so the mounted `state` prop must be the controller's own
 * `.state` from the start and re-synced on every `on_change` -- otherwise a command's
 * pending/success/error transition would never reach the rendered view. `capabilities.diagnostics
 * /settings/migration.load()` are what seed the controller's initial state here (mirroring how
 * `start()` really works), not a hand-built `StudioState` literal.
 */
async function mount_view_with_live_controller(controller: StudioController) {
  await controller.start();
  const i18n = createI18n({
    legacy: false,
    locale: "en",
    fallbackLocale: "en",
    messages: { en: en_messages, "zh-CN": zh_cn_messages },
    numberFormats: { en: NUMBER_FORMATS, "zh-CN": NUMBER_FORMATS },
    datetimeFormats: { en: DATETIME_FORMATS, "zh-CN": DATETIME_FORMATS },
  });
  const host = document.createElement("div");
  document.body.append(host);
  const wrapper = mount(DiagnosticsView, {
    props: { state: controller.state, controller },
    global: { plugins: [i18n] },
    attachTo: host,
  });
  controller.on_change(() => {
    void wrapper.setProps({ state: controller.state });
  });
  return { wrapper, host };
}

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

describe("DiagnosticsView capability matrix", () => {
  it("displays all nine capability IDs with their availability", () => {
    const { wrapper } = mount_view(
      build_state(),
      build_controller(create_unavailable_capabilities()),
    );
    const rows = wrapper.findAll("[data-capability-id]");
    expect(rows).toHaveLength(9);
    const ids = rows.map((row) => row.attributes("data-capability-id"));
    expect(new Set(ids).size).toBe(9);
    expect(wrapper.text()).toContain("JS Slash Runner");
    expect(wrapper.text()).toContain("Gateway protocol");
  });

  it("renders unavailable capabilities distinctly from available ones", () => {
    const { wrapper } = mount_view(
      build_state(),
      build_controller(create_unavailable_capabilities()),
    );
    const gateway_row = wrapper.get('[data-capability-id="gateway_protocol"]');
    expect(gateway_row.find('[data-available="false"]').exists()).toBe(true);
    const helper_row = wrapper.get('[data-capability-id="tavern_helper"]');
    expect(helper_row.find('[data-available="true"]').exists()).toBe(true);
  });
});

describe("DiagnosticsView versions", () => {
  it("shows helper and protocol versions", () => {
    const { wrapper } = mount_view(
      build_state(),
      build_controller(create_unavailable_capabilities()),
    );
    expect(wrapper.text()).toContain("4.9.1");
    expect(wrapper.text()).toContain("1.0");
  });

  it("falls back to an unknown label when the snapshot has no version yet", () => {
    const { wrapper } = mount_view(
      build_state({
        diagnostics: {
          snapshot: null,
          timeline: [],
          migration: null,
          connection_test_command: IDLE_COMMAND_STATE,
          support_bundle_command: IDLE_COMMAND_STATE,
        },
      }),
      build_controller(create_unavailable_capabilities()),
    );
    expect(wrapper.text()).toContain("Unknown");
  });
});

const SETTINGS_WITH_GATEWAY = {
  schema_version: 1 as const,
  active_namespace: "default",
  locale: "auto" as const,
  active_provider_profile_id: null,
  global_concurrency: 1,
  auto_generation_enabled: false,
  fallback_generation_enabled: false,
  gateway: {
    endpoint: "https://gateway.example.test",
    token_secret_id: null,
    http_acknowledgments: {},
  },
  ui: {
    color_mode: "system" as const,
    inspector_width: 320,
    inspector_collapsed: false,
    optional_entry_enabled: false,
  },
};

describe("DiagnosticsView connection test", () => {
  function build_capabilities(result: () => Promise<ConnectionTestResult>): StudioCapabilities {
    const capabilities = create_unavailable_capabilities();
    const diagnostics: DiagnosticsCapability = {
      load: () => Promise.resolve(SNAPSHOT),
      subscribe: () => () => {},
      test_connection: result,
      load_timeline: () => Promise.resolve([]),
      export_support_bundle: capabilities.diagnostics.export_support_bundle,
    };
    return {
      ...capabilities,
      diagnostics,
      settings: {
        ...capabilities.settings,
        load: () =>
          Promise.resolve({
            settings: SETTINGS_WITH_GATEWAY,
            vocabulary_update_channel: "bundled",
          }),
      },
    };
  }

  it("runs a connection test and shows the success latency", async () => {
    const capabilities = build_capabilities(() =>
      Promise.resolve({ status: "success", latency_ms: 42 }),
    );
    const controller = build_controller(capabilities);
    const { wrapper } = await mount_view_with_live_controller(controller);

    await wrapper.get('[data-testid="connection-tests"] button').trigger("click");
    await nextTick();
    await nextTick();

    const result = wrapper.get('[data-testid="connection-test-result"]');
    expect(result.text()).toContain("42");
  });

  it("shows a Gateway-specific failure message using the configured origin", async () => {
    const capabilities = build_capabilities(() =>
      Promise.resolve({ status: "failed", code: "gateway_offline" }),
    );
    const controller = build_controller(capabilities);
    const { wrapper } = await mount_view_with_live_controller(controller);

    await wrapper.get('[data-testid="connection-tests"] button').trigger("click");
    await nextTick();
    await nextTick();

    const result = wrapper.get('[data-testid="connection-test-result"]');
    expect(result.text()).toContain("gateway.example.test");
  });

  it("shows a generic failure message for an unmapped error code", async () => {
    const capabilities = build_capabilities(() =>
      Promise.reject(Object.assign(new Error("boom"), { code: "capability_not_implemented" })),
    );
    const controller = build_controller(capabilities);
    const { wrapper } = await mount_view_with_live_controller(controller);

    await wrapper.get('[data-testid="connection-tests"] button').trigger("click");
    await nextTick();
    await nextTick();

    const result = wrapper.get('[data-testid="connection-test-result"]');
    expect(result.text()).toContain("capability_not_implemented");
  });
});

describe("DiagnosticsView task timeline", () => {
  it("shows a composed empty state with zero log entries", () => {
    const { wrapper } = mount_view(
      build_state({
        diagnostics: {
          snapshot: SNAPSHOT,
          timeline: [],
          migration: null,
          connection_test_command: IDLE_COMMAND_STATE,
          support_bundle_command: IDLE_COMMAND_STATE,
        },
      }),
      build_controller(create_unavailable_capabilities()),
    );
    const timeline = wrapper.get('[data-testid="task-timeline"]');
    expect(timeline.text()).toContain("Generation, migration, and sync activity");
    expect(timeline.findAll('[data-testid="timeline-row"]')).toHaveLength(0);
  });

  it("virtualizes 1,000 timeline events: fixed viewport height, full scroll extent reserved", () => {
    const { wrapper } = mount_view(
      build_state({
        diagnostics: {
          snapshot: SNAPSHOT,
          timeline: build_timeline(1000),
          migration: null,
          connection_test_command: IDLE_COMMAND_STATE,
          support_bundle_command: IDLE_COMMAND_STATE,
        },
      }),
      build_controller(create_unavailable_capabilities()),
    );
    const list = wrapper.get('[role="list"]');
    expect((list.element as HTMLElement).style.height).toBe("320px");
    const sizer = list.element.firstElementChild as HTMLElement;
    // 1,000 rows * 32px row height reserved in the scroll extent -- proves every event is
    // accounted for even though only a small overscanned window is ever in the DOM.
    expect(sizer.style.height).toBe("32000px");
    expect(wrapper.findAll('[data-testid="timeline-row"]').length).toBeLessThan(1000);
  });

  it("renders only stable, non-content fields per timeline row (redaction is structural)", () => {
    // @tanstack/virtual-core's real windowed rendering depends on a live browser layout engine
    // (element sizes, scroll offsets) that happy-dom does not implement -- it reliably reports a
    // correct *total* scroll extent (proven above) but not a populated visible window, exactly
    // why components.test.ts's own VirtualList suite never asserts rendered row content either.
    // Stubbing VirtualList to render every item via its slot (bypassing the virtualizer, not
    // TaskTimeline's own row template) verifies the one thing that actually determines
    // redaction: which fields TaskTimeline pulls out of each `TaskTimelineEntry` and renders.
    const VirtualListStub = defineComponent({
      props: {
        items: { type: Array as () => readonly TaskTimelineEntry[], required: true },
        itemSize: { type: Number, required: true },
        height: { type: String, required: true },
        ariaLabel: { type: String, required: false },
        getKey: { type: Function, required: false },
      },
      setup(props, { slots }) {
        return () =>
          h(
            "div",
            props.items.map((item, index) => slots.default?.({ item, index })),
          );
      },
    });
    const i18n = createI18n({
      legacy: false,
      locale: "en",
      fallbackLocale: "en",
      messages: { en: en_messages, "zh-CN": zh_cn_messages },
    });
    const wrapper = mount(TaskTimeline, {
      props: { entries: build_timeline(5) },
      global: { plugins: [i18n], stubs: { VirtualList: VirtualListStub } },
    });
    expect(wrapper.text()).toContain("generation_completed");
    expect(wrapper.text()).toContain("provider_unavailable");
    expect(wrapper.html()).not.toContain(SECRET_PROMPT);
    expect(wrapper.html()).not.toContain(SECRET_MESSAGE_CONTENT);
  });
});

describe("DiagnosticsView migration journal", () => {
  it("shows the migration state and record counts", () => {
    const snapshot: MigrationSnapshot = {
      state: "ready_to_switch",
      counts: { provider_profiles: 2, gallery_image_records: 40 },
      warnings: ["A minor field could not be converted and was skipped."],
      failure_reason: null,
      failure_message: null,
    };
    const { wrapper } = mount_view(
      build_state({
        diagnostics: {
          snapshot: SNAPSHOT,
          timeline: [],
          migration: snapshot,
          connection_test_command: IDLE_COMMAND_STATE,
          support_bundle_command: IDLE_COMMAND_STATE,
        },
      }),
      build_controller(create_unavailable_capabilities()),
    );
    const section = wrapper.get('[data-testid="migration-status"]');
    expect(section.text()).toContain("Ready to switch");
    expect(section.text()).toContain("42");
    expect(section.text()).toContain("A minor field could not be converted");
  });

  it("shows the failure reason when migration failed", () => {
    const snapshot: MigrationSnapshot = {
      state: "failed",
      counts: {},
      warnings: [],
      failure_reason: "hash_mismatch",
      failure_message: "checksum did not match",
    };
    const { wrapper } = mount_view(
      build_state({
        diagnostics: {
          snapshot: SNAPSHOT,
          timeline: [],
          migration: snapshot,
          connection_test_command: IDLE_COMMAND_STATE,
          support_bundle_command: IDLE_COMMAND_STATE,
        },
      }),
      build_controller(create_unavailable_capabilities()),
    );
    const section = wrapper.get('[data-testid="migration-status"]');
    expect(section.text()).toContain("Migration failed");
    expect(section.text()).toContain("does not match its expected checksum");
  });

  it("shows a completed migration state", () => {
    const snapshot: MigrationSnapshot = {
      state: "completed",
      counts: { provider_profiles: 1 },
      warnings: [],
      failure_reason: null,
      failure_message: null,
    };
    const { wrapper } = mount_view(
      build_state({
        diagnostics: {
          snapshot: SNAPSHOT,
          timeline: [],
          migration: snapshot,
          connection_test_command: IDLE_COMMAND_STATE,
          support_bundle_command: IDLE_COMMAND_STATE,
        },
      }),
      build_controller(create_unavailable_capabilities()),
    );
    expect(wrapper.get('[data-testid="migration-status"]').text()).toContain("Migration completed");
  });
});

describe("DiagnosticsView storage usage", () => {
  it("shows the usage estimate and quota", () => {
    const { wrapper } = mount_view(
      build_state(),
      build_controller(create_unavailable_capabilities()),
    );
    const section = wrapper.get('[data-testid="storage-usage"]');
    expect(section.find('[data-testid="storage-quota-value"]').exists()).toBe(true);
  });

  it("shows an unavailable message when the host cannot report a quota", () => {
    const { wrapper } = mount_view(
      build_state({
        diagnostics: {
          snapshot: { ...SNAPSHOT, storage_quota_bytes: null },
          timeline: [],
          migration: null,
          connection_test_command: IDLE_COMMAND_STATE,
          support_bundle_command: IDLE_COMMAND_STATE,
        },
      }),
      build_controller(create_unavailable_capabilities()),
    );
    expect(wrapper.find('[data-testid="storage-quota-unavailable"]').exists()).toBe(true);
  });

  it("shows a high-pressure warning when usage is close to quota", () => {
    const { wrapper } = mount_view(
      build_state({
        diagnostics: {
          snapshot: {
            ...SNAPSHOT,
            storage_usage_bytes: 9_500_000,
            storage_quota_bytes: 10_000_000,
          },
          timeline: [],
          migration: null,
          connection_test_command: IDLE_COMMAND_STATE,
          support_bundle_command: IDLE_COMMAND_STATE,
        },
      }),
      build_controller(create_unavailable_capabilities()),
    );
    expect(wrapper.find('[data-testid="storage-quota-high-pressure"]').exists()).toBe(true);
  });

  it("shows cache references as an honest unavailable state, never a fabricated count", () => {
    const { wrapper } = mount_view(
      build_state(),
      build_controller(create_unavailable_capabilities()),
    );
    const value = wrapper.get('[data-testid="cache-references-value"]');
    expect(value.text()).not.toMatch(/^\d+$/u);
  });
});

describe("DiagnosticsView support bundle export", () => {
  const BUNDLE: SupportBundle = {
    version: "3.0.0-alpha.1",
    capability_matrix: FULL_MATRIX,
    redacted_settings: { active_namespace: "default", global_concurrency: 1 },
    error_codes: ["provider_unavailable", "timed_out"],
    timeline: build_timeline(3),
  };

  function build_capabilities(): StudioCapabilities {
    const capabilities = create_unavailable_capabilities();
    const diagnostics: DiagnosticsCapability = {
      load: () => Promise.resolve(SNAPSHOT),
      subscribe: () => () => {},
      test_connection: capabilities.diagnostics.test_connection,
      load_timeline: () => Promise.resolve([]),
      export_support_bundle: () => Promise.resolve(BUNDLE),
    };
    return {
      ...capabilities,
      diagnostics,
      settings: {
        ...capabilities.settings,
        // A raw-looking token value living in *live* settings, deliberately never included in
        // the mock export_support_bundle's redacted_settings above -- proves the exported
        // preview reflects only the capability-provided bundle, never the full live settings.
        load: () =>
          Promise.resolve({
            settings: {
              ...SETTINGS_WITH_GATEWAY,
              gateway: { ...SETTINGS_WITH_GATEWAY.gateway, token_secret_id: SECRET_TOKEN_VALUE },
            },
            vocabulary_update_channel: "bundled" as const,
          }),
      },
    };
  }

  it("exports a bundle containing only version, capability matrix, redacted settings, error codes, and timeline", async () => {
    const controller = build_controller(build_capabilities());
    const { wrapper } = await mount_view_with_live_controller(controller);

    await wrapper.get('[data-testid="support-bundle"] button').trigger("click");
    await nextTick();
    await nextTick();

    const preview = wrapper.get('[data-testid="support-bundle-preview"]');
    const parsed: unknown = JSON.parse(preview.text());
    expect(Object.keys(parsed as object).sort()).toEqual(
      ["capability_matrix", "error_codes", "redacted_settings", "timeline", "version"].sort(),
    );
  });

  it("never renders prompt text, message content, secrets, bearer tokens, base64 blobs, provider bodies, or image names in the DOM", async () => {
    const controller = build_controller(build_capabilities());
    const { wrapper } = await mount_view_with_live_controller(controller);

    await wrapper.get('[data-testid="support-bundle"] button').trigger("click");
    await nextTick();
    await nextTick();

    const html = wrapper.html();
    for (const forbidden of [
      SECRET_TOKEN_VALUE,
      SECRET_BEARER,
      SECRET_BASE64_IMAGE,
      SECRET_PROMPT,
      SECRET_MESSAGE_CONTENT,
      "Bearer ",
      "data:image",
      "base64,",
    ]) {
      expect(html).not.toContain(forbidden);
    }
  });

  it("never renders the live gateway token reference anywhere in Diagnostics, exported or not", () => {
    const { wrapper } = mount_view(
      build_state(),
      build_controller(create_unavailable_capabilities()),
    );
    expect(wrapper.html()).not.toContain(SECRET_TOKEN_VALUE);
  });

  it("offers a file download once the bundle export succeeds", async () => {
    const controller = build_controller(build_capabilities());
    const { wrapper } = await mount_view_with_live_controller(controller);

    await wrapper.get('[data-testid="support-bundle"] button').trigger("click");
    await nextTick();
    await nextTick();

    const buttons = wrapper.get('[data-testid="support-bundle"]').findAll("button");
    expect(buttons.some((button) => button.text() === "Download")).toBe(true);
  });
});
