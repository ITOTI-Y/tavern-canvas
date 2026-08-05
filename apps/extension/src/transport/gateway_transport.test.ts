import {
  OpenAiImageRequestSchema,
  type GatewayJobEvent,
  type GatewayJobResponse,
} from "@tavern-canvas/contracts";
import { describe, expect, it } from "vitest";

import {
  GatewayProtocolError,
  GatewayTransport,
  type GatewayClock,
  type GatewayFetch,
} from "./gateway_transport.js";

const REQUEST_ID = "11111111-1111-4111-8111-111111111111";
const JOB_ID = "22222222-2222-4222-8222-222222222222";
const IMAGE_ID = "33333333-3333-4333-8333-333333333333";
const request = OpenAiImageRequestSchema.parse({
  provider_id: "openai_image",
  request_id: REQUEST_ID,
  generation_anchor: "a".repeat(64),
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
  providers: [
    {
      provider_id: "openai_image",
      capabilities: ["text_to_image"],
    },
  ],
  limits: {
    max_concurrency: 2,
    max_image_count: 4,
    max_request_bytes: 1_000_000,
  },
};

const queued_job: GatewayJobResponse = {
  protocol_version: "1.0",
  job_id: JOB_ID,
  request_id: REQUEST_ID,
  provider_id: "openai_image",
  state: "queued",
};

class RecordingClock implements GatewayClock {
  readonly delays: number[] = [];

  sleep(delay_ms: number, signal: AbortSignal): Promise<void> {
    if (signal.aborted) {
      return Promise.reject(new DOMException("Aborted", "AbortError"));
    }
    this.delays.push(delay_ms);
    return Promise.resolve();
  }
}

class ScriptedFetch {
  readonly requests: Request[] = [];

  constructor(private readonly responses: readonly Response[]) {}

  readonly fetch: GatewayFetch = async (input, init) => {
    const request_ = new Request(input, init);
    this.requests.push(request_);
    const response = this.responses[this.requests.length - 1];
    if (response === undefined) {
      throw new Error("Scripted fetch exhausted");
    }
    return response;
  };
}

describe("GatewayTransport", () => {
  it("deduplicates SSE sequences and falls back to bounded polling", async () => {
    const event_one = job_event(1, "submitting");
    const event_two = job_event(2, "running");
    const events = [sse_event(event_one), sse_event(event_one), sse_event(event_two)].join("");
    const fetch = new ScriptedFetch([
      json_response(200, capabilities),
      json_response(202, queued_job),
      failing_sse_response(events),
      failing_sse_response(""),
      json_response(200, { ...queued_job, state: "running" }),
      json_response(200, {
        ...queued_job,
        state: "completed",
        image_ids: [IMAGE_ID],
      }),
    ]);
    const clock = new RecordingClock();
    const observed_sequences: number[] = [];
    const transport = new GatewayTransport({
      endpoint: "https://gateway.example",
      access_token: "fixture-token",
      fetch: fetch.fetch,
      clock,
    });

    const result = await transport.run(request, {
      signal: new AbortController().signal,
      on_event: (event) => observed_sequences.push(event.sequence),
    });

    expect(result).toMatchObject({
      state: "completed",
      image_ids: [IMAGE_ID],
    });
    expect(observed_sequences).toEqual([1, 2]);
    expect(clock.delays).toEqual([250, 250, 500]);
    expect(
      fetch.requests.map((request_) => [request_.method, new URL(request_.url).pathname]),
    ).toEqual([
      ["GET", "/v1/capabilities"],
      ["POST", "/v1/jobs"],
      ["GET", `/v1/jobs/${JOB_ID}/events`],
      ["GET", `/v1/jobs/${JOB_ID}/events`],
      ["GET", `/v1/jobs/${JOB_ID}`],
      ["GET", `/v1/jobs/${JOB_ID}`],
    ]);
    expect(fetch.requests[2]?.headers.get("last-event-id")).toBeNull();
    expect(fetch.requests[3]?.headers.get("last-event-id")).toBe("2");
    expect(fetch.requests[4]?.headers.get("last-event-id")).toBeNull();
    expect(fetch.requests[5]?.headers.get("last-event-id")).toBeNull();
    expect(
      fetch.requests.every(
        (request_) => request_.headers.get("authorization") === "Bearer fixture-token",
      ),
    ).toBe(true);
    await expect(fetch.requests[1]?.json()).resolves.toEqual({
      protocol_version: "1.0",
      request,
    });
  });

  it("resumes SSE from the last observed event ID without duplicate callbacks", async () => {
    const first_event = job_event(1, "running");
    const terminal_event: GatewayJobEvent = {
      ...job_event(2, "completed"),
      image_ids: [IMAGE_ID],
    };
    const fetch = new ScriptedFetch([
      json_response(200, capabilities),
      json_response(202, queued_job),
      failing_sse_response(sse_event(first_event)),
      static_sse_response(sse_event(first_event) + sse_event(terminal_event)),
    ]);
    const clock = new RecordingClock();
    const observed_sequences: number[] = [];
    const transport = new GatewayTransport({
      endpoint: "https://gateway.example",
      access_token: "fixture-token",
      fetch: fetch.fetch,
      clock,
    });

    await expect(
      transport.run(request, {
        signal: new AbortController().signal,
        on_event: (event) => observed_sequences.push(event.sequence),
      }),
    ).resolves.toMatchObject({ state: "completed" });
    expect(observed_sequences).toEqual([1, 2]);
    expect(clock.delays).toEqual([250]);
    expect(fetch.requests).toHaveLength(4);
    expect(fetch.requests[3]?.headers.get("last-event-id")).toBe("1");
  });

  it("bounds each SSE event without rejecting a batched network chunk", async () => {
    const duplicate = sse_event(job_event(1, "running"));
    const terminal = sse_event({
      ...job_event(2, "completed"),
      image_ids: [IMAGE_ID],
    });
    const fetch = new ScriptedFetch([
      json_response(200, capabilities),
      json_response(202, queued_job),
      static_sse_response(duplicate.repeat(700) + terminal),
      json_response(200, {
        ...queued_job,
        state: "completed",
        image_ids: [IMAGE_ID],
      }),
    ]);
    const clock = new RecordingClock();
    const observed_sequences: number[] = [];
    const transport = new GatewayTransport({
      endpoint: "https://gateway.example",
      access_token: "fixture-token",
      fetch: fetch.fetch,
      clock,
    });

    await expect(
      transport.run(request, {
        signal: new AbortController().signal,
        on_event: (event) => observed_sequences.push(event.sequence),
      }),
    ).resolves.toMatchObject({ state: "completed" });
    expect(observed_sequences).toEqual([1, 2]);
    expect(fetch.requests).toHaveLength(3);
    expect(clock.delays).toEqual([]);
  });

  it("accepts a BOM and lone CR delimiters split across SSE chunks", async () => {
    const terminal_event: GatewayJobEvent = {
      ...job_event(1, "completed"),
      image_ids: [IMAGE_ID],
    };
    const fetch = new ScriptedFetch([
      json_response(200, capabilities),
      json_response(202, queued_job),
      failing_chunked_sse_response([
        "\uFEFFid: 1\r",
        `data: ${JSON.stringify(terminal_event)}\r`,
        "\r",
      ]),
      static_sse_response(sse_event(terminal_event)),
    ]);
    const transport = new GatewayTransport({
      endpoint: "https://gateway.example",
      access_token: "fixture-token",
      fetch: fetch.fetch,
      clock: new RecordingClock(),
    });

    await expect(
      transport.run(request, { signal: new AbortController().signal }),
    ).resolves.toMatchObject({ state: "completed" });
    expect(fetch.requests).toHaveLength(3);
  });

  it("does not misclassify an event observer failure as an SSE disconnect", async () => {
    const observer_error = new Error("event observer failed");
    const fetch = new ScriptedFetch([
      json_response(200, capabilities),
      json_response(202, queued_job),
      static_sse_response(sse_event(job_event(1, "running"))),
      json_response(200, {
        ...queued_job,
        state: "completed",
        image_ids: [IMAGE_ID],
      }),
    ]);
    const transport = new GatewayTransport({
      endpoint: "https://gateway.example",
      access_token: "fixture-token",
      fetch: fetch.fetch,
      clock: new RecordingClock(),
    });

    await expect(
      transport.run(request, {
        signal: new AbortController().signal,
        on_event: () => {
          throw observer_error;
        },
      }),
    ).rejects.toBe(observer_error);
    expect(fetch.requests).toHaveLength(3);
  });

  it("refuses an incompatible protocol before job submission", async () => {
    const fetch = new ScriptedFetch([
      json_response(200, { ...capabilities, protocol_version: "2.0" }),
    ]);
    const transport = new GatewayTransport({
      endpoint: "https://gateway.example",
      access_token: "fixture-token",
      fetch: fetch.fetch,
      clock: new RecordingClock(),
    });

    await expect(
      transport.run(request, { signal: new AbortController().signal }),
    ).rejects.toBeInstanceOf(GatewayProtocolError);
    expect(fetch.requests).toHaveLength(1);
  });

  it.each([
    ["application/jsonp", json_response(200, capabilities, "application/jsonp")],
    [
      "text/event-streaming",
      static_sse_response(
        sse_event({
          ...job_event(1, "completed"),
          image_ids: [IMAGE_ID],
        }),
        "text/event-streaming",
      ),
    ],
  ])("rejects the non-protocol media type %s", async (media_type, invalid_response) => {
    const responses =
      media_type === "application/jsonp"
        ? [invalid_response]
        : [json_response(200, capabilities), json_response(202, queued_job), invalid_response];
    const fetch = new ScriptedFetch(responses);
    const transport = new GatewayTransport({
      endpoint: "https://gateway.example",
      access_token: "fixture-token",
      fetch: fetch.fetch,
      clock: new RecordingClock(),
    });

    await expect(
      transport.run(request, { signal: new AbortController().signal }),
    ).rejects.toBeInstanceOf(GatewayProtocolError);
  });

  it.each([
    ["HTTP error", 500, "application/json"],
    ["JSON media type", 200, "application/jsonp"],
    ["SSE media type", 200, "text/event-streaming"],
  ])(
    "cancels the body rejected before bounded reading for %s",
    async (_scenario, status, content_type) => {
      const tracked = tracked_open_response(status, content_type);
      const responses =
        content_type === "text/event-streaming"
          ? [json_response(200, capabilities), json_response(202, queued_job), tracked.response]
          : [tracked.response];
      const fetch = new ScriptedFetch(responses);
      const transport = new GatewayTransport({
        endpoint: "https://gateway.example",
        access_token: "fixture-token",
        fetch: fetch.fetch,
        clock: new RecordingClock(),
      });

      await expect(
        transport.run(request, {
          signal: new AbortController().signal,
        }),
      ).rejects.toBeInstanceOf(Error);
      expect(tracked.was_cancelled()).toBe(true);
    },
  );

  it("normalizes a streamed JSON body failure", async () => {
    const body = new ReadableStream<Uint8Array>({
      pull(controller) {
        controller.error(new Error("synthetic body failure"));
      },
    });
    const fetch = new ScriptedFetch([
      new Response(body, {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
    ]);
    const transport = new GatewayTransport({
      endpoint: "https://gateway.example",
      access_token: "fixture-token",
      fetch: fetch.fetch,
      clock: new RecordingClock(),
    });

    await expect(
      transport.run(request, { signal: new AbortController().signal }),
    ).rejects.toMatchObject({
      code: "provider_unavailable",
    });
  });

  it("cancels an SSE response body after a terminal event", async () => {
    let stream_cancelled = false;
    const bytes = new TextEncoder().encode(
      sse_event({
        ...job_event(1, "completed"),
        image_ids: [IMAGE_ID],
      }),
    );
    const body = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(bytes);
      },
      cancel() {
        stream_cancelled = true;
      },
    });
    const fetch = new ScriptedFetch([
      json_response(200, capabilities),
      json_response(202, queued_job),
      new Response(body, {
        status: 200,
        headers: { "content-type": "text/event-stream" },
      }),
    ]);
    const transport = new GatewayTransport({
      endpoint: "https://gateway.example",
      access_token: "fixture-token",
      fetch: fetch.fetch,
      clock: new RecordingClock(),
    });

    await expect(
      transport.run(request, { signal: new AbortController().signal }),
    ).resolves.toMatchObject({ state: "completed" });
    expect(stream_cancelled).toBe(true);
  });

  it("cancels a JSON response body rejected by Content-Length", async () => {
    let stream_cancelled = false;
    const body = new ReadableStream<Uint8Array>({
      cancel() {
        stream_cancelled = true;
      },
    });
    const fetch = new ScriptedFetch([
      new Response(body, {
        status: 200,
        headers: {
          "content-length": "2000001",
          "content-type": "application/json",
        },
      }),
    ]);
    const transport = new GatewayTransport({
      endpoint: "https://gateway.example",
      access_token: "fixture-token",
      fetch: fetch.fetch,
      clock: new RecordingClock(),
    });

    await expect(
      transport.run(request, { signal: new AbortController().signal }),
    ).rejects.toMatchObject({ code: "malformed_response" });
    expect(stream_cancelled).toBe(true);
  });

  it("observes an already submitted job without resubmitting it", async () => {
    const fetch = new ScriptedFetch([
      static_sse_response(
        sse_event({
          ...job_event(1, "completed"),
          image_ids: [IMAGE_ID],
        }),
      ),
    ]);
    const transport = new GatewayTransport({
      endpoint: "https://gateway.example",
      access_token: "fixture-token",
      fetch: fetch.fetch,
      clock: new RecordingClock(),
    });

    await expect(
      transport.observe(queued_job, {
        signal: new AbortController().signal,
      }),
    ).resolves.toMatchObject({ state: "completed" });
    expect(fetch.requests).toHaveLength(1);
    expect(fetch.requests[0]?.method).toBe("GET");
    expect(new URL(fetch.requests[0]?.url ?? "").pathname).toBe(`/v1/jobs/${JOB_ID}/events`);
  });

  it("cancels with DELETE and the caller AbortSignal", async () => {
    const cancelled: GatewayJobResponse = {
      ...queued_job,
      state: "cancelled",
    };
    const fetch = new ScriptedFetch([
      json_response(200, capabilities),
      json_response(202, queued_job),
      json_response(200, cancelled),
    ]);
    const transport = new GatewayTransport({
      endpoint: "https://gateway.example",
      access_token: "fixture-token",
      fetch: fetch.fetch,
      clock: new RecordingClock(),
    });
    const controller = new AbortController();
    const submitted = await transport.submit(request, new AbortController().signal);
    expect(submitted.job_id).toBe(JOB_ID);
    expect(fetch.requests).toHaveLength(2);

    await expect(transport.cancel(submitted.job_id, controller.signal)).resolves.toEqual(cancelled);
    expect(fetch.requests[2]?.method).toBe("DELETE");
    const forwarded_signal = fetch.requests[2]?.signal;
    expect(forwarded_signal?.aborted).toBe(false);
    controller.abort();
    expect(forwarded_signal?.aborted).toBe(true);
  });
});

