import "fake-indexeddb/auto";

import { TavernCanvasMessageMetadataSchema } from "@tavern-canvas/contracts";
import {
  create_business_repositories,
  dispose_database,
  DATABASE_NAME,
  GalleryImageRecordRepository,
  ImageBlobRepository,
  open_database,
  put_image,
  run_lru_eviction,
  type BusinessRepositories,
  type StorageDatabase,
} from "@tavern-canvas/storage";
import {
  classify_settings_paths,
  convert_assets,
  convert_characters,
  convert_gallery,
  convert_knowledge,
  convert_prompts,
  convert_provider,
  convert_settings,
  deterministic_uuid,
  LegacyGalleryDatabaseFixtureSchema,
  LegacySettingsSchema,
  sha256_hex_bytes,
} from "@tavern-canvas/v2-migration";
import { deleteDB } from "idb";
import { afterEach, describe, expect, it, vi } from "vitest";

import { TAVERN_CANVAS_SWIPE_METADATA_KEY } from "../../apps/extension/src/host/index.js";
import { migrate_active_chat_messages } from "../../apps/extension/src/migration/lazy_message_migration.js";
import { run_migration } from "../../apps/extension/src/migration/migration_runner.js";
import {
  clone_gallery_fixture,
  clone_settings_fixture,
  create_test_settings,
  fake_image_resolver,
  fake_legacy_source,
  fake_secret_destination,
  migration_options,
} from "../harness/src/migration_fixtures.js";
import { FakeHost } from "../harness/src/fake_host.js";

const MIGRATED_AT = "2026-08-06T00:00:00.000Z";

const NAMESPACED_STORES = [
  "provider_profiles",
  "prompt_presets",
  "regex_rules",
  "comfy_workflows",
  "novelai_vibes",
  "character_profiles",
  "knowledge_entries",
  "image_records",
  "vocabularies",
  "vocabulary_groups",
  "legacy_preferences",
] as const;

const COPY_BATCH_ORDER = [
  "provider",
  "secrets",
  "prompts",
  "assets",
  "characters",
  "knowledge",
  "gallery",
  "settings",
] as const;

interface CompletedOutcome {
  readonly status: "completed";
  readonly namespace: string;
  readonly counts: Readonly<Record<string, number>>;
}

function expect_completed(
  outcome: Awaited<ReturnType<typeof run_migration>>,
): asserts outcome is CompletedOutcome {
  expect(outcome.status).toBe("completed");
  if (outcome.status !== "completed") {
    throw new Error(`Expected migration to complete, got ${JSON.stringify(outcome)}`);
  }
}

interface NamespaceSnapshot {
  readonly by_store: Readonly<Record<(typeof NAMESPACED_STORES)[number], readonly string[]>>;
  readonly blob_ref_counts: Readonly<Record<string, number>>;
}

async function snapshot_namespace(
  repositories: BusinessRepositories,
  namespace: string,
): Promise<NamespaceSnapshot> {
  const by_store = {} as Record<(typeof NAMESPACED_STORES)[number], readonly string[]>;
  for (const store of NAMESPACED_STORES) {
    by_store[store] = (await repositories[store].list(namespace)).map((record) => record.id).sort();
  }
  const image_records = await repositories.image_records.list(namespace);
  const unique_hashes = [...new Set(image_records.map((record) => record.sha256))].sort();
  const blob_ref_counts: Record<string, number> = {};
  for (const sha256_hex of unique_hashes) {
    const blob = await repositories.image_blobs.get(sha256_hex);
    blob_ref_counts[sha256_hex] = blob?.ref_count ?? -1;
  }
  return { by_store, blob_ref_counts };
}

afterEach(async () => {
  await dispose_database();
  await deleteDB(DATABASE_NAME);
});

