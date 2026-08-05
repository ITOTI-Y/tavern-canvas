import {
  GatewayCapabilitiesResponseSchema,
  GatewayCreateJobRequestSchema,
  GatewayJobEventSchema,
  GatewayJobResponseSchema,
  PROTOCOL_VERSION,
  type GatewayCapabilitiesResponse,
  type GatewayJobEvent,
  type GatewayJobResponse,
  type ImageGenerationRequest,
  type JobId,
} from "@tavern-canvas/contracts";

import {
  is_http_origin_acknowledged,
  normalize_http_origin,
  requires_http_acknowledgment,
} from "./http_acknowledgment.js";

const MAX_JSON_RESPONSE_BYTES = 2_000_000;
const MAX_SSE_EVENT_BYTES = 64_000;
const MAX_SSE_RESUME_ATTEMPTS = 1;
const INITIAL_POLL_DELAY_MS = 250;
const MAX_POLL_DELAY_MS = 5_000;
const TERMINAL_STATES = new Set(["completed", "failed", "cancelled", "attached", "orphaned"]);

export type GatewayFetch = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

export interface GatewayClock {
  sleep(delay_ms: number, signal: AbortSignal): Promise<void>;
}

export interface GatewayTransportOptions {
  readonly endpoint: string;
  readonly access_token: string;
  readonly http_acknowledgments?: Readonly<Record<string, string>>;
  readonly fetch?: GatewayFetch;
  readonly clock?: GatewayClock;
}

export interface GatewayRunOptions {
  readonly signal: AbortSignal;
  readonly on_event?: (event: GatewayJobEvent) => void;
}

export type GatewayTransportErrorCode =
  "cancelled" | "configuration" | "http_error" | "malformed_response" | "provider_unavailable";

export class GatewayTransportError extends Error {
  readonly code: GatewayTransportErrorCode;
  readonly status_code: number | undefined;

  constructor(
    code: GatewayTransportErrorCode,
    message: string,
    options: ErrorOptions & { readonly status_code?: number } = {},
  ) {
    super(message, options);
    this.name = "GatewayTransportError";
    this.code = code;
    this.status_code = options.status_code;
  }
}

export class GatewayProtocolError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "GatewayProtocolError";
  }
}

class SystemGatewayClock implements GatewayClock {
  sleep(delay_ms: number, signal: AbortSignal): Promise<void> {
    return new Promise((resolve, reject) => {
      if (signal.aborted) {
        reject(cancelled_error());
        return;
      }
      const abort = () => {
        clearTimeout(timeout_id);
        signal.removeEventListener("abort", abort);
        reject(cancelled_error());
      };
      const timeout_id = setTimeout(() => {
        signal.removeEventListener("abort", abort);
        resolve();
      }, delay_ms);
      signal.addEventListener("abort", abort, { once: true });
    });
  }
}

function contains_control_character(value: string): boolean {
  for (const character of value) {
    const code_point = character.codePointAt(0);
    if (code_point !== undefined && (code_point <= 0x1f || code_point === 0x7f)) {
      return true;
    }
  }
  return false;
}
export class GatewayTransport {
  readonly #endpoint: string;
  readonly #access_token: string;
  readonly #fetch: GatewayFetch;
  readonly #clock: GatewayClock;

  constructor(options: GatewayTransportOptions) {
    this.#endpoint = normalize_http_origin(options.endpoint);
    if (
      requires_http_acknowledgment(this.#endpoint) &&
      !is_http_origin_acknowledged(options.http_acknowledgments ?? {}, this.#endpoint)
    ) {
      throw new GatewayTransportError(
        "configuration",
        "Cleartext Gateway origin has not been acknowledged",
      );
    }
    if (
      options.access_token.length === 0 ||
      options.access_token.length > 4_096 ||
      contains_control_character(options.access_token)
    ) {
      throw new GatewayTransportError("configuration", "Gateway access token is invalid");
    }
    this.#access_token = options.access_token;
    this.#fetch = options.fetch ?? globalThis.fetch.bind(globalThis);
    this.#clock = options.clock ?? new SystemGatewayClock();
  }

  async get_capabilities(signal: AbortSignal): Promise<GatewayCapabilitiesResponse> {
    const value = await this.#request_json("/v1/capabilities", {
      method: "GET",
      signal,
    });
    assert_protocol(value);
    const result = GatewayCapabilitiesResponseSchema.safeParse(value);
    if (!result.success) {
      throw malformed_gateway_response(result.error);
    }
    return result.data;
  }

