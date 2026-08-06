import { z } from "zod";

import { read_jsonl, write_jsonl } from "./jsonl_io.js";
import { VocabularyRecordSchema, type VocabularyRecord } from "./vocabulary_record_schema.js";

/**
 * A row of the JayxMay95/qdlabs-shaped HF tag-table JSONL (fields verified
 * against `JayxMay95/danbooru-tags-JayMay/tags.jsonl`, apache-2.0). Both
 * datasets appear same-origin (identical row count) -- see
 * data/vocabulary/LICENSES.json.
 */
export const HfTagRowSchema = z.object({
  id: z.number().int().nonnegative(),
  name: z.string().trim().min(1),
  post_count: z.number().int().nonnegative(),
  category: z.number().int().nonnegative(),
  created_at: z.string(),
  updated_at: z.string(),
  is_deprecated: z.boolean(),
  words: z.array(z.string()),
});
export type HfTagRow = z.infer<typeof HfTagRowSchema>;

/**
 * Danbooru's tag category enum as observed in the HF table. The dataset's
 * card claims no artist rows, but 5 category=1 rows were found in the
 * 2026-08-06 fetch of tags.jsonl -- kept as "artist" per controller ruling
 * rather than treated as an error.
 */
const HF_TAG_CATEGORY_NAMES: Readonly<Record<number, string>> = {
  0: "general",
  1: "artist",
  3: "copyright",
  4: "character",
  5: "meta",
};

export class UnknownHfTagCategoryError extends Error {
  constructor(
    readonly category_id: number,
    readonly tag: string,
  ) {
    super(
      `unknown HF tag category ${String(category_id)} for tag "${tag}" -- add a mapping ` +
        "before importing (import_hf_tags.ts fails loudly instead of guessing).",
    );
    this.name = "UnknownHfTagCategoryError";
  }
}

function hf_tag_category_name(category_id: number, tag: string): string {
  const name = HF_TAG_CATEGORY_NAMES[category_id];
  if (name === undefined) {
    throw new UnknownHfTagCategoryError(category_id, tag);
  }
  return name;
}

export class HfTagConflictError extends Error {
  constructor(tag: string) {
    super(
      `tag "${tag}" appears more than once in the HF tag table with conflicting field values ` +
        "-- cannot dedupe silently.",
    );
    this.name = "HfTagConflictError";
  }
}

/**
 * Maps HF tag-table rows to fact-only `VocabularyRecordSchema` records:
 * `name` -> tag, `post_count` -> popularity (untouched; the fresh-popularity
 * overlay in `merge_sources` corrects staleness later), `category` -> its
 * name via the strict enum above, `record_id` <- `id`. `is_deprecated: true`
 * rows are dropped; `words`/`created_at`/`updated_at` are ignored;
 * `aliases` stays `[]` (the HF table carries no alias data).
 *
 * The verified 2026-08-06 fetch of tags.jsonl contains 33,925 tag names
 * with 2-6 byte-identical duplicate rows (same id/post_count/category) --
 * an upstream data-quality artifact, not real duplicate tags. Rows are
 * deduped by `name`, keeping the first occurrence; a later row with the
 * same name but a *different* id/post_count/category throws
 * `HfTagConflictError` instead of silently picking one side.
 */
export function import_hf_tags(rows: readonly HfTagRow[]): VocabularyRecord[] {
  const records_by_name = new Map<string, VocabularyRecord>();

  for (const row of rows) {
    if (row.is_deprecated) {
      continue;
    }
    const record = VocabularyRecordSchema.parse({
      record_id: row.id,
      tag: row.name,
      category: hf_tag_category_name(row.category, row.name),
      popularity: row.post_count,
      aliases: [],
    });

    const existing = records_by_name.get(row.name);
    if (existing === undefined) {
      records_by_name.set(row.name, record);
      continue;
    }
    if (
      existing.record_id !== record.record_id ||
      existing.popularity !== record.popularity ||
      existing.category !== record.category
    ) {
      throw new HfTagConflictError(row.name);
    }
  }

  return [...records_by_name.values()];
}

export interface RunImportHfTagsCliOptions {
  readonly input_path: string;
  readonly out_path: string;
}

export async function run_import_hf_tags_cli(
  options: RunImportHfTagsCliOptions,
): Promise<VocabularyRecord[]> {
  const rows = await read_jsonl(options.input_path, HfTagRowSchema);
  const records = import_hf_tags(rows);
  await write_jsonl(options.out_path, records);
  return records;
}
