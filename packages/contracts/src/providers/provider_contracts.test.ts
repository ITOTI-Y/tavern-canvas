import { describe, expect, it } from "vitest";

import {
  ComfyUiRequestSchema,
  GeneratedAssetSchema,
  GoogleImageRequestSchema,
  ImageGenerationRequestSchema,
  ImageGenerationResultSchema,
  NovelAiRequestSchema,
  OpenAiImageRequestSchema,
  ProviderErrorSchema,
  SdWebuiRequestSchema,
} from "../index.js";

const REQUEST_ID = "11111111-1111-4111-8111-111111111111";
const ASSET_ID = "33333333-3333-4333-8333-333333333333";
const GENERATION_ANCHOR = "a".repeat(64);

const common_request = {
  request_id: REQUEST_ID,
  generation_anchor: GENERATION_ANCHOR,
  prompt: "A rainy alley",
  output_count: 1,
} as const;

function sd_request(overrides: Record<string, unknown> = {}) {
  return {
    provider_id: "sd_webui",
    ...common_request,
    mode: "txt2img",
    model_id: "sdxl-base",
    sampler: "DPM++ 2M",
    scheduler: "Karras",
    width: 1024,
    height: 1024,
    steps: 30,
    cfg_scale: 7,
    ...overrides,
  };
}

function novelai_request(overrides: Record<string, unknown> = {}) {
  return {
    provider_id: "novelai",
    ...common_request,
    model_id: "nai-diffusion-4-full",
    sampler: "k_euler_ancestral",
    width: 1024,
    height: 1024,
    steps: 28,
    scale: 5,
    cfg_rescale: 0,
    noise_schedule: "native",
    quality_toggle: true,
    undesired_content_preset: "heavy",
    smea: false,
    dyn: false,
    ...overrides,
  };
}

function comfyui_request(overrides: Record<string, unknown> = {}) {
  return {
    provider_id: "comfyui",
    ...common_request,
    workflow_id: ASSET_ID,
    placeholder_values: { cfg: 7, enabled: true, label: "portrait" },
    input_asset_bindings: { reference_image: ASSET_ID },
    output_node_ids: ["9"],
    ...overrides,
  };
}

function openai_request(overrides: Record<string, unknown> = {}) {
  return {
    provider_id: "openai_image",
    ...common_request,
    mode: "generate",
    model_id: "gpt-image-1",
    size: "1024x1024",
    quality: "high",
    background: "opaque",
    output_format: "png",
    input_asset_ids: [],
    ...overrides,
  };
}

function google_request(overrides: Record<string, unknown> = {}) {
  return {
    provider_id: "google_image",
    ...common_request,
    model_id: "gemini-2.5-flash-image",
    reference_asset_ids: [],
    aspect_ratio: "1:1",
    image_size: "1K",
    output_mime_type: "image/png",
    ...overrides,
  };
}

const request_fixtures = [
  ["sd_webui", SdWebuiRequestSchema, sd_request],
  ["novelai", NovelAiRequestSchema, novelai_request],
  ["comfyui", ComfyUiRequestSchema, comfyui_request],
  ["openai_image", OpenAiImageRequestSchema, openai_request],
  ["google_image", GoogleImageRequestSchema, google_request],
] as const;

const forbidden_transport_fields = [
  "base_url",
  "api_key",
  "headers",
  "authorization",
  "proxy",
  "transport",
  "request_options",
] as const;

