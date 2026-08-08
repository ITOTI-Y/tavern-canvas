import { direct_image_catalog_entry, type ProviderId } from "@tavern-canvas/contracts";

import {
  is_http_origin_acknowledged,
  is_loopback_origin,
  normalize_http_origin,
  requires_http_acknowledgment,
} from "./http_acknowledgment.js";

/**
 * What the active provider profile contributes to the decision. `provider_id` selects the catalog
 * entry, `credential_reference` names a vault entry, and `secrets_readable` records whether this
 * host exposes a secret *resolver* at all -- storing a credential and reading one back are
 * separately granted, and only the second one makes a direct call possible.
 */
export interface DirectCloudCandidate {
  readonly provider_id: ProviderId;
  readonly credential_reference: string | null;
  readonly secrets_readable: boolean;
}

export interface TransportSelectionInput {
  readonly gateway_endpoint: string | null;
  readonly http_acknowledgments: Readonly<Record<string, string>>;
  readonly tauri_provider_available: boolean;
  readonly sillytavern_available: boolean;
  readonly direct_provider_base_url: string | null;
  readonly direct_cloud: DirectCloudCandidate | null;
}

export type TransportSelection =
  | { readonly kind: "gateway"; readonly endpoint: string }
  | { readonly kind: "tauri" }
  | { readonly kind: "host_proxy" }
  | {
      readonly kind: "direct_cloud";
      readonly provider_id: ProviderId;
      readonly credential_reference: string;
    }
  | { readonly kind: "local_direct"; readonly endpoint: string };

export class TransportConfigurationError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "TransportConfigurationError";
  }
}

/**
 * Fixed, settings-driven priority. Nothing here is client-configurable; the user's only levers are
 * which profile is active and whether a Gateway endpoint is configured.
 *
 * 1. `gateway`   -- configuring an endpoint *is* the opt-in to the higher-security route, so it
 *                   outranks everything else whenever one is present.
 * 2. `tauri`     -- a host-native provider bridge keeps the credential out of the page entirely.
 * 3. `host_proxy`-- same reasoning, for a host that relays provider calls first-party.
 * 4. `direct_cloud` -- the default for the three catalog cloud vendors (user decision
 *                   2026-08-07). Requires a vault reference and a host that can resolve it.
 * 5. `local_direct` -- a loopback provider the user runs themselves.
 */
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
  const direct_cloud = select_direct_cloud(input.direct_cloud);
  if (direct_cloud !== null) {
    return direct_cloud;
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

/**
 * `null` means "this profile is not a direct-catalog cloud provider, keep looking". A provider
 * that *is* in the catalog but cannot produce a credential fails loudly instead: falling through
 * to the loopback branch would end in the generic "no transport is available" message, which tells
 * the user nothing about the credential they actually need to set.
 */
function select_direct_cloud(candidate: DirectCloudCandidate | null): TransportSelection | null {
  if (candidate === null || direct_image_catalog_entry(candidate.provider_id) === null) {
    return null;
  }
  if (candidate.credential_reference === null) {
    throw new TransportConfigurationError(
      "This provider needs a stored credential before it can be called directly; set one on the active profile or configure a Gateway",
    );
  }
  if (!candidate.secrets_readable) {
    throw new TransportConfigurationError(
      "This host cannot reveal stored credentials, so a direct provider call is impossible; configure a Gateway instead",
    );
  }
  return {
    kind: "direct_cloud",
    provider_id: candidate.provider_id,
    credential_reference: candidate.credential_reference,
  };
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
