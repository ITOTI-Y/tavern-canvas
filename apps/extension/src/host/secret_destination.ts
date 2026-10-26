/** Callers receive only stable references and presence probes, never a plaintext read API. */
export interface SecretDestinationPort {
  supports(credential_kind: string): boolean;
  write_secret(reference: string, plaintext_value: string): Promise<void>;
  delete_secret?(reference: string): Promise<void>;
  /** A credential-reference probe: confirms the secret is retrievable by reference, never returns plaintext. */
  probe_secret(reference: string): Promise<boolean>;
}
