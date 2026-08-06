import "fake-indexeddb/auto";

import { BlobWriter, Uint8ArrayReader, ZipWriter } from "@zip.js/zip.js";
import type { IDBPDatabase } from "idb";
import { afterEach, describe, expect, it, vi } from "vitest";

import type { DBSchema } from "../database_schema.js";
import {
  create_business_repositories,
  ProviderProfileRepository,
} from "../repositories/business_repositories.js";
import { compute_sha256_hex } from "./archive_manifest.js";
import {
  IDS,
  NAMESPACE,
  business_record,
  gallery_image_record,
  image_blob,
  image_record,
  job_record,
  make_asset_bytes,
  open_test_database,
  reset_test_database,
  vocabulary_group_record,
} from "./archive_test_fixtures.js";
import {
  duplicate_first_central_directory_entry,
  read_zip_entry_bytes,
  rebuild_archive,
} from "./archive_zip_test_helpers.js";
import { export_archive } from "./export_archive.js";
import { ArchiveImportError, import_archive } from "./import_archive.js";

afterEach(async () => {
  vi.restoreAllMocks();
  await reset_test_database();
});

interface SeededArchive {
  readonly blob: Blob;
  readonly sha256: string;
  readonly image_id: string;
  readonly vocabulary_id: string;
}

async function seed_and_export(database: IDBPDatabase<DBSchema>): Promise<SeededArchive> {
  const repositories = create_business_repositories(database);
  const asset_bytes = make_asset_bytes("archived-image");
  const sha256_hex = compute_sha256_hex(asset_bytes);

  await repositories.image_blobs.create(image_blob(sha256_hex, asset_bytes));
  await repositories.image_records.create(NAMESPACE, image_record(IDS.first, sha256_hex));
  await repositories.provider_profiles.create(
    NAMESPACE,
    business_record(IDS.fifth, { provider_id: "sd_webui" }),
  );
  await repositories.vocabularies.create(NAMESPACE, business_record(IDS.second, {}));
  await repositories.vocabulary_groups.create(
    NAMESPACE,
    vocabulary_group_record(IDS.third, IDS.second),
  );
  await repositories.generation_jobs.create(NAMESPACE, job_record(IDS.fourth, [IDS.first]));
  await repositories.legacy_preferences.create(
    NAMESPACE,
    business_record(IDS.fifth, { payload: { theme_id: "夜间" } }, NAMESPACE),
  );

  const blob = await export_archive({
    database,
    namespace: NAMESPACE,
    extension_version: "3.0.0-alpha.1",
  });

  return { blob, sha256: sha256_hex, image_id: IDS.first, vocabulary_id: IDS.second };
}

async function read_json_entry<T>(blob: Blob, filename: string): Promise<T> {
  const bytes = await read_zip_entry_bytes(blob, filename);
  return JSON.parse(new TextDecoder().decode(bytes)) as T;
}

async function expect_import_error(
  database: IDBPDatabase<DBSchema>,
  archive: Blob | ArrayBuffer,
  signal?: AbortSignal,
): Promise<ArchiveImportError> {
  const rejection: unknown = await import_archive({
    database,
    archive,
    ...(signal === undefined ? {} : { signal }),
  }).catch((error: unknown) => error);
  expect(rejection).toBeInstanceOf(ArchiveImportError);
  return rejection as ArchiveImportError;
}

async function build_minimal_archive(entries: Record<string, Uint8Array | string>): Promise<Blob> {
  const zip_writer = new ZipWriter(new BlobWriter("application/zip"));
  for (const [path, content] of Object.entries(entries)) {
    const bytes = typeof content === "string" ? new TextEncoder().encode(content) : content;
    await zip_writer.add(path, new Uint8ArrayReader(bytes));
  }
  return zip_writer.close();
}

