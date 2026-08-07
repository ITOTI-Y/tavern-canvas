import { sha256 } from "@noble/hashes/sha2.js";
import { bytesToHex } from "@noble/hashes/utils.js";
import { AssetIdSchema, type AssetId, type GeneratedAsset } from "@tavern-canvas/contracts";
import type { ProviderOutputAsset, ProviderTransport } from "@tavern-canvas/providers";

// ---------------------------------------------------------------------------
// MP4 magic-byte detection and asset construction
// ---------------------------------------------------------------------------

const MP4_FTYP_OFFSET = 4;
const MP4_FTYP_MARKER = [0x66, 0x74, 0x79, 0x70];

export function is_mp4_bytes(bytes: Uint8Array): boolean {
  if (bytes.length < MP4_FTYP_OFFSET + MP4_FTYP_MARKER.length) {
    return false;
  }
  return MP4_FTYP_MARKER.every((byte, index) => bytes[MP4_FTYP_OFFSET + index] === byte);
}

function derive_asset_id(digest: Uint8Array): AssetId {
  const uuid_bytes = digest.slice(0, 16);
  uuid_bytes[6] = ((uuid_bytes[6] ?? 0) & 0x0f) | 0x50;
  uuid_bytes[8] = ((uuid_bytes[8] ?? 0) & 0x3f) | 0x80;
  const hex = bytesToHex(uuid_bytes);
  return AssetIdSchema.parse(
    `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`,
  );
}

export class VideoAssetError extends Error {
  readonly code: "not_mp4" | "video_reference_rejected";

  constructor(code: "not_mp4" | "video_reference_rejected", message: string) {
    super(message);
    this.name = "VideoAssetError";
    this.code = code;
  }
}

/**
 * Builds the provider-output-asset shape for freshly received MP4 bytes, mirroring
 * `@tavern-canvas/providers`' `create_generated_asset` (image_bytes.ts) but for the one media
 * type that helper's local signature sniff never recognizes, since teaching it "video/mp4" is out
 * of this task's file ownership (packages/providers).
 */
export function create_video_output_asset(
  bytes: Uint8Array,
  duration_ms: number | undefined,
): ProviderOutputAsset {
  if (!is_mp4_bytes(bytes)) {
    throw new VideoAssetError("not_mp4", "Bytes do not carry an MP4 ftyp signature");
  }
  const digest = sha256(bytes);
  const asset: GeneratedAsset = {
    asset_id: derive_asset_id(digest),
    media_type: "video/mp4",
    byte_length: bytes.byteLength,
    sha256: bytesToHex(digest),
    ...(duration_ms === undefined ? {} : { duration_ms }),
  };
  return { asset, bytes };
}

/**
 * Reference (manual) upload only ever accepts image bytes -- provider-generated video is the only
 * path that reaches the gallery as video/mp4 (manual.upload_mobile_compression's replacement note,
 * and the parity brief's explicit "reference upload still rejects video"). Called from
 * reference_upload.ts before any upload/cache write, checking both the caller's claimed MIME type
 * and the bytes themselves so a mislabeled upload cannot slip past a client-controlled string.
 */
export function assert_reference_upload_rejects_video(
  claimed_media_type: string,
  bytes: Uint8Array,
): void {
  if (claimed_media_type === "video/mp4" || is_mp4_bytes(bytes)) {
    throw new VideoAssetError(
      "video_reference_rejected",
      "Reference image upload does not accept video; only provider-generated video may enter the gallery as video/mp4",
    );
  }
}

// ---------------------------------------------------------------------------
// In-browser MP4 "faststart" rewrite (moov relocated before mdat)
// ---------------------------------------------------------------------------

interface Mp4Box {
  readonly type: string;
  readonly box_start: number;
  readonly header_size: number;
  readonly size: number;
}

const MP4_CONTAINER_BOX_TYPES = new Set([
  "moov",
  "trak",
  "mdia",
  "minf",
  "stbl",
  "edts",
  "dinf",
  "udta",
]);

