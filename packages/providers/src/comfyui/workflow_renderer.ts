import { AssetIdSchema } from "@tavern-canvas/contracts";
import { z } from "zod";

import { invalid_request } from "../image_bytes.js";
import { ProviderAdapterError } from "../provider_error.js";

const MAX_WORKFLOW_NODES = 500;
const MAX_WORKFLOW_DEPTH = 16;
const MAX_WORKFLOW_VALUES = 100_000;
const MAX_WORKFLOW_BYTES = 1_000_000;
const DANGEROUS_KEYS = new Set(["__proto__", "constructor", "prototype"]);

const BindingTargetSchema = z.strictObject({
  node_id: z.string().trim().min(1).max(128),
  property: z.string().trim().min(1).max(128),
});

const PlaceholderBindingSchema = BindingTargetSchema.extend({
  value_type: z.enum(["string", "number", "boolean"]),
});

const StoredComfyUiWorkflowSchema = z.strictObject({
  workflow_id: AssetIdSchema,
  workflow: z.unknown(),
  bindings: z.strictObject({
    prompt: BindingTargetSchema,
    negative_prompt: BindingTargetSchema.optional(),
    seed: BindingTargetSchema.optional(),
    output_count: BindingTargetSchema,
    placeholders: z.record(z.string().trim().min(1).max(128), PlaceholderBindingSchema).default({}),
    input_assets: z.record(z.string().trim().min(1).max(128), BindingTargetSchema).default({}),
  }),
});

export interface ComfyUiWorkflowNode {
  readonly class_type: string;
  readonly inputs: Readonly<Record<string, unknown>>;
  readonly [property: string]: unknown;
}

export interface StoredComfyUiWorkflow {
  readonly workflow_id: ReturnType<typeof AssetIdSchema.parse>;
  readonly workflow: Readonly<Record<string, ComfyUiWorkflowNode>>;
  readonly bindings: z.infer<typeof StoredComfyUiWorkflowSchema>["bindings"];
}

export interface ComfyUiRenderValues {
  readonly prompt: string;
  readonly negative_prompt?: string;
  readonly seed?: number;
  readonly output_count: number;
  readonly placeholder_values: Readonly<Record<string, string | number | boolean>>;
  readonly input_asset_names: Readonly<Record<string, string>>;
}

export function validate_stored_comfyui_workflow(value: unknown): StoredComfyUiWorkflow {
  try {
    const stored = StoredComfyUiWorkflowSchema.parse(value);
    if (!is_plain_record(stored.workflow)) {
      throw invalid_request();
    }
    const node_entries = Object.entries(stored.workflow);
    if (node_entries.length === 0 || node_entries.length > MAX_WORKFLOW_NODES) {
      throw invalid_request();
    }
    validate_json_tree(stored.workflow);
    const serialized = JSON.stringify(stored.workflow);
    if (new TextEncoder().encode(serialized).byteLength > MAX_WORKFLOW_BYTES) {
      throw invalid_request();
    }

    const workflow: Record<string, ComfyUiWorkflowNode> = {};
    for (const [node_id, raw_node] of node_entries) {
      if (!is_safe_key(node_id) || !is_plain_record(raw_node)) {
        throw invalid_request();
      }
      const class_type = raw_node.class_type;
      const inputs = raw_node.inputs;
      if (
        typeof class_type !== "string" ||
        class_type.length === 0 ||
        class_type.length > 256 ||
        !is_plain_record(inputs)
      ) {
        throw invalid_request();
      }
      workflow[node_id] = raw_node as ComfyUiWorkflowNode;
    }
    return { workflow_id: stored.workflow_id, workflow, bindings: stored.bindings };
  } catch (error) {
    if (error instanceof ProviderAdapterError) {
      throw error;
    }
    throw invalid_request();
  }
}

export function render_comfyui_workflow(
  stored: StoredComfyUiWorkflow,
  values: ComfyUiRenderValues,
): Record<string, ComfyUiWorkflowNode> {
  const rendered = structuredClone(stored.workflow) as Record<string, ComfyUiWorkflowNode>;
  assign_target(rendered, stored.bindings.prompt, values.prompt, "string");
  assign_target(rendered, stored.bindings.output_count, values.output_count, "number");

  if (values.negative_prompt !== undefined) {
    if (stored.bindings.negative_prompt === undefined) {
      throw invalid_request();
    }
    assign_target(rendered, stored.bindings.negative_prompt, values.negative_prompt, "string");
  }
  if (values.seed !== undefined) {
    if (stored.bindings.seed === undefined) {
      throw invalid_request();
    }
    assign_target(rendered, stored.bindings.seed, values.seed, "number");
  }

  for (const [name, value] of Object.entries(values.placeholder_values)) {
    const binding = stored.bindings.placeholders[name];
    if (binding === undefined || typeof value !== binding.value_type) {
      throw invalid_request();
    }
    assign_target(rendered, binding, value, binding.value_type);
  }
  for (const [name, asset_name] of Object.entries(values.input_asset_names)) {
    const binding = stored.bindings.input_assets[name];
    if (binding === undefined) {
      throw invalid_request();
    }
    assign_target(rendered, binding, asset_name, "string");
  }
  return rendered;
}

function assign_target(
  workflow: Record<string, ComfyUiWorkflowNode>,
  target: z.infer<typeof BindingTargetSchema>,
  value: string | number | boolean,
  value_type: "string" | "number" | "boolean",
): void {
  if (
    !is_safe_key(target.node_id) ||
    !is_safe_key(target.property) ||
    typeof value !== value_type
  ) {
    throw invalid_request();
  }
  const node = workflow[target.node_id];
  if (
    node === undefined ||
    !is_plain_record(node.inputs) ||
    !Object.hasOwn(node.inputs, target.property)
  ) {
    throw invalid_request();
  }
  (node.inputs as Record<string, unknown>)[target.property] = value;
}

function validate_json_tree(root: unknown): void {
  const stack: { readonly value: unknown; readonly depth: number }[] = [{ value: root, depth: 0 }];
  let value_count = 0;
  while (stack.length > 0) {
    const current = stack.pop();
    if (current === undefined) {
      break;
    }
    value_count += 1;
    if (value_count > MAX_WORKFLOW_VALUES || current.depth > MAX_WORKFLOW_DEPTH) {
      throw invalid_request();
    }
    if (current.value === null) {
      continue;
    }
    const value_type = typeof current.value;
    if (value_type === "string" || value_type === "boolean") {
      continue;
    }
    if (value_type === "number") {
      if (!Number.isFinite(current.value)) {
        throw invalid_request();
      }
      continue;
    }
    if (Array.isArray(current.value)) {
      for (const child of current.value) {
        stack.push({ value: child, depth: current.depth + 1 });
      }
      continue;
    }
    if (!is_plain_record(current.value)) {
      throw invalid_request();
    }
    for (const [key, child] of Object.entries(current.value)) {
      if (!is_safe_key(key)) {
        throw invalid_request();
      }
      stack.push({ value: child, depth: current.depth + 1 });
    }
  }
}

function is_plain_record(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value) as unknown;
  return prototype === Object.prototype || prototype === null;
}

function is_safe_key(value: string): boolean {
  return value.length > 0 && value.length <= 256 && !DANGEROUS_KEYS.has(value);
}
