/**
 * The "replacement rules" pipeline stage: a trigger-word engine that either replaces matched text
 * in place or inserts fixed content at one of five splice points around the fixed/main prompt.
 * Ported from legacy `prompt_replace`/`prompt_replace_for_character` (utils/aiModules -- see
 * task-2-report.md for the exact line references), including the `@if(expr)` boolean guard
 * mini-language and multi-trigger `A|B=...` rule lines.
 */

export const REPLACEMENT_INSERTION_POSITIONS = [
  "前置前",
  "前置后",
  "后置前",
  "后置后",
  "最后置",
] as const;
export type ReplacementInsertionPosition = (typeof REPLACEMENT_INSERTION_POSITIONS)[number];

export type ReplacementRuleType = ReplacementInsertionPosition | "替换" | "替换分角色";

export interface ReplacementRule {
  readonly triggers: readonly string[];
  readonly type: ReplacementRuleType;
  readonly value: string;
  readonly condition: string | null;
}

export type ReplacementInsertions = Readonly<Record<ReplacementInsertionPosition, string>>;

export interface ReplacementResult {
  readonly modified_prompt: string;
  readonly insertions: ReplacementInsertions;
}

function is_insertion_position(type: string): type is ReplacementInsertionPosition {
  return (REPLACEMENT_INSERTION_POSITIONS as readonly string[]).includes(type);
}

