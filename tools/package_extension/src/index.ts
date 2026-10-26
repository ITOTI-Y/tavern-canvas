import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { Uint8ArrayReader, Uint8ArrayWriter, ZipWriter } from "@zip.js/zip.js";

export const ROOT_FILES = ["manifest.json", "README.md", "THIRD_PARTY_NOTICES.md"] as const;

const DIST_PREFIX = "dist/";
const SOURCE_MAP_SUFFIX = ".map";
const LOCALE_PATTERN = /^i18n\/[^/]+\.json$/u;

/** `dist/.vite/manifest.json` is build bookkeeping for the bundle-budget gate and must not ship to a user's extensions directory. */
const NON_RUNTIME_DIST_PREFIXES = ["dist/.vite/"] as const;

export function is_source_map(path: string): boolean {
  return path.endsWith(SOURCE_MAP_SUFFIX);
}

export function is_packageable_dist_path(path: string): boolean {
  return (
    path.startsWith(DIST_PREFIX) &&
    !is_source_map(path) &&
    !NON_RUNTIME_DIST_PREFIXES.some((prefix) => path.startsWith(prefix))
  );
}

export interface ManifestFacts {
  readonly version: string;
  readonly js_path: string | undefined;
  readonly css_path: string | undefined;
  readonly locale_paths: readonly string[];
}

export interface SelectionInput {
  readonly manifest: ManifestFacts;
  readonly package_version: string;
  readonly tracked: ReadonlySet<string>;
  readonly present: ReadonlySet<string>;
}

export interface Selection {
  readonly paths: readonly string[];
  readonly rejections: readonly string[];
}

/** A runtime input git does not track cannot be restored from a clone, and a tracked path missing from the build output means the committed runtime is stale; both are reported. */
export function select_release_paths(input: SelectionInput): Selection {
  const rejections: string[] = [];
  const paths = new Set<string>();

  if (input.package_version !== input.manifest.version) {
    rejections.push(
      `package.json version ${input.package_version} does not match manifest.json version ${input.manifest.version}`,
    );
  }

  const require_file = (path: string, reason: string): void => {
    if (!input.present.has(path)) {
      rejections.push(`${path} is missing from the working tree but ${reason}`);
      return;
    }
    if (!input.tracked.has(path)) {
      rejections.push(`${path} is not tracked by git but ${reason}`);
      return;
    }
    paths.add(path);
  };

  for (const path of ROOT_FILES) {
    require_file(path, "every release carries it");
  }

  for (const [field, declared] of [
    ["js", input.manifest.js_path],
    ["css", input.manifest.css_path],
  ] as const) {
    if (declared === undefined) {
      rejections.push(`manifest.json declares no ${field} path`);
      continue;
    }
    if (!is_packageable_dist_path(declared)) {
      rejections.push(`manifest.json ${field} path ${declared} is not a packageable dist/ path`);
      continue;
    }
    require_file(declared, `manifest.json declares it as the extension ${field}`);
  }

  for (const declared of input.manifest.locale_paths) {
    if (!LOCALE_PATTERN.test(declared)) {
      rejections.push(`manifest.json i18n path ${declared} is not an i18n/<locale>.json path`);
      continue;
    }
    require_file(declared, "manifest.json names it as a locale catalog");
  }

  const declared_locales = new Set(input.manifest.locale_paths);
  for (const path of input.present) {
    if (LOCALE_PATTERN.test(path) && !declared_locales.has(path)) {
      rejections.push(`${path} is a locale catalog that manifest.json does not declare`);
    }
    if (is_packageable_dist_path(path)) {
      if (input.tracked.has(path)) {
        paths.add(path);
      } else {
        rejections.push(`${path} is an untracked runtime input`);
      }
    }
  }

  for (const path of input.tracked) {
    if (is_packageable_dist_path(path) && !input.present.has(path)) {
      rejections.push(`${path} is tracked by git but absent from the build output`);
    }
    // A committed map hands the whole first-party source tree to anyone who clones the public
    // repository, which excluding it from the archive alone does not prevent.
    if (path.startsWith(DIST_PREFIX) && is_source_map(path)) {
      rejections.push(
        `${path} is a source map that git tracks; source maps must never be committed`,
      );
    }
  }

  return {
    paths: [...paths].sort((left, right) => (left < right ? -1 : left > right ? 1 : 0)),
    rejections: [...new Set(rejections)].sort((left, right) =>
      left < right ? -1 : left > right ? 1 : 0,
    ),
  };
}

