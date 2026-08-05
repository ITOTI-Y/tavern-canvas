import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

import {
  AssetIdSchema,
  ComfyUiRequestSchema,
  GoogleImageRequestSchema,
  ImageGenerationResultSchema,
  NovelAiRequestSchema,
  OpenAiImageRequestSchema,
  SdWebuiRequestSchema,
  type AssetId,
  type ImageGenerationRequest,
  type ImageGenerationResult,
} from "@tavern-canvas/contracts";
import { describe, expect, it } from "vitest";

import {
  ComfyUiAdapter,
  type ComfyUiWorkflowStore,
} from "../../packages/providers/src/comfyui/comfyui_adapter.js";
import { GoogleImageAdapter } from "../../packages/providers/src/google_image/google_image_adapter.js";
import { NovelAiAdapter } from "../../packages/providers/src/novelai/novelai_adapter.js";
import { OpenAiImageAdapter } from "../../packages/providers/src/openai_image/openai_image_adapter.js";
import { ProviderAdapterError } from "../../packages/providers/src/provider_error.js";
import type {
  ProviderAdapter,
  ProviderAssetReader,
  ProviderExecutionContext,
  ProviderLogSink,
  ProviderOutputAsset,
  ProviderSourceAsset,
  ProviderSubmission,
} from "../../packages/providers/src/provider_adapter.js";
import type {
  ProviderRemoteAssetOperation,
  ProviderTransport,
  ProviderTransportOperation,
  ProviderTransportResponse,
} from "../../packages/providers/src/provider_transport.js";
import type { RetryClock, RetryRandomSource } from "../../packages/providers/src/retry_policy.js";
import {
  define_provider_contract_suite,
  type ProviderContractExpectation,
  type ProviderContractHarness,
  type ProviderContractScenario,
} from "../../packages/providers/src/testing/provider_contract_suite.js";
import { SdWebuiAdapter } from "../../packages/providers/src/sd_webui/sd_webui_adapter.js";

const REQUEST_ID = "11111111-1111-4111-8111-111111111111";
const GENERATION_ANCHOR = "a".repeat(64);
const REFERENCE_ASSET_ID = AssetIdSchema.parse("66666666-6666-4666-8666-666666666666");
const MASK_ASSET_ID = AssetIdSchema.parse("55555555-5555-4555-8555-555555555555");
const WORKFLOW_ID = AssetIdSchema.parse("33333333-3333-4333-8333-333333333333");
const OTHER_WORKFLOW_ID = AssetIdSchema.parse("77777777-7777-4777-8777-777777777777");
const PROMPT_ID = "44444444-4444-4444-8444-444444444444";
const FIXED_NOW_MS = Date.parse("2026-08-05T09:30:00.000Z");
const PNG_BASE64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";
const PNG_BYTES = Uint8Array.from(atob(PNG_BASE64), (character) => character.charCodeAt(0));
// This second repository-generated image keeps the PNG signature and has a deterministic marker.
const SECOND_PNG_BYTES = new Uint8Array([...PNG_BYTES, 0x02]);
const SECOND_PNG_BASE64 = bytes_to_base64(SECOND_PNG_BYTES);

const [
  sd_response_fixture,
  novelai_response_fixture,
  comfy_workflow_fixture,
  comfy_prompt_fixture,
  comfy_history_fixture,
  openai_response_fixture,
  openai_policy_fixture,
  google_response_fixture,
  google_safety_fixture,
] = await Promise.all([
  read_json_fixture("sd_webui/txt2img_response.json"),
  read_json_fixture("novelai/generate_response.json"),
  read_json_fixture("comfyui/stored_workflow.json"),
  read_json_fixture("comfyui/prompt_response.json"),
  read_json_fixture("comfyui/history_response.json"),
  read_json_fixture("openai_image/generation_response.json"),
  read_json_fixture("openai_image/content_policy_error.json"),
  read_json_fixture("google_image/interaction_response.json"),
  read_json_fixture("google_image/safety_response.json"),
]);

const SD_PROFILE = {
  profile_id: "sd-local",
  provider_id: "sd_webui",
  model_allowlist: ["sdxl-base"],
  vae_allowlist: ["sdxl-vae"],
  adetailer_model_allowlist: ["face_yolov8n.pt"],
  controlnet_model_allowlist: ["controlnet-canny"],
  output_mime_type_allowlist: ["image/png", "image/jpeg"],
  max_response_bytes: 2_000_000,
  max_input_asset_bytes: 2_000_000,
} as const;

const NOVELAI_PROFILE = {
  profile_id: "novelai-cloud",
  provider_id: "novelai",
  model_allowlist: ["nai-diffusion-4-full"],
  output_mime_type_allowlist: ["image/png", "image/webp"],
  max_response_bytes: 2_000_000,
  max_archive_entries: 8,
  max_input_asset_bytes: 2_000_000,
} as const;

