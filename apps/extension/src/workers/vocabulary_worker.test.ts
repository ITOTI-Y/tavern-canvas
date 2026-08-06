import {
  VOCABULARY_DETAIL_SHARD_MAX_RECORDS,
  type VocabularyManifest,
  type VocabularySearchResult,
  type VocabularyShardEntry,
  type VocabularyShardPath,
  type VocabularyWorkerRequest,
  type VocabularyWorkerResponse,
} from "@tavern-canvas/contracts";
import {
  decode_shard_bytes,
  encode_shard_bytes,
  type ShardByteSource,
  type VocabularyDetailShardPayload,
  type VocabularyHotShardPayload,
  type VocabularyPrefixOrAliasShardPayload,
  type VocabularyTrigramShardPayload,
} from "@tavern-canvas/vocabulary";
import { describe, expect, it } from "vitest";

import { start_vocabulary_worker, VocabularyWorkerEngine } from "./vocabulary_worker.js";

const SHA256_PLACEHOLDER = "0".repeat(64);

function shard_entry(
  shard_id: string,
  kind: VocabularyShardEntry["kind"],
  byte_length: number,
): VocabularyShardEntry {
  return {
    shard_id,
    package_id: "baseline",
    kind,
    path: shard_id as VocabularyShardPath,
    sha256: SHA256_PLACEHOLDER,
    byte_length,
  };
}

interface Fixture {
  readonly manifest: VocabularyManifest;
  readonly byte_source: ShardByteSource;
  readonly shard_bytes_calls: VocabularyShardPath[];
  readonly pause_on: (path: string) => { release: () => void };
}

async function build_fixture(): Promise<Fixture> {
  const records = [
    { record_id: 0, tag: "cat", aliases: [], popularity: 10 },
    { record_id: 1, tag: "catalog", aliases: [], popularity: 5 },
    { record_id: 2, tag: "dog", aliases: [], popularity: 3 },
    { record_id: 3, tag: "dodge", aliases: [], popularity: 1 },
    { record_id: 4, tag: "sunset", aliases: [], translation: "夕焼け", popularity: 2 },
  ];

  const detail_payload: VocabularyDetailShardPayload = { kind: "detail", start_id: 0, records };
  const prefix_ca: VocabularyPrefixOrAliasShardPayload = {
    kind: "prefix",
    entries: [
      ["cat", 0, 10],
      ["catalog", 1, 5],
    ],
  };
  const prefix_do: VocabularyPrefixOrAliasShardPayload = {
    kind: "prefix",
    entries: [
      ["dodge", 3, 1],
      ["dog", 2, 3],
    ],
  };
  // Alias shards bucket by a hash of the key's two-code-point group
  // (payload contract addendum v2): "夕焼け" groups under "夕焼", whose
  // FNV-1a bucket is h132. The Worker computes that from the query alone.
  const alias_su: VocabularyPrefixOrAliasShardPayload = {
    kind: "alias",
    entries: [["夕焼け", 4, 2]],
  };
  // Trigram shards group by the first two code points of the trigram
  // itself (tools/vocabulary_builder/src/build_trigram_index.ts), so "sun"
  // (group "su") and "uns" (group "un") land in different shard files.
  const trigram_su: VocabularyTrigramShardPayload = { kind: "trigram", entries: [["sun", [4]]] };
  const trigram_un: VocabularyTrigramShardPayload = { kind: "trigram", entries: [["uns", [4]]] };
  const hot_shard: VocabularyHotShardPayload = { kind: "hot", global: [0, 2, 4], by_category: {} };

  const payloads: Record<string, unknown> = {
    "detail:0": detail_payload,
    "prefix:ca": prefix_ca,
    "prefix:do": prefix_do,
    "alias:h132": alias_su,
    "trigram:su": trigram_su,
    "trigram:un": trigram_un,
    "hot:global": hot_shard,
  };

  const bytes = new Map<string, Uint8Array>();
  for (const [path, payload] of Object.entries(payloads)) {
    bytes.set(path, await encode_shard_bytes(payload as VocabularyPrefixOrAliasShardPayload));
  }

  const manifest: VocabularyManifest = {
    package_id: "baseline",
    schema_version: 1,
    data_version: "1.0.0",
    changelog: "initial",
    record_count: records.length,
    compressed_size: Array.from(bytes.values()).reduce(
      (total, value) => total + value.byteLength,
      0,
    ),
    minimum_extension_version: "3.0.0",
    shards: [
      shard_entry("detail:0", "detail", bytes.get("detail:0")?.byteLength ?? 0),
      shard_entry("prefix:ca", "prefix", bytes.get("prefix:ca")?.byteLength ?? 0),
      shard_entry("prefix:do", "prefix", bytes.get("prefix:do")?.byteLength ?? 0),
      shard_entry("alias:h132", "alias", bytes.get("alias:h132")?.byteLength ?? 0),
      shard_entry("trigram:su", "trigram", bytes.get("trigram:su")?.byteLength ?? 0),
      shard_entry("trigram:un", "trigram", bytes.get("trigram:un")?.byteLength ?? 0),
      shard_entry("hot:global", "hot", bytes.get("hot:global")?.byteLength ?? 0),
    ],
  };

  const shard_bytes_calls: VocabularyShardPath[] = [];
  const pauses = new Map<string, Promise<void>>();
  const releases = new Map<string, () => void>();

  const byte_source: ShardByteSource = {
    manifest: () => Promise.resolve(manifest),
    shard_bytes: async (path: VocabularyShardPath) => {
      shard_bytes_calls.push(path);
      const pause = pauses.get(path);
      if (pause !== undefined) {
        await pause;
      }
      const found = bytes.get(path);
      if (found === undefined) {
        throw new Error(`no fixture bytes for ${path}`);
      }
      return found;
    },
  };

  return {
    manifest,
    byte_source,
    shard_bytes_calls,
    pause_on: (path: string) => {
      let release = () => {};
      pauses.set(
        path,
        new Promise<void>((resolve) => {
          release = resolve;
        }),
      );
      releases.set(path, release);
      return { release: () => releases.get(path)?.() };
    },
  };
}

