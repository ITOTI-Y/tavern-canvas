/** NovelAI pads vibe and character references to at most 1536 px, so larger sources only waste storage. */
const MAX_EDGE_PX = 1536;

/** A reference image stored in an asset payload as a JPEG data URL. */
export async function read_reference_image(file: Blob): Promise<string> {
  const bitmap = await createImageBitmap(file);
  try {
    const scale = Math.min(1, MAX_EDGE_PX / Math.max(bitmap.width, bitmap.height));
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = new OffscreenCanvas(width, height);
    const context = canvas.getContext("2d");
    if (context === null) {
      throw new Error("A 2D canvas context is unavailable in this browser");
    }
    context.drawImage(bitmap, 0, 0, width, height);
    const blob = await canvas.convertToBlob({ type: "image/jpeg", quality: 0.92 });
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
