import type { LlmConnectionProfile, Uuid } from "@tavern-canvas/contracts";
import { DOMWrapper, flushPromises, mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { createI18n } from "vue-i18n";

import { en_messages } from "../../../i18n/locales/en.js";
import { zh_cn_messages } from "../../../i18n/locales/zh_cn.js";
import { PORTAL_TARGET_KEY } from "../../contracts/portal_keys.js";
import type { StudioController } from "../../controllers/studio_controller.js";
import LlmConnections from "./LlmConnections.vue";

const CONNECTION_ID = "11111111-1111-4111-8111-111111111111" as Uuid;
const SECRET_KEY = "sk-live-do-not-leak-9876543210";

const CONNECTION: LlmConnectionProfile = {
  id: CONNECTION_ID,
  display_name: "Primary text model",
  provider_kind: "openai_compatible",
  route: "/v1/chat/completions",
  model_id: "gpt-4o-mini",
  temperature: 0.7,
  max_output_tokens: 2048,
  is_default: true,
  credential_reference: null,
  created_at: "2026-08-07T00:00:00.000Z",
  updated_at: "2026-08-07T00:00:00.000Z",
};

function build_controller(overrides: Partial<StudioController> = {}): StudioController {
  return {
    save_llm_connection: vi.fn(() => Promise.resolve(CONNECTION)),
    remove_llm_connection: vi.fn(() => Promise.resolve()),
    set_llm_connection_credential: vi.fn(() =>
      Promise.resolve({
        ...CONNECTION,
        credential_reference: "tavern_canvas:default:x:llm_profile_api_key",
      }),
    ),
    clear_llm_connection_credential: vi.fn(() => Promise.resolve(CONNECTION)),
    test_llm_connection: vi.fn(() =>
      Promise.resolve({ status: "success", latency_ms: 42, model_id: "gpt-4o-mini" } as const),
    ),
    ...overrides,
  } as unknown as StudioController;
}

function mount_panel(
  options: {
    readonly connections?: readonly LlmConnectionProfile[];
    readonly loading?: boolean;
    readonly controller?: StudioController;
    readonly locale?: "en" | "zh-CN";
  } = {},
) {
  const controller = options.controller ?? build_controller();
  const portal_target = document.createElement("div");
  document.body.append(portal_target);
  const host = document.createElement("div");
  document.body.append(host);

  const wrapper = mount(LlmConnections, {
    props: {
      connections: options.connections ?? [CONNECTION],
      loading: options.loading ?? false,
      controller,
    },
    global: {
      plugins: [
        createI18n({
          legacy: false,
          locale: options.locale ?? "en",
          fallbackLocale: "en",
          messages: { en: en_messages, "zh-CN": zh_cn_messages },
        }),
      ],
      provide: { [PORTAL_TARGET_KEY as unknown as string]: portal_target },
    },
    attachTo: host,
  });
  return { wrapper, controller };
}

/** Dialog content teleports into a portal that is a sibling of the mounted root, so assertions
 * run against a document-scoped wrapper (the AssetsView.test.ts precedent). */
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

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

describe("LlmConnections: read surface", () => {
  it("lists each connection with its dialect and model", () => {
    const { wrapper } = mount_panel();
    const rows = wrapper.findAll('[data-testid="llm-connection-row"]');

    expect(rows).toHaveLength(1);
    expect(rows[0]?.text()).toContain("Primary text model");
    expect(rows[0]?.text()).toContain("OpenAI compatible");
    expect(rows[0]?.text()).toContain("gpt-4o-mini");
  });

  it("composes an empty state with an action rather than a bare no-data string", () => {
    const { wrapper } = mount_panel({ connections: [] });

    expect(wrapper.text()).toContain(
      "Add a text model connection to let the assistant and prompt builder call a language model.",
    );
    expect(wrapper.findAll("button").some((b) => b.text().includes("Add text model"))).toBe(true);
  });

  it("renders a skeleton while the slice is loading", () => {
    const { wrapper } = mount_panel({ loading: true, connections: [] });
    expect(wrapper.find('[data-testid="llm-connection-row"]').exists()).toBe(false);
    expect(wrapper.html()).toContain("aria-hidden");
  });

  it("states whether a credential is stored, never the credential itself", () => {
    const { wrapper } = mount_panel({
      connections: [
        { ...CONNECTION, credential_reference: "tavern_canvas:default:x:llm_profile_api_key" },
      ],
    });
    const state = wrapper.find('[data-testid="llm-connection-credential-state"]');

    expect(state.text()).toBe("API key stored in host secret storage");
    expect(wrapper.text()).not.toContain("tavern_canvas:default");
  });
});

describe("LlmConnections: create and update", () => {
  it("saves a new connection with a catalog route and no transport fields", async () => {
    const { controller } = mount_panel({ connections: [] });
    await button_by_label("Add text model connection").trigger("click");
    await flushPromises();

    const inputs = dom().findAll('input[type="text"]');
    await inputs[0]?.setValue("Second model");
    await inputs[1]?.setValue("claude-sonnet");
    await button_by_label("Save").trigger("click");
    await flushPromises();

    const save = vi.mocked(controller.save_llm_connection);
    expect(save).toHaveBeenCalledTimes(1);
    const draft = save.mock.calls[0]?.[0];
    expect(draft?.display_name).toBe("Second model");
    expect(draft?.model_id).toBe("claude-sonnet");
    expect(draft?.route).toBe("/v1/chat/completions");
    expect(Object.keys(draft ?? {})).not.toContain("base_url");
    expect(Object.keys(draft ?? {})).not.toContain("credential_reference");
  });

  it("blocks a save with a blank name and shows the error below the field", async () => {
    const { controller } = mount_panel({ connections: [] });
    await button_by_label("Add text model connection").trigger("click");
    await flushPromises();

    await button_by_label("Save").trigger("click");
    await flushPromises();

    expect(controller.save_llm_connection).not.toHaveBeenCalled();
    expect(
      dom()
        .findAll('[role="alert"]')
        .some((n) => n.text() === "This field is required."),
    ).toBe(true);
  });

  it("prefills the edit dialog from the selected connection", async () => {
    mount_panel();
    await button_by_label("Edit").trigger("click");
    await flushPromises();

    const inputs = dom().findAll('input[type="text"]');
    expect((inputs[0]?.element as HTMLInputElement).value).toBe("Primary text model");
    expect((inputs[1]?.element as HTMLInputElement).value).toBe("gpt-4o-mini");
  });

  it("offers no free-text field for a request path or an endpoint", async () => {
    mount_panel({ connections: [] });
    await button_by_label("Add text model connection").trigger("click");
    await flushPromises();

    const text_values = dom()
      .findAll('input[type="text"], input[type="url"]')
      .map((input) => (input.element as HTMLInputElement).value);
    expect(text_values.some((value) => value.startsWith("/"))).toBe(false);
    expect(text_values.some((value) => value.includes("http"))).toBe(false);
  });
});

describe("LlmConnections: delete", () => {
  it("requires a destructive confirmation before removing", async () => {
    const { controller } = mount_panel();
    await button_by_label("Delete").trigger("click");
    await flushPromises();

    expect(controller.remove_llm_connection).not.toHaveBeenCalled();
    expect(dom().text()).toContain("Remove Primary text model?");

    const confirm = dom()
      .find('[role="alertdialog"]')
      .findAll("button")
      .find((candidate) => candidate.text().trim() === "Delete");
    await confirm?.trigger("click");
    await flushPromises();

    expect(controller.remove_llm_connection).toHaveBeenCalledWith(CONNECTION_ID);
  });
});

describe("LlmConnections: credentials", () => {
  it("sends the plaintext key only to the credential command and clears the field", async () => {
    const { controller, wrapper } = mount_panel();
    await button_by_label("Set API key").trigger("click");
    await flushPromises();

    const input = dom().find('[data-testid="llm-credential-input"]');
    expect((input.element as HTMLInputElement).type).toBe("password");
    await input.setValue(SECRET_KEY);
    await button_by_label("Save").trigger("click");
    await flushPromises();

    expect(controller.set_llm_connection_credential).toHaveBeenCalledWith(
      CONNECTION_ID,
      SECRET_KEY,
    );
    expect(vi.mocked(controller.save_llm_connection)).not.toHaveBeenCalled();
    expect(wrapper.html()).not.toContain(SECRET_KEY);
    expect(document.body.innerHTML).not.toContain(SECRET_KEY);
  });

  it("rejects a blank key without calling the command", async () => {
    const { controller } = mount_panel();
    await button_by_label("Set API key").trigger("click");
    await flushPromises();

    await button_by_label("Save").trigger("click");
    await flushPromises();

    expect(controller.set_llm_connection_credential).not.toHaveBeenCalled();
  });

  it("clears a stored credential", async () => {
    const { controller } = mount_panel({
      connections: [
        { ...CONNECTION, credential_reference: "tavern_canvas:default:x:llm_profile_api_key" },
      ],
    });
    await button_by_label("Remove API key").trigger("click");
    await flushPromises();

    expect(controller.clear_llm_connection_credential).toHaveBeenCalledWith(CONNECTION_ID);
  });
});

describe("LlmConnections: connection test", () => {
  it("reports a successful test with its latency", async () => {
    const { wrapper } = mount_panel();
    await button_by_label("Test connection").trigger("click");
    await flushPromises();

    expect(wrapper.find('[data-testid="llm-connection-test-result"]').text()).toContain("Success");
  });

  it("reports a failure with its stable code", async () => {
    const controller = build_controller({
      test_llm_connection: vi.fn(() =>
        Promise.resolve({ status: "failed", code: "auth_failed" } as const),
      ),
    });
    const { wrapper } = mount_panel({ controller });
    await button_by_label("Test connection").trigger("click");
    await flushPromises();

    expect(wrapper.find('[data-testid="llm-connection-test-result"]').text()).toContain(
      "auth_failed",
    );
  });
});

describe("LlmConnections: bilingual copy", () => {
  it("renders native Simplified Chinese with no missing keys", () => {
    const { wrapper } = mount_panel({ locale: "zh-CN" });

    expect(wrapper.text()).toContain("文本模型连接");
    expect(wrapper.text()).toContain("测试连接");
    expect(wrapper.text()).toContain("设置 API 密钥");
    expect(wrapper.text()).not.toContain("undefined");
  });

  it("uses no em dashes in either locale", () => {
    const en = mount_panel().wrapper.text();
    document.body.innerHTML = "";
    const zh = mount_panel({ locale: "zh-CN" }).wrapper.text();

    expect(/[–—]/u.test(en)).toBe(false);
    expect(/[–—]/u.test(zh)).toBe(false);
  });
});