const COMFY_PROFILE = {
  profile_id: "comfy-local",
  provider_id: "comfyui",
  model_allowlist: ["stored-workflows"],
  output_mime_type_allowlist: ["image/png", "image/jpeg", "image/webp"],
  workflow_allowlist: [WORKFLOW_ID],
  max_response_bytes: 2_000_000,
  max_input_asset_bytes: 2_000_000,
} as const;

const OPENAI_PROFILE = {
  profile_id: "openai-cloud",
  provider_id: "openai_image",
  model_allowlist: ["gpt-image-2"],
  output_mime_type_allowlist: ["image/png", "image/jpeg", "image/webp"],
  remote_asset_origin_allowlist: ["https://assets.openai.example"],
  max_response_bytes: 2_000_000,
  max_input_asset_bytes: 2_000_000,
} as const;

const GOOGLE_PROFILE = {
  profile_id: "google-cloud",
  provider_id: "google_image",
  model_allowlist: ["gemini-3.1-flash-image"],
  output_mime_type_allowlist: ["image/png", "image/jpeg", "image/webp"],
  max_response_bytes: 2_000_000,
  max_input_asset_bytes: 2_000_000,
} as const;

const sd_request = SdWebuiRequestSchema.parse({
  provider_id: "sd_webui",
  request_id: REQUEST_ID,
  generation_anchor: GENERATION_ANCHOR,
  prompt: "matrix fixture prompt",
  negative_prompt: "matrix fixture negative prompt",
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
});

const novelai_request = NovelAiRequestSchema.parse({
  provider_id: "novelai",
  request_id: REQUEST_ID,
  generation_anchor: GENERATION_ANCHOR,
  prompt: "matrix fixture prompt",
  negative_prompt: "matrix fixture negative prompt",
  output_count: 1,
  model_id: "nai-diffusion-4-full",
  sampler: "k_euler_ancestral",
  width: 1024,
  height: 1024,
  steps: 28,
  scale: 5,
  cfg_rescale: 0,
  noise_schedule: "native",
  seed: 42,
  quality_toggle: true,
  undesired_content_preset: "heavy",
  smea: false,
  dyn: false,
});

const comfy_request = ComfyUiRequestSchema.parse({
  provider_id: "comfyui",
  request_id: REQUEST_ID,
  generation_anchor: GENERATION_ANCHOR,
  prompt: "matrix fixture prompt",
  negative_prompt: "matrix fixture negative prompt",
  output_count: 1,
  workflow_id: WORKFLOW_ID,
  placeholder_values: { cfg: 5.5, style_path: "matrix/output" },
  input_asset_bindings: {},
  output_node_ids: ["9"],
  seed: 42,
});

const openai_request = OpenAiImageRequestSchema.parse({
  provider_id: "openai_image",
  request_id: REQUEST_ID,
  generation_anchor: GENERATION_ANCHOR,
  prompt: "matrix fixture prompt",
  output_count: 1,
  mode: "generate",
  model_id: "gpt-image-2",
  size: "1024x1024",
  quality: "high",
  background: "opaque",
  output_format: "png",
  input_asset_ids: [],
});

const google_request = GoogleImageRequestSchema.parse({
  provider_id: "google_image",
  request_id: REQUEST_ID,
  generation_anchor: GENERATION_ANCHOR,
  prompt: "matrix fixture prompt",
  output_count: 1,
  model_id: "gemini-3.1-flash-image",
  reference_asset_ids: [],
  aspect_ratio: "1:1",
  image_size: "2K",
  output_mime_type: "image/png",
});

class DeterministicRetryClock implements RetryClock {
  readonly sleep_delays: number[] = [];

  now(): number {
    return FIXED_NOW_MS;
  }

  sleep(delay_ms: number, signal: AbortSignal): Promise<void> {
    this.sleep_delays.push(delay_ms);
    return signal.aborted
      ? Promise.reject(new DOMException("Synthetic cancellation", "AbortError"))
      : Promise.resolve();
  }
}

class FixedRandom implements RetryRandomSource {
  next(): number {
    return 0.5;
  }
}

class ScriptedProviderTransport implements ProviderTransport {
  readonly operations: ProviderTransportOperation[] = [];
  readonly remote_operations: ProviderRemoteAssetOperation[] = [];
  #responses: (ProviderTransportResponse | Error)[];
  #remote_responses: ProviderTransportResponse[];

  constructor(
    responses: readonly (ProviderTransportResponse | Error)[],
    remote_responses: readonly ProviderTransportResponse[] = [],
  ) {
    this.#responses = [...responses];
    this.#remote_responses = [...remote_responses];
  }

