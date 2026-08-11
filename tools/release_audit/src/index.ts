import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";

import { Uint8ArrayReader, Uint8ArrayWriter, ZipReader } from "@zip.js/zip.js";

import {
  find_first_party_emoji,
  find_font_awesome_references,
  find_legacy_runtime_references,
  find_remote_runtime_urls,
  find_runtime_asset_references,
  find_secret_matches,
  find_source_map_references,
  find_static_chunk_imports,
  type ContentMatch,
} from "./content_scan.js";

export type ReleaseRuleId =
  | "zip-path-hygiene"
  | "disallowed-path"
  | "manifest-schema"
  | "entry-checksum"
  | "missing-runtime-file"
  | "locale-coverage"
  | "version-gate"
  | "forbidden-name"
  | "source-map"
  | "secret-pattern"
  | "legacy-runtime-path"
  | "remote-runtime-url"
  | "font-awesome"
  | "first-party-emoji"
  | "dist-not-tracked"
  | "legacy-history"
  | "bundle-budget-input";

export interface ReleaseFinding {
  readonly rule_id: ReleaseRuleId;
  readonly path: string;
  readonly detail: string;
}

export interface ArchiveEntry {
  readonly path: string;
  readonly bytes: Uint8Array;
  readonly declared_crc32: number;
  readonly declared_uncompressed_size: number;
  readonly external_file_attributes: number;
  readonly is_directory: boolean;
}

export interface ReportFields {
  readonly legacy_paths: number;
  readonly remote_runtime_scripts: number;
  readonly font_awesome_references: number;
  readonly first_party_emoji: number;
  readonly manifest_dependency: string;
  readonly minimum_tavern_helper_version: string;
  readonly locale_count: number;
  readonly initial_js_gzip_bytes: number;
  readonly initial_css_gzip_bytes: number;
}

export interface AuditReport {
  readonly findings: readonly ReleaseFinding[];
  readonly fields: ReportFields;
  /** SHA-256 of the archive file and of every entry's decompressed bytes, recomputed by rule `entry-checksum`. */
  readonly archive_sha256: string;
  readonly entry_sha256: ReadonlyMap<string, string>;
}

export const REPORT_FIELD_ORDER = [
  "legacy_paths",
  "remote_runtime_scripts",
  "font_awesome_references",
  "first_party_emoji",
  "manifest_dependency",
  "minimum_tavern_helper_version",
  "locale_count",
  "initial_js_gzip_bytes",
  "initial_css_gzip_bytes",
] as const satisfies readonly (keyof ReportFields)[];

export function format_report(fields: ReportFields): string {
  return REPORT_FIELD_ORDER.map((name) => `${name}=${String(fields[name])}`).join("\n");
}

export function format_finding(finding: ReleaseFinding): string {
  return `${finding.rule_id}: ${finding.detail}`;
}

/**
 * The `dist/` half of the release is only reproducible from a checkout when git actually tracks
 * it. Stage 05 shipped `dist/vocabulary/` into the archive while `.gitignore` excluded it, so a
 * fresh clone built a runtime that fetched files nobody could restore. `historical_paths` covers
 * the other half of the same question: what the published repository's history carries.
 */
export interface GitDistPort {
  tracked_dist_paths(): ReadonlySet<string>;
  historical_paths(): ReadonlySet<string>;
  ignore_rule?(path: string): string | undefined;
}

/**
 * The commit whose ancestry the `legacy-history` rule judges. It is the ref being released, not
 * `--all`: a clone only ever receives the refs the remote publishes, and `git push origin main`
 * only transfers objects reachable from `main`. Scanning `--all` instead charges the release for
 * local-only branches that no clone can reach, which is a different question from the one
 * architecture criterion 18 asks.
 */
export const DEFAULT_HISTORY_REF = "HEAD";

export function create_git_dist_port(
  repository_root: string,
  history_ref: string = DEFAULT_HISTORY_REF,
): GitDistPort {
  return {
    tracked_dist_paths(): ReadonlySet<string> {
      const stdout = execFileSync("git", ["ls-files", "-z", "--", "dist"], {
        cwd: repository_root,
        encoding: "utf8",
        maxBuffer: 64 * 1024 * 1024,
      });
      return new Set(stdout.split("\0").filter((path) => path !== ""));
    },
    historical_paths(): ReadonlySet<string> {
      const stdout = execFileSync(
        "git",
        ["log", history_ref, "--diff-filter=A", "--name-only", "--pretty=format:"],
        { cwd: repository_root, encoding: "utf8", maxBuffer: 256 * 1024 * 1024 },
      );
      return new Set(
        stdout
          .split("\n")
          .map((path) => path.trim())
          .filter((path) => path !== ""),
      );
    },
    ignore_rule(path: string): string | undefined {
      try {
        const stdout = execFileSync("git", ["check-ignore", "--no-index", "-v", "--stdin"], {
          cwd: repository_root,
          encoding: "utf8",
          input: path,
        });
        const rule = stdout
          .split("\n")
          .find((line) => line !== "")
          ?.split("\t")[0];
        // `-v` also reports the negation pattern that un-ignored a path (`.gitignore:5:!/dist/**`),
        // which would otherwise be printed as the reason a file is excluded when it is the reason
        // the file is allowed. Such a path is simply one nobody committed.
        return rule === undefined || rule.slice(rule.lastIndexOf(":") + 1).startsWith("!")
          ? undefined
          : rule;
      } catch {
        // git check-ignore exits 1 when no rule matches, which is the common case for a path that
        // is simply absent from the index.
        return undefined;
      }
    },
  };
}

