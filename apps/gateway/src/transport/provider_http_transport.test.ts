import { describe, expect, it } from "vitest";

import type { ProviderTransportOperation } from "@tavern-canvas/providers";

import { GatewayProviderConfigSchema } from "../config/config_schema.js";
import { ProviderHttpTransport } from "./provider_http_transport.js";

const provider = GatewayProviderConfigSchema.parse({
  provider_id: "sd_webui",
  base_url: "http://127.0.0.1:7860",
  profile: {
    profile_id: "sd-local",
    provider_id: "sd_webui",
    model_allowlist: ["sdxl-base"],
    vae_allowlist: [],
    adetailer_model_allowlist: [],
    controlnet_model_allowlist: [],
    output_mime_type_allowlist: ["image/png"],
    max_response_bytes: 1_024,
  },
});

function body_operation(body: Uint8Array, max_request_bytes: number): ProviderTransportOperation {
  return {
    route: "/sdapi/v1/txt2img",
    method: "POST",
    body,
    max_request_bytes,
    content_type: "application/json",
    max_response_bytes: 1_024,
    signal: new AbortController().signal,
  };
}

describe("ProviderHttpTransport request bounds", () => {
  it("allows a body exactly at max_request_bytes", async () => {
    let fetch_count = 0;
    const transport = new ProviderHttpTransport({
      provider,
      fetcher: async () => {
        fetch_count += 1;
        return new Response(new Uint8Array([111, 107]), { status: 200 });
      },
    });

    const response = await transport.execute(body_operation(new Uint8Array([1, 2, 3]), 3));

    expect(response.status).toBe(200);
    expect(response.body).toEqual(new Uint8Array([111, 107]));
    expect(fetch_count).toBe(1);
  });

  it("rejects an oversized body before calling fetch", async () => {
    let fetch_count = 0;
    const transport = new ProviderHttpTransport({
      provider,
      fetcher: async () => {
        fetch_count += 1;
        return new Response("unexpected", { status: 200 });
      },
    });

    await expect(
      transport.execute(body_operation(new Uint8Array([1, 2, 3, 4]), 3)),
    ).rejects.toThrow();
    expect(fetch_count).toBe(0);
  });

  it.each([0, -1, Number.NaN, Number.POSITIVE_INFINITY, 1.5])(
    "rejects an invalid request limit (%s) before calling fetch",
    async (max_request_bytes) => {
      let fetch_count = 0;
      const transport = new ProviderHttpTransport({
        provider,
        fetcher: async () => {
          fetch_count += 1;
          return new Response("unexpected", { status: 200 });
        },
      });

      await expect(
        transport.execute(body_operation(new Uint8Array([1]), max_request_bytes)),
      ).rejects.toThrow();
      expect(fetch_count).toBe(0);
    },
  );
});