  execute(operation: ProviderTransportOperation): Promise<ProviderTransportResponse> {
    this.operations.push({
      ...operation,
      ...(operation.body === undefined ? {} : { body: new Uint8Array(operation.body) }),
    });
    if (operation.signal.aborted) {
      return Promise.reject(new DOMException("Synthetic cancellation", "AbortError"));
    }
    const response = this.#responses.shift();
    if (response === undefined) {
      return Promise.reject(new Error("Scripted provider transport exhausted"));
    }
    return response instanceof Error ? Promise.reject(response) : Promise.resolve(response);
  }

  fetch_remote_asset(operation: ProviderRemoteAssetOperation): Promise<ProviderTransportResponse> {
    this.remote_operations.push({ ...operation });
    if (operation.signal.aborted) {
      return Promise.reject(new DOMException("Synthetic cancellation", "AbortError"));
    }
    const response = this.#remote_responses.shift();
    return response === undefined
      ? Promise.reject(new Error("Scripted remote asset transport exhausted"))
      : Promise.resolve(response);
  }
}

class DeterministicAssetReader implements ProviderAssetReader {
  readonly reads: AssetId[] = [];
  readonly #assets = new Map<AssetId, ProviderSourceAsset>([
    [
      REFERENCE_ASSET_ID,
      { asset_id: REFERENCE_ASSET_ID, media_type: "image/png", bytes: PNG_BYTES },
    ],
    [MASK_ASSET_ID, { asset_id: MASK_ASSET_ID, media_type: "image/png", bytes: SECOND_PNG_BYTES }],
  ]);

  async read(asset_id: AssetId, signal: AbortSignal): Promise<ProviderSourceAsset> {
    this.reads.push(asset_id);
    if (signal.aborted) {
      throw new DOMException("Synthetic cancellation", "AbortError");
    }
    const asset = this.#assets.get(asset_id);
    if (asset === undefined) {
      throw new Error(`Unknown deterministic asset ${asset_id}`);
    }
    return { ...asset, bytes: new Uint8Array(asset.bytes) };
  }
}

class RecordingLog implements ProviderLogSink {
  readonly records: unknown[] = [];

  write(record: unknown): void {
    this.records.push(record);
  }
}

class DeterministicWorkflowStore implements ComfyUiWorkflowStore {
  constructor(private readonly workflow: unknown) {}

  load(workflow_id: AssetId): Promise<unknown> {
    return workflow_id === WORKFLOW_ID
      ? Promise.resolve(structuredClone(this.workflow))
      : Promise.reject(new Error("Unknown deterministic workflow"));
  }
}

interface MatrixHarness<
  TRequest extends ImageGenerationRequest,
> extends ProviderContractHarness<TRequest> {
  readonly transport: ScriptedProviderTransport;
  readonly clock: DeterministicRetryClock;
  readonly asset_reader: DeterministicAssetReader;
  readonly expected_output_bytes: readonly Uint8Array[];
  readonly expects_async_poll: boolean;
}

type HarnessFactory<TRequest extends ImageGenerationRequest> = (
  scenario: ProviderContractScenario,
) => MatrixHarness<TRequest>;

function make_harness<TRequest extends ImageGenerationRequest>(options: {
  adapter: ProviderAdapter<TRequest>;
  raw_profile: unknown;
  request: TRequest;
  expectation: ProviderContractExpectation;
  controller: AbortController;
  transport: ScriptedProviderTransport;
  clock: DeterministicRetryClock;
  asset_reader: DeterministicAssetReader;
  log: RecordingLog;
  expected_output_bytes: readonly Uint8Array[];
  expects_async_poll?: boolean;
}): MatrixHarness<TRequest> {
  return {
    adapter: options.adapter,
    raw_profile: options.raw_profile,
    context: {
      transport: options.transport,
      assets: options.asset_reader,
      signal: options.controller.signal,
      log: options.log,
    },
    request: options.request,
    expectation: options.expectation,
    secret_markers: [options.request.prompt, options.request.generation_anchor, "provider-secret"],
    log_records: () => options.log.records,
    transport: options.transport,
    clock: options.clock,
    asset_reader: options.asset_reader,
    expected_output_bytes: options.expected_output_bytes,
    expects_async_poll: options.expects_async_poll ?? false,
  };
}

function rate_limit_responses(): ProviderTransportResponse[] {
  return Array.from({ length: 3 }, () =>
    json_response(429, { error: "synthetic rate limit" }, { "retry-after": "1" }),
  );
}

function json_response(
  status: number,
  value: unknown,
  extra_headers: Readonly<Record<string, string>> = {},
): ProviderTransportResponse {
  return {
    status,
    headers: { "content-type": "application/json", ...extra_headers },
    body: new TextEncoder().encode(JSON.stringify(value)),
  };
}

