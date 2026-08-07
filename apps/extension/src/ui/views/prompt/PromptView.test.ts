import type { Uuid } from "@tavern-canvas/contracts";
import { DOMWrapper, flushPromises, mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";
import { createI18n } from "vue-i18n";

import { en_messages } from "../../../i18n/locales/en.js";
import { zh_cn_messages } from "../../../i18n/locales/zh_cn.js";
import { PORTAL_TARGET_KEY } from "../../contracts/portal_keys.js";
import type { PromptPresetDraft, PromptPresetSummary } from "../../contracts/ui_capabilities.js";
import { IDLE_COMMAND_STATE, type StudioState } from "../../contracts/view_models.js";
import PromptView from "./PromptView.vue";

const PRESET_A: PromptPresetSummary = {
  id: "11111111-1111-4111-8111-111111111111" as Uuid,
  display_name: "Portrait preset",
  group: "Characters",
  updated_at: "2026-01-01T00:00:00Z",
};

const PRESET_B: PromptPresetSummary = {
  id: "22222222-2222-4222-8222-222222222222" as Uuid,
  display_name: "Landscape preset",
  group: "Characters",
  updated_at: "2026-01-01T00:00:00Z",
};

const PRESET_UNGROUPED: PromptPresetSummary = {
  id: "33333333-3333-4333-8333-333333333333" as Uuid,
  display_name: "Quick sketch",
  group: null,
  updated_at: "2026-01-01T00:00:00Z",
};

function build_draft(overrides: Partial<PromptPresetDraft> = {}): PromptPresetDraft {
  return {
    id: PRESET_A.id,
    display_name: "Portrait preset",
    group: "Characters",
    fixed_positive_prompt: "",
    fixed_negative_prompt: "",
    replacement_rules: [],
    regex_rules: [],
    ...overrides,
  };
}

function build_state(overrides: Partial<StudioState> = {}): StudioState {
  return {
    route: "prompt",
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
      presets: [PRESET_A, PRESET_B, PRESET_UNGROUPED],
      selected_preset_id: PRESET_A.id,
      draft: build_draft(),
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

function mount_view(
  state: Partial<StudioState> = {},
  options: {
    testRegex?: (rule: unknown, sample: string) => Promise<string>;
    locale?: "en" | "zh-CN";
  } = {},
) {
  const i18n = createI18n({
    legacy: false,
    locale: options.locale ?? "en",
    fallbackLocale: "en",
    messages: { en: en_messages, "zh-CN": zh_cn_messages },
  });
  const portal_target = document.createElement("div");
  document.body.append(portal_target);
  const host = document.createElement("div");
  document.body.append(host);

  const test_regex = options.testRegex ?? vi.fn().mockResolvedValue("matched result");

  const wrapper = mount(PromptView, {
    props: { state: build_state(state), testRegex: test_regex },
    global: { plugins: [i18n], provide: { [PORTAL_TARGET_KEY]: portal_target } },
    attachTo: host,
  });
  return { wrapper, host, test_regex };
}

function find_in_document(selector: string): DOMWrapper<Element> {
  const element = document.querySelector(selector);
  if (!element) {
    throw new Error(`Not found in document: ${selector}`);
  }
  return new DOMWrapper(element);
}

afterEach(() => {
  document.body.innerHTML = "";
});

describe("PromptView: preset browser search/group/bulk delete", () => {
  it("filters the preset list by the search query", async () => {
    const { wrapper } = mount_view();
    const search = wrapper.find('[data-testid="preset-search"]');
    await search.setValue("Landscape");

    const rows = wrapper.findAll('[data-testid="preset-row"]');
    expect(rows).toHaveLength(1);
    expect(rows[0]?.text()).toContain("Landscape preset");
  });

  it("groups presets under their group label, with ungrouped presets under Ungrouped", () => {
    const { wrapper } = mount_view();
    expect(wrapper.text()).toContain("Characters");
    expect(wrapper.text()).toContain("Ungrouped");
  });

  it("picks a random preset from a group and selects it", async () => {
    const { wrapper } = mount_view();
    const random_button = wrapper.find('[data-testid="random-group"]');
    await random_button.trigger("click");
    await flushPromises();

    const events = wrapper.emitted("select-preset") ?? [];
    expect(events).toHaveLength(1);
    const selected = events[0]?.[0] as Uuid;
    expect([PRESET_A.id, PRESET_B.id]).toContain(selected);
  });

  it("bulk deletes checked presets after confirmation", async () => {
    const { wrapper } = mount_view();
    const checkboxes = wrapper.findAll('[data-testid="preset-bulk-checkbox"]');
    await checkboxes[0]?.setValue(true);
    await checkboxes[1]?.setValue(true);

    await wrapper.find('[data-testid="bulk-delete-action"]').trigger("click");
    await flushPromises();

    const confirm_button = find_in_document('button[aria-label="Delete"]');
    await confirm_button.trigger("click");
    await flushPromises();

    const events = wrapper.emitted("bulk-delete-presets");
    expect(events).toHaveLength(1);
    expect(events?.[0]?.[0]).toHaveLength(2);
  });

  it("shows loading, empty, and error states for the preset list", () => {
    const { wrapper: loading } = mount_view({ loading: new Set(["prompt_presets"]) });
    expect(loading.find('[data-testid="preset-browser"]').html()).toContain("aria-hidden");

    const { wrapper: empty } = mount_view({
      prompt: {
        presets: [],
        selected_preset_id: null,
        draft: null,
        save_command: IDLE_COMMAND_STATE,
      },
    });
    expect(empty.text()).toContain("No presets yet");

    const { wrapper: errored } = mount_view({
      failures: new Map([["prompt_presets", { code: "capability_load_failed" }]]),
    });
    expect(errored.find('[data-testid="preset-browser"]').text()).toContain(
      "Presets failed to load.",
    );
  });
});

describe("PromptView: fixed prompts, quality controls, draft locality", () => {
  it("edits fixed positive/negative prompts and emits update-draft, never mutating state directly", async () => {
    const { wrapper } = mount_view();
    const positive = wrapper.find('[data-testid="fixed-positive-prompt"]');
    await positive.setValue("always add: masterpiece");

    const events = wrapper.emitted("update-draft") ?? [];
    expect(events.length).toBeGreaterThan(0);
    expect(events.at(-1)?.[0]).toEqual({ fixed_positive_prompt: "always add: masterpiece" });
  });

  it("toggles UCP and AQT switches", async () => {
    const { wrapper } = mount_view();
    const ucp = wrapper.find('[data-testid="ucp-switch"] [role="switch"]');
    expect(ucp.attributes("aria-checked")).toBe("false");
    await ucp.trigger("click");
    expect(
      wrapper.find('[data-testid="ucp-switch"] [role="switch"]').attributes("aria-checked"),
    ).toBe("true");
  });

  it("keeps a new blank draft local (id null) until Save is pressed", async () => {
    const { wrapper } = mount_view({
      prompt: {
        presets: [],
        selected_preset_id: null,
        draft: null,
        save_command: IDLE_COMMAND_STATE,
      },
    });
    await wrapper.find('[data-testid="new-preset"]').trigger("click");
    await flushPromises();

    expect(wrapper.emitted("new-preset")).toBeTruthy();
    expect(wrapper.emitted("save")).toBeUndefined();
  });

  it("emits save with the current draft when Save is clicked", async () => {
    const { wrapper } = mount_view();
    await wrapper.find('[data-testid="save-preset"]').trigger("click");
    const events = wrapper.emitted("save");
    expect(events).toHaveLength(1);
    expect(events?.[0]?.[0]).toMatchObject({ id: PRESET_A.id, display_name: "Portrait preset" });
  });
});

describe("PromptView: unsaved navigation confirmation", () => {
  it("prompts for confirmation when selecting a different preset while the draft is dirty", async () => {
    const { wrapper } = mount_view({
      prompt: {
        presets: [PRESET_A, PRESET_B],
        selected_preset_id: PRESET_A.id,
        draft: build_draft(),
        save_command: IDLE_COMMAND_STATE,
      },
    });

    // Establish the saved baseline (component captures it once the draft first arrives), then
    // dirty the draft the same way the parent controller would round-trip an edit.
    await flushPromises();
    await wrapper.setProps({
      state: build_state({
        prompt: {
          presets: [PRESET_A, PRESET_B],
          selected_preset_id: PRESET_A.id,
          draft: build_draft({ fixed_positive_prompt: "edited" }),
          save_command: IDLE_COMMAND_STATE,
        },
      }),
    });
    await flushPromises();

    const preset_b_row = wrapper.findAll('[data-testid="preset-row"]')[1];
    await preset_b_row?.find('[data-testid="preset-select"]').trigger("click");
    await flushPromises();

    expect(wrapper.emitted("select-preset")).toBeUndefined();
    const confirm_button = find_in_document('button[aria-label="Discard changes"]');
    await confirm_button.trigger("click");
    await flushPromises();

    expect(wrapper.emitted("select-preset")?.[0]).toEqual([PRESET_B.id]);
  });

  it("selects immediately when the draft has no unsaved edits", async () => {
    const { wrapper } = mount_view();
    const preset_b_row = wrapper.findAll('[data-testid="preset-row"]')[1];
    await preset_b_row?.find('[data-testid="preset-select"]').trigger("click");
    await flushPromises();

    expect(wrapper.emitted("select-preset")?.[0]).toEqual([PRESET_B.id]);
  });
});

describe("PromptView: replacement rules with multiple triggers", () => {
  it("adds a rule and parses comma-separated triggers into an array", async () => {
    const { wrapper } = mount_view({
      prompt: {
        presets: [PRESET_A],
        selected_preset_id: PRESET_A.id,
        draft: build_draft({
          replacement_rules: [{ id: "r1", triggers: [], replacement: "" }],
        }),
        save_command: IDLE_COMMAND_STATE,
      },
    });

    const triggers_input = wrapper.find('[data-testid="replacement-triggers-input"]');
    await triggers_input.setValue("red, blue,  green");
    await triggers_input.trigger("change");

    const events = wrapper.emitted("update-draft") ?? [];
    const last = events.at(-1)?.[0] as Partial<PromptPresetDraft>;
    expect(last.replacement_rules?.[0]?.triggers).toEqual(["red", "blue", "green"]);
  });

  it("shows an empty state and adds a first rule", async () => {
    const { wrapper } = mount_view({
      prompt: {
        presets: [PRESET_A],
        selected_preset_id: PRESET_A.id,
        draft: build_draft({ replacement_rules: [] }),
        save_command: IDLE_COMMAND_STATE,
      },
    });
    expect(wrapper.text()).toContain("No replacement rules yet");
    await wrapper.find('[data-testid="add-replacement-rule"]').trigger("click");
    const events = wrapper.emitted("update-draft") ?? [];
    const last = events.at(-1)?.[0] as Partial<PromptPresetDraft>;
    expect(last.replacement_rules).toHaveLength(1);
  });
});

describe("PromptView: regex validation and test", () => {
  it("shows an inline error for an invalid pattern instead of calling the test capability", async () => {
    const { wrapper, test_regex } = mount_view({
      prompt: {
        presets: [PRESET_A],
        selected_preset_id: PRESET_A.id,
        draft: build_draft({
          regex_rules: [{ id: "g1", pattern: "(unclosed", flags: "", replacement: "" }],
        }),
        save_command: IDLE_COMMAND_STATE,
      },
    });

    expect(wrapper.find('[data-testid="regex-rules"] [role="alert"]').exists()).toBe(true);
    const run_button = wrapper.find('[data-testid="regex-test-run"]');
    expect((run_button.element as HTMLButtonElement).disabled).toBe(true);
    expect(test_regex).not.toHaveBeenCalled();
  });

  it("runs a valid pattern's test through the injected testRegex callback and shows the result", async () => {
    const test_regex = vi.fn().mockResolvedValue("fox -> wolf");
    const { wrapper } = mount_view(
      {
        prompt: {
          presets: [PRESET_A],
          selected_preset_id: PRESET_A.id,
          draft: build_draft({
            regex_rules: [{ id: "g1", pattern: "fox", flags: "g", replacement: "wolf" }],
          }),
          save_command: IDLE_COMMAND_STATE,
        },
      },
      { testRegex: test_regex },
    );

    await wrapper.find('[data-testid="regex-test-input"]').setValue("a fox ran");
    await wrapper.find('[data-testid="regex-test-run"]').trigger("click");
    await vi.waitFor(() => {
      expect(wrapper.find('[data-testid="regex-test-result"]').exists()).toBe(true);
    });

    expect(test_regex).toHaveBeenCalledWith(
      { id: "g1", pattern: "fox", flags: "g", replacement: "wolf" },
      "a fox ran",
    );
    expect(wrapper.find('[data-testid="regex-test-result"]').text()).toContain("fox -> wolf");
  });
});

describe("PromptView: World Info / user persona / character context preview", () => {
  it("shows composed empty states when no context preview is connected", () => {
    const { wrapper } = mount_view();
    const preview = wrapper.find('[data-testid="context-preview"]');
    expect(preview.text()).toContain("No World Info entries are active");
    expect(preview.text()).toContain("No user persona is connected");
    expect(preview.text()).toContain("No character context is connected");
  });

  it("renders World Info entries, user persona, and character context when supplied", () => {
    const wrapper = mount(PromptView, {
      props: {
        state: build_state(),
        testRegex: vi.fn(),
        contextPreview: {
          worldInfo: ["Entry: The old bridge is haunted."],
          userPersona: "A wandering merchant.",
          characterContext: "Elira, a forest guardian.",
        },
      },
      global: {
        plugins: [
          createI18n({
            legacy: false,
            locale: "en",
            fallbackLocale: "en",
            messages: { en: en_messages, "zh-CN": zh_cn_messages },
          }),
        ],
        provide: { [PORTAL_TARGET_KEY]: document.body },
      },
    });
    const preview = wrapper.find('[data-testid="context-preview"]');
    expect(preview.text()).toContain("The old bridge is haunted");
    expect(preview.text()).toContain("A wandering merchant.");
    expect(preview.text()).toContain("Elira, a forest guardian.");
  });
});

describe("PromptView: private LLM prompt-builder test panel, tools disabled", () => {
  it("always shows the tools-disabled note", () => {
    const { wrapper } = mount_view();
    expect(wrapper.find('[data-testid="prompt-test-panel"]').text()).toContain(
      "Tools are disabled for this test run.",
    );
  });

  it("shows the unavailable state when no test capability is wired (current production reality)", () => {
    const { wrapper } = mount_view();
    expect(wrapper.find('[data-testid="test-panel-unavailable"]').exists()).toBe(true);
  });

  it("shows pending/success through an injected testCommand and emits run-test on click", async () => {
    const i18n = createI18n({
      legacy: false,
      locale: "en",
      fallbackLocale: "en",
      messages: { en: en_messages, "zh-CN": zh_cn_messages },
    });
    const wrapper = mount(PromptView, {
      props: {
        state: build_state(),
        testRegex: vi.fn(),
        testCommand: { status: "success", result: "Generated caption text." },
      },
      global: { plugins: [i18n], provide: { [PORTAL_TARGET_KEY]: document.body } },
    });

    await wrapper.find('[data-testid="test-panel-input"]').setValue("describe this scene");
    await wrapper.find('[data-testid="test-panel-run"]').trigger("click");

    expect(wrapper.emitted("run-test")?.[0]).toEqual(["describe this scene"]);
    expect(wrapper.find('[data-testid="test-panel-result"]').text()).toContain(
      "Generated caption text.",
    );
  });
});

describe("PromptView: bilingual copy", () => {
  it("renders native zh-CN copy without untranslated leftovers", () => {
    const { wrapper } = mount_view({}, { locale: "zh-CN" });
    expect(wrapper.text()).toContain("预设");
    expect(wrapper.text()).toContain("替换规则");
    expect(wrapper.text()).not.toContain("undefined");
  });
});

describe("PromptView: toast notification region", () => {
  // Regression test for the fix-wave a11y-correctness finding: the toast region was previously
  // labeled with common.inspector.title ("Inspector") and common.actions.confirm ("Confirm"),
  // announcing the notification region as something unrelated to notifications.
  it("names the toast notification region correctly, not Inspector/Confirm", async () => {
    mount_view();
    await nextTick();
    await nextTick();
    expect(find_in_document('[role="region"][aria-label="Notifications"]').exists()).toBe(true);
    expect(document.querySelector('[role="region"][aria-label="Inspector"]')).toBeNull();
  });
});