function read_boxes(view: DataView, start: number, end: number): Mp4Box[] {
  const boxes: Mp4Box[] = [];
  let position = start;
  while (position + 8 <= end) {
    let size = view.getUint32(position, false);
    const type = String.fromCharCode(
      view.getUint8(position + 4),
      view.getUint8(position + 5),
      view.getUint8(position + 6),
      view.getUint8(position + 7),
    );
    let header_size = 8;
    if (size === 1) {
      if (position + 16 > end) {
        throw new Error("Truncated MP4 64-bit box size");
      }
      const high = view.getUint32(position + 8, false);
      const low = view.getUint32(position + 12, false);
      size = Number((BigInt(high) << 32n) | BigInt(low));
      header_size = 16;
    } else if (size === 0) {
      size = end - position;
    }
    if (size < header_size || position + size > end) {
      throw new Error(`Malformed MP4 box "${type}"`);
    }
    boxes.push({ type, box_start: position, header_size, size });
    position += size;
  }
  return boxes;
}

/**
 * Patches every `stco`/`co64` chunk-offset table found by recursing into `moov`'s known container
 * children, adding `delta` to each stored offset. Mutates `buffer` in place; `buffer` must already
 * be an independent copy of the moov box bytes (offset 0 = moov box start).
 */
function patch_chunk_offsets(buffer: Uint8Array, delta: number): void {
  const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  const boxes = read_boxes(view, 0, buffer.byteLength);
  for (const box of boxes) {
    const content_start = box.box_start + box.header_size;
    const content_end = box.box_start + box.size;
    if (box.type === "stco") {
      const entry_count = view.getUint32(content_start + 4, false);
      for (let index = 0; index < entry_count; index += 1) {
        const offset_position = content_start + 8 + index * 4;
        view.setUint32(offset_position, view.getUint32(offset_position, false) + delta, false);
      }
    } else if (box.type === "co64") {
      const entry_count = view.getUint32(content_start + 4, false);
      for (let index = 0; index < entry_count; index += 1) {
        const offset_position = content_start + 8 + index * 8;
        const high = view.getUint32(offset_position, false);
        const low = view.getUint32(offset_position + 4, false);
        const patched = ((BigInt(high) << 32n) | BigInt(low)) + BigInt(delta);
        view.setUint32(offset_position, Number(patched >> 32n), false);
        view.setUint32(offset_position + 4, Number(patched & 0xffffffffn), false);
      }
    } else if (MP4_CONTAINER_BOX_TYPES.has(box.type)) {
      patch_chunk_offsets(buffer.subarray(content_start, content_end), delta);
    }
  }
}

/**
 * Ports legacy `fixMp4Faststart` (utils/utils.js:7485): when `moov` sits after `mdat` (the
 * non-"faststart" layout most provider-generated MP4s use), relocates a patched copy of `moov`
 * to immediately before `mdat`, shifting every `stco`/`co64` chunk offset forward by `moov`'s own
 * byte size to compensate. Any parse failure, or a layout that already has `moov` before `mdat`,
 * returns `bytes` unchanged -- this rewrite is a playback nicety, never a hard requirement.
 */
export function fix_mp4_faststart(bytes: Uint8Array): Uint8Array {
  try {
    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    const boxes = read_boxes(view, 0, bytes.byteLength);
    const moov = boxes.find((box) => box.type === "moov");
    const mdat = boxes.find((box) => box.type === "mdat");
    if (moov === undefined || mdat === undefined || moov.box_start < mdat.box_start) {
      return bytes;
    }

    const patched_moov = bytes.slice(moov.box_start, moov.box_start + moov.size);
    patch_chunk_offsets(patched_moov, moov.size);

    const parts: Uint8Array[] = [];
    for (const box of boxes) {
      if (box.type === "moov") {
        continue;
      }
      if (box.type === "mdat") {
        parts.push(patched_moov);
      }
      parts.push(bytes.slice(box.box_start, box.box_start + box.size));
    }
    const total_length = parts.reduce((sum, part) => sum + part.byteLength, 0);
    const output = new Uint8Array(total_length);
    let write_offset = 0;
    for (const part of parts) {
      output.set(part, write_offset);
      write_offset += part.byteLength;
    }
    return output;
  } catch {
    return bytes;
  }
}

