import { z } from "zod";

import { read_jsonl, write_jsonl } from "./jsonl_io.js";
import { VocabularyRecordSchema, type VocabularyRecord } from "./vocabulary_record_schema.js";

/** Normalizes a tag for cross-source matching: NFKC (stable across environments), trimmed, lowercased. */
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
  /** Number of `fact_records` whose exact tag name matched an entry in `popularity_overlay`. */
  readonly popularity_overlay_hit_count: number;
  /** Number of `fact_records` whose normalized tag matched a translated `seed_records` entry. */
  readonly translation_hit_count: number;
}

/**
 * Merges a fact stream with a zh translation seed and an optional
 * fresh-popularity overlay into one deterministically ordered
 * (popularity desc, then tag asc) output.
 *
 * `fact_records` is the source of truth for record_id/category/aliases --
 * `seed_records` only ever contributes a `translation` (matched by
 * normalized tag key; unmatched seed translations and fact records without
 * a seed match are both expected and silent, since the seed and fact
 * streams are not guaranteed to cover the same tag set).
 *
 * `popularity_overlay`, when given, replaces a fact record's `popularity`
 * with the overlay's count for an *exact* (not normalized) tag-name match
 * -- e.g. a fresh per-post aggregation overlaid onto a staler tag-table
 * fact stream. A fact record with no overlay entry keeps its original
 * popularity unchanged.
 *
 * Translations are included in the returned records without restriction:
 * as of the 2026-08-06 controller ruling, the user has explicitly assumed
 * responsibility for zh translation licensing, reversing the earlier
 * fact-only distribution rule (see data/vocabulary/LICENSES.json). Callers
 * that need a translation-free variant can still strip it themselves --
 * this module no longer produces one, since nothing currently needs it.
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
  /** Called when falling back to the seed's own (vintage ~2023) facts, so the CLI can print a staleness warning. */
  readonly on_stale_fact_source?: () => void;
}

/**
 * Shape of a fresh-popularity overlay JSONL line, e.g. the per-tag
 * post-count aggregation `aggregate_fresh_popularity.py` produces from
 * post-level data. Deliberately distinct from `VocabularyRecordSchema`:
 * this is a raw counts file, not a vocabulary record.
 */
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
