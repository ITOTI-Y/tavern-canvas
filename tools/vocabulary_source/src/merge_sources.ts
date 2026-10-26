import { z } from "zod";

import { read_jsonl, write_jsonl } from "./jsonl_io.js";
import { VocabularyRecordSchema, type VocabularyRecord } from "./vocabulary_record_schema.js";

export function normalize_tag_key(tag: string): string {
  return tag.normalize("NFKC").trim().toLowerCase();
}

export function compare_tag_records(left: VocabularyRecord, right: VocabularyRecord): number {
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
  readonly records: VocabularyRecord[];
  readonly popularity_overlay_hit_count: number;
  readonly translation_hit_count: number;
}

/**
 * Output order: popularity desc, tag asc. `fact_records` is the source of truth for
 * record_id/category/aliases; `seed_records` contributes only `translation` (matched by normalized
 * tag; unmatched entries on either side are silent). `popularity_overlay` replaces popularity on an
 * exact tag-name match.
 */
export function merge_sources(
  fact_records: readonly VocabularyRecord[],
  seed_records: readonly VocabularyRecord[],
  popularity_overlay?: ReadonlyMap<string, number>,
): MergeSourcesResult {
  const translation_by_key = new Map<string, string>();
  for (const seed_record of seed_records) {
    if (seed_record.translation !== undefined) {
      translation_by_key.set(normalize_tag_key(seed_record.tag), seed_record.translation);
    }
  }

  let popularity_overlay_hit_count = 0;
  let translation_hit_count = 0;

  const records = fact_records
    .map((fact_record) => {
      const overlaid_popularity = popularity_overlay?.get(fact_record.tag);
      if (overlaid_popularity !== undefined) {
        popularity_overlay_hit_count += 1;
      }

      const translation = translation_by_key.get(normalize_tag_key(fact_record.tag));
      if (translation !== undefined) {
        translation_hit_count += 1;
      }

      if (overlaid_popularity === undefined && translation === undefined) {
        return fact_record;
      }
      return VocabularyRecordSchema.parse({
        ...fact_record,
        ...(overlaid_popularity !== undefined ? { popularity: overlaid_popularity } : {}),
        ...(translation !== undefined ? { translation } : {}),
      });
    })
    .sort(compare_tag_records);

  return { records, popularity_overlay_hit_count, translation_hit_count };
}

export interface RunMergeCliOptions {
  readonly seed_path: string;
  readonly fact_path?: string;
  readonly popularity_overlay_path?: string;
  readonly out_path: string;
  readonly on_stale_fact_source?: () => void;
}

/** A raw counts file line, not a vocabulary record. */
export const PopularityOverlayEntrySchema = z.object({
  tag: z.string().trim().min(1),
  post_count: z.number().int().nonnegative(),
});
export type PopularityOverlayEntry = z.infer<typeof PopularityOverlayEntrySchema>;

async function read_popularity_overlay(path: string): Promise<Map<string, number>> {
  const entries = await read_jsonl(path, PopularityOverlayEntrySchema);
  return new Map(entries.map((entry) => [entry.tag, entry.post_count]));
}

export async function run_merge_cli(options: RunMergeCliOptions): Promise<MergeSourcesResult> {
  const seed_records = await read_jsonl(options.seed_path, VocabularyRecordSchema);

  let fact_records: VocabularyRecord[];
  if (options.fact_path) {
    fact_records = await read_jsonl(options.fact_path, VocabularyRecordSchema);
  } else {
    options.on_stale_fact_source?.();
    fact_records = seed_records.map(without_translation);
  }

  const popularity_overlay = options.popularity_overlay_path
    ? await read_popularity_overlay(options.popularity_overlay_path)
    : undefined;

  const result = merge_sources(fact_records, seed_records, popularity_overlay);
  await write_jsonl(options.out_path, result.records);
  return result;
}
