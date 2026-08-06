import type { IDBPDatabase } from "idb";

import type { VocabularyManifest } from "@tavern-canvas/contracts";
import type { DBSchema } from "@tavern-canvas/storage";

import type { PackageClient } from "./package_client.js";
import {
  verify_manifest,
  verify_shard_bytes,
  PackageVerificationError,
} from "./package_verifier.js";
import { VocabularyPackageStore, type StoredVocabularyPackage } from "./package_store.js";

export type PackageUpdateProgress =
  | { readonly phase: "checking_manifest" }
  | { readonly phase: "up_to_date"; readonly data_version: string }
  | {
      readonly phase: "downloading";
      readonly shard_path: string;
      readonly downloaded_bytes: number;
      readonly total_bytes: number;
    }
  | { readonly phase: "reusing_shard"; readonly shard_path: string }
  | { readonly phase: "verifying"; readonly shard_path: string }
  | { readonly phase: "activating"; readonly data_version: string }
  | { readonly phase: "complete"; readonly data_version: string }
  | { readonly phase: "rolled_back"; readonly reason: string };

export type PackageUpdateResult =
  | { readonly outcome: "up_to_date"; readonly data_version: string }
  | {
      readonly outcome: "updated";
      readonly data_version: string;
      readonly package_record_id: string;
    };

export class PackageUpdateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PackageUpdateError";
  }
}

export interface PackageUpdaterOptions {
  readonly database: IDBPDatabase<DBSchema>;
  readonly namespace: string;
  readonly client: PackageClient;
  readonly current_extension_version: string;
  readonly on_progress?: (progress: PackageUpdateProgress) => void;
}

/** A fixed margin above the manifest's declared byte_length: enough for verify_shard_bytes to
 * see the true (possibly mismatched) size, tight enough to bound a misbehaving server's response. */
const SHARD_DOWNLOAD_MARGIN_BYTES = 65_536;

function shard_download_bound(declared_byte_length: number): number {
  return declared_byte_length + SHARD_DOWNLOAD_MARGIN_BYTES;
}

function manifests_match(current: VocabularyManifest, remote: VocabularyManifest): boolean {
  if (current.data_version !== remote.data_version) {
    return false;
  }
  if (current.shards.length !== remote.shards.length) {
    return false;
  }
  const current_by_path = new Map(current.shards.map((shard) => [shard.path, shard.sha256]));
  return remote.shards.every((shard) => current_by_path.get(shard.path) === shard.sha256);
}

function compute_total_download_bytes(
  current: StoredVocabularyPackage | null,
  manifest: VocabularyManifest,
): number {
  const current_by_path = new Map(
    current?.manifest.shards.map((shard) => [shard.path, shard.sha256]) ?? [],
  );
  return manifest.shards.reduce((total, entry) => {
    if (current_by_path.get(entry.path) === entry.sha256) {
      return total;
    }
    return total + entry.byte_length;
  }, 0);
}

function assert_not_aborted(signal: AbortSignal | undefined): void {
  if (signal?.aborted === true) {
    throw new DOMException("Vocabulary package update was aborted", "AbortError");
  }
}

/**
 * Orchestrates one atomic package update: compare manifests, download only changed shards
 * (unchanged ones are copied from the current version without a network request), verify every
 * downloaded shard, stage everything under a fresh package record, and flip the active pointer
 * in a single transaction only once every shard is staged and verified. Any failure — a bad
 * shard, an aborted signal, a storage error — rolls the staging package back in full; the
 * previously active version is never touched until activation succeeds.
 *
 * Concurrent `update()` calls serialize on an internal promise chain (`tail`) rather than
 * rejecting, so callers never need to coordinate calls themselves.
 */
export class PackageUpdater {
  private readonly store: VocabularyPackageStore;
  private readonly client: PackageClient;
  private readonly current_extension_version: string;
  private readonly on_progress: ((progress: PackageUpdateProgress) => void) | undefined;
  private tail: Promise<unknown> = Promise.resolve();

  constructor(options: PackageUpdaterOptions) {
    this.store = new VocabularyPackageStore(options.database, options.namespace);
    this.client = options.client;
    this.current_extension_version = options.current_extension_version;
    this.on_progress = options.on_progress;
  }

