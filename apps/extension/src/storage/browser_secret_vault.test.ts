import { webcrypto } from "node:crypto";

import "fake-indexeddb/auto";
import { deleteDB, openDB, type DBSchema } from "idb";
import { afterEach, describe, expect, it } from "vitest";

import { EncryptedBrowserSecretVault } from "./_encrypted_browser_secret_vault.js";
import {
  BROWSER_SECRET_DATABASE_NAME,
  BrowserSecretVaultError,
  create_browser_secret_vault,
} from "./browser_secret_vault.js";

interface TestVaultDatabase extends DBSchema {
  metadata: {
    key: string;
    value: unknown;
  };
  secrets: {
    key: string;
    value: {
      readonly reference: string;
      readonly schema_version: 1;
      readonly iv: ArrayBuffer;
      readonly ciphertext: ArrayBuffer;
      readonly updated_at: string;
    };
  };
}
const vaults = new Set<EncryptedBrowserSecretVault>();

const crypto = webcrypto as unknown as Crypto;
const database_names = new Set<string>();

function create_vault(): {
  readonly database_name: string;
  readonly vault: EncryptedBrowserSecretVault;
} {
  const database_name = `test_browser_secret_vault_${crypto.randomUUID()}`;
  database_names.add(database_name);
  const vault = new EncryptedBrowserSecretVault({
    crypto,
    database_name,
    now: () => "2026-08-16T00:00:00.000Z",
  });
  vaults.add(vault);
  return { database_name, vault };
}

afterEach(async () => {
  await Promise.allSettled([...vaults].map((vault) => vault.close()));
  vaults.clear();
  for (const database_name of database_names) {
    await deleteDB(database_name);
  }
  database_names.clear();
});

describe("EncryptedBrowserSecretVault", () => {
  it("persists only authenticated ciphertext and requires the passphrase after reopening", async () => {
    const { database_name, vault } = create_vault();
    const reference = "tavern_canvas:default:profile-1:novelai_token";
    const plaintext = "credential-canary-that-must-not-appear-in-indexeddb";

    await expect(vault.status()).resolves.toEqual({ state: "uninitialized", secret_count: 0 });
    await expect(vault.initialize("correct horse battery staple")).resolves.toEqual({
      state: "unlocked",
      secret_count: 0,
    });
    await vault.write_secret(reference, plaintext);
    await expect(vault.resolve_secret(reference)).resolves.toBe(plaintext);

    const database = await openDB<TestVaultDatabase>(database_name);
    const stored = await database.get("secrets", reference);
    expect(stored).toBeDefined();
    if (stored === undefined) {
      throw new Error("Expected the encrypted credential record");
    }
    expect(new TextDecoder().decode(stored.ciphertext)).not.toContain(plaintext);
    expect(stored.ciphertext.byteLength).toBeGreaterThan(plaintext.length);

    await vault.write_secret(reference, plaintext);
    const overwritten = await database.get("secrets", reference);
    expect(overwritten).toBeDefined();
    if (overwritten === undefined) {
      throw new Error("Expected the overwritten encrypted credential record");
    }
    expect([...new Uint8Array(overwritten.iv)]).not.toEqual([...new Uint8Array(stored.iv)]);
    expect([...new Uint8Array(overwritten.ciphertext)]).not.toEqual([
      ...new Uint8Array(stored.ciphertext),
    ]);
    database.close();

    await vault.close();
    const reopened = new EncryptedBrowserSecretVault({ crypto, database_name });
    vaults.add(reopened);
    await expect(reopened.status()).resolves.toEqual({ state: "locked", secret_count: 1 });
    await expect(reopened.resolve_secret(reference)).rejects.toMatchObject({ code: "locked" });
    await expect(reopened.unlock("this passphrase is wrong")).rejects.toMatchObject({
      code: "invalid_passphrase",
    });
    await expect(reopened.status()).resolves.toEqual({ state: "locked", secret_count: 1 });

    await reopened.unlock("correct horse battery staple");
    await expect(reopened.probe_secret(reference)).resolves.toBe(true);
    await expect(reopened.resolve_secret(reference)).resolves.toBe(plaintext);
    await reopened.close();
  });

  it("rejects tampered ciphertext and deletes encrypted credentials from the selected vault", async () => {
    const { database_name, vault } = create_vault();
    const first_reference = "tavern_canvas:default:profile-1:novelai_token";
    const second_reference = "tavern_canvas:default:profile-2:sd_webui_auth";

    await vault.initialize("correct horse battery staple");
    await vault.write_secret(first_reference, "first-secret-value");
    await vault.write_secret(second_reference, "second-secret-value");
    await expect(vault.status()).resolves.toEqual({ state: "unlocked", secret_count: 2 });

    await vault.delete_secret(first_reference);
    await expect(vault.probe_secret(first_reference)).resolves.toBe(false);
    await expect(vault.status()).resolves.toEqual({ state: "unlocked", secret_count: 1 });

    const database = await openDB<TestVaultDatabase>(database_name);
    const stored = await database.get("secrets", second_reference);
    expect(stored).toBeDefined();
    if (stored === undefined) {
      throw new Error("Expected the encrypted credential record");
    }
    const tampered = new Uint8Array(stored.ciphertext.slice(0));
    tampered[0] = (tampered[0] ?? 0) ^ 1;
    await database.put("secrets", { ...stored, ciphertext: tampered.buffer });
    database.close();

    await expect(vault.resolve_secret(second_reference)).rejects.toMatchObject({
      code: "corrupted",
    });
    await expect(vault.reset()).resolves.toEqual({ state: "uninitialized", secret_count: 0 });
    await vault.close();
  });

  it("rejects invalid references, blank credentials, and operations while locked", async () => {
    const { vault } = create_vault();

    await expect(vault.initialize("too short")).rejects.toBeInstanceOf(BrowserSecretVaultError);
    await vault.initialize("correct horse battery staple");
    await expect(vault.write_secret("invalid-reference", "secret")).rejects.toMatchObject({
      code: "invalid_reference",
    });
    await expect(
      vault.write_secret("tavern_canvas:default:profile-1:novelai_token", ""),
    ).rejects.toMatchObject({ code: "invalid_secret" });
    await vault.lock();
    await expect(
      vault.delete_secret("tavern_canvas:default:profile-1:novelai_token"),
    ).rejects.toMatchObject({ code: "locked" });
    await vault.close();
  });
});

describe("create_browser_secret_vault", () => {
  it("requires browser primitives and lazy-loads the encrypted implementation", async () => {
    database_names.add(BROWSER_SECRET_DATABASE_NAME);
    const vault = create_browser_secret_vault({ indexedDB, crypto });
    if (vault === null) {
      throw new Error("Expected browser secret vault support");
    }
    await expect(vault.status()).resolves.toEqual({ state: "uninitialized", secret_count: 0 });
    await vault.close();

    expect(create_browser_secret_vault({ indexedDB, crypto: {} })).toBeNull();
    expect(create_browser_secret_vault({ crypto })).toBeNull();
  });
});
