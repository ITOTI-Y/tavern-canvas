import type { VocabularyCatalogEntry } from "@tavern-canvas/contracts";
import { open_database, type StorageDatabase } from "@tavern-canvas/storage";
import {
  create_catalog_client,
  install_catalog_entry,
  type CatalogClient,
  type CatalogInstallProgress,
  type PackageUpdateResult,
} from "@tavern-canvas/vocabulary";

// Matches VOCABULARY_NAMESPACE in apps/extension/src/workers/vocabulary_worker.ts. Vocabulary
// data is shared reference content, not scoped per profile/character, so a fixed namespace is
// correct here too -- not exported there, so redeclared (same accepted duplication that file's
// own comment documents for the same constant).
const VOCABULARY_NAMESPACE = "vocabulary";

export class CatalogInstallBusyError extends Error {
  constructor() {
    super("A vocabulary package install is already in progress on this client");
    this.name = "CatalogInstallBusyError";
  }
}

export interface VocabularyCatalogClientOptions {
  readonly current_extension_version: string;
  /** Where the extension's own bundled baseline package lives -- required only to install a
   * catalog entry marked `bundled`. See resolve_bundled_baseline_base_url in
   * apps/extension/src/workers/vocabulary_worker.ts for the Worker-side equivalent. */
  readonly bundled_base_url?: string;
  readonly catalog_url?: string;
  readonly fetch_impl?: typeof fetch;
  readonly ttl_ms?: number;
  /** Overrides how the IndexedDB connection is obtained -- tests inject a fake; production
   * defaults to the shared @tavern-canvas/storage connection (the same one the vocabulary search
   * Worker's PackageStoreShardByteSource reads from). */
  readonly open_database_impl?: () => Promise<StorageDatabase>;
}

/**
 * The catalog capability Stage 06's Vue layer depends on -- it never fetches the catalog document
 * or drives PackageUpdater itself. Owns catalog listing (filtered to versions the running
 * extension supports) and driving one install at a time to completion, mirroring
 * VocabularyClient's role for search: a typed, framework-agnostic surface with no UI concerns.
 *
 * Integration note for whoever wires this into a live session: activating a new package here
 * writes straight to the same IndexedDB namespace the search Worker reads from, but does not
 * itself notify a running Worker -- a live VocabularyClient's Worker caches the active package
 * pointer (apps/extension/src/workers/vocabulary_worker.ts's PackageStoreShardByteSource,
 * cache_active_package: true) and only re-reads it on its own initialization. A caller must
 * dispose and recreate its VocabularyClient after a successful install() for search to observe
 * the newly active package.
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

  /** Catalog entries whose min_extension_version the running extension satisfies, in publisher
   * order. Throws CatalogFetchError/CatalogValidationError (packages/vocabulary/src/catalog) on
   * a network or schema failure -- callers decide how to surface that to the user. */
  list(): Promise<readonly VocabularyCatalogEntry[]> {
    return this.#catalog.list_supported_entries(this.#current_extension_version);
  }

  get installing(): boolean {
    return this.#install_controller !== null;
  }

  /**
   * Installs one catalog entry (pass an entry returned by list() -- already schema-validated)
   * end to end: manifest cross-check, staged download, verification, and activation. Only one
   * install may run at a time per client instance; call cancel() first (or await the in-flight
   * install) rather than racing two downloads whose progress would be indistinguishable to a
   * caller. Progress is delivered synchronously via on_progress for the duration of this call.
   */
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

  /** Aborts the in-flight install, if any -- a no-op otherwise. The aborted install's own
   * rejection (propagated to whoever is awaiting install()) is how the caller observes this. */
  cancel(): void {
    this.#install_controller?.abort();
  }
}