const CRC32_TABLE = build_crc32_table();

function build_crc32_table(): Uint32Array {
  const table = new Uint32Array(256);
  for (let index = 0; index < 256; index += 1) {
    let value = index;
    for (let bit = 0; bit < 8; bit += 1) {
      value = (value & 1) === 1 ? 0xed_b8_83_20 ^ (value >>> 1) : value >>> 1;
    }
    table[index] = value >>> 0;
  }
  return table;
}

export function crc32(bytes: Uint8Array): number {
  let checksum = 0xff_ff_ff_ff;
  for (const byte of bytes) {
    checksum = (CRC32_TABLE[(checksum ^ byte) & 0xff] ?? 0) ^ (checksum >>> 8);
  }
  return (checksum ^ 0xff_ff_ff_ff) >>> 0;
}

export function sha256_hex(bytes: Uint8Array): string {
  return createHash("sha256").update(bytes).digest("hex");
}

const UNIX_FILE_TYPE_MASK = 0xf0_00;
const UNIX_SYMBOLIC_LINK_TYPE = 0xa0_00;

function is_symbolic_link(entry: ArchiveEntry): boolean {
  return (
    ((entry.external_file_attributes >>> 16) & UNIX_FILE_TYPE_MASK) === UNIX_SYMBOLIC_LINK_TYPE
  );
}

export async function read_archive_entries(archive: Uint8Array): Promise<ArchiveEntry[]> {
  const reader = new ZipReader(new Uint8ArrayReader(archive));
  try {
    const entries: ArchiveEntry[] = [];
    for (const entry of await reader.getEntries()) {
      entries.push({
        path: entry.filename,
        bytes: entry.directory
          ? new Uint8Array(0)
          : await entry.getData(new Uint8ArrayWriter(), { checkSignature: false }),
        declared_crc32: entry.signature >>> 0,
        declared_uncompressed_size: entry.uncompressedSize,
        external_file_attributes: entry.externalFileAttributes,
        is_directory: entry.directory,
      });
    }
    return entries;
  } finally {
    await reader.close();
  }
}

const TEXT_EXTENSIONS = new Set([
  ".cjs",
  ".css",
  ".html",
  ".js",
  ".json",
  ".map",
  ".md",
  ".mjs",
  ".svg",
  ".txt",
]);

function extension_of(path: string): string {
  const at = path.lastIndexOf(".");
  return at === -1 ? "" : path.slice(at).toLowerCase();
}

function is_text_entry(entry: ArchiveEntry): boolean {
  return !entry.is_directory && TEXT_EXTENSIONS.has(extension_of(entry.path));
}

function is_script_or_style(entry: ArchiveEntry): boolean {
  const extension = extension_of(entry.path);
  return (
    !entry.is_directory && (extension === ".js" || extension === ".mjs" || extension === ".css")
  );
}

function decode_text(bytes: Uint8Array): string {
  return new TextDecoder("utf-8").decode(bytes);
}

const ENTRY_BUNDLE_PATH = "dist/index.js";
const STYLESHEET_PATH = "dist/index.css";

interface AuditContext {
  readonly entries: readonly ArchiveEntry[];
  readonly by_path: ReadonlyMap<string, ArchiveEntry>;
  readonly text_cache: Map<string, string>;
  readonly findings: ReleaseFinding[];
}

function text_of(context: AuditContext, entry: ArchiveEntry): string {
  const cached = context.text_cache.get(entry.path);
  if (cached !== undefined) {
    return cached;
  }
  const text = decode_text(entry.bytes);
  context.text_cache.set(entry.path, text);
  return text;
}

const WINDOWS_DRIVE_PATTERN = /^[A-Za-z]:[\\/]/u;

