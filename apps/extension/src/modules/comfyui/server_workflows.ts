import type { ComfyUiGet } from "./server_inspection.js";
import { parse_workflow, WorkflowFormatError } from "./workflow_mapping.js";

/**
 * A workflow saved on the ComfyUI server. `api` can be used as it is; `editor` is the editor's own
 * save format, which has to be saved again with ComfyUI's "Export (API)" first.
 */
export interface ServerWorkflow {
  /** Relative to the user's `workflows` folder, with `/` separators. */
  readonly path: string;
  readonly format: "api" | "editor" | "unreadable";
}

/** Listing every file is bounded so a large folder cannot stall the dialog. */
export const MAX_SERVER_WORKFLOWS = 200;

function is_record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function file_route(path: string): `/${string}` {
  return `/api/userdata/${encodeURIComponent(`workflows/${path}`)}`;
}

/** The format of a saved workflow's parsed JSON. */
export function workflow_format(value: unknown): ServerWorkflow["format"] {
  if (is_record(value) && Array.isArray(value.nodes) && Array.isArray(value.links)) {
    return "editor";
  }
  try {
    parse_workflow(JSON.stringify(value));
    return "api";
  } catch (error) {
    if (error instanceof WorkflowFormatError) {
      return "unreadable";
    }
    throw error;
  }
}

/** The JSON workflows in the user's `workflows` folder, each read once to tell its format. */
export async function list_server_workflows(get: ComfyUiGet): Promise<readonly ServerWorkflow[]> {
  const listed = await get("/api/userdata?dir=workflows&recurse=true&split=false");
  if (!Array.isArray(listed)) {
    throw new Error("ComfyUI returned an invalid workflow list");
  }
  const paths = listed
    .filter(
      (item): item is string => typeof item === "string" && item.toLowerCase().endsWith(".json"),
    )
    .map((item) => item.replaceAll("\\", "/"))
    .sort((a, b) => a.localeCompare(b))
    .slice(0, MAX_SERVER_WORKFLOWS);
  return Promise.all(
    paths.map(async (path): Promise<ServerWorkflow> => {
      try {
        return { path, format: workflow_format(await get(file_route(path))) };
      } catch {
        return { path, format: "unreadable" };
      }
    }),
  );
}

/** A saved workflow's JSON text, ready for the workflow import; rejects unless it is in API format. */
export async function read_server_workflow(get: ComfyUiGet, path: string): Promise<string> {
  const value = await get(file_route(path));
  const text = JSON.stringify(value, null, 2);
  parse_workflow(text);
  return text;
}
