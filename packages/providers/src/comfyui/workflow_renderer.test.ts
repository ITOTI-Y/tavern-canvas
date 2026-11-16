import { readFile } from "node:fs/promises";

import { describe, expect, it } from "vitest";

import { ProviderAdapterError } from "../provider_error.js";
import { render_comfyui_workflow, validate_stored_comfyui_workflow } from "./workflow_renderer.js";

const stored_fixture = await read_json_fixture(
  "../../../../tests/fixtures/providers/comfyui/stored_workflow.json",
);

describe("validate_stored_comfyui_workflow", () => {
  it("accepts a bounded plain API workflow", () => {
    const stored = validate_stored_comfyui_workflow(stored_fixture);
    expect(Object.keys(stored.workflow)).toHaveLength(6);
  });

  it("rejects non-object, excess-node, and excess-depth workflows", () => {
    expect(() => validate_stored_comfyui_workflow([])).toThrow(ProviderAdapterError);
    expect(() =>
      validate_stored_comfyui_workflow({
        workflow_id: "33333333-3333-4333-8333-333333333333",
        workflow: Object.fromEntries(
          Array.from({ length: 501 }, (_, index) => [
            String(index),
            { class_type: "Fixture", inputs: {} },
          ]),
        ),
        bindings: { prompt: { node_id: "0", property: "text" } },
      }),
    ).toThrow(ProviderAdapterError);

    let nested: unknown = "value";
    for (let depth = 0; depth < 18; depth += 1) {
      nested = { child: nested };
    }
    expect(() =>
      validate_stored_comfyui_workflow({
        workflow_id: "33333333-3333-4333-8333-333333333333",
        workflow: { "1": { class_type: "Fixture", inputs: { nested } } },
        bindings: { prompt: { node_id: "1", property: "text" } },
      }),
    ).toThrow(ProviderAdapterError);
  });
});

