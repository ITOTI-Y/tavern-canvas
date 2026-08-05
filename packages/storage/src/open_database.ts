import { openDB } from "idb";
import type { IDBPDatabase } from "idb";

import {
  DATABASE_NAME,
  DATABASE_VERSION,
  type DBSchema,
  upgrade_database,
} from "./database_schema.js";

export type StorageDatabase = IDBPDatabase<DBSchema> & {
  connection: IDBPDatabase<DBSchema>;
  dispose: () => Promise<void>;
};

let current_database: StorageDatabase | null = null;
let opening_database: Promise<StorageDatabase> | null = null;

function attach_lifecycle(database: IDBPDatabase<DBSchema>): StorageDatabase {
  let disposed = false;

  const invalidate = (): void => {
    if (disposed) {
      return;
    }
    disposed = true;
    database.close();
    if (current_database === storage_database) {
      current_database = null;
    }
  };

  const dispose = async (): Promise<void> => {
    invalidate();
  };

  const storage_database = database as StorageDatabase;
  Object.defineProperty(storage_database, "connection", {
    configurable: false,
    enumerable: false,
    value: storage_database,
    writable: false,
  });
  Object.defineProperty(storage_database, "dispose", {
    configurable: true,
    enumerable: false,
    value: dispose,
    writable: false,
  });
  database.addEventListener("versionchange", invalidate);
  return storage_database;
}

export function open_database(): Promise<StorageDatabase> {
  if (current_database !== null) {
    return Promise.resolve(current_database);
  }
  if (opening_database !== null) {
    return opening_database;
  }

  opening_database = openDB<DBSchema>(DATABASE_NAME, DATABASE_VERSION, {
    upgrade: upgrade_database,
  })
    .then((database) => {
      const storage_database = attach_lifecycle(database);
      current_database = storage_database;
      return storage_database;
    })
    .finally(() => {
      opening_database = null;
    });

  return opening_database;
}

export async function dispose_database(): Promise<void> {
  const database = current_database;
  current_database = null;
  if (database !== null) {
    await database.dispose();
  }
}