  async update(signal?: AbortSignal): Promise<PackageUpdateResult> {
    const run = this.tail.then(
      () => this.run_update(signal),
      () => this.run_update(signal),
    );
    this.tail = run.then(
      () => undefined,
      () => undefined,
    );
    return run;
  }

  /** Call after the new version completes one successful Worker query. Idempotent no-op otherwise. */
  async report_query_success(): Promise<void> {
    const active = await this.store.find_active_or_confirmed();
    if (active !== null && active.state === "active") {
      await this.store.confirm(active.record_id);
    }
  }

  /** Call when the first query against a newly activated version fails: reselects the prior confirmed version. */
  async report_query_failure(): Promise<StoredVocabularyPackage | null> {
    const active = await this.store.find_active_or_confirmed();
    if (active === null || active.state !== "active") {
      return null;
    }
    return this.store.reselect_prior_confirmed(active.record_id);
  }

  /** Removes unpinned superseded/failed staging leftovers; never touches active/confirmed data. */
  async cleanup(): Promise<{ deleted_package_ids: string[] }> {
    return this.store.cleanup_stale();
  }

  private emit(progress: PackageUpdateProgress): void {
    this.on_progress?.(progress);
  }

  private async run_update(signal: AbortSignal | undefined): Promise<PackageUpdateResult> {
    this.emit({ phase: "checking_manifest" });
    assert_not_aborted(signal);
    const remote_manifest_raw = await this.client.fetch_manifest(signal);
    const manifest = verify_manifest(remote_manifest_raw, {
      current_extension_version: this.current_extension_version,
    });

    const current = await this.store.find_active_or_confirmed();
    if (current !== null && manifests_match(current.manifest, manifest)) {
      this.emit({ phase: "up_to_date", data_version: manifest.data_version });
      return { outcome: "up_to_date", data_version: manifest.data_version };
    }

    const staging = await this.store.create_staging_package(manifest);
    const total_bytes = compute_total_download_bytes(current, manifest);
    let downloaded_bytes = 0;

    try {
      for (const entry of manifest.shards) {
        assert_not_aborted(signal);
        const prior_hash = current?.manifest.shards.find(
          (shard) => shard.path === entry.path,
        )?.sha256;

        if (prior_hash === entry.sha256 && current !== null) {
          this.emit({ phase: "reusing_shard", shard_path: entry.path });
          await this.store.copy_shard(staging, entry, current.record_id);
          continue;
        }

        const compressed_bytes = await this.client.fetch_shard_bytes(entry.path, {
          max_bytes: shard_download_bound(entry.byte_length),
          ...(signal === undefined ? {} : { signal }),
          on_progress: (progress) => {
            this.emit({
              phase: "downloading",
              shard_path: entry.path,
              downloaded_bytes: downloaded_bytes + progress.downloaded_bytes,
              total_bytes,
            });
          },
        });
        downloaded_bytes += compressed_bytes.byteLength;

        this.emit({ phase: "verifying", shard_path: entry.path });
        const verified = await verify_shard_bytes(entry, compressed_bytes);
        await this.store.put_shard_content(staging, verified.entry, verified.compressed_bytes);
      }

      await this.store.mark_ready(staging.record_id);
      this.emit({ phase: "activating", data_version: manifest.data_version });
      await this.store.activate(staging.record_id);
      this.emit({ phase: "complete", data_version: manifest.data_version });
      return {
        outcome: "updated",
        data_version: manifest.data_version,
        package_record_id: staging.record_id,
      };
    } catch (error) {
      await this.store.rollback_staging(staging.record_id).catch(() => undefined);
      const reason = error instanceof Error ? error.message : String(error);
      this.emit({ phase: "rolled_back", reason });
      if (error instanceof PackageVerificationError) {
        throw new PackageUpdateError(`Vocabulary package update rejected a shard: ${reason}`);
      }
      if (error instanceof DOMException && error.name === "AbortError") {
        throw error;
      }
      throw new PackageUpdateError(
        `Vocabulary package update failed and was rolled back: ${reason}`,
      );
    }
  }
}
