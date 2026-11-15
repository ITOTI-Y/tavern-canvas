import { z } from "zod";

/** The values Inkwell writes into a workflow before submitting it. */
export const WORKFLOW_TARGETS = [
  "prompt",
  "negative_prompt",
  "seed",
  "output_count",
  "width",
  "height",
  "steps",
  "cfg",
  "sampler_name",
  "scheduler",
  "model",
] as const;
export type WorkflowTarget = (typeof WORKFLOW_TARGETS)[number];

const TEXT_TARGETS: ReadonlySet<WorkflowTarget> = new Set([
  "prompt",
  "negative_prompt",
  "sampler_name",
  "scheduler",
  "model",
]);

export function target_value_type(target: WorkflowTarget): "string" | "number" {
  return TEXT_TARGETS.has(target) ? "string" : "number";
}

const NodeInputSchema = z.strictObject({
  node_id: z.string().min(1).max(128),
  property: z.string().min(1).max(128),
});
export type NodeInput = z.infer<typeof NodeInputSchema>;

export const WorkflowMappingSchema = z.strictObject({
  inputs: z.partialRecord(z.enum(WORKFLOW_TARGETS), NodeInputSchema),
  output_node_ids: z.array(z.string().min(1).max(128)).max(16),
});
export type WorkflowMapping = z.infer<typeof WorkflowMappingSchema>;

export interface WorkflowNode {
  readonly class_type: string;
  readonly inputs: Readonly<Record<string, unknown>>;
  readonly _meta?: { readonly title?: unknown };
}
export type Workflow = Readonly<Record<string, WorkflowNode>>;

export class WorkflowFormatError extends Error {
  constructor(readonly reason: "not_json" | "not_api_format") {
    super(
      reason === "not_json"
        ? "The workflow is not valid JSON"
        : "The workflow is not in ComfyUI API format",
    );
    this.name = "WorkflowFormatError";
  }
}

function is_record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Reads a workflow exported with ComfyUI's "Export (API)"; the editor's own save format has no node inputs to write to. */
export function parse_workflow(text: string): Workflow {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new WorkflowFormatError("not_json");
  }
  if (!is_record(parsed) || Object.keys(parsed).length === 0) {
    throw new WorkflowFormatError("not_api_format");
  }
  for (const node of Object.values(parsed)) {
    if (!is_record(node) || typeof node.class_type !== "string" || !is_record(node.inputs)) {
      throw new WorkflowFormatError("not_api_format");
    }
  }
  return parsed as Workflow;
}

/** The node a `[node_id, output_index]` link points at. */
function linked_node(value: unknown): string | null {
  if (!Array.isArray(value) || value.length !== 2) {
    return null;
  }
  const node_id: unknown = value[0];
  return typeof node_id === "string" || typeof node_id === "number" ? String(node_id) : null;
}

const MAX_LINK_DEPTH = 8;

/**
 * The literal that ends up in `properties` of `node_id`: the node's own input, or the same-named
 * input of the node it is linked to, such as a prompt converter in front of the text encoder.
 */
function find_literal(
  workflow: Workflow,
  node_id: string,
  properties: readonly string[],
  type: "string" | "number",
  depth = 0,
): NodeInput | null {
  const node = workflow[node_id];
  if (node === undefined || depth > MAX_LINK_DEPTH) {
    return null;
  }
  for (const property of properties) {
    const value = node.inputs[property];
    if (typeof value === type) {
      return { node_id, property };
    }
    const upstream = linked_node(value);
    if (upstream !== null) {
      const found = find_literal(workflow, upstream, properties, type, depth + 1);
      if (found !== null) {
        return found;
      }
    }
  }
  return null;
}

const TEXT_INPUTS = ["text", "prompt", "string", "value", "conditioning"] as const;
const MODEL_INPUTS = ["unet_name", "ckpt_name", "model_name", "model"] as const;

function is_image_output(node: WorkflowNode): boolean {
  return linked_node(node.inputs.images) !== null && /save|preview/iu.test(node.class_type);
}

/**
 * Finds the inputs to write by following the sampler's links: `positive` and `negative` to the
 * prompt texts, `latent_image` to the canvas size and batch, `model` to the loader's file name.
 * A workflow without such a sampler yields an empty mapping for the user to fill in.
 */
