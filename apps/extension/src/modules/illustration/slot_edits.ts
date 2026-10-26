import {
  AssetIdSchema,
  NOVELAI_MAX_PIXELS,
  type AssetId,
  type NovelAiAugmentTool,
  type NovelAiRequest,
  type RequestId,
  type Sha256,
} from "@tavern-canvas/contracts";

import { build_novelai_inpaint_request } from "../media/inpaint_session.js";
import { novelai_default_parameters } from "../novelai/novelai_request_defaults.js";

export interface ImageSize {
  readonly width: number;
  readonly height: number;
}

export type NovelAiEmotion = NonNullable<
  Extract<NovelAiRequest, { readonly action: "augment" }>["emotion"]
>;

/** One quick edit of a slot image; its result becomes another image of the same slot. */
export type SlotEdit =
  | {
      readonly kind: "img2img";
      readonly image_id: string;
      readonly source: ImageSize;
      readonly positive_prompt: string;
      readonly negative_prompt: string;
      readonly strength: number;
    }
  | {
      readonly kind: "inpaint";
      readonly image_id: string;
      readonly source: ImageSize;
      /** White-on-black PNG at the source size. */
      readonly mask_png: Uint8Array;
      readonly positive_prompt: string;
      readonly negative_prompt: string;
      readonly strength: number;
    }
  | { readonly kind: "upscale"; readonly image_id: string }
  | {
      readonly kind: "augment";
      readonly image_id: string;
      readonly tool: NovelAiAugmentTool;
      readonly emotion?: NovelAiEmotion;
      readonly tool_prompt?: string;
      readonly defry?: number;
    };

const GRID = 64;

/** The largest 64-px aligned canvas with the source's aspect ratio that NovelAI accepts. */
export function fit_novelai_canvas(source: ImageSize): ImageSize {
  const scale = Math.min(1, Math.sqrt(NOVELAI_MAX_PIXELS / (source.width * source.height)));
  const align = (value: number): number =>
    Math.max(GRID, Math.floor((value * scale) / GRID) * GRID);
  return { width: align(source.width), height: align(source.height) };
}

export interface EditRequestContext {
  readonly request_id: RequestId;
  readonly generation_anchor: Sha256;
  readonly model_id: string;
}

export function build_novelai_edit_request(
  edit: Exclude<SlotEdit, { readonly kind: "inpaint" }>,
  context: EditRequestContext,
): NovelAiRequest;
export function build_novelai_edit_request(
  edit: Extract<SlotEdit, { readonly kind: "inpaint" }>,
  context: EditRequestContext & { readonly mask_asset_id: AssetId },
): NovelAiRequest;
export function build_novelai_edit_request(
  edit: SlotEdit,
  context: EditRequestContext & { readonly mask_asset_id?: AssetId },
): NovelAiRequest {
  const base = {
    provider_id: "novelai" as const,
    request_id: context.request_id,
    generation_anchor: context.generation_anchor,
  };
  const image_asset_id = AssetIdSchema.parse(edit.image_id);
  switch (edit.kind) {
    case "img2img":
      return {
        ...base,
        action: "img2img",
        prompt: edit.positive_prompt,
        ...(edit.negative_prompt.trim() ? { negative_prompt: edit.negative_prompt } : {}),
        output_count: 1,
        ...novelai_default_parameters(context.model_id),
        ...fit_novelai_canvas(edit.source),
        image_asset_id,
        strength: edit.strength,
        noise: 0,
      };
    case "inpaint": {
      if (context.mask_asset_id === undefined) {
        throw new TypeError("An inpaint edit needs its stored mask asset");
      }
      const canvas = fit_novelai_canvas(edit.source);
      return build_novelai_inpaint_request({
        request_id: context.request_id,
        generation_anchor: context.generation_anchor,
        image_asset_id,
        mask_asset_id: context.mask_asset_id,
        positive_prompt: edit.positive_prompt,
        ...(edit.negative_prompt.trim() ? { negative_prompt: edit.negative_prompt } : {}),
        strength: edit.strength,
        width: canvas.width,
        height: canvas.height,
        model_id: context.model_id,
      });
    }
    // NovelAI ignores `prompt` for upscale and Director tools, but the request schema requires one.
    case "upscale":
      return { ...base, action: "upscale", prompt: "upscale", output_count: 1, image_asset_id };
    case "augment":
      // Preparation replaces the size with the canvas Director tools expect.
      return {
        ...base,
        action: "augment",
        prompt: edit.tool,
        output_count: 1,
        tool: edit.tool,
        image_asset_id,
        width: 1024,
        height: 1024,
        ...(edit.emotion === undefined ? {} : { emotion: edit.emotion }),
        ...(edit.tool_prompt === undefined ? {} : { tool_prompt: edit.tool_prompt }),
        ...(edit.defry === undefined ? {} : { defry: edit.defry }),
      };
  }
}
