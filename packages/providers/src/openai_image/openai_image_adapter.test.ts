import { readFile } from "node:fs/promises";

import { AssetIdSchema, OpenAiImageRequestSchema, type AssetId } from "@tavern-canvas/contracts";
import { describe, expect, it } from "vitest";

import type {
  ProviderAssetReader,
  ProviderLogSink,
  ProviderSourceAsset,
} from "../provider_adapter.js";
import { ProviderAdapterError } from "../provider_error.js";
import type {
  ProviderRemoteAssetOperation,
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
import { OpenAiImageAdapter } from "./openai_image_adapter.js";

const REQUEST_ID = "11111111-1111-4111-8111-111111111111";
const ASSET_ID = AssetIdSchema.parse("33333333-3333-4333-8333-333333333333");
const MASK_ID = AssetIdSchema.parse("44444444-4444-4444-8444-444444444444");
const GENERATION_ANCHOR = "a".repeat(64);
const PNG_BASE64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";
const WEBP_BASE64 = "UklGRgQAAABXRUJQ";
const PNG_BYTES = base64_to_bytes(PNG_BASE64);

const generation_request_fixture = await read_json_fixture(
  "../../../../tests/fixtures/providers/openai_image/generation_request.json",
);
const generation_response_fixture = await read_json_fixture(
  "../../../../tests/fixtures/providers/openai_image/generation_response.json",
);
const url_response_fixture = await read_json_fixture(
  "../../../../tests/fixtures/providers/openai_image/url_response.json",
);
const policy_error_fixture = await read_json_fixture(
  "../../../../tests/fixtures/providers/openai_image/content_policy_error.json",
);

const profile = {
  profile_id: "openai-cloud",
  provider_id: "openai_image",
  model_allowlist: ["gpt-image-2"],
  output_mime_type_allowlist: ["image/png", "image/jpeg", "image/webp"],
  remote_asset_origin_allowlist: ["https://assets.openai.example"],
  max_response_bytes: 2_000_000,
  max_input_asset_bytes: 2_000_000,
};

const generation_request = OpenAiImageRequestSchema.parse({
  provider_id: "openai_image",
  request_id: REQUEST_ID,
  generation_anchor: GENERATION_ANCHOR,
  prompt: "fixture prompt",
  output_count: 1,
  mode: "generate",
  model_id: "gpt-image-2",
  size: "1024x1024",
  quality: "high",
  background: "opaque",
  output_format: "png",
  input_asset_ids: [],
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
  readonly remote_operations: ProviderRemoteAssetOperation[] = [];

  constructor(
    private readonly responses: (ProviderTransportResponse | Error)[],
    private readonly remote_responses: ProviderTransportResponse[] = [],
  ) {}

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

  fetch_remote_asset(operation: ProviderRemoteAssetOperation): Promise<ProviderTransportResponse> {
    this.remote_operations.push(operation);
    const response = this.remote_responses.shift();
    return response === undefined
      ? Promise.reject(new Error("Remote asset transport exhausted"))
      : Promise.resolve(response);
  }
}

class StaticAssetReader implements ProviderAssetReader {
  async read(asset_id: AssetId): Promise<ProviderSourceAsset> {
    return { asset_id, media_type: "image/png", bytes: PNG_BYTES };
  }
}

class RecordingLog implements ProviderLogSink {
  readonly records: unknown[] = [];
  write(record: unknown): void {
    this.records.push(record);
  }
}

function json_response(status: number, value: unknown): ProviderTransportResponse {
  return {
    status,
    headers: { "content-type": "application/json" },
    body: new TextEncoder().encode(JSON.stringify(value)),
  };
}

function image_response(): ProviderTransportResponse {
  return { status: 200, headers: { "content-type": "image/png" }, body: PNG_BYTES };
}

function contract_case(scenario: ProviderContractScenario) {
  const controller = new AbortController();
  const log = new RecordingLog();
  let request = generation_request;
  let expectation: ProviderContractExpectation = { kind: "success", asset_count: 1 };
  let responses: (ProviderTransportResponse | Error)[] = [
    json_response(200, generation_response_fixture),
  ];

  if (scenario === "multiple_images") {
    request = OpenAiImageRequestSchema.parse({ ...generation_request, output_count: 2 });
    responses = [
      json_response(200, {
        data: [{ b64_json: PNG_BASE64 }, { b64_json: PNG_BASE64 }],
      }),
    ];
    expectation = { kind: "success", asset_count: 2 };
  } else if (scenario === "auth_failure") {
    responses = [json_response(401, {})];
    expectation = { kind: "error", code: "auth_failed" };
  } else if (scenario === "content_rejection") {
    responses = [json_response(400, policy_error_fixture)];
    expectation = { kind: "error", code: "content_blocked" };
  } else if (scenario === "rate_limit") {
    responses = Array.from({ length: 3 }, () => json_response(429, {}));
    expectation = { kind: "error", code: "rate_limited" };
  } else if (scenario === "timeout") {
    responses = [new ProviderAdapterError({ code: "timed_out", retryable: false })];
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
      ...generation_request,
      mode: "edit",
      prompt: "fixture edit prompt",
      input_asset_ids: [ASSET_ID],
    });
  } else if (scenario === "unsupported_capability") {
    request = OpenAiImageRequestSchema.parse({
      ...generation_request,
      output_format: "jpeg",
    });
    expectation = { kind: "error", code: "invalid_request" };
    return harness(request, expectation, responses, controller, log, {
      ...profile,
      output_mime_type_allowlist: ["image/png"],
    });
  }

  return harness(request, expectation, responses, controller, log, profile);
}