  async run(
    request: ImageGenerationRequest,
    options: GatewayRunOptions,
  ): Promise<GatewayJobResponse> {
    const submitted = await this.submit(request, options.signal);
    return this.observe(submitted, options);
  }

  async submit(request: ImageGenerationRequest, signal: AbortSignal): Promise<GatewayJobResponse> {
    assert_not_aborted(signal);
    const capabilities = await this.get_capabilities(signal);
    const provider = capabilities.providers.find(
      (candidate) => candidate.provider_id === request.provider_id,
    );
    if (provider === undefined || request.output_count > capabilities.limits.max_image_count) {
      throw new GatewayTransportError(
        "configuration",
        "Gateway does not support the requested provider operation",
      );
    }

    const create_request = GatewayCreateJobRequestSchema.parse({
      protocol_version: PROTOCOL_VERSION,
      request,
    });
    const encoded_request = new TextEncoder().encode(JSON.stringify(create_request));
    if (encoded_request.byteLength > capabilities.limits.max_request_bytes) {
      throw new GatewayTransportError(
        "configuration",
        "Gateway request exceeds the advertised byte limit",
      );
    }
    const created = parse_job_response(
      await this.#request_json("/v1/jobs", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: encoded_request,
        signal,
      }),
    );
    if (created.request_id !== request.request_id || created.provider_id !== request.provider_id) {
      throw new GatewayProtocolError("Gateway job does not match the submitted request");
    }
    return created;
  }

  async observe(
    submitted: GatewayJobResponse,
    options: GatewayRunOptions,
  ): Promise<GatewayJobResponse> {
    assert_not_aborted(options.signal);
    const created = parse_job_response(submitted);
    if (is_terminal(created.state)) {
      return created;
    }

    let last_sequence = 0;
    for (let resume_attempt = 0; resume_attempt <= MAX_SSE_RESUME_ATTEMPTS; resume_attempt += 1) {
      try {
        for await (const event of this.#read_events(
          created.job_id,
          last_sequence,
          options.signal,
        )) {
          if (event.sequence <= last_sequence) {
            continue;
          }
          last_sequence = event.sequence;
          options.on_event?.(event);
          if (is_terminal(event.state)) {
            return merge_job_event(created, event);
          }
        }
      } catch (error) {
        if (!(error instanceof GatewayTransportError) || !is_retryable(error)) {
          throw error;
        }
        assert_not_aborted(options.signal);
      }
      if (resume_attempt < MAX_SSE_RESUME_ATTEMPTS) {
        await this.#clock.sleep(INITIAL_POLL_DELAY_MS, options.signal);
      }
    }

    let delay_ms = INITIAL_POLL_DELAY_MS;
    for (;;) {
      await this.#clock.sleep(delay_ms, options.signal);
      let polled: GatewayJobResponse;
      try {
        polled = parse_job_response(
          await this.#request_json(`/v1/jobs/${created.job_id}`, {
            method: "GET",
            signal: options.signal,
          }),
        );
      } catch (error) {
        if (
          error instanceof GatewayProtocolError ||
          (error instanceof GatewayTransportError && !is_retryable(error))
        ) {
          throw error;
        }
        assert_not_aborted(options.signal);
        delay_ms = Math.min(MAX_POLL_DELAY_MS, delay_ms * 2);
        continue;
      }
      if (
        polled.job_id !== created.job_id ||
        polled.request_id !== created.request_id ||
        polled.provider_id !== created.provider_id
      ) {
        throw new GatewayProtocolError("Gateway poll response changed job identity");
      }
      if (is_terminal(polled.state)) {
        return polled;
      }
      delay_ms = Math.min(MAX_POLL_DELAY_MS, delay_ms * 2);
    }
  }

  async cancel(job_id: JobId, signal: AbortSignal): Promise<GatewayJobResponse> {
    const response = parse_job_response(
      await this.#request_json(`/v1/jobs/${job_id}`, {
        method: "DELETE",
        signal,
      }),
    );
    if (response.job_id !== job_id) {
      throw new GatewayProtocolError("Gateway cancellation response changed job identity");
    }
    return response;
  }

  async *#read_events(
    job_id: JobId,
    last_sequence: number,
    signal: AbortSignal,
  ): AsyncGenerator<GatewayJobEvent> {
    const response = await this.#request(`/v1/jobs/${job_id}/events`, {
      method: "GET",
      headers:
        last_sequence === 0
          ? { accept: "text/event-stream" }
          : {
              accept: "text/event-stream",
              "last-event-id": String(last_sequence),
            },
      signal,
    });
    const content_type = response.headers.get("content-type") ?? "";
    if (!has_media_type(content_type, "text/event-stream")) {
      await cancel_response_body(response);
      throw new GatewayProtocolError("Gateway event stream has an invalid content type");
    }
    if (response.body === null) {
      throw new GatewayProtocolError("Gateway event stream has no body");
    }

    for await (const message of parse_sse_messages(response.body, signal)) {
      let value: unknown;
      try {
        value = JSON.parse(message.data) as unknown;
      } catch (error) {
        throw new GatewayProtocolError("Gateway event contains invalid JSON", {
          cause: error,
        });
      }
      assert_protocol(value);
      const result = GatewayJobEventSchema.safeParse(value);
      if (!result.success) {
        throw new GatewayProtocolError("Gateway event has an invalid schema", {
          cause: result.error,
        });
      }
      if (result.data.job_id !== job_id || message.id !== String(result.data.sequence)) {
        throw new GatewayProtocolError("Gateway event identity is invalid");
      }
      yield result.data;
    }
  }

  async #request_json(path: string, init: RequestInit): Promise<unknown> {
    const response = await this.#request(path, {
      ...init,
      headers: {
        accept: "application/json",
        ...headers_to_record(init.headers),
      },
    });
    const content_type = response.headers.get("content-type") ?? "";
    if (!has_media_type(content_type, "application/json")) {
      await cancel_response_body(response);
      throw new GatewayProtocolError("Gateway JSON response has an invalid content type");
    }
    const body = await read_bounded_body(response, MAX_JSON_RESPONSE_BYTES, init.signal);
    try {
      return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(body)) as unknown;
    } catch (error) {
      throw malformed_gateway_response(error);
    }
  }

  async #request(path: string, init: RequestInit): Promise<Response> {
    assert_not_aborted(init.signal);
    let response: Response;
    try {
      response = await this.#fetch(`${this.#endpoint}${path}`, {
        ...init,
        cache: "no-store",
        credentials: "omit",
        redirect: "error",
        headers: {
          authorization: `Bearer ${this.#access_token}`,
          ...headers_to_record(init.headers),
        },
      });
    } catch (error) {
      if (init.signal?.aborted) {
        throw cancelled_error(error);
      }
      throw new GatewayTransportError("provider_unavailable", "Gateway request failed", {
        cause: error,
      });
    }
    if (response.status < 200 || response.status >= 300) {
      await cancel_response_body(response);
      throw new GatewayTransportError(
        "http_error",
        `Gateway returned HTTP ${String(response.status)}`,
        { status_code: response.status },
      );
    }
    return response;
  }
}

