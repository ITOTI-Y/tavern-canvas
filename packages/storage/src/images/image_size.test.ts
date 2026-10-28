import { describe, expect, it } from "vitest";

import { read_image_size } from "./image_size.js";

function bytes(...parts: readonly (readonly number[] | string)[]): Uint8Array {
  return Uint8Array.from(
    parts.flatMap((part) =>
      typeof part === "string"
        ? Array.from({ length: part.length }, (_, index) => part.charCodeAt(index))
        : part,
    ),
  );
}

const u32be = (value: number) => [
  value >>> 24,
  (value >>> 16) & 255,
  (value >>> 8) & 255,
  value & 255,
];
const u16be = (value: number) => [value >>> 8, value & 255];
const u16le = (value: number) => [value & 255, value >>> 8];
const u24le = (value: number) => [value & 255, (value >>> 8) & 255, (value >>> 16) & 255];

describe("read_image_size", () => {
  it("reads a PNG IHDR", () => {
    const png = bytes([0x89], "PNG\r\n\x1a\n", u32be(13), "IHDR", u32be(832), u32be(1216));
    expect(read_image_size(png)).toEqual({ width: 832, height: 1216 });
  });

  it("reads the frame size of a JPEG after other segments", () => {
    const jpeg = bytes(
      [0xff, 0xd8],
      [0xff, 0xe0],
      u16be(6),
      [0, 0, 0, 0],
      [0xff, 0xc0],
      u16be(11),
      [8],
      u16be(600),
      u16be(400),
      [3, 0, 0, 0],
    );
    expect(read_image_size(jpeg)).toEqual({ width: 400, height: 600 });
  });

  it("reads lossy, lossless and extended WebP headers", () => {
    const lossy = bytes(
      "RIFF",
      [0, 0, 0, 0],
      "WEBPVP8 ",
      [0, 0, 0, 0],
      [0, 0, 0, 0x9d, 0x01, 0x2a],
      u16le(384),
      u16le(256),
    );
    expect(read_image_size(lossy)).toEqual({ width: 384, height: 256 });

    const bits = (384 - 1) | ((256 - 1) << 14);
    const lossless = bytes(
      "RIFF",
      [0, 0, 0, 0],
      "WEBPVP8L",
      [0, 0, 0, 0],
      [0x2f],
      [bits & 255, (bits >>> 8) & 255, (bits >>> 16) & 255, (bits >>> 24) & 255],
    );
    expect(read_image_size(lossless)).toEqual({ width: 384, height: 256 });

    const extended = bytes(
      "RIFF",
      [0, 0, 0, 0],
      "WEBPVP8X",
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      u24le(1023),
      u24le(767),
    );
    expect(read_image_size(extended)).toEqual({ width: 1024, height: 768 });
  });

  it("returns null for unknown or truncated data", () => {
    expect(read_image_size(bytes("GIF89a"))).toBeNull();
    expect(read_image_size(bytes([0x89], "PNG"))).toBeNull();
  });
});
