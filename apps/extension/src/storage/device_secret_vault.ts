import { VaultReferenceSchema } from "@tavern-canvas/contracts";
import { openDB, type DBSchema, type IDBPDatabase } from "idb";

import type { SecretDestinationPort } from "../host/secret_destination.js";
import type { SecretResolverPort } from "../host/sillytavern_secret_resolver.js";
import { BrowserSecretVaultError } from "./browser_secret_vault.js";

export const DEVICE_SECRET_DATABASE_NAME = "config_tavern_canvas_device_secrets" as const;

const KEY_RECORD_ID = "device" as const;
const KEYS_STORE = "keys" as const;
const SECRETS_STORE = "secrets" as const;
const AES_GCM_IV_BYTES = 12;
const MAX_SECRET_BYTES = 16_384;

interface DeviceKeyRecord {
  readonly id: typeof KEY_RECORD_ID;
  readonly key: CryptoKey;
}

interface DeviceSecretRecord {
  readonly reference: string;
  readonly iv: ArrayBuffer;
  readonly ciphertext: ArrayBuffer;
  readonly updated_at: string;
}

interface DeviceSecretDatabaseSchema extends DBSchema {
  keys: { key: string; value: DeviceKeyRecord };
  secrets: { key: string; value: DeviceSecretRecord };
}

export interface DeviceSecretVaultOptions {
  readonly crypto: Crypto;
  readonly database_name?: string;
  readonly now?: () => string;
}

function validate_reference(reference: string): string {
  const parsed = VaultReferenceSchema.safeParse(reference);
  if (!parsed.success) {
    throw new BrowserSecretVaultError(
      "invalid_reference",
      "Credential reference must use the tavern_canvas: vault format",
    );
  }
  return parsed.data;
}

/**
 * Encrypts credentials with a non-extractable AES-GCM key kept in this page's IndexedDB, so no
 * passphrase is needed and the host never has to reveal secrets. Ciphertext stays out of settings
 * and exports; it does not protect against other scripts running in the same page, which can call
 * `resolve_secret` like TavernCanvas does.
 */
export class DeviceSecretVault implements SecretDestinationPort, SecretResolverPort {
  readonly #crypto: Crypto;
  readonly #database_name: string;
  readonly #now: () => string;
  #database: Promise<IDBPDatabase<DeviceSecretDatabaseSchema>> | null = null;
  #key: Promise<CryptoKey> | null = null;

  constructor(options: DeviceSecretVaultOptions) {
    this.#crypto = options.crypto;
    this.#database_name = options.database_name ?? DEVICE_SECRET_DATABASE_NAME;
    this.#now = options.now ?? (() => new Date().toISOString());
  }

  supports(): boolean {
    return true;
  }

  async write_secret(reference: string, plaintext_value: string): Promise<void> {
    const validated = validate_reference(reference);
    const plaintext = new TextEncoder().encode(plaintext_value);
    if (plaintext.byteLength === 0 || plaintext.byteLength > MAX_SECRET_BYTES) {
      plaintext.fill(0);
      throw new BrowserSecretVaultError(
        "invalid_secret",
        "Credential value is empty or exceeds the device vault limit",
      );
    }
    const iv = new Uint8Array(AES_GCM_IV_BYTES);
    this.#crypto.getRandomValues(iv);
    let ciphertext: ArrayBuffer;
    try {
      ciphertext = await this.#crypto.subtle.encrypt(
        { name: "AES-GCM", iv, additionalData: new TextEncoder().encode(validated) },
        await this.#device_key(),
        plaintext,
      );
    } finally {
      plaintext.fill(0);
    }
    await (
      await this.#open_database()
    ).put(SECRETS_STORE, {
      reference: validated,
      iv: iv.buffer,
      ciphertext,
      updated_at: this.#now(),
    });
  }

  async delete_secret(reference: string): Promise<void> {
    await (await this.#open_database()).delete(SECRETS_STORE, validate_reference(reference));
  }

  async probe_secret(reference: string): Promise<boolean> {
    const validated = validate_reference(reference);
    const stored = await (await this.#open_database()).get(SECRETS_STORE, validated);
    if (stored === undefined) {
      return false;
    }
    (await this.#decrypt(stored)).fill(0);
    return true;
  }

  async resolve_secret(reference: string): Promise<string> {
    const validated = validate_reference(reference);
    const stored = await (await this.#open_database()).get(SECRETS_STORE, validated);
    if (stored === undefined) {
      throw new BrowserSecretVaultError("not_found", "The device vault holds no such credential");
    }
    const plaintext = await this.#decrypt(stored);
    try {
      return new TextDecoder("utf-8", { fatal: true }).decode(plaintext);
    } finally {
      plaintext.fill(0);
    }
  }

  async close(): Promise<void> {
    const pending = this.#database;
    this.#database = null;
    this.#key = null;
    if (pending !== null) {
      (await pending).close();
    }
  }

  async #decrypt(record: DeviceSecretRecord): Promise<Uint8Array<ArrayBuffer>> {
    try {
      return new Uint8Array(
        await this.#crypto.subtle.decrypt(
          {
            name: "AES-GCM",
            iv: record.iv,
            additionalData: new TextEncoder().encode(record.reference),
          },
          await this.#device_key(),
          record.ciphertext,
        ),
      );
    } catch {
      throw new BrowserSecretVaultError("corrupted", "Device credential authentication failed");
    }
  }

  #device_key(): Promise<CryptoKey> {
    return (this.#key ??= this.#load_or_create_key().catch((error: unknown) => {
      this.#key = null;
      throw error;
    }));
  }

  async #load_or_create_key(): Promise<CryptoKey> {
    const database = await this.#open_database();
    const stored = await database.get(KEYS_STORE, KEY_RECORD_ID);
    if (stored !== undefined) {
      return stored.key;
    }
    const key = await this.#crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, false, [
      "encrypt",
      "decrypt",
    ]);
    try {
      await database.add(KEYS_STORE, { id: KEY_RECORD_ID, key });
      return key;
    } catch {
      // Another tab created the key first; use the stored one so both encrypt alike.
      const winner = await database.get(KEYS_STORE, KEY_RECORD_ID);
      if (winner === undefined) {
        throw new BrowserSecretVaultError("unavailable", "The device key could not be stored");
      }
      return winner.key;
    }
  }

  async #open_database(): Promise<IDBPDatabase<DeviceSecretDatabaseSchema>> {
    const pending = (this.#database ??= openDB<DeviceSecretDatabaseSchema>(this.#database_name, 1, {
      upgrade(database) {
        database.createObjectStore(KEYS_STORE, { keyPath: "id" });
        database.createObjectStore(SECRETS_STORE, { keyPath: "reference" });
      },
    }));
    try {
      return await pending;
    } catch {
      if (this.#database === pending) {
        this.#database = null;
      }
      throw new BrowserSecretVaultError("unavailable", "The device vault could not be opened");
    }
  }
}
