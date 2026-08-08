import { readFile } from "node:fs/promises";
import { relative, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { gzipSync } from "node:zlib";

export const INITIAL_JS_GZIP_LIMIT_BYTES = 184320;
export const INITIAL_CSS_GZIP_LIMIT_BYTES = 40960;

/** Field names mirror Vite's on-disk manifest, hence the camelCase. */
export interface ManifestChunk {
  readonly file: string;
  readonly name?: string;
  readonly src?: string;
  readonly isEntry?: boolean;
  readonly isDynamicEntry?: boolean;
  readonly imports?: readonly string[];
  readonly dynamicImports?: readonly string[];
  readonly css?: readonly string[];
  readonly assets?: readonly string[];
}

export type ViteManifest = Record<string, ManifestChunk>;

export type BundleRuleId = "js-budget" | "css-budget" | "forbidden-module" | "missing-sourcemap";

export interface BundleFinding {
  readonly rule_id: BundleRuleId;
  readonly path: string;
  readonly detail: string;
}

export interface InitialAssets {
  readonly js_files: readonly string[];
  readonly css_files: readonly string[];
}

function sort_files(files: ReadonlySet<string>): string[] {
  return [...files].sort((left, right) => left.localeCompare(right));
}

function add_by_extension(file: string, js_files: Set<string>, css_files: Set<string>): void {
  if (file.endsWith(".css")) {
    css_files.add(file);
  } else {
    js_files.add(file);
  }
}

/**
 * Sizes what the host loads before any view opens.
 *
 * @param manifest Parsed Vite manifest.
 * @param host_declared_files Dist-relative files the SillyTavern extension manifest names in
 *   its `js` and `css` fields. The host fetches both at extension load time, so they are
 *   initial payload whether or not the Vite graph links them: `cssCodeSplit: false` emits
 *   `index.css` as an entry no chunk imports, which the graph walk alone would miss.
 */
export function collect_initial_assets(
  manifest: ViteManifest,
  host_declared_files: readonly string[],
): InitialAssets {
  const js_files = new Set<string>();
  const css_files = new Set<string>();
  const visited = new Set<string>();
  const pending = Object.keys(manifest).filter((key) => manifest[key]?.isEntry === true);

  for (const file of host_declared_files) {
    add_by_extension(file, js_files, css_files);
  }

  while (pending.length > 0) {
    const key = pending.pop();
    if (key === undefined || visited.has(key)) {
      continue;
    }
    visited.add(key);

    const chunk = manifest[key];
    if (chunk === undefined) {
      continue;
    }

    add_by_extension(chunk.file, js_files, css_files);
    for (const css_file of chunk.css ?? []) {
      css_files.add(css_file);
    }

    // Static `imports` only. A `dynamicImports` target is by construction not needed
    // before the studio or an optional view opens, which is exactly what this budget
    // measures, so following it would size the wrong payload.
    pending.push(...(chunk.imports ?? []));
  }

  return { js_files: sort_files(js_files), css_files: sort_files(css_files) };
}

export type ForbiddenModuleId =
  "tokenizer" | "assistant" | "gallery-detail" | "vocabulary-worker" | "non-default-locale";

interface ForbiddenModuleRule {
  readonly id: ForbiddenModuleId;
  readonly pattern: RegExp;
}

const FORBIDDEN_MODULE_RULES: readonly ForbiddenModuleRule[] = [
  {
    id: "tokenizer",
    pattern: /apps\/extension\/src\/modules\/novelai\/tokenizer\/|@huggingface\/transformers/u,
  },
  {
    id: "assistant",
    pattern: /apps\/extension\/src\/(?:modules|ui)\/assistant\//u,
  },
  // The gallery's detail surfaces only. The list surfaces it sits next to
  // (ImageGrid, GalleryTile, BulkActionBar) stay allowed in the initial payload.
  {
    id: "gallery-detail",
    pattern:
      /apps\/extension\/src\/ui\/views\/gallery\/(?:ImagePreviewDialog|ImageMetadataInspector)/u,
  },
  {
    id: "vocabulary-worker",
    pattern: /apps\/extension\/src\/workers\/vocabulary_worker/u,
  },
  // `en` is the bundled default locale and stays allowed.
  {
    id: "non-default-locale",
    pattern: /apps\/extension\/src\/i18n\/locales\/zh_cn/u,
  },
];

export function classify_forbidden_modules(
  js_files: readonly string[],
  sourcemap_sources: ReadonlyMap<string, readonly string[]>,
): BundleFinding[] {
  const findings: BundleFinding[] = [];

  for (const file of js_files) {
    const sources = sourcemap_sources.get(file);
    if (sources === undefined) {
      findings.push({
        rule_id: "missing-sourcemap",
        path: file,
        detail: "initial chunk has no sourcemap, so the modules inside it cannot be audited",
      });
      continue;
    }

    // One finding per chunk/rule pair: a forbidden module drags in dozens of its own
    // sources, and repeating the same verdict for each of them buries the other rules.
    const reported = new Set<ForbiddenModuleId>();
    for (const source of sources) {
      const normalized_source = source.replaceAll("\\", "/");
      for (const rule of FORBIDDEN_MODULE_RULES) {
        if (reported.has(rule.id) || !rule.pattern.test(normalized_source)) {
          continue;
        }
        reported.add(rule.id);
        findings.push({
          rule_id: "forbidden-module",
          path: file,
          detail: `${rule.id}: ${source}`,
        });
      }
    }
  }

  return findings;
}

export interface BundleMeasurement {
  readonly initial_js_gzip_bytes: number;
  readonly initial_css_gzip_bytes: number;
}

export function evaluate_budget(measurement: BundleMeasurement): BundleFinding[] {
  const findings: BundleFinding[] = [];

  for (const [rule_id, field_name, measured, limit] of [
    [
      "js-budget",
      "initial_js_gzip_bytes",
      measurement.initial_js_gzip_bytes,
      INITIAL_JS_GZIP_LIMIT_BYTES,
    ],
    [
      "css-budget",
      "initial_css_gzip_bytes",
      measurement.initial_css_gzip_bytes,
      INITIAL_CSS_GZIP_LIMIT_BYTES,
    ],
  ] as const) {
    if (measured > limit) {
      findings.push({
        rule_id,
        path: field_name,
        detail: `${String(measured)} gzip bytes exceeds the ${String(limit)} byte budget by ${String(measured - limit)}`,
      });
    }
  }

  return findings;
}

export function format_finding(finding: BundleFinding): string {
  return `${finding.path} [${finding.rule_id}] ${finding.detail}`;
}

const DEFAULT_DIST_DIR = "dist";
const VITE_MANIFEST_RELATIVE_PATH = ".vite/manifest.json";
const HOST_MANIFEST_RELATIVE_PATH = "manifest.json";

export type AssetKind = "js" | "css";

export interface AssetMeasurement {
  readonly file: string;
  readonly kind: AssetKind;
  readonly raw_bytes: number;
  readonly gzip_bytes: number;
}

export interface BundleBudgetReport {
  readonly measurement: BundleMeasurement;
  readonly assets: readonly AssetMeasurement[];
  readonly findings: readonly BundleFinding[];
}

export interface MeasureBundleOptions {
  readonly repository_root?: string;
  readonly dist_dir?: string;
}

function is_missing_file_error(error: unknown): boolean {
  return error instanceof Error && "code" in error && error.code === "ENOENT";
}

async function read_optional_file(path: string): Promise<Buffer | undefined> {
  try {
    return await readFile(path);
  } catch (error) {
    if (is_missing_file_error(error)) {
      return undefined;
    }
    throw error;
  }
}

function parse_manifest(text: string, path: string): ViteManifest {
  const parsed: unknown = JSON.parse(text);
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new TypeError(`${path} is not a Vite manifest object`);
  }
  return parsed as ViteManifest;
}

