import {
  novelai_sends_vibes,
  resolve_novelai_model,
  type AssetId,
  type NovelAiCharacterPrompt,
  type NovelAiDiffusionRequest,
  type NovelAiModelProfile,
  type NovelAiNoiseSchedule,
  type NovelAiRequest,
  type NovelAiSampler,
} from "@tavern-canvas/contracts";

import { encode_base64, invalid_request } from "../image_bytes.js";
import type { ProviderSourceAsset } from "../provider_adapter.js";
import { NOVELAI_PROMPT_PRESETS } from "./novelai_prompt_presets.js";

export const NOVELAI_UPSCALE_MODEL = "nai-diffusion-5-curated";

export interface NovelAiRoutedPayload {
  readonly route: "/ai/generate-image" | "/ai/upscale" | "/ai/augment-image";
  readonly body: Readonly<Record<string, unknown>>;
}

type Assets = ReadonlyMap<AssetId, ProviderSourceAsset>;

const UC_PRESET_IDS = {
  heavy: "heavy",
  light: "light",
  human_focus: "humanFocus",
  furry_focus: "furryFocus",
  none: "none",
} as const;

const GRID_POSITIONS = [0.1, 0.3, 0.5, 0.7, 0.9] as const;
const DEFAULT_CENTER = { x: 0.5, y: 0.5 } as const;
const VARIETY_REFERENCE_LATENT = 4 * 104 * 152;
const MAX_SEED = 4_294_967_295;

const DIRECTOR_DESCRIPTIONS = {
  character: "character",
  style: "style",
  costume: "costume",
  character_and_style: "character&style",
} as const;

export function map_novelai_request(request: NovelAiRequest, assets: Assets): NovelAiRoutedPayload {
  switch (request.action) {
    case "upscale":
      return {
        route: "/ai/upscale",
        body: {
          image: encode_base64(require_asset(assets, request.image_asset_id).bytes),
          model: NOVELAI_UPSCALE_MODEL,
          declared_blur_sigma: 0,
        },
      };
    case "augment":
      return {
        route: "/ai/augment-image",
        body: {
          req_type: request.tool,
          use_new_shared_trial: true,
          width: request.width,
          height: request.height,
          image: encode_base64(require_asset(assets, request.image_asset_id).bytes),
          ...augment_prompt(request),
        },
      };
    case "generate":
    case "img2img":
    case "infill":
      return { route: "/ai/generate-image", body: map_diffusion(request, assets) };
  }
}

function augment_prompt(
  request: Extract<NovelAiRequest, { readonly action: "augment" }>,
): Record<string, unknown> {
  if (request.tool === "emotion") {
    return {
      prompt: `${request.emotion ?? "neutral"};;${request.tool_prompt ?? ""}`,
      defry: request.defry ?? 0,
    };
  }
  if (request.tool === "colorize") {
    return { prompt: request.tool_prompt ?? "", defry: request.defry ?? 0 };
  }
  return {};
}

function profile_for(model_id: string): NovelAiModelProfile {
  const resolved = resolve_novelai_model(model_id);
  if (resolved === null) {
    throw invalid_request();
  }
  return resolved.profile;
}

function map_diffusion(request: NovelAiDiffusionRequest, assets: Assets): Record<string, unknown> {
  const profile = profile_for(request.model_id);
  const model_id =
    request.action === "infill"
      ? (profile.inpainting_model_id ?? request.model_id)
      : request.model_id;
  if (request.action === "infill" && profile.inpainting_model_id === null) {
    throw invalid_request();
  }
  if (request.action === "img2img" && !profile.img2img) {
    throw invalid_request();
  }
  const seed = request.seed ?? 0;
  const fixed = profile.fixed_settings;
  const sampler = sampler_for(profile, fixed?.sampler ?? request.sampler);
  const undesired_preset = fixed?.undesired_content_preset ?? request.undesired_content_preset;
  const prompt = apply_quality_tags(profile, request.prompt, request.quality_preset);
  const negative_prompt = apply_undesired_content(
    profile,
    request.negative_prompt ?? "",
    undesired_preset,
    request.prompt,
  );
  const noise_schedule = noise_schedule_for(profile, sampler, request.noise_schedule);

  const parameters: Record<string, unknown> = {
    params_version: 4,
    width: request.width,
    height: request.height,
    scale: request.scale,
    sampler,
    steps: fixed?.steps ?? request.steps,
    n_samples: request.output_count,
    seed,
    ucPresetId: UC_PRESET_IDS[undesired_preset],
    qualityPresetId: request.quality_preset,
    negative_prompt,
    legacy: false,
    legacy_v3_extend: false,
    add_original_image: true,
    image_format: "png",
    ...(profile.cfg_rescale ? { cfg_rescale: request.cfg_rescale } : {}),
    ...(noise_schedule === null ? {} : { noise_schedule }),
    ...(sampler === "k_euler_ancestral" && noise_schedule !== null && noise_schedule !== "native"
      ? { deliberate_euler_ancestral_bug: false, prefer_brownian: true }
      : {}),
    ...(profile.variety_sigma === null
      ? {}
      : { skip_cfg_above_sigma: request.variety_plus ? variety_sigma(profile, request) : null }),
    ...(profile.smea
      ? {
          sm: request.action !== "img2img" && request.smea,
          sm_dyn: request.action !== "img2img" && request.smea && request.dyn,
        }
      : { dynamic_thresholding: false }),
    ...prompt_fields(profile, prompt, negative_prompt, request.characters ?? []),
    ...vibe_fields(profile, request, assets),
    ...character_reference_fields(profile, request, assets),
    ...action_fields(request, assets, seed),
  };

  return {
    input: prompt,
    model: model_id,
    action: request.action,
    parameters,
    use_new_shared_trial: true,
  };
}

