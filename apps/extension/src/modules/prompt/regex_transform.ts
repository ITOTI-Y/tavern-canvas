export interface RegexRule {
  readonly id: string;
  readonly pattern: string;
  readonly flags: string;
  readonly replacement: string;
}

export interface RegexRuleFailure {
  readonly rule_id: string;
  readonly error: string;
}

export interface RegexTransformResult {
  readonly text: string;
  readonly failures: readonly RegexRuleFailure[];
}

/** An invalid pattern/flags combination is reported as a failure, not thrown, so one malformed rule does not abort the pipeline. */
export function apply_regex_rule(
  text: string,
  rule: RegexRule,
): { text: string; error: string | null } {
  try {
    const pattern = new RegExp(rule.pattern, rule.flags);
    return { text: text.replace(pattern, rule.replacement), error: null };
  } catch (error) {
    return { text, error: error instanceof Error ? error.message : String(error) };
  }
}

export function apply_regex_rules(text: string, rules: readonly RegexRule[]): RegexTransformResult {
  let current_text = text;
  const failures: RegexRuleFailure[] = [];
  for (const rule of rules) {
    const result = apply_regex_rule(current_text, rule);
    current_text = result.text;
    if (result.error !== null) {
      failures.push({ rule_id: rule.id, error: result.error });
    }
  }
  return { text: current_text, failures };
}

export function test_regex_rule(rule: RegexRule, sample_text: string): string {
  return apply_regex_rule(sample_text, rule).text;
}
