/** NovelAI pads vibe and character references to at most 1536 px, so larger sources only waste storage. */
const MAX_EDGE_PX = 1536;
/** Twice the 96 px card thumbnail, for high-density screens. */
const CARD_EDGE_PX = 192;

/** A reference image stored in an asset payload as a JPEG data URL. */
export function read_reference_image(file: Blob): Promise<string> {
  return encode_data_url(file, MAX_EDGE_PX, "image/jpeg", 0.92);
}

/** The small WebP data URL library cards and editor headers show in place of the full image. */
export async function card_thumbnail(data_url: string): Promise<string> {
  return encode_data_url(
    new Blob([new Uint8Array(reference_image_bytes(data_url))]),
    CARD_EDGE_PX,
    "image/webp",
    0.8,
  );
}

async function encode_data_url(
  file: Blob,
  max_edge: number,
  type: string,
  quality: number,
): Promise<string> {
  const bitmap = await createImageBitmap(file);
  try {
    const scale = Math.min(1, max_edge / Math.max(bitmap.width, bitmap.height));
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = new OffscreenCanvas(width, height);
    const context = canvas.getContext("2d");
    if (context === null) {
      throw new Error("A 2D canvas context is unavailable in this browser");
    }
    context.drawImage(bitmap, 0, 0, width, height);
    const blob = await canvas.convertToBlob({ type, quality });
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = () => {
        reject(reader.error ?? new Error("The image could not be read"));
      };
      reader.readAsDataURL(blob);
    });
  } finally {
    bitmap.close();
  }
}

/** Decodes a payload data URL back into bytes for a provider request. */
export function reference_image_bytes(data_url: string): Uint8Array {
  const base64 = data_url.slice(data_url.indexOf(",") + 1);
  return Uint8Array.from(atob(base64), (character) => character.charCodeAt(0));
}
