import type Database from "better-sqlite3";

export const INITIAL_MIGRATION = {
  version: 1,
  apply(connection: Database.Database): void {
    connection.exec(`
      CREATE TABLE schema_migrations (
        version INTEGER PRIMARY KEY,
        applied_at TEXT NOT NULL
      );

      CREATE TABLE jobs (
        job_id TEXT PRIMARY KEY,
        request_id TEXT NOT NULL UNIQUE,
        provider_id TEXT NOT NULL,
        state TEXT NOT NULL,
        request_json TEXT NOT NULL,
        submission_json TEXT,
        error_code TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );

      CREATE TABLE job_events (
        job_id TEXT NOT NULL REFERENCES jobs(job_id) ON DELETE CASCADE,
        sequence INTEGER NOT NULL,
        event_type TEXT NOT NULL,
        event_json TEXT NOT NULL,
        created_at TEXT NOT NULL,
        PRIMARY KEY (job_id, sequence)
      );

      CREATE TABLE assets (
        asset_id TEXT PRIMARY KEY,
        sha256 TEXT NOT NULL UNIQUE,
        media_type TEXT NOT NULL,
        byte_length INTEGER NOT NULL,
        relative_path TEXT NOT NULL UNIQUE,
        created_at TEXT NOT NULL
      );

      CREATE TABLE job_assets (
        job_id TEXT NOT NULL REFERENCES jobs(job_id) ON DELETE CASCADE,
        asset_id TEXT NOT NULL REFERENCES assets(asset_id),
        position INTEGER NOT NULL,
        PRIMARY KEY (job_id, asset_id)
      );
    `);
  },
} as const;
