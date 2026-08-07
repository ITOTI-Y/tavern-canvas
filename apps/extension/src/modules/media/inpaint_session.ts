import {
  Sha256Schema,
  type AssetId,
  type ComfyUiRequest,
  type NovelAiRequest,
  type RequestId,
  type Sha256,
} from "@tavern-canvas/contracts";

export const MASKED = 255;
export const UNMASKED = 0;
export const MAX_MASK_HISTORY = 20;
export const NOVELAI_INPAINT_MODEL_ID = "nai-diffusion-4-5-curated-inpainting";

export class InpaintDimensionError extends TypeError {
  constructor(message: string) {
    super(message);
    this.name = "InpaintDimensionError";
  }
}

function validate_positive_integer(value: number, name: string): void {
  if (!Number.isInteger(value) || value <= 0) {
    throw new InpaintDimensionError(`${name} must be a positive integer, got ${String(value)}`);
  }
}

/**
 * Enforces that a mask buffer is pixel-for-pixel congruent with the source image it will be
 * submitted alongside -- every provider's inpaint endpoint rejects (or silently misbehaves on) a
 * size mismatch, so this fails fast client-side instead.
 */
export function validate_mask_dimensions(
  source_width: number,
  source_height: number,
  mask_width: number,
  mask_height: number,
): void {
  validate_positive_integer(source_width, "source_width");
  validate_positive_integer(source_height, "source_height");
  validate_positive_integer(mask_width, "mask_width");
  validate_positive_integer(mask_height, "mask_height");
  if (source_width !== mask_width || source_height !== mask_height) {
    throw new InpaintDimensionError(
      `Mask dimensions ${String(mask_width)}x${String(mask_height)} do not match source dimensions ${String(source_width)}x${String(source_height)}`,
    );
  }
}

export interface MaskPoint {
  readonly x: number;
  readonly y: number;
}

export type BrushMode = "brush" | "erase";

function stamp_circle(
  buffer: Uint8ClampedArray,
  width: number,
  height: number,
  center_x: number,
  center_y: number,
  radius: number,
  value: number,
): void {
  const min_x = Math.max(0, Math.floor(center_x - radius));
  const max_x = Math.min(width - 1, Math.ceil(center_x + radius));
  const min_y = Math.max(0, Math.floor(center_y - radius));
  const max_y = Math.min(height - 1, Math.ceil(center_y + radius));
  const radius_squared = radius * radius;
  for (let y = min_y; y <= max_y; y += 1) {
    for (let x = min_x; x <= max_x; x += 1) {
      const dx = x - center_x;
      const dy = y - center_y;
      if (dx * dx + dy * dy <= radius_squared) {
        buffer[y * width + x] = value;
      }
    }
  }
}

/**
 * A width/height-bound, single-channel binary mask buffer with brush/erase drawing, capped
 * linear undo/redo (ports legacy's snapshot-array history -- `MAX_MASK_HISTORY` matches both
 * legacy editors' `maxHistory = 20`), and provider-specific export post-processing. Kept free of
 * any canvas/DOM dependency so it is exhaustively unit-testable; `InpaintDialog.vue` owns the real
 * `<canvas>` and only ever calls into this class.
 */
export class InpaintMaskSession {
  readonly width: number;
  readonly height: number;
  #mask: Uint8ClampedArray;
  #history: Uint8ClampedArray[];
  #history_index: number;

  constructor(width: number, height: number) {
    validate_positive_integer(width, "width");
    validate_positive_integer(height, "height");
    this.width = width;
    this.height = height;
    this.#mask = new Uint8ClampedArray(width * height).fill(UNMASKED);
    this.#history = [this.#mask.slice()];
    this.#history_index = 0;
  }

  get mask(): Uint8ClampedArray {
    return this.#mask.slice();
  }

  can_undo(): boolean {
    return this.#history_index > 0;
  }

  can_redo(): boolean {
    return this.#history_index < this.#history.length - 1;
  }

