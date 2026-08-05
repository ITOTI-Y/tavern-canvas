import type { IDBPDatabase, IDBPTransaction } from "idb";

import { type DBSchema, type StoreName } from "./database_schema.js";
import { open_database } from "./open_database.js";

export type StorageTransaction = Omit<
  IDBPTransaction<DBSchema, StoreName[], IDBTransactionMode>,
  "store"
>;
export type StorageWriteTransaction = Omit<
  IDBPTransaction<DBSchema, StoreName[], "readwrite">,
  "store"
>;

export function with_transaction<T>(
  database: IDBPDatabase<DBSchema>,
  store_names: readonly StoreName[],
  callback: (transaction: StorageWriteTransaction) => Promise<T> | T,
): Promise<T>;
export function with_transaction<T>(
  store_names: readonly StoreName[],
  callback: (transaction: StorageWriteTransaction) => Promise<T> | T,
): Promise<T>;
export async function with_transaction<T>(
  database_or_store_names: IDBPDatabase<DBSchema> | readonly StoreName[],
  store_names_or_callback:
    | readonly StoreName[]
    | ((transaction: StorageWriteTransaction) => Promise<T> | T),
  maybe_callback?: (transaction: StorageWriteTransaction) => Promise<T> | T,
): Promise<T> {
  const database = (
    Array.isArray(database_or_store_names) ? await open_database() : database_or_store_names
  ) as IDBPDatabase<DBSchema>;
  let store_names: readonly StoreName[];
  let callback: ((transaction: StorageWriteTransaction) => Promise<T> | T) | undefined;
  if (Array.isArray(database_or_store_names)) {
    store_names = database_or_store_names;
    callback = store_names_or_callback as
      | ((transaction: StorageWriteTransaction) => Promise<T> | T)
      | undefined;
  } else {
    store_names = store_names_or_callback as readonly StoreName[];
    callback = maybe_callback;
  }

  if (!Array.isArray(store_names)) {
    throw new TypeError("with_transaction requires store names");
  }
  if (typeof callback !== "function") {
    throw new TypeError("with_transaction requires a callback");
  }

  const transaction = database.transaction(store_names, "readwrite");
  try {
    const result = await callback(transaction as StorageWriteTransaction);
    await transaction.done;
    return result;
  } catch (error) {
    try {
      transaction.abort();
    } catch {
      // The transaction may already be inactive; its completion promise remains authoritative.
    }
    try {
      await transaction.done;
    } catch {
      // Preserve the callback failure instead of replacing it with the abort failure.
    }
    throw error;
  }
}
