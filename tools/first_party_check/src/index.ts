import { lstat, readdir, readFile } from "node:fs/promises";
import { extname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export type SourceRuleId =
  "remote-script" | "remote-style" | "font-awesome" | "first-party-emoji" | "legacy-runtime-import";

export interface SourceFinding {
  readonly file_path: string;
  readonly line: number;
  readonly rule_id: SourceRuleId;
  readonly excerpt: string;
}

export interface ScanOptions {
  readonly repository_root?: string;
}

interface SourceRule {
  readonly rule_id: SourceRuleId;
  readonly pattern: RegExp;
}

const SCANNED_EXTENSIONS = new Set([".cjs", ".css", ".js", ".json", ".mjs", ".ts", ".tsx", ".vue"]);
const SKIPPED_DIRECTORY_NAMES = new Set([
  ".git",
  ".pnpm-store",
  ".vite",
  "coverage",
  "dist",
  "node_modules",
  "output",
  "playwright-report",
  "test-results",
]);
const ALLOWED_FIXTURE_PATHS = ["tests/fixtures/user_content/", "tools/v2_migration/fixtures/"];
const SOURCE_RULES: readonly SourceRule[] = [
  {
    rule_id: "remote-script",
    pattern: /<script\b[^>]*\bsrc\s*=\s*["']?\s*https?:\/\//iu,
  },
  {
    rule_id: "remote-style",
    pattern: /(?:@import\s+(?:url\(\s*)?["']?https?:\/\/|url\(\s*["']?https?:\/\/)/iu,
  },
  {
    rule_id: "font-awesome",
    pattern: /(?:Font\s+Awesome|\bfa-solid\b|\bfa-[a-z0-9-]+\b)/iu,
  },
  {
    rule_id: "first-party-emoji",
    pattern: /\p{Extended_Pictographic}/u,
  },
  {
    rule_id: "legacy-runtime-import",
    pattern:
      /(?:import\s+(?:[^"']+\s+from\s+)?|import\s*\(|require\s*\()\s*["'](?:(?:\.\.\/)+|\/)(?:index\.js|settings\.html|transformers\.min\.js)["']/u,
  },
];

function normalize_path(path: string): string {
  return path.replaceAll("\\", "/");
}

function is_allowed_fixture(file_path: string, repository_root: string): boolean {
  const relative_path = normalize_path(relative(repository_root, file_path));
  return ALLOWED_FIXTURE_PATHS.some(
    (allowed_path) =>
      relative_path.startsWith(allowed_path) || relative_path.includes(`/${allowed_path}`),
  );
}

async function collect_source_files(input_paths: readonly string[]): Promise<string[]> {
  const files: string[] = [];

  async function visit(path: string): Promise<void> {
    const metadata = await lstat(path);
    if (metadata.isSymbolicLink()) {
      return;
    }
    if (metadata.isDirectory()) {
      if (SKIPPED_DIRECTORY_NAMES.has(path.split(/[\\/]/u).at(-1) ?? "")) {
        return;
      }
      const entries = await readdir(path, { withFileTypes: true });
      entries.sort((left, right) => left.name.localeCompare(right.name));
      for (const entry of entries) {
        if (!entry.isSymbolicLink()) {
          await visit(resolve(path, entry.name));
        }
      }
      return;
    }
    if (metadata.isFile() && SCANNED_EXTENSIONS.has(extname(path).toLowerCase())) {
      files.push(path);
    }
  }

  for (const input_path of input_paths) {
    await visit(resolve(input_path));
  }
  files.sort((left, right) => left.localeCompare(right));
  return files;
}

function scan_source(file_path: string, source: string, repository_root: string): SourceFinding[] {
  const file_name = normalize_path(relative(repository_root, file_path));
  const findings: SourceFinding[] = [];
  const lines = source.split(/\r?\n/u);

  for (const [index, line] of lines.entries()) {
    for (const rule of SOURCE_RULES) {
      if (rule.pattern.test(line)) {
        findings.push({
          file_path: file_name,
          line: index + 1,
          rule_id: rule.rule_id,
          excerpt: line.trim().slice(0, 160),
        });
      }
    }
  }
  return findings;
}

export async function scan_first_party(
  input_paths: readonly string[],
  options: ScanOptions = {},
): Promise<SourceFinding[]> {
  const repository_root = resolve(options.repository_root ?? process.cwd());
  const files = await collect_source_files(input_paths);
  const findings: SourceFinding[] = [];

  for (const file_path of files) {
    if (!is_allowed_fixture(file_path, repository_root)) {
      findings.push(...scan_source(file_path, await readFile(file_path, "utf8"), repository_root));
    }
  }
  return findings;
}

export function format_finding(finding: SourceFinding): string {
  return `${finding.file_path}:${String(finding.line)} [${finding.rule_id}] ${finding.excerpt}`;
}

async function run_cli(input_paths: readonly string[]): Promise<void> {
  const paths = input_paths.length > 0 ? input_paths : ["apps", "packages"];
  const findings = await scan_first_party(paths);
  if (findings.length === 0) {
    return;
  }

  for (const finding of findings) {
    console.error(format_finding(finding));
  }
  process.exitCode = 1;
}

const entry_path = process.argv[1];
if (entry_path !== undefined && resolve(entry_path) === fileURLToPath(import.meta.url)) {
  await run_cli(process.argv.slice(2));
}
