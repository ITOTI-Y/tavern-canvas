import type { IDBPDatabase } from "idb";
import { sha256 } from "@noble/hashes/sha2.js";
import { bytesToHex } from "@noble/hashes/utils.js";
import { z } from "zod";

import {
  VOCABULARY_SCHEMA_VERSION,
  VocabularyIndexKindSchema,
  VocabularyPackageIdSchema,
  VocabularySemverSchema,
  VocabularyShardEntrySchema,
  VocabularyShardPathSchema,
  type VocabularyIndexKind,
  type VocabularyManifest,
  type VocabularyShardEntry,
  type VocabularyShardPath,
} from "@tavern-canvas/contracts";
import {
  parse_json_value,
  with_transaction,
  TimestampSchema,
  VocabularyPackageRepository,
  VocabularyShardRepository,
  type DBSchema,
  type JsonValue,
  type StorageWriteTransaction,
  type VocabularyPackage,
  type VocabularyShard,
} from "@tavern-canvas/storage";

/**
 * `staging` -> `ready` -> `active` -> `confirmed` is the happy path (see package_updater.ts).
 * `superseded` is a former active/confirmed version kept as a fallback. `failed` is a version
 * whose activation could not be confirmed. Both are inert leftovers cleanup_stale() may remove.
 */
export const VOCABULARY_PACKAGE_STATES = [
  "staging",
  "ready",
  "active",
  "confirmed",
  "superseded",
  "failed",
] as const;
export type VocabularyPackageState = (typeof VOCABULARY_PACKAGE_STATES)[number];

const KNOWN_STATES: ReadonlySet<string> = new Set(VOCABULARY_PACKAGE_STATES);
// A version currently being served to the Worker is either freshly promoted ("active", not yet
// proven by a query) or proven ("confirmed"). Exactly one record holds one of these two states
// at a time; activate() enforces that invariant.
const ACTIVE_LIKE_STATES: ReadonlySet<VocabularyPackageState> = new Set(["active", "confirmed"]);

export class PackageStoreError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PackageStoreError";
  }
}

function as_package_state(value: string): VocabularyPackageState {
  if (!KNOWN_STATES.has(value)) {
    throw new PackageStoreError(`Unknown vocabulary package state: ${value}`);
  }
  return value as VocabularyPackageState;
}

function as_semver_data_version(value: number | string): string {
  if (typeof value !== "string") {
    throw new PackageStoreError(
      `Expected a semver data_version string, got a number: ${String(value)}`,
    );
  }
  return value;
}

const StoredPackagePayloadSchema = z.strictObject({
  package_id: VocabularyPackageIdSchema,
  changelog: z.string().min(1).max(4_096),
  record_count: z.number().int().nonnegative(),
  compressed_size: z.number().int().nonnegative(),
  minimum_extension_version: VocabularySemverSchema,
  shard_entries: z.array(VocabularyShardEntrySchema),
  pinned: z.boolean(),
  confirmed_at: TimestampSchema.optional(),
});
type StoredPackagePayload = z.infer<typeof StoredPackagePayloadSchema>;

const StoredShardPayloadSchema = z.strictObject({
  package_record_id: z.string().min(1),
  shard_id: z.string().min(1),
  path: VocabularyShardPathSchema,
  sha256: z.string().regex(/^[a-f0-9]{64}$/u),
  byte_length: z.number().int().nonnegative(),
  bytes_base64: z.string().min(1),
});
type StoredShardPayload = z.infer<typeof StoredShardPayloadSchema>;

function parse_package_payload(payload: JsonValue | undefined): StoredPackagePayload {
  const result = StoredPackagePayloadSchema.safeParse(payload);
  if (!result.success) {
    throw new PackageStoreError("Stored vocabulary package payload failed validation");
  }
  return result.data;
}

function parse_shard_payload(payload: JsonValue | undefined): StoredShardPayload {
  const result = StoredShardPayloadSchema.safeParse(payload);
  if (!result.success) {
    throw new PackageStoreError("Stored vocabulary shard payload failed validation");
  }
  return result.data;
}

function package_payload_to_json(payload: StoredPackagePayload): JsonValue {
  return parse_json_value({
    package_id: payload.package_id,
    changelog: payload.changelog,
    record_count: payload.record_count,
    compressed_size: payload.compressed_size,
    minimum_extension_version: payload.minimum_extension_version,
    shard_entries: payload.shard_entries,
    pinned: payload.pinned,
    ...(payload.confirmed_at === undefined ? {} : { confirmed_at: payload.confirmed_at }),
  });
}

