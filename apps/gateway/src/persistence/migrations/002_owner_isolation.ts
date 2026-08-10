import type Database from "better-sqlite3";

const LEGACY_OWNER_TOKEN_HASH = "0000000000000000000000000000000000000000000000000000000000000000";

export const OWNER_ISOLATION_MIGRATION = {
  version: 2,
  apply(connection: Database.Database): void {
    connection.exec(`
      ALTER TABLE job_assets RENAME TO job_assets_v1;
      ALTER TABLE job_events RENAME TO job_events_v1;
      ALTER TABLE assets RENAME TO assets_v1;
      ALTER TABLE jobs RENAME TO jobs_v1;

      CREATE TABLE jobs (
        job_id TEXT PRIMARY KEY,
        request_id TEXT NOT NULL,
        provider_id TEXT NOT NULL,
        owner_token_hash TEXT NOT NULL
          CHECK (
            length(owner_token_hash) = 64
            AND owner_token_hash NOT GLOB '*[^0-9a-f]*'
          ),
        state TEXT NOT NULL,
        request_json TEXT NOT NULL,
        submission_json TEXT,
        error_json TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        UNIQUE (owner_token_hash, request_id),
        UNIQUE (job_id, owner_token_hash)
      );

      CREATE INDEX jobs_owner_token_hash_idx
        ON jobs(owner_token_hash, job_id);

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
        sha256 TEXT NOT NULL,
        owner_token_hash TEXT NOT NULL
          CHECK (
            length(owner_token_hash) = 64
            AND owner_token_hash NOT GLOB '*[^0-9a-f]*'
          ),
        asset_kind TEXT NOT NULL
          CHECK (asset_kind IN ('reference', 'generated')),
        media_type TEXT NOT NULL,
        byte_length INTEGER NOT NULL,
        relative_path TEXT NOT NULL UNIQUE,
        created_at TEXT NOT NULL,
        UNIQUE (owner_token_hash, asset_kind, sha256),
        UNIQUE (asset_id, owner_token_hash)
      );

      CREATE INDEX assets_owner_token_hash_idx
        ON assets(owner_token_hash, asset_id);

      CREATE TABLE job_assets (
        job_id TEXT NOT NULL,
        owner_token_hash TEXT NOT NULL
          CHECK (
            length(owner_token_hash) = 64
            AND owner_token_hash NOT GLOB '*[^0-9a-f]*'
          ),
        asset_id TEXT NOT NULL,
        position INTEGER NOT NULL,
        PRIMARY KEY (job_id, position),
        FOREIGN KEY (job_id, owner_token_hash)
          REFERENCES jobs(job_id, owner_token_hash) ON DELETE CASCADE,
        FOREIGN KEY (asset_id, owner_token_hash)
          REFERENCES assets(asset_id, owner_token_hash)
      );

      INSERT INTO jobs (
        job_id, request_id, provider_id, owner_token_hash, state,
        request_json, submission_json, error_json, created_at, updated_at
      )
      SELECT
        job_id, request_id, provider_id, '${LEGACY_OWNER_TOKEN_HASH}', state,
        request_json, submission_json, error_json, created_at, updated_at
      FROM jobs_v1;

      INSERT INTO job_events (
        job_id, sequence, event_type, event_json, created_at
      )
      SELECT job_id, sequence, event_type, event_json, created_at
      FROM job_events_v1;

      INSERT INTO assets (
        asset_id, sha256, owner_token_hash, asset_kind, media_type,
        byte_length, relative_path, created_at
      )
      SELECT
        asset_id, sha256, '${LEGACY_OWNER_TOKEN_HASH}', 'generated', media_type,
        byte_length, relative_path, created_at
      FROM assets_v1;

      INSERT INTO job_assets (job_id, owner_token_hash, asset_id, position)
      SELECT job_id, '${LEGACY_OWNER_TOKEN_HASH}', asset_id, position
      FROM job_assets_v1;

      DROP TABLE job_assets_v1;
      DROP TABLE job_events_v1;
      DROP TABLE assets_v1;
      DROP TABLE jobs_v1;
    `);
  },
} as const;
