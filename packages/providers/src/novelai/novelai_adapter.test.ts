import { readFile } from "node:fs/promises";
import { deflateRawSync } from "node:zlib";

import {
  AssetIdSchema,
  NovelAiRequestSchema,
  type AssetId,
  type NovelAiRequest,
} from "@tavern-canvas/contracts";
import { describe, expect, it } from "vitest";

import type {
  ProviderAssetReader,
  ProviderLogSink,
  ProviderSourceAsset,
} from "../provider_adapter.js";
import { ProviderAdapterError } from "../provider_error.js";
import type {
  ProviderTransport,
  ProviderTransportOperation,
  ProviderTransportResponse,
} from "../provider_transport.js";
import type { RetryClock, RetryRandomSource } from "../retry_policy.js";
import {
  define_provider_contract_suite,
  type ProviderContractExpectation,
  type ProviderContractScenario,
} from "../testing/provider_contract_suite.js";
import { NovelAiAdapter } from "./novelai_adapter.js";
import { map_novelai_request } from "./novelai_mapping.js";
import { parse_novelai_response, type NovelAiExpectedOutput } from "./novelai_response.js";

const REQUEST_ID = "11111111-1111-4111-8111-111111111111";
const ASSET_ID = AssetIdSchema.parse("33333333-3333-4333-8333-333333333333");
const GENERATION_ANCHOR = "a".repeat(64);
const PNG_BASE64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";
const PNG_BYTES = base64_to_bytes(PNG_BASE64);

const request_fixture = await read_json_fixture(
  "../../../../tests/fixtures/providers/novelai/generate_request.json",
);
const response_fixture = await read_json_fixture(
  "../../../../tests/fixtures/providers/novelai/generate_response.json",
);
const zip_fixture = parse_entry_fixture(
  await read_json_fixture(
    "../../../../tests/fixtures/providers/novelai/generate_zip_response.json",
  ),
  "entries",
);
const multipart_fixture = parse_entry_fixture(
  await read_json_fixture(
    "../../../../tests/fixtures/providers/novelai/generate_multipart_response.json",
  ),
  "parts",
);
const response_bytes = new TextEncoder().encode(JSON.stringify(response_fixture));

const profile = {
  profile_id: "novelai-cloud",
  provider_id: "novelai",
  model_allowlist: ["nai-diffusion-4-5-full"],
  output_mime_type_allowlist: ["image/png", "image/webp"],
  max_response_bytes: 2_000_000,
  max_archive_entries: 8,
  max_input_asset_bytes: 20_000_000,
} as const;

const full_request = NovelAiRequestSchema.parse({
  provider_id: "novelai",
  action: "generate",
  request_id: REQUEST_ID,
  generation_anchor: GENERATION_ANCHOR,
  prompt: "fixture prompt",
  negative_prompt: "fixture negative prompt",
  output_count: 1,
  model_id: "nai-diffusion-4-5-full",
  sampler: "k_euler_ancestral",
  width: 1024,
  height: 1024,
  steps: 28,
  scale: 5,
  cfg_rescale: 0,
  noise_schedule: "karras",
  seed: 42,
  quality_preset: "standard",
  undesired_content_preset: "heavy",
  smea: false,
  dyn: false,
  variety_plus: false,
  characters: [{ prompt: "fixture character", negative_prompt: "fixture character negative" }],
  character_references: [
    {
      asset_id: ASSET_ID,
      description: "character",
      strength: 0.7,
      fidelity: 0.8,
      information_extracted: 1,
    },
  ],
});

const expected_full: NovelAiExpectedOutput = {
  request_id: full_request.request_id,
  output_count: 1,
  width: 1024,
  height: 1024,
  seed: 42,
};

function novelai_request(overrides: Record<string, unknown>): NovelAiRequest {
  return NovelAiRequestSchema.parse({
    ...full_request,
    character_references: undefined,
    ...overrides,
  });
}

function parameters_of(
  request: NovelAiRequest,
  assets: Map<AssetId, ProviderSourceAsset> = new Map(),
): Record<string, unknown> {
  const payload = map_novelai_request(request, assets);
  expect(payload.route).toBe("/ai/generate-image");
  return payload.body.parameters as Record<string, unknown>;
}