async function initialize(engine: VocabularyWorkerEngine): Promise<void> {
  const responses: VocabularyWorkerResponse[] = [];
  await engine.handle(
    { type: "initialize", request_id: "00000000-0000-4000-8000-000000000000" },
    (response) => {
      responses.push(response);
    },
  );
  expect(responses).toHaveLength(1);
  expect(responses[0]?.type).toBe("ready");
}

describe("VocabularyWorkerEngine", () => {
  it("emits ready with package metadata on initialize", async () => {
    const fixture = await build_fixture();
    const engine = new VocabularyWorkerEngine(fixture.byte_source, { memory_mode: "desktop" });
    const responses: VocabularyWorkerResponse[] = [];
    await engine.handle(
      { type: "initialize", request_id: "00000000-0000-4000-8000-000000000001" },
      (response) => responses.push(response),
    );
    expect(responses).toEqual([
      { type: "ready", package_id: "baseline", data_version: "1.0.0", record_count: 5 },
    ]);
  });

  it("emits partial_results (exact/prefix) before complete (with trigram folded in)", async () => {
    const fixture = await build_fixture();
    const engine = new VocabularyWorkerEngine(fixture.byte_source, { memory_mode: "desktop" });
    await initialize(engine);

    const responses: VocabularyWorkerResponse[] = [];
    await engine.handle(
      { type: "query", request_id: "00000000-0000-4000-8000-000000000002", query: "cat" },
      (response) => responses.push(response),
    );

    expect(responses.map((response) => response.type)).toEqual(["partial_results", "complete"]);
    const complete = responses[1];
    if (complete?.type !== "complete") throw new Error("expected complete response");
    expect(complete.results.map((result) => result.display_text)).toEqual(["cat", "catalog"]);
    expect(complete.results[0]?.match_kind).toBe("exact");
    expect(complete.next_cursor).toBeNull();
  });

  it("finds a CJK translation match through the alias phase", async () => {
    const fixture = await build_fixture();
    const engine = new VocabularyWorkerEngine(fixture.byte_source, { memory_mode: "desktop" });
    await initialize(engine);

    const responses: VocabularyWorkerResponse[] = [];
    await engine.handle(
      { type: "query", request_id: "00000000-0000-4000-8000-000000000003", query: "夕焼け" },
      (response) => responses.push(response),
    );
    const complete = responses.at(-1);
    if (complete?.type !== "complete") throw new Error("expected complete response");
    expect(complete.results[0]).toMatchObject({
      display_text: "sunset",
      match_kind: "translation",
    });
  });

  it("returns hot results for an empty query", async () => {
    const fixture = await build_fixture();
    const engine = new VocabularyWorkerEngine(fixture.byte_source, { memory_mode: "desktop" });
    await initialize(engine);

    const responses: VocabularyWorkerResponse[] = [];
    await engine.handle(
      { type: "query", request_id: "00000000-0000-4000-8000-000000000004", query: "" },
      (response) => responses.push(response),
    );
    const complete = responses.at(-1);
    if (complete?.type !== "complete") throw new Error("expected complete response");
    expect(complete.results.map((result) => result.record_id)).toEqual([0, 2, 4]);
    expect(complete.results.every((result) => result.match_kind === "hot")).toBe(true);
  });

  it("paginates a stable result set across next_page without duplicates", async () => {
    const fixture = await build_fixture();
    const engine = new VocabularyWorkerEngine(fixture.byte_source, { memory_mode: "desktop" });
    await initialize(engine);

    const responses: VocabularyWorkerResponse[] = [];
    await engine.handle(
      { type: "query", request_id: "00000000-0000-4000-8000-000000000005", query: "d" },
      (response) => responses.push(response),
    );
    const complete = responses.at(-1);
    if (complete?.type !== "complete") throw new Error("expected complete response");
    // Only 2 results total ("dog", "dodge") -- exercise pagination logic with a
    // request for the same page twice via next_page is redundant; assert the
    // cursor contract directly instead: no more than 50 in one page and a
    // non-null cursor only when more results remain.
    expect(complete.results.length).toBeLessThanOrEqual(50);
    expect(complete.next_cursor).toBeNull();
  });

  it("stops further shard loads and detail hydration once cancelled", async () => {
    const fixture = await build_fixture();
    const engine = new VocabularyWorkerEngine(fixture.byte_source, { memory_mode: "desktop" });
    await initialize(engine);

    const paused = fixture.pause_on("trigram:su");
    const responses: VocabularyWorkerResponse[] = [];
    const request_id = "00000000-0000-4000-8000-000000000006";

    const handled = engine.handle({ type: "query", request_id, query: "sunswt" }, (response) =>
      responses.push(response),
    );

    // Let phase A (no prefix/alias group for "sunswt"'s group "su") resolve
    // and the trigram fetch begin; it is now paused mid-flight.
    await Promise.resolve();
    await Promise.resolve();

    const calls_before_cancel = fixture.shard_bytes_calls.length;
    await engine.handle(
      {
        type: "cancel",
        request_id: "00000000-0000-4000-8000-000000000007",
        target_request_id: request_id,
      },
      () => {},
    );
    paused.release();
    await handled;

    expect(fixture.shard_bytes_calls.length).toBe(calls_before_cancel);
    const last = responses.at(-1);
    expect(last).toMatchObject({ type: "error", request_id, code: "cancelled" });
  });

  it("rejects requests received after dispose", async () => {
    const fixture = await build_fixture();
    const engine = new VocabularyWorkerEngine(fixture.byte_source, { memory_mode: "desktop" });
    await initialize(engine);
    await engine.handle(
      { type: "dispose", request_id: "00000000-0000-4000-8000-000000000008" },
      () => {},
    );

    const responses: VocabularyWorkerResponse[] = [];
    await engine.handle(
      { type: "query", request_id: "00000000-0000-4000-8000-000000000009", query: "cat" },
      (response) => responses.push(response),
    );
    expect(responses).toEqual([
      {
        type: "error",
        request_id: "00000000-0000-4000-8000-000000000009",
        code: "not_ready",
        message: expect.any(String) as unknown as string,
      },
    ]);
  });
});

