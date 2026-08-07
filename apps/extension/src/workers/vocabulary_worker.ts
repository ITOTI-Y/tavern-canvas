import {
  VOCABULARY_DETAIL_SHARD_MAX_RECORDS,
  vocabulary_alias_shard_partition,
  VocabularyWorkerRequestSchema,
  type VocabularyInitializeRequest,
  type VocabularyManifest,
  type VocabularyNextPageRequest,
  type VocabularyQueryRequest,
  type VocabularyRecord,
  type VocabularyShardEntry,
  type VocabularyShardPath,
  type VocabularyWorkerRequest,
  type VocabularyWorkerResponse,
} from "@tavern-canvas/contracts";
import { open_database } from "@tavern-canvas/storage";
import {
  code_point_group_key,
  create_package_client,
  decode_shard_bytes,
  detect_shard_memory_mode,
  normalize_vocabulary_query,
  PackageUpdater,
  plan_vocabulary_query,
  rank_vocabulary_candidates,
  resolve_shard_lru_budget_bytes,
  resolve_trigram_candidates,
  select_hydration_targets,
  ShardLru,
  VocabularyPackageStore,
  type NormalizedVocabularyQuery,
  type ShardByteSource,
  type ShardMemoryMode,
  type VocabularyDetailShardPayload,
  type VocabularyHotShardPayload,
  type VocabularyIndexEntry,
  type VocabularyPlannerCandidate,
  type VocabularyPrefixOrAliasShardPayload,
  type VocabularyRankedResult,
  type VocabularyRecordLike,
  type VocabularyTrigramShardPayload,
} from "@tavern-canvas/vocabulary";

// The Worker returns at most this many results per page, matching the
// frozen protocol's MAX_RESULT_PAGE_SIZE (packages/contracts/src/vocabulary_worker.ts,
// not exported there -- kept in lockstep by the shared VocabularySearchResultSchema
// max(50) bound both files are checked against).
const RESULT_PAGE_SIZE = 50;
// Trigram shards group by the first two code points of the trigram itself
// (tools/vocabulary_builder/src/build_trigram_index.ts), the same width as
// prefix/alias grouping -- not one code point, which an earlier version of
// this file assumed before the builder landed.
const TRIGRAM_GROUP_CODE_POINT_COUNT = 2;
const MANIFEST_CACHE_KEY = "__manifest__";
// A live query session (>50 ranked DTOs, held for next_page) is retained
// only until the NEXT one completes: the client's supersede semantics
// (vocabulary_client.ts's #supersede_active) mean a caller can never
// legitimately hold and page a cursor from before the most recent
// completed query, so anything older is unreachable dead weight. Without
// this cap, every multi-page search leaks ~10-20 KB forever outside all
// LRU accounting (a session is never touched by cancel, and #handle_query's
// cleanup only ever removes the CURRENT request_id's cancellation flag).
const MAX_QUERY_SESSIONS = 1;
// Same unbounded-leak shape as sessions, on a smaller scale (2 bytes/char
// UUID): a `cancel` that arrives after its target's `finally` already ran
// (the complete response was in flight when the user typed) adds an orphan
// entry #handle_query's cleanup will never remove, since that request_id
// will never run again.
const MAX_CANCELLED_REQUEST_IDS = 256;

class VocabularySearchCancelledError extends Error {
  constructor() {
    super("cancelled");
    this.name = "VocabularySearchCancelledError";
  }
}

