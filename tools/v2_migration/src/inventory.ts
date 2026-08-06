export function is_plain_object(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }
  const prototype: unknown = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

export interface EnumeratedPath {
  /** One real object-property key per element; never re-split on ".". */
  readonly segments: readonly string[];
  /** Display form only (error messages, diagnostics) — never re-parsed back into segments. */
  readonly path: string;
}

/**
 * Lists every own-property path under `value`, at every depth, including the
 * path of each intermediate container itself. Arrays are treated as leaves
 * (an index is not a stable migration path). This is the completeness source
 * of truth: every path it returns for a fully populated v2 settings fixture
 * must resolve to exactly one classification in `converter_registry`.
 *
 * Each entry carries both the real per-key segment array (what classification
 * must match against — a v2 key can itself contain ".") and a joined string
 * (display only).
 */
export function enumerate_own_property_paths(
  value: unknown,
  prefix: readonly string[] = [],
): EnumeratedPath[] {
  if (!is_plain_object(value)) {
    return [];
  }
  const paths: EnumeratedPath[] = [];
  for (const key of Object.keys(value)) {
    const segments = [...prefix, key];
    paths.push({ segments, path: segments.join(".") });
    paths.push(...enumerate_own_property_paths(value[key], segments));
  }
  return paths;
}
