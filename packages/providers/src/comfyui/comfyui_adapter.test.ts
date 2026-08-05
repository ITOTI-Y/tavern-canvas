import { readFile } from "node:fs/promises";

import { AssetIdSchema, ComfyUiRequestSchema, type AssetId } from "@tavern-canvas/contracts";
import { describe, expect, it } from "vitest";

import type {
  ProviderAssetReader,
  ProviderLogSink,
  ProviderSourceAsset,
  ProviderSubmission,
} from "../provider_adapter.js";
import { ProviderAdapterError, ProviderNetworkError } from "../provider_error.js";
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
import { ComfyUiAdapter, type ComfyUiWorkflowStore } from "./comfyui_adapter.js";
import { validate_stored_comfyui_workflow } from "./workflow_renderer.js";

const REQUEST_ID = "11111111-1111-4111-8111-111111111111";
const WORKFLOW_ID = AssetIdSchema.parse("33333333-3333-4333-8333-333333333333");
const PROMPT_ID = "44444444-4444-4444-8444-444444444444";
const GENERATION_ANCHOR = "a".repeat(64);
const PNG_BASE64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";
const PNG_BYTES = base64_to_bytes(PNG_BASE64);

const stored_workflow = await read_json_fixture(
  "../../../../tests/fixtures/providers/comfyui/stored_workflow.json",
);
const prompt_response = await read_json_fixture(
  "../../../../tests/fixtures/providers/comfyui/prompt_response.json",
);
const history_response = await read_json_fixture(
  "../../../../tests/fixtures/providers/comfyui/history_response.json",
);

const profile = {
  profile_id: "comfy-local",
  provider_id: "comfyui",
  model_allowlist: ["stored-workflows"],
  output_mime_type_allowlist: ["image/png", "image/jpeg", "image/webp"],
  workflow_allowlist: [WORKFLOW_ID],
  max_response_bytes: 2_000_000,
  max_input_asset_bytes: 2_000_000,
};

const request = ComfyUiRequestSchema.parse({
  provider_id: "comfyui",
  request_id: REQUEST_ID,
  generation_anchor: GENERATION_ANCHOR,
  prompt: "fixture prompt",
  negative_prompt: "fixture negative prompt",
  output_count: 1,
  workflow_id: WORKFLOW_ID,
  placeholder_values: { cfg: 5.5, style_path: "fixture/output" },
  input_asset_bindings: {},
  output_node_ids: ["9"],
  seed: 42,
});

class StaticWorkflowStore implements ComfyUiWorkflowStore {
  load(workflow_id: AssetId): Promise<unknown> {
    return workflow_id === WORKFLOW_ID
      ? Promise.resolve(structuredClone(stored_workflow))
      : Promise.reject(new Error("Missing workflow"));
  }
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
  return {
    status: 200,
    headers: { "content-type": "image/png" },
    body: PNG_BYTES,
  };
}

function history_with_images(image_count: number, output_nodes = ["9"]): unknown {
  const outputs = Object.fromEntries(
    output_nodes.map((node_id) => [
      node_id,
      {
        images: Array.from({ length: image_count }, (_, index) => ({
          filename: `fixture_${node_id}_${String(index)}.png`,
          subfolder: "",
          type: "output",
        })),
      },
    ]),
  );
  return {
    [PROMPT_ID]: {
      outputs,
      status: { status_str: "success", completed: true, messages: [] },
    },
  };
}

