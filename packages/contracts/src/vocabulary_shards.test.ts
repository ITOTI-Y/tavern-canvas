import { describe, expect, it } from "vitest";

import {
  fnv1a_32,
  VOCABULARY_ALIAS_SHARD_BUCKET_COUNT,
  VOCABULARY_DETAIL_SHARD_MAX_RECORDS,
  VOCABULARY_HOT_SHARD_CATEGORY_CAP,
  VOCABULARY_HOT_SHARD_GLOBAL_CAP,
  vocabulary_alias_shard_partition,
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

  it("accepts an entry key at the 512-character bound a normalized translation can reach", () => {
    // VocabularyRecordSchema's translation max is 512 (vocabulary.ts); a key
    // bound below that would make a legitimate long translation unindexable
    // even though the source record itself validates fine.
    const long_key = "a".repeat(512);
    const payload = { kind: "alias", entries: [[long_key, 0, 10]] };
    expect(VocabularyAliasShardPayloadSchema.safeParse(payload).success).toBe(true);
  });

  it("rejects an entry key past the 512-character bound", () => {
    const payload = { kind: "alias", entries: [["a".repeat(513), 0, 10]] };
    expect(VocabularyAliasShardPayloadSchema.safeParse(payload).success).toBe(false);
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

describe("fnv1a_32", () => {
  // The canonical FNV-1a 32-bit test vectors, independent of this
  // implementation -- the encoder/decoder agreement the addendum demands is
  // only meaningful against an externally fixed reference.
  it.each([
    ["", 0x811c9dc5],
    ["a", 0xe40c292c],
    ["foobar", 0xbf9cf968],
  ])("matches the reference digest for %j", (text, expected) => {
    expect(fnv1a_32(text)).toBe(expected);
  });

  it("hashes UTF-8 bytes, not UTF-16 code units", () => {
    expect(fnv1a_32("夕焼")).toBe(0x49aa2e84);
  });

  it("stays inside the unsigned 32-bit range", () => {
    for (const text of ["", "a", "夕焼", "a very long alias key that wraps many times over"]) {
      const hash = fnv1a_32(text);
      expect(Number.isInteger(hash)).toBe(true);
      expect(hash).toBeGreaterThanOrEqual(0);
      expect(hash).toBeLessThanOrEqual(0xffffffff);
    }
  });
});

describe("vocabulary_alias_shard_partition", () => {
  it("formats the bucket as three zero-padded decimal digits", () => {
    expect(vocabulary_alias_shard_partition("桜花")).toBe("h041");
    expect(vocabulary_alias_shard_partition("su")).toBe("h469");
  });

  it("never leaves the h000..h511 range", () => {
    const seen = new Set<string>();
    for (let index = 0; index < 20_000; index += 1) {
      const partition = vocabulary_alias_shard_partition(String.fromCodePoint(0x4e00 + index));
      expect(partition).toMatch(/^h\d{3}$/u);
      expect(Number.parseInt(partition.slice(1), 10)).toBeLessThan(
        VOCABULARY_ALIAS_SHARD_BUCKET_COUNT,
      );
      seen.add(partition);
    }
    // 20,000 distinct CJK keys must not collapse onto a handful of buckets;
    // this is the property that bounds shard COUNT without unbounding shard SIZE.
    expect(seen.size).toBe(VOCABULARY_ALIAS_SHARD_BUCKET_COUNT);
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