function image_response(bytes = PNG_BYTES): ProviderTransportResponse {
  return { status: 200, headers: { "content-type": "image/png" }, body: new Uint8Array(bytes) };
}

function comfy_history(image_count: number): unknown {
  return {
    [PROMPT_ID]: {
      outputs: {
        "9": {
          images: Array.from({ length: image_count }, (_, index) => ({
            filename: `matrix_${String(index)}.png`,
            subfolder: "",
            type: "output",
          })),
        },
      },
      status: { status_str: "success", completed: true, messages: [] },
    },
  };
}

function timeout_response(): DOMException {
  return new DOMException("Synthetic upstream timeout", "TimeoutError");
}

function create_sd_harness(scenario: ProviderContractScenario): MatrixHarness<typeof sd_request> {
  const controller = new AbortController();
  const clock = new DeterministicRetryClock();
  const asset_reader = new DeterministicAssetReader();
  const log = new RecordingLog();
  let request = sd_request;
  let raw_profile: unknown = SD_PROFILE;
  let expectation: ProviderContractExpectation = { kind: "success", asset_count: 1 };
  let responses: (ProviderTransportResponse | Error)[] = [json_response(200, sd_response_fixture)];
  let expected_output_bytes: readonly Uint8Array[] = [PNG_BYTES];

  if (scenario === "multiple_images") {
    request = SdWebuiRequestSchema.parse({ ...sd_request, output_count: 2 });
    responses = [
      json_response(200, {
        images: [PNG_BASE64, SECOND_PNG_BASE64],
        parameters: {},
        info: JSON.stringify({ seed: 42, all_seeds: [42, 43] }),
      }),
    ];
    expectation = { kind: "success", asset_count: 2 };
    expected_output_bytes = [PNG_BYTES, SECOND_PNG_BYTES];
  } else if (scenario === "auth_failure") {
    responses = [json_response(401, {})];
    expectation = { kind: "error", code: "auth_failed" };
  } else if (scenario === "content_rejection") {
    responses = [json_response(451, {})];
    expectation = { kind: "error", code: "content_blocked" };
  } else if (scenario === "rate_limit") {
    responses = rate_limit_responses();
    expectation = { kind: "error", code: "rate_limited" };
  } else if (scenario === "timeout") {
    responses = [timeout_response()];
    expectation = { kind: "error", code: "timed_out" };
  } else if (scenario === "cancellation") {
    controller.abort();
    responses = [];
    expectation = { kind: "error", code: "cancelled" };
  } else if (scenario === "malformed_response") {
    responses = [json_response(200, {})];
    expectation = { kind: "error", code: "malformed_response" };
  } else if (scenario === "reference_image") {
    request = SdWebuiRequestSchema.parse({
      ...sd_request,
      mode: "img2img",
      input_asset_id: REFERENCE_ASSET_ID,
      denoise_strength: 0.55,
    });
  } else if (scenario === "unsupported_capability") {
    raw_profile = { ...SD_PROFILE, model_allowlist: ["other-model"] };
    responses = [];
    expectation = { kind: "error", code: "invalid_request" };
  }

  const transport = new ScriptedProviderTransport(responses);
  return make_harness({
    adapter: new SdWebuiAdapter({ clock, random: new FixedRandom() }),
    raw_profile,
    request,
    expectation,
    controller,
    transport,
    clock,
    asset_reader,
    log,
    expected_output_bytes,
  });
}

