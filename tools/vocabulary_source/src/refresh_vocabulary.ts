import { createHash } from "node:crypto";
import { writeFile } from "node:fs/promises";

import { normalize_vocabulary_search_key } from "@tavern-canvas/contracts";
import { z } from "zod";

import { read_jsonl, write_jsonl } from "./jsonl_io.js";
import { compare_tag_records } from "./merge_sources.js";
import { VocabularyRecordSchema, type VocabularyRecord } from "./vocabulary_record_schema.js";

const MAX_ALIASES = 32;
const SAMPLE_SIZE = 20;
const POPULARITY_SHIFT_RATIO = 0.1;

export const TranslationMemoryEntrySchema = z.strictObject({
  tag: z.string().trim().min(1),
  translation: z.string().trim().min(1).max(512),
});
export type TranslationMemoryEntry = z.infer<typeof TranslationMemoryEntrySchema>;

export interface RefreshInput {
  /** The last published records; their translations seed the memory. */
  readonly previous: readonly VocabularyRecord[];
  /** Translations kept from earlier runs, including tags no longer published. */
  readonly memory: readonly TranslationMemoryEntry[];
  /** Freshly fetched Danbooru facts, which carry no translation. */
  readonly facts: readonly VocabularyRecord[];
  readonly min_post_count: number;
}

export interface RefreshReport {
  readonly previous_count: number;
  /** Previous records that meet this run's threshold, the fair base for a shrinkage check. */
  readonly previous_eligible_count: number;
  readonly fetched_count: number;
  readonly duplicate_ids_dropped: number;
  readonly below_threshold_dropped: number;
  readonly record_count: number;
  readonly added_count: number;
  readonly removed_count: number;
  readonly popularity_shifted_count: number;
  readonly translated_count: number;
  readonly untranslated_added_count: number;
  readonly translation_via_alias_count: number;
  /** Previous tags Danbooru no longer lists, kept with their last known popularity. */
  readonly retained_missing_count: number;
  readonly key_conflicts_merged: number;
  readonly aliases_dropped_matching_a_tag: number;
  readonly aliases_dropped_shared: number;
  readonly aliases_truncated_records: number;
  readonly shared_translation_count: number;
  readonly memory_count: number;
  readonly records_sha256: string;
  readonly added_sample: readonly string[];
  readonly removed_sample: readonly string[];
  readonly conflict_sample: readonly string[];
}

export interface RefreshResult {
  readonly records: VocabularyRecord[];
  readonly memory: TranslationMemoryEntry[];
  readonly report: RefreshReport;
}

const key_of = normalize_vocabulary_search_key;

function by_popularity(left: VocabularyRecord, right: VocabularyRecord): number {
  return right.popularity - left.popularity || left.record_id - right.record_id;
}

function records_sha256(records: readonly VocabularyRecord[]): string {
  const hash = createHash("sha256");
  for (const record of records) {
    hash.update(`${JSON.stringify(record)}\n`);
  }
  return hash.digest("hex");
}

/**
 * Merges fresh Danbooru facts with the previous release. Duplicates are resolved in five layers:
 * repeated tag ids, tags that normalize to the same key, aliases equal to another tag, aliases
 * claimed by several tags, and renamed tags, which inherit the translation of an alias. A previous
 * tag that met the threshold but is no longer fetched, and is not an alias of a fetched tag, is
 * kept as it was.
 */
