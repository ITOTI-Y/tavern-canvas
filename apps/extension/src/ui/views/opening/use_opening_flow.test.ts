import { describe, expect, it, vi } from "vitest";

import { AnalysisStoppedError } from "../../../modules/illustration/analysis_error.js";
import { empty_state, type OpeningDraft } from "../../../modules/opening/opening_model.js";
import type { OpeningPort, OpeningStructuredRequest } from "../../contracts/opening_port.js";
import { use_opening_flow } from "./use_opening_flow.js";
import { use_opening_store } from "./use_opening_store.js";

const QUESTION = {
  text: "有哪些势力？",
  why: "",
  multiple: true,
  options: [
    { label: "公会", detail: "" },
    { label: "商团", detail: "" },
  ],
};

function new_draft(): OpeningDraft {
  return {
    id: "d1",
    kind: "draft",
    display_name: "雾港",
    created_at: "2026-11-14T00:00:00.000Z",
    description: "蒸汽城市",
    template_name: "默认模板",
    steps: [
      { id: "world", name: "世界观", instruction: "", max_rounds: 1, output: "entries" },
      { id: "opening", name: "开篇", instruction: "", max_rounds: 0, output: "message" },
    ],
    states: [empty_state(), empty_state()],
    current: 0,
    started: true,
    connection: { kind: "analysis" },
    preset_name: "in_use",
    worldbooks: [],
    card: null,
    use_greeting: false,
    written: {},
  };
}

/** Answers each request kind with the reply its schema expects, recording the order. */
function fake_port(replies: Record<string, string[]>): { port: OpeningPort; asked: string[] } {
  const asked: string[] = [];
  const port: OpeningPort = {
    request<T>(request: OpeningStructuredRequest<T>): Promise<T> {
      asked.push(request.json_schema.name);
      const reply = replies[request.json_schema.name]?.shift();
      if (reply === undefined) {
        return Promise.reject(new Error(`no reply for ${request.json_schema.name}`));
      }
      return Promise.resolve(request.parse(reply));
    },
    request_lean: () => Promise.reject(new Error("unused")),
    host: () => Promise.reject(new Error("unused")),
  };
  return { port, asked };
}

