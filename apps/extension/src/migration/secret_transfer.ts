import type { SecretCredentialKind, SecretTransferOperation } from "@tavern-canvas/v2-migration";

/** Callers receive only stable references and presence probes, never a plaintext read API. */
export interface SecretDestinationPort {
  supports(credential_kind: SecretCredentialKind): boolean;
  write_secret(reference: string, plaintext_value: string): Promise<void>;
  delete_secret?(reference: string): Promise<void>;
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

/** Deterministic, so the mapping never needs persisting; the journal must not carry plaintext-adjacent values. */
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

/** Never touches `operation.plaintext_value` after the write and never returns it; the caller journals only `SecretTransferRecord`s. */
export async function transfer_secrets(
  operations: readonly SecretTransferOperation[],
  namespace: string,
  destination: SecretDestinationPort | null,
): Promise<SecretTransferSummary> {
  const records: SecretTransferRecord[] = [];
  for (const operation of operations) {
    // Sequential: SillyTavern's secrets.json write endpoint is not safe under concurrent writes.
    records.push(await transfer_one(operation, namespace, destination));
  }
  return { records, blocked: records.some((record) => record.status === "blocked") };
}
