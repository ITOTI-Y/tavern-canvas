export interface AssistantImageAttachment {
  readonly image_id: string;
  readonly data_url: string;
}

export interface AssistantToolCallRecord {
  readonly tool_name: string;
  readonly arguments: Readonly<Record<string, unknown>>;
  readonly result: string;
}

export interface AssistantMessageRecord {
  readonly message_id: string;
  readonly role: "user" | "assistant";
  readonly content: string;
  readonly thinking: string | null;
  readonly images: readonly AssistantImageAttachment[];
  readonly tool_calls: readonly AssistantToolCallRecord[];
  readonly created_at: string;
}

export interface AssistantSummaryRecord {
  readonly id: string;
  readonly parent_id: string | null;
  readonly enabled: boolean;
  readonly text: string;
  readonly covers_up_to_message_id: number;
}

export interface AssistantSession {
  readonly id: string;
  readonly title: string;
  readonly created_at: string;
  readonly updated_at: string;
  readonly messages: readonly AssistantMessageRecord[];
  readonly summaries: readonly AssistantSummaryRecord[];
}

/** Injected persistence -- the real implementation is IndexedDB-backed; tests use an in-memory
 * fake. Never assumed synchronous, so a real store can validate/serialize on every call. */
export interface AssistantSessionStore {
  list(): Promise<readonly AssistantSession[]>;
  get(id: string): Promise<AssistantSession | null>;
  put(session: AssistantSession): Promise<void>;
  delete_many(ids: readonly string[]): Promise<void>;
}

export function create_session(title: string, now: string): AssistantSession {
  return {
    id: crypto.randomUUID(),
    title,
    created_at: now,
    updated_at: now,
    messages: [],
    summaries: [],
  };
}

export async function rename_session(
  store: AssistantSessionStore,
  id: string,
  title: string,
  now: string,
): Promise<AssistantSession | null> {
  const session = await store.get(id);
  if (session === null) {
    return null;
  }
  const renamed: AssistantSession = { ...session, title, updated_at: now };
  await store.put(renamed);
  return renamed;
}

export async function delete_sessions(store: AssistantSessionStore, ids: readonly string[]): Promise<void> {
  await store.delete_many(ids);
}

function is_record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function has_valid_session_shape(value: unknown): value is AssistantSession {
  return (
    is_record(value) &&
    typeof value.id === "string" &&
    typeof value.title === "string" &&
    Array.isArray(value.messages) &&
    Array.isArray(value.summaries)
  );
}

export interface LoadSessionResult {
  readonly session: AssistantSession;
  readonly recovered: boolean;
}

/**
 * Reads one session, recovering from a store read that throws or returns a malformed row instead
 * of ever propagating the error to the UI (mirrors the corrupt-history-recovery requirement).
 * `recovered: true` signals the caller to surface a "history could not be read; started fresh"
 * notice rather than silently discarding history.
 */
export async function load_session_safe(
  store: AssistantSessionStore,
  id: string,
  now: string,
): Promise<LoadSessionResult | null> {
  let raw: unknown;
  try {
    raw = await store.get(id);
  } catch {
    return { session: create_session("Recovered session", now), recovered: true };
  }
  if (raw === null || raw === undefined) {
    return null;
  }
  if (!has_valid_session_shape(raw)) {
    const salvaged_id = is_record(raw) && typeof raw.id === "string" ? raw.id : crypto.randomUUID();
    return {
      session: { ...create_session("Recovered session", now), id: salvaged_id },
      recovered: true,
    };
  }
  return { session: raw, recovered: false };
}

export interface AssistantSessionExport {
  readonly exported_at: string;
  readonly sessions: readonly AssistantSession[];
}

/** Exports selected sessions (images embedded, since `AssistantImageAttachment.data_url` already
 * carries the data URI) to a single downloadable JSON document. */
export function export_sessions_json(sessions: readonly AssistantSession[], exported_at: string): string {
  const payload: AssistantSessionExport = { exported_at, sessions };
  return JSON.stringify(payload, null, 2);
}

