import type { NovelAiRequest } from "@tavern-canvas/contracts";
import type { ProviderAssetReader, ProviderOutputAsset } from "@tavern-canvas/providers";

import type { NovelAiImageOperations } from "./novelai_image_operations.js";
import { sha256_hex } from "./novelai_storage.js";

export interface InfillOutputDeps {
  readonly assets: ProviderAssetReader;
  readonly image_operations: Pick<NovelAiImageOperations, "composite_infill">;
}

/**
 * NovelAI returns the whole regenerated image for an infill request; only the masked region is
 * kept, blended into the untouched source so the rest of the picture keeps its original pixels.
 */
export async function composite_novelai_infill(
  deps: InfillOutputDeps,
  request: Extract<NovelAiRequest, { readonly action: "infill" }>,
  outputs: readonly ProviderOutputAsset[],
  signal: AbortSignal,
): Promise<readonly ProviderOutputAsset[]> {
  const [source, mask] = await Promise.all([
    deps.assets.read(request.image_asset_id, signal),
    deps.assets.read(request.mask_asset_id, signal),
  ]);
  return Promise.all(
    outputs.map(async (output) => {
      const bytes = await deps.image_operations.composite_infill(
        source.bytes,
        output.bytes,
        mask.bytes,
      );
      return {
        asset: {
          ...output.asset,
          media_type: "image/png",
          byte_length: bytes.byteLength,
          sha256: await sha256_hex(bytes),
        },
        bytes,
      };
    }),
  );
}
