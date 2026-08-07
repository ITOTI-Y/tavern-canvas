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
import { VocabularyPackageStore } from "@tavern-canvas/vocabulary";

import { CatalogInstallBusyError, VocabularyCatalogClient } from "./vocabulary_catalog_client.js";

const CURRENT_EXTENSION_VERSION = "3.5.0";
const BASE_URL = "https://updates.example.com/packages/tavern-canvas-full-zh/";
const BUNDLED_BASE_URL = "https://extension.local/vocabulary/baseline/";

async function gzip(bytes: Uint8Array): Promise<Uint8Array> {
  const body = new Response(new Uint8Array(bytes)).body;
  if (body === null) {
    throw new Error("no body");
  }
  return new Uint8Array(
    await new Response(body.pipeThrough(new CompressionStream("gzip"))).arrayBuffer(),
  );
}

function sha256_hex(bytes: Uint8Array): string {
  return bytesToHex(sha256(bytes));
}

async function build_installable(
  package_id: string,
  base_url: string,
  overrides: Partial<VocabularyCatalogEntry> = {},
): Promise<{ entry: VocabularyCatalogEntry; files: ReadonlyMap<string, Uint8Array> }> {
  const shard_bytes = await gzip(encode({ kind: "prefix", entries: [] }));
  const shard: VocabularyShardEntry = {
    shard_id: "prefix-aa",
    package_id,
    kind: "prefix",
    path: "shards/prefix-aa.msgpack.gz",
    sha256: sha256_hex(shard_bytes),
    byte_length: shard_bytes.byteLength,
  };
  const manifest: VocabularyManifest = {
    package_id,
    schema_version: 1,
    data_version: "1.0.0",
    changelog: "release 1.0.0",
    record_count: 1,
    compressed_size: shard.byte_length,
    minimum_extension_version: "3.0.0",
    shards: [shard],
  };
  const manifest_bytes = new TextEncoder().encode(JSON.stringify(manifest));
  const files = new Map<string, Uint8Array>([
    ["manifest.json", manifest_bytes],
    [shard.path, shard_bytes],
  ]);
  const entry: VocabularyCatalogEntry = {
    package_id,
    display_name: { en: "Full Vocabulary", "zh-CN": "完整词汇表" },
    description: { en: "Everything.", "zh-CN": "全部内容。" },
    data_version: "1.0.0",
    record_count: 1,
    compressed_bytes: manifest.compressed_size,
    manifest_sha256: sha256_hex(manifest_bytes),
    languages: ["en", "zh-CN"],
    min_extension_version: "3.0.0",
    base_url,
    bundled: false,
    updated_at: "2026-08-06T18:36:34.789Z",
    ...overrides,
  };
  return { entry, files };
}

interface FakeFetchOptions {
  readonly gate?: Promise<void>;
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
  files_by_base: ReadonlyMap<string, ReadonlyMap<string, Uint8Array>>,
  options: FakeFetchOptions = {},
): typeof fetch {
  return (async (input: RequestInfo | URL, init?: RequestInit) => {
    await options.gate;
    const url = request_url(input);
    if (init?.signal?.aborted === true) {
      throw new DOMException("aborted", "AbortError");
    }
    for (const [base_url, files] of files_by_base) {
      if (!url.startsWith(base_url)) {
        continue;
      }
      const bytes = files.get(url.slice(base_url.length));
      return bytes === undefined
        ? new Response(null, { status: 404 })
        : new Response(new Uint8Array(bytes));
    }
    return new Response(null, { status: 404 });
  }) as unknown as typeof fetch;
}