describe("use_opening_flow", () => {
  it("asks within the round limit, writes the step, and marks later results stale on a re-ask", async () => {
    const save = vi.fn(() => Promise.resolve());
    const store = use_opening_store({
      records: () => [],
      save,
      remove: () => Promise.resolve(),
      on_save_error: (error) => {
        throw error;
      },
    });
    const { port, asked } = fake_port({
      tavern_canvas_opening_next: [
        JSON.stringify({ aspects: [{ aspect: "势力", settled: false }], question: QUESTION }),
      ],
      tavern_canvas_opening_entries: [
        JSON.stringify({
          entries: [{ title: "势力｜公会", constant: false, keys: ["公会"], content: "垄断晶核" }],
        }),
      ],
      tavern_canvas_opening_message: [JSON.stringify({ speaker: "伊芙琳", text: "雾很浓。" })],
    });
    const flow = use_opening_flow(port, store);
    await store.add(new_draft());
    const draft = (): OpeningDraft => store.draft("d1") as OpeningDraft;

    await flow.run_step(draft(), 0);
    expect(draft().states[0]?.question?.text).toBe("有哪些势力？");

    await flow.answer(draft(), ["公会"], "没落贵族");
    expect(draft().states[0]).toMatchObject({ status: "done", question: null });
    expect(draft().states[0]?.answers[0]).toMatchObject({ selected: ["公会"], other: "没落贵族" });

    await flow.next(draft());
    expect(draft().states[1]).toMatchObject({ status: "done", message: { speaker: "伊芙琳" } });
    expect(asked).toEqual([
      "tavern_canvas_opening_next",
      "tavern_canvas_opening_entries",
      "tavern_canvas_opening_message",
    ]);

    flow.reask(draft(), 0, 0);
    expect(draft().states[0]).toMatchObject({ status: "asking", answers: [] });
    expect(draft().states[0]?.question?.text).toBe("有哪些势力？");
    expect(draft().states[1]?.status).toBe("stale");
    expect(save).toHaveBeenCalled();
  });

  it("writes the step once the model reports every aspect settled", async () => {
    const store = use_opening_store({
      records: () => [],
      save: () => Promise.resolve(),
      remove: () => Promise.resolve(),
      on_save_error: () => {},
    });
    const { port, asked } = fake_port({
      tavern_canvas_opening_next: [
        JSON.stringify({ aspects: [{ aspect: "势力", settled: true }], question: null }),
      ],
      tavern_canvas_opening_entries: [
        JSON.stringify({
          entries: [{ title: "势力｜公会", constant: false, keys: ["公会"], content: "垄断晶核" }],
        }),
      ],
    });
    const flow = use_opening_flow(port, store);
    await store.add(new_draft());

    await flow.run_step(store.draft("d1") as OpeningDraft, 0);

    expect(asked).toEqual(["tavern_canvas_opening_next", "tavern_canvas_opening_entries"]);
    expect(store.draft("d1")?.states[0]).toMatchObject({ status: "done", question: null });
  });

  it("asks one more question about a written step instead of writing it again", async () => {
    const store = use_opening_store({
      records: () => [],
      save: () => Promise.resolve(),
      remove: () => Promise.resolve(),
      on_save_error: () => {},
    });
    const { port, asked } = fake_port({
      tavern_canvas_opening_question: [JSON.stringify({ question: QUESTION })],
    });
    const flow = use_opening_flow(port, store);
    const written = new_draft();
    written.states[0] = {
      ...empty_state(),
      status: "done",
      entries: [
        { id: "a", title: "势力｜公会", constant: false, keys: ["公会"], content: "垄断晶核" },
      ],
    };
    await store.add(written);

    await flow.ask_more(store.draft("d1") as OpeningDraft, 0, "");

    expect(asked).toEqual(["tavern_canvas_opening_question"]);
    expect(store.draft("d1")?.states[0]).toMatchObject({
      status: "asking",
      question: { text: "有哪些势力？" },
      entries: [{ id: "a" }],
    });
  });

  it("keeps a failed request's error for the page and leaves the step asking", async () => {
    const store = use_opening_store({
      records: () => [],
      save: () => Promise.resolve(),
      remove: () => Promise.resolve(),
      on_save_error: () => {},
    });
    const { port } = fake_port({});
    const flow = use_opening_flow(port, store);
    await store.add(new_draft());
    const draft = store.draft("d1") as OpeningDraft;

    await flow.run_step(draft, 0);

    expect(flow.error("d1")).toBeInstanceOf(Error);
    expect(flow.busy("d1")).toBeNull();
    expect(store.draft("d1")?.states[0]).toMatchObject({ status: "asking", question: null });
  });

  function written_store() {
    const store = use_opening_store({
      records: () => [],
      save: () => Promise.resolve(),
      remove: () => Promise.resolve(),
      on_save_error: () => {},
    });
    const item = new_draft();
    item.states[0] = {
      ...empty_state(),
      status: "done",
      entries: [
        { id: "a", title: "势力｜公会", constant: false, keys: ["公会"], content: "垄断晶核" },
      ],
    };
    return { store, item };
  }

  it("stops a running question without an error and leaves the written step as it was", async () => {
    const { store, item } = written_store();
    const port: OpeningPort = {
      request<T>(_request: OpeningStructuredRequest<T>, _options: unknown, signal: AbortSignal) {
        return new Promise<T>((_resolve, reject) => {
          signal.addEventListener("abort", () => {
            reject(new AnalysisStoppedError("cancelled"));
          });
        });
      },
      request_lean: () => Promise.reject(new Error("unused")),
      host: () => Promise.reject(new Error("unused")),
    };
    const flow = use_opening_flow(port, store);
    await store.add(item);
    const draft = store.draft("d1") as OpeningDraft;

    const asking = flow.ask_more(draft, 0, "");
    flow.cancel(draft);
    await asking;

    expect(flow.error("d1")).toBeNull();
    expect(flow.busy("d1")).toBeNull();
    expect(store.draft("d1")?.states[0]).toMatchObject({ status: "done", question: null });
  });

  it("asks again with every question turned down, then drops the question back to the result", async () => {
    const { store, item } = written_store();
    const inputs: string[] = [];
    const port: OpeningPort = {
      request<T>(request: OpeningStructuredRequest<T>): Promise<T> {
        inputs.push(request.user_input);
        return Promise.resolve(
          request.parse(
            JSON.stringify({ question: { ...QUESTION, text: `问题${String(inputs.length)}` } }),
          ),
        );
      },
      request_lean: () => Promise.reject(new Error("unused")),
      host: () => Promise.reject(new Error("unused")),
    };
    const flow = use_opening_flow(port, store);
    await store.add(item);
    const draft = store.draft("d1") as OpeningDraft;

    await flow.ask_more(draft, 0, "");
    await flow.refine_question(draft, "太温和");
    await flow.refine_question(draft, "");

    expect(inputs[2]).toContain("1. 问题1");
    expect(inputs[2]).toContain("The user's feedback: 太温和");
    expect(inputs[2]).toContain("2. 问题2");
    expect(store.draft("d1")?.states[0]?.question?.text).toBe("问题3");

    flow.cancel_question(draft);

    expect(store.draft("d1")?.states[0]).toMatchObject({
      status: "done",
      question: null,
      entries: [{ id: "a" }],
    });
  });
});
