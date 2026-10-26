import type { VocabularyCatalogEntry } from "@tavern-canvas/contracts";
import { open_database, type StorageDatabase } from "@tavern-canvas/storage";
import {
  create_catalog_client,
  install_catalog_entry,
  type CatalogClient,
  type CatalogInstallProgress,
  type PackageUpdateResult,
} from "@tavern-canvas/vocabulary";

// Must match VOCABULARY_NAMESPACE in vocabulary_worker.ts, which does not export it.
const VOCABULARY_NAMESPACE = "vocabulary";

export class CatalogInstallBusyError extends Error {
  constructor() {
    super("A vocabulary package install is already in progress on this client");
    this.name = "CatalogInstallBusyError";
  }
}

export interface VocabularyCatalogClientOptions {
  readonly current_extension_version: string;
  /** Required only to install a catalog entry marked `bundled`. */
  readonly bundled_base_url?: string;
  readonly catalog_url?: string;
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
      ...(options.catalog_url === undefined ? {} : { catalog_url: options.catalog_url }),
      ...(options.fetch_impl === undefined ? {} : { fetch_impl: options.fetch_impl }),
      ...(options.ttl_ms === undefined ? {} : { ttl_ms: options.ttl_ms }),
    });
    this.#current_extension_version = options.current_extension_version;
    this.#bundled_base_url = options.bundled_base_url;
    this.#fetch_impl = options.fetch_impl;
    this.#open_database_impl = options.open_database_impl ?? open_database;
  }

  /** Throws CatalogFetchError/CatalogValidationError on a network or schema failure. */
  list(): Promise<readonly VocabularyCatalogEntry[]> {
    return this.#catalog.list_supported_entries(this.#current_extension_version);
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
    } finally {
      this.#install_controller = null;
    }
  }

  cancel(): void {
    this.#install_controller?.abort();
  }
}
