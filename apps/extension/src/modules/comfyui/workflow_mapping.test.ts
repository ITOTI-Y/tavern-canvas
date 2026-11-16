import { describe, expect, it } from "vitest";

import {
  detect_workflow_mapping,
  parse_workflow,
  read_mapped_workflow,
  request_loras,
  request_placeholder_values,
  to_adapter_workflow,
  WorkflowFormatError,
  WorkflowMappingError,
} from "./workflow_mapping.js";

/** A prompt converter sits between each prompt text and its encoder, as in a NovelAI-syntax workflow. */
const WORKFLOW = {
  "1": { class_type: "UNETLoader", inputs: { unet_name: "anima.safetensors" } },
  "2": { class_type: "CLIPLoader", inputs: { clip_name: "qwen.safetensors" } },
  "3": { class_type: "VAELoader", inputs: { vae_name: "qwen_vae.safetensors" } },
  "4": { class_type: "PromptConverter", inputs: { text: "1girl" } },
  "5": { class_type: "PromptConverter", inputs: { text: "worst quality" } },
  "6": { class_type: "CLIPTextEncode", inputs: { text: ["4", 0], clip: ["2", 0] } },
  "7": { class_type: "CLIPTextEncode", inputs: { text: ["5", 0], clip: ["2", 0] } },
  "8": { class_type: "EmptyLatentImage", inputs: { width: 832, height: 1216, batch_size: 1 } },
  "9": {
    class_type: "KSampler",
    inputs: {
      seed: 5,
      steps: 8,
      cfg: 1.5,
      sampler_name: "euler",
      scheduler: "simple",
      model: ["1", 0],
      positive: ["6", 0],
      negative: ["7", 0],
      latent_image: ["8", 0],
    },
  },
  "10": { class_type: "VAEDecode", inputs: { samples: ["9", 0], vae: ["3", 0] } },
  "11": { class_type: "PreviewImage", inputs: { images: ["10", 0] } },
};
const TEXT = JSON.stringify(WORKFLOW);
const DETECTED = {
  inputs: {
    prompt: { node_id: "4", property: "text" },
    negative_prompt: { node_id: "5", property: "text" },
    seed: { node_id: "9", property: "seed" },
    steps: { node_id: "9", property: "steps" },
    cfg: { node_id: "9", property: "cfg" },
    sampler_name: { node_id: "9", property: "sampler_name" },
    scheduler: { node_id: "9", property: "scheduler" },
    width: { node_id: "8", property: "width" },
    height: { node_id: "8", property: "height" },
    output_count: { node_id: "8", property: "batch_size" },
    model: { node_id: "1", property: "unet_name" },
    text_encoder: { node_id: "2", property: "clip_name" },
    vae: { node_id: "3", property: "vae_name" },
  },
  output_node_ids: ["11"],
  lora_model: { node_id: "9", property: "model" },
};

describe("parse_workflow", () => {
  it("names the editor's save format, which has no node inputs to write to", () => {
    expect(() => parse_workflow(JSON.stringify({ nodes: [], links: [] }))).toThrowError(
      new WorkflowFormatError("not_api_format"),
    );
    expect(() => parse_workflow("{")).toThrowError(new WorkflowFormatError("not_json"));
  });
});

describe("detect_workflow_mapping", () => {
  it("follows the sampler's links to the prompt texts, the canvas and the model file", () => {
    expect(detect_workflow_mapping(parse_workflow(TEXT))).toEqual(DETECTED);
  });

  it("maps nothing but the output when no node has both prompt links", () => {
    expect(
      detect_workflow_mapping({
        "1": { class_type: "CLIPTextEncode", inputs: { text: "a cat" } },
        "2": { class_type: "SaveImage", inputs: { images: ["1", 0] } },
      }),
    ).toEqual({ inputs: {}, output_node_ids: ["2"] });
  });
});

