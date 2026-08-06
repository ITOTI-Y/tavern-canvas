import { describe, expect, it } from "vitest";

import {
  VOCABULARY_DETAIL_SHARD_MAX_RECORDS,
  VOCABULARY_HOT_SHARD_CATEGORY_CAP,
  VOCABULARY_HOT_SHARD_GLOBAL_CAP,
  VocabularyAliasShardPayloadSchema,
  VocabularyDetailShardPayloadSchema,
  VocabularyHotShardPayloadSchema,
  VocabularyPrefixShardPayloadSchema,
  VocabularyShardPayloadSchema,
  VocabularyTrigramShardPayloadSchema,
} from "./vocabulary_shards.js";

const minimal_record = { record_id: 0, tag: "1girl" };

describe("VocabularyPrefixShardPayloadSchema", () => {
  it("accepts sorted (key, record_id, popularity) tuples", () => {
    const payload = {
      kind: "prefix",
      entries: [
        ["1girl", 0, 10],
        ["1girl alt", 1, 3],
      ],
    };
    expect(VocabularyPrefixShardPayloadSchema.safeParse(payload).success).toBe(true);
  });

  it("rejects an empty key", () => {
    const payload = { kind: "prefix", entries: [["", 0, 10]] };
    expect(VocabularyPrefixShardPayloadSchema.safeParse(payload).success).toBe(false);
  });

  it("rejects a wrong kind literal", () => {
    const payload = { kind: "alias", entries: [] };
    expect(VocabularyPrefixShardPayloadSchema.safeParse(payload).success).toBe(false);
  });

  it("rejects unknown top-level keys", () => {
    const payload = { kind: "prefix", entries: [], extra: true };
    expect(VocabularyPrefixShardPayloadSchema.safeParse(payload).success).toBe(false);
  });
});

describe("VocabularyAliasShardPayloadSchema", () => {
  it("shares the (key, record_id, popularity) tuple layout with prefix shards", () => {
    const payload = { kind: "alias", entries: [["neko mimi", 0, 10]] };
    expect(VocabularyAliasShardPayloadSchema.safeParse(payload).success).toBe(true);
  });
});

describe("VocabularyTrigramShardPayloadSchema", () => {
  it("accepts a trigram mapped to delta-encoded ascending record ids", () => {
    const payload = { kind: "trigram", entries: [["cat", [0, 4, 1]]] };
    expect(VocabularyTrigramShardPayloadSchema.safeParse(payload).success).toBe(true);
  });

  it("rejects a negative first delta", () => {
    const payload = { kind: "trigram", entries: [["cat", [-1]]] };
    expect(VocabularyTrigramShardPayloadSchema.safeParse(payload).success).toBe(false);
  });

  it("rejects a non-positive subsequent delta", () => {
    const payload = { kind: "trigram", entries: [["cat", [0, 0]]] };
    expect(VocabularyTrigramShardPayloadSchema.safeParse(payload).success).toBe(false);
  });

  it("rejects an empty deltas array", () => {
    const payload = { kind: "trigram", entries: [["cat", []]] };
    expect(VocabularyTrigramShardPayloadSchema.safeParse(payload).success).toBe(false);
  });
});

describe("VocabularyDetailShardPayloadSchema", () => {
  it("accepts up to the documented maximum of consecutive records", () => {
    const payload = { kind: "detail", start_id: 0, records: [minimal_record] };
    expect(VocabularyDetailShardPayloadSchema.safeParse(payload).success).toBe(true);
  });

  it("rejects more than the maximum record count", () => {
    const records = Array.from({ length: VOCABULARY_DETAIL_SHARD_MAX_RECORDS + 1 }, (_, index) => ({
      record_id: index,
      tag: `tag_${String(index)}`,
    }));
    const payload = { kind: "detail", start_id: 0, records };
    expect(VocabularyDetailShardPayloadSchema.safeParse(payload).success).toBe(false);
  });

  it("rejects an empty records array", () => {
    const payload = { kind: "detail", start_id: 0, records: [] };
    expect(VocabularyDetailShardPayloadSchema.safeParse(payload).success).toBe(false);
  });
});

describe("VocabularyHotShardPayloadSchema", () => {
  it("accepts global and per-category descending id lists", () => {
    const payload = { kind: "hot", global: [0, 1, 2], by_category: { general: [0, 1] } };
    expect(VocabularyHotShardPayloadSchema.safeParse(payload).success).toBe(true);
  });

  it("accepts an empty by_category map", () => {
    const payload = { kind: "hot", global: [], by_category: {} };
    expect(VocabularyHotShardPayloadSchema.safeParse(payload).success).toBe(true);
  });

  it("rejects a global list past the documented cap", () => {
    const global = Array.from({ length: VOCABULARY_HOT_SHARD_GLOBAL_CAP + 1 }, (_, index) => index);
    const payload = { kind: "hot", global, by_category: {} };
    expect(VocabularyHotShardPayloadSchema.safeParse(payload).success).toBe(false);
  });

  it("rejects a per-category list past the documented cap", () => {
    const category_ids = Array.from(
      { length: VOCABULARY_HOT_SHARD_CATEGORY_CAP + 1 },
      (_, index) => index,
    );
    const payload = { kind: "hot", global: [], by_category: { general: category_ids } };
    expect(VocabularyHotShardPayloadSchema.safeParse(payload).success).toBe(false);
  });
});

describe("VocabularyShardPayloadSchema", () => {
  it("discriminates across all five documented shard kinds", () => {
    const payloads = [
      { kind: "prefix", entries: [] },
      { kind: "alias", entries: [] },
      { kind: "trigram", entries: [] },
      { kind: "detail", start_id: 0, records: [minimal_record] },
      { kind: "hot", global: [], by_category: {} },
    ];
    for (const payload of payloads) {
      expect(VocabularyShardPayloadSchema.safeParse(payload).success).toBe(true);
    }
  });

  it("rejects an unknown kind", () => {
    expect(VocabularyShardPayloadSchema.safeParse({ kind: "fuzzy", entries: [] }).success).toBe(
      false,
    );
  });
});
