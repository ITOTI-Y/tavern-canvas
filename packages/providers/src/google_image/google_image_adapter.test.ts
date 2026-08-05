import { readFile } from "node:fs/promises";

import { AssetIdSchema, GoogleImageRequestSchema, type AssetId } from "@tavern-canvas/contracts";
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
import { GoogleImageAdapter } from "./google_image_adapter.js";

const REQUEST_ID = "11111111-1111-4111-8111-111111111111";
const ASSET_ID = AssetIdSchema.parse("33333333-3333-4333-8333-333333333333");
const GENERATION_ANCHOR = "a".repeat(64);
const PNG_BASE64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";
const PNG_BYTES = base64_to_bytes(PNG_BASE64);

const request_fixture = await read_json_fixture(
  "../../../../tests/fixtures/providers/google_image/interaction_request.json",
);
const response_fixture = await read_json_fixture(
  "../../../../tests/fixtures/providers/google_image/interaction_response.json",
);
const safety_fixture = await read_json_fixture(
  "../../../../tests/fixtures/providers/google_image/safety_response.json",
);

const profile = {
  profile_id: "google-cloud",
  provider_id: "google_image",
  model_allowlist: ["gemini-3.1-flash-image"],
  output_mime_type_allowlist: ["image/png", "image/jpeg", "image/webp"],
  max_response_bytes: 2_000_000,
  max_input_asset_bytes: 2_000_000,
};

const request = GoogleImageRequestSchema.parse({
  provider_id: "google_image",
  request_id: REQUEST_ID,
  generation_anchor: GENERATION_ANCHOR,
  prompt: "fixture prompt",
  output_count: 1,
  model_id: "gemini-3.1-flash-image",
  reference_asset_ids: [ASSET_ID],
  aspect_ratio: "1:1",
  image_size: "2K",
  output_mime_type: "image/png",
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

function contract_case(scenario: ProviderContractScenario) {
  const controller = new AbortController();
  const log = new RecordingLog();
  let case_request = request;
  let expectation: ProviderContractExpectation = { kind: "success", asset_count: 1 };
  let responses: (ProviderTransportResponse | Error)[] = [json_response(200, response_fixture)];
  let raw_profile: unknown = profile;

  if (scenario === "multiple_images") {
    case_request = GoogleImageRequestSchema.parse({ ...request, output_count: 2 });
    responses = [json_response(200, response_fixture), json_response(200, response_fixture)];
    expectation = { kind: "success", asset_count: 2 };
  } else if (scenario === "auth_failure") {
    responses = [json_response(401, {})];
    expectation = { kind: "error", code: "auth_failed" };
  } else if (scenario === "content_rejection") {
    responses = [json_response(200, safety_fixture)];
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
    responses = [
      json_response(200, {
        status: "completed",
        steps: [{ type: "model_output", content: [{ type: "text", text: "no image" }] }],
      }),
    ];
    expectation = { kind: "error", code: "malformed_response" };
  } else if (scenario === "unsupported_capability") {
    raw_profile = { ...profile, output_mime_type_allowlist: ["image/jpeg"] };
    responses = [];
    expectation = { kind: "error", code: "invalid_request" };
  }

  return {
    adapter: new GoogleImageAdapter({ clock: new ImmediateClock(), random: new FixedRandom() }),
    raw_profile,
    context: {
      transport: new ScriptedTransport(responses),
      assets: new StaticAssetReader(),
      signal: controller.signal,
      log,
    },
    request: case_request,
    expectation,
    secret_markers: [case_request.prompt, "synthetic safety rejection"],
    log_records: () => log.records,
  };
}

define_provider_contract_suite("Google image", contract_case);

describe("GoogleImageAdapter", () => {
  it("maps text and reference images to typed Interaction parts", async () => {
    const transport = new ScriptedTransport([json_response(200, response_fixture)]);
    const adapter = new GoogleImageAdapter();
    const context = create_context(adapter, transport);

    await adapter.submit(context, request);
    expect(transport.operations).toHaveLength(1);
    expect(transport.operations[0]?.route).toBe("/v1beta/interactions");
    expect(decode_json(transport.operations[0]?.body)).toEqual(request_fixture);
    expect((decode_json(transport.operations[0]?.body) as { input: unknown[] }).input).toEqual([
      { type: "text", text: "fixture prompt" },
      { type: "image", mime_type: "image/png", data: PNG_BASE64 },
    ]);
  });

  it("distinguishes output text from image parts", async () => {
    const adapter = new GoogleImageAdapter();
    await expect(
      adapter.submit(
        create_context(adapter, new ScriptedTransport([json_response(200, response_fixture)])),
        request,
      ),
    ).resolves.toMatchObject({
      state: "completed",
      result: { assets: [{ media_type: "image/png" }] },
    });
  });

  it("maps safety failure and rejects absent image parts", async () => {
    const adapter = new GoogleImageAdapter();
    await expect(
      adapter.submit(
        create_context(adapter, new ScriptedTransport([json_response(200, safety_fixture)])),
        request,
      ),
    ).rejects.toMatchObject({ provider_error: { code: "content_blocked" } });
    await expect(
      adapter.submit(
        create_context(
          adapter,
          new ScriptedTransport([
            json_response(200, {
              status: "completed",
              steps: [{ type: "model_output", content: [{ type: "text", text: "only text" }] }],
            }),
          ]),
        ),
        request,
      ),
    ).rejects.toMatchObject({ provider_error: { code: "malformed_response" } });
  });

  it("rejects image bytes that disagree with the declared MIME type", async () => {
    const adapter = new GoogleImageAdapter();
    const mismatched_response = {
      id: "interaction_fixture",
      model: "gemini-3.1-flash-image",
      status: "completed",
      steps: [
        {
          type: "model_output",
          content: [
            {
              type: "image",
              mime_type: "image/png",
              data: "/9j/2Q==",
            },
          ],
        },
      ],
    };

    await expect(
      adapter.submit(
        create_context(adapter, new ScriptedTransport([json_response(200, mismatched_response)])),
        request,
      ),
    ).rejects.toMatchObject({
      provider_error: { code: "malformed_response" },
    });
  });

  it("enforces model and MIME allowlists", async () => {
    const adapter = new GoogleImageAdapter();
    const bad_profile = {
      ...profile,
      model_allowlist: ["gemini-3-pro-image-preview"],
      output_mime_type_allowlist: ["image/jpeg"],
    };
    await expect(
      adapter.submit(
        {
          ...create_context(adapter, new ScriptedTransport([])),
          profile: adapter.validate_profile(bad_profile),
        },
        request,
      ),
    ).rejects.toMatchObject({ provider_error: { code: "invalid_request" } });
  });
});

function create_context(adapter: GoogleImageAdapter, transport: ProviderTransport) {
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