/** Enabling a summary auto-disables its parent and children (conflicting coverage would double
 * up context) -- mirrors legacy `enableSummary`. */
export function enable_summary(
  summaries: readonly AssistantSummaryRecord[],
  id: string,
): readonly AssistantSummaryRecord[] {
  const target = summaries.find((summary) => summary.id === id);
  if (target === undefined) {
    return summaries;
  }
  return summaries.map((summary) => {
    if (summary.id === id) {
      return { ...summary, enabled: true };
    }
    if (summary.id === target.parent_id || summary.parent_id === id) {
      return { ...summary, enabled: false };
    }
    return summary;
  });
}

export function disable_summary(
  summaries: readonly AssistantSummaryRecord[],
  id: string,
): readonly AssistantSummaryRecord[] {
  return summaries.map((summary) => (summary.id === id ? { ...summary, enabled: false } : summary));
}

/** Deletes a summary and reparents its children to the deleted node's own parent, rather than
 * orphaning them under a dangling `parent_id` (mirrors legacy `deleteSummary`'s hierarchy
 * cleanup). */
export function delete_summary_with_cleanup(
  summaries: readonly AssistantSummaryRecord[],
  id: string,
): readonly AssistantSummaryRecord[] {
  const target = summaries.find((summary) => summary.id === id);
  const reparent_to = target?.parent_id ?? null;
  return summaries
    .filter((summary) => summary.id !== id)
    .map((summary) => (summary.parent_id === id ? { ...summary, parent_id: reparent_to } : summary));
}

/** Reorders sibling summary cards (same `parent_id`) per `ordered_ids`; every other summary is
 * left in place (mirrors legacy `enableDragSort`). Unknown IDs in `ordered_ids` are ignored. */
export function reorder_summaries(
  summaries: readonly AssistantSummaryRecord[],
  parent_id: string | null,
  ordered_ids: readonly string[],
): readonly AssistantSummaryRecord[] {
  const siblings_by_id = new Map(
    summaries.filter((summary) => summary.parent_id === parent_id).map((summary) => [summary.id, summary]),
  );
  const reordered_siblings = ordered_ids
    .map((id) => siblings_by_id.get(id))
    .filter((summary): summary is AssistantSummaryRecord => summary !== undefined);
  let sibling_cursor = 0;
  return summaries.map((summary) =>
    summary.parent_id === parent_id ? (reordered_siblings[sibling_cursor++] ?? summary) : summary,
  );
}

const CJK_PATTERN = /[一-鿿]/gu;

/** A documented approximation, not a real tokenizer: roughly 1 token per 1.5 CJK characters and
 * 1 token per 4 other characters, close enough for the live token-count display's purpose
 * (mirrors legacy `calculateAndDisplayTokens`, which used the same kind of heuristic estimate). */
export function estimate_summary_tokens(text: string): number {
  const cjk_count = (text.match(CJK_PATTERN) ?? []).length;
  const other_count = text.length - cjk_count;
  return Math.ceil(cjk_count / 1.5 + other_count / 4);
}

/**
 * One-time migration of the legacy v1 flat chat-history array into the v2 multi-session shape
 * (mirrors legacy `migrateV1ToV2`). Returns `null` when `raw` is not that shape at all, so the
 * caller can tell "nothing to migrate" apart from "migrated to zero messages".
 */
export function migrate_legacy_flat_history(raw: unknown, now: string): AssistantSession | null {
  if (!Array.isArray(raw)) {
    return null;
  }
  const messages: AssistantMessageRecord[] = [];
  for (const entry of raw as unknown[]) {
    if (!is_record(entry) || typeof entry.content !== "string") {
      continue;
    }
    if (entry.role !== "user" && entry.role !== "assistant") {
      continue;
    }
    messages.push({
      message_id: crypto.randomUUID(),
      role: entry.role,
      content: entry.content,
      thinking: null,
      images: [],
      tool_calls: [],
      created_at: now,
    });
  }
  if (messages.length === 0) {
    return null;
  }
  return {
    id: crypto.randomUUID(),
    title: "Migrated chat",
    created_at: now,
    updated_at: now,
    messages,
    summaries: [],
  };
}
