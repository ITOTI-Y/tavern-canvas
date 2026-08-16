import { VaultReferenceSchema } from "@tavern-canvas/contracts";
import { deleteDB, openDB, type DBSchema, type IDBPDatabase } from "idb";

import {
  BROWSER_SECRET_DATABASE_NAME,
  BROWSER_SECRET_DATABASE_VERSION,
  BROWSER_SECRET_MINIMUM_PASSPHRASE_LENGTH,
  BrowserSecretVaultError,
  type BrowserSecretVaultPort,
  type BrowserSecretVaultStatus,
  type EncryptedBrowserSecretVaultOptions,
} from "./browser_secret_vault.js";

const METADATA_KEY = "vault" as const;
const METADATA_STORE = "metadata" as const;
const SECRETS_STORE = "secrets" as const;
const PBKDF2_ITERATIONS = 600_000;
const KDF_SALT_BYTES = 16;
const AES_GCM_IV_BYTES = 12;
const AES_GCM_TAG_BYTES = 16;
const MAX_PASSPHRASE_BYTES = 1_024;
const MAX_SECRET_BYTES = 16_384;
const VERIFIER_TEXT = "tavern-canvas-browser-secret-vault:v1";
const VERIFIER_AAD = "tavern-canvas-browser-secret-vault:metadata:v1";

interface BrowserSecretMetadataRecord {
  readonly id: typeof METADATA_KEY;
  readonly schema_version: 1;
  readonly kdf: "PBKDF2-SHA-256";
  readonly iterations: number;
  readonly salt: ArrayBuffer;
  readonly verifier_iv: ArrayBuffer;
  readonly verifier_ciphertext: ArrayBuffer;
}

interface BrowserSecretRecord {
  readonly reference: string;
  readonly schema_version: 1;
  readonly iv: ArrayBuffer;
  readonly ciphertext: ArrayBuffer;
  readonly updated_at: string;
}

interface BrowserSecretDatabaseSchema extends DBSchema {
  metadata: {
    key: string;
    value: BrowserSecretMetadataRecord;
  };
  secrets: {
    key: string;
    value: BrowserSecretRecord;
  };
}

function is_record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function copy_buffer(bytes: Uint8Array<ArrayBuffer>): ArrayBuffer {
  return bytes.slice().buffer;
}

function require_buffer(value: unknown, byte_length: number, field_name: string): ArrayBuffer {
  if (!(value instanceof ArrayBuffer) || value.byteLength !== byte_length) {
    throw new BrowserSecretVaultError("corrupted", `Encrypted vault ${field_name} is invalid`);
  }
  return value;
}

function parse_metadata(value: unknown): BrowserSecretMetadataRecord {
  if (
    !is_record(value) ||
    value.id !== METADATA_KEY ||
    value.schema_version !== 1 ||
    value.kdf !== "PBKDF2-SHA-256" ||
    value.iterations !== PBKDF2_ITERATIONS
  ) {
    throw new BrowserSecretVaultError("corrupted", "Encrypted vault metadata is invalid");
  }
  return {
    id: METADATA_KEY,
    schema_version: 1,
    kdf: "PBKDF2-SHA-256",
    iterations: PBKDF2_ITERATIONS,
    salt: require_buffer(value.salt, KDF_SALT_BYTES, "salt"),
    verifier_iv: require_buffer(value.verifier_iv, AES_GCM_IV_BYTES, "verifier IV"),
    verifier_ciphertext: require_buffer(
      value.verifier_ciphertext,
      new TextEncoder().encode(VERIFIER_TEXT).byteLength + AES_GCM_TAG_BYTES,
      "verifier",
    ),
  };
}

function parse_secret_record(value: unknown, reference: string): BrowserSecretRecord {
  if (
    !is_record(value) ||
    value.reference !== reference ||
    value.schema_version !== 1 ||
    typeof value.updated_at !== "string" ||
    !(value.ciphertext instanceof ArrayBuffer) ||
    value.ciphertext.byteLength < AES_GCM_TAG_BYTES ||
    value.ciphertext.byteLength > MAX_SECRET_BYTES + AES_GCM_TAG_BYTES
  ) {
    throw new BrowserSecretVaultError("corrupted", "Encrypted credential record is invalid");
  }
  return {
    reference,
    schema_version: 1,
    iv: require_buffer(value.iv, AES_GCM_IV_BYTES, "credential IV"),
    ciphertext: value.ciphertext,
    updated_at: value.updated_at,
  };
}

