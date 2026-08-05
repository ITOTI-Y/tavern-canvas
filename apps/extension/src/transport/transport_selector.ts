import {
  is_http_origin_acknowledged,
  is_loopback_origin,
  normalize_http_origin,
  requires_http_acknowledgment,
} from "./http_acknowledgment.js";

export interface TransportSelectionInput {
  readonly gateway_endpoint: string | null;
  readonly http_acknowledgments: Readonly<Record<string, string>>;
  readonly tauri_provider_available: boolean;
  readonly sillytavern_available: boolean;
  readonly direct_provider_base_url: string | null;
}

export type TransportSelection =
  | { readonly kind: "gateway"; readonly endpoint: string }
  | { readonly kind: "tauri" }
  | { readonly kind: "host_proxy" }
  | { readonly kind: "local_direct"; readonly endpoint: string };

export class TransportConfigurationError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "TransportConfigurationError";
  }
}

export function select_transport(input: TransportSelectionInput): TransportSelection {
  if (input.gateway_endpoint !== null) {
    const endpoint = normalize_or_configuration_error(input.gateway_endpoint);
    if (
      requires_http_acknowledgment(endpoint) &&
      !is_http_origin_acknowledged(input.http_acknowledgments, endpoint)
    ) {
      throw new TransportConfigurationError("Cleartext Gateway origin has not been acknowledged");
    }
    return { kind: "gateway", endpoint };
  }
  if (input.tauri_provider_available) {
    return { kind: "tauri" };
  }
  if (input.sillytavern_available) {
    return { kind: "host_proxy" };
  }
  if (input.direct_provider_base_url !== null) {
    const endpoint = normalize_or_configuration_error(input.direct_provider_base_url);
    if (!is_loopback_origin(endpoint)) {
      throw new TransportConfigurationError("Direct provider endpoint must use a loopback address");
    }
    return { kind: "local_direct", endpoint };
  }
  throw new TransportConfigurationError("No provider transport is available");
}

function normalize_or_configuration_error(value: string): string {
  try {
    return normalize_http_origin(value);
  } catch (error) {
    throw new TransportConfigurationError("Transport endpoint is invalid", {
      cause: error,
    });
  }
}