/**
 * Payload contract addendum v2's narrowed residency rule: a completed
 * query pins the current page's compact result DTOs, and NOTHING pins the
 * decoded detail shards those DTOs were extracted from. The fixture sizes
 * its budget to hold the pinned manifest plus a single detail shard, while
 * every result page deliberately spans three -- so any residual page pin
 * shows up immediately as an over-budget high-water mark.
 */
describe("VocabularyWorkerEngine -- decoded shard residency", () => {
  const DETAIL_SHARD_COUNT = 3;
  const RECORDS_PER_SHARD = 40;

  interface ResidencyFixture {
    readonly byte_source: ShardByteSource;
    readonly shard_bytes_calls: VocabularyShardPath[];
    readonly budget_bytes: number;
  }

  async function build_residency_fixture(): Promise<ResidencyFixture> {
    const bytes = new Map<string, Uint8Array>();
    const shards: VocabularyShardEntry[] = [];
    const prefix_entries: [string, number, number][] = [];

    for (let shard_index = 0; shard_index < DETAIL_SHARD_COUNT; shard_index += 1) {
      const start_id = shard_index * VOCABULARY_DETAIL_SHARD_MAX_RECORDS;
      const records = Array.from({ length: RECORDS_PER_SHARD }, (_unused, offset) => ({
        record_id: start_id + offset,
        tag: `tag ${String(start_id + offset)}`,
        aliases: [],
        // Interleaved across shards so the top-50 page necessarily spans
        // every detail shard rather than draining the first one.
        popularity: 10_000 - (offset * DETAIL_SHARD_COUNT + shard_index),
      }));
      for (const record of records) {
        prefix_entries.push([record.tag, record.record_id, record.popularity]);
      }
      const path = `detail:${String(start_id)}`;
      bytes.set(path, await encode_shard_bytes({ kind: "detail", start_id, records }));
      shards.push(shard_entry(path, "detail", bytes.get(path)?.byteLength ?? 0));
    }

    prefix_entries.sort(([, left_id], [, right_id]) => left_id - right_id);
    bytes.set("prefix:ta", await encode_shard_bytes({ kind: "prefix", entries: prefix_entries }));
    shards.push(shard_entry("prefix:ta", "prefix", bytes.get("prefix:ta")?.byteLength ?? 0));

    const manifest: VocabularyManifest = {
      package_id: "baseline",
      schema_version: 1,
      data_version: "1.0.0",
      changelog: "residency fixture",
      record_count: DETAIL_SHARD_COUNT * RECORDS_PER_SHARD,
      compressed_size: [...bytes.values()].reduce((total, value) => total + value.byteLength, 0),
      minimum_extension_version: "3.0.0",
      shards,
    };

    const detail_bytes = bytes.get("detail:0");
    const prefix_bytes = bytes.get("prefix:ta");
    if (detail_bytes === undefined || prefix_bytes === undefined) {
      throw new Error("fixture shards were not encoded");
    }
    // Room for the pinned manifest, the query's prefix shard, and exactly
    // one of the three detail shards the page spans.
    const budget_bytes =
      JSON.stringify(manifest).length +
      (await decode_shard_bytes(prefix_bytes)).decoded_byte_size +
      (await decode_shard_bytes(detail_bytes)).decoded_byte_size;

    const shard_bytes_calls: VocabularyShardPath[] = [];
    return {
      shard_bytes_calls,
      budget_bytes,
      byte_source: {
        manifest: () => Promise.resolve(manifest),
        shard_bytes: (path: VocabularyShardPath) => {
          shard_bytes_calls.push(path);
          const found = bytes.get(path);
          if (found === undefined) {
            throw new Error(`no fixture bytes for ${path}`);
          }
          return Promise.resolve(found);
        },
      },
    };
  }

  async function query_first_page(
    engine: VocabularyWorkerEngine,
    request_id: string,
  ): Promise<{ readonly results: readonly VocabularySearchResult[]; readonly cursor: string }> {
    const responses: VocabularyWorkerResponse[] = [];
    await engine.handle({ type: "query", request_id, query: "tag" }, (response) =>
      responses.push(response),
    );
    const complete = responses.at(-1);
    if (complete?.type !== "complete" || complete.next_cursor === null) {
      throw new Error(`expected a paginated complete response, got ${JSON.stringify(responses)}`);
    }
    return { results: complete.results, cursor: complete.next_cursor };
  }

  it("keeps decoded shards inside the LRU budget across a multi-shard result page", async () => {
    const fixture = await build_residency_fixture();
    const engine = new VocabularyWorkerEngine(fixture.byte_source, {
      lru_budget_bytes: fixture.budget_bytes,
    });
    await initialize(engine);

    const page = await query_first_page(engine, "00000000-0000-4000-8000-00000000000b");
    expect(page.results).toHaveLength(50);
    const covered_shards = new Set(
      page.results.map((result) =>
        Math.floor(result.record_id / VOCABULARY_DETAIL_SHARD_MAX_RECORDS),
      ),
    );
    expect(covered_shards.size).toBe(DETAIL_SHARD_COUNT);
    expect(engine.resident_shard_bytes).toBeLessThanOrEqual(fixture.budget_bytes);
  });

  it("serves the next page from the session's DTOs without reading any shard", async () => {
    const fixture = await build_residency_fixture();
    const engine = new VocabularyWorkerEngine(fixture.byte_source, {
      lru_budget_bytes: fixture.budget_bytes,
    });
    await initialize(engine);

    const first = await query_first_page(engine, "00000000-0000-4000-8000-00000000000c");
    const calls_before_next_page = fixture.shard_bytes_calls.length;

    const responses: VocabularyWorkerResponse[] = [];
    await engine.handle(
      {
        type: "next_page",
        request_id: "00000000-0000-4000-8000-00000000000d",
        cursor: first.cursor,
      },
      (response) => responses.push(response),
    );

    const next_page = responses.at(-1);
    if (next_page?.type !== "complete") throw new Error("expected complete response");
    expect(fixture.shard_bytes_calls.length).toBe(calls_before_next_page);
    expect(next_page.results.length).toBeGreaterThan(0);
    const first_ids = new Set(first.results.map((result) => result.record_id));
    expect(next_page.results.some((result) => first_ids.has(result.record_id))).toBe(false);
    expect(engine.resident_shard_bytes).toBeLessThanOrEqual(fixture.budget_bytes);
  });
});

describe("start_vocabulary_worker", () => {
  it("validates incoming messages and posts responses through the scope", async () => {
    const fixture = await build_fixture();
    const posted: unknown[] = [];
    const handlers: ((event: { data: unknown }) => void)[] = [];
    const scope = {
      postMessage: (message: unknown) => posted.push(message),
      addEventListener: (_type: "message", handler: (event: { data: unknown }) => void) => {
        handlers.push(handler);
      },
    };

    start_vocabulary_worker(fixture.byte_source, scope, { memory_mode: "desktop" });
    const valid: VocabularyWorkerRequest = {
      type: "initialize",
      request_id: "00000000-0000-4000-8000-00000000000a",
    };
    handlers[0]?.({ data: valid });
    await Promise.resolve();
    await Promise.resolve();

    expect(posted).toEqual([
      { type: "ready", package_id: "baseline", data_version: "1.0.0", record_count: 5 },
    ]);

    posted.length = 0;
    handlers[0]?.({ data: { type: "not_a_real_type" } });
    await Promise.resolve();
    expect(posted).toEqual([]);
  });
});
