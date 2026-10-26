import {
  normalize_vocabulary_search_key,
  VOCABULARY_ALIAS_SHARD_GROUP_CODE_POINTS,
  vocabulary_alias_shard_partition,
  type VocabularyRecord,
} from "@tavern-canvas/contracts";

import { compare_by_code_point, shard_group_key } from "./normalize_record.js";
import type { VocabularyShardFile } from "./write_package.js";

type AliasEntry = [key: string, record_id: number, popularity: number];

function alias_search_texts(record: VocabularyRecord): string[] {
  return record.translation === undefined
    ? record.aliases
    : [...record.aliases, record.translation];
}

/**
 * Keyed by each alias's and the translation's own normalized text. Duplicate (key, record_id) pairs
 * collapse, tracked per key so no separator can conflate distinct pairs. A key's two-code-point
 * group hashes into one of 512 fixed buckets; entries sort by key, popularity desc, record_id asc.
 */
export function build_alias_shards(records: readonly VocabularyRecord[]): VocabularyShardFile[] {
  const seen_ids_by_key = new Map<string, Set<number>>();
  const entries_by_partition = new Map<string, AliasEntry[]>();

  for (const record of records) {
    for (const text of alias_search_texts(record)) {
      const normalized_key = normalize_vocabulary_search_key(text);
      // Keys that normalize to "" are skipped (schema requires min(1)).
      if (normalized_key.length === 0) {
        continue;
      }
      const seen_ids = seen_ids_by_key.get(normalized_key) ?? new Set<number>();
      seen_ids_by_key.set(normalized_key, seen_ids);
      if (seen_ids.has(record.record_id)) {
        continue;
      }
      seen_ids.add(record.record_id);

      const partition = vocabulary_alias_shard_partition(
        shard_group_key(normalized_key, VOCABULARY_ALIAS_SHARD_GROUP_CODE_POINTS),
      );
      const entries = entries_by_partition.get(partition) ?? [];
      entries.push([normalized_key, record.record_id, record.popularity]);
      entries_by_partition.set(partition, entries);
    }
  }

  return [...entries_by_partition.entries()]
    .sort(([left], [right]) => compare_by_code_point(left, right))
    .map(([partition, entries]) => {
      entries.sort(
        ([key_left, id_left, popularity_left], [key_right, id_right, popularity_right]) => {
          const key_order = compare_by_code_point(key_left, key_right);
          if (key_order !== 0) {
            return key_order;
          }
          if (popularity_left !== popularity_right) {
            return popularity_right - popularity_left;
          }
          return id_left - id_right;
        },
      );
      return {
        shard_id: `alias:${partition}`,
        kind: "alias",
        path: `alias/${partition}.msgpack.gz`,
        payload: { kind: "alias", entries },
      } satisfies VocabularyShardFile;
    });
}
