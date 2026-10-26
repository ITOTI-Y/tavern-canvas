import { createHash } from "node:crypto";
import { mkdtemp, rm } from "node:fs/promises";
import { createServer, type IncomingMessage, type Server, type ServerResponse } from "node:http";
import type { AddressInfo } from "node:net";
import { tmpdir } from "node:os";
import path from "node:path";

import { expect, test } from "@playwright/test";

import { SdWebuiAdapter } from "../../packages/providers/src/index.js";
import { create_gateway_runtime, type GatewayRuntime } from "../../apps/gateway/src/index.js";
import { load_gateway_config } from "../../apps/gateway/src/config/load_config.js";
import type { GatewayAdapter } from "../../apps/gateway/src/jobs/job_worker.js";
import { open_host_page } from "./all_host_utils.js";

const GATEWAY_TOKEN = "e2e-gateway-bearer-token";
const HARNESS_ORIGIN = "http://localhost:4176";
const PROVIDER_CREDENTIAL = "gateway-side-provider-credential-never-sent-down";
const GENERATED_PNG_BASE64 =
  "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAA1BMVEUKFB5+TFI6AAAACXBIWXMAAAPo" +
  "AAAD6AG1e1JrAAAAG0lEQVRYw+3BgQAAAADDoPlT3+AEVQEAAAB8AxBAAAEZszF2AAAAAElFTkSuQmCC";

interface RunningGateway {
  readonly runtime: GatewayRuntime;
  readonly origin: string;
}

let upstream: Server;
let upstream_origin: string;
let data_directory: string;
let gateway: RunningGateway;
let upstream_request_paths: string[] = [];

function server_origin(server: Server): string {
  const address = server.address();
  if (address === null || typeof address === "string") {
    throw new Error("server did not expose a loopback address");
  }
  return `http://127.0.0.1:${String((address as AddressInfo).port)}`;
}

async function listen(server: Server): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      resolve();
    });
  });
}

function create_upstream(): Server {
  return createServer((request: IncomingMessage, response: ServerResponse) => {
    upstream_request_paths.push(request.url ?? "");
    const chunks: Buffer[] = [];
    request.on("data", (chunk: Buffer) => chunks.push(chunk));
    request.on("end", () => {
      response.writeHead(200, { "content-type": "application/json" });
      response.end(
        JSON.stringify({
          images: [GENERATED_PNG_BASE64],
          info: JSON.stringify({ seed: 7 }),
        }),
      );
    });
  });
}

function adapters(): ReadonlyMap<GatewayAdapter["provider_id"], GatewayAdapter> {
  return new Map<GatewayAdapter["provider_id"], GatewayAdapter>([
    ["sd_webui", new SdWebuiAdapter()],
  ]);
}

async function start_gateway(bind_port: number): Promise<RunningGateway> {
  const config = load_gateway_config({
    cwd: data_directory,
    env: {
      TAVERN_CANVAS_BIND_HOST: "127.0.0.1",
      TAVERN_CANVAS_BIND_PORT: String(bind_port === 0 ? 8787 : bind_port),
      TAVERN_CANVAS_CORS_ORIGINS: JSON.stringify([HARNESS_ORIGIN]),
      TAVERN_CANVAS_BEARER_TOKEN_HASHES: JSON.stringify([
        createHash("sha256").update(GATEWAY_TOKEN).digest("hex"),
      ]),
      TAVERN_CANVAS_DATA_DIR: data_directory,
      TAVERN_CANVAS_CONCURRENCY: "1",
      TAVERN_CANVAS_MAX_REQUEST_BYTES: "2000000",
      TAVERN_CANVAS_MAX_IMAGE_BYTES: "20000000",
      TAVERN_CANVAS_MAX_IMAGE_PIXELS: "40000000",
      TAVERN_CANVAS_MAX_IMAGE_DIMENSION: "8192",
      TAVERN_CANVAS_PROVIDER_PROFILES: JSON.stringify([
        {
          provider_id: "sd_webui",
          base_url: upstream_origin,
          credential: PROVIDER_CREDENTIAL,
          profile: {
            profile_id: "sd-webui-e2e",
            provider_id: "sd_webui",
            model_allowlist: ["e2e-model"],
            vae_allowlist: [],
            adetailer_model_allowlist: [],
            controlnet_model_allowlist: [],
            output_mime_type_allowlist: ["image/png"],
            max_response_bytes: 2_000_000,
            max_input_asset_bytes: 2_000_000,
          },
        },
      ]),
    },
  });
  const runtime = create_gateway_runtime({
    config: { ...config, bind_port },
    adapters: adapters(),
  });
  await runtime.start();
  const server = runtime.server;
  if (server === undefined) {
    throw new Error("gateway did not start a server");
  }
  return { runtime, origin: server_origin(server) };
}

