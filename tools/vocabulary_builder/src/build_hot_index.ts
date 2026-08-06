import {
  VOCABULARY_HOT_SHARD_CATEGORY_CAP,
  VOCABULARY_HOT_SHARD_GLOBAL_CAP,
  type VocabularyRecord,
} from "@tavern-canvas/contracts";

import { compare_by_code_point } from "./normalize_record.js";
import type { VocabularyShardFile } from "./write_package.js";

const HOT_SHARD_ID = "hot:global";
const HOT_SHARD_PATH = "hot/global.msgpack.gz";

/**
 * Builds the single hot shard: record ids ranked by popularity descending
 * (record_id ascending as a tie-break), capped globally and per category.
 * Both lists are derived from the same popularity-sorted pass, so
 * per-category order falls out of the global order for free.
 */
export function build_hot_shard(records: readonly VocabularyRecord[]): VocabularyShardFile {
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
    shard_id: HOT_SHARD_ID,
    kind: "hot",
    path: HOT_SHARD_PATH,
    payload: { kind: "hot", global, by_category: by_category_payload },
  } satisfies VocabularyShardFile;
}