function sampler_for(profile: NovelAiModelProfile, sampler: NovelAiSampler): NovelAiSampler {
  return profile.family !== "v3" && sampler === "ddim_v3" ? "k_euler_ancestral" : sampler;
}

function default_noise_schedule(sampler: NovelAiSampler): NovelAiNoiseSchedule {
  switch (sampler) {
    case "k_dpmpp_2m":
      return "exponential";
    case "ddim_v3":
      return "native";
    case "k_euler":
    case "k_euler_ancestral":
    case "k_dpmpp_sde":
    case "k_dpmpp_2s_ancestral":
    case "k_dpmpp_2m_sde":
      return "karras";
  }
}

function noise_schedule_for(
  profile: NovelAiModelProfile,
  sampler: NovelAiSampler,
  requested: NovelAiNoiseSchedule,
): NovelAiNoiseSchedule | null {
  if (sampler === "ddim_v3") {
    return null;
  }
  switch (profile.noise_schedule) {
    case "fixed_karras":
      return "karras";
    case "no_native":
      return requested === "native" ? default_noise_schedule(sampler) : requested;
    case "selectable":
      return requested;
  }
}

export function apply_quality_tags(
  profile: NovelAiModelProfile,
  prompt: string,
  preset: NovelAiDiffusionRequest["quality_preset"],
): string {
  const suffix =
    preset === "none" ? undefined : NOVELAI_PROMPT_PRESETS[profile.prompt_presets].quality[preset];
  if (suffix === undefined || suffix === "") {
    return prompt;
  }
  return prompt === "" ? suffix : `${prompt}, ${suffix}`;
}

export function apply_undesired_content(
  profile: NovelAiModelProfile,
  negative_prompt: string,
  preset: NovelAiDiffusionRequest["undesired_content_preset"],
  prompt: string,
): string {
  const prefix = NOVELAI_PROMPT_PRESETS[profile.prompt_presets].undesired_content[preset] ?? "";
  let combined: string;
  if (profile.family === "v3") {
    const applied = preset === "none" ? "" : prefix;
    combined =
      negative_prompt === ""
        ? prefix
        : applied === ""
          ? negative_prompt
          : `${applied}, ${negative_prompt}`;
  } else {
    combined =
      prefix === ""
        ? negative_prompt
        : negative_prompt === ""
          ? prefix
          : `${prefix}, ${negative_prompt}`;
  }
  const needs_nsfw =
    profile.nsfw_negative_prefix &&
    preset !== "none" &&
    prefix !== "" &&
    !prompt.toLowerCase().includes("nsfw");
  if (!needs_nsfw) {
    return combined;
  }
  return combined === "" ? "nsfw" : `nsfw, ${combined}`;
}

function variety_sigma(profile: NovelAiModelProfile, request: NovelAiDiffusionRequest): number {
  const latent = 4 * Math.floor(request.width / 8) * Math.floor(request.height / 8);
  return (profile.variety_sigma ?? 0) * Math.sqrt(latent / VARIETY_REFERENCE_LATENT);
}

function snap_to_grid(value: number): number {
  return GRID_POSITIONS.reduce((best, candidate) =>
    Math.abs(candidate - value) < Math.abs(best - value) ? candidate : best,
  );
}

function character_center(
  profile: NovelAiModelProfile,
  character: NovelAiCharacterPrompt,
): { readonly x: number; readonly y: number } {
  if (character.center === undefined) {
    return DEFAULT_CENTER;
  }
  return profile.character_positions === "grid"
    ? { x: snap_to_grid(character.center.x), y: snap_to_grid(character.center.y) }
    : character.center;
}

function prompt_fields(
  profile: NovelAiModelProfile,
  prompt: string,
  negative_prompt: string,
  characters: readonly NovelAiCharacterPrompt[],
): Record<string, unknown> {
  if (profile.family === "v3") {
    if (characters.length > 0) {
      throw invalid_request();
    }
    return {};
  }
  if (characters.length > profile.max_characters) {
    throw invalid_request();
  }
  const centers = characters.map((character) => character_center(profile, character));
  const use_coords =
    profile.character_positions !== "unsupported" &&
    characters.some((character) => character.center !== undefined);
  return {
    v4_prompt: {
      caption: {
        base_caption: prompt,
        char_captions: characters.map((character, index) => ({
          char_caption: character.prompt,
          centers: [centers[index] ?? DEFAULT_CENTER],
        })),
      },
      use_coords,
      use_order: true,
    },
    v4_negative_prompt: {
      caption: {
        base_caption: negative_prompt,
        char_captions: characters.map((character, index) => ({
          char_caption: character.negative_prompt ?? "",
          centers: [centers[index] ?? DEFAULT_CENTER],
        })),
      },
      legacy_uc: profile.legacy_uc,
    },
    characterPrompts: characters.map((character, index) => ({
      prompt: character.prompt,
      uc: character.negative_prompt ?? "",
      center: centers[index] ?? DEFAULT_CENTER,
      enabled: true,
    })),
  };
}

