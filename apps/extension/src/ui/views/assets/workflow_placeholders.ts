/**
 * ComfyUI template workflows mark substitution points with `{{placeholder_name}}` inside a node's
 * string widget values -- scanning the raw workflow JSON's text (not walking its node graph) finds
 * every one regardless of which node/widget it sits in, since TavernCanvas only needs the
 * placeholder *names* to build the mapping UI, not their graph position.
 */
const PLACEHOLDER_PATTERN = /\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/gu;

/** Known TavernCanvas input keys a scanned placeholder can be mapped onto. */
export const WORKFLOW_INPUT_TARGETS = [
  "positive_prompt",
  "negative_prompt",
  "seed",
  "width",
  "height",
  "steps",
] as const;
export type WorkflowInputTarget = (typeof WORKFLOW_INPUT_TARGETS)[number];

/** Returns each distinct placeholder name found in `workflow_json`, in first-seen order. Never
 * throws on malformed JSON -- placeholder scanning is a text search, not a parse, so a workflow
 * the user is still mid-edit on can still be scanned. */
export function scan_workflow_placeholders(workflow_json: string): readonly string[] {
  const seen = new Set<string>();
  for (const match of workflow_json.matchAll(PLACEHOLDER_PATTERN)) {
    const name = match[1];
    if (name !== undefined) {
      seen.add(name);
    }
  }
  return [...seen];
}

/** True when `workflow_json` parses as valid JSON. Used to gate "looks like a workflow file"
 * feedback on import, separately from placeholder scanning (which tolerates invalid JSON). */
export function is_valid_json(text: string): boolean {
  try {
    JSON.parse(text);
    return true;
  } catch {
    return false;
  }
}
