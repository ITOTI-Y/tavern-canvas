import { normalize_vocabulary_search_key, type VocabularyRecord } from "@tavern-canvas/contracts";

import type { VocabularySourceRecord } from "./read_source.js";

// `String.prototype.codePointAt` is typed as possibly `undefined` even
// though every call site here guards `index` against `text.length` first;
// this narrows without a non-null assertion.
function code_point_at(text: string, index: number): number {
  const code_point = text.codePointAt(index);
  if (code_point === undefined) {
    throw new RangeError(`no code point at index ${String(index)} of "${text}"`);
  }
  return code_point;
}

/**
 * Compares two strings by Unicode code point (not UTF-16 code unit), so
 * ordering matches the payload contract's "code-point order" requirement
 * even for text containing astral characters. Used everywhere the builder
 * needs a reproducible, source-order-independent sort.
 */
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

/** Takes the first `code_point_count` Unicode code points of `text` as a shard grouping key. */
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

/** Encodes a shard group key as a filesystem- and URL-safe path segment. */
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

/**
 * Deduplicates aliases by normalized key. When two spellings normalize to
 * the same key, the lexicographically smallest (code-point order) original
 * spelling is kept as canonical — a deterministic, source-order-independent
 * tie-break. The result is sorted by normalized key for reproducibility.
 */
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
 * Duplicate-merge rule: two source records collide when their `tag`
 * normalizes to the same search key.
 *
 * - `aliases` merge by union (see `dedupe_and_sort_aliases`) — never lost.
 * - `popularity` merges by maximum across duplicates.
 * - `tag`, `translation`, `category`, and `description` merge by "the
 *   populated side wins when only one side has a value"; if both duplicates
 *   supply a different non-empty value for the same field, merging throws
 *   `VocabularyMergeConflictError` instead of silently discarding one side's
 *   primary content.
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

/**
 * Assigns final `record_id`s in deterministic order: by normalized tag,
 * then by original tag text (code-point order) as a tie-break. Ids are
 * sequential from 0 so detail shards can chunk records contiguously.
 */
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
