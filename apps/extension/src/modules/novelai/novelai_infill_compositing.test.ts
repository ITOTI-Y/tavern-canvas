import { AssetIdSchema, NovelAiRequestSchema } from "@tavern-canvas/contracts";
import type { ProviderOutputAsset } from "@tavern-canvas/providers";
import { describe, expect, it, vi } from "vitest";

import {
  blend_pixels,
  blur_coverage,
  dilate_mask,
  feather_infill_mask,
  upscale_mask,
  type LatentMask,
} from "./novelai_infill_compositing.js";
import { composite_novelai_infill } from "./novelai_infill_output.js";
import { sha256_hex } from "./novelai_storage.js";

function square_mask(size: number, from: number, to: number): LatentMask {
  const values = new Uint8Array(size * size);
  for (let y = from; y < to; y += 1) {
    for (let x = from; x < to; x += 1) {
      values[y * size + x] = 255;
    }
  }
  return { values, width: size, height: size };
}

describe("infill mask feathering", () => {
  it("grows the masked region by the dilation radius", () => {
    const grown = dilate_mask(square_mask(10, 4, 6), 2);
    expect(grown.values[2 * 10 + 2]).toBe(255);
    expect(grown.values[1 * 10 + 1]).toBe(0);
  });

  it("upscales coverage bilinearly", () => {
    const coverage = upscale_mask(square_mask(2, 0, 1), 4, 4);
    expect(coverage[0]).toBeCloseTo(1);
    expect(coverage[15]).toBeCloseTo(0);
    expect(coverage[1]).toBeGreaterThan(coverage[2] ?? 1);
  });

  it("softens edges without changing the total coverage away from the borders", () => {
    const coverage = new Float32Array(20 * 20);
    for (let y = 0; y < 20; y += 1) {
      for (let x = 10; x < 20; x += 1) {
        coverage[y * 20 + x] = 1;
      }
    }
    const blurred = blur_coverage(coverage, 20, 20, 2, 2);
    const row = Array.from(blurred.slice(10 * 20, 11 * 20));
    expect(row[0]).toBeCloseTo(0);
    expect(row[19]).toBeCloseTo(1);
    expect(row[10]).toBeGreaterThan(0.2);
    expect(row[10]).toBeLessThan(0.8);
  });

  it("keeps the inside fully generated and the far outside fully original", () => {
    const weight = feather_infill_mask(square_mask(32, 8, 24), 256, 256);
    expect(weight[128 * 256 + 128]).toBeCloseTo(1);
    expect(weight[2 * 256 + 2]).toBeCloseTo(0);
    const edge = weight[128 * 256 + 32] ?? 0;
    expect(edge).toBeGreaterThan(0);
    expect(edge).toBeLessThan(1);
  });

  it("blends source and generated pixels by weight", () => {
    const original = new Uint8ClampedArray([0, 0, 0, 255, 100, 100, 100, 255, 0, 0, 0, 255]);
    const generated = new Uint8ClampedArray([
      200, 200, 200, 255, 200, 200, 200, 255, 200, 0, 0, 255,
    ]);
    const blended = blend_pixels(original, generated, new Float32Array([0, 1, 0.5]));
    expect(Array.from(blended)).toEqual([0, 0, 0, 255, 200, 200, 200, 255, 100, 0, 0, 255]);
  });
});

describe("composite_novelai_infill", () => {
  it("composites every output over the source and rehashes the result", async () => {
    const source = AssetIdSchema.parse("33333333-3333-4333-8333-333333333333");
    const mask = AssetIdSchema.parse("44444444-4444-4444-8444-444444444444");
    const request = NovelAiRequestSchema.parse({
      provider_id: "novelai",
      action: "infill",
      request_id: "11111111-1111-4111-8111-111111111111",
      generation_anchor: "a".repeat(64),
      prompt: "cup",
      output_count: 1,
      model_id: "nai-diffusion-5-curated",
      sampler: "k_euler_ancestral",
      width: 832,
      height: 1216,
      steps: 23,
      scale: 7,
      cfg_rescale: 0,
      noise_schedule: "karras",
      quality_preset: "standard",
      undesired_content_preset: "heavy",
      smea: false,
      dyn: false,
      variety_plus: false,
      image_asset_id: source,
      mask_asset_id: mask,
      inpaint_strength: 1,
    });
    if (request.action !== "infill") {
      throw new Error("expected an infill request");
    }
    const composite = vi.fn(() => Promise.resolve(new Uint8Array([7, 7, 7])));
    const output: ProviderOutputAsset = {
      asset: {
        asset_id: AssetIdSchema.parse("55555555-5555-4555-8555-555555555555"),
        media_type: "image/png",
        byte_length: 1,
        sha256: "0".repeat(64),
      },
      bytes: new Uint8Array([1]),
    };

    const [finished] = await composite_novelai_infill(
      {
        assets: {
          read: (asset_id) =>
            Promise.resolve({
              asset_id,
              media_type: "image/png",
              bytes: new Uint8Array([asset_id === source ? 2 : 3]),
            }),
        },
        image_operations: { composite_infill: composite },
      },
      request,
      [output],
      new AbortController().signal,
    );

    expect(composite).toHaveBeenCalledWith(
      new Uint8Array([2]),
      new Uint8Array([1]),
      new Uint8Array([3]),
    );
    expect(finished?.bytes).toEqual(new Uint8Array([7, 7, 7]));
    expect(finished?.asset).toMatchObject({
      byte_length: 3,
      sha256: await sha256_hex(new Uint8Array([7, 7, 7])),
    });
  });
});