describe("scenario 1: fully populated v2 fixture migrates every classified path", () => {
  it("classifies every settings path and persists exactly what the pure converters compute", async () => {
    const legacy_raw = clone_settings_fixture();
    const gallery_raw = clone_gallery_fixture();

    const legacy = LegacySettingsSchema.parse(legacy_raw);
    const gallery = LegacyGalleryDatabaseFixtureSchema.parse(gallery_raw);

    const classification = classify_settings_paths(legacy);
    expect(classification.unknown).toEqual([]);
    const by_classification = new Map<string, number>();
    for (const entry of classification.classified) {
      by_classification.set(
        entry.rule.classification,
        (by_classification.get(entry.rule.classification) ?? 0) + 1,
      );
    }
    expect(by_classification.get("mapped")).toBe(452);
    expect(by_classification.get("deferred_secret_transfer")).toBe(8);
    expect(by_classification.get("intentionally_obsolete")).toBe(2);
    expect(classification.classified.length).toBe(462);

    const database: StorageDatabase = await open_database();
    const { settings } = create_test_settings();

    const outcome = await run_migration(
      migration_options(database, settings, {
        legacy_source: fake_legacy_source({ settings: legacy_raw, gallery: gallery_raw }),
        migrated_at: MIGRATED_AT,
      }),
    );
    expect_completed(outcome);
    const namespace = outcome.namespace;
    expect(settings.get_settings().active_namespace).toBe(namespace);

    const context = { namespace, migrated_at: MIGRATED_AT };
    const settings_result = convert_settings(legacy, context);
    const provider_result = convert_provider(legacy, context);
    const prompt_result = convert_prompts(legacy, context);
    const asset_result = convert_assets(legacy, gallery, context);
    const character_result = convert_characters(legacy, context);
    const knowledge_result = convert_knowledge(legacy, context);
    const gallery_result = convert_gallery(legacy, gallery, context);

    const repositories = create_business_repositories(database);
    const sorted_ids = (records: readonly { readonly id: string }[]) =>
      records.map((record) => record.id).sort();

    expect(sorted_ids(await repositories.provider_profiles.list(namespace))).toEqual(
      sorted_ids(provider_result.records),
    );
    expect(sorted_ids(await repositories.prompt_presets.list(namespace))).toEqual(
      sorted_ids(prompt_result.prompt_presets),
    );
    expect(sorted_ids(await repositories.regex_rules.list(namespace))).toEqual(
      sorted_ids(prompt_result.regex_rules),
    );
    expect(sorted_ids(await repositories.comfy_workflows.list(namespace))).toEqual(
      sorted_ids(asset_result.comfy_workflows),
    );
    expect(sorted_ids(await repositories.novelai_vibes.list(namespace))).toEqual(
      sorted_ids(asset_result.novelai_vibes),
    );
    expect(sorted_ids(await repositories.character_profiles.list(namespace))).toEqual(
      sorted_ids(character_result.character_profiles),
    );
    expect(sorted_ids(await repositories.knowledge_entries.list(namespace))).toEqual(
      sorted_ids(knowledge_result.knowledge_entries),
    );
    expect(sorted_ids(await repositories.vocabularies.list(namespace))).toEqual(
      sorted_ids(gallery_result.vocabularies),
    );
    expect(sorted_ids(await repositories.vocabulary_groups.list(namespace))).toEqual(
      sorted_ids(gallery_result.vocabulary_groups),
    );
    const expected_image_ids = sorted_ids([
      ...asset_result.image_records,
      ...gallery_result.image_records,
    ]);
    const persisted_image_records = await repositories.image_records.list(namespace);
    expect(sorted_ids(persisted_image_records)).toEqual(expected_image_ids);

    const legacy_preferences = await repositories.legacy_preferences.list(namespace);
    expect(legacy_preferences).toHaveLength(1);
    expect(legacy_preferences[0]?.id).toBe(settings_result.legacy_preferences.id);
    expect(legacy_preferences[0]?.payload).toEqual(settings_result.legacy_preferences.payload);

    // generation_jobs has no source in v2 data; migration must never populate it.
    expect(await repositories.generation_jobs.list(namespace)).toEqual([]);

    const unique_hashes = [...new Set(persisted_image_records.map((record) => record.sha256))];
    expect(unique_hashes.length).toBeGreaterThan(0);
    let verified_bytes = 0;
    for (const sha256_hex of unique_hashes) {
      const blob = await repositories.image_blobs.get(sha256_hex);
      expect(blob).not.toBeNull();
      if (blob === null) {
        continue;
      }
      const bytes = new Uint8Array(await (blob.blob as Blob).arrayBuffer());
      expect(sha256_hex_bytes(bytes)).toBe(sha256_hex);
      expect(bytes.byteLength).toBe(blob.byte_length);
      verified_bytes += bytes.byteLength;
    }
    expect(verified_bytes).toBeGreaterThan(0);
  });
});

