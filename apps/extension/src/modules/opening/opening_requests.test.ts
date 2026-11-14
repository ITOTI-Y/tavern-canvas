import { describe, expect, it } from "vitest";

import { AnalysisParseError } from "../illustration/analysis_error.js";
import { empty_state, type OpeningDraftPayload } from "./opening_model.js";
import {
  entries_request,
  message_request,
  rewrite_request,
  turn_request,
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

describe("opening turn request", () => {
  it("puts the description, settled steps and this step's answers into both modes' input", () => {
    const request = turn_request(draft(), 1, 2);

    for (const input of [request.user_input, request.tools?.user_input ?? ""]) {
      expect(input).toContain("一座漂浮在云海上的蒸汽城市。");
      expect(input).toContain("- 基调｜悬疑 (always active): 悬疑为主");
      expect(input).toContain("A: 晶核");
      expect(input).toContain("at most 2 more");
    }
    expect(request.tools?.choice).toBe("required");
    expect(request.tools?.tools.map((tool) => tool.name)).toEqual(["ask_question", "add_entry"]);
  });

  it("reads a question from the ask tool, keeping at most five options", () => {
    const turn = turn_request(draft(), 1, 2).tools?.parse([call("ask_question", QUESTION)], "");

    expect(turn).toMatchObject({ kind: "question" });
    expect(turn?.kind === "question" ? turn.question.options : []).toHaveLength(5);
  });

  it("writes the step from parallel add_entry calls, leaving out a malformed one", () => {
    const turn = turn_request(draft(), 1, 2).tools?.parse(
      [call("add_entry", ENTRY), call("add_entry", BROKEN), call("add_entry", CONSTANT)],
      "",
    );

    expect(turn).toMatchObject({ kind: "entries", dropped: 1 });
    expect(turn?.kind === "entries" ? turn.entries.map((entry) => entry.keys) : []).toEqual([
      ["公会"],
      [],
    ]);
  });

  it("reads the JSON form: a question, or a null question with the entries", () => {
    const request = turn_request(draft(), 1, 2);

    expect(request.parse(JSON.stringify({ question: QUESTION, entries: [] })).kind).toBe(
      "question",
    );
    expect(request.parse(JSON.stringify({ question: null, entries: [ENTRY] }))).toMatchObject({
      kind: "entries",
      dropped: 0,
    });
  });

  it("asks or writes the message on a message step", () => {
    const request = turn_request({ ...draft(), current: 2 }, 2, 1);

    expect(request.tools?.tools.map((tool) => tool.name)).toEqual([
      "ask_question",
      "write_message",
    ]);
    expect(
      request.tools?.parse([call("write_message", { speaker: "伊芙琳", text: "雾很浓。" })], ""),
    ).toEqual({ kind: "message", message: { speaker: "伊芙琳", text: "雾很浓。" } });
    expect(
      request.parse(
        JSON.stringify({ question: null, message: { speaker: "伊芙琳", text: "雾。" } }),
      ),
    ).toMatchObject({ kind: "message" });
  });

  it("falls back to the reply's text when the model answered without calling a tool", () => {
    const turn = turn_request(draft(), 1, 2).tools?.parse(
      [],
      '```json\n{"question": null, "entries": [{"title": "地点｜锈街", "constant": false, "keys": ["锈街"], "content": "雾"}]}\n```',
    );

    expect(turn).toMatchObject({ kind: "entries" });
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
    const without = turn_request({ ...draft(), card }, 1, 2).user_input;
    const with_greeting = turn_request({ ...draft(), card, use_greeting: true }, 1, 2).user_input;

    expect(without).toContain("Character card of Seraphina");
    expect(without).toContain("Description: 森林的守护者");
    expect(without).not.toContain("Scenario:");
    expect(without).not.toContain("你在林间醒来。");
    expect(with_greeting).toContain("你在林间醒来。");
  });
});
