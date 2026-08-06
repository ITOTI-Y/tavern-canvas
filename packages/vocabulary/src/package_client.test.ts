import { describe, expect, it, vi } from "vitest";

import type { VocabularyManifest } from "@tavern-canvas/contracts";

import {
  create_package_client,
  PackageFetchError,
  PackageSourceConfigError,
} from "./package_client.js";

function request_url(input: RequestInfo | URL): string {
  if (input instanceof URL) {
    return input.href;
  }
  if (typeof input === "string") {
    return input;
  }
  return input.url;
}

function manifest_response(manifest: VocabularyManifest): Response {
  return new Response(JSON.stringify(manifest), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

const VALID_MANIFEST: VocabularyManifest = {
  package_id: "baseline",
  schema_version: 1,
  data_version: "1.0.0",
  changelog: "initial",
  record_count: 1,
  compressed_size: 4,
  minimum_extension_version: "3.0.0",
  shards: [
    {
      shard_id: "prefix-aa",
      package_id: "baseline",
      kind: "prefix",
      path: "shards/prefix-aa.msgpack.gz",
      sha256: "a".repeat(64),
      byte_length: 4,
    },
  ],
};

describe("create_package_client source configuration", () => {
  it("rejects an https-kind source whose base_url is not https", () => {
    expect(() =>
      create_package_client({ kind: "https", base_url: "http://example.com/pkg/" }),
    ).toThrow(PackageSourceConfigError);
  });

  it("accepts an https base_url", () => {
    expect(() =>
      create_package_client({ kind: "https", base_url: "https://example.com/pkg/" }),
    ).not.toThrow();
  });

  it("accepts a non-https base_url for bundled sources", () => {
    expect(() =>
      create_package_client({ kind: "bundled", base_url: "chrome-extension://abc/vocabulary/" }),
    ).not.toThrow();
  });

  it("rejects a base_url that is not an absolute URL", () => {
    expect(() => create_package_client({ kind: "bundled", base_url: "relative/path" })).toThrow(
      PackageSourceConfigError,
    );
  });
});

describe("PackageClient URL resolution", () => {
  it("fetches the manifest at base_url + manifest.json, never at a URL from package content", async () => {
    const requested_urls: string[] = [];
    const fetch_impl = vi.fn(async (input: RequestInfo | URL) => {
      requested_urls.push(request_url(input));
      return manifest_response(VALID_MANIFEST);
    }) as unknown as typeof fetch;

    const client = create_package_client(
      { kind: "https", base_url: "https://updates.example.com/vocab" },
      fetch_impl,
    );
    const manifest = await client.fetch_manifest();

    expect(manifest.package_id).toBe("baseline");
    expect(requested_urls).toEqual(["https://updates.example.com/vocab/manifest.json"]);
  });

  it("resolves a shard path strictly against the configured base, ignoring any absolute URL shape in the path", async () => {
    const requested_urls: string[] = [];
    const bytes = new Uint8Array([1, 2, 3, 4]);
    const fetch_impl = vi.fn(async (input: RequestInfo | URL) => {
      requested_urls.push(request_url(input));
      return new Response(new Uint8Array(bytes));
    }) as unknown as typeof fetch;

    const client = create_package_client(
      { kind: "https", base_url: "https://updates.example.com/vocab/" },
      fetch_impl,
    );
    const result = await client.fetch_shard_bytes("shards/prefix-aa.msgpack.gz", {
      max_bytes: 100,
    });

    expect(result).toEqual(bytes);
    expect(requested_urls).toEqual([
      "https://updates.example.com/vocab/shards/prefix-aa.msgpack.gz",
    ]);
  });

  it("rejects a manifest response that fails contracts schema validation", async () => {
    const fetch_impl = vi.fn(
      async () => new Response(JSON.stringify({ not: "a manifest" })),
    ) as unknown as typeof fetch;
    const client = create_package_client(
      { kind: "https", base_url: "https://updates.example.com/" },
      fetch_impl,
    );

    await expect(client.fetch_manifest()).rejects.toBeInstanceOf(PackageFetchError);
  });
});

describe("bounded stream reading", () => {
  it("aborts a shard download once it exceeds the caller-supplied max_bytes bound", async () => {
    const large_bytes = new Uint8Array(1000).fill(7);
    const fetch_impl = vi.fn(
      async () => new Response(new Uint8Array(large_bytes)),
    ) as unknown as typeof fetch;
    const client = create_package_client(
      { kind: "https", base_url: "https://updates.example.com/" },
      fetch_impl,
    );

    await expect(
      client.fetch_shard_bytes("shards/big.msgpack.gz", { max_bytes: 100 }),
    ).rejects.toBeInstanceOf(PackageFetchError);
  });

  it("reports incremental progress while downloading", async () => {
    const bytes = new Uint8Array(50).fill(1);
    const fetch_impl = vi.fn(
      async () => new Response(new Uint8Array(bytes)),
    ) as unknown as typeof fetch;
    const client = create_package_client(
      { kind: "https", base_url: "https://updates.example.com/" },
      fetch_impl,
    );

    const progress_calls: { downloaded_bytes: number; total_bytes: number }[] = [];
    const result = await client.fetch_shard_bytes("shards/small.msgpack.gz", {
      max_bytes: 100,
      on_progress: (progress) => progress_calls.push(progress),
    });

    expect(result.byteLength).toBe(50);
    expect(progress_calls.length).toBeGreaterThan(0);
    expect(progress_calls[progress_calls.length - 1]?.downloaded_bytes).toBe(50);
  });

  it("surfaces a non-ok HTTP status as a PackageFetchError", async () => {
    const fetch_impl = vi.fn(
      async () => new Response(null, { status: 404 }),
    ) as unknown as typeof fetch;
    const client = create_package_client(
      { kind: "https", base_url: "https://updates.example.com/" },
      fetch_impl,
    );

    await expect(
      client.fetch_shard_bytes("shards/missing.msgpack.gz", { max_bytes: 100 }),
    ).rejects.toBeInstanceOf(PackageFetchError);
  });
});
