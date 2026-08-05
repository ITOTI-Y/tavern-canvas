// @vitest-environment node

import { createHash, randomUUID } from "node:crypto";
import { createServer, type Server } from "node:http";
import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { AssetRepository } from "../persistence/asset_repository.js";
import { open_gateway_database } from "../persistence/database.js";
import { JobRepository } from "../persistence/job_repository.js";
import { load_gateway_config } from "../config/load_config.js";
import { AssetStore } from "../assets/asset_store.js";
import { create_app, type GatewayApplication } from "./create_app.js";
import type { GatewayAdapter } from "../jobs/job_worker.js";
import { describe, expect, it } from "vitest";

const TOKEN = "gateway-test-token";
const PNG_BYTES = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
  "base64",
);

interface TestGateway {
  readonly app: GatewayApplication;
  readonly server: Server;
  readonly base_url: string;
  readonly close: () => Promise<void>;
}

async function create_test_gateway(): Promise<TestGateway> {
  const directory = await mkdtemp(path.join(os.tmpdir(), "tavern-gateway-api-"));
  const token_hash = createHash("sha256").update(TOKEN).digest("hex");
  const config = load_gateway_config({
    cwd: directory,
    env: {
      TAVERN_CANVAS_BIND_HOST: "127.0.0.1",
      TAVERN_CANVAS_BIND_PORT: "8787",
      TAVERN_CANVAS_CORS_ORIGINS: JSON.stringify(["https://app.example"]),
      TAVERN_CANVAS_BEARER_TOKEN_HASHES: JSON.stringify([token_hash]),
      TAVERN_CANVAS_DATA_DIR: directory,
      TAVERN_CANVAS_CONCURRENCY: "1",
      TAVERN_CANVAS_MAX_REQUEST_BYTES: "2000000",
      TAVERN_CANVAS_MAX_IMAGE_BYTES: "20000000",
      TAVERN_CANVAS_MAX_IMAGE_PIXELS: "40000000",
      TAVERN_CANVAS_MAX_IMAGE_DIMENSION: "8192",
      TAVERN_CANVAS_PROVIDER_PROFILES: JSON.stringify([
        {
          provider_id: "openai_image",
          base_url: "https://api.example.com",
          credential: "test-provider-secret",
          profile: {
            profile_id: "openai-test",
            provider_id: "openai_image",
            model_allowlist: ["gpt-image-1"],
            output_mime_type_allowlist: ["image/png"],
            remote_asset_origin_allowlist: [],
            max_response_bytes: 20_000_000,
            max_input_asset_bytes: 20_000_000,
          },
        },
      ]),
    },
  });
  const database = open_gateway_database({
    file_path: path.join(directory, "tavern_canvas.sqlite"),
  });
  const asset_repository = new AssetRepository(database.connection);
  const asset_store = new AssetStore({
    data_directory: directory,
    asset_repository,
    ...config.limits,
  });
  const job_repository = new JobRepository(database.connection);
  const generated_asset = {
    asset_id: "33333333-3333-4333-8333-333333333333",
    media_type: "image/png" as const,
    byte_length: PNG_BYTES.byteLength,
    sha256: createHash("sha256").update(PNG_BYTES).digest("hex"),
  };
  const adapter = {
    provider_id: "openai_image" as const,
    capabilities: new Set(["text_to_image"] as const),
    validate_profile: (profile: unknown) => profile as never,
    submit: async () => ({
      state: "completed" as const,
      result: {
        request_id: "11111111-1111-4111-8111-111111111111",
        provider_id: "openai_image" as const,
        assets: [generated_asset],
      },
      output_assets: [{ asset: generated_asset, bytes: PNG_BYTES }],
    }),
    poll: async () => ({ state: "pending" as const }),
    cancel: async () => undefined,
  } as unknown as GatewayAdapter;
  const app = create_app({
    config,
    job_repository,
    asset_repository,
    asset_store,
    adapters: new Map([["openai_image", adapter]]),
  });
  const server = createServer(app);
  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  if (address === null || typeof address === "string") {
    throw new Error("Test server did not expose a loopback address");
  }
  return {
    app,
    server,
    base_url: `http://127.0.0.1:${String(address.port)}`,
    close: async () => {
      await app.gateway.stop();
      await new Promise<void>((resolve, reject) => {
        server.close((error) => (error === undefined ? resolve() : reject(error)));
      });
      database.close();
      await rm(directory, { recursive: true, force: true });
    },
  };
}

function headers(origin = "https://app.example"): Record<string, string> {
  return {
    authorization: `Bearer ${TOKEN}`,
    origin,
  };
}

function create_job_request(request_id = randomUUID()): Record<string, unknown> {
  return {
    protocol_version: "1.0",
    request: {
      provider_id: "openai_image",
      request_id,
      generation_anchor: "b".repeat(64),
      prompt: "synthetic test prompt",
      output_count: 1,
      mode: "generate",
      model_id: "gpt-image-1",
      size: "1024x1024",
      quality: "low",
      background: "opaque",
      output_format: "png",
      input_asset_ids: [],
    },
  };
}

