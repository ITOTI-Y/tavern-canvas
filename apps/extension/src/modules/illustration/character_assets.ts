import {
  resolve_novelai_model,
  type AssetId,
  type ImageGenerationRequest,
} from "@tavern-canvas/contracts";

import { join_prompt_parts } from "../prompt/tag_normalizer.js";
import type { LibraryCharacter, LibraryLora } from "./library_match.js";

const MAX_LORA_TOKENS = 16;
const MAX_VIBES = 16;

const VIBE_STRENGTH = 0.6;
const IMG2IMG_STRENGTH = 0.7;

export interface ReferenceImagePort {
  /** Keeps the reference's bytes readable as a provider input for the request's lifetime. */
  readonly store_reference: (data_url: string) => Promise<AssetId>;
}

/**
 * Adds the LoRAs linked to these characters, with their trigger words, to an SD WebUI request.
 * Other providers have no LoRA field and are returned unchanged.
 */
export function attach_character_loras(
  request: ImageGenerationRequest,
  characters: readonly LibraryCharacter[],
  loras: readonly LibraryLora[],
): ImageGenerationRequest {
  if (request.provider_id !== "sd_webui") {
    return request;
  }
  const ids = new Set(characters.map((character) => character.id));
  const linked = loras.filter((lora) => ids.has(lora.character_id) && lora.file_name !== "");
  if (linked.length === 0) {
    return request;
  }
  const tokens = [
    ...(request.lora_tokens ?? []),
    ...linked.map((lora) => ({ lora_id: lora.file_name, weight: lora.weight })),
  ].slice(0, MAX_LORA_TOKENS);
  return {
    ...request,
    prompt: join_prompt_parts([request.prompt, ...linked.map((lora) => lora.trigger_words)]),
    lora_tokens: tokens,
  };
}

/**
 * Sends the reference images of these characters with a NovelAI text-to-image request, each the
 * way its character asks. Precise reference blends every image into one person and cannot be
 * combined with vibe transfer, so only the first such image is sent and vibes are dropped with it;
 * an image-to-image base takes the first character that asks for one. Uses the model does not
 * support are skipped.
 */
export async function attach_character_references(
  request: ImageGenerationRequest,
  characters: readonly LibraryCharacter[],
  port: ReferenceImagePort,
): Promise<ImageGenerationRequest> {
  if (request.provider_id !== "novelai" || request.action !== "generate") {
    return request;
  }
  const profile = resolve_novelai_model(request.model_id)?.profile;
  if (profile === undefined) {
    return request;
  }
  const by_mode = (mode: string): readonly string[] =>
    characters.flatMap((character) =>
      character.reference?.mode === mode ? [character.reference.image] : [],
    );
  const precise = profile.character_reference ? by_mode("precise").slice(0, 1) : [];
  const vibes =
    precise.length === 0 && profile.vibe_transfer !== "unsupported" ? by_mode("vibe") : [];
  const base = by_mode("img2img")[0];

  const character_references = await Promise.all(
    precise.map(async (image) => ({
      asset_id: await port.store_reference(image),
      description: "character" as const,
      strength: 1,
      fidelity: 1,
      information_extracted: 1,
    })),
  );
  const vibe_references = [
    ...(precise.length === 0 ? (request.vibe_references ?? []) : []),
    ...(await Promise.all(
      vibes.map(async (image) => ({
        asset_id: await port.store_reference(image),
        strength: VIBE_STRENGTH,
        information_extracted: 1,
      })),
    )),
  ].slice(0, MAX_VIBES);

  const { vibe_references: _dropped, ...rest } = request;
  const next = {
    ...rest,
    ...(vibe_references.length > 0 ? { vibe_references } : {}),
    ...(character_references.length > 0 ? { character_references } : {}),
  };
  if (base === undefined) {
    return next;
  }
  return {
    ...next,
    action: "img2img",
    image_asset_id: await port.store_reference(base),
    strength: IMG2IMG_STRENGTH,
    noise: 0,
  };
}
