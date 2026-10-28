import {
  ProviderIdSchema,
  direct_image_catalog_entry,
  type ProviderId,
} from "@tavern-canvas/contracts";
import type { ProviderTransport } from "@tavern-canvas/providers";
import type { ProviderProfile } from "@tavern-canvas/storage";

import type { SecretResolverPort } from "../host/sillytavern_secret_resolver.js";
import { NovelAiServiceUnavailableError } from "../modules/novelai/novelai_errors.js";
import type { ProviderFetch } from "../transport/browser_fetch.js";
import { DirectCloudTransport } from "../transport/direct_cloud_transport.js";
import { LocalDirectTransport } from "../transport/local_direct_transport.js";
import type { DirectCloudCandidate, TransportSelection } from "../transport/transport_selector.js";
import { VAULT_KEY_FIELD } from "./capabilities/profiles_capability.js";
import {
  as_record,
  read_array,
  read_optional_string,
  read_payload,
} from "./capabilities/_records.js";

export interface ProviderTransportDependencies {
  readonly secrets: SecretResolverPort | null;
  readonly fetch?: ProviderFetch;
}

export function create_provider_transport(
  selection: TransportSelection,
  dependencies: ProviderTransportDependencies = { secrets: null },
): ProviderTransport {
  const fetch_ = dependencies.fetch;
  switch (selection.kind) {
    case "direct_cloud": {
      const catalog_entry = direct_image_catalog_entry(selection.provider_id);
      if (catalog_entry === null || dependencies.secrets === null) {
        throw new Error(
          `No direct route catalog entry and host credential resolver pair exists for ${selection.provider_id}`,
        );
      }
      return new DirectCloudTransport({
        catalog_entry,
        credential_reference: selection.credential_reference,
        secrets: dependencies.secrets,
        ...(fetch_ === undefined ? {} : { fetch: fetch_ }),
      });
    }
    case "local_direct":
      return new LocalDirectTransport({
        base_url: selection.endpoint,
        ...(fetch_ === undefined ? {} : { fetch: fetch_ }),
      });
  }
}

export interface ActiveProfile {
  readonly record: ProviderProfile;
  readonly provider_id: ProviderId;
  readonly model_id: string | null;
  /** Only reaches `LocalDirectTransport`, which requires a loopback origin; cloud origins come from the code-owned route catalog. */
  readonly base_url: string | null;
  readonly direct_cloud: DirectCloudCandidate;
}

export function describe_active_profile(
  record: ProviderProfile,
  secrets_readable: boolean,
): ActiveProfile | null {
  const provider_id = ProviderIdSchema.safeParse(record.provider_id).data;
  if (provider_id === undefined) {
    return null;
  }
  const payload = read_payload(record);
  return {
    record,
    provider_id,
    model_id:
      read_array(as_record(payload.provider_profile), "model_allowlist").find(
        (model): model is string => typeof model === "string",
      ) ?? null,
    base_url: read_optional_string(payload, "base_url"),
    direct_cloud: {
      provider_id,
      credential_reference: read_optional_string(payload, VAULT_KEY_FIELD),
      secrets_readable,
    },
  };
}

/** Builds the underlying transport per call, so a profile switch takes effect on the next request. */
export function live_transport(resolve: () => Promise<ProviderTransport>): ProviderTransport {
  return {
    async execute(operation) {
      return (await resolve()).execute(operation);
    },
    async fetch_remote_asset(operation) {
      const transport = await resolve();
      if (transport.fetch_remote_asset === undefined) {
        throw new Error("The active provider transport cannot fetch remote assets");
      }
      return transport.fetch_remote_asset(operation);
    },
  };
}

/** Account lookups and vibe encoding always go straight to NovelAI with the active profile's credential. */
export function create_novelai_transport(
  candidate: DirectCloudCandidate | null,
  secrets: SecretResolverPort | null,
  fetch_: ProviderFetch | undefined,
): ProviderTransport {
  if (candidate === null || candidate.provider_id !== "novelai") {
    throw new NovelAiServiceUnavailableError(
      "The active provider profile is not a NovelAI profile",
    );
  }
  if (candidate.credential_reference === null) {
    throw new NovelAiServiceUnavailableError(
      "The active NovelAI profile has no stored token; set one in Settings > Providers",
    );
  }
  if (!candidate.secrets_readable || secrets === null) {
    throw new NovelAiServiceUnavailableError(
      "This host cannot reveal stored credentials; enable allowKeysExposure in SillyTavern's config.yaml",
    );
  }
  return create_provider_transport(
    {
      kind: "direct_cloud",
      provider_id: "novelai",
      credential_reference: candidate.credential_reference,
    },
    { secrets, ...(fetch_ === undefined ? {} : { fetch: fetch_ }) },
  );
}
