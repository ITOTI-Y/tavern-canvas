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

// Mirrors BASELINE_RECORD_LIMIT in tools/vocabulary_builder/scripts/generate_baseline.ts.
const EXPECTED_RECORD_COUNT = 50_000;
const MINIMUM_TRANSLATION_COVERAGE = 35_000;
const POPULARITY_FLOOR_PROBE = {
  tag: "1girl",
  translation: "一个女孩",
  minimum_popularity: 8_000_000,
};

describe("committed vocabulary baseline", () => {
  // Re-verifying every shard's hash, gzip and MessagePack framing takes longer than the 5s default.
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

  // The legacy v2.8.1 NSFW group tree is non-redistributable (data/vocabulary/LICENSES.json) and must
  // not ship in the default package; explicit user-initiated imports are unaffected.
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
