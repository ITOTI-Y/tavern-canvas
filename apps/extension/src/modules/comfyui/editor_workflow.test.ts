import { describe, expect, it } from "vitest";

import {
  convert_editor_workflow,
  editor_node_types,
  WorkflowConversionError,
} from "./editor_workflow.js";

const INFO = new Map<string, unknown>([
  [
    "CheckpointLoaderSimple",
    { input: { required: { ckpt_name: [["a.safetensors", "b.safetensors"]] } } },
  ],
  ["CLIPTextEncode", { input: { required: { text: ["STRING", {}], clip: ["CLIP"] } } }],
  [
    "KSampler",
    {
      input: {
        required: {
          model: ["MODEL"],
          seed: ["INT", { control_after_generate: true }],
          steps: ["INT", {}],
          cfg: ["FLOAT", {}],
          positive: ["CONDITIONING"],
        },
      },
    },
  ],
  ["LoraLoaderModelOnly", { input: { required: { model: ["MODEL"], lora_name: ["COMBO", {}] } } }],
]);

function editor(nodes: unknown[], links: unknown[], extra: Record<string, unknown> = {}) {
  return { nodes, links, version: 0.4, ...extra };
}

describe("convert_editor_workflow", () => {
  it("names widget values, skips the seed control value and follows reroutes, primitives and bypassed nodes", () => {
    const workflow = convert_editor_workflow(
      editor(
        [
          { id: 1, type: "CheckpointLoaderSimple", mode: 0, widgets_values: ["b.safetensors"] },
          { id: 2, type: "Reroute", inputs: [{ name: "", type: "*", link: 1 }] },
          {
            id: 3,
            type: "LoraLoaderModelOnly",
            mode: 4,
            inputs: [{ name: "model", type: "MODEL", link: 2 }],
            widgets_values: ["x.safetensors"],
          },
          { id: 4, type: "PrimitiveNode", widgets_values: [30] },
          {
            id: 5,
            type: "KSampler",
            mode: 0,
            title: "Sampler",
            inputs: [
              { name: "model", type: "MODEL", link: 3 },
              { name: "steps", type: "INT", link: 4, widget: { name: "steps" } },
              { name: "positive", type: "CONDITIONING", link: 5 },
            ],
            widgets_values: [42, "randomize", 20, 7.5],
          },
          {
            id: 6,
            type: "CLIPTextEncode",
            mode: 0,
            inputs: [{ name: "clip", type: "CLIP", link: null }],
            widgets_values: ["a forest"],
          },
          { id: 7, type: "Note", widgets_values: ["read me"] },
          { id: 8, type: "CLIPTextEncode", mode: 2, widgets_values: ["muted"] },
        ],
        [
          [1, 1, 0, 2, 0, "MODEL"],
          [2, 2, 0, 3, 0, "MODEL"],
          [3, 3, 0, 5, 0, "MODEL"],
          [4, 4, 0, 5, 2, "INT"],
          [5, 6, 0, 5, 4, "CONDITIONING"],
        ],
      ),
      INFO,
    );

    expect(workflow).toEqual({
      "1": {
        class_type: "CheckpointLoaderSimple",
        inputs: { ckpt_name: "b.safetensors" },
        _meta: { title: "CheckpointLoaderSimple" },
      },
      "5": {
        class_type: "KSampler",
        inputs: { model: ["1", 0], seed: 42, steps: 30, cfg: 7.5, positive: ["6", 0] },
        _meta: { title: "Sampler" },
      },
      "6": {
        class_type: "CLIPTextEncode",
        inputs: { text: "a forest" },
        _meta: { title: "CLIPTextEncode" },
      },
    });
  });

  it("refuses subgraphs and node types the server lacks", () => {
    expect(() =>
      convert_editor_workflow(editor([], [], { definitions: { subgraphs: [{ id: "s" }] } }), INFO),
    ).toThrow(WorkflowConversionError);
    expect(() =>
      convert_editor_workflow(
        editor(
          [
            { id: 1, type: "CustomLoader", mode: 0, widgets_values: [] },
            {
              id: 2,
              type: "CLIPTextEncode",
              mode: 0,
              inputs: [{ name: "clip", link: 1 }],
              widgets_values: ["x"],
            },
          ],
          [[1, 1, 0, 2, 0, "CLIP"]],
        ),
        INFO,
      ),
    ).toThrow("CustomLoader");
  });

  it("lists the node classes to look up, leaving out editor-only nodes", () => {
    expect(
      editor_node_types(
        editor(
          [
            { id: 1, type: "Note" },
            { id: 2, type: "KSampler" },
            { id: 3, type: "KSampler" },
          ],
          [],
        ),
      ),
    ).toEqual(["KSampler"]);
  });
});
