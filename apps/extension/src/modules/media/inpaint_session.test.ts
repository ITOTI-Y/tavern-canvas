import { describe, expect, it } from "vitest";

import {
  build_comfyui_inpaint_request,
  build_novelai_inpaint_request,
  InpaintDimensionError,
  InpaintMaskSession,
  MASKED,
  NOVELAI_INPAINT_MODEL_ID,
  UNMASKED,
  validate_mask_dimensions,
} from "./inpaint_session.js";

const REQUEST_ID = "11111111-1111-4111-8111-111111111111";
const GENERATION_ANCHOR = "a".repeat(64);
const ASSET_A = "33333333-3333-4333-8333-333333333333";
const ASSET_B = "44444444-4444-4444-8444-444444444444";

describe("InpaintMaskSession dimensions", () => {
  it("loads a real bitmap by allocating a mask matching its width and height", () => {
    const session = new InpaintMaskSession(64, 32);
    expect(session.width).toBe(64);
    expect(session.height).toBe(32);
    expect(session.mask).toHaveLength(64 * 32);
    expect([...new Set(session.mask)]).toEqual([UNMASKED]);
  });

  it("rejects non-positive-integer dimensions", () => {
    expect(() => new InpaintMaskSession(0, 32)).toThrow(InpaintDimensionError);
    expect(() => new InpaintMaskSession(64, -1)).toThrow(InpaintDimensionError);
    expect(() => new InpaintMaskSession(1.5, 32)).toThrow(InpaintDimensionError);
  });

  it("validates source/mask dimensions", () => {
    expect(() => validate_mask_dimensions(512, 512, 512, 512)).not.toThrow();
    expect(() => validate_mask_dimensions(512, 512, 256, 512)).toThrow(InpaintDimensionError);
    expect(() => validate_mask_dimensions(512, 512, 512, 256)).toThrow(InpaintDimensionError);
  });
});

describe("InpaintMaskSession brush/erase", () => {
  it("brush mode paints a masked disc at the stroke point", () => {
    const session = new InpaintMaskSession(20, 20);
    session.stroke([{ x: 10, y: 10 }], 6, "brush");
    const mask = session.mask;
    expect(mask[10 * 20 + 10]).toBe(MASKED);
    // A far corner outside the brush radius stays unmasked.
    expect(mask[0]).toBe(UNMASKED);
  });

  it("erase mode clears masked pixels back to unmasked", () => {
    const session = new InpaintMaskSession(20, 20);
    session.stroke([{ x: 10, y: 10 }], 10, "brush");
    expect(session.mask[10 * 20 + 10]).toBe(MASKED);
    session.stroke([{ x: 10, y: 10 }], 10, "erase");
    expect(session.mask[10 * 20 + 10]).toBe(UNMASKED);
  });

  it("interpolates dabs along a multi-point stroke so a fast drag leaves no gaps", () => {
    const session = new InpaintMaskSession(50, 10);
    session.stroke(
      [
        { x: 0, y: 5 },
        { x: 40, y: 5 },
      ],
      4,
      "brush",
    );
    // The midpoint of the drag must be masked even though it was never an explicit stroke point.
    expect(session.mask[5 * 50 + 20]).toBe(MASKED);
  });

  it("does nothing for an empty point list", () => {
    const session = new InpaintMaskSession(10, 10);
    session.stroke([], 4, "brush");
    expect([...new Set(session.mask)]).toEqual([UNMASKED]);
    expect(session.can_undo()).toBe(false);
  });
});

describe("InpaintMaskSession undo/redo/clear", () => {
  it("undo reverts the most recent stroke; redo re-applies it", () => {
    const session = new InpaintMaskSession(20, 20);
    session.stroke([{ x: 10, y: 10 }], 6, "brush");
    expect(session.can_undo()).toBe(true);
    expect(session.can_redo()).toBe(false);

    session.undo();
    expect(session.mask[10 * 20 + 10]).toBe(UNMASKED);
    expect(session.can_redo()).toBe(true);

    session.redo();
    expect(session.mask[10 * 20 + 10]).toBe(MASKED);
    expect(session.can_redo()).toBe(false);
  });

  it("a new stroke discards any redo branch", () => {
    const session = new InpaintMaskSession(20, 20);
    session.stroke([{ x: 5, y: 5 }], 4, "brush");
    session.undo();
    expect(session.can_redo()).toBe(true);

    session.stroke([{ x: 15, y: 15 }], 4, "brush");
    expect(session.can_redo()).toBe(false);
    expect(session.mask[5 * 20 + 5]).toBe(UNMASKED);
    expect(session.mask[15 * 20 + 15]).toBe(MASKED);
  });

  it("clear resets the mask to fully unmasked and is itself undoable", () => {
    const session = new InpaintMaskSession(20, 20);
    session.stroke([{ x: 10, y: 10 }], 6, "brush");
    session.clear();
    expect([...new Set(session.mask)]).toEqual([UNMASKED]);

    session.undo();
    expect(session.mask[10 * 20 + 10]).toBe(MASKED);
  });

  it("caps history at MAX_MASK_HISTORY entries", () => {
    const session = new InpaintMaskSession(10, 10);
    for (let index = 0; index < 30; index += 1) {
      session.stroke([{ x: index % 10, y: 0 }], 2, "brush");
    }
    let undo_count = 0;
    while (session.can_undo()) {
      session.undo();
      undo_count += 1;
    }
    expect(undo_count).toBeLessThan(30);
    expect(undo_count).toBeGreaterThan(0);
  });

  it("undo/redo on a fresh session with no strokes is a no-op", () => {
    const session = new InpaintMaskSession(10, 10);
    expect(session.can_undo()).toBe(false);
    session.undo();
    expect(session.can_redo()).toBe(false);
    session.redo();
    expect([...new Set(session.mask)]).toEqual([UNMASKED]);
  });
});

