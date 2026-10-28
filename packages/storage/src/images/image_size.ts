export interface ImageSize {
  readonly width: number;
  readonly height: number;
}

const JPEG_SOF_MARKERS = new Set([
  0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf,
]);

function ascii(bytes: Uint8Array, offset: number, length: number): string {
  return String.fromCharCode(...bytes.subarray(offset, offset + length));
}

function png_size(view: DataView): ImageSize | null {
  return view.byteLength >= 24 ? { width: view.getUint32(16), height: view.getUint32(20) } : null;
}

function jpeg_size(bytes: Uint8Array, view: DataView): ImageSize | null {
  let offset = 2;
  while (offset + 9 < bytes.length) {
    if (bytes[offset] !== 0xff) {
      return null;
    }
    const marker = bytes[offset + 1] ?? 0;
    if (JPEG_SOF_MARKERS.has(marker)) {
      return { width: view.getUint16(offset + 7), height: view.getUint16(offset + 5) };
    }
    offset += 2 + view.getUint16(offset + 2);
  }
  return null;
}

function webp_size(bytes: Uint8Array, view: DataView): ImageSize | null {
  const chunk = ascii(bytes, 12, 4);
  if (chunk === "VP8X" && bytes.length >= 30) {
    const u24 = (offset: number) =>
      view.getUint16(offset, true) + (view.getUint8(offset + 2) << 16);
    return { width: 1 + u24(24), height: 1 + u24(27) };
  }
  if (chunk === "VP8 " && bytes.length >= 30) {
    return { width: view.getUint16(26, true) & 0x3fff, height: view.getUint16(28, true) & 0x3fff };
  }
  if (chunk === "VP8L" && bytes.length >= 25) {
    const bits = view.getUint32(21, true);
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
  }
  return null;
}

/** Reads the pixel size from a PNG, JPEG or WebP header, or `null` for anything else. */
export function read_image_size(bytes: Uint8Array): ImageSize | null {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  let size: ImageSize | null = null;
  if (ascii(bytes, 1, 3) === "PNG") {
    size = png_size(view);
  } else if (bytes[0] === 0xff && bytes[1] === 0xd8) {
    size = jpeg_size(bytes, view);
  } else if (ascii(bytes, 0, 4) === "RIFF" && ascii(bytes, 8, 4) === "WEBP") {
    size = webp_size(bytes, view);
  }
  return size !== null && size.width > 0 && size.height > 0 ? size : null;
}