function create_novelai_harness(
  scenario: ProviderContractScenario,
): MatrixHarness<typeof novelai_request> {
  const controller = new AbortController();
  const clock = new DeterministicRetryClock();
  const asset_reader = new DeterministicAssetReader();
  const log = new RecordingLog();
  let request = novelai_request;
  let raw_profile: unknown = NOVELAI_PROFILE;
  let expectation: ProviderContractExpectation = { kind: "success", asset_count: 1 };
  let responses: (ProviderTransportResponse | Error)[] = [
    json_response(201, novelai_response_fixture),
  ];
  let expected_output_bytes: readonly Uint8Array[] = [PNG_BYTES];

  if (scenario === "multiple_images") {
    request = NovelAiRequestSchema.parse({ ...novelai_request, output_count: 2 });
    responses = [
      json_response(201, {
        images: [
          { image: PNG_BASE64, index: 0, seed: 42 },
          { image: SECOND_PNG_BASE64, index: 1, seed: 43 },
        ],
      }),
    ];
    expectation = { kind: "success", asset_count: 2 };
    expected_output_bytes = [PNG_BYTES, SECOND_PNG_BYTES];
  } else if (scenario === "auth_failure") {
    responses = [json_response(401, {})];
    expectation = { kind: "error", code: "auth_failed" };
  } else if (scenario === "content_rejection") {
    responses = [json_response(451, {})];
    expectation = { kind: "error", code: "content_blocked" };
  } else if (scenario === "rate_limit") {
    responses = rate_limit_responses();
    expectation = { kind: "error", code: "rate_limited" };
  } else if (scenario === "timeout") {
    responses = [timeout_response()];
    expectation = { kind: "error", code: "timed_out" };
  } else if (scenario === "cancellation") {
    controller.abort();
    responses = [];
    expectation = { kind: "error", code: "cancelled" };
  } else if (scenario === "malformed_response") {
    responses = [json_response(201, {})];
    expectation = { kind: "error", code: "malformed_response" };
  } else if (scenario === "reference_image") {
    request = NovelAiRequestSchema.parse({
      ...novelai_request,
      vibe_references: [
        { asset_id: REFERENCE_ASSET_ID, strength: 0.6, information_extracted: 0.8 },
      ],
      character_references: [
        { asset_id: REFERENCE_ASSET_ID, prompt: "matrix character", strength: 0.7 },
      ],
    });
  } else if (scenario === "unsupported_capability") {
    request = NovelAiRequestSchema.parse({ ...novelai_request, model_id: "not-allowed" });
    raw_profile = { ...NOVELAI_PROFILE, model_allowlist: ["other-model"] };
    responses = [];
    expectation = { kind: "error", code: "invalid_request" };
  }

  const transport = new ScriptedProviderTransport(responses);
  return make_harness({
    adapter: new NovelAiAdapter({ clock, random: new FixedRandom() }),
    raw_profile,
    request,
    expectation,
    controller,
    transport,
    clock,
    asset_reader,
    log,
    expected_output_bytes,
  });
}

function create_comfy_harness(
  scenario: ProviderContractScenario,
): MatrixHarness<typeof comfy_request> {
  const controller = new AbortController();
  const clock = new DeterministicRetryClock();
  const asset_reader = new DeterministicAssetReader();
  const log = new RecordingLog();
  let request = comfy_request;
  let raw_profile: unknown = COMFY_PROFILE;
  let expectation: ProviderContractExpectation = { kind: "success", asset_count: 1 };
  let responses: (ProviderTransportResponse | Error)[] = [
    json_response(200, comfy_prompt_fixture),
    json_response(200, comfy_history_fixture),
    image_response(),
  ];
  let expected_output_bytes: readonly Uint8Array[] = [PNG_BYTES];

  if (scenario === "multiple_images") {
    request = ComfyUiRequestSchema.parse({ ...comfy_request, output_count: 2 });
    responses = [
      json_response(200, comfy_prompt_fixture),
      json_response(200, comfy_history(2)),
      image_response(PNG_BYTES),
      image_response(SECOND_PNG_BYTES),
    ];
    expectation = { kind: "success", asset_count: 2 };
    expected_output_bytes = [PNG_BYTES, SECOND_PNG_BYTES];
  } else if (scenario === "auth_failure") {
    responses = [json_response(401, {})];
    expectation = { kind: "error", code: "auth_failed" };
  } else if (scenario === "content_rejection") {
    responses = [json_response(451, {})];
    expectation = { kind: "error", code: "content_blocked" };
  } else if (scenario === "rate_limit") {
    responses = rate_limit_responses();
    expectation = { kind: "error", code: "rate_limited" };
  } else if (scenario === "timeout") {
    responses = [timeout_response()];
    expectation = { kind: "error", code: "timed_out" };
  } else if (scenario === "cancellation") {
    controller.abort();
    responses = [];
    expectation = { kind: "error", code: "cancelled" };
  } else if (scenario === "malformed_response") {
    responses = [json_response(200, {})];
    expectation = { kind: "error", code: "malformed_response" };
  } else if (scenario === "reference_image") {
    request = ComfyUiRequestSchema.parse({
      ...comfy_request,
      input_asset_bindings: { reference_image: REFERENCE_ASSET_ID },
    });
    responses = [
      json_response(200, { name: "matrix_reference.png", subfolder: "", type: "input" }),
      json_response(200, comfy_prompt_fixture),
      json_response(200, comfy_history_fixture),
      image_response(),
    ];
  } else if (scenario === "unsupported_capability") {
    raw_profile = { ...COMFY_PROFILE, workflow_allowlist: [OTHER_WORKFLOW_ID] };
    responses = [];
    expectation = { kind: "error", code: "invalid_request" };
  }

  const transport = new ScriptedProviderTransport(responses);
  return make_harness({
    adapter: new ComfyUiAdapter({
      workflow_store: new DeterministicWorkflowStore(comfy_workflow_fixture),
      clock,
      random: new FixedRandom(),
    }),
    raw_profile,
    request,
    expectation,
    controller,
    transport,
    clock,
    asset_reader,
    log,
    expected_output_bytes,
    expects_async_poll:
      expectation.kind === "success" &&
      (scenario === "success" || scenario === "multiple_images" || scenario === "reference_image"),
  });
}

