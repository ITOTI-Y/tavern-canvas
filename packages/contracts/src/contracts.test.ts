import { describe, expect, it } from "vitest";

import {
  BaseImageGenerationRequestSchema,
  CapabilityMatrixSchema,
  CapabilityStatusSchema,
  GatewayCapabilitiesResponseSchema,
  GatewayCreateJobRequestSchema,
  GatewayJobEventSchema,
  GatewayJobResponseSchema,
  GatewayLimitsSchema,
  GatewayProviderCapabilitiesSchema,
  GatewaySettingsSchema,
  GenerationStateSchema,
  ImageGenerationRequestSchema,
  PROTOCOL_VERSION,
  ProviderCapabilitySchema,
  ProviderErrorCodeSchema,
  ProviderErrorSchema,
  ProviderIdSchema,
  RequestImageArgumentsSchema,
  Sha256Schema,
  TavernCanvasMessageMetadataSchema,
  TavernCanvasSettingsSchema,
  UuidSchema,
} from "./index.js";

const generation_anchor = "a".repeat(64);
const source_anchor = "0".repeat(64);
const request_id = "550e8400-e29b-41d4-a716-446655440000";
const second_request_id = "6ba7b810-9dad-41d1-80b4-00c04fd430c8";
const image_id = "01906f4e-5f1c-7a2a-8d73-cc3a51abf1ed";
const second_image_id = "f47ac10b-58cc-4372-a567-0e02b2c3d479";
const job_id = "67e55044-10b1-426f-9247-bb680e5fe0c8";
const occurred_at = "2026-08-05T09:30:00.000Z";

const base_provider_request = {
  provider_id: "sd_webui" as const,
  request_id,
  generation_anchor,
  prompt: "A rainy alley at night",
  output_count: 2,
};

const provider_request = {
  ...base_provider_request,
  mode: "txt2img" as const,
  model_id: "sdxl-base",
  sampler: "DPM++ 2M",
  scheduler: "Karras",
  width: 1024,
  height: 1024,
  steps: 30,
  cfg_scale: 7,
};

const provider_requests = [
  ["sd_webui", provider_request],
  [
    "novelai",
    {
      provider_id: "novelai",
      request_id,
      generation_anchor,
      prompt: "A rainy alley at night",
      output_count: 2,
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
    },
  ],
  [
    "comfyui",
    {
      provider_id: "comfyui",
      request_id,
      generation_anchor,
      prompt: "A rainy alley at night",
      output_count: 2,
      workflow_id: image_id,
      placeholder_values: { cfg: 7 },
      input_asset_bindings: {},
      output_node_ids: ["9"],
    },
  ],
  [
    "openai_image",
    {
      provider_id: "openai_image",
      request_id,
      generation_anchor,
      prompt: "A rainy alley at night",
      output_count: 2,
      mode: "generate",
      model_id: "gpt-image-1",
      size: "1024x1024",
      quality: "high",
      background: "opaque",
      output_format: "png",
      input_asset_ids: [],
    },
  ],
  [
    "google_image",
    {
      provider_id: "google_image",
      request_id,
      generation_anchor,
      prompt: "A rainy alley at night",
      output_count: 2,
      model_id: "gemini-2.5-flash-image",
      reference_asset_ids: [],
      aspect_ratio: "1:1",
      image_size: "1K",
      output_mime_type: "image/png",
    },
  ],
] as const;

const job_response = {
  protocol_version: "1.0" as const,
  job_id,
  request_id,
  provider_id: "sd_webui" as const,
  state: "running" as const,
};

describe("runtime identifiers", () => {
  it("accepts lowercase RFC 4122 UUIDs with valid version and variant bits", () => {
    expect(UuidSchema.parse(request_id)).toBe(request_id);
    expect(UuidSchema.parse(image_id)).toBe(image_id);
  });

  it.each([
    "not-a-uuid",
    "550E8400-E29B-41D4-A716-446655440000",
    "550e8400-e29b-01d4-a716-446655440000",
    "550e8400-e29b-41d4-7716-446655440000",
  ])("rejects invalid or non-lowercase UUID %s", (value) => {
    expect(UuidSchema.safeParse(value).success).toBe(false);
  });

  it("accepts only lowercase hexadecimal SHA-256 values", () => {
    expect(Sha256Schema.parse(generation_anchor)).toBe(generation_anchor);
    expect(Sha256Schema.safeParse("A".repeat(64)).success).toBe(false);
    expect(Sha256Schema.safeParse("a".repeat(63)).success).toBe(false);
  });
});