function harness(
  request: ReturnType<typeof OpenAiImageRequestSchema.parse>,
  expectation: ProviderContractExpectation,
  responses: (ProviderTransportResponse | Error)[],
  controller: AbortController,
  log: RecordingLog,
  raw_profile: unknown,
) {
  return {
    adapter: new OpenAiImageAdapter({ clock: new ImmediateClock(), random: new FixedRandom() }),
    raw_profile,
    context: {
      transport: new ScriptedTransport(responses),
      assets: new StaticAssetReader(),
      signal: controller.signal,
      log,
    },
    request,
    expectation,
    secret_markers: [request.prompt, "synthetic policy rejection"],
    log_records: () => log.records,
  };
}

define_provider_contract_suite("OpenAI image", contract_case);

describe("OpenAiImageAdapter", () => {
  it("maps generation fields exactly once to the JSON route", async () => {
    const transport = new ScriptedTransport([json_response(200, generation_response_fixture)]);
    const adapter = new OpenAiImageAdapter();
    const context = create_context(adapter, transport);

    await adapter.submit(context, generation_request);
    expect(transport.operations).toHaveLength(1);
    expect(transport.operations[0]?.route).toBe("/v1/images/generations");
    expect(Reflect.get(transport.operations[0] ?? {}, "max_response_bytes")).toBe(
      profile.max_response_bytes,
    );
    expect(decode_json(transport.operations[0]?.body)).toEqual(generation_request_fixture);
  });

  it("maps edit fields and mask to multipart without duplication", async () => {
    const transport = new ScriptedTransport([
      json_response(200, { data: [{ b64_json: WEBP_BASE64 }] }),
    ]);
    const adapter = new OpenAiImageAdapter();
    const context = create_context(adapter, transport);
    const edit_request = OpenAiImageRequestSchema.parse({
      ...generation_request,
      mode: "edit",
      prompt: "fixture edit prompt",
      background: "transparent",
      output_format: "webp",
      compression: 80,
      input_asset_ids: [ASSET_ID],
      mask_asset_id: MASK_ID,
    });

    await adapter.submit(context, edit_request);
    const operation = transport.operations[0];
    expect(operation?.route).toBe("/v1/images/edits");
    expect(operation?.content_type).toMatch(/^multipart\/form-data; boundary=/u);
    const body_text = new TextDecoder("latin1").decode(operation?.body);
    for (const field of [
      "model",
      "prompt",
      "n",
      "size",
      "quality",
      "background",
      "output_format",
      "output_compression",
    ]) {
      expect(body_text.match(new RegExp(`name="${field}"`, "gu"))).toHaveLength(1);
    }
    expect(body_text).toContain('name="image[]"; filename="input_0.png"');
    expect(body_text).toContain('name="mask"; filename="mask.png"');
  });

  it("uses a random multipart boundary independent of request content", async () => {
    const predictable_boundary = `tavern-canvas-${REQUEST_ID}`;
    const transport = new ScriptedTransport([json_response(200, generation_response_fixture)]);
    const adapter = new OpenAiImageAdapter();
    const context = create_context(adapter, transport);
    const edit_request = OpenAiImageRequestSchema.parse({
      ...generation_request,
      mode: "edit",
      prompt: `fixture\r\n--${predictable_boundary}\r\ninjected`,
      input_asset_ids: [ASSET_ID],
    });

    await adapter.submit(context, edit_request);
    const content_type = transport.operations[0]?.content_type;
    expect(content_type).toMatch(/^multipart\/form-data; boundary=/u);
    expect(content_type).not.toContain(predictable_boundary);
  });

  it("rejects unsupported negative prompts before transport", async () => {
    const transport = new ScriptedTransport([]);
    const adapter = new OpenAiImageAdapter();
    const context = create_context(adapter, transport);
    const unsupported_request = OpenAiImageRequestSchema.parse({
      ...generation_request,
      negative_prompt: "watermark",
    });

    await expect(adapter.submit(context, unsupported_request)).rejects.toMatchObject({
      provider_error: { code: "invalid_request" },
    });
    expect(transport.operations).toHaveLength(0);
  });

  it("requires an edit input when a mask is requested", () => {
    expect(
      OpenAiImageRequestSchema.safeParse({
        ...generation_request,
        mode: "edit",
        input_asset_ids: [],
        mask_asset_id: MASK_ID,
      }).success,
    ).toBe(false);
  });

  it("rejects image bytes that disagree with the requested output format", async () => {
    const adapter = new OpenAiImageAdapter();
    const transport = new ScriptedTransport([
      json_response(200, { data: [{ b64_json: "/9j/2Q==" }] }),
    ]);

    await expect(
      adapter.submit(create_context(adapter, transport), generation_request),
    ).rejects.toMatchObject({
      provider_error: { code: "malformed_response" },
    });
  });

  it("normalizes URL output through the transport allowlist", async () => {
    const transport = new ScriptedTransport(
      [json_response(200, url_response_fixture)],
      [image_response()],
    );
    const adapter = new OpenAiImageAdapter();
    const context = create_context(adapter, transport);

    const submission = await adapter.submit(context, generation_request);
    expect(submission).toMatchObject({
      state: "completed",
      result: { assets: [{ media_type: "image/png" }] },
    });
    if (submission.state !== "completed") {
      throw new TypeError("Expected completed submission");
    }
    expect(submission.result.assets[0]).not.toHaveProperty("persisted_url");
    expect(transport.remote_operations).toEqual([
      expect.objectContaining({
        url: "https://assets.openai.example/generated/fixture.png",
        allowed_origins: ["https://assets.openai.example"],
      }),
    ]);
  });

  it("retries only a transient remote asset download", async () => {
    const transport = new ScriptedTransport(
      [json_response(200, url_response_fixture)],
      [json_response(503, {}), image_response()],
    );
    const adapter = new OpenAiImageAdapter({
      clock: new ImmediateClock(),
      random: new FixedRandom(),
    });

    await expect(
      adapter.submit(create_context(adapter, transport), generation_request),
    ).resolves.toMatchObject({ state: "completed" });
    expect(transport.operations).toHaveLength(1);
    expect(transport.remote_operations).toHaveLength(2);
  });
});

function create_context(adapter: OpenAiImageAdapter, transport: ProviderTransport) {
  return {
    profile: adapter.validate_profile(profile),
    transport,
    assets: new StaticAssetReader(),
    signal: new AbortController().signal,
    log: new RecordingLog(),
  };
}

async function read_json_fixture(relative_path: string): Promise<unknown> {
  const text = await readFile(new URL(relative_path, import.meta.url), "utf8");
  return JSON.parse(text) as unknown;
}

function decode_json(body: Uint8Array | undefined): unknown {
  if (body === undefined) {
    throw new TypeError("Expected JSON body");
  }
  return JSON.parse(new TextDecoder().decode(body)) as unknown;
}

function base64_to_bytes(value: string): Uint8Array {
  return Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
}
