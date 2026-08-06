import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { VocabularyPackageIdSchema, VocabularySemverSchema } from "@tavern-canvas/contracts";

import { build_alias_shards } from "./build_alias_index.js";
import { build_detail_shards } from "./build_detail_shards.js";
import { build_hot_shard } from "./build_hot_index.js";
import { build_prefix_shards } from "./build_prefix_index.js";
import { build_trigram_shards } from "./build_trigram_index.js";
import {
  assign_record_ids,
  merge_duplicate_records,
  VocabularyMergeConflictError,
} from "./normalize_record.js";
import { read_vocabulary_source, VocabularySourceError } from "./read_source.js";
import {
  verify_vocabulary_package,
  VocabularyPackageError,
  write_vocabulary_package,
} from "./write_package.js";

export const EXIT_SUCCESS = 0;
export const EXIT_INVALID_INPUT = 2;
export const EXIT_VERIFICATION_FAILURE = 3;
export const EXIT_IO_FAILURE = 4;

class VocabularyCliError extends Error {}

interface BuildOptions {
  readonly input: string;
  readonly output: string;
  readonly package_id: string;
  readonly data_version: string;
  readonly minimum_extension_version: string;
  readonly changelog: string;
}

function parse_flags(argv: readonly string[]): Map<string, string> {
  const flags = new Map<string, string>();
  for (let index = 0; index < argv.length; index += 2) {
    const name = argv[index];
    const value = argv[index + 1];
    if (name === undefined || !name.startsWith("--")) {
      throw new VocabularyCliError(`unexpected argument: ${name ?? "<none>"}`);
    }
    if (value === undefined) {
      throw new VocabularyCliError(`missing value for ${name}`);
    }
    flags.set(name.slice(2), value);
  }
  return flags;
}

function require_flag(flags: ReadonlyMap<string, string>, name: string): string {
  const value = flags.get(name);
  if (value === undefined) {
    throw new VocabularyCliError(`missing required flag --${name}`);
  }
  return value;
}

function parse_build_options(argv: readonly string[]): BuildOptions {
  const flags = parse_flags(argv);

  const package_id_result = VocabularyPackageIdSchema.safeParse(require_flag(flags, "package-id"));
  if (!package_id_result.success) {
    throw new VocabularyCliError(`invalid --package-id: ${package_id_result.error.message}`);
  }
  const data_version_result = VocabularySemverSchema.safeParse(require_flag(flags, "data-version"));
  if (!data_version_result.success) {
    throw new VocabularyCliError(`invalid --data-version: ${data_version_result.error.message}`);
  }
  const minimum_extension_version_result = VocabularySemverSchema.safeParse(
    require_flag(flags, "minimum-extension-version"),
  );
  if (!minimum_extension_version_result.success) {
    throw new VocabularyCliError(
      `invalid --minimum-extension-version: ${minimum_extension_version_result.error.message}`,
    );
  }

  return {
    input: require_flag(flags, "input"),
    output: require_flag(flags, "output"),
    package_id: package_id_result.data,
    data_version: data_version_result.data,
    minimum_extension_version: minimum_extension_version_result.data,
    changelog: require_flag(flags, "changelog"),
  };
}

function report_error(error: unknown): void {
  console.error(error instanceof Error ? error.message : String(error));
}

function classify_build_error(error: unknown): number {
  if (error instanceof VocabularyMergeConflictError) {
    return EXIT_INVALID_INPUT;
  }
  if (error instanceof VocabularySourceError) {
    return error.cause_kind === "format" ? EXIT_INVALID_INPUT : EXIT_IO_FAILURE;
  }
  if (error instanceof VocabularyPackageError) {
    return error.cause_kind === "verification" ? EXIT_VERIFICATION_FAILURE : EXIT_IO_FAILURE;
  }
  return EXIT_IO_FAILURE;
}

export async function run_build(argv: readonly string[]): Promise<number> {
  let options: BuildOptions;
  try {
    options = parse_build_options(argv);
  } catch (error) {
    report_error(error);
    return EXIT_INVALID_INPUT;
  }

  try {
    const source_records = await read_vocabulary_source(options.input);
    const records = assign_record_ids(merge_duplicate_records(source_records));
    const shards = [
      ...build_prefix_shards(records),
      ...build_alias_shards(records),
      ...build_trigram_shards(records),
      ...build_detail_shards(records),
      build_hot_shard(records),
    ];
    await write_vocabulary_package({
      output_directory: options.output,
      package_id: options.package_id,
      data_version: options.data_version,
      minimum_extension_version: options.minimum_extension_version,
      changelog: options.changelog,
      records,
      shards,
    });
    return EXIT_SUCCESS;
  } catch (error) {
    report_error(error);
    return classify_build_error(error);
  }
}

export async function run_verify(argv: readonly string[]): Promise<number> {
  let package_directory: string;
  try {
    package_directory = require_flag(parse_flags(argv), "package");
  } catch (error) {
    report_error(error);
    return EXIT_INVALID_INPUT;
  }

  try {
    await verify_vocabulary_package(package_directory);
    return EXIT_SUCCESS;
  } catch (error) {
    report_error(error);
    if (error instanceof VocabularyPackageError) {
      return error.cause_kind === "verification" ? EXIT_VERIFICATION_FAILURE : EXIT_IO_FAILURE;
    }
    return EXIT_IO_FAILURE;
  }
}

export async function run_cli(argv: readonly string[]): Promise<number> {
  const [command, ...rest] = argv;
  if (command === "build") {
    return run_build(rest);
  }
  if (command === "verify") {
    return run_verify(rest);
  }
  console.error(`unknown command: ${command ?? "<none>"} (expected "build" or "verify")`);
  return EXIT_INVALID_INPUT;
}

const entry_path = process.argv[1];
if (entry_path !== undefined && resolve(entry_path) === fileURLToPath(import.meta.url)) {
  process.exitCode = await run_cli(process.argv.slice(2));
}
