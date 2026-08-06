import {
  VocabularyWorkerRequestSchema,
  type VocabularyInitializeRequest,
  type VocabularyManifest,
  type VocabularyNextPageRequest,
  type VocabularyQueryRequest,
  type VocabularyRecord,
  type VocabularyShardEntry,
  type VocabularyWorkerRequest,
  type VocabularyWorkerResponse,
} from "@tavern-canvas/contracts";
import {
  decode_shard_bytes,
  normalize_vocabulary_query,
  plan_vocabulary_query,
  rank_vocabulary_candidates,
  resolve_shard_lru_budget_bytes,
  resolve_trigram_candidates,
  select_hydration_targets,
  ShardLru,
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
const DETAIL_SHARD_RECORD_CAPACITY = 4096;
const MANIFEST_CACHE_KEY = "__manifest__";

class VocabularySearchCancelledError extends Error {
  constructor() {
    super("cancelled");
    this.name = "VocabularySearchCancelledError";
  }
}

function error_message(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function detail_partition_start(record_id: number): number {
  return Math.floor(record_id / DETAIL_SHARD_RECORD_CAPACITY) * DETAIL_SHARD_RECORD_CAPACITY;
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
 * Locates the shard file for a group/record. ASSUMED convention --
 * `${kind}:${partition}` shard_id -- since VocabularyManifestSchema
 * (packages/contracts/src/vocabulary.ts) carries no group/partition field
 * and payload-contract.md does not specify how a consumer addresses the
 * shard for a given prefix/alias group, trigram, or detail record range.
 * Flagged as a NEEDS_CONTEXT concern for the controller to reconcile
 * against Task 2's actual builder output; isolated here so fixing the
 * naming touches nothing else in the Worker.
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
    return this.#by_shard_id.get(`alias:${group_key}`) ?? null;
  }

  detail_covering(record_id: number): VocabularyShardEntry | null {
    return this.#by_shard_id.get(`detail:${String(detail_partition_start(record_id))}`) ?? null;
  }

  trigram(first_code_point: string): VocabularyShardEntry | null {
    return this.#by_shard_id.get(`trigram:${first_code_point}`) ?? null;
  }
}

interface QuerySession {
  readonly results: readonly VocabularyRankedResult[];
  readonly record_shard_keys: ReadonlyMap<number, string>;
  offset: number;
}

function detect_shard_memory_mode(): ShardMemoryMode {
  const navigator_like = (globalThis as { navigator?: { deviceMemory?: number } }).navigator;
  const device_memory = navigator_like?.deviceMemory;
  if (device_memory === undefined) {
    return "unknown";
  }
  return device_memory >= 8 ? "desktop" : "mobile";
}

export interface VocabularyWorkerEngineOptions {
  readonly memory_mode?: ShardMemoryMode;
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
  #active_page_shard_keys: ReadonlySet<string> = new Set();

  constructor(byte_source: ShardByteSource, options: VocabularyWorkerEngineOptions = {}) {
    this.#byte_source = byte_source;
    this.#lru = new ShardLru({
      budget_bytes: resolve_shard_lru_budget_bytes(
        options.memory_mode ?? detect_shard_memory_mode(),
      ),
    });
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
          emit,
        );
        return;
      }

      const phase_a = await this.#hydrate_and_rank(
        phase_a_candidates,
        normalized,
        request.category,
      );
      this.#check_cancelled(request.request_id);
      emit({
        type: "partial_results",
        request_id: request.request_id,
        results: phase_a.ranked.slice(0, RESULT_PAGE_SIZE),
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

    const page = session.results.slice(session.offset, session.offset + RESULT_PAGE_SIZE);
    // Pagination replays already-hydrated VocabularyRankedResult DTOs, so it
    // needs no new shard fetches; pin management here is a best-effort LRU
    // hint (a since-evicted shard is simply a no-op pin), never a
    // correctness dependency for this response.
    this.#update_page_pins(page, session.record_shard_keys);
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
    emit: (response: VocabularyWorkerResponse) => void,
  ): Promise<void> {
    const { ranked, record_shard_keys } = await this.#hydrate_and_rank(
      candidates,
      normalized,
      category,
    );
    this.#check_cancelled(request_id);

    const page = ranked.slice(0, RESULT_PAGE_SIZE);
    this.#update_page_pins(page, record_shard_keys);

    if (ranked.length <= RESULT_PAGE_SIZE) {
      emit({ type: "complete", request_id, results: page, next_cursor: null });
      return;
    }
    const cursor = crypto.randomUUID();
    this.#sessions.set(cursor, { results: ranked, record_shard_keys, offset: RESULT_PAGE_SIZE });
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
    const first_code_points = Array.from(
      new Set(normalized.trigrams.map((trigram) => Array.from(trigram)[0] ?? "")),
    );
    const shards: VocabularyTrigramShardPayload[] = [];
    for (const code_point of first_code_points) {
      this.#check_cancelled(request_id);
      const entry = this.#shard_index?.trigram(code_point) ?? null;
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
    candidates: readonly VocabularyPlannerCandidate[],
    normalized: NormalizedVocabularyQuery,
    category: string | undefined,
  ): Promise<{
    ranked: readonly VocabularyRankedResult[];
    record_shard_keys: ReadonlyMap<number, string>;
  }> {
    const targets = select_hydration_targets(candidates);
    const records = new Map<number, VocabularyRecordLike>();
    const record_shard_keys = new Map<number, string>();
    for (const target of targets) {
      if (records.has(target.record_id)) {
        continue;
      }
      const resolved = await this.#load_detail_record(target.record_id);
      if (resolved !== null) {
        records.set(target.record_id, resolved.record);
        record_shard_keys.set(target.record_id, resolved.shard_key);
      }
    }

    const ranked = rank_vocabulary_candidates({
      candidates,
      ...(category !== undefined ? { category } : {}),
      detail_lookup: (record_id) => records.get(record_id),
      query_normalized: normalized.normalized,
    });
    return { ranked, record_shard_keys };
  }

  async #load_detail_record(
    record_id: number,
  ): Promise<{ record: VocabularyRecordLike; shard_key: string } | null> {
    const shard_entry_value = this.#shard_index?.detail_covering(record_id) ?? null;
    if (shard_entry_value === null) {
      return null;
    }
    const payload = await this.#load_shard_payload<VocabularyDetailShardPayload>(
      shard_entry_value,
      "detail",
      null,
    );
    if (payload === null) {
      return null;
    }
    const record = find_record(payload.records, record_id);
    return record === undefined ? null : { record, shard_key: shard_entry_value.path };
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

  #update_page_pins(
    page: readonly VocabularyRankedResult[],
    record_shard_keys: ReadonlyMap<number, string>,
  ): void {
    const next_keys = new Set<string>();
    for (const result of page) {
      const key = record_shard_keys.get(result.record_id);
      if (key !== undefined) {
        next_keys.add(key);
      }
    }
    for (const previous_key of this.#active_page_shard_keys) {
      if (!next_keys.has(previous_key)) {
        this.#lru.unpin(previous_key);
      }
    }
    for (const key of next_keys) {
      this.#lru.pin(key);
    }
    this.#active_page_shard_keys = next_keys;
  }

  #check_cancelled(request_id: string): void {
    if (this.#cancelled_request_ids.has(request_id)) {
      throw new VocabularySearchCancelledError();
    }
  }
}

// A ShardByteSource that has not been wired to real storage yet: Task 3
// owns the IndexedDB-backed implementation (packages/vocabulary/src/package_store.ts),
// which this file must not import (ownership boundary). Rejecting loudly at
// use time -- rather than being silently inert -- keeps a standalone build
// of this Worker script diagnosable until the controller wires the real
// source in at merge.
class UnwiredShardByteSource implements ShardByteSource {
  manifest(): Promise<VocabularyManifest> {
    return Promise.reject(
      new Error(
        "vocabulary_worker: no ShardByteSource wired -- Task 3's package store must be injected at integration",
      ),
    );
  }

  shard_bytes(): Promise<Uint8Array> {
    return Promise.reject(
      new Error(
        "vocabulary_worker: no ShardByteSource wired -- Task 3's package store must be injected at integration",
      ),
    );
  }
}

export interface WorkerScopeLike {
  postMessage(message: unknown): void;
  addEventListener(type: "message", handler: (event: { data: unknown }) => void): void;
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

declare const self: WorkerScopeLike | undefined;
if (typeof self !== "undefined" && typeof self.postMessage === "function") {
  start_vocabulary_worker(new UnwiredShardByteSource(), self);
}
