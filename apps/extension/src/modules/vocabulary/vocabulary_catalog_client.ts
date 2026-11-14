import {
  VOCABULARY_TOKEN_REFERENCE,
  type VocabularyCatalogEntry,
  type VocabularyRemoteSettings,
} from "@tavern-canvas/contracts";
import { open_database, type StorageDatabase } from "@tavern-canvas/storage";
import {
  CatalogFetchError,
  CatalogInstallError,
  create_catalog_client,
  install_catalog_entry,
  type CatalogClient,
  type CatalogInstallProgress,
  type PackageUpdateResult,
} from "@tavern-canvas/vocabulary";

import type { SecretResolverPort } from "../../host/sillytavern_secret_resolver.js";
import { is_hub_host } from "./catalog_url.js";

// Must match VOCABULARY_NAMESPACE in vocabulary_worker.ts, which does not export it.
const VOCABULARY_NAMESPACE = "vocabulary";

export class CatalogInstallBusyError extends Error {
  constructor() {
    super("A vocabulary package install is already in progress on this client");
    this.name = "CatalogInstallBusyError";
  }
}

/** `code` is shown to the user, so the catalog panel can say what to fix. */
export class VocabularyCatalogError extends Error {
  readonly code: string;

  constructor(code: string, message: string) {
    super(message);
    this.name = "VocabularyCatalogError";
    this.code = code;
  }
}

function catalog_failure(error: unknown): unknown {
  if (!(error instanceof CatalogFetchError) || error.status === null) {
    return error;
  }
  const code =
    error.status === 401 || error.status === 403
      ? "catalog_unauthorized"
      : error.status === 404
        ? "catalog_not_found"
        : "catalog_fetch_failed";
  return new VocabularyCatalogError(code, error.message);
}

/**
 * Adds the token only to Hugging Face hosts, so a catalog that names packages elsewhere never
 * receives it; the browser drops the header when Hugging Face redirects a file to its CDN.
 */
export function with_hub_token(fetch_impl: typeof fetch, token: string): typeof fetch {
  return (input, init) => {
    const href = input instanceof Request ? input.url : String(input);
    if (!is_hub_host(new URL(href).hostname)) {
      return fetch_impl(input, init);
    }
    const headers = new Headers(init?.headers);
    headers.set("Authorization", `Bearer ${token}`);
    return fetch_impl(input, { ...init, headers });
  };
}

export interface VocabularyCatalogClientOptions {
  readonly current_extension_version: string;
  /** Required only to install a catalog entry marked `bundled`. */
  readonly bundled_base_url?: string;
  readonly catalog_url: string;
  readonly fetch_impl?: typeof fetch;
  readonly ttl_ms?: number;
  readonly open_database_impl?: () => Promise<StorageDatabase>;
}

/**
 * Activating a package does not notify a running Worker, which caches the active package pointer:
 * dispose and recreate the VocabularyClient after a successful install() to observe it.
 */
export class VocabularyCatalogClient {
  readonly #catalog: CatalogClient;
  readonly #current_extension_version: string;
  readonly #bundled_base_url: string | undefined;
  readonly #fetch_impl: typeof fetch | undefined;
  readonly #open_database_impl: () => Promise<StorageDatabase>;
  #install_controller: AbortController | null = null;

  constructor(options: VocabularyCatalogClientOptions) {
    this.#catalog = create_catalog_client({
      catalog_url: options.catalog_url,
      ...(options.fetch_impl === undefined ? {} : { fetch_impl: options.fetch_impl }),
      ...(options.ttl_ms === undefined ? {} : { ttl_ms: options.ttl_ms }),
    });
    this.#current_extension_version = options.current_extension_version;
    this.#bundled_base_url = options.bundled_base_url;
    this.#fetch_impl = options.fetch_impl;
    this.#open_database_impl = options.open_database_impl ?? open_database;
  }

  /** Throws VocabularyCatalogError for a rejected request and CatalogValidationError for a malformed catalog. */
  async list(): Promise<readonly VocabularyCatalogEntry[]> {
    try {
      return await this.#catalog.list_supported_entries(this.#current_extension_version);
    } catch (error) {
      throw catalog_failure(error);
    }
  }

  get installing(): boolean {
    return this.#install_controller !== null;
  }

  /** Only one install may run at a time per client instance; call cancel() first or await the in-flight install. */
  async install(
    entry: VocabularyCatalogEntry,
    on_progress?: (progress: CatalogInstallProgress) => void,
  ): Promise<PackageUpdateResult> {
    if (this.#install_controller !== null) {
      throw new CatalogInstallBusyError();
    }
    const controller = new AbortController();
    this.#install_controller = controller;
    try {
      const database = await this.#open_database_impl();
      return await install_catalog_entry(entry, {
        database,
        namespace: VOCABULARY_NAMESPACE,
        current_extension_version: this.#current_extension_version,
        signal: controller.signal,
        ...(on_progress === undefined ? {} : { on_progress }),
        ...(this.#bundled_base_url === undefined
          ? {}
          : { bundled_base_url: this.#bundled_base_url }),
        ...(this.#fetch_impl === undefined ? {} : { fetch_impl: this.#fetch_impl }),
      });
    } catch (error) {
      throw error instanceof CatalogInstallError
        ? new VocabularyCatalogError(error.reason, error.message)
        : error;
    } finally {
      this.#install_controller = null;
    }
  }

  cancel(): void {
    this.#install_controller?.abort();
  }
}

export interface OpenCatalogOptions {
  readonly current_extension_version: string;
  readonly remote: VocabularyRemoteSettings;
  readonly secrets: SecretResolverPort | null;
  readonly open_database_impl: () => Promise<StorageDatabase>;
}

/** A client for the catalog configured in settings, carrying the saved Hugging Face token. */
export async function open_vocabulary_catalog(
  options: OpenCatalogOptions,
): Promise<VocabularyCatalogClient> {
  const { remote, secrets } = options;
  if (remote.catalog_url === "") {
    throw new VocabularyCatalogError(
      "catalog_url_missing",
      "No remote vocabulary catalog is configured",
    );
  }
  let fetch_impl: typeof fetch | undefined;
  if (remote.token_saved) {
    if (secrets === null) {
      throw new VocabularyCatalogError(
        "catalog_token_unreadable",
        "The selected credential storage cannot read the Hugging Face token back",
      );
    }
    const token = await secrets.resolve_secret(VOCABULARY_TOKEN_REFERENCE);
    fetch_impl = with_hub_token((input, init) => fetch(input, init), token);
  }
  return new VocabularyCatalogClient({
    current_extension_version: options.current_extension_version,
    catalog_url: remote.catalog_url,
    open_database_impl: options.open_database_impl,
    ...(fetch_impl === undefined ? {} : { fetch_impl }),
  });
}
