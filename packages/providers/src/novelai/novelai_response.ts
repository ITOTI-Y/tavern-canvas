import {
  ImageGenerationResultSchema,
  type GeneratedAsset,
  type ImageGenerationResult,
  type NovelAiRequest,
} from "@tavern-canvas/contracts";
import { z } from "zod";

import {
  create_provider_output_asset,
  decode_base64_image,
  malformed_response,
  result_with_optional_seed,
} from "../image_bytes.js";
import type { ProviderOutputAsset } from "../provider_adapter.js";
import { ProviderAdapterError } from "../provider_error.js";

const NovelAiJsonResponseSchema = z.object({
  images: z
    .array(
      z.object({
        image: z.string(),
        index: z.number().int().nonnegative(),
        seed: z.number().int().nonnegative(),
      }),
    )
    .min(1)
    .max(4),
});

interface ExtractedImages {
  readonly images: readonly Uint8Array[];
  readonly seed?: number;
}

export async function parse_novelai_response(
  body: Uint8Array,
  content_type: string,
  request: NovelAiRequest,
  max_response_bytes: number,
  max_archive_entries: number,
  allowed_media_types: readonly GeneratedAsset["media_type"][] = ["image/png", "image/webp"],
): Promise<{
  readonly result: ImageGenerationResult;
  readonly output_assets: readonly ProviderOutputAsset[];
}> {
  try {
    if (body.byteLength === 0 || body.byteLength > max_response_bytes) {
      throw malformed_response();
    }

    const normalized_content_type = content_type.toLowerCase();
    let extracted: ExtractedImages;
    if (normalized_content_type.startsWith("application/json")) {
      extracted = parse_json_images(body, max_response_bytes);
    } else if (
      normalized_content_type.startsWith("application/zip") ||
      normalized_content_type.startsWith("application/x-zip-compressed")
    ) {
      extracted = {
        images: await extract_zip_images(body, max_response_bytes, max_archive_entries),
      };
    } else if (normalized_content_type.startsWith("multipart/")) {
      extracted = {
        images: extract_multipart_images(
          body,
          content_type,
          max_response_bytes,
          max_archive_entries,
        ),
      };
    } else {
      throw malformed_response();
    }

    if (extracted.images.length !== request.output_count) {
      throw malformed_response();
    }
    const output_assets = extracted.images.map((bytes) =>
      create_provider_output_asset(bytes, request.width, request.height, allowed_media_types),
    );
    return {
      result: ImageGenerationResultSchema.parse(
        result_with_optional_seed(
          {
            request_id: request.request_id,
            provider_id: "novelai",
            assets: output_assets.map(({ asset }) => asset),
          },
          extracted.seed ?? request.seed,
        ),
      ),
      output_assets,
    };
  } catch (error) {
    if (error instanceof ProviderAdapterError) {
      throw error;
    }
    throw malformed_response();
  }
}

function parse_json_images(body: Uint8Array, max_response_bytes: number): ExtractedImages {
  const text = new TextDecoder("utf-8", { fatal: true }).decode(body);
  const response = NovelAiJsonResponseSchema.parse(JSON.parse(text) as unknown);
  const indexed_images = response.images;
  indexed_images.sort((left, right) => left.index - right.index);
  if (indexed_images.some((image, index) => image.index !== index)) {
    throw malformed_response();
  }

  let decoded_bytes = 0;
  const images = indexed_images.map((image) => {
    const bytes = decode_base64_image(image.image, max_response_bytes - decoded_bytes);
    decoded_bytes += bytes.byteLength;
    return bytes;
  });
  const seed = indexed_images[0]?.seed;
  return seed === undefined ? { images } : { images, seed };
}

