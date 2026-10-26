export interface ImageSize {
  readonly width: number;
  readonly height: number;
}

/** PNG in, PNG out. Implemented on the browser canvas; tests substitute a fake. */
export interface NovelAiImageOperations {
  size(bytes: Uint8Array): Promise<ImageSize>;
  /** Stretches to exactly `target`. */
  resize(bytes: Uint8Array, target: ImageSize): Promise<Uint8Array>;
  /** Scales to fit inside `target`, centred on black. */
  pad(bytes: Uint8Array, target: ImageSize): Promise<Uint8Array>;
  /** White where the mask is set, black elsewhere, at one eighth of `target` (NovelAI's latent size). */
  binarize_mask(bytes: Uint8Array, target: ImageSize): Promise<Uint8Array>;
}

export const RAW_VIBE_CANVAS: ImageSize = { width: 448, height: 448 };
const DIRECTOR_CANVASES: readonly ImageSize[] = [
  { width: 1024, height: 1536 },
  { width: 1536, height: 1024 },
  { width: 1472, height: 1472 },
];
const AUGMENT_MAX_PIXELS = 3_145_728 - 2_000;
const AUGMENT_MIN_PIXELS = 1_011_712;
const AUGMENT_TARGET_PIXELS = 1_048_576;
const MASK_THRESHOLD = 155;
const LATENT_SCALE = 8;

export function director_canvas_for(source: ImageSize): ImageSize {
  const ratio = source.width / source.height;
  return DIRECTOR_CANVASES.reduce((best, candidate) =>
    Math.abs(Math.log(candidate.width / candidate.height / ratio)) <
    Math.abs(Math.log(best.width / best.height / ratio))
      ? candidate
      : best,
  );
}

function scale_to_pixels(source: ImageSize, pixels: number): ImageSize {
  const scale = Math.sqrt(pixels / (source.width * source.height));
  return {
    width: Math.max(LATENT_SCALE, Math.floor((source.width * scale) / LATENT_SCALE) * LATENT_SCALE),
    height: Math.max(
      LATENT_SCALE,
      Math.floor((source.height * scale) / LATENT_SCALE) * LATENT_SCALE,
    ),
  };
}

/** Director tools take at most ~3 MP and are tuned for ~1 MP inputs, so small images are enlarged. */
export function augment_size_for(source: ImageSize): ImageSize {
  const pixels = source.width * source.height;
  if (pixels > AUGMENT_MAX_PIXELS) {
    return scale_to_pixels(source, AUGMENT_MAX_PIXELS);
  }
  if (pixels < AUGMENT_MIN_PIXELS) {
    return scale_to_pixels(source, AUGMENT_TARGET_PIXELS);
  }
  return source;
}

async function decode(bytes: Uint8Array): Promise<ImageBitmap> {
  return createImageBitmap(new Blob([new Uint8Array(bytes)]));
}

function canvas_context(size: ImageSize): {
  readonly canvas: OffscreenCanvas;
  readonly context: OffscreenCanvasRenderingContext2D;
} {
  const canvas = new OffscreenCanvas(size.width, size.height);
  const context = canvas.getContext("2d");
  if (context === null) {
    throw new Error("A 2D canvas context is unavailable in this browser");
  }
  return { canvas, context };
}

async function encode_png(canvas: OffscreenCanvas): Promise<Uint8Array> {
  const blob = await canvas.convertToBlob({ type: "image/png" });
  return new Uint8Array(await blob.arrayBuffer());
}

export function create_browser_image_operations(): NovelAiImageOperations {
  return {
    async size(bytes) {
      const bitmap = await decode(bytes);
      try {
        return { width: bitmap.width, height: bitmap.height };
      } finally {
        bitmap.close();
      }
    },
    async resize(bytes, target) {
      const bitmap = await decode(bytes);
      try {
        const { canvas, context } = canvas_context(target);
        context.imageSmoothingQuality = "high";
        context.drawImage(bitmap, 0, 0, target.width, target.height);
        return await encode_png(canvas);
      } finally {
        bitmap.close();
      }
    },
    async pad(bytes, target) {
      const bitmap = await decode(bytes);
      try {
        const { canvas, context } = canvas_context(target);
        context.fillStyle = "#000000";
        context.fillRect(0, 0, target.width, target.height);
        const scale = Math.min(target.width / bitmap.width, target.height / bitmap.height);
        const width = Math.round(bitmap.width * scale);
        const height = Math.round(bitmap.height * scale);
        context.imageSmoothingQuality = "high";
        context.drawImage(
          bitmap,
          Math.floor((target.width - width) / 2),
          Math.floor((target.height - height) / 2),
          width,
          height,
        );
        return await encode_png(canvas);
      } finally {
        bitmap.close();
      }
    },
    async binarize_mask(bytes, target) {
      const bitmap = await decode(bytes);
      try {
        const latent = {
          width: Math.max(1, Math.floor(target.width / LATENT_SCALE)),
          height: Math.max(1, Math.floor(target.height / LATENT_SCALE)),
        };
        const { canvas, context } = canvas_context(latent);
        context.drawImage(bitmap, 0, 0, latent.width, latent.height);
        const pixels = context.getImageData(0, 0, latent.width, latent.height);
        const data = pixels.data;
        for (let offset = 0; offset < data.length; offset += 4) {
          const luminance =
            ((data[offset] ?? 0) + (data[offset + 1] ?? 0) + (data[offset + 2] ?? 0)) / 3;
          const coverage = (luminance * (data[offset + 3] ?? 0)) / 255;
          const value = coverage >= MASK_THRESHOLD ? 255 : 0;
          data[offset] = value;
          data[offset + 1] = value;
          data[offset + 2] = value;
          data[offset + 3] = 255;
        }
        context.putImageData(pixels, 0, 0);
        return await encode_png(canvas);
      } finally {
        bitmap.close();
      }
    },
  };
}
