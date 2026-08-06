import { decode, encode } from "@msgpack/msgpack";

import type { VocabularyShardPayload } from "./vocabulary_shard_payloads.js";

// Every shard file is MessagePack, then gzip (payload-contract.md). Browsers
// (and modern Node, used by the "packages"/"tools"/"apps" Vitest projects)
// expose global DecompressionStream/CompressionStream; node:zlib is the
// fallback for environments that do not.
// lib.dom's BlobPart wants a Uint8Array<ArrayBuffer>, not the wider
// Uint8Array<ArrayBufferLike> plain `Uint8Array` types as; re-wrapping
// guarantees plain ArrayBuffer backing regardless of the caller's buffer type.
function as_blob_part(bytes: Uint8Array): Uint8Array<ArrayBuffer> {
  return new Uint8Array(bytes);
}

async function gzip_bytes(bytes: Uint8Array): Promise<Uint8Array> {
  if (typeof CompressionStream !== "undefined") {
    const stream = new Blob([as_blob_part(bytes)])
      .stream()
      .pipeThrough(new CompressionStream("gzip"));
    return new Uint8Array(await new Response(stream).arrayBuffer());
  }
  const zlib = await import("node:zlib");
  return new Uint8Array(zlib.gzipSync(bytes, { level: 9 }));
}

async function gunzip_bytes(bytes: Uint8Array): Promise<Uint8Array> {
  if (typeof DecompressionStream !== "undefined") {
    const stream = new Blob([as_blob_part(bytes)])
      .stream()
      .pipeThrough(new DecompressionStream("gzip"));
    return new Uint8Array(await new Response(stream).arrayBuffer());
  }
  const zlib = await import("node:zlib");
  return new Uint8Array(zlib.gunzipSync(bytes));
}

export interface DecodedShard {
  readonly payload: VocabularyShardPayload;
  // Decompressed (post-gunzip, pre-msgpack-decode) byte length -- the LRU's
  // "decoded byte size" accounting unit. Cheap and exact, unlike walking the
  // decoded object graph.
  readonly decoded_byte_size: number;
}

export async function decode_shard_bytes(compressed: Uint8Array): Promise<DecodedShard> {
  const decompressed = await gunzip_bytes(compressed);
  const payload = decode(decompressed) as VocabularyShardPayload;
  return { payload, decoded_byte_size: decompressed.byteLength };
}

// Test-only symmetric encoder: builds fixture bytes the way the real builder
// (Task 2) would, so search/** and Worker tests exercise the real
// gzip+MessagePack wire format instead of asserting against raw objects.
export async function encode_shard_bytes(payload: VocabularyShardPayload): Promise<Uint8Array> {
  return gzip_bytes(encode(payload));
}