function shard_payload_to_json(payload: StoredShardPayload): JsonValue {
  return parse_json_value({ ...payload });
}

/** Chunked to avoid `String.fromCharCode(...bytes)` blowing the call-stack argument limit. */
function encode_base64(bytes: Uint8Array): string {
  let binary = "";
  const chunk_size = 32_768;
  for (let offset = 0; offset < bytes.length; offset += chunk_size) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunk_size));
  }
  return btoa(binary);
}

function decode_base64(value: string): Uint8Array {
  const binary = atob(value);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

export interface StoredVocabularyPackage {
  readonly record_id: string;
  readonly state: VocabularyPackageState;
  readonly pinned: boolean;
  readonly confirmed_at: string | undefined;
  readonly manifest: VocabularyManifest;
}

function to_manifest(data_version: string, payload: StoredPackagePayload): VocabularyManifest {
  return {
    package_id: payload.package_id,
    schema_version: VOCABULARY_SCHEMA_VERSION,
    data_version,
    changelog: payload.changelog,
    record_count: payload.record_count,
    compressed_size: payload.compressed_size,
    minimum_extension_version: payload.minimum_extension_version,
    shards: [...payload.shard_entries],
  };
}

function to_stored_package(record: VocabularyPackage): StoredVocabularyPackage {
  const payload = parse_package_payload(record.payload);
  return {
    record_id: record.id,
    state: as_package_state(record.state),
    pinned: payload.pinned,
    confirmed_at: payload.confirmed_at,
    manifest: to_manifest(as_semver_data_version(record.data_version), payload),
  };
}

/**
 * IndexedDB persistence for vocabulary package/shard lifecycle state, built strictly on the
 * `vocabulary_packages` / `vocabulary_shards` stores and repositories Stage 04's storage package
 * already provides (no ad-hoc connections, no schema changes). Shard byte content is stored
 * base64-encoded inside each shard record's generic `payload` field, since that field is the
 * only extension point the frozen store schema offers for binary content.
 */
export class VocabularyPackageStore {
  private readonly packages: VocabularyPackageRepository;
  private readonly shards: VocabularyShardRepository;
  // Lazily-built "<package_record_id>:<path>" -> shard record id index.
  // Without it, shard_bytes() -- the Worker's per-shard-cache-miss hot path
  // -- re-ran shards.list(namespace) (an IndexedDB getAll() across every
  // shard row, each carrying its own base64-encoded payload, plus a
  // structuredClone + zod parse per row) on every single call, which at a
  // 500,000-record / ~2,600-shard package made ordinary queries take
  // seconds. It deliberately stores only the record id: an earlier version
  // cached each row's whole payload, which pinned the entire package's
  // base64 content (~40 MB for the 500,000-record package) in Worker memory
  // for the Worker's lifetime -- several times the mobile LRU budget, and
  // invisible to it. A store instance lives for a Worker's whole lifetime
  // (vocabulary_worker.ts's PackageStoreShardByteSource), so this cache is
  // built once on first read and invalidated on every write.
  private shard_index_cache: Map<string, string> | null = null;

  // find_active_or_confirmed() sits on the same hot path -- shard_bytes()
  // resolves the active package on every read -- and is expensive out of all
  // proportion to its result: it lists every package row, and a package row's
  // payload embeds the whole shard_entries array (2,611 entries for the
  // 500,000-record package), which the storage layer's recursive JSON schema
  // and this file's StoredPackagePayloadSchema each walk in full. That is
  // tens of thousands of validated nodes per shard read.
  //
  // Caching it is only safe for a reader that knows no other component is
  // mutating package state underneath it, because PackageUpdater and
  // ImportBuilder own their own store instances -- so it is opt-in, and the
  // one opted-in caller (the Worker's PackageStoreShardByteSource) calls
  // invalidate_caches() after any update it triggers.
  private readonly cache_active_package: boolean;
  private active_package_cache: StoredVocabularyPackage | null | undefined = undefined;

  constructor(
    private readonly database: IDBPDatabase<DBSchema>,
    private readonly namespace: string,
    options: { readonly cache_active_package?: boolean } = {},
  ) {
    this.packages = new VocabularyPackageRepository(database);
    this.shards = new VocabularyShardRepository(database);
    this.cache_active_package = options.cache_active_package ?? false;
  }

  /** Drops every read cache; call after another store instance may have written. */
  invalidate_caches(): void {
    this.invalidate_shard_index_cache();
    this.invalidate_active_package_cache();
  }

  async list_packages(): Promise<StoredVocabularyPackage[]> {
    const records = await this.packages.list(this.namespace);
    return records.map(to_stored_package);
  }

  async find_active_or_confirmed(): Promise<StoredVocabularyPackage | null> {
    if (this.cache_active_package && this.active_package_cache !== undefined) {
      return this.active_package_cache;
    }
    const records = await this.list_packages();
    const active = records.find((record) => ACTIVE_LIKE_STATES.has(record.state)) ?? null;
    this.active_package_cache = active;
    return active;
  }

  private invalidate_active_package_cache(): void {
    this.active_package_cache = undefined;
  }

  async create_staging_package(manifest: VocabularyManifest): Promise<StoredVocabularyPackage> {
    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    const record: VocabularyPackage = {
      schema_version: 1,
      id,
      namespace: this.namespace,
      record_key: `${this.namespace}:${id}`,
      created_at: now,
      updated_at: now,
      data_version: manifest.data_version,
      state: "staging" satisfies VocabularyPackageState,
      payload: package_payload_to_json({
        package_id: manifest.package_id,
        changelog: manifest.changelog,
        record_count: manifest.record_count,
        compressed_size: manifest.compressed_size,
        minimum_extension_version: manifest.minimum_extension_version,
        shard_entries: manifest.shards,
        pinned: false,
      }),
    };
    await this.packages.create(this.namespace, record);
    this.invalidate_active_package_cache();
    return to_stored_package(record);
  }

  async put_shard_content(
    package_record: StoredVocabularyPackage,
    entry: VocabularyShardEntry,
    compressed_bytes: Uint8Array,
  ): Promise<void> {
    await this.create_shard_record(package_record, entry, encode_base64(compressed_bytes));
  }

  /**
   * Copies an unchanged shard's already-downloaded bytes from a prior package version into the
   * new one, so the updater never re-downloads content whose hash did not change.
   */
  async copy_shard(
    package_record: StoredVocabularyPackage,
    entry: VocabularyShardEntry,
    from_package_record_id: string,
  ): Promise<void> {
    const source = await this.find_shard_record(from_package_record_id, entry.path);
    if (source === null) {
      throw new PackageStoreError(`No source shard to copy for path: ${entry.path}`);
    }
    if (source.payload.sha256 !== entry.sha256) {
      throw new PackageStoreError(
        `Source shard content hash does not match the target manifest entry for ${entry.path}`,
      );
    }
    await this.create_shard_record(package_record, entry, source.payload.bytes_base64);
  }

  async mark_ready(package_record_id: string): Promise<void> {
    await this.transition_state(package_record_id, "ready");
  }

  /** Supersedes any currently active/confirmed record and promotes this one, in one transaction. */
  async activate(package_record_id: string): Promise<{ superseded_id: string | null }> {
    return with_transaction(this.database, ["vocabulary_packages"], async (transaction) => {
      const records = await this.packages.list(this.namespace, transaction);
      let superseded_id: string | null = null;
      for (const record of records) {
        if (record.id === package_record_id) {
          continue;
        }
        if (ACTIVE_LIKE_STATES.has(as_package_state(record.state))) {
          await this.packages.update(
            this.namespace,
            {
              ...record,
              state: "superseded" satisfies VocabularyPackageState,
              updated_at: new Date().toISOString(),
            },
            transaction,
          );
          superseded_id = record.id;
        }
      }
      const target = await this.require_record(package_record_id, transaction);
      await this.packages.update(
        this.namespace,
        {
          ...target,
          state: "active" satisfies VocabularyPackageState,
          updated_at: new Date().toISOString(),
        },
        transaction,
      );
      this.invalidate_active_package_cache();
      return { superseded_id };
    });
  }

  /** Marks the active version confirmed after its first successful Worker query. */
  async confirm(package_record_id: string): Promise<void> {
    const record = await this.require_record(package_record_id);
    if (as_package_state(record.state) !== "active") {
      throw new PackageStoreError(
        `Cannot confirm package ${package_record_id}: state is "${record.state}", not "active"`,
      );
    }
    await this.transition_state(package_record_id, "confirmed", {
      confirmed_at: new Date().toISOString(),
    });
  }

  /**
   * On a failed first query against a newly activated version, marks it `failed` and restores
   * the most recently confirmed superseded version to `confirmed` — it already proved itself,
   * so it does not re-enter `active` to be re-proven. Both transitions happen in one transaction.
   */
  async reselect_prior_confirmed(
    failed_package_record_id: string,
  ): Promise<StoredVocabularyPackage | null> {
    return with_transaction(this.database, ["vocabulary_packages"], async (transaction) => {
      const records = await this.packages.list(this.namespace, transaction);
      const candidates = records
        .filter((record) => record.id !== failed_package_record_id)
        .map((record) => ({ record, payload: parse_package_payload(record.payload) }))
        .filter(
          ({ record, payload }) =>
            as_package_state(record.state) === "superseded" && payload.confirmed_at !== undefined,
        )
        .sort((left, right) =>
          (right.payload.confirmed_at ?? "").localeCompare(left.payload.confirmed_at ?? ""),
        );
      const chosen = candidates[0];

      const failed_record = records.find((record) => record.id === failed_package_record_id);
      if (failed_record !== undefined) {
        await this.packages.update(
          this.namespace,
          {
            ...failed_record,
            state: "failed" satisfies VocabularyPackageState,
            updated_at: new Date().toISOString(),
          },
          transaction,
        );
      }
      this.invalidate_active_package_cache();
      if (chosen === undefined) {
        return null;
      }
      const restored: VocabularyPackage = {
        ...chosen.record,
        state: "confirmed" satisfies VocabularyPackageState,
        updated_at: new Date().toISOString(),
      };
      await this.packages.update(this.namespace, restored, transaction);
      return to_stored_package(restored);
    });
  }

  /** Deletes a staging package and every shard record it owns — used on interruption or a bad shard. */
  async rollback_staging(package_record_id: string): Promise<void> {
    const owned = await this.list_owned_shards(package_record_id);
    await with_transaction(
      this.database,
      ["vocabulary_packages", "vocabulary_shards"],
      async (transaction) => {
        for (const record of owned) {
          await this.shards.delete(this.namespace, record.id, transaction);
        }
        await this.packages.delete(this.namespace, package_record_id, transaction);
      },
    );
    this.invalidate_shard_index_cache();
    this.invalidate_active_package_cache();
  }

  /** Removes unpinned superseded/failed packages and their shards — never active/confirmed/staging/ready. */
  async cleanup_stale(): Promise<{ deleted_package_ids: string[] }> {
    const package_records = await this.packages.list(this.namespace);
    const deletable = package_records.filter((record) => {
      const payload = parse_package_payload(record.payload);
      const state = as_package_state(record.state);
      return (state === "superseded" || state === "failed") && !payload.pinned;
    });
    const deletable_ids = new Set(deletable.map((record) => record.id));

    const shard_records = await this.shards.list(this.namespace);
    const shards_to_delete = shard_records.filter((record) =>
      deletable_ids.has(parse_shard_payload(record.payload).package_record_id),
    );

    await with_transaction(
      this.database,
      ["vocabulary_packages", "vocabulary_shards"],
      async (transaction) => {
        for (const record of shards_to_delete) {
          await this.shards.delete(this.namespace, record.id, transaction);
        }
        for (const record of deletable) {
          await this.packages.delete(this.namespace, record.id, transaction);
        }
      },
    );
    this.invalidate_shard_index_cache();
    this.invalidate_active_package_cache();

    return { deleted_package_ids: [...deletable_ids] };
  }

  async set_pinned(package_record_id: string, pinned: boolean): Promise<void> {
    const record = await this.require_record(package_record_id);
    const payload = parse_package_payload(record.payload);
    await this.packages.update(this.namespace, {
      ...record,
      updated_at: new Date().toISOString(),
      payload: package_payload_to_json({ ...payload, pinned }),
    });
    this.invalidate_active_package_cache();
  }

  // --- ShardByteSource port (packages/vocabulary/src/search consumes this at integration) ---

  async manifest(): Promise<VocabularyManifest> {
    const active = await this.find_active_or_confirmed();
    if (active === null) {
      throw new PackageStoreError(`No active vocabulary package in namespace: ${this.namespace}`);
    }
    return active.manifest;
  }

  async shard_bytes(path: VocabularyShardPath): Promise<Uint8Array> {
    const active = await this.find_active_or_confirmed();
    if (active === null) {
      throw new PackageStoreError(`No active vocabulary package in namespace: ${this.namespace}`);
    }
    const entry = active.manifest.shards.find((shard) => shard.path === path);
    if (entry === undefined) {
      throw new PackageStoreError(`No shard manifest entry for path: ${path}`);
    }
    const found = await this.find_shard_record(active.record_id, path);
    if (found === null) {
      throw new PackageStoreError(`No shard bytes stored for path: ${path}`);
    }
    if (found.payload.byte_length !== entry.byte_length || found.payload.sha256 !== entry.sha256) {
      throw new PackageStoreError(
        `Stored shard metadata for ${path} does not match the active manifest`,
      );
    }
    const bytes = decode_base64(found.payload.bytes_base64);
    if (bytes.byteLength !== entry.byte_length) {
      throw new PackageStoreError(
        `Stored shard bytes for ${path} do not match the manifest byte_length`,
      );
    }
    const actual_sha256 = bytesToHex(sha256(bytes));
    if (actual_sha256 !== entry.sha256) {
      throw new PackageStoreError(
        `Stored shard bytes for ${path} do not match the manifest SHA-256`,
      );
    }
    return bytes;
  }

  private async create_shard_record(
    package_record: StoredVocabularyPackage,
    entry: VocabularyShardEntry,
    bytes_base64: string,
  ): Promise<void> {
    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    const kind: VocabularyIndexKind = VocabularyIndexKindSchema.parse(entry.kind);
    const record: VocabularyShard = {
      schema_version: 1,
      id,
      namespace: this.namespace,
      record_key: `${this.namespace}:${id}`,
      created_at: now,
      updated_at: now,
      data_version: package_record.manifest.data_version,
      kind,
      payload: shard_payload_to_json({
        package_record_id: package_record.record_id,
        shard_id: entry.shard_id,
        path: entry.path,
        sha256: entry.sha256,
        byte_length: entry.byte_length,
        bytes_base64,
      }),
    };
    await this.shards.create(this.namespace, record);
    this.invalidate_shard_index_cache();
  }

  private async list_owned_shards(package_record_id: string): Promise<VocabularyShard[]> {
    const records = await this.shards.list(this.namespace);
    return records.filter(
      (record) => parse_shard_payload(record.payload).package_record_id === package_record_id,
    );
  }

  private async get_shard_index(): Promise<ReadonlyMap<string, string>> {
    if (this.shard_index_cache === null) {
      const records = await this.shards.list(this.namespace);
      const index = new Map<string, string>();
      for (const record of records) {
        const payload = parse_shard_payload(record.payload);
        index.set(`${payload.package_record_id}:${payload.path}`, record.id);
      }
      this.shard_index_cache = index;
    }
    return this.shard_index_cache;
  }

  private invalidate_shard_index_cache(): void {
    this.shard_index_cache = null;
  }

  private async find_shard_record(
    package_record_id: string,
    path: string,
  ): Promise<{ record: VocabularyShard; payload: StoredShardPayload } | null> {
    const index = await this.get_shard_index();
    const record_id = index.get(`${package_record_id}:${path}`);
    if (record_id === undefined) {
      return null;
    }
    const record = await this.shards.get(this.namespace, record_id);
    return record === null ? null : { record, payload: parse_shard_payload(record.payload) };
  }

  private async require_record(
    package_record_id: string,
    transaction?: StorageWriteTransaction,
  ): Promise<VocabularyPackage> {
    const record = await this.packages.get(this.namespace, package_record_id, transaction);
    if (record === null) {
      throw new PackageStoreError(
        `No vocabulary package record ${package_record_id} in namespace ${this.namespace}`,
      );
    }
    return record;
  }

  private async transition_state(
    package_record_id: string,
    state: VocabularyPackageState,
    extra: { confirmed_at?: string } = {},
  ): Promise<void> {
    const record = await this.require_record(package_record_id);
    const payload = parse_package_payload(record.payload);
    await this.packages.update(this.namespace, {
      ...record,
      state,
      updated_at: new Date().toISOString(),
      payload: package_payload_to_json({
        ...payload,
        ...(extra.confirmed_at === undefined ? {} : { confirmed_at: extra.confirmed_at }),
      }),
    });
    this.invalidate_active_package_cache();
  }
}