export interface ArchiveFile {
  readonly path: string;
  readonly bytes: Uint8Array;
}

// A ZIP stores modification times as DOS date fields whose epoch is 1980-01-01, so this is the
// smallest representable instant and the only one that never depends on when the build ran.
const DETERMINISTIC_MODIFIED_AT = new Date(Date.UTC(1980, 0, 1, 0, 0, 0));
const REGULAR_FILE_MODE = 0o100_644;
const EXTERNAL_FILE_ATTRIBUTES = (REGULAR_FILE_MODE * 0x1_00_00) >>> 0;
const DEFLATE_LEVEL = 9;

/** Entry order, mtime, permission bits and compression level are pinned, so identical file sets give identical bytes and a reproducible SHA-256. */
export async function build_archive(files: readonly ArchiveFile[]): Promise<Uint8Array> {
  const writer = new ZipWriter(new Uint8ArrayWriter(), {
    level: DEFLATE_LEVEL,
    lastModDate: DETERMINISTIC_MODIFIED_AT,
    extendedTimestamp: false,
    dataDescriptor: false,
    keepOrder: true,
    msDosCompatible: false,
    externalFileAttributes: EXTERNAL_FILE_ATTRIBUTES,
  });
  for (const file of files) {
    await writer.add(file.path, new Uint8ArrayReader(file.bytes));
  }
  return writer.close();
}

export function sha256_hex(bytes: Uint8Array): string {
  return createHash("sha256").update(bytes).digest("hex");
}

export function format_checksum_sidecar(digest: string, archive_name: string): string {
  return `${digest}  ${archive_name}\n`;
}

export class PackagingError extends Error {
  constructor(readonly rejections: readonly string[]) {
    super(`The repository is not releasable:\n${rejections.map((r) => `  - ${r}`).join("\n")}`);
    this.name = "PackagingError";
  }
}

export function read_manifest_facts(source: string): ManifestFacts {
  const parsed: unknown = JSON.parse(source);
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new Error("manifest.json is not a JSON object");
  }
  const manifest = parsed as Record<string, unknown>;
  const string_field = (name: string): string | undefined => {
    const value = manifest[name];
    return typeof value === "string" ? value : undefined;
  };
  const raw_locales = manifest.i18n;
  const locale_paths =
    typeof raw_locales === "object" && raw_locales !== null && !Array.isArray(raw_locales)
      ? Object.values(raw_locales).filter((value): value is string => typeof value === "string")
      : [];
  return {
    version: string_field("version") ?? "",
    js_path: string_field("js"),
    css_path: string_field("css"),
    locale_paths,
  };
}

const PACKAGED_ROOTS = ["dist", "i18n"] as const;

async function list_present_paths(repository_root: string): Promise<Set<string>> {
  const present = new Set<string>(ROOT_FILES);
  for (const root of PACKAGED_ROOTS) {
    const absolute_root = join(repository_root, root);
    let entries;
    try {
      entries = await readdir(absolute_root, { recursive: true, withFileTypes: true });
    } catch {
      continue;
    }
    for (const entry of entries) {
      if (!entry.isFile()) {
        continue;
      }
      const absolute = join(entry.parentPath, entry.name);
      present.add(
        absolute
          .slice(repository_root.length + 1)
          .split("\\")
          .join("/"),
      );
    }
  }
  return present;
}

