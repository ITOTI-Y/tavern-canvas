import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { REPO_ROOT } from "./pack_common.js";

// Emits output/packages/catalog.draft.json: a draft catalog listing every
// known vocabulary package (the bundled baseline + the full bilingual
// pack), for a follow-up CATALOG work item that will formalize the contract
// schema and the client install-from-catalog flow. This script only emits
// the data file -- it does not upload anything. Run after both
// generate_baseline.ts and generate_full_pack.ts.
//
// Hosting (user decision, 2026-08-06): packages live on the user's HF
// dataset repo `ITOTIY/tavern-canvas-vocabulary`, one subdirectory per
// package_id (`packages/<package_id>/...`), with this catalog itself
// intended to be uploaded to the repo root as `catalog.json` so the
// extension can refresh the package list remotely without a redeploy.

const HF_DATASET_BASE_URL =
  "https://huggingface.co/datasets/ITOTIY/tavern-canvas-vocabulary/resolve/main";

const DEFAULT_BASELINE_DIRECTORY = resolve(REPO_ROOT, "apps/extension/public/vocabulary/baseline");
const DEFAULT_FULL_PACK_DIRECTORY = resolve(REPO_ROOT, "output/packages/tavern-canvas-full-zh");
const DEFAULT_OUTPUT_PATH = resolve(REPO_ROOT, "output/packages/catalog.draft.json");

interface ManifestForCatalog {
  readonly package_id: string;
  readonly data_version: string;
  readonly record_count: number;
  readonly compressed_size: number;
  readonly minimum_extension_version: string;
}

interface BilingualText {
  readonly en: string;
  readonly "zh-CN": string;
}

// Draft shape only -- the follow-up CATALOG work item owns the formal Zod
// contract. `base_url: null` + `bundled: true` marks a package that ships
// inside the extension itself (no remote fetch needed); every other entry
// carries a real HF dataset URL the client's PackageClient can resolve
// manifest/shard paths against.
interface CatalogEntryDraft {
  readonly package_id: string;
  readonly display_name: BilingualText;
  readonly description: BilingualText;
  readonly data_version: string;
  readonly record_count: number;
  readonly compressed_bytes: number;
  readonly manifest_sha256: string;
  readonly languages: readonly string[];
  readonly min_extension_version: string;
  readonly base_url: string | null;
  readonly bundled: boolean;
  readonly updated_at: string;
}

async function read_manifest_for_catalog(directory: string): Promise<{
  readonly manifest: ManifestForCatalog;
  readonly manifest_sha256: string;
}> {
  const manifest_bytes = await readFile(resolve(directory, "manifest.json"));
  return {
    manifest: JSON.parse(manifest_bytes.toString("utf8")) as ManifestForCatalog,
    manifest_sha256: createHash("sha256").update(manifest_bytes).digest("hex"),
  };
}

function to_catalog_entry(
  manifest: ManifestForCatalog,
  manifest_sha256: string,
  display_name: BilingualText,
  description: BilingualText,
  base_url: string | null,
  bundled: boolean,
  updated_at: string,
): CatalogEntryDraft {
  return {
    package_id: manifest.package_id,
    display_name,
    description,
    data_version: manifest.data_version,
    record_count: manifest.record_count,
    compressed_bytes: manifest.compressed_size,
    manifest_sha256,
    languages: ["en", "zh-CN"],
    min_extension_version: manifest.minimum_extension_version,
    base_url,
    bundled,
    updated_at,
  };
}

export async function run_generate_catalog_draft(argv: readonly string[] = []): Promise<void> {
  let baseline_directory = DEFAULT_BASELINE_DIRECTORY;
  let full_pack_directory = DEFAULT_FULL_PACK_DIRECTORY;
  let output_path = DEFAULT_OUTPUT_PATH;

  for (let index = 0; index < argv.length; index += 1) {
    const flag = argv[index];
    const value = argv[index + 1];
    if (flag === "--baseline-dir" && value !== undefined) {
      baseline_directory = resolve(value);
      index += 1;
    } else if (flag === "--full-pack-dir" && value !== undefined) {
      full_pack_directory = resolve(value);
      index += 1;
    } else if (flag === "--output" && value !== undefined) {
      output_path = resolve(value);
      index += 1;
    }
  }

  const updated_at = new Date().toISOString();
  const [baseline, full_pack] = await Promise.all([
    read_manifest_for_catalog(baseline_directory),
    read_manifest_for_catalog(full_pack_directory),
  ]);

  const entries: CatalogEntryDraft[] = [
    to_catalog_entry(
      baseline.manifest,
      baseline.manifest_sha256,
      { en: "Baseline Vocabulary", "zh-CN": "基础词汇表" },
      {
        en: "Bundled with the extension: the 50,000 most popular Danbooru tags, with zh translations.",
        "zh-CN": "随扩展内置：热度最高的 50,000 个 Danbooru 标签，含中文翻译。",
      },
      null,
      true,
      updated_at,
    ),
    to_catalog_entry(
      full_pack.manifest,
      full_pack.manifest_sha256,
      { en: "Full Vocabulary (Bilingual)", "zh-CN": "完整词汇表（中英双语）" },
      {
        en: "The complete Danbooru tag universe (~153k tags) with zh translations. Optional download.",
        "zh-CN": "完整 Danbooru 标签全集（约 153,000 个标签），含中文翻译。可选下载。",
      },
      `${HF_DATASET_BASE_URL}/packages/${full_pack.manifest.package_id}/`,
      false,
      updated_at,
    ),
  ];

  await mkdir(dirname(output_path), { recursive: true });
  await writeFile(output_path, `${JSON.stringify(entries, null, 2)}\n`);
  console.log(`generate_catalog_draft: wrote ${String(entries.length)} entries to ${output_path}`);
}

const entry_path = process.argv[1];
if (entry_path !== undefined && resolve(entry_path) === fileURLToPath(import.meta.url)) {
  try {
    await run_generate_catalog_draft(process.argv.slice(2));
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
