// @vitest-environment node

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

import Database from "better-sqlite3";
import { afterEach, describe, expect, it } from "vitest";

import {
  apply_migrations,
  open_gateway_database,
  type GatewayDatabase,
  type GatewayMigration,
} from "./database.js";
import { INITIAL_MIGRATION } from "./migrations/001_initial.js";

const open_databases: GatewayDatabase[] = [];
const cleanup_directories: string[] = [];

afterEach(() => {
  for (const database of open_databases.splice(0)) {
    database.close();
  }
  for (const directory of cleanup_directories.splice(0)) {
    rmSync(directory, { force: true, recursive: true });
  }
});

function create_database_path(): string {
  const directory = mkdtempSync(path.join(tmpdir(), "tavern-canvas-gateway-"));
  cleanup_directories.push(directory);
  return path.join(directory, "tavern_canvas.sqlite");
}

function open_database(file_path: string): GatewayDatabase {
  const database = open_gateway_database({
    file_path,
    busy_timeout_ms: 2_500,
  });
  open_databases.push(database);
  return database;
}

describe("open_gateway_database", () => {
  it("sets required SQLite pragmas before use", () => {
    const database = open_database(create_database_path());

    expect(database.connection.pragma("journal_mode", { simple: true })).toBe("wal");
    expect(database.connection.pragma("foreign_keys", { simple: true })).toBe(1);
    expect(database.connection.pragma("busy_timeout", { simple: true })).toBe(2_500);
  });

  it("runs the initial migration idempotently", () => {
    const file_path = create_database_path();
    const first = open_database(file_path);
    first.close();
    open_databases.splice(open_databases.indexOf(first), 1);

    const reopened = open_database(file_path);
    const migration_count = reopened.connection
      .prepare("SELECT COUNT(*) AS count FROM schema_migrations")
      .get() as { count: number };
    const tables = reopened.connection
      .prepare("SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name")
      .all() as { name: string }[];

    expect(migration_count.count).toBe(1);
    expect(tables.map((table) => table.name)).toEqual([
      "assets",
      "job_assets",
      "job_events",
      "jobs",
      "schema_migrations",
    ]);
  });

  it("rolls back a failed migration atomically", () => {
    const database = open_database(create_database_path());
    const failing_migration: GatewayMigration = {
      version: INITIAL_MIGRATION.version + 1,
      apply(connection) {
        connection.exec("CREATE TABLE should_rollback (value TEXT NOT NULL)");
        throw new Error("synthetic migration failure");
      },
    };

    expect(() =>
      apply_migrations(database.connection, [INITIAL_MIGRATION, failing_migration]),
    ).toThrow("synthetic migration failure");
    expect(
      database.connection
        .prepare("SELECT name FROM sqlite_master WHERE name = 'should_rollback'")
        .get(),
    ).toBeUndefined();
    expect(
      database.connection
        .prepare("SELECT version FROM schema_migrations WHERE version = ?")
        .get(failing_migration.version),
    ).toBeUndefined();
  });

  it("rejects an unknown schema version without modifying stored data", () => {
    const file_path = create_database_path();
    const initialized = open_database(file_path);
    initialized.close();
    open_databases.splice(open_databases.indexOf(initialized), 1);

    const direct = new Database(file_path);
    direct
      .prepare("INSERT INTO schema_migrations (version, applied_at) VALUES (?, ?)")
      .run(999, "2026-08-05T12:00:00.000Z");
    direct.exec(
      "CREATE TABLE sentinel (value TEXT NOT NULL); INSERT INTO sentinel VALUES ('preserve-me')",
    );
    direct.close();

    expect(() => open_gateway_database({ file_path })).toThrow(/schema version/u);

    const verify = new Database(file_path, { readonly: true });
    expect(verify.prepare("SELECT value FROM sentinel").pluck().get()).toBe("preserve-me");
    expect(verify.prepare("SELECT COUNT(*) FROM schema_migrations").pluck().get()).toBe(2);
    verify.close();
  });
});
