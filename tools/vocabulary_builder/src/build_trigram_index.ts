import { normalize_vocabulary_search_key, type VocabularyRecord } from "@tavern-canvas/contracts";

import {
  compare_by_code_point,
  encode_group_key_segment,
  shard_group_key,
} from "./normalize_record.js";
import type { VocabularyShardFile } from "./write_package.js";

const TRIGRAM_CODE_POINT_LENGTH = 3;
const GROUP_CODE_POINT_COUNT = 2;

type TrigramEntry = [trigram: string, deltas: number[]];

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

/** Indexes the normalized tag text only; aliases and translations have the alias index. Record ids are delta-encoded ascending. */
export function build_trigram_shards(records: readonly VocabularyRecord[]): VocabularyShardFile[] {
  const ids_by_trigram = new Map<string, Set<number>>();

  for (const record of records) {
    const normalized_tag = normalize_vocabulary_search_key(record.tag);
    for (const trigram of extract_trigrams(normalized_tag)) {
      const ids = ids_by_trigram.get(trigram) ?? new Set<number>();
      ids.add(record.record_id);
      ids_by_trigram.set(trigram, ids);
    }
  }

  const entries_by_group = new Map<string, TrigramEntry[]>();
  for (const [trigram, ids] of ids_by_trigram) {
    const group_key = shard_group_key(trigram, GROUP_CODE_POINT_COUNT);
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
      } satisfies VocabularyShardFile;
    });
}
