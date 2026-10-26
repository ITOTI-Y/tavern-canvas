import {
  NovelAiRequestSchema,
  novelai_sends_vibes,
  resolve_novelai_model,
  type AssetId,
  type NovelAiDiffusionRequest,
  type NovelAiModelProfile,
  type NovelAiRequest,
  type NovelAiVibeReference,
} from "@tavern-canvas/contracts";
import type { ProviderAssetReader } from "@tavern-canvas/providers";

import {
  RAW_VIBE_CANVAS,
  augment_size_for,
  director_canvas_for,
  type ImageSize,
  type NovelAiImageOperations,
} from "./novelai_image_operations.js";

export interface VibeEncodingKey {
  readonly image_sha256: string;
  readonly model_id: string;
  readonly information_extracted: number;
}

export interface VibeEncodingCache {
  get(key: VibeEncodingKey): Promise<string | null>;
  put(key: VibeEncodingKey, encoding: string): Promise<void>;
}

export interface NovelAiPreparationDeps {
  readonly assets: ProviderAssetReader;
  readonly image_operations: NovelAiImageOperations;
  readonly store_input: (bytes: Uint8Array) => Promise<AssetId>;
  readonly vibe_cache: VibeEncodingCache;
  readonly encode_vibe: (
    image: Uint8Array,
    model_id: string,
    information_extracted: number,
    signal: AbortSignal,
  ) => Promise<string>;
  readonly sha256: (bytes: Uint8Array) => Promise<string>;
}

export class NovelAiPreparationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NovelAiPreparationError";
  }
}

function require_profile(model_id: string): NovelAiModelProfile {
  const resolved = resolve_novelai_model(model_id);
  if (resolved === null) {
    throw new NovelAiPreparationError(`"${model_id}" is not a NovelAI image model`);
  }
  return resolved.profile;
}

function same_size(left: ImageSize, right: ImageSize): boolean {
  return left.width === right.width && left.height === right.height;
}

async function read_bytes(
  deps: NovelAiPreparationDeps,
  asset_id: AssetId,
  signal: AbortSignal,
): Promise<Uint8Array> {
  return (await deps.assets.read(asset_id, signal)).bytes;
}

async function fit_exactly(
  deps: NovelAiPreparationDeps,
  asset_id: AssetId,
  target: ImageSize,
  signal: AbortSignal,
): Promise<AssetId> {
  const bytes = await read_bytes(deps, asset_id, signal);
  if (same_size(await deps.image_operations.size(bytes), target)) {
    return asset_id;
  }
  return deps.store_input(await deps.image_operations.resize(bytes, target));
}

async function pad_to(
  deps: NovelAiPreparationDeps,
  asset_id: AssetId,
  target: ImageSize | ((source: ImageSize) => ImageSize),
  signal: AbortSignal,
): Promise<AssetId> {
  const bytes = await read_bytes(deps, asset_id, signal);
  const size = await deps.image_operations.size(bytes);
  const canvas = typeof target === "function" ? target(size) : target;
  if (same_size(size, canvas)) {
    return asset_id;
  }
  return deps.store_input(await deps.image_operations.pad(bytes, canvas));
}

function encoding_key(
  image_sha256: string,
  model_id: string,
  reference: NovelAiVibeReference,
): VibeEncodingKey {
  return { image_sha256, model_id, information_extracted: reference.information_extracted };
}

async function encode_vibes(
  deps: NovelAiPreparationDeps,
  request: NovelAiDiffusionRequest,
  signal: AbortSignal,
): Promise<readonly NovelAiVibeReference[]> {
  const references = request.vibe_references ?? [];
  const encoded: NovelAiVibeReference[] = [];
  for (const reference of references) {
    if (reference.encoding !== undefined) {
      encoded.push(reference);
      continue;
    }
    const bytes = await read_bytes(deps, reference.asset_id, signal);
    const key = encoding_key(await deps.sha256(bytes), request.model_id, reference);
    let encoding = await deps.vibe_cache.get(key);
    if (encoding === null) {
      encoding = await deps.encode_vibe(
        bytes,
        request.model_id,
        reference.information_extracted,
        signal,
      );
      await deps.vibe_cache.put(key, encoding);
    }
    encoded.push({ ...reference, encoding });
  }
  return encoded;
}

