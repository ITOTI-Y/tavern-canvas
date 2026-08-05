import { createHash } from "node:crypto";
import { mkdtemp, rm } from "node:fs/promises";
import { createServer, type IncomingMessage, type Server, type ServerResponse } from "node:http";
import { type AddressInfo } from "node:net";
import os from "node:os";
import path from "node:path";
import { PassThrough } from "node:stream";

import type { GatewayJobEvent, GatewayJobResponse, ProviderId } from "@tavern-canvas/contracts";
import {
  GatewayCapabilitiesResponseSchema,
  GatewayJobEventSchema,
  GatewayJobResponseSchema,
} from "@tavern-canvas/contracts";
import { ComfyUiAdapter, SdWebuiAdapter } from "../../packages/providers/src/index.js";
import { create_gateway_runtime, type GatewayRuntime } from "../../apps/gateway/src/index.js";
import {
  load_gateway_config,
  type GatewayConfig,
} from "../../apps/gateway/src/config/load_config.js";
import {
  create_gateway_logger,
  type GatewayLogger,
} from "../../apps/gateway/src/logging/logger.js";
import type { GatewayAdapter } from "../../apps/gateway/src/jobs/job_worker.js";
import { describe, expect, it } from "vitest";

const GATEWAY_TOKEN = "fixture-gateway-bearer";
const PROVIDER_CREDENTIAL = "fixture-provider-credential";
const ALLOWED_ORIGIN = "https://app.example";
const DENIED_ORIGIN = "https://evil.example";
const FIXTURE_PROMPT = "fixture prompt must never appear in gateway logs";
const POLLING_PROMPT = "polling-only fixture prompt";
const CANCELLATION_PROMPT = "pending cancellation fixture prompt";
const UPSTREAM_RESPONSE_MARKER = "UPSTREAM_FULL_RESPONSE_MARKER";
const PNG_BASE64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";
const PNG_BYTES = Buffer.from(PNG_BASE64, "base64");
const WORKFLOW_ID = "44444444-4444-4444-8444-444444444444";
const FIRST_REQUEST_ID = "11111111-1111-4111-8111-111111111111";
const SECOND_REQUEST_ID = "11111111-1111-4111-8111-111111111112";
const CANCELLATION_REQUEST_ID = "11111111-1111-4111-8111-111111111113";
const JOB_EVENT_TIMEOUT_MS = 5_000;
const POLL_TIMEOUT_MS = 5_000;

interface AssetUploadResponse {
  readonly protocol_version: "1.0";
  readonly asset_id: string;
  readonly sha256: string;
  readonly media_type: "image/png";
  readonly byte_length: number;
}

interface AssetMetadataResponse extends AssetUploadResponse {
  readonly created_at: string;
}

interface GatewayErrorResponse {
  readonly protocol_version: "1.0";
  readonly error: {
    readonly code: string;
    readonly retryable: boolean;
    readonly correlation_id: string;
  };
}

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;
const SHA256_PATTERN = /^[a-f0-9]{64}$/u;
const ISO_DATETIME_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/u;

function is_record(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function is_uuid(value: unknown): value is string {
  return typeof value === "string" && UUID_PATTERN.test(value);
}

function is_positive_integer(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value) && value > 0;
}

function is_sha256(value: unknown): value is string {
  return typeof value === "string" && SHA256_PATTERN.test(value);
}

function is_iso_datetime(value: unknown): value is string {
  return typeof value === "string" && ISO_DATETIME_PATTERN.test(value);
}

function parse_asset_upload_response(value: unknown): AssetUploadResponse {
  if (
    !is_record(value) ||
    value.protocol_version !== "1.0" ||
    !is_uuid(value.asset_id) ||
    !is_sha256(value.sha256) ||
    value.media_type !== "image/png" ||
    !is_positive_integer(value.byte_length)
  ) {
    throw new Error("Gateway asset upload response is invalid");
  }
  return {
    protocol_version: "1.0",
    asset_id: value.asset_id,
    sha256: value.sha256,
    media_type: "image/png",
    byte_length: value.byte_length,
  };
}

function parse_asset_metadata_response(value: unknown): AssetMetadataResponse {
  const asset = parse_asset_upload_response(value);
  if (!is_record(value) || !is_iso_datetime(value.created_at)) {
    throw new Error("Gateway asset metadata response is invalid");
  }
  return { ...asset, created_at: value.created_at };
}