describe("scenario 2: duplicate legacy images collapse into one blob", () => {
  it("mints two image_records but a single ref_count-2 blob for byte-identical legacy images", async () => {
    const legacy = LegacySettingsSchema.parse(clone_settings_fixture());
    const [source_tag_key, source_group] = Object.entries(legacy.jiuguanStorage)[0] ?? [];
    const source_image = source_group?.images[0];
    if (source_tag_key === undefined || source_group === undefined || source_image === undefined) {
      throw new Error("fixture must carry at least one jiuguanStorage image");
    }
    legacy.jiuguanStorage["e2e-duplicate-tag-key"] = {
      images: [
        {
          ...source_image,
          uuid: "10000000-0000-4000-8000-000000000099",
          thumbnail_uuid: "10000000-0000-4000-8000-000000000098",
        },
      ],
      index: 0,
      change: "e2e duplicate",
    };

    const database: StorageDatabase = await open_database();
    const { settings } = create_test_settings();
    const outcome = await run_migration(
      migration_options(database, settings, {
        legacy_source: fake_legacy_source({ settings: legacy }),
      }),
    );
    expect_completed(outcome);
    const namespace = outcome.namespace;

    const repositories = create_business_repositories(database);
    const image_records = await repositories.image_records.list(namespace);
    const counts_by_sha256 = new Map<string, number>();
    for (const record of image_records) {
      counts_by_sha256.set(record.sha256, (counts_by_sha256.get(record.sha256) ?? 0) + 1);
    }
    const duplicated = [...counts_by_sha256.entries()].filter(([, count]) => count > 1);
    expect(duplicated).toHaveLength(1);
    const [duplicated_sha256, duplicated_count] = duplicated[0] ?? [];
    if (duplicated_sha256 === undefined || duplicated_count === undefined) {
      throw new Error("unreachable");
    }
    expect(duplicated_count).toBe(2);

    const blob = await repositories.image_blobs.get(duplicated_sha256);
    expect(blob?.ref_count).toBe(2);
    const source_bytes = new Uint8Array(Buffer.from(source_image.data_base64 ?? "", "base64"));
    expect(sha256_hex_bytes(source_bytes)).toBe(duplicated_sha256);
    const stored_bytes = new Uint8Array(await (blob?.blob as Blob).arrayBuffer());
    expect(stored_bytes).toEqual(source_bytes);
  });
});
describe("scenario 2b: host-backed legacy images are resolved before conversion", () => {
  function settings_without_inline_images() {
    const legacy = clone_settings_fixture();
    for (const group of Object.values(legacy.jiuguanStorage)) {
      for (const image of group.images) {
        Reflect.deleteProperty(image, "data_base64");
      }
    }
    return legacy;
  }

  it("writes host-backed images to v3 and deduplicates identical resolved bytes", async () => {
    const legacy = settings_without_inline_images();
    const [source_tag_key, source_group] = Object.entries(legacy.jiuguanStorage)[0] ?? [];
    const source_image = source_group?.images[0];
    if (source_tag_key === undefined || source_group === undefined || source_image === undefined) {
      throw new Error("fixture must carry at least one host-backed image");
    }
    Reflect.set(legacy.jiuguanStorage, "e2e-host-duplicate", {
      images: [
        {
          ...source_image,
          uuid: "10000000-0000-4000-8000-000000000099",
          thumbnail_uuid: "10000000-0000-4000-8000-000000000098",
        },
      ],
      index: 0,
      change: "e2e host duplicate",
    });

    const host_bytes = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x42]);
    const database: StorageDatabase = await open_database();
    const { settings } = create_test_settings();
    const outcome = await run_migration(
      migration_options(database, settings, {
        legacy_source: fake_legacy_source({ settings: legacy }),
        image_resolver: fake_image_resolver(() => host_bytes),
      }),
    );
    expect_completed(outcome);

    const repositories = create_business_repositories(database);
    const host_sha256 = sha256_hex_bytes(host_bytes);
    const host_records = (await repositories.image_records.list(outcome.namespace)).filter(
      (record) => record.sha256 === host_sha256,
    );
    expect(host_records).toHaveLength(2);
    expect((await repositories.image_blobs.get(host_sha256))?.ref_count).toBe(2);
    expect(settings.get_settings().active_namespace).toBe(outcome.namespace);
  });

  it("keeps the primary namespace when a host-backed image cannot be resolved", async () => {
    const legacy = settings_without_inline_images();
    const database: StorageDatabase = await open_database();
    const { settings } = create_test_settings();
    const outcome = await run_migration(
      migration_options(database, settings, {
        legacy_source: fake_legacy_source({ settings: legacy }),
        image_resolver: fake_image_resolver(),
      }),
    );

    expect(outcome.status).toBe("failed");
    if (outcome.status !== "failed") {
      throw new Error("unreachable");
    }
    expect(outcome.failure.reason).toBe("missing_blob");
    expect(outcome.failure.message).toContain("image");
    expect(settings.get_settings().active_namespace).toBe("primary");
  });
});

