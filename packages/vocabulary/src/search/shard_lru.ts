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

export interface ShardCacheEntry {
  readonly key: string;
  readonly kind: ShardCacheKind;
  readonly byte_size: number;
  readonly pinned: boolean;
}

// Eviction priority: lower evicts first. Brief: "evict trigram then detail
// shards before active prefix/alias shards." hot and manifest are grouped
// with prefix/alias at the top tier -- both are small, always-relevant
// index data the brief doesn't call out for early eviction.
const EVICTION_TIER: Readonly<Record<ShardCacheKind, number>> = {
  trigram: 0,
  detail: 1,
  prefix: 2,
  alias: 2,
  hot: 2,
  manifest: 2,
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
