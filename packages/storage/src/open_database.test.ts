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
  it("creates exactly the current-version stores and indexes", async () => {
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

  it("keeps existing rows on upgrade, adds missing indexes, and empties only stores with a later reset_version", async () => {
    const name = "tavern_canvas_v3_upgrade_keeps_rows";
    const v8 = await openDB(name, 8, {
      upgrade(database) {
        database.createObjectStore("provider_profiles", { keyPath: "record_key" });
        database.createObjectStore("character_profiles", { keyPath: "record_key" });
      },
    });
    await v8.put("provider_profiles", { record_key: "primary:kept", namespace: "primary" });
    await v8.put("character_profiles", { record_key: "primary:old", namespace: "primary" });
    v8.close();

    const upgraded = await openDB<DBSchema>(name, DATABASE_VERSION, {
      upgrade: upgrade_database,
    });

    expect(await upgraded.count("provider_profiles")).toBe(1);
    expect(await upgraded.count("character_profiles")).toBe(0);
    const transaction = upgraded.transaction("provider_profiles", "readonly");
    expect([...transaction.store.indexNames].sort()).toEqual(
      [...STORE_DEFINITIONS.provider_profiles.indexes].sort(),
    );
    await transaction.done;
    upgraded.close();
    await deleteDB(name);
  });

  it("upgrades a v1 database to v2 with the same schema as a fresh v2 install", async () => {
    const upgraded_name = "tavern_canvas_v3_upgrade_v1_to_v2";
    const fresh_name = "tavern_canvas_v3_fresh_v2_install";
    const v1_store_names = store_names.filter(
      (store_name) => STORE_DEFINITIONS[store_name].since_version === 1,
    );

    const v1_database = await openDB(upgraded_name, 1, {
      upgrade(database) {
        for (const store_name of v1_store_names) {
          const definition = STORE_DEFINITIONS[store_name];
          const store = database.createObjectStore(store_name, { keyPath: definition.key_path });
          for (const index_name of definition.indexes) {
            store.createIndex(index_name, index_name);
          }
        }
      },
    });
    v1_database.close();

    const upgraded = await openDB<DBSchema>(upgraded_name, DATABASE_VERSION, {
      upgrade: upgrade_database,
    });
    const fresh = await openDB<DBSchema>(fresh_name, DATABASE_VERSION, {
      upgrade: upgrade_database,
    });

    expect([...upgraded.objectStoreNames].sort()).toEqual([...store_names].sort());
    expect([...upgraded.objectStoreNames].sort()).toEqual([...fresh.objectStoreNames].sort());

    for (const store_name of store_names) {
      const definition = STORE_DEFINITIONS[store_name];
      for (const database of [upgraded, fresh]) {
        const transaction = database.transaction(store_name, "readonly");
        expect(transaction.store.keyPath).toBe(definition.key_path);
        expect([...transaction.store.indexNames].sort()).toEqual([...definition.indexes].sort());
        await transaction.done;
      }
    }

    upgraded.close();
    fresh.close();
    await deleteDB(upgraded_name);
    await deleteDB(fresh_name);
  });

  it("upgrades an installed v2 database, keeping its rows, rebuilding newer stores and dropping removed ones", async () => {
    const name = "tavern_canvas_v3_upgrade_v2_to_v3";
    const v2_store_names = store_names.filter(
      (store_name) => STORE_DEFINITIONS[store_name].since_version <= 2,
    );

    const v2_database = await openDB(name, 2, {
      upgrade(database) {
        for (const store_name of v2_store_names) {
          const definition = STORE_DEFINITIONS[store_name];
          const store = database.createObjectStore(store_name, { keyPath: definition.key_path });
          for (const index_name of definition.indexes) {
            store.createIndex(index_name, index_name);
          }
        }
        for (const removed of [
          "knowledge_entries",
          "vocabularies",
          "vocabulary_groups",
          "legacy_preferences",
        ]) {
          database.createObjectStore(removed, { keyPath: "record_key" });
        }
        database.createObjectStore("migration_journal", { keyPath: "migration_id" });
      },
    });
    const row = {
      schema_version: 1,
      id: "11111111-1111-4111-8111-111111111111",
      namespace: "primary",
      record_key: "primary:11111111-1111-4111-8111-111111111111",
      created_at: "2026-08-05T00:00:00.000Z",
      updated_at: "2026-08-05T00:00:00.000Z",
      payload: { survived: true },
    };
    await v2_database.put("prompt_presets", row);
    await v2_database.put("character_profiles", row);
    v2_database.close();

    const upgraded = await openDB<DBSchema>(name, DATABASE_VERSION, { upgrade: upgrade_database });

    expect(upgraded.version).toBe(DATABASE_VERSION);
    expect([...upgraded.objectStoreNames].sort()).toEqual([...store_names].sort());
    await expect(upgraded.count("novelai_vibe_encodings")).resolves.toBe(0);
    await expect(upgraded.count("provider_input_assets")).resolves.toBe(0);
    expect([...upgraded.transaction("prompt_tag_presets").store.indexNames].sort()).toEqual(
      [...STORE_DEFINITIONS.prompt_tag_presets.indexes].sort(),
    );
    await expect(
      upgraded.get("prompt_presets", "primary:11111111-1111-4111-8111-111111111111"),
    ).resolves.toMatchObject({ payload: { survived: true } });
    await expect(upgraded.count("character_profiles")).resolves.toBe(0);

    upgraded.close();
    await deleteDB(name);
  });

  it("rolls back an upgrade when the upgrade callback throws", async () => {
    const name = "tavern_canvas_v3_atomic_upgrade";

    await expect(
      openDB<DBSchema>(name, DATABASE_VERSION, {
        upgrade(database, old_version, new_version, transaction, event) {
          upgrade_database(database, old_version, new_version, transaction, event);
          void transaction.done.catch(() => undefined);
          throw new Error("intentional upgrade failure");
        },
      }),
    ).rejects.toThrowError(Error);

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
      request.onerror = () =>
        reject(request.error instanceof Error ? request.error : new Error("versionchange failed"));
      request.onblocked = () => reject(new Error("versionchange remained blocked"));
    });

    await request_complete;
    expect(() => first.transaction("provider_profiles")).toThrow();
    request.result.close();
    await first.dispose();
  });
});