  /**
   * Rasterizes a poly-line of circular dabs along `points`, interpolating extra dabs every
   * `brush_size / 4` pixels between consecutive points (ports legacy NovelAI editor's approach,
   * generalized to both providers) so a fast pointer move leaves no gaps. Commits one history
   * entry per stroke, not per dab.
   */
  stroke(points: readonly MaskPoint[], brush_size: number, mode: BrushMode): void {
    if (points.length === 0) {
      return;
    }
    validate_positive_integer(Math.round(brush_size), "brush_size");
    const value = mode === "brush" ? MASKED : UNMASKED;
    const radius = brush_size / 2;
    const first_point = points[0];
    if (first_point === undefined) {
      return;
    }
    stamp_circle(this.#mask, this.width, this.height, first_point.x, first_point.y, radius, value);

    const step = Math.max(1, brush_size / 4);
    for (let index = 1; index < points.length; index += 1) {
      const from = points[index - 1];
      const to = points[index];
      if (from === undefined || to === undefined) {
        continue;
      }
      const distance = Math.hypot(to.x - from.x, to.y - from.y);
      const steps = Math.max(1, Math.ceil(distance / step));
      for (let step_index = 1; step_index <= steps; step_index += 1) {
        const ratio = step_index / steps;
        const x = from.x + (to.x - from.x) * ratio;
        const y = from.y + (to.y - from.y) * ratio;
        stamp_circle(this.#mask, this.width, this.height, x, y, radius, value);
      }
    }
    this.#commit();
  }

  clear(): void {
    this.#mask = new Uint8ClampedArray(this.width * this.height).fill(UNMASKED);
    this.#commit();
  }

  undo(): void {
    if (!this.can_undo()) {
      return;
    }
    this.#history_index -= 1;
    this.#mask = this.#history_entry(this.#history_index).slice();
  }

  redo(): void {
    if (!this.can_redo()) {
      return;
    }
    this.#history_index += 1;
    this.#mask = this.#history_entry(this.#history_index).slice();
  }

  #history_entry(index: number): Uint8ClampedArray {
    const entry = this.#history[index];
    if (entry === undefined) {
      throw new RangeError(`No mask history entry at index ${String(index)}`);
    }
    return entry;
  }

  #commit(): void {
    // Any redo branch abandoned by a new stroke is discarded, matching a standard linear
    // undo/redo stack (and both legacy editors' own history arrays).
    this.#history = [...this.#history.slice(0, this.#history_index + 1), this.#mask.slice()];
    if (this.#history.length > MAX_MASK_HISTORY) {
      this.#history = this.#history.slice(this.#history.length - MAX_MASK_HISTORY);
    }
    this.#history_index = this.#history.length - 1;
  }

  /** Already strictly binary (0/255) by construction -- no thresholding pass needed. */
  export_binary_mask(): Uint8ClampedArray {
    return this.#mask.slice();
  }

  /**
   * ComfyUI export: a distance-field feather (ports legacy `applyGaussianBlur`, itself not a real
   * Gaussian -- for every unmasked pixel within `radius` of a masked one, alpha falls off linearly
   * with distance to the nearest masked pixel). `radius <= 0` returns the unmodified binary mask.
   */
  export_feathered_mask(radius: number): Uint8ClampedArray {
    if (radius <= 0) {
      return this.export_binary_mask();
    }
    const source = this.#mask;
    const output = new Uint8ClampedArray(source.length);
    const radius_ceiling = Math.ceil(radius);
    for (let y = 0; y < this.height; y += 1) {
      for (let x = 0; x < this.width; x += 1) {
        const index = y * this.width + x;
        if (source[index] === MASKED) {
          output[index] = MASKED;
          continue;
        }
        let nearest_distance = Infinity;
        for (let dy = -radius_ceiling; dy <= radius_ceiling; dy += 1) {
          const ny = y + dy;
          if (ny < 0 || ny >= this.height) {
            continue;
          }
          for (let dx = -radius_ceiling; dx <= radius_ceiling; dx += 1) {
            const nx = x + dx;
            if (nx < 0 || nx >= this.width) {
              continue;
            }
            if (source[ny * this.width + nx] !== MASKED) {
              continue;
            }
            const distance = Math.hypot(dx, dy);
            if (distance < nearest_distance) {
              nearest_distance = distance;
            }
          }
        }
        output[index] =
          nearest_distance <= radius
            ? Math.round(MASKED * (1 - nearest_distance / radius))
            : UNMASKED;
      }
    }
    return output;
  }

