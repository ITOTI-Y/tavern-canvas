import type { SecretResolverPort } from "../host/sillytavern_secret_resolver.js";
import type { SecretDestinationPort } from "../host/secret_destination.js";

export const BROWSER_SECRET_DATABASE_NAME = "config_tavern_canvas_browser_secrets" as const;
export const BROWSER_SECRET_DATABASE_VERSION = 1 as const;
export const BROWSER_SECRET_MINIMUM_PASSPHRASE_LENGTH = 12 as const;

export type BrowserSecretVaultStatus =
  | { readonly state: "unavailable" | "error"; readonly secret_count: 0 }
  | {
      readonly state: "uninitialized" | "locked" | "unlocked";
      readonly secret_count: number;
    };

export type BrowserSecretVaultErrorCode =
  | "already_initialized"
  | "corrupted"
  | "invalid_passphrase"
  | "invalid_reference"
  | "invalid_secret"
  | "locked"
  | "not_found"
  | "unavailable";

export class BrowserSecretVaultError extends Error {
  readonly code: BrowserSecretVaultErrorCode;

  constructor(code: BrowserSecretVaultErrorCode, message: string) {
    super(message);
    this.name = "BrowserSecretVaultError";
    this.code = code;
  }
}

export interface BrowserSecretVaultPort extends SecretDestinationPort, SecretResolverPort {
  status(): Promise<BrowserSecretVaultStatus>;
  initialize(passphrase: string): Promise<BrowserSecretVaultStatus>;
  delete_secret(reference: string): Promise<void>;
  unlock(passphrase: string): Promise<BrowserSecretVaultStatus>;
  lock(): Promise<BrowserSecretVaultStatus>;
  reset(): Promise<BrowserSecretVaultStatus>;
  close(): Promise<void>;
}

export interface EncryptedBrowserSecretVaultOptions {
  readonly crypto: Crypto;
  readonly database_name?: string;
  readonly now?: () => string;
}

function read_global_property(container: unknown, property_name: string): unknown {
  if ((typeof container !== "object" || container === null) && typeof container !== "function") {
    return undefined;
  }
  try {
    return Reflect.get(container, property_name);
  } catch {
    return undefined;
  }
}

class LazyBrowserSecretVault implements BrowserSecretVaultPort {
  readonly #options: EncryptedBrowserSecretVaultOptions;
  #pending: Promise<BrowserSecretVaultPort> | null = null;

  constructor(options: EncryptedBrowserSecretVaultOptions) {
    this.#options = options;
  }

  supports(): boolean {
    return true;
  }

  async write_secret(reference: string, plaintext_value: string): Promise<void> {
    return (await this.#load()).write_secret(reference, plaintext_value);
  }

  async delete_secret(reference: string): Promise<void> {
    return (await this.#load()).delete_secret(reference);
  }

  async probe_secret(reference: string): Promise<boolean> {
    return (await this.#load()).probe_secret(reference);
  }

  async resolve_secret(reference: string): Promise<string> {
    return (await this.#load()).resolve_secret(reference);
  }

  async status(): Promise<BrowserSecretVaultStatus> {
    return (await this.#load()).status();
  }

  async initialize(passphrase: string): Promise<BrowserSecretVaultStatus> {
    return (await this.#load()).initialize(passphrase);
  }

  async unlock(passphrase: string): Promise<BrowserSecretVaultStatus> {
    return (await this.#load()).unlock(passphrase);
  }

  async lock(): Promise<BrowserSecretVaultStatus> {
    return (await this.#load()).lock();
  }

  async reset(): Promise<BrowserSecretVaultStatus> {
    return (await this.#load()).reset();
  }

  async close(): Promise<void> {
    if (this.#pending !== null) {
      await (await this.#pending).close();
    }
  }

  #load(): Promise<BrowserSecretVaultPort> {
    return (this.#pending ??= import("./_encrypted_browser_secret_vault.js").then(
      ({ EncryptedBrowserSecretVault }) => new EncryptedBrowserSecretVault(this.#options),
    ));
  }
}

export function create_browser_secret_vault(
  globals: unknown = globalThis,
): BrowserSecretVaultPort | null {
  const indexed_db = read_global_property(globals, "indexedDB");
  const crypto = read_global_property(globals, "crypto");
  const subtle = read_global_property(crypto, "subtle");
  const get_random_values = read_global_property(crypto, "getRandomValues");
  if (
    typeof indexed_db !== "object" ||
    indexed_db === null ||
    typeof subtle !== "object" ||
    subtle === null ||
    typeof get_random_values !== "function"
  ) {
    return null;
  }
  return new LazyBrowserSecretVault({ crypto: crypto as Crypto });
}