describe("provider request contracts", () => {
  it.each(request_fixtures)("accepts a legal %s request", (_, schema, fixture) => {
    expect(schema.parse(fixture())).toEqual(fixture());
    expect(ImageGenerationRequestSchema.parse(fixture())).toEqual(fixture());
  });

  for (const [provider_id, schema, fixture] of request_fixtures) {
    it.each(forbidden_transport_fields)(
      `${provider_id} rejects client-controlled %s`,
      (property_name) => {
        expect(() =>
          schema.parse({ ...fixture(), [property_name]: "client-controlled" }),
        ).toThrow();
      },
    );
  }

  it.each(request_fixtures)("bounds output count for %s", (_, schema, fixture) => {
    expect(schema.safeParse(fixture({ output_count: 1 })).success).toBe(true);
    expect(schema.safeParse(fixture({ output_count: 4 })).success).toBe(true);
    expect(schema.safeParse(fixture({ output_count: 0 })).success).toBe(false);
    expect(schema.safeParse(fixture({ output_count: 5 })).success).toBe(false);
  });

  it("bounds SD dimensions, steps, CFG, seed, and ControlNet references", () => {
    expect(
      SdWebuiRequestSchema.safeParse(
        sd_request({
          width: 64,
          height: 4096,
          steps: 1,
          cfg_scale: 0,
          seed: 0,
          controlnet: Array.from({ length: 4 }, () => ({
            asset_id: ASSET_ID,
            model_id: "controlnet-canny",
            module: "canny",
            weight: 1,
            guidance_start: 0,
            guidance_end: 1,
          })),
        }),
      ).success,
    ).toBe(true);
    for (const overrides of [
      { width: 63 },
      { width: 4097 },
      { width: 1001 },
      { height: 63 },
      { steps: 0 },
      { steps: 151 },
      { cfg_scale: -0.1 },
      { cfg_scale: 30.1 },
      { seed: -1 },
      { seed: 4_294_967_296 },
      {
        controlnet: Array.from({ length: 5 }, () => ({
          asset_id: ASSET_ID,
          model_id: "controlnet-canny",
          module: "canny",
          weight: 1,
          guidance_start: 0,
          guidance_end: 1,
        })),
      },
    ]) {
      expect(SdWebuiRequestSchema.safeParse(sd_request(overrides)).success).toBe(false);
    }
  });

  it("requires named img2img inputs and rejects raw script controls", () => {
    expect(
      SdWebuiRequestSchema.safeParse(
        sd_request({
          mode: "img2img",
          input_asset_id: ASSET_ID,
          denoise_strength: 0.5,
        }),
      ).success,
    ).toBe(true);
    expect(
      SdWebuiRequestSchema.safeParse(sd_request({ mode: "img2img", denoise_strength: 0.5 }))
        .success,
    ).toBe(false);
    expect(
      SdWebuiRequestSchema.safeParse(sd_request({ alwayson_scripts: { arbitrary: { args: [] } } }))
        .success,
    ).toBe(false);
    expect(SdWebuiRequestSchema.safeParse(sd_request({ script_args: [] })).success).toBe(false);
  });
  it("rejects img2img Hires fix with a hires_fix issue", () => {
    const result = SdWebuiRequestSchema.safeParse(
      sd_request({
        mode: "img2img",
        input_asset_id: ASSET_ID,
        denoise_strength: 0.55,
        hires_fix: {
          scale: 2,
          upscaler_id: "R-ESRGAN 4x+",
          steps: 12,
          denoise_strength: 0.35,
        },
      }),
    );

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toContainEqual(expect.objectContaining({ path: ["hires_fix"] }));
    }
  });

  it("bounds NovelAI dimensions, steps, scale, seed, vibes, and characters", () => {
    expect(
      NovelAiRequestSchema.safeParse(
        novelai_request({
          width: 64,
          height: 2048,
          steps: 1,
          scale: 0,
          seed: 4_294_967_295,
          vibe_references: Array.from({ length: 4 }, () => ({
            asset_id: ASSET_ID,
            strength: 1,
            information_extracted: 1,
          })),
          character_references: Array.from({ length: 6 }, (_, index) => ({
            asset_id: ASSET_ID,
            prompt: `character ${String(index)}`,
            strength: 1,
          })),
        }),
      ).success,
    ).toBe(true);
    for (const overrides of [
      { width: 65 },
      { height: 2112 },
      { steps: 0 },
      { steps: 51 },
      { scale: -0.1 },
      { scale: 30.1 },
      { cfg_rescale: 1.1 },
      { seed: -1 },
      {
        vibe_references: Array.from({ length: 5 }, () => ({
          asset_id: ASSET_ID,
          strength: 1,
          information_extracted: 1,
        })),
      },
      {
        character_references: Array.from({ length: 7 }, () => ({
          asset_id: ASSET_ID,
          prompt: "character",
          strength: 1,
        })),
      },
    ]) {
      expect(NovelAiRequestSchema.safeParse(novelai_request(overrides)).success).toBe(false);
    }
  });

  it("rejects per-character NovelAI negative prompts while preserving the top-level field", () => {
    const character_negative_prompt = {
      asset_id: ASSET_ID,
      prompt: "character",
      negative_prompt: "watermark",
      strength: 1,
    };

    expect(
      NovelAiRequestSchema.safeParse(
        novelai_request({ character_references: [character_negative_prompt] }),
      ).success,
    ).toBe(false);
    expect(
      NovelAiRequestSchema.safeParse(novelai_request({ negative_prompt: "avoid watermark" }))
        .success,
    ).toBe(true);
  });

  it("allows only typed stored ComfyUI workflow bindings", () => {
    expect(
      ComfyUiRequestSchema.safeParse(
        comfyui_request({ placeholder_values: { nested: { raw: true } } }),
      ).success,
    ).toBe(false);
    expect(ComfyUiRequestSchema.safeParse(comfyui_request({ workflow: { "1": {} } })).success).toBe(
      false,
    );
    expect(
      ComfyUiRequestSchema.safeParse(
        comfyui_request({ output_node_ids: Array.from({ length: 17 }, (_, i) => String(i)) }),
      ).success,
    ).toBe(false);
  });

  it("bounds OpenAI edit assets and compression", () => {
    expect(
      OpenAiImageRequestSchema.safeParse(
        openai_request({
          mode: "edit",
          input_asset_ids: Array.from({ length: 16 }, () => ASSET_ID),
          mask_asset_id: ASSET_ID,
          output_format: "webp",
          compression: 100,
        }),
      ).success,
    ).toBe(true);
    expect(
      OpenAiImageRequestSchema.safeParse(openai_request({ mode: "edit", input_asset_ids: [] }))
        .success,
    ).toBe(false);
    expect(
      OpenAiImageRequestSchema.safeParse(
        openai_request({
          mode: "edit",
          input_asset_ids: Array.from({ length: 17 }, () => ASSET_ID),
        }),
      ).success,
    ).toBe(false);
    expect(OpenAiImageRequestSchema.safeParse(openai_request({ compression: 101 })).success).toBe(
      false,
    );
  });

  it("bounds Google reference assets and rejects ambiguous legacy providers", () => {
    expect(
      GoogleImageRequestSchema.safeParse(
        google_request({ reference_asset_ids: Array.from({ length: 14 }, () => ASSET_ID) }),
      ).success,
    ).toBe(true);
    expect(
      GoogleImageRequestSchema.safeParse(
        google_request({ reference_asset_ids: Array.from({ length: 15 }, () => ASSET_ID) }),
      ).success,
    ).toBe(false);
    expect(
      ImageGenerationRequestSchema.safeParse({
        ...google_request(),
        provider_id: "banana",
      }).success,
    ).toBe(false);
    expect(
      ImageGenerationRequestSchema.safeParse({
        ...openai_request(),
        provider_id: "grok",
      }).success,
    ).toBe(false);
  });
});

