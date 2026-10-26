import type { CredentialStorageMode } from "@tavern-canvas/contracts";

import type { SecretDestinationPort } from "../host/secret_destination.js";
import type { BrowserSecretVaultPort } from "../storage/browser_secret_vault.js";
import type { DeviceSecretVault } from "../storage/device_secret_vault.js";
import { SecretResolutionError, type SecretResolverPort } from "./sillytavern_secret_resolver.js";

export interface SecretBackendRouterOptions {
  readonly mode: () => CredentialStorageMode;
  readonly host_destination: SecretDestinationPort | null;
  readonly host_resolver: SecretResolverPort | null;
  readonly browser_vault: BrowserSecretVaultPort | null;
  readonly device_vault: DeviceSecretVault | null;
}

/** Routes every credential operation through the currently selected storage mode. */
export class SecretBackendRouter implements SecretDestinationPort, SecretResolverPort {
  readonly #mode: () => CredentialStorageMode;
  readonly #host_destination: SecretDestinationPort | null;
  readonly #host_resolver: SecretResolverPort | null;
  readonly #browser_vault: BrowserSecretVaultPort | null;
  readonly #device_vault: DeviceSecretVault | null;

  constructor(options: SecretBackendRouterOptions) {
    this.#mode = options.mode;
    this.#host_destination = options.host_destination;
    this.#host_resolver = options.host_resolver;
    this.#browser_vault = options.browser_vault;
    this.#device_vault = options.device_vault;
  }

  get has_destination(): boolean {
    return (
      this.#host_destination !== null || this.#browser_vault !== null || this.#device_vault !== null
    );
  }

  get has_resolver(): boolean {
    return (
      this.#host_resolver !== null || this.#browser_vault !== null || this.#device_vault !== null
    );
  }

  supports(credential_kind: string): boolean {
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
    switch (this.#mode()) {
      case "browser_device":
        return this.#device_vault;
      case "browser_encrypted":
        return this.#browser_vault;
      case "host":
        return this.#host_destination;
    }
  }

  #resolver(): SecretResolverPort | null {
    switch (this.#mode()) {
      case "browser_device":
        return this.#device_vault;
      case "browser_encrypted":
        return this.#browser_vault;
      case "host":
        return this.#host_resolver;
    }
  }

  #mode_label(): string {
    switch (this.#mode()) {
      case "browser_device":
        return "Device";
      case "browser_encrypted":
        return "Encrypted browser";
      case "host":
        return "Host";
    }
  }
}
