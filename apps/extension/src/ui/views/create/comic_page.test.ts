import { describe, expect, it } from "vitest";

import { page_rows } from "./comic_page.js";

const L = { size: { width: 1216, height: 832 } };
const P = { size: { width: 832, height: 1216 } };
const S = { size: { width: 1024, height: 1024 } };

function layout(items: readonly { size: { width: number; height: number } }[]) {
  return page_rows(items).map((row) => [row.cells.map((cell) => cell.index), row.narrow]);
}

describe("page_rows", () => {
  it("puts two panels in a row when they fit side by side, in reading order", () => {
    expect(layout([L, L, P, L, S])).toEqual([
      [[0], false],
      [[1, 2], false],
      [[3], false],
      [[4], true],
    ]);
    expect(layout([P, S, S, S])).toEqual([
      [[0, 1], false],
      [[2, 3], false],
    ]);
  });
});
