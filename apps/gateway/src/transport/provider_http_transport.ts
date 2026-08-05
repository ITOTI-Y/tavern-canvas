import {
  MAX_PROVIDER_REQUEST_BYTES,
  ProviderNetworkError,
  assert_provider_route,
  type ProviderRemoteAssetOperation,
  type ProviderTransport,
  type ProviderTransportOperation,
  type ProviderTransportResponse,
} from "@tavern-canvas/providers";

import type { GatewayProviderConfig } from "../config/config_schema.js";

export interface ProviderHttpTransportOptions {
  readonly provider: GatewayProviderConfig;
  readonly fetcher?: typeof fetch;
  readonly max_response_bytes?: number;
}

const DEFAULT_MAX_RESPONSE_BYTES = 100_000_000;

export class ProviderHttpTransport implements ProviderTransport {
  readonly #provider: GatewayProviderConfig;
  readonly #fetcher: typeof fetch;
  readonly #max_response_bytes: number;

  constructor(options: ProviderHttpTransportOptions) {
    this.#provider = options.provider;
    this.#fetcher = options.fetcher ?? fetch;
    this.#max_response_bytes = options.max_response_bytes ?? DEFAULT_MAX_RESPONSE_BYTES;
  }

  async execute(operation: ProviderTransportOperation): Promise<ProviderTransportResponse> {
    assert_provider_route(operation.route);
    if (operation.body !== undefined) {
      if (
        !Number.isSafeInteger(operation.max_request_bytes) ||
        operation.max_request_bytes <= 0 ||
        operation.max_request_bytes > MAX_PROVIDER_REQUEST_BYTES
      ) {
        throw new TypeError("Provider request body limit is invalid");
      }
      if (operation.body.byteLength > operation.max_request_bytes) {
        throw new TypeError("Provider request body exceeds its byte limit");
      }
    }
    const url = new URL(operation.route, `${this.#provider.base_url}/`);
    const headers = new Headers();
    if (operation.content_type !== undefined) {
      headers.set("content-type", operation.content_type);
    }
    if (operation.accept !== undefined) {
      headers.set("accept", operation.accept);
    }
    const credential = this.#provider.credential?.reveal();
    if (credential !== undefined) {
      if (this.#provider.provider_id === "google_image") {
        headers.set("x-goog-api-key", credential);
      } else {
        headers.set("authorization", `Bearer ${credential}`);
      }
    }
    const request_body = operation.body === undefined ? undefined : new Uint8Array(operation.body);
    const request_init: RequestInit = {
      method: operation.method,
      headers,
      redirect: "error",
      signal: operation.signal,
      ...(request_body === undefined ? {} : { body: request_body }),
    };
    let response: Response;
    try {
      response = await this.#fetcher(url, request_init);
    } catch (error) {
      if (operation.signal.aborted) {
        throw error;
      }
      throw new ProviderNetworkError({ cause: error });
    }
    const body = await read_bounded_body(
      response,
      Math.min(operation.max_response_bytes, this.#max_response_bytes),
    );
    return {
      status: response.status,
      headers: response_headers(response.headers),
      body,
    };
  }

  async fetch_remote_asset(
    operation: ProviderRemoteAssetOperation,
  ): Promise<ProviderTransportResponse> {
    let url: URL;
    try {
      url = new URL(operation.url);
    } catch (error) {
      throw new ProviderNetworkError({ cause: error });
    }
    if (
      (url.protocol !== "https:" && url.protocol !== "http:") ||
      url.username.length > 0 ||
      url.password.length > 0 ||
      !operation.allowed_origins.includes(url.origin)
    ) {
      throw new ProviderNetworkError();
    }
    let response: Response;
    try {
      response = await this.#fetcher(url, {
        method: "GET",
        redirect: "error",
        signal: operation.signal,
      });
    } catch (error) {
      if (operation.signal.aborted) {
        throw error;
      }
      throw new ProviderNetworkError({ cause: error });
    }
    const body = await read_bounded_body(
      response,
      Math.min(operation.max_bytes, this.#max_response_bytes),
    );
    return {
      status: response.status,
      headers: response_headers(response.headers),
      body,
    };
  }
}

async function read_bounded_body(response: Response, max_bytes: number): Promise<Uint8Array> {
  const content_length = response.headers.get("content-length");
  if (content_length !== null) {
    const parsed_length = Number(content_length);
    if (Number.isSafeInteger(parsed_length) && parsed_length > max_bytes) {
      throw new ProviderNetworkError();
    }
  }
  const response_body = response.body;
  if (response_body === null) {
    return new Uint8Array();
  }
  const reader = response_body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    let done = false;
    while (!done) {
      const chunk = await reader.read();
      if (chunk.done) {
        done = true;
        continue;
      }
      total += chunk.value.byteLength;
      if (total > max_bytes) {
        await reader.cancel();
        throw new ProviderNetworkError();
      }
      chunks.push(chunk.value);
    }
  } catch (error) {
    if (error instanceof ProviderNetworkError) {
      throw error;
    }
    throw new ProviderNetworkError({ cause: error });
  }
  const body = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return body;
}

function response_headers(headers: Headers): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of headers.entries()) {
    result[key.toLowerCase()] = value;
  }
  return result;
}