function error_message(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

// Both #sessions and #cancelled_request_ids are Maps/Sets, which iterate in
// insertion order -- the oldest entry is always whatever `.keys().next()`
// yields, so a plain bounded FIFO needs no extra bookkeeping.
function evict_oldest_until_within_cap(
  collection: Map<string, unknown> | Set<string>,
  max_size: number,
): void {
  while (collection.size > max_size) {
    const oldest = collection.keys().next().value;
    if (oldest === undefined) {
      return;
    }
    collection.delete(oldest);
  }
}

// record_ids are dense, sequential, and 0-indexed (assign_record_ids in the
// builder), and detail shards chunk them contiguously in
// VOCABULARY_DETAIL_SHARD_MAX_RECORDS-sized blocks starting at 0
// (build_detail_shards.ts), so a record's shard start_id is always this
// floor -- verified directly by the builder-package integration test.
function detail_partition_start(record_id: number): number {
  return (
    Math.floor(record_id / VOCABULARY_DETAIL_SHARD_MAX_RECORDS) *
    VOCABULARY_DETAIL_SHARD_MAX_RECORDS
  );
}

function find_record(
  records: readonly VocabularyRecord[],
  record_id: number,
): VocabularyRecord | undefined {
  let low = 0;
  let high = records.length - 1;
  while (low <= high) {
    const mid = (low + high) >>> 1;
    const candidate = records[mid];
    if (candidate === undefined) {
      break;
    }
    if (candidate.record_id === record_id) {
      return candidate;
    }
    if (candidate.record_id < record_id) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return undefined;
}

/**
 * Locates the shard file for a group/record by `shard_id`, matching Task 2's
 * builder exactly (tools/vocabulary_builder/src/build_{prefix,alias,trigram,
 * detail,hot}_index.ts): `prefix:${group_key}` where group_key is the first
 * two normalized code points; `alias:${partition}` where partition is that
 * same group key hashed into one of 512 fixed buckets (payload contract
 * addendum v2 — computed directly here, never scanned for in the manifest);
 * `trigram:${group_key}` where group_key is the first two code points of the
 * trigram itself (not the query); `detail:${start_id}` where start_id is the
 * record's shard's first record_id (record_ids are dense/sequential/
 * 0-indexed, so this is a pure floor-division computation, no manifest lookup
 * table needed); and the single fixed `hot:global`. Reconciled against the
 * real builder output in builder_package_integration.test.ts.
 */
class ManifestShardIndex {
  readonly #by_shard_id = new Map<string, VocabularyShardEntry>();

  constructor(manifest: VocabularyManifest) {
    for (const shard of manifest.shards) {
      this.#by_shard_id.set(shard.shard_id, shard);
    }
  }

  hot(): VocabularyShardEntry | null {
    return this.#by_shard_id.get("hot:global") ?? null;
  }

  prefix(group_key: string): VocabularyShardEntry | null {
    return this.#by_shard_id.get(`prefix:${group_key}`) ?? null;
  }

  alias(group_key: string): VocabularyShardEntry | null {
    return this.#by_shard_id.get(`alias:${vocabulary_alias_shard_partition(group_key)}`) ?? null;
  }

  detail_covering(record_id: number): VocabularyShardEntry | null {
    return this.#by_shard_id.get(`detail:${String(detail_partition_start(record_id))}`) ?? null;
  }

  trigram(group_key: string): VocabularyShardEntry | null {
    return this.#by_shard_id.get(`trigram:${group_key}`) ?? null;
  }
}

// The payload contract's narrowed residency rule (addendum v2): a live
// query session pins the current page's COMPACT result DTOs and nothing
// else. The decoded detail shards those DTOs were extracted from are
// ordinary LRU citizens the moment extraction finishes.
interface QuerySession {
  readonly results: readonly VocabularyRankedResult[];
  offset: number;
}

export interface VocabularyWorkerEngineOptions {
  readonly memory_mode?: ShardMemoryMode;
  // Overrides the budget `memory_mode` would resolve. A host that knows its
  // own memory constraints better than navigator.deviceMemory does can set
  // it directly; tests use it to exercise eviction without building
  // multi-megabyte fixtures.
  readonly lru_budget_bytes?: number;
}

/**
 * Owns everything the brief assigns the Worker: package reads (via the
 * ShardByteSource port), decompression + MessagePack decode (shard_codec.ts),
 * in-memory indexes, cancellation flags, result cursors, and the decoded-
 * shard LRU. Pure message-in/response-out so it is testable without a real
 * Worker global scope; start_vocabulary_worker below wires it to one.
 */
export class VocabularyWorkerEngine {
  readonly #byte_source: ShardByteSource;
  readonly #lru: ShardLru;
  #shard_index: ManifestShardIndex | null = null;
  #disposed = false;
  readonly #cancelled_request_ids = new Set<string>();
  readonly #sessions = new Map<string, QuerySession>();

  constructor(byte_source: ShardByteSource, options: VocabularyWorkerEngineOptions = {}) {
    this.#byte_source = byte_source;
    this.#lru = new ShardLru({
      budget_bytes:
        options.lru_budget_bytes ??
        resolve_shard_lru_budget_bytes(options.memory_mode ?? detect_shard_memory_mode()),
    });
  }

  // Benchmark/ops introspection only (Stage 05 Task 6's browser LRU
  // high-water-mark proof) -- never part of the postMessage protocol, and
  // never influences search behavior. #lru already self-enforces its
  // configured budget synchronously inside put()/unpin() (shard_lru.ts), so
  // this getter only ever reports a value external callers could not
  // otherwise observe without reimplementing cache accounting.
  get resident_shard_bytes(): number {
    return this.#lru.resident_bytes;
  }

  // Companion to the above: the budget that high-water mark must respect.
  // Reading it from the live engine is what lets the benchmark gate each
  // worker against its OWN resolved budget instead of assuming one.
  get shard_lru_budget_bytes(): number {
    return this.#lru.budget_bytes;
  }

  // Ops introspection only, mirroring resident_shard_bytes -- proves
  // #sessions stays bounded at MAX_QUERY_SESSIONS instead of growing
  // unboundedly across repeated multi-page queries.
  get pending_session_count(): number {
    return this.#sessions.size;
  }

  // Ops introspection only -- proves #cancelled_request_ids stays bounded
  // at MAX_CANCELLED_REQUEST_IDS instead of accumulating orphaned cancel
  // targets forever.
  get pending_cancelled_request_count(): number {
    return this.#cancelled_request_ids.size;
  }

  async handle(
    request: VocabularyWorkerRequest,
    emit: (response: VocabularyWorkerResponse) => void,
  ): Promise<void> {
    if (this.#disposed) {
      if (request.type !== "dispose") {
        emit({
          type: "error",
          request_id: request.request_id,
          code: "not_ready",
          message: "Worker disposed",
        });
      }
      return;
    }

    switch (request.type) {
      case "initialize":
        await this.#handle_initialize(request, emit);
        return;
      case "query":
        await this.#handle_query(request, emit);
        return;
      case "next_page":
        this.#handle_next_page(request, emit);
        return;
      case "cancel":
        this.#cancelled_request_ids.add(request.target_request_id);
        evict_oldest_until_within_cap(this.#cancelled_request_ids, MAX_CANCELLED_REQUEST_IDS);
        return;
      case "import_source":
        // The ImportBuilder pipeline (packages/vocabulary/src/import/) is
        // complete but not wired into this engine -- responding here (rather
        // than falling through the switch with no case, which drops the
        // request on the floor) keeps the protocol from ever dead-airing a
        // schema-valid request. Full in-Worker wiring belongs to whichever
        // stage ships the import UI (ledgered in progress.md).
        emit({
          type: "error",
          request_id: request.request_id,
          code: "invalid_request",
          message: "import_source is not wired in this build",
        });
        return;
      case "dispose":
        this.#disposed = true;
        this.#sessions.clear();
        return;
    }
  }

  async #handle_initialize(
    request: VocabularyInitializeRequest,
    emit: (response: VocabularyWorkerResponse) => void,
  ): Promise<void> {
    try {
      const manifest = await this.#byte_source.manifest();
      this.#shard_index = new ManifestShardIndex(manifest);
      this.#lru.put(MANIFEST_CACHE_KEY, "manifest", manifest, JSON.stringify(manifest).length, {
        pinned: true,
      });
      emit({
        type: "ready",
        package_id: manifest.package_id,
        data_version: manifest.data_version,
        record_count: manifest.record_count,
      });
    } catch (error) {
      emit({
        type: "error",
        request_id: request.request_id,
        code: "package_unavailable",
        message: error_message(error),
      });
    }
  }

  async #handle_query(
    request: VocabularyQueryRequest,
    emit: (response: VocabularyWorkerResponse) => void,
  ): Promise<void> {
    if (this.#shard_index === null) {
      emit({
        type: "error",
        request_id: request.request_id,
        code: "not_ready",
        message: "initialize before query",
      });
      return;
    }

    const normalized = normalize_vocabulary_query(request.query);
    // Records hydrated for phase A are reused by the final pass, whose
    // candidate set is a superset -- otherwise every non-empty query decodes
    // its detail shards twice.
    const hydrated = new Map<number, VocabularyRecordLike | null>();
    try {
      const phase_a_candidates = await this.#collect_phase_a_candidates(
        request.request_id,
        normalized,
        request.category,
      );
      this.#check_cancelled(request.request_id);

      if (normalized.is_empty) {
        await this.#finish_query(
          request.request_id,
          phase_a_candidates,
          normalized,
          request.category,
          hydrated,
          emit,
        );
        return;
      }

      const phase_a = await this.#hydrate_and_rank(
        request.request_id,
        phase_a_candidates,
        normalized,
        request.category,
        hydrated,
      );
      this.#check_cancelled(request.request_id);
      emit({
        type: "partial_results",
        request_id: request.request_id,
        results: phase_a.slice(0, RESULT_PAGE_SIZE),
      });

      const trigram_candidates = await this.#collect_trigram_candidates(
        request.request_id,
        normalized,
      );
      this.#check_cancelled(request.request_id);

      await this.#finish_query(
        request.request_id,
        [...phase_a_candidates, ...trigram_candidates],
        normalized,
        request.category,
        hydrated,
        emit,
      );
    } catch (error) {
      if (error instanceof VocabularySearchCancelledError) {
        emit({
          type: "error",
          request_id: request.request_id,
          code: "cancelled",
          message: "cancelled",
        });
        return;
      }
      emit({
        type: "error",
        request_id: request.request_id,
        code: "internal_error",
        message: error_message(error),
      });
    } finally {
      this.#cancelled_request_ids.delete(request.request_id);
    }
  }

  #handle_next_page(
    request: VocabularyNextPageRequest,
    emit: (response: VocabularyWorkerResponse) => void,
  ): void {
    const session = this.#sessions.get(request.cursor);
    if (session === undefined) {
      emit({
        type: "error",
        request_id: request.request_id,
        code: "invalid_request",
        message: "unknown or expired cursor",
      });
      return;
    }

    // Pagination replays already-hydrated result DTOs held by the session,
    // so it needs no shard access at all.
    const page = session.results.slice(session.offset, session.offset + RESULT_PAGE_SIZE);
    session.offset += page.length;
    const has_more = session.offset < session.results.length;
    emit({
      type: "complete",
      request_id: request.request_id,
      results: page,
      next_cursor: has_more ? request.cursor : null,
    });
    if (!has_more) {
      this.#sessions.delete(request.cursor);
    }
  }

  async #finish_query(
    request_id: string,
    candidates: readonly VocabularyPlannerCandidate[],
    normalized: NormalizedVocabularyQuery,
    category: string | undefined,
    hydrated: Map<number, VocabularyRecordLike | null>,
    emit: (response: VocabularyWorkerResponse) => void,
  ): Promise<void> {
    const ranked = await this.#hydrate_and_rank(
      request_id,
      candidates,
      normalized,
      category,
      hydrated,
    );
    this.#check_cancelled(request_id);

    const page = ranked.slice(0, RESULT_PAGE_SIZE);
    if (ranked.length <= RESULT_PAGE_SIZE) {
      emit({ type: "complete", request_id, results: page, next_cursor: null });
      return;
    }
    const cursor = crypto.randomUUID();
    this.#sessions.set(cursor, { results: ranked, offset: RESULT_PAGE_SIZE });
    evict_oldest_until_within_cap(this.#sessions, MAX_QUERY_SESSIONS);
    emit({ type: "complete", request_id, results: page, next_cursor: cursor });
  }

  async #collect_phase_a_candidates(
    request_id: string,
    normalized: NormalizedVocabularyQuery,
    category: string | undefined,
  ): Promise<readonly VocabularyPlannerCandidate[]> {
    if (normalized.is_empty) {
      const hot_entry = this.#shard_index?.hot() ?? null;
      if (hot_entry === null) {
        return [];
      }
      const hot = await this.#load_shard_payload<VocabularyHotShardPayload>(
        hot_entry,
        "hot",
        request_id,
      );
      if (hot === null) {
        return [];
      }
      const hot_by_category =
        category !== undefined && category !== "" ? (hot.by_category[category] ?? []) : [];
      return plan_vocabulary_query({
        query: normalized,
        ...(category !== undefined ? { category } : {}),
        hot_global: hot.global,
        hot_by_category,
        prefix_entries: [],
        alias_entries: [],
        trigram_matches: new Map(),
      });
    }

    const prefix_entries = await this.#load_range_entries(
      normalized.group_key === null
        ? null
        : (this.#shard_index?.prefix(normalized.group_key) ?? null),
      "prefix",
      request_id,
    );
    this.#check_cancelled(request_id);
    const alias_entries = await this.#load_range_entries(
      normalized.group_key === null
        ? null
        : (this.#shard_index?.alias(normalized.group_key) ?? null),
      "alias",
      request_id,
    );

    return plan_vocabulary_query({
      query: normalized,
      ...(category !== undefined ? { category } : {}),
      hot_global: [],
      hot_by_category: [],
      prefix_entries,
      alias_entries,
      trigram_matches: new Map(),
    });
  }

  async #collect_trigram_candidates(
    request_id: string,
    normalized: NormalizedVocabularyQuery,
  ): Promise<readonly VocabularyPlannerCandidate[]> {
    if (normalized.trigrams.length === 0) {
      return [];
    }
    const group_keys = Array.from(
      new Set(
        normalized.trigrams.map((trigram) =>
          code_point_group_key(trigram, TRIGRAM_GROUP_CODE_POINT_COUNT),
        ),
      ),
    );
    const shards: VocabularyTrigramShardPayload[] = [];
    for (const group_key of group_keys) {
      this.#check_cancelled(request_id);
      const entry = this.#shard_index?.trigram(group_key) ?? null;
      if (entry === null) {
        continue;
      }
      const payload = await this.#load_shard_payload<VocabularyTrigramShardPayload>(
        entry,
        "trigram",
        request_id,
      );
      if (payload !== null) {
        shards.push(payload);
      }
    }
    const matches = resolve_trigram_candidates(shards, normalized.trigrams);
    return Array.from(matches, ([record_id, overlap]) => ({
      record_id,
      match_kind: "trigram" as const,
      matched_key: null,
      source_popularity: null,
      trigram_overlap: overlap,
    }));
  }

  async #load_range_entries(
    entry: VocabularyShardEntry | null,
    kind: "prefix" | "alias",
    request_id: string,
  ): Promise<readonly VocabularyIndexEntry[]> {
    if (entry === null) {
      return [];
    }
    const payload = await this.#load_shard_payload<VocabularyPrefixOrAliasShardPayload>(
      entry,
      kind,
      request_id,
    );
    if (payload === null) {
      return [];
    }
    return payload.entries.map(([key, record_id, popularity]) => ({ key, record_id, popularity }));
  }

  async #hydrate_and_rank(
    request_id: string,
    candidates: readonly VocabularyPlannerCandidate[],
    normalized: NormalizedVocabularyQuery,
    category: string | undefined,
    hydrated: Map<number, VocabularyRecordLike | null>,
  ): Promise<readonly VocabularyRankedResult[]> {
    const targets = select_hydration_targets(candidates);
    await this.#hydrate_records(
      request_id,
      targets.map((target) => target.record_id),
      hydrated,
    );
    return rank_vocabulary_candidates({
      candidates,
      ...(category !== undefined ? { category } : {}),
      detail_lookup: (record_id) => hydrated.get(record_id) ?? undefined,
      query_normalized: normalized.normalized,
    });
  }

  /**
   * Resolves every not-yet-known record id into `hydrated`, loading each
   * covering detail shard exactly once per call. `null` records a
   * confirmed absence so a repeat pass never re-fetches a shard for it.
   * The decoded shard is handed straight back to the LRU's ordinary
   * accounting -- nothing here retains it past extraction.
   */
  async #hydrate_records(
    request_id: string,
    record_ids: readonly number[],
    hydrated: Map<number, VocabularyRecordLike | null>,
  ): Promise<void> {
    const missing_by_shard = new Map<VocabularyShardEntry, number[]>();
    for (const record_id of record_ids) {
      if (hydrated.has(record_id)) {
        continue;
      }
      const entry = this.#shard_index?.detail_covering(record_id) ?? null;
      if (entry === null) {
        hydrated.set(record_id, null);
        continue;
      }
      const pending = missing_by_shard.get(entry) ?? [];
      pending.push(record_id);
      missing_by_shard.set(entry, pending);
    }

    for (const [entry, pending] of missing_by_shard) {
      const payload = await this.#load_shard_payload<VocabularyDetailShardPayload>(
        entry,
        "detail",
        request_id,
      );
      for (const record_id of pending) {
        hydrated.set(
          record_id,
          payload === null ? null : (find_record(payload.records, record_id) ?? null),
        );
      }
    }
  }

  async #load_shard_payload<T>(
    entry: VocabularyShardEntry,
    kind: "prefix" | "alias" | "trigram" | "detail" | "hot",
    request_id: string | null,
  ): Promise<T | null> {
    const cached = this.#lru.get(entry.path);
    if (cached !== undefined) {
      return cached as T;
    }
    if (request_id !== null) {
      this.#check_cancelled(request_id);
    }
    const compressed = await this.#byte_source.shard_bytes(entry.path);
    if (request_id !== null) {
      this.#check_cancelled(request_id);
    }
    const decoded = await decode_shard_bytes(compressed);
    this.#lru.put(entry.path, kind, decoded.payload, decoded.decoded_byte_size);
    return decoded.payload as T;
  }

  #check_cancelled(request_id: string): void {
    if (this.#cancelled_request_ids.has(request_id)) {
      throw new VocabularySearchCancelledError();
    }
  }
}

