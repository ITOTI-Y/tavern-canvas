import { read_jsonl, write_jsonl } from "./jsonl_io.js";
import { VocabularyRecordSchema, type VocabularyRecord } from "./vocabulary_record_schema.js";

/** Normalizes a tag for cross-source matching: NFKC (stable across environments), trimmed, lowercased. */
export function normalize_tag_key(tag: string): string {
  return tag.normalize("NFKC").trim().toLowerCase();
}

function compare_tag_records(left: VocabularyRecord, right: VocabularyRecord): number {
  if (left.popularity !== right.popularity) {
    return right.popularity - left.popularity;
  }
  return left.tag < right.tag ? -1 : left.tag > right.tag ? 1 : 0;
}

function without_translation(record: VocabularyRecord): VocabularyRecord {
  const { translation: _translation, ...rest } = record;
  return rest;
}

export interface MergeSourcesResult {
  readonly full: VocabularyRecord[];
  readonly public_records: VocabularyRecord[];
}

/**
 * Overlays zh translations from `seed_records` onto `fact_records` by
 * normalized tag key. `fact_records` is the source of truth for
 * record_id/category/popularity/aliases — a translation is attached only
 * when its normalized tag matches a fact record; unmatched seed
 * translations and fact records without a seed match are both expected and
 * silent (the seed and fact streams are not guaranteed to cover the same
 * tag set, e.g. when `fact_records` comes from a fresher/differently
 * filtered Danbooru fetch than the vintage ~2023 seed).
 *
 * Returns two deterministically ordered (popularity desc, then tag asc)
 * outputs: `full` (facts + translation) and `public_records` (facts only,
 * `translation` stripped — the zh translations' unknown-community-origin
 * license makes them non-redistributable, see LICENSES.json).
 */
export function merge_sources(
  fact_records: readonly VocabularyRecord[],
  seed_records: readonly VocabularyRecord[],
): MergeSourcesResult {
  const translation_by_key = new Map<string, string>();
  for (const seed_record of seed_records) {
    if (seed_record.translation !== undefined) {
      translation_by_key.set(normalize_tag_key(seed_record.tag), seed_record.translation);
    }
  }

  const full = fact_records
    .map((fact_record) => {
      const translation = translation_by_key.get(normalize_tag_key(fact_record.tag));
      return translation === undefined
        ? fact_record
        : VocabularyRecordSchema.parse({ ...fact_record, translation });
    })
    .sort(compare_tag_records);

  const public_records = full.map(without_translation).sort(compare_tag_records);

  return { full, public_records };
}

export interface RunMergeCliOptions {
  readonly seed_path: string;
  readonly danbooru_facts_path?: string;
  readonly out_full_path: string;
  readonly out_public_path: string;
  /** Called when falling back to the seed's own (vintage ~2023) facts, so the CLI can print a staleness warning. */
  readonly on_stale_fact_source?: () => void;
}

export async function run_merge_cli(options: RunMergeCliOptions): Promise<MergeSourcesResult> {
  const seed_records = await read_jsonl(options.seed_path, VocabularyRecordSchema);

  let fact_records: VocabularyRecord[];
  if (options.danbooru_facts_path) {
    fact_records = await read_jsonl(options.danbooru_facts_path, VocabularyRecordSchema);
  } else {
    options.on_stale_fact_source?.();
    fact_records = seed_records.map(without_translation);
  }

  const result = merge_sources(fact_records, seed_records);
  await write_jsonl(options.out_full_path, result.full);
  await write_jsonl(options.out_public_path, result.public_records);
  return result;
}