describe("scenario 3: interruption after each batch boundary resumes without duplication", () => {
  it.each(COPY_BATCH_ORDER)(
    "reproduces the completed namespace exactly after resuming past the '%s' batch",
    async (batch) => {
      const database: StorageDatabase = await open_database();
      const { settings } = create_test_settings();
      const options = migration_options(database, settings);

      const first = await run_migration(options);
      expect_completed(first);
      const namespace = first.namespace;
      const repositories = create_business_repositories(database);
      const reference_snapshot = await snapshot_namespace(repositories, namespace);

      const journal = await repositories.migration_journal.get(namespace);
      if (journal === null) {
        throw new Error("unreachable");
      }
      const boundary_index = COPY_BATCH_ORDER.indexOf(batch);
      const rewound_batches = COPY_BATCH_ORDER.slice(0, boundary_index + 1);
      // Reproduces the exact crash window this guarantee protects: batches through `batch`
      // committed their writes, but the journal never advanced past them.
      await repositories.migration_journal.update({
        ...journal,
        state: "copying",
        payload: {
          ...(journal.payload as object),
          state: "copying",
          completed_batches: [...rewound_batches],
        },
      });

      const second = await run_migration(options);
      expect_completed(second);
      expect(second.namespace).toBe(namespace);

      const resumed_snapshot = await snapshot_namespace(repositories, namespace);
      expect(resumed_snapshot).toEqual(reference_snapshot);
      expect(settings.get_settings().active_namespace).toBe(namespace);
    },
  );
});