function list_tracked_paths(repository_root: string): Set<string> {
  const stdout = execFileSync("git", ["ls-files", "-z", "--", ...PACKAGED_ROOTS, ...ROOT_FILES], {
    cwd: repository_root,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  return new Set(stdout.split("\0").filter((path) => path !== ""));
}

export interface PackageResult {
  readonly archive_path: string;
  readonly checksum_path: string;
  readonly entry_count: number;
  readonly byte_length: number;
  readonly sha256: string;
}

export interface PackageOptions {
  readonly repository_root: string;
  readonly output_path: string;
}

export async function package_extension(options: PackageOptions): Promise<PackageResult> {
  const repository_root = resolve(options.repository_root);
  const manifest_source = await readFile(join(repository_root, "manifest.json"), "utf8");
  const package_source: unknown = JSON.parse(
    await readFile(join(repository_root, "package.json"), "utf8"),
  );
  const package_version =
    typeof package_source === "object" &&
    package_source !== null &&
    typeof (package_source as Record<string, unknown>).version === "string"
      ? ((package_source as Record<string, unknown>).version as string)
      : "";

  const selection = select_release_paths({
    manifest: read_manifest_facts(manifest_source),
    package_version,
    tracked: list_tracked_paths(repository_root),
    present: await list_present_paths(repository_root),
  });
  if (selection.rejections.length > 0) {
    throw new PackagingError(selection.rejections);
  }

  const files: ArchiveFile[] = [];
  for (const path of selection.paths) {
    files.push({ path, bytes: new Uint8Array(await readFile(join(repository_root, path))) });
  }
  const archive = await build_archive(files);
  const digest = sha256_hex(archive);

  const archive_path = resolve(options.output_path);
  const checksum_path = `${archive_path}.sha256`;
  await mkdir(dirname(archive_path), { recursive: true });
  await writeFile(archive_path, archive);
  await writeFile(checksum_path, format_checksum_sidecar(digest, basename(archive_path)), "utf8");

  return {
    archive_path,
    checksum_path,
    entry_count: files.length,
    byte_length: archive.byteLength,
    sha256: digest,
  };
}

const DEFAULT_REPOSITORY_ROOT = resolve(
  fileURLToPath(new URL(".", import.meta.url)),
  "..",
  "..",
  "..",
);
export const DEFAULT_OUTPUT_RELATIVE_PATH = "output/release/tavern-canvas.zip";

export interface CommandLine {
  readonly repository_root: string | undefined;
  readonly output_path: string | undefined;
}

export function parse_arguments(argv: readonly string[]): CommandLine {
  let repository_root: string | undefined;
  let output_path: string | undefined;

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--repository-root") {
      repository_root = argv[index + 1];
      index += 1;
      continue;
    }
    if (argument === "--output") {
      output_path = argv[index + 1];
      index += 1;
      continue;
    }
    if (argument !== undefined && argument.startsWith("--")) {
      throw new Error(
        "Usage: tavern-canvas-package-extension [--repository-root <dir>] [--output <zip>]",
      );
    }
  }
  return { repository_root, output_path };
}

async function run_cli(argv: readonly string[]): Promise<void> {
  const command_line = parse_arguments(argv);
  const repository_root = command_line.repository_root ?? DEFAULT_REPOSITORY_ROOT;
  const result = await package_extension({
    repository_root,
    output_path: command_line.output_path ?? join(repository_root, DEFAULT_OUTPUT_RELATIVE_PATH),
  });
  console.log(`archive=${result.archive_path}`);
  console.log(`entries=${String(result.entry_count)}`);
  console.log(`bytes=${String(result.byte_length)}`);
  console.log(`sha256=${result.sha256}`);
  console.log(`checksum=${result.checksum_path}`);
}

const entry_path = process.argv[1];
if (entry_path !== undefined && resolve(entry_path) === fileURLToPath(import.meta.url)) {
  try {
    await run_cli(process.argv.slice(2));
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
