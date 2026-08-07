export type ParityStatus = "ported" | "removed_approved";

export interface ParityRow {
  readonly id: string;
  readonly group: string;
  readonly v2_entry: string;
  readonly v3_owner: string;
  readonly status: string;
  readonly acceptance_test: string;
  readonly notes: string;
  readonly line: number;
}

const HEADING_PATTERN = /^##\s+(.+?)\s*$/u;
const TABLE_ROW_PATTERN = /^\|(.*)\|\s*$/u;
const SEPARATOR_CELL_PATTERN = /^:?-+:?$/u;
const EXPECTED_COLUMN_COUNT = 6;

function split_row_cells(row_text: string): string[] {
  return row_text.split("|").map((cell) => cell.trim());
}

function is_separator_row(cells: readonly string[]): boolean {
  return cells.every((cell) => SEPARATOR_CELL_PATTERN.test(cell));
}

function is_header_row(cells: readonly string[]): boolean {
  return cells[0]?.toLowerCase() === "id";
}

/**
 * Parses the parity matrix Markdown into structured rows.
 *
 * Format contract (documented in docs/parity/feature_matrix.md's header, kept in lockstep with
 * this parser): each of the 18 group sections starts with a `## {group name}` heading using the
 * group name verbatim from the task brief, immediately followed by a GitHub-flavored Markdown
 * table with exactly six columns in this order: `ID | V2 Entry | V3 Owner | Status | Acceptance
 * Test | Notes`. Parsing is purely mechanical here -- it does not know which group names or
 * status values are valid; `index.ts` owns those domain rules so this module stays a stable,
 * reusable Markdown-table reader.
 */
export function parse_matrix(content: string): ParityRow[] {
  const rows: ParityRow[] = [];
  const lines = content.split(/\r?\n/u);
  let current_group = "";

  for (const [index, raw_line] of lines.entries()) {
    const line_number = index + 1;
    const heading_match = HEADING_PATTERN.exec(raw_line);
    if (heading_match?.[1] !== undefined) {
      current_group = heading_match[1];
      continue;
    }

    const table_match = TABLE_ROW_PATTERN.exec(raw_line);
    if (!table_match?.[1]) {
      continue;
    }

    const cells = split_row_cells(table_match[1]);
    if (is_separator_row(cells) || is_header_row(cells)) {
      continue;
    }
    if (cells.length !== EXPECTED_COLUMN_COUNT) {
      throw new SyntaxError(
        `feature_matrix.md:${String(line_number)}: expected ${String(EXPECTED_COLUMN_COUNT)} ` +
          `columns, found ${String(cells.length)}`,
      );
    }
    if (current_group === "") {
      throw new SyntaxError(
        `feature_matrix.md:${String(line_number)}: table row appears before any "## " group heading`,
      );
    }

    const [id, v2_entry, v3_owner, status, acceptance_test, notes] = cells as [
      string,
      string,
      string,
      string,
      string,
      string,
    ];
    rows.push({
      id,
      group: current_group,
      v2_entry,
      v3_owner,
      status,
      acceptance_test,
      notes,
      line: line_number,
    });
  }

  return rows;
}
