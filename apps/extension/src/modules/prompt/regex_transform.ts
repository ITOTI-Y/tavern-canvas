/**
 * The "regex rules" pipeline stage: sequential SillyTavern-style find/replace scripts applied to
 * the already replacement-transformed prompt text. Structurally compatible with (but independent
 * of) the Studio's `PromptRegexRule` UI-capability shape -- this module owns the domain type; a
 * future adapter maps between the two rather than this domain module importing from the UI layer.
 */

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

/**
 * Applies a single rule. An invalid pattern/flags combination is reported as a failure rather than
 * thrown -- one malformed rule must not abort the rest of the pipeline.
 */
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

/** Runs a single rule against arbitrary sample text -- the "test regex" capability's pure core. */
export function test_regex_rule(rule: RegexRule, sample_text: string): string {
  return apply_regex_rule(sample_text, rule).text;
}
