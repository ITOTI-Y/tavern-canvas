import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { read_jsonl } from "./jsonl_io.js";
import { run_cli } from "./index.js";
import { VocabularyRecordSchema } from "./vocabulary_record_schema.js";

// Same synthetic 3-tag shard as extract_legacy_seed.test.ts; names are invented.
const SHARD_A_PAYLOAD =
  "U2FsdGVkX19U7CA+ajpa9MGWxfq5D4EvD66CFKVQSvGpFdUr95/Q7jPhDN5Rxlf3pLDaF9MBccK5FAwXRXrxr6hTWGEblsWzWitkvtStbKZt5uIyHp1yEsxmzjlM3DQ9UMydqCNW5euzM3FMg2V2Zb+ag4Hpwxjg0jzjguZQE8m1xpX7SyfvM7HoIAZ0+mpvQCkXWhaLgPm3R2YdYV2oyDI9SHgkQcT6Ri2z5nw5pfk5Hz9LlIp7Xz7VOzlEyMXi+PxsUyHnSxEnUGI7uoWLAs+EcJ5DyiCUk7FrqnIRXqBdFAOVVEGxD4c8Q5JXsGnt16ePz0JWfcXyVr3buEqhyqAV4gar19lEpcz16rq1j87rIsrJ5cNUPHOc2DU0i9mbUk128TcO0zbodgbAkj6cEHCvG/nmSSIgusPjJ4P6Dzs9PZ7CjxFYHJZjoVtMzgiqxwgWejeUvl8faqFIoiTtePPSb4RHlmE3wTFjEeORdH4=";

describe("run_cli: argument validation", () => {
  it("rejects an unknown command", async () => {
    await expect(run_cli(["not-a-real-command"])).rejects.toThrow(/Unknown command/);
  });

  it("rejects extract-seed missing required flags", async () => {
    await expect(run_cli(["extract-seed"])).rejects.toThrow(/--shard-dir/);
  });

  it("rejects fetch-danbooru missing required flags", async () => {
    await expect(run_cli(["fetch-danbooru"])).rejects.toThrow(/--user-agent/);
  });

  it("rejects merge missing required flags", async () => {
    await expect(run_cli(["merge"])).rejects.toThrow(/--seed/);
  });

  it("rejects import-hf-tags missing required flags", async () => {
    await expect(run_cli(["import-hf-tags"])).rejects.toThrow(/--input/);
  });
});

describe("run_cli: extract-seed + merge end-to-end smoke test", () => {
  let temp_dir: string;

  beforeEach(async () => {
    temp_dir = await mkdtemp(join(tmpdir(), "vocab-cli-smoke-test-"));
  });

  afterEach(async () => {
    await rm(temp_dir, { recursive: true, force: true });
  });

  it("extracts a custom shard list via --shard, then merges using the seed's own facts", async () => {
    await writeFile(join(temp_dir, "shard_a.json"), SHARD_A_PAYLOAD, "utf8");
    const seed_path = join(temp_dir, "seed.jsonl");

    await run_cli([
      "extract-seed",
      "--shard-dir",
      temp_dir,
      "--shard",
      "shard_a.json",
      "--out",
      seed_path,
    ]);

    const seed_records = await read_jsonl(seed_path, VocabularyRecordSchema);
    expect(seed_records).toHaveLength(3);
    expect(seed_records.find((record) => record.tag === "synthetic_tag_alpha")?.translation).toBe(
      "合成标签阿尔法",
    );

    const out_path = join(temp_dir, "out.jsonl");
    await run_cli(["merge", "--seed", seed_path, "--out", out_path]);

    const records = await read_jsonl(out_path, VocabularyRecordSchema);
    expect(records).toHaveLength(3);
    expect(records.find((record) => record.tag === "synthetic_tag_alpha")?.translation).toBe(
      "合成标签阿尔法",
    );
  });
});