// Vocabulary data is shared reference content, not scoped to a profile/
// character the way other stores are (packages/storage's `namespace`
// generally means that) -- a fixed namespace is the correct model here, not
// an omission. Flagged for stage review alongside the rest of this
// production wiring.
const VOCABULARY_NAMESPACE = "vocabulary";

interface ReadyPackageAccess {
  readonly store: VocabularyPackageStore;
  readonly updater: PackageUpdater;
}

// The bundled baseline (apps/extension/public/vocabulary/baseline) is
// copied verbatim to dist/vocabulary/baseline (vite.config.ts,
// copyPublicDir), while this Worker script is pinned to dist/workers/*.js
// (vite.config.ts's worker.rolldownOptions.output) -- so from the Worker's
// own self.location, the baseline is always exactly one directory up.
export function resolve_bundled_baseline_base_url(scope: WorkerScopeLike): string {
  const { location } = scope;
  if (location === undefined) {
    throw new Error(
      "vocabulary_worker: self.location is unavailable, cannot resolve the bundled baseline URL",
    );
  }
  return new URL("../vocabulary/baseline/", location.href).href;
}

declare const __TAVERN_CANVAS_VERSION__: string;

/**
 * The real ShardByteSource for production: reads through
 * VocabularyPackageStore (IndexedDB). Nothing async runs at construction --
 * opening the database, and bootstrapping from the extension's bundled
 * baseline via PackageUpdater if no package has ever been activated yet,
 * both happen lazily on first use (the first inbound Worker message).
 * Constructing this class at module-evaluation time (as the production
 * entry point below does) must never itself touch IndexedDB or the
 * network -- merely importing this module (as every test here does) must
 * stay side-effect-free.
 */
