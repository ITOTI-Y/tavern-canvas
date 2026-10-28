import type { AssetId, ImageGenerationRequest } from "@tavern-canvas/contracts";
import type {
  ProviderAssetReader,
  ProviderOutputAsset,
  ProviderTransport,
} from "@tavern-canvas/providers";
import type {
  NovelAiVibeEncodingRepository,
  ProviderInputAssetRepository,
} from "@tavern-canvas/storage";
import { create_sillytavern_proxy_fetcher } from "../../host/sillytavern_proxy_fetch.js";

import { create_browser_image_operations } from "./novelai_image_operations.js";
import { composite_novelai_infill } from "./novelai_infill_output.js";
import { prepare_novelai_request } from "./novelai_request_preparation.js";
import { create_novelai_service, type NovelAiService } from "./novelai_service.js";
import {
  create_provider_input_store,
  create_vibe_encoding_cache,
  sha256_hex,
  with_provider_inputs,
} from "./novelai_storage.js";

export interface NovelAiRuntimeDeps {
  readonly vibe_encodings: NovelAiVibeEncodingRepository;
  readonly provider_inputs: ProviderInputAssetRepository;
  readonly namespace: () => string;
  readonly gallery_assets: ProviderAssetReader;
  /** Resolves the transport of the active NovelAI profile, or throws why there is none. */
  readonly transport: () => ProviderTransport;
  readonly fetch: typeof fetch;
}

export interface NovelAiRuntime {
  readonly service: NovelAiService;
  /** Gallery images plus inputs derived for queued NovelAI requests. */
  readonly assets: ProviderAssetReader;
  /** Keeps derived input bytes, such as an inpaint mask, readable by asset id for a while. */
  store_input(bytes: Uint8Array): Promise<AssetId>;
  prepare(request: ImageGenerationRequest, signal: AbortSignal): Promise<ImageGenerationRequest>;
  /** Composites NovelAI inpainting results over their source image; other outputs pass through. */
  finish(
    request: ImageGenerationRequest,
    outputs: readonly ProviderOutputAsset[],
    signal: AbortSignal,
  ): Promise<readonly ProviderOutputAsset[]>;
}

/** Loaded on first NovelAI use so the canvas and encoding code stays out of the startup bundle. */
export function create_novelai_runtime(deps: NovelAiRuntimeDeps): NovelAiRuntime {
  const image_operations = create_browser_image_operations();
  const inputs = create_provider_input_store(deps.provider_inputs, deps.namespace, () =>
    Date.now(),
  );
  const vibe_cache = create_vibe_encoding_cache(deps.vibe_encodings, deps.namespace, () =>
    new Date().toISOString(),
  );
  const assets = with_provider_inputs(deps.gallery_assets, inputs);
  const service = create_novelai_service({
    transport: deps.transport,
    preparation: { assets, vibe_cache, sha256: sha256_hex },
    image_operations,
    page_fetchers: [create_sillytavern_proxy_fetcher(deps.fetch)],
  });
  return {
    service,
    assets,
    store_input: (bytes) => inputs.put(bytes),
    finish: (request, outputs, signal) =>
      request.provider_id === "novelai" && request.action === "infill"
        ? composite_novelai_infill({ assets, image_operations }, request, outputs, signal)
        : Promise.resolve(outputs),
    prepare: (request, signal) =>
      request.provider_id !== "novelai"
        ? Promise.resolve(request)
        : prepare_novelai_request(
            {
              assets,
              image_operations,
              store_input: (bytes) => inputs.put(bytes),
              vibe_cache,
              encode_vibe: (image, model_id, information_extracted, encode_signal) =>
                service.encode_vibe(image, model_id, information_extracted, encode_signal),
              sha256: sha256_hex,
            },
            request,
            signal,
          ),
  };
}
