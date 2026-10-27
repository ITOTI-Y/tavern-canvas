import {
  OpenAiImageRequestSchema,
  type GatewayJobEvent,
  type GatewayJobResponse,
  type ProviderError,
} from "@tavern-canvas/contracts";
import type { GenerationJobSnapshot, JobExecutionControl } from "@tavern-canvas/core";
import { JobExecutorFailure } from "@tavern-canvas/core";
import { describe, expect, it } from "vitest";

import {
  MediaExecutionPlanRegistry,
  type CachedSourceAsset,
  type ImageStorePort,
  type PutMediaImageInput,
} from "../modules/media/media_command_service.js";
import { GatewayJobExecutor } from "./gateway_job_executor.js";
import type { GatewayFetch } from "./gateway_transport.js";

const REQUEST_ID = "11111111-1111-4111-8111-111111111111";
const JOB_ID = "22222222-2222-4222-8222-222222222222";
const IMAGE_ID = "33333333-3333-4333-8333-333333333333";
const STORED_ID = "44444444-4444-4444-8444-444444444444";
const ANCHOR = "a".repeat(64);
const ACCESS_TOKEN = "gateway-bearer-token-fixture";
const PNG_BYTES = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

const request = OpenAiImageRequestSchema.parse({
  provider_id: "openai_image",
  request_id: REQUEST_ID,
  generation_anchor: ANCHOR,
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

const capabilities = {
  protocol_version: "1.0",
  providers: [{ provider_id: "openai_image", capabilities: ["text_to_image"] }],
  limits: { max_concurrency: 2, max_image_count: 4, max_request_bytes: 1_000_000 },
};

const queued_job: GatewayJobResponse = {
  protocol_version: "1.0",
  job_id: JOB_ID,
  request_id: REQUEST_ID,
  provider_id: "openai_image",
  state: "queued",
};

const job: GenerationJobSnapshot = {
  job_id: JOB_ID,
  request_id: REQUEST_ID,
  request_digest: "b".repeat(64),
  generation_anchor: ANCHOR,
  source_anchor: "c".repeat(64),
  chat_id: "chat-1",
  requested_swipe_id: 0,
  provider_id: "openai_image",
  arguments: { generation_anchor: ANCHOR, scene_description: "fixture prompt" },
  state: "submitting",
  created_at: "2026-08-08T00:00:00.000Z",
  updated_at: "2026-08-08T00:00:00.000Z",
  error: null,
  image_ids: [],
};

class RecordingStore implements ImageStorePort {
  readonly writes: PutMediaImageInput[] = [];

  put_image(input: PutMediaImageInput): Promise<{ readonly id: string }> {
    this.writes.push(input);
    return Promise.resolve({ id: input.id });
  }

  read_image(): Promise<CachedSourceAsset | null> {
    return Promise.resolve(null);
  }
}

function json_response(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function asset_response(): Response {
  return new Response(PNG_BYTES, { status: 200, headers: { "content-type": "image/png" } });
}

function job_event(
  sequence: number,
  state: GatewayJobEvent["state"],
  extra: {
    readonly image_ids?: string[];
    readonly error?: ProviderError;
  } = {},
): GatewayJobEvent {
  return {
    protocol_version: "1.0",
    job_id: JOB_ID,
    sequence,
    state,
    occurred_at: "2026-08-08T00:00:00.000Z",
    ...extra,
  };
}

function sse_response(events: readonly GatewayJobEvent[]): Response {
  const body = events
    .map((event) => `id: ${String(event.sequence)}\ndata: ${JSON.stringify(event)}\n\n`)
    .join("");
  return new Response(body, {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
}

interface ScriptedCall {
  readonly url: string;
  readonly method: string;
  readonly authorization: string | null;
}

class ScriptedGateway {
  readonly calls: ScriptedCall[] = [];

  constructor(private readonly responses: readonly (() => Response)[]) {}

  readonly fetch: GatewayFetch = (input, init) => {
    const request_ = new Request(input, init);
    this.calls.push({
      url: request_.url,
      method: request_.method,
      authorization: request_.headers.get("authorization"),
    });
    const next = this.responses[this.calls.length - 1];
    if (next === undefined) {
      return Promise.reject(new Error(`Unscripted Gateway call: ${request_.url}`));
    }
    return Promise.resolve(next());
  };
}

interface HarnessOptions {
  readonly responses: readonly (() => Response)[];
  readonly plan?: "adapter" | "none";
  readonly access_token?: () => Promise<string>;
  readonly endpoint?: string;
  readonly http_acknowledgments?: Readonly<Record<string, string>>;
}

function create_harness(options: HarnessOptions): {
  readonly executor: GatewayJobExecutor;
  readonly store: RecordingStore;
  readonly gateway: ScriptedGateway;
  readonly controller: AbortController;
  readonly control: JobExecutionControl;
  readonly running: { value: boolean };
} {
  const plans = new MediaExecutionPlanRegistry();
  if (options.plan !== "none") {
    plans.register(request);
  }
  const store = new RecordingStore();
  const gateway = new ScriptedGateway(options.responses);
  const controller = new AbortController();
  const running = { value: false };
  const executor = new GatewayJobExecutor({
    endpoint: options.endpoint ?? "https://gateway.example",
    http_acknowledgments: options.http_acknowledgments ?? {},
    access_token: options.access_token ?? (() => Promise.resolve(ACCESS_TOKEN)),
    plans,
    store,
    ids: { next: () => STORED_ID },
    clock: { now: () => "2026-08-08T00:00:01.000Z" },
    resolve_source_message: (snapshot) => ({
      chat_id: snapshot.chat_id,
      message_id: String(snapshot.requested_swipe_id),
      swipe_id: snapshot.requested_swipe_id,
    }),
    fetch: gateway.fetch,
  });
  return {
    executor,
    store,
    gateway,
    controller,
    running,
    control: {
      signal: controller.signal,
      mark_running: () => {
        running.value = true;
        return Promise.resolve();
      },
    },
  };
}

describe("GatewayJobExecutor", () => {
  it("carries a job through submit, completion and asset download into the image store", async () => {
    const harness = create_harness({
      responses: [
        () => json_response(200, capabilities),
        () => json_response(202, queued_job),
        () =>
          sse_response([
            job_event(1, "running"),
            job_event(2, "completed", { image_ids: [IMAGE_ID] }),
          ]),
        () => asset_response(),
      ],
    });

    const result = await harness.executor.execute(job, harness.control);

    expect(result.image_ids).toEqual([STORED_ID]);
    expect(harness.running.value).toBe(true);
    expect(harness.store.writes).toHaveLength(1);
    expect(harness.store.writes[0]?.claimed_media_type).toBe("image/png");
    expect(harness.store.writes[0]?.bytes).toEqual(PNG_BYTES);
    expect(harness.store.writes[0]?.metadata.provider_id).toBe("openai_image");
    expect(harness.gateway.calls.map((call) => `${call.method} ${new URL(call.url).pathname}`)) //
      .toEqual([
        "GET /v1/capabilities",
        "POST /v1/jobs",
        "GET /v1/jobs/22222222-2222-4222-8222-222222222222/events",
        `GET /v1/assets/${IMAGE_ID}/content`,
      ]);
    expect(new Set(harness.gateway.calls.map((call) => call.authorization))).toEqual(
      new Set([`Bearer ${ACCESS_TOKEN}`]),
    );
  });

  it("reports the Gateway's own provider error when the remote job fails", async () => {
    const harness = create_harness({
      responses: [
        () => json_response(200, capabilities),
        () => json_response(202, queued_job),
        () =>
          sse_response([
            job_event(1, "failed", { error: { code: "content_blocked", retryable: false } }),
          ]),
      ],
    });

    await expect(harness.executor.execute(job, harness.control)).rejects.toMatchObject({
      name: "JobExecutorFailure",
      provider_error: { code: "content_blocked", retryable: false },
    });
  });

  it("cancels the remote job when the local signal aborts mid-stream", async () => {
    const harness = create_harness({
      responses: [
        () => json_response(200, capabilities),
        () => json_response(202, queued_job),
        () => {
          harness.controller.abort();
          return sse_response([job_event(1, "running")]);
        },
        () => new Response(null, { status: 204 }),
      ],
    });

    await expect(harness.executor.execute(job, harness.control)).rejects.toBeInstanceOf(
      JobExecutorFailure,
    );

    const last = harness.gateway.calls.at(-1);
    expect(last?.method).toBe("DELETE");
    expect(new URL(String(last?.url)).pathname).toBe(`/v1/jobs/${JOB_ID}`);
  });

  it("fails as auth_failed without reaching the network when the token cannot be resolved", async () => {
    const harness = create_harness({
      responses: [],
      access_token: () => Promise.reject(new Error("vault refused")),
    });

    await expect(harness.executor.execute(job, harness.control)).rejects.toMatchObject({
      provider_error: { code: "auth_failed", retryable: false },
    });
    expect(harness.gateway.calls).toEqual([]);
  });

  it("refuses an unacknowledged cleartext Gateway origin before any request", async () => {
    const harness = create_harness({ responses: [], endpoint: "http://gateway.lan:8787" });

    await expect(harness.executor.execute(job, harness.control)).rejects.toMatchObject({
      provider_error: { code: "invalid_request", retryable: false },
    });
    expect(harness.gateway.calls).toEqual([]);
  });

  it("accepts an acknowledged cleartext Gateway origin", async () => {
    const harness = create_harness({
      endpoint: "http://gateway.lan:8787",
      http_acknowledgments: { "http://gateway.lan:8787": "2026-08-08T00:00:00.000Z" },
      responses: [
        () => json_response(200, capabilities),
        () => json_response(202, queued_job),
        () =>
          sse_response([
            job_event(1, "running"),
            job_event(2, "completed", { image_ids: [IMAGE_ID] }),
          ]),
        () => asset_response(),
      ],
    });

    const result = await harness.executor.execute(job, harness.control);

    expect(result.image_ids).toEqual([STORED_ID]);
  });

  it("maps a rejected bearer token to auth_failed", async () => {
    const harness = create_harness({
      responses: [() => new Response(null, { status: 403 })],
    });

    await expect(harness.executor.execute(job, harness.control)).rejects.toMatchObject({
      provider_error: { code: "auth_failed", retryable: false, status_code: 403 },
    });
  });
});
