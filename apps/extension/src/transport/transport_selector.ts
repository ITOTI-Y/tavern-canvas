import { direct_image_catalog_entry, type ProviderId } from "@tavern-canvas/contracts";
import { ProviderTransportBoundaryError } from "@tavern-canvas/providers";

import { is_loopback_origin, normalize_http_origin } from "./http_origin.js";

/** `secrets_readable`: storing a credential and reading one back are granted separately, and only reading makes a direct call possible. */
export interface DirectCloudCandidate {
  readonly provider_id: ProviderId;
  readonly credential_reference: string | null;
  readonly secrets_readable: boolean;
}

export interface TransportSelectionInput {
  readonly direct_provider_base_url: string | null;
  readonly direct_cloud: DirectCloudCandidate | null;
}

export type TransportSelection =
  | {
      readonly kind: "direct_cloud";
      readonly provider_id: ProviderId;
      readonly credential_reference: string;
    }
  | { readonly kind: "local_direct"; readonly endpoint: string };

export class TransportConfigurationError extends ProviderTransportBoundaryError {
  constructor(message: string, options?: ErrorOptions) {
    super("configuration", message, options);
    this.name = "TransportConfigurationError";
  }
}

/** Fixed priority: `direct_cloud` (needs a vault reference and a host that can resolve it), then `local_direct`. */
export function select_transport(input: TransportSelectionInput): TransportSelection {
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

/** `null` means the profile is not a direct-catalog cloud provider. A catalog provider that cannot produce a credential fails loudly instead of falling through to the generic "no transport" error. */
function select_direct_cloud(candidate: DirectCloudCandidate | null): TransportSelection | null {
  if (candidate === null || direct_image_catalog_entry(candidate.provider_id) === null) {
    return null;
  }
  if (candidate.credential_reference === null) {
    throw new TransportConfigurationError(
      "This provider needs a stored credential before it can be called directly; set one on the active profile",
    );
  }
  if (!candidate.secrets_readable) {
    throw new TransportConfigurationError(
      "This host cannot reveal stored credentials, so a direct provider call is impossible; switch the credential storage to this device",
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
