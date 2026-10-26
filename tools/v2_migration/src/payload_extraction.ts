import { parse_json_value } from "@tavern-canvas/storage";

import { is_plain_object } from "./inventory.js";
import {
  classify_path,
  type ConverterName,
  type PathRule,
  type PathSegments,
} from "./path_rules.js";

export function owned_top_level_keys(
  rules: readonly PathRule[],
  owner: ConverterName,
): readonly string[] {
  const keys = new Set<string>();
  for (const rule of rules) {
    if (rule.classification !== "mapped" || rule.converter !== owner) {
      continue;
    }
    const [root] = rule.pattern.split(".");
    if (root !== undefined) {
      keys.add(root);
    }
  }
  return [...keys].toSorted();
}

export function select_owned_fields(
  legacy: Record<string, unknown>,
  rules: readonly PathRule[],
  owner: ConverterName,
): Record<string, unknown> {
  const selected: Record<string, unknown> = {};
  for (const key of owned_top_level_keys(rules, owner)) {
    if (Object.hasOwn(legacy, key)) {
      selected[key] = legacy[key];
    }
  }
  return selected;
}

/**
 * Drops nested `deferred_secret_transfer` fields. `prefix` holds one key per element, never a
 * dot-joined string, so "v4.5 anime" stays one segment and secret rules still align.
 */
export function redact_secret_paths(
  value: unknown,
  prefix: PathSegments,
  rules: readonly PathRule[],
): unknown {
  if (!is_plain_object(value)) {
    return value;
  }
  const result: Record<string, unknown> = {};
  for (const [key, child] of Object.entries(value)) {
    const path_segments = [...prefix, key];
    if (classify_path(path_segments, rules)?.classification === "deferred_secret_transfer") {
      continue;
    }
    result[key] = redact_secret_paths(child, path_segments, rules);
  }
  return result;
}

export function to_json_record(value: Record<string, unknown>): Record<string, unknown> {
  parse_json_value(value);
  return value;
}