function catalog_response(entries: readonly VocabularyCatalogEntry[]): Response {
  return new Response(JSON.stringify(entries), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

async function close_test_database(): Promise<void> {
  await dispose_database();
  await deleteDB(DATABASE_NAME);
}

afterEach(async () => {
  await close_test_database();
});

describe("VocabularyCatalogClient.list", () => {
  it("returns only entries the running extension version satisfies", async () => {
    const { entry: supported } = await build_installable("tavern-canvas-full-zh", BASE_URL);
    const { entry: too_new } = await build_installable("tavern-canvas-baseline", BASE_URL, {
      min_extension_version: "9.0.0",
    });
    const fetch_impl = (async () =>
      catalog_response([supported, too_new])) as unknown as typeof fetch;

    const client = new VocabularyCatalogClient({
      current_extension_version: CURRENT_EXTENSION_VERSION,
      catalog_url: "https://updates.example.com/catalog.json",
      fetch_impl,
    });

    const entries = await client.list();
    expect(entries.map((candidate) => candidate.package_id)).toEqual(["tavern-canvas-full-zh"]);
  });
});

describe("VocabularyCatalogClient.install", () => {
  it("installs a non-bundled entry into the vocabulary namespace via the injected database factory", async () => {
    const { entry, files } = await build_installable("tavern-canvas-full-zh", BASE_URL);
    const fetch_impl = create_fake_fetch(new Map([[BASE_URL, files]]));

    let opened: StorageDatabase | undefined;
    const client = new VocabularyCatalogClient({
      current_extension_version: CURRENT_EXTENSION_VERSION,
      fetch_impl,
      open_database_impl: async () => {
        opened = await open_database();
        return opened;
      },
    });

    const progress_events: string[] = [];
    const result = await client.install(entry, (progress) => progress_events.push(progress.phase));

    expect(result).toMatchObject({ outcome: "updated", data_version: "1.0.0" });
    expect(progress_events[0]).toBe("verifying_catalog_manifest");
    expect(progress_events).toContain("complete");

    const store = new VocabularyPackageStore(opened as StorageDatabase, "vocabulary");
    const active = await store.find_active_or_confirmed();
    expect(active?.manifest.package_id).toBe("tavern-canvas-full-zh");
  });

  it("plans a bundled entry using the configured bundled_base_url", async () => {
    const { entry } = await build_installable("tavern-canvas-baseline", BASE_URL, {
      bundled: true,
      base_url: null,
    });
    const { files: bundled_files } = await build_installable(
      "tavern-canvas-baseline",
      BUNDLED_BASE_URL,
    );
    const fetch_impl = create_fake_fetch(new Map([[BUNDLED_BASE_URL, bundled_files]]));

    const client = new VocabularyCatalogClient({
      current_extension_version: CURRENT_EXTENSION_VERSION,
      fetch_impl,
      bundled_base_url: BUNDLED_BASE_URL,
    });

    const result = await client.install(entry);
    expect(result).toMatchObject({ outcome: "updated" });
  });

  it("rejects a second install() while one is already in flight with CatalogInstallBusyError", async () => {
    const { entry, files } = await build_installable("tavern-canvas-full-zh", BASE_URL);
    let release: () => void = () => undefined;
    const gate = new Promise<void>((resolve) => {
      release = resolve;
    });
    const fetch_impl = create_fake_fetch(new Map([[BASE_URL, files]]), { gate });

    const client = new VocabularyCatalogClient({
      current_extension_version: CURRENT_EXTENSION_VERSION,
      fetch_impl,
    });

    const first = client.install(entry);
    expect(client.installing).toBe(true);
    await expect(client.install(entry)).rejects.toBeInstanceOf(CatalogInstallBusyError);

    release();
    await expect(first).resolves.toMatchObject({ outcome: "updated" });
    expect(client.installing).toBe(false);
  });

  it("cancel() aborts the in-flight install and clears the busy state", async () => {
    const { entry, files } = await build_installable("tavern-canvas-full-zh", BASE_URL);
    let release: () => void = () => undefined;
    const gate = new Promise<void>((resolve) => {
      release = resolve;
    });
    const fetch_impl = create_fake_fetch(new Map([[BASE_URL, files]]), { gate });

    const client = new VocabularyCatalogClient({
      current_extension_version: CURRENT_EXTENSION_VERSION,
      fetch_impl,
    });

    const install_promise = client.install(entry);
    client.cancel();
    release();

    await expect(install_promise).rejects.toThrow();
    expect(client.installing).toBe(false);
  });

  it("cancel() is a no-op when no install is in progress", () => {
    const client = new VocabularyCatalogClient({
      current_extension_version: CURRENT_EXTENSION_VERSION,
    });
    expect(() => client.cancel()).not.toThrow();
  });
});
