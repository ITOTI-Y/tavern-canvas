export interface ContentMatch {
  readonly byte_offset: number;
  readonly detail: string;
}

export function byte_offset_at(content: string, index: number): number {
  return Buffer.byteLength(content.slice(0, index), "utf8");
}

const REGION_OPEN_MARKER = "//#region ";
const REGION_CLOSE_MARKER = "//#endregion";

function find_line_start_marker(content: string, index: number, marker: string): number {
  let cursor = index;
  for (;;) {
    const at = content.lastIndexOf(marker, cursor);
    if (at === -1) {
      return -1;
    }
    if (at === 0 || content[at - 1] === "\n") {
      return at;
    }
    cursor = at - 1;
  }
}

/**
 * Resolves which source module a bundled offset came from, using the `//#region <specifier>`
 * markers the production bundler emits. Returns `undefined` when the offset sits outside every
 * region, or when the bundle carries no markers at all.
 */
export function owning_region(content: string, index: number): string | undefined {
  const region_at = find_line_start_marker(content, index, REGION_OPEN_MARKER);
  if (region_at === -1) {
    return undefined;
  }
  const close_at = find_line_start_marker(content, index, REGION_CLOSE_MARKER);
  if (close_at > region_at) {
    return undefined;
  }
  const line_end = content.indexOf("\n", region_at);
  return content
    .slice(region_at + REGION_OPEN_MARKER.length, line_end === -1 ? content.length : line_end)
    .trim();
}

/**
 * A bundle mixes first-party modules with vendored dependencies, and rules that police authoring
 * style (emoji, the v2 settings key) only govern the first-party half. Absent region markers the
 * whole file counts as first party, so a bundler that stops emitting them fails loud rather than
 * silently disabling these rules.
 */
export function is_first_party_offset(content: string, index: number): boolean {
  const region = owning_region(content, index);
  return region === undefined || !region.includes("node_modules");
}

const EXTENDED_PICTOGRAPHIC_PATTERN = /\p{Extended_Pictographic}/gu;

export function find_first_party_emoji(content: string): ContentMatch[] {
  const matches: ContentMatch[] = [];
  for (const match of content.matchAll(EXTENDED_PICTOGRAPHIC_PATTERN)) {
    if (is_first_party_offset(content, match.index)) {
      matches.push({
        byte_offset: byte_offset_at(content, match.index),
        detail: `contains an emoji code point (U+${(match[0].codePointAt(0) ?? 0).toString(16).toUpperCase().padStart(4, "0")})`,
      });
    }
  }
  return matches;
}

// `fa-` stays case sensitive: a case-insensitive form matches the `fA-F` inside the hex character
// classes every bundled UUID/regex library ships, which has nothing to do with Font Awesome.
const FONT_AWESOME_PATTERNS: readonly RegExp[] = [
  /Font\s*Awesome/giu,
  /fontawesome/giu,
  /\bfa-[a-z0-9-]+\b/gu,
];

export function find_font_awesome_references(content: string): ContentMatch[] {
  const matches: ContentMatch[] = [];
  for (const pattern of FONT_AWESOME_PATTERNS) {
    for (const match of content.matchAll(pattern)) {
      matches.push({
        byte_offset: byte_offset_at(content, match.index),
        detail: `references Font Awesome (${match[0]})`,
      });
    }
  }
  return matches;
}

