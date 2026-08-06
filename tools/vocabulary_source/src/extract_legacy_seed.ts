import { readFile } from "node:fs/promises";

import { z } from "zod";

import { decrypt_legacy_openssl_payload } from "./decrypt_legacy_tagdata.js";
import { VocabularyRecordSchema, type VocabularyRecord } from "./vocabulary_record_schema.js";

/**
 * The legacy v2.8.1 shipped this AES passphrase in cleartext inside its own
 * source (it protects nothing beyond casual inspection of the bundled JSON).
 * Not a runtime secret; documented verbatim in the task brief.
 */
export const LEGACY_V2_TAGDATA_PASSPHRASE = "a-very-secret-key-that-is-not-so-secret";

const LegacyDanbooruTagEntrySchema = z.strictObject({
  id_index: z.number().int().positive(),
  tag: z.string().trim().min(1),
  color_id: z.number().int().nonnegative(),
  translate: z.string(),
  hot: z.number().int().nonnegative(),
  // A count of how many aliases the tag has in v2's UI, not alias content.
  // Dropped when mapping to VocabularyRecordSchema per binding brief ruling.
  aliases: z.number().int().nonnegative(),
});

/**
 * v2's `color_id` reuses (a subset of) Danbooru's own tag category enum
 * (0=general, 1=artist, 3=copyright, 4=character, 5=meta — see
 * `danbooru_client.ts`'s `DANBOORU_TAG_CATEGORY_NAMES`), not a decorative
 * UI color as the task brief originally assumed. Only `0` and `4` are
 * observed in the real archive (verified across all 49,857 legacy records).
 * Controller ruling (follow-up to the SRC report): map these two known
 * values to real categories; any other value is unrecognized and must fail
 * loudly with the value and record, never silently default to "general".
 */
const LEGACY_COLOR_ID_CATEGORY: Readonly<Record<number, string>> = {
  0: "general",
  4: "character",
};

/** Throws for any `color_id` outside `LEGACY_COLOR_ID_CATEGORY` — never defaults. */
function map_legacy_color_id_to_category(color_id: number): string {
  const category = LEGACY_COLOR_ID_CATEGORY[color_id];
  if (category === undefined) {
    throw new Error(
      `unrecognized color_id ${String(color_id)} (only 0=general and 4=character are known; ` +
        "refusing to default it to a category).",
    );
  }
  return category;
}

// Loose top-level shape check only (danbooru_tag entries as `unknown[]`).
// Real per-entry validation happens one entry at a time in parse_legacy_shard
// so a single corrupt entry can be identified precisely and, if the caller
// opts in, skipped without discarding the rest of an otherwise-valid shard.
const LegacyDanbooruTagFileShapeSchema = z.strictObject({
  danbooru_tag: z.array(z.unknown()),
});

export interface LegacyShardSpec {
  readonly file_label: string;
  readonly raw_base64: string;
}

export interface InvalidLegacyEntry {
  readonly file_label: string;
  readonly index: number;
  readonly raw_entry: unknown;
  readonly reason: string;
}

export interface ParseLegacyShardOptions {
  /**
   * Default false: any entry that fails `LegacyDanbooruTagEntrySchema` or
   * the mapped `VocabularyRecordSchema` throws immediately, failing the
   * whole run ("malformed records fail the run loudly" — the task brief's
   * binding default). Set true only for a specific, reviewed, real-archive
   * defect (see task-src-report.md's finding on `danbooru_007.json`
   * id_index 12402, an empty-tag junk entry) to skip just that entry
   * instead of aborting the entire 49,857-record extraction. Every skip is
   * still reported via `on_invalid_entry` — this is "skip with mandatory
   * visibility", never a silent drop.
   */
  readonly skip_invalid_entries?: boolean;
  readonly on_invalid_entry?: (entry: InvalidLegacyEntry) => void;
}

function compare_tag_records(left: VocabularyRecord, right: VocabularyRecord): number {
  if (left.popularity !== right.popularity) {
    return right.popularity - left.popularity;
  }
  return left.tag < right.tag ? -1 : left.tag > right.tag ? 1 : 0;
}

/**
 * Decrypts, parses, and validates one shard's ciphertext, mapping every
 * `danbooru_tag` entry onto `VocabularyRecordSchema`. Throws loudly on
 * decryption failure, JSON parse failure, or legacy container-shape
 * validation failure in all cases. Per-entry validation failures throw too
 * unless `options.skip_invalid_entries` is explicitly set — see
 * `ParseLegacyShardOptions`.
 */
