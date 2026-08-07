import { lstat, readdir, readFile } from "node:fs/promises";
import { extname, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export type LocaleRuleId =
  | "key-set-mismatch"
  | "value-type-mismatch"
  | "interpolation-mismatch"
  | "plural-variant-mismatch"
  | "unused-key"
  | "first-party-emoji"
  | "dynamic-key"
  | "em-dash-ban";

export interface LocaleFinding {
  readonly rule_id: LocaleRuleId;
  readonly path: string;
  readonly detail: string;
}

export interface SourceFile {
  readonly path: string;
  readonly content: string;
}

function is_plain_object(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

interface ValueDescription {
  readonly kind: "string" | "object" | "other";
  readonly type_name: string;
}

function describe_value(node: unknown): ValueDescription {
  if (typeof node === "string") {
    return { kind: "string", type_name: "string" };
  }
  if (is_plain_object(node)) {
    return { kind: "object", type_name: "object" };
  }
  if (Array.isArray(node)) {
    return { kind: "other", type_name: "array" };
  }
  if (node === null) {
    return { kind: "other", type_name: "null" };
  }
  return { kind: "other", type_name: typeof node };
}

function sorted_keys(...objects: readonly Record<string, unknown>[]): string[] {
  const keys = new Set<string>();
  for (const object of objects) {
    for (const key of Object.keys(object)) {
      keys.add(key);
    }
  }
  return [...keys].sort((left, right) => left.localeCompare(right));
}

const INTERPOLATION_PATTERN = /\{(\w+)\}/gu;

function interpolation_params(value: string): Set<string> {
  return new Set([...value.matchAll(INTERPOLATION_PATTERN)].map((match) => match[1] ?? ""));
}

function same_members<T>(left: ReadonlySet<T>, right: ReadonlySet<T>): boolean {
  return left.size === right.size && [...left].every((member) => right.has(member));
}

function plural_variant_count(value: string): number {
  return value.split("|").length;
}

const EXTENDED_PICTOGRAPHIC_PATTERN = /\p{Extended_Pictographic}/u;
const EM_OR_EN_DASH_PATTERN = /[–—]/u;

function compare_string_values(
  en_value: string,
  zh_value: string,
  path: string,
  findings: LocaleFinding[],
): void {
  const en_params = interpolation_params(en_value);
  const zh_params = interpolation_params(zh_value);
  if (!same_members(en_params, zh_params)) {
    findings.push({
      rule_id: "interpolation-mismatch",
      path,
      detail: `en uses {${[...en_params].sort().join(", ")}}, zh-CN uses {${[...zh_params].sort().join(", ")}}`,
    });
  }

  const en_variant_count = plural_variant_count(en_value);
  const zh_variant_count = plural_variant_count(zh_value);
  if (en_variant_count !== zh_variant_count) {
    findings.push({
      rule_id: "plural-variant-mismatch",
      path,
      detail: `en has ${String(en_variant_count)} variant(s), zh-CN has ${String(zh_variant_count)} variant(s)`,
    });
  }

  for (const [locale_name, value] of [
    ["en", en_value],
    ["zh-CN", zh_value],
  ] as const) {
    if (EXTENDED_PICTOGRAPHIC_PATTERN.test(value)) {
      findings.push({
        rule_id: "first-party-emoji",
        path,
        detail: `${locale_name} value contains an emoji character`,
      });
    }
    if (EM_OR_EN_DASH_PATTERN.test(value)) {
      findings.push({
        rule_id: "em-dash-ban",
        path,
        detail: `${locale_name} value contains an em dash or en dash`,
      });
    }
  }
}

// A joint tree walk (rather than flattening each locale to a key/value map
// and diffing the two maps) so a string-leaf-vs-nested-object mismatch at
// the same path is classified once as value-type-mismatch, instead of
// decomposing into an unrelated cascade of key-set-mismatch findings for
// every leaf under the deeper side.
function walk_compare(
  en_node: unknown,
  zh_node: unknown,
  path: string,
  findings: LocaleFinding[],
): void {
  if (en_node === undefined) {
    findings.push({
      rule_id: "key-set-mismatch",
      path,
      detail: "present in zh-CN but missing in en",
    });
    return;
  }
  if (zh_node === undefined) {
    findings.push({
      rule_id: "key-set-mismatch",
      path,
      detail: "present in en but missing in zh-CN",
    });
    return;
  }

  const en_description = describe_value(en_node);
  const zh_description = describe_value(zh_node);

  if (en_description.kind === "object" && zh_description.kind === "object") {
    for (const key of sorted_keys(
      en_node as Record<string, unknown>,
      zh_node as Record<string, unknown>,
    )) {
      walk_compare(
        (en_node as Record<string, unknown>)[key],
        (zh_node as Record<string, unknown>)[key],
        path === "" ? key : `${path}.${key}`,
        findings,
      );
    }
    return;
  }

  if (en_description.type_name !== zh_description.type_name) {
    findings.push({
      rule_id: "value-type-mismatch",
      path,
      detail: `en value is ${en_description.type_name}, zh-CN value is ${zh_description.type_name}`,
    });
    return;
  }

  if (en_description.kind !== "string") {
    findings.push({
      rule_id: "value-type-mismatch",
      path,
      detail: `both locales use unsupported value type ${en_description.type_name} (expected string or nested object)`,
    });
    return;
  }

  compare_string_values(en_node as string, zh_node as string, path, findings);
}

export function compare_locales(en_messages: unknown, zh_cn_messages: unknown): LocaleFinding[] {
  if (!is_plain_object(en_messages) || !is_plain_object(zh_cn_messages)) {
    throw new TypeError("Locale messages must be a plain object at the root");
  }

  const findings: LocaleFinding[] = [];
  for (const key of sorted_keys(en_messages, zh_cn_messages)) {
    walk_compare(en_messages[key], zh_cn_messages[key], key, findings);
  }
  return findings;
}

// A call site is recognized as `t(` or `$t(` only when the preceding
// character is not an identifier character -- this matches "i18n.t(" and a
// bare "t(" while skipping identifiers that merely end in "t(" (format(,
// sort(, insert(...).
const CALL_SITE_PATTERN = /(?<![\w$])(?:\$t|t)\(/gu;
const TRAILING_ARGUMENT_PATTERN = /^\s*[),]/u;
const STATIC_KEY_PATTERN = /^[a-zA-Z0-9_.]+$/u;
// Prettier line-wraps a call whose arguments exceed the print width by moving the first
// argument -- the literal key -- onto its own continuation line, e.g.
//   t(
//     'prompt.preset_browser.bulk_delete_confirm_title',
//     { n: bulk_selected.size },
//     bulk_selected.size,
//   )
// `extract_static_key` already skips leading whitespace (the `\s` class includes newlines)
// before looking for the opening quote, so handing it a bounded lookahead window spanning past
// the call site's own line -- not just the rest of that one line -- is enough to resolve this
// case. The window stays bounded (not "rest of file") so a genuinely dynamic call -- `t(var)`,
// `t(\`errors.${code}\`)` -- still fails fast: `extract_static_key` returns `undefined` the
// instant the first non-whitespace character isn't a quote, regardless of window size.
const KEY_LOOKAHEAD_WINDOW = 400;

function extract_static_key(after_call: string): string | undefined {
  const leading_whitespace = /^\s*/u.exec(after_call)?.[0].length ?? 0;
  const rest = after_call.slice(leading_whitespace);
  const quote = rest[0];
  if (quote !== '"' && quote !== "'" && quote !== "`") {
    return undefined;
  }

  let index = 1;
  while (index < rest.length) {
    const character = rest[index];
    if (character === "\\") {
      index += 2;
      continue;
    }
    if (quote === "`" && character === "$" && rest[index + 1] === "{") {
      return undefined;
    }
    if (character === quote) {
      break;
    }
    index += 1;
  }
  if (index >= rest.length) {
    return undefined;
  }

  const key = rest.slice(1, index);
  if (!STATIC_KEY_PATTERN.test(key)) {
    return undefined;
  }
  if (!TRAILING_ARGUMENT_PATTERN.test(rest.slice(index + 1))) {
    return undefined;
  }
  return key;
}

/** Locates the 1-based line number and raw text of the line containing `offset`, without
 * splitting the whole file up front -- only `dynamic-key` findings need this, and a clean
 * codebase produces none. */
function line_at_offset(content: string, offset: number): { line: number; text: string } {
  const before = content.slice(0, offset);
  const line = (before.match(/\n/gu)?.length ?? 0) + 1;
  const line_start = before.lastIndexOf("\n") + 1;
  const next_newline = content.indexOf("\n", offset);
  const line_end = next_newline === -1 ? content.length : next_newline;
  return { line, text: content.slice(line_start, line_end) };
}

export function check_usage(
  files: readonly SourceFile[],
  canonical_keys: ReadonlySet<string>,
): LocaleFinding[] {
  const used_keys = new Set<string>();
  const findings: LocaleFinding[] = [];

  for (const file of files) {
    for (const match of file.content.matchAll(CALL_SITE_PATTERN)) {
      const call_end = match.index + match[0].length;
      const lookahead = file.content.slice(call_end, call_end + KEY_LOOKAHEAD_WINDOW);
      const key = extract_static_key(lookahead);
      if (key === undefined) {
        const { line, text } = line_at_offset(file.content, match.index);
        findings.push({
          rule_id: "dynamic-key",
          path: `${file.path}:${String(line)}`,
          detail: text.trim().slice(0, 160),
        });
        continue;
      }
      used_keys.add(key);
    }
  }

  // Unused-key detection needs a usage baseline to mean anything. Before
  // any first-party view calls t()/$t() at all, every canonical key would
  // trivially be "unused" -- that is a statement about the codebase not
  // having consumed the catalog yet, not about dead translation entries.
  if (used_keys.size === 0) {
    return findings;
  }

  for (const key of [...canonical_keys].sort((left, right) => left.localeCompare(right))) {
    if (!used_keys.has(key)) {
      findings.push({
        rule_id: "unused-key",
        path: key,
        detail: "not referenced by any t()/$t() call in scanned source",
      });
    }
  }

  return findings;
}

export function format_finding(finding: LocaleFinding): string {
  return `${finding.path} [${finding.rule_id}] ${finding.detail}`;
}

const DEFAULT_EN_LOCALE_PATH = "apps/extension/src/i18n/locales/en.ts";
const DEFAULT_ZH_LOCALE_PATH = "apps/extension/src/i18n/locales/zh_cn.ts";
const DEFAULT_SOURCE_ROOT = "apps/extension/src";
const EXCLUDED_SOURCE_PREFIXES = ["apps/extension/src/i18n/"];
const SCANNED_SOURCE_EXTENSIONS = new Set([".ts", ".vue"]);
const SKIPPED_DIRECTORY_NAMES = new Set(["node_modules", "dist", ".git"]);

function normalize_path(path: string): string {
  return path.replaceAll("\\", "/");
}

async function collect_source_files(
  source_root: string,
  repository_root: string,
): Promise<SourceFile[]> {
  const files: SourceFile[] = [];

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
    if (!metadata.isFile()) {
      return;
    }

    const relative_path = normalize_path(relative(repository_root, path));
    if (EXCLUDED_SOURCE_PREFIXES.some((prefix) => relative_path.startsWith(prefix))) {
      return;
    }
    if (relative_path.endsWith(".test.ts") || relative_path.endsWith(".spec.ts")) {
      return;
    }
    if (!SCANNED_SOURCE_EXTENSIONS.has(extname(path).toLowerCase())) {
      return;
    }
    files.push({ path: relative_path, content: await readFile(path, "utf8") });
  }

  await visit(source_root);
  files.sort((left, right) => left.path.localeCompare(right.path));
  return files;
}

function collect_string_keys(node: unknown, prefix: string, into: Set<string>): void {
  if (typeof node === "string") {
    into.add(prefix);
    return;
  }
  if (is_plain_object(node)) {
    for (const [key, value] of Object.entries(node)) {
      collect_string_keys(value, prefix === "" ? key : `${prefix}.${key}`, into);
    }
  }
}

function flatten_string_keys(messages: unknown): Set<string> {
  const keys = new Set<string>();
  collect_string_keys(messages, "", keys);
  return keys;
}

async function import_locale_module(absolute_path: string, export_name: string): Promise<unknown> {
  const module_ = (await import(pathToFileURL(absolute_path).href)) as Record<string, unknown>;
  const messages = module_[export_name];
  if (messages === undefined) {
    throw new Error(`${absolute_path} does not export "${export_name}"`);
  }
  return messages;
}

export interface CheckLocalesOptions {
  readonly repository_root?: string;
  readonly en_locale_path?: string;
  readonly zh_locale_path?: string;
  readonly source_root?: string;
}

export async function check_locales(options: CheckLocalesOptions = {}): Promise<LocaleFinding[]> {
  const repository_root = resolve(options.repository_root ?? process.cwd());
  const en_path = resolve(repository_root, options.en_locale_path ?? DEFAULT_EN_LOCALE_PATH);
  const zh_path = resolve(repository_root, options.zh_locale_path ?? DEFAULT_ZH_LOCALE_PATH);
  const source_root = resolve(repository_root, options.source_root ?? DEFAULT_SOURCE_ROOT);

  const en_messages = await import_locale_module(en_path, "en_messages");
  const zh_cn_messages = await import_locale_module(zh_path, "zh_cn_messages");

  const findings = compare_locales(en_messages, zh_cn_messages);
  const files = await collect_source_files(source_root, repository_root);
  findings.push(...check_usage(files, flatten_string_keys(en_messages)));

  return findings;
}

async function run_cli(): Promise<void> {
  const findings = await check_locales();
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
  await run_cli();
}
