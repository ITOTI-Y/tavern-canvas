/** Encodes a one-byte-per-pixel mask (255 = repaint) as the white-on-black PNG NovelAI expects. */
export async function encode_mask_png(
  mask: Uint8ClampedArray,
  width: number,
  height: number,
): Promise<Uint8Array> {
  const pixels = new Uint8ClampedArray(width * height * 4);
  for (let index = 0; index < mask.length; index += 1) {
    const value = mask[index] === 255 ? 255 : 0;
    pixels[index * 4] = value;
    pixels[index * 4 + 1] = value;
    pixels[index * 4 + 2] = value;
    pixels[index * 4 + 3] = 255;
  }
  const canvas = new OffscreenCanvas(width, height);
  const context = canvas.getContext("2d");
  if (context === null) {
    throw new Error("A 2D canvas context is unavailable in this browser");
  }
  context.putImageData(new ImageData(pixels, width, height), 0, 0);
  const blob = await canvas.convertToBlob({ type: "image/png" });
  return new Uint8Array(await blob.arrayBuffer());
}
