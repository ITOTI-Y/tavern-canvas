const MASK_DILATION_LATENT_PIXELS = 4;
const FEATHER_RADIUS_PIXELS = 10;
const FEATHER_PASSES = 2;

export interface LatentMask {
  /** One value per latent pixel: 255 inside the inpainted region, 0 outside. */
  readonly values: Uint8Array;
  readonly width: number;
  readonly height: number;
}

export function dilate_mask(mask: LatentMask, radius: number): LatentMask {
  const { width, height, values } = mask;
  const horizontal = new Uint8Array(values.length);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      let value = 0;
      for (let dx = -radius; dx <= radius && value === 0; dx += 1) {
        const sample_x = x + dx;
        if (sample_x >= 0 && sample_x < width) {
          value = values[y * width + sample_x] ?? 0;
        }
      }
      horizontal[y * width + x] = value;
    }
  }
  const dilated = new Uint8Array(values.length);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      let value = 0;
      for (let dy = -radius; dy <= radius && value === 0; dy += 1) {
        const sample_y = y + dy;
        if (sample_y >= 0 && sample_y < height) {
          value = horizontal[sample_y * width + x] ?? 0;
        }
      }
      dilated[y * width + x] = value;
    }
  }
  return { width, height, values: dilated };
}

/** Bilinear upscale to coverage in [0, 1]. */
export function upscale_mask(mask: LatentMask, width: number, height: number): Float32Array {
  const coverage = new Float32Array(width * height);
  const scale_x = mask.width / width;
  const scale_y = mask.height / height;
  const sample = (x: number, y: number): number =>
    (mask.values[
      Math.min(mask.height - 1, Math.max(0, y)) * mask.width +
        Math.min(mask.width - 1, Math.max(0, x))
    ] ?? 0) / 255;
  for (let y = 0; y < height; y += 1) {
    const source_y = (y + 0.5) * scale_y - 0.5;
    const y0 = Math.floor(source_y);
    const fy = source_y - y0;
    for (let x = 0; x < width; x += 1) {
      const source_x = (x + 0.5) * scale_x - 0.5;
      const x0 = Math.floor(source_x);
      const fx = source_x - x0;
      const top = sample(x0, y0) * (1 - fx) + sample(x0 + 1, y0) * fx;
      const bottom = sample(x0, y0 + 1) * (1 - fx) + sample(x0 + 1, y0 + 1) * fx;
      coverage[y * width + x] = top * (1 - fy) + bottom * fy;
    }
  }
  return coverage;
}

function box_blur_pass(
  source: Float32Array,
  width: number,
  height: number,
  radius: number,
  horizontal: boolean,
): Float32Array {
  const output = new Float32Array(source.length);
  const length = horizontal ? width : height;
  const lines = horizontal ? height : width;
  const window = radius * 2 + 1;
  for (let line = 0; line < lines; line += 1) {
    const index = (position: number): number => {
      const clamped = Math.min(length - 1, Math.max(0, position));
      return horizontal ? line * width + clamped : clamped * width + line;
    };
    let sum = 0;
    for (let offset = -radius; offset <= radius; offset += 1) {
      sum += source[index(offset)] ?? 0;
    }
    for (let position = 0; position < length; position += 1) {
      output[index(position)] = sum / window;
      sum += (source[index(position + radius + 1)] ?? 0) - (source[index(position - radius)] ?? 0);
    }
  }
  return output;
}

export function blur_coverage(
  coverage: Float32Array,
  width: number,
  height: number,
  radius: number,
  passes: number,
): Float32Array {
  let blurred = coverage;
  for (let pass = 0; pass < passes; pass += 1) {
    blurred = box_blur_pass(blurred, width, height, radius, true);
    blurred = box_blur_pass(blurred, width, height, radius, false);
  }
  return blurred;
}

/**
 * The blend weight NovelAI's web client uses to paste an inpainting result over its source: the
 * latent mask grown by four latent pixels, scaled to image size and softened at the edge.
 */
export function feather_infill_mask(mask: LatentMask, width: number, height: number): Float32Array {
  const grown = dilate_mask(mask, MASK_DILATION_LATENT_PIXELS);
  return blur_coverage(
    upscale_mask(grown, width, height),
    width,
    height,
    FEATHER_RADIUS_PIXELS,
    FEATHER_PASSES,
  );
}

/** RGBA pixels of `generated` where `weight` is 1, `original` where it is 0. */
export function blend_pixels(
  original: Uint8ClampedArray,
  generated: Uint8ClampedArray,
  weight: Float32Array,
): Uint8ClampedArray<ArrayBuffer> {
  const output = new Uint8ClampedArray(original.length);
  for (let pixel = 0; pixel < weight.length; pixel += 1) {
    const alpha = Math.min(1, Math.max(0, weight[pixel] ?? 0));
    const offset = pixel * 4;
    for (let channel = 0; channel < 3; channel += 1) {
      const base = original[offset + channel] ?? 0;
      output[offset + channel] = base + ((generated[offset + channel] ?? 0) - base) * alpha;
    }
    output[offset + 3] = 255;
  }
  return output;
}