describe("render_comfyui_workflow", () => {
  it("replaces only declared typed placeholders and built-in bindings", () => {
    const stored = validate_stored_comfyui_workflow(stored_fixture);
    const rendered = render_comfyui_workflow(stored, {
      prompt: "rendered prompt",
      negative_prompt: "rendered negative",
      seed: 42,
      output_count: 2,
      placeholder_values: { cfg: 5.5, style_path: "styles/portrait/a" },
      input_asset_names: { reference_image: "tavern/reference.png" },
    });

    expect(rendered).toMatchObject({
      "3": { inputs: { seed: 42, cfg: 5.5 } },
      "5": { inputs: { batch_size: 2 } },
      "6": { inputs: { text: "rendered prompt" } },
      "7": { inputs: { text: "rendered negative" } },
      "8": { inputs: { image: "tavern/reference.png" } },
      "9": { inputs: { filename_prefix: "styles/portrait/a" } },
    });
    expect(JSON.stringify(rendered)).not.toContain("reference_image");
  });

  it("assigns slash-containing strings without textual JSON replacement", () => {
    const stored = validate_stored_comfyui_workflow(stored_fixture);
    const slash_value = 'folder/a/b/"quoted"';
    const rendered = render_comfyui_workflow(stored, {
      prompt: "fixture prompt",
      output_count: 1,
      placeholder_values: { style_path: slash_value },
      input_asset_names: {},
    });

    expect(rendered["9"]?.inputs.filename_prefix).toBe(slash_value);
  });

  it("rejects undeclared, mistyped, and missing-target placeholders", () => {
    const stored = validate_stored_comfyui_workflow(stored_fixture);
    expect(() =>
      render_comfyui_workflow(stored, {
        prompt: "fixture prompt",
        output_count: 1,
        placeholder_values: { arbitrary: true },
        input_asset_names: {},
      }),
    ).toThrow(ProviderAdapterError);
    expect(() =>
      render_comfyui_workflow(stored, {
        prompt: "fixture prompt",
        output_count: 1,
        placeholder_values: { cfg: "not-a-number" },
        input_asset_names: {},
      }),
    ).toThrow(ProviderAdapterError);

    const invalid_target = structuredClone(stored_fixture) as Record<string, unknown>;
    const bindings = (invalid_target.bindings ?? {}) as Record<string, unknown>;
    bindings.placeholders = {
      missing: { node_id: "404", property: "value", value_type: "string" },
    };
    const invalid_stored = validate_stored_comfyui_workflow(invalid_target);
    expect(() =>
      render_comfyui_workflow(invalid_stored, {
        prompt: "fixture prompt",
        output_count: 1,
        placeholder_values: { missing: "value" },
        input_asset_names: {},
      }),
    ).toThrow(ProviderAdapterError);
  });

  it("chains one model-only loader per LoRA in front of the bound model input", () => {
    const stored = validate_stored_comfyui_workflow({
      ...(stored_fixture as Record<string, unknown>),
      bindings: {
        ...(stored_fixture as { bindings: Record<string, unknown> }).bindings,
        lora_model: { node_id: "3", property: "model" },
      },
    });
    const rendered = render_comfyui_workflow(stored, {
      prompt: "fixture prompt",
      output_count: 1,
      placeholder_values: {},
      input_asset_names: {},
      loras: [
        { lora_name: "style.safetensors", strength: 0.8 },
        { lora_name: "character/alice.safetensors", strength: 1 },
      ],
    });

    expect(rendered.tavern_canvas_lora_0).toEqual({
      class_type: "LoraLoaderModelOnly",
      inputs: { model: ["4", 0], lora_name: "style.safetensors", strength_model: 0.8 },
    });
    expect(rendered.tavern_canvas_lora_1).toEqual({
      class_type: "LoraLoaderModelOnly",
      inputs: {
        model: ["tavern_canvas_lora_0", 0],
        lora_name: "character/alice.safetensors",
        strength_model: 1,
      },
    });
    expect(rendered["3"]?.inputs.model).toEqual(["tavern_canvas_lora_1", 0]);
    expect(rendered["6"]?.inputs.clip).toEqual(["4", 1]);
  });

  it("keeps the loader nodes a workflow exported from a rendered run already has", () => {
    const fixture = stored_fixture as {
      workflow: Record<string, { inputs: Record<string, unknown> }>;
      bindings: Record<string, unknown>;
    };
    const exported = {
      class_type: "LoraLoaderModelOnly",
      inputs: { model: ["4", 0], lora_name: "turbo.safetensors", strength_model: 1 },
    };
    const stored = validate_stored_comfyui_workflow({
      ...fixture,
      workflow: {
        ...fixture.workflow,
        "3": {
          ...fixture.workflow["3"],
          inputs: { ...fixture.workflow["3"]?.inputs, model: ["tavern_canvas_lora_0", 0] },
        },
        tavern_canvas_lora_0: exported,
      },
      bindings: { ...fixture.bindings, lora_model: { node_id: "3", property: "model" } },
    });
    const rendered = render_comfyui_workflow(stored, {
      prompt: "fixture prompt",
      output_count: 1,
      placeholder_values: {},
      input_asset_names: {},
      loras: [{ lora_name: "style.safetensors", strength: 0.8 }],
    });

    expect(rendered.tavern_canvas_lora_0).toEqual(exported);
    expect(rendered.tavern_canvas_lora_1).toEqual({
      class_type: "LoraLoaderModelOnly",
      inputs: {
        model: ["tavern_canvas_lora_0", 0],
        lora_name: "style.safetensors",
        strength_model: 0.8,
      },
    });
    expect(rendered["3"]?.inputs.model).toEqual(["tavern_canvas_lora_1", 0]);
  });

  it("rejects LoRAs for a workflow that binds no model input", () => {
    const stored = validate_stored_comfyui_workflow(stored_fixture);

    expect(() =>
      render_comfyui_workflow(stored, {
        prompt: "fixture prompt",
        output_count: 1,
        placeholder_values: {},
        input_asset_names: {},
        loras: [{ lora_name: "style.safetensors", strength: 1 }],
      }),
    ).toThrow(ProviderAdapterError);
  });

  it("never mutates the stored workflow", () => {
    const stored = validate_stored_comfyui_workflow(stored_fixture);
    const before = structuredClone(stored);
    render_comfyui_workflow(stored, {
      prompt: "changed",
      negative_prompt: "changed",
      seed: 99,
      output_count: 4,
      placeholder_values: { cfg: 3 },
      input_asset_names: { reference_image: "changed.png" },
    });
    expect(stored).toEqual(before);
  });
});

async function read_json_fixture(relative_path: string): Promise<unknown> {
  const text = await readFile(new URL(relative_path, import.meta.url), "utf8");
  return JSON.parse(text) as unknown;
}
