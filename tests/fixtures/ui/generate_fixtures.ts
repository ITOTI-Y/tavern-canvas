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

/**
 * Generates the six real bitmap UI fixtures the Gallery view's tests and browser-smoke depend on
 * (Stage 06 Task 6 brief, Step 3): portrait, landscape, square, very light, very dark, and
 * detailed, each with distinct aspect ratios and visibly different hard-edged content -- no SVG,
 * no remote URLs, no gradients, no blur. Run with `pnpm exec tsx tests/fixtures/ui/generate_fixtures.ts`
 * whenever the patterns in bitmap_patterns.ts change; the output is committed (these are fixtures,
 * not build artifacts), so regenerating is a deliberate, reviewable step, not part of any build.
 */

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

// Portrait: 480x720, checkerboard.
write_png("portrait.png", 480, 720, checkerboard(480, 720, 40, ORANGE, NAVY));

// Landscape: 720x480, diagonal stripes.
write_png("landscape.png", 720, 480, diagonal_stripes(720, 480, 36, [TEAL, GOLD, PLUM]));

// Square: 600x600, concentric rings.
write_png("square.png", 600, 600, concentric_rings(600, 600, 30, [NAVY, GOLD, ORANGE, TEAL]));

// Very light: 512x512, high-key scatter.
write_png("very_light.png", 512, 512, high_key_scatter(512, 512, 1));

// Very dark: 512x512, low-key scatter.
write_png("very_dark.png", 512, 512, low_key_scatter(512, 512, 2));

// Detailed: 640x480, seeded mosaic, with an sd_webui-style embedded "parameters" tEXt chunk so
// the Gallery metadata inspector's PNG-chunk extraction (image_metadata.ts) has one fixture that
// proves real round-trip extraction, not just a mocked payload.
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
