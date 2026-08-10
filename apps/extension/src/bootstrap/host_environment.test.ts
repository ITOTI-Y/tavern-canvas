// @vitest-environment node
import "fake-indexeddb/auto";

import { deleteDB } from "idb";
import { afterEach, describe, expect, it, vi } from "vitest";

import { create_legacy_image_resolver, create_legacy_source } from "./host_environment.js";

const LEGACY_DATABASE_NAMES = ["chatu8_gallery", "tupian", "chatu8_config_images"] as const;

function open_database(
  name: string,
  version: number,
  on_upgrade: (database: IDBDatabase) => void,
): Promise<void> {
  const { promise, resolve, reject } = Promise.withResolvers<void>();
  const request = indexedDB.open(name, version);
  request.onupgradeneeded = () => {
    on_upgrade(request.result);
  };
  request.onerror = () => {
    reject(request.error ?? new Error(`failed to open ${name}`));
  };
  request.onsuccess = () => {
    request.result.close();
    resolve();
  };
  return promise;
}

function put_values(
  name: string,
  values: readonly { readonly store: string; readonly key: string; readonly value: unknown }[],
): Promise<void> {
  const { promise, resolve, reject } = Promise.withResolvers<void>();
  const request = indexedDB.open(name);
  request.onerror = () => reject(request.error ?? new Error(`failed to open ${name}`));
  request.onsuccess = () => {
    const database = request.result;
    const transaction = database.transaction(
      [...new Set(values.map((entry) => entry.store))],
      "readwrite",
    );
    for (const entry of values) {
      transaction.objectStore(entry.store).put(entry.value, entry.key);
    }
    transaction.oncomplete = () => {
      database.close();
      resolve();
    };
    transaction.onerror = () => {
      database.close();
      reject(transaction.error ?? new Error(`failed to write ${name}`));
    };
  };
  return promise;
}

function host_globals(): {
  readonly globals: Record<string, unknown>;
  readonly settings: Record<string, unknown>;
} {
  const settings = { mode: "sd" };
  const context = {
    extensionSettings: { "st-chatu8": settings },
    saveSettingsDebounced: vi.fn(),
  };
  return {
    globals: {
      indexedDB,
      SillyTavern: { getContext: () => context },
      location: { href: "https://example.test/studio/", origin: "https://example.test" },
    },
    settings,
  };
}

afterEach(async () => {
  for (const name of LEGACY_DATABASE_NAMES) {
    await deleteDB(name);
  }
});

describe("create_legacy_source", () => {
  it("reads the v2 gallery stores into the archive fixture shape without embedding source objects", async () => {
    const image_bytes = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x01]);
    await open_database("chatu8_gallery", 6, (database) => {
      database.createObjectStore("tupianhuancun");
      database.createObjectStore("groups");
      database.createObjectStore("subgroups");
      database.createObjectStore("tags");
    });
    await put_values("chatu8_gallery", [
      {
        store: "tupianhuancun",
        key: "tag-snapshot",
        value: {
          "manual-tag": {
            images: [
              {
                uuid: "legacy-image-1",
                date: 1700000000000,
                isVideo: false,
                originalUrl: "",
                size: image_bytes.byteLength,
                thumbnail_size: 0,
              },
            ],
            index: 0,
            change: "manual-tag",
          },
        },
      },
      { store: "tupianhuancun", key: "legacy-image-1", value: image_bytes.buffer },
      {
        store: "groups",
        key: "manual-group",
        value: { id_index: "manual-group", fileName: "manual", name: "Manual" },
      },
      {
        store: "subgroups",
        key: "manual-subgroup",
        value: { id_index: "manual-subgroup", fileName: "manual", name: "Manual subgroup" },
      },
      { store: "tags", key: "manual-tag", value: { fileName: "manual", name: "manual-tag" } },
    ]);

    await open_database("chatu8_config_images", 2, (database) => {
      database.createObjectStore("config_images");
    });
    await put_values("chatu8_config_images", [
      {
        store: "config_images",
        key: "config-image-1",
        value: { id: "config-image-1", data: image_bytes.buffer, date: 1700000000001 },
      },
    ]);

    const { globals, settings } = host_globals();
    const source = create_legacy_source(globals);
    expect(source).not.toBeNull();
    if (source === null) {
      throw new Error("legacy source should be available");
    }
    await expect(source.read_settings()).resolves.toBe(settings);
    await expect(source.read_gallery_database()).resolves.toEqual({
      tupianhuancun_metadata: {
        "manual-tag": {
          images: [
            {
              uuid: "legacy-image-1",
              date: 1700000000000,
              isVideo: false,
              originalUrl: "",
              size: image_bytes.byteLength,
              thumbnail_size: 0,
            },
          ],
          index: 0,
          change: "manual-tag",
        },
      },
      tupianhuancun_blobs: {
        "legacy-image-1": "iVBORw0KGgoB",
      },
      groups: [{ id_index: "manual-group", fileName: "manual", name: "Manual" }],
      subgroups: [{ id_index: "manual-subgroup", fileName: "manual", name: "Manual subgroup" }],
      tags: [{ fileName: "manual", name: "manual-tag" }],
      config_images: [{ id: "config-image-1", data_base64: "iVBORw0KGgoB", date: 1700000000001 }],
    });
  });
});

describe("create_legacy_image_resolver", () => {
  it("only fetches same-origin image responses and rejects traversal, non-image, and empty bodies", async () => {
    const image_bytes = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    const fetch = vi.fn(async () => ({
      ok: true,
      status: 200,
      headers: new Headers({ "content-type": "image/png" }),
      arrayBuffer: async () => image_bytes.buffer,
    }));
    const resolver = create_legacy_image_resolver({
      fetch,
      location: { href: "https://example.test/studio/", origin: "https://example.test" },
    });
    expect(resolver).not.toBeNull();
    if (resolver === null) {
      throw new Error("legacy image resolver should be available");
    }

    await expect(
      resolver.resolve_host_image("user/images/st-chatu8/chatuList/image.png"),
    ).resolves.toEqual(image_bytes);
    await expect(
      resolver.resolve_host_image("https://other.example/image.png"),
    ).resolves.toBeNull();
    await expect(resolver.resolve_host_image("user/images/../secret.png")).resolves.toBeNull();

    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers({ "content-type": "text/plain" }),
      arrayBuffer: async () => image_bytes.buffer,
    });
    await expect(
      resolver.resolve_host_image("user/images/st-chatu8/chatuList/not-image.png"),
    ).resolves.toBeNull();

    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers({ "content-type": "image/png" }),
      arrayBuffer: async () => new ArrayBuffer(0),
    });
    await expect(
      resolver.resolve_host_image("user/images/st-chatu8/chatuList/empty.png"),
    ).resolves.toBeNull();
  });
});
