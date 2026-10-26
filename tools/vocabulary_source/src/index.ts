import { parseArgs } from "node:util";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

import {
  DANBOORU_DEFAULT_BASE_URL,
  DANBOORU_DEFAULT_PAGE_LIMIT,
  DANBOORU_MIN_REQUEST_DELAY_MS,
} from "./danbooru_client.js";
import {
  extract_legacy_seed_from_files,
  LEGACY_V2_TAGDATA_PASSPHRASE,
} from "./extract_legacy_seed.js";
import { run_fetch_danbooru_cli } from "./fetch_danbooru.js";
import { run_import_hf_tags_cli } from "./import_hf_tags.js";
import { write_jsonl } from "./jsonl_io.js";
import { run_merge_cli } from "./merge_sources.js";

export * from "./danbooru_client.js";
export * from "./extract_legacy_seed.js";
export * from "./fetch_danbooru.js";
export * from "./import_hf_tags.js";
export * from "./jsonl_io.js";
export * from "./merge_sources.js";
export * from "./select_baseline_subset.js";
export * from "./vocabulary_record_schema.js";
export { decrypt_legacy_openssl_payload, LegacyDecryptionError } from "./decrypt_legacy_tagdata.js";

/** The 25 canonical v2.8.1 shard files (49,857 records). */
const DEFAULT_SHARD_NAMES = Array.from(
  { length: 25 },
  (_, index) => `danbooru_${String(index + 1).padStart(3, "0")}.json`,
);

async function run_extract_seed(args: readonly string[]): Promise<void> {
  const { values } = parseArgs({
    args,
    options: {
      "shard-dir": { type: "string" },
      out: { type: "string" },
      passphrase: { type: "string" },
      shard: { type: "string", multiple: true },
      "skip-invalid-entries": { type: "boolean" },
    },
  });

  const shard_dir = values["shard-dir"];
  const out_path = values.out;
  if (shard_dir === undefined || out_path === undefined) {
    throw new Error("extract-seed requires --shard-dir <dir> and --out <path>.");
  }

  const shard_names = values.shard ?? DEFAULT_SHARD_NAMES;
  const passphrase = values.passphrase ?? LEGACY_V2_TAGDATA_PASSPHRASE;

  const files = shard_names.map((name) => ({ path: resolve(shard_dir, name) }));

  const records = await extract_legacy_seed_from_files(files, passphrase, {
    skip_invalid_entries: values["skip-invalid-entries"] ?? false,
    on_invalid_entry: (entry) => {
      console.error(
        `extract-seed: SKIPPED invalid entry ${entry.file_label}[${String(entry.index)}]: ` +
          `${entry.reason} raw_entry=${JSON.stringify(entry.raw_entry)}`,
      );
    },
  });
  await write_jsonl(out_path, records);
  console.error(`extract-seed: wrote ${String(records.length)} records to ${out_path}`);
}

async function run_fetch_danbooru(args: readonly string[]): Promise<void> {
  const { values } = parseArgs({
    args,
    options: {
      "user-agent": { type: "string" },
      out: { type: "string" },
      "min-post-count": { type: "string" },
      checkpoint: { type: "string" },
      "base-url": { type: "string" },
      "delay-ms": { type: "string" },
      "page-limit": { type: "string" },
    },
  });

  const user_agent = values["user-agent"];
  const out_path = values.out;
  if (user_agent === undefined || out_path === undefined) {
    throw new Error("fetch-danbooru requires --user-agent <string> and --out <path>.");
  }

  const records = await run_fetch_danbooru_cli({
    client: {
      user_agent,
      base_url: values["base-url"] ?? DANBOORU_DEFAULT_BASE_URL,
      min_request_delay_ms: values["delay-ms"]
        ? Number(values["delay-ms"])
        : DANBOORU_MIN_REQUEST_DELAY_MS,
      page_limit: values["page-limit"] ? Number(values["page-limit"]) : DANBOORU_DEFAULT_PAGE_LIMIT,
    },
    min_post_count: values["min-post-count"] ? Number(values["min-post-count"]) : 0,
    ...(values.checkpoint !== undefined ? { checkpoint_path: values.checkpoint } : {}),
    out_path,
  });
  console.error(`fetch-danbooru: wrote ${String(records.length)} records to ${out_path}`);
}

async function run_import_hf_tags(args: readonly string[]): Promise<void> {
  const { values } = parseArgs({
    args,
    options: {
      input: { type: "string" },
      out: { type: "string" },
    },
  });

  const input_path = values.input;
  const out_path = values.out;
  if (input_path === undefined || out_path === undefined) {
    throw new Error("import-hf-tags requires --input <path> and --out <path>.");
  }

  const records = await run_import_hf_tags_cli({ input_path, out_path });
  console.error(`import-hf-tags: wrote ${String(records.length)} records to ${out_path}`);
}

async function run_merge(args: readonly string[]): Promise<void> {
  const { values } = parseArgs({
    args,
    options: {
      seed: { type: "string" },
      facts: { type: "string" },
      "popularity-overlay": { type: "string" },
      out: { type: "string" },
    },
  });

  const seed_path = values.seed;
  const out_path = values.out;
  if (seed_path === undefined || out_path === undefined) {
    throw new Error("merge requires --seed <path> and --out <path>.");
  }

  const result = await run_merge_cli({
    seed_path,
    ...(values.facts !== undefined ? { fact_path: values.facts } : {}),
    ...(values["popularity-overlay"] !== undefined
      ? { popularity_overlay_path: values["popularity-overlay"] }
      : {}),
    out_path,
    on_stale_fact_source: () => {
      console.error(
        "merge: no --facts supplied; using the seed's own (vintage ~2023) facts. " +
          "Popularity counts are stale (e.g. 1girl 5,975,112 in the seed vs 8,243,826 live on 2026-08-06).",
      );
    },
  });
  console.error(
    `merge: wrote ${String(result.records.length)} records to ${out_path} ` +
      `(popularity_overlay_hits=${String(result.popularity_overlay_hit_count)}, ` +
      `translation_hits=${String(result.translation_hit_count)})`,
  );
}

export async function run_cli(argv: readonly string[]): Promise<void> {
  const [command, ...rest] = argv;
  switch (command) {
    case "extract-seed":
      await run_extract_seed(rest);
      return;
    case "fetch-danbooru":
      await run_fetch_danbooru(rest);
      return;
    case "import-hf-tags":
      await run_import_hf_tags(rest);
      return;
    case "merge":
      await run_merge(rest);
      return;
    default:
      throw new Error(
        `Unknown command ${JSON.stringify(command)}. Expected one of: extract-seed, ` +
          "fetch-danbooru, import-hf-tags, merge.",
      );
  }
}

const entry_path = process.argv[1];
if (entry_path !== undefined && resolve(entry_path) === fileURLToPath(import.meta.url)) {
  try {
    await run_cli(process.argv.slice(2));
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}
