import "fake-indexeddb/auto";

import { deleteDB, openDB } from "idb";
import { afterEach, describe, expect, it } from "vitest";

import {
  DATABASE_NAME,
  DATABASE_VERSION,
  STORE_DEFINITIONS,
  type DBSchema,
  type StoreName,
  upgrade_database,
} from "./database_schema.js";
import { dispose_database, open_database } from "./open_database.js";

const store_names = Object.keys(STORE_DEFINITIONS) as StoreName[];


async function close_test_database(): Promise<void> {
  await dispose_database();
  await deleteDB(DATABASE_NAME);
}

afterEach(async () => {
  await close_test_database();
});

describe("tavern_canvas_v3 schema", () => {
  it("creates exactly the v1 stores and indexes", async () => {
    const database = await open_database();

    expect(database.name).toBe(DATABASE_NAME);
    expect(database.version).toBe(DATABASE_VERSION);
    expect([...database.objectStoreNames].sort()).toEqual([...store_names].sort());

    for (const store_name of store_names) {
      const definition = STORE_DEFINITIONS[store_name];
      const transaction = database.transaction(store_name, "readonly");
      const store = transaction.store;
      expect(store.keyPath).toBe(definition.key_path);
      expect([...store.indexNames].sort()).toEqual([...definition.indexes].sort());
      await transaction.done;
    }
  });

  it("rolls back a v1 upgrade when the upgrade callback throws", async () => {
    const name = "tavern_canvas_v3_atomic_upgrade";

    await expect(
      openDB<DBSchema>(name, DATABASE_VERSION, {
        upgrade(database, old_version, new_version, transaction, event) {
          upgrade_database(database, old_version, new_version, transaction, event);
          void transaction.done.catch(() => undefined);
          throw new Error("intentional upgrade failure");
        },
      }),
    ).rejects.toThrow();

    const database = await openDB<DBSchema>(name);
    expect([...database.objectStoreNames]).toHaveLength(0);
    database.close();
    await deleteDB(name);
  });

  it("memoizes one connection and disposes it idempotently", async () => {
    const first = await open_database();
    const second = await open_database();

    expect(second).toBe(first);
    await first.dispose();
    await first.dispose();

    const reopened = await open_database();
    expect(reopened).not.toBe(first);
    await reopened.dispose();
  });

  it("closes and invalidates the memoized connection on versionchange", async () => {
    const first = await open_database();
    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION + 1);
    const request_complete = new Promise<void>((resolve, reject) => {
      request.onupgradeneeded = () => resolve();
      request.onerror = () => reject(request.error);
      request.onblocked = () => reject(new Error("versionchange remained blocked"));
    });

    await request_complete;
    expect(() => first.transaction("provider_profiles")).toThrow();
    request.result.close();
    await first.dispose();
  });
});
