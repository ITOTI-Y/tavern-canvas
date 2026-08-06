export function is_plain_object(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }
  const prototype: unknown = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

/**
 * Lists every own-property dot-path under `value`, at every depth, including
 * the path of each intermediate container itself. Arrays are treated as
 * leaves (an index is not a stable migration path). This is the completeness
 * source of truth: every path it returns for a fully populated v2 settings
 * fixture must resolve to exactly one classification in `converter_registry`.
 */
export function enumerate_own_property_paths(value: unknown, prefix = ""): string[] {
  if (!is_plain_object(value)) {
    return [];
  }
  const paths: string[] = [];
  for (const key of Object.keys(value)) {
    const path = prefix.length > 0 ? `${prefix}.${key}` : key;
    paths.push(path);
    paths.push(...enumerate_own_property_paths(value[key], path));
  }
  return paths;
}