function parse_gateway_error_response(value: unknown): GatewayErrorResponse {
  if (!is_record(value) || value.protocol_version !== "1.0") {
    throw new Error("Gateway error response is invalid");
  }
  const error = value.error;
  if (
    !is_record(error) ||
    typeof error.code !== "string" ||
    typeof error.retryable !== "boolean" ||
    !is_uuid(error.correlation_id)
  ) {
    throw new Error("Gateway error response is invalid");
  }
  return {
    protocol_version: "1.0",
    error: {
      code: error.code,
      retryable: error.retryable,
      correlation_id: error.correlation_id,
    },
  };
}

interface UpstreamState {
  sd_submit_count: number;
  comfy_prompt_count: number;
  comfy_history_count: number;
  comfy_queue_get_count: number;
  comfy_cancel_count: number;
  readonly comfy_prompt_ids: string[];
  readonly authorization_headers: string[];
  readonly request_bodies: string[];
  readonly cancelled_prompt_ids: string[];
}

interface ScriptedUpstream {
  readonly base_url: string;
  readonly server: Server;
  readonly state: UpstreamState;
  close(): Promise<void>;
}

interface RunningGateway {
  readonly base_url: string;
  readonly runtime: GatewayRuntime;
}

const WORKFLOW = {
  workflow_id: WORKFLOW_ID,
  workflow: {
    "1": {
      class_type: "SmokeNode",
      inputs: {
        prompt: "placeholder",
        batch_size: 1,
      },
    },
  },
  bindings: {
    prompt: { node_id: "1", property: "prompt" },
    output_count: { node_id: "1", property: "batch_size" },
    placeholders: {},
    input_assets: {},
  },
} as const;

function gateway_headers(origin = ALLOWED_ORIGIN): Record<string, string> {
  return {
    authorization: `Bearer ${GATEWAY_TOKEN}`,
    origin,
  };
}

function create_clock(): () => string {
  let milliseconds = Date.parse("2026-08-05T00:00:00.000Z");
  return () => {
    const value = new Date(milliseconds).toISOString();
    milliseconds += 1;
    return value;
  };
}

function concat_bytes(chunks: readonly Uint8Array[]): Uint8Array {
  const total_length = chunks.reduce((total, chunk) => total + chunk.byteLength, 0);
  const result = new Uint8Array(total_length);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return result;
}

async function read_request_body(request: IncomingMessage): Promise<Uint8Array> {
  const chunks: Uint8Array[] = [];
  for await (const chunk of request) {
    const value: unknown = chunk;
    if (typeof value === "string") {
      chunks.push(new TextEncoder().encode(value));
      continue;
    }
    if (!(value instanceof Uint8Array)) {
      throw new TypeError("Scripted upstream received an invalid request chunk");
    }
    chunks.push(Uint8Array.from(value));
  }
  return concat_bytes(chunks);
}

function write_json(response: ServerResponse, status: number, value: unknown): void {
  const body = JSON.stringify(value);
  response.statusCode = status;
  response.setHeader("content-type", "application/json");
  response.setHeader("content-length", String(Buffer.byteLength(body)));
  response.end(body);
}

