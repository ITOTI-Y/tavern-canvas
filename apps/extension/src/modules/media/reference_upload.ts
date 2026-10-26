import type { ProviderTransport } from "@tavern-canvas/providers";

import { assert_reference_upload_rejects_video, VideoAssetError } from "./video_generation.js";

export class ReferenceUploadError extends Error {
  readonly code: "video_rejected" | "invalid_image" | "upload_failed" | "invalid_weight";

  constructor(code: ReferenceUploadError["code"], message: string) {
    super(message);
    this.name = "ReferenceUploadError";
    this.code = code;
  }
}

export interface ReferenceCacheEntry {
  readonly bytes: Uint8Array;
  readonly media_type: string;
  readonly server_file_name?: string;
}

/** Persists an uploaded reference image across reloads. */
export interface ReferenceCache {
  get(key: string): Promise<ReferenceCacheEntry | null>;
  set(key: string, value: ReferenceCacheEntry): Promise<void>;
  remove(key: string): Promise<void>;
}

const IMAGE_SIGNATURES: readonly {
  readonly media_type: string;
  readonly bytes: readonly number[];
}[] = [
  { media_type: "image/png", bytes: [0x89, 0x50, 0x4e, 0x47] },
  { media_type: "image/jpeg", bytes: [0xff, 0xd8, 0xff] },
  { media_type: "image/webp", bytes: [0x52, 0x49, 0x46, 0x46] },
];

function assert_real_image(claimed_media_type: string, bytes: Uint8Array): void {
  try {
    assert_reference_upload_rejects_video(claimed_media_type, bytes);
  } catch (error) {
    if (error instanceof VideoAssetError) {
      throw new ReferenceUploadError("video_rejected", error.message);
    }
    throw error;
  }
  const recognized = IMAGE_SIGNATURES.some(
    (signature) =>
      bytes.length >= signature.bytes.length &&
      signature.bytes.every((byte, index) => bytes[index] === byte),
  );
  if (!recognized) {
    throw new ReferenceUploadError("invalid_image", "Bytes do not match a known image signature");
  }
}

// Self-contained: the multipart encoder in packages/providers is not part of its public surface.

function random_boundary(): string {
  return `tavern-canvas-ref-${globalThis.crypto.randomUUID()}`;
}

function encode_image_multipart(
  field_name: string,
  file_name: string,
  content_type: string,
  bytes: Uint8Array,
): { readonly content_type: string; readonly body: Uint8Array } {
  const boundary = random_boundary();
  const encoder = new TextEncoder();
  const head = encoder.encode(
    `--${boundary}\r\nContent-Disposition: form-data; name="${field_name}"; filename="${file_name}"\r\nContent-Type: ${content_type}\r\n\r\n`,
  );
  const tail = encoder.encode(`\r\n--${boundary}--\r\n`);
  const body = new Uint8Array(head.byteLength + bytes.byteLength + tail.byteLength);
  body.set(head, 0);
  body.set(bytes, head.byteLength);
  body.set(tail, head.byteLength + bytes.byteLength);
  return { content_type: `multipart/form-data; boundary=${boundary}`, body };
}

export interface UploadComfyUiReferenceInput {
  readonly bytes: Uint8Array;
  readonly claimed_media_type: string;
  readonly file_name: string;
}

export interface UploadComfyUiReferenceResult {
  readonly server_file_name: string;
}

const ComfyUiUploadResponseFields = ["name"] as const;

function parse_comfyui_upload_response(body: Uint8Array): UploadComfyUiReferenceResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(new TextDecoder().decode(body)) as unknown;
  } catch {
    throw new ReferenceUploadError("upload_failed", "ComfyUI upload response was not valid JSON");
  }
  if (
    typeof parsed !== "object" ||
    parsed === null ||
    !ComfyUiUploadResponseFields.every((field) => field in parsed)
  ) {
    throw new ReferenceUploadError("upload_failed", "ComfyUI upload response missing name field");
  }
  const name = (parsed as { name: unknown }).name;
  if (typeof name !== "string" || name.length === 0) {
    throw new ReferenceUploadError(
      "upload_failed",
      "ComfyUI upload response name was not a string",
    );
  }
  return { server_file_name: name };
}

