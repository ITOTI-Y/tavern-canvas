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

function concat_chunks(chunks: readonly Uint8Array[], total_length: number): Uint8Array {
  const merged = new Uint8Array(total_length);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return merged;
}

/**
 * Feeds the compressed bytes straight into a DecompressionStream and drains
 * its reader, rather than routing them through a Blob and a Response. Both
 * detours are pure overhead on the Worker's hottest path: measured in
 * Chromium over a real 318 KiB detail shard, Blob + Response costs 1.79 ms,
 * Response alone 1.01 ms, and this reader loop 0.79 ms.
 */
async function gunzip_bytes(bytes: Uint8Array): Promise<Uint8Array> {
  if (typeof DecompressionStream !== "undefined") {
    const stream = new DecompressionStream("gzip");
    const writer = stream.writable.getWriter();
    // A write/close failure also surfaces on the readable side, which is
    // where it is awaited; swallowing it here only avoids an unhandled
    // rejection when the read loop rejects first.
    const written = writer
      .write(as_blob_part(bytes))
      .then(() => writer.close())
      .catch(() => undefined);

    const reader = stream.readable.getReader();
    const chunks: Uint8Array[] = [];
    let total_length = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      chunks.push(value);
      total_length += value.byteLength;
    }
    await written;
    return concat_chunks(chunks, total_length);
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
