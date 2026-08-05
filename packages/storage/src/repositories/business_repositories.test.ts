import "fake-indexeddb/auto";

import { deleteDB } from "idb";
import { afterEach, describe, expect, it } from "vitest";

import {
  DATABASE_NAME,
  type BusinessRecord,
  type GenerationJobRecord,
  type ImageBlobRecord,
  type ImageRecord,
  type MigrationJournalRecord,
} from "../database_schema.js";
import { dispose_database, open_database } from "../open_database.js";
import { with_transaction } from "../transaction.js";
import {
  create_business_repositories,
  type BusinessRepositories,
} from "./business_repositories.js";
import { GenerationJobRepository } from "./job_repository.js";

const NAMESPACE = "primary";
const OTHER_NAMESPACE = "secondary";
const NOW = "2026-08-05T00:00:00.000Z";
const LATER = "2026-08-05T00:00:01.000Z";
const IDS = {
  first: "11111111-1111-4111-8111-111111111111",
  second: "22222222-2222-4222-8222-222222222222",
  third: "33333333-3333-4333-8333-333333333333",
} as const;

function business_record<T extends Record<string, unknown>>(
  id: string,
  fields: T,
  namespace = NAMESPACE,
): BusinessRecord & T {
  return {
    schema_version: 1,
    id,
    namespace,
    record_key: `${namespace}:${id}`,
    created_at: NOW,
    updated_at: NOW,
    payload: { value: id },
    ...fields,
  } as BusinessRecord & T;
}

function image_record(id: string, namespace = NAMESPACE): ImageRecord {
  return business_record(id, {
    sha256: "a".repeat(64),
    last_accessed_at: NOW,
    pinned: false,
  }, namespace) as ImageRecord;
}

function job_record(id = IDS.first, namespace = NAMESPACE): GenerationJobRecord {
  return {
    schema_version: 1,
    id,
    namespace,
    record_key: `${namespace}:${id}`,
    created_at: NOW,
    updated_at: NOW,
    request_id: "44444444-4444-4444-8444-444444444444",
    request_digest: "b".repeat(64),
    generation_anchor: "c".repeat(64),
    source_anchor: "d".repeat(64),
    chat_id: "chat-1",
    requested_swipe_id: 0,
    provider_id: "sd_webui",
    arguments: {
      generation_anchor: "e".repeat(64),
      scene_description: "A scene",
    },
    state: "queued",
    error: null,
    image_ids: [],
    automatic: false,
    payload: {},
  };
}

async function make_repositories(): Promise<{
  repositories: BusinessRepositories;
  jobs: GenerationJobRepository;
}> {
  const database = await open_database();
  return {
    repositories: create_business_repositories(database),
    jobs: new GenerationJobRepository(database),
  };
}

afterEach(async () => {
  await dispose_database();
  await deleteDB(DATABASE_NAME);
});