function validate_passphrase(passphrase: string): Uint8Array<ArrayBuffer> {
  const encoded = new TextEncoder().encode(passphrase);
  if (
    passphrase.length < BROWSER_SECRET_MINIMUM_PASSPHRASE_LENGTH ||
    encoded.byteLength > MAX_PASSPHRASE_BYTES
  ) {
    encoded.fill(0);
    throw new BrowserSecretVaultError(
      "invalid_passphrase",
      `Vault passphrase must contain at least ${String(BROWSER_SECRET_MINIMUM_PASSPHRASE_LENGTH)} characters`,
    );
  }
  return encoded;
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

export class EncryptedBrowserSecretVault implements BrowserSecretVaultPort {
  readonly #crypto: Crypto;
  readonly #database_name: string;
  readonly #now: () => string;
  #database: Promise<IDBPDatabase<BrowserSecretDatabaseSchema>> | null = null;
  #key: CryptoKey | null = null;

  constructor(options: EncryptedBrowserSecretVaultOptions) {
    this.#crypto = options.crypto;
    this.#database_name = options.database_name ?? BROWSER_SECRET_DATABASE_NAME;
    this.#now = options.now ?? (() => new Date().toISOString());
  }

  supports(): boolean {
    return true;
  }

  async status(): Promise<BrowserSecretVaultStatus> {
    const database = await this.#open_database();
    const metadata = await database.get(METADATA_STORE, METADATA_KEY);
    const secret_count = await database.count(SECRETS_STORE);
    if (metadata === undefined) {
      if (secret_count > 0) {
        throw new BrowserSecretVaultError(
          "corrupted",
          "Encrypted credentials exist without vault metadata",
        );
      }
      this.#key = null;
      return { state: "uninitialized", secret_count: 0 };
    }
    parse_metadata(metadata);
    return { state: this.#key === null ? "locked" : "unlocked", secret_count };
  }

  async initialize(passphrase: string): Promise<BrowserSecretVaultStatus> {
    const database = await this.#open_database();
    if ((await database.get(METADATA_STORE, METADATA_KEY)) !== undefined) {
      throw new BrowserSecretVaultError(
        "already_initialized",
        "Encrypted browser vault is already initialized",
      );
    }
    if ((await database.count(SECRETS_STORE)) > 0) {
      throw new BrowserSecretVaultError(
        "corrupted",
        "Encrypted credentials exist without vault metadata",
      );
    }

    const passphrase_bytes = validate_passphrase(passphrase);
    const salt = this.#random_bytes(KDF_SALT_BYTES);
    const verifier_iv = this.#random_bytes(AES_GCM_IV_BYTES);
    let key: CryptoKey;
    try {
      key = await this.#derive_key(passphrase_bytes, salt);
    } finally {
      passphrase_bytes.fill(0);
    }
    const verifier_bytes = new TextEncoder().encode(VERIFIER_TEXT);
    const verifier_aad = new TextEncoder().encode(VERIFIER_AAD);
    let verifier_ciphertext: ArrayBuffer;
    try {
      verifier_ciphertext = await this.#crypto.subtle.encrypt(
        {
          name: "AES-GCM",
          iv: verifier_iv,
          additionalData: verifier_aad,
          tagLength: 128,
        },
        key,
        verifier_bytes,
      );
    } finally {
      verifier_bytes.fill(0);
    }

    const metadata: BrowserSecretMetadataRecord = {
      id: METADATA_KEY,
      schema_version: 1,
      kdf: "PBKDF2-SHA-256",
      iterations: PBKDF2_ITERATIONS,
      salt: copy_buffer(salt),
      verifier_iv: copy_buffer(verifier_iv),
      verifier_ciphertext,
    };
    try {
      await database.add(METADATA_STORE, metadata);
    } catch {
      throw new BrowserSecretVaultError(
        "already_initialized",
        "Encrypted browser vault is already initialized",
      );
    }
    this.#key = key;
    return this.status();
  }

  async unlock(passphrase: string): Promise<BrowserSecretVaultStatus> {
    const database = await this.#open_database();
    const stored_metadata = await database.get(METADATA_STORE, METADATA_KEY);
    if (stored_metadata === undefined) {
      throw new BrowserSecretVaultError(
        "unavailable",
        "Encrypted browser vault has not been initialized",
      );
    }
    const metadata = parse_metadata(stored_metadata);
    const passphrase_bytes = validate_passphrase(passphrase);
    let key: CryptoKey;
    try {
      key = await this.#derive_key(passphrase_bytes, new Uint8Array(metadata.salt));
    } finally {
      passphrase_bytes.fill(0);
    }

    let verifier: Uint8Array;
    try {
      verifier = new Uint8Array(
        await this.#crypto.subtle.decrypt(
          {
            name: "AES-GCM",
            iv: metadata.verifier_iv,
            additionalData: new TextEncoder().encode(VERIFIER_AAD),
            tagLength: 128,
          },
          key,
          metadata.verifier_ciphertext,
        ),
      );
    } catch {
      throw new BrowserSecretVaultError("invalid_passphrase", "Vault passphrase is incorrect");
    }
    const expected = new TextEncoder().encode(VERIFIER_TEXT);
    let matches = verifier.byteLength === expected.byteLength;
    for (let index = 0; index < expected.byteLength; index += 1) {
      matches = matches && verifier[index] === expected[index];
    }
    verifier.fill(0);
    expected.fill(0);
    if (!matches) {
      throw new BrowserSecretVaultError("invalid_passphrase", "Vault passphrase is incorrect");
    }
    this.#key = key;
    return this.status();
  }

  async lock(): Promise<BrowserSecretVaultStatus> {
    this.#key = null;
    return this.status();
  }

  async reset(): Promise<BrowserSecretVaultStatus> {
    await this.close();
    try {
      await deleteDB(this.#database_name);
    } catch {
      throw new BrowserSecretVaultError(
        "unavailable",
        "Encrypted browser vault could not be reset",
      );
    }
    return this.status();
  }

  async close(): Promise<void> {
    this.#key = null;
    const pending_database = this.#database;
    this.#database = null;
    if (pending_database !== null) {
      (await pending_database).close();
    }
  }

  async write_secret(reference: string, plaintext_value: string): Promise<void> {
    const validated_reference = validate_reference(reference);
    const key = this.#require_key();
    const plaintext = new TextEncoder().encode(plaintext_value);
    if (plaintext.byteLength === 0 || plaintext.byteLength > MAX_SECRET_BYTES) {
      plaintext.fill(0);
      throw new BrowserSecretVaultError(
        "invalid_secret",
        "Credential value is empty or exceeds the encrypted vault limit",
      );
    }
    const iv = this.#random_bytes(AES_GCM_IV_BYTES);
    let ciphertext: ArrayBuffer;
    try {
      ciphertext = await this.#crypto.subtle.encrypt(
        {
          name: "AES-GCM",
          iv,
          additionalData: new TextEncoder().encode(validated_reference),
          tagLength: 128,
        },
        key,
        plaintext,
      );
    } finally {
      plaintext.fill(0);
    }
    await (
      await this.#open_database()
    ).put(SECRETS_STORE, {
      reference: validated_reference,
      schema_version: 1,
      iv: copy_buffer(iv),
      ciphertext,
      updated_at: this.#now(),
    });
  }
  async delete_secret(reference: string): Promise<void> {
    const validated_reference = validate_reference(reference);
    this.#require_key();
    await (await this.#open_database()).delete(SECRETS_STORE, validated_reference);
  }

  async probe_secret(reference: string): Promise<boolean> {
    const validated_reference = validate_reference(reference);
    const key = this.#require_key();
    const stored = await (await this.#open_database()).get(SECRETS_STORE, validated_reference);
    if (stored === undefined) {
      return false;
    }
    const plaintext = await this.#decrypt_record(
      parse_secret_record(stored, validated_reference),
      key,
    );
    plaintext.fill(0);
    return true;
  }

  async resolve_secret(reference: string): Promise<string> {
    const validated_reference = validate_reference(reference);
    const key = this.#require_key();
    const stored = await (await this.#open_database()).get(SECRETS_STORE, validated_reference);
    if (stored === undefined) {
      throw new BrowserSecretVaultError("not_found", "Encrypted vault holds no such credential");
    }
    const plaintext = await this.#decrypt_record(
      parse_secret_record(stored, validated_reference),
      key,
    );
    try {
      return new TextDecoder("utf-8", { fatal: true }).decode(plaintext);
    } catch {
      throw new BrowserSecretVaultError("corrupted", "Encrypted credential is not valid UTF-8");
    } finally {
      plaintext.fill(0);
    }
  }

  async #open_database(): Promise<IDBPDatabase<BrowserSecretDatabaseSchema>> {
    const pending =
      this.#database ??
      openDB<BrowserSecretDatabaseSchema>(this.#database_name, BROWSER_SECRET_DATABASE_VERSION, {
        upgrade(database, old_version) {
          if (old_version < 1) {
            database.createObjectStore(METADATA_STORE, { keyPath: "id" });
            database.createObjectStore(SECRETS_STORE, { keyPath: "reference" });
          }
        },
      });
    this.#database = pending;
    try {
      return await pending;
    } catch {
      if (this.#database === pending) {
        this.#database = null;
      }
      throw new BrowserSecretVaultError(
        "unavailable",
        "Encrypted browser vault could not be opened",
      );
    }
  }

  #random_bytes(length: number): Uint8Array<ArrayBuffer> {
    const bytes = new Uint8Array(length);
    this.#crypto.getRandomValues(bytes);
    return bytes;
  }

  async #derive_key(
    passphrase: Uint8Array<ArrayBuffer>,
    salt: Uint8Array<ArrayBuffer>,
  ): Promise<CryptoKey> {
    const material = await this.#crypto.subtle.importKey("raw", passphrase, "PBKDF2", false, [
      "deriveKey",
    ]);
    return this.#crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        hash: "SHA-256",
        salt,
        iterations: PBKDF2_ITERATIONS,
      },
      material,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"],
    );
  }

  #require_key(): CryptoKey {
    if (this.#key === null) {
      throw new BrowserSecretVaultError(
        "locked",
        "Unlock the encrypted browser vault before using credentials",
      );
    }
    return this.#key;
  }

  async #decrypt_record(
    record: BrowserSecretRecord,
    key: CryptoKey,
  ): Promise<Uint8Array<ArrayBuffer>> {
    try {
      return new Uint8Array(
        await this.#crypto.subtle.decrypt(
          {
            name: "AES-GCM",
            iv: record.iv,
            additionalData: new TextEncoder().encode(record.reference),
            tagLength: 128,
          },
          key,
          record.ciphertext,
        ),
      );
    } catch {
      throw new BrowserSecretVaultError("corrupted", "Encrypted credential authentication failed");
    }
  }
}
