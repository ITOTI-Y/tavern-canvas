import { describe, expect, it } from "vitest";

import { parse_novelai_subscription } from "./novelai_account.js";
import {
  extract_novelai_model_ids,
  list_novelai_models,
  resolve_novelai_model,
} from "./novelai_models.js";
import { estimate_novelai_cost } from "./novelai_pricing.js";
import { NovelAiRequestSchema } from "./novelai.js";

const opus = parse_novelai_subscription({
  tier: 3,
  active: true,
  expiresAt: 1_795_683_665,
  trainingStepsLeft: { fixedTrainingStepsLeft: 10_000, purchasedTrainingSteps: 4_327 },
  usage: { percent: 97, purchasedPercent: 0, isNegative: false, timeUntilNextPercent: 7_888 },
});

function diffusion(overrides: Record<string, unknown>) {
  return NovelAiRequestSchema.parse({
    provider_id: "novelai",
    action: "generate",
    request_id: "11111111-1111-4111-8111-111111111111",
    generation_anchor: "a".repeat(64),
    prompt: "girl",
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
    ...overrides,
  });
}

describe("NovelAI model table", () => {
  it("resolves listed models with their published capabilities", () => {
    const v5 = resolve_novelai_model("nai-diffusion-5-curated");
    expect(v5).toMatchObject({
      confirmed: true,
      profile: {
        family: "v5",
        vibe_transfer: "unsupported",
        character_reference: false,
        max_characters: 32,
        inpainting_model_id: "nai-diffusion-4-5-curated-inpainting",
      },
    });
    expect(resolve_novelai_model("nai-diffusion-4-5-full")?.profile).toMatchObject({
      vibe_transfer: "encoded",
      character_reference: true,
      variety_sigma: 58,
    });
  });

  it("limits an unlisted model of a known family to text-to-image", () => {
    expect(resolve_novelai_model("nai-diffusion-5-1-full")).toMatchObject({
      confirmed: false,
      profile: {
        family: "v5",
        img2img: false,
        inpainting_model_id: null,
        vibe_transfer: "unsupported",
      },
    });
    expect(resolve_novelai_model("nai-diffusion-2")).toBeNull();
  });

  it("extracts drivable model ids from web client sources", () => {
    expect(
      extract_novelai_model_ids([
        'a="nai-diffusion-5-full",b="nai-diffusion-2",c="nai-diffusion-6-curated"',
        "nai-diffusion-5-full-medium-inpainting",
      ]),
    ).toEqual(["nai-diffusion-5-full", "nai-diffusion-5-full-medium-inpainting"]);
  });

  it("lists selectable models, appending published ids the table does not know", () => {
    const ids = list_novelai_models([
      "nai-diffusion-5-1-full",
      "nai-diffusion-5-1-full-inpainting",
    ]).map((model) => model.profile.model_id);
    expect(ids).toContain("nai-diffusion-5-curated");
    expect(ids).toContain("nai-diffusion-5-1-full");
    expect(ids).not.toContain("nai-diffusion-5-full-inpainting");
    expect(ids).not.toContain("nai-diffusion-5-1-full-inpainting");
  });
});

describe("NovelAI account status", () => {
  it("sums fixed and purchased Anlas and converts the expiry to ISO time", () => {
    expect(opus).toMatchObject({
      tier: "opus",
      anlas: 14_327,
      expires_at: "2026-11-26T09:01:05.000Z",
      usage: { is_negative: false },
    });
  });
});

describe("NovelAI cost estimate", () => {
  it("prices a V5 image with the 1.5 multiplier and grants one Opus free image", () => {
    const request = diffusion({ output_count: 2 });
    expect(estimate_novelai_cost(request, { account: null, unencoded_vibes: 0 })).toMatchObject({
      anlas: 52,
      per_image: 26,
      opus_free: false,
    });
    expect(estimate_novelai_cost(request, { account: opus, unencoded_vibes: 0 })).toMatchObject({
      anlas: 26,
      opus_free: true,
    });
  });

  it("withholds the free image when the V5 usage allowance is negative", () => {
    const exhausted =
      opus.usage === null ? opus : { ...opus, usage: { ...opus.usage, is_negative: true } };
    expect(
      estimate_novelai_cost(diffusion({}), { account: exhausted, unencoded_vibes: 0 }),
    ).toMatchObject({
      anlas: 26,
      opus_free: false,
    });
  });

  it("scales img2img by strength and charges character references and vibe encodings", () => {
    const base = {
      model_id: "nai-diffusion-4-5-full",
      width: 1024,
      height: 1024,
      steps: 28,
      scale: 5,
    };
    expect(
      estimate_novelai_cost(
        diffusion({
          ...base,
          action: "img2img",
          image_asset_id: "33333333-3333-4333-8333-333333333333",
          strength: 0.5,
          noise: 0,
        }),
        { account: null, unencoded_vibes: 0 },
      ).anlas,
    ).toBe(10);
    expect(
      estimate_novelai_cost(
        diffusion({
          ...base,
          character_references: [
            {
              asset_id: "33333333-3333-4333-8333-333333333333",
              description: "character",
              strength: 1,
              fidelity: 1,
              information_extracted: 1,
            },
          ],
        }),
        { account: opus, unencoded_vibes: 0 },
      ),
    ).toMatchObject({ anlas: 5, opus_free: true });
    expect(
      estimate_novelai_cost(
        diffusion({
          ...base,
          vibe_references: Array.from({ length: 5 }, () => ({
            asset_id: "33333333-3333-4333-8333-333333333333",
            strength: 0.2,
            information_extracted: 1,
          })),
        }),
        { account: opus, unencoded_vibes: 3 },
      ),
    ).toMatchObject({ anlas: 2 + 6, vibe_encoding: 6, opus_free: true });
  });

  it("rejects images above the per-image Anlas ceiling", () => {
    expect(
      estimate_novelai_cost(diffusion({ width: 2048, height: 1536, steps: 50 }), {
        account: null,
        unencoded_vibes: 0,
      }).anlas,
    ).toBeNull();
  });

  it("prices upscale by area and Director tools like a one-megapixel V3 image", () => {
    const tool = {
      provider_id: "novelai",
      request_id: "11111111-1111-4111-8111-111111111111",
      generation_anchor: "a".repeat(64),
      prompt: "girl",
      output_count: 1,
      image_asset_id: "33333333-3333-4333-8333-333333333333",
    };
    const upscale = NovelAiRequestSchema.parse({ ...tool, action: "upscale" });
    expect(
      estimate_novelai_cost(upscale, {
        account: opus,
        unencoded_vibes: 0,
        source_pixels: 832 * 1216,
      }).anlas,
    ).toBe(1);
    expect(
      estimate_novelai_cost(upscale, {
        account: opus,
        unencoded_vibes: 0,
        source_pixels: 1024 * 1536,
      }).anlas,
    ).toBeNull();
    const augment = (name: string) =>
      NovelAiRequestSchema.parse({
        ...tool,
        action: "augment",
        tool: name,
        width: 1024,
        height: 1024,
      });
    expect(
      estimate_novelai_cost(augment("lineart"), { account: opus, unencoded_vibes: 0 }).anlas,
    ).toBe(0);
    expect(
      estimate_novelai_cost(augment("lineart"), { account: null, unencoded_vibes: 0 }).anlas,
    ).toBe(20);
    expect(
      estimate_novelai_cost(augment("bg-removal"), { account: opus, unencoded_vibes: 0 }).anlas,
    ).toBe(65);
  });
});
