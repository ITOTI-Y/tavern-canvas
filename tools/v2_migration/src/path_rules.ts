export type PathClassification = "mapped" | "deferred_secret_transfer" | "intentionally_obsolete";

export type ConverterName =
  | "settings_converter"
  | "provider_converter"
  | "prompt_converter"
  | "asset_converter"
  | "character_converter"
  | "knowledge_converter"
  | "gallery_converter"
  | "message_converter";

export type ObsoleteReason =
  | "cache_completion_flag"
  | "old_ui_dom_state"
  | "global_error_collector_state"
  | "old_updater_state"
  | "steganography_sync_state"
  | "device_identifier";

export interface MappedPathRule {
  readonly pattern: string;
  readonly classification: "mapped";
  readonly converter: ConverterName;
}

export interface SecretPathRule {
  readonly pattern: string;
  readonly classification: "deferred_secret_transfer";
  readonly converter: "provider_converter";
  readonly credential_kind: string;
}

export interface ObsoletePathRule {
  readonly pattern: string;
  readonly classification: "intentionally_obsolete";
  readonly reason: ObsoleteReason;
}

export type PathRule = MappedPathRule | SecretPathRule | ObsoletePathRule;

/** One real object-property key per element — never re-split on "." (see `classify_path`). */
export type PathSegments = readonly string[];

/**
 * Pattern segments are dot-separated (patterns are static configuration
 * strings, never derived from user data, so splitting them on "." is safe).
 * A segment of "*" matches exactly one arbitrary path segment (used for
 * entries under a dictionary keyed by user-defined profile names). A
 * trailing "**" segment matches the path built so far plus zero or more
 * further segments (used so one rule can classify an entire dynamic-key
 * container regardless of how deep a fixture nests it). More specific rules
 * (longer literal prefixes, non-recursive) always outscore shorter or
 * wildcard-heavy ones, so exact overrides — e.g. a secret field nested
 * inside an otherwise-mapped container — win ties naturally.
 */
function match_score(pattern: string, path_segments: PathSegments): number | null {
  const pattern_segments = pattern.split(".");
  const is_recursive = pattern_segments.at(-1) === "**";
  const fixed_segments = is_recursive ? pattern_segments.slice(0, -1) : pattern_segments;
  const length_ok = is_recursive
    ? path_segments.length >= fixed_segments.length
    : path_segments.length === fixed_segments.length;
  if (!length_ok) {
    return null;
  }

  let score = 0;
  for (const [index, pattern_segment] of fixed_segments.entries()) {
    if (pattern_segment === "*") {
      score += 1;
      continue;
    }
    if (pattern_segment !== path_segments[index]) {
      return null;
    }
    score += 2;
  }
  return score;
}

/**
 * Takes real object-property segments, one array element per key, rather
 * than a dot-joined string: a v2 profile name that itself contains a "."
 * (e.g. a NovelAI profile named "v4.5 anime") would otherwise get re-split
 * into extra segments by a joined-string representation, shifting it out of
 * alignment with a `*`-wildcard secret rule and silently reclassifying a
 * credential field as `mapped` instead of `deferred_secret_transfer` — see
 * Stage 04 review finding C2.
 */
export function classify_path(
  path_segments: PathSegments,
  rules: readonly PathRule[],
): PathRule | undefined {
  let best: { rule: PathRule; score: number } | undefined;
  for (const rule of rules) {
    const score = match_score(rule.pattern, path_segments);
    if (score === null) {
      continue;
    }
    if (best === undefined || score > best.score) {
      best = { rule, score };
    }
  }
  return best?.rule;
}