  /**
   * NovelAI export: quantizes the mask into `grid_size`-px blocks (ports legacy
   * `applyGridAlignment`) -- any block containing at least one masked pixel becomes fully masked,
   * guaranteeing every mask boundary lands on a latent-pixel boundary (NAI's VAE operates at 8px
   * granularity).
   */
  export_grid_aligned_mask(grid_size = 8): Uint8ClampedArray {
    validate_positive_integer(grid_size, "grid_size");
    const source = this.#mask;
    const output = new Uint8ClampedArray(source.length);
    for (let block_y = 0; block_y < this.height; block_y += grid_size) {
      for (let block_x = 0; block_x < this.width; block_x += grid_size) {
        let touched = false;
        const max_y = Math.min(block_y + grid_size, this.height);
        const max_x = Math.min(block_x + grid_size, this.width);
        for (let y = block_y; y < max_y && !touched; y += 1) {
          for (let x = block_x; x < max_x; x += 1) {
            if (source[y * this.width + x] === MASKED) {
              touched = true;
              break;
            }
          }
        }
        if (touched) {
          for (let y = block_y; y < max_y; y += 1) {
            for (let x = block_x; x < max_x; x += 1) {
              output[y * this.width + x] = MASKED;
            }
          }
        }
      }
    }
    return output;
  }
}

// ---------------------------------------------------------------------------
// Provider submission request builders (inpaint.comfyui_submit / inpaint.novelai_submit)
// ---------------------------------------------------------------------------

export interface ComfyUiInpaintInput {
  readonly request_id: RequestId;
  readonly generation_anchor: Sha256;
  readonly workflow_id: AssetId;
  readonly source_asset_id: AssetId;
  readonly mask_asset_id: AssetId;
  readonly positive_prompt: string;
  readonly negative_prompt?: string;
  readonly denoise_strength: number;
  readonly output_count?: number;
}

/**
 * Uploads original+mask to ComfyUI, submitting through a dedicated edit workflow preset
 * (`workflow_id`), positive/negative prompt, and denoise strength -- entirely representable in the
 * existing `ComfyUiRequestSchema` via `input_asset_bindings`' generic name->asset map and
 * `placeholder_values`' generic text-substitution map, so no packages/contracts change was needed
 * for this provider (unlike NovelAI -- see `build_novelai_inpaint_request`).
 */
export function build_comfyui_inpaint_request(input: ComfyUiInpaintInput): ComfyUiRequest {
  return {
    provider_id: "comfyui",
    request_id: input.request_id,
    generation_anchor: input.generation_anchor,
    prompt: input.positive_prompt,
    ...(input.negative_prompt === undefined ? {} : { negative_prompt: input.negative_prompt }),
    output_count: input.output_count ?? 1,
    workflow_id: input.workflow_id,
    placeholder_values: { denoise: input.denoise_strength },
    input_asset_bindings: {
      source_image: input.source_asset_id,
      mask_image: input.mask_asset_id,
    },
    output_node_ids: ["output"],
  };
}

export interface NovelAiInpaintInput {
  readonly request_id: RequestId;
  readonly generation_anchor: Sha256;
  readonly image_asset_id: AssetId;
  readonly mask_asset_id: AssetId;
  readonly positive_prompt: string;
  readonly negative_prompt?: string;
  readonly strength: number;
  readonly width: number;
  readonly height: number;
  readonly seed?: number;
  readonly model_id?: string;
}

/**
 * 8px-grid-aligned mask (`InpaintMaskSession.export_grid_aligned_mask`), dedicated NovelAI
 * inpainting model, always issued as a direct API call (never routed through the user's normal
 * generation-mode setting, matching legacy). Uses `action: "infill"` plus the `image_asset_id`/
 * `mask_asset_id`/`inpaint_strength` fields added to `NovelAiRequestSchema` for this task, since
 * the base contract had no inpaint hook at all.
 */
export function build_novelai_inpaint_request(input: NovelAiInpaintInput): NovelAiRequest {
  return {
    provider_id: "novelai",
    request_id: input.request_id,
    generation_anchor: input.generation_anchor,
    prompt: input.positive_prompt,
    ...(input.negative_prompt === undefined ? {} : { negative_prompt: input.negative_prompt }),
    output_count: 1,
    model_id: input.model_id ?? NOVELAI_INPAINT_MODEL_ID,
    sampler: "k_euler_ancestral",
    width: input.width,
    height: input.height,
    steps: 28,
    scale: 5,
    cfg_rescale: 0,
    noise_schedule: "native",
    ...(input.seed === undefined ? {} : { seed: input.seed }),
    quality_toggle: true,
    undesired_content_preset: "heavy",
    smea: false,
    dyn: false,
    action: "infill",
    image_asset_id: input.image_asset_id,
    mask_asset_id: input.mask_asset_id,
    inpaint_strength: input.strength,
  };
}

export function assert_sha256(value: string): Sha256 {
  return Sha256Schema.parse(value);
}
