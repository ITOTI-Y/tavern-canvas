import { deflateSync } from "node:zlib";

/**
 * Minimal, dependency-free PNG encoder: 8-bit RGBA, filter-none scanlines, one zlib-deflated IDAT.
 * No third-party image library is a workspace dependency, and the point of these fixtures is a
 * deterministic *generator* the repo can review byte-for-byte, not a black-box binary blob.
 */

const PNG_SIGNATURE = Uint8Array.from([137, 80, 78, 71, 13, 10, 26, 10]);

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) {
      c = c & 1 ? 0xed_b8_83_20 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(bytes: Uint8Array): number {
  let crc = 0xff_ff_ff_ff;
  for (const byte of bytes) {
    const table_value = CRC_TABLE[(crc ^ byte) & 0xff] ?? 0;
    crc = table_value ^ (crc >>> 8);
  }
  return (crc ^ 0xff_ff_ff_ff) >>> 0;
}

function ascii_bytes(text: string): Uint8Array {
  return Uint8Array.from(text, (character) => character.charCodeAt(0) & 0xff);
}

function concat(parts: readonly Uint8Array[]): Uint8Array {
  const total = parts.reduce((sum, part) => sum + part.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const part of parts) {
    out.set(part, offset);
    offset += part.length;
  }
  return out;
}

function png_chunk(type: string, data: Uint8Array): Uint8Array {
  const length_bytes = new Uint8Array(4);
  new DataView(length_bytes.buffer).setUint32(0, data.length, false);
  const type_and_data = concat([ascii_bytes(type), data]);
  const crc_bytes = new Uint8Array(4);
  new DataView(crc_bytes.buffer).setUint32(0, crc32(type_and_data), false);
  return concat([length_bytes, type_and_data, crc_bytes]);
}

export interface PngTextChunkInput {
  readonly keyword: string;
  readonly text: string;
}

/** RGBA pixel buffer, row-major, 4 bytes per pixel, length === width * height * 4. */
export type RgbaBuffer = Uint8Array;

export function encode_png(
  width: number,
  height: number,
  rgba: RgbaBuffer,
  text_chunks: readonly PngTextChunkInput[] = [],
): Uint8Array {
  if (rgba.length !== width * height * 4) {
    throw new Error(
      `RGBA buffer length ${String(rgba.length)} does not match ${String(width)}x${String(height)}x4`,
    );
  }

  const ihdr = new Uint8Array(13);
  const ihdr_view = new DataView(ihdr.buffer);
  ihdr_view.setUint32(0, width, false);
  ihdr_view.setUint32(4, height, false);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type: truecolor + alpha
  ihdr[10] = 0; // compression method
  ihdr[11] = 0; // filter method
  ihdr[12] = 0; // interlace: none

  const stride = width * 4;
  const raw = new Uint8Array((stride + 1) * height);
  for (let y = 0; y < height; y += 1) {
    raw[y * (stride + 1)] = 0; // filter type: none
    raw.set(rgba.subarray(y * stride, y * stride + stride), y * (stride + 1) + 1);
  }
  const idat = new Uint8Array(deflateSync(Buffer.from(raw.buffer, raw.byteOffset, raw.byteLength)));

  const chunks: Uint8Array[] = [PNG_SIGNATURE, png_chunk("IHDR", ihdr)];
  for (const text_chunk of text_chunks) {
    chunks.push(
      png_chunk(
        "tEXt",
        concat([ascii_bytes(text_chunk.keyword), Uint8Array.of(0), ascii_bytes(text_chunk.text)]),
      ),
    );
  }
  chunks.push(png_chunk("IDAT", idat));
  chunks.push(png_chunk("IEND", new Uint8Array(0)));

  return concat(chunks);
}
