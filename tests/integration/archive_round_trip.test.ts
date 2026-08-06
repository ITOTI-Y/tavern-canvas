// Proves the archive format survives a real migrated namespace end to end: export a namespace
// that just went through the full v2 copy -> verify -> switch pipeline, import it into a fresh
// database, and confirm every store's counts and every asset's bytes match exactly — including
// `legacy_preferences`, added to `ARCHIVE_RECORD_STORES` by this task's controller ruling.
import "fake-indexeddb/auto";

import { ARCHIVE_RECORD_STORES, type ArchiveRecordStore } from "@tavern-canvas/contracts";
import {
  create_business_repositories,
  dispose_database,
  DATABASE_NAME,
  export_archive,
  import_archive,
  open_database,
  type BusinessRepositories,
  type StorageDatabase,
} from "@tavern-canvas/storage";
import { sha256_hex_bytes } from "@tavern-canvas/v2-migration";
import { deleteDB } from "idb";
import { afterEach, describe, expect, it } from "vitest";

import { run_migration } from "../../apps/extension/src/migration/migration_runner.js";
import { create_test_settings, migration_options } from "../harness/src/migration_fixtures.js";

const EXTENSION_VERSION = "3.0.0-e2e-archive-round-trip";

interface NamespaceExportSnapshot {
  readonly record_counts: Readonly<Record<ArchiveRecordStore, number>>;
  readonly blob_bytes_by_sha256: ReadonlyMap<string, Uint8Array>;
}

async function snapshot_for_export(
  repositories: BusinessRepositories,
  namespace: string,
): Promise<NamespaceExportSnapshot> {
  const record_counts = {} as Record<ArchiveRecordStore, number>;
  for (const store of ARCHIVE_RECORD_STORES) {
    record_counts[store] = (await repositories[store].list(namespace)).length;
  }
  const image_records = await repositories.image_records.list(namespace);
  const unique_hashes = [...new Set(image_records.map((record) => record.sha256))];
  const blob_bytes_by_sha256 = new Map<string, Uint8Array>();
  for (const sha256_hex of unique_hashes) {
    const blob = await repositories.image_blobs.get(sha256_hex);
    if (blob === null) {
      throw new Error(`unreachable: image_blobs is missing content for ${sha256_hex}`);
    }
    const bytes =
      blob.blob instanceof Blob
        ? new Uint8Array(await blob.blob.arrayBuffer())
        : new Uint8Array(blob.blob);
    blob_bytes_by_sha256.set(sha256_hex, bytes);
  }
  return { record_counts, blob_bytes_by_sha256 };
}

afterEach(async () => {
  await dispose_database();
  await deleteDB(DATABASE_NAME);
});

describe("scenarios 8-9: export a migrated namespace, import into a fresh database, and verify", () => {
  it("round-trips every store's counts and every asset's bytes, including legacy_preferences", async () => {
    const source_database: StorageDatabase = await open_database();
    const { settings } = create_test_settings();

    const migration_outcome = await run_migration(migration_options(source_database, settings));
    expect(migration_outcome.status).toBe("completed");
    if (migration_outcome.status !== "completed") {
      throw new Error("unreachable");
    }
    const migrated_namespace = migration_outcome.namespace;

    const source_repositories = create_business_repositories(source_database);
    const source_snapshot = await snapshot_for_export(source_repositories, migrated_namespace);
    expect(source_snapshot.record_counts.legacy_preferences).toBe(1);
    expect(source_snapshot.record_counts.image_records).toBeGreaterThan(0);
    expect(source_snapshot.blob_bytes_by_sha256.size).toBeGreaterThan(0);
    for (const [sha256_hex, bytes] of source_snapshot.blob_bytes_by_sha256) {
      expect(sha256_hex_bytes(bytes)).toBe(sha256_hex);
    }

    const archive_blob = await export_archive({
      database: source_database,
      namespace: migrated_namespace,
      extension_version: EXTENSION_VERSION,
      created_at: "2026-08-06T00:00:00.000Z",
    });
    expect(archive_blob.size).toBeGreaterThan(0);

    // "Fresh database" here means a truly separate physical database, not merely a new
    // namespace within the one still open — the same situation a different browser profile
    // (or the same profile after a full reinstall) importing this archive file would face.
    await dispose_database();
    await deleteDB(DATABASE_NAME);
    const fresh_database: StorageDatabase = await open_database();

    const import_result = await import_archive({ database: fresh_database, archive: archive_blob });
    expect(import_result.namespace).toMatch(/^import:/);
    expect(import_result.manifest.record_counts).toEqual(source_snapshot.record_counts);
    expect(import_result.asset_count).toBe(source_snapshot.blob_bytes_by_sha256.size);

    const fresh_repositories = create_business_repositories(fresh_database);
    for (const store of ARCHIVE_RECORD_STORES) {
      const imported_count = (await fresh_repositories[store].list(import_result.namespace)).length;
      expect(imported_count).toBe(source_snapshot.record_counts[store]);
    }

    const imported_legacy_preferences = await fresh_repositories.legacy_preferences.list(
      import_result.namespace,
    );
    expect(imported_legacy_preferences).toHaveLength(1);

    // Every asset's bytes survived the round trip byte-for-byte, verified independently by
    // rehashing the imported content rather than trusting the stored sha256 key alone.
    for (const [sha256_hex, expected_bytes] of source_snapshot.blob_bytes_by_sha256) {
      const imported_blob = await fresh_repositories.image_blobs.get(sha256_hex);
      expect(imported_blob).not.toBeNull();
      if (imported_blob === null) {
        continue;
      }
      const imported_bytes =
        imported_blob.blob instanceof Blob
          ? new Uint8Array(await imported_blob.blob.arrayBuffer())
          : new Uint8Array(imported_blob.blob);
      expect(imported_bytes).toEqual(expected_bytes);
      expect(sha256_hex_bytes(imported_bytes)).toBe(sha256_hex);
    }

    // Import never touches an active namespace: the fresh database still has none staged as active.
    expect(await fresh_repositories.provider_profiles.list("primary")).toEqual([]);
  });
});