async function extract_zip_images(
  body: Uint8Array,
  max_response_bytes: number,
  max_archive_entries: number,
): Promise<readonly Uint8Array[]> {
  const view = new DataView(body.buffer, body.byteOffset, body.byteLength);
  const end_offset = find_end_of_central_directory(view);
  const disk_number = view.getUint16(end_offset + 4, true);
  const central_disk = view.getUint16(end_offset + 6, true);
  const disk_entries = view.getUint16(end_offset + 8, true);
  const entry_count = view.getUint16(end_offset + 10, true);
  const central_size = view.getUint32(end_offset + 12, true);
  const central_offset = view.getUint32(end_offset + 16, true);
  if (
    disk_number !== 0 ||
    central_disk !== 0 ||
    disk_entries !== entry_count ||
    entry_count === 0 ||
    entry_count > max_archive_entries ||
    central_offset + central_size !== end_offset
  ) {
    throw malformed_response();
  }

  const decoder = new TextDecoder("utf-8", { fatal: true });
  const entries: { name: string; bytes: Uint8Array }[] = [];
  const local_offsets = new Set<number>();
  let central_position = central_offset;
  let extracted_bytes = 0;
  for (let entry_index = 0; entry_index < entry_count; entry_index += 1) {
    require_range(body, central_position, 46);
    if (view.getUint32(central_position, true) !== 0x02014b50) {
      throw malformed_response();
    }
    const flags = view.getUint16(central_position + 8, true);
    const compression_method = view.getUint16(central_position + 10, true);
    const expected_crc = view.getUint32(central_position + 16, true);
    const compressed_size = view.getUint32(central_position + 20, true);
    const uncompressed_size = view.getUint32(central_position + 24, true);
    const name_length = view.getUint16(central_position + 28, true);
    const extra_length = view.getUint16(central_position + 30, true);
    const comment_length = view.getUint16(central_position + 32, true);
    const start_disk = view.getUint16(central_position + 34, true);
    const local_offset = view.getUint32(central_position + 42, true);
    if (local_offsets.has(local_offset)) {
      throw malformed_response();
    }
    local_offsets.add(local_offset);
    const central_entry_length = 46 + name_length + extra_length + comment_length;
    require_range(body, central_position, central_entry_length);
    if (
      (flags & 0x1) !== 0 ||
      start_disk !== 0 ||
      (compression_method !== 0 && compression_method !== 8) ||
      uncompressed_size === 0 ||
      uncompressed_size > max_response_bytes - extracted_bytes
    ) {
      throw malformed_response();
    }
    const name = decoder.decode(
      body.subarray(central_position + 46, central_position + 46 + name_length),
    );
    validate_archive_name(name);

    require_range(body, local_offset, 30);
    if (view.getUint32(local_offset, true) !== 0x04034b50) {
      throw malformed_response();
    }
    const local_flags = view.getUint16(local_offset + 6, true);
    const local_method = view.getUint16(local_offset + 8, true);
    const local_name_length = view.getUint16(local_offset + 26, true);
    const local_extra_length = view.getUint16(local_offset + 28, true);
    const local_name = decoder.decode(
      body.subarray(local_offset + 30, local_offset + 30 + local_name_length),
    );
    const data_offset = local_offset + 30 + local_name_length + local_extra_length;
    require_range(body, data_offset, compressed_size);
    if (
      local_flags !== flags ||
      local_method !== compression_method ||
      local_name !== name ||
      data_offset + compressed_size > central_offset
    ) {
      throw malformed_response();
    }

    const compressed = body.subarray(data_offset, data_offset + compressed_size);
    const bytes =
      compression_method === 0
        ? Uint8Array.from(compressed)
        : await inflate_raw(compressed, uncompressed_size, max_response_bytes - extracted_bytes);
    if (bytes.byteLength !== uncompressed_size || crc32(bytes) !== expected_crc) {
      throw malformed_response();
    }
    entries.push({ name, bytes });
    extracted_bytes += bytes.byteLength;
    central_position += central_entry_length;
  }

  if (central_position !== central_offset + central_size) {
    throw malformed_response();
  }
  entries.sort((left, right) => (left.name < right.name ? -1 : left.name > right.name ? 1 : 0));
  return entries.map((entry) => entry.bytes);
}

function find_end_of_central_directory(view: DataView): number {
  const minimum_offset = Math.max(0, view.byteLength - 65_557);
  for (let offset = view.byteLength - 22; offset >= minimum_offset; offset -= 1) {
    if (view.getUint32(offset, true) === 0x06054b50) {
      const comment_length = view.getUint16(offset + 20, true);
      if (offset + 22 + comment_length === view.byteLength) {
        return offset;
      }
    }
  }
  throw malformed_response();
}

async function inflate_raw(
  compressed: Uint8Array,
  expected_size: number,
  max_bytes: number,
): Promise<Uint8Array> {
  const source = new Blob([Uint8Array.from(compressed)]).stream();
  const decompressed = source.pipeThrough(new DecompressionStream("deflate-raw"));
  const reader = decompressed.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const chunk = await reader.read();
    if (chunk.done) {
      break;
    }
    total += chunk.value.byteLength;
    if (total > expected_size || total > max_bytes) {
      await reader.cancel();
      throw malformed_response();
    }
    chunks.push(chunk.value);
  }
  return concatenate_bytes(chunks, total);
}

