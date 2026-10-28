import { describe, expect, it } from "vitest";

import { layout_masonry_columns, place_column, type LayoutSourceItem } from "./image_layout.js";

function item(id: string, width: number | null, height: number | null): LayoutSourceItem {
  return { id, width, height };
}

function ids(columns: readonly (readonly LayoutSourceItem[])[]): string[][] {
  return columns.map((column) => column.map((entry) => entry.id));
}

describe("layout_masonry_columns", () => {
  it("returns empty columns for an empty item list", () => {
    expect(layout_masonry_columns([], 3)).toEqual([[], [], []]);
  });

  it("deals equal squares across the columns in order, keeping the newest along the top", () => {
    const items = ["a", "b", "c", "d", "e"].map((id) => item(id, 100, 100));
    expect(ids(layout_masonry_columns(items, 3))).toEqual([["a", "d"], ["b", "e"], ["c"]]);
  });

  it("places the next item under the shortest column", () => {
    const items = [item("tall", 100, 300), item("wide", 300, 100), item("next", 100, 100)];
    expect(ids(layout_masonry_columns(items, 2))).toEqual([["tall"], ["wide", "next"]]);
  });

  it("treats a missing size as a square and clamps extreme ratios", () => {
    const items = [item("unknown", null, null), item("needle", 10, 1000), item("square", 50, 50)];
    expect(ids(layout_masonry_columns(items, 2))).toEqual([["unknown", "square"], ["needle"]]);
  });

  it("uses at least one column", () => {
    expect(ids(layout_masonry_columns([item("a", 1, 1)], 0))).toEqual([["a"]]);
  });
});

describe("place_column", () => {
  it("stacks tiles at their aspect-ratio height with the gap between them", () => {
    const column = place_column([item("a", 200, 100), item("b", 100, 200)], 100, 10);
    expect(column.tiles.map(({ top, height }) => [top, height])).toEqual([
      [0, 50],
      [60, 200],
    ]);
    expect(column.height).toBe(260);
  });

  it("has no height without tiles", () => {
    expect(place_column([], 100, 10).height).toBe(0);
  });
});
