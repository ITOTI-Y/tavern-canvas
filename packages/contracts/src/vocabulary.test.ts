import { describe, expect, it } from "vitest";

import {
  normalizeVocabularySearchKey,
  VocabularyIndexKindSchema,
  VocabularyManifestSchema,
  VocabularyRecordCollectionSchema,
  VocabularyRecordSchema,
} from "./vocabulary.js";
import {
  VocabularySearchResultSchema,
  VocabularyWorkerRequestSchema,
  VocabularyWorkerResponseSchema,
} from "./vocabulary_worker.js";

const request_id = "550e8400-e29b-41d4-a716-446655440000";
const target_request_id = "6ba7b810-9dad-41d1-80b4-00c04fd430c8";

describe("VocabularyRecordSchema", () => {
  const minimal_record = {
    record_id: 1,
    tag: "1girl",
  };

  const full_record = {
    record_id: 2,
    tag: "cat_ears",
    translation: "猫耳",
    aliases: ["neko_mimi", "catears"],
    category: "general",
    popularity: 12_345,
    description: "A character with cat-like ears.",
  };

  it("accepts a minimal record and defaults aliases and popularity", () => {
    expect(VocabularyRecordSchema.parse(minimal_record)).toEqual({
      ...minimal_record,
      aliases: [],
      popularity: 0,
    });
  });

  it("accepts a fully populated record unchanged", () => {
    expect(VocabularyRecordSchema.parse(full_record)).toEqual(full_record);
  });

  it("rejects unknown top-level keys", () => {
    const result = VocabularyRecordSchema.safeParse({ ...minimal_record, extra: true });
    expect(result.success).toBe(false);
  });

  it("rejects a negative or non-integer record_id", () => {
    expect(VocabularyRecordSchema.safeParse({ ...minimal_record, record_id: -1 }).success).toBe(
      false,
    );
    expect(VocabularyRecordSchema.safeParse({ ...minimal_record, record_id: 1.5 }).success).toBe(
      false,
    );
  });

  it("rejects a negative or non-integer popularity", () => {
    expect(VocabularyRecordSchema.safeParse({ ...minimal_record, popularity: -1 }).success).toBe(
      false,
    );
    expect(VocabularyRecordSchema.safeParse({ ...minimal_record, popularity: 1.5 }).success).toBe(
      false,
    );
  });

  it("accepts an empty aliases array", () => {
    expect(VocabularyRecordSchema.safeParse({ ...minimal_record, aliases: [] }).success).toBe(true);
  });

  it("rejects an empty-string alias", () => {
    expect(VocabularyRecordSchema.safeParse({ ...minimal_record, aliases: [""] }).success).toBe(
      false,
    );
  });

  it("rejects more than 32 aliases", () => {
    const aliases = Array.from({ length: 33 }, (_, index) => `alias_${index}`);
    expect(VocabularyRecordSchema.safeParse({ ...minimal_record, aliases }).success).toBe(false);
  });

  it.each([
    ["tag", "a".repeat(257)],
    ["translation", "a".repeat(513)],
    ["category", "a".repeat(65)],
    ["description", "a".repeat(4_097)],
  ])("rejects an overlong %s field", (field, value) => {
    expect(VocabularyRecordSchema.safeParse({ ...minimal_record, [field]: value }).success).toBe(
      false,
    );
  });

  it("rejects an alias longer than 256 characters", () => {
    expect(
      VocabularyRecordSchema.safeParse({ ...minimal_record, aliases: ["a".repeat(257)] }).success,
    ).toBe(false);
  });

  it("stores HTML and script strings as plain text without stripping them", () => {
    const payload = '<script>alert("x")</script>';
    const result = VocabularyRecordSchema.parse({
      ...minimal_record,
      tag: "safe_tag",
      description: payload,
    });
    expect(result.description).toBe(payload);
  });

  it("stores an HTML-looking tag as plain text", () => {
    const payload = "<b>bold</b>";
    const result = VocabularyRecordSchema.parse({ ...minimal_record, tag: payload });
    expect(result.tag).toBe(payload);
  });
});

