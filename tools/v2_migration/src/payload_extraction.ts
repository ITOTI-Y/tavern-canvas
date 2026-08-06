import { parse_json_value } from "@tavern-canvas/storage";

import { is_plain_object } from "./inventory.js";
import { classify_path, type ConverterName, type PathRule } from "./path_rules.js";

/**
 * Top-level v2 settings keys owned (per `SETTINGS_PATH_RULES`) by `owner`.
 * Extraction and classification share this one rule table, so a path can
 * never be classified as mapped without also being reachable for conversion.
 */
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
 * Drops any nested field whose full dot-path classifies as
 * `deferred_secret_transfer`, so a payload built from a mixed
 * secret/non-secret container (e.g. `banana`) never carries the credential.
 */
export function redact_secret_paths(
  value: unknown,
  prefix: string,
  rules: readonly PathRule[],
): unknown {
  if (!is_plain_object(value)) {
    return value;
  }
  const result: Record<string, unknown> = {};
  for (const [key, child] of Object.entries(value)) {
    const path = prefix.length > 0 ? `${prefix}.${key}` : key;
    if (classify_path(path, rules)?.classification === "deferred_secret_transfer") {
      continue;
    }
    result[key] = redact_secret_paths(child, path, rules);
  }
  return result;
}

/**
 * Validates that `value` is JSON-serializable (matching the runtime guard
 * `packages/storage`'s repository layer applies to every record payload)
 * without widening its static type to the recursive `JsonValue` union, since
 * every payload built here is already a plain `Record<string, unknown>`.
 */
export function to_json_record(value: Record<string, unknown>): Record<string, unknown> {
  parse_json_value(value);
  return value;
}