export class PackageStoreShardByteSource implements ShardByteSource {
  readonly #scope: WorkerScopeLike;
  #ready_promise: Promise<ReadyPackageAccess> | null = null;

  constructor(scope: WorkerScopeLike) {
    this.#scope = scope;
  }

  async manifest(): Promise<VocabularyManifest> {
    const { store } = await this.#ensure_ready();
    return store.manifest();
  }

  async shard_bytes(path: VocabularyShardPath): Promise<Uint8Array> {
    const { store } = await this.#ensure_ready();
    return store.shard_bytes(path);
  }

  async report_query_success(): Promise<void> {
    const { updater } = await this.#ensure_ready();
    await updater.report_query_success();
  }

  async report_query_failure(): Promise<void> {
    const { updater } = await this.#ensure_ready();
    await updater.report_query_failure();
  }

  #ensure_ready(): Promise<ReadyPackageAccess> {
    this.#ready_promise ??= this.#initialize();
    return this.#ready_promise;
  }

  async #initialize(): Promise<ReadyPackageAccess> {
    const database = await open_database();
    // This store is a pure reader for the Worker's lifetime -- only the
    // PackageUpdater below (which owns its own store instance) ever writes
    // package state, and only from #initialize -- so it may cache the active
    // package lookup that shard_bytes() would otherwise redo per read.
    const store = new VocabularyPackageStore(database, VOCABULARY_NAMESPACE, {
      cache_active_package: true,
    });
    const client = create_package_client({
      kind: "bundled",
      base_url: resolve_bundled_baseline_base_url(this.#scope),
    });
    const updater = new PackageUpdater({
      database,
      namespace: VOCABULARY_NAMESPACE,
      client,
      current_extension_version: __TAVERN_CANVAS_VERSION__,
    });
    const active = await store.find_active_or_confirmed();
    if (active === null) {
      await updater.update();
      store.invalidate_caches(); // The updater wrote through its own store instance.
    }
    return { store, updater };
  }
}