export function detect_workflow_mapping(workflow: Workflow): WorkflowMapping {
  const inputs: Partial<Record<WorkflowTarget, NodeInput>> = {};
  const set = (target: WorkflowTarget, found: NodeInput | null): void => {
    if (found !== null) {
      inputs[target] = found;
    }
  };
  const sampler_id = Object.keys(workflow).find((node_id) => {
    const node_inputs = workflow[node_id]?.inputs ?? {};
    return linked_node(node_inputs.positive) !== null && linked_node(node_inputs.negative) !== null;
  });
  if (sampler_id !== undefined) {
    const sampler = workflow[sampler_id]?.inputs ?? {};
    const follow = (
      property: string,
      properties: readonly string[],
      type: "string" | "number",
    ): NodeInput | null => {
      const upstream = linked_node(sampler[property]);
      return upstream === null ? null : find_literal(workflow, upstream, properties, type);
    };
    set("prompt", follow("positive", TEXT_INPUTS, "string"));
    set("negative_prompt", follow("negative", TEXT_INPUTS, "string"));
    set("seed", find_literal(workflow, sampler_id, ["seed", "noise_seed", "value"], "number"));
    set("steps", find_literal(workflow, sampler_id, ["steps", "value"], "number"));
    set("cfg", find_literal(workflow, sampler_id, ["cfg", "value"], "number"));
    set("sampler_name", find_literal(workflow, sampler_id, ["sampler_name"], "string"));
    set("scheduler", find_literal(workflow, sampler_id, ["scheduler"], "string"));
    set("width", follow("latent_image", ["width", "value"], "number"));
    set("height", follow("latent_image", ["height", "value"], "number"));
    set("output_count", follow("latent_image", ["batch_size", "value"], "number"));
    set("model", follow("model", MODEL_INPUTS, "string"));
  }
  const output_node_id = Object.keys(workflow).find((node_id) => {
    const node = workflow[node_id];
    return node !== undefined && is_image_output(node);
  });
  return { inputs, output_node_ids: output_node_id === undefined ? [] : [output_node_id] };
}

export interface WorkflowInputChoice extends NodeInput {
  readonly title: string;
  readonly type: "string" | "number";
}

function node_title(node_id: string, node: WorkflowNode): string {
  const title = node._meta?.title;
  return `#${node_id} ${typeof title === "string" && title !== "" ? title : node.class_type}`;
}

/** Every node input holding a literal, for choosing a target by hand. */
export function workflow_input_choices(workflow: Workflow): readonly WorkflowInputChoice[] {
  return Object.entries(workflow).flatMap(([node_id, node]) =>
    Object.entries(node.inputs).flatMap(([property, value]) =>
      typeof value === "string" || typeof value === "number"
        ? [
            {
              node_id,
              property,
              title: node_title(node_id, node),
              type: typeof value === "string" ? "string" : "number",
            } as const,
          ]
        : [],
    ),
  );
}

/** The nodes that write images, for choosing the one whose images Inkwell collects. */
export function workflow_output_choices(
  workflow: Workflow,
): readonly { readonly node_id: string; readonly title: string }[] {
  return Object.entries(workflow).flatMap(([node_id, node]) =>
    linked_node(node.inputs.images) === null ? [] : [{ node_id, title: node_title(node_id, node) }],
  );
}

export const WORKFLOW_JSON_FIELD = "workflow_json";
export const NODE_MAP_FIELD = "node_map";

export interface MappedWorkflow {
  readonly workflow: Workflow;
  readonly mapping: WorkflowMapping;
}

function points_at_literal(workflow: Workflow, target: WorkflowTarget, input: NodeInput): boolean {
  return typeof workflow[input.node_id]?.inputs[input.property] === target_value_type(target);
}

/**
 * A stored workflow asset and its mapping. A record saved without a mapping, or with one that no
 * longer matches the JSON, gets the detected mapping.
 */
export function read_mapped_workflow(payload: Readonly<Record<string, unknown>>): MappedWorkflow {
  const text = payload[WORKFLOW_JSON_FIELD];
  const workflow = parse_workflow(typeof text === "string" ? text : "");
  const raw = payload[NODE_MAP_FIELD];
  let stored: unknown = null;
  if (typeof raw === "string") {
    try {
      stored = JSON.parse(raw);
    } catch {
      stored = null;
    }
  }
  const parsed = WorkflowMappingSchema.safeParse(stored);
  if (!parsed.success) {
    return { workflow, mapping: detect_workflow_mapping(workflow) };
  }
  const inputs: Partial<Record<WorkflowTarget, NodeInput>> = {};
  for (const target of WORKFLOW_TARGETS) {
    const input = parsed.data.inputs[target];
    if (input !== undefined && points_at_literal(workflow, target, input)) {
      inputs[target] = input;
    }
  }
  return {
    workflow,
    mapping: {
      inputs,
      output_node_ids: parsed.data.output_node_ids.filter((node_id) => node_id in workflow),
    },
  };
}