// ---------------------------------------------------------------------------
// Playback fallback: blob -> original URL -> download-only
// ---------------------------------------------------------------------------

export type VideoPlaybackSource = "blob" | "original" | "download_only";

export interface VideoPlaybackState {
  readonly source: VideoPlaybackSource;
  readonly blob_url: string | null;
  readonly original_url: string | null;
}

export function create_video_playback_state(
  blob_url: string | null,
  original_url: string | null,
): VideoPlaybackState {
  return { source: blob_url === null ? "original" : "blob", blob_url, original_url };
}

/**
 * Ports legacy's video `onerror` fallback chain (createAndShowImage, generation.js:35334): blob
 * URL fails -> retry the untouched original URL (only if it differs and exists) -> give up on
 * inline playback and let the caller render a bare download link. Pure state transition; the
 * caller owns actually swapping `<video src>` and revoking the abandoned blob URL.
 */
export function advance_video_playback_on_error(state: VideoPlaybackState): VideoPlaybackState {
  if (
    state.source === "blob" &&
    state.original_url !== null &&
    state.original_url !== state.blob_url
  ) {
    return { ...state, source: "original" };
  }
  return { ...state, source: "download_only" };
}

// ---------------------------------------------------------------------------
// Object URL lifetime
// ---------------------------------------------------------------------------

export interface ObjectUrlPort {
  create(bytes: Uint8Array, media_type: string): string;
  revoke(url: string): void;
}

export class BrowserObjectUrlPort implements ObjectUrlPort {
  create(bytes: Uint8Array, media_type: string): string {
    return URL.createObjectURL(new Blob([new Uint8Array(bytes)], { type: media_type }));
  }

  revoke(url: string): void {
    URL.revokeObjectURL(url);
  }
}

// ---------------------------------------------------------------------------
// Gallery normalization: poster/duration/source-job/cache refs
// ---------------------------------------------------------------------------

export interface PosterExtractionResult {
  readonly bytes: Uint8Array;
  readonly width?: number;
  readonly height?: number;
}

export interface PosterExtractorPort {
  extract(video_bytes: Uint8Array): Promise<PosterExtractionResult>;
}

export interface VideoStorePort {
  put_image(input: {
    readonly id: string;
    readonly bytes: Uint8Array;
    readonly claimed_media_type: string;
    readonly created_at: string;
    readonly metadata: Record<string, unknown>;
  }): Promise<{ readonly id: string }>;
}

export interface IdSource {
  next(): string;
}

export interface NormalizeVideoAssetInput {
  readonly video_bytes: Uint8Array;
  readonly provider_id: string;
  readonly source_message: {
    readonly chat_id: string;
    readonly message_id: string;
    readonly swipe_id: number;
  };
  readonly generation_parameters: Record<string, unknown>;
  readonly source_job_id: string;
  readonly created_at: string;
  readonly duration_ms?: number;
}

export interface NormalizeVideoAssetResult {
  readonly video_image_id: string;
  readonly poster_image_id: string;
}

/**
 * Turns provider-generated MP4 bytes into a real gallery asset pair: a `video/mp4` record (poster
 * back-reference, duration, source job) plus a plain `image/jpeg` poster record extracted via the
 * injected `PosterExtractorPort` (poster extraction needs a `<video>` element to decode a frame,
 * which only exists in a real DOM -- kept out of this pure module so it stays unit-testable).
 * Applies `fix_mp4_faststart` before storing so the persisted bytes already play immediately.
 */
