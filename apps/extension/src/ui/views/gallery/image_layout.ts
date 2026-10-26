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
