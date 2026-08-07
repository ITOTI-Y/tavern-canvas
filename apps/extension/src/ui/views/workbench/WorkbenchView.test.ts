import type { GenerationState, Uuid } from "@tavern-canvas/contracts";
import { DOMWrapper, flushPromises, mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";
import { createI18n } from "vue-i18n";

import { en_messages } from "../../../i18n/locales/en.js";
import { zh_cn_messages } from "../../../i18n/locales/zh_cn.js";
import { PORTAL_TARGET_KEY } from "../../contracts/portal_keys.js";
import type {
  AssetRecordSummary,
  GenerationJobSummary,
  ProviderProfileSummary,
} from "../../contracts/ui_capabilities.js";
import { IDLE_COMMAND_STATE, type StudioState } from "../../contracts/view_models.js";
import PromptComposer from "./PromptComposer.vue";
import ProviderSummary from "./ProviderSummary.vue";
import ReferenceStrip from "./ReferenceStrip.vue";
import WorkbenchView from "./WorkbenchView.vue";

const PROFILE_SD: ProviderProfileSummary = {
  id: "11111111-1111-4111-8111-111111111111" as Uuid,
  provider_id: "sd_webui",
  display_name: "Local SD",
  is_default: true,
  updated_at: "2026-01-01T00:00:00Z",
};

const PROFILE_COMFYUI: ProviderProfileSummary = {
  id: "22222222-2222-4222-8222-222222222222" as Uuid,
  provider_id: "comfyui",
  display_name: "Local ComfyUI",
  is_default: false,
  updated_at: "2026-01-01T00:00:00Z",
};

const REFERENCE_ASSET: AssetRecordSummary = {
  id: "33333333-3333-4333-8333-333333333333" as Uuid,
  category: "reference",
  record_key: "ref-1",
  display_name: "Sunset reference",
  updated_at: "2026-01-01T00:00:00Z",
  payload: {},
};

function build_job(overrides: Partial<GenerationJobSummary> = {}): GenerationJobSummary {
  return {
    job_id: "44444444-4444-4444-8444-444444444444" as Uuid,
    request_id: "55555555-5555-4555-8555-555555555555" as Uuid,
    provider_id: "sd_webui",
    state: "running",
    image_count: 4,
    completed_image_ids: [],
    error: null,
    submitted_at: "2026-01-01T00:00:00Z",
    ...overrides,
  };
}

function build_state(overrides: Partial<StudioState> = {}): StudioState {
  return {
    route: "workbench",
    color_mode: "light",
    loading: new Set(),
    failures: new Map(),
    workbench: {
      profiles: [PROFILE_SD],
      active_profile_id: PROFILE_SD.id,
      jobs: [],
      submit_command: IDLE_COMMAND_STATE,
    },
    prompt: { presets: [], selected_preset_id: null, draft: null, save_command: IDLE_COMMAND_STATE },
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
  locale: "en" | "zh-CN" = "en",
  previewUrls?: Record<string, string>,
) {
  const i18n = createI18n({
    legacy: false,
    locale,
    fallbackLocale: "en",
    messages: { en: en_messages, "zh-CN": zh_cn_messages },
  });
  const portal_target = document.createElement("div");
  document.body.append(portal_target);
  const host = document.createElement("div");
  document.body.append(host);

  const wrapper = mount(WorkbenchView, {
    props: { state: build_state(state), ...(previewUrls ? { previewUrls } : {}) },
    global: { plugins: [i18n], provide: { [PORTAL_TARGET_KEY]: portal_target } },
    attachTo: host,
  });
  return { wrapper, host };
}

/** Reka portals (dialog/select content) render outside the mounted wrapper's own DOM subtree
 * (into the injected portal target, appended straight to `document.body`) -- `wrapper.find()`
 * only searches the wrapper's tracked tree, so portaled content must be queried from `document`
 * directly, the same way Task 4's components.test.ts does for Select/Dialog content. */
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

describe("WorkbenchView: provider-profile selection", () => {
  it("lists profiles and emits select-profile when a different profile is chosen", async () => {
    const { wrapper } = mount_view({
      workbench: {
        profiles: [PROFILE_SD, PROFILE_COMFYUI],
        active_profile_id: PROFILE_SD.id,
        jobs: [],
        submit_command: IDLE_COMMAND_STATE,
      },
    });

    const trigger = wrapper.find('[aria-label="Provider profile"]');
    expect(trigger.exists()).toBe(true);
    expect(trigger.attributes("role")).toBe("combobox");

    const provider_summary = wrapper.findComponent(ProviderSummary);
    provider_summary.vm.$emit("select", PROFILE_COMFYUI.id);
    await nextTick();

    expect(wrapper.emitted("select-profile")?.[0]).toEqual([PROFILE_COMFYUI.id]);
  });

  it("shows a composed empty state and Open provider settings action when no profiles exist", () => {
    const { wrapper } = mount_view({
      workbench: { profiles: [], active_profile_id: null, jobs: [], submit_command: IDLE_COMMAND_STATE },
    });

    expect(wrapper.text()).toContain("No provider profile selected");
    const action = wrapper.find('[data-testid="open-provider-settings"]');
    expect(action.exists()).toBe(true);
  });

  it("shows a load error state for the provider list when the profiles slice failed", () => {
    const { wrapper } = mount_view({
      failures: new Map([["profiles", { code: "capability_load_failed" }]]),
    });
    expect(wrapper.find('[data-testid="provider-summary"]').text()).toContain(
      "Provider profiles failed to load.",
    );
  });

  it("shows a loading skeleton for the provider list while the profiles slice is loading", () => {
    const { wrapper } = mount_view({ loading: new Set(["profiles"]) });
    expect(wrapper.find('[data-testid="provider-summary"]').html()).toContain("aria-hidden");
  });
});

describe("WorkbenchView: prompt drafts and image count", () => {
  it("keeps positive/negative prompt as local draft state, including long prompts", async () => {
    const { wrapper } = mount_view();

    const positive = wrapper.find('[data-testid="positive-prompt-input"]');
    const negative = wrapper.find('[data-testid="negative-prompt-input"]');
    const long_prompt = "a".repeat(2000);

    await positive.setValue(long_prompt);
    await negative.setValue("no watermark");

    expect((positive.element as HTMLTextAreaElement).value).toBe(long_prompt);
    expect((negative.element as HTMLTextAreaElement).value).toBe("no watermark");
  });

  it("supports image counts from 1 through 4 and rejects submission outside that range", async () => {
    const { wrapper } = mount_view();
    await wrapper.find('[data-testid="positive-prompt-input"]').setValue("a cat");

    const composer = wrapper.findComponent(PromptComposer);
    composer.vm.$emit("update:imageCount", 4);
    await nextTick();
    await wrapper.find('[data-testid="submit-generation"]').trigger("click");
    await vi.waitFor(() => {
      expect(wrapper.emitted("submit")).toBeTruthy();
    });
    expect(wrapper.emitted("submit")).toHaveLength(1);

    composer.vm.$emit("update:imageCount", 5);
    await nextTick();
    await wrapper.find('[data-testid="submit-generation"]').trigger("click");
    await flushPromises();
    const submit_events = wrapper.emitted("submit") ?? [];
    expect(submit_events).toHaveLength(1);
    expect(wrapper.find('[data-testid="prompt-composer"] [role="alert"]').text()).toBe(
      "Choose between 1 and 4 images.",
    );
  });
});

describe("WorkbenchView: reference images", () => {
  it("adds a reference from the Assets reference category, then removes it", async () => {
    const { wrapper } = mount_view({
      assets: {
        active_category: "character",
        records: {
          character: [],
          outfit: [],
          lora: [],
          vibe: [],
          reference: [REFERENCE_ASSET],
          workflow: [],
        },
        vocabulary_catalog: [],
        vocabulary_install_command: IDLE_COMMAND_STATE,
      },
    });

    await wrapper.find('[data-testid="reference-add"]').trigger("click");
    await flushPromises();
    const picker_item = find_in_document('[data-testid="reference-picker-item"]');
    expect(picker_item.text()).toBe("Sunset reference");
    await picker_item.trigger("click");
    await flushPromises();

    expect(wrapper.findAll('[data-testid="reference-item"]')).toHaveLength(1);

    await wrapper.find('[aria-label="Remove reference"]').trigger("click");
    await flushPromises();
    expect(wrapper.findAll('[data-testid="reference-item"]')).toHaveLength(0);
  });

  it("reorders two references with the move actions", async () => {
    const second_asset: AssetRecordSummary = {
      ...REFERENCE_ASSET,
      id: "66666666-6666-4666-8666-666666666666" as Uuid,
      display_name: "Second reference",
    };
    const { wrapper } = mount_view({
      assets: {
        active_category: "character",
        records: {
          character: [],
          outfit: [],
          lora: [],
          vibe: [],
          reference: [REFERENCE_ASSET, second_asset],
          workflow: [],
        },
        vocabulary_catalog: [],
        vocabulary_install_command: IDLE_COMMAND_STATE,
      },
    });

    const strip = wrapper.findComponent(ReferenceStrip);
    strip.vm.$emit("add", REFERENCE_ASSET.id);
    await nextTick();
    strip.vm.$emit("add", second_asset.id);
    await nextTick();

    let names = wrapper.findAll('[data-testid="reference-item"]').map((item) => item.text());
    expect(names[0]).toContain("Sunset reference");

    strip.vm.$emit("reorder", 0, 1);
    await nextTick();

    names = wrapper.findAll('[data-testid="reference-item"]').map((item) => item.text());
    expect(names[0]).toContain("Second reference");
  });

  it("shows a picker error state when the assets slice failed to load", async () => {
    const { wrapper } = mount_view({ failures: new Map([["assets", { code: "capability_load_failed" }]]) });
    await wrapper.find('[data-testid="reference-add"]').trigger("click");
    await flushPromises();
    expect(document.body.textContent).toContain("The reference image list failed to load.");
  });
});

describe("WorkbenchView: generation submission and validation", () => {
  it("submits a typed request carrying only the profile id and request, no credentials", async () => {
    const { wrapper } = mount_view();
    await wrapper.find('[data-testid="positive-prompt-input"]').setValue("a fox in a forest");
    await wrapper.find('[data-testid="submit-generation"]').trigger("click");

    await vi.waitFor(() => {
      expect(wrapper.emitted("submit")).toBeTruthy();
    });
    const events = wrapper.emitted("submit") ?? [];
    expect(events).toHaveLength(1);
    const command = events[0]?.[0] as { profile_id: Uuid; request: Record<string, unknown> };
    expect(command.profile_id).toBe(PROFILE_SD.id);
    expect(command.request["provider_id"]).toBe("sd_webui");
    expect(command.request["prompt"]).toBe("a fox in a forest");
    expect(command.request["output_count"]).toBe(1);
    expect(Object.keys(command)).toEqual(["profile_id", "request"]);
    expect(String(command.request["generation_anchor"])).toMatch(/^[a-f0-9]{64}$/);
    expect(String(command.request["request_id"])).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
    );
  });

  it("blocks submission and shows an inline error when no profile is selected", async () => {
    const { wrapper } = mount_view({
      workbench: { profiles: [], active_profile_id: null, jobs: [], submit_command: IDLE_COMMAND_STATE },
    });
    await wrapper.find('[data-testid="positive-prompt-input"]').setValue("a fox");
    await wrapper.find('[data-testid="submit-generation"]').trigger("click");
    await flushPromises();

    expect(wrapper.emitted("submit")).toBeUndefined();
    expect(wrapper.find('[data-testid="validation-profile"]').text()).toBe(
      "Select a provider profile before generating.",
    );
  });

  it("blocks submission and shows an inline error when the positive prompt is empty", async () => {
    const { wrapper } = mount_view();
    await wrapper.find('[data-testid="submit-generation"]').trigger("click");
    await flushPromises();

    expect(wrapper.emitted("submit")).toBeUndefined();
    expect(wrapper.find('[data-testid="positive-prompt-input"]').attributes("aria-invalid")).toBe(
      "true",
    );
  });

  it("blocks submission for an unsupported provider (ComfyUI) instead of fabricating a request", async () => {
    const { wrapper } = mount_view({
      workbench: {
        profiles: [PROFILE_COMFYUI],
        active_profile_id: PROFILE_COMFYUI.id,
        jobs: [],
        submit_command: IDLE_COMMAND_STATE,
      },
    });
    await wrapper.find('[data-testid="positive-prompt-input"]').setValue("a fox");
    await wrapper.find('[data-testid="submit-generation"]').trigger("click");
    await flushPromises();

    expect(wrapper.emitted("submit")).toBeUndefined();
    expect(wrapper.find('[data-testid="validation-provider"]').exists()).toBe(true);
  });

  it("shows the submit command's pending and error states", () => {
    const { wrapper } = mount_view({
      workbench: {
        profiles: [PROFILE_SD],
        active_profile_id: PROFILE_SD.id,
        jobs: [],
        submit_command: { status: "pending" },
      },
    });
    expect(wrapper.find('[data-testid="submit-generation"]').attributes("aria-busy")).toBe("true");

    const { wrapper: error_wrapper } = mount_view({
      workbench: {
        profiles: [PROFILE_SD],
        active_profile_id: PROFILE_SD.id,
        jobs: [],
        submit_command: { status: "error", failure: { code: "provider_unavailable" } },
      },
    });
    expect(error_wrapper.find('[data-testid="submit-error"]').text()).toContain(
      "provider_unavailable",
    );
  });
});

describe("WorkbenchView: active jobs, independent cancellation, retry", () => {
  it("shows loading, empty, and error states for the job list", () => {
    const { wrapper: loading } = mount_view({ loading: new Set(["generation"]) });
    expect(loading.find('[data-testid="active-jobs"]').html()).toContain("aria-hidden");

    const { wrapper: empty } = mount_view();
    expect(empty.text()).toContain("No jobs running");

    const { wrapper: errored } = mount_view({
      failures: new Map([["generation", { code: "capability_load_failed" }]]),
    });
    expect(errored.find('[data-testid="active-jobs"]').text()).toContain(
      "Active jobs failed to load.",
    );
  });

  it("counts only in-flight jobs in the header, not completed/failed/cancelled rows", () => {
    const running_job = build_job({
      job_id: "99999999-9999-4999-8999-999999999999" as Uuid,
      state: "running" as GenerationState,
    });
    const completed_job = build_job({
      job_id: "88888888-9999-4999-8999-999999999999" as Uuid,
      state: "completed" as GenerationState,
    });
    const failed_job = build_job({
      job_id: "77777777-9999-4999-8999-999999999999" as Uuid,
      state: "failed" as GenerationState,
    });
    const { wrapper } = mount_view({
      workbench: {
        profiles: [PROFILE_SD],
        active_profile_id: PROFILE_SD.id,
        jobs: [running_job, completed_job, failed_job],
        submit_command: IDLE_COMMAND_STATE,
      },
    });
    expect(wrapper.find('[data-testid="active-jobs"]').text()).toContain("1 job running");
    expect(wrapper.find('[data-testid="active-jobs"]').text()).not.toContain("3 job");
  });

  it("shows per-job progress as completed/total images", () => {
    const { wrapper } = mount_view({
      workbench: {
        profiles: [PROFILE_SD],
        active_profile_id: PROFILE_SD.id,
        jobs: [build_job({ image_count: 4, completed_image_ids: ["a" as Uuid, "b" as Uuid] })],
        submit_command: IDLE_COMMAND_STATE,
      },
    });
    expect(wrapper.find('[data-testid="job-progress"]').text()).toBe("2/4 images");
  });

  it("cancels one job independently of a second running job", async () => {
    const job_a = build_job({ job_id: "77777777-7777-4777-8777-777777777777" as Uuid });
    const job_b = build_job({ job_id: "88888888-8888-4888-8888-888888888888" as Uuid });
    const { wrapper } = mount_view({
      workbench: {
        profiles: [PROFILE_SD],
        active_profile_id: PROFILE_SD.id,
        jobs: [job_a, job_b],
        submit_command: IDLE_COMMAND_STATE,
      },
    });

    const cancel_buttons = wrapper.findAll('[aria-label="Cancel job"]');
    expect(cancel_buttons).toHaveLength(2);
    await cancel_buttons[0]?.trigger("click");
    await flushPromises();

    const confirm_button = find_in_document('button[aria-label="Confirm"]');
    await confirm_button.trigger("click");
    await flushPromises();

    expect(wrapper.emitted("cancel-job")).toEqual([[job_a.job_id]]);
  });

  it("offers retry only for failed/cancelled jobs and emits retry-job", async () => {
    const failed_job = build_job({
      state: "failed" as GenerationState,
      error: { code: "provider_unavailable", retryable: true },
    });
    const { wrapper } = mount_view({
      workbench: {
        profiles: [PROFILE_SD],
        active_profile_id: PROFILE_SD.id,
        jobs: [failed_job],
        submit_command: IDLE_COMMAND_STATE,
      },
    });

    const retry_button = wrapper.find('[aria-label="Retry generation"]');
    expect(retry_button.exists()).toBe(true);
    await retry_button.trigger("click");
    expect(wrapper.emitted("retry-job")).toEqual([[failed_job.job_id]]);
  });
});

describe("WorkbenchView: completion preview and inspector", () => {
  it("shows an empty inspector until a job is selected, then shows completion tiles", async () => {
    const job = build_job({
      state: "completed" as GenerationState,
      completed_image_ids: ["img-1" as Uuid, "img-2" as Uuid],
    });
    const { wrapper } = mount_view({
      workbench: {
        profiles: [PROFILE_SD],
        active_profile_id: PROFILE_SD.id,
        jobs: [job],
        submit_command: IDLE_COMMAND_STATE,
      },
    });

    expect(wrapper.find('[data-testid="generation-inspector"]').text()).toContain(
      "Nothing selected",
    );

    await wrapper.find('[data-testid="job-select"]').trigger("click");

    expect(wrapper.find('[data-testid="inspector-fields"]').exists()).toBe(true);
    expect(wrapper.findAll('[data-testid="completion-preview"] li')).toHaveLength(2);
  });

  it("renders a real <img> when the caller supplies previewUrls, a placeholder otherwise", async () => {
    const job = build_job({
      state: "completed" as GenerationState,
      completed_image_ids: ["img-1" as Uuid, "img-2" as Uuid],
    });
    const { wrapper } = mount_view(
      {
        workbench: {
          profiles: [PROFILE_SD],
          active_profile_id: PROFILE_SD.id,
          jobs: [job],
          submit_command: IDLE_COMMAND_STATE,
        },
      },
      "en",
      { "img-1": "blob:mock-preview-1" },
    );
    await wrapper.find('[data-testid="job-select"]').trigger("click");

    const tiles = wrapper.findAll('[data-testid="completion-preview"] li');
    expect(tiles).toHaveLength(2);
    expect(tiles[0]?.find("img").attributes("src")).toBe("blob:mock-preview-1");
    expect(tiles[1]?.find("img").exists()).toBe(false);
  });

  it("shows generation parameters for a job the view itself submitted", async () => {
    const { wrapper } = mount_view();
    await wrapper.find('[data-testid="positive-prompt-input"]').setValue("a river at dawn");
    await wrapper.find('[data-testid="submit-generation"]').trigger("click");
    await vi.waitFor(() => {
      expect(wrapper.emitted("submit")).toBeTruthy();
    });

    const submit_events = wrapper.emitted("submit") ?? [];
    const submitted = submit_events[0]?.[0] as {
      request: { request_id: Uuid };
    };
    const job = build_job({ request_id: submitted.request.request_id });

    await wrapper.setProps({
      state: build_state({
        workbench: {
          profiles: [PROFILE_SD],
          active_profile_id: PROFILE_SD.id,
          jobs: [job],
          submit_command: { status: "success", result: job },
        },
      }),
    });
    await flushPromises();

    const inspector = wrapper.find('[data-testid="inspector-fields"]');
    expect(inspector.text()).toContain("Model");
    expect(inspector.text()).toContain("Sampler");
  });

  it("copies parameters to the clipboard and reports it through a transient toast", async () => {
    const write_text = vi_mock_clipboard();
    const job = build_job({ state: "completed" as GenerationState });
    const { wrapper } = mount_view({
      workbench: {
        profiles: [PROFILE_SD],
        active_profile_id: PROFILE_SD.id,
        jobs: [job],
        submit_command: IDLE_COMMAND_STATE,
      },
    });
    await wrapper.find('[data-testid="job-select"]').trigger("click");
    await wrapper.find('[data-testid="copy-parameters"]').trigger("click");
    await flushPromises();

    expect(write_text).toHaveBeenCalled();
    expect(document.body.textContent).toContain("Copied");
  });
});

describe("WorkbenchView: keyboard flow", () => {
  it("keeps every first-party command reachable and operable as a native button (no ad-hoc div-as-button)", () => {
    const { wrapper } = mount_view({
      workbench: {
        profiles: [PROFILE_SD],
        active_profile_id: PROFILE_SD.id,
        jobs: [build_job()],
        submit_command: IDLE_COMMAND_STATE,
      },
    });

    for (const testid of ["submit-generation", "reference-add", "job-select"]) {
      const el = wrapper.find(`[data-testid="${testid}"]`);
      expect(el.element.tagName).toBe("BUTTON");
      expect(el.attributes("tabindex")).not.toBe("-1");
    }
  });

  it("submits when the Generate button receives a native click via keyboard activation", async () => {
    const { wrapper } = mount_view();
    await wrapper.find('[data-testid="positive-prompt-input"]').setValue("a mountain lake");
    const submit = wrapper.find('[data-testid="submit-generation"]');
    (submit.element as HTMLButtonElement).focus();
    expect(document.activeElement).toBe(submit.element);
    await submit.trigger("click");
    await vi.waitFor(() => {
      expect(wrapper.emitted("submit")).toBeTruthy();
    });
  });

  it("moves focus through the positive prompt, negative prompt, and image count in document order", () => {
    const { wrapper } = mount_view();
    const positive = wrapper.find('[data-testid="positive-prompt-input"]').element;
    const negative = wrapper.find('[data-testid="negative-prompt-input"]').element;
    const stepper_input = wrapper.find('[data-testid="image-count-stepper"] input').element;

    const position_positive_negative = positive.compareDocumentPosition(negative);
    const position_negative_stepper = negative.compareDocumentPosition(stepper_input);
    expect(position_positive_negative & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(position_negative_stepper & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});

function vi_mock_clipboard() {
  const write_text = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText: write_text },
    configurable: true,
  });
  return write_text;
}
