import { describe, expect, it } from "vitest";

import type { ComfyUiGet } from "./server_inspection.js";
import { list_server_workflows, read_server_workflow } from "./server_workflows.js";
import { WorkflowFormatError } from "./workflow_mapping.js";

const API = { "3": { class_type: "KSampler", inputs: { seed: 1 } } };
const EDITOR = {
  nodes: [{ id: 3, type: "KSampler", mode: 0, widgets_values: [5, "fixed"] }],
  links: [],
};
const KSAMPLER_INFO = {
  KSampler: { input: { required: { seed: ["INT", { control_after_generate: true }] } } },
};

function server(files: Record<string, unknown>): { get: ComfyUiGet; routes: string[] } {
  const routes: string[] = [];
  const get: ComfyUiGet = (route) => {
    routes.push(route);
    if (route.startsWith("/object_info/")) {
      return Promise.resolve(KSAMPLER_INFO);
    }
    if (route.startsWith("/api/userdata?")) {
      return Promise.resolve([...Object.keys(files), "notes.txt"]);
    }
    const name = decodeURIComponent(route.slice("/api/userdata/".length)).slice(
      "workflows/".length,
    );
    const match = Object.entries(files).find(([key]) => key.replaceAll("\\", "/") === name);
    return match === undefined ? Promise.reject(new Error("404")) : Promise.resolve(match[1]);
  };
  return { get, routes };
}

describe("list_server_workflows", () => {
  it("lists the saved JSON workflows and tells API format from the editor's format", async () => {
    const { get, routes } = server({
      "sub\\anima api.json": API,
      "editor.json": EDITOR,
      "broken.json": { "3": { inputs: {} } },
    });

    expect(await list_server_workflows(get)).toEqual([
      { path: "broken.json", format: "unreadable" },
      { path: "editor.json", format: "editor" },
      { path: "sub/anima api.json", format: "api" },
    ]);
    expect(routes).toContain("/api/userdata/workflows%2Fsub%2Fanima%20api.json");
  });
});

describe("read_server_workflow", () => {
  it("returns an API workflow as it is and converts an editor workflow with the node definitions", async () => {
    const { get } = server({ "api.json": API, "editor.json": EDITOR, "broken.json": { a: 1 } });

    expect(JSON.parse(await read_server_workflow(get, "api.json"))).toEqual(API);
    expect(JSON.parse(await read_server_workflow(get, "editor.json"))).toEqual({
      "3": { class_type: "KSampler", inputs: { seed: 5 }, _meta: { title: "KSampler" } },
    });
    await expect(read_server_workflow(get, "broken.json")).rejects.toBeInstanceOf(
      WorkflowFormatError,
    );
  });
});