describe("import_archive", () => {
  it("stages a verified round trip without activating or mutating the active namespace", async () => {
    const database = await open_test_database();
    const seeded = await seed_and_export(database);
    const repositories = create_business_repositories(database);

    const result = await import_archive({ database, archive: seeded.blob });

    expect(result.namespace).toMatch(/^import:/);
    expect(result.asset_count).toBe(1);
    expect(result.manifest.record_counts.provider_profiles).toBe(1);

    const staged_provider_profiles = await repositories.provider_profiles.list(result.namespace);
    expect(staged_provider_profiles.map((record) => record.id)).toEqual([IDS.fifth]);
    expect(staged_provider_profiles[0]?.namespace).toBe(result.namespace);

    const staged_image_records = await repositories.image_records.list(result.namespace);
    expect(staged_image_records.map((record) => record.sha256)).toEqual([seeded.sha256]);

    const staged_vocabulary_groups = await repositories.vocabulary_groups.list(result.namespace);
    expect(staged_vocabulary_groups[0]?.vocabulary_id).toBe(seeded.vocabulary_id);

    const staged_jobs = await repositories.generation_jobs.list(result.namespace);
    expect(staged_jobs[0]?.image_ids).toEqual([seeded.image_id]);

    const staged_legacy_preferences = await repositories.legacy_preferences.list(result.namespace);
    expect(staged_legacy_preferences).toHaveLength(1);
    expect(staged_legacy_preferences[0]?.payload).toEqual({ theme_id: "夜间" });
    expect(result.manifest.record_counts.legacy_preferences).toBe(1);

    // image_blobs is global/content-addressed: the pre-existing active-namespace blob's
    // ref_count must be merged with, not replaced by, this import's contribution.
    const merged_blob = await repositories.image_blobs.get(seeded.sha256);
    expect(merged_blob?.ref_count).toBe(2);

    const marker = await repositories.migration_journal.get(result.namespace);
    expect(marker?.state).toBe("import_ready");
    expect(marker?.source_version).toBe(1);
    expect(marker?.payload).toMatchObject({ asset_count: 1 });

    // switch_active_namespace() owns activation; import must never touch the active namespace.
    expect(await repositories.provider_profiles.list(NAMESPACE)).toHaveLength(1);
  });

  it("rejects a checksum mismatch and rolls back everything staged before it", async () => {
    const database = await open_test_database();
    const seeded = await seed_and_export(database);
    // records/generation_jobs.jsonl is the last store processed; provider_profiles and every
    // store before it will already be staged by the time this failure fires.
    const tampered = await rebuild_archive(seeded.blob, {
      replace: { "records/generation_jobs.jsonl": new TextEncoder().encode("") },
    });

    const error = await expect_import_error(database, tampered);
    expect(error.reason).toBe("checksum_mismatch");
    expect(error.namespace).toBeDefined();

    const repositories = create_business_repositories(database);
    const staging_namespace = error.namespace ?? "";
    expect(await repositories.provider_profiles.list(staging_namespace)).toHaveLength(0);
    expect(await repositories.image_records.list(staging_namespace)).toHaveLength(0);
    expect(await repositories.migration_journal.get(staging_namespace)).toBeNull();
    // The pre-existing active-namespace blob must be unaffected by the rolled-back import.
    expect((await repositories.image_blobs.get(seeded.sha256))?.ref_count).toBe(1);
  });

  it("rejects an archive missing a file declared in checksums.json", async () => {
    const database = await open_test_database();
    const seeded = await seed_and_export(database);
    const incomplete = await rebuild_archive(seeded.blob, {
      exclude: ["records/generation_jobs.jsonl"],
    });

    const error = await expect_import_error(database, incomplete);
    expect(error.reason).toBe("missing_file");
  });

  it("rejects a duplicate path produced by a doctored central directory", async () => {
    const database = await open_test_database();
    const seeded = await seed_and_export(database);
    const doctored = await duplicate_first_central_directory_entry(seeded.blob);

    const error = await expect_import_error(database, doctored);
    expect(error.reason).toBe("duplicate_path");
  });

  it("rejects a path-traversal entry", async () => {
    const database = await open_test_database();
    const archive = await build_minimal_archive({ "../escape.txt": "payload" });

    const error = await expect_import_error(database, archive);
    expect(error.reason).toBe("unexpected_path");
  });

  it("rejects an entry declaring an uncompressed size beyond the safety limit", async () => {
    const database = await open_test_database();
    const seeded = await seed_and_export(database);
    const bombed = await rebuild_archive(seeded.blob, {
      forge_uncompressed_size: { [`assets/${seeded.sha256}.png`]: 10_000_000_000 },
    });

    const error = await expect_import_error(database, bombed);
    expect(error.reason).toBe("size_limit_exceeded");
  });

  it("rejects malformed JSONL content even when its checksum is internally consistent", async () => {
    const database = await open_test_database();
    const seeded = await seed_and_export(database);
    const broken_bytes = new TextEncoder().encode("not-json\n");
    const original_checksums = await read_json_entry<
      Record<string, { sha256: string; byte_length: number }>
    >(seeded.blob, "checksums.json");
    const patched_checksums = {
      ...original_checksums,
      "records/generation_jobs.jsonl": {
        sha256: compute_sha256_hex(broken_bytes),
        byte_length: broken_bytes.byteLength,
      },
    };

    const tampered = await rebuild_archive(seeded.blob, {
      replace: {
        "records/generation_jobs.jsonl": broken_bytes,
        "checksums.json": new TextEncoder().encode(JSON.stringify(patched_checksums)),
      },
    });

    const error = await expect_import_error(database, tampered);
    expect(error.reason).toBe("malformed_record");
  });

  it("rejects an archive declaring an unsupported schema version", async () => {
    const database = await open_test_database();
    const seeded = await seed_and_export(database);
    const manifest = await read_json_entry<Record<string, unknown>>(seeded.blob, "manifest.json");
    const forged_manifest = new TextEncoder().encode(
      JSON.stringify({ ...manifest, schema_version: 2 }),
    );

    const tampered = await rebuild_archive(seeded.blob, {
      replace: { "manifest.json": forged_manifest },
    });

    const error = await expect_import_error(database, tampered);
    expect(error.reason).toBe("unsupported_schema");
  });

  it("rejects cancellation deterministically and preserves the active namespace", async () => {
    const database = await open_test_database();
    const seeded = await seed_and_export(database);
    const repositories = create_business_repositories(database);

    const controller = new AbortController();
    const original = ProviderProfileRepository.prototype.create;
    vi.spyOn(ProviderProfileRepository.prototype, "create").mockImplementation(async function (
      this: ProviderProfileRepository,
      ...args
    ) {
      const result = await original.apply(this, args);
      controller.abort();
      return result;
    });

    const error = await expect_import_error(database, seeded.blob, controller.signal);
    expect(error.reason).toBe("cancelled");

    const staging_namespace = error.namespace ?? "";
    expect(await repositories.provider_profiles.list(staging_namespace)).toHaveLength(0);
    expect(await repositories.migration_journal.get(staging_namespace)).toBeNull();
    expect(await repositories.provider_profiles.list(NAMESPACE)).toHaveLength(1);
    expect((await repositories.image_blobs.get(seeded.sha256))?.ref_count).toBe(1);
  });

  it("computes ref_count from every image_record sharing one asset within the archive", async () => {
    const database = await open_test_database();
    const repositories = create_business_repositories(database);
    const asset_bytes = make_asset_bytes("shared-image");
    const sha256_hex = compute_sha256_hex(asset_bytes);

    await repositories.image_blobs.create(image_blob(sha256_hex, asset_bytes));
    await repositories.image_records.create(NAMESPACE, image_record(IDS.first, sha256_hex));
    await repositories.image_records.create(NAMESPACE, image_record(IDS.second, sha256_hex));
    await repositories.image_records.create(NAMESPACE, image_record(IDS.third, sha256_hex));

    const blob = await export_archive({
      database,
      namespace: NAMESPACE,
      extension_version: "3.0.0-alpha.1",
    });
    // Import into a database with no pre-existing blob for this hash, so the resulting
    // ref_count reflects only this archive's three image_records, not a merge.
    await reset_test_database();
    const fresh_database = await open_test_database();

    const result = await import_archive({ database: fresh_database, archive: blob });
    expect(result.asset_count).toBe(1);

    const fresh_repositories = create_business_repositories(fresh_database);
    const staged_blob = await fresh_repositories.image_blobs.get(sha256_hex);
    expect(staged_blob?.ref_count).toBe(3);
  });

  it("round-trips a namespace mixing migrated (base-shape) and runtime gallery (flat-shape) image_records rows (I1 regression)", async () => {
    const database = await open_test_database();
    const repositories = create_business_repositories(database);
    const migrated_bytes = make_asset_bytes("migrated-round-trip");
    const gallery_bytes = make_asset_bytes("gallery-round-trip");
    const migrated_sha256 = compute_sha256_hex(migrated_bytes);
    const gallery_sha256 = compute_sha256_hex(gallery_bytes);

    await repositories.image_blobs.create(image_blob(migrated_sha256, migrated_bytes));
    await repositories.image_blobs.create(image_blob(gallery_sha256, gallery_bytes));
    await repositories.image_records.create(NAMESPACE, image_record(IDS.first, migrated_sha256));
    await repositories.image_records.create(
      NAMESPACE,
      gallery_image_record(IDS.second, gallery_sha256),
    );

    const blob = await export_archive({
      database,
      namespace: NAMESPACE,
      extension_version: "3.0.0-alpha.1",
    });

    // Pre-fix, `parse_jsonl_records` validated every image_records.jsonl line
    // against the base-only `RECORD_SCHEMAS.image_records`, so the exported
    // gallery-shape row failed with `invalid_record` here.
    const result = await import_archive({ database, archive: blob });
    expect(result.asset_count).toBe(2);
    expect(result.manifest.record_counts.image_records).toBe(2);

    const staged = await repositories.image_records.list(result.namespace);
    expect(staged.map((record) => record.id).sort()).toEqual([IDS.first, IDS.second].sort());
    const staged_gallery_row = staged.find((record) => record.id === IDS.second);
    expect(staged_gallery_row).toMatchObject({ media_type: "image/png", quarantined: false });
  });

  it("restores the blob's MIME type on import instead of leaving it untyped (M2)", async () => {
    const database = await open_test_database();
    const seeded = await seed_and_export(database);
    // A fresh database with no pre-existing blob for this hash: `write_image_blob`
    // must take its "create" branch, the one this fix touches, rather than merging
    // into an already-typed blob left over from seeding.
    await reset_test_database();
    const fresh_database = await open_test_database();

    const result = await import_archive({ database: fresh_database, archive: seeded.blob });

    const fresh_repositories = create_business_repositories(fresh_database);
    const staged_blob = await fresh_repositories.image_blobs.get(seeded.sha256);
    expect(staged_blob?.blob).toBeInstanceOf(Blob);
    expect((staged_blob?.blob as Blob).type).toBe("image/png");
    expect(result.asset_count).toBe(1);
  });

  it("rejects a vocabulary_groups entry referencing an unknown vocabulary", async () => {
    const database = await open_test_database();
    const repositories = create_business_repositories(database);
    await repositories.vocabulary_groups.create(
      NAMESPACE,
      vocabulary_group_record(IDS.third, IDS.second),
    );
    const blob = await export_archive({
      database,
      namespace: NAMESPACE,
      extension_version: "3.0.0-alpha.1",
    });

    const error = await expect_import_error(database, blob);
    expect(error.reason).toBe("reference_mismatch");
  });
});
