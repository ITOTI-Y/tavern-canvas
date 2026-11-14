import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";

import {
  VocabularyCatalogDocumentSchema,
  VocabularyManifestSchema,
  type VocabularyCatalogEntry,
} from "@tavern-canvas/contracts";

// Points one catalog entry at a freshly built package directory; every other entry is kept as it
// was. The catalog and the package directory are uploaded in one Hugging Face commit.

function rounded_thousands(count: number): string {
  return new Intl.NumberFormat("en-US").format(Math.round(count / 1000) * 1000);
}

export async function update_catalog_entry(options: {
  readonly catalog_path: string;
  readonly package_directory: string;
  readonly base_url: string;
  readonly out_path: string;
  readonly updated_at: string;
}): Promise<VocabularyCatalogEntry> {
  const catalog = VocabularyCatalogDocumentSchema.parse(
    JSON.parse(await readFile(options.catalog_path, "utf8")),
  );
  const manifest_bytes = await readFile(resolve(options.package_directory, "manifest.json"));
  const manifest = VocabularyManifestSchema.parse(JSON.parse(manifest_bytes.toString("utf8")));
  const current = catalog.find((entry) => entry.package_id === manifest.package_id);
  if (current === undefined) {
    throw new Error(`catalog has no entry for ${manifest.package_id}`);
  }

  const approximate = rounded_thousands(manifest.record_count);
  const entry: VocabularyCatalogEntry = {
    ...current,
    description: {
      en: `Every Danbooru tag with at least 10 posts (~${approximate} tags) with zh translations. Optional download.`,
      "zh-CN": `Danbooru 上至少有 10 张图的全部标签（约 ${approximate} 个），含中文翻译。可选下载。`,
    },
    data_version: manifest.data_version,
    record_count: manifest.record_count,
    compressed_bytes: manifest.compressed_size,
    manifest_sha256: createHash("sha256").update(manifest_bytes).digest("hex"),
    min_extension_version: manifest.minimum_extension_version,
    base_url: options.base_url.endsWith("/") ? options.base_url : `${options.base_url}/`,
    updated_at: options.updated_at,
  };
  const next = VocabularyCatalogDocumentSchema.parse(
    catalog.map((candidate) => (candidate === current ? entry : candidate)),
  );
  await writeFile(options.out_path, `${JSON.stringify(next, null, 2)}\n`);
  return entry;
}

const entry_path = process.argv[1];
if (entry_path !== undefined && resolve(entry_path) === fileURLToPath(import.meta.url)) {
  try {
    const { values } = parseArgs({
      options: {
        catalog: { type: "string" },
        package: { type: "string" },
        "base-url": { type: "string" },
        out: { type: "string" },
      },
    });
    const base_url = values["base-url"];
    if (
      values.catalog === undefined ||
      values.package === undefined ||
      base_url === undefined ||
      values.out === undefined
    ) {
      throw new Error("update_catalog requires --catalog, --package, --base-url and --out.");
    }
    const entry = await update_catalog_entry({
      catalog_path: values.catalog,
      package_directory: values.package,
      base_url,
      out_path: values.out,
      updated_at: new Date().toISOString(),
    });
    console.log(
      `update_catalog: ${entry.package_id} ${entry.data_version} -> ${entry.base_url ?? "bundled"}`,
    );
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
