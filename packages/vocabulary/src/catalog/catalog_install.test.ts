import "fake-indexeddb/auto";

import { encode } from "@msgpack/msgpack";
import { sha256 } from "@noble/hashes/sha2.js";
import { bytesToHex } from "@noble/hashes/utils.js";
import { deleteDB } from "idb";
import { afterEach, describe, expect, it } from "vitest";

import type {
  VocabularyCatalogEntry,
  VocabularyManifest,
  VocabularyShardEntry,
} from "@tavern-canvas/contracts";
import {
  DATABASE_NAME,
  dispose_database,
  open_database,
  type StorageDatabase,
} from "@tavern-canvas/storage";

import { VocabularyPackageStore } from "../package_store.js";
import {
  CatalogInstallError,
  install_catalog_entry,
  type CatalogInstallProgress,
} from "./catalog_install.js";

const NAMESPACE = "primary";
const CURRENT_EXTENSION_VERSION = "3.5.0";
const BASE_URL = "https://updates.example.com/packages/tavern-canvas-full-zh/";

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

interface ShardSpec {
  readonly shard_id: string;
  readonly path: string;
  readonly kind: VocabularyShardEntry["kind"];
  readonly value: unknown;
}

interface BuiltInstallable {
  readonly entry: VocabularyCatalogEntry;
  readonly manifest_bytes: Uint8Array;
  readonly files: ReadonlyMap<string, Uint8Array>;
}

async function build_installable(
  package_id: string,
  data_version: string,
  specs: readonly ShardSpec[],
): Promise<BuiltInstallable> {
  const files = new Map<string, Uint8Array>();
  const shards: VocabularyShardEntry[] = [];
  for (const spec of specs) {
    const bytes = await gzip(encode(spec.value));
    files.set(spec.path, bytes);
    shards.push({
      shard_id: spec.shard_id,
      package_id,
      kind: spec.kind,
      path: spec.path,
      sha256: sha256_hex(bytes),
      byte_length: bytes.byteLength,
    });
  }
  const manifest: VocabularyManifest = {
    package_id,
    schema_version: 1,
    data_version,
    changelog: `release ${data_version}`,
    record_count: specs.length,
    compressed_size: shards.reduce((total, shard) => total + shard.byte_length, 0),
    minimum_extension_version: "3.0.0",
    shards,
  };
  const manifest_bytes = new TextEncoder().encode(JSON.stringify(manifest));
  files.set("manifest.json", manifest_bytes);

  const entry: VocabularyCatalogEntry = {
    package_id,
    display_name: { en: "Full Vocabulary", "zh-CN": "完整词汇表" },
    description: { en: "Everything.", "zh-CN": "全部内容。" },
    data_version,
    record_count: specs.length,
    compressed_bytes: manifest.compressed_size,
    manifest_sha256: sha256_hex(manifest_bytes),
    languages: ["en", "zh-CN"],
    min_extension_version: "3.0.0",
    base_url: BASE_URL,
    bundled: false,
    updated_at: "2026-08-06T18:36:34.789Z",
  };

  return { entry, manifest_bytes, files };
}

interface FakeFetchOptions {
  readonly abort_on_path?: { readonly suffix: string; readonly controller: AbortController };
}

function request_url(input: RequestInfo | URL): string {
  if (input instanceof URL) {
    return input.href;
  }
  if (typeof input === "string") {
    return input;
  }
  return input.url;
}

function create_fake_fetch(
  built: BuiltInstallable,
  options: FakeFetchOptions = {},
): { fetch_impl: typeof fetch; requested_paths: string[] } {
  const requested_paths: string[] = [];
  const fetch_impl = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = request_url(input);
    if (!url.startsWith(BASE_URL)) {
      return new Response(null, { status: 404 });
    }
    const relative_path = url.slice(BASE_URL.length);
    requested_paths.push(relative_path);

    if (options.abort_on_path?.suffix === relative_path) {
      options.abort_on_path.controller.abort();
    }
    if (init?.signal?.aborted === true) {
      throw new DOMException("aborted", "AbortError");
    }

    const bytes = built.files.get(relative_path);
    if (bytes === undefined) {
      return new Response(null, { status: 404 });
    }
    return new Response(new Uint8Array(bytes));
  }) as unknown as typeof fetch;
  return { fetch_impl, requested_paths };
}