async function start_scripted_upstream(): Promise<ScriptedUpstream> {
  const state: UpstreamState = {
    sd_submit_count: 0,
    comfy_prompt_count: 0,
    comfy_history_count: 0,
    comfy_queue_get_count: 0,
    comfy_cancel_count: 0,
    comfy_prompt_ids: [],
    authorization_headers: [],
    request_bodies: [],
    cancelled_prompt_ids: [],
  };
  const server = createServer((request, response) => {
    void (async (): Promise<void> => {
      const body = await read_request_body(request);
      const request_url = new URL(request.url ?? "/", "http://127.0.0.1");
      const method = request.method ?? "GET";
      const authorization = request.headers.authorization;
      if (authorization !== undefined) {
        state.authorization_headers.push(authorization);
      }
      if (body.byteLength > 0) {
        state.request_bodies.push(new TextDecoder().decode(body));
      }

      if (method === "POST" && request_url.pathname === "/sdapi/v1/txt2img") {
        state.sd_submit_count += 1;
        write_json(response, 200, {
          images: [PNG_BASE64],
          parameters: {},
          info: JSON.stringify({ seed: 42 }),
          full_response_marker: UPSTREAM_RESPONSE_MARKER,
        });
        return;
      }

      if (method === "POST" && request_url.pathname === "/prompt") {
        state.comfy_prompt_count += 1;
        const prompt_id = `comfy-smoke-${String(state.comfy_prompt_count)}`;
        state.comfy_prompt_ids.push(prompt_id);
        write_json(response, 200, {
          prompt_id,
          number: state.comfy_prompt_count,
          node_errors: {},
          full_response_marker: UPSTREAM_RESPONSE_MARKER,
        });
        return;
      }

      if (method === "GET" && request_url.pathname.startsWith("/history/")) {
        state.comfy_history_count += 1;
        write_json(response, 200, {});
        return;
      }

      if (request_url.pathname === "/queue" && method === "GET") {
        state.comfy_queue_get_count += 1;
        const prompt_id = state.comfy_prompt_ids.at(-1);
        write_json(response, 200, {
          queue_running: [],
          queue_pending: prompt_id === undefined ? [] : [[0, prompt_id]],
        });
        return;
      }

      if (request_url.pathname === "/queue" && method === "POST") {
        state.comfy_cancel_count += 1;
        try {
          const parsed: unknown = JSON.parse(new TextDecoder().decode(body));
          if (
            is_record(parsed) &&
            Array.isArray(parsed.delete) &&
            typeof parsed.delete[0] === "string"
          ) {
            state.cancelled_prompt_ids.push(parsed.delete[0]);
          }
        } catch {
          // The real adapter reports malformed upstream JSON to the Gateway.
        }
        write_json(response, 200, { success: true });
        return;
      }

      if (method === "POST" && request_url.pathname === "/interrupt") {
        write_json(response, 200, { success: true });
        return;
      }

      response.statusCode = 404;
      response.end();
    })().catch(() => {
      if (!response.writableEnded) {
        response.statusCode = 500;
        response.end();
      }
    });
  });
  const port = await listen_random_port(server);
  return {
    base_url: `http://127.0.0.1:${String(port)}`,
    server,
    state,
    close: () => close_server(server),
  };
}

async function listen_random_port(server: Server): Promise<number> {
  await new Promise<void>((resolve, reject) => {
    const on_error = (error: Error): void => {
      server.off("listening", on_listening);
      reject(error);
    };
    const on_listening = (): void => {
      server.off("error", on_error);
      resolve();
    };
    server.once("error", on_error);
    server.once("listening", on_listening);
    server.listen(0, "127.0.0.1");
  });
  const address = server.address();
  if (address === null || typeof address === "string") {
    throw new Error("Scripted loopback server did not expose an address");
  }
  return (address as AddressInfo).port;
}

async function reserve_loopback_port(): Promise<number> {
  const server = createServer();
  const port = await listen_random_port(server);
  await close_server(server);
  return port;
}

async function close_server(server: Server): Promise<void> {
  if (!server.listening) {
    return;
  }
  await new Promise<void>((resolve, reject) => {
    server.close((error) => (error === undefined ? resolve() : reject(error)));
  });
}

function gateway_config(
  directory: string,
  upstream_base_url: string,
  bind_port: number,
): GatewayConfig {
  const gateway_token_hash = createHash("sha256").update(GATEWAY_TOKEN).digest("hex");
  return load_gateway_config({
    cwd: directory,
    env: {
      TAVERN_CANVAS_BIND_HOST: "127.0.0.1",
      TAVERN_CANVAS_BIND_PORT: String(bind_port),
      TAVERN_CANVAS_CORS_ORIGINS: JSON.stringify([ALLOWED_ORIGIN]),
      TAVERN_CANVAS_BEARER_TOKEN_HASHES: JSON.stringify([gateway_token_hash]),
      TAVERN_CANVAS_DATA_DIR: directory,
      TAVERN_CANVAS_CONCURRENCY: "1",
      TAVERN_CANVAS_MAX_REQUEST_BYTES: "2000000",
      TAVERN_CANVAS_MAX_IMAGE_BYTES: "20000000",
      TAVERN_CANVAS_MAX_IMAGE_PIXELS: "40000000",
      TAVERN_CANVAS_MAX_IMAGE_DIMENSION: "8192",
      TAVERN_CANVAS_PROVIDER_PROFILES: JSON.stringify([
        {
          provider_id: "sd_webui",
          base_url: upstream_base_url,
          credential: PROVIDER_CREDENTIAL,
          profile: {
            profile_id: "sd-webui-smoke",
            provider_id: "sd_webui",
            model_allowlist: ["smoke-model"],
            vae_allowlist: [],
            adetailer_model_allowlist: [],
            controlnet_model_allowlist: [],
            output_mime_type_allowlist: ["image/png"],
            max_response_bytes: 2_000_000,
            max_input_asset_bytes: 2_000_000,
          },
        },
        {
          provider_id: "comfyui",
          base_url: upstream_base_url,
          credential: PROVIDER_CREDENTIAL,
          profile: {
            profile_id: "comfyui-smoke",
            provider_id: "comfyui",
            model_allowlist: ["smoke-model"],
            output_mime_type_allowlist: ["image/png"],
            workflow_allowlist: [WORKFLOW_ID],
            max_response_bytes: 2_000_000,
            max_input_asset_bytes: 2_000_000,
          },
        },
      ]),
    },
  });
}

