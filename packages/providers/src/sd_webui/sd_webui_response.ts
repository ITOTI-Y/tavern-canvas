import {
  ImageGenerationResultSchema,
  type GeneratedAsset,
  type ImageGenerationResult,
  type SdWebuiRequest,
} from "@tavern-canvas/contracts";
import { z } from "zod";

import {
  create_generated_asset,
  decode_base64_image,
  malformed_response,
  result_with_optional_seed,
} from "../image_bytes.js";
import { ProviderAdapterError } from "../provider_error.js";
const SdWebuiResponseSchema = z.object({
  images: z.array(z.string()),
  info: z.string(),
});

const SdWebuiInfoSchema = z.object({
  seed: z.number().int().nonnegative().optional(),
});

export function parse_sd_webui_response(
  body: Uint8Array,
  request: SdWebuiRequest,
  max_response_bytes: number,
  allowed_media_types: readonly GeneratedAsset["media_type"][] = [
    "image/png",
    "image/jpeg",
    "image/webp",
  ],
): ImageGenerationResult {
  try {
    if (body.byteLength === 0 || body.byteLength > max_response_bytes) {
      throw malformed_response();
    }
    const decoded = new TextDecoder("utf-8", { fatal: true }).decode(body);
    const response = SdWebuiResponseSchema.parse(JSON.parse(decoded) as unknown);
    const { images } = response;
    const info_text = response.info;
    if (images.length !== request.output_count) {
      throw malformed_response();
    }

    const width =
      request.hires_fix === undefined
        ? request.width
        : Math.round(request.width * request.hires_fix.scale);
    const height =
      request.hires_fix === undefined
        ? request.height
        : Math.round(request.height * request.hires_fix.scale);
    let decoded_bytes = 0;
    const assets = images.map((image) => {
      if (typeof image !== "string") {
        throw malformed_response();
      }
      const bytes = decode_base64_image(image, max_response_bytes - decoded_bytes);
      decoded_bytes += bytes.byteLength;
      return create_generated_asset(bytes, width, height, allowed_media_types);
    });

    const seed = parse_seed(info_text);
    return ImageGenerationResultSchema.parse(
      result_with_optional_seed(
        {
          request_id: request.request_id,
          provider_id: "sd_webui",
          assets,
        },
        seed ?? request.seed,
      ),
    );
  } catch (error) {
    if (error instanceof ProviderAdapterError) {
      throw error;
    }
    throw malformed_response();
  }
}

function parse_seed(info_text: string): number | undefined {
  return SdWebuiInfoSchema.parse(JSON.parse(info_text) as unknown).seed;
}