function create_openai_harness(
  scenario: ProviderContractScenario,
): MatrixHarness<typeof openai_request> {
  const controller = new AbortController();
  const clock = new DeterministicRetryClock();
  const asset_reader = new DeterministicAssetReader();
  const log = new RecordingLog();
  let request = openai_request;
  let raw_profile: unknown = OPENAI_PROFILE;
  let expectation: ProviderContractExpectation = { kind: "success", asset_count: 1 };
  let responses: (ProviderTransportResponse | Error)[] = [
    json_response(200, openai_response_fixture),
  ];
  let expected_output_bytes: readonly Uint8Array[] = [PNG_BYTES];

  if (scenario === "multiple_images") {
    request = OpenAiImageRequestSchema.parse({ ...openai_request, output_count: 2 });
    responses = [
      json_response(200, {
        data: [{ b64_json: PNG_BASE64 }, { b64_json: SECOND_PNG_BASE64 }],
      }),
    ];
    expectation = { kind: "success", asset_count: 2 };
    expected_output_bytes = [PNG_BYTES, SECOND_PNG_BYTES];
  } else if (scenario === "auth_failure") {
    responses = [json_response(401, {})];
    expectation = { kind: "error", code: "auth_failed" };
  } else if (scenario === "content_rejection") {
    responses = [json_response(400, openai_policy_fixture)];
    expectation = { kind: "error", code: "content_blocked" };
  } else if (scenario === "rate_limit") {
    responses = rate_limit_responses();
    expectation = { kind: "error", code: "rate_limited" };
  } else if (scenario === "timeout") {
    responses = [timeout_response()];
    expectation = { kind: "error", code: "timed_out" };
  } else if (scenario === "cancellation") {
    controller.abort();
    responses = [];
    expectation = { kind: "error", code: "cancelled" };
  } else if (scenario === "malformed_response") {
    responses = [json_response(200, { data: [{}] })];
    expectation = { kind: "error", code: "malformed_response" };
  } else if (scenario === "reference_image") {
    request = OpenAiImageRequestSchema.parse({
      ...openai_request,
      mode: "edit",
      prompt: "matrix edit prompt",
      input_asset_ids: [REFERENCE_ASSET_ID],
    });
  } else if (scenario === "unsupported_capability") {
    raw_profile = { ...OPENAI_PROFILE, output_mime_type_allowlist: ["image/jpeg"] };
    responses = [];
    expectation = { kind: "error", code: "invalid_request" };
  }

  const transport = new ScriptedProviderTransport(responses);
  return make_harness({
    adapter: new OpenAiImageAdapter({ clock, random: new FixedRandom() }),
    raw_profile,
    request,
    expectation,
    controller,
    transport,
    clock,
    asset_reader,
    log,
    expected_output_bytes,
  });
}

function create_google_harness(
  scenario: ProviderContractScenario,
): MatrixHarness<typeof google_request> {
  const controller = new AbortController();
  const clock = new DeterministicRetryClock();
  const asset_reader = new DeterministicAssetReader();
  const log = new RecordingLog();
  let request = google_request;
  let raw_profile: unknown = GOOGLE_PROFILE;
  let expectation: ProviderContractExpectation = { kind: "success", asset_count: 1 };
  let responses: (ProviderTransportResponse | Error)[] = [
    json_response(200, google_response_fixture),
  ];
  let expected_output_bytes: readonly Uint8Array[] = [PNG_BYTES];

  if (scenario === "multiple_images") {
    request = GoogleImageRequestSchema.parse({ ...google_request, output_count: 2 });
    responses = [
      json_response(200, google_response_fixture),
      json_response(200, google_response_with_bytes(SECOND_PNG_BASE64)),
    ];
    expectation = { kind: "success", asset_count: 2 };
    expected_output_bytes = [PNG_BYTES, SECOND_PNG_BYTES];
  } else if (scenario === "auth_failure") {
    responses = [json_response(401, {})];
    expectation = { kind: "error", code: "auth_failed" };
  } else if (scenario === "content_rejection") {
    responses = [json_response(200, google_safety_fixture)];
    expectation = { kind: "error", code: "content_blocked" };
  } else if (scenario === "rate_limit") {
    responses = rate_limit_responses();
    expectation = { kind: "error", code: "rate_limited" };
  } else if (scenario === "timeout") {
    responses = [timeout_response()];
    expectation = { kind: "error", code: "timed_out" };
  } else if (scenario === "cancellation") {
    controller.abort();
    responses = [];
    expectation = { kind: "error", code: "cancelled" };
  } else if (scenario === "malformed_response") {
    responses = [
      json_response(200, {
        id: "matrix-interaction",
        model: "gemini-3.1-flash-image",
        status: "completed",
        steps: [{ type: "model_output", content: [{ type: "text", text: "no image" }] }],
      }),
    ];
    expectation = { kind: "error", code: "malformed_response" };
  } else if (scenario === "reference_image") {
    request = GoogleImageRequestSchema.parse({
      ...google_request,
      reference_asset_ids: [REFERENCE_ASSET_ID],
    });
  } else if (scenario === "unsupported_capability") {
    raw_profile = { ...GOOGLE_PROFILE, output_mime_type_allowlist: ["image/jpeg"] };
    responses = [];
    expectation = { kind: "error", code: "invalid_request" };
  }

  const transport = new ScriptedProviderTransport(responses);
  return make_harness({
    adapter: new GoogleImageAdapter({ clock, random: new FixedRandom() }),
    raw_profile,
    request,
    expectation,
    controller,
    transport,
    clock,
    asset_reader,
    log,
    expected_output_bytes,
  });
}