export interface WorkerScopeLike {
  postMessage(message: unknown): void;
  addEventListener(type: "message", handler: (event: { data: unknown }) => void): void;
  // Only the real production entry point (below) reads this; test fakes
  // never need to supply it.
  readonly location?: { readonly href: string };
}

/**
 * Wires the engine to a real (or fake, in tests) Worker message scope:
 * validates every inbound message against the frozen protocol schema before
 * touching the engine, and posts every emitted response back out. Returns
 * the engine so callers (tests, and eventually integration code) can still
 * reach it directly if needed.
 */
export function start_vocabulary_worker(
  byte_source: ShardByteSource,
  scope: WorkerScopeLike,
  options?: VocabularyWorkerEngineOptions,
): VocabularyWorkerEngine {
  const engine = new VocabularyWorkerEngine(byte_source, options);
  scope.addEventListener("message", (event) => {
    const parsed = VocabularyWorkerRequestSchema.safeParse(event.data);
    if (!parsed.success) {
      return; // No request_id to correlate an error response to; drop silently.
    }
    void engine.handle(parsed.data, (response) => {
      scope.postMessage(response);
    });
  });
  return engine;
}

// Error codes that indicate the *package itself* is unusable (a corrupt
// shard, a manifest that never loaded) rather than a protocol/caller
// mistake ("invalid_request", "not_ready") or a benign supersession
// ("cancelled") -- only these justify reselecting the prior confirmed
// version. Implementer-chosen heuristic, flagged for stage review.
const PACKAGE_HEALTH_ERROR_CODES: ReadonlySet<string> = new Set([
  "package_unavailable",
  "internal_error",
]);