class ImmediateClock implements RetryClock {
  now(): number {
    return Date.parse("2026-08-05T09:30:00.000Z");
  }

  sleep(_delay_ms: number, signal: AbortSignal): Promise<void> {
    return signal.aborted
      ? Promise.reject(new DOMException("Aborted", "AbortError"))
      : Promise.resolve();
  }
}

class FixedRandom implements RetryRandomSource {
  next(): number {
    return 0.5;
  }
}

class ScriptedTransport implements ProviderTransport {
  readonly operations: ProviderTransportOperation[] = [];

  constructor(private readonly responses: (ProviderTransportResponse | Error)[]) {}

  execute(operation: ProviderTransportOperation): Promise<ProviderTransportResponse> {
    this.operations.push(operation);
    if (operation.signal.aborted) {
      return Promise.reject(new DOMException("Aborted", "AbortError"));
    }
    const response = this.responses.shift();
    if (response === undefined) {
      return Promise.reject(new Error("Scripted transport exhausted"));
    }
    return response instanceof Error ? Promise.reject(response) : Promise.resolve(response);
  }
}

class StaticAssetReader implements ProviderAssetReader {
  async read(asset_id: AssetId): Promise<ProviderSourceAsset> {
    expect(asset_id).toBe(ASSET_ID);
    return { asset_id, media_type: "image/png", bytes: PNG_BYTES };
  }
}

class RecordingLog implements ProviderLogSink {
  readonly records: unknown[] = [];

  write(record: unknown): void {
    this.records.push(record);
  }
}

function transport_response(
  status: number,
  body: Uint8Array = new Uint8Array(),
  content_type = "application/json",
): ProviderTransportResponse {
  return { status, headers: { "content-type": content_type }, body };
}

function contract_case(scenario: ProviderContractScenario) {
  const controller = new AbortController();
  const log = new RecordingLog();
  let request = full_request;
  let expectation: ProviderContractExpectation = { kind: "success", asset_count: 1 };
  let responses: (ProviderTransportResponse | Error)[] = [transport_response(201, response_bytes)];

  if (scenario === "multiple_images") {
    request = NovelAiRequestSchema.parse({ ...full_request, output_count: 2 });
    responses = [
      transport_response(
        201,
        new TextEncoder().encode(
          JSON.stringify({
            images: [
              { image: PNG_BASE64, index: 0, seed: 42 },
              { image: PNG_BASE64, index: 1, seed: 43 },
            ],
          }),
        ),
      ),
    ];
    expectation = { kind: "success", asset_count: 2 };
  } else if (scenario === "auth_failure") {
    responses = [transport_response(401)];
    expectation = { kind: "error", code: "auth_failed" };
  } else if (scenario === "content_rejection") {
    responses = [transport_response(451)];
    expectation = { kind: "error", code: "content_blocked" };
  } else if (scenario === "rate_limit") {
    responses = Array.from({ length: 3 }, () => transport_response(429));
    expectation = { kind: "error", code: "rate_limited" };
  } else if (scenario === "timeout") {
    responses = [new ProviderAdapterError({ code: "timed_out", retryable: false })];
    expectation = { kind: "error", code: "timed_out" };
  } else if (scenario === "cancellation") {
    controller.abort();
    responses = [];
    expectation = { kind: "error", code: "cancelled" };
  } else if (scenario === "malformed_response") {
    responses = [transport_response(201, new TextEncoder().encode("{}"))];
    expectation = { kind: "error", code: "malformed_response" };
  } else if (scenario === "unsupported_capability") {
    request = NovelAiRequestSchema.parse({ ...full_request, model_id: "nai-diffusion-3" });
    responses = [];
    expectation = { kind: "error", code: "invalid_request" };
  }

  return {
    adapter: new NovelAiAdapter({ clock: new ImmediateClock(), random: new FixedRandom() }),
    raw_profile: profile,
    context: {
      transport: new ScriptedTransport(responses),
      assets: new StaticAssetReader(),
      signal: controller.signal,
      log,
    },
    request,
    expectation,
    secret_markers: [request.prompt, "private upstream detail"],
    log_records: () => log.records,
  };
}

