import type { SecretCredentialKind, SecretTransferOperation } from "@tavern-canvas/v2-migration";

/**
 * The only supported places a reversible v2 credential can end up: SillyTavern's
 * own secret storage (referenced by a stable key, never read back as plaintext
 * by this module) or a Gateway profile, which removes the need to hold
 * provider credentials client-side at all. `migration_runner` decides which
 * applies; this module only executes the SillyTavern-secret-storage path.
 */
export interface SecretDestinationPort {
  supports(credential_kind: SecretCredentialKind): boolean;
  write_secret(reference: string, plaintext_value: string): Promise<void>;
  /** A credential-reference probe: confirms the secret is retrievable by reference, never returns plaintext. */
  probe_secret(reference: string): Promise<boolean>;
}

export type SecretTransferBlockedReason =
  "no_supported_destination" | "write_failed" | "probe_failed";

interface SecretTransferOperationIdentity {
  readonly credential_kind: SecretCredentialKind;
  readonly provider_profile_id: string;
  readonly source_path: string;
}

export interface SecretTransferSuccess extends SecretTransferOperationIdentity {
  readonly status: "transferred";
  readonly reference: string;
}

export interface SecretTransferBlocked extends SecretTransferOperationIdentity {
  readonly status: "blocked";
  readonly reason: SecretTransferBlockedReason;
}

export type SecretTransferRecord = SecretTransferSuccess | SecretTransferBlocked;

export interface SecretTransferSummary {
  readonly records: readonly SecretTransferRecord[];
  readonly blocked: boolean;
}

/**
 * Deterministic so the same (namespace, provider profile, credential) always
 * derives the same reference: nothing needs to persist the mapping anywhere
 * — including the journal, which must never carry a plaintext-adjacent value.
 */
export function derive_secret_reference(
  namespace: string,
  provider_profile_id: string,
  credential_kind: SecretCredentialKind,
): string {
  return `tavern_canvas:${namespace}:${provider_profile_id}:${credential_kind}`;
}

async function transfer_one(
  operation: SecretTransferOperation,
  namespace: string,
  destination: SecretDestinationPort | null,
): Promise<SecretTransferRecord> {
  const identity: SecretTransferOperationIdentity = {
    credential_kind: operation.credential_kind,
    provider_profile_id: operation.provider_profile_id,
    source_path: operation.source_path,
  };

  if (destination === null || !destination.supports(operation.credential_kind)) {
    return { ...identity, status: "blocked", reason: "no_supported_destination" };
  }

  const reference = derive_secret_reference(
    namespace,
    operation.provider_profile_id,
    operation.credential_kind,
  );

  try {
    await destination.write_secret(reference, operation.plaintext_value);
  } catch {
    return { ...identity, status: "blocked", reason: "write_failed" };
  }

  const probed = await destination.probe_secret(reference).catch(() => false);
  if (!probed) {
    return { ...identity, status: "blocked", reason: "probe_failed" };
  }

  return { ...identity, status: "transferred", reference };
}

/**
 * Transfers every reversible v2 credential to `destination`, verifying each
 * one through a credential-reference probe before it counts as migrated.
 * Never touches `operation.plaintext_value` after the write call, and never
 * returns it: the caller (migration_runner) journals only `SecretTransferRecord`s.
 */
export async function transfer_secrets(
  operations: readonly SecretTransferOperation[],
  namespace: string,
  destination: SecretDestinationPort | null,
): Promise<SecretTransferSummary> {
  const records: SecretTransferRecord[] = [];
  for (const operation of operations) {
    // Sequential, not Promise.all: secret destinations (a single SillyTavern
    // secrets.json write endpoint) are not guaranteed safe under concurrent
    // writes, and transfer order has no correctness requirement to trade away.
    records.push(await transfer_one(operation, namespace, destination));
  }
  return { records, blocked: records.some((record) => record.status === "blocked") };
}