describe("scenario 4: a corrupted persisted image blocks the switch", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("detects a byte corrupted on its very first write, so the switch never happens even once", async () => {
    const database: StorageDatabase = await open_database();
    const { settings } = create_test_settings();

    // Corrupts the first image blob before verify() runs, so the switch is blocked on the first attempt.
    let captured_sha256: string | undefined;
    let captured_original_bytes: Uint8Array | undefined;
    const original_create = ImageBlobRepository.prototype.create;
    vi.spyOn(ImageBlobRepository.prototype, "create").mockImplementation(async function (
      this: ImageBlobRepository,
      ...args: Parameters<typeof original_create>
    ) {
      const [record, transaction] = args;
      if (captured_sha256 !== undefined) {
        return original_create.apply(this, args);
      }
      captured_sha256 = record.sha256;
      const original_bytes =
        record.blob instanceof Blob
          ? new Uint8Array(await record.blob.arrayBuffer())
          : new Uint8Array(record.blob);
      captured_original_bytes = original_bytes;
      const corrupted_bytes = original_bytes.slice();
      corrupted_bytes[0] = (corrupted_bytes[0] ?? 0) ^ 0xff;
      return original_create.apply(this, [
        { ...record, blob: new Blob([new Uint8Array(corrupted_bytes)]) },
        transaction,
      ]);
    });

    const first_attempt = await run_migration(migration_options(database, settings));

    expect(first_attempt.status).toBe("failed");
    if (first_attempt.status !== "failed") {
      throw new Error("unreachable");
    }
    expect(first_attempt.failure.reason).toBe("hash_mismatch");
    expect(settings.get_settings().active_namespace).toBe("primary");
    const namespace = first_attempt.namespace as string;
    const repositories = create_business_repositories(database);
    expect((await repositories.migration_journal.get(namespace))?.state).toBe("failed");
    if (captured_sha256 === undefined || captured_original_bytes === undefined) {
      throw new Error("unreachable: the corrupting spy never fired");
    }
    const corrupted_blob = await repositories.image_blobs.get(captured_sha256);
    expect(corrupted_blob?.sha256).toBe(sha256_hex_bytes(captured_original_bytes));
    if (corrupted_blob !== null) {
      const stored_bytes =
        corrupted_blob.blob instanceof Blob
          ? new Uint8Array(await corrupted_blob.blob.arrayBuffer())
          : new Uint8Array(corrupted_blob.blob);
      expect(sha256_hex_bytes(stored_bytes)).not.toBe(corrupted_blob.sha256);
    }

    vi.restoreAllMocks();
    if (corrupted_blob === null) {
      throw new Error("unreachable");
    }
    await repositories.image_blobs.update({
      ...corrupted_blob,
      blob: new Blob([new Uint8Array(captured_original_bytes)]),
    });
    const journal_after_failure = await repositories.migration_journal.get(namespace);
    if (journal_after_failure === null) {
      throw new Error("unreachable");
    }
    // The "failed" payload carries a `failure` field the "verifying" variant's strictObject
    // schema does not accept; drop it along with the state discriminant before rewinding.
    const {
      failure: _failure,
      state: _state,
      ...in_progress_fields
    } = journal_after_failure.payload as Record<string, unknown> & {
      failure?: unknown;
      state: unknown;
    };
    await repositories.migration_journal.update({
      ...journal_after_failure,
      state: "verifying",
      payload: { ...in_progress_fields, state: "verifying" },
    });
    const retry = await run_migration(migration_options(database, settings));
    expect_completed(retry);
    expect(retry.namespace).toBe(namespace);
    expect(settings.get_settings().active_namespace).toBe(namespace);
  });
});

describe("scenario 5: an unknown legacy setting blocks completion", () => {
  it("fails before any business record is written and leaves the active namespace untouched", async () => {
    const database: StorageDatabase = await open_database();
    const { settings } = create_test_settings();
    const legacy = { ...clone_settings_fixture(), e2e_unknown_future_field: "surprise" };

    const outcome = await run_migration(
      migration_options(database, settings, {
        legacy_source: fake_legacy_source({ settings: legacy }),
      }),
    );

    expect(outcome.status).toBe("failed");
    if (outcome.status !== "failed") {
      throw new Error("unreachable");
    }
    expect(outcome.failure.reason).toBe("unknown_setting_path");
    expect(outcome.failure.message).toContain("e2e_unknown_future_field");
    expect(outcome.namespace).not.toBeNull();
    const namespace = outcome.namespace as string;

    const repositories = create_business_repositories(database);
    for (const store of NAMESPACED_STORES) {
      expect(await repositories[store].list(namespace)).toEqual([]);
    }
    expect(settings.get_settings().active_namespace).toBe("primary");
    expect((await repositories.migration_journal.get(namespace))?.state).toBe("failed");
  });
});

