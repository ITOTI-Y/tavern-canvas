import type {
  EntryPlacement,
  OpeningBookEntry,
  OpeningEntryChanges,
  OpeningEntryInput,
} from "./opening_host.js";
import type { OpeningDraftPayload, OpeningEntry, WrittenEntry } from "./opening_model.js";

/**
 * How a draft entry stands against the target book, judged from the draft, the book and the last
 * write: `changed` the draft changed since; `book_edited` only the book did; `conflict` both did;
 * `book_deleted` the written entry is gone from the book; `removed` a written entry the draft no
 * longer has.
 */
export type WriteStatus =
  "new" | "changed" | "same" | "book_edited" | "conflict" | "book_deleted" | "removed";

export interface WriteRow {
  /** The draft entry's id, or `book:<uid>` for a removed entry. */
  readonly key: string;
  /** `null` only for a removed entry. */
  readonly entry: OpeningEntry | null;
  readonly existing: OpeningBookEntry | null;
  readonly status: WriteStatus;
  /** Ticked when the dialog opens: the change comes from the draft and overwrites nothing the user edited. */
  readonly suggested: boolean;
}

/** Where new entries go; `constant_no_recursion` keeps always-active text from activating other entries. */
export interface WritePlacement {
  readonly position: EntryPlacement["position"];
  readonly depth: number;
  readonly constant_no_recursion: boolean;
}

/** Entries of every step that has a result, in step order. */
export function draft_entries(draft: OpeningDraftPayload): OpeningEntry[] {
  return draft.states.flatMap((state) =>
    state.status === "done" || state.status === "stale" ? state.entries : [],
  );
}

const name_key = (name: string): string => name.trim().toLowerCase();

interface Comparable {
  readonly name: string;
  readonly constant: boolean;
  readonly keys: readonly string[];
  readonly content: string;
}

const of_entry = (entry: OpeningEntry): Comparable => ({
  name: entry.title,
  constant: entry.constant,
  keys: entry.constant ? [] : entry.keys,
  content: entry.content,
});

function same(left: Comparable, right: Comparable): boolean {
  const sorted = (keys: readonly string[]): string => [...keys].sort().join("\n");
  return (
    name_key(left.name) === name_key(right.name) &&
    left.content.trim() === right.content.trim() &&
    left.constant === right.constant &&
    (left.constant || sorted(left.keys) === sorted(right.keys))
  );
}

export function plan_write(
  entries: readonly OpeningEntry[],
  existing: readonly OpeningBookEntry[],
  written: readonly WrittenEntry[],
): WriteRow[] {
  const book_by_uid = new Map(existing.map((entry) => [entry.uid, entry]));
  const base_by_entry = new Map(written.map((base) => [base.entry_id, base]));
  const draft_ids = new Set(entries.map((entry) => entry.id));
  // Book entries already tied to a draft entry by the last write; a name match never takes them.
  const claimed = new Set(
    written.filter((base) => draft_ids.has(base.entry_id)).map((base) => base.uid),
  );
  const by_name = new Map(
    existing
      .filter((entry) => !claimed.has(entry.uid))
      .map((entry) => [name_key(entry.name), entry]),
  );

  const rows: WriteRow[] = entries.map((entry) => {
    const base = base_by_entry.get(entry.id);
    if (base !== undefined) {
      const book = book_by_uid.get(base.uid);
      if (book === undefined) {
        return { key: entry.id, entry, existing: null, status: "book_deleted", suggested: false };
      }
      const draft_changed = !same(of_entry(entry), base);
      const book_changed = !same(book, base);
      const status: WriteStatus = draft_changed
        ? book_changed
          ? "conflict"
          : "changed"
        : book_changed
          ? "book_edited"
          : "same";
      return { key: entry.id, entry, existing: book, status, suggested: status === "changed" };
    }
    const match = by_name.get(name_key(entry.title));
    if (match === undefined) {
      return { key: entry.id, entry, existing: null, status: "new", suggested: true };
    }
    by_name.delete(name_key(entry.title));
    claimed.add(match.uid);
    const status: WriteStatus = same(of_entry(entry), match) ? "same" : "changed";
    return { key: entry.id, entry, existing: match, status, suggested: status === "changed" };
  });

  for (const base of written) {
    const book = book_by_uid.get(base.uid);
    if (draft_ids.has(base.entry_id) || book === undefined || claimed.has(book.uid)) {
      continue;
    }
    claimed.add(book.uid);
    rows.push({
      key: `book:${String(book.uid)}`,
      entry: null,
      existing: book,
      status: "removed",
      suggested: same(book, base),
    });
  }
  return rows;
}

