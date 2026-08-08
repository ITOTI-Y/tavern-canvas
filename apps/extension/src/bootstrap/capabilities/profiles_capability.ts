import type { ImageGenerationRequest, ProviderId, Uuid } from "@tavern-canvas/contracts";
import { ProviderIdSchema } from "@tavern-canvas/contracts";
import { ProviderAdapterError, type ProviderAdapter } from "@tavern-canvas/providers";
import type { ProviderProfile, ProviderProfileRepository } from "@tavern-canvas/storage";

import type { SecretDestinationPort } from "../../migration/secret_transfer.js";
import type {
  ProfileConnectionTestResult,
  ProfilesCapability,
  ProfilesDomainEvent,
  ProviderProfileSummary,
} from "../../ui/contracts/ui_capabilities.js";
import { capability_unavailable_error } from "../capability_resolution.js";
import {
  as_record,
  DomainEventEmitter,
  read_boolean,
  read_payload,
  read_string,
} from "./_records.js";

/**
 * The stored payload key holding which host-vault entry this profile authenticates with. It is a
 * key *name*, never credential material -- plaintext only ever travels UI -> host vault, never
 * into IndexedDB (roadmap rule: provider credentials are never client-stored), which is exactly
 * what `assert_safe_provider_payload` guards `provider_profiles` against.
 */
export const VAULT_KEY_FIELD = "vault_key";

/**
 * Every provider adapter validates its profile against its own `strictObject` schema (allowlists,
 * byte limits), so adapter-owned fields live in their own sub-object rather than beside this
 * capability's presentation fields, which those schemas would reject.
 */
const ADAPTER_PROFILE_FIELD = "provider_profile";

export interface ProfilesCapabilityDeps {
  readonly repository: ProviderProfileRepository;
  readonly namespace: () => string;
  /** Resolved on demand: the five concrete adapters are a sixth of the initial bundle and are
   * needed only by a connection test or a running job. */
  readonly load_adapters: () => Promise<Partial<Record<ProviderId, ProviderAdapter<ImageGenerationRequest>>>>;
  readonly secrets: SecretDestinationPort | null;
  readonly now: () => string;
}

/** The exact object a `ProviderAdapter.validate_profile` expects: adapter-owned fields plus identity. */
export function adapter_profile_of(record: ProviderProfile): Readonly<Record<string, unknown>> {
  return {
    ...as_record(read_payload(record)[ADAPTER_PROFILE_FIELD]),
    profile_id: record.id,
    provider_id: record.provider_id,
  };
}

function to_summary(record: ProviderProfile): ProviderProfileSummary {
  const payload = read_payload(record);
  return {
    id: record.id,
    provider_id: ProviderIdSchema.parse(record.provider_id),
    display_name: read_string(payload, "display_name", record.id),
    is_default: read_boolean(payload, "is_default", false),
    updated_at: record.updated_at,
  };
}

export function create_profiles_capability(deps: ProfilesCapabilityDeps): ProfilesCapability {
  const events = new DomainEventEmitter<ProfilesDomainEvent>();

  async function read(profile_id: Uuid): Promise<ProviderProfile> {
    const record = await deps.repository.get(deps.namespace(), profile_id);
    if (record === null) {
      throw capability_unavailable_error(`Provider profile ${profile_id} no longer exists`);
    }
    return record;
  }

  return {
    async load() {
      const records = await deps.repository.list(deps.namespace());
      return records.map(to_summary);
    },
    subscribe: (handler) => events.subscribe(handler),
    async save(draft) {
      const namespace = deps.namespace();
      const existing = await deps.repository.get(namespace, draft.id);
      const now = deps.now();
      const record: ProviderProfile = {
        schema_version: 1,
        id: draft.id,
        namespace,
        record_key: `${namespace}:${draft.id}`,
        created_at: existing?.created_at ?? now,
        updated_at: now,
        provider_id: draft.provider_id,
        payload: {
          // Adapter settings and the endpoint are not part of the UI draft; carry them forward
          // rather than dropping them on every presentation-level save.
          ...read_payload(existing ?? ({ payload: {} } as ProviderProfile)),
          display_name: draft.display_name,
          is_default: draft.is_default,
          ...(draft.secret_reference === null ? {} : { [VAULT_KEY_FIELD]: draft.secret_reference }),
        },
      };
      await deps.repository.put(namespace, record);
      const summary = to_summary(record);
      events.emit({ type: "profile_upserted", profile: summary });
      return summary;
    },
    async remove(profile_id) {
      await deps.repository.delete(deps.namespace(), profile_id);
      events.emit({ type: "profile_removed", profile_id });
    },
    /**
     * Two real checks, no network round-trip: the stored profile is validated by the provider's own
     * `validate_profile` (allowlists, byte limits, model list), and -- when the profile names a
     * host-vault entry -- the credential is probed for presence by reference. A provider-side
     * reachability call is not attempted because no provider adapter in this codebase exposes an
     * idempotent status route.
     */
    async test_connection(profile_id): Promise<ProfileConnectionTestResult> {
      const started_at = Date.now();
      const record = await read(profile_id);
      const provider_id = ProviderIdSchema.parse(record.provider_id);
      const adapter = (await deps.load_adapters())[provider_id];
      if (adapter === undefined) {
        return {
          status: "failed",
          error: { code: "provider_unavailable", retryable: false },
        };
      }
      try {
        adapter.validate_profile(adapter_profile_of(record));
      } catch (error) {
        return {
          status: "failed",
          error:
            error instanceof ProviderAdapterError
              ? error.provider_error
              : { code: "invalid_request", retryable: false },
        };
      }

      const vault_key = read_payload(record)[VAULT_KEY_FIELD];
      if (typeof vault_key === "string" && deps.secrets !== null) {
        const present = await deps.secrets.probe_secret(vault_key);
        if (!present) {
          return { status: "failed", error: { code: "auth_failed", retryable: false } };
        }
      }
      return { status: "success", latency_ms: Date.now() - started_at };
    },
  };
}
