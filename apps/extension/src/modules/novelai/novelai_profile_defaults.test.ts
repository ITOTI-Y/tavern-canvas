import {
  AssetIdSchema,
  NovelAiGenerationDefaultsSchema,
  NovelAiRequestSchema,
  type NovelAiRequest,
} from "@tavern-canvas/contracts";
import { describe, expect, it, vi } from "vitest";

import { apply_novelai_defaults } from "./novelai_profile_defaults.js";

const VIBE_ID = "55555555-5555-4555-8555-555555555555";
const STORED = AssetIdSchema.parse("66666666-6666-4666-8666-666666666666");

function generate(model_id: string) {
  return NovelAiRequestSchema.parse({
    provider_id: "novelai",
    action: "generate",
    request_id: "11111111-1111-4111-8111-111111111111",
    generation_anchor: "a".repeat(64),
    prompt: "girl",
    output_count: 1,
    model_id,
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
  }) as Extract<NovelAiRequest, { readonly action: "generate" }>;
}

const DEFAULTS = NovelAiGenerationDefaultsSchema.parse({
  width: 1024,
  height: 1024,
  steps: 28,
  scale: 6,
  cfg_rescale: 0.2,
  sampler: "k_dpmpp_2m",
  noise_schedule: "exponential",
  quality_preset: "light",
  undesired_content_preset: "light",
  smea: false,
  dyn: false,
  variety_plus: true,
  vibe_asset_ids: [VIBE_ID],
});

function deps() {
  return {
    load_vibe: vi.fn(() =>
      Promise.resolve({
        image_bytes: new Uint8Array([1, 2, 3]),
        strength: 0.4,
        information_extracted: 0.8,
      }),
    ),
    store_input: vi.fn(() => Promise.resolve(STORED)),
  };
}

describe("apply_novelai_defaults", () => {
  it("applies saved parameters and stores vibe images as inputs", async () => {
    const fakes = deps();
    const request = await apply_novelai_defaults(
      generate("nai-diffusion-4-5-full"),
      DEFAULTS,
      fakes,
    );

    expect(request).toMatchObject({
      width: 1024,
      height: 1024,
      steps: 28,
      sampler: "k_dpmpp_2m",
      variety_plus: true,
      prompt: "girl",
      vibe_references: [{ asset_id: STORED, strength: 0.4, information_extracted: 0.8 }],
    });
    expect(fakes.load_vibe).toHaveBeenCalledWith(VIBE_ID);
    expect(NovelAiRequestSchema.safeParse(request).success).toBe(true);
  });

  it("skips vibes for a model without vibe transfer", async () => {
    const fakes = deps();
    const request = await apply_novelai_defaults(
      generate("nai-diffusion-5-curated"),
      DEFAULTS,
      fakes,
    );

    expect(request).not.toHaveProperty("vibe_references");
    expect(fakes.load_vibe).not.toHaveBeenCalled();
  });
});