const ORDER_STEP = 10;

/**
 * New entries go after the book's last entry, in draft order, with `placement`; changed ones keep
 * their uid, state, order and placement. A chosen removed row deletes its book entry.
 */
export function write_changes(
  rows: readonly WriteRow[],
  chosen: ReadonlySet<string>,
  existing: readonly OpeningBookEntry[],
  placement: WritePlacement,
): OpeningEntryChanges {
  let next_order = existing.reduce((highest, entry) => Math.max(highest, entry.order), 0);
  const upsert = rows.flatMap((row): OpeningEntryInput[] => {
    const { entry } = row;
    if (entry === null || row.status === "same" || !chosen.has(row.key)) {
      return [];
    }
    const base = {
      name: entry.title,
      constant: entry.constant,
      keys: entry.constant ? [] : entry.keys,
      content: entry.content,
    };
    if (row.existing !== null) {
      return [
        {
          ...base,
          uid: row.existing.uid,
          enabled: row.existing.enabled,
          order: row.existing.order,
        },
      ];
    }
    next_order += ORDER_STEP;
    return [
      {
        ...base,
        enabled: true,
        order: next_order,
        placement: {
          position: placement.position,
          depth: placement.depth,
          prevent_outgoing: entry.constant && placement.constant_no_recursion,
        },
      },
    ];
  });
  const remove = rows.flatMap((row) =>
    row.status === "removed" && row.existing !== null && chosen.has(row.key)
      ? [row.existing.uid]
      : [],
  );
  return { upsert, remove };
}

/**
 * The snapshot to keep after a write: every draft entry the book now holds as the draft has it,
 * and the last snapshot of anything the write left alone.
 */
export function written_after(
  rows: readonly WriteRow[],
  chosen: ReadonlySet<string>,
  book_after: readonly OpeningBookEntry[],
  previous: readonly WrittenEntry[],
): WrittenEntry[] {
  const previous_by_entry = new Map(previous.map((base) => [base.entry_id, base]));
  const taken = new Set(
    rows.flatMap((row) =>
      row.existing !== null && row.status !== "book_deleted" ? [row.existing.uid] : [],
    ),
  );
  const result: WrittenEntry[] = [];
  for (const row of rows) {
    if (row.entry === null) {
      const kept = row.existing !== null && !chosen.has(row.key);
      const base = previous.find((item) => item.uid === row.existing?.uid);
      if (kept && base !== undefined) {
        result.push(base);
      }
      continue;
    }
    const entry = row.entry;
    const in_book = row.status === "same" || chosen.has(row.key);
    if (!in_book) {
      const base = previous_by_entry.get(entry.id);
      if (base !== undefined) {
        result.push(base);
      }
      continue;
    }
    let uid = row.existing !== null && row.status !== "book_deleted" ? row.existing.uid : null;
    if (uid === null) {
      const created = book_after.find(
        (candidate) =>
          !taken.has(candidate.uid) && name_key(candidate.name) === name_key(entry.title),
      );
      if (created === undefined) {
        continue;
      }
      taken.add(created.uid);
      uid = created.uid;
    }
    result.push({ entry_id: entry.id, uid, ...of_entry(entry), keys: [...of_entry(entry).keys] });
  }
  return result;
}

export interface MarkdownLabels {
  readonly description: string;
  readonly constant: string;
  readonly keys: string;
}

/** The whole draft as one document: the description, each step's entries, and the opening message. */
export function draft_markdown(draft: OpeningDraftPayload, labels: MarkdownLabels): string {
  const lines = [
    `# ${draft.display_name}`,
    "",
    `## ${labels.description}`,
    "",
    draft.description.trim(),
  ];
  draft.steps.forEach((step, index) => {
    const state = draft.states[index];
    if (state === undefined || (state.status !== "done" && state.status !== "stale")) {
      return;
    }
    lines.push("", `## ${step.name}`);
    for (const entry of state.entries) {
      const trigger = entry.constant ? labels.constant : `${labels.keys}: ${entry.keys.join(", ")}`;
      lines.push("", `### ${entry.title}`, "", `*${trigger}*`, "", entry.content.trim());
    }
    if (state.message !== null) {
      lines.push("", `**${state.message.speaker}**`, "", state.message.text.trim());
    }
  });
  return `${lines.join("\n")}\n`;
}