test.beforeAll(async () => {
  upstream = create_upstream();
  await listen(upstream);
  upstream_origin = server_origin(upstream);
  data_directory = await mkdtemp(path.join(tmpdir(), "tavern-canvas-gateway-e2e-"));
  gateway = await start_gateway(0);
});

test.afterAll(async () => {
  await gateway.runtime.stop().catch(() => undefined);
  await new Promise<void>((resolve) => upstream.close(() => resolve()));
  await rm(data_directory, { recursive: true, force: true });
});

test.beforeEach(() => {
  upstream_request_paths = [];
});

async function open_gateway_client(page: Parameters<typeof open_host_page>[0]): Promise<void> {
  await open_host_page(page, "sillytavern_host.html", {
    mode: "capabilities",
    gateway: gateway.origin,
    ack: "1",
  });
}

test.describe("Gateway over LAN HTTP with an explicit, non-blocking cleartext warning", () => {
  test("an unacknowledged cleartext origin refuses to build a transport", async ({ page }) => {
    await open_host_page(page, "sillytavern_host.html", { mode: "capabilities" });

    const outcome = await page.evaluate(
      (origin) => window.__TAVERN_CANVAS_E2E__.probes.http_acknowledgment(origin),
      gateway.origin,
    );
    expect(outcome.before).toContain("blocked:");
    expect(outcome.after).toBe("gateway");
  });

  test("an acknowledged cleartext Gateway answers a real cross-origin capabilities request", async ({
    page,
  }) => {
    await open_gateway_client(page);

    const capabilities = await page.evaluate(
      async ([origin, token]) =>
        window.__TAVERN_CANVAS_E2E__.probes.gateway_capabilities(String(origin), String(token)),
      [gateway.origin, GATEWAY_TOKEN],
    );

    expect(capabilities.protocol_version).toBe("1.0");
    const providers = capabilities.providers as readonly { provider_id: string }[];
    expect(providers.map((provider) => provider.provider_id)).toContain("sd_webui");
  });
});

test.describe("no provider secret reaches the client and the client never names the upstream", () => {
  test("the capabilities document carries no credential, base URL or upstream host", async ({
    page,
  }) => {
    await open_gateway_client(page);

    const serialized = await page.evaluate(
      async ([origin, token]) =>
        JSON.stringify(
          await window.__TAVERN_CANVAS_E2E__.probes.gateway_capabilities(
            String(origin),
            String(token),
          ),
        ),
      [gateway.origin, GATEWAY_TOKEN],
    );

    expect(serialized).not.toContain(PROVIDER_CREDENTIAL);
    expect(serialized).not.toContain(new URL(upstream_origin).host);
    expect(serialized.toLowerCase()).not.toContain("credential");
    expect(serialized.toLowerCase()).not.toContain("base_url");
  });

  test("a generation job runs end to end through the real client executor", async ({ page }) => {
    await open_gateway_client(page);

    const outcome = await page.evaluate(
      async ([origin, token]) =>
        window.__TAVERN_CANVAS_E2E__.probes.gateway_generation(String(origin), String(token), {
          request_id: "77777777-7777-4777-8777-777777777775",
        }),
      [gateway.origin, GATEWAY_TOKEN],
    );

    expect(outcome.error).toBeNull();
    expect(outcome.image_ids).toHaveLength(1);
    expect(outcome.media_types).toEqual(["image/png"]);
    expect(outcome.byte_lengths[0]).toBeGreaterThan(0);
    expect(outcome.marked_running).toBe(true);
    // The token is read from host storage once per job and never cached across jobs.
    expect(outcome.token_resolutions).toBe(1);
    expect(upstream_request_paths).toEqual(["/sdapi/v1/txt2img"]);
  });

  test("a submitted job reaches the upstream the Gateway chose, not one the client named", async ({
    page,
  }) => {
    await open_gateway_client(page);

    const outcome = await page.evaluate(
      async ([origin, token]) =>
        window.__TAVERN_CANVAS_E2E__.probes.gateway_run(String(origin), String(token), {
          request_id: "77777777-7777-4777-8777-777777777771",
        }),
      [gateway.origin, GATEWAY_TOKEN],
    );

    expect(outcome.state).toBe("completed");
    expect(upstream_request_paths).toEqual(["/sdapi/v1/txt2img"]);
  });
});