define_provider_contract_suite("NovelAI", contract_case);
describe("NovelAI request bounds", () => {
  const second_asset_id = AssetIdSchema.parse("33333333-3333-4333-8333-333333333334");
  const asset_bytes = new Uint8Array(6);

  it("rejects distinct individually legal assets when their aggregate exceeds the profile budget", async () => {
    const request = NovelAiRequestSchema.parse({
      ...full_request,
      action: "img2img",
      image_asset_id: ASSET_ID,
      strength: 0.6,
      noise: 0,
      character_references: [
        {
          asset_id: second_asset_id,
          description: "style",
          strength: 0.7,
          fidelity: 1,
          information_extracted: 1,
        },
      ],
    });
    const transport = new ScriptedTransport([]);
    const assets: ProviderAssetReader = {
      read: async (asset_id) => ({
        asset_id,
        media_type: "image/png",
        bytes: asset_bytes,
      }),
    };
    const bounded_profile = { ...profile, max_input_asset_bytes: 10 };

    await expect(
      new NovelAiAdapter({ clock: new ImmediateClock(), random: new FixedRandom() }).submit(
        {
          profile: bounded_profile,
          transport,
          assets,
          signal: new AbortController().signal,
          log: new RecordingLog(),
        },
        request,
      ),
    ).rejects.toBeInstanceOf(ProviderAdapterError);
    expect(transport.operations).toHaveLength(0);
  });

  it("counts a duplicated asset ID once in the aggregate budget", async () => {
    const transport = new ScriptedTransport([transport_response(201, response_bytes)]);
    const assets: ProviderAssetReader = {
      read: async (asset_id) => ({
        asset_id,
        media_type: "image/png",
        bytes: asset_bytes,
      }),
    };
    const bounded_profile = { ...profile, max_input_asset_bytes: 6 };

    await expect(
      new NovelAiAdapter({ clock: new ImmediateClock(), random: new FixedRandom() }).submit(
        {
          profile: bounded_profile,
          transport,
          assets,
          signal: new AbortController().signal,
          log: new RecordingLog(),
        },
        full_request,
      ),
    ).resolves.toMatchObject({ state: "completed" });
    expect(transport.operations).toHaveLength(1);
  });
});