describe("read_mapped_workflow", () => {
  it("detects the mapping of a record saved without one", () => {
    expect(read_mapped_workflow({ workflow_json: TEXT }).mapping).toEqual(DETECTED);
  });

  it("keeps a stored mapping and drops the entries the JSON no longer has", () => {
    const stored = {
      inputs: {
        prompt: { node_id: "5", property: "text" },
        seed: { node_id: "99", property: "seed" },
        steps: { node_id: "9", property: "sampler_name" },
        output_count: { node_id: "8", property: "batch_size" },
      },
      output_node_ids: ["10", "42"],
      lora_model: { node_id: "9", property: "steps" },
    };

    expect(
      read_mapped_workflow({ workflow_json: TEXT, node_map: JSON.stringify(stored) }).mapping,
    ).toEqual({
      inputs: {
        prompt: { node_id: "5", property: "text" },
        output_count: { node_id: "8", property: "batch_size" },
      },
      output_node_ids: ["10"],
    });
  });
});

describe("to_adapter_workflow", () => {
  it("empties the exported negative prompt and binds every other mapped value as a placeholder", () => {
    const adapted = to_adapter_workflow("w", read_mapped_workflow({ workflow_json: TEXT })) as {
      workflow: typeof WORKFLOW;
      bindings: Record<string, unknown>;
    };

    expect(adapted.workflow["5"].inputs.text).toBe("");
    expect(adapted.workflow["4"].inputs.text).toBe("1girl");
    expect(adapted.bindings).toEqual({
      prompt: DETECTED.inputs.prompt,
      negative_prompt: DETECTED.inputs.negative_prompt,
      seed: DETECTED.inputs.seed,
      output_count: DETECTED.inputs.output_count,
      lora_model: DETECTED.lora_model,
      placeholders: {
        width: { ...DETECTED.inputs.width, value_type: "number" },
        height: { ...DETECTED.inputs.height, value_type: "number" },
        steps: { ...DETECTED.inputs.steps, value_type: "number" },
        cfg: { ...DETECTED.inputs.cfg, value_type: "number" },
        sampler_name: { ...DETECTED.inputs.sampler_name, value_type: "string" },
        scheduler: { ...DETECTED.inputs.scheduler, value_type: "string" },
        model: { ...DETECTED.inputs.model, value_type: "string" },
        text_encoder: { ...DETECTED.inputs.text_encoder, value_type: "string" },
        vae: { ...DETECTED.inputs.vae, value_type: "string" },
      },
      input_assets: {},
    });
  });

  it("names what a workflow still has to map", () => {
    const mapped = read_mapped_workflow({
      workflow_json: JSON.stringify({
        "1": { class_type: "CLIPTextEncode", inputs: { text: "a cat" } },
      }),
    });

    expect(() => to_adapter_workflow("w", mapped)).toThrowError(
      new WorkflowMappingError(["prompt", "output_count", "output"]),
    );
  });
});

describe("request_placeholder_values", () => {
  it("starts the canvas from the workflow and sets the profile's defaults over mapped targets only", () => {
    const mapped = read_mapped_workflow({
      workflow_json: TEXT,
      node_map: JSON.stringify({
        inputs: { ...DETECTED.inputs, scheduler: undefined },
        output_node_ids: ["11"],
      }),
    });

    expect(
      request_placeholder_values(mapped, {
        steps: 12,
        scheduler: "karras",
        model: "b.safetensors",
      }),
    ).toEqual({ width: 832, height: 1216, steps: 12, model: "b.safetensors" });
  });
});

describe("request_loras", () => {
  it("starts from the profile's LoRAs when the workflow maps a model input", () => {
    const mapped = read_mapped_workflow({ workflow_json: TEXT });
    const loras = [{ lora_name: "style.safetensors", strength: 0.8 }];

    expect(request_loras(mapped, { loras })).toEqual(loras);
    expect(request_loras(mapped, {})).toEqual([]);
  });

  it("is undefined when the workflow has no model input to chain LoRAs into", () => {
    const { lora_model: _unmapped, ...mapping } = DETECTED;
    const mapped = read_mapped_workflow({ workflow_json: TEXT, node_map: JSON.stringify(mapping) });

    expect(
      request_loras(mapped, { loras: [{ lora_name: "style.safetensors", strength: 1 }] }),
    ).toBeUndefined();
  });
});