export function parse_legacy_shard(
  spec: LegacyShardSpec,
  passphrase: string,
  options: ParseLegacyShardOptions = {},
): VocabularyRecord[] {
  const plaintext = decrypt_legacy_openssl_payload(spec.raw_base64, passphrase);

  let parsed_json: unknown;
  try {
    parsed_json = JSON.parse(plaintext);
  } catch (cause) {
    throw new Error(`${spec.file_label}: decrypted payload is not valid JSON.`, { cause });
  }

  const shape_result = LegacyDanbooruTagFileShapeSchema.safeParse(parsed_json);
  if (!shape_result.success) {
    throw new Error(
      `${spec.file_label}: decrypted JSON does not match the { danbooru_tag: [...] } shape ` +
        `(${shape_result.error.message}).`,
    );
  }

  const records: VocabularyRecord[] = [];
  shape_result.data.danbooru_tag.forEach((raw_entry, index) => {
    const entry_result = LegacyDanbooruTagEntrySchema.safeParse(raw_entry);
    if (!entry_result.success) {
      const reason = `entry failed legacy danbooru_tag schema validation: ${entry_result.error.message}`;
      if (!options.skip_invalid_entries) {
        throw new Error(`${spec.file_label}: danbooru_tag[${String(index)}] ${reason}`);
      }
      options.on_invalid_entry?.({ file_label: spec.file_label, index, raw_entry, reason });
      return;
    }
    const entry = entry_result.data;

    let category: string;
    try {
      category = map_legacy_color_id_to_category(entry.color_id);
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      if (!options.skip_invalid_entries) {
        throw new Error(
          `${spec.file_label}: tag ${JSON.stringify(entry.tag)} (id_index ${String(entry.id_index)}) ${reason}`,
          { cause: error },
        );
      }
      options.on_invalid_entry?.({ file_label: spec.file_label, index, raw_entry, reason });
      return;
    }

    const mapped: Record<string, unknown> = {
      record_id: entry.id_index,
      tag: entry.tag,
      category,
      popularity: entry.hot,
    };
    if (entry.translate.trim().length > 0) {
      mapped.translation = entry.translate;
    }

    const record_result = VocabularyRecordSchema.safeParse(mapped);
    if (!record_result.success) {
      const reason = `mapped record failed VocabularyRecordSchema validation: ${record_result.error.message}`;
      if (!options.skip_invalid_entries) {
        throw new Error(
          `${spec.file_label}: tag ${JSON.stringify(entry.tag)} (id_index ${String(entry.id_index)}) ${reason}`,
        );
      }
      options.on_invalid_entry?.({ file_label: spec.file_label, index, raw_entry, reason });
      return;
    }
    records.push(record_result.data);
  });

  return records;
}

/**
 * Combines multiple parsed shards into one deterministically ordered record
 * list (popularity descending, then tag ascending), rejecting duplicate
 * `record_id` or `tag` values across shards instead of silently overwriting.
 */
export function extract_legacy_seed_records(
  shards: readonly LegacyShardSpec[],
  passphrase: string,
  options: ParseLegacyShardOptions = {},
): VocabularyRecord[] {
  const records: VocabularyRecord[] = [];
  const seen_record_ids = new Map<number, string>();
  const seen_tags = new Map<string, string>();

  for (const shard of shards) {
    for (const record of parse_legacy_shard(shard, passphrase, options)) {
      const record_id_owner = seen_record_ids.get(record.record_id);
      if (record_id_owner !== undefined) {
        throw new Error(
          `Duplicate record_id ${String(record.record_id)} in ${shard.file_label} ` +
            `(first seen in ${record_id_owner}).`,
        );
      }
      const tag_owner = seen_tags.get(record.tag);
      if (tag_owner !== undefined) {
        throw new Error(
          `Duplicate tag ${JSON.stringify(record.tag)} in ${shard.file_label} ` +
            `(first seen in ${tag_owner}).`,
        );
      }
      seen_record_ids.set(record.record_id, shard.file_label);
      seen_tags.set(record.tag, shard.file_label);
      records.push(record);
    }
  }

  return records.sort(compare_tag_records);
}

export interface LegacyShardFileSpec {
  readonly path: string;
}

/**
 * Reads and extracts a list of legacy shard files from disk.
 *
 * Default real-archive file list (see task-src-report.md for the full
 * finding): only `danbooru_001.json`..`danbooru_025.json` decrypt to the
 * `{ danbooru_tag: [...] }` shape (24 shards of 2000 + a final shard of
 * 1857 = 49,857 records, `id_index` continuous 1..49857). `tag_NSFW001.json`
 * and `tags.json` both decrypt to a *different* shape,
 * `{ tag_groups: [...], tag_tags: [...] }` (a zh UI group tree — `tags.json`
 * is the general tree, `tag_NSFW001.json` its NSFW-labeled counterpart), and
 * are therefore out of scope for this function; passing either through here
 * fails loudly via `LegacyDanbooruTagFileShapeSchema` validation rather than
 * silently coercing them.
 */
export async function extract_legacy_seed_from_files(
  files: readonly LegacyShardFileSpec[],
  passphrase: string,
  options: ParseLegacyShardOptions = {},
): Promise<VocabularyRecord[]> {
  const shards = await Promise.all(
    files.map(async (file) => ({
      file_label: file.path,
      raw_base64: await readFile(file.path, "utf8"),
    })),
  );
  return extract_legacy_seed_records(shards, passphrase, options);
}
