import type { NovelAiAccountStatus } from "./novelai_account.js";
import { resolve_novelai_model } from "./novelai_models.js";
import {
  NOVELAI_MAX_UPSCALE_PIXELS,
  is_novelai_diffusion_request,
  novelai_sends_vibes,
  type NovelAiAugmentTool,
  type NovelAiDiffusionRequest,
  type NovelAiRequest,
} from "./novelai.js";

const MIN_PRICED_PIXELS = 65_536;
const OPUS_FREE_PIXELS = 1_048_576;
const OPUS_FREE_STEPS = 28;
const MAX_ANLAS_PER_IMAGE = 140;
const VIBE_ENCODING_ANLAS = 2;
const FREE_VIBES_PER_REQUEST = 4;
const CHARACTER_REFERENCE_ANLAS = 5;
const UPSCALE_TIERS: readonly (readonly [number, number])[] = [
  [1_048_576, 1],
  [1_747_627, 2],
  [2_446_678, 3],
  [3_145_728, 4],
];

export interface NovelAiCostEstimate {
  /** `null` when NovelAI would reject the request as too expensive or too large. */
  readonly anlas: number | null;
  readonly opus_free: boolean;
  readonly per_image: number | null;
  readonly vibe_encoding: number;
}

interface DiffusionPriceInput {
  readonly pixels: number;
  readonly steps: number;
  readonly smea_factor: number;
  readonly strength: number;
  readonly price_multiplier: number;
  readonly step_price_factor: number;
}

function diffusion_price_per_image(input: DiffusionPriceInput): number | null {
  const pixels = Math.max(input.pixels, MIN_PRICED_PIXELS);
  const base =
    Math.ceil(
      2.951823174884865e-6 * pixels +
        5.753298233447344e-7 * pixels * input.steps * input.step_price_factor,
    ) *
    input.smea_factor *
    input.price_multiplier;
  const per_image = Math.max(Math.ceil(base * input.strength), 2);
  return per_image > MAX_ANLAS_PER_IMAGE ? null : per_image;
}

function account_allows_free(
  account: NovelAiAccountStatus | null,
  opus_usage_limit: boolean,
): boolean {
  if (account === null || account.tier_level < 3 || !account.active) {
    return false;
  }
  return !(opus_usage_limit && account.usage?.is_negative === true);
}

function estimate_diffusion(
  request: NovelAiDiffusionRequest,
  account: NovelAiAccountStatus | null,
  unencoded_vibes: number,
): NovelAiCostEstimate {
  const resolved = resolve_novelai_model(request.model_id);
  const profile = resolved?.profile;
  const smea_factor = profile?.smea === true && request.smea ? (request.dyn ? 1.4 : 1.2) : 1;
  const strength =
    request.action === "infill"
      ? request.inpaint_strength
      : request.action === "img2img"
        ? request.strength
        : 1;
  const per_image = diffusion_price_per_image({
    pixels: request.width * request.height,
    steps: request.steps,
    smea_factor,
    strength,
    price_multiplier: profile?.price_multiplier ?? 1,
    step_price_factor: profile?.step_price_factor ?? 1,
  });
  const character_references = request.character_references?.length ?? 0;
  const vibes = novelai_sends_vibes(request) ? (request.vibe_references?.length ?? 0) : 0;
  const opus_free =
    request.width * request.height <= OPUS_FREE_PIXELS &&
    request.steps <= OPUS_FREE_STEPS &&
    account_allows_free(account, profile?.opus_usage_limit ?? false);
  const vibe_encoding = vibes === 0 ? 0 : unencoded_vibes * VIBE_ENCODING_ANLAS;
  if (per_image === null) {
    return { anlas: null, opus_free, per_image: null, vibe_encoding };
  }
  const charged_images = request.output_count - (opus_free ? 1 : 0);
  const anlas =
    per_image * charged_images +
    CHARACTER_REFERENCE_ANLAS * character_references * request.output_count +
    VIBE_ENCODING_ANLAS * Math.max(0, vibes - FREE_VIBES_PER_REQUEST) +
    vibe_encoding;
  return { anlas, opus_free, per_image, vibe_encoding };
}

function fit_within_pixels(width: number, height: number, max_pixels: number): number {
  const pixels = width * height;
  if (pixels <= max_pixels) {
    return pixels;
  }
  const scale = Math.sqrt(max_pixels / pixels);
  return Math.floor(width * scale) * Math.floor(height * scale);
}

function estimate_augment(
  tool: NovelAiAugmentTool,
  width: number,
  height: number,
  account: NovelAiAccountStatus | null,
): NovelAiCostEstimate {
  const pixels = fit_within_pixels(width, height, OPUS_FREE_PIXELS);
  const per_image = diffusion_price_per_image({
    pixels,
    steps: OPUS_FREE_STEPS,
    smea_factor: 1,
    strength: 1,
    price_multiplier: 1,
    step_price_factor: 1,
  });
  if (per_image === null) {
    return { anlas: null, opus_free: false, per_image: null, vibe_encoding: 0 };
  }
  if (tool === "bg-removal") {
    return { anlas: 3 * per_image + 5, opus_free: false, per_image, vibe_encoding: 0 };
  }
  const opus_free = account_allows_free(account, false);
  return { anlas: opus_free ? 0 : per_image, opus_free, per_image, vibe_encoding: 0 };
}

function estimate_upscale(pixels: number): NovelAiCostEstimate {
  if (pixels > NOVELAI_MAX_UPSCALE_PIXELS) {
    return { anlas: null, opus_free: false, per_image: null, vibe_encoding: 0 };
  }
  const tier = UPSCALE_TIERS.find(([limit]) => pixels <= limit);
  const anlas = tier?.[1] ?? null;
  return { anlas, opus_free: false, per_image: anlas, vibe_encoding: 0 };
}

export interface NovelAiCostContext {
  readonly account: NovelAiAccountStatus | null;
  /** Vibe references that have no cached encoding and will be encoded before submission. */
  readonly unencoded_vibes: number;
  /** Source size for upscale requests, which carry no dimensions of their own. */
  readonly source_pixels?: number;
}

/** Mirrors the price NovelAI's web client shows; the server remains the authority on what is charged. */
export function estimate_novelai_cost(
  request: NovelAiRequest,
  context: NovelAiCostContext,
): NovelAiCostEstimate {
  if (is_novelai_diffusion_request(request)) {
    return estimate_diffusion(request, context.account, context.unencoded_vibes);
  }
  if (request.action === "augment") {
    return estimate_augment(request.tool, request.width, request.height, context.account);
  }
  return estimate_upscale(context.source_pixels ?? Number.POSITIVE_INFINITY);
}