describe("business repositories", () => {
  it("supports create/get/list/update/delete/put with deterministic namespace lists", async () => {
    const { repositories } = await make_repositories();
    const first = business_record(IDS.first, { provider_id: "sd_webui" });
    const second = business_record(IDS.second, { provider_id: "sd_webui" });
    const other = business_record(IDS.third, { provider_id: "sd_webui" }, OTHER_NAMESPACE);

    await repositories.provider_profiles.create(NAMESPACE, second);
    await repositories.provider_profiles.create(NAMESPACE, first);
    await repositories.provider_profiles.create(OTHER_NAMESPACE, other);

    expect(await repositories.provider_profiles.get(NAMESPACE, IDS.first)).toEqual(first);
    expect(await repositories.provider_profiles.get(OTHER_NAMESPACE, IDS.first)).toBeNull();
    expect((await repositories.provider_profiles.list(NAMESPACE)).map((item) => item.id)).toEqual([
      IDS.first,
      IDS.second,
    ]);

    const updated = { ...first, updated_at: LATER, payload: { value: "updated" } };
    await repositories.provider_profiles.update(NAMESPACE, updated);
    expect(await repositories.provider_profiles.get(NAMESPACE, IDS.first)).toEqual(updated);

    const replacement = { ...updated, payload: { value: "replacement" } };
    await repositories.provider_profiles.put(NAMESPACE, replacement);
    expect(await repositories.provider_profiles.get(NAMESPACE, IDS.first)).toEqual(replacement);

    await repositories.provider_profiles.delete(NAMESPACE, IDS.first);
    expect(await repositories.provider_profiles.get(NAMESPACE, IDS.first)).toBeNull();
  });

  it("rejects duplicate creates and missing updates", async () => {
    const { repositories } = await make_repositories();
    const record = business_record(IDS.first, { provider_id: "sd_webui" });

    await repositories.provider_profiles.create(NAMESPACE, record);
    await expect(repositories.provider_profiles.create(NAMESPACE, record)).rejects.toThrow();
    await expect(repositories.provider_profiles.update(NAMESPACE, record)).resolves.toBeUndefined();
    await expect(
      repositories.provider_profiles.update(NAMESPACE, business_record(IDS.second, { provider_id: "sd_webui" })),
    ).rejects.toThrow();
  });

  it("validates before writes and after reads", async () => {
    const { repositories } = await make_repositories();
    const record = business_record(IDS.first, { provider_id: "sd_webui" });

    await expect(
      repositories.provider_profiles.put(NAMESPACE, {
        ...record,
        payload: { api_key: "must not persist" },
      }),
    ).rejects.toThrow();
    await expect(
      repositories.provider_profiles.put(NAMESPACE, {
        ...record,
        record_key: `${OTHER_NAMESPACE}:${record.id}`,
      }),
    ).rejects.toThrow();
    await expect(
      repositories.provider_profiles.put(NAMESPACE, {
        ...record,
        created_at: "invalid",
      }),
    ).rejects.toThrow();

    const database = await open_database();
    await database.put("provider_profiles", record);
    await database.put("provider_profiles", {
      ...record,
      namespace: OTHER_NAMESPACE,
      record_key: record.record_key,
    });
    await expect(repositories.provider_profiles.get(NAMESPACE, IDS.first)).rejects.toThrow();
  });
  it("rejects an explicitly undefined generic payload", async () => {
    const { repositories } = await make_repositories();
    const record = business_record(IDS.first, { provider_id: "sd_webui" });

    await expect(
      repositories.provider_profiles.put(NAMESPACE, {
        ...record,
        payload: undefined,
      } as unknown as typeof record),
    ).rejects.toThrow();
    expect(await repositories.provider_profiles.get(NAMESPACE, IDS.first)).toBeNull();
  });


  it("does not leak mutable caller or stored objects", async () => {
    const { repositories } = await make_repositories();
    const record = business_record(IDS.first, { provider_id: "sd_webui" });
    await repositories.provider_profiles.put(NAMESPACE, record);

    (record.payload as { value: string }).value = "caller mutation";
    const loaded = await repositories.provider_profiles.get(NAMESPACE, IDS.first);
    expect(loaded?.payload).toEqual({ value: IDS.first });

    if (loaded) {
      (loaded.payload as { value: string }).value = "read mutation";
    }
    expect((await repositories.provider_profiles.get(NAMESPACE, IDS.first))?.payload).toEqual({
      value: IDS.first,
    });
  });

  it("uses one transaction for cross-store rollback", async () => {
    const database = await open_database();
    const { repositories } = await make_repositories();
    const provider = business_record(IDS.first, { provider_id: "sd_webui" });
    const image = image_record(IDS.second);

    await expect(
      with_transaction(
        database,
        ["provider_profiles", "image_records"],
        async (transaction) => {
          await repositories.provider_profiles.create(NAMESPACE, provider, transaction);
          await repositories.image_records.create(NAMESPACE, image, transaction);
          throw new Error("rollback");
        },
      ),
    ).rejects.toThrow("rollback");

    expect(await repositories.provider_profiles.get(NAMESPACE, IDS.first)).toBeNull();
    expect(await repositories.image_records.get(NAMESPACE, IDS.second)).toBeNull();
  });
});

