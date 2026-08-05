import type { AssetId, NovelAiRequest } from "@tavern-canvas/contracts";

import { encode_base64, invalid_request } from "../image_bytes.js";
import type { ProviderSourceAsset } from "../provider_adapter.js";

export interface NovelAiPayload {
  readonly input: string;
  readonly model: string;
  readonly action: "generate";
  readonly parameters: {
    readonly params_version: 3;
    readonly prompt: string;
    readonly negative_prompt?: string;
    readonly width: number;
    readonly height: number;
    readonly steps: number;
    readonly scale: number;
    readonly cfg_rescale: number;
    readonly sampler: string;
    readonly noise_schedule: string;
    readonly seed?: number;
    readonly n_samples: number;
    readonly qualityToggle: boolean;
    readonly ucPreset: number;
    readonly sm: boolean;
    readonly sm_dyn: boolean;
    readonly reference_image_multiple?: readonly string[];
    readonly reference_strength_multiple?: readonly number[];
    readonly reference_information_extracted_multiple?: readonly number[];
    readonly director_reference_images?: readonly string[];
    readonly director_reference_descriptions?: readonly unknown[];
    readonly director_reference_strength_values?: readonly number[];
    readonly director_reference_secondary_strength_values?: readonly number[];
    readonly director_reference_information_extracted?: readonly number[];
  };
}

export function map_novelai_request(
  request: NovelAiRequest,
  assets: ReadonlyMap<AssetId, ProviderSourceAsset>,
): NovelAiPayload {
  const vibe_references = request.vibe_references ?? [];
  const character_references = request.character_references ?? [];

  return {
    input: request.prompt,
    model: request.model_id,
    action: "generate",
    parameters: {
      params_version: 3,
      prompt: request.prompt,
      ...(request.negative_prompt === undefined
        ? {}
        : { negative_prompt: request.negative_prompt }),
      width: request.width,
      height: request.height,
      steps: request.steps,
      scale: request.scale,
      cfg_rescale: request.cfg_rescale,
      sampler: request.sampler,
      noise_schedule: request.noise_schedule,
      ...(request.seed === undefined ? {} : { seed: request.seed }),
      n_samples: request.output_count,
      qualityToggle: request.quality_toggle,
      ucPreset: map_uc_preset(request.undesired_content_preset),
      sm: request.smea,
      sm_dyn: request.dyn,
      ...(vibe_references.length === 0
        ? {}
        : {
            reference_image_multiple: vibe_references.map((reference) =>
              encode_base64(require_asset(assets, reference.asset_id).bytes),
            ),
            reference_strength_multiple: vibe_references.map((reference) => reference.strength),
            reference_information_extracted_multiple: vibe_references.map(
              (reference) => reference.information_extracted,
            ),
          }),
      ...(character_references.length === 0
        ? {}
        : {
            director_reference_images: character_references.map((reference) =>
              encode_base64(require_asset(assets, reference.asset_id).bytes),
            ),
            director_reference_descriptions: character_references.map((reference) => ({
              caption: {
                base_caption: `character, ${reference.prompt}`,
                char_captions: [],
              },
              legacy_uc: false,
              use_coords: false,
              use_order: true,
            })),
            director_reference_strength_values: character_references.map(
              (reference) => reference.strength,
            ),
            director_reference_secondary_strength_values: character_references.map(
              (reference) => reference.strength,
            ),
            director_reference_information_extracted: character_references.map(() => 1),
          }),
    },
  };
}

function require_asset(
  assets: ReadonlyMap<AssetId, ProviderSourceAsset>,
  asset_id: AssetId,
): ProviderSourceAsset {
  const asset = assets.get(asset_id);
  if (asset === undefined || asset.asset_id !== asset_id) {
    throw invalid_request();
  }
  return asset;
}

function map_uc_preset(value: NovelAiRequest["undesired_content_preset"]): number {
  if (value === "light") {
    return 1;
  }
  if (value === "human_focus") {
    return 2;
  }
  if (value === "none") {
    return 3;
  }
  return 0;
}
