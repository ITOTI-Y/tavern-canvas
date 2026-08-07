/**
 * The "MVU variable resolution" pipeline stage: resolves `{@getvar::path.to.value@}` macros against
 * host chat variables. Ported from legacy `resolveNestedVariable`/`setNestedVariable`
 * (utils/chatDataUtils.js) and the `{@getvar}` pass of `processVariablePlaceholders`
 * (utils/worldbookProcessor.js). Read-only: T2 intentionally does not restore the legacy
 * `{@setvar}`/`{@setworldvar}` write-side macros a model could use to mutate chat state from inside
 * its own output -- see docs/parity/feature_matrix.md's `worldinfo.variable_write_macros` row
 * (removed_approved).
 */

export type VariableStore = Readonly<Record<string, unknown>>;

/** Caps a single resolved value so one runaway variable cannot dominate the assembled prompt. */
export const MAX_VARIABLE_OUTPUT_LENGTH = 2_000;

const GETVAR_PATTERN = /\{@getvar::([^@]+)@\}/g;

function truncate(value: string): string {
  return value.length > MAX_VARIABLE_OUTPUT_LENGTH
    ? `${value.slice(0, MAX_VARIABLE_OUTPUT_LENGTH)}…`
    : value;
}

function stringify_value(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "number" || typeof value === "boolean" || typeof value === "bigint") {
    return String(value);
  }
  if (typeof value === "object") {
    try {
      return JSON.stringify(value, null, 2);
    } catch {
      // Circular references (or other non-serializable shapes) fail closed to a stable
      // placeholder rather than throwing out of the middle of prompt assembly.
      return "[circular]";
    }
  }
  // symbol / function -- resolvable variable stores never legitimately hold these, but every
  // `unknown` branch must return a string.
  return "[unsupported]";
}

/**
 * Resolves a dot-delimited nested path against `store`. Missing path segments (undefined/null at
 * any depth) resolve to `""`; `false`/`0`/`""` resolve to their literal string form since they are
 * legitimately-set values, not absence.
 */
export function resolve_nested_variable(
  store: VariableStore | null | undefined,
  path: string,
): string {
  if (!store) {
    return "";
  }
  const segments = path.split(".");
  const first_segment = segments[0] as string;
  let value: unknown = store[first_segment];
  for (let index = 1; index < segments.length; index += 1) {
    if (value === null || typeof value !== "object") {
      value = undefined;
      break;
    }
    const segment = segments[index] as string;
    value = (value as Record<string, unknown>)[segment];
  }
  if (value === undefined || value === null) {
    return "";
  }
  return truncate(stringify_value(value));
}

export function set_nested_variable(
  store: Record<string, unknown>,
  path: string,
  value: unknown,
): void {
  const segments = path.split(".");
  if (segments.length === 1) {
    store[path] = value;
    return;
  }
  let node = store;
  for (let index = 0; index < segments.length - 1; index += 1) {
    const key = segments[index] as string;
    const child = node[key];
    if (child === null || typeof child !== "object") {
      const created: Record<string, unknown> = {};
      node[key] = created;
      node = created;
    } else {
      node = child as Record<string, unknown>;
    }
  }
  const last_segment = segments[segments.length - 1] as string;
  node[last_segment] = value;
}

/** Resolves every `{@getvar::path@}` macro in `content` against `store` in a single pass. */
export function resolve_getvar_macros(
  content: string,
  store: VariableStore | null | undefined,
): string {
  if (!content) {
    return content;
  }
  return content.replace(GETVAR_PATTERN, (_match, raw_path: string) =>
    resolve_nested_variable(store, raw_path.trim()),
  );
}