describe("normalizeVocabularySearchKey", () => {
  it("lowercases and folds underscores to spaces", () => {
    expect(normalizeVocabularySearchKey("Cat_Ears")).toBe("cat ears");
  });

  it("collapses repeated whitespace and trims", () => {
    expect(normalizeVocabularySearchKey("  cat   ears  ")).toBe("cat ears");
  });

  it("treats underscore and space forms as equivalent", () => {
    expect(normalizeVocabularySearchKey("cat_ears")).toBe(normalizeVocabularySearchKey("cat ears"));
  });

  it("is stable under repeated normalization", () => {
    const once = normalizeVocabularySearchKey("Cat_Ears  Neko");
    expect(normalizeVocabularySearchKey(once)).toBe(once);
  });

  it("applies NFKC so composed and decomposed accent forms match", () => {
    const composed = "Caf\u00e9"; // single precomposed code point for e-acute
    const decomposed = "Cafe\u0301"; // e followed by a combining acute accent
    expect(normalizeVocabularySearchKey(composed)).toBe(normalizeVocabularySearchKey(decomposed));
    expect(normalizeVocabularySearchKey(composed)).toBe("caf\u00e9");
  });

  it("applies NFKC compatibility folding for fullwidth characters", () => {
    expect(normalizeVocabularySearchKey("\uff21\uff22\uff23")).toBe("abc");
  });
});

describe("VocabularyRecordCollectionSchema", () => {
  it("accepts records with unique IDs and unique normalized tags", () => {
    const records = [
      { record_id: 1, tag: "1girl" },
      { record_id: 2, tag: "1boy" },
    ];
    expect(VocabularyRecordCollectionSchema.safeParse(records).success).toBe(true);
  });

  it("rejects duplicate record IDs", () => {
    const records = [
      { record_id: 1, tag: "1girl" },
      { record_id: 1, tag: "1boy" },
    ];
    const result = VocabularyRecordCollectionSchema.safeParse(records);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.path).toEqual([1, "record_id"]);
    }
  });

  it("rejects duplicate normalized tags across differing surface forms", () => {
    const records = [
      { record_id: 1, tag: "cat_ears" },
      { record_id: 2, tag: "Cat  Ears" },
    ];
    const result = VocabularyRecordCollectionSchema.safeParse(records);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.path).toEqual([1, "tag"]);
    }
  });
});

describe("VocabularyIndexKindSchema", () => {
  it("accepts exactly the five documented index kinds", () => {
    expect(VocabularyIndexKindSchema.options).toEqual([
      "prefix",
      "alias",
      "trigram",
      "detail",
      "hot",
    ]);
  });

  it("rejects an unknown index kind", () => {
    expect(VocabularyIndexKindSchema.safeParse("fuzzy").success).toBe(false);
  });
});