async function seed_confirmed_package(
  database: StorageDatabase,
  built: BuiltInstallable,
): Promise<void> {
  const manifest = JSON.parse(new TextDecoder().decode(built.manifest_bytes)) as VocabularyManifest;
  const store = new VocabularyPackageStore(database, NAMESPACE);
  const staged = await store.create_staging_package(manifest);
  for (const shard of manifest.shards) {
    const bytes = built.files.get(shard.path);
    if (bytes === undefined) {
      throw new Error(`missing seed bytes for ${shard.path}`);
    }
    await store.put_shard_content(staged, shard, bytes);
  }
  await store.mark_ready(staged.record_id);
  await store.activate(staged.record_id);
  await store.confirm(staged.record_id);
}

async function close_test_database(): Promise<void> {
  await dispose_database();
  await deleteDB(DATABASE_NAME);
}

afterEach(async () => {
  await close_test_database();
});

describe("install_catalog_entry", () => {
  it("downloads, verifies, and activates a package from an in-memory fake source", async () => {
    const database = await open_database();
    const built = await build_installable("tavern-canvas-full-zh", "1.0.0", [
      {
        shard_id: "prefix-aa",
        path: "shards/prefix-aa.msgpack.gz",
        kind: "prefix",
        value: { kind: "prefix", entries: [] },
      },
    ]);
    const { fetch_impl } = create_fake_fetch(built);
    const progress_events: CatalogInstallProgress[] = [];

    const result = await install_catalog_entry(built.entry, {
      database,
      namespace: NAMESPACE,
      current_extension_version: CURRENT_EXTENSION_VERSION,
      fetch_impl,
      on_progress: (progress) => progress_events.push(progress),
    });

    expect(result).toMatchObject({ outcome: "updated", data_version: "1.0.0" });
    expect(progress_events[0]).toEqual({ phase: "verifying_catalog_manifest" });
    expect(progress_events.some((event) => event.phase === "complete")).toBe(true);

    const store = new VocabularyPackageStore(database, NAMESPACE);
    const active = await store.find_active_or_confirmed();
    expect(active?.manifest.package_id).toBe("tavern-canvas-full-zh");
    expect(active?.state).toBe("active");
  });

  it("rejects with CatalogInstallError, reason manifest_hash_mismatch, when the catalog's manifest_sha256 disagrees with the fetched manifest, and stages nothing", async () => {
    const database = await open_database();
    const built = await build_installable("tavern-canvas-full-zh", "1.0.0", [
      {
        shard_id: "prefix-aa",
        path: "shards/prefix-aa.msgpack.gz",
        kind: "prefix",
        value: { kind: "prefix", entries: [] },
      },
    ]);
    const tampered_entry: VocabularyCatalogEntry = {
      ...built.entry,
      manifest_sha256: "0".repeat(64),
    };
    const { fetch_impl } = create_fake_fetch(built);

    const failure = install_catalog_entry(tampered_entry, {
      database,
      namespace: NAMESPACE,
      current_extension_version: CURRENT_EXTENSION_VERSION,
      fetch_impl,
    });
    await expect(failure).rejects.toBeInstanceOf(CatalogInstallError);
    await expect(failure).rejects.toMatchObject({ reason: "manifest_hash_mismatch" });

    const store = new VocabularyPackageStore(database, NAMESPACE);
    expect(await store.list_packages()).toHaveLength(0);
  });

  it("rejects with reason package_id_mismatch when the fetched manifest declares a different package_id", async () => {
    const database = await open_database();
    const built = await build_installable("tavern-canvas-full-zh", "1.0.0", [
      {
        shard_id: "prefix-aa",
        path: "shards/prefix-aa.msgpack.gz",
        kind: "prefix",
        value: { kind: "prefix", entries: [] },
      },
    ]);
    const relabelled_entry: VocabularyCatalogEntry = {
      ...built.entry,
      package_id: "tavern-canvas-baseline",
    };
    const { fetch_impl } = create_fake_fetch(built);

    // manifest_sha256 is left untouched, so the served bytes still hash-match -- this exercises
    // the package_id cross-check specifically, once the hash check has already passed.
    await expect(
      install_catalog_entry(relabelled_entry, {
        database,
        namespace: NAMESPACE,
        current_extension_version: CURRENT_EXTENSION_VERSION,
        fetch_impl,
      }),
    ).rejects.toMatchObject({ reason: "package_id_mismatch" });
  });

  it("rejects with reason data_version_mismatch when the fetched manifest declares a different data_version", async () => {
    const database = await open_database();
    const built = await build_installable("tavern-canvas-full-zh", "1.0.0", [
      {
        shard_id: "prefix-aa",
        path: "shards/prefix-aa.msgpack.gz",
        kind: "prefix",
        value: { kind: "prefix", entries: [] },
      },
    ]);
    const relabelled_entry: VocabularyCatalogEntry = { ...built.entry, data_version: "9.9.9" };
    const { fetch_impl } = create_fake_fetch(built);

    // manifest_sha256 is left untouched, so the served bytes still hash-match and the
    // package_id check passes too -- this exercises the data_version cross-check specifically.
    await expect(
      install_catalog_entry(relabelled_entry, {
        database,
        namespace: NAMESPACE,
        current_extension_version: CURRENT_EXTENSION_VERSION,
        fetch_impl,
      }),
    ).rejects.toMatchObject({ reason: "data_version_mismatch" });
  });

  it("leaves the prior active package intact when the install is cancelled mid-download", async () => {
    const database = await open_database();
    const v1 = await build_installable("tavern-canvas-full-zh", "1.0.0", [
      {
        shard_id: "prefix-aa",
        path: "shards/prefix-aa.msgpack.gz",
        kind: "prefix",
        value: { kind: "prefix", entries: [] },
      },
    ]);
    await seed_confirmed_package(database, v1);

    const v2 = await build_installable("tavern-canvas-full-zh", "1.1.0", [
      {
        shard_id: "prefix-aa",
        path: "shards/prefix-aa.msgpack.gz",
        kind: "prefix",
        value: { kind: "prefix", entries: [["new", 1, 1]] },
      },
      {
        shard_id: "prefix-ab",
        path: "shards/prefix-ab.msgpack.gz",
        kind: "prefix",
        value: { kind: "prefix", entries: [["also-new", 2, 2]] },
      },
    ]);
    const controller = new AbortController();
    const { fetch_impl } = create_fake_fetch(v2, {
      abort_on_path: { suffix: "shards/prefix-aa.msgpack.gz", controller },
    });

    await expect(
      install_catalog_entry(v2.entry, {
        database,
        namespace: NAMESPACE,
        current_extension_version: CURRENT_EXTENSION_VERSION,
        fetch_impl,
        signal: controller.signal,
      }),
    ).rejects.toThrow();

    const store = new VocabularyPackageStore(database, NAMESPACE);
    const active = await store.find_active_or_confirmed();
    expect(active?.manifest.data_version).toBe("1.0.0");
    expect(await store.list_packages()).toHaveLength(1);
  });

  it("throws before touching storage when cancelled before the manifest fetch resolves", async () => {
    const database = await open_database();
    const v1 = await build_installable("tavern-canvas-full-zh", "1.0.0", [
      {
        shard_id: "prefix-aa",
        path: "shards/prefix-aa.msgpack.gz",
        kind: "prefix",
        value: { kind: "prefix", entries: [] },
      },
    ]);
    await seed_confirmed_package(database, v1);

    const v2 = await build_installable("tavern-canvas-full-zh", "1.1.0", [
      {
        shard_id: "prefix-aa",
        path: "shards/prefix-aa.msgpack.gz",
        kind: "prefix",
        value: { kind: "prefix", entries: [["new", 1, 1]] },
      },
    ]);
    const controller = new AbortController();
    controller.abort();
    const { fetch_impl } = create_fake_fetch(v2);

    await expect(
      install_catalog_entry(v2.entry, {
        database,
        namespace: NAMESPACE,
        current_extension_version: CURRENT_EXTENSION_VERSION,
        fetch_impl,
        signal: controller.signal,
      }),
    ).rejects.toThrow();

    const store = new VocabularyPackageStore(database, NAMESPACE);
    const active = await store.find_active_or_confirmed();
    expect(active?.manifest.data_version).toBe("1.0.0");
    expect(await store.list_packages()).toHaveLength(1);
  });
});