function gateway_server_url(runtime: GatewayRuntime): string {
  const server = runtime.server;
  if (server === undefined) {
    throw new Error("Gateway runtime did not start a server");
  }
  const address = server.address();
  if (address === null || typeof address === "string") {
    throw new Error("Gateway server did not expose a loopback address");
  }
  return `http://127.0.0.1:${String((address as AddressInfo).port)}`;
}

async function start_gateway(
  directory: string,
  upstream_base_url: string,
  logger: GatewayLogger,
  clock: () => string,
): Promise<RunningGateway> {
  const bind_port = await reserve_loopback_port();
  const runtime = create_gateway_runtime({
    config: gateway_config(directory, upstream_base_url, bind_port),
    adapters: configured_adapters(),
    logger,
    clock,
  });
  try {
    await runtime.start();
    return { runtime, base_url: gateway_server_url(runtime) };
  } catch (error) {
    await runtime.stop().catch(() => undefined);
    throw error;
  }
}

function configured_adapters(): ReadonlyMap<ProviderId, GatewayAdapter> {
  const adapters = new Map<ProviderId, GatewayAdapter>();
  adapters.set("sd_webui", new SdWebuiAdapter());
  adapters.set(
    "comfyui",
    new ComfyUiAdapter({
      workflow_store: {
        load: async () => WORKFLOW,
      },
    }),
  );
  return adapters;
}

function sd_request(request_id: string, prompt = FIXTURE_PROMPT): Record<string, unknown> {
  return {
    provider_id: "sd_webui",
    request_id,
    generation_anchor: "a".repeat(64),
    prompt,
    output_count: 1,
    mode: "txt2img",
    model_id: "smoke-model",
    sampler: "Euler",
    scheduler: "Normal",
    width: 64,
    height: 64,
    steps: 1,
    cfg_scale: 1,
    seed: 42,
  };
}

function comfy_request(request_id: string): Record<string, unknown> {
  return {
    provider_id: "comfyui",
    request_id,
    generation_anchor: "b".repeat(64),
    prompt: CANCELLATION_PROMPT,
    output_count: 1,
    workflow_id: WORKFLOW_ID,
    placeholder_values: {},
    input_asset_bindings: {},
    output_node_ids: ["1"],
  };
}

async function read_sse_until_completed(response: Response): Promise<GatewayJobEvent[]> {
  if (!response.ok || response.body === null) {
    throw new Error(`SSE request failed with status ${String(response.status)}`);
  }
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  const events: GatewayJobEvent[] = [];
  let buffered = "";
  try {
    for (let chunk_count = 0; chunk_count < 128; chunk_count += 1) {
      const result = await read_with_timeout(reader, JOB_EVENT_TIMEOUT_MS);
      if (result.done) {
        break;
      }
      buffered += decoder.decode(result.value, { stream: true }).replaceAll("\r\n", "\n");
      let boundary = buffered.indexOf("\n\n");
      while (boundary >= 0) {
        const block = buffered.slice(0, boundary);
        buffered = buffered.slice(boundary + 2);
        boundary = buffered.indexOf("\n\n");
        const data = block
          .split("\n")
          .filter((line) => line.startsWith("data: "))
          .map((line) => line.slice("data: ".length))
          .join("\n");
        if (data.length === 0) {
          continue;
        }
        const event = GatewayJobEventSchema.parse(JSON.parse(data) as unknown);
        events.push(event);
        if (event.state === "completed") {
          return events;
        }
      }
    }
  } finally {
    await reader.cancel().catch(() => undefined);
  }
  throw new Error("SSE stream ended before a completed event");
}