describe("VocabularyManifestSchema", () => {
  const valid_shard = {
    shard_id: "prefix_aa",
    package_id: "tavern-canvas-baseline",
    kind: "prefix" as const,
    path: "shards/prefix_aa.msgpack.gz",
    sha256: "a".repeat(64),
    byte_length: 1_024,
  };

  const valid_manifest = {
    package_id: "tavern-canvas-baseline",
    schema_version: 1 as const,
    data_version: "1.0.0",
    changelog: "initial release",
    record_count: 49_857,
    compressed_size: 4_194_304,
    minimum_extension_version: "3.0.0",
    shards: [valid_shard],
  };

  it("accepts a valid manifest", () => {
    expect(VocabularyManifestSchema.safeParse(valid_manifest).success).toBe(true);
  });

  it("rejects duplicate shard IDs", () => {
    const result = VocabularyManifestSchema.safeParse({
      ...valid_manifest,
      shards: [valid_shard, { ...valid_shard, path: "shards/prefix_aa_2.msgpack.gz" }],
    });
    expect(result.success).toBe(false);
  });

  it("rejects an unknown index kind on a shard entry", () => {
    const result = VocabularyManifestSchema.safeParse({
      ...valid_manifest,
      shards: [{ ...valid_shard, kind: "fuzzy" }],
    });
    expect(result.success).toBe(false);
  });

  it("rejects a shard path containing directory traversal", () => {
    const result = VocabularyManifestSchema.safeParse({
      ...valid_manifest,
      shards: [{ ...valid_shard, path: "../../etc/passwd" }],
    });
    expect(result.success).toBe(false);
  });

  it("rejects an absolute shard path", () => {
    const result = VocabularyManifestSchema.safeParse({
      ...valid_manifest,
      shards: [{ ...valid_shard, path: "/etc/passwd" }],
    });
    expect(result.success).toBe(false);
  });

  it("rejects a shard entry whose package_id does not match the manifest", () => {
    const result = VocabularyManifestSchema.safeParse({
      ...valid_manifest,
      shards: [{ ...valid_shard, package_id: "other-package" }],
    });
    expect(result.success).toBe(false);
  });

  it("rejects an unsupported schema version", () => {
    expect(
      VocabularyManifestSchema.safeParse({ ...valid_manifest, schema_version: 2 }).success,
    ).toBe(false);
  });

  it.each(["1.0", "v1.0.0", "1.0.0.0", "1.a.0"])(
    "rejects an invalid semver data_version %s",
    (data_version) => {
      expect(VocabularyManifestSchema.safeParse({ ...valid_manifest, data_version }).success).toBe(
        false,
      );
    },
  );

  it.each(["1.0", "v1.0.0", "1.0.0.0"])(
    "rejects an invalid semver minimum_extension_version %s",
    (minimum_extension_version) => {
      expect(
        VocabularyManifestSchema.safeParse({ ...valid_manifest, minimum_extension_version })
          .success,
      ).toBe(false);
    },
  );

  it("accepts pre-release and build-metadata semver forms", () => {
    expect(
      VocabularyManifestSchema.safeParse({
        ...valid_manifest,
        data_version: "1.2.3-beta.1+build.5",
      }).success,
    ).toBe(true);
  });

  it("rejects unknown top-level keys", () => {
    expect(
      VocabularyManifestSchema.safeParse({ ...valid_manifest, unexpected_field: true }).success,
    ).toBe(false);
  });

  it("rejects unknown keys on a shard entry", () => {
    expect(
      VocabularyManifestSchema.safeParse({
        ...valid_manifest,
        shards: [{ ...valid_shard, unexpected_field: true }],
      }).success,
    ).toBe(false);
  });
});

describe("VocabularyWorkerRequestSchema", () => {
  it("accepts an initialize request", () => {
    const result = VocabularyWorkerRequestSchema.safeParse({ type: "initialize", request_id });
    expect(result.success).toBe(true);
  });

  it("accepts a query request with an optional category filter", () => {
    const result = VocabularyWorkerRequestSchema.safeParse({
      type: "query",
      request_id,
      query: "cat ears",
      category: "general",
    });
    expect(result.success).toBe(true);
  });

  it("accepts an empty query string to request hot results", () => {
    const result = VocabularyWorkerRequestSchema.safeParse({
      type: "query",
      request_id,
      query: "",
    });
    expect(result.success).toBe(true);
  });

  it("accepts a next_page request carrying a cursor", () => {
    const result = VocabularyWorkerRequestSchema.safeParse({
      type: "next_page",
      request_id,
      cursor: "opaque-cursor-token",
    });
    expect(result.success).toBe(true);
  });

  it("rejects a next_page request with an empty cursor", () => {
    const result = VocabularyWorkerRequestSchema.safeParse({
      type: "next_page",
      request_id,
      cursor: "",
    });
    expect(result.success).toBe(false);
  });

  it("accepts a cancel request that targets a prior request", () => {
    const result = VocabularyWorkerRequestSchema.safeParse({
      type: "cancel",
      request_id,
      target_request_id,
    });
    expect(result.success).toBe(true);
  });

  it("accepts an import_source batch request", () => {
    const result = VocabularyWorkerRequestSchema.safeParse({
      type: "import_source",
      request_id,
      format: "tavern_canvas_jsonl",
      batch_index: 0,
      batch_count: 3,
      payload: '{"record_id":1,"tag":"foo"}',
    });
    expect(result.success).toBe(true);
  });

  it("accepts a dispose request", () => {
    const result = VocabularyWorkerRequestSchema.safeParse({ type: "dispose", request_id });
    expect(result.success).toBe(true);
  });

  it("rejects an unknown request type", () => {
    const result = VocabularyWorkerRequestSchema.safeParse({ type: "unknown", request_id });
    expect(result.success).toBe(false);
  });

  it("rejects a request missing request_id", () => {
    const result = VocabularyWorkerRequestSchema.safeParse({ type: "dispose" });
    expect(result.success).toBe(false);
  });

  it("rejects a request_id that is not a lowercase UUID", () => {
    const result = VocabularyWorkerRequestSchema.safeParse({
      type: "dispose",
      request_id: "not-a-uuid",
    });
    expect(result.success).toBe(false);
  });
});

