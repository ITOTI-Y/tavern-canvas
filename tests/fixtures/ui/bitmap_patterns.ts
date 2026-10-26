import type { RgbaBuffer } from "./png_encoder.js";

export interface RgbColor {
  readonly r: number;
  readonly g: number;
  readonly b: number;
}

function set_pixel(buffer: RgbaBuffer, width: number, x: number, y: number, color: RgbColor): void {
  const offset = (y * width + x) * 4;
  buffer[offset] = color.r;
  buffer[offset + 1] = color.g;
  buffer[offset + 2] = color.b;
  buffer[offset + 3] = 255;
}

function make_buffer(width: number, height: number): RgbaBuffer {
  return new Uint8Array(width * height * 4);
}

// Never Math.random(): the fixture bytes must be identical on every run.
function seeded_random(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d_2b_79_f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4_294_967_296;
  };
}

export function checkerboard(
  width: number,
  height: number,
  cell_size: number,
  color_a: RgbColor,
  color_b: RgbColor,
): RgbaBuffer {
  const buffer = make_buffer(width, height);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const is_a = (Math.floor(x / cell_size) + Math.floor(y / cell_size)) % 2 === 0;
      set_pixel(buffer, width, x, y, is_a ? color_a : color_b);
    }
  }
  return buffer;
}

export function concentric_rings(
  width: number,
  height: number,
  ring_thickness: number,
  colors: readonly RgbColor[],
): RgbaBuffer {
  const buffer = make_buffer(width, height);
  const center_x = width / 2;
  const center_y = height / 2;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const distance = Math.hypot(x - center_x, y - center_y);
      const ring_index = Math.floor(distance / ring_thickness) % colors.length;
      set_pixel(buffer, width, x, y, colors[ring_index] ?? colors[0] ?? { r: 0, g: 0, b: 0 });
    }
  }
  return buffer;
}

export function diagonal_stripes(
  width: number,
  height: number,
  stripe_width: number,
  colors: readonly RgbColor[],
): RgbaBuffer {
  const buffer = make_buffer(width, height);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const stripe_index = Math.floor((x + y) / stripe_width) % colors.length;
      set_pixel(buffer, width, x, y, colors[stripe_index] ?? colors[0] ?? { r: 0, g: 0, b: 0 });
    }
  }
  return buffer;
}

export function seeded_mosaic(
  width: number,
  height: number,
  cell_size: number,
  seed: number,
): RgbaBuffer {
  const buffer = make_buffer(width, height);
  const columns = Math.ceil(width / cell_size);
  const rows = Math.ceil(height / cell_size);
  const random = seeded_random(seed);
  const cell_colors: RgbColor[] = [];
  for (let index = 0; index < columns * rows; index += 1) {
    cell_colors.push({
      r: Math.floor(random() * 256),
      g: Math.floor(random() * 256),
      b: Math.floor(random() * 256),
    });
  }
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const column = Math.floor(x / cell_size);
      const row = Math.floor(y / cell_size);
      const color = cell_colors[row * columns + column] ?? { r: 0, g: 0, b: 0 };
      set_pixel(buffer, width, x, y, color);
    }
  }
  return buffer;
}

export function high_key_scatter(width: number, height: number, seed: number): RgbaBuffer {
  const buffer = make_buffer(width, height);
  const background: RgbColor = { r: 246, g: 246, b: 242 };
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      set_pixel(buffer, width, x, y, background);
    }
  }
  const random = seeded_random(seed);
  const accent: RgbColor = { r: 40, g: 42, b: 48 };
  const square_size = Math.max(8, Math.floor(Math.min(width, height) / 20));
  for (let index = 0; index < 24; index += 1) {
    const origin_x = Math.floor(random() * (width - square_size));
    const origin_y = Math.floor(random() * (height - square_size));
    for (let y = origin_y; y < origin_y + square_size; y += 1) {
      for (let x = origin_x; x < origin_x + square_size; x += 1) {
        set_pixel(buffer, width, x, y, accent);
      }
    }
  }
  return buffer;
}

export function low_key_scatter(width: number, height: number, seed: number): RgbaBuffer {
  const buffer = make_buffer(width, height);
  const background: RgbColor = { r: 16, g: 17, b: 20 };
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      set_pixel(buffer, width, x, y, background);
    }
  }
  const random = seeded_random(seed);
  const accent: RgbColor = { r: 232, g: 230, b: 220 };
  const square_size = Math.max(8, Math.floor(Math.min(width, height) / 20));
  for (let index = 0; index < 24; index += 1) {
    const origin_x = Math.floor(random() * (width - square_size));
    const origin_y = Math.floor(random() * (height - square_size));
    for (let y = origin_y; y < origin_y + square_size; y += 1) {
      for (let x = origin_x; x < origin_x + square_size; x += 1) {
        set_pixel(buffer, width, x, y, accent);
      }
    }
  }
  return buffer;
}
