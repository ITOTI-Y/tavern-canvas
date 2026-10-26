import { normalize_vocabulary_search_key, type VocabularyRecord } from "@tavern-canvas/contracts";

import type { VocabularySourceRecord } from "./read_source.js";

function code_point_at(text: string, index: number): number {
  const code_point = text.codePointAt(index);
  if (code_point === undefined) {
    throw new RangeError(`no code point at index ${String(index)} of "${text}"`);
  }
  return code_point;
}

/** Code-point order (not UTF-16 code unit), as the payload contract requires. */
export function compare_by_code_point(left: string, right: string): number {
  let left_index = 0;
  let right_index = 0;
  while (left_index < left.length && right_index < right.length) {
    const left_code = code_point_at(left, left_index);
    const right_code = code_point_at(right, right_index);
    if (left_code !== right_code) {
      return left_code - right_code;
    }
    left_index += left_code > 0xffff ? 2 : 1;
    right_index += right_code > 0xffff ? 2 : 1;
  }
  return left.length - left_index - (right.length - right_index);
}

export function shard_group_key(text: string, code_point_count: number): string {
  let index = 0;
  let taken = 0;
  while (index < text.length && taken < code_point_count) {
    const code_point = code_point_at(text, index);
    index += code_point > 0xffff ? 2 : 1;
    taken += 1;
  }
  return text.slice(0, index);
}

export function encode_group_key_segment(group_key: string): string {
  const bytes = new TextEncoder().encode(group_key);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export class VocabularyMergeConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "VocabularyMergeConflictError";
  }
}

/** On key collision the smallest original spelling (code-point order) is kept, independent of source order. */
export function dedupe_and_sort_aliases(aliases: readonly string[]): string[] {
  const canonical_by_key = new Map<string, string>();
  for (const alias of aliases) {
    const key = normalize_vocabulary_search_key(alias);
    const current = canonical_by_key.get(key);
    if (current === undefined || compare_by_code_point(alias, current) < 0) {
      canonical_by_key.set(key, alias);
    }
  }
  return [...canonical_by_key.entries()]
    .sort(([left], [right]) => compare_by_code_point(left, right))
    .map(([, text]) => text);
}

function merge_required_text_field(
  field_name: string,
  normalized_tag: string,
  current: string,
  incoming: string,
): string {
  if (current === incoming) {
    return current;
  }
  throw new VocabularyMergeConflictError(
    `conflicting ${field_name} for normalized tag "${normalized_tag}": "${current}" vs "${incoming}"`,
  );
}

function merge_optional_text_field(
  field_name: string,
  normalized_tag: string,
  current: string | undefined,
  incoming: string | undefined,
): string | undefined {
  if (current === undefined) {
    return incoming;
  }
  if (incoming === undefined || current === incoming) {
    return current;
  }
  throw new VocabularyMergeConflictError(
    `conflicting ${field_name} for normalized tag "${normalized_tag}": "${current}" vs "${incoming}"`,
  );
}

export interface MergedVocabularyRecord {
  readonly tag: string;
  readonly translation?: string;
  readonly aliases: readonly string[];
  readonly category?: string;
  readonly popularity: number;
  readonly description?: string;
}

interface RecordAccumulator {
  tag: string;
  translation: string | undefined;
  aliases: string[];
  category: string | undefined;
  popularity: number;
  description: string | undefined;
}

/**
 * Records collide when `tag` normalizes to the same key. `aliases` union, `popularity` takes the
 * maximum; other fields take the populated side, and differing non-empty values throw
 * `VocabularyMergeConflictError`.
 */
export function merge_duplicate_records(
  source_records: readonly VocabularySourceRecord[],
): MergedVocabularyRecord[] {
  const groups = new Map<string, RecordAccumulator>();

  for (const source of source_records) {
    const normalized_tag = normalize_vocabulary_search_key(source.tag);
    const existing = groups.get(normalized_tag);
    if (existing === undefined) {
      groups.set(normalized_tag, {
        tag: source.tag,
        translation: source.translation,
        aliases: [...source.aliases],
        category: source.category,
        popularity: source.popularity,
        description: source.description,
      });
      continue;
    }

    groups.set(normalized_tag, {
      tag: merge_required_text_field("tag", normalized_tag, existing.tag, source.tag),
      translation: merge_optional_text_field(
        "translation",
        normalized_tag,
        existing.translation,
        source.translation,
      ),
      aliases: [...existing.aliases, ...source.aliases],
      category: merge_optional_text_field(
        "category",
        normalized_tag,
        existing.category,
        source.category,
      ),
      popularity: Math.max(existing.popularity, source.popularity),
      description: merge_optional_text_field(
        "description",
        normalized_tag,
        existing.description,
        source.description,
      ),
    });
  }

  return [...groups.entries()]
    .sort(([left], [right]) => compare_by_code_point(left, right))
    .map(([, accumulated]) => ({
      tag: accumulated.tag,
      ...(accumulated.translation !== undefined ? { translation: accumulated.translation } : {}),
      aliases: dedupe_and_sort_aliases(accumulated.aliases),
      ...(accumulated.category !== undefined ? { category: accumulated.category } : {}),
      popularity: accumulated.popularity,
      ...(accumulated.description !== undefined ? { description: accumulated.description } : {}),
    }));
}

/** Ids are sequential from 0 in normalized-tag order (original tag as tie-break), so detail shards chunk contiguously. */
export function assign_record_ids(
  merged_records: readonly MergedVocabularyRecord[],
): VocabularyRecord[] {
  return [...merged_records]
    .sort((left, right) => {
      const normalized_order = compare_by_code_point(
        normalize_vocabulary_search_key(left.tag),
        normalize_vocabulary_search_key(right.tag),
      );
      return normalized_order !== 0 ? normalized_order : compare_by_code_point(left.tag, right.tag);
    })
    .map((record, index) => ({
      record_id: index,
      tag: record.tag,
      ...(record.translation !== undefined ? { translation: record.translation } : {}),
      aliases: [...record.aliases],
      ...(record.category !== undefined ? { category: record.category } : {}),
      popularity: record.popularity,
      ...(record.description !== undefined ? { description: record.description } : {}),
    }));
}
