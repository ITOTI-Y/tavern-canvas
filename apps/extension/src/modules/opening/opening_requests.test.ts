import { describe, expect, it } from "vitest";

import { AnalysisParseError } from "../illustration/analysis_error.js";
import { empty_state, type OpeningDraftPayload } from "./opening_model.js";
import {
  entries_request,
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
      { id: "opening", name: "开篇", instruction: "写开场", max_rounds: 0, output: "message" },
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

describe("opening requests", () => {
  it("puts the description, settled steps and this step's answers into the request", () => {
    const request = question_request(draft(), 1, 2);

    expect(request.user_input).toContain("一座漂浮在云海上的蒸汽城市。");
    expect(request.user_input).toContain("- 基调｜悬疑 (always active): 悬疑为主");
    expect(request.user_input).toContain("Current step: 世界观");
    expect(request.user_input).toContain("A: 晶核");
    expect(request.user_input).toContain("At most 2 more");
    expect(request.json_schema.name).toBe("tavern_canvas_opening_question");
  });

  it("reads a question, keeping at most five options, and null when the step can be written", () => {
    const request = question_request(draft(), 1, 2);
    const options = Array.from({ length: 7 }, (_, index) => ({
      label: `选项${String(index)}`,
      detail: "",
    }));

    const question = request.parse(
      JSON.stringify({ question: { text: "有哪些势力？", why: "", multiple: true, options } }),
    );

    expect(question?.options).toHaveLength(5);
    expect(request.parse('```json\n{"question": null}\n```')).toBeNull();
  });

  it("gives every written entry an id, dedupes keys and clears keys of always-active entries", () => {
    const entries = entries_request(draft(), 1).parse(
      JSON.stringify({
        entries: [
          {
            title: "势力｜公会",
            constant: false,
            keys: ["公会", " 公会 ", ""],
            content: "垄断晶核",
          },
          { title: "世界观｜艾瑟里恩", constant: true, keys: ["城"], content: "浮空城" },
        ],
      }),
    );

    expect(entries.map((entry) => entry.keys)).toEqual([["公会"], []]);
    expect(entries.every((entry) => entry.id !== "")).toBe(true);
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
      JSON.stringify({
        entry: { title: "势力｜公会", constant: false, keys: ["公会"], content: "新" },
      }),
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

  it("throws a parse error the request retries on when no valid JSON is found", () => {
    expect(() => entries_request(draft(), 1).parse('{"entries": []}')).toThrow(AnalysisParseError);
  });
});
