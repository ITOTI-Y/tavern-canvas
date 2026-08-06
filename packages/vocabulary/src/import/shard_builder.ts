import { sha256 } from "@noble/hashes/sha2.js";
import { bytesToHex } from "@noble/hashes/utils.js";

import {
  normalize_vocabulary_search_key,
  VOCABULARY_DETAIL_SHARD_MAX_RECORDS,
  VOCABULARY_HOT_SHARD_CATEGORY_CAP,
  VOCABULARY_HOT_SHARD_GLOBAL_CAP,
  type VocabularyRecord,
  type VocabularyShardEntry,
} from "@tavern-canvas/contracts";

import { code_point_group_key } from "../search/query_normalizer.js";
import { encode_shard_bytes } from "../search/shard_codec.js";
import type { VocabularyShardPayload } from "../search/vocabulary_shard_payloads.js";

// Mirrors tools/vocabulary_builder's index-building algorithms exactly (same
// group-key width, sort order, and shard_id/path conventions) so a
// user-imported package is addressable by the Worker's ManifestShardIndex
// (apps/extension/src/workers/vocabulary_worker.ts) identically to a
// CLI-built one. Duplicated rather than imported from
// tools/vocabulary_builder because that package is Node/fs-oriented (its
// entry point pulls in node:fs) and this module ships inside the browser
// Worker bundle -- the same duplicate-and-cross-verify tradeoff Task 4 made
// for code_point_group_key. import_builder.test.ts's
// "matches the CLI builder's shard shapes" case is the cross-verification
// proof.
const GROUP_CODE_POINT_COUNT = 2;
const TRIGRAM_CODE_POINT_LENGTH = 3;

function code_point_at(text: string, index: number): number {
  const code_point = text.codePointAt(index);
  if (code_point === undefined) {
    throw new RangeError(`no code point at index ${String(index)} of "${text}"`);
  }
  return code_point;
}

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