describe("NovelAI mapping", () => {
  const assets = new Map<AssetId, ProviderSourceAsset>([
    [ASSET_ID, { asset_id: ASSET_ID, media_type: "image/png", bytes: PNG_BYTES }],
  ]);

  it("matches the recorded V4.5 generate payload", () => {
    expect(map_novelai_request(full_request, assets)).toEqual(request_fixture);
  });

  it("appends the model's quality tags and prefixes its undesired-content preset", () => {
    const parameters = parameters_of(novelai_request({}));
    const v4_prompt = parameters.v4_prompt as { caption: { base_caption: string } };
    expect(v4_prompt.caption.base_caption).toBe(
      "fixture prompt, very aesthetic, masterpiece, no text",
    );
    expect(parameters.negative_prompt).toBe(
      "nsfw, lowres, artistic error, film grain, scan artifacts, worst quality, bad quality, jpeg artifacts, very displeasing, chromatic aberration, dithering, halftone, screentone, multiple views, logo, too many watermarks, negative space, blank page, fixture negative prompt",
    );
  });

  it("omits the nsfw prefix for curated models and prompts that already mention nsfw", () => {
    const curated = parameters_of(novelai_request({ model_id: "nai-diffusion-4-5-curated" }));
    expect(curated.negative_prompt).not.toMatch(/^nsfw/u);
    const explicit = parameters_of(novelai_request({ prompt: "nsfw, fixture prompt" }));
    expect(explicit.negative_prompt).not.toMatch(/^nsfw/u);
  });

  it("keeps only the user negative prompt on V3 when the preset is none", () => {
    const parameters = parameters_of(
      novelai_request({
        model_id: "nai-diffusion-3",
        characters: undefined,
        undesired_content_preset: "none",
      }),
    );
    expect(parameters.negative_prompt).toBe("fixture negative prompt");
    expect(parameters).not.toHaveProperty("v4_prompt");
  });

  it("snaps V4.5 character positions to the 5x5 grid and keeps V5 positions free", () => {
    const characters = [{ prompt: "girl", center: { x: 0.22, y: 0.81 } }];
    const grid = parameters_of(novelai_request({ characters }));
    expect(grid.v4_prompt).toMatchObject({
      caption: { char_captions: [{ char_caption: "girl", centers: [{ x: 0.3, y: 0.9 }] }] },
      use_coords: true,
    });
    const free = parameters_of(novelai_request({ model_id: "nai-diffusion-5-full", characters }));
    expect(free.v4_prompt).toMatchObject({
      caption: { char_captions: [{ centers: [{ x: 0.22, y: 0.81 }] }] },
    });
  });

  it("forces karras and drops Variety+ on V5", () => {
    const parameters = parameters_of(
      novelai_request({
        model_id: "nai-diffusion-5-curated",
        noise_schedule: "native",
        variety_plus: true,
      }),
    );
    expect(parameters.noise_schedule).toBe("karras");
    expect(parameters).not.toHaveProperty("skip_cfg_above_sigma");
  });

  it("scales the Variety+ sigma with resolution", () => {
    const at_reference = parameters_of(
      novelai_request({ width: 832, height: 1216, variety_plus: true }),
    );
    expect(at_reference.skip_cfg_above_sigma).toBeCloseTo(58);
    const disabled = parameters_of(novelai_request({ variety_plus: false }));
    expect(disabled.skip_cfg_above_sigma).toBeNull();
  });

  it("applies the fixed V5 Full Medium settings", () => {
    const parameters = parameters_of(
      novelai_request({
        model_id: "nai-diffusion-5-full-medium",
        steps: 28,
        sampler: "k_euler",
        undesired_content_preset: "none",
      }),
    );
    expect(parameters).toMatchObject({
      steps: 14,
      sampler: "k_euler_ancestral",
      ucPresetId: "heavy",
    });
    expect(parameters).not.toHaveProperty("cfg_rescale");
  });

  it("sends encoded vibes on V4.5 and normalises their strengths", () => {
    const parameters = parameters_of(
      novelai_request({
        vibe_references: [
          { asset_id: ASSET_ID, strength: 0.6, information_extracted: 0.7, encoding: "AAAA" },
          { asset_id: ASSET_ID, strength: 0.6, information_extracted: 0.7, encoding: "BBBB" },
        ],
      }),
    );
    expect(parameters.reference_image_multiple).toEqual(["AAAA", "BBBB"]);
    expect(parameters.reference_strength_multiple).toEqual([0.5, 0.5]);
    expect(parameters).not.toHaveProperty("reference_information_extracted_multiple");
  });

  it("rejects an unencoded vibe on V4.5 and any vibe on V5", () => {
    const vibe = { asset_id: ASSET_ID, strength: 0.6, information_extracted: 0.7 };
    expect(() => map_novelai_request(novelai_request({ vibe_references: [vibe] }), assets)).toThrow(
      ProviderAdapterError,
    );
    expect(() =>
      map_novelai_request(
        novelai_request({
          model_id: "nai-diffusion-5-full",
          vibe_references: [{ ...vibe, encoding: "AAAA" }],
        }),
        assets,
      ),
    ).toThrow(ProviderAdapterError);
  });

  it("sends raw vibe images with information extracted on V3", () => {
    const parameters = parameters_of(
      novelai_request({
        model_id: "nai-diffusion-3",
        characters: undefined,
        vibe_references: [{ asset_id: ASSET_ID, strength: 0.6, information_extracted: 0.7 }],
      }),
      assets,
    );
    expect(parameters).toMatchObject({
      reference_image_multiple: [PNG_BASE64],
      reference_strength_multiple: [0.6],
      reference_information_extracted_multiple: [0.7],
    });
  });

  it("drops vibes when character references are present", () => {
    const parameters = parameters_of(
      NovelAiRequestSchema.parse({
        ...full_request,
        vibe_references: [
          { asset_id: ASSET_ID, strength: 0.6, information_extracted: 0.7, encoding: "AAAA" },
        ],
      }),
      assets,
    );
    expect(parameters).not.toHaveProperty("reference_image_multiple");
    expect(parameters.director_reference_secondary_strength_values).toEqual([1 - 0.8]);
  });

  it("maps img2img with its strength, noise and derived noise seed", () => {
    const parameters = parameters_of(
      novelai_request({ action: "img2img", image_asset_id: ASSET_ID, strength: 0.55, noise: 0.1 }),
      assets,
    );
    expect(parameters).toMatchObject({
      image: PNG_BASE64,
      strength: 0.55,
      noise: 0.1,
      extra_noise_seed: 41,
      color_correct: false,
    });
  });

  it("routes infill to the model's inpainting variant", () => {
    const payload = map_novelai_request(
      novelai_request({
        model_id: "nai-diffusion-5-curated",
        action: "infill",
        image_asset_id: ASSET_ID,
        mask_asset_id: ASSET_ID,
        inpaint_strength: 0.8,
      }),
      assets,
    );
    expect(payload.body.model).toBe("nai-diffusion-4-5-curated-inpainting");
    expect(payload.body.parameters).toMatchObject({
      mask: PNG_BASE64,
      add_original_image: false,
      inpaintImg2ImgStrength: 0.8,
      img2img: { strength: 0.8, color_correct: true },
    });
  });

  it("restricts unlisted models to text-to-image", () => {
    expect(() =>
      map_novelai_request(
        novelai_request({
          model_id: "nai-diffusion-5-1-full",
          action: "img2img",
          image_asset_id: ASSET_ID,
          strength: 0.5,
          noise: 0,
        }),
        assets,
      ),
    ).toThrow(ProviderAdapterError);
    expect(parameters_of(novelai_request({ model_id: "nai-diffusion-5-1-full" }))).toMatchObject({
      noise_schedule: "karras",
    });
  });

  it("maps upscale and augment requests to their own routes", () => {
    const base = {
      provider_id: "novelai",
      request_id: REQUEST_ID,
      generation_anchor: GENERATION_ANCHOR,
      prompt: "fixture prompt",
      output_count: 1,
      image_asset_id: ASSET_ID,
    };
    expect(
      map_novelai_request(NovelAiRequestSchema.parse({ ...base, action: "upscale" }), assets),
    ).toEqual({
      route: "/ai/upscale",
      body: { image: PNG_BASE64, model: "nai-diffusion-5-curated", declared_blur_sigma: 0 },
    });
    expect(
      map_novelai_request(
        NovelAiRequestSchema.parse({
          ...base,
          action: "augment",
          tool: "emotion",
          emotion: "happy",
          tool_prompt: "smiling",
          defry: 2,
          width: 832,
          height: 1216,
        }),
        assets,
      ),
    ).toEqual({
      route: "/ai/augment-image",
      body: {
        req_type: "emotion",
        use_new_shared_trial: true,
        width: 832,
        height: 1216,
        image: PNG_BASE64,
        prompt: "happy;;smiling",
        defry: 2,
      },
    });
  });
});