const SOURCE_MAP_REFERENCE_PATTERN = /[/*]#\s*sourceMappingURL=/gu;

export function find_source_map_references(content: string): ContentMatch[] {
  return [...content.matchAll(SOURCE_MAP_REFERENCE_PATTERN)].map((match) => ({
    byte_offset: byte_offset_at(content, match.index),
    detail: "declares a sourceMappingURL",
  }));
}

interface LegacyPattern {
  readonly label: string;
  readonly pattern: RegExp;
}

// The v2 settings key is legitimate in exactly one place: the code that reads v2's
// `extension_settings` bucket so the v3 runtime can migrate it. Region attribution keeps that
// reader allowed without allowing the key to reappear anywhere else in the bundle.
const MIGRATION_READER_REGION_PATTERN = /migration|legacy|host_environment/u;
const LEGACY_SETTINGS_KEY_PATTERN = /st-chatu8/gu;
const LEGACY_CONTENT_PATTERNS: readonly LegacyPattern[] = [
  { label: "v2 settings view path", pattern: /html\/settings\//gu },
  { label: "v2 iframe utility path", pattern: /utils\/iframe\//gu },
  { label: "v2 settings utility path", pattern: /utils\/settings\//gu },
  { label: "v2 UMD loader", pattern: /loadIsolatedUmdLibrary/gu },
  { label: "v2 reinstall guide", pattern: /showReinstallGuide/gu },
  {
    label: "v2 global alias",
    pattern: /\b(?:window|globalThis|self)\s*(?:\.\s*|\[\s*["'])(?:chatu8|ST_CHATU8)\b/gu,
  },
];

export function find_legacy_runtime_references(content: string): ContentMatch[] {
  const matches: ContentMatch[] = [];
  for (const match of content.matchAll(LEGACY_SETTINGS_KEY_PATTERN)) {
    const region = owning_region(content, match.index);
    if (region !== undefined && MIGRATION_READER_REGION_PATTERN.test(region)) {
      continue;
    }
    matches.push({
      byte_offset: byte_offset_at(content, match.index),
      detail: "references the v2 extension_settings key outside a migration reader",
    });
  }
  for (const { label, pattern } of LEGACY_CONTENT_PATTERNS) {
    for (const match of content.matchAll(pattern)) {
      matches.push({
        byte_offset: byte_offset_at(content, match.index),
        detail: `references the ${label} (${match[0]})`,
      });
    }
  }
  return matches;
}

interface FetchContextPattern {
  readonly label: string;
  readonly pattern: RegExp;
}

// Targeted at fetch contexts only. An absolute URL that merely sits in a string -- the manifest
// homePage, a provider API base in the code-owned route catalog, a license notice link -- is not a
// runtime fetch and must not trip this rule.
const REMOTE_FETCH_PATTERNS: readonly FetchContextPattern[] = [
  { label: "remote script tag", pattern: /<script\b[^>]*\bsrc\s*=\s*["']?\s*https?:\/\//giu },
  { label: "remote dynamic import", pattern: /\bimport\s*\(\s*["'`]\s*https?:\/\//gu },
  { label: "remote static import", pattern: /\bfrom\s*["']\s*https?:\/\//gu },
  { label: "remote worker", pattern: /\bnew\s+Worker\s*\(\s*["'`]\s*https?:\/\//gu },
  { label: "remote fetch", pattern: /\bfetch\s*\(\s*["'`]\s*https?:\/\//gu },
  {
    label: "remote stylesheet or font",
    pattern: /(?:@import\s+(?:url\(\s*)?|\bsrc\s*:\s*url\(\s*)["']?\s*https?:\/\//giu,
  },
];
const BANNED_REMOTE_HOST_PATTERN =
  /(?:cdn\.jsdelivr\.net|unpkg\.com|cdnjs\.cloudflare\.com|cdnjs\.com|fonts\.googleapis\.com|fonts\.gstatic\.com|raw\.githubusercontent\.com)/giu;

export function find_remote_runtime_urls(content: string): ContentMatch[] {
  const matches: ContentMatch[] = [];
  for (const { label, pattern } of REMOTE_FETCH_PATTERNS) {
    for (const match of content.matchAll(pattern)) {
      matches.push({
        byte_offset: byte_offset_at(content, match.index),
        detail: `${label}: ${content.slice(match.index, match.index + 120).split(/["'`\s]/u)[0] ?? ""}`,
      });
    }
  }
  for (const match of content.matchAll(BANNED_REMOTE_HOST_PATTERN)) {
    matches.push({
      byte_offset: byte_offset_at(content, match.index),
      detail: `references the third-party CDN host ${match[0]}`,
    });
  }
  return matches;
}

const PLACEHOLDER_WORD_PATTERN =
  /^(?:your|my|example|sample|placeholder|redacted|dummy|fake|test|token|secret|key|apikey|api_key|credential|changeme|none|null|undefined|todo)/iu;
const PLACEHOLDER_FILLER_PATTERN = /^[\s*.xX_-]*$/u;

export function is_placeholder_value(value: string): boolean {
  const trimmed = value.trim();
  if (PLACEHOLDER_FILLER_PATTERN.test(trimmed)) {
    return true;
  }
  // A value carrying a template interpolation is code that will produce a secret at runtime, not a
  // secret baked into the archive.
  if (trimmed.includes("${") || trimmed.startsWith("{{") || trimmed.startsWith("<")) {
    return true;
  }
  return PLACEHOLDER_WORD_PATTERN.test(trimmed);
}

interface SecretPattern {
  readonly label: string;
  readonly pattern: RegExp;
  /** Index of the capture group holding the candidate value, when the shape needs a placeholder check. */
  readonly value_group?: number;
}