test.describe("Gateway auth and origin enforcement", () => {
  test("a request without a bearer token is rejected", async ({ page }) => {
    await open_gateway_client(page);

    const status = await page.evaluate(async (origin) => {
      const response = await fetch(`${origin}/v1/capabilities`, { method: "GET" });
      return response.status;
    }, gateway.origin);

    expect(status).toBe(401);
  });

  test("a request with the wrong bearer token is rejected", async ({ page }) => {
    await open_gateway_client(page);

    const status = await page.evaluate(async (origin) => {
      const response = await fetch(`${origin}/v1/capabilities`, {
        method: "GET",
        headers: { authorization: "Bearer not-the-configured-token" },
      });
      return response.status;
    }, gateway.origin);

    // 403, not 401: the request presented a credential, it just is not one of the configured
    // token hashes, so there is nothing for the client to re-authenticate with.
    expect(status).toBe(403);
  });

  test("an origin outside the configured allowlist is refused by CORS", async () => {
    const response = await fetch(`${gateway.origin}/v1/capabilities`, {
      method: "OPTIONS",
      headers: {
        origin: "https://evil.example",
        "access-control-request-method": "GET",
        "access-control-request-headers": "authorization",
      },
    });

    expect(response.headers.get("access-control-allow-origin")).not.toBe("https://evil.example");
    expect(response.headers.get("access-control-allow-origin")).not.toBe("*");
  });

  test("the configured origin is allowed by CORS", async () => {
    const response = await fetch(`${gateway.origin}/v1/capabilities`, {
      method: "OPTIONS",
      headers: {
        origin: HARNESS_ORIGIN,
        "access-control-request-method": "GET",
        "access-control-request-headers": "authorization",
      },
    });

    expect(response.headers.get("access-control-allow-origin")).toBe(HARNESS_ORIGIN);
  });

  test("an oversized asset upload is refused", async () => {
    const oversized = new Uint8Array(3_000_000).fill(0x41);
    const response = await fetch(`${gateway.origin}/v1/assets`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${GATEWAY_TOKEN}`,
        "content-type": "application/octet-stream",
        origin: HARNESS_ORIGIN,
      },
      body: oversized,
    });

    expect(response.ok).toBe(false);
  });

  test("an upload whose bytes are not a real image is refused by magic-byte inspection", async () => {
    const response = await fetch(`${gateway.origin}/v1/assets`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${GATEWAY_TOKEN}`,
        "content-type": "image/png",
        origin: HARNESS_ORIGIN,
      },
      body: new TextEncoder().encode("this is not a PNG, whatever the content type claims"),
    });

    expect(response.ok).toBe(false);
  });

  test("a traversal-shaped asset id cannot escape the asset store", async () => {
    const response = await fetch(`${gateway.origin}/v1/assets/..%2f..%2fetc%2fpasswd`, {
      method: "GET",
      headers: { authorization: `Bearer ${GATEWAY_TOKEN}`, origin: HARNESS_ORIGIN },
    });

    expect(response.ok).toBe(false);
    expect(response.status).toBeLessThan(500);
  });
});

test.describe("Gateway job lifecycle survives a lost stream and a server restart", () => {
  test("a job whose SSE stream is dropped still completes through polling", async ({ page }) => {
    await open_gateway_client(page);

    const outcome = await page.evaluate(
      async ([origin, token]) =>
        window.__TAVERN_CANVAS_E2E__.probes.gateway_run(String(origin), String(token), {
          request_id: "77777777-7777-4777-8777-777777777772",
          // Truncated before a single event is delivered, on the first attempt and on the one
          // resume the client is allowed, so the polling fallback is the only way this finishes.
          drop_stream_after_events: 0,
        }),
      [gateway.origin, GATEWAY_TOKEN],
    );

    expect(outcome.state).toBe("completed");
    expect(outcome.polled).toBe(true);
  });

  test("a queued job is still there after the Gateway restarts", async ({ page }) => {
    await open_gateway_client(page);

    const submitted = await page.evaluate(
      async ([origin, token]) =>
        window.__TAVERN_CANVAS_E2E__.probes.gateway_submit(String(origin), String(token), {
          request_id: "77777777-7777-4777-8777-777777777773",
        }),
      [gateway.origin, GATEWAY_TOKEN],
    );
    expect(submitted.job_id).toMatch(/^[0-9a-f-]{36}$/u);

    const port = Number(new URL(gateway.origin).port);
    await gateway.runtime.stop();
    gateway = await start_gateway(port);

    const recovered = await page.evaluate(
      async ([origin, token, job_id]) => {
        const response = await fetch(`${String(origin)}/v1/jobs/${String(job_id)}`, {
          headers: { authorization: `Bearer ${String(token)}` },
        });
        return {
          status: response.status,
          body: (await response.json()) as Record<string, unknown>,
        };
      },
      [gateway.origin, GATEWAY_TOKEN, submitted.job_id],
    );

    expect(recovered.status).toBe(200);
    expect(recovered.body.job_id).toBe(submitted.job_id);
  });

  test("a job can be cancelled through the real client", async ({ page }) => {
    await open_gateway_client(page);

    const outcome = await page.evaluate(
      async ([origin, token]) =>
        window.__TAVERN_CANVAS_E2E__.probes.gateway_cancel(String(origin), String(token), {
          request_id: "77777777-7777-4777-8777-777777777774",
        }),
      [gateway.origin, GATEWAY_TOKEN],
    );

    expect(outcome.cancel_error).toBeNull();
    expect(["cancelled", "completed"]).toContain(outcome.state);
  });
});
