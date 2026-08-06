import { describe, expect, it } from "vitest";

import { decode_shard_bytes, encode_shard_bytes } from "./shard_codec.js";
import type { VocabularyPrefixOrAliasShardPayload } from "./vocabulary_shard_payloads.js";

describe("shard_codec", () => {
  it("round-trips a shard payload through gzip + MessagePack", async () => {
    const payload: VocabularyPrefixOrAliasShardPayload = {
      kind: "prefix",
      entries: [
        ["cat", 1, 10],
        ["catalog", 2, 5],
      ],
    };
    const compressed = await encode_shard_bytes(payload);
    const decoded = await decode_shard_bytes(compressed);
    expect(decoded.payload).toEqual(payload);
    expect(decoded.decoded_byte_size).toBeGreaterThan(0);
  });

  it("reports a decoded byte size distinct from the compressed input size", async () => {
    const payload: VocabularyPrefixOrAliasShardPayload = {
      kind: "alias",
      entries: Array.from(
        { length: 50 },
        (_, index) => [`alias ${String(index)}`, index, index] as const,
      ),
    };
    const compressed = await encode_shard_bytes(payload);
    const decoded = await decode_shard_bytes(compressed);
    expect(decoded.decoded_byte_size).not.toBe(compressed.byteLength);
  });
});