/** Turns the host manifest's repository-relative `js`/`css` fields into dist-relative
 * paths, the same coordinate space the Vite manifest's `file` values use, so the two
 * sources of initial assets deduplicate against each other. */
function parse_host_declared_files(
  text: string,
  path: string,
  repository_root: string,
  dist_dir: string,
): string[] {
  const parsed: unknown = JSON.parse(text);
  if (typeof parsed !== "object" || parsed === null) {
    throw new TypeError(`${path} is not an extension manifest object`);
  }

  const { js, css } = parsed as { js?: unknown; css?: unknown };
  const declared = [js, css].filter((entry) => typeof entry === "string");
  if (declared.length === 0) {
    throw new TypeError(`${path} declares neither a "js" nor a "css" entry point`);
  }
  return declared.map((entry) =>
    relative(dist_dir, resolve(repository_root, entry)).replaceAll("\\", "/"),
  );
}

function parse_sourcemap_sources(text: string, path: string): readonly string[] {
  const parsed: unknown = JSON.parse(text);
  const sources: unknown =
    typeof parsed === "object" && parsed !== null
      ? (parsed as { sources?: unknown }).sources
      : undefined;
  if (!Array.isArray(sources)) {
    throw new TypeError(`${path} has no "sources" array`);
  }
  return (sources as readonly unknown[]).filter((source) => typeof source === "string");
}