async function prepare_vibes(
  deps: NovelAiPreparationDeps,
  profile: NovelAiModelProfile,
  request: NovelAiDiffusionRequest,
  signal: AbortSignal,
): Promise<readonly NovelAiVibeReference[] | undefined> {
  if (request.vibe_references === undefined || !novelai_sends_vibes(request)) {
    return request.vibe_references;
  }
  switch (profile.vibe_transfer) {
    case "unsupported":
      throw new NovelAiPreparationError(`${profile.display_name} does not support vibe transfer`);
    case "encoded":
      return encode_vibes(deps, request, signal);
    case "raw_image": {
      const padded: NovelAiVibeReference[] = [];
      for (const reference of request.vibe_references) {
        padded.push({
          ...reference,
          asset_id: await pad_to(deps, reference.asset_id, RAW_VIBE_CANVAS, signal),
        });
      }
      return padded;
    }
  }
}

async function prepare_diffusion(
  deps: NovelAiPreparationDeps,
  request: NovelAiDiffusionRequest,
  signal: AbortSignal,
): Promise<NovelAiDiffusionRequest> {
  const profile = require_profile(request.model_id);
  const target = { width: request.width, height: request.height };
  const vibe_references = await prepare_vibes(deps, profile, request, signal);
  const character_references =
    request.character_references === undefined
      ? undefined
      : await Promise.all(
          request.character_references.map(async (reference) => ({
            ...reference,
            asset_id: await pad_to(deps, reference.asset_id, director_canvas_for, signal),
          })),
        );
  const references = {
    ...(vibe_references === undefined ? {} : { vibe_references: [...vibe_references] }),
    ...(character_references === undefined ? {} : { character_references }),
  };
  switch (request.action) {
    case "generate":
      return { ...request, ...references };
    case "img2img":
      return {
        ...request,
        ...references,
        image_asset_id: await fit_exactly(deps, request.image_asset_id, target, signal),
      };
    case "infill": {
      const mask = await read_bytes(deps, request.mask_asset_id, signal);
      return {
        ...request,
        ...references,
        image_asset_id: await fit_exactly(deps, request.image_asset_id, target, signal),
        mask_asset_id: await deps.store_input(
          await deps.image_operations.binarize_mask(mask, target),
        ),
      };
    }
  }
}

/**
 * Turns a request built from gallery assets into one NovelAI accepts as-is: source images resized
 * to the request size, references padded to the canvases NovelAI expects, the mask binarised, and
 * vibe references encoded (from the cache when possible, since every encoding is billed).
 */
export async function prepare_novelai_request(
  deps: NovelAiPreparationDeps,
  request: NovelAiRequest,
  signal: AbortSignal,
): Promise<NovelAiRequest> {
  let prepared: NovelAiRequest;
  switch (request.action) {
    case "generate":
    case "img2img":
    case "infill":
      prepared = await prepare_diffusion(deps, request, signal);
      break;
    case "augment": {
      const bytes = await read_bytes(deps, request.image_asset_id, signal);
      const target = augment_size_for(await deps.image_operations.size(bytes));
      prepared = {
        ...request,
        ...target,
        image_asset_id: await fit_exactly(deps, request.image_asset_id, target, signal),
      };
      break;
    }
    case "upscale":
      prepared = request;
      break;
  }
  return NovelAiRequestSchema.parse(prepared);
}

/** Vibe references that would be encoded, and billed, if the request were submitted now. */
export async function count_unencoded_vibes(
  deps: Pick<NovelAiPreparationDeps, "assets" | "vibe_cache" | "sha256">,
  request: NovelAiRequest,
  signal: AbortSignal,
): Promise<number> {
  if (
    request.action === "upscale" ||
    request.action === "augment" ||
    request.vibe_references === undefined ||
    !novelai_sends_vibes(request) ||
    resolve_novelai_model(request.model_id)?.profile.vibe_transfer !== "encoded"
  ) {
    return 0;
  }
  let count = 0;
  for (const reference of request.vibe_references) {
    if (reference.encoding !== undefined) {
      continue;
    }
    const bytes = (await deps.assets.read(reference.asset_id, signal)).bytes;
    const key = encoding_key(await deps.sha256(bytes), request.model_id, reference);
    if ((await deps.vibe_cache.get(key)) === null) {
      count += 1;
    }
  }
  return count;
}
