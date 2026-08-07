/**
 * Justified-row masonry layout: every row shares one fixed height (so it can be virtualized as a
 * single fixed-size VirtualList row, unlike a true Pinterest-style column masonry, which needs
 * every item present in the DOM to flow correctly), and each tile's *width* inside that row scales
 * to its own aspect ratio -- giving the varied-width masonry look while keeping windowing.
 *
 * Every tile's box is sized from GalleryRecordSummary.width/height, known before any image byte
 * ever loads, which is what makes "stable dimensions before load" possible at all: a record with
 * unknown dimensions (width/height null) falls back to a square aspect ratio rather than guessing.
 */
export interface LayoutSourceItem {
  readonly id: string;
  readonly width: number | null;
  readonly height: number | null;
}

export interface LayoutTile<TItem> {
  readonly item: TItem;
  readonly pixel_width: number;
}

export interface LayoutRow<TItem> {
  readonly key: string;
  readonly tiles: readonly LayoutTile<TItem>[];
}

const DEFAULT_ASPECT_RATIO = 1;
const MIN_ASPECT_RATIO = 0.35;
const MAX_ASPECT_RATIO = 3.5;

function aspect_ratio(item: LayoutSourceItem): number {
  if (item.width === null || item.height === null || item.width <= 0 || item.height <= 0) {
    return DEFAULT_ASPECT_RATIO;
  }
  const ratio = item.width / item.height;
  return Math.min(MAX_ASPECT_RATIO, Math.max(MIN_ASPECT_RATIO, ratio));
}

/**
 * Packs `items` into fixed-height rows for a `container_width`-wide viewport. Greedy left-to-right
 * packing (not full row-justification/stretch): a row closes as soon as the next tile would
 * overflow the container, so the last tile in a row keeps its natural aspect-derived width instead
 * of being stretched to fill -- simpler and avoids the iterative rebalancing a true justified
 * gallery needs, at the cost of a ragged (not flush) right edge on most rows.
 */
export function layout_justified_rows<TItem extends LayoutSourceItem>(
  items: readonly TItem[],
  container_width: number,
  row_height: number,
  gap: number,
): readonly LayoutRow<TItem>[] {
  if (items.length === 0) {
    return [];
  }
  const safe_width = container_width > 0 ? container_width : row_height;

  const rows: LayoutRow<TItem>[] = [];
  let current: LayoutTile<TItem>[] = [];
  let current_width = 0;

  function flush(): void {
    if (current.length > 0) {
      rows.push({ key: current[0]?.item.id ?? String(rows.length), tiles: current });
      current = [];
      current_width = 0;
    }
  }

  for (const item of items) {
    const pixel_width = Math.round(row_height * aspect_ratio(item));
    const next_width = current_width + (current.length > 0 ? gap : 0) + pixel_width;
    if (current.length > 0 && next_width > safe_width) {
      flush();
      current.push({ item, pixel_width });
      current_width = pixel_width;
    } else {
      current.push({ item, pixel_width });
      current_width = next_width;
    }
  }
  flush();

  return rows;
}