async function read_with_timeout(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  timeout_ms: number,
): Promise<ReadableStreamReadResult<Uint8Array>> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      reader.read(),
      new Promise<ReadableStreamReadResult<Uint8Array>>((_, reject) => {
        timer = setTimeout(() => reject(new Error("SSE read exceeded timeout")), timeout_ms);
      }),
    ]);
  } finally {
    if (timer !== undefined) {
      clearTimeout(timer);
    }
  }
}

async function wait_for_job_state(
  base_url: string,
  job_id: string,
  target_state: GatewayJobResponse["state"],
): Promise<GatewayJobResponse> {
  const deadline = Date.now() + POLL_TIMEOUT_MS;
  let last_state = "unknown";
  while (Date.now() < deadline) {
    const response = await fetch(`${base_url}/v1/jobs/${job_id}`, {
      headers: gateway_headers(),
    });
    if (response.status !== 200) {
      throw new Error(`Polling job returned HTTP ${String(response.status)}`);
    }
    const job = GatewayJobResponseSchema.parse(await response.json());
    last_state = job.state;
    if (job.state === target_state) {
      return job;
    }
    await delay(20);
  }
  throw new Error(`Job did not reach ${target_state}; last state was ${last_state}`);
}

async function wait_for_upstream(state: UpstreamState, predicate: () => boolean): Promise<void> {
  const deadline = Date.now() + POLL_TIMEOUT_MS;
  while (Date.now() < deadline) {
    if (predicate()) {
      return;
    }
    await delay(20);
  }
  throw new Error(
    `Scripted upstream did not reach expected state: ${JSON.stringify({
      sd_submit_count: state.sd_submit_count,
      comfy_prompt_count: state.comfy_prompt_count,
      comfy_queue_get_count: state.comfy_queue_get_count,
      comfy_cancel_count: state.comfy_cancel_count,
    })}`,
  );
}

async function delay(milliseconds: number): Promise<void> {
  await new Promise<void>((resolve) => setTimeout(resolve, milliseconds));
}

// Wall-clock polling is intentional here: the smoke test must exercise the real worker,
// HTTP server, and stream lifecycle rather than replacing runtime waits with fake timers.