export async function normalize_video_asset(
  deps: {
    readonly store: VideoStorePort;
    readonly poster: PosterExtractorPort;
    readonly ids: IdSource;
  },
  input: NormalizeVideoAssetInput,
): Promise<NormalizeVideoAssetResult> {
  const faststart_bytes = fix_mp4_faststart(input.video_bytes);
  const poster_result = await deps.poster.extract(faststart_bytes);
  const poster_id = deps.ids.next();
  await deps.store.put_image({
    id: poster_id,
    bytes: poster_result.bytes,
    claimed_media_type: "image/jpeg",
    created_at: input.created_at,
    metadata: {
      provider_id: input.provider_id,
      source_message: input.source_message,
      generation_parameters: input.generation_parameters,
      ...(poster_result.width === undefined ? {} : { width: poster_result.width }),
      ...(poster_result.height === undefined ? {} : { height: poster_result.height }),
    },
  });

  const video_id = deps.ids.next();
  await deps.store.put_image({
    id: video_id,
    bytes: faststart_bytes,
    claimed_media_type: "video/mp4",
    created_at: input.created_at,
    metadata: {
      provider_id: input.provider_id,
      source_message: input.source_message,
      generation_parameters: input.generation_parameters,
      source_job_id: input.source_job_id,
      poster_image_id: poster_id,
      ...(input.duration_ms === undefined ? {} : { duration_ms: input.duration_ms }),
    },
  });

  return { video_image_id: video_id, poster_image_id: poster_id };
}

// ---------------------------------------------------------------------------
// Video generation submission (direct ProviderTransport call)
//
// Neither google_image.ts nor openai_image.ts (packages/contracts) declares a video-output mode,
// and their adapters (packages/providers) only ever parse image content parts -- extending either
// is outside this task's file ownership. Legacy's own video path (gorkVideo.js/banana.js) was
// never a real ProviderAdapter-shaped flow either: it POSTs a normal chat-completions body and
// scrapes an mp4 URL out of the model's text response, then fetches that URL separately. This
// function reproduces exactly that shape against the shared, already-sanctioned `ProviderTransport`
// (no client-held provider URL/credential -- route-only, matching the removed
// `client-controlled-provider-url` legacy pattern), so it stays fully within
// apps/extension/src/modules/media without touching packages/providers.
// ---------------------------------------------------------------------------

const MP4_URL_PATTERN = /src="([^"]+\.mp4[^"]*)"/u;
const MAX_VIDEO_RESPONSE_BYTES = 2_000_000;
const MAX_VIDEO_ASSET_BYTES = 100_000_000;

export interface VideoGenerationRequest {
  readonly route: `/${string}`;
  readonly body: Uint8Array;
  readonly content_type: string;
}

export class VideoGenerationError extends Error {
  readonly code: "no_video_url" | "fetch_failed";

  constructor(code: "no_video_url" | "fetch_failed", message: string) {
    super(message);
    this.name = "VideoGenerationError";
    this.code = code;
  }
}

/**
 * Submits a chat-completions-shaped video-generation request, scrapes the first `.mp4` URL out
 * of the decoded response text, then fetches that URL through the same transport's remote-asset
 * channel. Throws `VideoGenerationError("no_video_url")` when the model's response carries no mp4
 * reference at all (a real, honest failure mode -- not every turn produces video).
 */
export async function submit_video_generation(
  transport: ProviderTransport,
  request: VideoGenerationRequest,
  signal: AbortSignal,
): Promise<ProviderOutputAsset> {
  const response = await transport.execute({
    route: request.route,
    method: "POST",
    content_type: request.content_type,
    accept: "application/json",
    body: request.body,
    max_request_bytes: request.body.byteLength,
    max_response_bytes: MAX_VIDEO_RESPONSE_BYTES,
    signal,
  });

  const text = new TextDecoder().decode(response.body);
  const match = MP4_URL_PATTERN.exec(text);
  if (match?.[1] === undefined) {
    throw new VideoGenerationError("no_video_url", "Provider response carried no mp4 reference");
  }

  if (transport.fetch_remote_asset === undefined) {
    throw new VideoGenerationError("fetch_failed", "Transport cannot fetch remote video assets");
  }
  const asset_response = await transport.fetch_remote_asset({
    url: match[1],
    allowed_origins: [new URL(match[1]).origin],
    max_bytes: MAX_VIDEO_ASSET_BYTES,
    signal,
  });

  return create_video_output_asset(asset_response.body, undefined);
}