function contract_case(scenario: ProviderContractScenario) {
  const controller = new AbortController();
  const log = new RecordingLog();
  let case_request = request;
  let expectation: ProviderContractExpectation = { kind: "success", asset_count: 1 };
  let responses: (ProviderTransportResponse | Error)[] = [
    json_response(200, prompt_response),
    json_response(200, {}),
    json_response(200, history_response),
    image_response(),
  ];

  if (scenario === "multiple_images") {
    case_request = ComfyUiRequestSchema.parse({ ...request, output_count: 2 });
    responses = [
      json_response(200, prompt_response),
      json_response(200, history_with_images(2)),
      image_response(),
      image_response(),
    ];
    expectation = { kind: "success", asset_count: 2 };
  } else if (scenario === "auth_failure") {
    responses = [json_response(401, {})];
    expectation = { kind: "error", code: "auth_failed" };
  } else if (scenario === "content_rejection") {
    responses = [json_response(451, {})];
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
    responses = [json_response(200, {})];
    expectation = { kind: "error", code: "malformed_response" };
  } else if (scenario === "reference_image") {
    case_request = ComfyUiRequestSchema.parse({
      ...request,
      input_asset_bindings: { reference_image: WORKFLOW_ID },
    });
    responses = [
      json_response(200, { name: "uploaded.png", subfolder: "", type: "input" }),
      json_response(200, prompt_response),
      json_response(200, history_response),
      image_response(),
    ];
  } else if (scenario === "unsupported_capability") {
    case_request = ComfyUiRequestSchema.parse({
      ...request,
      workflow_id: "55555555-5555-4555-8555-555555555555",
    });
    responses = [];
    expectation = { kind: "error", code: "invalid_request" };
  }

  return {
    adapter: new ComfyUiAdapter({
      workflow_store: new StaticWorkflowStore(),
      clock: new ImmediateClock(),
      random: new FixedRandom(),
    }),
    raw_profile: profile,
    context: {
      transport: new ScriptedTransport(responses),
      assets: new StaticAssetReader(),
      signal: controller.signal,
      log,
    },
    request: case_request,
    expectation,
    secret_markers: [case_request.prompt, "private upstream detail"],
    log_records: () => log.records,
  };
}

define_provider_contract_suite("ComfyUI", contract_case);

