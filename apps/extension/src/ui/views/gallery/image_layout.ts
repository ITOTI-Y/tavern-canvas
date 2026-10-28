export interface LayoutSourceItem {
  readonly id: string;
  readonly width: number | null;
  readonly height: number | null;
}

const DEFAULT_ASPECT_RATIO = 1;
const MIN_ASPECT_RATIO = 0.35;
const MAX_ASPECT_RATIO = 3.5;

/** Width over height, clamped so a panorama or a sliver still gets a usable tile. */
export function aspect_ratio(item: LayoutSourceItem): number {
  if (item.width === null || item.height === null || item.width <= 0 || item.height <= 0) {
    return DEFAULT_ASPECT_RATIO;
  }
  const ratio = item.width / item.height;
  return Math.min(MAX_ASPECT_RATIO, Math.max(MIN_ASPECT_RATIO, ratio));
}

/**
 * Deals the items into `column_count` columns, each to the currently shortest one (heights in
 * column widths), so the newest images stay along the top and the columns end near each other.
 */
export function layout_masonry_columns<TItem extends LayoutSourceItem>(
  items: readonly TItem[],
  column_count: number,
): readonly (readonly TItem[])[] {
  const count = Math.max(1, Math.floor(column_count));
  const columns: TItem[][] = Array.from({ length: count }, () => []);
  const heights = Array.from({ length: count }, () => 0);
  for (const item of items) {
    let shortest = 0;
    for (let index = 1; index < count; index += 1) {
      if ((heights[index] ?? 0) < (heights[shortest] ?? 0)) {
        shortest = index;
      }
    }
    columns[shortest]?.push(item);
    heights[shortest] = (heights[shortest] ?? 0) + 1 / aspect_ratio(item);
  }
  return columns;
}

export interface PlacedTile<TItem> {
  readonly item: TItem;
  readonly top: number;
  readonly height: number;
}

export interface PlacedColumn<TItem> {
  readonly tiles: readonly PlacedTile<TItem>[];
  readonly height: number;
}

/** Each tile's offset and height in pixels within a column `width` wide, tiles `gap` apart. */
export function place_column<TItem extends LayoutSourceItem>(
  items: readonly TItem[],
  width: number,
  gap: number,
): PlacedColumn<TItem> {
  const tiles: PlacedTile<TItem>[] = [];
  let top = 0;
  for (const item of items) {
    const height = width / aspect_ratio(item);
    tiles.push({ item, top, height });
    top += height + gap;
  }
  return { tiles, height: Math.max(0, top - gap) };
}
