import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import { checkerboard, concentric_rings, seeded_mosaic } from "../fixtures/ui/bitmap_patterns.js";
import { encode_png } from "../fixtures/ui/png_encoder.js";
import { extract_generation_parameters } from "../../apps/extension/src/ui/views/gallery/image_metadata.js";

const FIXTURES_DIR = resolve(import.meta.dirname, "../fixtures/ui");

const PNG_SIGNATURE = Uint8Array.from([137, 80, 78, 71, 13, 10, 26, 10]);

function read_ihdr(bytes: Uint8Array): { width: number; height: number } {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  return { width: view.getUint32(16, false), height: view.getUint32(20, false) };
}

describe("bitmap pattern generator determinism", () => {
  it("produces byte-identical checkerboard output for the same inputs", () => {
    const first = checkerboard(64, 64, 8, { r: 1, g: 2, b: 3 }, { r: 4, g: 5, b: 6 });
    const second = checkerboard(64, 64, 8, { r: 1, g: 2, b: 3 }, { r: 4, g: 5, b: 6 });
    expect(Buffer.from(first)).toEqual(Buffer.from(second));
  });

  it("produces byte-identical seeded mosaic output for the same seed", () => {
    const first = seeded_mosaic(64, 64, 4, 42);
    const second = seeded_mosaic(64, 64, 4, 42);
    expect(Buffer.from(first)).toEqual(Buffer.from(second));
  });

  it("produces different output for different seeds", () => {
    const a = seeded_mosaic(64, 64, 4, 1);
    const b = seeded_mosaic(64, 64, 4, 2);
    expect(Buffer.from(a)).not.toEqual(Buffer.from(b));
  });

  it("encodes a real, re-decodable PNG with the requested dimensions", () => {
    const buffer = concentric_rings(40, 40, 10, [
      { r: 255, g: 0, b: 0 },
      { r: 0, g: 255, b: 0 },
    ]);
    const png = encode_png(40, 40, buffer);
    expect(png.subarray(0, 8)).toEqual(PNG_SIGNATURE);
    expect(read_ihdr(png)).toEqual({ width: 40, height: 40 });
  });
});

describe("committed UI fixtures", () => {
  const EXPECTED_DIMENSIONS: Readonly<Record<string, { width: number; height: number }>> = {
    "portrait.png": { width: 480, height: 720 },
    "landscape.png": { width: 720, height: 480 },
    "square.png": { width: 600, height: 600 },
    "very_light.png": { width: 512, height: 512 },
    "very_dark.png": { width: 512, height: 512 },
    "detailed.png": { width: 640, height: 480 },
  };

  it.each(Object.entries(EXPECTED_DIMENSIONS))(
    "%s is a real PNG with the expected dimensions",
    (file_name, expected) => {
      const bytes = readFileSync(resolve(FIXTURES_DIR, file_name));
      expect(bytes.subarray(0, 8)).toEqual(Buffer.from(PNG_SIGNATURE));
      expect(read_ihdr(new Uint8Array(bytes))).toEqual(expected);
    },
  );

  it("covers portrait, landscape, and square aspect ratios distinctly", () => {
    const portrait = read_ihdr(new Uint8Array(readFileSync(resolve(FIXTURES_DIR, "portrait.png"))));
    const landscape = read_ihdr(
      new Uint8Array(readFileSync(resolve(FIXTURES_DIR, "landscape.png"))),
    );
    const square = read_ihdr(new Uint8Array(readFileSync(resolve(FIXTURES_DIR, "square.png"))));
    expect(portrait.height).toBeGreaterThan(portrait.width);
    expect(landscape.width).toBeGreaterThan(landscape.height);
    expect(square.width).toBe(square.height);
  });

  it("the very_light and very_dark fixtures are not flat single-color fills", () => {
    for (const file_name of ["very_light.png", "very_dark.png"]) {
      const bytes = readFileSync(resolve(FIXTURES_DIR, file_name));
      // A flat fill would compress to a tiny IDAT.
      expect(bytes.byteLength).toBeGreaterThan(1000);
    }
  });

  it("round-trips the detailed fixture's embedded sd_webui parameters end to end", () => {
    const bytes = new Uint8Array(readFileSync(resolve(FIXTURES_DIR, "detailed.png")));
    const parameters = extract_generation_parameters(bytes);
    expect(parameters).not.toBeNull();
    expect(parameters?.source).toBe("sd_webui");
    expect(parameters?.seed).toBe("123456789");
    expect(parameters?.sampler).toBe("DPM++ 2M Karras");
    expect(parameters?.steps).toBe("28");
    expect(parameters?.model).toBe("tavern-canvas-fixture-v1");
    expect(parameters?.positive_prompt).toContain("mosaic tile study");
    expect(parameters?.negative_prompt).toBe("blurry, low detail");
  });

  it("the other five fixtures carry no embedded parameters (nothing accidentally leaked in)", () => {
    for (const file_name of [
      "portrait.png",
      "landscape.png",
      "square.png",
      "very_light.png",
      "very_dark.png",
    ]) {
      const bytes = new Uint8Array(readFileSync(resolve(FIXTURES_DIR, file_name)));
      expect(extract_generation_parameters(bytes)).toBeNull();
    }
  });
});
