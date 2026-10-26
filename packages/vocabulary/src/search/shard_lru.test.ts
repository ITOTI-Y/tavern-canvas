import { describe, expect, it } from "vitest";

import {
  DESKTOP_LRU_BUDGET_BYTES,
  MOBILE_LRU_BUDGET_BYTES,
  resolve_shard_lru_budget_bytes,
  ShardLru,
} from "./shard_lru.js";

describe("resolve_shard_lru_budget_bytes", () => {
  it("uses 16 MiB for unknown or mobile memory mode", () => {
    expect(resolve_shard_lru_budget_bytes("unknown")).toBe(16 * 1024 * 1024);
    expect(resolve_shard_lru_budget_bytes("mobile")).toBe(16 * 1024 * 1024);
    expect(MOBILE_LRU_BUDGET_BYTES).toBe(16 * 1024 * 1024);
  });

  it("uses 64 MiB for desktop memory mode", () => {
    expect(resolve_shard_lru_budget_bytes("desktop")).toBe(64 * 1024 * 1024);
    expect(DESKTOP_LRU_BUDGET_BYTES).toBe(64 * 1024 * 1024);
  });
});

describe("ShardLru", () => {
  it("tracks decoded byte size, not any compressed size the caller might pass separately", () => {
    const lru = new ShardLru({ budget_bytes: 1_000 });
    lru.put("shard-a", "detail", { marker: "a" }, 400);
    lru.put("shard-b", "detail", { marker: "b" }, 300);
    expect(lru.resident_bytes).toBe(700);
  });

  it("evicts trigram shards before detail shards under pressure", () => {
    const lru = new ShardLru({ budget_bytes: 100 });
    lru.put("trigram-1", "trigram", "t1", 50);
    lru.put("detail-1", "detail", "d1", 50);
    lru.put("detail-2", "detail", "d2", 30);
    expect(lru.has("trigram-1")).toBe(false);
    expect(lru.has("detail-1")).toBe(true);
    expect(lru.has("detail-2")).toBe(true);
  });

  it("evicts detail shards before active prefix/alias shards", () => {
    const lru = new ShardLru({ budget_bytes: 100 });
    lru.put("detail-1", "detail", "d1", 50);
    lru.put("prefix-1", "prefix", "p1", 50);
    lru.put("alias-1", "alias", "a1", 30);
    expect(lru.has("detail-1")).toBe(false);
    expect(lru.has("prefix-1")).toBe(true);
    expect(lru.has("alias-1")).toBe(true);
  });

  it("evicts a stale prefix shard before a freshly used detail shard", () => {
    const lru = new ShardLru({ budget_bytes: 100 });
    lru.put("prefix-stale", "prefix", "p", 50);
    lru.put("detail-hot", "detail", "d", 40);
    lru.get("detail-hot");
    lru.put("prefix-new", "prefix", "p2", 40);
    expect(lru.has("prefix-stale")).toBe(false);
    expect(lru.has("detail-hot")).toBe(true);
  });

  it("evicts within the same tier by least-recently-used order", () => {
    const lru = new ShardLru({ budget_bytes: 100 });
    lru.put("detail-1", "detail", "d1", 40);
    lru.put("detail-2", "detail", "d2", 40);
    lru.get("detail-1");
    lru.put("detail-3", "detail", "d3", 40);
    expect(lru.has("detail-2")).toBe(false);
    expect(lru.has("detail-1")).toBe(true);
    expect(lru.has("detail-3")).toBe(true);
  });

  it("keeps a pinned entry resident even when it is the oldest, lowest-tier entry", () => {
    const lru = new ShardLru({ budget_bytes: 100 });
    lru.put("trigram-1", "trigram", "t1", 60);
    lru.pin("trigram-1");
    lru.put("detail-1", "detail", "d1", 60);
    expect(lru.has("trigram-1")).toBe(true);
  });

  it("keeps pinned manifest metadata and the current result page resident under pressure from every other tier", () => {
    const lru = new ShardLru({ budget_bytes: 100 });
    lru.put("manifest", "manifest", { id: "pkg" }, 10);
    lru.pin("manifest");
    lru.put("detail-current-page", "detail", "page", 20);
    lru.pin("detail-current-page");

    lru.put("prefix-1", "prefix", "p1", 90);

    expect(lru.has("manifest")).toBe(true);
    expect(lru.has("detail-current-page")).toBe(true);
  });

  it("unpins a stale page so it becomes evictable again once a newer page is pinned", () => {
    const lru = new ShardLru({ budget_bytes: 60 });
    lru.put("page-old", "detail", "old", 50);
    lru.pin("page-old");
    lru.unpin("page-old");
    lru.put("page-new", "detail", "new", 50);
    expect(lru.has("page-old")).toBe(false);
    expect(lru.has("page-new")).toBe(true);
  });

  it("allows one shard to transiently exceed budget while decoding, then releases it since it cannot be retained", () => {
    const lru = new ShardLru({ budget_bytes: 100 });
    lru.put("oversized-detail", "detail", "huge", 500);
    expect(lru.has("oversized-detail")).toBe(false);
    expect(lru.resident_bytes).toBeLessThanOrEqual(100);
  });

  it("never evicts pinned entries even if pinned bytes alone exceed budget", () => {
    const lru = new ShardLru({ budget_bytes: 10 });
    lru.put("manifest", "manifest", { id: "pkg" }, 8, { pinned: true });
    lru.put("page", "detail", "page", 8, { pinned: true });
    expect(lru.has("manifest")).toBe(true);
    expect(lru.has("page")).toBe(true);
    expect(lru.resident_bytes).toBe(16);
  });

  it("returns the cached payload from get() and updates recency", () => {
    const lru = new ShardLru({ budget_bytes: 1_000 });
    lru.put("detail-1", "detail", { value: 42 }, 10);
    expect(lru.get("detail-1")).toEqual({ value: 42 });
    expect(lru.get("missing")).toBeUndefined();
  });
});