export function refresh_vocabulary(input: RefreshInput): RefreshResult {
  const by_id = new Map<number, VocabularyRecord>();
  for (const fact of input.facts) {
    by_id.set(fact.record_id, fact);
  }
  const duplicate_ids_dropped = input.facts.length - by_id.size;

  const kept = [...by_id.values()].filter((fact) => fact.popularity >= input.min_post_count);
  const below_threshold_dropped = by_id.size - kept.length;

  const groups = new Map<string, VocabularyRecord[]>();
  for (const fact of kept) {
    const key = key_of(fact.tag);
    groups.set(key, [...(groups.get(key) ?? []), fact]);
  }

  const conflict_sample: string[] = [];
  let key_conflicts_merged = 0;
  const merged = [...groups.values()].map((group) => {
    const [canonical, ...others] = [...group].sort(by_popularity);
    if (canonical === undefined) {
      throw new Error("a key group is never empty");
    }
    if (others.length > 0) {
      key_conflicts_merged += others.length;
      if (conflict_sample.length < SAMPLE_SIZE) {
        conflict_sample.push([canonical, ...others].map((record) => record.tag).join(" | "));
      }
    }
    return {
      record: canonical,
      merged_tags: others.map((other) => other.tag),
      aliases: [...canonical.aliases, ...others.flatMap((other) => [other.tag, ...other.aliases])],
    };
  });

  const tag_keys = new Set(groups.keys());
  let aliases_dropped_matching_a_tag = 0;
  const alias_owner = new Map<string, VocabularyRecord>();
  for (const entry of [...merged].sort((left, right) => by_popularity(left.record, right.record))) {
    for (const alias of entry.aliases) {
      const alias_key = key_of(alias);
      if (alias_key === key_of(entry.record.tag)) {
        continue;
      }
      if (tag_keys.has(alias_key)) {
        aliases_dropped_matching_a_tag += 1;
        continue;
      }
      if (!alias_owner.has(alias_key)) {
        alias_owner.set(alias_key, entry.record);
      }
    }
  }

  const memory = new Map<string, TranslationMemoryEntry>();
  for (const entry of input.memory) {
    memory.set(key_of(entry.tag), entry);
  }
  for (const record of input.previous) {
    if (record.translation !== undefined && record.translation !== "") {
      memory.set(key_of(record.tag), { tag: record.tag, translation: record.translation });
    }
  }
  const previous_by_key = new Map(input.previous.map((record) => [key_of(record.tag), record]));

  let aliases_dropped_shared = 0;
  let aliases_truncated_records = 0;
  let translation_via_alias_count = 0;
  const fetched_records = merged.map(({ record, merged_tags, aliases }) => {
    const own_key = key_of(record.tag);
    const alias_texts = new Map<string, string>();
    for (const alias of aliases) {
      const alias_key = key_of(alias);
      if (alias_key === own_key || tag_keys.has(alias_key) || alias_texts.has(alias_key)) {
        continue;
      }
      if (alias_owner.get(alias_key) !== record) {
        aliases_dropped_shared += 1;
        continue;
      }
      alias_texts.set(alias_key, alias);
    }
    const sorted_aliases = [...alias_texts.entries()]
      .sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0))
      .map(([, text]) => text);
    if (sorted_aliases.length > MAX_ALIASES) {
      aliases_truncated_records += 1;
    }

    const direct =
      memory.get(own_key) ?? merged_tags.map((tag) => memory.get(key_of(tag))).find(Boolean);
    const via_alias =
      direct === undefined
        ? sorted_aliases.map((alias) => memory.get(key_of(alias))).find(Boolean)
        : undefined;
    if (via_alias !== undefined && !previous_by_key.has(own_key)) {
      translation_via_alias_count += 1;
    }
    const translation = (direct ?? via_alias)?.translation;
    return VocabularyRecordSchema.parse({
      record_id: record.record_id,
      tag: record.tag,
      ...(translation === undefined ? {} : { translation }),
      aliases: sorted_aliases.slice(0, MAX_ALIASES),
      ...(record.category === undefined ? {} : { category: record.category }),
      popularity: record.popularity,
    });
  });

  // Danbooru empties a deprecated tag, but image models trained on older posts still know it.
  const fetched_ids = new Set(by_id.keys());
  const retained = input.previous
    .filter(
      (record) =>
        record.popularity >= input.min_post_count &&
        !fetched_ids.has(record.record_id) &&
        !tag_keys.has(key_of(record.tag)) &&
        !alias_owner.has(key_of(record.tag)),
    )
    .map((record) =>
      VocabularyRecordSchema.parse({
        ...record,
        aliases: record.aliases.filter((alias) => {
          const alias_key = key_of(alias);
          return !tag_keys.has(alias_key) && !alias_owner.has(alias_key);
        }),
      }),
    );
  const records = [...fetched_records, ...retained].sort(compare_tag_records);

  for (const record of records) {
    if (record.translation !== undefined) {
      memory.set(key_of(record.tag), { tag: record.tag, translation: record.translation });
    }
  }

  const output_keys = new Set(records.map((record) => key_of(record.tag)));
  const added = records.filter((record) => !previous_by_key.has(key_of(record.tag)));
  const removed = input.previous.filter((record) => !output_keys.has(key_of(record.tag)));
  const popularity_shifted_count = records.filter((record) => {
    const before = previous_by_key.get(key_of(record.tag));
    return (
      before !== undefined &&
      Math.abs(record.popularity - before.popularity) >
        POPULARITY_SHIFT_RATIO * Math.max(before.popularity, 1)
    );
  }).length;
  const translation_counts = new Map<string, number>();
  for (const record of records) {
    if (record.translation !== undefined) {
      translation_counts.set(
        record.translation,
        (translation_counts.get(record.translation) ?? 0) + 1,
      );
    }
  }

  return {
    records,
    memory: [...memory.values()].sort((left, right) =>
      left.tag < right.tag ? -1 : left.tag > right.tag ? 1 : 0,
    ),
    report: {
      previous_count: input.previous.length,
      previous_eligible_count: input.previous.filter(
        (record) => record.popularity >= input.min_post_count,
      ).length,
      fetched_count: input.facts.length,
      duplicate_ids_dropped,
      below_threshold_dropped,
      record_count: records.length,
      added_count: added.length,
      removed_count: removed.length,
      popularity_shifted_count,
      translated_count: records.filter((record) => record.translation !== undefined).length,
      untranslated_added_count: added.filter((record) => record.translation === undefined).length,
      translation_via_alias_count,
      retained_missing_count: retained.length,
      key_conflicts_merged,
      aliases_dropped_matching_a_tag,
      aliases_dropped_shared,
      aliases_truncated_records,
      shared_translation_count: [...translation_counts.values()].filter((count) => count > 1)
        .length,
      memory_count: memory.size,
      records_sha256: records_sha256(records),
      added_sample: added.slice(0, SAMPLE_SIZE).map((record) => record.tag),
      removed_sample: removed
        .sort(by_popularity)
        .slice(0, SAMPLE_SIZE)
        .map((record) => record.tag),
      conflict_sample,
    },
  };
}

export interface RunRefreshCliOptions {
  readonly previous_path: string;
  readonly memory_path: string | undefined;
  readonly facts_path: string;
  readonly min_post_count: number;
  readonly out_path: string;
  readonly memory_out_path: string;
  readonly report_path: string;
}

export async function run_refresh_cli(options: RunRefreshCliOptions): Promise<RefreshReport> {
  const [previous, memory, facts] = await Promise.all([
    read_jsonl(options.previous_path, VocabularyRecordSchema),
    options.memory_path === undefined
      ? Promise.resolve([])
      : read_jsonl(options.memory_path, TranslationMemoryEntrySchema),
    read_jsonl(options.facts_path, VocabularyRecordSchema),
  ]);
  const result = refresh_vocabulary({
    previous,
    memory,
    facts,
    min_post_count: options.min_post_count,
  });
  await write_jsonl(options.out_path, result.records);
  await write_jsonl(options.memory_out_path, result.memory);
  await writeFile(options.report_path, `${JSON.stringify(result.report, null, 2)}\n`);
  return result.report;
}