describe("scenario 6: a blocked secret transfer never exposes the plaintext value", () => {
  const KNOWN_PLAINTEXT_SECRETS = [
    "synthetic-sd-basic-auth-token",
    "synthetic-novelai-token-default",
    "synthetic-novelai-token-id",
    "synthetic-legacy-ai-token",
    "synthetic-banana-api-key",
    "synthetic-assistant-api-key",
    "synthetic-llm-api-key-default",
    "synthetic-novelai-token-profile-default",
  ] as const;

  it("blocks completion and never writes any known plaintext credential to a record or the journal", async () => {
    const database: StorageDatabase = await open_database();
    const { settings } = create_test_settings();
    const destination = fake_secret_destination(() => false);
    const outcome = await run_migration(
      migration_options(database, settings, { secret_destination: destination }),
    );

    expect(outcome.status).toBe("failed");
    if (outcome.status !== "failed") {
      throw new Error("unreachable");
    }
    expect(outcome.failure.reason).toBe("secret_transfer_blocked");
    // Blocked before any write was even attempted: the plaintext never left this process.
    expect(destination.write_calls).toEqual([]);
    expect(settings.get_settings().active_namespace).toBe("primary");

    const namespace = outcome.namespace as string;
    const repositories = create_business_repositories(database);
    // "provider" runs before "secrets" in copy order, so provider_profiles is already written;
    // it must never carry a reversible credential.
    const provider_profiles = await repositories.provider_profiles.list(namespace);
    expect(provider_profiles.length).toBeGreaterThan(0);
    const serialized_provider_profiles = JSON.stringify(provider_profiles);
    const journal = await repositories.migration_journal.get(namespace);
    const serialized_journal = JSON.stringify(journal);
    for (const secret of KNOWN_PLAINTEXT_SECRETS) {
      expect(serialized_provider_profiles).not.toContain(secret);
      expect(serialized_journal).not.toContain(secret);
    }
  });
});

describe("scenario 7: an unopened chat is untouched, then migrates on first open", () => {
  it("never migrates a dormant chat until it becomes the active chat", async () => {
    const database: StorageDatabase = await open_database();
    const { settings } = create_test_settings();
    const migration_outcome = await run_migration(
      migration_options(database, settings, { migrated_at: MIGRATED_AT }),
    );
    expect_completed(migration_outcome);
    const namespace = migration_outcome.namespace;

    const legacy = LegacySettingsSchema.parse(clone_settings_fixture());
    const jiuguan_storage = legacy.jiuguanStorage;

    const host = new FakeHost(true, "chat-decoy");
    host.create_chat("chat-dormant");
    host.add_message({
      chat_id: "chat-dormant",
      message_id: 4,
      role: "assistant",
      content: "旅人推开了门，屋内坐着一只戴着帽子的猫。\n\n<image>一只戴着帽子的猫</image>",
    });
    const dormant_message = host.message("chat-dormant", 4);
    const dormant_swipe = dormant_message?.swipes.find((swipe) => swipe.swipe_id === 0);
    if (dormant_message === null || dormant_swipe === undefined) {
      throw new Error("unreachable");
    }
    dormant_swipe.data = {
      images: { "0": [{ tag: "一只戴着帽子的猫", regex: "戴着帽子的猫", locked: false }] },
    };

    // "chat-decoy" is active; migrating it must never touch "chat-dormant".
    const decoy_outcome = await migrate_active_chat_messages({
      database,
      host,
      namespace,
      jiuguan_storage,
      migrated_at: "2026-08-06T00:00:01.000Z",
    });
    expect(decoy_outcome.chat_id).toBe("chat-decoy");

    const repositories = create_business_repositories(database);
    const journal_before_open = await repositories.migration_journal.list();
    expect(journal_before_open.some((entry) => entry.migration_id.includes("chat-dormant"))).toBe(
      false,
    );
    expect(dormant_swipe.metadata).toEqual({});

    host.switch_chat("chat-dormant");
    const dormant_outcome = await migrate_active_chat_messages({
      database,
      host,
      namespace,
      jiuguan_storage,
      migrated_at: "2026-08-06T00:00:02.000Z",
    });
    expect(dormant_outcome).toEqual({
      status: "migrated",
      chat_id: "chat-dormant",
      entries_written: 1,
    });

    const migrated_message = host.message("chat-dormant", 4);
    const stored_metadata = TavernCanvasMessageMetadataSchema.parse(
      migrated_message?.swipes[0]?.metadata[TAVERN_CANVAS_SWIPE_METADATA_KEY],
    );
    expect(stored_metadata.image_ids).toHaveLength(1);
    const expected_image_id = deterministic_uuid(
      `${namespace}:gallery_converter:server:10000000-0000-4000-8000-000000000001`,
    );
    expect(stored_metadata.image_ids[0]).toBe(expected_image_id);

    const linked_image_record = await repositories.image_records.get(namespace, expected_image_id);
    expect(linked_image_record).not.toBeNull();

    const journal_after_open = await repositories.migration_journal.list();
    expect(journal_after_open.some((entry) => entry.migration_id.includes("chat-dormant"))).toBe(
      true,
    );
  });
});