function google_response_with_bytes(base64: string): unknown {
  return {
    id: "interaction_fixture",
    model: "gemini-3.1-flash-image",
    status: "completed",
    steps: [
      {
        type: "model_output",
        content: [
          { type: "text", text: "synthetic response text" },
          { type: "image", mime_type: "image/png", data: base64 },
        ],
      },
    ],
  };
}

const provider_matrix: readonly {
  readonly name: string;
  readonly register_contract_suite: () => void;
  readonly run: (scenario: ProviderContractScenario) => Promise<void>;
}[] = [
  {
    name: "SD WebUI",
    register_contract_suite: () => define_provider_contract_suite("SD WebUI", create_sd_harness),
    run: (scenario) => run_matrix_case(create_sd_harness, scenario),
  },
  {
    name: "NovelAI",
    register_contract_suite: () =>
      define_provider_contract_suite("NovelAI", create_novelai_harness),
    run: (scenario) => run_matrix_case(create_novelai_harness, scenario),
  },
  {
    name: "ComfyUI",
    register_contract_suite: () => define_provider_contract_suite("ComfyUI", create_comfy_harness),
    run: (scenario) => run_matrix_case(create_comfy_harness, scenario),
  },
  {
    name: "OpenAI image",
    register_contract_suite: () =>
      define_provider_contract_suite("OpenAI image", create_openai_harness),
    run: (scenario) => run_matrix_case(create_openai_harness, scenario),
  },
  {
    name: "Google image",
    register_contract_suite: () =>
      define_provider_contract_suite("Google image", create_google_harness),
    run: (scenario) => run_matrix_case(create_google_harness, scenario),
  },
];

const matrix_scenarios = [
  "success",
  "multiple_images",
  "auth_failure",
  "content_rejection",
  "rate_limit",
  "timeout",
  "cancellation",
  "malformed_response",
  "reference_image",
  "unsupported_capability",
] as const satisfies readonly ProviderContractScenario[];

for (const provider of provider_matrix) {
  provider.register_contract_suite();
}

const provider_scenario_matrix = provider_matrix.flatMap((provider) =>
  matrix_scenarios.map((scenario) => ({ provider: provider.name, scenario, run: provider.run })),
);

describe("provider adapter integration matrix", () => {
  it.each(provider_scenario_matrix)(
    "$provider / $scenario exercises the actual adapter boundary",
    async ({ run, scenario }) => {
      await run(scenario);
    },
  );
});

interface SettledProviderCompletion {
  readonly result: ImageGenerationResult;
  readonly output_assets: readonly ProviderOutputAsset[];
  readonly saw_pending: boolean;
}

async function settle_submission<TRequest extends ImageGenerationRequest>(
  harness: MatrixHarness<TRequest>,
  context: ProviderExecutionContext,
): Promise<SettledProviderCompletion> {
  let submission = await harness.adapter.submit(context, harness.request);
  let saw_pending = false;
  for (let poll_count = 0; poll_count < 20; poll_count += 1) {
    if (submission.state === "completed") {
      return {
        result: ImageGenerationResultSchema.parse(submission.result),
        output_assets: submission.output_assets,
        saw_pending,
      };
    }
    saw_pending = true;
    const poll_result = await harness.adapter.poll(context, submission);
    if (poll_result.state === "completed") {
      return {
        result: ImageGenerationResultSchema.parse(poll_result.result),
        output_assets: poll_result.output_assets,
        saw_pending,
      };
    }
    if (poll_result.state === "failed") {
      throw new ProviderAdapterError(poll_result.error);
    }
    submission = pending_submission(submission, poll_result.poll_after_ms);
  }
  throw new ProviderAdapterError({ code: "timed_out", retryable: false });
}