describe("NovelAI adapter submission", () => {
  function context(transport: ProviderTransport) {
    return {
      profile,
      transport,
      assets: new StaticAssetReader(),
      signal: new AbortController().signal,
      log: new RecordingLog(),
    };
  }

  it("does not retry a server error that may already have been billed", async () => {
    const transport = new ScriptedTransport([
      transport_response(503),
      transport_response(201, response_bytes),
    ]);
    await expect(
      new NovelAiAdapter({ clock: new ImmediateClock(), random: new FixedRandom() }).submit(
        context(transport),
        full_request,
      ),
    ).rejects.toBeInstanceOf(ProviderAdapterError);
    expect(transport.operations).toHaveLength(1);
  });

  it("assigns a seed when the request leaves it to the adapter", async () => {
    const transport = new ScriptedTransport([transport_response(201, response_bytes)]);
    await new NovelAiAdapter({ clock: new ImmediateClock(), random: new FixedRandom() }).submit(
      context(transport),
      novelai_request({ seed: undefined, characters: undefined }),
    );
    const body = JSON.parse(new TextDecoder().decode(transport.operations[0]?.body)) as {
      parameters: { seed: number };
    };
    expect(body.parameters.seed).toBe(Math.floor(0.5 * 4_294_967_295));
  });
});