function encode_group_key_segment(group_key: string): string {
  const bytes = new TextEncoder().encode(group_key);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export interface DraftShard {
  readonly shard_id: string;
  readonly kind: VocabularyShardEntry["kind"];
  readonly path: string;
  readonly payload: VocabularyShardPayload;
}

type PrefixOrAliasEntry = [key: string, record_id: number, popularity: number];

function sort_key_entries(entries: PrefixOrAliasEntry[]): void {
  entries.sort(([key_left, id_left, popularity_left], [key_right, id_right, popularity_right]) => {
    const key_order = compare_by_code_point(key_left, key_right);
    if (key_order !== 0) {
      return key_order;
    }
    if (popularity_left !== popularity_right) {
      return popularity_right - popularity_left;
    }
    return id_left - id_right;
  });
}

function build_grouped_key_shards(
  entries_by_group: Map<string, PrefixOrAliasEntry[]>,
  kind: "prefix" | "alias",
): DraftShard[] {
  return [...entries_by_group.entries()]
    .sort(([left], [right]) => compare_by_code_point(left, right))
    .map(([group_key, entries]) => {
      sort_key_entries(entries);
      return {
        shard_id: `${kind}:${group_key}`,
        kind,
        path: `${kind}/${encode_group_key_segment(group_key)}.msgpack.gz`,
        payload: { kind, entries },
      };
    });
}

export function build_prefix_shards(records: readonly VocabularyRecord[]): DraftShard[] {
  const entries_by_group = new Map<string, PrefixOrAliasEntry[]>();
  for (const record of records) {
    const normalized_tag = normalize_vocabulary_search_key(record.tag);
    const group_key = code_point_group_key(normalized_tag, GROUP_CODE_POINT_COUNT);
    const entries = entries_by_group.get(group_key) ?? [];
    entries.push([normalized_tag, record.record_id, record.popularity]);
    entries_by_group.set(group_key, entries);
  }
  return build_grouped_key_shards(entries_by_group, "prefix");
}

function alias_search_texts(record: VocabularyRecord): string[] {
  return record.translation === undefined
    ? record.aliases
    : [...record.aliases, record.translation];
}

export function build_alias_shards(records: readonly VocabularyRecord[]): DraftShard[] {
  const seen_ids_by_key = new Map<string, Set<number>>();
  const entries_by_group = new Map<string, PrefixOrAliasEntry[]>();

  for (const record of records) {
    for (const text of alias_search_texts(record)) {
      const normalized_key = normalize_vocabulary_search_key(text);
      const seen_ids = seen_ids_by_key.get(normalized_key) ?? new Set<number>();
      seen_ids_by_key.set(normalized_key, seen_ids);
      if (seen_ids.has(record.record_id)) {
        continue;
      }
      seen_ids.add(record.record_id);

      const group_key = code_point_group_key(normalized_key, GROUP_CODE_POINT_COUNT);
      const entries = entries_by_group.get(group_key) ?? [];
      entries.push([normalized_key, record.record_id, record.popularity]);
      entries_by_group.set(group_key, entries);
    }
  }

  return build_grouped_key_shards(entries_by_group, "alias");
}

function extract_trigrams(text: string): string[] {
  const code_points = Array.from(text);
  const trigrams: string[] = [];
  for (let start = 0; start + TRIGRAM_CODE_POINT_LENGTH <= code_points.length; start += 1) {
    trigrams.push(code_points.slice(start, start + TRIGRAM_CODE_POINT_LENGTH).join(""));
  }
  return trigrams;
}

function delta_encode(sorted_ids: readonly number[]): number[] {
  const deltas: number[] = [];
  let previous = 0;
  sorted_ids.forEach((id, index) => {
    deltas.push(index === 0 ? id : id - previous);
    previous = id;
  });
  return deltas;
}

// Trigram-indexes the normalized tag only, matching
// tools/vocabulary_builder/src/build_trigram_index.ts's documented scoping
// decision (aliases/translations already have their own alias index).
export function build_trigram_shards(records: readonly VocabularyRecord[]): DraftShard[] {
  const ids_by_trigram = new Map<string, Set<number>>();
  for (const record of records) {
    const normalized_tag = normalize_vocabulary_search_key(record.tag);
    for (const trigram of extract_trigrams(normalized_tag)) {
      const ids = ids_by_trigram.get(trigram) ?? new Set<number>();
      ids.add(record.record_id);
      ids_by_trigram.set(trigram, ids);
    }
  }

  const entries_by_group = new Map<string, [trigram: string, deltas: number[]][]>();
  for (const [trigram, ids] of ids_by_trigram) {
    const group_key = code_point_group_key(trigram, GROUP_CODE_POINT_COUNT);
    const sorted_ids = [...ids].sort((left, right) => left - right);
    const entries = entries_by_group.get(group_key) ?? [];
    entries.push([trigram, delta_encode(sorted_ids)]);
    entries_by_group.set(group_key, entries);
  }

  return [...entries_by_group.entries()]
    .sort(([left], [right]) => compare_by_code_point(left, right))
    .map(([group_key, entries]) => {
      entries.sort(([left], [right]) => compare_by_code_point(left, right));
      return {
        shard_id: `trigram:${group_key}`,
        kind: "trigram",
        path: `trigram/${encode_group_key_segment(group_key)}.msgpack.gz`,
        payload: { kind: "trigram", entries },
      };
    });
}

export function build_detail_shards(records: readonly VocabularyRecord[]): DraftShard[] {
  const sorted = [...records].sort((left, right) => left.record_id - right.record_id);
  const shards: DraftShard[] = [];
  for (let start = 0; start < sorted.length; start += VOCABULARY_DETAIL_SHARD_MAX_RECORDS) {
    const chunk = sorted.slice(start, start + VOCABULARY_DETAIL_SHARD_MAX_RECORDS);
    const first_record = chunk[0];
    if (first_record === undefined) {
      continue;
    }
    const start_id = first_record.record_id;
    shards.push({
      shard_id: `detail:${String(start_id)}`,
      kind: "detail",
      path: `detail/${String(start_id)}.msgpack.gz`,
      payload: { kind: "detail", start_id, records: chunk },
    });
  }
  return shards;
}

export function build_hot_shard(records: readonly VocabularyRecord[]): DraftShard {
  const by_popularity_desc = [...records].sort((left, right) =>
    left.popularity !== right.popularity
      ? right.popularity - left.popularity
      : left.record_id - right.record_id,
  );

  const global = by_popularity_desc
    .slice(0, VOCABULARY_HOT_SHARD_GLOBAL_CAP)
    .map((record) => record.record_id);

  const by_category = new Map<string, number[]>();
  for (const record of by_popularity_desc) {
    if (record.category === undefined) {
      continue;
    }
    const list = by_category.get(record.category) ?? [];
    if (list.length < VOCABULARY_HOT_SHARD_CATEGORY_CAP) {
      list.push(record.record_id);
    }
    by_category.set(record.category, list);
  }

  const by_category_payload: Record<string, number[]> = {};
  for (const [category, ids] of [...by_category.entries()].sort(([left], [right]) =>
    compare_by_code_point(left, right),
  )) {
    by_category_payload[category] = ids;
  }

  return {
    shard_id: "hot:global",
    kind: "hot",
    path: "hot/global.msgpack.gz",
    payload: { kind: "hot", global, by_category: by_category_payload },
  };
}

export function build_all_shards(records: readonly VocabularyRecord[]): DraftShard[] {
  return [
    ...build_prefix_shards(records),
    ...build_alias_shards(records),
    ...build_trigram_shards(records),
    ...build_detail_shards(records),
    build_hot_shard(records),
  ];
}

export interface EncodedShard {
  readonly entry: VocabularyShardEntry;
  readonly bytes: Uint8Array;
}

export async function encode_shard(package_id: string, shard: DraftShard): Promise<EncodedShard> {
  const bytes = await encode_shard_bytes(shard.payload);
  return {
    entry: {
      shard_id: shard.shard_id,
      package_id,
      kind: shard.kind,
      path: shard.path,
      sha256: bytesToHex(sha256(bytes)),
      byte_length: bytes.byteLength,
    },
    bytes,
  };
}
