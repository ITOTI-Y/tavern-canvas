import { AssetIdSchema, NovelAiRequestSchema, type AssetId } from "@tavern-canvas/contracts";
import type { ProviderSourceAsset } from "@tavern-canvas/providers";
import { describe, expect, it, vi } from "vitest";

import {
  augment_size_for,
  director_canvas_for,
  type ImageSize,
  type NovelAiImageOperations,
} from "./novelai_image_operations.js";
import {
  NovelAiPreparationError,
  count_unencoded_vibes,
  prepare_novelai_request,
  type NovelAiPreparationDeps,
  type VibeEncodingKey,
} from "./novelai_request_preparation.js";

const SOURCE = AssetIdSchema.parse("33333333-3333-4333-8333-333333333333");
const MASK = AssetIdSchema.parse("44444444-4444-4444-8444-444444444444");

function fake_image(label: string, size: ImageSize): Uint8Array {
  return new TextEncoder().encode(JSON.stringify({ label, ...size }));
}

function read_fake(bytes: Uint8Array): { label: string } & ImageSize {
  return JSON.parse(new TextDecoder().decode(bytes)) as { label: string } & ImageSize;
}

const fake_operations: NovelAiImageOperations = {
  size: (bytes) => Promise.resolve(read_fake(bytes)),
  resize: (bytes, target) =>
    Promise.resolve(fake_image(`resized:${read_fake(bytes).label}`, target)),
  pad: (bytes, target) => Promise.resolve(fake_image(`padded:${read_fake(bytes).label}`, target)),
  binarize_mask: (bytes, target) =>
    Promise.resolve(
      fake_image(`mask:${read_fake(bytes).label}`, {
        width: target.width / 8,
        height: target.height / 8,
      }),
    ),
};

function harness(sources: Record<string, Uint8Array>) {
  const stored = new Map<AssetId, Uint8Array>();
  const cache = new Map<string, string>();
  const encode_vibe = vi.fn((_image: Uint8Array, model_id: string, information_extracted: number) =>
    Promise.resolve(btoa(`${model_id}|${String(information_extracted)}`)),
  );
  let next = 0;
  const deps: NovelAiPreparationDeps = {
    assets: {
      read: (asset_id) => {
        const bytes = stored.get(asset_id) ?? sources[asset_id];
        if (bytes === undefined) {
          return Promise.reject(new Error(`missing ${asset_id}`));
        }
        const asset: ProviderSourceAsset = { asset_id, media_type: "image/png", bytes };
        return Promise.resolve(asset);
      },
    },
    image_operations: fake_operations,
    store_input: (bytes) => {
      next += 1;
      const id = AssetIdSchema.parse(`00000000-0000-4000-8000-${String(next).padStart(12, "0")}`);
      stored.set(id, bytes);
      return Promise.resolve(id);
    },
    vibe_cache: {
      get: (key: VibeEncodingKey) => Promise.resolve(cache.get(JSON.stringify(key)) ?? null),
      put: (key: VibeEncodingKey, encoding: string) => {
        cache.set(JSON.stringify(key), encoding);
        return Promise.resolve();
      },
    },
    encode_vibe,
    sha256: (bytes) => Promise.resolve(`sha:${read_fake(bytes).label}`),
  };
  return { deps, stored, encode_vibe };
}

function diffusion(overrides: Record<string, unknown>) {
  return NovelAiRequestSchema.parse({
    provider_id: "novelai",
    action: "generate",
    request_id: "11111111-1111-4111-8111-111111111111",
    generation_anchor: "a".repeat(64),
    prompt: "girl",
    output_count: 1,
    model_id: "nai-diffusion-4-5-full",
    sampler: "k_euler_ancestral",
    width: 832,
    height: 1216,
    steps: 23,
    scale: 5,
    cfg_rescale: 0,
    noise_schedule: "karras",
    quality_preset: "standard",
    undesired_content_preset: "heavy",
    smea: false,
    dyn: false,
    variety_plus: false,
    ...overrides,
  });
}

const signal = new AbortController().signal;
const vibe = { asset_id: SOURCE, strength: 0.6, information_extracted: 0.7 };