describe("ComfyUiAdapter", () => {
  it("queues a rendered stored workflow and reads multiple output nodes", async () => {
    const transport = new ScriptedTransport([
      json_response(200, prompt_response),
      json_response(200, history_with_images(1, ["9", "10"])),
      image_response(),
      image_response(),
    ]);
    const adapter = new ComfyUiAdapter({ workflow_store: new StaticWorkflowStore() });
    const context = {
      profile: adapter.validate_profile(profile),
      transport,
      assets: new StaticAssetReader(),
      signal: new AbortController().signal,
      log: new RecordingLog(),
    };
    const two_nodes = ComfyUiRequestSchema.parse({
      ...request,
      output_count: 2,
      output_node_ids: ["9", "10"],
    });

    const submission = await adapter.submit(context, two_nodes);
    expect(submission).toMatchObject({
      state: "pending",
      submission_id: PROMPT_ID,
      continuation: {
        request: {
          request_id: two_nodes.request_id,
          output_count: two_nodes.output_count,
          output_node_ids: two_nodes.output_node_ids,
          seed: two_nodes.seed,
        },
      },
    });
    const queue_body = decode_json(transport.operations[0]?.body);
    expect(queue_body).toMatchObject({
      prompt: {
        "3": { inputs: { seed: 42, cfg: 5.5 } },
        "6": { inputs: { text: "fixture prompt" } },
      },
    });
    await expect(adapter.poll(context, submission)).resolves.toMatchObject({
      state: "completed",
      result: { assets: [{ media_type: "image/png" }, { media_type: "image/png" }] },
    });
    expect(transport.operations.map((operation) => operation.route)).toEqual([
      "/prompt",
      `/history/${PROMPT_ID}`,
      "/view?filename=fixture_9_0.png&subfolder=&type=output",
      "/view?filename=fixture_10_0.png&subfolder=&type=output",
    ]);
  });

  it("resumes a pending prompt after adapter reconstruction", async () => {
    const transport = new ScriptedTransport([
      json_response(200, prompt_response),
      json_response(200, history_response),
      image_response(),
    ]);
    const submitting_adapter = new ComfyUiAdapter({
      workflow_store: new StaticWorkflowStore(),
    });
    const context = {
      profile: submitting_adapter.validate_profile(profile),
      transport,
      assets: new StaticAssetReader(),
      signal: new AbortController().signal,
      log: new RecordingLog(),
    };
    const submission = await submitting_adapter.submit(context, request);
    const restored_adapter = new ComfyUiAdapter({
      workflow_store: new StaticWorkflowStore(),
    });

    await expect(restored_adapter.poll(context, submission)).resolves.toMatchObject({
      state: "completed",
      result: { assets: [{ media_type: "image/png" }] },
    });
  });

  it("rejects undeclared input bindings before uploading", async () => {
    const transport = new ScriptedTransport([]);
    const adapter = new ComfyUiAdapter({ workflow_store: new StaticWorkflowStore() });
    const context = {
      profile: adapter.validate_profile(profile),
      transport,
      assets: new StaticAssetReader(),
      signal: new AbortController().signal,
      log: new RecordingLog(),
    };
    const invalid_binding_request = ComfyUiRequestSchema.parse({
      ...request,
      input_asset_bindings: { undeclared: WORKFLOW_ID },
    });

    await expect(adapter.submit(context, invalid_binding_request)).rejects.toMatchObject({
      provider_error: { code: "invalid_request" },
    });
    expect(transport.operations).toHaveLength(0);
  });

  it("normalizes an input upload network failure", async () => {
    const transport = new ScriptedTransport([new ProviderNetworkError()]);
    const adapter = new ComfyUiAdapter({ workflow_store: new StaticWorkflowStore() });
    const context = {
      profile: adapter.validate_profile(profile),
      transport,
      assets: new StaticAssetReader(),
      signal: new AbortController().signal,
      log: new RecordingLog(),
    };
    const input_request = ComfyUiRequestSchema.parse({
      ...request,
      input_asset_bindings: { reference_image: WORKFLOW_ID },
    });

    await expect(adapter.submit(context, input_request)).rejects.toMatchObject({
      provider_error: { code: "provider_unavailable" },
    });
    expect(transport.operations.map((operation) => operation.route)).toEqual(["/upload/image"]);
  });

  it("bounds history JSON before parsing and collecting outputs", async () => {
    const padded_history = {
      ...(history_with_images(1) as Record<string, unknown>),
      padding: "x".repeat(1_000),
    };
    const transport = new ScriptedTransport([
      json_response(200, prompt_response),
      json_response(200, padded_history),
      image_response(),
    ]);
    const adapter = new ComfyUiAdapter({ workflow_store: new StaticWorkflowStore() });
    const context = {
      profile: adapter.validate_profile({ ...profile, max_response_bytes: 500 }),
      transport,
      assets: new StaticAssetReader(),
      signal: new AbortController().signal,
      log: new RecordingLog(),
    };
    const submission = await adapter.submit(context, request);

    await expect(adapter.poll(context, submission)).rejects.toMatchObject({
      provider_error: { code: "malformed_response" },
    });
    expect(transport.operations.map((operation) => operation.route)).not.toContain(
      "/view?filename=fixture_9_0.png&subfolder=&type=output",
    );
  });

  it("retries a transient history read without resubmitting the prompt", async () => {
    const transport = new ScriptedTransport([
      json_response(200, prompt_response),
      json_response(503, {}),
      json_response(200, history_response),
      image_response(),
    ]);
    const adapter = new ComfyUiAdapter({
      workflow_store: new StaticWorkflowStore(),
      clock: new ImmediateClock(),
      random: new FixedRandom(),
    });
    const context = {
      profile: adapter.validate_profile(profile),
      transport,
      assets: new StaticAssetReader(),
      signal: new AbortController().signal,
      log: new RecordingLog(),
    };
    const submission = await adapter.submit(context, request);

    await expect(adapter.poll(context, submission)).resolves.toMatchObject({
      state: "completed",
    });
    expect(transport.operations.map((operation) => operation.route)).toEqual([
      "/prompt",
      `/history/${PROMPT_ID}`,
      `/history/${PROMPT_ID}`,
      "/view?filename=fixture_00001_.png&subfolder=&type=output",
    ]);
  });

  it("does not retry an ambiguous prompt submission failure", async () => {
    const transport = new ScriptedTransport([
      new ProviderNetworkError(),
      json_response(200, prompt_response),
    ]);
    const adapter = new ComfyUiAdapter({
      workflow_store: new StaticWorkflowStore(),
      clock: new ImmediateClock(),
      random: new FixedRandom(),
    });
    const context = {
      profile: adapter.validate_profile(profile),
      transport,
      assets: new StaticAssetReader(),
      signal: new AbortController().signal,
      log: new RecordingLog(),
    };

    await expect(adapter.submit(context, request)).rejects.toMatchObject({
      provider_error: { code: "provider_unavailable", retryable: false },
    });
    expect(transport.operations.map((operation) => operation.route)).toEqual(["/prompt"]);
  });

  it("applies the input byte limit cumulatively before uploading", async () => {
    const validated_workflow = validate_stored_comfyui_workflow(stored_workflow);
    const workflow_store: ComfyUiWorkflowStore = {
      load: () =>
        Promise.resolve({
          ...validated_workflow,
          bindings: {
            ...validated_workflow.bindings,
            input_assets: {
              ...validated_workflow.bindings.input_assets,
              second: { node_id: "8", property: "image" },
            },
          },
        }),
    };
    const transport = new ScriptedTransport([]);
    const adapter = new ComfyUiAdapter({ workflow_store });
    const context = {
      profile: adapter.validate_profile({
        ...profile,
        max_input_asset_bytes: 100,
      }),
      transport,
      assets: new StaticAssetReader(),
      signal: new AbortController().signal,
      log: new RecordingLog(),
    };
    const two_input_request = ComfyUiRequestSchema.parse({
      ...request,
      input_asset_bindings: {
        reference_image: WORKFLOW_ID,
        second: WORKFLOW_ID,
      },
    });

    await expect(adapter.submit(context, two_input_request)).rejects.toMatchObject({
      provider_error: { code: "invalid_request" },
    });
    expect(transport.operations).toHaveLength(0);
  });

  it("maps history execution failure", async () => {
    const adapter = new ComfyUiAdapter({ workflow_store: new StaticWorkflowStore() });
    const context = {
      profile: adapter.validate_profile(profile),
      transport: new ScriptedTransport([
        json_response(200, prompt_response),
        json_response(200, {
          [PROMPT_ID]: {
            outputs: {},
            status: { status_str: "error", completed: false, messages: [] },
          },
        }),
      ]),
      assets: new StaticAssetReader(),
      signal: new AbortController().signal,
      log: new RecordingLog(),
    };
    const submission = await adapter.submit(context, request);
    await expect(adapter.poll(context, submission)).resolves.toEqual({
      state: "failed",
      error: { code: "provider_unavailable", retryable: false },
    });
  });

  it("interrupts only when the target prompt is running", async () => {
    const adapter = new ComfyUiAdapter({ workflow_store: new StaticWorkflowStore() });
    const transport = new ScriptedTransport([
      json_response(200, { queue_running: [[1, PROMPT_ID, {}, {}]], queue_pending: [] }),
      json_response(200, {}),
    ]);
    const context = {
      profile: adapter.validate_profile(profile),
      transport,
      assets: new StaticAssetReader(),
      signal: new AbortController().signal,
      log: new RecordingLog(),
    };
    const submission: ProviderSubmission = { state: "pending", submission_id: PROMPT_ID };

    await adapter.cancel(context, submission);
    expect(transport.operations.map((operation) => operation.route)).toEqual([
      "/queue",
      "/interrupt",
    ]);
  });
});

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
