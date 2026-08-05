import type { IDBPDatabase, IDBPObjectStore, IDBPTransaction } from "idb";
import { z } from "zod";

import {
  assert_safe_provider_payload,
  type DBSchema,
  type NamespacedRecord,
  type NamespacedStoreName,
  type StoreName,
  NamespaceSchema,
  parse_json_value,
  RECORD_SCHEMAS,
  UuidSchema,
  validate_record_key,
} from "./database_schema.js";
import { type StorageTransaction, type StorageWriteTransaction } from "./transaction.js";

export interface Repository<TRecord> {
  get(namespace: string, id: string, transaction?: StorageTransaction): Promise<TRecord | null>;
  list(namespace: string, transaction?: StorageTransaction): Promise<TRecord[]>;
  create(namespace: string, record: TRecord, transaction?: StorageTransaction): Promise<void>;
  update(namespace: string, record: TRecord, transaction?: StorageTransaction): Promise<void>;
  put(namespace: string, record: TRecord, transaction?: StorageTransaction): Promise<void>;
  delete(namespace: string, id: string, transaction?: StorageTransaction): Promise<void>;
}

export class RepositoryValidationError extends Error {
  readonly issues: readonly z.core.$ZodIssue[];

  constructor(message: string, issues: readonly z.core.$ZodIssue[] = []) {
    super(message);
    this.name = "RepositoryValidationError";
    this.issues = issues;
  }
}

export class RepositoryDuplicateError extends Error {
  constructor(store_name: string, record_key: string) {
    super(`A record already exists in ${store_name}: ${record_key}`);
    this.name = "RepositoryDuplicateError";
  }
}

export class RepositoryNotFoundError extends Error {
  constructor(store_name: string, record_key: string) {
    super(`No record exists in ${store_name}: ${record_key}`);
    this.name = "RepositoryNotFoundError";
  }
}

export type RepositoryInput<TRecord extends NamespacedRecord> = Omit<
  TRecord,
  "namespace" | "record_key"
> &
  Partial<Pick<TRecord, "namespace" | "record_key">>;

type NamespacedSchema = z.ZodType<NamespacedRecord>;