function extract_multipart_images(
  body: Uint8Array,
  content_type: string,
  max_response_bytes: number,
  max_archive_entries: number,
): readonly Uint8Array[] {
  const boundary_match = /boundary=(?:"([^"]{1,70})"|([!#$%&'*+.^_`|~0-9A-Za-z-]{1,70}))/iu.exec(
    content_type,
  );
  const boundary = boundary_match?.[1] ?? boundary_match?.[2];
  if (boundary === undefined) {
    throw malformed_response();
  }

  const encoder = new TextEncoder();
  const delimiter = encoder.encode(`--${boundary}`);
  const next_delimiter = encoder.encode(`\r\n--${boundary}`);
  const header_terminator = Uint8Array.of(13, 10, 13, 10);
  const line_end = Uint8Array.of(13, 10);
  const final_suffix = Uint8Array.of(45, 45);
  const decoder = new TextDecoder("utf-8", { fatal: true });
  const images: Uint8Array[] = [];
  let total = 0;
  let position = 0;

  for (;;) {
    if (index_of_bytes(body, delimiter, position) !== position) {
      throw malformed_response();
    }
    position += delimiter.length;
    if (bytes_equal_at(body, final_suffix, position)) {
      break;
    }
    if (!bytes_equal_at(body, line_end, position)) {
      throw malformed_response();
    }
    position += line_end.length;
    const headers_end = index_of_bytes(body, header_terminator, position);
    if (headers_end < 0 || headers_end - position > 8_192) {
      throw malformed_response();
    }
    const headers = decoder.decode(body.subarray(position, headers_end));
    const media_type = parse_part_media_type(headers);
    const body_start = headers_end + header_terminator.length;
    const body_end = index_of_bytes(body, next_delimiter, body_start);
    if (body_end < 0 || body_end === body_start) {
      throw malformed_response();
    }
    const image = Uint8Array.from(body.subarray(body_start, body_end));
    total += image.byteLength;
    if (
      images.length >= max_archive_entries ||
      total > max_response_bytes ||
      !["image/png", "image/jpeg", "image/webp"].includes(media_type)
    ) {
      throw malformed_response();
    }
    images.push(image);
    position = body_end + 2;
  }
  if (images.length === 0) {
    throw malformed_response();
  }
  return images;
}

function parse_part_media_type(headers: string): string {
  for (const line of headers.split("\r\n")) {
    const separator = line.indexOf(":");
    if (separator > 0 && line.slice(0, separator).trim().toLowerCase() === "content-type") {
      return (
        line
          .slice(separator + 1)
          .trim()
          .toLowerCase()
          .split(";", 1)[0] ?? ""
      );
    }
  }
  throw malformed_response();
}

function validate_archive_name(name: string): void {
  if (
    name.length === 0 ||
    name.length > 255 ||
    name.includes("/") ||
    name.includes("\\") ||
    name.includes("\0") ||
    name === "." ||
    name === ".." ||
    !/\.(?:png|jpe?g|webp)$/iu.test(name)
  ) {
    throw malformed_response();
  }
}

function require_range(bytes: Uint8Array, offset: number, length: number): void {
  if (
    !Number.isSafeInteger(offset) ||
    !Number.isSafeInteger(length) ||
    offset < 0 ||
    length < 0 ||
    offset + length > bytes.byteLength
  ) {
    throw malformed_response();
  }
}

function index_of_bytes(haystack: Uint8Array, needle: Uint8Array, start: number): number {
  const final_start = haystack.length - needle.length;
  for (let index = start; index <= final_start; index += 1) {
    if (bytes_equal_at(haystack, needle, index)) {
      return index;
    }
  }
  return -1;
}

function bytes_equal_at(haystack: Uint8Array, needle: Uint8Array, offset: number): boolean {
  if (offset < 0 || offset + needle.length > haystack.length) {
    return false;
  }
  for (let index = 0; index < needle.length; index += 1) {
    if (haystack[offset + index] !== needle[index]) {
      return false;
    }
  }
  return true;
}

function concatenate_bytes(parts: readonly Uint8Array[], total: number): Uint8Array {
  const result = new Uint8Array(total);
  let offset = 0;
  for (const part of parts) {
    result.set(part, offset);
    offset += part.length;
  }
  return result;
}

function crc32(bytes: Uint8Array): number {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}