describe("InpaintMaskSession export", () => {
  it("export_binary_mask is always strictly 0/255", () => {
    const session = new InpaintMaskSession(30, 30);
    session.stroke([{ x: 15, y: 15 }], 10, "brush");
    const mask = session.export_binary_mask();
    expect([...new Set(mask)].every((value) => value === MASKED || value === UNMASKED)).toBe(true);
  });

  it("export_feathered_mask fades to zero beyond the given radius (ComfyUI)", () => {
    const session = new InpaintMaskSession(40, 40);
    session.stroke([{ x: 20, y: 20 }], 4, "brush");
    const feathered = session.export_feathered_mask(6);
    // A masked pixel stays fully opaque.
    expect(feathered[20 * 40 + 20]).toBe(MASKED);
    // A pixel far outside the brush + feather radius stays fully transparent.
    expect(feathered[0]).toBe(UNMASKED);
    // Somewhere in the feather band should be strictly between 0 and 255.
    const has_soft_edge = [...feathered].some((value) => value > 0 && value < MASKED);
    expect(has_soft_edge).toBe(true);
  });

  it("export_feathered_mask with radius 0 returns the unmodified binary mask", () => {
    const session = new InpaintMaskSession(20, 20);
    session.stroke([{ x: 10, y: 10 }], 4, "brush");
    expect(session.export_feathered_mask(0)).toEqual(session.export_binary_mask());
  });

  it("export_grid_aligned_mask quantizes into fully-on/off 8px blocks (NovelAI)", () => {
    const session = new InpaintMaskSession(16, 16);
    // Touch a single pixel inside the top-left 8x8 block.
    session.stroke([{ x: 1, y: 1 }], 1, "brush");
    const aligned = session.export_grid_aligned_mask(8);
    for (let y = 0; y < 8; y += 1) {
      for (let x = 0; x < 8; x += 1) {
        expect(aligned[y * 16 + x]).toBe(MASKED);
      }
    }
    // The other three 8x8 blocks stay fully unmasked.
    for (let y = 8; y < 16; y += 1) {
      for (let x = 8; x < 16; x += 1) {
        expect(aligned[y * 16 + x]).toBe(UNMASKED);
      }
    }
  });
});

describe("build_comfyui_inpaint_request", () => {
  it("submits source/mask asset IDs, prompts, and denoise strength via a dedicated workflow", () => {
    const request = build_comfyui_inpaint_request({
      request_id: REQUEST_ID,
      generation_anchor: GENERATION_ANCHOR,
      workflow_id: ASSET_A,
      source_asset_id: ASSET_A,
      mask_asset_id: ASSET_B,
      positive_prompt: "a cat",
      negative_prompt: "blurry",
      denoise_strength: 0.75,
    });

    expect(request.provider_id).toBe("comfyui");
    expect(request.prompt).toBe("a cat");
    expect(request.negative_prompt).toBe("blurry");
    expect(request.input_asset_bindings).toEqual({
      source_image: ASSET_A,
      mask_image: ASSET_B,
    });
    expect(request.placeholder_values.denoise).toBe(0.75);
    expect(request.workflow_id).toBe(ASSET_A);
  });
});

describe("build_novelai_inpaint_request", () => {
  it("submits asset IDs through the infill action on a dedicated inpainting model", () => {
    const request = build_novelai_inpaint_request({
      request_id: REQUEST_ID,
      generation_anchor: GENERATION_ANCHOR,
      image_asset_id: ASSET_A,
      mask_asset_id: ASSET_B,
      positive_prompt: "a cat",
      strength: 0.54,
      width: 1024,
      height: 1024,
    });

    expect(request.provider_id).toBe("novelai");
    expect(request.action).toBe("infill");
    expect(request.image_asset_id).toBe(ASSET_A);
    expect(request.mask_asset_id).toBe(ASSET_B);
    expect(request.inpaint_strength).toBe(0.54);
    expect(request.model_id).toBe(NOVELAI_INPAINT_MODEL_ID);
  });

  it("allows overriding the model_id while still defaulting to the dedicated inpaint model", () => {
    const default_request = build_novelai_inpaint_request({
      request_id: REQUEST_ID,
      generation_anchor: GENERATION_ANCHOR,
      image_asset_id: ASSET_A,
      mask_asset_id: ASSET_B,
      positive_prompt: "a cat",
      strength: 0.5,
      width: 1024,
      height: 1024,
    });
    const overridden_request = build_novelai_inpaint_request({
      request_id: REQUEST_ID,
      generation_anchor: GENERATION_ANCHOR,
      image_asset_id: ASSET_A,
      mask_asset_id: ASSET_B,
      positive_prompt: "a cat",
      strength: 0.5,
      width: 1024,
      height: 1024,
      model_id: "nai-diffusion-4-5-full",
    });

    expect(default_request.model_id).toBe(NOVELAI_INPAINT_MODEL_ID);
    expect(overridden_request.model_id).toBe("nai-diffusion-4-5-full");
  });
});