describe("Gateway integration smoke flow", () => {
  it("verifies HTTP, persistence, provider transport, cancellation, and redacted logs", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "tavern-canvas-gateway-flow-"));
    const log_destination = new PassThrough();
    const log_chunks: Uint8Array[] = [];
    log_destination.on("data", (chunk: unknown) => {
      if (typeof chunk === "string") {
        log_chunks.push(new TextEncoder().encode(chunk));
      } else if (chunk instanceof Uint8Array) {
        log_chunks.push(Uint8Array.from(chunk));
      }
    });
    const logger = create_gateway_logger({ destination: log_destination, base: null });
    const clock = create_clock();
    let upstream: ScriptedUpstream | undefined;
    let gateway: RunningGateway | undefined;
    let reopened_gateway: RunningGateway | undefined;
    let accepted_uploads = 0;
    let rejected_uploads = 0;

    try {
      upstream = await start_scripted_upstream();
      gateway = await start_gateway(directory, upstream.base_url, logger, clock);

      const health = await fetch(`${gateway.base_url}/healthz`);
      expect(health.status).toBe(200);
      expect((await health.json()) as { database: { ready: boolean } }).toEqual({
        status: "ok",
        process: { ready: true },
        database: { ready: true },
      });

      const missing_auth = await fetch(`${gateway.base_url}/v1/capabilities`, {
        headers: { origin: ALLOWED_ORIGIN },
      });
      expect(missing_auth.status).toBe(401);
      expect(parse_gateway_error_response(await missing_auth.json()).error.code).toBe(
        "authentication_required",
      );

      const capabilities_response = await fetch(`${gateway.base_url}/v1/capabilities`, {
        headers: gateway_headers(),
      });
      expect(capabilities_response.status).toBe(200);
      expect(capabilities_response.headers.get("access-control-allow-origin")).toBe(ALLOWED_ORIGIN);
      const capabilities = GatewayCapabilitiesResponseSchema.parse(
        await capabilities_response.json(),
      );
      expect(capabilities.protocol_version).toBe("1.0");
      expect(capabilities.limits).toEqual({
        max_concurrency: 1,
        max_image_count: 4,
        max_request_bytes: 2_000_000,
      });
      expect(capabilities.providers).toEqual([
        {
          provider_id: "sd_webui",
          capabilities: ["cancel", "image_to_image", "reference_image", "seed", "text_to_image"],
        },
        {
          provider_id: "comfyui",
          capabilities: ["cancel", "reference_image", "seed", "text_to_image", "workflow"],
        },
      ]);

      const preflight = await fetch(`${gateway.base_url}/v1/capabilities`, {
        method: "OPTIONS",
        headers: gateway_headers(),
      });
      expect(preflight.status).toBe(204);
      expect(preflight.headers.get("access-control-allow-origin")).toBe(ALLOWED_ORIGIN);
      expect(preflight.headers.get("access-control-allow-methods")).toBe("GET,POST,DELETE,OPTIONS");

      const denied = await fetch(`${gateway.base_url}/v1/capabilities`, {
        headers: gateway_headers(DENIED_ORIGIN),
      });
      expect(denied.status).toBe(403);
      expect(parse_gateway_error_response(await denied.json()).error.code).toBe(
        "cors_origin_denied",
      );
      expect(denied.headers.get("access-control-allow-origin")).toBeNull();

      const accepted_upload = await fetch(`${gateway.base_url}/v1/assets`, {
        method: "POST",
        headers: { ...gateway_headers(), "content-type": "image/png" },
        body: PNG_BYTES,
      });
      expect(accepted_upload.status).toBe(201);
      accepted_uploads += 1;
      const accepted_upload_body = parse_asset_upload_response(await accepted_upload.json());

      const rejected_upload = await fetch(`${gateway.base_url}/v1/assets`, {
        method: "POST",
        headers: { ...gateway_headers(), "content-type": "image/png" },
        body: Buffer.from("not-a-png"),
      });
      expect(rejected_upload.status).toBe(400);
      rejected_uploads += 1;
      expect(parse_gateway_error_response(await rejected_upload.json()).error.code).toBe(
        "invalid_asset",
      );
      expect({ accepted_uploads, rejected_uploads }).toEqual({
        accepted_uploads: 1,
        rejected_uploads: 1,
      });

      const first_request = {
        protocol_version: "1.0",
        request: sd_request(FIRST_REQUEST_ID),
      } as const;
      const first_post = await fetch(`${gateway.base_url}/v1/jobs`, {
        method: "POST",
        headers: { ...gateway_headers(), "content-type": "application/json" },
        body: JSON.stringify(first_request),
      });
      expect(first_post.status).toBe(202);
      const first_job = GatewayJobResponseSchema.parse(await first_post.json());
      expect(first_job.protocol_version).toBe("1.0");
      expect(first_job.state).toBe("queued");
      expect(first_job.request_id).toBe(FIRST_REQUEST_ID);

      const events_response = await fetch(
        `${gateway.base_url}/v1/jobs/${first_job.job_id}/events`,
        {
          headers: gateway_headers(),
        },
      );
      expect(events_response.status).toBe(200);
      const events_promise = read_sse_until_completed(events_response);

      const duplicate_post = await fetch(`${gateway.base_url}/v1/jobs`, {
        method: "POST",
        headers: { ...gateway_headers(), "content-type": "application/json" },
        body: JSON.stringify(first_request),
      });
      expect(duplicate_post.status).toBe(202);
      const duplicate_job = GatewayJobResponseSchema.parse(await duplicate_post.json());
      expect(duplicate_job.job_id).toBe(first_job.job_id);
      expect(duplicate_job.request_id).toBe(first_job.request_id);
      expect(duplicate_job.provider_id).toBe("sd_webui");

      const first_events = await events_promise;
      expect(first_events.length).toBe(3);
      expect(first_events.map((event) => event.sequence)).toEqual([1, 2, 3]);
      expect(first_events.map((event) => event.state)).toEqual([
        "preparing",
        "submitting",
        "completed",
      ]);
      expect(JSON.stringify(first_events)).not.toContain(FIXTURE_PROMPT);
      expect(JSON.stringify(first_events)).not.toContain(PNG_BASE64);
      expect(first_events.every((event) => event.protocol_version === "1.0")).toBe(true);
      expect(first_events.at(-1)?.job_id).toBe(first_job.job_id);
      expect("request" in first_job).toBe(false);
      expect(JSON.stringify(first_job)).not.toContain(PNG_BASE64);
      expect(JSON.stringify(first_job)).not.toContain(PROVIDER_CREDENTIAL);
      await wait_for_upstream(upstream.state, () => upstream?.state.sd_submit_count === 1);

      const first_completed_response = await fetch(
        `${gateway.base_url}/v1/jobs/${first_job.job_id}`,
        { headers: gateway_headers() },
      );
      expect(first_completed_response.status).toBe(200);
      const first_completed = GatewayJobResponseSchema.parse(await first_completed_response.json());
      expect(first_completed.state).toBe("completed");
      expect(first_completed.image_ids).toHaveLength(1);
      expect(JSON.stringify(first_completed)).not.toContain(FIXTURE_PROMPT);
      expect(JSON.stringify(first_completed)).not.toContain(PROVIDER_CREDENTIAL);
      const generated_asset_id = first_completed.image_ids?.[0];
      if (generated_asset_id === undefined) {
        throw new Error("Completed job did not expose an output asset");
      }

      const generated_metadata_response = await fetch(
        `${gateway.base_url}/v1/assets/${generated_asset_id}`,
        { headers: gateway_headers() },
      );
      expect(generated_metadata_response.status).toBe(200);
      const generated_metadata = parse_asset_metadata_response(
        await generated_metadata_response.json(),
      );
      expect(generated_metadata.asset_id).toBe(generated_asset_id);

      const generated_content_response = await fetch(
        `${gateway.base_url}/v1/assets/${generated_asset_id}/content`,
        { headers: gateway_headers() },
      );
      expect(generated_content_response.status).toBe(200);
      const generated_content = Buffer.from(await generated_content_response.arrayBuffer());
      expect(generated_content_response.headers.get("content-type")).toBe("image/png");
      expect(generated_content_response.headers.get("content-length")).toBe(
        String(generated_content.byteLength),
      );
      expect(generated_content).toEqual(PNG_BYTES);
      expect(generated_content.byteLength).toBe(generated_metadata.byte_length);
      expect(createHash("sha256").update(generated_content).digest("hex")).toBe(
        generated_metadata.sha256,
      );

      const uploaded_metadata_response = await fetch(
        `${gateway.base_url}/v1/assets/${accepted_upload_body.asset_id}`,
        { headers: gateway_headers() },
      );
      expect(uploaded_metadata_response.status).toBe(200);
      const uploaded_metadata = parse_asset_metadata_response(
        await uploaded_metadata_response.json(),
      );
      expect(uploaded_metadata.asset_id).toBe(accepted_upload_body.asset_id);
      const uploaded_content_response = await fetch(
        `${gateway.base_url}/v1/assets/${accepted_upload_body.asset_id}/content`,
        { headers: gateway_headers() },
      );
      expect(uploaded_content_response.status).toBe(200);
      const uploaded_content = Buffer.from(await uploaded_content_response.arrayBuffer());
      expect(uploaded_content.byteLength).toBe(accepted_upload_body.byte_length);
      expect(createHash("sha256").update(uploaded_content).digest("hex")).toBe(
        accepted_upload_body.sha256,
      );

      const first_snapshot = {
        job: first_completed,
        generated_metadata,
        generated_content: Buffer.from(generated_content),
      };
      const first_pragma_values = {
        journal_mode: gateway.runtime.database.connection.pragma("journal_mode", { simple: true }),
        foreign_keys: gateway.runtime.database.connection.pragma("foreign_keys", { simple: true }),
        busy_timeout: gateway.runtime.database.connection.pragma("busy_timeout", { simple: true }),
      };
      expect(first_pragma_values).toEqual({
        journal_mode: "wal",
        foreign_keys: 1,
        busy_timeout: 5_000,
      });

      await gateway.runtime.stop();
      gateway = undefined;

      reopened_gateway = await start_gateway(directory, upstream.base_url, logger, clock);
      const recovered_job_response = await fetch(
        `${reopened_gateway.base_url}/v1/jobs/${first_job.job_id}`,
        { headers: gateway_headers() },
      );
      expect(recovered_job_response.status).toBe(200);
      const recovered_job = GatewayJobResponseSchema.parse(await recovered_job_response.json());
      expect(recovered_job).toEqual(first_snapshot.job);

      const recovered_metadata_response = await fetch(
        `${reopened_gateway.base_url}/v1/assets/${generated_asset_id}`,
        { headers: gateway_headers() },
      );
      expect(recovered_metadata_response.status).toBe(200);
      expect(parse_asset_metadata_response(await recovered_metadata_response.json())).toEqual(
        first_snapshot.generated_metadata,
      );
      const recovered_content_response = await fetch(
        `${reopened_gateway.base_url}/v1/assets/${generated_asset_id}/content`,
        { headers: gateway_headers() },
      );
      expect(recovered_content_response.status).toBe(200);
      expect(Buffer.from(await recovered_content_response.arrayBuffer())).toEqual(
        first_snapshot.generated_content,
      );
      const recovered_pragmas = {
        journal_mode: reopened_gateway.runtime.database.connection.pragma("journal_mode", {
          simple: true,
        }),
        foreign_keys: reopened_gateway.runtime.database.connection.pragma("foreign_keys", {
          simple: true,
        }),
        busy_timeout: reopened_gateway.runtime.database.connection.pragma("busy_timeout", {
          simple: true,
        }),
      };
      expect(recovered_pragmas).toEqual(first_pragma_values);

      const second_post = await fetch(`${reopened_gateway.base_url}/v1/jobs`, {
        method: "POST",
        headers: { ...gateway_headers(), "content-type": "application/json" },
        body: JSON.stringify({
          protocol_version: "1.0",
          request: sd_request(SECOND_REQUEST_ID, POLLING_PROMPT),
        }),
      });
      expect(second_post.status).toBe(202);
      const second_job = GatewayJobResponseSchema.parse(await second_post.json());
      expect(second_job.state).toBe("queued");
      const second_completed = await wait_for_job_state(
        reopened_gateway.base_url,
        second_job.job_id,
        "completed",
      );
      expect(second_completed.image_ids).toHaveLength(1);
      expect(second_completed.protocol_version).toBe("1.0");
      expect(upstream.state.sd_submit_count).toBe(2);

      const cancellation_post = await fetch(`${reopened_gateway.base_url}/v1/jobs`, {
        method: "POST",
        headers: { ...gateway_headers(), "content-type": "application/json" },
        body: JSON.stringify({
          protocol_version: "1.0",
          request: comfy_request(CANCELLATION_REQUEST_ID),
        }),
      });
      expect(cancellation_post.status).toBe(202);
      const cancellation_job = GatewayJobResponseSchema.parse(await cancellation_post.json());
      await wait_for_upstream(upstream.state, () => upstream?.state.comfy_prompt_count === 1);
      await wait_for_job_state(reopened_gateway.base_url, cancellation_job.job_id, "running");

      const cancellation_delete = await fetch(
        `${reopened_gateway.base_url}/v1/jobs/${cancellation_job.job_id}`,
        { method: "DELETE", headers: gateway_headers() },
      );
      expect(cancellation_delete.status).toBe(204);
      const cancelled_job = await wait_for_job_state(
        reopened_gateway.base_url,
        cancellation_job.job_id,
        "cancelled",
      );
      expect(cancelled_job.error?.code).toBe("cancelled");
      await wait_for_upstream(upstream.state, () => upstream?.state.comfy_cancel_count === 1);
      expect(upstream.state.comfy_queue_get_count).toBeGreaterThanOrEqual(1);
      expect(upstream.state.cancelled_prompt_ids).toEqual([upstream.state.comfy_prompt_ids[0]]);

      expect(upstream.state.authorization_headers).toContain(`Bearer ${PROVIDER_CREDENTIAL}`);
      expect(upstream.state.request_bodies.some((body) => body.includes(FIXTURE_PROMPT))).toBe(
        true,
      );
      logger.flush();
      const log_text = new TextDecoder().decode(concat_bytes(log_chunks));
      expect(log_text).toContain('"provider_id":"sd_webui"');
      expect(log_text).toContain(`"request_id":"${FIRST_REQUEST_ID}"`);
      expect(log_text).toContain('"status_code":200');
      expect(log_text).not.toContain(FIXTURE_PROMPT);
      expect(log_text).not.toContain(GATEWAY_TOKEN);
      expect(log_text).not.toContain(PROVIDER_CREDENTIAL);
      expect(log_text).not.toContain(PNG_BASE64);
      expect(log_text).not.toContain(POLLING_PROMPT);
      expect(log_text).not.toContain(CANCELLATION_PROMPT);
      expect(log_text).not.toContain(UPSTREAM_RESPONSE_MARKER);
    } finally {
      if (reopened_gateway !== undefined) {
        await reopened_gateway.runtime.stop();
      }
      if (gateway !== undefined) {
        await gateway.runtime.stop();
      }
      if (upstream !== undefined) {
        await upstream.close();
      }
      await rm(directory, { recursive: true, force: true });
    }
  });
});
