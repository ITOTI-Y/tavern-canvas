import { describe, expect, it } from "vitest";

import {
  VocabularyCatalogDocumentSchema,
  VocabularyCatalogEntrySchema,
  type VocabularyCatalogEntry,
} from "./vocabulary_catalog.js";

// The published catalog document, verbatim.
const LIVE_CATALOG_DOCUMENT = [
  {
    package_id: "tavern-canvas-baseline",
    display_name: { en: "Baseline Vocabulary", "zh-CN": "基础词汇表" },
    description: {
      en: "Bundled with the extension: the 50,000 most popular Danbooru tags, with zh translations.",
      "zh-CN": "随扩展内置：热度最高的 50,000 个 Danbooru 标签，含中文翻译。",
    },
    data_version: "1.1.0",
    record_count: 50_000,
    compressed_bytes: 3_882_215,
    manifest_sha256: "c9292db97c41a4fed52dd720437a126d54bc77718488b217d7af724ac39fc691".slice(
      0,
      64,
    ),
    languages: ["en", "zh-CN"],
    min_extension_version: "3.0.0-alpha.1",
    base_url: null,
    bundled: true,
    updated_at: "2026-08-06T18:36:34.789Z",
  },
  {
    package_id: "tavern-canvas-full-zh",
    display_name: { en: "Full Vocabulary (Bilingual)", "zh-CN": "完整词汇表（中英双语）" },
    description: {
      en: "The complete Danbooru tag universe (~153k tags) with zh translations. Optional download.",
      "zh-CN": "完整 Danbooru 标签全集（约 153,000 个标签），含中文翻译。可选下载。",
    },
    data_version: "1.1.0",
    record_count: 153_258,
    compressed_bytes: 8_931_663,
    manifest_sha256: "8f4953b83ae9350736cb21b9c4b9c05d5d7f491fb808edb1582479bbad247aed".slice(
      0,
      64,
    ),
    languages: ["en", "zh-CN"],
    min_extension_version: "3.0.0-alpha.1",
    base_url:
      "https://huggingface.co/datasets/ITOTIY/tavern-canvas-vocabulary/resolve/main/packages/tavern-canvas-full-zh/",
    bundled: false,
    updated_at: "2026-08-06T18:36:34.789Z",
  },
] satisfies VocabularyCatalogEntry[];

function valid_entry(): VocabularyCatalogEntry {
  const entry = LIVE_CATALOG_DOCUMENT[1];
  if (entry === undefined) {
    throw new Error("fixture entry missing");
  }
  return entry;
}

describe("VocabularyCatalogDocumentSchema", () => {
  it("accepts the live published catalog shape verbatim", () => {
    const result = VocabularyCatalogDocumentSchema.safeParse(LIVE_CATALOG_DOCUMENT);
    expect(result.success).toBe(true);
  });

  it("rejects two entries that declare the same package_id", () => {
    const duplicated = [LIVE_CATALOG_DOCUMENT[0], LIVE_CATALOG_DOCUMENT[0]];
    expect(VocabularyCatalogDocumentSchema.safeParse(duplicated).success).toBe(false);
  });

  it("rejects an empty catalog", () => {
    expect(VocabularyCatalogDocumentSchema.safeParse([]).success).toBe(false);
  });
});

describe("VocabularyCatalogEntrySchema", () => {
  it("accepts a well-formed non-bundled entry", () => {
    expect(VocabularyCatalogEntrySchema.safeParse(valid_entry()).success).toBe(true);
  });

  it("accepts a bundled entry with a null base_url", () => {
    expect(VocabularyCatalogEntrySchema.safeParse(LIVE_CATALOG_DOCUMENT[0]).success).toBe(true);
  });

  it("rejects a manifest_sha256 that is too short to be a real SHA-256 hex digest", () => {
    const tampered = { ...valid_entry(), manifest_sha256: "abc123" };
    expect(VocabularyCatalogEntrySchema.safeParse(tampered).success).toBe(false);
  });

  it("rejects a manifest_sha256 containing uppercase hex characters", () => {
    const tampered = {
      ...valid_entry(),
      manifest_sha256: valid_entry().manifest_sha256.toUpperCase(),
    };
    expect(VocabularyCatalogEntrySchema.safeParse(tampered).success).toBe(false);
  });

  it("rejects an http:// base_url", () => {
    const tampered = {
      ...valid_entry(),
      base_url: valid_entry().base_url?.replace("https://", "http://"),
    };
    expect(VocabularyCatalogEntrySchema.safeParse(tampered).success).toBe(false);
  });

  it("rejects a non-bundled entry with a null base_url", () => {
    const tampered = { ...valid_entry(), base_url: null };
    expect(VocabularyCatalogEntrySchema.safeParse(tampered).success).toBe(false);
  });

  it("rejects an unknown top-level field", () => {
    const tampered = { ...valid_entry(), unexpected_field: "surprise" };
    expect(VocabularyCatalogEntrySchema.safeParse(tampered).success).toBe(false);
  });

  it("rejects an unknown field inside display_name", () => {
    const tampered = {
      ...valid_entry(),
      display_name: { ...valid_entry().display_name, fr: "Vocabulaire complet" },
    };
    expect(VocabularyCatalogEntrySchema.safeParse(tampered).success).toBe(false);
  });

  it("rejects a malformed data_version", () => {
    const tampered = { ...valid_entry(), data_version: "not-a-semver" };
    expect(VocabularyCatalogEntrySchema.safeParse(tampered).success).toBe(false);
  });

  it("rejects an updated_at without a UTC offset", () => {
    const tampered = { ...valid_entry(), updated_at: "2026-08-06T18:36:34.789" };
    expect(VocabularyCatalogEntrySchema.safeParse(tampered).success).toBe(false);
  });

  it("rejects an empty languages array", () => {
    const tampered = { ...valid_entry(), languages: [] };
    expect(VocabularyCatalogEntrySchema.safeParse(tampered).success).toBe(false);
  });

  it("rejects a malformed package_id", () => {
    const tampered = { ...valid_entry(), package_id: "Not Valid!" };
    expect(VocabularyCatalogEntrySchema.safeParse(tampered).success).toBe(false);
  });
});
