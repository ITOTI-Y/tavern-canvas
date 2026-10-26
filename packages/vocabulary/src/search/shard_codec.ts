import { decode, encode } from "@msgpack/msgpack";

import type { VocabularyShardPayload } from "./vocabulary_shard_payloads.js";

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

async function gunzip_bytes(bytes: Uint8Array): Promise<Uint8Array> {
  if (typeof DecompressionStream !== "undefined") {
    const stream = new DecompressionStream("gzip");
    const writer = stream.writable.getWriter();
    // A write/close failure also surfaces on the readable side; swallowed here to avoid an unhandled
    // rejection.
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
  // Decompressed length is the LRU's byte-accounting unit.
  readonly decoded_byte_size: number;
}

export async function decode_shard_bytes(compressed: Uint8Array): Promise<DecodedShard> {
  const decompressed = await gunzip_bytes(compressed);
  const payload = decode(decompressed) as VocabularyShardPayload;
  return { payload, decoded_byte_size: decompressed.byteLength };
}

export async function encode_shard_bytes(payload: VocabularyShardPayload): Promise<Uint8Array> {
  return gzip_bytes(encode(payload));
}