function check_path_hygiene(context: AuditContext): void {
  const seen = new Set<string>();
  const seen_case_insensitive = new Map<string, string>();

  for (const entry of context.entries) {
    const path = entry.path;
    const push = (detail: string): void => {
      context.findings.push({ rule_id: "zip-path-hygiene", path, detail: `${path} ${detail}` });
    };

    if (path === "") {
      context.findings.push({
        rule_id: "zip-path-hygiene",
        path,
        detail: "an entry has an empty path",
      });
      continue;
    }
    if (entry.is_directory) {
      push("is a directory entry; the release archive must contain only files");
    }
    if (path.startsWith("/") || WINDOWS_DRIVE_PATTERN.test(path)) {
      push("is an absolute path");
    }
    if (path.includes("\\")) {
      push("uses a non-POSIX path separator");
    }
    if (path.split("/").includes("..")) {
      push("contains a parent-directory traversal segment");
    }
    if (is_symbolic_link(entry)) {
      push("is a symbolic link");
    }
    if (seen.has(path)) {
      push("is a duplicate entry");
    }
    seen.add(path);

    const folded = path.toLowerCase();
    const previous = seen_case_insensitive.get(folded);
    if (previous !== undefined && previous !== path) {
      push(`collides with ${previous} on a case-insensitive filesystem`);
    }
    seen_case_insensitive.set(folded, path);
  }
}

const ALLOWED_ROOT_FILES = new Set([
  "CHANGELOG.md",
  "README.md",
  "SECURITY.md",
  "THIRD_PARTY_NOTICES.md",
  "manifest.json",
]);
const ALLOWED_LOCALE_PATTERN = /^i18n\/[^/]+\.json$/u;
const ALLOWED_DIST_PATTERN = /^dist\/.+$/u;

interface NonRuntimeDistPrefix {
  readonly prefix: string;
  readonly reason: string;
}

// `dist/**` is otherwise wide open, so the build's own bookkeeping needs naming explicitly.
// apps/extension/vite.config.ts writes dist/.vite/manifest.json for the bundle-budget gate; it is
// gitignored, it is never fetched at runtime, and it must not reach a user's extensions directory.
const NON_RUNTIME_DIST_PREFIXES: readonly NonRuntimeDistPrefix[] = [
  { prefix: "dist/.vite/", reason: "Vite build metadata rather than runtime output" },
];

export function release_path_rejection(path: string): string | undefined {
  const non_runtime = NON_RUNTIME_DIST_PREFIXES.find((candidate) =>
    path.startsWith(candidate.prefix),
  );
  if (non_runtime !== undefined) {
    return non_runtime.reason;
  }
  if (
    ALLOWED_ROOT_FILES.has(path) ||
    ALLOWED_LOCALE_PATTERN.test(path) ||
    ALLOWED_DIST_PATTERN.test(path)
  ) {
    return undefined;
  }
  return "outside the published release layout";
}

export function is_allowed_release_path(path: string): boolean {
  return release_path_rejection(path) === undefined;
}

function check_allowed_paths(context: AuditContext): void {
  for (const entry of context.entries) {
    const rejection = release_path_rejection(entry.path);
    if (rejection !== undefined) {
      context.findings.push({
        rule_id: "disallowed-path",
        path: entry.path,
        detail: `${entry.path} is ${rejection}`,
      });
    }
  }
}

interface ForbiddenPattern {
  readonly label: string;
  readonly pattern: RegExp;
}

