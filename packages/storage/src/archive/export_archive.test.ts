import "fake-indexeddb/auto";

import { BlobReader, ZipReader } from "@zip.js/zip.js";
import { afterEach, describe, expect, it, vi } from "vitest";

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
  make_asset_bytes,
  open_test_database,
  read_entry_text,
  reset_test_database,
} from "./archive_test_fixtures.js";
import { ArchiveExportError, export_archive } from "./export_archive.js";

afterEach(async () => {
  vi.restoreAllMocks();
  await reset_test_database();
});

describe("export_archive", () => {
  it("writes records, dedupes assets, and orders entries deterministically", async () => {
    const database = await open_test_database();
    const repositories = create_business_repositories(database);

    const first_bytes = make_asset_bytes("first-image");
    const second_bytes = make_asset_bytes("second-image");
    const first_sha256 = compute_sha256_hex(first_bytes);
    const second_sha256 = compute_sha256_hex(second_bytes);

    await repositories.provider_profiles.create(
      NAMESPACE,
      business_record(IDS.second, { provider_id: "sd_webui" }),
    );
    await repositories.provider_profiles.create(
      NAMESPACE,
      business_record(IDS.first, { provider_id: "sd_webui" }),
    );
    await repositories.image_blobs.create(image_blob(first_sha256, first_bytes));
    await repositories.image_blobs.create(image_blob(second_sha256, second_bytes));
    await repositories.image_records.create(NAMESPACE, image_record(IDS.first, first_sha256));
    await repositories.image_records.create(NAMESPACE, image_record(IDS.second, second_sha256));
    await repositories.image_records.create(NAMESPACE, image_record(IDS.third, second_sha256));
    await repositories.legacy_preferences.create(
      NAMESPACE,
      business_record(IDS.fourth, { payload: { theme_id: "夜间" } }),
    );

    const blob = await export_archive({
      database,
      namespace: NAMESPACE,
      extension_version: "3.0.0-alpha.1",
      created_at: "2026-08-06T00:00:00.000Z",
    });

    const zip_reader = new ZipReader(new BlobReader(blob));
    const entries = await zip_reader.getEntries();
    const paths = entries.map((entry) => entry.filename);
    const [sorted_first, sorted_second] = [first_sha256, second_sha256].sort();

    expect(paths).toEqual([
      "records/provider_profiles.jsonl",
      "records/prompt_presets.jsonl",
      "records/comfy_workflows.jsonl",
      "records/novelai_vibes.jsonl",
      "records/character_profiles.jsonl",
      "records/regex_rules.jsonl",
      "records/outfit_profiles.jsonl",
      "records/lora_profiles.jsonl",
      "records/prompt_tag_presets.jsonl",
      "records/vocabularies.jsonl",
      "records/vocabulary_groups.jsonl",
      "records/image_records.jsonl",
      "records/generation_jobs.jsonl",
      "records/legacy_preferences.jsonl",
      `assets/${sorted_first}.png`,
      `assets/${sorted_second}.png`,
      "manifest.json",
      "checksums.json",
    ]);

    const provider_profiles_text = await read_entry_text(
      entries,
      "records/provider_profiles.jsonl",
    );
    const provider_profile_ids = provider_profiles_text
      .trim()
      .split("\n")
      .map((line) => (JSON.parse(line) as { id: string }).id);
    expect(provider_profile_ids).toEqual([IDS.first, IDS.second]);

    const manifest_text = await read_entry_text(entries, "manifest.json");
    const manifest = JSON.parse(manifest_text) as {
      format: string;
      schema_version: number;
      record_counts: Record<string, number>;
      asset_count: number;
      excluded_secret_categories: string[];
    };
    expect(manifest.format).toBe("tavern-canvas-archive");
    expect(manifest.schema_version).toBe(1);
    expect(manifest.record_counts.provider_profiles).toBe(2);
    expect(manifest.record_counts.image_records).toBe(3);
    expect(manifest.record_counts.legacy_preferences).toBe(1);
    expect(manifest.asset_count).toBe(2);

    const legacy_preferences_text = await read_entry_text(
      entries,
      "records/legacy_preferences.jsonl",
    );
    const legacy_preferences_payload = (
      JSON.parse(legacy_preferences_text.trim()) as { payload: { theme_id: string } }
    ).payload;
    expect(legacy_preferences_payload.theme_id).toBe("夜间");
    expect(manifest.excluded_secret_categories).toEqual(
      expect.arrayContaining(["gateway_token", "provider_credentials"]),
    );

    const checksums_text = await read_entry_text(entries, "checksums.json");
    const checksums = JSON.parse(checksums_text) as Record<
      string,
      { sha256: string; byte_length: number }
    >;
    expect(Object.keys(checksums).sort()).toEqual(
      [...paths.filter((path) => path !== "checksums.json")].sort(),
    );
    expect(checksums["manifest.json"]?.sha256).toBe(
      compute_sha256_hex(new TextEncoder().encode(manifest_text)),
    );

    await zip_reader.close();
  });

  it("produces every declared file with zero counts for an empty namespace", async () => {
    const database = await open_test_database();

    const blob = await export_archive({
      database,
      namespace: "empty-namespace",
      extension_version: "3.0.0-alpha.1",
    });

    const zip_reader = new ZipReader(new BlobReader(blob));
    const entries = await zip_reader.getEntries();
    expect(entries.map((entry) => entry.filename).sort()).toEqual(
      [
        "manifest.json",
        "checksums.json",
        "records/provider_profiles.jsonl",
        "records/prompt_presets.jsonl",
        "records/comfy_workflows.jsonl",
        "records/novelai_vibes.jsonl",
        "records/character_profiles.jsonl",
        "records/regex_rules.jsonl",
        "records/outfit_profiles.jsonl",
        "records/lora_profiles.jsonl",
        "records/prompt_tag_presets.jsonl",
        "records/vocabularies.jsonl",
        "records/vocabulary_groups.jsonl",
        "records/image_records.jsonl",
        "records/generation_jobs.jsonl",
        "records/legacy_preferences.jsonl",
      ].sort(),
    );

    const manifest_text = await read_entry_text(entries, "manifest.json");
    const manifest = JSON.parse(manifest_text) as {
      record_counts: Record<string, number>;
      asset_count: number;
    };
    for (const count of Object.values(manifest.record_counts)) {
      expect(count).toBe(0);
    }
    expect(manifest.asset_count).toBe(0);

    const records_entry = entries.find(
      (entry) => entry.filename === "records/provider_profiles.jsonl",
    );
    expect(records_entry?.uncompressedSize).toBe(0);

    await zip_reader.close();
  });

  it("round-trips CJK text byte-for-byte", async () => {
    const database = await open_test_database();
    const repositories = create_business_repositories(database);
    const cjk_text = "夜雨寄北：君问归期未有期，巴山夜雨涨秋池。";

    await repositories.prompt_presets.create(
      NAMESPACE,
      business_record(IDS.first, { payload: { text: cjk_text } }),
    );

    const blob = await export_archive({
      database,
      namespace: NAMESPACE,
      extension_version: "3.0.0-alpha.1",
    });

    const zip_reader = new ZipReader(new BlobReader(blob));
    const entries = await zip_reader.getEntries();
    const text = await read_entry_text(entries, "records/prompt_presets.jsonl");
    const parsed = JSON.parse(text.trim()) as { payload: { text: string } };
    expect(parsed.payload.text).toBe(cjk_text);

    await zip_reader.close();
  });

  it("exports a namespace mixing migrated (base-shape) and runtime gallery (flat-shape) image_records rows", async () => {
    const database = await open_test_database();
    const repositories = create_business_repositories(database);
    const migrated_bytes = make_asset_bytes("migrated-image");
    const gallery_bytes = make_asset_bytes("gallery-image");
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
      created_at: "2026-08-06T00:00:00.000Z",
    });

    const zip_reader = new ZipReader(new BlobReader(blob));
    const entries = await zip_reader.getEntries();
    const manifest_text = await read_entry_text(entries, "manifest.json");
    const manifest = JSON.parse(manifest_text) as {
      record_counts: Record<string, number>;
      asset_count: number;
    };
    expect(manifest.record_counts.image_records).toBe(2);
    expect(manifest.asset_count).toBe(2);

    const image_records_text = await read_entry_text(entries, "records/image_records.jsonl");
    const exported_ids = image_records_text
      .trim()
      .split("\n")
      .map((line) => (JSON.parse(line) as { id: string }).id);
    expect(exported_ids.sort()).toEqual([IDS.first, IDS.second].sort());

    await zip_reader.close();
  });

  it("fails with a typed error when a referenced blob is missing", async () => {
    const database = await open_test_database();
    const repositories = create_business_repositories(database);
    await repositories.image_records.create(NAMESPACE, image_record(IDS.first, "a".repeat(64)));

    const rejection: unknown = await export_archive({
      database,
      namespace: NAMESPACE,
      extension_version: "3.0.0-alpha.1",
    }).catch((error: unknown) => error);
    expect(rejection).toBeInstanceOf(ArchiveExportError);
    expect((rejection as ArchiveExportError).reason).toBe("missing_asset_blob");
  });

  it("rejects cancellation deterministically and reports a typed reason", async () => {
    const database = await open_test_database();
    const repositories = create_business_repositories(database);
    await repositories.provider_profiles.create(
      NAMESPACE,
      business_record(IDS.first, { provider_id: "sd_webui" }),
    );
    await repositories.prompt_presets.create(NAMESPACE, business_record(IDS.second, {}));

    const controller = new AbortController();
    const original = ProviderProfileRepository.prototype.list;
    vi.spyOn(ProviderProfileRepository.prototype, "list").mockImplementation(async function (
      this: ProviderProfileRepository,
      ...args
    ) {
      const result = await original.apply(this, args);
      controller.abort();
      return result;
    });

    const rejection: unknown = await export_archive({
      database,
      namespace: NAMESPACE,
      extension_version: "3.0.0-alpha.1",
      signal: controller.signal,
    }).catch((error: unknown) => error);
    expect(rejection).toBeInstanceOf(ArchiveExportError);
    expect((rejection as ArchiveExportError).reason).toBe("cancelled");
    expect(controller.signal.aborted).toBe(true);
  });
});