/**
 * Implements "old version remains until the new version completes one
 * successful Worker query" (plan Task 3) at the one place that can observe
 * every response the engine emits, without changing start_vocabulary_worker
 * or VocabularyWorkerEngine themselves: any "complete" response confirms
 * the active package; a package-health error reselects the prior confirmed
 * one. Both calls are idempotent no-ops once already confirmed/reselected.
 */
export function with_activation_lifecycle(
  scope: WorkerScopeLike,
  byte_source: PackageStoreShardByteSource,
): WorkerScopeLike {
  return {
    postMessage(message) {
      if (message !== null && typeof message === "object" && "type" in message) {
        const response = message as { readonly type: unknown; readonly code?: unknown };
        if (response.type === "complete") {
          // Best-effort lifecycle bookkeeping (IndexedDB write) -- its
          // failure must never surface as an unhandled rejection, since the
          // response has already been posted back to the caller by the time
          // this runs.
          void byte_source.report_query_success().catch(() => undefined);
        } else if (
          response.type === "error" &&
          typeof response.code === "string" &&
          PACKAGE_HEALTH_ERROR_CODES.has(response.code)
        ) {
          void byte_source.report_query_failure().catch(() => undefined);
        }
      }
      scope.postMessage(message);
    },
    addEventListener(type, handler) {
      scope.addEventListener(type, handler);
    },
  };
}

declare const self: WorkerScopeLike | undefined;

// Benchmark/ops introspection only (Stage 05 Task 6) -- a debug global
// exposing the running engine so an external harness (Playwright's
// `Worker.evaluate`) can read `resident_shard_bytes` for the LRU high-water
// mark without any protocol change. Never read by production code.
interface VocabularyWorkerDebugGlobal {
  __vocabulary_worker_engine_debug__?: VocabularyWorkerEngine;
}

// Purely synchronous: constructing PackageStoreShardByteSource and calling
// start_vocabulary_worker only registers a message listener. No IndexedDB
// or network access happens until a real message arrives.
if (typeof self !== "undefined" && typeof self.postMessage === "function") {
  const byte_source = new PackageStoreShardByteSource(self);
  const engine = start_vocabulary_worker(byte_source, with_activation_lifecycle(self, byte_source));
  (globalThis as VocabularyWorkerDebugGlobal).__vocabulary_worker_engine_debug__ = engine;
}
