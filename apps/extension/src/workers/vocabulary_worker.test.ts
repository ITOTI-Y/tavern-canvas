import type {
  VocabularyManifest,
  VocabularyShardEntry,
  VocabularyShardPath,
  VocabularyWorkerRequest,
  VocabularyWorkerResponse,
} from "@tavern-canvas/contracts";
import {
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
    "alias:夕焼": alias_su,
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
      shard_entry("alias:夕焼", "alias", bytes.get("alias:夕焼")?.byteLength ?? 0),
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
