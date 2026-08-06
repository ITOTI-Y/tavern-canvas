/**
 * Re-exports the canonical `VocabularyRecordSchema`/`VocabularyRecord` from
 * `@tavern-canvas/contracts` (plan Task 1). This module previously held a
 * local structural mirror while Task 1 landed in parallel on `main` — see
 * git history for that version. The mirror's `is_nsfw` extension was
 * dropped per controller ruling (YAGNI: no producer ever set it true, since
 * the NSFW shard was excluded from extraction; a proper rating field will
 * be added to contracts deliberately, with review, when Task 5 integrates
 * the 161 NSFW tags).
 */
export { VocabularyRecordSchema, type VocabularyRecord } from "@tavern-canvas/contracts";
