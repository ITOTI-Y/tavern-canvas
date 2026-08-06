import { compare_tag_records } from "./merge_sources.js";
import type { VocabularyRecord } from "./vocabulary_record_schema.js";

/**
 * Deterministic cut for the bundled (in-extension) baseline package: the
 * top `limit` records by popularity descending, then tag ascending -- the
 * same ordering `merge_sources` already produces. Re-sorts defensively
 * (rather than assuming a pre-sorted input) so callers don't have to track
 * an ordering invariant across module boundaries; a documented pre-filter
 * step, per the controller's two-artifact packaging split (bundled minimal
 * baseline vs. full pack), invoked directly from
 * `tools/vocabulary_builder/scripts/generate_baseline.ts`.
 */
export function select_top_records(
  records: readonly VocabularyRecord[],
  limit: number,
): VocabularyRecord[] {
  return [...records].sort(compare_tag_records).slice(0, limit);
}
