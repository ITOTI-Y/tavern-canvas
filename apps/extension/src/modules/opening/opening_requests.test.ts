import { describe, expect, it } from "vitest";

import { AnalysisParseError } from "../illustration/analysis_error.js";
import { empty_state, type OpeningDraftPayload } from "./opening_model.js";
import {
  entries_request,
  follow_up_request,
  message_request,
  question_request,
  rewrite_request,
} from "./opening_requests.js";

function draft(): OpeningDraftPayload {
  return {
    kind: "draft",
    display_name: "雾港",
    created_at: "2026-11-14T00:00:00.000Z",
    description: "一座漂浮在云海上的蒸汽城市。",
    template_name: "默认模板",
    steps: [
      { id: "genre", name: "题材", instruction: "确定题材", max_rounds: 1, output: "entries" },
      { id: "world", name: "世界观", instruction: "确定势力", max_rounds: 3, output: "entries" },
      { id: "opening", name: "开篇", instruction: "写开场", max_rounds: 1, output: "message" },
    ],
    states: [
      {
        ...empty_state(),
        status: "done",
        entries: [{ id: "a", title: "基调｜悬疑", constant: true, keys: [], content: "悬疑为主" }],
      },
      {
        ...empty_state(),
        status: "asking",
        answers: [
          {
            question: {
              text: "靠什么漂浮？",
              why: "",
              multiple: false,
              options: [
                { label: "晶核", detail: "" },
                { label: "气囊", detail: "" },
              ],
            },
            selected: ["晶核"],
            other: "",
          },
        ],
      },
      empty_state(),
    ],
    current: 1,
    started: true,
    connection: { kind: "analysis" },
    preset_name: "in_use",
    worldbooks: [],
    card: null,
    use_greeting: false,
    written: {},
  };
}

const QUESTION = {
  text: "有哪些势力？",
  why: "",
  multiple: true,
  options: Array.from({ length: 7 }, (_, index) => ({ label: `选项${String(index)}`, detail: "" })),
};

const ENTRY = {
  title: "势力｜公会",
  constant: false,
  keys: ["公会", " 公会 ", ""],
  content: "垄断晶核",
};
const CONSTANT = { title: "世界观｜艾瑟里恩", constant: true, keys: ["城"], content: "浮空城" };
const BROKEN = { title: "", constant: false, keys: [], content: "" };

const call = (name: string, value: unknown) => ({ name, arguments: JSON.stringify(value) });

const OPEN = [
  { aspect: "势力", settled: true },
  { aspect: "地点", settled: false },
];
const SETTLED = [{ aspect: "势力", settled: true }];

describe("opening question request", () => {
  it("puts the description, settled steps and this step's answers into both modes' input", () => {
    const request = question_request(draft(), 1, 2);

    for (const input of [request.user_input, request.tools?.user_input ?? ""]) {
      expect(input).toContain("一座漂浮在云海上的蒸汽城市。");
      expect(input).toContain("- 基调｜悬疑 (always active): 悬疑为主");
      expect(input).toContain("A: 晶核");
      expect(input).toContain("at most 2 more");
    }
    expect(request.tools?.choice).toBe("required");
    expect(request.tools?.tools.map((tool) => tool.name)).toEqual(["ask_question", "step_ready"]);
  });

  it("reads a question from the ask tool, keeping at most five options", () => {
    const question = question_request(draft(), 1, 2).tools?.parse(
      [call("ask_question", { aspects: OPEN, question: QUESTION })],
      "",
    );

    expect(question?.options).toHaveLength(5);
  });

  it("reports the step ready only when every listed aspect is settled", () => {
    const request = question_request(draft(), 1, 2);

    expect(request.tools?.parse([call("step_ready", { aspects: SETTLED })], "")).toBeNull();
    expect(() => request.tools?.parse([call("step_ready", { aspects: OPEN })], "")).toThrow(
      AnalysisParseError,
    );
    expect(request.parse(JSON.stringify({ aspects: SETTLED, question: null }))).toBeNull();
    expect(() => request.parse(JSON.stringify({ aspects: OPEN, question: null }))).toThrow(
      AnalysisParseError,
    );
    expect(() => request.parse(JSON.stringify({ aspects: [], question: null }))).toThrow(
      AnalysisParseError,
    );
  });

  it("falls back to the reply's text when the model answered without calling a tool", () => {
    const question = question_request(draft(), 1, 2).tools?.parse(
      [],
      "```json\n" + JSON.stringify({ aspects: OPEN, question: QUESTION }) + "\n```",
    );

    expect(question).toMatchObject({ text: "有哪些势力？" });
  });
});

