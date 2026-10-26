import { describe, expect, it } from "vitest";

import { layout_justified_rows, type LayoutSourceItem } from "./image_layout.js";

function item(id: string, width: number | null, height: number | null): LayoutSourceItem {
  return { id, width, height };
}

describe("layout_justified_rows", () => {
  it("returns no rows for an empty item list", () => {
    expect(layout_justified_rows([], 1000, 200, 8)).toEqual([]);
  });

  it("packs items into a single row while they fit the container width", () => {
    const items = [item("a", 200, 200), item("b", 200, 200), item("c", 200, 200)];
    const rows = layout_justified_rows(items, 1000, 200, 8);
    expect(rows).toHaveLength(1);
    expect(rows[0]?.tiles).toHaveLength(3);
  });

  it("starts a new row once the next tile would overflow the container", () => {
    const items = [item("a", 400, 200), item("b", 400, 200), item("c", 400, 200)];
    const rows = layout_justified_rows(items, 850, 200, 8);
    expect(rows.length).toBeGreaterThan(1);
    for (const row of rows) {
      const total =
        row.tiles.reduce((sum, tile) => sum + tile.pixel_width, 0) + (row.tiles.length - 1) * 8;
      expect(total).toBeLessThanOrEqual(850);
    }
  });

  it("derives each tile's pixel width from its own aspect ratio at the fixed row height", () => {
    const portrait = item("portrait", 100, 200);
    const landscape = item("landscape", 200, 100);
    const rows = layout_justified_rows([portrait, landscape], 2000, 100, 8);
    const [first, second] = rows[0]?.tiles ?? [];
    expect(first?.pixel_width).toBe(50);
    expect(second?.pixel_width).toBe(200);
  });

  it("falls back to a square aspect ratio when width or height is unknown", () => {
    const unknown = item("unknown", null, null);
    const rows = layout_justified_rows([unknown], 2000, 150, 8);
    expect(rows[0]?.tiles[0]?.pixel_width).toBe(150);
  });

  it("clamps extreme aspect ratios instead of producing a sliver or a banner tile", () => {
    const extremely_wide = item("wide", 5000, 10);
    const extremely_tall = item("tall", 10, 5000);
    const rows = layout_justified_rows([extremely_wide], 10_000, 100, 8);
    const wide_width = rows[0]?.tiles[0]?.pixel_width ?? 0;
    expect(wide_width).toBeLessThan(5000 * 10);

    const tall_rows = layout_justified_rows([extremely_tall], 10_000, 100, 8);
    const tall_width = tall_rows[0]?.tiles[0]?.pixel_width ?? 0;
    expect(tall_width).toBeGreaterThan(0);
  });

  it("assigns every item to exactly one row (no drops, no duplicates)", () => {
    const items = Array.from({ length: 37 }, (_unused, index) =>
      item(`item-${String(index)}`, 160, 120),
    );
    const rows = layout_justified_rows(items, 900, 120, 8);
    const seen = rows.flatMap((row) => row.tiles.map((tile) => tile.item.id));
    expect(seen).toHaveLength(37);
    expect(new Set(seen).size).toBe(37);
  });

  it("falls back to the row height as the effective width when the container is unmeasured (0)", () => {
    const items = [item("a", 100, 100), item("b", 100, 100)];
    const rows = layout_justified_rows(items, 0, 100, 8);
    expect(rows.length).toBeGreaterThan(0);
    expect(rows.flatMap((row) => row.tiles)).toHaveLength(2);
  });
});