function escape_regex_chars(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Splits a trailing `@if(expression)` guard off a rule's value. Only recognized when the
 * expression is balanced-parenthesized and immediately preceded by `@if` (case-insensitive);
 * anything else is left as literal value text with no condition.
 */
export function extract_if_condition(raw_value: string): {
  readonly value: string;
  readonly condition: string | null;
} {
  const trimmed_right = raw_value.replace(/\s+$/, "");
  if (!trimmed_right.endsWith(")")) {
    return { value: raw_value, condition: null };
  }

  let depth = 0;
  let open_index = -1;
  for (let index = trimmed_right.length - 1; index >= 0; index -= 1) {
    const character = trimmed_right[index];
    if (character === ")") {
      depth += 1;
    } else if (character === "(") {
      depth -= 1;
      if (depth === 0) {
        open_index = index;
        break;
      }
    }
  }
  if (open_index <= 0) {
    return { value: raw_value, condition: null };
  }

  const head = trimmed_right.substring(0, open_index);
  const if_marker = /@if\s*$/i.exec(head);
  if (!if_marker) {
    return { value: raw_value, condition: null };
  }

  const condition = trimmed_right.substring(open_index + 1, trimmed_right.length - 1).trim();
  if (!condition) {
    return { value: raw_value, condition: null };
  }

  const value = head.substring(0, head.length - if_marker[0].length).replace(/\s+$/, "");
  return { value, condition };
}

class IfConditionSyntaxError extends Error {}

/**
 * Recursive-descent evaluator for the `@if` mini-language: `&&`/`||`/`!`, parenthesized groups,
 * and bareword or quoted-string substring tests against a lowercased haystack.
 */
export function evaluate_if_condition(condition: string, haystack: string): boolean {
  const source = condition;
  const hay = haystack.toLowerCase();
  let position = 0;

  const skip_whitespace = (): void => {
    while (position < source.length && /\s/.test(source[position] ?? "")) {
      position += 1;
    }
  };

  const parse_or = (): boolean => {
    let left = parse_and();
    skip_whitespace();
    while (source.startsWith("||", position)) {
      position += 2;
      const right = parse_and();
      left = left || right;
      skip_whitespace();
    }
    return left;
  };

  const parse_and = (): boolean => {
    let left = parse_unary();
    skip_whitespace();
    while (source.startsWith("&&", position)) {
      position += 2;
      const right = parse_unary();
      left = left && right;
      skip_whitespace();
    }
    return left;
  };

  const parse_unary = (): boolean => {
    skip_whitespace();
    if (source[position] === "!") {
      position += 1;
      return !parse_unary();
    }
    return parse_primary();
  };

  const parse_primary = (): boolean => {
    skip_whitespace();
    if (source[position] === "(") {
      position += 1;
      const value = parse_or();
      skip_whitespace();
      if (source[position] === ")") {
        position += 1;
      } else {
        throw new IfConditionSyntaxError("@if expression missing closing parenthesis");
      }
      return value;
    }
    if (source[position] === '"') {
      position += 1;
      let buffer = "";
      while (position < source.length && source[position] !== '"') {
        const current_character = source[position] ?? "";
        if (current_character === "\\" && position + 1 < source.length) {
          buffer += source[position + 1] ?? "";
          position += 2;
        } else {
          buffer += current_character;
          position += 1;
        }
      }
      if (source[position] !== '"') {
        throw new IfConditionSyntaxError("@if expression missing closing quote");
      }
      position += 1;
      return hay.includes(buffer.toLowerCase());
    }
    const start = position;
    while (position < source.length) {
      const character = source[position] ?? "";
      if (character === "(" || character === ")" || character === "!" || /\s/.test(character)) {
        break;
      }
      if (
        (character === "&" && source[position + 1] === "&") ||
        (character === "|" && source[position + 1] === "|")
      ) {
        break;
      }
      position += 1;
    }
    const word = source.substring(start, position).trim();
    if (!word) {
      throw new IfConditionSyntaxError("@if expression has an empty trigger word");
    }
    return hay.includes(word.toLowerCase());
  };

  const result = parse_or();
  skip_whitespace();
  if (position < source.length) {
    throw new IfConditionSyntaxError(
      `@if expression has trailing text: "${source.substring(position)}"`,
    );
  }
  return result;
}

/** Guarded form of {@link evaluate_if_condition}: malformed expressions fail the guard rather than throwing. */
export function safe_evaluate_if_condition(condition: string, haystack: string): boolean {
  try {
    return evaluate_if_condition(condition, haystack);
  } catch {
    return false;
  }
}

/**
 * Parses the line-oriented rule text format: `trigger[|trigger...]=type|value[@if(expr)]`.
 * Blank lines, lines without `=`, and lines without a `|` inside the right-hand side are skipped
 * rather than raising -- matching the legacy engine's silent-skip behavior for malformed lines.
 */
export function parse_replacement_rules(rules_text: string): readonly ReplacementRule[] {
  const rules: ReplacementRule[] = [];
  for (const line of rules_text.split("\n")) {
    if (line.trim() === "") {
      continue;
    }
    const equals_index = line.indexOf("=");
    if (equals_index < 0) {
      continue;
    }
    const trigger_part = line.substring(0, equals_index).trim();
    if (!trigger_part) {
      continue;
    }
    const rule_content = line.substring(equals_index + 1);
    const pipe_index = rule_content.indexOf("|");
    if (pipe_index < 0) {
      continue;
    }
    const type = rule_content.substring(0, pipe_index).trim();
    if (type !== "替换" && type !== "替换分角色" && !is_insertion_position(type)) {
      continue;
    }
    const raw_value = rule_content.substring(pipe_index + 1).trim();
    const { value, condition } = extract_if_condition(raw_value);
    const triggers = trigger_part
      .split("|")
      .map((trigger) => trigger.trim())
      .filter((trigger) => trigger.length > 0);
    if (triggers.length === 0) {
      continue;
    }
    rules.push({ triggers, type, value, condition });
  }
  return rules;
}

function empty_insertions(): Record<ReplacementInsertionPosition, string[]> {
  return {
    前置前: [],
    前置后: [],
    后置前: [],
    后置后: [],
    最后置: [],
  };
}

function finalize_insertions(
  insertions: Record<ReplacementInsertionPosition, string[]>,
): ReplacementInsertions {
  return {
    前置前: insertions.前置前.join(", "),
    前置后: insertions.前置后.join(", "),
    后置前: insertions.后置前.join(", "),
    后置后: insertions.后置后.join(", "),
    最后置: insertions.最后置.join(", "),
  };
}

/**
 * Applies the global replacement/insertion engine to the main prompt. `other_prompt` is appended
 * to the trigger-matching haystack only (legacy's "also match against the fixed prompt" input) --
 * it never appears in `modified_prompt`.
 */
export function apply_replacement_rules(
  original_prompt: string,
  rules: readonly ReplacementRule[],
  other_prompt = "",
): ReplacementResult {
  if (rules.length === 0) {
    return {
      modified_prompt: original_prompt,
      insertions: finalize_insertions(empty_insertions()),
    };
  }

  const insertions = empty_insertions();
  let modified_prompt = original_prompt;
  const all_prompts = original_prompt + other_prompt;

  for (const rule of rules) {
    for (const trigger of rule.triggers) {
      if (!all_prompts.toLowerCase().includes(trigger.toLowerCase())) {
        continue;
      }
      if (rule.condition !== null && !safe_evaluate_if_condition(rule.condition, all_prompts)) {
        continue;
      }
      if (rule.type === "替换") {
        const pattern = new RegExp(escape_regex_chars(trigger), "gi");
        modified_prompt = modified_prompt.replace(pattern, rule.value);
      } else if (is_insertion_position(rule.type)) {
        insertions[rule.type].push(rule.value);
      }
    }
  }

  return { modified_prompt, insertions: finalize_insertions(insertions) };
}

/**
 * Applies the character-scoped variant: only `替换`/`替换分角色` rules apply, matched and applied
 * progressively against the character's own prompt segment (no insertion positions). `full_context`
 * -- when given -- is used only for `@if` guard evaluation, not for trigger matching.
 */
export function apply_character_replacement_rules(
  original_prompt: string,
  rules: readonly ReplacementRule[],
  full_context = "",
): string {
  if (rules.length === 0 || !original_prompt) {
    return original_prompt;
  }

  let modified_prompt = original_prompt;
  for (const rule of rules) {
    if (rule.type !== "替换" && rule.type !== "替换分角色") {
      continue;
    }
    for (const trigger of rule.triggers) {
      if (!modified_prompt.toLowerCase().includes(trigger.toLowerCase())) {
        continue;
      }
      const if_haystack = full_context.length > 0 ? full_context : modified_prompt;
      if (rule.condition !== null && !safe_evaluate_if_condition(rule.condition, if_haystack)) {
        continue;
      }
      const pattern = new RegExp(escape_regex_chars(trigger), "gi");
      modified_prompt = modified_prompt.replace(pattern, rule.value);
    }
  }
  return modified_prompt;
}
