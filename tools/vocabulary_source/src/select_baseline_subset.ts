import { compare_tag_records } from "./merge_sources.js";
import type { VocabularyRecord } from "./vocabulary_record_schema.js";

/** Top `limit` records by popularity desc, then tag asc. Re-sorts so callers need not track input order. */
export function select_top_records(
  records: readonly VocabularyRecord[],
  limit: number,
): VocabularyRecord[] {
  return [...records].sort(compare_tag_records).slice(0, limit);
}
