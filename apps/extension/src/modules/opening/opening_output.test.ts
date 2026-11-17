import { describe, expect, it } from "vitest";

import type { OpeningBookEntry } from "./opening_host.js";
import type { OpeningEntry, WrittenEntry } from "./opening_model.js";
import { plan_write, write_changes, written_after, type WritePlacement } from "./opening_output.js";

const existing: OpeningBookEntry[] = [
  {
    uid: 4,
    name: "势力｜公会",
    enabled: false,
    constant: false,
    keys: ["公会"],
    content: "旧",
    order: 30,
  },
  {
    uid: 7,
    name: "地点｜锈街",
    enabled: true,
    constant: false,
    keys: ["锈街", "下层"],
    content: "雾",
    order: 50,
  },
];

const entries: OpeningEntry[] = [
  { id: "a", title: " 势力｜公会 ", constant: false, keys: ["公会"], content: "新" },
  { id: "b", title: "地点｜锈街", constant: false, keys: ["下层", "锈街"], content: "雾" },
  { id: "c", title: "人物｜伊芙琳", constant: true, keys: ["伊芙琳"], content: "发明家" },
];

const PLACEMENT: WritePlacement = {
  position: "after_character_definition",
  depth: 4,
  constant_no_recursion: true,
};

function written(entry_id: string, uid: number, name: string, content: string): WrittenEntry {
  return { entry_id, uid, name, constant: false, keys: ["公会"], content };
}

const statuses = (rows: ReturnType<typeof plan_write>) =>
  rows.map((row) => [row.key, row.status, row.suggested]);

describe("plan_write", () => {
  it("matches entries never written by name and marks them new, changed or the same", () => {
    expect(statuses(plan_write(entries, existing, []))).toEqual([
      ["a", "changed", true],
      ["b", "same", false],
      ["c", "new", true],
    ]);
  });

  it("tells a draft change from a book edit, both, and a deleted book entry by the last write", () => {
    const book: OpeningBookEntry[] = [
      { ...existing[0], content: "书里改过" } as OpeningBookEntry,
      {
        uid: 9,
        name: "设定｜晶核",
        enabled: true,
        constant: false,
        keys: ["晶核"],
        content: "能源",
        order: 60,
      },
      {
        uid: 10,
        name: "设定｜雾",
        enabled: true,
        constant: false,
        keys: ["雾"],
        content: "毒雾",
        order: 70,
      },
    ];
    const draft: OpeningEntry[] = [
      { id: "a", title: "势力｜公会", constant: false, keys: ["公会"], content: "开篇改过" },
      { id: "d", title: "设定｜晶核", constant: false, keys: ["晶核"], content: "旧能源" },
      { id: "e", title: "设定｜雾", constant: false, keys: ["雾"], content: "开篇改过" },
      { id: "f", title: "设定｜钟塔", constant: false, keys: ["钟塔"], content: "报时" },
    ];
    const base: WrittenEntry[] = [
      written("a", 4, "势力｜公会", "旧"),
      {
        entry_id: "d",
        uid: 9,
        name: "设定｜晶核",
        constant: false,
        keys: ["晶核"],
        content: "旧能源",
      },
      { entry_id: "e", uid: 10, name: "设定｜雾", constant: false, keys: ["雾"], content: "毒雾" },
      {
        entry_id: "f",
        uid: 11,
        name: "设定｜钟塔",
        constant: false,
        keys: ["钟塔"],
        content: "报时",
      },
    ];

    expect(statuses(plan_write(draft, book, base))).toEqual([
      ["a", "conflict", false],
      ["d", "book_edited", false],
      ["e", "changed", true],
      ["f", "book_deleted", false],
    ]);
  });

  it("updates the book entry of a regenerated entry with the same name instead of adding a duplicate", () => {
    const regenerated: OpeningEntry[] = [
      { id: "new-a", title: "势力｜公会", constant: false, keys: ["公会"], content: "重新生成" },
    ];

    expect(
      statuses(plan_write(regenerated, existing, [written("a", 4, "势力｜公会", "旧")])),
    ).toEqual([["new-a", "changed", true]]);
  });

  it("offers to delete a written entry the draft dropped, ticked only when the book left it alone", () => {
    const base = [written("a", 4, "势力｜公会", "旧"), written("x", 7, "地点｜锈街", "别的")];

    expect(statuses(plan_write([], existing, base))).toEqual([
      ["book:4", "removed", true],
      ["book:7", "removed", false],
    ]);
  });
});

describe("write_changes", () => {
  it("places new entries, keeps a changed entry's uid, state and order, and deletes chosen removals", () => {
    const rows = [
      ...plan_write(entries, existing, []),
      ...plan_write([], existing, [written("x", 7, "地点｜锈街", "雾")]).filter(
        (row) => row.status === "removed",
      ),
    ];
    const changes = write_changes(rows, new Set(["a", "b", "c", "book:7"]), existing, PLACEMENT);

    expect(changes.upsert).toEqual([
      {
        name: " 势力｜公会 ",
        constant: false,
        keys: ["公会"],
        content: "新",
        uid: 4,
        enabled: false,
        order: 30,
      },
      {
        name: "人物｜伊芙琳",
        constant: true,
        keys: [],
        content: "发明家",
        enabled: true,
        order: 60,
        placement: { position: "after_character_definition", depth: 4, prevent_outgoing: true },
      },
    ]);
    expect(changes.remove).toEqual([7]);
    expect(write_changes(rows, new Set(["c"]), existing, PLACEMENT).upsert).toHaveLength(1);
  });
});

describe("written_after", () => {
  it("records what the book now holds from the draft and keeps the snapshot of skipped entries", () => {
    const base = [written("a", 4, "势力｜公会", "旧")];
    const rows = plan_write(entries, existing, base);
    const book_after: OpeningBookEntry[] = [
      ...existing,
      {
        uid: 12,
        name: "人物｜伊芙琳",
        enabled: true,
        constant: true,
        keys: [],
        content: "发明家",
        order: 60,
      },
    ];

    expect(written_after(rows, new Set(["c"]), book_after, base)).toEqual([
      base[0],
      {
        entry_id: "b",
        uid: 7,
        name: "地点｜锈街",
        constant: false,
        keys: ["下层", "锈街"],
        content: "雾",
      },
      { entry_id: "c", uid: 12, name: "人物｜伊芙琳", constant: true, keys: [], content: "发明家" },
    ]);
  });
});
