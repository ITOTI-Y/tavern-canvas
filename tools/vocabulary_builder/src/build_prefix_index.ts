import { normalize_vocabulary_search_key, type VocabularyRecord } from "@tavern-canvas/contracts";

import {
  compare_by_code_point,
  encode_group_key_segment,
  shard_group_key,
} from "./normalize_record.js";
import type { VocabularyShardFile } from "./write_package.js";

const GROUP_CODE_POINT_COUNT = 2;

type PrefixEntry = [key: string, record_id: number, popularity: number];

/**
 * Groups records by the first two normalized Unicode code points of their
 * tag. Within a shard, entries are sorted by key (code-point order), then
 * popularity descending, then record_id ascending, per the payload
 * contract's prefix shard layout.
 */
export function build_prefix_shards(records: readonly VocabularyRecord[]): VocabularyShardFile[] {
  const entries_by_group = new Map<string, PrefixEntry[]>();

  for (const record of records) {
    const normalized_tag = normalize_vocabulary_search_key(record.tag);
    const group_key = shard_group_key(normalized_tag, GROUP_CODE_POINT_COUNT);
    const entries = entries_by_group.get(group_key) ?? [];
    entries.push([normalized_tag, record.record_id, record.popularity]);
    entries_by_group.set(group_key, entries);
  }

  return [...entries_by_group.entries()]
    .sort(([left], [right]) => compare_by_code_point(left, right))
    .map(([group_key, entries]) => {
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
        shard_id: `prefix:${group_key}`,
        kind: "prefix",
        path: `prefix/${encode_group_key_segment(group_key)}.msgpack.gz`,
        payload: { kind: "prefix", entries },
      } satisfies VocabularyShardFile;
    });
}
