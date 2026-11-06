import type { ImageSize } from "../../../modules/creation/creation_record.js";

export interface PageCell<T> {
  readonly item: T;
  /** Reading order across the whole page. */
  readonly index: number;
  /** Width over height; cells in one row grow by it so their heights match. */
  readonly ratio: number;
}

export interface PageRow<T> {
  readonly cells: readonly PageCell<T>[];
  /** A lone portrait or square panel, drawn at half the page width instead of the full width. */
  readonly narrow: boolean;
}

/**
 * The widest pair one row takes, as the sum of the two width-to-height ratios: a landscape beside
 * a portrait fits (about 2.1), two landscapes (about 2.9) would leave both too short.
 */
const MAX_ROW_RATIO = 2.2;

/** Lays panels out in reading order as comic-page rows of one or two panels of equal height. */
export function page_rows<T extends { readonly size: ImageSize }>(
  items: readonly T[],
): PageRow<T>[] {
  const rows: PageRow<T>[] = [];
  let open: PageCell<T> | null = null;
  const close = (cells: readonly PageCell<T>[]): void => {
    rows.push({ cells, narrow: cells.length === 1 && (cells[0]?.ratio ?? 0) <= 1 });
  };
  for (const [index, item] of items.entries()) {
    const cell = { item, index, ratio: item.size.width / item.size.height };
    if (open === null) {
      open = cell;
    } else if (open.ratio + cell.ratio <= MAX_ROW_RATIO) {
      close([open, cell]);
      open = null;
    } else {
      close([open]);
      open = cell;
    }
  }
  if (open !== null) {
    close([open]);
  }
  return rows;
}