interface SseMessage {
  readonly id: string;
  readonly data: string;
}

async function* parse_sse_messages(
  stream: ReadableStream<Uint8Array>,
  signal: AbortSignal,
): AsyncGenerator<SseMessage> {
  const reader = stream.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  const encoder = new TextEncoder();
  let buffer = "";
  let reached_eof = false;
  let at_stream_start = true;
  let previous_chunk_ended_with_cr = false;
  try {
    for (;;) {
      assert_not_aborted(signal);
      const { done, value } = await reader.read();
      let decoded: string;
      try {
        decoded = done ? decoder.decode() : decoder.decode(value, { stream: true });
      } catch (error) {
        throw new GatewayProtocolError("Gateway SSE stream is not valid UTF-8", {
          cause: error,
        });
      }
      if (at_stream_start && decoded.length > 0) {
        if (decoded.codePointAt(0) === 0xfeff) {
          decoded = decoded.slice(1);
        }
        at_stream_start = false;
      }
      const normalized = normalize_sse_chunk(decoded, previous_chunk_ended_with_cr);
      buffer += normalized.text;
      previous_chunk_ended_with_cr = normalized.ended_with_cr;

      let boundary = buffer.indexOf("\n\n");
      while (boundary >= 0) {
        const block = buffer.slice(0, boundary);
        if (encoder.encode(block).byteLength > MAX_SSE_EVENT_BYTES) {
          throw new GatewayProtocolError("Gateway SSE event exceeds the byte limit");
        }
        buffer = buffer.slice(boundary + 2);
        const message = parse_sse_block(block);
        if (message !== undefined) {
          yield message;
        }
        boundary = buffer.indexOf("\n\n");
      }
      if (encoder.encode(buffer).byteLength > MAX_SSE_EVENT_BYTES) {
        throw new GatewayProtocolError("Gateway SSE event exceeds the byte limit");
      }
      if (done) {
        if (buffer.trim().length > 0) {
          throw new GatewayProtocolError("Gateway SSE event is incomplete");
        }
        reached_eof = true;
        return;
      }
    }
  } catch (error) {
    if (signal.aborted) {
      throw cancelled_error(error);
    }
    if (error instanceof GatewayProtocolError || error instanceof GatewayTransportError) {
      throw error;
    }
    throw new GatewayTransportError("provider_unavailable", "Gateway event stream failed", {
      cause: error,
    });
  } finally {
    if (!reached_eof) {
      try {
        await reader.cancel();
      } catch {
        // The primary protocol or network failure remains authoritative.
      }
    }
    reader.releaseLock();
  }
}