describe("RequestImageArgumentsSchema", () => {
  it.each([
    [0, 1],
    [12, 4],
  ])(
    "accepts context_turns=%i and image_count=%i at public bounds",
    (context_turns, image_count) => {
      const value = RequestImageArgumentsSchema.parse({
        generation_anchor,
        scene_description: "A rainy alley at night",
        context_turns,
        image_count,
      });

      expect(value).toEqual({
        generation_anchor,
        scene_description: "A rainy alley at night",
        context_turns,
        image_count,
      });
    },
  );
  it("accepts the minimal payload with optional counts omitted", () => {
    const value = RequestImageArgumentsSchema.parse({
      generation_anchor,
      scene_description: "A rainy alley at night",
    });

    expect(value).toEqual({
      generation_anchor,
      scene_description: "A rainy alley at night",
    });
  });

  it.each([
    ["context_turns", 0.5],
    ["image_count", 1.5],
  ])("rejects non-integer optional field %s", (field, value) => {
    expect(
      RequestImageArgumentsSchema.safeParse({
        generation_anchor,
        scene_description: "A rainy alley at night",
        [field]: value,
      }).success,
    ).toBe(false);
  });

  it("accepts a lowercase style preset UUID", () => {
    expect(
      RequestImageArgumentsSchema.parse({
        generation_anchor,
        scene_description: "A rainy alley at night",
        style_preset_id: request_id,
      }).style_preset_id,
    ).toBe(request_id);
  });

  it("rejects an uppercase style preset UUID", () => {
    expect(
      RequestImageArgumentsSchema.safeParse({
        generation_anchor,
        scene_description: "A rainy alley at night",
        style_preset_id: request_id.toUpperCase(),
      }).success,
    ).toBe(false);
  });

  it.each([
    ["context_turns", -1],
    ["context_turns", 13],
    ["image_count", 0],
    ["image_count", 5],
  ])("rejects %s outside its public bound", (field, value) => {
    expect(
      RequestImageArgumentsSchema.safeParse({
        generation_anchor,
        scene_description: "A rainy alley at night",
        [field]: value,
      }).success,
    ).toBe(false);
  });

  it.each([
    ["provider_url", "https://example.invalid"],
    ["base_url", "https://example.invalid"],
    ["headers", { Authorization: "Bearer secret" }],
    ["api_key", "secret"],
    ["authorization", "Bearer secret"],
    ["secret", "secret"],
    ["proxy", "http://127.0.0.1:8080"],
    ["unknown_option", true],
  ])("rejects client-controlled field %s", (field, value) => {
    expect(
      RequestImageArgumentsSchema.safeParse({
        generation_anchor,
        scene_description: "A rainy alley at night",
        [field]: value,
      }).success,
    ).toBe(false);
  });
});

describe("GenerationStateSchema", () => {
  it("exposes exactly the nine designed states", () => {
    expect(GenerationStateSchema.options).toEqual([
      "queued",
      "preparing",
      "submitting",
      "running",
      "completed",
      "failed",
      "cancelled",
      "attached",
      "orphaned",
    ]);
    expect(GenerationStateSchema.safeParse("pending").success).toBe(false);
  });
});

describe("TavernCanvasMessageMetadataSchema", () => {
  const metadata = {
    schema_version: 1 as const,
    generation_anchor,
    source_anchor,
    request_ids: [request_id, second_request_id],
    image_ids: [image_id, second_image_id],
  };

  it("accepts unique request and image references", () => {
    expect(TavernCanvasMessageMetadataSchema.parse(metadata)).toEqual(metadata);
  });

  it.each([
    ["request_ids", [request_id, request_id]],
    ["image_ids", [image_id, image_id]],
  ])("rejects duplicate IDs in %s", (field, duplicate_ids) => {
    const result = TavernCanvasMessageMetadataSchema.safeParse({
      ...metadata,
      [field]: duplicate_ids,
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.path).toEqual([field]);
    }
  });

  it("rejects unknown metadata keys", () => {
    expect(
      TavernCanvasMessageMetadataSchema.safeParse({
        ...metadata,
        raw_provider_payload: { secret: true },
      }).success,
    ).toBe(false);
  });
});

