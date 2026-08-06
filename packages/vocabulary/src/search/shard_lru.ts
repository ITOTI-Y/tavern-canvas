import type { VocabularyIndexKind } from "@tavern-canvas/contracts";

// "manifest" is a local addition beyond the four shard index kinds: the
// Worker pins the loaded VocabularyManifest itself as a tiny, always-
// resident cache entry (brief: "pinned manifest metadata ... remain
// resident"), so it needs a tier/kind like everything else in the cache.
export type ShardCacheKind = VocabularyIndexKind | "manifest";

export type ShardMemoryMode = "unknown" | "mobile" | "desktop";

export const MOBILE_LRU_BUDGET_BYTES = 16 * 1024 * 1024;
export const DESKTOP_LRU_BUDGET_BYTES = 64 * 1024 * 1024;

export function resolve_shard_lru_budget_bytes(mode: ShardMemoryMode): number {
  return mode === "desktop" ? DESKTOP_LRU_BUDGET_BYTES : MOBILE_LRU_BUDGET_BYTES;
}

/**
 * Classifies the host from `navigator.deviceMemory` (GiB). Lives beside the
 * budget table rather than in the Worker so callers that only need to know
 * which budget a host will get -- the benchmark harness picks the
 * complementary mode to prove the other one -- can ask without importing
 * the Worker's side-effecting entry module.
 */
export function detect_shard_memory_mode(): ShardMemoryMode {
  const navigator_like = (globalThis as { navigator?: { deviceMemory?: number } }).navigator;
  const device_memory = navigator_like?.deviceMemory;
  if (device_memory === undefined) {
    return "unknown";
  }
  return device_memory >= 8 ? "desktop" : "mobile";
}

export interface ShardCacheEntry {
  readonly key: string;
  readonly kind: ShardCacheKind;
  readonly byte_size: number;
  readonly pinned: boolean;
}

// Eviction priority: lower evicts first, least-recently-used first within a
// tier. Brief: "evict trigram then detail shards before ACTIVE prefix/alias
// shards" -- trigram entries are the cheapest to rebuild (a few KB each,
// re-derivable from one small shard) so they get their own bottom tier, and
// "active" is expressed by recency rather than by a standing rank for the
// prefix/alias kinds. Ranking those kinds permanently above detail instead
// let one-shot index shards accumulate: a 500,000-record package's 676
// prefix shards total ~12 MB, enough to crowd every reusable detail shard
// out of a 16 MiB budget even though each is read by exactly one query
// (measured: doing so cost ~30% more detail-shard decodes per query).
const EVICTION_TIER: Readonly<Record<ShardCacheKind, number>> = {
  trigram: 0,
  detail: 1,
  prefix: 1,
  alias: 1,
  hot: 1,
  manifest: 1,
};

interface InternalEntry {
  readonly key: string;
  readonly kind: ShardCacheKind;
  readonly payload: unknown;
  readonly byte_size: number;
  pinned: boolean;
  sequence: number;
}

/**
 * Bounded in-memory cache of decoded shard payloads. Byte accounting is the
 * caller-supplied decoded size (see shard_codec.ts), never a compressed
 * file size. Eviction always prefers the lowest eviction tier and, within a
 * tier, the least-recently-used entry; pinned entries are never eviction
 * candidates. A put() that cannot fit even after evicting every evictable
 * entry is itself dropped at the end of the same call -- this is how a
 * shard that transiently exceeds budget while being decoded gets released
 * if the caller does not pin it.
 */
export class ShardLru {
  readonly #budget_bytes: number;
  readonly #entries = new Map<string, InternalEntry>();
  #sequence = 0;

  constructor(options: { readonly budget_bytes: number }) {
    this.#budget_bytes = options.budget_bytes;
  }

  get budget_bytes(): number {
    return this.#budget_bytes;
  }

  get resident_bytes(): number {
    let total = 0;
    for (const entry of this.#entries.values()) {
      total += entry.byte_size;
    }
    return total;
  }

  has(key: string): boolean {
    return this.#entries.has(key);
  }

  // Returns the cached payload as `unknown` -- this cache is opaque storage
  // (decoded shard payloads of varying shapes), not a type-safe container.
  // Callers cast at the call site (they already know which shard kind they
  // asked for).
  get(key: string): unknown {
    const entry = this.#entries.get(key);
    if (entry === undefined) {
      return undefined;
    }
    entry.sequence = this.#next_sequence();
    return entry.payload;
  }

  // `options.pinned` pins atomically at insert time -- put() immediately
  // enforces the budget, so pinning a freshly-decoded entry (manifest
  // metadata, the current result page) via a separate pin() call afterward
  // would race against eviction if the entry alone doesn't fit yet.
  put(
    key: string,
    kind: ShardCacheKind,
    payload: unknown,
    byte_size: number,
    options?: { readonly pinned?: boolean },
  ): void {
    const existing = this.#entries.get(key);
    this.#entries.set(key, {
      key,
      kind,
      payload,
      byte_size,
      pinned: options?.pinned ?? existing?.pinned ?? false,
      sequence: this.#next_sequence(),
    });
    this.#enforce_budget();
  }

  pin(key: string): void {
    const entry = this.#entries.get(key);
    if (entry !== undefined) {
      entry.pinned = true;
    }
  }

  unpin(key: string): void {
    const entry = this.#entries.get(key);
    if (entry !== undefined) {
      entry.pinned = false;
      this.#enforce_budget();
    }
  }

  evict(key: string): void {
    this.#entries.delete(key);
  }

  entries(): readonly ShardCacheEntry[] {
    return Array.from(this.#entries.values(), (entry) => ({
      key: entry.key,
      kind: entry.kind,
      byte_size: entry.byte_size,
      pinned: entry.pinned,
    }));
  }

  #next_sequence(): number {
    this.#sequence += 1;
    return this.#sequence;
  }

  #enforce_budget(): void {
    while (this.resident_bytes > this.#budget_bytes) {
      const candidate = this.#pick_eviction_candidate();
      if (candidate === null) {
        return; // Only pinned entries remain -- cannot reduce further.
      }
      this.#entries.delete(candidate.key);
    }
  }

  #pick_eviction_candidate(): InternalEntry | null {
    let best: InternalEntry | null = null;
    for (const entry of this.#entries.values()) {
      if (entry.pinned) {
        continue;
      }
      if (best === null) {
        best = entry;
        continue;
      }
      const entry_tier = EVICTION_TIER[entry.kind];
      const best_tier = EVICTION_TIER[best.kind];
      if (entry_tier < best_tier || (entry_tier === best_tier && entry.sequence < best.sequence)) {
        best = entry;
      }
    }
    return best;
  }
}