function png_bytes(byte_length: number, marker: number): Uint8Array {
  const bytes = new Uint8Array(byte_length);
  bytes.set([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  bytes[byte_length - 1] = marker;
  return bytes;
}

describe("scenario 10: LRU cleanup preserves sole message copies and pinned assets", () => {
  it("never evicts migrated content or pinned gallery content, but still reclaims eligible bytes", async () => {
    const database: StorageDatabase = await open_database();
    const { settings } = create_test_settings();
    const migration_outcome = await run_migration(migration_options(database, settings));
    expect_completed(migration_outcome);
    const namespace = migration_outcome.namespace;

    const repositories = create_business_repositories(database);
    const migrated_image_records = await repositories.image_records.list(namespace);
    expect(migrated_image_records.length).toBeGreaterThan(0);
    expect(migrated_image_records.some((record) => record.pinned)).toBe(true);
    const migrated_hashes = [...new Set(migrated_image_records.map((record) => record.sha256))];

    const generation_metadata = {
      provider_id: "sd_webui" as const,
      source_message: { chat_id: "chat-1", message_id: "msg-1", swipe_id: 0 },
      generation_parameters: { generation_anchor: "a".repeat(64), scene_description: "A scene" },
    };
    const pinned_generation_record = await put_image(database, namespace, {
      id: "77777777-7777-4777-8777-777777777777",
      bytes: png_bytes(400, 1),
      claimed_media_type: "image/png",
      created_at: MIGRATED_AT,
      metadata: { ...generation_metadata, persisted_url: "https://cdn.example.com/pinned.png" },
      pinned: true,
    });
    const evictable_generation_record = await put_image(database, namespace, {
      id: "88888888-8888-4888-8888-888888888888",
      bytes: png_bytes(400, 2),
      claimed_media_type: "image/png",
      created_at: MIGRATED_AT,
      metadata: { ...generation_metadata, persisted_url: "https://cdn.example.com/evictable.png" },
    });

    const total_bytes = (await repositories.image_blobs.list()).reduce(
      (sum, blob) => sum + blob.byte_length,
      0,
    );
    const result = await run_lru_eviction(
      database,
      { start_pressure_ratio: 0, target_pressure_ratio: 0 },
      () => Promise.resolve({ usage: total_bytes, quota: total_bytes }),
    );

    expect(result.evicted_sha256).toEqual([evictable_generation_record.sha256]);
    const evicted_blob_bytes_before = png_bytes(400, 2).byteLength;
    expect(result.reclaimed_bytes).toBe(evicted_blob_bytes_before);

    for (const sha256_hex of migrated_hashes) {
      expect(await repositories.image_blobs.get(sha256_hex)).not.toBeNull();
    }
    expect(await repositories.image_blobs.get(pinned_generation_record.sha256)).not.toBeNull();
    expect(await repositories.image_blobs.get(evictable_generation_record.sha256)).toBeNull();

    const retained_metadata = await new GalleryImageRecordRepository(database).get(
      namespace,
      evictable_generation_record.id,
    );
    expect(retained_metadata).not.toBeNull();
    expect(retained_metadata?.persisted_url).toBe("https://cdn.example.com/evictable.png");
  });
});