describe("normalized provider results", () => {
  const asset = {
    asset_id: ASSET_ID,
    media_type: "image/png",
    byte_length: 1,
    sha256: "f".repeat(64),
    width: 1024,
    height: 1024,
    persisted_url: "https://assets.example/image.png",
  } as const;

  it("accepts bounded generated assets and result lists", () => {
    expect(GeneratedAssetSchema.parse(asset)).toEqual(asset);
    expect(
      ImageGenerationResultSchema.safeParse({
        request_id: REQUEST_ID,
        provider_id: "sd_webui",
        assets: Array.from({ length: 4 }, () => asset),
        seed: 4_294_967_295,
      }).success,
    ).toBe(true);
    expect(
      ImageGenerationResultSchema.safeParse({
        request_id: REQUEST_ID,
        provider_id: "sd_webui",
        assets: [],
      }).success,
    ).toBe(false);
    expect(
      ImageGenerationResultSchema.safeParse({
        request_id: REQUEST_ID,
        provider_id: "sd_webui",
        assets: Array.from({ length: 5 }, () => asset),
      }).success,
    ).toBe(false);
  });

  it("rejects oversized, unknown, and raw asset fields", () => {
    expect(GeneratedAssetSchema.safeParse({ ...asset, byte_length: 100_000_001 }).success).toBe(
      false,
    );
    expect(GeneratedAssetSchema.safeParse({ ...asset, bytes: "base64" }).success).toBe(false);
    expect(GeneratedAssetSchema.safeParse({ ...asset, upstream_response: "secret" }).success).toBe(
      false,
    );
  });

  it("keeps public provider errors metadata-only", () => {
    expect(
      ProviderErrorSchema.parse({
        code: "rate_limited",
        retryable: true,
        retry_after_ms: 1_000,
        status_code: 429,
      }),
    ).toEqual({
      code: "rate_limited",
      retryable: true,
      retry_after_ms: 1_000,
      status_code: 429,
    });
    for (const secret_field of [
      "message",
      "response_text",
      "prompt",
      "request_body",
      "authorization",
    ]) {
      expect(
        ProviderErrorSchema.safeParse({
          code: "invalid_request",
          retryable: false,
          [secret_field]: "secret upstream data",
        }).success,
      ).toBe(false);
    }
  });
});
