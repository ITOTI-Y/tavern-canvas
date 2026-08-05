import type {
  ProviderRemoteAssetOperation,
  ProviderTransport,
  ProviderTransportOperation,
  ProviderTransportResponse,
} from "@tavern-canvas/providers";

import {
  ProviderTransportBoundaryError,
  validate_provider_operation,
  validate_provider_response,
  validate_remote_operation,
} from "./host_proxy_transport.js";

export interface TauriProviderTransportSurface {
  execute_provider_request(operation: ProviderTransportOperation): Promise<unknown>;
  fetch_remote_asset?(operation: ProviderRemoteAssetOperation): Promise<unknown>;
}

export class TauriTransport implements ProviderTransport {
  readonly #surface: TauriProviderTransportSurface;

  constructor(surface: TauriProviderTransportSurface) {
    this.#surface = surface;
  }

  async execute(operation: ProviderTransportOperation): Promise<ProviderTransportResponse> {
    const validated = validate_provider_operation(operation);
    return validate_provider_response(
      await this.#surface.execute_provider_request(validated),
      validated.max_response_bytes,
    );
  }

  async fetch_remote_asset(
    operation: ProviderRemoteAssetOperation,
  ): Promise<ProviderTransportResponse> {
    const validated = validate_remote_operation(operation);
    if (this.#surface.fetch_remote_asset === undefined) {
      throw new ProviderTransportBoundaryError(
        "unsupported_operation",
        "Tauri provider capability cannot fetch remote assets",
      );
    }
    return validate_provider_response(
      await this.#surface.fetch_remote_asset(validated),
      validated.max_bytes,
    );
  }
}