describe("NovelAI response parsing", () => {
  it("extracts the official JSON response and seed", async () => {
    await expect(
      parse_novelai_response(
        response_bytes,
        "application/json",
        expected_full,
        profile.max_response_bytes,
        profile.max_archive_entries,
      ),
    ).resolves.toMatchObject({
      result: {
        request_id: REQUEST_ID,
        provider_id: "novelai",
        seed: 42,
        assets: [{ media_type: "image/png" }],
      },
    });
  });

  it.each(["application/zip", "application/octet-stream", "binary/octet-stream"])(
    "extracts bounded ZIP image entries returned as %s",
    async (content_type) => {
      const expected = { ...expected_full, output_count: 2 };
      const archive = create_zip(
        zip_fixture.map((entry) => ({
          name: entry.filename,
          bytes: base64_to_bytes(entry.base64),
        })),
      );

      await expect(
        parse_novelai_response(
          archive,
          content_type,
          expected,
          profile.max_response_bytes,
          profile.max_archive_entries,
        ),
      ).resolves.toMatchObject({
        result: {
          seed: 42,
          assets: [{ media_type: "image/png" }, { media_type: "image/png" }],
        },
      });
    },
  );

  it("extracts deflated ZIP image entries", async () => {
    const archive = create_zip([{ name: "image_0.png", bytes: PNG_BYTES }], "deflate");

    await expect(
      parse_novelai_response(
        archive,
        "application/zip",
        expected_full,
        profile.max_response_bytes,
        profile.max_archive_entries,
      ),
    ).resolves.toMatchObject({ result: { assets: [{ media_type: "image/png" }] } });
  });

  it("extracts bounded multipart image parts", async () => {
    const content_type = "multipart/mixed; boundary=tavern-canvas-fixture";
    const multipart = create_multipart(
      "tavern-canvas-fixture",
      multipart_fixture.map((entry) => ({
        name: entry.filename,
        media_type: entry.content_type ?? "image/png",
        bytes: base64_to_bytes(entry.base64),
      })),
    );

    await expect(
      parse_novelai_response(
        multipart,
        content_type,
        expected_full,
        profile.max_response_bytes,
        profile.max_archive_entries,
      ),
    ).resolves.toMatchObject({ result: { assets: [{ media_type: "image/png" }] } });
  });

  it("rejects excess archive entries, bytes, and image counts", async () => {
    const excess_entries = create_zip(
      Array.from({ length: 9 }, (_, index) => ({
        name: `image_${String(index)}.png`,
        bytes: PNG_BYTES,
      })),
    );
    await expect(
      parse_novelai_response(excess_entries, "application/zip", expected_full, 2_000_000, 8),
    ).rejects.toBeInstanceOf(ProviderAdapterError);
    await expect(
      parse_novelai_response(response_bytes, "application/json", expected_full, 10, 8),
    ).rejects.toBeInstanceOf(ProviderAdapterError);
    await expect(
      parse_novelai_response(
        new TextEncoder().encode(
          JSON.stringify({
            images: [
              { image: PNG_BASE64, index: 0, seed: 42 },
              { image: PNG_BASE64, index: 1, seed: 43 },
            ],
          }),
        ),
        "application/json",
        expected_full,
        2_000_000,
        8,
      ),
    ).rejects.toBeInstanceOf(ProviderAdapterError);
  });
});

interface EntryFixture {
  readonly filename: string;
  readonly base64: string;
  readonly content_type?: string;
}

function parse_entry_fixture(value: unknown, property_name: "entries" | "parts"): EntryFixture[] {
  if (typeof value !== "object" || value === null) {
    throw new TypeError("Invalid entry fixture");
  }
  const entries = Reflect.get(value, property_name);
  if (!Array.isArray(entries)) {
    throw new TypeError("Invalid entry fixture list");
  }
  return entries.map((entry) => {
    if (
      typeof entry !== "object" ||
      entry === null ||
      typeof Reflect.get(entry, "filename") !== "string" ||
      typeof Reflect.get(entry, "base64") !== "string"
    ) {
      throw new TypeError("Invalid entry fixture item");
    }
    const content_type = Reflect.get(entry, "content_type");
    return {
      filename: Reflect.get(entry, "filename") as string,
      base64: Reflect.get(entry, "base64") as string,
      ...(typeof content_type === "string" ? { content_type } : {}),
    };
  });
}