export function normalize_vibe_strengths(strengths: readonly number[]): readonly number[] {
  if (strengths.length <= 1) {
    return strengths;
  }
  const total = strengths.reduce((sum, value) => sum + Math.abs(value), 0);
  return total > 1 ? strengths.map((value) => value / total) : strengths;
}

function vibe_fields(
  profile: NovelAiModelProfile,
  request: NovelAiDiffusionRequest,
  assets: Assets,
): Record<string, unknown> {
  const references = request.vibe_references ?? [];
  if (references.length === 0 || !novelai_sends_vibes(request)) {
    return {};
  }
  if (profile.vibe_transfer === "unsupported") {
    throw invalid_request();
  }
  const raw_strengths = references.map((reference) => reference.strength);
  const strengths =
    request.normalize_vibe_strengths === false
      ? raw_strengths
      : normalize_vibe_strengths(raw_strengths);
  if (profile.vibe_transfer === "encoded") {
    return {
      reference_image_multiple: references.map((reference) => {
        if (reference.encoding === undefined) {
          throw invalid_request();
        }
        return reference.encoding;
      }),
      reference_strength_multiple: strengths,
    };
  }
  return {
    reference_image_multiple: references.map((reference) =>
      encode_base64(require_asset(assets, reference.asset_id).bytes),
    ),
    reference_strength_multiple: strengths,
    reference_information_extracted_multiple: references.map(
      (reference) => reference.information_extracted,
    ),
  };
}

function character_reference_fields(
  profile: NovelAiModelProfile,
  request: NovelAiDiffusionRequest,
  assets: Assets,
): Record<string, unknown> {
  const references = request.character_references ?? [];
  if (references.length === 0) {
    return {};
  }
  if (!profile.character_reference) {
    throw invalid_request();
  }
  return {
    director_reference_images: references.map((reference) =>
      encode_base64(require_asset(assets, reference.asset_id).bytes),
    ),
    director_reference_descriptions: references.map((reference) => ({
      caption: { base_caption: DIRECTOR_DESCRIPTIONS[reference.description], char_captions: [] },
      legacy_uc: false,
    })),
    director_reference_information_extracted: references.map(
      (reference) => reference.information_extracted,
    ),
    director_reference_strength_values: references.map((reference) => reference.strength),
    director_reference_secondary_strength_values: references.map(
      (reference) => 1 - reference.fidelity,
    ),
  };
}

function action_fields(
  request: NovelAiDiffusionRequest,
  assets: Assets,
  seed: number,
): Record<string, unknown> {
  switch (request.action) {
    case "generate":
      return {};
    case "img2img":
      return {
        image: encode_base64(require_asset(assets, request.image_asset_id).bytes),
        strength: request.strength,
        noise: request.noise,
        extra_noise_seed: seed === 0 ? MAX_SEED : seed - 1,
        color_correct: false,
      };
    case "infill":
      return {
        image: encode_base64(require_asset(assets, request.image_asset_id).bytes),
        mask: encode_base64(require_asset(assets, request.mask_asset_id).bytes),
        inpaintImg2ImgStrength: request.inpaint_strength,
        ...(request.inpaint_strength === 1
          ? {}
          : { img2img: { strength: request.inpaint_strength, color_correct: true } }),
      };
  }
}

function require_asset(assets: Assets, asset_id: AssetId): ProviderSourceAsset {
  const asset = assets.get(asset_id);
  if (asset === undefined || asset.asset_id !== asset_id) {
    throw invalid_request();
  }
  return asset;
}

/** Every asset a request reads, in request order. */
export function novelai_request_asset_ids(request: NovelAiRequest): readonly AssetId[] {
  switch (request.action) {
    case "upscale":
    case "augment":
      return [request.image_asset_id];
    case "generate":
    case "img2img":
    case "infill": {
      const profile = resolve_novelai_model(request.model_id)?.profile;
      const vibe_assets =
        profile?.vibe_transfer === "raw_image" && novelai_sends_vibes(request)
          ? (request.vibe_references ?? []).map((reference) => reference.asset_id)
          : [];
      const character_assets = (request.character_references ?? []).map(
        (reference) => reference.asset_id,
      );
      const action_assets =
        request.action === "img2img"
          ? [request.image_asset_id]
          : request.action === "infill"
            ? [request.image_asset_id, request.mask_asset_id]
            : [];
      return [...new Set([...action_assets, ...vibe_assets, ...character_assets])];
    }
  }
}
