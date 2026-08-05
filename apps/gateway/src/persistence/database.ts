import { mkdirSync } from "node:fs";
import path from "node:path";

import Database from "better-sqlite3";

import { INITIAL_MIGRATION } from "./migrations/001_initial.js";

const DEFAULT_BUSY_TIMEOUT_MS = 5_000;
const MAX_BUSY_TIMEOUT_MS = 2_147_483_647;

export interface GatewayMigration {
  readonly version: number;
  apply(connection: Database.Database): void;
}

export interface OpenGatewayDatabaseOptions {
  readonly file_path: string;
  readonly busy_timeout_ms?: number;
}

export class GatewayDatabase {
  readonly connection: Database.Database;
  #closed = false;

  constructor(connection: Database.Database) {
    this.connection = connection;
  }

  close(): void {
    if (this.#closed) {
      return;
    }
    this.connection.close();
    this.#closed = true;
  }
}

export class GatewaySchemaVersionError extends Error {
  constructor(version: number) {
    super(`Unsupported Gateway schema version: ${String(version)}`);
    this.name = "GatewaySchemaVersionError";
  }
}

export function open_gateway_database(options: OpenGatewayDatabaseOptions): GatewayDatabase {
  const busy_timeout_ms = options.busy_timeout_ms ?? DEFAULT_BUSY_TIMEOUT_MS;
  if (
    options.file_path.length === 0 ||
    !Number.isInteger(busy_timeout_ms) ||
    busy_timeout_ms <= 0 ||
    busy_timeout_ms > MAX_BUSY_TIMEOUT_MS
  ) {
    throw new TypeError("Gateway database options are invalid");
  }

  mkdirSync(path.dirname(options.file_path), { recursive: true });
  const connection = new Database(options.file_path, {
    timeout: busy_timeout_ms,
  });
  try {
    connection.pragma("journal_mode = WAL");
    connection.pragma("foreign_keys = ON");
    connection.pragma(`busy_timeout = ${String(busy_timeout_ms)}`);
    apply_migrations(connection, [INITIAL_MIGRATION]);
    return new GatewayDatabase(connection);
  } catch (error) {
    connection.close();
    throw error;
  }
}

export function apply_migrations(
  connection: Database.Database,
  migrations: readonly GatewayMigration[],
  now: () => string = () => new Date().toISOString(),
): void {
  validate_migrations(migrations);
  const known_versions = new Set(migrations.map((migration) => migration.version));
  const applied_versions = read_applied_versions(connection);
  for (const version of applied_versions) {
    if (!known_versions.has(version)) {
      throw new GatewaySchemaVersionError(version);
    }
  }

  for (const migration of migrations) {
    if (applied_versions.has(migration.version)) {
      continue;
    }
    connection
      .transaction(() => {
        migration.apply(connection);
        connection
          .prepare("INSERT INTO schema_migrations (version, applied_at) VALUES (?, ?)")
          .run(migration.version, now());
      })
      .immediate();
    applied_versions.add(migration.version);
  }
}

function read_applied_versions(connection: Database.Database): Set<number> {
  const table = connection
    .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'schema_migrations'")
    .get();
  if (table === undefined) {
    return new Set();
  }
  const rows = connection
    .prepare("SELECT version FROM schema_migrations ORDER BY version")
    .all() as { version: number }[];
  return new Set(rows.map((row) => row.version));
}

function validate_migrations(migrations: readonly GatewayMigration[]): void {
  let previous_version = 0;
  for (const migration of migrations) {
    if (!Number.isSafeInteger(migration.version) || migration.version <= previous_version) {
      throw new TypeError("Gateway migrations must have unique ascending positive versions");
    }
    previous_version = migration.version;
  }
}
