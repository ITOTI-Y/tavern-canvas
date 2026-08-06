import "fake-indexeddb/auto";

import { encode } from "@msgpack/msgpack";
import { sha256 } from "@noble/hashes/sha2.js";
import { bytesToHex } from "@noble/hashes/utils.js";
import { deleteDB } from "idb";
import { afterEach, describe, expect, it } from "vitest";

import type { VocabularyManifest, VocabularyShardEntry } from "@tavern-canvas/contracts";
import {
  DATABASE_NAME,
  dispose_database,
  open_database,
  VocabularyPackageRepository,
  VocabularyShardRepository,
  type StorageDatabase,
} from "@tavern-canvas/storage";

import type { DownloadProgress, FetchShardOptions, PackageClient } from "./package_client.js";
import { VocabularyPackageStore, type StoredVocabularyPackage } from "./package_store.js";
import { PackageUpdater, type PackageUpdateProgress } from "./package_updater.js";

const NAMESPACE = "primary";
const CURRENT_EXTENSION_VERSION = "3.5.0";

async function gzip(bytes: Uint8Array): Promise<Uint8Array> {
  const body = new Response(new Uint8Array(bytes)).body;
  if (body === null) {
    throw new Error("no body");
  }
  const stream = body.pipeThrough(new CompressionStream("gzip"));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

function sha256_hex(bytes: Uint8Array): string {
  return bytesToHex(sha256(bytes));
}

function require_bytes(map: ReadonlyMap<string, Uint8Array>, path: string): Uint8Array {
  const bytes = map.get(path);
  if (bytes === undefined) {
    throw new Error(`missing bytes for path: ${path}`);
  }
  return bytes;
}

function require_entry(
  entries: readonly VocabularyShardEntry[],
  path: string,
): VocabularyShardEntry {
  const entry = entries.find((candidate) => candidate.path === path);
  if (entry === undefined) {
    throw new Error(`missing shard entry for path: ${path}`);
  }
  return entry;
}

interface ShardSpec {
  readonly shard_id: string;
  readonly path: string;
  readonly kind: VocabularyShardEntry["kind"];
  readonly value: unknown;
}

interface BuiltPackage {
  readonly manifest: VocabularyManifest;
  readonly shard_bytes: ReadonlyMap<string, Uint8Array>;
}

async function build_package(
  package_id: string,
  data_version: string,
  specs: readonly ShardSpec[],
): Promise<BuiltPackage> {
  const shard_bytes = new Map<string, Uint8Array>();
  const shards: VocabularyShardEntry[] = [];
  for (const spec of specs) {
    const bytes = await gzip(encode(spec.value));
    shard_bytes.set(spec.path, bytes);
    shards.push({
      shard_id: spec.shard_id,
      package_id,
      kind: spec.kind,
      path: spec.path,
      sha256: sha256_hex(bytes),
      byte_length: bytes.byteLength,
    });
  }
  return {
    manifest: {
      package_id,
      schema_version: 1,
      data_version,
      changelog: `release ${data_version}`,
      record_count: specs.length,
      compressed_size: shards.reduce((total, shard) => total + shard.byte_length, 0),
      minimum_extension_version: "3.0.0",
      shards,
    },
    shard_bytes,
  };
}

interface FakeClientOptions {
  readonly on_fetch_shard?: (path: string) => void | Promise<void>;
  readonly fail_shard_path?: string;
  readonly abort_on_shard_path?: { readonly path: string; readonly controller: AbortController };
  readonly delay_ms?: number;
}

function create_fake_client(
  built: BuiltPackage,
  options: FakeClientOptions = {},
): {
  client: PackageClient;
  fetched_paths: string[];
} {
  const fetched_paths: string[] = [];
  const delay = (ms: number): Promise<void> =>
    ms <= 0 ? Promise.resolve() : new Promise((resolve) => setTimeout(resolve, ms));

  const client: PackageClient = {
    async fetch_manifest() {
      await delay(options.delay_ms ?? 0);
      return built.manifest;
    },
    async fetch_shard_bytes(path: string, fetch_options: FetchShardOptions) {
      fetched_paths.push(path);
      await options.on_fetch_shard?.(path);
      await delay(options.delay_ms ?? 0);

      if (options.abort_on_shard_path?.path === path) {
        options.abort_on_shard_path.controller.abort();
      }
      if (fetch_options.signal?.aborted === true) {
        throw new DOMException("aborted", "AbortError");
      }

      if (options.fail_shard_path === path) {
        // Simulate a corrupted/tampered download: bytes that will not match the manifest's hash.
        return new TextEncoder().encode("not the right bytes at all");
      }

      const bytes = built.shard_bytes.get(path);
      if (bytes === undefined) {
        throw new Error(`fake client has no bytes for path: ${path}`);
      }
      const progress: DownloadProgress = {
        downloaded_bytes: bytes.byteLength,
        total_bytes: bytes.byteLength,
      };
      fetch_options.on_progress?.(progress);
      return bytes;
    },
  };
  return { client, fetched_paths };
}

async function seed_confirmed_package(
  database: StorageDatabase,
  built: BuiltPackage,
): Promise<StoredVocabularyPackage> {
  const store = new VocabularyPackageStore(database, NAMESPACE);
  const staged = await store.create_staging_package(built.manifest);
  for (const entry of built.manifest.shards) {
    const bytes = built.shard_bytes.get(entry.path);
    if (bytes === undefined) {
      throw new Error(`missing seed bytes for ${entry.path}`);
    }
    await store.put_shard_content(staged, entry, bytes);
  }
  await store.mark_ready(staged.record_id);
  await store.activate(staged.record_id);
  await store.confirm(staged.record_id);
  const active = await store.find_active_or_confirmed();
  if (active === null) {
    throw new Error("seeding failed to produce an active package");
  }
  return active;
}

async function close_test_database(): Promise<void> {
  await dispose_database();
  await deleteDB(DATABASE_NAME);
}

afterEach(async () => {
  await close_test_database();
});

describe("PackageUpdater.update", () => {
  it("does not update when the active package's data_version and shard hashes already match remote", async () => {
    const database = await open_database();
    const built = await build_package("baseline", "1.0.0", [
      {
        shard_id: "prefix-aa",
        path: "shards/prefix-aa.msgpack.gz",
        kind: "prefix",
        entries: [],
      } as never,
    ]);
    await seed_confirmed_package(database, built);

    const { client, fetched_paths } = create_fake_client(built);
    const updater = new PackageUpdater({
      database,
      namespace: NAMESPACE,
      client,
      current_extension_version: CURRENT_EXTENSION_VERSION,
    });

    const result = await updater.update();

    expect(result).toEqual({ outcome: "up_to_date", data_version: "1.0.0" });
    expect(fetched_paths).toEqual([]);
  });

  it("downloads only shards whose hash changed, and copies unchanged shards without a network request", async () => {
    const database = await open_database();
    const unchanged_spec: ShardSpec = {
      shard_id: "prefix-aa",
      path: "shards/prefix-aa.msgpack.gz",
      kind: "prefix",
      value: { kind: "prefix", entries: [["aa", 1, 5]] },
    };
    const old_changed_spec: ShardSpec = {
      shard_id: "prefix-ab",
      path: "shards/prefix-ab.msgpack.gz",
      kind: "prefix",
      value: { kind: "prefix", entries: [["ab", 2, 3]] },
    };
    const v1 = await build_package("baseline", "1.0.0", [unchanged_spec, old_changed_spec]);
    await seed_confirmed_package(database, v1);

    const new_changed_spec: ShardSpec = {
      ...old_changed_spec,
      value: { kind: "prefix", entries: [["ab", 2, 99]] },
    };
    const v2 = await build_package("baseline", "1.1.0", [unchanged_spec, new_changed_spec]);
    const { client, fetched_paths } = create_fake_client(v2);

    const updater = new PackageUpdater({
      database,
      namespace: NAMESPACE,
      client,
      current_extension_version: CURRENT_EXTENSION_VERSION,
    });
    const result = await updater.update();

    expect(result).toMatchObject({ outcome: "updated", data_version: "1.1.0" });
    expect(fetched_paths).toEqual([old_changed_spec.path]);

    const store = new VocabularyPackageStore(database, NAMESPACE);
    const unchanged_bytes = await store.shard_bytes(unchanged_spec.path);
    expect(bytesToHex(sha256(unchanged_bytes))).toBe(
      sha256_hex(require_bytes(v1.shard_bytes, unchanged_spec.path)),
    );
  });

  it("stages every download under a fresh staging package record before it becomes active", async () => {
    const database = await open_database();
    const spec: ShardSpec = {
      shard_id: "prefix-aa",
      path: "shards/prefix-aa.msgpack.gz",
      kind: "prefix",
      value: { kind: "prefix", entries: [] },
    };
    const v1 = await build_package("baseline", "1.0.0", [spec]);
    const old_active = await seed_confirmed_package(database, v1);

    const v2 = await build_package("baseline", "1.1.0", [
      { ...spec, value: { kind: "prefix", entries: [["zz", 9, 9]] } },
    ]);

    const package_repository = new VocabularyPackageRepository(database);
    const shard_repository = new VocabularyShardRepository(database);
    let observed_staging_id: string | undefined;

    const { client } = create_fake_client(v2, {
      on_fetch_shard: async () => {
        const records = await package_repository.list(NAMESPACE);
        const staging_record = records.find((record) => record.state === "staging");
        expect(staging_record).toBeDefined();
        expect(staging_record?.id).not.toBe(old_active.record_id);
        observed_staging_id = staging_record?.id;
      },
    });

    const updater = new PackageUpdater({
      database,
      namespace: NAMESPACE,
      client,
      current_extension_version: CURRENT_EXTENSION_VERSION,
    });
    await updater.update();

    expect(observed_staging_id).toBeDefined();
    const shard_records = await shard_repository.list(NAMESPACE);
    const staged_shard = shard_records.find(
      (record) =>
        typeof record.payload === "object" &&
        record.payload !== null &&
        !Array.isArray(record.payload) &&
        (record.payload as Record<string, unknown>).package_record_id === observed_staging_id,
    );
    expect(staged_shard).toBeDefined();
  });

  it("keeps the old active version when the update is interrupted mid-download", async () => {
    const database = await open_database();
    const spec: ShardSpec = {
      shard_id: "prefix-aa",
      path: "shards/prefix-aa.msgpack.gz",
      kind: "prefix",
      value: { kind: "prefix", entries: [] },
    };
    const other_spec: ShardSpec = {
      shard_id: "prefix-ab",
      path: "shards/prefix-ab.msgpack.gz",
      kind: "prefix",
      value: { kind: "prefix", entries: [["a", 1, 1]] },
    };
    const v1 = await build_package("baseline", "1.0.0", [spec, other_spec]);
    await seed_confirmed_package(database, v1);

    const v2 = await build_package("baseline", "1.1.0", [
      { ...spec, value: { kind: "prefix", entries: [["new", 5, 5]] } },
      { ...other_spec, value: { kind: "prefix", entries: [["also-new", 6, 6]] } },
    ]);

    const controller = new AbortController();
    const { client } = create_fake_client(v2, {
      abort_on_shard_path: { path: spec.path, controller },
    });

    const updater = new PackageUpdater({
      database,
      namespace: NAMESPACE,
      client,
      current_extension_version: CURRENT_EXTENSION_VERSION,
    });

    await expect(updater.update(controller.signal)).rejects.toThrow();

    const store = new VocabularyPackageStore(database, NAMESPACE);
    const active = await store.find_active_or_confirmed();
    expect(active?.manifest.data_version).toBe("1.0.0");

    const package_repository = new VocabularyPackageRepository(database);
    const remaining = await package_repository.list(NAMESPACE);
    expect(remaining).toHaveLength(1);
  });

  it("keeps the old active version when one downloaded shard fails verification", async () => {
    const database = await open_database();
    const spec: ShardSpec = {
      shard_id: "prefix-aa",
      path: "shards/prefix-aa.msgpack.gz",
      kind: "prefix",
      value: { kind: "prefix", entries: [] },
    };
    const v1 = await build_package("baseline", "1.0.0", [spec]);
    await seed_confirmed_package(database, v1);

    const v2 = await build_package("baseline", "1.1.0", [
      { ...spec, value: { kind: "prefix", entries: [["new", 5, 5]] } },
    ]);
    const { client } = create_fake_client(v2, { fail_shard_path: spec.path });

    const updater = new PackageUpdater({
      database,
      namespace: NAMESPACE,
      client,
      current_extension_version: CURRENT_EXTENSION_VERSION,
    });

    await expect(updater.update()).rejects.toThrow();

    const store = new VocabularyPackageStore(database, NAMESPACE);
    const active = await store.find_active_or_confirmed();
    expect(active?.manifest.data_version).toBe("1.0.0");
    expect(active?.state).toBe("confirmed");

    const package_repository = new VocabularyPackageRepository(database);
    expect(await package_repository.list(NAMESPACE)).toHaveLength(1);
  });
});

describe("VocabularyPackageStore lifecycle primitives", () => {
  it("mark_ready sets ready without deleting or altering the old active version", async () => {
    const database = await open_database();
    const spec: ShardSpec = {
      shard_id: "prefix-aa",
      path: "shards/prefix-aa.msgpack.gz",
      kind: "prefix",
      value: { kind: "prefix", entries: [] },
    };
    const v1 = await build_package("baseline", "1.0.0", [spec]);
    await seed_confirmed_package(database, v1);

    const v2 = await build_package("baseline", "1.1.0", [
      { ...spec, value: { kind: "prefix", entries: [["new", 5, 5]] } },
    ]);
    const store = new VocabularyPackageStore(database, NAMESPACE);
    const staged = await store.create_staging_package(v2.manifest);
    for (const entry of v2.manifest.shards) {
      await store.put_shard_content(staged, entry, require_bytes(v2.shard_bytes, entry.path));
    }
    await store.mark_ready(staged.record_id);

    const records = await store.list_packages();
    const ready_record = records.find((record) => record.record_id === staged.record_id);
    expect(ready_record?.state).toBe("ready");

    const old_record = records.find((record) => record.manifest.data_version === "1.0.0");
    expect(old_record?.state).toBe("confirmed");

    const active = await store.find_active_or_confirmed();
    expect(active?.manifest.data_version).toBe("1.0.0");
  });

  it("activate() flips the pointer atomically: a failed activation leaves the old active record untouched", async () => {
    const database = await open_database();
    const spec: ShardSpec = {
      shard_id: "prefix-aa",
      path: "shards/prefix-aa.msgpack.gz",
      kind: "prefix",
      value: { kind: "prefix", entries: [] },
    };
    const v1 = await build_package("baseline", "1.0.0", [spec]);
    const old_active = await seed_confirmed_package(database, v1);

    const store = new VocabularyPackageStore(database, NAMESPACE);
    await expect(store.activate("00000000-0000-4000-8000-000000000000")).rejects.toThrow();

    const records = await store.list_packages();
    const still_old = records.find((record) => record.record_id === old_active.record_id);
    expect(still_old?.state).toBe("confirmed");
    expect(
      records.filter((record) => record.state === "active" || record.state === "confirmed"),
    ).toHaveLength(1);
  });

  it("activate() supersedes the previously active/confirmed record in one transaction", async () => {
    const database = await open_database();
    const spec: ShardSpec = {
      shard_id: "prefix-aa",
      path: "shards/prefix-aa.msgpack.gz",
      kind: "prefix",
      value: { kind: "prefix", entries: [] },
    };
    const v1 = await build_package("baseline", "1.0.0", [spec]);
    const old_active = await seed_confirmed_package(database, v1);

    const v2 = await build_package("baseline", "1.1.0", [
      { ...spec, value: { kind: "prefix", entries: [["new", 5, 5]] } },
    ]);
    const store = new VocabularyPackageStore(database, NAMESPACE);
    const staged = await store.create_staging_package(v2.manifest);
    for (const entry of v2.manifest.shards) {
      await store.put_shard_content(staged, entry, require_bytes(v2.shard_bytes, entry.path));
    }
    await store.mark_ready(staged.record_id);
    const { superseded_id } = await store.activate(staged.record_id);

    expect(superseded_id).toBe(old_active.record_id);
    const records = await store.list_packages();
    const active_like = records.filter(
      (record) => record.state === "active" || record.state === "confirmed",
    );
    expect(active_like).toHaveLength(1);
    expect(active_like[0]?.record_id).toBe(staged.record_id);
    const old_record = records.find((record) => record.record_id === old_active.record_id);
    expect(old_record?.state).toBe("superseded");
  });
});

describe("PackageUpdater query confirmation lifecycle", () => {
  async function perform_update(
    database: StorageDatabase,
    v1: BuiltPackage,
    v2: BuiltPackage,
  ): Promise<{ old_active: StoredVocabularyPackage; updater: PackageUpdater }> {
    const old_active = await seed_confirmed_package(database, v1);
    const { client } = create_fake_client(v2);
    const updater = new PackageUpdater({
      database,
      namespace: NAMESPACE,
      client,
      current_extension_version: CURRENT_EXTENSION_VERSION,
    });
    await updater.update();
    return { old_active, updater };
  }

  it("keeps the old version present until the new version completes one successful query", async () => {
    const database = await open_database();
    const spec: ShardSpec = {
      shard_id: "prefix-aa",
      path: "shards/prefix-aa.msgpack.gz",
      kind: "prefix",
      value: { kind: "prefix", entries: [] },
    };
    const v1 = await build_package("baseline", "1.0.0", [spec]);
    const v2 = await build_package("baseline", "1.1.0", [
      { ...spec, value: { kind: "prefix", entries: [["new", 5, 5]] } },
    ]);
    const { old_active, updater } = await perform_update(database, v1, v2);

    const store = new VocabularyPackageStore(database, NAMESPACE);
    const before_confirm = await store.list_packages();
    const old_before = before_confirm.find((record) => record.record_id === old_active.record_id);
    expect(old_before?.state).toBe("superseded");
    const new_before = before_confirm.find((record) => record.manifest.data_version === "1.1.0");
    expect(new_before?.state).toBe("active");

    await updater.report_query_success();

    const after_confirm = await store.list_packages();
    const new_after = after_confirm.find((record) => record.manifest.data_version === "1.1.0");
    expect(new_after?.state).toBe("confirmed");
    const old_after = after_confirm.find((record) => record.record_id === old_active.record_id);
    expect(old_after?.state).toBe("superseded");
  });

  it("reselects the prior confirmed version when the first query against the new version fails", async () => {
    const database = await open_database();
    const spec: ShardSpec = {
      shard_id: "prefix-aa",
      path: "shards/prefix-aa.msgpack.gz",
      kind: "prefix",
      value: { kind: "prefix", entries: [] },
    };
    const v1 = await build_package("baseline", "1.0.0", [spec]);
    const v2 = await build_package("baseline", "1.1.0", [
      { ...spec, value: { kind: "prefix", entries: [["new", 5, 5]] } },
    ]);
    const { old_active, updater } = await perform_update(database, v1, v2);

    const reselected = await updater.report_query_failure();
    expect(reselected?.record_id).toBe(old_active.record_id);
    expect(reselected?.state).toBe("confirmed");

    const store = new VocabularyPackageStore(database, NAMESPACE);
    const active = await store.find_active_or_confirmed();
    expect(active?.record_id).toBe(old_active.record_id);
    expect(active?.manifest.data_version).toBe("1.0.0");

    const records = await store.list_packages();
    const failed_record = records.find((record) => record.manifest.data_version === "1.1.0");
    expect(failed_record?.state).toBe("failed");
  });
});

describe("PackageUpdater.cleanup", () => {
  it("removes only unpinned superseded/failed staging data, never active/confirmed/pinned/in-progress data", async () => {
    const database = await open_database();
    const spec: ShardSpec = {
      shard_id: "prefix-aa",
      path: "shards/prefix-aa.msgpack.gz",
      kind: "prefix",
      value: { kind: "prefix", entries: [] },
    };

    const confirmed = await build_package("baseline", "1.0.0", [spec]);
    const confirmed_record = await seed_confirmed_package(database, confirmed);

    const store = new VocabularyPackageStore(database, NAMESPACE);

    const superseded = await build_package("baseline", "0.9.0", [
      { ...spec, value: { kind: "prefix", entries: [["old", 1, 1]] } },
    ]);
    const superseded_staged = await store.create_staging_package(superseded.manifest);
    for (const entry of superseded.manifest.shards) {
      await store.put_shard_content(
        superseded_staged,
        entry,
        require_bytes(superseded.shard_bytes, entry.path),
      );
    }
    await store.mark_ready(superseded_staged.record_id);
    // Force it into "superseded" the same way activate() would: promote then immediately
    // supersede it by activating the already-confirmed baseline back on top.
    await store.activate(superseded_staged.record_id);
    await store.activate(confirmed_record.record_id);

    const pinned = await build_package("baseline", "0.8.0", [
      { ...spec, value: { kind: "prefix", entries: [["pinned", 2, 2]] } },
    ]);
    const pinned_staged = await store.create_staging_package(pinned.manifest);
    for (const entry of pinned.manifest.shards) {
      await store.put_shard_content(
        pinned_staged,
        entry,
        require_bytes(pinned.shard_bytes, entry.path),
      );
    }
    await store.mark_ready(pinned_staged.record_id);
    await store.activate(pinned_staged.record_id);
    await store.set_pinned(pinned_staged.record_id, true);
    await store.activate(confirmed_record.record_id);

    const abandoned_staging = await build_package("baseline", "1.2.0", [
      { ...spec, value: { kind: "prefix", entries: [["abandoned", 3, 3]] } },
    ]);
    const abandoned_staged = await store.create_staging_package(abandoned_staging.manifest);
    await store.put_shard_content(
      abandoned_staged,
      require_entry(abandoned_staging.manifest.shards, spec.path),
      require_bytes(abandoned_staging.shard_bytes, spec.path),
    );

    const { client } = create_fake_client(confirmed);
    const updater = new PackageUpdater({
      database,
      namespace: NAMESPACE,
      client,
      current_extension_version: CURRENT_EXTENSION_VERSION,
    });

    const { deleted_package_ids } = await updater.cleanup();

    expect(deleted_package_ids).toEqual([superseded_staged.record_id]);

    const remaining_ids = (await store.list_packages()).map((record) => record.record_id);
    expect(remaining_ids).toContain(confirmed_record.record_id);
    expect(remaining_ids).toContain(pinned_staged.record_id);
    expect(remaining_ids).toContain(abandoned_staged.record_id);
    expect(remaining_ids).not.toContain(superseded_staged.record_id);

    const package_repository = new VocabularyPackageRepository(database);
    const shard_repository = new VocabularyShardRepository(database);
    expect(await package_repository.get(NAMESPACE, superseded_staged.record_id)).toBeNull();
    const remaining_shards = await shard_repository.list(NAMESPACE);
    const still_has_superseded_shard = remaining_shards.some(
      (record) =>
        typeof record.payload === "object" &&
        record.payload !== null &&
        !Array.isArray(record.payload) &&
        (record.payload as Record<string, unknown>).package_record_id ===
          superseded_staged.record_id,
    );
    expect(still_has_superseded_shard).toBe(false);
  });
});

describe("PackageUpdater concurrency", () => {
  it("serializes concurrent update() calls under one lock instead of running them in parallel", async () => {
    const database = await open_database();
    const spec: ShardSpec = {
      shard_id: "prefix-aa",
      path: "shards/prefix-aa.msgpack.gz",
      kind: "prefix",
      value: { kind: "prefix", entries: [["a", 1, 1]] },
    };
    const built = await build_package("baseline", "1.0.0", [spec]);
    const { client } = create_fake_client(built, { delay_ms: 15 });

    let concurrent = 0;
    let max_concurrent = 0;
    const progress_events: PackageUpdateProgress[] = [];
    const terminal_phases = new Set(["complete", "up_to_date", "rolled_back"]);

    const instrumented_client: PackageClient = {
      async fetch_manifest(signal) {
        concurrent += 1;
        max_concurrent = Math.max(max_concurrent, concurrent);
        return client.fetch_manifest(signal);
      },
      fetch_shard_bytes: client.fetch_shard_bytes.bind(client),
    };

    const updater = new PackageUpdater({
      database,
      namespace: NAMESPACE,
      client: instrumented_client,
      current_extension_version: CURRENT_EXTENSION_VERSION,
      on_progress: (progress) => {
        progress_events.push(progress);
        if (terminal_phases.has(progress.phase)) {
          concurrent -= 1;
        }
      },
    });

    const [first, second] = await Promise.all([updater.update(), updater.update()]);

    expect(max_concurrent).toBe(1);
    expect(first.outcome).toBe("updated");
    expect(second.outcome).toBe("up_to_date");
  });
});