describe("prepare_novelai_request", () => {
  it("encodes a V4.5 vibe once and serves later requests from the cache", async () => {
    const { deps, encode_vibe } = harness({
      [SOURCE]: fake_image("cat", { width: 512, height: 512 }),
    });
    const request = diffusion({ vibe_references: [vibe] });

    const first = await prepare_novelai_request(deps, request, signal);
    const second = await prepare_novelai_request(deps, request, signal);

    expect(first).toMatchObject({
      vibe_references: [{ encoding: btoa("nai-diffusion-4-5-full|0.7") }],
    });
    expect(second).toEqual(first);
    expect(encode_vibe).toHaveBeenCalledTimes(1);
    expect(await count_unencoded_vibes(deps, request, signal)).toBe(0);
  });

  it("counts vibes that still need a billed encoding", async () => {
    const { deps } = harness({ [SOURCE]: fake_image("cat", { width: 512, height: 512 }) });
    expect(await count_unencoded_vibes(deps, diffusion({ vibe_references: [vibe] }), signal)).toBe(
      1,
    );
    expect(
      await count_unencoded_vibes(
        deps,
        diffusion({ model_id: "nai-diffusion-3", vibe_references: [vibe] }),
        signal,
      ),
    ).toBe(0);
  });

  it("rejects vibes on a model without vibe transfer", async () => {
    const { deps } = harness({ [SOURCE]: fake_image("cat", { width: 512, height: 512 }) });
    await expect(
      prepare_novelai_request(
        deps,
        diffusion({ model_id: "nai-diffusion-5-curated", vibe_references: [vibe] }),
        signal,
      ),
    ).rejects.toBeInstanceOf(NovelAiPreparationError);
  });

  it("pads raw V3 vibes to the 448 canvas", async () => {
    const { deps, stored } = harness({ [SOURCE]: fake_image("cat", { width: 512, height: 768 }) });
    const prepared = await prepare_novelai_request(
      deps,
      diffusion({ model_id: "nai-diffusion-3", vibe_references: [vibe] }),
      signal,
    );
    const asset_id =
      prepared.action === "generate" ? prepared.vibe_references?.[0]?.asset_id : undefined;
    expect(asset_id).not.toBe(SOURCE);
    expect(read_fake(stored.get(asset_id as AssetId) ?? new Uint8Array())).toMatchObject({
      label: "padded:cat",
      width: 448,
      height: 448,
    });
  });

  it("resizes an img2img source only when its size differs from the request", async () => {
    const matching = harness({ [SOURCE]: fake_image("photo", { width: 832, height: 1216 }) });
    const img2img = diffusion({
      action: "img2img",
      image_asset_id: SOURCE,
      strength: 0.6,
      noise: 0,
    });
    expect(await prepare_novelai_request(matching.deps, img2img, signal)).toMatchObject({
      image_asset_id: SOURCE,
    });

    const mismatched = harness({ [SOURCE]: fake_image("photo", { width: 1000, height: 1500 }) });
    const prepared = await prepare_novelai_request(mismatched.deps, img2img, signal);
    expect(prepared).not.toMatchObject({ image_asset_id: SOURCE });
  });

  it("binarises the infill mask at the latent size of the request", async () => {
    const { deps, stored } = harness({
      [SOURCE]: fake_image("photo", { width: 832, height: 1216 }),
      [MASK]: fake_image("brush", { width: 832, height: 1216 }),
    });
    const prepared = await prepare_novelai_request(
      deps,
      diffusion({
        action: "infill",
        image_asset_id: SOURCE,
        mask_asset_id: MASK,
        inpaint_strength: 1,
      }),
      signal,
    );
    const mask_id = prepared.action === "infill" ? prepared.mask_asset_id : MASK;
    expect(read_fake(stored.get(mask_id) ?? new Uint8Array())).toMatchObject({
      label: "mask:brush",
      width: 104,
      height: 152,
    });
  });

  it("pads character references to the director canvas closest to their aspect ratio", async () => {
    const { deps, stored } = harness({ [SOURCE]: fake_image("hero", { width: 600, height: 900 }) });
    const prepared = await prepare_novelai_request(
      deps,
      diffusion({
        character_references: [
          {
            asset_id: SOURCE,
            description: "character",
            strength: 1,
            fidelity: 1,
            information_extracted: 1,
          },
        ],
      }),
      signal,
    );
    const reference_id =
      prepared.action === "generate" ? prepared.character_references?.[0]?.asset_id : undefined;
    expect(read_fake(stored.get(reference_id as AssetId) ?? new Uint8Array())).toMatchObject({
      width: 1024,
      height: 1536,
    });
  });

  it("enlarges small Director tool inputs to about one megapixel", async () => {
    const { deps } = harness({ [SOURCE]: fake_image("sketch", { width: 512, height: 512 }) });
    const prepared = await prepare_novelai_request(
      deps,
      NovelAiRequestSchema.parse({
        provider_id: "novelai",
        action: "augment",
        tool: "lineart",
        request_id: "11111111-1111-4111-8111-111111111111",
        generation_anchor: "a".repeat(64),
        prompt: "sketch",
        output_count: 1,
        image_asset_id: SOURCE,
        width: 512,
        height: 512,
      }),
      signal,
    );
    expect(prepared).toMatchObject({ width: 1024, height: 1024 });
  });
});

describe("NovelAI canvas sizes", () => {
  it("chooses the director canvas by aspect ratio", () => {
    expect(director_canvas_for({ width: 1920, height: 1080 })).toEqual({
      width: 1536,
      height: 1024,
    });
    expect(director_canvas_for({ width: 1000, height: 1000 })).toEqual({
      width: 1472,
      height: 1472,
    });
  });

  it("keeps Director tool inputs between one and three megapixels", () => {
    expect(augment_size_for({ width: 832, height: 1216 })).toEqual({ width: 832, height: 1216 });
    const large = augment_size_for({ width: 4096, height: 4096 });
    expect(large.width * large.height).toBeLessThanOrEqual(3_145_728 - 2_000);
  });
});