function normalize_sse_chunk(
  value: string,
  suppress_leading_lf: boolean,
): { readonly text: string; readonly ended_with_cr: boolean } {
  if (value.length === 0) {
    return { text: "", ended_with_cr: suppress_leading_lf };
  }
  const chunk = suppress_leading_lf && value.startsWith("\n") ? value.slice(1) : value;
  return {
    text: chunk.replaceAll("\r\n", "\n").replaceAll("\r", "\n"),
    ended_with_cr: chunk.endsWith("\r"),
  };
}

function parse_sse_block(block: string): SseMessage | undefined {
  let id: string | undefined;
  const data_lines: string[] = [];
  for (const line of block.split("\n")) {
    if (line.startsWith(":")) {
      continue;
    }
    const separator = line.indexOf(":");
    const field = separator < 0 ? line : line.slice(0, separator);
    let value = separator < 0 ? "" : line.slice(separator + 1);
    if (value.startsWith(" ")) {
      value = value.slice(1);
    }
    if (field === "id") {
      id = value;
    } else if (field === "data") {
      data_lines.push(value);
    }
  }
  if (data_lines.length === 0) {
    return undefined;
  }
  if (id === undefined || !/^\d+$/u.test(id)) {
    throw new GatewayProtocolError("Gateway SSE event ID is invalid");
  }
  return { id, data: data_lines.join("\n") };
}

