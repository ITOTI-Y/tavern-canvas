import type { AssetId, SdWebuiRequest } from "@tavern-canvas/contracts";

import { encode_base64, invalid_request } from "../image_bytes.js";
import type { ProviderSourceAsset } from "../provider_adapter.js";

export interface SdWebuiPayload {
  readonly prompt: string;
  readonly negative_prompt?: string;
  readonly batch_size: number;
  readonly n_iter: number;
  readonly sampler_name: string;
  readonly scheduler: string;
  readonly width: number;
  readonly height: number;
  readonly steps: number;
  readonly cfg_scale: number;
  readonly seed?: number;
  readonly init_images?: readonly string[];
  readonly denoising_strength?: number;
  readonly override_settings: Readonly<Record<string, string>>;
  readonly override_settings_restore_afterwards: true;
  readonly enable_hr?: true;
  readonly hr_scale?: number;
  readonly hr_upscaler?: string;
  readonly hr_second_pass_steps?: number;
  readonly alwayson_scripts?: Readonly<Record<string, { readonly args: readonly unknown[] }>>;
}

export function map_sd_webui_request(
  request: SdWebuiRequest,
  assets: ReadonlyMap<AssetId, ProviderSourceAsset>,
): SdWebuiPayload {
  const lora_suffix = (request.lora_tokens ?? [])
    .map((token) => `<lora:${token.lora_id}:${String(token.weight)}>`)
    .join(", ");
  const prompt = lora_suffix.length === 0 ? request.prompt : `${request.prompt}, ${lora_suffix}`;
  const override_settings: Record<string, string> = {
    sd_model_checkpoint: request.model_id,
  };
  if (request.vae_id !== undefined) {
    override_settings.sd_vae = request.vae_id;
  }

  const alwayson_scripts: Record<string, { readonly args: readonly unknown[] }> = {};
  if (request.adetailer !== undefined && request.adetailer.length > 0) {
    alwayson_scripts.ADetailer = {
      args: [
        true,
        false,
        ...request.adetailer.map((detailer) => ({
          ad_model: detailer.model_id,
          ...(detailer.prompt === undefined ? {} : { ad_prompt: detailer.prompt }),
          ...(detailer.negative_prompt === undefined
            ? {}
            : { ad_negative_prompt: detailer.negative_prompt }),
          ...(detailer.confidence === undefined ? {} : { ad_confidence: detailer.confidence }),
          ...(detailer.mask_blur === undefined ? {} : { ad_mask_blur: detailer.mask_blur }),
          ...(detailer.denoise_strength === undefined
            ? {}
            : { ad_denoising_strength: detailer.denoise_strength }),
        })),
      ],
    };
  }
  if (request.controlnet !== undefined && request.controlnet.length > 0) {
    alwayson_scripts.controlnet = {
      args: request.controlnet.map((reference) => ({
        enabled: true,
        image: encode_base64(require_asset(assets, reference.asset_id).bytes),
        module: reference.module,
        model: reference.model_id,
        weight: reference.weight,
        guidance_start: reference.guidance_start,
        guidance_end: reference.guidance_end,
        ...(reference.control_mode === undefined
          ? {}
          : { control_mode: map_control_mode(reference.control_mode) }),
        ...(reference.resize_mode === undefined
          ? {}
          : { resize_mode: map_resize_mode(reference.resize_mode) }),
      })),
    };
  }

  return {
    prompt,
    ...(request.negative_prompt === undefined ? {} : { negative_prompt: request.negative_prompt }),
    batch_size: request.output_count,
    n_iter: 1,
    sampler_name: request.sampler,
    scheduler: request.scheduler,
    width: request.width,
    height: request.height,
    steps: request.steps,
    cfg_scale: request.cfg_scale,
    ...(request.seed === undefined ? {} : { seed: request.seed }),
    ...map_mode_fields(request, assets),
    override_settings,
    override_settings_restore_afterwards: true,
    ...(Object.keys(alwayson_scripts).length === 0 ? {} : { alwayson_scripts }),
  };
}

function map_mode_fields(
  request: SdWebuiRequest,
  assets: ReadonlyMap<AssetId, ProviderSourceAsset>,
):
  | {
      readonly init_images: readonly string[];
      readonly denoising_strength: number;
    }
  | {
      readonly enable_hr?: true;
      readonly hr_scale?: number;
      readonly hr_upscaler?: string;
      readonly hr_second_pass_steps?: number;
      readonly denoising_strength?: number;
    }
  | object {
  if (request.mode === "img2img") {
    return map_img2img_fields(request, assets);
  }
  return map_txt2img_hires_fields(request);
}

function map_txt2img_hires_fields(request: SdWebuiRequest):
  | {
      readonly enable_hr: true;
      readonly hr_scale: number;
      readonly hr_upscaler: string;
      readonly hr_second_pass_steps: number;
      readonly denoising_strength: number;
    }
  | object {
  if (request.mode !== "txt2img") {
    throw invalid_request();
  }
  if (request.hires_fix === undefined) {
    return {};
  }
  return {
    enable_hr: true,
    hr_scale: request.hires_fix.scale,
    hr_upscaler: request.hires_fix.upscaler_id,
    hr_second_pass_steps: request.hires_fix.steps,
    denoising_strength: request.hires_fix.denoise_strength,
  };
}

function map_img2img_fields(
  request: SdWebuiRequest,
  assets: ReadonlyMap<AssetId, ProviderSourceAsset>,
): { readonly init_images: readonly string[]; readonly denoising_strength: number } | object {
  if (request.mode !== "img2img") {
    return {};
  }
  if (request.hires_fix !== undefined) {
    throw invalid_request();
  }
  if (request.denoise_strength === undefined) {
    throw invalid_request();
  }
  return {
    init_images: [encode_base64(require_asset(assets, request.input_asset_id).bytes)],
    denoising_strength: request.denoise_strength,
  };
}

function require_asset(
  assets: ReadonlyMap<AssetId, ProviderSourceAsset>,
  asset_id: AssetId | undefined,
): ProviderSourceAsset {
  if (asset_id === undefined) {
    throw invalid_request();
  }
  const asset = assets.get(asset_id);
  if (asset === undefined || asset.asset_id !== asset_id) {
    throw invalid_request();
  }
  return asset;
}

function map_control_mode(value: "balanced" | "prompt" | "control"): string {
  if (value === "prompt") {
    return "My prompt is more important";
  }
  if (value === "control") {
    return "ControlNet is more important";
  }
  return "Balanced";
}

function map_resize_mode(value: "resize" | "crop_and_resize" | "resize_and_fill"): string {
  if (value === "crop_and_resize") {
    return "Scale to Fit (Inner Fit)";
  }
  if (value === "resize_and_fill") {
    return "Envelope (Outer Fit)";
  }
  return "Just Resize";
}
