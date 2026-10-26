import type { VocabularyIndexKind } from "@tavern-canvas/contracts";

export type ShardCacheKind = VocabularyIndexKind | "manifest";

export type ShardMemoryMode = "unknown" | "mobile" | "desktop";

export const MOBILE_LRU_BUDGET_BYTES = 16 * 1024 * 1024;
export const DESKTOP_LRU_BUDGET_BYTES = 64 * 1024 * 1024;

export function resolve_shard_lru_budget_bytes(mode: ShardMemoryMode): number {
  return mode === "desktop" ? DESKTOP_LRU_BUDGET_BYTES : MOBILE_LRU_BUDGET_BYTES;
}

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

// Lower evicts first, least-recently-used first within a tier. Prefix/alias shards are not ranked
// permanently above detail: one-shot index shards would crowd reusable detail shards out of the budget.
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

// A put() that cannot fit even after evicting every evictable entry is dropped at the end of the
// same call unless pinned.
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

  get(key: string): unknown {
    const entry = this.#entries.get(key);
    if (entry === undefined) {
      return undefined;
    }
    entry.sequence = this.#next_sequence();
    return entry.payload;
  }

  // `options.pinned` pins at insert time: put() enforces the budget immediately, so a later pin()
  // call could lose the entry to eviction.
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
        return;
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
