import type { AssetId, ImageGenerationRequest, ProviderId, Uuid } from "@tavern-canvas/contracts";

import {
  missing_required,
  request_loras,
  request_placeholder_values,
  WorkflowMappingError,
  type ComfyUiDefaults,
  type MappedWorkflow,
} from "../comfyui/workflow_mapping.js";
import {
  DEFAULT_NOVELAI_MODEL_ID,
  novelai_default_parameters,
} from "../novelai/novelai_request_defaults.js";

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
  readonly model_id?: string;
  /** The workflow a ComfyUI profile renders; required for that provider. */
  readonly comfyui?: ComfyUiDraft;
}

export interface ComfyUiDraft {
  readonly workflow_id: AssetId;
  readonly mapped: MappedWorkflow;
  readonly defaults: ComfyUiDefaults;
}

export class ComfyUiWorkflowMissingError extends Error {
  constructor() {
    super("The ComfyUI profile has no workflow; choose one in Settings > Providers");
    this.name = "ComfyUiWorkflowMissingError";
  }
}

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

/** Placeholder digest of the request id and submission time: a manual request has no chat `SourceContext` to anchor to. */
export async function compute_generation_anchor(request_id: Uuid): Promise<string> {
  const material = new TextEncoder().encode(`${request_id}:${Date.now().toString()}`);
  const digest = await crypto.subtle.digest("SHA-256", material);
  return to_hex(new Uint8Array(digest));
}

/** Provider-specific required fields use fixed placeholders. */
export async function build_generation_request(
  input: GenerationDraftInput,
  request_id: Uuid,
): Promise<ImageGenerationRequest> {
  return build_provider_request(input, request_id, await compute_generation_anchor(request_id));
}

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
        action: "generate",
        ...base,
        ...novelai_default_parameters(input.model_id ?? DEFAULT_NOVELAI_MODEL_ID),
        ...(input.references.length > 0
          ? {
              vibe_references: input.references.slice(0, 16).map((reference) => ({
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
    case "comfyui": {
      const comfyui = input.comfyui;
      if (comfyui === undefined) {
        throw new ComfyUiWorkflowMissingError();
      }
      const { mapping } = comfyui.mapped;
      const missing = missing_required(mapping);
      if (missing.length > 0) {
        throw new WorkflowMappingError(missing);
      }
      const { negative_prompt, ...without_negative } = base;
      const loras = request_loras(comfyui.mapped, comfyui.defaults);
      return {
        provider_id: "comfyui",
        ...(mapping.inputs.negative_prompt === undefined || negative_prompt === undefined
          ? without_negative
          : base),
        workflow_id: comfyui.workflow_id,
        placeholder_values: request_placeholder_values(comfyui.mapped, comfyui.defaults),
        input_asset_bindings: {},
        output_node_ids: [...mapping.output_node_ids],
        ...(loras === undefined ? {} : { loras: [...loras] }),
        ...(mapping.inputs.seed === undefined
          ? {}
          : { seed: crypto.getRandomValues(new Uint32Array(1))[0] ?? 0 }),
      };
    }
  }
}
