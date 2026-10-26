import {
  VOCABULARY_DETAIL_SHARD_MAX_RECORDS,
  type VocabularyRecord,
} from "@tavern-canvas/contracts";

import type { VocabularyShardFile } from "./write_package.js";

export function build_detail_shards(records: readonly VocabularyRecord[]): VocabularyShardFile[] {
  const sorted = [...records].sort((left, right) => left.record_id - right.record_id);
  const shards: VocabularyShardFile[] = [];

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