describe("all business stores", () => {
  it("exposes repositories for every v1 business store", async () => {
    const database = await open_database();
    const repositories = create_business_repositories(database);
    const names: (keyof BusinessRepositories)[] = [
      "provider_profiles",
      "prompt_presets",
      "comfy_workflows",
      "novelai_vibes",
      "character_profiles",
      "regex_rules",
      "knowledge_entries",
      "vocabularies",
      "vocabulary_groups",
      "vocabulary_packages",
      "vocabulary_shards",
      "image_records",
    ];
    expect(names.every((name) => name in repositories)).toBe(true);
  });

  it.each([
    ["prompt_presets", { payload: { text: "prompt" } }],
    ["comfy_workflows", { payload: { nodes: [] } }],
    ["novelai_vibes", { payload: { vibe: "soft" } }],
    ["character_profiles", { payload: { name: "A" } }],
    ["regex_rules", { payload: { pattern: "x", replacement: "y" } }],
    ["knowledge_entries", { source_type: "chat", payload: { text: "entry" } }],
    ["vocabularies", { payload: { terms: [] } }],
    ["vocabulary_groups", { vocabulary_id: IDS.first, payload: { name: "group" } }],
    ["vocabulary_packages", { data_version: 1, state: "ready", payload: { entries: 1 } }],
    ["vocabulary_shards", { data_version: 1, kind: "terms", payload: { items: [] } }],
  ] as const)("round-trips %s", async (name, fields) => {
    const { repositories } = await make_repositories();
    const record = business_record(IDS.first, fields);
    const repository = repositories[name];
    await repository.put(NAMESPACE, record as never);
    expect(await repository.get(NAMESPACE, IDS.first)).toEqual(record);
  });

  it("enforces image record fields and image blob metadata", async () => {
    const { repositories } = await make_repositories();
    const image = image_record(IDS.first);
    await repositories.image_records.put(NAMESPACE, image);
    expect(await repositories.image_records.get(NAMESPACE, IDS.first)).toEqual(image);

    const image_blob: ImageBlobRecord = {
      sha256: "a".repeat(64),
      ref_count: 1,
      byte_length: 3,
      blob: new Blob(["abc"], { type: "image/png" }),
    };
    await repositories.image_blobs.put(image_blob);
    expect(await repositories.image_blobs.get(image_blob.sha256)).toMatchObject({
      sha256: image_blob.sha256,
      ref_count: 1,
      byte_length: 3,
    });
  });

  it("supports migration journal values", async () => {
    const { repositories } = await make_repositories();
    const journal: MigrationJournalRecord = {
      migration_id: "migration-1",
      source_version: 2,
      state: "running",
      updated_at: NOW,
      payload: { copied: 0 },
    };
    await repositories.migration_journal.put(journal);
    expect(await repositories.migration_journal.get(journal.migration_id)).toEqual(journal);
  });
});

describe("generation job repository", () => {
  it("round-trips a validated generation job and rejects malformed indexes", async () => {
    const database = await open_database();
    const repository = new GenerationJobRepository(database);
    const record = job_record();

    await repository.create(NAMESPACE, record);
    expect(await repository.get(NAMESPACE, record.id)).toEqual(record);
    expect((await repository.list(NAMESPACE)).map((item) => item.id)).toEqual([record.id]);
    await expect(repository.create(NAMESPACE, record)).rejects.toThrow();
    await repository.delete(NAMESPACE, record.id);
    expect(await repository.get(NAMESPACE, record.id)).toBeNull();

    await expect(
      repository.put(NAMESPACE, { ...record, request_digest: "invalid" }),
    ).rejects.toThrow();
  });
});