function pending_submission(
  submission: Extract<ProviderSubmission, { state: "pending" }>,
  poll_after_ms: number | undefined,
): Extract<ProviderSubmission, { state: "pending" }> {
  return {
    state: "pending",
    submission_id: submission.submission_id,
    ...(submission.continuation === undefined ? {} : { continuation: submission.continuation }),
    ...(poll_after_ms === undefined ? {} : { poll_after_ms }),
  };
}

async function run_matrix_case<TRequest extends ImageGenerationRequest>(
  create_harness: HarnessFactory<TRequest>,
  scenario: ProviderContractScenario,
): Promise<void> {
  const harness = create_harness(scenario);
  const profile = harness.adapter.validate_profile(harness.raw_profile);
  const context: ProviderExecutionContext = { ...harness.context, profile };
  const source_request = structuredClone(harness.request);
  let completion: SettledProviderCompletion | undefined;
  let failure: unknown;

  try {
    completion = await settle_submission(harness, context);
  } catch (error) {
    failure = error;
  }

  expect(harness.request).toEqual(source_request);
  if (harness.expectation.kind === "success") {
    expect(failure).toBeUndefined();
    expect(completion).toBeDefined();
    if (completion === undefined) {
      throw new Error("Expected provider completion");
    }
    expect(completion.result.assets).toHaveLength(harness.expectation.asset_count);
    expect(completion.output_assets).toHaveLength(harness.expectation.asset_count);
    expect(completion.output_assets.map(({ asset }) => asset)).toEqual(completion.result.assets);
    expect(completion.saw_pending).toBe(harness.expects_async_poll);
    expect(harness.asset_reader.reads).toEqual(
      scenario === "reference_image" ? [REFERENCE_ASSET_ID] : [],
    );

    const actual_bytes = completion.output_assets.map(({ bytes }) => bytes);
    expect(actual_bytes).toEqual(harness.expected_output_bytes);
    for (const [index, output_asset] of completion.output_assets.entries()) {
      const expected_bytes = harness.expected_output_bytes[index];
      const result_asset = completion.result.assets[index];
      if (expected_bytes === undefined || result_asset === undefined) {
        throw new Error(`Missing expected asset at index ${String(index)}`);
      }
      expect(output_asset.bytes).toEqual(expected_bytes);
      expect(output_asset.asset).toEqual(result_asset);
      expect(output_asset.asset.media_type).toBe("image/png");
      expect(output_asset.asset.byte_length).toBe(expected_bytes.byteLength);
      expect(output_asset.asset.sha256).toBe(sha256_hex(expected_bytes));
      expect(output_asset.asset.asset_id).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/u,
      );
    }
    expect(completion.result.assets.map(({ asset_id }) => asset_id)).toEqual(
      completion.output_assets.map(({ asset }) => asset.asset_id),
    );
    expect(JSON.stringify(completion.result)).not.toMatch(/"bytes"\s*:/u);
    expect(JSON.stringify(completion.result)).not.toContain(harness.request.prompt);
    expect(JSON.stringify(completion.result)).not.toContain(harness.request.generation_anchor);
  } else {
    expect(failure).toBeInstanceOf(ProviderAdapterError);
    expect((failure as ProviderAdapterError).provider_error.code).toBe(harness.expectation.code);
    expect(harness.asset_reader.reads).toEqual([]);
  }

  if (scenario === "reference_image") {
    if (!harness.adapter.capabilities.has("reference_image")) {
      expect((failure as ProviderAdapterError).provider_error.code).toBe("invalid_request");
    }
  }
  if (scenario === "rate_limit") {
    expect(harness.transport.operations).toHaveLength(3);
    expect(harness.clock.sleep_delays).toEqual([1000, 1000]);
    expect((failure as ProviderAdapterError).provider_error.retry_after_ms).toBe(1000);
  }

  const serialized_logs = JSON.stringify(harness.log_records());
  expect(serialized_logs).not.toMatch(/"bytes"\s*:/u);
  expect(serialized_logs).not.toContain(harness.request.prompt);
  expect(serialized_logs).not.toContain(harness.request.generation_anchor);
  expect(serialized_logs).not.toContain("provider-secret");
}

function sha256_hex(bytes: Uint8Array): string {
  return createHash("sha256").update(bytes).digest("hex");
}

function bytes_to_base64(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString("base64");
}

async function read_json_fixture(relative_path: string): Promise<unknown> {
  const source = await readFile(
    new URL(`../fixtures/providers/${relative_path}`, import.meta.url),
    "utf8",
  );
  return JSON.parse(source) as unknown;
}
