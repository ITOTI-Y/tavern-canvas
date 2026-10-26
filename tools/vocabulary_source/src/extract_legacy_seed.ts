import { readFile } from "node:fs/promises";

import { z } from "zod";

import { decrypt_legacy_openssl_payload } from "./decrypt_legacy_tagdata.js";
import { VocabularyRecordSchema, type VocabularyRecord } from "./vocabulary_record_schema.js";

/** v2.8.1 ships this AES passphrase in cleartext in its own source; it is not a secret. */
export const LEGACY_V2_TAGDATA_PASSPHRASE = "a-very-secret-key-that-is-not-so-secret";

const LegacyDanbooruTagEntrySchema = z.strictObject({
  id_index: z.number().int().positive(),
  tag: z.string().trim().min(1),
  color_id: z.number().int().nonnegative(),
  translate: z.string(),
  hot: z.number().int().nonnegative(),
  // Alias count shown in v2's UI, not alias content; dropped when mapping.
  aliases: z.number().int().nonnegative(),
});

/**
 * v2's `color_id` uses Danbooru's tag category enum (0=general, 1=artist, 3=copyright, 4=character,
 * 5=meta); only 0 and 4 occur in the archive. Any other value throws instead of defaulting to
 * "general".
 */
const LEGACY_COLOR_ID_CATEGORY: Readonly<Record<number, string>> = {
  0: "general",
  4: "character",
};

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

// Loose top-level check; per-entry validation in parse_legacy_shard lets one corrupt entry be
// identified and, if the caller opts in, skipped.
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
   * Default false: an invalid entry throws. Set true to skip a known-bad entry (e.g. the empty-tag
   * entry in `danbooru_007.json`); every skip is still reported via `on_invalid_entry`.
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
 * Only `danbooru_001.json`..`danbooru_025.json` decrypt to `{ danbooru_tag: [...] }` (49,857
 * records). `tag_NSFW001.json` and `tags.json` hold a `{ tag_groups, tag_tags }` UI tree and fail
 * `LegacyDanbooruTagFileShapeSchema` validation.
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
