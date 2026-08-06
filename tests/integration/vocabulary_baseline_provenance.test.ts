// Provenance guard (task-5-brief.md controller pre-ruling #2): the committed
// vocabulary baseline (apps/extension/public/vocabulary/baseline) must be
// built exclusively from data/vocabulary/raw_vocabulary_tags_public.jsonl
// (fact-only, redistributable) and must never carry a `translation` field --
// that comes only from raw_vocabulary_seed_full.jsonl, which is
// non-redistributable and never committed. This runs under plain `pnpm
// test`, independent of the CI-only byte-compare rebuild
// (tools/vocabulary_builder/scripts/generate_baseline.ts --check), so a
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

describe("committed vocabulary baseline", () => {
  it("verifies (hash, size, gzip, MessagePack framing) against its own manifest", async () => {
    const exit_code = await run_verify(["--package", BASELINE_DIRECTORY]);
    expect(exit_code).toBe(EXIT_SUCCESS);
  });

  it("carries zero translation fields across every detail shard", async () => {
    const manifest_text = await readFile(resolve(BASELINE_DIRECTORY, "manifest.json"), "utf8");
    const manifest = VocabularyManifestSchema.parse(JSON.parse(manifest_text));
    const detail_shards = manifest.shards.filter((shard) => shard.kind === "detail");
    expect(detail_shards.length).toBeGreaterThan(0);

    let records_checked = 0;
    for (const shard of detail_shards) {
      const bytes = await readFile(resolve(BASELINE_DIRECTORY, shard.path));
      const { payload } = await decode_shard_bytes(bytes);
      if (payload.kind !== "detail") {
        throw new Error(`shard ${shard.shard_id} declares kind "detail" but decoded otherwise`);
      }
      for (const record of payload.records as readonly VocabularyRecord[]) {
        expect(record).not.toHaveProperty("translation");
        records_checked += 1;
      }
    }
    expect(records_checked).toBe(manifest.record_count);
  });
});