function clone_boundary<T>(value: T): T {
  try {
    return globalThis.structuredClone(value);
  } catch (error) {
    throw new RepositoryValidationError(
      `Value cannot cross the structured-clone boundary: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }
}

function is_constraint_error(error: unknown): boolean {
  return error instanceof Error && error.name === "ConstraintError";
}

function assert_write_transaction(transaction: StorageTransaction): void {
  if (transaction.mode === "readonly") {
    throw new TypeError("A readwrite transaction is required for this repository method");
  }
}

export class IndexedDbRepository<
    TStoreName extends NamespacedStoreName,
    TRecord extends NamespacedRecord,
  >
  implements Repository<TRecord>
{
  private readonly schema: NamespacedSchema;
  private readonly rejects_provider_secrets: boolean;

  constructor(
    private readonly database: IDBPDatabase<DBSchema>,
    private readonly store_name: TStoreName,
    schema: NamespacedSchema = RECORD_SCHEMAS[store_name],
    rejects_provider_secrets = false,
  ) {
    this.schema = schema;
    this.rejects_provider_secrets = rejects_provider_secrets;
  }

  async get(
    namespace: string,
    id: string,
    transaction?: StorageTransaction,
  ): Promise<TRecord | null> {
    const record_key = this.record_key(namespace, id);
    return this.run_read(transaction, async (active_transaction) => {
      const raw = await this.store(active_transaction).get(record_key);
      if (raw === undefined) {
        return null;
      }
      return this.validate_loaded(raw);
    });
  }

  async list(namespace: string, transaction?: StorageTransaction): Promise<TRecord[]> {
    const valid_namespace = NamespaceSchema.parse(namespace);
    return this.run_read(transaction, async (active_transaction) => {
      const index = this.store(active_transaction).index("namespace" as never) as unknown as {
        getAll(query?: IDBValidKey | IDBKeyRange): Promise<unknown[]>;
      };
      const raw_records = await index.getAll(valid_namespace);
      const records = raw_records.map((raw) => this.validate_loaded(raw));
      records.sort((left, right) => (left.id < right.id ? -1 : left.id > right.id ? 1 : 0));
      return records;
    });
  }

  async create(
    namespace: string,
    record: TRecord,
    transaction?: StorageTransaction,
  ): Promise<void> {
    const valid_record = this.prepare_record(namespace, record);
    await this.run_write(transaction, async (active_transaction) => {
      try {
        await this.store(active_transaction).add(valid_record);
      } catch (error) {
        if (is_constraint_error(error)) {
          throw new RepositoryDuplicateError(this.store_name, valid_record.record_key);
        }
        throw error;
      }
    });
  }

  async update(
    namespace: string,
    record: TRecord,
    transaction?: StorageTransaction,
  ): Promise<void> {
    const valid_record = this.prepare_record(namespace, record);
    await this.run_write(transaction, async (active_transaction) => {
      const store = this.store(active_transaction);
      const existing = await store.get(valid_record.record_key);
      if (existing === undefined) {
        throw new RepositoryNotFoundError(this.store_name, valid_record.record_key);
      }
      this.validate_loaded(existing);
      await store.put(valid_record);
    });
  }

  async put(
    namespace: string,
    record: TRecord,
    transaction?: StorageTransaction,
  ): Promise<void> {
    const valid_record = this.prepare_record(namespace, record);
    await this.run_write(transaction, async (active_transaction) => {
      await this.store(active_transaction).put(valid_record);
    });
  }

  async delete(
    namespace: string,
    id: string,
    transaction?: StorageTransaction,
  ): Promise<void> {
    const record_key = this.record_key(namespace, id);
    await this.run_write(transaction, async (active_transaction) => {
      await this.store(active_transaction).delete(record_key);
    });
  }
  private store(
    transaction: StorageTransaction | StorageWriteTransaction,
  ): IDBPObjectStore<DBSchema, ArrayLike<StoreName>, TStoreName, "readwrite"> {
    return (
      transaction as unknown as IDBPTransaction<
        DBSchema,
        StoreName[],
        "readwrite"
      >
    ).objectStore(this.store_name);
  }
  private record_key(namespace: string, id: string): string {
    const valid_namespace = NamespaceSchema.parse(namespace);
    const valid_id = UuidSchema.parse(id);
    return `${valid_namespace}:${valid_id}`;
  }

  private prepare_record(namespace: string, record: TRecord): TRecord {
    const valid_namespace = NamespaceSchema.parse(namespace);
    const candidate = clone_boundary(record) as unknown as Record<string, unknown>;
    if (candidate.namespace !== undefined && candidate.namespace !== valid_namespace) {
      throw new RepositoryValidationError("Record namespace does not match the method namespace");
    }
    if (typeof candidate.id !== "string") {
      throw new RepositoryValidationError("Record id must be a UUID");
    }
    const valid_id = UuidSchema.safeParse(candidate.id);
    if (!valid_id.success) {
      throw new RepositoryValidationError("Record id must be a UUID", valid_id.error.issues);
    }
    const record_key = `${valid_namespace}:${valid_id.data}`;
    if (candidate.record_key !== undefined && candidate.record_key !== record_key) {
      throw new RepositoryValidationError("Record key does not match namespace and id");
    }
    candidate.namespace = valid_namespace;
    candidate.record_key = record_key;
    if (Object.hasOwn(candidate, "payload") && candidate.payload === undefined) {
      throw new RepositoryValidationError("Payload must be serializable JSON");
    }
    if (candidate.payload !== undefined) {
      try {
        candidate.payload = parse_json_value(candidate.payload);
      } catch (error) {
        throw new RepositoryValidationError(
          error instanceof Error ? error.message : "Payload must be serializable JSON",
        );
      }
      if (this.rejects_provider_secrets) {
        try {
          assert_safe_provider_payload(candidate.payload);
        } catch (error) {
          throw new RepositoryValidationError(
            error instanceof Error ? error.message : "Provider payload contains a secret",
          );
        }
      }
    }
    const parsed = this.schema.safeParse(candidate);
    if (!parsed.success) {
      throw new RepositoryValidationError("Record failed schema validation", parsed.error.issues);
    }
    validate_record_key(parsed.data.namespace, parsed.data.id, parsed.data.record_key);
    return clone_boundary(parsed.data) as TRecord;
  }

  private validate_loaded(raw: unknown): TRecord {
    const candidate = clone_boundary(raw);
    if (
      typeof candidate === "object" &&
      candidate !== null &&
      Object.hasOwn(candidate, "payload") &&
      (candidate as { payload?: unknown }).payload === undefined
    ) {
      throw new RepositoryValidationError("Stored payload must be serializable JSON");
    }
    if (
      typeof candidate === "object" &&
      candidate !== null &&
      "payload" in candidate &&
      candidate.payload !== undefined
    ) {
      try {
        parse_json_value(candidate.payload);
      } catch (error) {
        throw new RepositoryValidationError(
          error instanceof Error ? error.message : "Stored payload must be serializable JSON",
        );
      }
    }
    const parsed = this.schema.safeParse(candidate);
    if (!parsed.success) {
      throw new RepositoryValidationError("Stored record failed schema validation", parsed.error.issues);
    }
    try {
      validate_record_key(parsed.data.namespace, parsed.data.id, parsed.data.record_key);
      if (this.rejects_provider_secrets && parsed.data.payload !== undefined) {
        assert_safe_provider_payload(parsed.data.payload);
      }
    } catch (error) {
      throw new RepositoryValidationError(
        error instanceof Error ? error.message : "Stored record failed derived-key validation",
      );
    }
    return clone_boundary(parsed.data) as TRecord;
  }


  private async run_read<T>(
    transaction: StorageTransaction | undefined,
    callback: (active_transaction: StorageTransaction) => Promise<T>,
  ): Promise<T> {
    if (transaction !== undefined) {
      return callback(transaction);
    }
    const created_transaction = this.database.transaction(this.store_name, "readonly");
    try {
      const result = await callback(created_transaction as StorageTransaction);
      await created_transaction.done;
      return result;
    } catch (error) {
      try {
        await created_transaction.done;
      } catch {
        // Preserve the validation or request error.
      }
      throw error;
    }
  }

  private async run_write<T>(
    transaction: StorageTransaction | undefined,
    callback: (active_transaction: StorageWriteTransaction) => Promise<T>,
  ): Promise<T> {
    if (transaction !== undefined) {
      assert_write_transaction(transaction);
      return callback(transaction as StorageWriteTransaction);
    }
    const created_transaction = this.database.transaction(this.store_name, "readwrite");
    try {
      const result = await callback(created_transaction as StorageWriteTransaction);
      await created_transaction.done;
      return result;
    } catch (error) {
      try {
        created_transaction.abort();
      } catch {
        // The transaction may already be inactive; its completion promise remains authoritative.
      }
      try {
        await created_transaction.done;
      } catch {
        // Preserve the original repository error.
      }
      throw error;
    }
  }
}
