import {
  VocabularyCatalogDocumentSchema,
  type VocabularyCatalogEntry,
} from "@tavern-canvas/contracts";

import type { PackageSourceConfig } from "../package_client.js";
import { compare_semver } from "../package_verifier.js";

export const DEFAULT_CATALOG_URL =
  "https://huggingface.co/datasets/ITOTIY/tavern-canvas-vocabulary/resolve/main/catalog.json";

const DEFAULT_MAX_CATALOG_BYTES = 1 * 1024 * 1024;

export class CatalogSourceConfigError extends TypeError {}

export class CatalogFetchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CatalogFetchError";
  }
}

export class CatalogValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CatalogValidationError";
  }
}

export class CatalogPlanError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CatalogPlanError";
  }
}

export interface CatalogClientOptions {
  readonly catalog_url?: string;
  readonly fetch_impl?: typeof fetch;
  readonly max_bytes?: number;
  /** Milliseconds a fetched document may be reused for; 0 never caches. Per instance only. */
  readonly ttl_ms?: number;
}

export interface FetchCatalogOptions {
  readonly signal?: AbortSignal;
}

export interface CatalogClient {
  fetch_catalog(options?: FetchCatalogOptions): Promise<readonly VocabularyCatalogEntry[]>;
  list_supported_entries(
    current_extension_version: string,
    options?: FetchCatalogOptions,
  ): Promise<readonly VocabularyCatalogEntry[]>;
}

function validated_https_url(url: string): URL {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new CatalogSourceConfigError(`Catalog URL is not a valid absolute URL: ${url}`);
  }
  if (parsed.protocol !== "https:") {
    throw new CatalogSourceConfigError(`Catalog URL must use the https: scheme, got: ${url}`);
  }
  return parsed;
}

async function read_bounded_json(
  body: ReadableStream<Uint8Array> | null,
  max_bytes: number,
): Promise<unknown> {
  if (body === null) {
    throw new CatalogFetchError("Catalog response has no readable body");
  }
  const reader = body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    total += value.byteLength;
    if (total > max_bytes) {
      await reader.cancel("bounded_stream_exceeded").catch(() => undefined);
      throw new CatalogFetchError(
        `Catalog response exceeded the allowed ${String(max_bytes)}-byte bound`,
      );
    }
    chunks.push(value);
  }
  const combined = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    combined.set(chunk, offset);
    offset += chunk.byteLength;
  }
  try {
    return JSON.parse(new TextDecoder().decode(combined));
  } catch {
    throw new CatalogFetchError("Catalog response is not valid JSON");
  }
}

interface CachedCatalog {
  readonly entries: readonly VocabularyCatalogEntry[];
  readonly fetched_at_ms: number;
}

export function create_catalog_client(options: CatalogClientOptions = {}): CatalogClient {
  const catalog_url = options.catalog_url ?? DEFAULT_CATALOG_URL;
  validated_https_url(catalog_url);
  const fetch_impl = options.fetch_impl ?? fetch;
  const max_bytes = options.max_bytes ?? DEFAULT_MAX_CATALOG_BYTES;
  const ttl_ms = options.ttl_ms ?? 0;
  let cached: CachedCatalog | null = null;

  async function fetch_catalog(
    fetch_options: FetchCatalogOptions = {},
  ): Promise<readonly VocabularyCatalogEntry[]> {
    if (cached !== null && ttl_ms > 0 && Date.now() - cached.fetched_at_ms < ttl_ms) {
      return cached.entries;
    }

    const response = await fetch_impl(
      catalog_url,
      fetch_options.signal === undefined ? {} : { signal: fetch_options.signal },
    );
    if (!response.ok) {
      throw new CatalogFetchError(`Catalog request failed with status ${String(response.status)}`);
    }
    const parsed = await read_bounded_json(response.body, max_bytes);
    const result = VocabularyCatalogDocumentSchema.safeParse(parsed);
    if (!result.success) {
      throw new CatalogValidationError("Catalog response failed schema validation");
    }

    if (ttl_ms > 0) {
      cached = { entries: result.data, fetched_at_ms: Date.now() };
    }
    return result.data;
  }

  return {
    fetch_catalog,
    async list_supported_entries(current_extension_version, fetch_options) {
      const entries = await fetch_catalog(fetch_options);
      return entries.filter(
        (entry) => compare_semver(current_extension_version, entry.min_extension_version) >= 0,
      );
    },
  };
}

export interface CatalogInstallPlanOptions {
  readonly bundled_base_url?: string;
}

export function plan_catalog_install(
  entry: VocabularyCatalogEntry,
  options: CatalogInstallPlanOptions = {},
): PackageSourceConfig {
  if (entry.bundled === true) {
    if (options.bundled_base_url === undefined) {
      throw new CatalogPlanError(
        `Catalog entry "${entry.package_id}" is bundled: a bundled_base_url is required to plan its install`,
      );
    }
    return { kind: "bundled", base_url: options.bundled_base_url };
  }
  if (entry.base_url === null) {
    throw new CatalogPlanError(
      `Catalog entry "${entry.package_id}" has no base_url and is not marked bundled`,
    );
  }
  return { kind: "https", base_url: entry.base_url };
}
