import type { OpeningBookEntry, OpeningEntryChanges } from "./opening_host.js";
import type { OpeningDraftPayload, OpeningEntry } from "./opening_model.js";

export type WriteStatus = "new" | "modified" | "same";

/** One draft entry against the target book: matched by name, ignoring case and outer spaces. */
export interface WriteRow {
  readonly entry: OpeningEntry;
  readonly existing: OpeningBookEntry | null;
  readonly status: WriteStatus;
}

/** Entries of every step that has a result, in step order. */
export function draft_entries(draft: OpeningDraftPayload): OpeningEntry[] {
  return draft.states.flatMap((state) =>
    state.status === "done" || state.status === "stale" ? state.entries : [],
  );
}

const name_key = (name: string): string => name.trim().toLowerCase();

function same_keys(left: readonly string[], right: readonly string[]): boolean {
  const sorted = (keys: readonly string[]): string => [...keys].sort().join("\n");
  return sorted(left) === sorted(right);
}

export function plan_write(
  entries: readonly OpeningEntry[],
  existing: readonly OpeningBookEntry[],
): WriteRow[] {
  const by_name = new Map(existing.map((entry) => [name_key(entry.name), entry]));
  return entries.map((entry) => {
    const match = by_name.get(name_key(entry.title)) ?? null;
    if (match === null) {
      return { entry, existing: null, status: "new" };
    }
    const same =
      match.content.trim() === entry.content.trim() &&
      match.constant === entry.constant &&
      (entry.constant || same_keys(match.keys, entry.keys));
    return { entry, existing: match, status: same ? "same" : "modified" };
  });
}

const ORDER_STEP = 10;

/** New entries go after the book's last entry, in draft order; changed ones keep their place. */
export function write_changes(
  rows: readonly WriteRow[],
  chosen: ReadonlySet<string>,
  existing: readonly OpeningBookEntry[],
): OpeningEntryChanges {
  let next_order = existing.reduce((highest, entry) => Math.max(highest, entry.order), 0);
  const upsert = rows
    .filter((row) => row.status !== "same" && chosen.has(row.entry.id))
    .map((row) => {
      const base = {
        name: row.entry.title,
        constant: row.entry.constant,
        keys: row.entry.constant ? [] : row.entry.keys,
        content: row.entry.content,
      };
      if (row.existing !== null) {
        return {
          ...base,
          uid: row.existing.uid,
          enabled: row.existing.enabled,
          order: row.existing.order,
        };
      }
      next_order += ORDER_STEP;
      return { ...base, enabled: true, order: next_order };
    });
  return { upsert, remove: [] };
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
