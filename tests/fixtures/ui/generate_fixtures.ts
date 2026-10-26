import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

import {
  checkerboard,
  concentric_rings,
  diagonal_stripes,
  high_key_scatter,
  low_key_scatter,
  seeded_mosaic,
} from "./bitmap_patterns.js";
import { encode_png } from "./png_encoder.js";

// Regenerate with `pnpm exec tsx tests/fixtures/ui/generate_fixtures.ts`; the output is committed.

const OUTPUT_DIRECTORY = import.meta.dirname;

const ORANGE = { r: 214, g: 96, b: 42 };
const TEAL = { r: 32, g: 110, b: 108 };
const NAVY = { r: 30, g: 42, b: 92 };
const GOLD = { r: 214, g: 168, b: 60 };
const PLUM = { r: 108, g: 46, b: 96 };

function write_png(
  file_name: string,
  width: number,
  height: number,
  buffer: Uint8Array,
  text_chunks: readonly { readonly keyword: string; readonly text: string }[] = [],
): void {
  const bytes = encode_png(width, height, buffer, text_chunks);
  writeFileSync(resolve(OUTPUT_DIRECTORY, file_name), bytes);
}

write_png("portrait.png", 480, 720, checkerboard(480, 720, 40, ORANGE, NAVY));

write_png("landscape.png", 720, 480, diagonal_stripes(720, 480, 36, [TEAL, GOLD, PLUM]));

write_png("square.png", 600, 600, concentric_rings(600, 600, 30, [NAVY, GOLD, ORANGE, TEAL]));

write_png("very_light.png", 512, 512, high_key_scatter(512, 512, 1));

write_png("very_dark.png", 512, 512, low_key_scatter(512, 512, 2));

write_png("detailed.png", 640, 480, seeded_mosaic(640, 480, 8, 3), [
  {
    keyword: "parameters",
    text:
      "a detailed mosaic tile study, vivid color blocks, high texture\n" +
      "Negative prompt: blurry, low detail\n" +
      "Steps: 28, Sampler: DPM++ 2M Karras, CFG scale: 7, Seed: 123456789, Size: 640x480, Model: tavern-canvas-fixture-v1",
  },
]);

console.log(`Wrote 6 UI fixtures to ${OUTPUT_DIRECTORY}`);
