import { readFile } from "node:fs/promises";

import { AssetIdSchema, SdWebuiRequestSchema, type AssetId } from "@tavern-canvas/contracts";
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
import { SdWebuiAdapter } from "./sd_webui_adapter.js";
import { map_sd_webui_request } from "./sd_webui_mapping.js";
import { parse_sd_webui_response } from "./sd_webui_response.js";

const REQUEST_ID = "11111111-1111-4111-8111-111111111111";
const ASSET_ID = AssetIdSchema.parse("33333333-3333-4333-8333-333333333333");
const GENERATION_ANCHOR = "a".repeat(64);
const PNG_BASE64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";
const PNG_BYTES = base64_to_bytes(PNG_BASE64);

const txt2img_fixture = await read_json_fixture(
  "../../../../tests/fixtures/providers/sd_webui/txt2img_request.json",
);
const img2img_fixture = await read_json_fixture(
  "../../../../tests/fixtures/providers/sd_webui/img2img_request.json",
);
const response_fixture = await read_json_fixture(
  "../../../../tests/fixtures/providers/sd_webui/txt2img_response.json",
);
const response_bytes = new TextEncoder().encode(JSON.stringify(response_fixture));

const profile = {
  profile_id: "sd-local",
  provider_id: "sd_webui",
  model_allowlist: ["sdxl-base"],
  vae_allowlist: ["sdxl-vae"],
  adetailer_model_allowlist: ["face_yolov8n.pt"],
  controlnet_model_allowlist: ["controlnet-canny"],
  output_mime_type_allowlist: ["image/png", "image/jpeg"],
  max_response_bytes: 2_000_000,
};

const full_request = SdWebuiRequestSchema.parse({
  provider_id: "sd_webui",
  request_id: REQUEST_ID,
  generation_anchor: GENERATION_ANCHOR,
  prompt: "fixture prompt",
  negative_prompt: "fixture negative prompt",
  output_count: 1,
  mode: "txt2img",
  model_id: "sdxl-base",
  vae_id: "sdxl-vae",
  sampler: "DPM++ 2M",
  scheduler: "Karras",
  width: 1024,
  height: 1024,
  steps: 30,
  cfg_scale: 7,
  seed: 42,
  hires_fix: {
    scale: 2,
    upscaler_id: "R-ESRGAN 4x+",
    steps: 12,
    denoise_strength: 0.35,
  },
  adetailer: [
    {
      model_id: "face_yolov8n.pt",
      prompt: "face detail",
      negative_prompt: "blur",
      confidence: 0.3,
      mask_blur: 4,
      denoise_strength: 0.4,
    },
  ],
  controlnet: [
    {
      asset_id: ASSET_ID,
      model_id: "controlnet-canny",
      module: "canny",
      weight: 1,
      guidance_start: 0,
      guidance_end: 1,
      control_mode: "balanced",
      resize_mode: "resize",
    },
  ],
  lora_tokens: [{ lora_id: "portrait-style", weight: 0.75 }],
});

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
    return {
      asset_id,
      media_type: "image/png",
      bytes: PNG_BYTES,
    };
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
  return {
    status,
    headers: { "content-type": content_type },
    body,
  };
}

