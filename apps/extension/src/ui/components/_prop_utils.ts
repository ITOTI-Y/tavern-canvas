/**
 * `exactOptionalPropertyTypes` (tsconfig.base.json, shared across the monorepo) treats an object
 * literal's `key: undefined` as distinct from the key being absent. Forwarding a possibly-undefined
 * local value into another component's optional prop -- `:id="id"` where `id?: string` on both the
 * source and target -- is a correct, common Vue pattern at runtime (Vue treats an explicit
 * `undefined` prop exactly like an absent one) but fails this strict type check. This strips
 * undefined-valued keys at the object-literal boundary so the result structurally satisfies the
 * target props' optional-key contract; bind it via `v-bind="drop_undefined({ ... })"` alongside
 * ordinary individual bindings and event listeners on the same element.
 *
 * The return type excludes `undefined` from each value (not just `Partial<T>`, which keeps it) --
 * exactOptionalPropertyTypes checks the *declared* value type at a present key, so the type itself
 * must rule out `undefined`, matching what the runtime filtering below actually guarantees.
 */
export function drop_undefined<T extends Record<string, unknown>>(
  source: T,
): { [K in keyof T]?: Exclude<T[K], undefined> } {
  const result: Record<string, unknown> = {};
  for (const key of Object.keys(source)) {
    const value = source[key];
    if (value !== undefined) {
      result[key] = value;
    }
  }
  return result as { [K in keyof T]?: Exclude<T[K], undefined> };
}
