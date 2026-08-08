import type {
  ProviderRemoteAssetOperation,
  ProviderTransport,
  ProviderTransportOperation,
  ProviderTransportResponse,
} from "@tavern-canvas/providers";

import { execute_bounded_fetch, type ProviderFetch } from "./browser_fetch.js";
import {
  ProviderTransportBoundaryError,
  validate_provider_operation,
  validate_remote_operation,
} from "./host_proxy_transport.js";
import { is_loopback_origin, normalize_http_origin } from "./http_acknowledgment.js";

export type { ProviderFetch } from "./browser_fetch.js";

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
    return execute_bounded_fetch(
      this.#fetch,
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
    return execute_bounded_fetch(
      this.#fetch,
      validated.url,
      { method: "GET", signal: validated.signal },
      validated.max_bytes,
    );
  }
}