describe("provider boundary", () => {
  it("exposes the five stable provider discriminants", () => {
    expect(ProviderIdSchema.options).toEqual([
      "sd_webui",
      "novelai",
      "comfyui",
      "openai_image",
      "google_image",
    ]);
  });

  it("exposes the eight stable provider capabilities", () => {
    expect(ProviderCapabilitySchema.options).toEqual([
      "text_to_image",
      "image_to_image",
      "reference_image",
      "progress",
      "cancel",
      "seed",
      "workflow",
      "streaming_result",
    ]);
  });

  it("exposes only stable provider error codes", () => {
    expect(ProviderErrorCodeSchema.options).toEqual([
      "auth_failed",
      "rate_limited",
      "content_blocked",
      "invalid_request",
      "provider_unavailable",
      "timed_out",
      "cancelled",
      "malformed_response",
    ]);
  });

  it("accepts a stable provider error without upstream payloads", () => {
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
  });

  it.each([
    ["upstream_response", { error: "secret provider detail" }],
    ["request_body", { prompt: "private prompt" }],
    ["authorization", "Bearer secret"],
    ["message", "unstable upstream wording"],
  ])("rejects unstable provider error field %s", (field, value) => {
    expect(
      ProviderErrorSchema.safeParse({
        code: "provider_unavailable",
        retryable: true,
        [field]: value,
      }).success,
    ).toBe(false);
  });

  it.each(provider_requests)(
    "parses the strict %s request discriminant",
    (provider_id, request) => {
      expect(ImageGenerationRequestSchema.parse(request).provider_id).toBe(provider_id);
    },
  );

  it("rejects unknown discriminants and undeclared provider payload fields", () => {
    expect(
      ImageGenerationRequestSchema.safeParse({
        ...provider_request,
        provider_id: "unknown_provider",
      }).success,
    ).toBe(false);
    expect(
      ImageGenerationRequestSchema.safeParse({
        ...provider_request,
        base_url: "https://example.invalid",
      }).success,
    ).toBe(false);
    expect(
      ImageGenerationRequestSchema.safeParse({
        ...provider_request,
        input_asset_ids: [image_id],
      }).success,
    ).toBe(false);
  });
});

describe("Gateway protocol schemas", () => {
  const create_request = {
    protocol_version: "1.0" as const,
    request: provider_request,
  };
  const event = {
    protocol_version: "1.0" as const,
    job_id,
    sequence: 1,
    state: "running" as const,
    occurred_at,
  };
  const capabilities = {
    protocol_version: "1.0" as const,
    providers: [
      {
        provider_id: "sd_webui" as const,
        capabilities: ["text_to_image", "progress", "cancel"] as const,
      },
    ],
    limits: {
      max_concurrency: 4,
      max_image_count: 4,
      max_request_bytes: 1_000_000,
    },
  };

  it("accepts version 1.0 job creation, response, event, and capabilities", () => {
    expect(PROTOCOL_VERSION).toBe("1.0");
    expect(GatewayCreateJobRequestSchema.parse(create_request)).toEqual(create_request);
    expect(GatewayJobResponseSchema.parse(job_response)).toEqual(job_response);
    expect(GatewayJobEventSchema.parse(event)).toEqual(event);
    expect(GatewayCapabilitiesResponseSchema.parse(capabilities)).toEqual(capabilities);
  });

  it.each([
    [GatewayCreateJobRequestSchema, create_request],
    [GatewayJobResponseSchema, job_response],
    [GatewayJobEventSchema, event],
    [GatewayCapabilitiesResponseSchema, capabilities],
  ])("rejects protocol drift at every Gateway boundary", (schema, value) => {
    expect(schema.safeParse({ ...value, protocol_version: "1.1" }).success).toBe(false);
  });

  it("rejects unknown Gateway response keys", () => {
    expect(
      GatewayJobResponseSchema.safeParse({
        ...job_response,
        upstream_response: "private detail",
      }).success,
    ).toBe(false);
  });
});

describe("initial settings and capability contracts", () => {
  const settings = {
    schema_version: 1 as const,
    locale: "auto" as const,
    global_concurrency: 4,
    gateway: {
      endpoint: "http://192.168.1.10:8080",
      http_acknowledgments: {
        "http://192.168.1.10:8080": occurred_at,
      },
    },
  };

  it("accepts bounded settings and normalized Gateway origins", () => {
    expect(TavernCanvasSettingsSchema.parse(settings)).toEqual(settings);
  });

  it.each([0, 5])("rejects global concurrency %i", (global_concurrency) => {
    expect(
      TavernCanvasSettingsSchema.safeParse({
        ...settings,
        global_concurrency,
      }).success,
    ).toBe(false);
  });

  it.each([
    "HTTP://192.168.1.10:8080",
    "http://192.168.1.10:8080/extra",
    "http://EXAMPLE.com:80",
    "not-an-origin",
  ])("rejects non-normalized acknowledgment origin %s", (origin) => {
    expect(
      TavernCanvasSettingsSchema.safeParse({
        ...settings,
        gateway: {
          ...settings.gateway,
          http_acknowledgments: { [origin]: occurred_at },
        },
      }).success,
    ).toBe(false);
  });

  it("rejects unknown or secret-bearing settings", () => {
    expect(
      TavernCanvasSettingsSchema.safeParse({
        ...settings,
        gateway: { ...settings.gateway, token: "secret" },
      }).success,
    ).toBe(false);
  });

  it("accepts a strict serializable capability matrix", () => {
    const matrix = {
      generation_events: { available: true },
      tauri_chat_surface: {
        available: false,
        reason: "tauri_global_missing",
      },
    };

    expect(CapabilityMatrixSchema.parse(matrix)).toEqual(matrix);
    expect(
      CapabilityMatrixSchema.safeParse({
        generation_events: { available: true, probe: "private" },
      }).success,
    ).toBe(false);
  });
});

