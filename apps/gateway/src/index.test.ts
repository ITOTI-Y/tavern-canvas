// @vitest-environment node

import { createHash } from "node:crypto";
import { access, mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { ComfyUiAdapter } from "@tavern-canvas/providers";
import { describe, expect, it } from "vitest";

import { type GatewayConfig } from "./config/config_schema.js";
import { load_gateway_config } from "./config/load_config.js";
import {
  create_gateway_runtime,
  GatewayRuntimeConfigurationError,
  type GatewayRuntime,
} from "./index.js";
import type { GatewayAdapter } from "./jobs/job_worker.js";
const TOKEN = "runtime-gateway-token";
const TOKEN_HASH = createHash("sha256").update(TOKEN).digest("hex");
const COMFY_WORKFLOW_ID = "44444444-4444-4444-8444-444444444444";
const PROVIDER_CREDENTIAL = "runtime-provider-secret";

function create_config(directory: string, provider_id: "comfyui" | "openai_image"): GatewayConfig {
  const profile =
    provider_id === "comfyui"
      ? {
          provider_id,
          base_url: "http://127.0.0.1:8188",
          profile: {
            profile_id: "comfy-runtime",
            provider_id,
            model_allowlist: ["checkpoint.safetensors"],
            output_mime_type_allowlist: ["image/png"],
            workflow_allowlist: [COMFY_WORKFLOW_ID],
            max_response_bytes: 20_000_000,
            max_input_asset_bytes: 20_000_000,
          },
        }
      : {
          provider_id,
          base_url: "https://api.example.com",
          credential: PROVIDER_CREDENTIAL,
          profile: {
            profile_id: "openai-runtime",
            provider_id,
            model_allowlist: ["gpt-image-1"],
            output_mime_type_allowlist: ["image/png"],
            remote_asset_origin_allowlist: [],
            max_response_bytes: 20_000_000,
            max_input_asset_bytes: 20_000_000,
          },
        };
  const config = load_gateway_config({
    cwd: directory,
    env: {
      TAVERN_CANVAS_BIND_HOST: "127.0.0.1",
      TAVERN_CANVAS_BIND_PORT: "8787",
      TAVERN_CANVAS_CORS_ORIGINS: JSON.stringify(["https://app.example"]),
      TAVERN_CANVAS_BEARER_TOKEN_HASHES: JSON.stringify([TOKEN_HASH]),
      TAVERN_CANVAS_DATA_DIR: directory,
      TAVERN_CANVAS_CONCURRENCY: "1",
      TAVERN_CANVAS_MAX_REQUEST_BYTES: "2000000",
      TAVERN_CANVAS_MAX_IMAGE_BYTES: "20000000",
      TAVERN_CANVAS_MAX_IMAGE_PIXELS: "40000000",
      TAVERN_CANVAS_MAX_IMAGE_DIMENSION: "8192",
      TAVERN_CANVAS_PROVIDER_PROFILES: JSON.stringify([profile]),
    },
  });
  return { ...config, bind_port: 0 };
}

function gateway_url(runtime: GatewayRuntime): string {
  const address = runtime.server?.address();
  if (address === null || address === undefined || typeof address === "string") {
    throw new Error("Gateway runtime did not expose a TCP address");
  }
  return `http://127.0.0.1:${String(address.port)}`;
}

async function read_capabilities(runtime: GatewayRuntime): Promise<unknown> {
  const response = await fetch(`${gateway_url(runtime)}/v1/capabilities`, {
    headers: {
      authorization: `Bearer ${TOKEN}`,
      origin: "https://app.example",
    },
  });
  expect(response.status).toBe(200);
  return response.json();
}

describe("gateway runtime adapter configuration", () => {
  it("rejects a default ComfyUI profile before opening SQLite", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "tavern-gateway-runtime-"));
    const config = create_config(directory, "comfyui");
    const database_path = path.join(directory, "tavern_canvas.sqlite");

    try {
      let thrown: unknown;
      try {
        create_gateway_runtime({ config, auto_start_worker: false });
      } catch (error: unknown) {
        thrown = error;
      }

      expect(thrown).toBeInstanceOf(GatewayRuntimeConfigurationError);
      expect(thrown).toMatchObject({
        message:
          "Gateway runtime configuration is missing an executable adapter for provider_id=comfyui, profile_id=comfy-runtime",
        name: "GatewayRuntimeConfigurationError",
      });
      expect((thrown as Error).message).not.toContain(PROVIDER_CREDENTIAL);
      await expect(access(database_path)).rejects.toThrow();
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it("starts with the default adapter for an executable profile", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "tavern-gateway-runtime-"));
    const runtime = create_gateway_runtime({
      config: create_config(directory, "openai_image"),
      auto_start_worker: false,
    });

    try {
      await runtime.start();
      expect(await read_capabilities(runtime)).toMatchObject({
        providers: [
          {
            provider_id: "openai_image",
            capabilities: ["reference_image", "text_to_image"],
          },
        ],
      });
    } finally {
      await runtime.stop();
      await rm(directory, { recursive: true, force: true });
    }
  });

  it("accepts an injected ComfyUI adapter and advertises its capabilities", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "tavern-gateway-runtime-"));
    const workflows = new Map([[COMFY_WORKFLOW_ID, { workflow_id: COMFY_WORKFLOW_ID, nodes: {} }]]);
    const adapter = new ComfyUiAdapter({
      workflow_store: {
        load: async (workflow_id) => workflows.get(workflow_id),
      },
    });
    const runtime = create_gateway_runtime({
      config: create_config(directory, "comfyui"),
      adapters: new Map<GatewayAdapter["provider_id"], GatewayAdapter>([["comfyui", adapter]]),
      auto_start_worker: false,
    });

    try {
      await runtime.start();
      expect(await read_capabilities(runtime)).toMatchObject({
        providers: [
          {
            provider_id: "comfyui",
            capabilities: ["cancel", "reference_image", "seed", "text_to_image", "workflow"],
          },
        ],
      });
    } finally {
      await runtime.stop();
      await rm(directory, { recursive: true, force: true });
    }
  });
});
