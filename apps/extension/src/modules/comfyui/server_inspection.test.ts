import { describe, expect, it } from "vitest";

import { inspect_comfyui_server, type ComfyUiGet } from "./server_inspection.js";
import { read_mapped_workflow } from "./workflow_mapping.js";

const MAPPED = read_mapped_workflow({
  workflow_json: JSON.stringify({
    "1": { class_type: "UNETLoader", inputs: { unet_name: "gone.safetensors" } },
    "2": { class_type: "CustomPrompt", inputs: { text: "1girl" } },
    "3": { class_type: "CustomPrompt", inputs: { text: "blurry" } },
    "4": { class_type: "EmptyLatentImage", inputs: { width: 832, height: 1216, batch_size: 1 } },
    "5": {
      class_type: "KSampler",
      inputs: {
        seed: 1,
        sampler_name: "euler",
        scheduler: "simple",
        model: ["1", 0],
        positive: ["2", 0],
        negative: ["3", 0],
        latent_image: ["4", 0],
      },
    },
    "6": { class_type: "SaveImage", inputs: { images: ["5", 0] } },
  }),
});

/** `/object_info/<class>` answers `{}` for a class the server has not installed. */
const OBJECT_INFO: Record<string, unknown> = {
  UNETLoader: { input: { required: { unet_name: [["a.safetensors", "b.safetensors"]] } } },
  EmptyLatentImage: { input: { required: { width: ["INT", {}] } } },
  KSampler: {
    input: {
      required: {
        sampler_name: ["COMBO", { options: ["euler", "dpmpp_2m"] }],
        scheduler: [["simple", "karras"]],
      },
    },
  },
  SaveImage: { input: { required: {}, optional: {} } },
};

const get: ComfyUiGet = (route) => {
  if (route === "/system_stats") {
    return Promise.resolve({ system: { comfyui_version: "0.45.3" } });
  }
  if (route === "/models/loras") {
    return Promise.resolve(["style.safetensors", "character/alice.safetensors"]);
  }
  const class_type = decodeURIComponent(route.replace("/object_info/", ""));
  const info = OBJECT_INFO[class_type];
  return Promise.resolve(info === undefined ? {} : { [class_type]: info });
};

describe("inspect_comfyui_server", () => {
  it("reports the version alone when no workflow is chosen", async () => {
    await expect(inspect_comfyui_server(get, null)).resolves.toEqual({
      version: "0.45.3",
      options: { sampler_name: [], scheduler: [], model: [], text_encoder: [], vae: [] },
      lora_names: ["style.safetensors", "character/alice.safetensors"],
      missing_node_types: [],
      missing_values: [],
    });
  });

  it("lists the server's choices and what the workflow needs that the server lacks", async () => {
    await expect(inspect_comfyui_server(get, MAPPED)).resolves.toEqual({
      version: "0.45.3",
      options: {
        sampler_name: ["euler", "dpmpp_2m"],
        scheduler: ["simple", "karras"],
        model: ["a.safetensors", "b.safetensors"],
        text_encoder: [],
        vae: [],
      },
      lora_names: ["style.safetensors", "character/alice.safetensors"],
      missing_node_types: ["CustomPrompt"],
      missing_values: [
        {
          node_id: "1",
          class_type: "UNETLoader",
          property: "unet_name",
          value: "gone.safetensors",
        },
      ],
    });
  });

  it("rejects when the server cannot be reached", async () => {
    await expect(
      inspect_comfyui_server(() => Promise.reject(new Error("offline")), MAPPED),
    ).rejects.toThrowError("offline");
  });
});