async function read_bounded_body(
  response: Response,
  max_bytes: number,
  signal: AbortSignal | null | undefined,
): Promise<Uint8Array> {
  const content_length = Number(response.headers.get("content-length"));
  if (Number.isFinite(content_length) && content_length > max_bytes) {
    if (response.body !== null) {
      try {
        await response.body.cancel();
      } catch {
        // The size violation remains authoritative.
      }
    }
    throw malformed_gateway_response();
  }
  if (response.body === null) {
    return new Uint8Array();
  }
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let byte_length = 0;
  let reached_eof = false;
  try {
    for (;;) {
      assert_not_aborted(signal);
      const { done, value } = await reader.read();
      if (done) {
        reached_eof = true;
        break;
      }
      byte_length += value.byteLength;
      if (byte_length > max_bytes) {
        throw malformed_gateway_response();
      }
      chunks.push(value);
    }
  } catch (error) {
    if (signal?.aborted === true) {
      throw cancelled_error(error);
    }
    if (error instanceof GatewayTransportError) {
      throw error;
    }
    throw new GatewayTransportError(
      "provider_unavailable",
      "Gateway response body failed while streaming",
      { cause: error },
    );
  } finally {
    if (!reached_eof) {
      try {
        await reader.cancel();
      } catch {
        // The primary body read failure remains authoritative.
      }
    }
    reader.releaseLock();
  }
  const body = new Uint8Array(byte_length);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return body;
}

function parse_job_response(value: unknown): GatewayJobResponse {
  assert_protocol(value);
  const result = GatewayJobResponseSchema.safeParse(value);
  if (!result.success) {
    throw malformed_gateway_response(result.error);
  }
  return result.data;
}

function assert_protocol(value: unknown): void {
  if (
    typeof value !== "object" ||
    value === null ||
    !("protocol_version" in value) ||
    value.protocol_version !== PROTOCOL_VERSION
  ) {
    throw new GatewayProtocolError(`Gateway protocol must be ${PROTOCOL_VERSION}`);
  }
}

function merge_job_event(job: GatewayJobResponse, event: GatewayJobEvent): GatewayJobResponse {
  return GatewayJobResponseSchema.parse({
    protocol_version: PROTOCOL_VERSION,
    job_id: job.job_id,
    request_id: job.request_id,
    provider_id: job.provider_id,
    state: event.state,
    ...(event.image_ids === undefined ? {} : { image_ids: event.image_ids }),
    ...(event.error === undefined ? {} : { error: event.error }),
  });
}

function is_terminal(state: string): boolean {
  return TERMINAL_STATES.has(state);
}

function is_retryable(error: GatewayTransportError): boolean {
  return (
    error.code === "provider_unavailable" ||
    error.status_code === 408 ||
    error.status_code === 429 ||
    (error.status_code !== undefined && error.status_code >= 500 && error.status_code <= 599)
  );
}

function headers_to_record(headers: HeadersInit | undefined): Record<string, string> {
  return Object.fromEntries(new Headers(headers).entries());
}

function assert_not_aborted(signal: AbortSignal | null | undefined): void {
  if (signal?.aborted === true) {
    throw cancelled_error(signal.reason);
  }
}

function cancelled_error(cause?: unknown): GatewayTransportError {
  return new GatewayTransportError("cancelled", "Gateway request was cancelled", {
    cause,
  });
}

function malformed_gateway_response(cause?: unknown): GatewayTransportError {
  return new GatewayTransportError("malformed_response", "Gateway response is malformed", {
    cause,
  });
}

function has_media_type(value: string, expected: string): boolean {
  return value.split(";", 1)[0]?.trim().toLowerCase() === expected;
}

async function cancel_response_body(response: Response): Promise<void> {
  if (response.body === null) {
    return;
  }
  try {
    await response.body.cancel();
  } catch {
    // The primary HTTP or protocol failure remains authoritative.
  }
}