async function read_json_fixture(relative_path: string): Promise<unknown> {
  const text = await readFile(new URL(relative_path, import.meta.url), "utf8");
  return JSON.parse(text) as unknown;
}

function create_zip(
  entries: readonly { name: string; bytes: Uint8Array }[],
  compression: "stored" | "deflate" = "stored",
): Uint8Array {
  const encoder = new TextEncoder();
  const local_parts: Uint8Array[] = [];
  const central_parts: Uint8Array[] = [];
  let local_offset = 0;

  for (const entry of entries) {
    const name = encoder.encode(entry.name);
    const crc = crc32(entry.bytes);
    const compression_method = compression === "deflate" ? 8 : 0;
    const compressed_bytes =
      compression === "deflate" ? Uint8Array.from(deflateRawSync(entry.bytes)) : entry.bytes;
    const local = new Uint8Array(30 + name.length + compressed_bytes.length);
    const local_view = new DataView(local.buffer);
    local_view.setUint32(0, 0x04034b50, true);
    local_view.setUint16(4, 20, true);
    local_view.setUint16(8, compression_method, true);
    local_view.setUint32(14, crc, true);
    local_view.setUint32(18, compressed_bytes.length, true);
    local_view.setUint32(22, entry.bytes.length, true);
    local_view.setUint16(26, name.length, true);
    local.set(name, 30);
    local.set(compressed_bytes, 30 + name.length);
    local_parts.push(local);

    const central = new Uint8Array(46 + name.length);
    const central_view = new DataView(central.buffer);
    central_view.setUint32(0, 0x02014b50, true);
    central_view.setUint16(4, 20, true);
    central_view.setUint16(6, 20, true);
    central_view.setUint16(10, compression_method, true);
    central_view.setUint32(16, crc, true);
    central_view.setUint32(20, compressed_bytes.length, true);
    central_view.setUint32(24, entry.bytes.length, true);
    central_view.setUint16(28, name.length, true);
    central_view.setUint32(42, local_offset, true);
    central.set(name, 46);
    central_parts.push(central);
    local_offset += local.length;
  }

  const central_offset = local_offset;
  const central_size = central_parts.reduce((sum, part) => sum + part.length, 0);
  const end = new Uint8Array(22);
  const end_view = new DataView(end.buffer);
  end_view.setUint32(0, 0x06054b50, true);
  end_view.setUint16(8, entries.length, true);
  end_view.setUint16(10, entries.length, true);
  end_view.setUint32(12, central_size, true);
  end_view.setUint32(16, central_offset, true);
  return concatenate_bytes([...local_parts, ...central_parts, end]);
}

function create_multipart(
  boundary: string,
  entries: readonly { name: string; media_type: string; bytes: Uint8Array }[],
): Uint8Array {
  const encoder = new TextEncoder();
  const parts: Uint8Array[] = [];
  for (const entry of entries) {
    parts.push(
      encoder.encode(
        `--${boundary}\r\nContent-Type: ${entry.media_type}\r\nContent-Disposition: attachment; filename="${entry.name}"\r\n\r\n`,
      ),
      entry.bytes,
      encoder.encode("\r\n"),
    );
  }
  parts.push(encoder.encode(`--${boundary}--\r\n`));
  return concatenate_bytes(parts);
}

function concatenate_bytes(parts: readonly Uint8Array[]): Uint8Array {
  const length = parts.reduce((sum, part) => sum + part.length, 0);
  const result = new Uint8Array(length);
  let offset = 0;
  for (const part of parts) {
    result.set(part, offset);
    offset += part.length;
  }
  return result;
}

function base64_to_bytes(value: string): Uint8Array {
  return Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
}

function crc32(bytes: Uint8Array): number {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}
