import {
  LLM_CREDENTIAL_KIND,
  LLM_ROUTE_CATALOG,
  LlmConnectionDraftSchema,
  LlmConnectionProfileSchema,
  derive_llm_credential_reference,
  type LlmConnectionDraft,
  type LlmConnectionProfile,
  type LlmConnectionTestResult,
  type LlmProviderKind,
} from "@tavern-canvas/contracts";
import type { LlmConnection, LlmConnectionRepository } from "@tavern-canvas/storage";

import type { SecretDestinationPort } from "../../migration/secret_transfer.js";

export interface LlmTransportOperation {
  /** A catalog route, never a client-supplied URL. */
  readonly route: `/${string}`;
  readonly method: "GET" | "POST";
  /** Names a host vault entry; the transport resolves and attaches it. Never a credential value. */
  readonly credential_reference: string | null;
  readonly body?: Uint8Array;
  readonly max_response_bytes: number;
  readonly signal: AbortSignal;
}

export interface LlmTransportResponse {
  readonly status: number;
  readonly body: Uint8Array;
}

/**
 * The text-LLM counterpart to `ProviderTransport`. It takes the same route-only operation shape,
 * with one addition the image side does not need: a `credential_reference`, because a user may
 * hold several text connections against one host and the transport has to know which vault entry
 * to resolve. A reference is not a credential, so this stays inside the same discipline: origin,
 * headers, and the credential value itself are all resolved host/Gateway-side.
 */
export interface LlmTransportPort {
  execute(operation: LlmTransportOperation): Promise<LlmTransportResponse>;
}

export type LlmConnectionsDomainEvent =
  | { readonly type: "connection_upserted"; readonly connection: LlmConnectionProfile }
  | { readonly type: "connection_removed"; readonly connection_id: string };

export interface LlmConnectionServiceDependencies {
  readonly repository: LlmConnectionRepository;
  readonly namespace: string;
  readonly secrets: SecretDestinationPort;
  readonly transport: LlmTransportPort;
  readonly clock: () => string;
}

const MAX_TEST_RESPONSE_BYTES = 1_000_000;

export class UnknownLlmConnectionError extends Error {
  readonly code = "unknown_llm_connection";

  constructor(connection_id: string) {
    super(`Unknown LLM connection "${connection_id}"`);
    this.name = "UnknownLlmConnectionError";
  }
}

export class LlmCredentialProbeError extends Error {
  readonly code = "credential_probe_failed";

  constructor(reference: string) {
    super(`credential_probe_failed: the vault did not confirm "${reference}"`);
    this.name = "LlmCredentialProbeError";
  }
}

function status_to_failure_code(status: number): string {
  if (status === 401 || status === 402 || status === 403) {
    return "auth_failed";
  }
  if (status === 429) {
    return "rate_limited";
  }
  if (status === 408) {
    return "timed_out";
  }
  if (status >= 400 && status < 500) {
    return "invalid_request";
  }
  return "provider_unavailable";
}

/**
 * Row shape: identity plus the two fields worth indexing live as typed columns, everything else
 * rides in `payload`. `credential_reference` is a column rather than a payload key because the
 * repository sweeps payloads for credential-shaped names and would reject it there.
 */
function to_record(
  profile: LlmConnectionProfile,
  namespace: string,
  created_at: string,
): LlmConnection {
  return {
    schema_version: 1,
    id: profile.id,
    namespace,
    record_key: `${namespace}:${profile.id}`,
    created_at,
    updated_at: profile.updated_at,
    provider_kind: profile.provider_kind,
    credential_reference: profile.credential_reference,
    payload: {
      display_name: profile.display_name,
      route: profile.route,
      model_id: profile.model_id,
      temperature: profile.temperature,
      max_output_tokens: profile.max_output_tokens,
      is_default: profile.is_default,
    },
  };
}

function to_profile(record: LlmConnection): LlmConnectionProfile {
  const payload = (record.payload ?? {}) as Record<string, unknown>;
  return LlmConnectionProfileSchema.parse({
    id: record.id,
    display_name: payload.display_name,
    provider_kind: record.provider_kind,
    route: payload.route,
    model_id: payload.model_id,
    temperature: payload.temperature,
    max_output_tokens: payload.max_output_tokens,
    is_default: payload.is_default,
    credential_reference: record.credential_reference,
    created_at: record.created_at,
    updated_at: record.updated_at,
  });
}

/**
 * Text-LLM connection profiles: CRUD, credential handover, and the connection test.
 *
 * The credential boundary is structural rather than guarded. `save` accepts an
 * `LlmConnectionDraft`, a strict object with no credential, header, or endpoint field, so there
 * is no save path a plaintext key could travel through. The one method that touches plaintext,
 * `set_credential`, hands it straight to the vault and keeps only the derived reference; it never
 * stores, returns, or logs the value.
 */
export class LlmConnectionService {
  readonly #deps: LlmConnectionServiceDependencies;
  readonly #listeners = new Set<(event: LlmConnectionsDomainEvent) => void>();

