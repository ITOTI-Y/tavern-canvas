import {
  ProviderNetworkError,
  type ProviderRemoteAssetOperation,
  type ProviderTransport,
  type ProviderTransportOperation,
  type ProviderTransportResponse,
} from "@tavern-canvas/providers";

import {
  ProviderTransportBoundaryError,
  validate_provider_operation,
  validate_remote_operation,
} from "./host_proxy_transport.js";
import { is_loopback_origin, normalize_http_origin } from "./http_acknowledgment.js";

export type ProviderFetch = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

export interface LocalDirectTransportOptions {
  readonly base_url: string;
  readonly fetch?: ProviderFetch;
}

export class LocalDirectTransport implements ProviderTransport {
  readonly #base_url: string;
  readonly #fetch: ProviderFetch;

  constructor(options: LocalDirectTransportOptions) {
    let base_url: string;
    try {
      base_url = normalize_http_origin(options.base_url);
    } catch (error) {
      throw new ProviderTransportBoundaryError(
        "configuration",
        "Direct provider base URL is invalid",
        { cause: error },
      );
    }
    if (!is_loopback_origin(base_url)) {
      throw new ProviderTransportBoundaryError(
        "configuration",
        "Direct provider base URL must use a loopback address",
      );
    }
    this.#base_url = base_url;
    this.#fetch = options.fetch ?? globalThis.fetch.bind(globalThis);
  }

  execute(operation: ProviderTransportOperation): Promise<ProviderTransportResponse> {
    const validated = validate_provider_operation(operation);
    return this.#execute_url(
      `${this.#base_url}${validated.route}`,
      {
        method: validated.method,
        ...(validated.body === undefined ? {} : { body: new Uint8Array(validated.body).buffer }),
        headers: {
          ...(validated.content_type === undefined
            ? {}
            : { "content-type": validated.content_type }),
          ...(validated.accept === undefined ? {} : { accept: validated.accept }),
        },
        signal: validated.signal,
      },
      validated.max_response_bytes,
    );
  }

  fetch_remote_asset(operation: ProviderRemoteAssetOperation): Promise<ProviderTransportResponse> {
    const validated = validate_remote_operation(operation);
    return this.#execute_url(
      validated.url,
      { method: "GET", signal: validated.signal },
      validated.max_bytes,
    );
  }

  async #execute_url(
    url: string,
    init: RequestInit,
    max_bytes: number,
  ): Promise<ProviderTransportResponse> {
    let response: Response;
    try {
      response = await this.#fetch(url, {
        ...init,
        cache: "no-store",
        credentials: "omit",
        redirect: "error",
      });
    } catch (error) {
      if (init.signal?.aborted) {
        throw new DOMException("Provider request was aborted", "AbortError");
      }
      throw new ProviderNetworkError({ cause: error });
    }
    const content_length = Number(response.headers.get("content-length"));
    if (Number.isFinite(content_length) && content_length > max_bytes) {
      if (response.body !== null) {
        try {
          await response.body.cancel();
        } catch {
          // The size violation remains authoritative.
        }
      }
      throw new ProviderTransportBoundaryError(
        "malformed_response",
        "Provider response exceeds the byte limit",
      );
    }
    const body = await read_bounded_body(response.body, max_bytes, init.signal);
    return {
      status: response.status,
      headers: Object.fromEntries(response.headers.entries()),
      body,
    };
  }
}

async function read_bounded_body(
  stream: ReadableStream<Uint8Array> | null,
  max_bytes: number,
  signal: AbortSignal | null | undefined,
): Promise<Uint8Array> {
  if (stream === null) {
    return new Uint8Array();
  }
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  let byte_length = 0;
  let reached_eof = false;
  try {
    for (;;) {
      if (signal?.aborted === true) {
        throw new DOMException("Provider request was aborted", "AbortError");
      }
      const { done, value } = await reader.read();
      if (done) {
        reached_eof = true;
        break;
      }
      byte_length += value.byteLength;
      if (byte_length > max_bytes) {
        throw new ProviderTransportBoundaryError(
          "malformed_response",
          "Provider response exceeds the byte limit",
        );
      }
      chunks.push(value);
    }
  } catch (error) {
    if (signal?.aborted === true) {
      throw new DOMException("Provider request was aborted", "AbortError");
    }
    if (error instanceof ProviderTransportBoundaryError) {
      throw error;
    }
    throw new ProviderNetworkError({ cause: error });
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
