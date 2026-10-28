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
