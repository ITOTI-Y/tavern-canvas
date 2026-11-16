import type { MappedWorkflow, WorkflowTarget } from "./workflow_mapping.js";

export const OPTION_TARGETS = [
  "sampler_name",
  "scheduler",
  "model",
  "text_encoder",
  "vae",
] as const satisfies readonly WorkflowTarget[];
export type OptionTarget = (typeof OPTION_TARGETS)[number];

export interface MissingWorkflowValue {
  readonly node_id: string;
  readonly class_type: string;
  readonly property: string;
  readonly value: string;
}

export interface ComfyUiInspection {
  /** `null` when the server does not report one. */
  readonly version: string | null;
  /** What the server offers for each mapped target; empty when the target is unmapped. */
  readonly options: Readonly<Record<OptionTarget, readonly string[]>>;
  /** The LoRA files the server can load. */
  readonly lora_names: readonly string[];
  /** Node classes the workflow uses that the server has not installed. */
  readonly missing_node_types: readonly string[];
  /** Workflow values, such as model files, that are not among the server's choices for that input. */
  readonly missing_values: readonly MissingWorkflowValue[];
}

/** Fetches a route of the ComfyUI server as parsed JSON; rejects when the server cannot be reached. */
export type ComfyUiGet = (route: `/${string}`) => Promise<unknown>;

function is_record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function string_list(value: unknown): readonly string[] | null {
  return Array.isArray(value) && value.every((item) => typeof item === "string") ? value : null;
}

/** The choices `/object_info` lists for an input, in either the bare-list or the `COMBO` form; `null` for a free-form input. */
function input_choices(node_info: unknown, property: string): readonly string[] | null {
  const input = is_record(node_info) ? node_info.input : null;
  if (!is_record(input)) {
    return null;
  }
  for (const group of [input.required, input.optional]) {
    const spec: unknown = is_record(group) ? group[property] : undefined;
    if (!Array.isArray(spec)) {
      continue;
    }
    const type: unknown = spec[0];
    const config: unknown = spec[1];
    const listed = string_list(type);
    if (listed !== null) {
      return listed;
    }
    if (type === "COMBO" && is_record(config)) {
      return string_list(config.options);
    }
  }
  return null;
}

export async function inspect_comfyui_server(
  get: ComfyUiGet,
  mapped: MappedWorkflow | null,
): Promise<ComfyUiInspection> {
  const stats = await get("/system_stats");
  const system = is_record(stats) ? stats.system : null;
  const reported = is_record(system) ? system.comfyui_version : null;
  const version = typeof reported === "string" ? reported : null;
  const options: Record<OptionTarget, readonly string[]> = {
    sampler_name: [],
    scheduler: [],
    model: [],
    text_encoder: [],
    vae: [],
  };
  const lora_names = string_list(await get("/models/loras")) ?? [];
  if (mapped === null) {
    return { version, options, lora_names, missing_node_types: [], missing_values: [] };
  }

  const class_types = [...new Set(Object.values(mapped.workflow).map((node) => node.class_type))];
  const node_info = new Map<string, unknown>(
    await Promise.all(
      class_types.map(async (class_type): Promise<[string, unknown]> => {
        const info = await get(`/object_info/${encodeURIComponent(class_type)}`);
        return [class_type, is_record(info) ? info[class_type] : undefined];
      }),
    ),
  );

  const missing_values: MissingWorkflowValue[] = [];
  for (const [node_id, node] of Object.entries(mapped.workflow)) {
    for (const [property, value] of Object.entries(node.inputs)) {
      if (typeof value !== "string") {
        continue;
      }
      const choices = input_choices(node_info.get(node.class_type), property);
      if (choices !== null && !choices.includes(value)) {
        missing_values.push({ node_id, class_type: node.class_type, property, value });
      }
    }
  }
  for (const target of OPTION_TARGETS) {
    const input = mapped.mapping.inputs[target];
    const node = input === undefined ? undefined : mapped.workflow[input.node_id];
    if (input !== undefined && node !== undefined) {
      options[target] = input_choices(node_info.get(node.class_type), input.property) ?? [];
    }
  }
  return {
    version,
    options,
    lora_names,
    missing_node_types: class_types.filter((class_type) => node_info.get(class_type) === undefined),
    missing_values,
  };
}
