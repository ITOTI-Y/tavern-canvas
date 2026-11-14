export interface ImageSize {
  readonly width: number;
  readonly height: number;
}

export type ImageSizePresetId =
  | "portrait"
  | "landscape"
  | "square"
  | "portrait_large"
  | "landscape_large"
  | "square_large"
  | "wallpaper_portrait"
  | "wallpaper_landscape";

/** NovelAI's standard canvases; the large and wallpaper ones cost Anlas even on Opus. */
export const IMAGE_SIZE_PRESETS: readonly (ImageSize & { readonly id: ImageSizePresetId })[] = [
  { id: "portrait", width: 832, height: 1216 },
  { id: "landscape", width: 1216, height: 832 },
  { id: "square", width: 1024, height: 1024 },
  { id: "portrait_large", width: 1024, height: 1536 },
  { id: "landscape_large", width: 1536, height: 1024 },
  { id: "square_large", width: 1472, height: 1472 },
  { id: "wallpaper_portrait", width: 1088, height: 1920 },
  { id: "wallpaper_landscape", width: 1920, height: 1088 },
];

export const SIZE_STEP = 64;
export const MIN_SIZE = 64;
export const MAX_SIZE = 2048;

export function preset_of(size: ImageSize): ImageSizePresetId | null {
  return (
    IMAGE_SIZE_PRESETS.find(
      (preset) => preset.width === size.width && preset.height === size.height,
    )?.id ?? null
  );
}

function snap(value: number): number {
  return Math.min(MAX_SIZE, Math.max(MIN_SIZE, Math.round(value / SIZE_STEP) * SIZE_STEP));
}

/** Changes one side and, with `ratio` set, moves the other to keep it, on the 64 px grid. */
export function resize(
  size: ImageSize,
  side: "width" | "height",
  value: number,
  ratio: number | null,
): ImageSize {
  if (side === "width") {
    return { width: value, height: ratio === null ? size.height : snap(value / ratio) };
  }
  return { width: ratio === null ? size.width : snap(value * ratio), height: value };
}

/** The canvases offered when building a size set, by shape; the ones above 1024 × 1024 cost Anlas. */
export const SIZE_SET_CATALOG: readonly ImageSize[] = [
  { width: 1024, height: 1024 },
  { width: 1472, height: 1472 },
  { width: 1216, height: 832 },
  { width: 1152, height: 896 },
  { width: 1344, height: 768 },
  { width: 1408, height: 704 },
  { width: 1536, height: 1024 },
  { width: 1920, height: 1088 },
  { width: 832, height: 1216 },
  { width: 896, height: 1152 },
  { width: 768, height: 1344 },
  { width: 704, height: 1408 },
  { width: 1024, height: 1536 },
  { width: 1088, height: 1920 },
];

/** NovelAI Opus draws canvases up to this many pixels without spending Anlas. */
export const FREE_PIXELS = 1024 * 1024;

const COMMON_RATIOS: readonly (readonly [number, number])[] = [
  [1, 1],
  [4, 3],
  [3, 4],
  [3, 2],
  [2, 3],
  [16, 9],
  [9, 16],
  [2, 1],
  [1, 2],
];

/** The aspect ratio as people name it, such as 16:9, marked ≈ when the canvas only comes close. */
export function ratio_label(size: ImageSize): string {
  const ratio = size.width / size.height;
  const [best_width, best_height] = COMMON_RATIOS.reduce((best, candidate) =>
    Math.abs(Math.log(candidate[0] / candidate[1] / ratio)) <
    Math.abs(Math.log(best[0] / best[1] / ratio))
      ? candidate
      : best,
  );
  const off = Math.abs(best_width / best_height / ratio - 1);
  if (off < 0.001) {
    return `${String(best_width)}:${String(best_height)}`;
  }
  return off < 0.05 ? `≈${String(best_width)}:${String(best_height)}` : `${ratio.toFixed(2)}:1`;
}
