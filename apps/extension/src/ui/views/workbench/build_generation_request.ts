import type { AssetId, ImageGenerationRequest, ProviderId, Uuid } from "@tavern-canvas/contracts";

/**
 * A reference image the user picked for the current draft, sourced from Assets' `reference`
 * category (`AssetsViewModel.records.reference` -- see WorkbenchView.vue). The Workbench itself
 * never uploads or stores images; it only orders and forwards asset IDs that already exist.
 */
export interface ReferenceDraftItem {
  readonly asset_id: AssetId;
  readonly display_name: string;
}

export interface GenerationDraftInput {
  readonly provider_id: ProviderId;
  readonly positive_prompt: string;
  readonly negative_prompt: string;
  readonly image_count: number;
  readonly references: readonly ReferenceDraftItem[];
  /** Overrides the provider's placeholder model. An automatic request supplies the active
   * profile's own allowlisted model, which is the only one that profile will accept. */
  readonly model_id?: string;
}

export class UnsupportedProviderError extends Error {
  readonly code = "workbench_provider_unsupported";

  constructor(provider_id: ProviderId) {
    super(`Workbench cannot build a generation request for provider "${provider_id}" yet.`);
    this.name = "UnsupportedProviderError";
  }
}

/** `sd_webui` and `novelai` accept any provider identifier, so a profile's model passes straight
 * through. OpenAI and Google publish closed model enums, so an override is honoured only when the
 * contract already names it and the documented default stands otherwise. */
const OPENAI_IMAGE_MODEL_IDS = [
  "gpt-image-1",
  "gpt-image-1-mini",
  "gpt-image-1.5",
  "gpt-image-2",
  "gpt-image-2-2026-04-21",
  "chatgpt-image-latest",
] as const;

const GOOGLE_IMAGE_MODEL_IDS = [
  "gemini-2.5-flash-image",
  "gemini-3-pro-image-preview",
  "gemini-3-pro-image",
  "gemini-3.1-flash-image",
] as const;

function enum_model_id<T extends string>(
  supported: readonly T[],
  requested: string | undefined,
  fallback: T,
): T {
  return supported.find((candidate) => candidate === requested) ?? fallback;
}

const HEX_ALPHABET = "0123456789abcdef";

function to_hex(bytes: Uint8Array): string {
  let out = "";
  for (const byte of bytes) {
    out += (HEX_ALPHABET[byte >> 4] ?? "0") + (HEX_ALPHABET[byte & 0x0f] ?? "0");
  }
  return out;
}

/**
 * `generation_anchor` (Sha256Schema) is normally a hash of the chat `SourceContext` the
 * generation is tied to (packages/core/src/generation/source_context.ts) -- the chat_id, active
 * swipes, and message content hashes at the moment the request was made. A Workbench submission
 * is not triggered from a specific chat message (it is a standalone, manually composed request),
 * so there is no `SourceContext` to hash. This computes a real SHA-256 digest of the request's
 * own identity (request id + submission time) as a syntactically valid, collision-resistant
 * placeholder anchor -- NOT a claim that it reconstructs any chat context. Flagged in
 * task-5-report.md as a genuine contract gap: the plan does not define what a manual, non-chat
 * generation should anchor to.
 */
export async function compute_generation_anchor(request_id: Uuid): Promise<string> {
  const material = new TextEncoder().encode(`${request_id}:${Date.now().toString()}`);
  const digest = await crypto.subtle.digest("SHA-256", material);
  return to_hex(new Uint8Array(digest));
}

/**
 * Builds a fully typed `ImageGenerationRequest` for the given provider from the Workbench's
 * common (provider-agnostic) draft fields. No provider-specific settings surface (model,
 * sampler, steps, workflow...) exists anywhere in the current contracts (ProviderProfileSummary
 * carries only identity fields, not generation defaults -- see task-5-report.md's "request
 * construction" concern), so every provider-specific required field below is a documented,
 * fixed placeholder pending a real per-profile parameter editor. ComfyUI additionally requires a
 * real, pre-existing `workflow_id` (an asset that must already exist in Assets/workflow) that
 * Workbench has no way to supply safely, so it is rejected instead of faked.
 */
export async function build_generation_request(
  input: GenerationDraftInput,
  request_id: Uuid,
): Promise<ImageGenerationRequest> {
  return build_provider_request(input, request_id, await compute_generation_anchor(request_id));
}

/** The same construction against an anchor the caller already owns: an automatic request is
 * anchored to its live `GenerationSession`, never to a freshly minted placeholder. */
export function build_provider_request(
  input: GenerationDraftInput,
  request_id: Uuid,
  generation_anchor: string,
): ImageGenerationRequest {
  const base = {
    request_id,
    generation_anchor,
    prompt: input.positive_prompt,
    output_count: input.image_count,
    ...(input.negative_prompt.trim() ? { negative_prompt: input.negative_prompt } : {}),
  };

  switch (input.provider_id) {
    case "sd_webui":
      return {
        provider_id: "sd_webui",
        ...base,
        mode: "txt2img",
        model_id: input.model_id ?? "default",
        sampler: "euler_a",
        scheduler: "normal",
        width: 512,
        height: 512,
        steps: 20,
        cfg_scale: 7,
      };
    case "novelai":
      return {
        provider_id: "novelai",
        ...base,
        model_id: input.model_id ?? "nai-diffusion-4-5-full",
        sampler: "k_euler",
        width: 832,
        height: 1216,
        steps: 28,
        scale: 5,
        cfg_rescale: 0,
        noise_schedule: "native",
        quality_toggle: true,
        undesired_content_preset: "none",
        smea: false,
        dyn: false,
        ...(input.references.length > 0
          ? {
              vibe_references: input.references.slice(0, 4).map((reference) => ({
                asset_id: reference.asset_id,
                strength: 0.6,
                information_extracted: 1,
              })),
            }
          : {}),
      };
    case "openai_image": {
      const has_references = input.references.length > 0;
      return {
        provider_id: "openai_image",
        ...base,
        mode: has_references ? "edit" : "generate",
        model_id: enum_model_id(OPENAI_IMAGE_MODEL_IDS, input.model_id, "gpt-image-1"),
        size: "auto",
        quality: "auto",
        background: "auto",
        output_format: "png",
        input_asset_ids: has_references
          ? input.references.map((reference) => reference.asset_id)
          : [],
      };
    }
    case "google_image":
      return {
        provider_id: "google_image",
        ...base,
        model_id: enum_model_id(GOOGLE_IMAGE_MODEL_IDS, input.model_id, "gemini-2.5-flash-image"),
        reference_asset_ids: input.references.slice(0, 14).map((reference) => reference.asset_id),
        aspect_ratio: "1:1",
        image_size: "1K",
        output_mime_type: "image/png",
      };
    case "comfyui":
      throw new UnsupportedProviderError(input.provider_id);
  }
}
