import type { CredentialStorageMode } from "@tavern-canvas/contracts";

import type { SecretCredentialKind } from "@tavern-canvas/v2-migration";
import type { SecretDestinationPort } from "../migration/secret_transfer.js";
import type { BrowserSecretVaultPort } from "../storage/browser_secret_vault.js";
import { SecretResolutionError, type SecretResolverPort } from "./sillytavern_secret_resolver.js";

export interface SecretBackendRouterOptions {
  readonly mode: () => CredentialStorageMode;
  readonly host_destination: SecretDestinationPort | null;
  readonly host_resolver: SecretResolverPort | null;
  readonly browser_vault: BrowserSecretVaultPort | null;
}

/** Routes every credential operation through the currently selected storage mode. */
export class SecretBackendRouter implements SecretDestinationPort, SecretResolverPort {
  readonly #mode: () => CredentialStorageMode;
  readonly #host_destination: SecretDestinationPort | null;
  readonly #host_resolver: SecretResolverPort | null;
  readonly #browser_vault: BrowserSecretVaultPort | null;

  constructor(options: SecretBackendRouterOptions) {
    this.#mode = options.mode;
    this.#host_destination = options.host_destination;
    this.#host_resolver = options.host_resolver;
    this.#browser_vault = options.browser_vault;
  }

  get has_destination(): boolean {
    return this.#host_destination !== null || this.#browser_vault !== null;
  }

  get has_resolver(): boolean {
    return this.#host_resolver !== null || this.#browser_vault !== null;
  }

  supports(credential_kind: SecretCredentialKind): boolean {
    const destination = this.#destination();
    return destination?.supports(credential_kind) ?? false;
  }

  async write_secret(reference: string, plaintext_value: string): Promise<void> {
    const destination = this.#destination();
    if (destination === null) {
      throw new Error(`${this.#mode_label()} credential storage is unavailable`);
    }
    return destination.write_secret(reference, plaintext_value);
  }
  async delete_secret(reference: string): Promise<void> {
    const destination = this.#destination();
    if (destination === null) {
      throw new Error(`${this.#mode_label()} credential storage is unavailable`);
    }
    if (destination.delete_secret === undefined) {
      throw new Error(`${this.#mode_label()} credential storage does not support deletion`);
    }
    return destination.delete_secret(reference);
  }

  async probe_secret(reference: string): Promise<boolean> {
    const destination = this.#destination();
    if (destination === null) {
      return false;
    }
    return destination.probe_secret(reference);
  }

  async resolve_secret(reference: string): Promise<string> {
    const resolver = this.#resolver();
    if (resolver === null) {
      throw new SecretResolutionError(
        "unsupported_host",
        `${this.#mode_label()} credential storage cannot reveal credentials`,
      );
    }
    return resolver.resolve_secret(reference);
  }

  #destination(): SecretDestinationPort | null {
    return this.#mode() === "browser_encrypted" ? this.#browser_vault : this.#host_destination;
  }

  #resolver(): SecretResolverPort | null {
    return this.#mode() === "browser_encrypted" ? this.#browser_vault : this.#host_resolver;
  }

  #mode_label(): string {
    return this.#mode() === "browser_encrypted" ? "Encrypted browser" : "Host";
  }
}
