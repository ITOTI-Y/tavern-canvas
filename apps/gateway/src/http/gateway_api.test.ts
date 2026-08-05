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
import { z } from "zod";

const TOKEN = "gateway-test-token";
const SECOND_TOKEN = "gateway-second-test-token";
const PNG_BYTES = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
  "base64",
);
const GatewayHealthBodySchema = z.object({
  database: z.object({ ready: z.boolean() }),
});
const GatewayErrorBodySchema = z.object({
  protocol_version: z.literal("1.0"),
  error: z.object({
    code: z.string(),
    retryable: z.boolean(),
    correlation_id: z.uuid(),
  }),
});
const GatewayJobBodySchema = z
  .object({
    job_id: z.uuid(),
    state: z.string().optional(),
  })
  .passthrough();
const GatewayAssetBodySchema = z.object({
  asset_id: z.uuid(),
  sha256: z.string().regex(/^[a-f0-9]{64}$/u),
});

interface TestGateway {
  readonly app: GatewayApplication;
  readonly server: Server;
  readonly base_url: string;
  readonly close: () => Promise<void>;
}

async function create_test_gateway(): Promise<TestGateway> {
  const directory = await mkdtemp(path.join(os.tmpdir(), "tavern-gateway-api-"));
  const token_hash = createHash("sha256").update(TOKEN).digest("hex");
  const second_token_hash = createHash("sha256").update(SECOND_TOKEN).digest("hex");
  const config = load_gateway_config({
    cwd: directory,
    env: {
      TAVERN_CANVAS_BIND_HOST: "127.0.0.1",
      TAVERN_CANVAS_BIND_PORT: "8787",
      TAVERN_CANVAS_CORS_ORIGINS: JSON.stringify(["https://app.example"]),
      TAVERN_CANVAS_BEARER_TOKEN_HASHES: JSON.stringify([token_hash, second_token_hash]),
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

function headers(origin = "https://app.example", token = TOKEN): Record<string, string> {
  return {
    authorization: `Bearer ${token}`,
    origin,
  };
}

function create_job_request(request_id = randomUUID()): {
  readonly protocol_version: "1.0";
  readonly request: Record<string, unknown>;
} {
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
      const health_body = GatewayHealthBodySchema.parse(await health.json());
      expect(health_body.database).toEqual({ ready: true });

      const capabilities = await fetch(`${gateway.base_url}/v1/capabilities`);
      expect(capabilities.status).toBe(401);
      expect(GatewayErrorBodySchema.parse(await capabilities.json()).error.code).toBe(
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
        limits: {
          max_concurrency: 1,
          max_image_count: 4,
          max_request_bytes: 2_000_000,
        },
      });
      const allowed_preflight = await fetch(`${gateway.base_url}/v1/capabilities`, {
        method: "OPTIONS",
        headers: {
          origin: "https://app.example",
          "access-control-request-method": "GET",
        },
      });
      expect(allowed_preflight.status).toBe(204);
      expect(allowed_preflight.headers.get("access-control-allow-origin")).toBe(
        "https://app.example",
      );
      expect(allowed_preflight.headers.get("access-control-allow-methods")).toBe(
        "GET,POST,DELETE,OPTIONS",
      );

      const denied_preflight = await fetch(`${gateway.base_url}/v1/capabilities`, {
        method: "OPTIONS",
        headers: {
          origin: "https://evil.example",
          "access-control-request-method": "GET",
        },
      });
      expect(denied_preflight.status).toBe(403);
      expect(GatewayErrorBodySchema.parse(await denied_preflight.json()).error.code).toBe(
        "cors_origin_denied",
      );

      const denied = await fetch(`${gateway.base_url}/v1/capabilities`, {
        headers: headers("https://evil.example"),
      });
      expect(denied.status).toBe(403);
      expect(GatewayErrorBodySchema.parse(await denied.json()).error.code).toBe(
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
      const first_body = GatewayJobBodySchema.parse(await first.json());
      const second_body = GatewayJobBodySchema.parse(await second.json());
      expect(second_body.job_id).toBe(first_body.job_id);

      const status = await fetch(`${gateway.base_url}/v1/jobs/${first_body.job_id}`, {
        headers: headers(),
      });
      const status_body = GatewayJobBodySchema.parse(await status.json());
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
      const first_body = GatewayAssetBodySchema.parse(await first.json());
      const second_body = GatewayAssetBodySchema.parse(await second.json());
      expect(second_body).toEqual(expect.objectContaining(first_body));

      const rejected = await fetch(`${gateway.base_url}/v1/assets`, {
        method: "POST",
        headers: { ...headers(), "content-type": "image/png" },
        body: Buffer.from("<svg></svg>"),
      });
      expect(rejected.status).toBe(400);
      expect(GatewayErrorBodySchema.parse(await rejected.json()).error.code).toBe("invalid_asset");
    } finally {
      await gateway.close();
    }
  });

  it("rejects upload path fragments and multipart file collections", async () => {
    const gateway = await create_test_gateway();
    try {
      const multipart_body = Buffer.from(
        [
          "--files",
          'Content-Disposition: form-data; name="files"; filename="first.png"',
          "Content-Type: image/png",
          "",
          PNG_BYTES.toString("base64"),
          "--files",
          'Content-Disposition: form-data; name="files"; filename="second.png"',
          "Content-Type: image/png",
          "",
          PNG_BYTES.toString("base64"),
          "--files--",
          "",
        ].join("\r\n"),
      );
      const responses = await Promise.all([
        fetch(`${gateway.base_url}/v1/assets?path=../asset.png`, {
          method: "POST",
          headers: { ...headers(), "content-type": "image/png" },
          body: PNG_BYTES,
        }),
        fetch(`${gateway.base_url}/v1/assets`, {
          method: "POST",
          headers: {
            ...headers(),
            "content-type": "image/png",
            "content-disposition": 'attachment; filename="../asset.png"',
          },
          body: PNG_BYTES,
        }),
        fetch(`${gateway.base_url}/v1/assets`, {
          method: "POST",
          headers: {
            ...headers(),
            "content-type": "multipart/form-data; boundary=files",
          },
          body: multipart_body,
        }),
      ]);

      for (const response of responses) {
        expect(response.status).toBe(400);
        expect(GatewayErrorBodySchema.parse(await response.json()).error.code).toBe(
          "invalid_asset",
        );
      }
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
      const job_id = GatewayJobBodySchema.parse(await created.json()).job_id;
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
  it("rejects missing and invalid bearer tokens before route lookup", async () => {
    const gateway = await create_test_gateway();
    try {
      const routes: Array<{ readonly path: string; readonly init: RequestInit }> = [
        { path: "/v1/capabilities", init: { method: "GET", headers: {} } },
        {
          path: "/v1/assets",
          init: {
            method: "POST",
            headers: { "content-type": "image/png" },
            body: PNG_BYTES,
          },
        },
        {
          path: "/v1/jobs",
          init: {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: "{",
          },
        },
        { path: "/v1/jobs/not-a-uuid", init: { method: "GET", headers: {} } },
        { path: "/v1/jobs/not-a-uuid", init: { method: "DELETE", headers: {} } },
        {
          path: "/v1/jobs/not-a-uuid/events",
          init: { method: "GET", headers: {} },
        },
      ];
      for (const route of routes) {
        for (const authorization of [undefined, "Bearer invalid-gateway-token"]) {
          const request_headers = new Headers(route.init.headers);
          if (authorization !== undefined) {
            request_headers.set("authorization", authorization);
          }
          const response = await fetch(`${gateway.base_url}${route.path}`, {
            ...route.init,
            headers: request_headers,
          });
          expect(response.status).toBe(authorization === undefined ? 401 : 403);
          expect(GatewayErrorBodySchema.parse(await response.json()).error.code).toBe(
            authorization === undefined ? "authentication_required" : "authentication_failed",
          );
        }
      }
    } finally {
      await gateway.close();
    }
  });

  it("rejects unknown providers, disallowed models, and client overrides", async () => {
    const gateway = await create_test_gateway();
    try {
      const base = create_job_request();
      const cases: Array<[string, Record<string, unknown>]> = [
        [
          "unknown provider",
          {
            ...base,
            request: { ...base.request, provider_id: "unknown_provider" },
          },
        ],
        [
          "disallowed model",
          {
            ...base,
            request: { ...base.request, model_id: "gpt-image-1-mini" },
          },
        ],
        [
          "provider URL override",
          {
            ...base,
            request: { ...base.request, provider_url: "https://client.example" },
          },
        ],
        [
          "headers override",
          {
            ...base,
            request: { ...base.request, headers: { authorization: "client-secret" } },
          },
        ],
        [
          "credential override",
          {
            ...base,
            request: { ...base.request, credential: "client-secret" },
          },
        ],
      ];
      for (const [label, body] of cases) {
        const response = await fetch(`${gateway.base_url}/v1/jobs`, {
          method: "POST",
          headers: { ...headers(), "content-type": "application/json" },
          body: JSON.stringify(body),
        });
        expect(response.status, label).toBe(400);
        expect(GatewayErrorBodySchema.parse(await response.json()).error.code, label).toBe(
          "invalid_request",
        );
      }
    } finally {
      await gateway.close();
    }
  });

  it("normalizes GET state after an SSE client disconnects", async () => {
    const gateway = await create_test_gateway();
    try {
      const created = gateway.app.gateway.service.create_job(create_job_request());
      const events = await fetch(`${gateway.base_url}/v1/jobs/${created.job.job_id}/events`, {
        headers: headers(),
      });
      expect(events.status).toBe(200);
      if (events.body === null) {
        throw new Error("SSE response did not expose a body");
      }
      await events.body.cancel();
      const deadline = Date.now() + 1_000;
      while (gateway.app.gateway.sse_connections.active_connections !== 0) {
        if (Date.now() >= deadline) {
          throw new Error("SSE connection did not close before the deadline");
        }
        await new Promise<void>((resolve) => setImmediate(resolve));
      }

      const status = await fetch(`${gateway.base_url}/v1/jobs/${created.job.job_id}`, {
        headers: headers(),
      });
      const body = GatewayJobBodySchema.parse(await status.json());
      expect(status.status).toBe(200);
      expect(body).toEqual(
        expect.objectContaining({
          protocol_version: "1.0",
          job_id: created.job.job_id,
          request_id: created.job.request_id,
          provider_id: "openai_image",
        }),
      );
      expect([
        "queued",
        "preparing",
        "submitting",
        "running",
        "completed",
        "failed",
        "cancelled",
        "attached",
        "orphaned",
      ]).toContain(body.state);
      expect(body).not.toHaveProperty("request");
      expect(body).not.toHaveProperty("submission");
    } finally {
      await gateway.close();
    }
  });

  it("rate-limits each bearer token independently and returns stable errors", async () => {
    const gateway = await create_test_gateway();
    try {
      const sensitive_prompt = "sensitive-prompt-value";
      const sensitive_secret = "sensitive-secret-value";
      const echoed_request_id = randomUUID();
      const malformed = create_job_request();
      const first_error = await fetch(`${gateway.base_url}/v1/jobs`, {
        method: "POST",
        headers: {
          ...headers(),
          "content-type": "application/json",
          "x-request-id": echoed_request_id,
        },
        body: JSON.stringify({
          ...malformed,
          request: {
            ...malformed.request,
            prompt: sensitive_prompt,
            credential: sensitive_secret,
          },
        }),
      });
      expect(first_error.status).toBe(400);
      expect(first_error.headers.get("x-request-id")).toBe(echoed_request_id);
      const first_error_text = await first_error.text();
      expect(first_error_text).not.toContain("stack");
      expect(first_error_text).not.toContain(sensitive_prompt);
      expect(first_error_text).not.toContain(sensitive_secret);

      for (let request_count = 1; request_count < 120; request_count += 1) {
        const accepted = await fetch(`${gateway.base_url}/v1/capabilities`, {
          headers: headers(),
        });
        expect(accepted.status).toBe(200);
        await accepted.arrayBuffer();
      }

      const limited = await fetch(
        `${gateway.base_url}/v1/capabilities?prompt=${sensitive_prompt}&credential=${sensitive_secret}`,
        {
          headers: { ...headers(), "x-request-id": "not-a-uuid" },
        },
      );
      expect(limited.status).toBe(429);
      const limited_text = await limited.text();
      expect(limited_text).not.toContain("stack");
      expect(limited_text).not.toContain(sensitive_prompt);
      expect(limited_text).not.toContain(sensitive_secret);
      const limited_value: unknown = JSON.parse(limited_text);
      const limited_body = GatewayErrorBodySchema.parse(limited_value);
      expect(limited_body).toMatchObject({
        protocol_version: "1.0",
        error: { code: "rate_limited", retryable: true },
      });
      expect(limited_body.error.correlation_id).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu,
      );
      expect(limited.headers.get("x-request-id")).toBe(limited_body.error.correlation_id);
      expect(limited.headers.get("x-request-id")).not.toBe("not-a-uuid");

      const second_token = await fetch(`${gateway.base_url}/v1/capabilities`, {
        headers: headers("https://app.example", SECOND_TOKEN),
      });
      expect(second_token.status).toBe(200);
      await second_token.arrayBuffer();
    } finally {
      await gateway.close();
    }
  });
});