describe("Gateway HTTP API", () => {
  it("serves readiness without auth and protects every versioned route", async () => {
    const gateway = await create_test_gateway();
    try {
      const health = await fetch(`${gateway.base_url}/healthz`);
      expect(health.status).toBe(200);
      const health_body = (await health.json()) as Record<string, unknown>;
      expect(health_body.database).toEqual({ ready: true });

      const capabilities = await fetch(`${gateway.base_url}/v1/capabilities`);
      expect(capabilities.status).toBe(401);
      expect(((await capabilities.json()) as { error: { code: string } }).error.code).toBe(
        "authentication_required",
      );
    } finally {
      await gateway.close();
    }
  });

  it("uses exact-origin CORS and returns protocol capabilities", async () => {
    const gateway = await create_test_gateway();
    try {
      const allowed = await fetch(`${gateway.base_url}/v1/capabilities`, {
        headers: headers(),
      });
      expect(allowed.status).toBe(200);
      expect(allowed.headers.get("access-control-allow-origin")).toBe("https://app.example");
      expect(await allowed.json()).toMatchObject({
        protocol_version: "1.0",
        providers: [{ provider_id: "openai_image", capabilities: ["text_to_image"] }],
      });

      const denied = await fetch(`${gateway.base_url}/v1/capabilities`, {
        headers: headers("https://evil.example"),
      });
      expect(denied.status).toBe(403);
      expect(((await denied.json()) as { error: { code: string } }).error.code).toBe(
        "cors_origin_denied",
      );
    } finally {
      await gateway.close();
    }
  });

  it("is idempotent by request ID and exposes normalized state only", async () => {
    const gateway = await create_test_gateway();
    try {
      const body = JSON.stringify(create_job_request("11111111-1111-4111-8111-111111111111"));
      const first = await fetch(`${gateway.base_url}/v1/jobs`, {
        method: "POST",
        headers: { ...headers(), "content-type": "application/json" },
        body,
      });
      const second = await fetch(`${gateway.base_url}/v1/jobs`, {
        method: "POST",
        headers: { ...headers(), "content-type": "application/json" },
        body,
      });
      expect(first.status).toBe(202);
      expect(second.status).toBe(202);
      const first_body = (await first.json()) as { job_id: string };
      const second_body = (await second.json()) as { job_id: string };
      expect(second_body.job_id).toBe(first_body.job_id);

      const status = await fetch(`${gateway.base_url}/v1/jobs/${first_body.job_id}`, {
        headers: headers(),
      });
      const status_body = (await status.json()) as Record<string, unknown>;
      expect(status.status).toBe(200);
      expect(status_body).not.toHaveProperty("request");
      expect(status_body).not.toHaveProperty("submission");
      expect(["queued", "preparing", "submitting", "completed"]).toContain(status_body.state);
    } finally {
      await gateway.close();
    }
  });

  it("accepts canonical uploads, deduplicates them, and rejects mismatched bytes", async () => {
    const gateway = await create_test_gateway();
    try {
      const upload = (): Promise<Response> =>
        fetch(`${gateway.base_url}/v1/assets`, {
          method: "POST",
          headers: { ...headers(), "content-type": "image/png" },
          body: PNG_BYTES,
        });
      const first = await upload();
      const second = await upload();
      expect(first.status).toBe(201);
      expect(second.status).toBe(201);
      const first_body = (await first.json()) as { asset_id: string; sha256: string };
      const second_body = (await second.json()) as { asset_id: string; sha256: string };
      expect(second_body).toEqual(expect.objectContaining(first_body));

      const rejected = await fetch(`${gateway.base_url}/v1/assets`, {
        method: "POST",
        headers: { ...headers(), "content-type": "image/png" },
        body: Buffer.from("<svg></svg>"),
      });
      expect(rejected.status).toBe(400);
      expect(((await rejected.json()) as { error: { code: string } }).error.code).toBe(
        "invalid_asset",
      );
    } finally {
      await gateway.close();
    }
  });

  it("makes DELETE idempotent and reports stable request-size errors", async () => {
    const gateway = await create_test_gateway();
    try {
      const created = await fetch(`${gateway.base_url}/v1/jobs`, {
        method: "POST",
        headers: { ...headers(), "content-type": "application/json" },
        body: JSON.stringify(create_job_request()),
      });
      const job_id = ((await created.json()) as { job_id: string }).job_id;
      const first_delete = await fetch(`${gateway.base_url}/v1/jobs/${job_id}`, {
        method: "DELETE",
        headers: headers(),
      });
      const second_delete = await fetch(`${gateway.base_url}/v1/jobs/${job_id}`, {
        method: "DELETE",
        headers: headers(),
      });
      expect(first_delete.status).toBe(204);
      expect(second_delete.status).toBe(204);

      const oversized = await fetch(`${gateway.base_url}/v1/jobs`, {
        method: "POST",
        headers: { ...headers(), "content-type": "application/json" },
        body: JSON.stringify({ value: "x".repeat(2_100_000) }),
      });
      expect(oversized.status).toBe(413);
    } finally {
      await gateway.close();
    }
  });
});
