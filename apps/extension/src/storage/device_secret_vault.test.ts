import { webcrypto } from "node:crypto";

import "fake-indexeddb/auto";
import { deleteDB } from "idb";
import { afterEach, describe, expect, it } from "vitest";

import { DeviceSecretVault } from "./device_secret_vault.js";

const crypto = webcrypto as unknown as Crypto;
const REFERENCE = "tavern_canvas:primary:novelai";
const opened: { vault: DeviceSecretVault; name: string }[] = [];

function create_vault(name = `test_device_vault_${crypto.randomUUID()}`): DeviceSecretVault {
  const vault = new DeviceSecretVault({ crypto, database_name: name });
  opened.push({ vault, name });
  return vault;
}

afterEach(async () => {
  const closing = opened.splice(0);
  await Promise.all(closing.map(({ vault }) => vault.close()));
  for (const name of new Set(closing.map((entry) => entry.name))) {
    await deleteDB(name);
  }
});

describe("DeviceSecretVault", () => {
  it("round-trips a credential without a passphrase and survives a reopen", async () => {
    const name = `test_device_vault_${crypto.randomUUID()}`;
    const first = create_vault(name);
    await first.write_secret(REFERENCE, "pst-secret");
    await first.close();

    const second = create_vault(name);
    expect(await second.probe_secret(REFERENCE)).toBe(true);
    expect(await second.resolve_secret(REFERENCE)).toBe("pst-secret");
  });

  it("deletes a credential and reports it missing", async () => {
    const vault = create_vault();
    await vault.write_secret(REFERENCE, "pst-secret");
    await vault.delete_secret(REFERENCE);

    expect(await vault.probe_secret(REFERENCE)).toBe(false);
    await expect(vault.resolve_secret(REFERENCE)).rejects.toMatchObject({ code: "not_found" });
  });

  it("rejects references outside the tavern_canvas vault format", async () => {
    await expect(create_vault().write_secret("api_key_novel", "x")).rejects.toMatchObject({
      code: "invalid_reference",
    });
  });
});