/** Rejects video outright; caches the server-assigned filename under `cache_key` so a reload can restore the preview. */
export async function upload_comfyui_reference_image(
  transport: ProviderTransport,
  cache: ReferenceCache,
  cache_key: string,
  input: UploadComfyUiReferenceInput,
  signal: AbortSignal,
): Promise<UploadComfyUiReferenceResult> {
  assert_real_image(input.claimed_media_type, input.bytes);
  const encoded = encode_image_multipart(
    "image",
    input.file_name,
    input.claimed_media_type,
    input.bytes,
  );
  const response = await transport.execute({
    route: "/upload/image",
    method: "POST",
    content_type: encoded.content_type,
    accept: "application/json",
    body: encoded.body,
    max_request_bytes: encoded.body.byteLength,
    max_response_bytes: 100_000,
    signal,
  });
  const result = parse_comfyui_upload_response(response.body);
  await cache.set(cache_key, {
    bytes: input.bytes,
    media_type: input.claimed_media_type,
    server_file_name: result.server_file_name,
  });
  return result;
}

export interface IpAdapterWeights {
  readonly general: number;
  readonly detail: number;
  readonly face_id: number;
  readonly style: number;
}

export const IP_ADAPTER_WEIGHT_MIN = 0;
export const IP_ADAPTER_WEIGHT_MAX = 2;

export function validate_ip_adapter_weights(weights: IpAdapterWeights): void {
  for (const [name, value] of Object.entries(weights)) {
    if (
      typeof value !== "number" ||
      !Number.isFinite(value) ||
      value < IP_ADAPTER_WEIGHT_MIN ||
      value > IP_ADAPTER_WEIGHT_MAX
    ) {
      throw new ReferenceUploadError(
        "invalid_weight",
        `IP-Adapter weight "${name}" must be between ${String(IP_ADAPTER_WEIGHT_MIN)} and ${String(IP_ADAPTER_WEIGHT_MAX)}, got ${String(value)}`,
      );
    }
  }
}

export const NOVELAI_VIBE_CACHE_KEY = "novelai_vibe_transfer_image";
export const NOVELAI_CHAR_REF_CACHE_KEY = "novelai_char_ref_image";

export async function cache_legacy_reference_image(
  cache: ReferenceCache,
  cache_key: string,
  bytes: Uint8Array,
  media_type: string,
): Promise<void> {
  assert_real_image(media_type, bytes);
  await cache.set(cache_key, { bytes, media_type });
}

export async function remove_cached_reference_image(
  cache: ReferenceCache,
  cache_key: string,
): Promise<void> {
  await cache.remove(cache_key);
}

export type PresetImageRole = "user" | "model";
export const PRESET_IMAGE_TURN_COUNT = 3;

export interface PresetImageSlot {
  readonly turn: number;
  readonly role: PresetImageRole;
  readonly bytes: Uint8Array | null;
  readonly media_type: string | null;
}

/** Six slots: PRESET_IMAGE_TURN_COUNT turns x {user, model}, all initially empty. */
export function create_preset_image_slots(): readonly PresetImageSlot[] {
  const slots: PresetImageSlot[] = [];
  for (let turn = 0; turn < PRESET_IMAGE_TURN_COUNT; turn += 1) {
    for (const role of ["user", "model"] as const) {
      slots.push({ turn, role, bytes: null, media_type: null });
    }
  }
  return slots;
}

function find_slot_index(
  slots: readonly PresetImageSlot[],
  turn: number,
  role: PresetImageRole,
): number {
  const index = slots.findIndex((slot) => slot.turn === turn && slot.role === role);
  if (index < 0) {
    throw new RangeError(`No preset image slot for turn ${String(turn)}/${role}`);
  }
  return index;
}

export function set_preset_image_slot(
  slots: readonly PresetImageSlot[],
  turn: number,
  role: PresetImageRole,
  bytes: Uint8Array,
  media_type: string,
): readonly PresetImageSlot[] {
  assert_real_image(media_type, bytes);
  const index = find_slot_index(slots, turn, role);
  const next = [...slots];
  next[index] = { turn, role, bytes, media_type };
  return next;
}

export function clear_preset_image_slot(
  slots: readonly PresetImageSlot[],
  turn: number,
  role: PresetImageRole,
): readonly PresetImageSlot[] {
  const index = find_slot_index(slots, turn, role);
  const next = [...slots];
  next[index] = { turn, role, bytes: null, media_type: null };
  return next;
}
