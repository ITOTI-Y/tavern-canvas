import { DOMWrapper, flushPromises, mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { createI18n } from "vue-i18n";

import { en_messages } from "../../i18n/locales/en.js";
import { zh_cn_messages } from "../../i18n/locales/zh_cn.js";
import type { AssistantTask } from "../../modules/assistant/assistant_module.js";
import type {
  AssistantMessageRecord,
  AssistantSession,
  AssistantSummaryRecord,
} from "../../modules/assistant/assistant_session.js";
import { PORTAL_TARGET_KEY } from "../contracts/portal_keys.js";
import AssistantSessionHistory from "./AssistantSessionHistory.vue";
import AssistantSummaryGraph from "./AssistantSummaryGraph.vue";
import AssistantSummaryPanel from "./AssistantSummaryPanel.vue";
import AssistantTaskTracker from "./AssistantTaskTracker.vue";
import { use_message_pagination } from "./use_message_pagination.js";

const NOW = "2026-08-07T00:00:00.000Z";

function message(id: string, content = "hello"): AssistantMessageRecord {
  return {
    message_id: id,
    role: "assistant",
    content,
    thinking: null,
    images: [],
    tool_calls: [],
    created_at: NOW,
  };
}

function session(id: string, title: string): AssistantSession {
  return { id, title, created_at: NOW, updated_at: NOW, messages: [], summaries: [] };
}

function summary(overrides: Partial<AssistantSummaryRecord> = {}): AssistantSummaryRecord {
  return {
    id: "s1",
    parent_id: null,
    enabled: true,
    text: "The crew reached the harbor before the tide turned.",
    covers_up_to_message_id: 12,
    ...overrides,
  };
}

function task(overrides: Partial<AssistantTask> = {}): AssistantTask {
  return {
    task_id: "t1",
    kind: "tool_call",
    label: "list_diagnostics_codes",
    state: "running",
    created_at: NOW,
    updated_at: NOW,
    job_id: null,
    profile_id: null,
    error_code: null,
    ...overrides,
  };
}

function mount_options(locale: "en" | "zh-CN" = "en") {
  const portal_target = document.createElement("div");
  document.body.append(portal_target);
  const host = document.createElement("div");
  document.body.append(host);
  return {
    global: {
      plugins: [
        createI18n({
          legacy: false,
          locale,
          fallbackLocale: "en",
          messages: { en: en_messages, "zh-CN": zh_cn_messages },
        }),
      ],
      provide: { [PORTAL_TARGET_KEY as unknown as string]: portal_target },
    },
    attachTo: host,
  };
}

function dom(): DOMWrapper<HTMLElement> {
  return new DOMWrapper(document.body);
}

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

describe("AssistantTaskTracker", () => {
  it("renders nothing while there is no tracked work", () => {
    const wrapper = mount(AssistantTaskTracker, { props: { tasks: [] }, ...mount_options() });
    expect(wrapper.find('[data-testid="assistant-task-tracker"]').exists()).toBe(false);
  });

  it("lists each task with its kind and state", () => {
    const wrapper = mount(AssistantTaskTracker, {
      props: {
        tasks: [task(), task({ task_id: "t2", kind: "image_generation", state: "completed" })],
      },
      ...mount_options(),
    });

    const rows = wrapper.findAll('[data-testid="assistant-task-row"]');
    expect(rows).toHaveLength(2);
    expect(rows[0]?.text()).toContain("list_diagnostics_codes");
    expect(rows[0]?.text()).toContain("Running");
    expect(rows[1]?.text()).toContain("Completed");
  });

  it("counts only running work in the header", () => {
    const wrapper = mount(AssistantTaskTracker, {
      props: { tasks: [task(), task({ task_id: "t2", state: "completed" })] },
      ...mount_options(),
    });
    expect(wrapper.text()).toContain("1 task running");
  });

  it("surfaces a failed task's stable error code", () => {
    const wrapper = mount(AssistantTaskTracker, {
      props: { tasks: [task({ state: "failed", error_code: "unknown_tool" })] },
      ...mount_options(),
    });
    expect(wrapper.text()).toContain("unknown_tool");
  });

  it("offers a clear action only once something has finished", async () => {
    const running = mount(AssistantTaskTracker, {
      props: { tasks: [task()] },
      ...mount_options(),
    });
    expect(running.text()).not.toContain("Clear finished");

    document.body.innerHTML = "";
    const finished = mount(AssistantTaskTracker, {
      props: { tasks: [task({ state: "completed" })] },
      ...mount_options(),
    });
    await finished.find("button").trigger("click");
    expect(finished.emitted("clear-finished")).toHaveLength(1);
  });
});

describe("AssistantSummaryPanel", () => {
  it("composes an empty state rather than a bare no-data string", () => {
    const wrapper = mount(AssistantSummaryPanel, {
      props: { summaries: [] },
      ...mount_options(),
    });
    expect(wrapper.text()).toContain("No summaries yet.");
  });

  it("shows the detail of a selected summary and hides it again on a second click", async () => {
    const wrapper = mount(AssistantSummaryPanel, {
      props: { summaries: [summary()] },
      ...mount_options(),
    });

    expect(wrapper.find('[data-testid="assistant-summary-detail"]').exists()).toBe(false);
    await wrapper.find('[data-testid="assistant-summary-row"] button').trigger("click");
    expect(wrapper.find('[data-testid="assistant-summary-detail"]').text()).toContain(
      "The crew reached the harbor before the tide turned.",
    );

    await wrapper.find('[data-testid="assistant-summary-row"] button').trigger("click");
    expect(wrapper.find('[data-testid="assistant-summary-detail"]').exists()).toBe(false);
  });

  it("reports a token estimate for the enabled summaries only", () => {
    const wrapper = mount(AssistantSummaryPanel, {
      props: {
        summaries: [summary(), summary({ id: "s2", enabled: false, text: "x".repeat(400) })],
      },
      ...mount_options(),
    });
    const estimate = wrapper.find('[data-testid="assistant-summary-tokens"]').text();
    expect(estimate).toContain("About");
    expect(estimate).not.toContain("100");
  });

  it("emits enable and regenerate intents without mutating anything itself", async () => {
    const wrapper = mount(AssistantSummaryPanel, {
      props: { summaries: [summary()] },
      ...mount_options(),
    });

    await dom().findAll('[role="switch"]')[0]?.trigger("click");
    expect(wrapper.emitted("set-enabled")?.[0]).toEqual(["s1", false]);

    const regenerate = wrapper
      .findAll("button")
      .find((button) => button.text().trim() === "Regenerate");
    await regenerate?.trigger("click");
    expect(wrapper.emitted("regenerate")?.[0]).toEqual(["s1"]);
  });

  it("requires a destructive confirmation before deleting a summary", async () => {
    const wrapper = mount(AssistantSummaryPanel, {
      props: { summaries: [summary()] },
      ...mount_options(),
    });

    const delete_button = wrapper
      .findAll("button")
      .find((button) => button.text().trim() === "Delete");
    await delete_button?.trigger("click");
    await flushPromises();

    expect(wrapper.emitted("delete")).toBeUndefined();
    expect(dom().text()).toContain("Delete this summary?");

    const confirm = dom()
      .find('[role="alertdialog"]')
      .findAll("button")
      .find((button) => button.text().trim() === "Delete");
    await confirm?.trigger("click");
    expect(wrapper.emitted("delete")?.[0]).toEqual(["s1"]);
  });
});

describe("AssistantSummaryGraph", () => {
  it("draws one node per summary and one edge per parent link", () => {
    const wrapper = mount(AssistantSummaryGraph, {
      props: {
        summaries: [
          summary({ id: "root" }),
          summary({ id: "child", parent_id: "root" }),
          summary({ id: "grandchild", parent_id: "child" }),
        ],
        selectedId: null,
      },
      ...mount_options(),
    });

    expect(wrapper.findAll('[data-testid="assistant-summary-graph-node"]')).toHaveLength(3);
    expect(wrapper.findAll("line")).toHaveLength(2);
  });

  it("places a child to the right of its parent", () => {
    const wrapper = mount(AssistantSummaryGraph, {
      props: {
        summaries: [summary({ id: "root" }), summary({ id: "child", parent_id: "root" })],
        selectedId: null,
      },
      ...mount_options(),
    });

    const rects = wrapper.findAll("rect");
    const root_x = Number(rects[0]?.attributes("x"));
    const child_x = Number(rects[1]?.attributes("x"));
    expect(child_x).toBeGreaterThan(root_x);
  });

  it("marks the selected node and emits a selection", async () => {
    const wrapper = mount(AssistantSummaryGraph, {
      props: { summaries: [summary({ id: "root" })], selectedId: "root" },
      ...mount_options(),
    });

    const node = wrapper.find('[data-testid="assistant-summary-graph-node"]');
    expect(node.attributes("data-selected")).toBe("true");
    await node.trigger("click");
    expect(wrapper.emitted("select")?.[0]).toEqual(["root"]);
  });

  it("uses only lines, rects, and text, never hand drawn path data", () => {
    const wrapper = mount(AssistantSummaryGraph, {
      props: { summaries: [summary(), summary({ id: "b", parent_id: "s1" })], selectedId: null },
      ...mount_options(),
    });
    expect(wrapper.findAll("path")).toHaveLength(0);
  });

  it("renders nothing when there are no summaries", () => {
    const wrapper = mount(AssistantSummaryGraph, {
      props: { summaries: [], selectedId: null },
      ...mount_options(),
    });
    expect(wrapper.find("svg").exists()).toBe(false);
  });
});

describe("AssistantSessionHistory", () => {
  it("lists sessions and marks the active one", () => {
    const wrapper = mount(AssistantSessionHistory, {
      props: { sessions: [session("a", "Harbor"), session("b", "Old town")], activeSessionId: "b" },
      ...mount_options(),
    });
    expect(wrapper.findAll('[data-testid="assistant-session-row"]')).toHaveLength(2);
    expect(wrapper.text()).toContain("Harbor");
  });

  it("hides the batch actions until something is selected", async () => {
    const wrapper = mount(AssistantSessionHistory, {
      props: { sessions: [session("a", "Harbor")], activeSessionId: "a" },
      ...mount_options(),
    });
    expect(wrapper.find('[data-testid="assistant-delete-selected"]').exists()).toBe(false);

    await dom().findAll('[role="switch"]')[1]?.trigger("click");
    expect(wrapper.find('[data-testid="assistant-delete-selected"]').exists()).toBe(true);
  });

  it("selects every session at once", async () => {
    const wrapper = mount(AssistantSessionHistory, {
      props: { sessions: [session("a", "Harbor"), session("b", "Old town")], activeSessionId: "a" },
      ...mount_options(),
    });

    await dom().findAll('[role="switch"]')[0]?.trigger("click");
    expect(wrapper.find('[data-testid="assistant-export-selected"]').text()).toContain("2");
  });

  it("requires a destructive confirmation before deleting a multi-selection", async () => {
    const wrapper = mount(AssistantSessionHistory, {
      props: { sessions: [session("a", "Harbor"), session("b", "Old town")], activeSessionId: "a" },
      ...mount_options(),
    });
    await dom().findAll('[role="switch"]')[0]?.trigger("click");
    await wrapper.find('[data-testid="assistant-delete-selected"]').trigger("click");
    await flushPromises();

    expect(wrapper.emitted("delete-sessions")).toBeUndefined();
    expect(dom().text()).toContain("Delete 2 chats?");

    const confirm = dom()
      .find('[role="alertdialog"]')
      .findAll("button")
      .find((button) => button.text().trim() === "Delete");
    await confirm?.trigger("click");
    expect(wrapper.emitted("delete-sessions")?.[0]).toEqual([["a", "b"]]);
  });

  it("exports a multi-selection in one action", async () => {
    const wrapper = mount(AssistantSessionHistory, {
      props: { sessions: [session("a", "Harbor"), session("b", "Old town")], activeSessionId: "a" },
      ...mount_options(),
    });
    await dom().findAll('[role="switch"]')[0]?.trigger("click");
    await wrapper.find('[data-testid="assistant-export-selected"]').trigger("click");

    expect(wrapper.emitted("export-sessions")?.[0]).toEqual([["a", "b"]]);
  });

  it("renames a session inline and ignores a blank title", async () => {
    const wrapper = mount(AssistantSessionHistory, {
      props: { sessions: [session("a", "Harbor")], activeSessionId: "a" },
      ...mount_options(),
    });

    async function open_rename(): Promise<void> {
      const rename = wrapper.findAll("button").find((b) => b.attributes("aria-label") === "Rename");
      await rename?.trigger("click");
      await flushPromises();
    }

    await open_rename();
    const input = wrapper.find('[data-testid="assistant-rename-input"]');
    await input.setValue("Harbor plans");
    await input.trigger("keydown.enter");
    expect(wrapper.emitted("rename-session")?.[0]).toEqual(["a", "Harbor plans"]);

    await open_rename();
    const blank_input = wrapper.find('[data-testid="assistant-rename-input"]');
    await blank_input.setValue("   ");
    await blank_input.trigger("keydown.enter");
    expect(wrapper.emitted("rename-session")).toHaveLength(1);
  });

  it("renders native Simplified Chinese", () => {
    const wrapper = mount(AssistantSessionHistory, {
      props: { sessions: [session("a", "港区")], activeSessionId: "a" },
      ...mount_options("zh-CN"),
    });
    expect(wrapper.text()).toContain("全选对话");
    expect(wrapper.text()).not.toContain("undefined");
  });
});

describe("use_message_pagination", () => {
  const history = Array.from({ length: 80 }, (_, index) => message(`m${String(index)}`));

  it("renders only the newest page up front", () => {
    const pagination = use_message_pagination(() => history, 30);
    expect(pagination.visible.value).toHaveLength(30);
    expect(pagination.visible.value.at(-1)?.message_id).toBe("m79");
    expect(pagination.has_older.value).toBe(true);
  });

  it("grows by one page per load and stops once everything is shown", () => {
    const pagination = use_message_pagination(() => history, 30);
    pagination.load_older();
    expect(pagination.visible.value).toHaveLength(60);

    pagination.load_older();
    expect(pagination.visible.value).toHaveLength(80);
    expect(pagination.has_older.value).toBe(false);

    pagination.load_older();
    expect(pagination.visible.value).toHaveLength(80);
  });

  it("resets back to a single page", () => {
    const pagination = use_message_pagination(() => history, 30);
    pagination.load_older();
    pagination.reset();
    expect(pagination.visible.value).toHaveLength(30);
  });

  it("reports a short history as fully visible", () => {
    const pagination = use_message_pagination(() => history.slice(0, 5), 30);
    expect(pagination.visible.value).toHaveLength(5);
    expect(pagination.has_older.value).toBe(false);
  });

  it("recognizes the scroll positions that drive paging and pinning", () => {
    const pagination = use_message_pagination(() => history, 30);
    expect(pagination.is_near_top(0)).toBe(true);
    expect(pagination.is_near_top(400)).toBe(false);
    expect(pagination.is_at_bottom(900, 1000, 100)).toBe(true);
    expect(pagination.is_at_bottom(100, 1000, 100)).toBe(false);
  });
});