const FORBIDDEN_PATH_PATTERNS: readonly ForbiddenPattern[] = [
  { label: "environment file", pattern: /(?:^|\/)\.env(?:\.|$)/u },
  { label: "PEM material", pattern: /\.pem$/iu },
  { label: "key file", pattern: /\.key$/iu },
  { label: "SSH private key", pattern: /(?:^|\/)id_rsa/u },
  { label: "git metadata", pattern: /(?:^|\/)\.git\//u },
  { label: "installed dependency tree", pattern: /(?:^|\/)node_modules\//u },
  { label: "macOS metadata", pattern: /(?:^|\/)\.DS_Store$/u },
  { label: "Windows metadata", pattern: /(?:^|\/)Thumbs\.db$/iu },
  { label: "nested archive", pattern: /\.(?:tar\.gz|tgz|zip|7z|rar)$/iu },
  { label: "local data archive", pattern: /^data\/_archive\//u },
  { label: "internal development document", pattern: /^docs\/_dev\//u },
  { label: "build output directory", pattern: /^output\//u },
  { label: "test artifact directory", pattern: /^test-results\//u },
];

function check_forbidden_names(context: AuditContext): void {
  for (const entry of context.entries) {
    for (const { label, pattern } of FORBIDDEN_PATH_PATTERNS) {
      if (pattern.test(entry.path)) {
        context.findings.push({
          rule_id: "forbidden-name",
          path: entry.path,
          detail: `${entry.path} is a forbidden ${label}`,
        });
      }
    }
  }
}

function check_entry_checksums(context: AuditContext): Map<string, string> {
  const entry_sha256 = new Map<string, string>();
  for (const entry of context.entries) {
    entry_sha256.set(entry.path, sha256_hex(entry.bytes));
    if (entry.is_directory) {
      continue;
    }
    if (entry.bytes.byteLength !== entry.declared_uncompressed_size) {
      context.findings.push({
        rule_id: "entry-checksum",
        path: entry.path,
        detail: `${entry.path} declares ${String(entry.declared_uncompressed_size)} uncompressed bytes but decompresses to ${String(entry.bytes.byteLength)}`,
      });
    }
    const actual_crc32 = crc32(entry.bytes);
    if (actual_crc32 !== entry.declared_crc32) {
      context.findings.push({
        rule_id: "entry-checksum",
        path: entry.path,
        detail: `${entry.path} declares CRC ${entry.declared_crc32.toString(16)} but its bytes hash to ${actual_crc32.toString(16)}`,
      });
    }
  }
  return entry_sha256;
}

interface ManifestFacts {
  readonly dependencies: string;
  readonly js_path: string | undefined;
  readonly css_path: string | undefined;
  readonly locale_paths: readonly string[];
  readonly minimum_tavern_helper_version: string;
}

const SEMVER_PATTERN = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/u;
const MANIFEST_PATH = "manifest.json";
const REQUIRED_DEPENDENCY = "third-party/JS-Slash-Runner";
const REQUIRED_HOME_PAGE_PREFIX = "https://github.com/";

function is_plain_object(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function string_field(manifest: Record<string, unknown>, name: string): string | undefined {
  const value = manifest[name];
  return typeof value === "string" ? value : undefined;
}

const EMPTY_MANIFEST_FACTS: ManifestFacts = {
  dependencies: "",
  js_path: undefined,
  css_path: undefined,
  locale_paths: [],
  minimum_tavern_helper_version: "",
};

function check_manifest(context: AuditContext): ManifestFacts {
  const push = (detail: string): void => {
    context.findings.push({ rule_id: "manifest-schema", path: MANIFEST_PATH, detail });
  };

  const entry = context.by_path.get(MANIFEST_PATH);
  if (entry === undefined) {
    push(`${MANIFEST_PATH} is missing from the archive`);
    return EMPTY_MANIFEST_FACTS;
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(text_of(context, entry));
  } catch {
    push(`${MANIFEST_PATH} is not valid JSON`);
    return EMPTY_MANIFEST_FACTS;
  }
  if (!is_plain_object(parsed)) {
    push(`${MANIFEST_PATH} is not a JSON object`);
    return EMPTY_MANIFEST_FACTS;
  }

  const display_name = string_field(parsed, "display_name");
  if (display_name === undefined || display_name.trim() === "") {
    push(`${MANIFEST_PATH} has no non-empty display_name`);
  }

  const version = string_field(parsed, "version");
  if (version === undefined || !SEMVER_PATTERN.test(version)) {
    push(`${MANIFEST_PATH} version is not a semantic version`);
  }

  const js_path = string_field(parsed, "js");
  if (js_path === undefined || !js_path.startsWith("dist/")) {
    push(`${MANIFEST_PATH} js must point under dist/`);
  }
  const css_path = string_field(parsed, "css");
  if (css_path === undefined || !css_path.startsWith("dist/")) {
    push(`${MANIFEST_PATH} css must point under dist/`);
  }

  const raw_dependencies = parsed.dependencies;
  const dependencies = Array.isArray(raw_dependencies)
    ? raw_dependencies.filter((value): value is string => typeof value === "string")
    : [];
  if (dependencies.length !== 1 || dependencies[0] !== REQUIRED_DEPENDENCY) {
    push(`${MANIFEST_PATH} dependencies must be exactly ["${REQUIRED_DEPENDENCY}"]`);
  }

  if (parsed.auto_update !== true) {
    push(`${MANIFEST_PATH} must set auto_update to true`);
  }

  const home_page = string_field(parsed, "homePage");
  if (home_page === undefined || !home_page.startsWith(REQUIRED_HOME_PAGE_PREFIX)) {
    push(`${MANIFEST_PATH} homePage must be a non-empty ${REQUIRED_HOME_PAGE_PREFIX} URL`);
  }

  const minimum_client_version = string_field(parsed, "minimum_client_version");
  if (minimum_client_version === undefined || !SEMVER_PATTERN.test(minimum_client_version)) {
    push(`${MANIFEST_PATH} minimum_client_version is not a semantic version`);
  }

  const raw_locales = parsed.i18n;
  const locale_paths = is_plain_object(raw_locales)
    ? Object.values(raw_locales).filter((value): value is string => typeof value === "string")
    : [];

  return {
    dependencies: dependencies.join(","),
    js_path,
    css_path,
    locale_paths,
    minimum_tavern_helper_version: string_field(parsed, "minimum_tavern_helper_version") ?? "",
  };
}

const VOCABULARY_BASELINE_PREFIX = "dist/vocabulary/baseline/";
const VOCABULARY_BASELINE_MANIFEST = `${VOCABULARY_BASELINE_PREFIX}manifest.json`;
const RUNTIME_FETCHED_PATHS = ["dist/workers/vocabulary_worker.js", VOCABULARY_BASELINE_MANIFEST];

function require_entry(
  context: AuditContext,
  path: string,
  reason: string,
): ArchiveEntry | undefined {
  const entry = context.by_path.get(path);
  if (entry === undefined) {
    context.findings.push({
      rule_id: "missing-runtime-file",
      path,
      detail: `${path} is missing from the archive but ${reason}`,
    });
    return undefined;
  }
  if (entry.bytes.byteLength === 0) {
    context.findings.push({
      rule_id: "missing-runtime-file",
      path,
      detail: `${path} is empty but ${reason}`,
    });
  }
  return entry;
}

function check_runtime_files(context: AuditContext, manifest: ManifestFacts): void {
  if (manifest.js_path !== undefined) {
    require_entry(context, manifest.js_path, "manifest.json declares it as the extension script");
  }
  if (manifest.css_path !== undefined) {
    require_entry(
      context,
      manifest.css_path,
      "manifest.json declares it as the extension stylesheet",
    );
  }
  for (const path of RUNTIME_FETCHED_PATHS) {
    require_entry(context, path, "the runtime fetches it at a relative path");
  }

  const baseline = context.by_path.get(VOCABULARY_BASELINE_MANIFEST);
  if (baseline !== undefined) {
    check_vocabulary_shards(context, baseline);
  }

  for (const source_path of [STYLESHEET_PATH, ENTRY_BUNDLE_PATH]) {
    const source = context.by_path.get(source_path);
    if (source === undefined) {
      continue;
    }
    for (const reference of find_runtime_asset_references(text_of(context, source))) {
      require_entry(context, `dist/${reference}`, `${source_path} references it as a build asset`);
    }
  }
}

function check_vocabulary_shards(context: AuditContext, baseline: ArchiveEntry): void {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text_of(context, baseline));
  } catch {
    context.findings.push({
      rule_id: "missing-runtime-file",
      path: VOCABULARY_BASELINE_MANIFEST,
      detail: `${VOCABULARY_BASELINE_MANIFEST} is not valid JSON, so its shard list cannot be verified`,
    });
    return;
  }
  const shards = is_plain_object(parsed) ? parsed.shards : undefined;
  if (!Array.isArray(shards)) {
    context.findings.push({
      rule_id: "missing-runtime-file",
      path: VOCABULARY_BASELINE_MANIFEST,
      detail: `${VOCABULARY_BASELINE_MANIFEST} declares no shards array`,
    });
    return;
  }
  for (const shard of shards) {
    const shard_path = is_plain_object(shard) ? shard.path : undefined;
    if (typeof shard_path !== "string") {
      continue;
    }
    const path = `${VOCABULARY_BASELINE_PREFIX}${shard_path}`;
    if (!context.by_path.has(path)) {
      context.findings.push({
        rule_id: "missing-runtime-file",
        path,
        detail: `${path} is listed by the vocabulary baseline manifest but missing from the archive`,
      });
    }
  }
}

const LAUNCH_LOCALES = ["en", "zh-CN"] as const;
const LOCALE_FILE_PATTERN = /^i18n\/([^/]+)\.json$/u;
const LOCALE_CHUNK_PATTERN = /^dist\/chunks\/([a-z]{2}(?:[_-][a-z]{2})?)-[A-Za-z0-9_-]{4,}\.js$/u;

export function normalize_locale_id(raw: string): string {
  const parts = raw
    .toLowerCase()
    .split(/[_-]/u)
    .filter((part) => part !== "");
  const language = parts[0] ?? raw.toLowerCase();
  const region = parts[1];
  return region === undefined ? language : `${language}-${region.toUpperCase()}`;
}

function check_locales(context: AuditContext, manifest: ManifestFacts): number {
  const locales = new Set<string>();

  for (const entry of context.entries) {
    const locale_file = LOCALE_FILE_PATTERN.exec(entry.path)?.[1];
    if (locale_file !== undefined) {
      locales.add(normalize_locale_id(locale_file));
    }
    const locale_chunk = LOCALE_CHUNK_PATTERN.exec(entry.path)?.[1];
    if (locale_chunk !== undefined) {
      locales.add(normalize_locale_id(locale_chunk));
    }
  }

  // The default catalog is compiled into the entry chunk rather than split out, so a present and
  // non-empty dist/index.js is what ships `en`; every other locale arrives as its own chunk.
  const entry_bundle = context.by_path.get(ENTRY_BUNDLE_PATH);
  if (entry_bundle !== undefined && entry_bundle.bytes.byteLength > 0) {
    locales.add("en");
  }

  for (const path of manifest.locale_paths) {
    if (!context.by_path.has(path)) {
      context.findings.push({
        rule_id: "locale-coverage",
        path,
        detail: `${path} is named by manifest.json's i18n field but missing from the archive`,
      });
    }
  }

  for (const locale of LAUNCH_LOCALES) {
    if (!locales.has(locale)) {
      context.findings.push({
        rule_id: "locale-coverage",
        path: "i18n",
        detail: `the launch locale ${locale} is not represented in the archive`,
      });
    }
  }

  return locales.size;
}

/**
 * The JS the host loads before anything renders: the entry bundle plus every chunk it statically
 * imports. Chunks behind `import("./chunks/...")` arrive later and belong to neither the version
 * gate nor the initial transfer figure. Returned paths may be absent from the archive; callers that
 * care report the gap themselves.
 */
function initial_js_paths(context: AuditContext): string[] {
  const entry_bundle = context.by_path.get(ENTRY_BUNDLE_PATH);
  if (entry_bundle === undefined) {
    return [];
  }
  return [
    ENTRY_BUNDLE_PATH,
    ...find_static_chunk_imports(text_of(context, entry_bundle)).map(
      (specifier) => `dist/${specifier}`,
    ),
  ];
}

function check_version_gate(
  context: AuditContext,
  manifest: ManifestFacts,
  expected_helper_version: string,
): void {
  if (manifest.minimum_tavern_helper_version === "") {
    context.findings.push({
      rule_id: "version-gate",
      path: MANIFEST_PATH,
      detail: `${MANIFEST_PATH} declares no readable minimum_tavern_helper_version`,
    });
  } else if (manifest.minimum_tavern_helper_version !== expected_helper_version) {
    context.findings.push({
      rule_id: "version-gate",
      path: MANIFEST_PATH,
      detail: `${MANIFEST_PATH} declares minimum_tavern_helper_version ${manifest.minimum_tavern_helper_version} but the code requires ${expected_helper_version}`,
    });
  }

  // Code splitting moves the constant out of the entry bundle into a statically imported chunk, so
  // the gate is satisfied by the initial JS asset set as a whole. A chunk reached only through a
  // dynamic import does not count: the version check runs before anything is lazily loaded.
  const initial_js = initial_js_paths(context);
  const carried = initial_js.some((path) => {
    const asset = context.by_path.get(path);
    return asset !== undefined && text_of(context, asset).includes(expected_helper_version);
  });
  if (initial_js.length > 0 && !carried) {
    context.findings.push({
      rule_id: "version-gate",
      path: ENTRY_BUNDLE_PATH,
      detail: `the initial JS asset set (${initial_js.join(", ")}) does not carry the required TavernHelper version ${expected_helper_version}`,
    });
  }
}

function push_content_matches(
  context: AuditContext,
  rule_id: ReleaseRuleId,
  path: string,
  matches: readonly ContentMatch[],
): number {
  for (const match of matches) {
    context.findings.push({
      rule_id,
      path,
      detail: `${path}@${String(match.byte_offset)} ${match.detail}`,
    });
  }
  return matches.length;
}

interface ContentCounts {
  readonly legacy_paths: number;
  readonly remote_runtime_scripts: number;
  readonly font_awesome_references: number;
  readonly first_party_emoji: number;
}

const LEGACY_ROOT_MONOLITH = "index.js";
const LEGACY_PATH_PATTERNS: readonly ForbiddenPattern[] = [
  { label: "v2 settings view directory", pattern: /(?:^|\/)html\/settings\//u },
  { label: "v2 iframe utility directory", pattern: /(?:^|\/)utils\/iframe\//u },
  { label: "v2 settings utility directory", pattern: /(?:^|\/)utils\/settings\//u },
];

function scan_contents(context: AuditContext): ContentCounts {
  let legacy_paths = 0;
  let remote_runtime_scripts = 0;
  let font_awesome_references = 0;
  let first_party_emoji = 0;

  for (const entry of context.entries) {
    if (entry.path === LEGACY_ROOT_MONOLITH) {
      legacy_paths += 1;
      context.findings.push({
        rule_id: "legacy-runtime-path",
        path: entry.path,
        detail: `${entry.path} is the abandoned v2 root monolith`,
      });
    }
    for (const { label, pattern } of LEGACY_PATH_PATTERNS) {
      if (pattern.test(entry.path)) {
        legacy_paths += 1;
        context.findings.push({
          rule_id: "legacy-runtime-path",
          path: entry.path,
          detail: `${entry.path} lives under the ${label}`,
        });
      }
    }

    if (extension_of(entry.path) === ".map") {
      context.findings.push({
        rule_id: "source-map",
        path: entry.path,
        detail: `${entry.path} is a source map and must not ship`,
      });
    }

    if (!is_text_entry(entry)) {
      continue;
    }
    const content = text_of(context, entry);

    push_content_matches(context, "secret-pattern", entry.path, find_secret_matches(content));

    if (is_script_or_style(entry)) {
      push_content_matches(context, "source-map", entry.path, find_source_map_references(content));
      remote_runtime_scripts += push_content_matches(
        context,
        "remote-runtime-url",
        entry.path,
        find_remote_runtime_urls(content),
      );
      font_awesome_references += push_content_matches(
        context,
        "font-awesome",
        entry.path,
        find_font_awesome_references(content),
      );
      legacy_paths += push_content_matches(
        context,
        "legacy-runtime-path",
        entry.path,
        find_legacy_runtime_references(content),
      );
    }

    if (is_script_or_style(entry) || LOCALE_FILE_PATTERN.test(entry.path)) {
      first_party_emoji += push_content_matches(
        context,
        "first-party-emoji",
        entry.path,
        find_first_party_emoji(content),
      );
    }
  }

  return { legacy_paths, remote_runtime_scripts, font_awesome_references, first_party_emoji };
}

function check_dist_tracking(context: AuditContext, git: GitDistPort): void {
  const tracked = git.tracked_dist_paths();
  for (const entry of context.entries) {
    if (!entry.path.startsWith("dist/") || tracked.has(entry.path)) {
      continue;
    }
    const rule = git.ignore_rule?.(entry.path);
    context.findings.push({
      rule_id: "dist-not-tracked",
      path: entry.path,
      detail: `${entry.path} ships from dist/ but git does not track it${rule === undefined ? "" : ` (excluded by ${rule})`}`,
    });
  }
}

const LEGACY_HISTORY_PATTERNS: readonly ForbiddenPattern[] = [
  { label: "legacy source archive directory", pattern: /^data\/_archive\//u },
  { label: "source archive", pattern: /\.(?:tar\.gz|tgz|zip|7z|rar)$/iu },
  { label: "v2 root monolith", pattern: /^index\.js$/u },
];

/**
 * Architecture criterion 18 requires the published repository to start from a clean orphan root
 * commit, so the old version's source archive is absent from the history as well as from the
 * artifact. A path that any commit in the released ref's ancestry ever added stays recoverable
 * from a clone forever; see `DEFAULT_HISTORY_REF` for why that ancestry, and not `--all`, is the
 * subject.
 */
function check_legacy_history(context: AuditContext, git: GitDistPort): void {
  const paths = [...git.historical_paths()].sort((left, right) => left.localeCompare(right));
  for (const path of paths) {
    for (const { label, pattern } of LEGACY_HISTORY_PATTERNS) {
      if (pattern.test(path)) {
        context.findings.push({
          rule_id: "legacy-history",
          path,
          detail: `${path} was added to git history as a ${label}; the published history must start from a clean orphan root commit`,
        });
      }
    }
  }
}

const GZIP_LEVEL = 9;

function gzip_bytes(bytes: Uint8Array): number {
  return gzipSync(bytes, { level: GZIP_LEVEL }).byteLength;
}

interface BundleBytes {
  readonly initial_js_gzip_bytes: number;
  readonly initial_css_gzip_bytes: number;
}

/**
 * Sums the per-file gzip sizes rather than gzipping a concatenation, because each file crosses the
 * wire as its own response. tools/bundle_budget owns the pass/fail threshold; this audit only
 * reports the numbers.
 */
function measure_bundle_bytes(context: AuditContext): BundleBytes {
  const initial_js = initial_js_paths(context);
  const stylesheet = context.by_path.get(STYLESHEET_PATH);
  if (initial_js.length === 0 || stylesheet === undefined) {
    context.findings.push({
      rule_id: "bundle-budget-input",
      path: initial_js.length === 0 ? ENTRY_BUNDLE_PATH : STYLESHEET_PATH,
      detail: `the initial bundle size fields cannot be measured without ${ENTRY_BUNDLE_PATH} and ${STYLESHEET_PATH}`,
    });
    return { initial_js_gzip_bytes: 0, initial_css_gzip_bytes: 0 };
  }

  let initial_js_gzip_bytes = 0;
  for (const path of initial_js) {
    const asset = context.by_path.get(path);
    if (asset === undefined) {
      context.findings.push({
        rule_id: "bundle-budget-input",
        path,
        detail: `${path} is statically imported by ${ENTRY_BUNDLE_PATH} but missing from the archive`,
      });
      continue;
    }
    initial_js_gzip_bytes += gzip_bytes(asset.bytes);
  }

  return { initial_js_gzip_bytes, initial_css_gzip_bytes: gzip_bytes(stylesheet.bytes) };
}

export interface AuditOptions {
  readonly expected_helper_version: string;
  readonly git: GitDistPort;
}

export function audit_entries(
  entries: readonly ArchiveEntry[],
  archive: Uint8Array,
  options: AuditOptions,
): AuditReport {
  const by_path = new Map<string, ArchiveEntry>();
  for (const entry of entries) {
    if (!by_path.has(entry.path)) {
      by_path.set(entry.path, entry);
    }
  }
  const context: AuditContext = { entries, by_path, text_cache: new Map(), findings: [] };

  check_path_hygiene(context);
  check_allowed_paths(context);
  check_forbidden_names(context);
  const entry_sha256 = check_entry_checksums(context);
  const manifest = check_manifest(context);
  check_runtime_files(context, manifest);
  const locale_count = check_locales(context, manifest);
  check_version_gate(context, manifest, options.expected_helper_version);
  const content_counts = scan_contents(context);
  check_dist_tracking(context, options.git);
  check_legacy_history(context, options.git);
  const bundle_bytes = measure_bundle_bytes(context);

  return {
    findings: context.findings,
    fields: {
      ...content_counts,
      manifest_dependency: manifest.dependencies,
      minimum_tavern_helper_version: manifest.minimum_tavern_helper_version,
      locale_count,
      ...bundle_bytes,
    },
    archive_sha256: sha256_hex(archive),
    entry_sha256,
  };
}

const CAPABILITY_PROBE_PATH = "apps/extension/src/host/capability_probe.ts";
const HELPER_VERSION_DECLARATION_PATTERN = /MINIMUM_TAVERN_HELPER_VERSION\s*=\s*["']([^"']+)["']/u;

/**
 * Reads the gate from the code that enforces it, so the audit cannot drift from the runtime it
 * audits. A hardcoded copy here would pass forever after the constant moved.
 */
export async function read_expected_helper_version(repository_root: string): Promise<string> {
  const source_path = resolve(repository_root, CAPABILITY_PROBE_PATH);
  const declared = HELPER_VERSION_DECLARATION_PATTERN.exec(
    await readFile(source_path, "utf8"),
  )?.[1];
  if (declared === undefined) {
    throw new Error(`${source_path} does not declare MINIMUM_TAVERN_HELPER_VERSION`);
  }
  return declared;
}

const DEFAULT_REPOSITORY_ROOT = resolve(
  fileURLToPath(new URL(".", import.meta.url)),
  "..",
  "..",
  "..",
);

export interface AuditReleaseOptions {
  readonly repository_root?: string;
  readonly history_ref?: string;
  readonly git?: GitDistPort;
}

export async function audit_release(
  archive_path: string,
  options: AuditReleaseOptions = {},
): Promise<AuditReport> {
  const repository_root = resolve(options.repository_root ?? DEFAULT_REPOSITORY_ROOT);
  const archive = new Uint8Array(await readFile(archive_path));
  const entries = await read_archive_entries(archive);
  return audit_entries(entries, archive, {
    expected_helper_version: await read_expected_helper_version(repository_root),
    git: options.git ?? create_git_dist_port(repository_root, options.history_ref),
  });
}

interface CommandLine {
  readonly archive_path: string;
  readonly repository_root: string | undefined;
  readonly history_ref: string | undefined;
}

export function parse_arguments(argv: readonly string[]): CommandLine {
  let archive_path: string | undefined;
  let repository_root: string | undefined;
  let history_ref: string | undefined;

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--repository-root") {
      repository_root = argv[index + 1];
      index += 1;
      continue;
    }
    if (argument === "--history-ref") {
      history_ref = argv[index + 1];
      index += 1;
      continue;
    }
    if (argument !== undefined && !argument.startsWith("--")) {
      archive_path ??= argument;
    }
  }

  if (archive_path === undefined) {
    throw new Error(
      "Usage: tavern-canvas-release-audit <path-to-release.zip> [--repository-root <dir>] [--history-ref <ref>]",
    );
  }
  return { archive_path, repository_root, history_ref };
}

async function run_cli(argv: readonly string[]): Promise<void> {
  const command_line = parse_arguments(argv);
  const report = await audit_release(command_line.archive_path, {
    ...(command_line.repository_root === undefined
      ? {}
      : { repository_root: command_line.repository_root }),
    ...(command_line.history_ref === undefined ? {} : { history_ref: command_line.history_ref }),
  });

  console.log(format_report(report.fields));
  for (const finding of report.findings) {
    console.error(format_finding(finding));
  }
  process.exitCode = report.findings.length === 0 ? 0 : 1;
}

const entry_path = process.argv[1];
if (entry_path !== undefined && resolve(entry_path) === fileURLToPath(import.meta.url)) {
  await run_cli(process.argv.slice(2));
}
