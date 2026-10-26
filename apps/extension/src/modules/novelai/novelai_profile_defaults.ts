import {
  resolve_novelai_model,
  type AssetId,
  type NovelAiGenerationDefaults,
  type NovelAiRequest,
} from "@tavern-canvas/contracts";

export interface VibeSource {
  readonly image_bytes: Uint8Array;
  readonly strength: number;
  readonly information_extracted: number;
}

export interface ProfileDefaultsDeps {
  /** `null` when the library entry is gone or has no image. */
  readonly load_vibe: (vibe_id: string) => Promise<VibeSource | null>;
  /** Keeps the bytes readable as a provider input for the request's lifetime. */
  readonly store_input: (bytes: Uint8Array) => Promise<AssetId>;
}

/**
 * Applies a profile's saved parameters to a text-to-image request. Vibes are skipped for a model
 * without vibe transfer, which the settings page reports as an ignored parameter.
 */
export async function apply_novelai_defaults(
  request: Extract<NovelAiRequest, { readonly action: "generate" }>,
  defaults: NovelAiGenerationDefaults,
  deps: ProfileDefaultsDeps,
): Promise<Extract<NovelAiRequest, { readonly action: "generate" }>> {
  const { vibe_asset_ids, ...parameters } = defaults;
  const supports_vibes =
    resolve_novelai_model(request.model_id)?.profile.vibe_transfer !== "unsupported";
  const vibe_references = [];
  if (supports_vibes) {
    for (const vibe_id of vibe_asset_ids) {
      const vibe = await deps.load_vibe(vibe_id);
      if (vibe !== null) {
        vibe_references.push({
          asset_id: await deps.store_input(vibe.image_bytes),
          strength: vibe.strength,
          information_extracted: vibe.information_extracted,
        });
      }
    }
  }
  return {
    ...request,
    ...parameters,
    ...(vibe_references.length > 0 ? { vibe_references } : {}),
  };
}
