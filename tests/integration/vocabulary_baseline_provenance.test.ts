// Provenance guard (2026-08-06 controller ruling, REVERSING the earlier
// task-5-brief.md fact-only rule): the user explicitly decided to rebuild
// the committed vocabulary baseline (apps/extension/public/vocabulary/
// baseline) from FRESH data ("既然是重构就用新数据，不要以旧数据做分发") and
// to include zh translations, assuming responsibility for translation
// licensing himself ("补充中文包（先不考虑上游，如有许可问题由我去解决）").
// The baseline is now a fixed top-50,000-by-popularity cut of the full
// bilingual data/vocabulary/raw_vocabulary_tags_public.jsonl (built by
// tools/vocabulary_builder/scripts/generate_baseline.ts) and MUST carry zh
// translations end to end. This runs under plain `pnpm test`, independent
// of the CI-only byte-compare rebuild (generate_baseline.ts --check), so a
// regression is caught locally too.
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { VocabularyManifestSchema, type VocabularyRecord } from "@tavern-canvas/contracts";
import { decode_shard_bytes } from "@tavern-canvas/vocabulary";
import { EXIT_SUCCESS, run_verify } from "@tavern-canvas/vocabulary-builder";
import { describe, expect, it } from "vitest";

const BASELINE_DIRECTORY = resolve(
  fileURLToPath(import.meta.url),
  "../../../apps/extension/public/vocabulary/baseline",
);

// Mirrors tools/vocabulary_builder/scripts/generate_baseline.ts's
// BASELINE_RECORD_LIMIT and the controller's adjusted sanity gates.
const EXPECTED_RECORD_COUNT = 50_000;
const MINIMUM_TRANSLATION_COVERAGE = 35_000;
const POPULARITY_FLOOR_PROBE = {
  tag: "1girl",
  translation: "一个女孩",
  minimum_popularity: 8_000_000,
};

describe("committed vocabulary baseline", () => {
  // The bilingual baseline's alias index (zh translations + aliases) grew
  // shard count from 2,163 to 2,742 -- re-verifying every shard's hash,
  // gzip, and MessagePack framing genuinely takes longer than the 5s default.
  const VERIFY_TIMEOUT_MS = 30_000;

  it(
    "verifies (hash, size, gzip, MessagePack framing) against its own manifest",
    async () => {
      const exit_code = await run_verify(["--package", BASELINE_DIRECTORY]);
      expect(exit_code).toBe(EXIT_SUCCESS);
    },
    VERIFY_TIMEOUT_MS,
  );

  it("is a fixed top-50,000-record cut of the full bilingual dataset", async () => {
    const manifest_text = await readFile(resolve(BASELINE_DIRECTORY, "manifest.json"), "utf8");
    const manifest = VocabularyManifestSchema.parse(JSON.parse(manifest_text));
    expect(manifest.record_count).toBe(EXPECTED_RECORD_COUNT);
  });

  it("carries zh translations on at least 35,000 records, and 1girl round-trips with fresh popularity", async () => {
    const manifest_text = await readFile(resolve(BASELINE_DIRECTORY, "manifest.json"), "utf8");
    const manifest = VocabularyManifestSchema.parse(JSON.parse(manifest_text));
    const detail_shards = manifest.shards.filter((shard) => shard.kind === "detail");
    expect(detail_shards.length).toBeGreaterThan(0);

    let records_checked = 0;
    let translated_count = 0;
    let probe_record: VocabularyRecord | undefined;
    for (const shard of detail_shards) {
      const bytes = await readFile(resolve(BASELINE_DIRECTORY, shard.path));
      const { payload } = await decode_shard_bytes(bytes);
      if (payload.kind !== "detail") {
        throw new Error(`shard ${shard.shard_id} declares kind "detail" but decoded otherwise`);
      }
      for (const record of payload.records as readonly VocabularyRecord[]) {
        records_checked += 1;
        if (record.translation !== undefined) {
          translated_count += 1;
        }
        if (record.tag === POPULARITY_FLOOR_PROBE.tag) {
          probe_record = record;
        }
      }
    }

    expect(records_checked).toBe(manifest.record_count);
    expect(translated_count).toBeGreaterThanOrEqual(MINIMUM_TRANSLATION_COVERAGE);
    expect(probe_record?.translation).toBe(POPULARITY_FLOOR_PROBE.translation);
    expect(probe_record?.popularity).toBeGreaterThanOrEqual(
      POPULARITY_FLOOR_PROBE.minimum_popularity,
    );
  });

  // Parity ledger guard (docs/parity/feature_matrix.md's
  // vocabulary.nsfw_group_tree_default_load, removed_approved
  // [non-redistributable-content-default-bundle]): the legacy v2.8.1
  // archive's tag_NSFW001.json group tree is non-redistributable
  // (data/vocabulary/LICENSES.json's legacy-st-chatu8-v2-8-1-tagdata entry
  // -- "Both remain out of scope") and MUST NOT ship inside the package a
  // fresh install gets by default. This does not test the removal of a
  // capability -- packages/vocabulary/src/import/import_builder.test.ts
  // proves the same NSFW-shaped source still imports via explicit
  // user-initiated install -- it tests the absence of automatic bundling.
  it("never auto-bundles NSFW-category records into the default first-run package", async () => {
    const manifest_text = await readFile(resolve(BASELINE_DIRECTORY, "manifest.json"), "utf8");
    const manifest = VocabularyManifestSchema.parse(JSON.parse(manifest_text));
    const detail_shards = manifest.shards.filter((shard) => shard.kind === "detail");

    let nsfw_record_count = 0;
    for (const shard of detail_shards) {
      const bytes = await readFile(resolve(BASELINE_DIRECTORY, shard.path));
      const { payload } = await decode_shard_bytes(bytes);
      if (payload.kind !== "detail") {
        throw new Error(`shard ${shard.shard_id} declares kind "detail" but decoded otherwise`);
      }
      for (const record of payload.records as readonly VocabularyRecord[]) {
        if (record.category === "nsfw") {
          nsfw_record_count += 1;
        }
      }
    }

    expect(nsfw_record_count).toBe(0);
  });
});