describe("VocabularySearchResultSchema", () => {
  const search_result = {
    record_id: 1,
    display_text: "cat_ears",
    category: "general",
    popularity: 100,
    match_kind: "exact" as const,
    score: 1,
  };

  it("accepts a compact search result", () => {
    expect(VocabularySearchResultSchema.safeParse(search_result).success).toBe(true);
  });

  it("rejects a search result carrying raw shard data", () => {
    const result = VocabularySearchResultSchema.safeParse({
      ...search_result,
      shard: { raw: true },
    });
    expect(result.success).toBe(false);
  });

  it("rejects an unknown match_kind", () => {
    const result = VocabularySearchResultSchema.safeParse({
      ...search_result,
      match_kind: "fuzzy",
    });
    expect(result.success).toBe(false);
  });
});

describe("VocabularyWorkerResponseSchema", () => {
  const search_result = {
    record_id: 1,
    display_text: "cat_ears",
    popularity: 100,
    match_kind: "exact" as const,
    score: 1,
  };

  it("accepts a ready response without a request_id", () => {
    const result = VocabularyWorkerResponseSchema.safeParse({
      type: "ready",
      package_id: "tavern-canvas-baseline",
      data_version: "1.0.0",
      record_count: 49_857,
    });
    expect(result.success).toBe(true);
  });

  it("rejects a ready response that carries a request_id", () => {
    const result = VocabularyWorkerResponseSchema.safeParse({
      type: "ready",
      package_id: "tavern-canvas-baseline",
      data_version: "1.0.0",
      record_count: 49_857,
      request_id,
    });
    expect(result.success).toBe(false);
  });

  it("accepts partial_results carrying a bounded result page", () => {
    const result = VocabularyWorkerResponseSchema.safeParse({
      type: "partial_results",
      request_id,
      results: [search_result],
    });
    expect(result.success).toBe(true);
  });

  it("rejects partial_results missing request_id", () => {
    const result = VocabularyWorkerResponseSchema.safeParse({
      type: "partial_results",
      results: [search_result],
    });
    expect(result.success).toBe(false);
  });

  it("accepts a complete response with a nullable next_cursor", () => {
    const result = VocabularyWorkerResponseSchema.safeParse({
      type: "complete",
      request_id,
      results: [search_result],
      next_cursor: null,
    });
    expect(result.success).toBe(true);
  });

  it("accepts a complete response with a continuation cursor", () => {
    const result = VocabularyWorkerResponseSchema.safeParse({
      type: "complete",
      request_id,
      results: [search_result],
      next_cursor: "opaque-cursor-token",
    });
    expect(result.success).toBe(true);
  });

  it("rejects more than 50 results on a complete response", () => {
    const results = Array.from({ length: 51 }, (_, index) => ({
      ...search_result,
      record_id: index,
    }));
    const result = VocabularyWorkerResponseSchema.safeParse({
      type: "complete",
      request_id,
      results,
      next_cursor: null,
    });
    expect(result.success).toBe(false);
  });

  it("accepts a progress response", () => {
    const result = VocabularyWorkerResponseSchema.safeParse({
      type: "progress",
      request_id,
      phase: "importing",
      processed: 10,
      total: 100,
    });
    expect(result.success).toBe(true);
  });

  it("rejects a progress response missing request_id", () => {
    const result = VocabularyWorkerResponseSchema.safeParse({
      type: "progress",
      phase: "importing",
      processed: 10,
      total: 100,
    });
    expect(result.success).toBe(false);
  });

  it("accepts an error response with a documented error code", () => {
    const result = VocabularyWorkerResponseSchema.safeParse({
      type: "error",
      request_id,
      code: "cancelled",
      message: "the request was cancelled",
    });
    expect(result.success).toBe(true);
  });

  it("rejects an error response missing request_id", () => {
    const result = VocabularyWorkerResponseSchema.safeParse({
      type: "error",
      code: "cancelled",
      message: "the request was cancelled",
    });
    expect(result.success).toBe(false);
  });

  it("rejects an unknown response type", () => {
    const result = VocabularyWorkerResponseSchema.safeParse({ type: "unknown", request_id });
    expect(result.success).toBe(false);
  });
});
