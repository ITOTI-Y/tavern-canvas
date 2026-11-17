import type { Workflow } from "./workflow_mapping.js";

/** Why an editor workflow cannot be turned into API format. */
export class WorkflowConversionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WorkflowConversionError";
  }
}

interface EditorInput {
  readonly name: string;
  readonly type?: string;
  readonly link: number | null;
}

interface EditorNode {
  readonly id: number | string;
  readonly type: string;
  readonly mode?: number;
  readonly title?: string;
  readonly inputs?: readonly EditorInput[];
  readonly widgets_values?: readonly unknown[] | Readonly<Record<string, unknown>> | null;
}

/** `[link_id, from_node, from_slot, to_node, to_slot, type]`. */
type EditorLink = readonly [number, number | string, number, number | string, number, unknown];

/** Editor-only nodes that never reach the server. */
const FRONTEND_ONLY = new Set(["Note", "MarkdownNote", "Reroute", "PrimitiveNode"]);
const MUTED = 2;
const BYPASSED = 4;
const WIDGET_TYPES = new Set(["INT", "FLOAT", "STRING", "BOOLEAN", "COMBO"]);

function is_record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

type InputSpec = readonly [unknown, unknown?];

/** The node class's inputs in the order the editor lays out their widgets. */
function ordered_inputs(info: unknown): [string, InputSpec][] {
  const input = is_record(info) ? info.input : null;
  if (!is_record(input)) {
    return [];
  }
  return [input.required, input.optional].flatMap((group) =>
    is_record(group)
      ? Object.entries(group).flatMap(([name, spec]): [string, InputSpec][] =>
          Array.isArray(spec) ? [[name, spec as unknown as InputSpec]] : [],
        )
      : [],
  );
}

function is_widget(spec: InputSpec): boolean {
  const [type] = spec;
  return Array.isArray(type) || (typeof type === "string" && WIDGET_TYPES.has(type));
}

/** The editor stores one more value after these widgets: the "control after generate" or upload choice. */
function extra_values(name: string, spec: InputSpec): number {
  const [type, options] = spec;
  const control =
    (is_record(options) && options.control_after_generate === true) ||
    (type === "INT" && (name === "seed" || name === "noise_seed"));
  const upload = is_record(options) && options.image_upload === true;
  return (control ? 1 : 0) + (upload ? 1 : 0);
}

type Source =
  | { readonly kind: "link"; readonly node_id: string; readonly slot: number }
  | { readonly kind: "value"; readonly value: unknown }
  | { readonly kind: "none" };

/**
 * Turns a workflow saved by the ComfyUI editor into API format, using the server's `/object_info`
 * for each node class to name the widget values. Editor-only nodes are dropped, muted nodes left
 * out, bypassed nodes and reroutes passed through, and an editor primitive's value written into
 * the inputs it feeds.
 */
export function convert_editor_workflow(
  editor: unknown,
  node_info: ReadonlyMap<string, unknown>,
): Workflow {
  if (!is_record(editor) || !Array.isArray(editor.nodes) || !Array.isArray(editor.links)) {
    throw new WorkflowConversionError("The file is not a ComfyUI editor workflow");
  }
  const definitions = is_record(editor.definitions) ? editor.definitions : null;
  if (Array.isArray(definitions?.subgraphs) && definitions.subgraphs.length > 0) {
    throw new WorkflowConversionError(
      "The workflow contains subgraphs; save it with Export (API) in ComfyUI instead",
    );
  }
  const nodes = new Map(
    (editor.nodes as EditorNode[]).map((node) => [String(node.id), node] as const),
  );
  const links = new Map((editor.links as EditorLink[]).map((link) => [link[0], link] as const));

  const resolve = (link_id: number | null, depth = 0): Source => {
    const link = link_id === null ? undefined : links.get(link_id);
    const source = link === undefined ? undefined : nodes.get(String(link[1]));
    if (link === undefined || source === undefined || depth > 32) {
      return { kind: "none" };
    }
    if (source.type === "PrimitiveNode") {
      const values = source.widgets_values;
      return { kind: "value", value: Array.isArray(values) ? values[0] : undefined };
    }
    if (source.type === "Reroute") {
      return resolve(source.inputs?.[0]?.link ?? null, depth + 1);
    }
    if (source.mode === MUTED) {
      return { kind: "none" };
    }
    if (source.mode === BYPASSED) {
      const through = source.inputs?.find((input) => input.link !== null && input.type === link[5]);
      return resolve(through?.link ?? null, depth + 1);
    }
    return { kind: "link", node_id: String(source.id), slot: link[2] };
  };

  const missing = new Set<string>();
  const workflow: Record<
    string,
    { class_type: string; inputs: Record<string, unknown>; _meta: { title: string } }
  > = {};
  for (const [node_id, node] of nodes) {
    if (FRONTEND_ONLY.has(node.type) || node.mode === MUTED || node.mode === BYPASSED) {
      continue;
    }
    const info = node_info.get(node.type);
    if (info === undefined) {
      // Nodes the server does not know and nothing reads from are editor decorations.
      const feeds = [...links.values()].some((link) => String(link[1]) === node_id);
      if (feeds) {
        missing.add(node.type);
      }
      continue;
    }
    const values = node.widgets_values ?? [];
    let position = 0;
    const inputs: Record<string, unknown> = {};
    for (const [name, spec] of ordered_inputs(info)) {
      const widget = is_widget(spec);
      const editor_input = node.inputs?.find((input) => input.name === name);
      const linked = editor_input?.link ?? null;
      let value: unknown;
      if (Array.isArray(values)) {
        value = widget ? values[position] : undefined;
        if (widget) {
          position += 1 + extra_values(name, spec);
        }
      } else {
        value = (values as Readonly<Record<string, unknown>>)[name];
      }
      if (linked !== null) {
        const source = resolve(linked);
        if (source.kind === "link") {
          inputs[name] = [source.node_id, source.slot];
        } else if (source.kind === "value") {
          inputs[name] = source.value;
        } else if (widget && value !== undefined) {
          inputs[name] = value;
        }
      } else if (widget && value !== undefined) {
        inputs[name] = value;
      }
    }
    workflow[node_id] = {
      class_type: node.type,
      inputs,
      _meta: { title: node.title ?? node.type },
    };
  }
  if (missing.size > 0) {
    throw new WorkflowConversionError(
      `The server does not have these node types: ${[...missing].join(", ")}`,
    );
  }
  if (Object.keys(workflow).length === 0) {
    throw new WorkflowConversionError("The workflow has no nodes the server can run");
  }
  return workflow;
}

/** The node classes an editor workflow uses, for fetching their `/object_info`. */
export function editor_node_types(editor: unknown): string[] {
  if (!is_record(editor) || !Array.isArray(editor.nodes)) {
    return [];
  }
  return [
    ...new Set(
      (editor.nodes as EditorNode[])
        .map((node) => node.type)
        .filter((type) => typeof type === "string" && !FRONTEND_ONLY.has(type)),
    ),
  ];
}
