import { ComfyUiRequestSchema } from "@tavern-canvas/contracts";
import { describe, expect, it } from "vitest";

import { read_mapped_workflow, WorkflowMappingError } from "../comfyui/workflow_mapping.js";
import {
  build_provider_request,
  ComfyUiWorkflowMissingError,
  type GenerationDraftInput,
} from "./build_generation_request.js";

const REQUEST_ID = "22222222-2222-4222-8222-222222222222";
const WORKFLOW_ID = "11111111-1111-4111-8111-111111111111";
const ANCHOR = "a".repeat(64);

function workflow(negative: boolean): string {
  return JSON.stringify({
    "1": { class_type: "CLIPTextEncode", inputs: { text: "a cat" } },
    "2": { class_type: "CLIPTextEncode", inputs: { text: "blurry" } },
    "3": { class_type: "EmptyLatentImage", inputs: { width: 832, height: 1216, batch_size: 1 } },
    "4": {
      class_type: "KSampler",
      inputs: {
        seed: 7,
        steps: 8,
        model: ["6", 0],
        positive: ["1", 0],
        negative: negative ? ["2", 0] : ["1", 0],
        latent_image: ["3", 0],
      },
    },
    "5": { class_type: "SaveImage", inputs: { images: ["4", 0] } },
    "6": { class_type: "UNETLoader", inputs: { unet_name: "anima.safetensors" } },
  });
}

function draft(workflow_json: string): GenerationDraftInput {
  return {
    provider_id: "comfyui",
    positive_prompt: "1girl, park",
    negative_prompt: "lowres",
    image_count: 2,
    references: [],
    comfyui: {
      workflow_id: WORKFLOW_ID,
      mapped: read_mapped_workflow({ workflow_json }),
      defaults: { steps: 12, loras: [{ lora_name: "style.safetensors", strength: 0.8 }] },
    },
  };
}

describe("build_provider_request for ComfyUI", () => {
  it("sends the prompts, a seed, the workflow's canvas and the profile's defaults", () => {
    const request = build_provider_request(draft(workflow(true)), REQUEST_ID, ANCHOR);

    expect(ComfyUiRequestSchema.parse(request)).toEqual(request);
    expect(request).toMatchObject({
      provider_id: "comfyui",
      prompt: "1girl, park",
      negative_prompt: "lowres",
      output_count: 2,
      workflow_id: WORKFLOW_ID,
      placeholder_values: { width: 832, height: 1216, steps: 12 },
      output_node_ids: ["5"],
      loras: [{ lora_name: "style.safetensors", strength: 0.8 }],
    });
    expect("seed" in request && Number.isInteger(request.seed)).toBe(true);
  });

  it("leaves the negative prompt out when the workflow maps none", () => {
    const input = draft(workflow(true));
    const mapped = input.comfyui?.mapped;
    if (mapped === undefined) {
      throw new Error("draft has no workflow");
    }
    const { negative_prompt: _unmapped, ...inputs } = mapped.mapping.inputs;
    const request = build_provider_request(
      {
        ...input,
        comfyui: {
          workflow_id: WORKFLOW_ID,
          defaults: {},
          mapped: { ...mapped, mapping: { ...mapped.mapping, inputs } },
        },
      },
      REQUEST_ID,
      ANCHOR,
    );

    expect("negative_prompt" in request).toBe(false);
  });

  it("names the missing workflow of a profile that has none", () => {
    const { comfyui: _none, ...without_workflow } = draft(workflow(true));

    expect(() => build_provider_request(without_workflow, REQUEST_ID, ANCHOR)).toThrowError(
      ComfyUiWorkflowMissingError,
    );
  });

  it("names what a workflow without an image output still has to map", () => {
    const input = draft(
      JSON.stringify({ "1": { class_type: "CLIPTextEncode", inputs: { text: "a cat" } } }),
    );

    expect(() => build_provider_request(input, REQUEST_ID, ANCHOR)).toThrowError(
      WorkflowMappingError,
    );
  });
});
