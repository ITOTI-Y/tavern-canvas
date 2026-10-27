const PLACEHOLDER_PATTERN = /\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/gu;

export const WORKFLOW_INPUT_TARGETS = [
  "positive_prompt",
  "negative_prompt",
  "seed",
  "width",
  "height",
  "steps",
] as const;
export type WorkflowInputTarget = (typeof WORKFLOW_INPUT_TARGETS)[number];

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