const SECRET_PATTERNS: readonly SecretPattern[] = [
  { label: "OpenAI style API key", pattern: /sk-[A-Za-z0-9]{16,}/gu },
  { label: "Google API key", pattern: /AIza[0-9A-Za-z_-]{30,}/gu },
  { label: "NovelAI persistent token", pattern: /pst-[A-Za-z0-9]{20,}/gu },
  { label: "GitHub token", pattern: /(?:ghp_|github_pat_)[A-Za-z0-9_]{10,}/gu },
  { label: "private key block", pattern: /-----BEGIN [A-Z ]*PRIVATE KEY-----/gu },
  {
    label: "Authorization bearer token",
    pattern: /Authorization["'`]?\s*:\s*["'`]?\s*Bearer\s+([^\s"'`,)\]}\\]+)/giu,
    value_group: 1,
  },
  {
    label: "credential JSON value",
    pattern: /"(?:credential|api_key|secret)"\s*:\s*"([^"]*)"/giu,
    value_group: 1,
  },
];

/**
 * Locates high-signal credential shapes. The returned detail names the pattern and nothing else --
 * a matched secret is never echoed back, because the audit report is written to logs that are
 * shared far more widely than the archive that leaked it.
 */
export function find_secret_matches(content: string): ContentMatch[] {
  const matches: ContentMatch[] = [];
  for (const { label, pattern, value_group } of SECRET_PATTERNS) {
    for (const match of content.matchAll(pattern)) {
      if (value_group !== undefined && is_placeholder_value(match[value_group] ?? "")) {
        continue;
      }
      matches.push({
        byte_offset: byte_offset_at(content, match.index),
        detail: `matches the ${label} pattern`,
      });
    }
  }
  return matches;
}

const CHUNK_SPECIFIER_PATTERN = /["'](\.\/chunks\/[^"']+\.js)["']/gu;
const DYNAMIC_IMPORT_PREFIX_PATTERN = /\bimport\s*\(\s*$/u;
const STATIC_IMPORT_PREFIX_PATTERN = /(?:\bfrom|\bimport|\brequire\s*\(\s*)\s*$/u;
const IMPORT_PREFIX_WINDOW = 60;

/**
 * Chunks reached through `import("./chunks/...")` load on demand and stay out of the initial
 * transfer; only statically linked chunks belong in the initial JS figure.
 */
export function find_static_chunk_imports(content: string): string[] {
  const specifiers = new Set<string>();
  for (const match of content.matchAll(CHUNK_SPECIFIER_PATTERN)) {
    const prefix = content.slice(Math.max(0, match.index - IMPORT_PREFIX_WINDOW), match.index);
    if (DYNAMIC_IMPORT_PREFIX_PATTERN.test(prefix)) {
      continue;
    }
    if (!STATIC_IMPORT_PREFIX_PATTERN.test(prefix)) {
      continue;
    }
    const specifier = match[1];
    if (specifier !== undefined) {
      specifiers.add(specifier.replace(/^\.\//u, ""));
    }
  }
  return [...specifiers].sort((left, right) => left.localeCompare(right));
}

// apps/extension/vite.config.ts's `renderBuiltUrl` rewrites every build asset URL to a
// `__TAVERN_CANVAS_ASSET_URL__<path>__` marker that the runtime resolves against `dist/index.js`'s
// own location, so each marker payload names a file the runtime fetches at `dist/<path>`.
const ASSET_URL_MARKER_PATTERN = /__TAVERN_CANVAS_ASSET_URL__(.*?)__/gu;
const PLAIN_FONT_URL_PATTERN = /url\(\s*["']?([^"')]+\.woff2)["']?\s*\)/gu;
// The bundle also contains the runtime's own marker regex source (`__TAVERN_CANVAS_ASSET_URL__(.*?)__`),
// so a payload only names a real asset when it looks like a relative path with a file extension.
const ASSET_REFERENCE_PATTERN = /^[A-Za-z0-9._/-]+\.[A-Za-z0-9]+$/u;

export function find_runtime_asset_references(content: string): string[] {
  const references = new Set<string>();
  for (const match of content.matchAll(ASSET_URL_MARKER_PATTERN)) {
    const reference = match[1];
    if (reference !== undefined && ASSET_REFERENCE_PATTERN.test(reference)) {
      references.add(reference.replace(/^\.?\//u, ""));
    }
  }
  for (const match of content.matchAll(PLAIN_FONT_URL_PATTERN)) {
    const reference = match[1];
    if (reference === undefined || /^(?:[a-z]+:)?\/\//iu.test(reference)) {
      continue;
    }
    references.add(reference.replace(/^\.?\//u, ""));
  }
  return [...references].sort((left, right) => left.localeCompare(right));
}