function job_event(sequence: number, state: GatewayJobEvent["state"]): GatewayJobEvent {
  return {
    protocol_version: "1.0",
    job_id: JOB_ID,
    sequence,
    state,
    occurred_at: "2026-08-05T09:30:00.000Z",
  };
}

function sse_event(event: GatewayJobEvent): string {
  return `id: ${String(event.sequence)}\ndata: ${JSON.stringify(event)}\n\n`;
}
function json_response(
  status: number,
  value: unknown,
  content_type = "application/json",
): Response {
  return new Response(JSON.stringify(value), {
    status,
    headers: { "content-type": content_type },
  });
}

function failing_sse_response(content: string): Response {
  const bytes = new TextEncoder().encode(content);
  let sent = false;
  const body = new ReadableStream<Uint8Array>({
    pull(controller) {
      if (!sent) {
        sent = true;
        controller.enqueue(bytes);
        return;
      }
      controller.error(new Error("synthetic SSE disconnect"));
    },
  });
  return new Response(body, {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
}

function static_sse_response(content: string, content_type = "text/event-stream"): Response {
  const bytes = new TextEncoder().encode(content);
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(bytes);
      controller.close();
    },
  });
  return new Response(body, {
    status: 200,
    headers: { "content-type": content_type },
  });
}

function failing_chunked_sse_response(chunks: readonly string[]): Response {
  const encoder = new TextEncoder();
  let index = 0;
  const body = new ReadableStream<Uint8Array>({
    pull(controller) {
      const chunk = chunks[index];
      if (chunk !== undefined) {
        index += 1;
        controller.enqueue(encoder.encode(chunk));
        return;
      }
      controller.error(new Error("synthetic SSE disconnect"));
    },
  });
  return new Response(body, {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
}

function tracked_open_response(
  status: number,
  content_type: string,
): { readonly response: Response; readonly was_cancelled: () => boolean } {
  let cancelled = false;
  const body = new ReadableStream<Uint8Array>({
    cancel() {
      cancelled = true;
    },
  });
  return {
    response: new Response(body, {
      status,
      headers: { "content-type": content_type },
    }),
    was_cancelled: () => cancelled,
  };
}