async function measure_asset(
  dist_dir: string,
  file: string,
  kind: AssetKind,
): Promise<AssetMeasurement> {
  const bytes = await readFile(resolve(dist_dir, file));
  return {
    file,
    kind,
    raw_bytes: bytes.byteLength,
    gzip_bytes: gzipSync(bytes, { level: 9 }).byteLength,
  };
}

export async function measure_bundle(
  options: MeasureBundleOptions = {},
): Promise<BundleBudgetReport> {
  const repository_root = resolve(options.repository_root ?? process.cwd());
  const dist_dir = resolve(repository_root, options.dist_dir ?? DEFAULT_DIST_DIR);
  const vite_manifest_path = resolve(dist_dir, VITE_MANIFEST_RELATIVE_PATH);
  const host_manifest_path = resolve(repository_root, HOST_MANIFEST_RELATIVE_PATH);

  const vite_manifest_bytes = await read_optional_file(vite_manifest_path);
  if (vite_manifest_bytes === undefined) {
    throw new Error(
      `${vite_manifest_path} not found; run \`pnpm build\` before the bundle budget gate`,
    );
  }
  const host_manifest_bytes = await read_optional_file(host_manifest_path);
  if (host_manifest_bytes === undefined) {
    throw new Error(`${host_manifest_path} not found; the extension manifest is required`);
  }

  const initial_assets = collect_initial_assets(
    parse_manifest(vite_manifest_bytes.toString("utf8"), vite_manifest_path),
    parse_host_declared_files(
      host_manifest_bytes.toString("utf8"),
      host_manifest_path,
      repository_root,
      dist_dir,
    ),
  );
  const assets: AssetMeasurement[] = [];
  const sourcemap_sources = new Map<string, readonly string[]>();

  for (const file of initial_assets.js_files) {
    assets.push(await measure_asset(dist_dir, file, "js"));
    const sourcemap_path = resolve(dist_dir, `${file}.map`);
    const sourcemap_bytes = await read_optional_file(sourcemap_path);
    if (sourcemap_bytes !== undefined) {
      sourcemap_sources.set(
        file,
        parse_sourcemap_sources(sourcemap_bytes.toString("utf8"), sourcemap_path),
      );
    }
  }
  for (const file of initial_assets.css_files) {
    assets.push(await measure_asset(dist_dir, file, "css"));
  }

  const measurement: BundleMeasurement = {
    initial_js_gzip_bytes: assets
      .filter((asset) => asset.kind === "js")
      .reduce((total, asset) => total + asset.gzip_bytes, 0),
    initial_css_gzip_bytes: assets
      .filter((asset) => asset.kind === "css")
      .reduce((total, asset) => total + asset.gzip_bytes, 0),
  };

  return {
    measurement,
    assets,
    findings: [
      ...evaluate_budget(measurement),
      ...classify_forbidden_modules(initial_assets.js_files, sourcemap_sources),
    ],
  };
}

async function main(): Promise<void> {
  let report: BundleBudgetReport;
  try {
    report = await measure_bundle();
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
    return;
  }

  console.log(`initial_js_gzip_bytes=${String(report.measurement.initial_js_gzip_bytes)}`);
  console.log(`initial_css_gzip_bytes=${String(report.measurement.initial_css_gzip_bytes)}`);
  for (const asset of report.assets) {
    console.log(
      `- ${asset.kind} ${asset.file} gzip ${String(asset.gzip_bytes)} B (raw ${String(asset.raw_bytes)} B)`,
    );
  }

  if (report.findings.length === 0) {
    return;
  }
  for (const finding of report.findings) {
    console.error(format_finding(finding));
  }
  process.exitCode = 1;
}

const entrypoint = process.argv[1];
if (entrypoint !== undefined && import.meta.url === pathToFileURL(resolve(entrypoint)).href) {
  await main();
}