  constructor(dependencies: LlmConnectionServiceDependencies) {
    this.#deps = dependencies;
  }

  subscribe(handler: (event: LlmConnectionsDomainEvent) => void): () => void {
    this.#listeners.add(handler);
    return () => {
      this.#listeners.delete(handler);
    };
  }

  async list(): Promise<readonly LlmConnectionProfile[]> {
    const records = await this.#deps.repository.list(this.#deps.namespace);
    return records.map(to_profile);
  }

  async save(draft: LlmConnectionDraft): Promise<LlmConnectionProfile> {
    const valid = LlmConnectionDraftSchema.parse(draft);
    const existing = await this.#deps.repository.get(this.#deps.namespace, valid.id);
    const now = this.#deps.clock();

    const profile: LlmConnectionProfile = {
      ...valid,
      credential_reference: existing?.credential_reference ?? null,
      created_at: existing?.created_at ?? now,
      updated_at: now,
    };
    await this.#put(profile, profile.created_at);

    if (profile.is_default) {
      await this.#demote_other_defaults(profile.id, now);
    }
    return profile;
  }

  async remove(connection_id: string): Promise<void> {
    await this.#require(connection_id);
    await this.#deps.repository.delete(this.#deps.namespace, connection_id);
    this.#emit({ type: "connection_removed", connection_id });
  }

  /**
   * The only method that ever sees a plaintext credential. It writes to the vault, verifies the
   * write with a reference probe, and persists nothing but the reference; a failed probe leaves
   * the connection exactly as it was rather than pointing at an entry that cannot be resolved.
   */
  async set_credential(
    connection_id: string,
    plaintext_value: string,
  ): Promise<LlmConnectionProfile> {
    const profile = await this.#require(connection_id);
    if (plaintext_value.trim().length === 0) {
      throw new TypeError("An LLM connection credential must not be blank");
    }
    const reference = derive_llm_credential_reference(this.#deps.namespace, connection_id);
    if (!this.#deps.secrets.supports(LLM_CREDENTIAL_KIND)) {
      throw new TypeError("The host secret vault does not accept LLM connection credentials");
    }

    await this.#deps.secrets.write_secret(reference, plaintext_value);
    const probed = await this.#deps.secrets.probe_secret(reference).catch(() => false);
    if (!probed) {
      throw new LlmCredentialProbeError(reference);
    }

    const updated: LlmConnectionProfile = {
      ...profile,
      credential_reference: reference,
      updated_at: this.#deps.clock(),
    };
    await this.#put(updated, profile.created_at);
    return updated;
  }

  async clear_credential(connection_id: string): Promise<LlmConnectionProfile> {
    const profile = await this.#require(connection_id);
    const updated: LlmConnectionProfile = {
      ...profile,
      credential_reference: null,
      updated_at: this.#deps.clock(),
    };
    await this.#put(updated, profile.created_at);
    return updated;
  }

  async test_connection(connection_id: string): Promise<LlmConnectionTestResult> {
    const profile = await this.#require(connection_id);
    const started_at = Date.now();
    try {
      const response = await this.#deps.transport.execute({
        route: models_route(profile.provider_kind),
        method: "GET",
        credential_reference: profile.credential_reference,
        max_response_bytes: MAX_TEST_RESPONSE_BYTES,
        signal: AbortSignal.timeout(15_000),
      });
      if (response.status < 200 || response.status >= 300) {
        return { status: "failed", code: status_to_failure_code(response.status) };
      }
      return {
        status: "success",
        latency_ms: Math.max(0, Date.now() - started_at),
        model_id: profile.model_id,
      };
    } catch {
      return { status: "failed", code: "provider_unavailable" };
    }
  }

  async #require(connection_id: string): Promise<LlmConnectionProfile> {
    const record = await this.#deps.repository.get(this.#deps.namespace, connection_id);
    if (record === null) {
      throw new UnknownLlmConnectionError(connection_id);
    }
    return to_profile(record);
  }

  async #put(profile: LlmConnectionProfile, created_at: string): Promise<void> {
    await this.#deps.repository.put(
      this.#deps.namespace,
      to_record(profile, this.#deps.namespace, created_at),
    );
    this.#emit({ type: "connection_upserted", connection: profile });
  }

  /** A default is exclusive: promoting one demotes every other in the same namespace. */
  async #demote_other_defaults(kept_id: string, now: string): Promise<void> {
    const records = await this.#deps.repository.list(this.#deps.namespace);
    for (const record of records) {
      if (record.id === kept_id) {
        continue;
      }
      const other = to_profile(record);
      if (!other.is_default) {
        continue;
      }
      await this.#put({ ...other, is_default: false, updated_at: now }, other.created_at);
    }
  }

  #emit(event: LlmConnectionsDomainEvent): void {
    for (const listener of this.#listeners) {
      listener(event);
    }
  }
}

export function models_route(kind: LlmProviderKind): `/${string}` {
  return LLM_ROUTE_CATALOG[kind].models_route;
}