describe("strict public object boundaries", () => {
  const request_image_arguments = {
    generation_anchor,
    scene_description: "A rainy alley at night",
  };
  const message_metadata = {
    schema_version: 1 as const,
    generation_anchor,
    source_anchor,
    request_ids: [request_id],
    image_ids: [image_id],
  };
  const provider_error = {
    code: "provider_unavailable" as const,
    retryable: true,
  };
  const gateway_create_request = {
    protocol_version: "1.0" as const,
    request: provider_request,
  };
  const gateway_event = {
    protocol_version: "1.0" as const,
    job_id,
    sequence: 1,
    state: "running" as const,
    occurred_at,
  };
  const gateway_provider_capabilities = {
    provider_id: "sd_webui" as const,
    capabilities: ["text_to_image", "progress"] as const,
  };
  const gateway_limits = {
    max_concurrency: 4,
    max_image_count: 4,
    max_request_bytes: 1_000_000,
  };
  const gateway_capabilities = {
    protocol_version: "1.0" as const,
    providers: [gateway_provider_capabilities],
    limits: gateway_limits,
  };
  const gateway_settings = {
    endpoint: "http://192.168.1.10:8080",
    http_acknowledgments: {
      "http://192.168.1.10:8080": occurred_at,
    },
  };
  const tavern_canvas_settings = {
    schema_version: 1 as const,
    locale: "auto" as const,
    global_concurrency: 4,
    gateway: gateway_settings,
  };

  it.each([
    ["CapabilityStatusSchema", CapabilityStatusSchema, { available: true }],
    ["RequestImageArgumentsSchema", RequestImageArgumentsSchema, request_image_arguments],
    ["TavernCanvasMessageMetadataSchema", TavernCanvasMessageMetadataSchema, message_metadata],
    ["ProviderErrorSchema", ProviderErrorSchema, provider_error],
    ["BaseImageGenerationRequestSchema", BaseImageGenerationRequestSchema, base_provider_request],
    ["ImageGenerationRequestSchema", ImageGenerationRequestSchema, provider_request],
    ["GatewayCreateJobRequestSchema", GatewayCreateJobRequestSchema, gateway_create_request],
    ["GatewayJobResponseSchema", GatewayJobResponseSchema, job_response],
    ["GatewayJobEventSchema", GatewayJobEventSchema, gateway_event],
    [
      "GatewayProviderCapabilitiesSchema",
      GatewayProviderCapabilitiesSchema,
      gateway_provider_capabilities,
    ],
    ["GatewayLimitsSchema", GatewayLimitsSchema, gateway_limits],
    ["GatewayCapabilitiesResponseSchema", GatewayCapabilitiesResponseSchema, gateway_capabilities],
    ["GatewaySettingsSchema", GatewaySettingsSchema, gateway_settings],
    ["TavernCanvasSettingsSchema", TavernCanvasSettingsSchema, tavern_canvas_settings],
  ])("%s rejects an unknown top-level key", (_name, schema, value) => {
    expect(schema.safeParse(value).success).toBe(true);

    const result = schema.safeParse({ ...value, unexpected_field: true });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toContainEqual(
        expect.objectContaining({ code: "unrecognized_keys" }),
      );
    }
  });

  it.each([
    [
      "providers[]",
      {
        ...gateway_capabilities,
        providers: [{ ...gateway_provider_capabilities, unexpected_field: true }],
      },
    ],
    [
      "limits",
      {
        ...gateway_capabilities,
        limits: { ...gateway_limits, unexpected_field: true },
      },
    ],
  ])("Gateway capabilities reject an unknown key in %s", (_path, value) => {
    expect(GatewayCapabilitiesResponseSchema.safeParse(gateway_capabilities).success).toBe(true);

    const result = GatewayCapabilitiesResponseSchema.safeParse(value);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toContainEqual(
        expect.objectContaining({ code: "unrecognized_keys" }),
      );
    }
  });
});