describe("opening follow-up question", () => {
  it("forces a question about a written step and shows the model the current result", () => {
    const written = draft();
    written.states[1] = { ...empty_state(), status: "done", entries: [{ id: "b", ...CONSTANT }] };
    const request = follow_up_request(written, 1, "", []);

    expect(request.tools?.tools.map((tool) => tool.name)).toEqual(["ask_question"]);
    expect(request.tools?.choice).toEqual({ name: "ask_question" });
    expect(request.json_schema.value).toMatchObject({ required: ["question"] });
    expect(request.tools?.user_input).toContain("- 世界观｜艾瑟里恩 (always active): 浮空城");
    expect(request.tools?.parse([call("ask_question", QUESTION)], "").options).toHaveLength(5);
    expect(() => request.parse(JSON.stringify({ question: null }))).toThrow(AnalysisParseError);
  });

  it("steers the question toward what the user asked about", () => {
    const steered = follow_up_request(draft(), 1, "  反派的动机 ", []);

    expect(steered.user_input).toContain("The user wants the question to be about: 反派的动机.");
    expect(follow_up_request(draft(), 1, "", []).user_input).not.toContain(
      "wants the question to be about",
    );
  });

  it("asks anew from every question the user turned down and their feedback", () => {
    const request = follow_up_request(draft(), 1, "", [
      { question: QUESTION, feedback: "" },
      { question: { ...QUESTION, text: "主角的身份？" }, feedback: " 想要更黑暗的选项 " },
    ]);

    expect(request.user_input).toContain("1. 有哪些势力？");
    expect(request.user_input).toContain("The user gave no reason.");
    expect(request.user_input).toContain("2. 主角的身份？");
    expect(request.user_input).toContain("The user's feedback: 想要更黑暗的选项");
    expect(request.user_input).toContain(
      "Do not repeat a question or option the user turned down.",
    );
  });
});

describe("opening write requests", () => {
  it("validates entries one by one in both modes and fails only when none is usable", () => {
    const request = entries_request(draft(), 1);

    expect(request.parse(JSON.stringify({ entries: [ENTRY, BROKEN] })).dropped).toBe(1);
    expect(request.tools?.parse([call("add_entry", CONSTANT)], "").entries).toHaveLength(1);
    expect(() => request.parse(JSON.stringify({ entries: [BROKEN] }))).toThrow(AnalysisParseError);
  });

  it("keeps the rewritten entry's id and reads the opening message", () => {
    const entry = {
      id: "keep",
      title: "势力｜公会",
      constant: false,
      keys: ["公会"],
      content: "旧",
    };
    const rewritten = rewrite_request(draft(), 1, entry).parse(
      JSON.stringify({ entry: { ...ENTRY, content: "新" } }),
    );
    const message = message_request(draft(), 2).parse(
      'Sure:\n{"speaker": "伊芙琳", "text": "雾从排气口涌出来。"}',
    );

    expect(rewritten).toMatchObject({ id: "keep", content: "新" });
    expect(message).toEqual({ speaker: "伊芙琳", text: "雾从排气口涌出来。" });
  });

  it("sends the chosen character card as background, and its first message only when asked", () => {
    const card = {
      name: "Seraphina",
      description: "森林的守护者",
      personality: "温柔",
      scenario: "",
      first_message: "你在林间醒来。",
    };
    const without = question_request({ ...draft(), card }, 1, 2).user_input;
    const with_greeting = question_request(
      { ...draft(), card, use_greeting: true },
      1,
      2,
    ).user_input;

    expect(without).toContain("Character card of Seraphina");
    expect(without).toContain("Description: 森林的守护者");
    expect(without).not.toContain("Scenario:");
    expect(without).not.toContain("你在林间醒来。");
    expect(with_greeting).toContain("你在林间醒来。");
  });
});
