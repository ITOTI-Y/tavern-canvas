import { describe, expect, it, vi } from "vitest";

import type { VocabularyCatalogEntry } from "@tavern-canvas/contracts";

import {
  CatalogFetchError,
  CatalogPlanError,
  CatalogSourceConfigError,
  CatalogValidationError,
  create_catalog_client,
  DEFAULT_CATALOG_URL,
  plan_catalog_install,
} from "./catalog_client.js";

function entry(overrides: Partial<VocabularyCatalogEntry> = {}): VocabularyCatalogEntry {
  return {
    package_id: "tavern-canvas-full-zh",
    display_name: { en: "Full Vocabulary", "zh-CN": "完整词汇表" },
    description: { en: "Everything.", "zh-CN": "全部内容。" },
    data_version: "1.1.0",
    record_count: 153_258,
    compressed_bytes: 8_931_663,
    manifest_sha256: "8".repeat(64),
    languages: ["en", "zh-CN"],
    min_extension_version: "3.0.0-alpha.1",
    base_url: "https://updates.example.com/packages/tavern-canvas-full-zh/",
    bundled: false,
    updated_at: "2026-08-06T18:36:34.789Z",
    ...overrides,
  };
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

function json_response(body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

describe("create_catalog_client configuration", () => {
  it("rejects a non-https catalog_url", () => {
    expect(() => create_catalog_client({ catalog_url: "http://example.com/catalog.json" })).toThrow(
      CatalogSourceConfigError,
    );
  });

  it("defaults to the published ITOTII catalog URL", async () => {
    const requested_urls: string[] = [];
    const fetch_impl = vi.fn(async (input: RequestInfo | URL) => {
      requested_urls.push(request_url(input));
      return json_response([entry()]);
    }) as unknown as typeof fetch;

    await create_catalog_client({ fetch_impl }).fetch_catalog();
    expect(requested_urls).toEqual([DEFAULT_CATALOG_URL]);
  });
});

describe("fetch_catalog", () => {
  it("returns validated entries for a well-formed catalog document", async () => {
    const fetch_impl = vi.fn(async () => json_response([entry()])) as unknown as typeof fetch;
    const client = create_catalog_client({
      catalog_url: "https://updates.example.com/catalog.json",
      fetch_impl,
    });

    const entries = await client.fetch_catalog();
    expect(entries).toHaveLength(1);
    expect(entries[0]?.package_id).toBe("tavern-canvas-full-zh");
  });

  it("throws CatalogFetchError on a non-ok HTTP status", async () => {
    const fetch_impl = vi.fn(
      async () => new Response(null, { status: 500 }),
    ) as unknown as typeof fetch;
    const client = create_catalog_client({
      catalog_url: "https://updates.example.com/catalog.json",
      fetch_impl,
    });

    await expect(client.fetch_catalog()).rejects.toBeInstanceOf(CatalogFetchError);
  });

  it("throws CatalogValidationError when the response fails schema validation", async () => {
    const fetch_impl = vi.fn(async () =>
      json_response([{ not: "a catalog entry" }]),
    ) as unknown as typeof fetch;
    const client = create_catalog_client({
      catalog_url: "https://updates.example.com/catalog.json",
      fetch_impl,
    });

    await expect(client.fetch_catalog()).rejects.toBeInstanceOf(CatalogValidationError);
  });

  it("throws CatalogFetchError once the response exceeds the configured byte bound", async () => {
    const oversized_entry = entry({
      description: { en: "x".repeat(2_000), "zh-CN": "全部内容。" },
    });
    const fetch_impl = vi.fn(async () =>
      json_response([oversized_entry]),
    ) as unknown as typeof fetch;
    const client = create_catalog_client({
      catalog_url: "https://updates.example.com/catalog.json",
      fetch_impl,
      max_bytes: 256,
    });

    await expect(client.fetch_catalog()).rejects.toBeInstanceOf(CatalogFetchError);
  });

  it("re-fetches on every call when ttl_ms is unset (no caching)", async () => {
    const fetch_impl = vi.fn(async () => json_response([entry()])) as unknown as typeof fetch;
    const client = create_catalog_client({
      catalog_url: "https://updates.example.com/catalog.json",
      fetch_impl,
    });

    await client.fetch_catalog();
    await client.fetch_catalog();
    expect(fetch_impl).toHaveBeenCalledTimes(2);
  });

  it("reuses the cached document within ttl_ms, then re-fetches once it expires", async () => {
    let now = 0;
    vi.spyOn(Date, "now").mockImplementation(() => now);
    const fetch_impl = vi.fn(async () => json_response([entry()])) as unknown as typeof fetch;
    const client = create_catalog_client({
      catalog_url: "https://updates.example.com/catalog.json",
      fetch_impl,
      ttl_ms: 1_000,
    });

    await client.fetch_catalog();
    now = 500;
    await client.fetch_catalog();
    expect(fetch_impl).toHaveBeenCalledTimes(1);

    now = 1_500;
    await client.fetch_catalog();
    expect(fetch_impl).toHaveBeenCalledTimes(2);

    vi.restoreAllMocks();
  });
});

describe("list_supported_entries", () => {
  it("keeps entries the running extension version satisfies and drops the rest", async () => {
    const supported = entry({
      package_id: "tavern-canvas-full-zh",
      min_extension_version: "3.0.0",
    });
    const too_new = entry({ package_id: "tavern-canvas-baseline", min_extension_version: "9.0.0" });
    const fetch_impl = vi.fn(async () =>
      json_response([supported, too_new]),
    ) as unknown as typeof fetch;
    const client = create_catalog_client({
      catalog_url: "https://updates.example.com/catalog.json",
      fetch_impl,
    });

    const entries = await client.list_supported_entries("3.5.0");
    expect(entries.map((candidate) => candidate.package_id)).toEqual(["tavern-canvas-full-zh"]);
  });

  it("includes an entry whose min_extension_version exactly equals the running version", async () => {
    const exact = entry({ min_extension_version: "3.5.0" });
    const fetch_impl = vi.fn(async () => json_response([exact])) as unknown as typeof fetch;
    const client = create_catalog_client({
      catalog_url: "https://updates.example.com/catalog.json",
      fetch_impl,
    });

    const entries = await client.list_supported_entries("3.5.0");
    expect(entries).toHaveLength(1);
  });
});

describe("plan_catalog_install", () => {
  it("maps a non-bundled entry to an https PackageSourceConfig using its base_url", () => {
    const config = plan_catalog_install(entry());
    expect(config).toEqual({
      kind: "https",
      base_url: "https://updates.example.com/packages/tavern-canvas-full-zh/",
    });
  });

  it("maps a bundled entry to a bundled PackageSourceConfig using the supplied bundled_base_url", () => {
    const config = plan_catalog_install(entry({ bundled: true, base_url: null }), {
      bundled_base_url: "https://extension.local/vocabulary/baseline/",
    });
    expect(config).toEqual({
      kind: "bundled",
      base_url: "https://extension.local/vocabulary/baseline/",
    });
  });

  it("throws CatalogPlanError for a bundled entry with no bundled_base_url supplied", () => {
    expect(() => plan_catalog_install(entry({ bundled: true, base_url: null }))).toThrow(
      CatalogPlanError,
    );
  });

  it("throws CatalogPlanError for a non-bundled entry with a null base_url", () => {
    expect(() => plan_catalog_install(entry({ bundled: false, base_url: null }))).toThrow(
      CatalogPlanError,
    );
  });
});

// Opt-in: exercises the real published catalog over the network. Skipped by default so the
// ordinary test suite never depends on network access; run explicitly with CATALOG_LIVE=1.
describe.skipIf(process.env.CATALOG_LIVE !== "1")("live catalog smoke test", () => {
  it("fetches and validates the real published catalog", async () => {
    const client = create_catalog_client();
    const entries = await client.fetch_catalog();
    expect(entries.length).toBeGreaterThanOrEqual(1);
    expect(entries.some((candidate) => candidate.bundled === true)).toBe(true);
  }, 30_000);
});
