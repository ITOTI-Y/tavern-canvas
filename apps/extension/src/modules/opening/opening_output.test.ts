import { describe, expect, it } from "vitest";

import type { OpeningBookEntry } from "./opening_host.js";
import type { OpeningEntry } from "./opening_model.js";
import { plan_write, write_changes } from "./opening_output.js";

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
  { id: "c", title: "人物｜伊芙琳", constant: false, keys: ["伊芙琳"], content: "发明家" },
];

describe("plan_write", () => {
  it("matches entries to the book by name and marks them new, modified or unchanged", () => {
    expect(plan_write(entries, existing).map((row) => [row.entry.id, row.status])).toEqual([
      ["a", "modified"],
      ["b", "same"],
      ["c", "new"],
    ]);
  });

  it("writes only chosen changes, keeping a changed entry's uid, state and order", () => {
    const rows = plan_write(entries, existing);
    const changes = write_changes(rows, new Set(["a", "b", "c"]), existing);

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
        constant: false,
        keys: ["伊芙琳"],
        content: "发明家",
        enabled: true,
        order: 60,
      },
    ]);
    expect(write_changes(rows, new Set(["c"]), existing).upsert).toHaveLength(1);
  });
});
