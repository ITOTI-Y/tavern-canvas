import type { IDBPDatabase } from "idb";

import {
  VocabularyManifestSchema,
  type VocabularyCatalogEntry,
  type VocabularyManifest,
} from "@tavern-canvas/contracts";
import type { DBSchema } from "@tavern-canvas/storage";
import { sha256 } from "@noble/hashes/sha2.js";
import { bytesToHex } from "@noble/hashes/utils.js";

import { create_package_client, type PackageClient } from "../package_client.js";
import {
  PackageUpdater,
  type PackageUpdateProgress,
  type PackageUpdateResult,
} from "../package_updater.js";
import { plan_catalog_install, type CatalogInstallPlanOptions } from "./catalog_client.js";

// Same bound as MAX_MANIFEST_BYTES in package_client.ts.
const MAX_MANIFEST_BYTES = 8 * 1024 * 1024;

export type CatalogInstallFailureReason =
  | "manifest_fetch_failed"
  | "manifest_hash_mismatch"
  | "package_id_mismatch"
  | "data_version_mismatch";

/** Thrown when the fetched manifest.json disagrees with the catalog entry, before any staging package exists. */
export class CatalogInstallError extends Error {
  readonly reason: CatalogInstallFailureReason;

  constructor(reason: CatalogInstallFailureReason, message: string) {
    super(message);
    this.name = "CatalogInstallError";
    this.reason = reason;
  }
}

export type CatalogInstallProgress =
  { readonly phase: "verifying_catalog_manifest" } | PackageUpdateProgress;

export interface CatalogInstallOptions extends CatalogInstallPlanOptions {
  readonly database: IDBPDatabase<DBSchema>;
  readonly namespace: string;
  readonly current_extension_version: string;
  readonly fetch_impl?: typeof fetch;
  readonly signal?: AbortSignal;
  readonly on_progress?: (progress: CatalogInstallProgress) => void;
}

function manifest_url(base_url: string): URL {
  const normalized = base_url.endsWith("/") ? base_url : `${base_url}/`;
  return new URL("manifest.json", normalized);
}

async function fetch_manifest_bytes(
  url: URL,
  fetch_impl: typeof fetch,
  signal: AbortSignal | undefined,
): Promise<Uint8Array> {
  const response = await fetch_impl(url, signal === undefined ? {} : { signal });
  if (!response.ok) {
    throw new CatalogInstallError(
      "manifest_fetch_failed",
      `Manifest request failed with status ${String(response.status)}: ${url.href}`,
    );
  }
  if (response.body === null) {
    throw new CatalogInstallError(
      "manifest_fetch_failed",
      `Manifest response for ${url.href} has no readable body`,
    );
  }
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    total += value.byteLength;
    if (total > MAX_MANIFEST_BYTES) {
      await reader.cancel("bounded_stream_exceeded").catch(() => undefined);
      throw new CatalogInstallError(
        "manifest_fetch_failed",
        `Manifest response for ${url.href} exceeded the allowed ${String(MAX_MANIFEST_BYTES)}-byte bound`,
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
  return combined;
}

function parse_manifest_bytes(bytes: Uint8Array, package_id: string): VocabularyManifest {
  let parsed_json: unknown;
  try {
    parsed_json = JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    throw new CatalogInstallError(
      "manifest_fetch_failed",
      `Manifest response for ${package_id} is not valid JSON`,
    );
  }
  const result = VocabularyManifestSchema.safeParse(parsed_json);
  if (!result.success) {
    throw new CatalogInstallError(
      "manifest_fetch_failed",
      `Manifest response for ${package_id} failed schema validation`,
    );
  }
  return result.data;
}

function with_verified_manifest(
  client: PackageClient,
  manifest: VocabularyManifest,
): PackageClient {
  return {
    fetch_manifest: () => Promise.resolve(manifest),
    fetch_shard_bytes: client.fetch_shard_bytes.bind(client),
  };
}

export async function install_catalog_entry(
  entry: VocabularyCatalogEntry,
  options: CatalogInstallOptions,
): Promise<PackageUpdateResult> {
  const plan_options: CatalogInstallPlanOptions =
    options.bundled_base_url === undefined ? {} : { bundled_base_url: options.bundled_base_url };
  const source = plan_catalog_install(entry, plan_options);
  const fetch_impl = options.fetch_impl ?? fetch;

  options.on_progress?.({ phase: "verifying_catalog_manifest" });
  const raw_manifest_bytes = await fetch_manifest_bytes(
    manifest_url(source.base_url),
    fetch_impl,
    options.signal,
  );

  const actual_hash = bytesToHex(sha256(raw_manifest_bytes));
  if (actual_hash !== entry.manifest_sha256) {
    throw new CatalogInstallError(
      "manifest_hash_mismatch",
      `Fetched manifest hash ${actual_hash} does not match catalog entry hash ${entry.manifest_sha256} for package ${entry.package_id}`,
    );
  }

  const manifest = parse_manifest_bytes(raw_manifest_bytes, entry.package_id);
  if (manifest.package_id !== entry.package_id) {
    throw new CatalogInstallError(
      "package_id_mismatch",
      `Catalog entry declares package_id ${entry.package_id} but the fetched manifest declares ${manifest.package_id}`,
    );
  }
  if (manifest.data_version !== entry.data_version) {
    throw new CatalogInstallError(
      "data_version_mismatch",
      `Catalog entry ${entry.package_id} declares data_version ${entry.data_version} but the fetched manifest declares ${manifest.data_version}`,
    );
  }

  const client = with_verified_manifest(create_package_client(source, fetch_impl), manifest);
  const updater = new PackageUpdater({
    database: options.database,
    namespace: options.namespace,
    client,
    current_extension_version: options.current_extension_version,
    ...(options.on_progress === undefined ? {} : { on_progress: options.on_progress }),
  });

  return updater.update(options.signal);
}