function contract_case(scenario: ProviderContractScenario) {
  const controller = new AbortController();
  const log = new RecordingLog();
  let request = full_request;
  let expectation: ProviderContractExpectation = { kind: "success", asset_count: 1 };
  let responses: (ProviderTransportResponse | Error)[] = [transport_response(200, response_bytes)];

  if (scenario === "multiple_images") {
    request = SdWebuiRequestSchema.parse({ ...full_request, output_count: 2 });
    responses = [
      transport_response(
        200,
        new TextEncoder().encode(
          JSON.stringify({
            parameters: {},
            images: [PNG_BASE64, PNG_BASE64],
            info: JSON.stringify({ seed: 42, all_seeds: [42, 43] }),
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
    responses = [transport_response(200, new TextEncoder().encode("{}"))];
    expectation = { kind: "error", code: "malformed_response" };
  } else if (scenario === "unsupported_capability") {
    request = SdWebuiRequestSchema.parse({ ...full_request, model_id: "not-allowed" });
    responses = [];
    expectation = { kind: "error", code: "invalid_request" };
  }

  const transport = new ScriptedTransport(responses);
  return {
    adapter: new SdWebuiAdapter({ clock: new ImmediateClock(), random: new FixedRandom() }),
    raw_profile: profile,
    context: {
      transport,
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

define_provider_contract_suite("SD WebUI", contract_case);

describe("SD WebUI mapping", () => {
  it("maps model and VAE overrides, Hires fix, ADetailer, ControlNet, and LoRA tokens", () => {
    const assets = new Map<AssetId, ProviderSourceAsset>([
      [ASSET_ID, { asset_id: ASSET_ID, media_type: "image/png", bytes: PNG_BYTES }],
    ]);

    expect(map_sd_webui_request(full_request, assets)).toEqual(txt2img_fixture);
    expect(full_request.prompt).toBe("fixture prompt");
  });

  it("maps img2img without leaking asset IDs", () => {
    const request = SdWebuiRequestSchema.parse({
      provider_id: "sd_webui",
      request_id: REQUEST_ID,
      generation_anchor: GENERATION_ANCHOR,
      prompt: "fixture prompt",
      output_count: 1,
      mode: "img2img",
      model_id: "sdxl-base",
      sampler: "Euler",
      scheduler: "Automatic",
      width: 768,
      height: 1024,
      steps: 24,
      cfg_scale: 6,
      input_asset_id: ASSET_ID,
      denoise_strength: 0.55,
    });
    const assets = new Map<AssetId, ProviderSourceAsset>([
      [ASSET_ID, { asset_id: ASSET_ID, media_type: "image/png", bytes: PNG_BYTES }],
    ]);

    expect(map_sd_webui_request(request, assets)).toEqual(img2img_fixture);
    expect(JSON.stringify(map_sd_webui_request(request, assets))).not.toContain(ASSET_ID);
  });
});

describe("SD WebUI response parsing", () => {
  it("normalizes exact PNG and JPEG response counts", () => {
    const jpeg_bytes = Uint8Array.of(0xff, 0xd8, 0xff, 0xe0, 0, 0, 0xff, 0xd9);
    const request = SdWebuiRequestSchema.parse({ ...full_request, output_count: 2 });
    const body = new TextEncoder().encode(
      JSON.stringify({
        images: [PNG_BASE64, bytes_to_base64(jpeg_bytes)],
        parameters: {},
        info: JSON.stringify({ seed: 42, all_seeds: [42, 43] }),
      }),
    );

    expect(parse_sd_webui_response(body, request, 2_000_000).result).toMatchObject({
      request_id: REQUEST_ID,
      provider_id: "sd_webui",
      seed: 42,
      assets: [
        { media_type: "image/png", width: 2048, height: 2048 },
        { media_type: "image/jpeg", width: 2048, height: 2048 },
      ],
    });
  });

  it("rejects missing, excess, malformed, and oversized images", () => {
    for (const body of [
      {},
      { images: [], info: "{}" },
      { images: [PNG_BASE64, PNG_BASE64], info: "{}" },
      { images: ["not-base64"], info: "{}" },
    ]) {
      expect(() =>
        parse_sd_webui_response(
          new TextEncoder().encode(JSON.stringify(body)),
          full_request,
          2_000_000,
        ),
      ).toThrow(ProviderAdapterError);
    }
    expect(() => parse_sd_webui_response(response_bytes, full_request, 10)).toThrow(
      ProviderAdapterError,
    );
  });
});

async function read_json_fixture(relative_path: string): Promise<unknown> {
  const text = await readFile(new URL(relative_path, import.meta.url), "utf8");
  return JSON.parse(text) as unknown;
}

function base64_to_bytes(value: string): Uint8Array {
  return Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
}

function bytes_to_base64(value: Uint8Array): string {
  let binary = "";
  for (const byte of value) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}