/** What a workflow must map before it can produce an image for a request. */
export const REQUIRED_TARGETS = ["prompt", "output_count"] as const;

export function missing_required(
  mapping: WorkflowMapping,
): readonly ((typeof REQUIRED_TARGETS)[number] | "output")[] {
  return [
    ...REQUIRED_TARGETS.filter((target) => mapping.inputs[target] === undefined),
    ...(mapping.output_node_ids.length === 0 ? (["output"] as const) : []),
  ];
}

export class WorkflowMappingError extends Error {
  constructor(readonly missing: readonly string[]) {
    super(`The ComfyUI workflow has no mapping for: ${missing.join(", ")}`);
    this.name = "WorkflowMappingError";
  }
}

/**
 * The workflow in the shape the ComfyUI adapter renders from. The negative prompt text is emptied
 * so a request without one does not run with the text the workflow was exported with.
 */
export function to_adapter_workflow(workflow_id: string, mapped: MappedWorkflow): unknown {
  const { mapping } = mapped;
  const missing = missing_required(mapping);
  const prompt = mapping.inputs.prompt;
  const output_count = mapping.inputs.output_count;
  if (missing.length > 0 || prompt === undefined || output_count === undefined) {
    throw new WorkflowMappingError(missing);
  }
  const workflow = structuredClone(mapped.workflow) as Record<
    string,
    { inputs: Record<string, unknown> }
  >;
  const negative = mapping.inputs.negative_prompt;
  if (negative !== undefined) {
    const node = workflow[negative.node_id];
    if (node !== undefined) {
      node.inputs[negative.property] = "";
    }
  }
  const placeholders: Record<string, NodeInput & { value_type: "string" | "number" }> = {};
  for (const target of WORKFLOW_TARGETS) {
    const input = mapping.inputs[target];
    if (
      input !== undefined &&
      target !== "prompt" &&
      target !== "negative_prompt" &&
      target !== "seed" &&
      target !== "output_count"
    ) {
      placeholders[target] = { ...input, value_type: target_value_type(target) };
    }
  }
  return {
    workflow_id,
    workflow,
    bindings: {
      prompt,
      ...(negative === undefined ? {} : { negative_prompt: negative }),
      ...(mapping.inputs.seed === undefined ? {} : { seed: mapping.inputs.seed }),
      output_count,
      placeholders,
      input_assets: {},
    },
  };
}

/** Sampling values a ComfyUI profile sets over the workflow's own; an absent one keeps the workflow's. */
export const ComfyUiDefaultsSchema = z.strictObject({
  steps: z.number().int().min(1).max(200).optional(),
  cfg: z.number().min(0).max(100).optional(),
  sampler_name: z.string().trim().min(1).max(128).optional(),
  scheduler: z.string().trim().min(1).max(128).optional(),
  model: z.string().trim().min(1).max(512).optional(),
});
export type ComfyUiDefaults = z.infer<typeof ComfyUiDefaultsSchema>;

export const DEFAULT_TARGETS = [
  "steps",
  "cfg",
  "sampler_name",
  "scheduler",
  "model",
] as const satisfies readonly WorkflowTarget[];

function literal_at(workflow: Workflow, input: NodeInput | undefined): string | number | null {
  if (input === undefined) {
    return null;
  }
  const value = workflow[input.node_id]?.inputs[input.property];
  return typeof value === "string" || typeof value === "number" ? value : null;
}

/** The value the workflow itself holds for a target. */
export function workflow_value(
  mapped: MappedWorkflow,
  target: WorkflowTarget,
): string | number | null {
  return literal_at(mapped.workflow, mapped.mapping.inputs[target]);
}

/**
 * The values a request sends for the mapped targets: the canvas size starts from the workflow's
 * own so a caller can replace it, and the profile's defaults replace the workflow's sampling values.
 */
export function request_placeholder_values(
  mapped: MappedWorkflow,
  defaults: ComfyUiDefaults,
): Record<string, string | number> {
  const values: Record<string, string | number> = {};
  for (const target of ["width", "height"] as const) {
    const value = workflow_value(mapped, target);
    if (typeof value === "number") {
      values[target] = value;
    }
  }
  for (const target of DEFAULT_TARGETS) {
    const value = defaults[target];
    if (value !== undefined && mapped.mapping.inputs[target] !== undefined) {
      values[target] = value;
    }
  }
  return values;
}
